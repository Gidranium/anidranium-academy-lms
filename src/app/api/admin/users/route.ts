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

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const role = searchParams.get('role')

    const where: any = {}
    if (status) where.status = status
    if (role) where.role = role

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        studentCode: true,
        role: true,
        status: true,
        accessExpiresAt: true,
        createdAt: true,
        _count: {
          select: {
            enrollments: true,
            homeworkSubmissions: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении списка' },
      { status: 500 }
    )
  }
}
