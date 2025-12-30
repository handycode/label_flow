import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getPresignedUrl } from '@/lib/s3'

// GET /api/media/presigned/:key - 获取预签名 URL
export async function GET(request: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  try {
    await requireAuth()
    const { key } = await params

    const decodedKey = decodeURIComponent(key)
    const presignedUrl = await getPresignedUrl(decodedKey)

    return NextResponse.json({
      success: true,
      data: { url: presignedUrl },
    })
  } catch (error) {
    console.error('Get presigned URL error:', error)
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
