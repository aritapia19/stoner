"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart3, PieChart, LineChart, Download, Calendar } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"

export default function ReportesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-900 text-zinc-100">
      <AdminNavbar />
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Reportes y Estadísticas</h2>
            <p className="text-zinc-400 mt-1">Visualiza métricas detalladas de las capacitaciones</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
              <Calendar className="mr-2 h-4 w-4" />
              Periodo
            </Button>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="bg-zinc-800 border border-zinc-700">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="asistencia"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
            >
              Asistencia
            </TabsTrigger>
            <TabsTrigger
              value="evaluaciones"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
            >
              Evaluaciones
            </TabsTrigger>
            <TabsTrigger
              value="progreso"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
            >
              Progreso
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Total Capacitaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">35</div>
                  <div className="flex items-center mt-2">
                    <div className="text-xs text-green-400">+8% vs mes anterior</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Participantes Activos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">245</div>
                  <div className="flex items-center mt-2">
                    <div className="text-xs text-green-400">+15 nuevos este mes</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Asistencia Promedio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">82%</div>
                  <div className="flex items-center mt-2">
                    <div className="text-xs text-green-400">+4% vs mes anterior</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg">Tasa de Finalización</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white">76%</div>
                  <div className="flex items-center mt-2">
                    <div className="text-xs text-red-400">-2% vs mes anterior</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Capacitaciones por Departamento</CardTitle>
                    <PieChart className="h-4 w-4 text-yellow-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <div className="text-zinc-500 text-sm">Gráfico de distribución por departamento</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Tendencia de Participación</CardTitle>
                    <LineChart className="h-4 w-4 text-yellow-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <div className="text-zinc-500 text-sm">Gráfico de tendencia de participación</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Rendimiento por Capacitación</CardTitle>
                  <BarChart3 className="h-4 w-4 text-yellow-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Seguridad Informática", progress: 92, participantes: 18 },
                    { name: "Gestión del Tiempo", progress: 78, participantes: 24 },
                    { name: "Liderazgo Efectivo", progress: 65, participantes: 12 },
                    { name: "Desarrollo Web", progress: 88, participantes: 15 },
                    { name: "Python Básico", progress: 95, participantes: 20 },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-white">{item.name}</div>
                        <div className="text-sm text-zinc-400">{item.participantes} participantes</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={item.progress} className="h-2 flex-1" />
                        <span className="text-sm font-medium text-zinc-300">{item.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="asistencia" className="space-y-4">
            <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
              <CardContent className="p-4">
                <p className="text-zinc-300">Estadísticas detalladas de asistencia</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evaluaciones" className="space-y-4">
            <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
              <CardContent className="p-4">
                <p className="text-zinc-300">Resultados de evaluaciones</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progreso" className="space-y-4">
            <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
              <CardContent className="p-4">
                <p className="text-zinc-300">Métricas de progreso</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

