"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Users, Clock, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function JoinSessionPage({ params }: { params: { code: string } }) {
  const [joined, setJoined] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [sessionInfo, setSessionInfo] = useState<any>(null)

  useEffect(() => {
    // Simular la carga de información de la sesión
    const mockSessionInfo = {
      name: "Seguridad Informática - Módulo 2",
      formador: "Carlos Méndez",
      attendees: 4,
      expectedAttendees: 20,
      startedAt: "Hace 5 minutos",
    }

    setSessionInfo(mockSessionInfo)
  }, [])

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simular conexión a la sesión
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setJoined(true)
    } catch (err) {
      setError("No se pudo unir a la sesión. Verifica el código e intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  if (!sessionInfo) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-900 text-zinc-100 p-4">
        <Card className="w-full max-w-md bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Cargando información de la sesión...</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 text-zinc-100 p-4">
      {/* Bokeh effect background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bokeh-bg"></div>
      </div>

      <Card className="w-full max-w-md bg-zinc-800/50 backdrop-blur-sm border-zinc-700 relative z-10">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <div className="bg-yellow-400/10 p-3 rounded-full w-fit mx-auto">
              <Users className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <CardTitle className="text-white text-xl">{sessionInfo.name}</CardTitle>
          <CardDescription className="text-zinc-400 mt-2">
            Código de sesión: <span className="font-mono text-yellow-400">{params.code}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {joined ? (
            <div className="text-center space-y-4">
              <div className="bg-green-500/20 text-green-400 p-4 rounded-lg">
                <CheckCircle className="h-12 w-12 mx-auto mb-2" />
                <p className="font-medium">¡Te has unido a la sesión correctamente!</p>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Formador:</span>
                  <span className="text-zinc-200">{sessionInfo.formador}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Participantes:</span>
                  <Badge className="bg-yellow-500/20 text-yellow-400">
                    <Users className="mr-1 h-3 w-3" />
                    {sessionInfo.attendees + 1}/{sessionInfo.expectedAttendees}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Inicio:</span>
                  <span className="text-zinc-200">
                    <Clock className="inline-block mr-1 h-3 w-3" />
                    {sessionInfo.startedAt}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-700">
                <p className="text-zinc-400 text-sm">
                  Mantén esta ventana abierta para que tu asistencia sea registrada correctamente.
                </p>
              </div>
            </div>
          ) : (
            <div>
              {error && (
                <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="mb-4 p-3 bg-yellow-500/10 rounded-lg">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 border border-zinc-700">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={sessionInfo.formador} />
                    <AvatarFallback className="bg-zinc-800 text-yellow-400">
                      {sessionInfo.formador
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-zinc-400">Formador</p>
                    <p className="text-zinc-200 font-medium">{sessionInfo.formador}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleJoin} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-zinc-300">
                    Nombre completo
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ingresa tu nombre"
                    className="bg-zinc-900/50 border-zinc-700 text-zinc-200 focus:border-yellow-400/50 focus:ring-yellow-400/20"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-zinc-300">
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ingresa tu correo"
                    className="bg-zinc-900/50 border-zinc-700 text-zinc-200 focus:border-yellow-400/50 focus:ring-yellow-400/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-zinc-900"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-zinc-900 mr-2"></div>
                      Uniéndose...
                    </>
                  ) : (
                    "Unirse a la sesión"
                  )}
                </Button>
              </form>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t border-zinc-700 pt-4">
          <p className="text-xs text-zinc-500">© 2025 STONER. Plataforma de Gestión de Capacitaciones</p>
        </CardFooter>
      </Card>
    </div>
  )
}

