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
import { LayoutDashboard, Users, BookOpen, FileText, BarChart3, Settings, LogOut, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/components/theme-provider"

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { theme } = useTheme()

  const handleLogout = () => {
    router.push("/login")
  }

  const navStyle = {
    backgroundColor: theme.headerColor,
    borderColor: `${theme.headerColor}33`, // Añadir un borde sutil
  }

  const dropdownStyle = {
    backgroundColor: theme.headerColor,
    borderColor: `${theme.headerColor}33`,
  }

  return (
    <div className="sticky top-0 z-50 w-full border-b" style={navStyle}>
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center">
          <Button variant="outline" size="icon" className="md:hidden mr-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            {theme.logoUrl && <img src={theme.logoUrl || "/placeholder.svg"} alt="Logo" className="h-8 w-auto" />}
            <span className="text-2xl font-bold" style={{ color: theme.primaryColor }}>
              {theme.platformName}
            </span>
          </Link>
        </div>

        <nav
          className={`${
            isOpen ? "flex" : "hidden"
          } absolute top-16 left-0 right-0 z-50 flex-col gap-2 p-4 border-b shadow-lg md:static md:flex md:flex-row md:items-center md:gap-6 md:p-0 md:border-0 md:shadow-none`}
          style={navStyle}
        >
          {[
            { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { href: "/admin/capacitaciones", icon: BookOpen, label: "Capacitaciones" },
            { href: "/admin/empleados", icon: Users, label: "Empleados" },
            { href: "/admin/documentos", icon: FileText, label: "Documentos" },
            { href: "/admin/reportes", icon: BarChart3, label: "Reportes" },
            { href: "/admin/configuracion", icon: Settings, label: "Configuración" },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary-custom"
              style={{ color: theme.textColor }}
            >
              <Icon className="h-4 w-4" style={{ color: theme.primaryColor }} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="Avatar" />
                  <AvatarFallback style={{ backgroundColor: theme.primaryColor }}>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" style={dropdownStyle}>
              <DropdownMenuLabel style={{ color: theme.textColor }}>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator style={{ backgroundColor: `${theme.textColor}20` }} />
              <DropdownMenuItem
                className="cursor-pointer"
                style={{ color: theme.textColor }}
                onSelect={() => router.push("/admin/configuracion")}
              >
                <Settings className="mr-2 h-4 w-4" style={{ color: theme.primaryColor }} />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" style={{ color: theme.textColor }} onSelect={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" style={{ color: theme.primaryColor }} />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

