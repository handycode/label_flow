import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { listS3Objects } from '@/lib/s3'
import { requireRole } from '@/lib/auth'
import { Role } from '@/types'

// GET /api/media - 获取媒体资源列表
export async function GET(request: NextRequest) {
  try {
    await requireRole([Role.ADMIN])

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const type = searchParams.get('type')
    const unassigned = searchParams.get('unassigned') === 'true'

    const where: Record<string, unknown> = {}
    if (type) where.type = type
    if (unassigned) where.task = null

    const [media, total] = await Promise.all([
      prisma.mediaResource.findMany({
        where,
        include: {
          task: {
            select: { id: true, status: true, packageId: true },
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { autoNumber: 'asc' },
      }),
      prisma.mediaResource.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        items: media,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('Get media error:', error)
    if ((error as Error).message === 'Forbidden') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/media/sync - 同步 S3 媒体资源
export async function POST(request: NextRequest) {
  try {
    await requireRole([Role.ADMIN])

    const { searchParams } = new URL(request.url)
    const continuationToken = searchParams.get('continuationToken') || undefined

    const MAX_SYNC_COUNT = 500
    // 获取单批次数据，使用 continuationToken 控制分页
    const result = await listS3Objects(undefined, MAX_SYNC_COUNT, continuationToken)
    const s3Objects = result.objects
    const nextContinuationToken = result.continuationToken

    // 获取数据库中已有的媒体资源数量
    const existingCount = await prisma.mediaResource.count()

    // 检查是否没有新对象
    if (s3Objects.length === 0 && !nextContinuationToken) {
      return NextResponse.json({
        success: true,
        data: {
          created: 0,
          skipped: 0,
          total: 0,
          processed: existingCount,
          hasMore: false,
          message: '所有文件已同步完成',
        },
      })
    }

    let created = 0

    for (const obj of s3Objects) {
      const existing = await prisma.mediaResource.findUnique({
        where: { s3Key: obj.key },
      })

      if (existing) {
        continue
      }

      await prisma.mediaResource.create({
        data: {
          s3Key: obj.key,
          s3Url: `https://interviewonly.s3.ap-southeast-2.amazonaws.com/${encodeURIComponent(obj.key)}`,
          type: obj.type === 'image' ? 'IMAGE' : 'VIDEO',
          fileName: obj.key.split('/').pop() || obj.key,
          fileSize: obj.size,
        },
      })
      created++
    }

    const skipped = s3Objects.length - created
    const newExistingCount = await prisma.mediaResource.count()

    return NextResponse.json({
      success: true,
      data: {
        created,
        skipped,
        total: s3Objects.length,
        processed: newExistingCount,
        hasMore: !!nextContinuationToken,
        continuationToken: nextContinuationToken,
      },
    })
  } catch (error) {
    console.error('Sync media error:', error)
    if ((error as Error).message === 'Forbidden') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
