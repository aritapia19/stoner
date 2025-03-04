"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Search, Save, UserPlus, Shield, Lock, Eye, PlusCircle, Trash2 } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Tipos para los roles y permisos
type Permission = {
  id: string
  name: string
  description: string
  category: string
}

type Role = {
  id: string
  name: string
  description: string
  permissions: string[]
  isDefault: boolean
  isSystem: boolean
}

export default function ConfiguracionPermisosPage() {
  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("")

  // Estado para los roles
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "admin",
      name: "Administrador",
      description: "Acceso completo a todas las funcionalidades",
      permissions: ["all"],
      isDefault: false,
      isSystem: true,
    },
    {
      id: "formador",
      name: "Formador",
      description: "Gestión de capacitaciones y seguimiento",
      permissions: [
        "capacitaciones_read",
        "capacitaciones_write",
        "asistencia_read",
        "asistencia_write",
        "documentos_read",
        "documentos_write",
        "seguimiento_read",
        "seguimiento_write",
      ],
      isDefault: false,
      isSystem: true,
    },
    {
      id: "empleado",
      name: "Empleado",
      description: "Acceso a capacitaciones asignadas",
      permissions: ["capacitaciones_read", "documentos_read"],
      isDefault: true,
      isSystem: true,
    },
    {
      id: "supervisor",
      name: "Supervisor",
      description: "Supervisión de capacitaciones y reportes",
      permissions: ["capacitaciones_read", "asistencia_read", "reportes_read"],
      isDefault: false,
      isSystem: false,
    },
  ])

  // Estado para los permisos disponibles
  const [permissions, setPermissions] = useState<Permission[]>([
    { id: "all", name: "Acceso completo", description: "Acceso a todas las funcionalidades", category: "Sistema" },
    {
      id: "capacitaciones_read",
      name: "Ver capacitaciones",
      description: "Ver listado y detalles de capacitaciones",
      category: "Capacitaciones",
    },
    {
      id: "capacitaciones_write",
      name: "Gestionar capacitaciones",
      description: "Crear, editar y eliminar capacitaciones",
      category: "Capacitaciones",
    },
    {
      id: "asistencia_read",
      name: "Ver asistencia",
      description: "Ver registros de asistencia",
      category: "Asistencia",
    },
    {
      id: "asistencia_write",
      name: "Gestionar asistencia",
      description: "Registrar y modificar asistencia",
      category: "Asistencia",
    },
    {
      id: "documentos_read",
      name: "Ver documentos",
      description: "Acceder a documentos de capacitación",
      category: "Documentos",
    },
    {
      id: "documentos_write",
      name: "Gestionar documentos",
      description: "Subir, editar y eliminar documentos",
      category: "Documentos",
    },
    {
      id: "empleados_read",
      name: "Ver empleados",
      description: "Ver listado y detalles de empleados",
      category: "Empleados",
    },
    {
      id: "empleados_write",
      name: "Gestionar empleados",
      description: "Crear, editar y eliminar empleados",
      category: "Empleados",
    },
    {
      id: "reportes_read",
      name: "Ver reportes",
      description: "Acceder a reportes y estadísticas",
      category: "Reportes",
    },
    {
      id: "reportes_write",
      name: "Gestionar reportes",
      description: "Crear y exportar reportes",
      category: "Reportes",
    },
    {
      id: "seguimiento_read",
      name: "Ver seguimiento",
      description: "Ver sesiones de seguimiento",
      category: "Seguimiento",
    },
    {
      id: "seguimiento_write",
      name: "Gestionar seguimiento",
      description: "Crear y gestionar sesiones de seguimiento",
      category: "Seguimiento",
    },
    {
      id: "configuracion_read",
      name: "Ver configuración",
      description: "Ver configuración del sistema",
      category: "Configuración",
    },
    {
      id: "configuracion_write",
      name: "Gestionar configuración",
      description: "Modificar configuración del sistema",
      category: "Configuración",
    },
  ])

  // Estado para el rol seleccionado actualmente
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  // Estado para el modo de edición
  const [isEditing, setIsEditing] = useState(false)

  // Estado para el nuevo rol
  const [newRole, setNewRole] = useState<Omit<Role, "id">>({
    name: "",
    description: "",
    permissions: [],
    isDefault: false,
    isSystem: false,
  })

  // Función para seleccionar un rol para editar
  const selectRoleForEdit = (role: Role) => {
    setSelectedRole(role)
    setIsEditing(true)
  }

  // Función para crear un nuevo rol
  const createNewRole = () => {
    setSelectedRole(null)
    setIsEditing(true)
    setNewRole({
      name: "",
      description: "",
      permissions: [],
      isDefault: false,
      isSystem: false,
    })
  }

  // Función para guardar un rol (nuevo o editado)
  const saveRole = () => {
    if (isEditing) {
      if (selectedRole) {
        // Actualizar rol existente
        setRoles(roles.map((r) => (r.id === selectedRole.id ? selectedRole : r)))
      } else {
        // Crear nuevo rol
        const newRoleWithId = {
          ...newRole,
          id: `role_${Date.now()}`,
        }
        setRoles([...roles, newRoleWithId])
      }
      setIsEditing(false)
      setSelectedRole(null)
    }
  }

  // Función para eliminar un rol
  const deleteRole = (roleId: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este rol? Esta acción no se puede deshacer.")) {
      setRoles(roles.filter((r) => r.id !== roleId))
      if (selectedRole?.id === roleId) {
        setSelectedRole(null)
        setIsEditing(false)
      }
    }
  }

  // Función para actualizar permisos del rol seleccionado
  const togglePermission = (permissionId: string) => {
    if (selectedRole) {
      const updatedPermissions = selectedRole.permissions.includes(permissionId)
        ? selectedRole.permissions.filter((p) => p !== permissionId)
        : [...selectedRole.permissions, permissionId]

      setSelectedRole({
        ...selectedRole,
        permissions: updatedPermissions,
      })
    } else if (isEditing) {
      const updatedPermissions = newRole.permissions.includes(permissionId)
        ? newRole.permissions.filter((p) => p !== permissionId)
        : [...newRole.permissions, permissionId]

      setNewRole({
        ...newRole,
        permissions: updatedPermissions,
      })
    }
  }

  // Filtrar roles según término de búsqueda
  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Agrupar permisos por categoría
  const permissionsByCategory = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = []
      }
      acc[permission.category].push(permission)
      return acc
    },
    {} as Record<string, Permission[]>,
  )

  return (
    <div className="flex min-h-screen flex-col bg-zinc-900 text-zinc-100">
      <AdminNavbar />
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Configuración de Permisos</h2>
            <p className="text-zinc-400 mt-1">Gestiona roles y permisos de acceso a la plataforma</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900" onClick={saveRole}>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar cambios
                </Button>
              </>
            ) : (
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900" onClick={createNewRole}>
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Rol
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[300px_1fr]">
          <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
            <CardHeader>
              <CardTitle className="text-white">Roles</CardTitle>
              <CardDescription className="text-zinc-400">
                Selecciona un rol para ver o editar sus permisos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
                <Input
                  type="search"
                  placeholder="Buscar roles..."
                  className="pl-8 bg-zinc-900/50 border-zinc-700 text-zinc-200 focus:border-yellow-400/50 focus:ring-yellow-400/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2 mt-4">
                {filteredRoles.map((role) => (
                  <div
                    key={role.id}
                    className={`p-3 rounded-lg cursor-pointer flex items-center justify-between ${
                      selectedRole?.id === role.id
                        ? "bg-yellow-400/20 border border-yellow-400/40"
                        : "hover:bg-zinc-700/50 border border-zinc-700"
                    }`}
                    onClick={() => setSelectedRole(role)}
                  >
                    <div>
                      <div className="font-medium text-white flex items-center gap-2">
                        {role.name}
                        {role.isDefault && (
                          <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">Default</Badge>
                        )}
                        {role.isSystem && (
                          <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">Sistema</Badge>
                        )}
                      </div>
                      <div className="text-xs text-zinc-400">{role.description}</div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-full hover:bg-zinc-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          selectRoleForEdit(role)
                        }}
                      >
                        <Shield className="h-4 w-4 text-zinc-400" />
                      </Button>
                      {!role.isSystem && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full hover:bg-zinc-700 hover:text-red-400"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteRole(role.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-zinc-400" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {isEditing ? (
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    {selectedRole ? `Editar rol: ${selectedRole.name}` : "Crear nuevo rol"}
                  </CardTitle>
                  <CardDescription className="text-zinc-400">
                    {selectedRole
                      ? "Modifica los detalles y permisos de este rol"
                      : "Define un nuevo rol con permisos personalizados"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="role-name" className="text-zinc-300">
                        Nombre del rol
                      </Label>
                      <Input
                        id="role-name"
                        placeholder="Ej: Supervisor de Capacitaciones"
                        className="bg-zinc-900/50 border-zinc-700 text-zinc-200 focus:border-yellow-400/50 focus:ring-yellow-400/20"
                        value={selectedRole ? selectedRole.name : newRole.name}
                        onChange={(e) =>
                          selectedRole
                            ? setSelectedRole({ ...selectedRole, name: e.target.value })
                            : setNewRole({ ...newRole, name: e.target.value })
                        }
                        disabled={selectedRole?.isSystem}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="role-description" className="text-zinc-300">
                        Descripción
                      </Label>
                      <Input
                        id="role-description"
                        placeholder="Ej: Supervisa el progreso de las capacitaciones"
                        className="bg-zinc-900/50 border-zinc-700 text-zinc-200 focus:border-yellow-400/50 focus:ring-yellow-400/20"
                        value={selectedRole ? selectedRole.description : newRole.description}
                        onChange={(e) =>
                          selectedRole
                            ? setSelectedRole({ ...selectedRole, description: e.target.value })
                            : setNewRole({ ...newRole, description: e.target.value })
                        }
                        disabled={selectedRole?.isSystem}
                      />
                    </div>

                    {!selectedRole?.isSystem && (
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-white">Rol predeterminado</h4>
                          <p className="text-xs text-zinc-400">
                            Este rol se asignará automáticamente a nuevos usuarios
                          </p>
                        </div>
                        <Switch
                          checked={selectedRole ? selectedRole.isDefault : newRole.isDefault}
                          onCheckedChange={(checked) =>
                            selectedRole
                              ? setSelectedRole({ ...selectedRole, isDefault: checked })
                              : setNewRole({ ...newRole, isDefault: checked })
                          }
                        />
                      </div>
                    )}
                  </div>

                  <Separator className="bg-zinc-700" />

                  <div>
                    <h3 className="text-lg font-medium text-white mb-4">Permisos</h3>

                    {Object.entries(permissionsByCategory).map(([category, categoryPermissions]) => (
                      <div key={category} className="mb-6">
                        <h4 className="text-sm font-medium text-yellow-400 mb-2">{category}</h4>
                        <div className="space-y-2">
                          {categoryPermissions.map((permission) => (
                            <div
                              key={permission.id}
                              className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-700/50"
                            >
                              <div>
                                <div className="font-medium text-white">{permission.name}</div>
                                <div className="text-xs text-zinc-400">{permission.description}</div>
                              </div>
                              <Switch
                                checked={
                                  selectedRole
                                    ? selectedRole.permissions.includes(permission.id) ||
                                      selectedRole.permissions.includes("all")
                                    : newRole.permissions.includes(permission.id) || newRole.permissions.includes("all")
                                }
                                onCheckedChange={() => togglePermission(permission.id)}
                                disabled={
                                  (selectedRole?.permissions.includes("all") || newRole.permissions.includes("all")) &&
                                  permission.id !== "all"
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : selectedRole ? (
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{selectedRole.name}</CardTitle>
                      <CardDescription className="text-zinc-400">{selectedRole.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {selectedRole.isDefault && <Badge className="bg-blue-500/20 text-blue-400">Default</Badge>}
                      {selectedRole.isSystem && <Badge className="bg-purple-500/20 text-purple-400">Sistema</Badge>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-medium text-white mb-4">Permisos asignados</h3>

                  {selectedRole.permissions.includes("all") ? (
                    <div className="p-4 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-yellow-400" />
                        <span className="font-medium text-white">Acceso completo</span>
                      </div>
                      <p className="text-sm text-zinc-400 mt-1">
                        Este rol tiene acceso a todas las funcionalidades de la plataforma
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(permissionsByCategory).map(([category, categoryPermissions]) => {
                        const categoryHasPermissions = categoryPermissions.some((p) =>
                          selectedRole.permissions.includes(p.id),
                        )

                        if (!categoryHasPermissions) return null

                        return (
                          <div key={category}>
                            <h4 className="text-sm font-medium text-yellow-400 mb-2">{category}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {categoryPermissions
                                .filter((p) => selectedRole.permissions.includes(p.id))
                                .map((permission) => (
                                  <div
                                    key={permission.id}
                                    className="flex items-center gap-2 p-2 rounded-lg bg-zinc-700/30"
                                  >
                                    {permission.id.includes("write") ? (
                                      <Lock className="h-4 w-4 text-green-400" />
                                    ) : (
                                      <Eye className="h-4 w-4 text-blue-400" />
                                    )}
                                    <span className="text-sm text-zinc-200">{permission.name}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    onClick={() => selectRoleForEdit(selectedRole)}
                    disabled={selectedRole.isSystem}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Editar permisos
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-zinc-700/50 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-zinc-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Selecciona un rol</h3>
                  <p className="text-zinc-400 mb-4">Selecciona un rol para ver sus detalles o crea uno nuevo</p>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900" onClick={createNewRole}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Crear nuevo rol
                  </Button>
                </CardContent>
              </Card>
            )}

            {selectedRole && !isEditing && (
              <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700">
                <CardHeader>
                  <CardTitle className="text-white">Usuarios con este rol</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Listado de usuarios que tienen asignado el rol de {selectedRole.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-zinc-700">
                        <TableHead className="text-zinc-400">Usuario</TableHead>
                        <TableHead className="text-zinc-400">Email</TableHead>
                        <TableHead className="text-zinc-400">Departamento</TableHead>
                        <TableHead className="text-right text-zinc-400">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedRole.id === "admin" ? (
                        <>
                          <TableRow className="border-zinc-700">
                            <TableCell className="font-medium text-white">Laura Martínez</TableCell>
                            <TableCell>laura.martinez@empresa.com</TableCell>
                            <TableCell>Recursos Humanos</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white">
                                Cambiar rol
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-zinc-700">
                            <TableCell className="font-medium text-white">Carlos Rodríguez</TableCell>
                            <TableCell>carlos.rodriguez@empresa.com</TableCell>
                            <TableCell>Tecnología</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white">
                                Cambiar rol
                              </Button>
                            </TableCell>
                          </TableRow>
                        </>
                      ) : selectedRole.id === "formador" ? (
                        <>
                          <TableRow className="border-zinc-700">
                            <TableCell className="font-medium text-white">Javier Pérez</TableCell>
                            <TableCell>javier.perez@empresa.com</TableCell>
                            <TableCell>Operaciones</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white">
                                Cambiar rol
                              </Button>
                            </TableCell>
                          </TableRow>
                        </>
                      ) : selectedRole.id === "empleado" ? (
                        <>
                          <TableRow className="border-zinc-700">
                            <TableCell className="font-medium text-white">Ana García</TableCell>
                            <TableCell>ana.garcia@empresa.com</TableCell>
                            <TableCell>Marketing</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white">
                                Cambiar rol
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-zinc-700">
                            <TableCell className="font-medium text-white">Miguel Sánchez</TableCell>
                            <TableCell>miguel.sanchez@empresa.com</TableCell>
                            <TableCell>Ventas</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white">
                                Cambiar rol
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow className="border-zinc-700">
                            <TableCell className="font-medium text-white">Sofía López</TableCell>
                            <TableCell>sofia.lopez@empresa.com</TableCell>
                            <TableCell>Finanzas</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 text-zinc-400 hover:text-white">
                                Cambiar rol
                              </Button>
                            </TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-zinc-400 py-4">
                            No hay usuarios con este rol
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

