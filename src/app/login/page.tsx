"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Mic } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при входе")
      }

      toast({
        title: "Успешный вход",
        description: `Добро пожаловать, ${data.user.fullName}!`
      })

      // Редирект в зависимости от роли и статуса
      if (data.user.status === "PENDING") {
        router.push("/register/pending")
      } else if (data.user.role === "ADMIN" || data.user.role === "TEACHER") {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Mic className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Вход</CardTitle>
          <CardDescription className="text-center">
            Войдите в свой аккаунт Anidranium Academy
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Вход..." : "Войти"}
            </Button>
            <p className="text-sm text-center text-gray-600">
              Нет аккаунта?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Зарегистрироваться
              </Link>
            </p>
            <Link href="/activate" className="text-sm text-center text-primary hover:underline">
              Активировать аккаунт по коду
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
