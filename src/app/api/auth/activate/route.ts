import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code } = body

    if (!code) {
      return NextResponse.json(
        { error: 'Код активации не указан' },
        { status: 400 }
      )
    }

    // Поиск пользователя по коду
    const user = await prisma.user.findUnique({
      where: { activationCode: code.toUpperCase() }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Неверный код активации' },
        { status: 404 }
      )
    }

    if (user.status === 'ACTIVE') {
      return NextResponse.json(
        { error: 'Аккаунт уже активирован' },
        { status: 400 }
      )
    }

    // Активация аккаунта
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        status: 'ACTIVE',
        activationCode: null // Удаляем использованный код
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        studentCode: true,
        status: true,
        accessExpiresAt: true
      }
    })

    return NextResponse.json({
      message: 'Аккаунт успешно активирован',
      user: updatedUser
    })
  } catch (error) {
    console.error('Activation error:', error)
    return NextResponse.json(
      { error: 'Ошибка при активации' },
      { status: 500 }
    )
  }
}
