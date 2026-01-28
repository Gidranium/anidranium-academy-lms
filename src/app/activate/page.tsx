"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Key } from "lucide-react"

export default function ActivatePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при активации")
      }

      toast({
        title: "Аккаунт активирован!",
        description: "Теперь вы можете войти в систему"
      })

      setTimeout(() => {
        router.push("/login")
      }, 2000)
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
            <Key className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Активация аккаунта</CardTitle>
          <CardDescription className="text-center">
            Введите код активации, полученный на email
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Код активации</Label>
              <Input
                id="code"
                placeholder="X7KP2M"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                maxLength={8}
                className="text-center text-2xl font-bold tracking-widest"
                required
              />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-center text-blue-800">
                Код был отправлен на ваш email после одобрения регистрации администратором
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Активация..." : "Активировать"}
            </Button>
            <Link href="/login" className="text-sm text-center text-primary hover:underline">
              Вернуться к входу
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
