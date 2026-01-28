import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Mic, Users, Video } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Anidranium Academy
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Академия озвучки и дубляжа
            </p>
            <p className="text-lg mb-10 text-purple-50">
              Профессиональное обучение озвучке аниме, фильмов и игр. Онлайн и офлайн форматы, опытные преподаватели, индивидуальный подход.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
                <Link href="/register">
                  Начать обучение
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link href="/login">
                  Войти
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Преимущества обучения</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Video className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Видеоуроки</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Структурированные курсы с видеоматериалами от профессиональных актеров дубляжа
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Mic className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Практика</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Домашние задания с записью озвучки и профессиональной обратной связью
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Групповые занятия</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Онлайн и офлайн занятия в малых группах для максимального внимания
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <GraduationCap className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Тренажеры</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Интерактивные упражнения для развития дикции, дыхания и артикуляции
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Готовы начать?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Зарегистрируйтесь сейчас и получите доступ к курсам после подтверждения администратором
          </p>
          <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
            <Link href="/register">
              Зарегистрироваться
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 Anidranium Academy. Все права защищены.</p>
          <p className="mt-2 text-sm text-gray-400">
            Платформа для обучения озвучке и дубляжу аниме
          </p>
        </div>
      </footer>
    </div>
  );
}
