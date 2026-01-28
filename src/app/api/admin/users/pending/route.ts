import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Неавторизован' }, { status: 401 })
    }

    const user = await getUserFromToken(token)
    if (!user || (user.role !== 'ADMIN' && user.role !== 'TEACHER')) {
      return NextResponse.json({ error: 'Нет доступа' }, { status: 403 })
    }

    // Получение ожидающих пользователей
    const pendingUsers = await prisma.user.findMany({
      where: {
        status: 'PENDING'
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        studentCode: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ users: pendingUsers })
  } catch (error) {
    console.error('Error fetching pending users:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении списка' },
      { status: 500 }
    )
  }
}
