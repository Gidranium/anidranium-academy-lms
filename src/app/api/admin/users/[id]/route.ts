import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const { role, status, accessPeriod } = body

    const updateData: any = {}
    if (role) updateData.role = role
    if (status) updateData.status = status
    
    // Обновление срока доступа
    if (accessPeriod !== undefined) {
      if (accessPeriod === null || accessPeriod === 0) {
        updateData.accessExpiresAt = null
      } else {
        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + accessPeriod)
        updateData.accessExpiresAt = expiresAt
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        status: true,
        accessExpiresAt: true
      }
    })

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json(
      { error: 'Ошибка при обновлении' },
      { status: 500 }
    )
  }
}
