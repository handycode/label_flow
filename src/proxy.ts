import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth/jwt'

export async function proxy(request: NextRequest) {
  // 排除需要跳过的路径
  const publicPaths = ['/login', '/api/auth/login']
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // 如果访问首页，检查认证并重定向
  if (request.nextUrl.pathname === '/') {
    const token = request.cookies.get('auth_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const payload = await verifyToken(token)

      if (!payload) {
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // 根据角色重定向到对应的首页
      switch (payload.role) {
        case 'ADMIN':
          return NextResponse.redirect(new URL('/admin/users', request.url))
        case 'LABELER':
          return NextResponse.redirect(new URL('/labeler/workspace', request.url))
        case 'CHECKER':
          return NextResponse.redirect(new URL('/checker/workspace', request.url))
        default:
          return NextResponse.redirect(new URL('/login', request.url))
      }
    } catch (_error) {
      // Token 验证失败，重定向到登录页
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('auth_token')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/admin/:path*', '/labeler/:path*', '/checker/:path*'],
}
