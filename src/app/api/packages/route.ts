import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'
import { Role } from '@/types'

// GET /api/packages - 获取任务包列表
export async function GET(request: NextRequest) {
  try {
    await requireRole([Role.ADMIN])

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const status = searchParams.get('status')

    const where: Record<string, unknown> = {}
    if (status) where.status = status

    const [packages, total] = await Promise.all([
      prisma.taskPackage.findMany({
        where,
        include: {
          createdBy: {
            select: { id: true, username: true },
          },
          _count: {
            select: { tasks: true },
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.taskPackage.count({ where }),
    ])

    // 获取每个包的任务状态统计
    const packagesWithStats = await Promise.all(
      packages.map(async (pkg: { id: any }) => {
        const statusCounts = await prisma.task.groupBy({
          by: ['status'],
          where: { packageId: pkg.id },
          _count: { status: true },
        })

        const stats = statusCounts.reduce(
          (acc: any, item: any) => {
            acc[`${item.status.toLowerCase()  }Count`] = item._count.status
            return acc
          },
          {} as Record<string, number>
        )

        return { ...pkg, ...stats }
      })
    )

    return NextResponse.json({
      success: true,
      data: {
        items: packagesWithStats,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('Get packages error:', error)
    if ((error as Error).message === 'Forbidden') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/packages - 创建任务包
export async function POST(request: NextRequest) {
  try {
    const session = await requireRole([Role.ADMIN])
    const body = await request.json()
    const { name, description, mediaIds } = body

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Package name is required' },
        { status: 400 }
      )
    }

    const taskPackage = await prisma.taskPackage.create({
      data: {
        name,
        description,
        createdById: session.id,
        totalCount: mediaIds?.length || 0,
        tasks: mediaIds?.length
          ? {
            create: mediaIds.map((mediaId: string) => ({
              mediaId,
            })),
          }
          : undefined,
      },
      include: {
        createdBy: { select: { id: true, username: true } },
        _count: { select: { tasks: true } },
      },
    })

    return NextResponse.json({ success: true, data: taskPackage }, { status: 201 })
  } catch (error) {
    console.error('Create package error:', error)
    if ((error as Error).message === 'Forbidden') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
