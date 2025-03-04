"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, Upload, FolderPlus, Clock, Download, Eye, MoreHorizontal } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"

export default function DocumentosPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const documentos = [
    {
      id: 1,
      nombre: "Manual de Seguridad Informática.pdf",
      tipo: "PDF",
      tamaño: "2.4 MB",
      capacitacion: "Seguridad Informática",
      fechaSubida: "15/03/2025",
      autor: "Carlos Méndez",
    },
    {
      id: 2,
      nombre: "Presentación Gestión del Tiempo.pptx",
      tipo: "PPTX",
      tamaño: "5.1 MB",
      capacitacion: "Gestión del Tiempo",
      fechaSubida: "10/03/2025",
      autor: "Ana Gómez",
    },
    {
      id: 3,
      nombre: "Ejercicios de Liderazgo.docx",
      tipo: "DOCX",
      tamaño: "1.2 MB",
      capacitacion: "Liderazgo Efectivo",
      fechaSubida: "08/03/2025",
      autor: "Roberto Sánchez",
    },
    {
      id: 4,
      nombre: "Guía de HTML y CSS.pdf",
      tipo: "PDF",
      tamaño: "3.7 MB",
      capacitacion: "Desarrollo Web",
      fechaSubida: "05/03/2025",
      autor: "María López",
    },
    {
      id: 5,
      nombre: "Ejemplos de código Python.zip",
      tipo: "ZIP",
      tamaño: "8.2 MB",
      capacitacion: "Python Básico",
      fechaSubida: "01/03/2025",
      autor: "Juan Pérez",
    },
    {
      id: 6,
      nombre: "Plantillas de Excel.xlsx",
      tipo: "XLSX",
      tamaño: "1.8 MB",
      capacitacion: "Excel Avanzado",
      fechaSubida: "15/02/2025",
      autor: "Laura Martínez",
    },
  ]

  const filteredDocumentos = documentos.filter(
    (doc) =>
      doc.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.capacitacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.autor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col bg-zinc-900 text-zinc-100">
      <AdminNavbar />
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Gestión de Documentos</h2>
            <p className="text-zinc-400 mt-1">Administra los materiales de capacitación</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900">
              <Upload className="mr-2 h-4 w-4" />
              Subir Documento
            </Button>
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
              <FolderPlus className="mr-2 h-4 w-4" />
              Nueva Carpeta
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
                <Input
                  type="search"
                  placeholder="Buscar documentos..."
                  className="pl-8 bg-zinc-900/50 border-zinc-700 text-zinc-200 focus:border-yellow-400/50 focus:ring-yellow-400/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                value="recientes"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
              >
                Recientes
              </TabsTrigger>
              <TabsTrigger
                value="por-capacitacion"
                className="data-[state=active]:bg-yellow-400 data-[state=active]:text-zinc-900"
              >
                Por Capacitación
              </TabsTrigger>
            </TabsList>

            <TabsContent value="todos" className="space-y-4">
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-700">
                          <th className="text-left p-4 text-zinc-300 font-medium">Nombre</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Tipo</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Tamaño</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Capacitación</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Fecha</th>
                          <th className="text-left p-4 text-zinc-300 font-medium">Autor</th>
                          <th className="text-right p-4 text-zinc-300 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDocumentos.map((doc) => (
                          <tr key={doc.id} className="border-b border-zinc-700 hover:bg-zinc-800/70">
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-yellow-400" />
                                <span className="text-white font-medium">{doc.nombre}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge className="bg-zinc-700 text-zinc-300 hover:bg-zinc-600">{doc.tipo}</Badge>
                            </td>
                            <td className="p-4 text-zinc-300">{doc.tamaño}</td>
                            <td className="p-4 text-zinc-300">{doc.capacitacion}</td>
                            <td className="p-4 text-zinc-300">{doc.fechaSubida}</td>
                            <td className="p-4 text-zinc-300">{doc.autor}</td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
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

            <TabsContent value="recientes" className="space-y-4">
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Clock className="h-4 w-4 text-yellow-400" />
                    <span>Mostrando documentos subidos en los últimos 7 días</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="por-capacitacion" className="space-y-4">
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardContent className="p-4">
                  <p className="text-zinc-300">Selecciona una capacitación para ver sus documentos</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

