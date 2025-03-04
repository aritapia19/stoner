"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, Filter, ArrowUpDown, MoreHorizontal } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function EmpleadosPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const empleados = [
    {
      id: 1,
      nombre: "Ana García",
      email: "ana.garcia@empresa.com",
      rol: "Empleado",
      departamento: "Marketing",
      capacitaciones: 4,
      ultimoAcceso: "Hoy, 10:30 AM",
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      email: "carlos.rodriguez@empresa.com",
      rol: "Formador",
      departamento: "Tecnología",
      capacitaciones: 2,
      ultimoAcceso: "Ayer, 15:45 PM",
    },
    {
      id: 3,
      nombre: "Laura Martínez",
      email: "laura.martinez@empresa.com",
      rol: "Administrador",
      departamento: "Recursos Humanos",
      capacitaciones: 0,
      ultimoAcceso: "Hoy, 09:15 AM",
    },
    {
      id: 4,
      nombre: "Miguel Sánchez",
      email: "miguel.sanchez@empresa.com",
      rol: "Empleado",
      departamento: "Ventas",
      capacitaciones: 3,
      ultimoAcceso: "Hace 3 días",
    },
    {
      id: 5,
      nombre: "Sofía López",
      email: "sofia.lopez@empresa.com",
      rol: "Empleado",
      departamento: "Finanzas",
      capacitaciones: 5,
      ultimoAcceso: "Hoy, 11:20 AM",
    },
    {
      id: 6,
      nombre: "Javier Pérez",
      email: "javier.perez@empresa.com",
      rol: "Formador",
      departamento: "Operaciones",
      capacitaciones: 1,
      ultimoAcceso: "Ayer, 14:10 PM",
    },
  ]

  const filteredEmpleados = empleados.filter(
    (emp) =>
      emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.departamento.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col bg-zinc-900 text-zinc-100">
      <AdminNavbar />
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Gestión de Empleados</h2>
            <p className="text-zinc-400 mt-1">Administra los usuarios de la plataforma</p>
          </div>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900">
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Empleado
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
                    placeholder="Buscar empleados..."
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
                value="empleados"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
              >
                Empleados
              </TabsTrigger>
              <TabsTrigger
                value="formadores"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
              >
                Formadores
              </TabsTrigger>
              <TabsTrigger
                value="administradores"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
              >
                Administradores
              </TabsTrigger>
            </TabsList>

            <TabsContent value="todos" className="space-y-4">
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
                          <th className="text-left p-4 text-zinc-300 font-medium">Email</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Rol</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Departamento</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Capacitaciones</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Último Acceso</th>
                          <th className="text-right p-4 text-zinc-300 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEmpleados.map((emp) => (
                          <tr key={emp.id} className="border-b border-zinc-700 hover:bg-zinc-800/70">
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 border border-zinc-700">
                                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={emp.nombre} />
                                  <AvatarFallback className="bg-zinc-800 text-yellow-400">
                                    {emp.nombre
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-white font-medium">{emp.nombre}</span>
                              </div>
                            </td>
                            <td className="p-4 text-zinc-300">{emp.email}</td>
                            <td className="p-4">
                              <Badge
                                className={
                                  emp.rol === "Administrador"
                                    ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                                    : emp.rol === "Formador"
                                      ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                                      : "bg-zinc-500/20 text-zinc-400 hover:bg-zinc-500/30"
                                }
                              >
                                {emp.rol}
                              </Badge>
                            </td>
                            <td className="p-4 text-zinc-300">{emp.departamento}</td>
                            <td className="p-4 text-zinc-300">{emp.capacitaciones}</td>
                            <td className="p-4 text-zinc-300">{emp.ultimoAcceso}</td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="empleados" className="space-y-4">
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardContent className="p-4">
                  <p className="text-zinc-300">Mostrando solo empleados</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="formadores" className="space-y-4">
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardContent className="p-4">
                  <p className="text-zinc-300">Mostrando solo formadores</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="administradores" className="space-y-4">
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardContent className="p-4">
                  <p className="text-zinc-300">Mostrando solo administradores</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

