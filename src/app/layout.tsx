import type { Metadata } from 'next'
import '@/config'
import '../styles/globals.css'
import MediaPreview from '@/components/MediaPreview'

export const metadata: Metadata = {
  title: 'Label Flow',
  description: '基于Next.js的标注任务管理系统',
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