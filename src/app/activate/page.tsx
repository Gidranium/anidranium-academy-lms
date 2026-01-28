"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Key } from "lucide-react";

export default function ActivatePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.toUpperCase() })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка активации");
      }

      toast({
        title: "Успешно!",
        description: data.message
      });

      setTimeout(() => router.push("/login"), 1500);
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <Link href="/" className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            На главную
          </Link>
          <div className="flex items-center gap-2">
            <Key className="w-6 h-6 text-purple-600" />
            <CardTitle className="text-2xl font-bold">Активация аккаунта</CardTitle>
          </div>
          <CardDescription>
            Введите код активации, который вы получили на email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Код активации</Label>
              <Input
                id="code"
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="X7KP2M"
                className="text-center text-2xl font-mono tracking-widest"
                maxLength={8}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Активация..." : "Активировать"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Не получили код?</strong><br />
              Проверьте папку «Спам» или «Нежелательные». Если код так и не пришел, свяжитесь с администрацией.
            </p>
          </div>

          <div className="mt-4 text-center text-sm">
            Уже активировали?{" "}
            <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
              Войти
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
