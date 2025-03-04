"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, FileText, PlusCircle, BookOpen, CheckCircle } from "lucide-react"
import FormadorNavbar from "@/components/formador-navbar"

export default function FormadorDashboard() {
  const [attendanceRate, setAttendanceRate] = useState(78)

  return (
    <div className="flex min-h-screen flex-col">
      <FormadorNavbar />
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Panel de Formador</h2>
          <div className="flex items-center gap-2">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva Capacitación
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="mis-capacitaciones">Mis Capacitaciones</TabsTrigger>
            <TabsTrigger value="asistencia">Asistencia</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Mis Capacitaciones</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">5 activas, 3 completadas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Participantes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">124</div>
                  <p className="text-xs text-muted-foreground">En todas las capacitaciones</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Asistencia Promedio</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{attendanceRate}%</div>
                  <p className="text-xs text-muted-foreground">+2% desde el mes pasado</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Documentos Subidos</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32</div>
                  <p className="text-xs text-muted-foreground">+5 desde el mes pasado</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Próximas Capacitaciones</CardTitle>
                  <CardDescription>Programadas para los próximos 7 días</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Introducción a Python", date: "Mañana, 10:00 AM", attendees: 18 },
                      { name: "Desarrollo Web Avanzado", date: "Jueves, 2:00 PM", attendees: 24 },
                      { name: "Bases de Datos SQL", date: "Viernes, 9:00 AM", attendees: 12 },
                    ].map((training, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{training.name}</div>
                          <div className="text-sm text-muted-foreground">{training.date}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{training.attendees}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Asistencia Reciente</CardTitle>
                  <CardDescription>Últimas capacitaciones realizadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "JavaScript Básico", date: "Ayer, 10:00 AM", attendance: 85 },
                      { name: "Gestión de Proyectos", date: "Lunes, 2:00 PM", attendance: 92 },
                      { name: "Seguridad Web", date: "Viernes pasado, 9:00 AM", attendance: 76 },
                    ].map((training, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{training.name}</div>
                          <div className="text-sm">{training.attendance}%</div>
                        </div>
                        <div className="text-sm text-muted-foreground">{training.date}</div>
                        <Progress value={training.attendance} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mis-capacitaciones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mis Capacitaciones</CardTitle>
                <CardDescription>Gestiona tus capacitaciones activas y programadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Introducción a Python", status: "Activa", progress: 60, participants: 18 },
                    { name: "Desarrollo Web Avanzado", status: "Programada", progress: 0, participants: 24 },
                    { name: "Bases de Datos SQL", status: "Activa", progress: 30, participants: 12 },
                    { name: "JavaScript Básico", status: "Completada", progress: 100, participants: 15 },
                    { name: "Gestión de Proyectos", status: "Completada", progress: 100, participants: 22 },
                  ].map((training, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4">
                      <div className="space-y-1">
                        <div className="font-medium">{training.name}</div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                              training.status === "Activa"
                                ? "bg-green-100 text-green-700"
                                : training.status === "Programada"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {training.status === "Completada" && <CheckCircle className="mr-1 h-3 w-3" />}
                            {training.status}
                          </span>
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{training.participants} participantes</span>
                        </div>
                      </div>
                      <div className="space-y-1 text-right">
                        <Button variant="outline" size="sm">
                          Ver detalles
                        </Button>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{training.progress}%</span>
                          <Progress value={training.progress} className="h-2 w-20" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="asistencia" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Registro de Asistencia</CardTitle>
                <CardDescription>Gestiona la asistencia de tus capacitaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contenido de registro de asistencia</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Documentos</CardTitle>
                <CardDescription>Administra los materiales de tus capacitaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contenido de gestión de documentos</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

