"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Mail } from "lucide-react";

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Ожидайте подтверждения</CardTitle>
          <CardDescription>
            Ваша регистрация успешно отправлена
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-medium mb-2">Что дальше?</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Администратор проверит вашу заявку</li>
                  <li>При одобрении вы получите код активации на email</li>
                  <li>Введите код на странице активации</li>
                  <li>Получите доступ ко всем курсам</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Время ожидания:</strong> обычно до 24 часов.<br />
              Проверяйте папку «Спам» и «Нежелательные».
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button asChild variant="outline" className="w-full">
              <Link href="/activate">
                У меня есть код активации
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/">
                На главную
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
