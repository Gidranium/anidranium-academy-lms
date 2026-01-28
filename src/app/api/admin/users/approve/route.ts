import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth'
import { generateActivationCode } from '@/lib/utils'
import { sendActivationCode } from '@/lib/email'

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
    const { userId, accessPeriod } = body // accessPeriod: 30, 90, 180, null (бессрочно)

    // Поиск пользователя
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 })
    }

    // Генерация кода активации
    let activationCode = generateActivationCode()
    let codeExists = await prisma.user.findUnique({ where: { activationCode } })
    
    while (codeExists) {
      activationCode = generateActivationCode()
      codeExists = await prisma.user.findUnique({ where: { activationCode } })
    }

    // Расчёт даты окончания доступа
    let accessExpiresAt: Date | null = null
    if (accessPeriod && accessPeriod > 0) {
      accessExpiresAt = new Date()
      accessExpiresAt.setDate(accessExpiresAt.getDate() + accessPeriod)
    }

    // Обновление пользователя
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        activationCode,
        accessExpiresAt
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        studentCode: true,
        activationCode: true,
        accessExpiresAt: true
      }
    })

    // Отправка кода на email
    await sendActivationCode(updatedUser.email, updatedUser.fullName, activationCode)

    return NextResponse.json({
      message: 'Пользователь одобрен, код отправлен',
      user: updatedUser
    })
  } catch (error) {
    console.error('Approval error:', error)
    return NextResponse.json(
      { error: 'Ошибка при одобрении' },
      { status: 500 }
    )
  }
}
