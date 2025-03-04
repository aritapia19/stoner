"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Calendar, CheckCircle, XCircle, Clock } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"

export default function AsistenciaPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const registros = [
    {
      id: 1,
      empleado: "Ana García",
      capacitacion: "Seguridad Informática",
      fecha: "15/03/2025",
      hora: "10:00 AM",
      estado: "Presente",
      formador: "Carlos Méndez",
    },
    {
      id: 2,
      empleado: "Miguel Sánchez",
      capacitacion: "Seguridad Informática",
      fecha: "15/03/2025",
      hora: "10:00 AM",
      estado: "Ausente",
      formador: "Carlos Méndez",
    },
    {
      id: 3,
      empleado: "Sofía López",
      capacitacion: "Seguridad Informática",
      fecha: "15/03/2025",
      hora: "10:00 AM",
      estado: "Presente",
      formador: "Carlos Méndez",
    },
    {
      id: 4,
      empleado: "Ana García",
      capacitacion: "Gestión del Tiempo",
      fecha: "14/03/2025",
      hora: "2:00 PM",
      estado: "Presente",
      formador: "Ana Gómez",
    },
    {
      id: 5,
      empleado: "Javier Pérez",
      capacitacion: "Gestión del Tiempo",
      fecha: "14/03/2025",
      hora: "2:00 PM",
      estado: "Tarde",
      formador: "Ana Gómez",
    },
    {
      id: 6,
      empleado: "Laura Martínez",
      capacitacion: "Gestión del Tiempo",
      fecha: "14/03/2025",
      hora: "2:00 PM",
      estado: "Presente",
      formador: "Ana Gómez",
    },
  ]

  const filteredRegistros = registros.filter(
    (reg) =>
      reg.empleado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.capacitacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.formador.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col bg-zinc-900 text-zinc-100">
      <AdminNavbar />
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Control de Asistencia</h2>
            <p className="text-zinc-400 mt-1">Gestiona la asistencia a las capacitaciones</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900">
              <Calendar className="mr-2 h-4 w-4" />
              Registrar Asistencia
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
                  <Input
                    type="search"
                    placeholder="Buscar registros..."
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

          <Tabs defaultValue="todos" className="space-y-4">
            <TabsList className="bg-zinc-800 border border-zinc-700">
              <TabsTrigger
                value="todos"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
              >
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="presentes"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
              >
                Presentes
              </TabsTrigger>
              <TabsTrigger
                value="ausentes"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
              >
                Ausentes
              </TabsTrigger>
              <TabsTrigger
                value="tarde"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
              >
                Tarde
              </TabsTrigger>
            </TabsList>

            <TabsContent value="todos" className="space-y-4">
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-700">
                          <th className="text-left p-4 text-zinc-300 font-medium">Empleado</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Capacitación</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Fecha</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Hora</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Estado</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Formador</th>
                          <th className="text-right p-4 text-zinc-300 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRegistros.map((reg) => (
                          <tr key={reg.id} className="border-b border-zinc-700 hover:bg-zinc-800/70">
                            <td className="p-4 text-white font-medium">{reg.empleado}</td>
                            <td className="p-4 text-zinc-300">{reg.capacitacion}</td>
                            <td className="p-4 text-zinc-300">{reg.fecha}</td>
                            <td className="p-4 text-zinc-300">{reg.hora}</td>
                            <td className="p-4">
                              <Badge
                                className={
                                  reg.estado === "Presente"
                                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                    : reg.estado === "Ausente"
                                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                      : "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                                }
                              >
                                {reg.estado === "Presente" && <CheckCircle className="mr-1 h-3 w-3" />}
                                {reg.estado === "Ausente" && <XCircle className="mr-1 h-3 w-3" />}
                                {reg.estado === "Tarde" && <Clock className="mr-1 h-3 w-3" />}
                                {reg.estado}
                              </Badge>
                            </td>
                            <td className="p-4 text-zinc-300">{reg.formador}</td>
                            <td className="p-4 text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                              >
                                Editar
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

            <TabsContent value="presentes" className="space-y-4">
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardContent className="p-4">
                  <p className="text-zinc-300">Mostrando solo registros de presentes</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ausentes" className="space-y-4">
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardContent className="p-4">
                  <p className="text-zinc-300">Mostrando solo registros de ausentes</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tarde" className="space-y-4">
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardContent className="p-4">
                  <p className="text-zinc-300">Mostrando solo registros de llegadas tarde</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

