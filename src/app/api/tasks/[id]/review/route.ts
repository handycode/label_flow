import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'
import { Role } from '@/types'

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/tasks/:id/review - 质检审核 (通过/驳回)
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await requireRole([Role.CHECKER])
    const { id } = await params
    const body = await request.json()
    const { approved, score, remarks } = body

    if (typeof approved !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'approved field is required' },
        { status: 400 }
      )
    }

    if (!score || score < 1 || score > 5) {
      return NextResponse.json(
        { success: false, error: 'Score must be between 1 and 5' },
        { status: 400 }
      )
    }

    const task = await prisma.task.findUnique({
      where: { id },
    })

    if (!task) {
      return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 })
    }

    if (task.status !== 'CHECKING' || task.checkerId !== session.id) {
      return NextResponse.json(
        { success: false, error: 'You cannot review this task' },
        { status: 403 }
      )
    }

    const newStatus = approved ? 'APPROVED' : 'REJECTED'

    const updatedTask = await prisma.$transaction(async (tx) => {
      // 创建质量评分
      await tx.qualityScore.create({
        data: {
          taskId: id,
          score,
          createdById: session.id,
        },
      })

      // 更新或创建元数据（保存质检员的备注）
      if (remarks !== undefined) {
        await tx.taskMetadata.upsert({
          where: { taskId: id },
          create: {
            taskId: id,
            remarks,
          },
          update: {
            remarks,
          },
        })
      }

      // 更新任务状态
      return tx.task.update({
        where: { id },
        data: {
          status: newStatus,
          checkedAt: new Date(),
          operationLogs: {
            create: {
              userId: session.id,
              action: approved ? 'approve' : 'reject',
              oldStatus: 'CHECKING',
              newStatus,
              details: { score, remarks },
            },
          },
        },
        include: {
          media: true,
          annotations: true,
          qualityScores: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      })
    })

    return NextResponse.json({ success: true, data: updatedTask })
  } catch (error) {
    console.error('Review task error:', error)
    if ((error as Error).message === 'Forbidden') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
