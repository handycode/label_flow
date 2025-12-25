import type { Metadata } from 'next'
import '@/config'
import '../styles/globals.css'
import MediaPreview from '@/components/MediaPreview'

export const metadata: Metadata = {
  title: '学生记录',
  description: '基于Next.js的学生记录媒体资源遍历系统',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" data-theme="light">
      <body>
        <MediaPreview>{children}</MediaPreview>
      </body>
    </html>
  )
}