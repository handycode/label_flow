import { GetObjectCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Config = {
  region: process.env.AWS_REGION || 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
}

export const s3Client = new S3Client(s3Config)

export const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'interviewonly'

export interface S3Object {
  key: string;
  size: number;
  lastModified: Date;
  type: 'image' | 'video' | 'other';
}

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg']
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.avi', '.mkv', '.m4v']

export function getMediaType(key: string): 'image' | 'video' | 'other' {
  const ext = key.toLowerCase().substring(key.lastIndexOf('.'))
  if (IMAGE_EXTENSIONS.includes(ext)) return 'image'
  if (VIDEO_EXTENSIONS.includes(ext)) return 'video'
  return 'other'
}

export async function listS3Objects(prefix?: string): Promise<S3Object[]> {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Prefix: prefix,
  })

  const response = await s3Client.send(command)

  if (!response.Contents) return []

  return response.Contents
    .filter((item) => item.Key && item.Size && item.Size > 0)
    .map((item) => ({
      key: item.Key!,
      size: item.Size!,
      lastModified: item.LastModified || new Date(),
      type: getMediaType(item.Key!),
    }))
    .filter((item) => item.type !== 'other')
}

export async function getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  })

  return getSignedUrl(s3Client, command, { expiresIn })
}

export async function getS3ObjectUrl(key: string): Promise<string> {
  return `https://${BUCKET_NAME}.s3.${s3Config.region}.amazonaws.com/${encodeURIComponent(key)}`
}
