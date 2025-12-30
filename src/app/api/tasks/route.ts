import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { Role } from '@/types'

// GET /api/tasks - 获取任务列表 (根据角色过滤)
export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const status = searchParams.get('status')
    const packageId = searchParams.get('packageId')
    const myTasks = searchParams.get('myTasks') === 'true'

    const where: Record<string, unknown> = {}
    // 根据角色过滤任务
    if (myTasks) {
      // 明确请求"我的任务"，只返回当前用户已领取的
      if (session.role === Role.LABELER) {
        where.labelerId = session.id
      } else if (session.role === Role.CHECKER) {
        where.checkerId = session.id
      }
    } else if (session.role === Role.LABELER) {
      // 标注员只能看到待领取的任务或自己领取的任务
      where.OR = [
        { status: 'PENDING' },
        { status: 'REJECTED', labelerId: session.id },
        { labelerId: session.id },
      ]
    } else if (session.role === Role.CHECKER) {
      // 质检员只能看到已标注的任务或自己领取质检的任务
      where.OR = [
        { status: 'LABELED' },
        { checkerId: session.id },
      ]
    }
    // 管理员可以看到所有任务

    if (status) where.status = status
    if (packageId) where.packageId = packageId

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        include: {
          media: true,
          package: { select: { id: true, name: true } },
          labeler: { select: { id: true, username: true } },
          checker: { select: { id: true, username: true } },
          _count: { select: { annotations: true } },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.task.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        items: tasks,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('Get tasks error:', error)
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
