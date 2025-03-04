"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LoginDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginDrawer({ isOpen, onClose }: LoginDrawerProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // En una implementación real, aquí se conectaría con el backend
      // Simulamos un inicio de sesión exitoso
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Cerrar el drawer antes de redirigir
      onClose()

      // Redirigir según el rol (simulado)
      if (email.includes("admin")) {
        router.push("/admin/dashboard")
      } else if (email.includes("formador")) {
        router.push("/formador/dashboard")
      } else {
        router.push("/empleado/dashboard")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-zinc-800/90 backdrop-blur-md border-l border-zinc-700 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-yellow-400">Iniciar sesión</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-zinc-400 hover:text-white">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4 bg-red-900/50 border-red-800 text-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 flex-1">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-zinc-900/50 border-zinc-700 text-zinc-200 focus:border-yellow-400/50 focus:ring-yellow-400/20"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-300">
                  Contraseña
                </Label>
                <Link href="/forgot-password" className="text-sm text-yellow-400 hover:text-yellow-300">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-zinc-900/50 border-zinc-700 text-zinc-200 focus:border-yellow-400/50 focus:ring-yellow-400/20"
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-zinc-900"
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </Button>

            <div className="mt-4 text-center text-sm text-zinc-400">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="text-yellow-400 hover:text-yellow-300">
                Regístrate
              </Link>
            </div>
          </form>

          <div className="mt-auto pt-6 border-t border-zinc-700">
            <p className="text-xs text-zinc-500 text-center">
              Al iniciar sesión, aceptas nuestros términos y condiciones de servicio.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

