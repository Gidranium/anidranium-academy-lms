import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'
import { generateStudentCode } from '@/lib/utils'
import { sendRegistrationNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, fullName, phone } = body

    // Проверка существования пользователя
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      )
    }

    // Хэширование пароля
    const hashedPassword = await hashPassword(password)

    // Генерация кода ученика
    let studentCode = generateStudentCode()
    let codeExists = await prisma.user.findUnique({ where: { studentCode } })
    
    while (codeExists) {
      studentCode = generateStudentCode()
      codeExists = await prisma.user.findUnique({ where: { studentCode } })
    }

    // Создание пользователя
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        phone,
        studentCode,
        status: 'PENDING'
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        studentCode: true,
        status: true,
        createdAt: true
      }
    })

    // Отправка уведомления админу
    const admins = await prisma.user.findMany({
      where: { role: 'ADMIN' },
      select: { email: true }
    })

    for (const admin of admins) {
      await sendRegistrationNotification(admin.email, user)
    }

    return NextResponse.json({
      message: 'Регистрация успешна. Ожидайте подтверждения.',
      user: {
        email: user.email,
        fullName: user.fullName,
        studentCode: user.studentCode
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Ошибка при регистрации' },
      { status: 500 }
    )
  }
}
