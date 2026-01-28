'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { Mic, Loader2, CheckCircle2 } from 'lucide-react'

export default function ActivatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState('')
  const [activated, setActivated] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.toUpperCase() })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка активации')
      }

      setActivated(true)
      toast({
        title: 'Успешно!',
        description: data.message
      })

      // Перенаправление через 2 секунды
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }

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
            <CardTitle>Активация аккаунта</CardTitle>
            <CardDescription>
              Введите код активации, полученный на email
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activated ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Аккаунт активирован!</h3>
                  <p className="text-muted-foreground">Перенаправление на страницу входа...</p>
                </div>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Код активации</Label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="Введите код (например: X7KP2M)"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      className="text-center text-2xl tracking-widest font-mono"
                      maxLength={8}
                    />
                    <p className="text-sm text-muted-foreground">
                      Код был отправлен на ваш email после одобрения регистрации
                    </p>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Активация...
                      </>
                    ) : (
                      'Активировать'
                    )}
                  </Button>
                </form>

                <div className="mt-4 text-center text-sm">
                  <Link href="/login" className="text-primary hover:underline">
                    Вернуться ко входу
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
