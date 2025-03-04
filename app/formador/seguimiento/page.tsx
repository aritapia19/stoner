"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Users, Copy, CheckCircle, Clock, Play, UserPlus, CheckCheck, XCircle, AlertCircle } from "lucide-react"
import FormadorNavbar from "@/components/formador-navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

export default function SeguimientoPage() {
  const [activeSession, setActiveSession] = useState<boolean>(false)
  const [sessionCode, setSessionCode] = useState<string>("")
  const [expectedAttendees, setExpectedAttendees] = useState<number>(0)
  const [attendees, setAttendees] = useState<any[]>([])
  const [sessionName, setSessionName] = useState<string>("")
  const [copied, setCopied] = useState<boolean>(false)

  // Simular la creación de una sesión
  const createSession = () => {
    // Generar un código aleatorio de 6 caracteres
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    setSessionCode(code)
    setActiveSession(true)

    // Simular participantes que se unen gradualmente
    const mockAttendees = [
      { id: 1, name: "Ana García", email: "ana.garcia@empresa.com", status: "online", joinedAt: "Hace 2 min" },
      { id: 2, name: "Miguel Sánchez", email: "miguel.sanchez@empresa.com", status: "online", joinedAt: "Hace 1 min" },
      { id: 3, name: "Sofía López", email: "sofia.lopez@empresa.com", status: "online", joinedAt: "Hace 30 seg" },
    ]

    setAttendees(mockAttendees)

    // Simular más participantes que se unen después de un tiempo
    setTimeout(() => {
      setAttendees((prev) => [
        ...prev,
        { id: 4, name: "Carlos Rodríguez", email: "carlos.rodriguez@empresa.com", status: "online", joinedAt: "Ahora" },
      ])
    }, 5000)

    setTimeout(() => {
      setAttendees((prev) => [
        ...prev,
        { id: 5, name: "Laura Martínez", email: "laura.martinez@empresa.com", status: "online", joinedAt: "Ahora" },
      ])
    }, 10000)
  }

  // Copiar el enlace al portapapeles
  const copyLink = () => {
    const sessionLink = `https://stoner.com/join/${sessionCode}`
    navigator.clipboard.writeText(sessionLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Finalizar la sesión
  const endSession = () => {
    setActiveSession(false)
    setSessionCode("")
    setAttendees([])
  }

  // Registrar asistencia
  const registerAttendance = () => {
    // Aquí se implementaría la lógica para guardar la asistencia en la base de datos
    alert("Asistencia registrada correctamente para " + attendees.length + " participantes")
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-900 text-zinc-100">
      <FormadorNavbar />
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Seguimiento Online</h2>
            <p className="text-zinc-400 mt-1">Monitorea la asistencia a tus capacitaciones en tiempo real</p>
          </div>
          {!activeSession && (
            <Button
              className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900"
              onClick={() => document.getElementById("create-session-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Play className="mr-2 h-4 w-4" />
              Iniciar Seguimiento
            </Button>
          )}
        </div>

        {activeSession ? (
          <div className="grid gap-4">
            <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <Badge className="mb-2 bg-green-500/20 text-green-400 hover:bg-green-500/30">
                      <Clock className="mr-1 h-3 w-3" /> En vivo
                    </Badge>
                    <CardTitle className="text-white text-xl">{sessionName}</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Código de sesión: <span className="font-mono text-yellow-400">{sessionCode}</span>
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      onClick={copyLink}
                    >
                      {copied ? (
                        <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="mr-2 h-4 w-4" />
                      )}
                      {copied ? "¡Copiado!" : "Copiar enlace"}
                    </Button>
                    <Button variant="destructive" onClick={endSession}>
                      Finalizar sesión
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-yellow-400/10 p-3 rounded-full">
                        <Users className="h-6 w-6 text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-sm text-zinc-400">Participantes conectados</div>
                        <div className="text-2xl font-bold text-white">
                          {attendees.length} / {expectedAttendees}
                        </div>
                      </div>
                    </div>
                    <Progress
                      value={expectedAttendees > 0 ? (attendees.length / expectedAttendees) * 100 : 0}
                      className="h-2 w-full md:w-64"
                    />
                  </div>

                  <Separator className="bg-zinc-700" />

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Participantes</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-zinc-700">
                            <th className="text-left p-3 text-zinc-300 font-medium">Nombre</th>
                            <th className="text-left p-3 text-zinc-300 font-medium">Email</th>
                            <th className="text-left p-3 text-zinc-300 font-medium">Estado</th>
                            <th className="text-left p-3 text-zinc-300 font-medium">Se unió</th>
                            <th className="text-right p-3 text-zinc-300 font-medium">Asistencia</th>
                          </tr>
                        </thead>
                        <tbody>
                          {attendees.map((attendee) => (
                            <tr key={attendee.id} className="border-b border-zinc-700 hover:bg-zinc-800/70">
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8 border border-zinc-700">
                                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={attendee.name} />
                                    <AvatarFallback className="bg-zinc-800 text-yellow-400">
                                      {attendee.name
                                        .split(" ")
                                        .map((n: string) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-white font-medium">{attendee.name}</span>
                                </div>
                              </td>
                              <td className="p-3 text-zinc-300">{attendee.email}</td>
                              <td className="p-3">
                                <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                                  <CheckCircle className="mr-1 h-3 w-3" /> {attendee.status}
                                </Badge>
                              </td>
                              <td className="p-3 text-zinc-300">{attendee.joinedAt}</td>
                              <td className="p-3 text-right">
                                <Switch defaultChecked />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t border-zinc-700 pt-4">
                <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invitar participantes
                </Button>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900" onClick={registerAttendance}>
                  <CheckCheck className="mr-2 h-4 w-4" />
                  Registrar asistencia
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <div className="grid gap-4">
            <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Sesiones recientes</CardTitle>
                <CardDescription className="text-zinc-400">
                  Historial de tus últimas sesiones de seguimiento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      name: "Seguridad Informática - Módulo 1",
                      date: "15/03/2025",
                      attendees: 18,
                      expected: 20,
                    },
                    {
                      id: 2,
                      name: "Gestión del Tiempo - Introducción",
                      date: "10/03/2025",
                      attendees: 22,
                      expected: 24,
                    },
                    { id: 3, name: "Desarrollo Web - HTML y CSS", date: "05/03/2025", attendees: 15, expected: 15 },
                  ].map((session) => (
                    <div key={session.id} className="flex items-center justify-between border-b border-zinc-700 pb-4">
                      <div>
                        <div className="font-medium text-white">{session.name}</div>
                        <div className="text-sm text-zinc-400">{session.date}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-zinc-300">
                          <Users className="inline-block mr-1 h-3 w-3" />
                          {session.attendees}/{session.expected}
                        </div>
                        <Badge
                          className={
                            session.attendees === session.expected
                              ? "bg-green-500/20 text-green-400"
                              : session.attendees >= session.expected * 0.8
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }
                        >
                          {session.attendees === session.expected ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : session.attendees >= session.expected * 0.8 ? (
                            <AlertCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <XCircle className="mr-1 h-3 w-3" />
                          )}
                          {Math.round((session.attendees / session.expected) * 100)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card id="create-session-form" className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
              <CardHeader>
                <CardTitle className="text-white">Crear nueva sesión de seguimiento</CardTitle>
                <CardDescription className="text-zinc-400">
                  Configura una nueva sesión para monitorear la asistencia en tiempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="session-name" className="text-zinc-300">
                      Nombre de la sesión
                    </Label>
                    <Input
                      id="session-name"
                      placeholder="Ej: Seguridad Informática - Módulo 2"
                      className="bg-zinc-900/50 border-zinc-700 text-zinc-200 focus:border-yellow-400/50 focus:ring-yellow-400/20"
                      value={sessionName}
                      onChange={(e) => setSessionName(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="expected-attendees" className="text-zinc-300">
                      Número esperado de participantes
                    </Label>
                    <Input
                      id="expected-attendees"
                      type="number"
                      min="1"
                      placeholder="Ej: 20"
                      className="bg-zinc-900/50 border-zinc-700 text-zinc-200 focus:border-yellow-400/50 focus:ring-yellow-400/20"
                      value={expectedAttendees || ""}
                      onChange={(e) => setExpectedAttendees(Number.parseInt(e.target.value) || 0)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="capacitacion" className="text-zinc-300">
                      Capacitación asociada
                    </Label>
                    <select
                      id="capacitacion"
                      className="bg-zinc-900/50 border-zinc-700 text-zinc-200 focus:border-yellow-400/50 focus:ring-yellow-400/20 rounded-md p-2"
                    >
                      <option value="">Seleccionar capacitación...</option>
                      <option value="1">Seguridad Informática</option>
                      <option value="2">Gestión del Tiempo</option>
                      <option value="3">Desarrollo Web</option>
                      <option value="4">Python Básico</option>
                    </select>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t border-zinc-700 pt-4">
                <Button
                  className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900"
                  onClick={createSession}
                  disabled={!sessionName || expectedAttendees <= 0}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Iniciar sesión
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

