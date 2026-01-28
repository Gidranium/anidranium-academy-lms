import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Публичные маршруты
  const publicPaths = ['/', '/login', '/register', '/activate']
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

  // API маршруты аутентификации
  const authApiPaths = ['/api/auth/login', '/api/auth/register', '/api/auth/activate']
  const isAuthApi = authApiPaths.some(path => pathname.startsWith(path))

  // Разрешаем публичные страницы и API аутентификации
  if (isPublicPath || isAuthApi) {
    return NextResponse.next()
  }

  // Проверка наличия токена
  if (!token) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Неавторизован' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Проверка токена
  const payload = verifyToken(token)
  if (!payload) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Неверный токен' }, { status: 401 })
    }
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('token')
    return response
  }

  // Проверка доступа к админ-панели
  if (pathname.startsWith('/admin')) {
    if (payload.role !== 'ADMIN' && payload.role !== 'TEACHER') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
