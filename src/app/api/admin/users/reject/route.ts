import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    if (!token) {
      return NextResponse.json({ error: 'Неавторизован' }, { status: 401 })
    }

    const admin = await getUserFromToken(token)
    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Нет доступа' }, { status: 403 })
    }

    const body = await request.json()
    const { userId } = body

    // Удаление пользователя
    await prisma.user.delete({
      where: { id: userId }
    })

    return NextResponse.json({
      message: 'Регистрация отклонена'
    })
  } catch (error) {
    console.error('Rejection error:', error)
    return NextResponse.json(
      { error: 'Ошибка при отклонении' },
      { status: 500 }
    )
  }
}
