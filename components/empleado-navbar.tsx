"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutDashboard, BookOpen, FileText, Settings, LogOut, Menu, X, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

export default function EmpleadoNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    // En una implementación real, aquí se desconectaría la sesión
    router.push("/login")
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center">
          <Button variant="outline" size="icon" className="md:hidden mr-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
          <Link href="/empleado/dashboard" className="flex items-center">
            <span className="text-xl font-bold">FormacionPro</span>
          </Link>
        </div>

        <nav
          className={`${isOpen ? "flex" : "hidden"} absolute top-16 left-0 right-0 z-50 flex-col gap-2 bg-background p-4 shadow-lg md:static md:flex md:flex-row md:items-center md:gap-6 md:p-0 md:shadow-none`}
        >
          <Link href="/empleado/dashboard" className="flex items-center gap-2 text-sm font-medium">
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link href="/empleado/capacitaciones" className="flex items-center gap-2 text-sm font-medium">
            <BookOpen className="h-4 w-4" />
            <span>Mis Capacitaciones</span>
          </Link>
          <Link href="/empleado/calendario" className="flex items-center gap-2 text-sm font-medium">
            <Calendar className="h-4 w-4" />
            <span>Calendario</span>
          </Link>
          <Link href="/empleado/documentos" className="flex items-center gap-2 text-sm font-medium">
            <FileText className="h-4 w-4" />
            <span>Documentos</span>
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback>EM</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

