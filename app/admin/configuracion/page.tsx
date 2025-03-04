"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Shield, Building, Globe, Bell, Mail, Database, Users, SettingsIcon } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"
import Link from "next/link"

export default function ConfiguracionPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-900 text-zinc-100">
      <AdminNavbar />
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Configuración</h2>
            <p className="text-zinc-400 mt-1">Administra la configuración de la plataforma</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/configuracion/marca" className="block">
            <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700 hover:border-yellow-400/40 transition-all hover:shadow-lg hover:shadow-yellow-400/10">
              <CardHeader>
                <div className="bg-yellow-400/10 p-3 rounded-full w-fit mb-4">
                  <Palette className="h-6 w-6 text-yellow-400" />
                </div>
                <CardTitle className="text-white">Marca y Personalización</CardTitle>
                <CardDescription className="text-zinc-400">
                  Personaliza la plataforma con los colores y logos de tu empresa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-zinc-400">
                  <li>• Colores corporativos</li>
                  <li>• Logos e imágenes</li>
                  <li>• Nombre de la plataforma</li>
                  <li>• Opciones de interfaz</li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/configuracion/permisos" className="block">
            <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700 hover:border-yellow-400/40 transition-all hover:shadow-lg hover:shadow-yellow-400/10">
              <CardHeader>
                <div className="bg-yellow-400/10 p-3 rounded-full w-fit mb-4">
                  <Shield className="h-6 w-6 text-yellow-400" />
                </div>
                <CardTitle className="text-white">Roles y Permisos</CardTitle>
                <CardDescription className="text-zinc-400">
                  Gestiona los roles y permisos de acceso a la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-zinc-400">
                  <li>• Roles de usuario</li>
                  <li>• Permisos de acceso</li>
                  <li>• Asignación de roles</li>
                  <li>• Restricciones de funcionalidades</li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/configuracion/empresa" className="block">
            <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700 hover:border-yellow-400/40 transition-all hover:shadow-lg hover:shadow-yellow-400/10">
              <CardHeader>
                <div className="bg-yellow-400/10 p-3 rounded-full w-fit mb-4">
                  <Building className="h-6 w-6 text-yellow-400" />
                </div>
                <CardTitle className="text-white">Información de Empresa</CardTitle>
                <CardDescription className="text-zinc-400">
                  Gestiona la información de tu empresa y departamentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-zinc-400">
                  <li>• Datos de la empresa</li>
                  <li>• Departamentos</li>
                  <li>• Ubicaciones</li>
                  <li>• Información de contacto</li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700 hover:border-yellow-400/40 transition-all hover:shadow-lg hover:shadow-yellow-400/10">
            <CardHeader>
              <div className="bg-yellow-400/10 p-3 rounded-full w-fit mb-4">
                <Globe className="h-6 w-6 text-yellow-400" />
              </div>
              <CardTitle className="text-white">Idioma y Región</CardTitle>
              <CardDescription className="text-zinc-400">
                Configura el idioma, zona horaria y formato de fecha
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-zinc-400">
                <li>• Idioma de la plataforma</li>
                <li>• Zona horaria</li>
                <li>• Formato de fecha y hora</li>
                <li>• Moneda</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700 hover:border-yellow-400/40 transition-all hover:shadow-lg hover:shadow-yellow-400/10">
            <CardHeader>
              <div className="bg-yellow-400/10 p-3 rounded-full w-fit mb-4">
                <Bell className="h-6 w-6 text-yellow-400" />
              </div>
              <CardTitle className="text-white">Notificaciones</CardTitle>
              <CardDescription className="text-zinc-400">
                Configura las notificaciones y alertas del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-zinc-400">
                <li>• Notificaciones por email</li>
                <li>• Notificaciones en la plataforma</li>
                <li>• Recordatorios</li>
                <li>• Alertas de sistema</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700 hover:border-yellow-400/40 transition-all hover:shadow-lg hover:shadow-yellow-400/10">
            <CardHeader>
              <div className="bg-yellow-400/10 p-3 rounded-full w-fit mb-4">
                <Mail className="h-6 w-6 text-yellow-400" />
              </div>
              <CardTitle className="text-white">Correo Electrónico</CardTitle>
              <CardDescription className="text-zinc-400">
                Configura las plantillas y envío de correos electrónicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-zinc-400">
                <li>• Configuración SMTP</li>
                <li>• Plantillas de correo</li>
                <li>• Firma corporativa</li>
                <li>• Programación de envíos</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700 hover:border-yellow-400/40 transition-all hover:shadow-lg hover:shadow-yellow-400/10">
            <CardHeader>
              <div className="bg-yellow-400/10 p-3 rounded-full w-fit mb-4">
                <Database className="h-6 w-6 text-yellow-400" />
              </div>
              <CardTitle className="text-white">Copias de Seguridad</CardTitle>
              <CardDescription className="text-zinc-400">
                Gestiona las copias de seguridad y restauración de datos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-zinc-400">
                <li>• Programación de copias</li>
                <li>• Almacenamiento</li>
                <li>• Restauración de datos</li>
                <li>• Historial de copias</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700 hover:border-yellow-400/40 transition-all hover:shadow-lg hover:shadow-yellow-400/10">
            <CardHeader>
              <div className="bg-yellow-400/10 p-3 rounded-full w-fit mb-4">
                <Users className="h-6 w-6 text-yellow-400" />
              </div>
              <CardTitle className="text-white">Autenticación</CardTitle>
              <CardDescription className="text-zinc-400">
                Configura los métodos de autenticación y seguridad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-zinc-400">
                <li>• Métodos de inicio de sesión</li>
                <li>• Políticas de contraseñas</li>
                <li>• Autenticación de dos factores</li>
                <li>• Integración con SSO</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700 hover:border-yellow-400/40 transition-all hover:shadow-lg hover:shadow-yellow-400/10">
            <CardHeader>
              <div className="bg-yellow-400/10 p-3 rounded-full w-fit mb-4">
                <SettingsIcon className="h-6 w-6 text-yellow-400" />
              </div>
              <CardTitle className="text-white">Configuración General</CardTitle>
              <CardDescription className="text-zinc-400">
                Otras configuraciones generales de la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-zinc-400">
                <li>• Opciones de privacidad</li>
                <li>• Términos y condiciones</li>
                <li>• Política de cookies</li>
                <li>• Configuración de caché</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

