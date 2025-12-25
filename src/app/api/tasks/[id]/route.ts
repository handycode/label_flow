import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/tasks/:id
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAuth()
    const { id } = await params

    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        media: true,
        package: { select: { id: true, name: true } },
        labeler: { select: { id: true, username: true } },
        checker: { select: { id: true, username: true } },
        annotations: true,
        metadata: true,
        qualityScores: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        operationLogs: {
          orderBy: { createdAt: 'desc' },
          include: {
            user: { select: { id: true, username: true } },
          },
        },
      },
    })

    if (!task) {
      return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: task })
  } catch (error) {
    console.error('Get task error:', error)
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
