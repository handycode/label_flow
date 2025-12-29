import { NextRequest, NextResponse } from 'next/server'
import { GetObjectCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const REGION = process.env.AWS_REGION || 'ap-southeast-2'
const BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'interviewonly'

const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || ''
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || ''

function getS3Client() {
  if (!REGION || !BUCKET_NAME || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
    throw new Error('Missing S3 configuration in environment variables')
  }
  return new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACCESS_KEY,
    },
  })
}

const IMAGE_MIME_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'
]
const VIDEO_MIME_TYPES = [
  'video/mp4', 'video/webm', 'video/ogg'
]


export async function GET(req: NextRequest) {
  try {
    const s3 = getS3Client()

    const { searchParams } = req.nextUrl
    const action = searchParams.get('action')
    const key = searchParams.get('key')
    const prefix = searchParams.get('prefix') || ''

    // 列出 bucket 对象列表
    if (action === 'list' || !key) {
      const maxKeys = parseInt(searchParams.get('maxKeys') || '100')
      const signedUrlExpires = parseInt(searchParams.get('expires') || '3600')
      const command = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: prefix || undefined,
        MaxKeys: maxKeys,
      })

      const data = await s3.send(command)

      const objects = await Promise.all(
        (data.Contents || []).map(async (obj) => {
          // 判断是否为图片
          const isImage = IMAGE_MIME_TYPES.some(mime =>
            obj.Key?.toLowerCase().endsWith(`.${mime.split('/')[1]}`)
          )

          // 生成预签名URL（图片用）
          let previewUrl = ''
          if (isImage) {
            try {
              const getCommand = new GetObjectCommand({
                Bucket: BUCKET_NAME,
                Key: obj.Key!,
              })
              previewUrl = await getSignedUrl(s3, getCommand, { expiresIn: signedUrlExpires })
            } catch (err) {
              console.warn('Failed to generate signed URL:', err)
            }
          }

          return {
            Key: obj.Key,
            Size: obj.Size,
            LastModified: obj.LastModified?.toISOString(),
            ETag: obj.ETag,
            isImage,
            previewUrl, // 图片预览URL
          }
        })
      )

      return NextResponse.json({
        bucket: BUCKET_NAME,
        prefix,
        count: objects.length,
        objects,
        isTruncated: data.IsTruncated,
        nextContinuationToken: data.NextContinuationToken,
      }, { status: 200 })
    }

    // 获取单个对象
    const getCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    const data = await s3.send(getCommand)

    // 检查 ContentType 判断文件类型
    const contentType = data.ContentType || 'application/octet-stream'
    const isImage = IMAGE_MIME_TYPES.includes(contentType)
    const isVideo = VIDEO_MIME_TYPES.includes(contentType)

    if (isImage || isVideo) {
      // 图片：直接返回binary数据，浏览器可直接展示
      const bodyBuffer: any = await data.Body
      return new NextResponse(bodyBuffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
        },
      })
    }

    // 文本/JSON：转字符串处理
    const bodyString = await data.Body?.transformToString()
    let json: any
    try {
      json = JSON.parse(bodyString ?? '')
      return NextResponse.json(json, { status: 200 })
    } catch {
      return new NextResponse(bodyString ?? '', {
        status: 200,
        headers: {
          'Content-Type': contentType || 'text/plain; charset=utf-8',
        },
      })
    }
  } catch (err: any) {
    console.error('S3 error:', err)
    return NextResponse.json(
      { error: 'S3 operation failed', details: err?.message },
      { status: 500 }
    )
  }
}

