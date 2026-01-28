import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Video, Users, Calendar, Award, BookOpen } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mic className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Anidranium Academy
            </span>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Вход</Button>
            </Link>
            <Link href="/register">
              <Button>Регистрация</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Станьте профессиональным актёром озвучки
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Онлайн-академия озвучки и дубляжа с опытными педагогами, современными тренажёрами и удобной платформой обучения
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Начать обучение
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Что вы получите</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Video className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Видеоуроки</CardTitle>
                <CardDescription>
                  Профессиональные видеоуроки от опытных актёров озвучки
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Mic className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Тренажёры</CardTitle>
                <CardDescription>
                  Практикуйте дикцию, дыхание и артикуляцию с интерактивными упражнениями
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Домашние задания</CardTitle>
                <CardDescription>
                  Получайте обратную связь от педагогов по вашим работам
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Групповые занятия</CardTitle>
                <CardDescription>
                  Занимайтесь в малых группах до 3 человек для лучшего результата
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Гибкое расписание</CardTitle>
                <CardDescription>
                  Онлайн и офлайн занятия в удобное для вас время
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Сертификат</CardTitle>
                <CardDescription>
                  Получите сертификат о прохождении курса озвучки
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Готовы начать?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Зарегистрируйтесь сейчас и получите доступ к первому уроку бесплатно
          </p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-8 py-6">
              Регистрация
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2026 Anidranium Academy. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}
