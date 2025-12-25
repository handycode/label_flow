import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, requireRole } from '@/lib/auth'
import { Role } from '@/types'

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/users/:id
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await requireRole([Role.ADMIN])
    const { id } = await params

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            labeledTasks: true,
            checkedTasks: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    console.error('Get user error:', error)
    if ((error as Error).message === 'Forbidden') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/users/:id
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    await requireRole([Role.ADMIN])
    const { id } = await params
    const body = await request.json()
    const { username, email, password, role, status } = body

    const updateData: Record<string, unknown> = {}
    if (username) updateData.username = username
    if (email) updateData.email = email
    if (password) updateData.passwordHash = await hashPassword(password)
    if (role) updateData.role = role
    if (status) updateData.status = status

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        status: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    console.error('Update user error:', error)
    if ((error as Error).message === 'Forbidden') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/users/:id
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await requireRole([Role.ADMIN])
    const { id } = await params

    await prisma.user.delete({ where: { id } })

    return NextResponse.json({ success: true, message: 'User deleted' })
  } catch (error) {
    console.error('Delete user error:', error)
    if ((error as Error).message === 'Forbidden') {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
