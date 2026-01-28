import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic, Video, Users, BookOpen, Calendar, Award } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Mic className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Anidranium Academy</h1>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Вход</Button>
            </Link>
            <Link href="/register">
              <Button>Регистрация</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Станьте профессиональным актёром озвучки</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Обучайтесь у практикующих мастеров индустрии. Развивайте свой голос, технику и актёрское мастерство.
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
          <h3 className="text-3xl font-bold text-center mb-12">Что вы получите</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Video className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Видеоуроки</CardTitle>
                <CardDescription>
                  Структурированные курсы от базового до продвинутого уровня
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Практические задания</CardTitle>
                <CardDescription>
                  Отрабатывайте навыки с проверкой от педагогов
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Групповые занятия</CardTitle>
                <CardDescription>
                  Работайте в команде и получайте обратную связь
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Mic className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Тренажёры</CardTitle>
                <CardDescription>
                  Упражнения для развития дикции, дыхания и артикуляции
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Calendar className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Удобное расписание</CardTitle>
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
                  Подтвердите свою квалификацию после окончания курса
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">Готовы начать своё путешествие?</h3>
          <p className="text-xl mb-8 text-gray-600">
            Зарегистрируйтесь прямо сейчас и получите доступ к пробным урокам
          </p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-8 py-6">
              Зарегистрироваться бесплатно
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 Anidranium Academy. Все права защищены.</p>
        </div>
      </footer>
    </div>
  )
}
