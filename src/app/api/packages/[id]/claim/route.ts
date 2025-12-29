import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'
import { Role } from '@/types'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireRole([Role.LABELER, Role.CHECKER])
    const { id: packageId } = await params

    // Check if package exists
    const pkg = await prisma.taskPackage.findUnique({
      where: { id: packageId },
      include: { tasks: true }
    })

    if (!pkg) {
      return NextResponse.json(
        { success: false, error: '任务包不存在' },
        { status: 404 }
      )
    }

    // Role-based claiming logic
    if (session.role === Role.LABELER) {
      // Labelers claim PENDING or REJECTED tasks
      const claimableTasks = pkg.tasks.filter(
        (task: any) => task.status === 'PENDING' || task.status === 'REJECTED'
      )

      if (claimableTasks.length === 0) {
        return NextResponse.json(
          { success: false, error: '该任务包没有可领取的任务' },
          { status: 400 }
        )
      }

      // Bulk update tasks
      await prisma.$transaction(async (tx) => {
        // Update all claimable tasks
        await tx.task.updateMany({
          where: {
            id: { in: claimableTasks.map((t: any) => t.id) }
          },
          data: {
            status: 'LABELING',
            labelerId: session.id,
            assignedAt: new Date()
          }
        })

        // Create operation logs for each task
        for (const task of claimableTasks) {
          await tx.operationLog.create({
            data: {
              taskId: task.id,
              userId: session.id,
              action: 'CLAIM_PACKAGE',
              details: { packageId: packageId, packageName: pkg.name }
            }
          })
        }
      })

      return NextResponse.json({
        success: true,
        data: {
          packageId,
          claimedCount: claimableTasks.length,
          message: `成功领取 ${claimableTasks.length} 个标注任务`
        }
      })
    } else if (session.role === Role.CHECKER) {
      // Checkers claim LABELED tasks
      const claimableTasks = pkg.tasks.filter(
        (task: any) => task.status === 'LABELED'
      )

      if (claimableTasks.length === 0) {
        return NextResponse.json(
          { success: false, error: '该任务包没有可质检的任务' },
          { status: 400 }
        )
      }

      // Bulk update tasks
      await prisma.$transaction(async (tx) => {
        // Update all claimable tasks
        await tx.task.updateMany({
          where: {
            id: { in: claimableTasks.map((t: any) => t.id) }
          },
          data: {
            status: 'CHECKING',
            checkerId: session.id,
            checkedAt: new Date()
          }
        })

        // Create operation logs for each task
        for (const task of claimableTasks) {
          await tx.operationLog.create({
            data: {
              taskId: task.id,
              userId: session.id,
              action: 'CLAIM_PACKAGE',
              details: { packageId: packageId, packageName: pkg.name }
            }
          })
        }
      })

      return NextResponse.json({
        success: true,
        data: {
          packageId,
          claimedCount: claimableTasks.length,
          message: `成功领取 ${claimableTasks.length} 个质检任务`
        }
      })
    } else {
      return NextResponse.json(
        { success: false, error: '无权限领取任务包' },
        { status: 403 }
      )
    }
  } catch (error) {
    console.error('Error claiming package:', error)
    if ((error as Error).message === 'Forbidden') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
