import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { Role } from '@/types'

// GET /api/statistics/overview - 获取统计概览
export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth()

    const [
      totalTasks,
      tasksByStatus,
      totalUsers,
      totalPackages,
    ] = await Promise.all([
      prisma.task.count(),
      prisma.task.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      prisma.user.count(),
      prisma.taskPackage.count(),
    ])

    const statusCounts = tasksByStatus.reduce(
      (acc: { [x: string]: any }, item: { status: string; _count: { status: any } }) => {
        acc[item.status.toLowerCase()] = item._count.status
        return acc
      },
      {} as Record<string, number>
    )

    return NextResponse.json({
      success: true,
      data: {
        totalTasks,
        pendingTasks: statusCounts.pending || 0,
        labelingTasks: statusCounts.labeling || 0,
        labeledTasks: statusCounts.labeled || 0,
        checkingTasks: statusCounts.checking || 0,
        approvedTasks: statusCounts.approved || 0,
        rejectedTasks: statusCounts.rejected || 0,
        totalUsers,
        totalPackages,
      },
    })
  } catch (error) {
    console.error('Get statistics error:', error)
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
