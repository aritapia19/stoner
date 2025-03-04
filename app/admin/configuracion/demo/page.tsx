"use client"

import { useTheme } from "@/components/theme-provider"
import AdminNavbar from "@/components/admin-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Users, BookOpen, BarChart3, Calendar } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  const { theme } = useTheme()

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: theme.bgColor, color: theme.textColor }}>
      <div data-header>
        <AdminNavbar />
      </div>

      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Demostración de Tema</h2>
          <Link href="/admin/configuracion/marca">
            <Button>Volver a Configuración</Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Capacitaciones Activas</CardTitle>
              <BookOpen className="h-4 w-4" style={{ color: theme.primaryColor }} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs opacity-70">+2 desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Empleados Registrados</CardTitle>
              <Users className="h-4 w-4" style={{ color: theme.secondaryColor }} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs opacity-70">+15 desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Asistencia Promedio</CardTitle>
              <Calendar className="h-4 w-4" style={{ color: theme.primaryColor }} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82%</div>
              <p className="text-xs opacity-70">+4% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Finalización</CardTitle>
              <BarChart3 className="h-4 w-4" style={{ color: theme.secondaryColor }} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76%</div>
              <p className="text-xs opacity-70">-2% desde el mes pasado</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="botones" className="space-y-4">
          <TabsList>
            <TabsTrigger value="botones">Botones</TabsTrigger>
            <TabsTrigger value="tarjetas">Tarjetas</TabsTrigger>
            <TabsTrigger value="progreso">Progreso</TabsTrigger>
          </TabsList>

          <TabsContent value="botones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Botones</CardTitle>
                <CardDescription>Ejemplos de botones con el tema personalizado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button>Botón Primario</Button>
                  <Button variant="secondary">Botón Secundario</Button>
                  <Button variant="outline">Botón Outline</Button>
                  <Button variant="ghost">Botón Ghost</Button>
                  <Button variant="link">Botón Link</Button>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="sm">Pequeño</Button>
                  <Button>Normal</Button>
                  <Button size="lg">Grande</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tarjetas" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tarjeta Estándar</CardTitle>
                  <CardDescription>Ejemplo de tarjeta con el tema personalizado</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Este es un ejemplo de contenido dentro de una tarjeta. Las tarjetas son útiles para agrupar
                    información relacionada.
                  </p>
                </CardContent>
              </Card>

              <Card
                style={{
                  backgroundColor: `color-mix(in srgb, ${theme.primaryColor} 10%, ${theme.bgColor} 90%)`,
                  borderColor: theme.primaryColor,
                }}
              >
                <CardHeader>
                  <CardTitle>Tarjeta Destacada</CardTitle>
                  <CardDescription>Ejemplo de tarjeta destacada con el color primario</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Este es un ejemplo de contenido dentro de una tarjeta destacada. Utiliza el color primario para
                    resaltar información importante.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progreso" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Barras de Progreso</CardTitle>
                <CardDescription>Ejemplos de barras de progreso con el tema personalizado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Progreso 25%</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Progreso 50%</span>
                    <span>50%</span>
                  </div>
                  <Progress value={50} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Progreso 75%</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Progreso 100%</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

