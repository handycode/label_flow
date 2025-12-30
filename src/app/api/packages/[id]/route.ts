import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth'
import { Role } from '@/types'

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/packages/:id
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireRole([Role.ADMIN, Role.LABELER, Role.CHECKER])
    const { id } = await params

    const taskPackage = await prisma.taskPackage.findUnique({
      where: { id },
      include: {
        createdBy: { select: { id: true, username: true } },
        tasks: {
          // 根据角色过滤任务
          where:
            user.role === Role.ADMIN
              ? undefined
              : user.role === Role.LABELER
                ? { labelerId: user.id }
                : { checkerId: user.id },
          include: {
            media: true,
            labeler: { select: { id: true, username: true } },
            checker: { select: { id: true, username: true } },
          },
        },
        _count: {
          select: {
            tasks: {
              where:
                user.role === Role.ADMIN
                  ? undefined
                  : user.role === Role.LABELER
                    ? { labelerId: user.id }
                    : { checkerId: user.id },
            },
          },
        },
      },
    })

    if (!taskPackage) {
      return NextResponse.json({ success: false, error: 'Package not found' }, { status: 404 })
    }

    // 计算状态统计（基于过滤后的任务）
    const stats = {
      pendingCount: taskPackage.tasks.filter((t) => t.status === 'PENDING').length,
      labelingCount: taskPackage.tasks.filter((t) => t.status === 'LABELING').length,
      labeledCount: taskPackage.tasks.filter((t) => t.status === 'LABELED').length,
      checkingCount: taskPackage.tasks.filter((t) => t.status === 'CHECKING').length,
      rejectedCount: taskPackage.tasks.filter((t) => t.status === 'REJECTED').length,
      approvedCount: taskPackage.tasks.filter((t) => t.status === 'APPROVED').length,
    }

    return NextResponse.json({
      success: true,
      data: { ...taskPackage, ...stats },
    })
  } catch (error) {
    console.error('Get package error:', error)
    if ((error as Error).message === 'Forbidden') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/packages/:id
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    await requireRole([Role.ADMIN])
    const { id } = await params
    const body = await request.json()
    const { name, description, status } = body

    const updateData: Record<string, unknown> = {}
    if (name) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (status) updateData.status = status

    const taskPackage = await prisma.taskPackage.update({
      where: { id },
      data: updateData,
      include: {
        createdBy: { select: { id: true, username: true } },
        _count: { select: { tasks: true } },
      },
    })

    return NextResponse.json({ success: true, data: taskPackage })
  } catch (error) {
    console.error('Update package error:', error)
    if ((error as Error).message === 'Forbidden') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/packages/:id
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await requireRole([Role.ADMIN])
    const { id } = await params

    await prisma.taskPackage.delete({ where: { id } })

    return NextResponse.json({ success: true, message: 'Package deleted' })
  } catch (error) {
    console.error('Delete package error:', error)
    if ((error as Error).message === 'Forbidden') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
