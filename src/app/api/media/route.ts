import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getMediaType, listS3Objects } from '@/lib/s3'
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

    const s3Objects = await listS3Objects()

    let created = 0
    let skipped = 0

    for (const obj of s3Objects) {
      const existing = await prisma.mediaResource.findUnique({
        where: { s3Key: obj.key },
      })

      if (existing) {
        skipped++
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

    return NextResponse.json({
      success: true,
      data: {
        created,
        skipped,
        total: s3Objects.length,
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
