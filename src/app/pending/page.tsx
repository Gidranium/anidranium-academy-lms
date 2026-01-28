'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Mail, Mic } from 'lucide-react'

export default function PendingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <Mic className="h-10 w-10 text-primary" />
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Anidranium
            </span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Clock className="h-16 w-16 text-yellow-500" />
            </div>
            <CardTitle className="text-center">Ожидание подтверждения</CardTitle>
            <CardDescription className="text-center">
              Ваша регистрация успешно отправлена
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Что дальше?</p>
                  <p className="text-sm text-muted-foreground">
                    Администратор рассмотрит вашу заявку и отправит код активации на указанный email
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Проверка заявки обычно занимает до 24 часов</p>
              <p>• Код активации придёт на ваш email</p>
              <p>• После получения кода, активируйте аккаунт на странице активации</p>
            </div>

            <div className="pt-4 flex flex-col space-y-2">
              <Link href="/activate">
                <Button className="w-full">У меня уже есть код</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="w-full">Вернуться ко входу</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
