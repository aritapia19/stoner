"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, FileText, Clock, CheckCircle2 } from "lucide-react"
import EmpleadoNavbar from "@/components/empleado-navbar"

export default function EmpleadoDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <EmpleadoNavbar />
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Mi Panel de Capacitaciones</h2>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="mis-capacitaciones">Mis Capacitaciones</TabsTrigger>
            <TabsTrigger value="calendario">Calendario</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Capacitaciones Activas</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">En progreso actualmente</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Próxima Capacitación</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Mañana</div>
                  <p className="text-xs text-muted-foreground">10:00 AM - Desarrollo Web</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Capacitaciones Completadas</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">De 12 asignadas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Documentos Disponibles</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">En todas tus capacitaciones</p>
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
                      { name: "Desarrollo Web", date: "Mañana, 10:00 AM", duration: "2 horas" },
                      { name: "Bases de Datos SQL", date: "Jueves, 2:00 PM", duration: "1.5 horas" },
                      { name: "Seguridad Informática", date: "Viernes, 9:00 AM", duration: "3 horas" },
                    ].map((training, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{training.name}</div>
                          <div className="text-sm text-muted-foreground">{training.date}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{training.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mi Progreso</CardTitle>
                  <CardDescription>Capacitaciones en curso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "JavaScript Avanzado", progress: 75, modules: "3/4" },
                      { name: "Gestión de Proyectos", progress: 40, modules: "2/5" },
                      { name: "Desarrollo Ágil", progress: 20, modules: "1/5" },
                    ].map((training, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{training.name}</div>
                          <div className="text-sm">{training.progress}%</div>
                        </div>
                        <div className="text-sm text-muted-foreground">Módulos completados: {training.modules}</div>
                        <Progress value={training.progress} className="h-2" />
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
                <CardDescription>Todas tus capacitaciones asignadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "JavaScript Avanzado", status: "En progreso", progress: 75, date: "Finaliza: 15/04/2025" },
                    { name: "Gestión de Proyectos", status: "En progreso", progress: 40, date: "Finaliza: 22/04/2025" },
                    { name: "Desarrollo Ágil", status: "En progreso", progress: 20, date: "Finaliza: 30/04/2025" },
                    { name: "HTML y CSS", status: "Completada", progress: 100, date: "Finalizada: 10/03/2025" },
                    { name: "Python Básico", status: "Completada", progress: 100, date: "Finalizada: 28/02/2025" },
                    { name: "Desarrollo Web", status: "Pendiente", progress: 0, date: "Inicia: Mañana" },
                  ].map((training, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4">
                      <div className="space-y-1">
                        <div className="font-medium">{training.name}</div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              training.status === "En progreso"
                                ? "default"
                                : training.status === "Completada"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {training.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{training.date}</span>
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

          <TabsContent value="calendario" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Calendario de Capacitaciones</CardTitle>
                <CardDescription>Visualiza tus capacitaciones programadas</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contenido del calendario de capacitaciones</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentos de Capacitación</CardTitle>
                <CardDescription>Accede a los materiales de tus capacitaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Contenido de documentos de capacitación</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

