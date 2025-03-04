"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, BarChart3 } from "lucide-react"
import LoginDrawer from "@/components/login-drawer"
import Link from "next/link"

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-zinc-100 relative overflow-hidden">
      {/* Bokeh effect background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bokeh-bg"></div>
      </div>

      <header className="relative z-10 bg-zinc-900/80 backdrop-blur-md py-4 px-6 border-b border-zinc-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-400">STONER</h1>
          <div className="space-x-4">
            <Button
              variant="outline"
              className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10"
              onClick={() => setIsLoginOpen(true)}
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        <section className="py-20">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-6 text-white">Plataforma de Gestión de Capacitaciones</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
              Gestiona, monitorea y optimiza los programas de capacitación de tu empresa con nuestra plataforma
              integral.
            </p>
            <Button
              size="lg"
              className="gap-2 bg-yellow-400 hover:bg-yellow-500 text-zinc-900"
              onClick={() => setIsLoginOpen(true)}
            >
              Comenzar ahora <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Características Principales</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/admin/documentos" className="block">
                <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 rounded-xl p-6 backdrop-blur-sm border border-yellow-400/20 hover:border-yellow-400/40 transition-all hover:shadow-lg hover:shadow-yellow-400/10">
                  <div className="bg-yellow-400/10 p-3 rounded-full w-fit mb-4">
                    <BookOpen className="h-6 w-6 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">Gestión de Contenidos</h3>
                  <p className="text-zinc-400">
                    Sube y organiza materiales de capacitación para que tus empleados accedan fácilmente.
                  </p>
                </div>
              </Link>
              <Link href="/admin/empleados" className="block">
                <div className="bg-gradient-to-br from-orange-400/20 to-orange-400/5 rounded-xl p-6 backdrop-blur-sm border border-orange-400/20 hover:border-orange-400/40 transition-all hover:shadow-lg hover:shadow-orange-400/10">
                  <div className="bg-orange-400/10 p-3 rounded-full w-fit mb-4">
                    <Users className="h-6 w-6 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-orange-400">Control de Asistencia</h3>
                  <p className="text-zinc-400">
                    Registra y monitorea la asistencia a las capacitaciones con informes detallados.
                  </p>
                </div>
              </Link>
              <Link href="/admin/reportes" className="block">
                <div className="bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 rounded-xl p-6 backdrop-blur-sm border border-yellow-400/20 hover:border-yellow-400/40 transition-all hover:shadow-lg hover:shadow-yellow-400/10">
                  <div className="bg-yellow-400/10 p-3 rounded-full w-fit mb-4">
                    <BarChart3 className="h-6 w-6 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">Métricas y Objetivos</h3>
                  <p className="text-zinc-400">
                    Visualiza el progreso de tus programas de capacitación con respecto a la planificación.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 bg-zinc-900/80 backdrop-blur-md py-6 border-t border-zinc-800">
        <div className="container mx-auto px-4 text-center text-zinc-500">
          <p>© 2025 STONER. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Login drawer */}
      <LoginDrawer isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  )
}

