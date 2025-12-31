import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'
import { Role } from '@/types'

// POST /api/tasks/:id/submit - 提交标注
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireRole([Role.LABELER])
    const { id } = await params
    const body = await request.json()
    const { annotations, metadata } = body

    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        package: {
          include: {
            tasks: {
              where: {
                checkerId: { not: null },
              },
              select: {
                checkerId: true,
              },
              take: 1,
            },
          },
        },
      },
    })

    if (!task) {
      return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 })
    }

    const canSubmitStatuses = ['LABELING', 'REJECTED']
    if (!canSubmitStatuses.includes(task.status) || task.labelerId !== session.id) {
      return NextResponse.json(
        { success: false, error: 'You cannot submit this task' },
        { status: 403 }
      )
    }

    // 查找已领取该任务包的质检员
    const existingChecker = task.package?.tasks?.[0]?.checkerId

    // 使用事务保存标注数据和更新任务状态
    const updatedTask = await prisma.$transaction(async (tx) => {
      // 删除旧的标注
      await tx.annotation.deleteMany({ where: { taskId: id } })

      // 创建新的标注
      if (annotations && annotations.length > 0) {
        for (const ann of annotations) {
          await tx.annotation.create({
            data: {
              taskId: id,
              type: ann.type as any,
              coordinates: ann.coordinates as any,
              label: ann.label as string | undefined,
              frameTime: ann.frameTime as number | undefined,
              createdById: session.id,
            },
          })
        }
      }

      // 更新或创建元数据
      if (metadata) {
        await tx.taskMetadata.upsert({
          where: { taskId: id },
          create: {
            taskId: id,
            remarks: metadata.remarks,
            videoClips: metadata.videoClips,
            croppedAreas: metadata.croppedAreas,
          },
          update: {
            remarks: metadata.remarks,
            videoClips: metadata.videoClips,
            croppedAreas: metadata.croppedAreas,
          },
        })
      }

      // 更新任务状态
      const oldStatus = task.status
      const newStatus = existingChecker ? 'CHECKING' : 'LABELED'

      const updatedTask = await tx.task.update({
        where: { id },
        data: existingChecker ? {
          status: newStatus,
          labeledAt: new Date(),
          checkerId: existingChecker,
          checkedAt: new Date(),
        } : {
          status: newStatus,
          labeledAt: new Date(),
        },
        include: {
          media: true,
          annotations: true,
          metadata: true,
        },
      })

      // 创建操作日志
      await tx.operationLog.create({
        data: {
          taskId: id,
          userId: session.id,
          action: 'submit',
          oldStatus,
          newStatus: newStatus,
          details: {
            annotationCount: annotations?.length || 0,
            autoAssignedToChecker: !!existingChecker,
          },
        },
      })

      return updatedTask
    })

    return NextResponse.json({ success: true, data: updatedTask })
  } catch (error) {
    console.error('Submit task error:', error)
    if ((error as Error).message === 'Forbidden') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
