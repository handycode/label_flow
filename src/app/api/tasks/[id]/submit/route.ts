import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'
import { Role } from '@/types'

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/tasks/:id/submit - 提交标注
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await requireRole([Role.LABELER])
    const { id } = await params
    const body = await request.json()
    const { annotations, metadata } = body

    const task = await prisma.task.findUnique({
      where: { id },
    })

    if (!task) {
      return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 })
    }

    if (task.status !== 'LABELING' || task.labelerId !== session.id) {
      return NextResponse.json(
        { success: false, error: 'You cannot submit this task' },
        { status: 403 }
      )
    }

    // 使用事务保存标注数据和更新任务状态
    const updatedTask = await prisma.$transaction(async (tx) => {
      // 删除旧的标注
      await tx.annotation.deleteMany({ where: { taskId: id } })

      // 创建新的标注
      if (annotations && annotations.length > 0) {
        await tx.annotation.createMany({
          data: annotations.map((ann: Record<string, unknown>) => ({
            taskId: id,
            type: ann.type,
            coordinates: ann.coordinates,
            label: ann.label,
            frameTime: ann.frameTime,
            createdById: session.id,
          })),
        })
      }

      // 更新或创建元数据
      if (metadata) {
        await tx.taskMetadata.upsert({
          where: { taskId: id },
          create: {
            taskId: id,
            remarks: metadata.remarks,
            issues: metadata.issues,
            videoClips: metadata.videoClips,
            croppedAreas: metadata.croppedAreas,
          },
          update: {
            remarks: metadata.remarks,
            issues: metadata.issues,
            videoClips: metadata.videoClips,
            croppedAreas: metadata.croppedAreas,
          },
        })
      }

      // 更新任务状态
      return tx.task.update({
        where: { id },
        data: {
          status: 'LABELED',
          labeledAt: new Date(),
          operationLogs: {
            create: {
              userId: session.id,
              action: 'submit',
              oldStatus: 'LABELING',
              newStatus: 'LABELED',
              details: { annotationCount: annotations?.length || 0 },
            },
          },
        },
        include: {
          media: true,
          annotations: true,
          metadata: true,
        },
      })
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
