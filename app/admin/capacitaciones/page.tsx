"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, PlusCircle, Filter, ArrowUpDown } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"

export default function CapacitacionesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const capacitaciones = [
    {
      id: 1,
      nombre: "Seguridad Informática",
      estado: "Activa",
      formador: "Carlos Méndez",
      participantes: 18,
      fechaInicio: "15/03/2025",
      fechaFin: "15/04/2025",
    },
    {
      id: 2,
      nombre: "Gestión del Tiempo",
      estado: "Activa",
      formador: "Ana Gómez",
      participantes: 24,
      fechaInicio: "10/03/2025",
      fechaFin: "10/04/2025",
    },
    {
      id: 3,
      nombre: "Liderazgo Efectivo",
      estado: "Programada",
      formador: "Roberto Sánchez",
      participantes: 12,
      fechaInicio: "20/04/2025",
      fechaFin: "20/05/2025",
    },
    {
      id: 4,
      nombre: "Desarrollo Web",
      estado: "Activa",
      formador: "María López",
      participantes: 15,
      fechaInicio: "05/03/2025",
      fechaFin: "05/04/2025",
    },
    {
      id: 5,
      nombre: "Python Básico",
      estado: "Completada",
      formador: "Juan Pérez",
      participantes: 20,
      fechaInicio: "01/02/2025",
      fechaFin: "01/03/2025",
    },
    {
      id: 6,
      nombre: "Excel Avanzado",
      estado: "Completada",
      formador: "Laura Martínez",
      participantes: 16,
      fechaInicio: "15/01/2025",
      fechaFin: "15/02/2025",
    },
  ]

  const filteredCapacitaciones = capacitaciones.filter(
    (cap) =>
      cap.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cap.formador.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col bg-zinc-900 text-zinc-100">
      <AdminNavbar />
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Gestión de Capacitaciones</h2>
            <p className="text-zinc-400 mt-1">Administra todas las capacitaciones de la plataforma</p>
          </div>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva Capacitación
          </Button>
        </div>

        <div className="grid gap-4">
          <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
                  <Input
                    type="search"
                    placeholder="Buscar capacitaciones..."
                    className="pl-8 bg-zinc-900/50 border-zinc-700 text-zinc-200 focus:border-yellow-400/50 focus:ring-yellow-400/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="todas" className="space-y-4">
            <TabsList className="bg-zinc-800 border border-zinc-700">
              <TabsTrigger
                value="todas"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
              >
                Todas
              </TabsTrigger>
              <TabsTrigger
                value="activas"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
              >
                Activas
              </TabsTrigger>
              <TabsTrigger
                value="programadas"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
              >
                Programadas
              </TabsTrigger>
              <TabsTrigger
                value="completadas"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
              >
                Completadas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="todas" className="space-y-4">
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-700">
                          <th className="text-left p-4 text-zinc-300 font-medium">
                            <div className="flex items-center gap-1 cursor-pointer hover:text-white">
                              Nombre <ArrowUpDown className="h-3 w-3" />
                            </div>
                          </th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Estado</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Formador</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Participantes</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Fecha Inicio</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Fecha Fin</th>
                          <th className="text-right p-4 text-zinc-300 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCapacitaciones.map((cap) => (
                          <tr key={cap.id} className="border-b border-zinc-700 hover:bg-zinc-800/70">
                            <td className="p-4 text-white font-medium">{cap.nombre}</td>
                            <td className="p-4">
                              <Badge
                                className={
                                  cap.estado === "Activa"
                                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                    : cap.estado === "Programada"
                                      ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                                      : "bg-zinc-500/20 text-zinc-400 hover:bg-zinc-500/30"
                                }
                              >
                                {cap.estado}
                              </Badge>
                            </td>
                            <td className="p-4 text-zinc-300">{cap.formador}</td>
                            <td className="p-4 text-zinc-300">{cap.participantes}</td>
                            <td className="p-4 text-zinc-300">{cap.fechaInicio}</td>
                            <td className="p-4 text-zinc-300">{cap.fechaFin}</td>
                            <td className="p-4 text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                              >
                                Ver detalles
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activas" className="space-y-4">
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardContent className="p-4">
                  <p className="text-zinc-300">Mostrando capacitaciones activas</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="programadas" className="space-y-4">
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardContent className="p-4">
                  <p className="text-zinc-300">Mostrando capacitaciones programadas</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completadas" className="space-y-4">
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardContent className="p-4">
                  <p className="text-zinc-300">Mostrando capacitaciones completadas</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

