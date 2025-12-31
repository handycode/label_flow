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
      select: { id: true, name: true }
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
      return await prisma.$transaction(async (tx) => {
        // Get claimable task IDs
        const claimableTasks = await tx.task.findMany({
          where: {
            packageId,
            status: { in: ['PENDING', 'REJECTED'] }
          },
          select: { id: true }
        })

        if (claimableTasks.length === 0) {
          throw new Error('NO_CLAIMABLE_TASKS')
        }

        // Batch update all claimable tasks
        await tx.task.updateMany({
          where: {
            packageId,
            status: { in: ['PENDING', 'REJECTED'] }
          },
          data: {
            status: 'LABELING',
            labelerId: session.id,
            assignedAt: new Date()
          }
        })

        // Mark package as active once claimed
        await tx.taskPackage.update({
          where: { id: packageId },
          data: { status: 'ACTIVE' },
        })

        // Create operation logs
        await tx.operationLog.createMany({
          data: claimableTasks.map(task => ({
            taskId: task.id,
            userId: session.id,
            action: 'CLAIM_PACKAGE',
            details: { packageId, packageName: pkg.name }
          }))
        })

        return claimableTasks.length
      }).then(claimedCount => {
        return NextResponse.json({
          success: true,
          data: {
            packageId,
            claimedCount,
            message: `成功领取 ${claimedCount} 个标注任务`
          }
        })
      }).catch(error => {
        if (error.message === 'NO_CLAIMABLE_TASKS') {
          return NextResponse.json(
            { success: false, error: '该任务包没有可领取的任务' },
            { status: 400 }
          )
        }
        throw error
      })
    } else if (session.role === Role.CHECKER) {
      // Checkers claim LABELED tasks
      return await prisma.$transaction(async (tx) => {
        // Get claimable task IDs
        const claimableTasks = await tx.task.findMany({
          where: {
            packageId,
            status: 'LABELED'
          },
          select: { id: true }
        })

        if (claimableTasks.length === 0) {
          throw new Error('NO_CLAIMABLE_TASKS')
        }

        // Batch update all claimable tasks
        await tx.task.updateMany({
          where: {
            packageId,
            status: 'LABELED'
          },
          data: {
            status: 'CHECKING',
            checkerId: session.id,
            checkedAt: new Date()
          }
        })

        // Mark package as active once claimed
        await tx.taskPackage.update({
          where: { id: packageId },
          data: { status: 'ACTIVE' },
        })

        // Create operation logs
        await tx.operationLog.createMany({
          data: claimableTasks.map(task => ({
            taskId: task.id,
            userId: session.id,
            action: 'CLAIM_PACKAGE',
            details: { packageId, packageName: pkg.name }
          }))
        })

        return claimableTasks.length
      }).then(claimedCount => {
        return NextResponse.json({
          success: true,
          data: {
            packageId,
            claimedCount,
            message: `成功领取 ${claimedCount} 个质检任务`
          }
        })
      }).catch(error => {
        if (error.message === 'NO_CLAIMABLE_TASKS') {
          return NextResponse.json(
            { success: false, error: '该任务包没有可质检的任务' },
            { status: 400 }
          )
        }
        throw error
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
