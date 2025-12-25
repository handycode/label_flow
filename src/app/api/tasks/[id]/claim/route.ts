import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'
import { Role } from '@/types'

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST /api/tasks/:id/claim - 领取任务
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await requireRole([Role.LABELER, Role.CHECKER])
    const { id } = await params

    const task = await prisma.task.findUnique({
      where: { id },
    })

    if (!task) {
      return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 })
    }

    // 标注员领取任务
    if (session.role === Role.LABELER) {
      if (task.status !== 'PENDING' && task.status !== 'REJECTED') {
        return NextResponse.json(
          { success: false, error: 'Task is not available for labeling' },
          { status: 400 }
        )
      }

      const updatedTask = await prisma.task.update({
        where: { id },
        data: {
          status: 'LABELING',
          labelerId: session.id,
          assignedAt: new Date(),
          operationLogs: {
            create: {
              userId: session.id,
              action: 'claim',
              oldStatus: task.status,
              newStatus: 'LABELING',
            },
          },
        },
        include: { media: true },
      })

      return NextResponse.json({ success: true, data: updatedTask })
    }

    // 质检员领取任务
    if (session.role === Role.CHECKER) {
      if (task.status !== 'LABELED') {
        return NextResponse.json(
          { success: false, error: 'Task is not available for checking' },
          { status: 400 }
        )
      }

      const updatedTask = await prisma.task.update({
        where: { id },
        data: {
          status: 'CHECKING',
          checkerId: session.id,
          operationLogs: {
            create: {
              userId: session.id,
              action: 'claim_check',
              oldStatus: task.status,
              newStatus: 'CHECKING',
            },
          },
        },
        include: { media: true },
      })

      return NextResponse.json({ success: true, data: updatedTask })
    }

    return NextResponse.json({ success: false, error: 'Invalid role' }, { status: 403 })
  } catch (error) {
    console.error('Claim task error:', error)
    if ((error as Error).message === 'Forbidden') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
