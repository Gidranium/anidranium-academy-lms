import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

export default function PendingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Clock className="h-16 w-16 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl text-center">Ожидание подтверждения</CardTitle>
          <CardDescription className="text-center">
            Ваша регистрация успешно отправлена!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-center">
              Администратор рассмотрит вашу заявку в ближайшее время. 
              После одобрения вы получите код активации на указанный email.
            </p>
          </div>
          <div className="pt-4">
            <Link href="/" className="block">
              <Button variant="outline" className="w-full">
                Вернуться на главную
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
