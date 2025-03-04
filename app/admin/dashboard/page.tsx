"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, FileText, PlusCircle, BookOpen } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"
import Link from "next/link"

export default function AdminDashboard() {
  const [progress, setProgress] = useState(68)

  return (
    <div className="flex min-h-screen flex-col bg-zinc-900 text-zinc-100">
      <AdminNavbar />
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white">Panel de Administración</h2>
          <div className="flex items-center gap-2">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva Capacitación
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-zinc-800 border border-zinc-700">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
            >
              Resumen
            </TabsTrigger>
            <TabsTrigger
              value="capacitaciones"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
            >
              Capacitaciones
            </TabsTrigger>
            <TabsTrigger
              value="empleados"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
            >
              Empleados
            </TabsTrigger>
            <TabsTrigger
              value="reportes"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
            >
              Reportes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/admin/capacitaciones">
                <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700 hover:bg-zinc-800/70 hover:border-yellow-400/30 transition-all cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-zinc-300">Capacitaciones Activas</CardTitle>
                    <BookOpen className="h-4 w-4 text-yellow-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">12</div>
                    <p className="text-xs text-zinc-400">+2 desde el mes pasado</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/empleados">
                <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700 hover:bg-zinc-800/70 hover:border-orange-400/30 transition-all cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-zinc-300">Empleados Registrados</CardTitle>
                    <Users className="h-4 w-4 text-orange-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">245</div>
                    <p className="text-xs text-zinc-400">+15 desde el mes pasado</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/asistencia">
                <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700 hover:bg-zinc-800/70 hover:border-yellow-400/30 transition-all cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-zinc-300">Asistencia Promedio</CardTitle>
                    <Calendar className="h-4 w-4 text-yellow-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">82%</div>
                    <p className="text-xs text-zinc-400">+4% desde el mes pasado</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/documentos">
                <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700 hover:bg-zinc-800/70 hover:border-orange-400/30 transition-all cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-zinc-300">Documentos Subidos</CardTitle>
                    <FileText className="h-4 w-4 text-orange-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">87</div>
                    <p className="text-xs text-zinc-400">+12 desde el mes pasado</p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Progreso del Plan Anual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-zinc-400">Progreso general</div>
                      <div className="font-medium text-white">{progress}%</div>
                    </div>
                    <Progress value={progress} className="h-2 bg-zinc-700" indicatorClassName="bg-yellow-400" />
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="space-y-1">
                        <div className="text-sm text-zinc-400">Completadas</div>
                        <div className="font-medium text-white">24/35</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-zinc-400">En progreso</div>
                        <div className="font-medium text-white">8</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-zinc-400">Pendientes</div>
                        <div className="font-medium text-white">3</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-3 bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Próximas Capacitaciones</CardTitle>
                  <CardDescription className="text-zinc-400">Programadas para los próximos 7 días</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Seguridad Informática", date: "Mañana, 10:00 AM", attendees: 18 },
                      { name: "Gestión del Tiempo", date: "Jueves, 2:00 PM", attendees: 24 },
                      { name: "Liderazgo Efectivo", date: "Viernes, 9:00 AM", attendees: 12 },
                    ].map((training, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">{training.name}</div>
                          <div className="text-sm text-zinc-400">{training.date}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-zinc-400" />
                          <span className="text-zinc-300">{training.attendees}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="capacitaciones" className="space-y-4">
            <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Gestión de Capacitaciones</CardTitle>
                <CardDescription className="text-zinc-400">
                  Administra todas las capacitaciones de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300">Contenido de gestión de capacitaciones</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="empleados" className="space-y-4">
            <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Gestión de Empleados</CardTitle>
                <CardDescription className="text-zinc-400">Administra los usuarios de la plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300">Contenido de gestión de empleados</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reportes" className="space-y-4">
            <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Reportes y Estadísticas</CardTitle>
                <CardDescription className="text-zinc-400">
                  Visualiza métricas detalladas de las capacitaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300">Contenido de reportes y estadísticas</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

