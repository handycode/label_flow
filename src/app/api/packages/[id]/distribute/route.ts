import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'
import { Role } from '@/types'

// POST /api/packages/:id/distribute - 批量分包/分配媒体到任务
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole([Role.ADMIN])
    const { id } = await params
    const body = await request.json().catch(() => ({}))
    const mediaIds: string[] | undefined = body?.mediaIds
    const limit: number = body?.limit || 1000 // 默认最多1000个

    // 校验包是否存在
    const pkg = await prisma.taskPackage.findUnique({ where: { id } })
    if (!pkg) {
      return NextResponse.json({ success: false, error: 'Package not found' }, { status: 404 })
    }

    // 选择待分配的媒体：优先使用传入的 mediaIds，否则选择所有未分配媒体
    let targetMedia: { id: string }[] = []

    if (Array.isArray(mediaIds) && mediaIds.length > 0) {
      // 过滤掉已被其他任务占用的媒体
      targetMedia = await prisma.mediaResource.findMany({
        where: {
          id: { in: mediaIds },
          task: null,
        },
        select: { id: true },
        take: Math.min(limit, 1000), // 限制最多1000
      })
    } else {
      // 默认分配未分配媒体，应用数量限制
      targetMedia = await prisma.mediaResource.findMany({
        where: { task: null },
        select: { id: true },
        take: Math.min(limit, 1000), // 限制最多1000
      })
    }

    if (targetMedia.length === 0) {
      return NextResponse.json({ success: false, error: 'No unassigned media to distribute' }, { status: 400 })
    }

    // 批量创建任务并更新包的总数
    const result = await prisma.$transaction(async (tx) => {
      // 创建任务
      const createRes = await tx.task.createMany({
        data: targetMedia.map((m) => ({ packageId: id, mediaId: m.id })),
        skipDuplicates: true, // 防止并发或重复 ID 导致错误
      })

      // 重新计算包内任务总数
      const newTotal = await tx.task.count({ where: { packageId: id } })

      const updatedPkg = await tx.taskPackage.update({
        where: { id },
        data: { totalCount: newTotal },
      })

      return { created: createRes.count, package: updatedPkg }
    })

    return NextResponse.json({ success: true, data: result }, { status: 200 })
  } catch (error) {
    console.error('Distribute package error:', error)
    if ((error as Error).message === 'Forbidden') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
