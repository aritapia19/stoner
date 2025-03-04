"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Save, RefreshCw, Eye } from "lucide-react"
import AdminNavbar from "@/components/admin-navbar"
import { Separator } from "@/components/ui/separator"
import { HexColorPicker } from "react-colorful"
import { useTheme } from "@/components/theme-provider"
import { useToast } from "@/components/ui/use-toast"

export default function ConfiguracionMarcaPage() {
  const { theme, updateTheme, resetTheme, applyTheme } = useTheme()
  const { toast } = useToast()

  // Estados para los colores del tema
  const [primaryColor, setPrimaryColor] = useState(theme.primaryColor)
  const [secondaryColor, setSecondaryColor] = useState(theme.secondaryColor)
  const [bgColor, setBgColor] = useState(theme.bgColor)
  const [textColor, setTextColor] = useState(theme.textColor)
  const [headerColor, setHeaderColor] = useState(theme.headerColor || "#121212")

  // Estados para el logo
  const [logoUrl, setLogoUrl] = useState(theme.logoUrl)
  const [logoPreview, setLogoPreview] = useState(theme.logoUrl)
  const [faviconUrl, setFaviconUrl] = useState(theme.faviconUrl)

  // Estado para el nombre de la plataforma
  const [platformName, setPlatformName] = useState(theme.platformName)

  // Estado para opciones adicionales
  const [enableBokeh, setEnableBokeh] = useState(theme.enableBokeh)
  const [darkModeOnly, setDarkModeOnly] = useState(theme.darkModeOnly)
  const [borderRadius, setBorderRadius] = useState(theme.borderRadius)

  // Estado para el estilo de las tarjetas
  const [cardStyle, setCardStyle] = useState(
    theme.cardStyle || {
      backgroundColor: `${theme.headerColor || "#121212"}66`,
      borderColor: `${theme.headerColor || "#121212"}33`,
    },
  )

  // Sincronizar estados con el tema global cuando cambia
  useEffect(() => {
    setPrimaryColor(theme.primaryColor)
    setSecondaryColor(theme.secondaryColor)
    setBgColor(theme.bgColor)
    setTextColor(theme.textColor)
    setHeaderColor(theme.headerColor || "#121212")
    setLogoUrl(theme.logoUrl)
    setLogoPreview(theme.logoUrl)
    setFaviconUrl(theme.faviconUrl)
    setPlatformName(theme.platformName)
    setEnableBokeh(theme.enableBokeh)
    setDarkModeOnly(theme.darkModeOnly)
    setBorderRadius(theme.borderRadius)
    setCardStyle(
      theme.cardStyle || {
        backgroundColor: `${theme.headerColor || "#121212"}66`,
        borderColor: `${theme.headerColor || "#121212"}33`,
      },
    )
  }, [theme])

  // Función para aplicar cambios con debounce
  const [debouncedUpdate, setDebouncedUpdate] = useState<NodeJS.Timeout | null>(null)

  // Función para manejar cambios en cualquier propiedad del tema
  const handleThemeChange = (property: string, value: any) => {
    // Cancelar el timeout anterior si existe
    if (debouncedUpdate) {
      clearTimeout(debouncedUpdate)
    }

    // Actualizar el estado local inmediatamente
    switch (property) {
      case "primaryColor":
        setPrimaryColor(value)
        break
      case "secondaryColor":
        setSecondaryColor(value)
        break
      case "bgColor":
        setBgColor(value)
        break
      case "textColor":
        setTextColor(value)
        break
      case "headerColor":
        setHeaderColor(value)
        break
      case "logoUrl":
        setLogoPreview(value)
        break
      case "faviconUrl":
        setFaviconUrl(value)
        break
      case "platformName":
        setPlatformName(value)
        break
      case "enableBokeh":
        setEnableBokeh(value)
        break
      case "darkModeOnly":
        setDarkModeOnly(value)
        break
      case "borderRadius":
        setBorderRadius(value)
        break
      case "cardStyle":
        setCardStyle(value)
        break
    }

    // Programar la actualización del tema después de un breve retraso
    const timeout = setTimeout(() => {
      const newTheme = {
        primaryColor: property === "primaryColor" ? value : primaryColor,
        secondaryColor: property === "secondaryColor" ? value : secondaryColor,
        bgColor: property === "bgColor" ? value : bgColor,
        textColor: property === "textColor" ? value : textColor,
        headerColor: property === "headerColor" ? value : headerColor,
        logoUrl: property === "logoUrl" ? value : logoPreview,
        faviconUrl: property === "faviconUrl" ? value : faviconUrl,
        platformName: property === "platformName" ? value : platformName,
        enableBokeh: property === "enableBokeh" ? value : enableBokeh,
        darkModeOnly: property === "darkModeOnly" ? value : darkModeOnly,
        borderRadius: property === "borderRadius" ? value : borderRadius,
        cardStyle: property === "cardStyle" ? value : cardStyle,
      }

      updateTheme(newTheme)
      applyTheme()
    }, 300) // 300ms de debounce

    setDebouncedUpdate(timeout)
  }

  // Función para simular la carga de un logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          handleThemeChange("logoUrl", event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  // Función para simular la carga de un favicon
  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          handleThemeChange("faviconUrl", event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  // Función para guardar la configuración
  const saveConfiguration = () => {
    // Guardar en localStorage
    localStorage.setItem("stoner-theme", JSON.stringify(theme))

    // Mostrar notificación
    toast({
      title: "Configuración guardada",
      description: "Los cambios han sido guardados correctamente.",
      variant: "success",
    })
  }

  // Función para restablecer la configuración
  const handleReset = () => {
    if (
      confirm(
        "¿Estás seguro de que deseas restablecer toda la configuración a los valores predeterminados? Esta acción no se puede deshacer.",
      )
    ) {
      resetTheme()

      toast({
        title: "Configuración restablecida",
        description: "Se han restaurado los valores predeterminados.",
        variant: "default",
      })
    }
  }

  const tabsStyle = {
    backgroundColor: `${headerColor}66`, // Color de fondo con transparencia
    borderColor: `${headerColor}33`,
  }

  const tabTriggerStyle = {
    backgroundColor: `${headerColor}33`, // Color de fondo para pestañas inactivas
    color: textColor,
  }

  const previewConfiguration = () => {
    alert("Esta función aún no está implementada. ¡Pronto estará disponible!")
  }

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: bgColor, color: textColor }}>
      <AdminNavbar />
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight" style={{ color: primaryColor }}>
              Configuración de Marca
            </h2>
            <p className="mt-1 opacity-70">Personaliza la plataforma con los colores y logos de tu empresa</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Restablecer
            </Button>
            <Button onClick={saveConfiguration}>
              <Save className="mr-2 h-4 w-4" />
              Guardar cambios
            </Button>
          </div>
        </div>

        <Tabs defaultValue="colores" className="space-y-4">
          <TabsList style={tabsStyle}>
            <TabsTrigger value="colores" style={tabTriggerStyle}>
              Colores
            </TabsTrigger>
            <TabsTrigger value="logos" style={tabTriggerStyle}>
              Logos e Imágenes
            </TabsTrigger>
            <TabsTrigger value="opciones" style={tabTriggerStyle}>
              Opciones Adicionales
            </TabsTrigger>
            <TabsTrigger value="preview" style={tabTriggerStyle}>
              Vista Previa
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colores" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card style={cardStyle}>
                <CardHeader>
                  <CardTitle style={{ color: primaryColor }}>Color Primario</CardTitle>
                  <CardDescription style={{ color: textColor, opacity: 0.7 }}>
                    Este color se utilizará para botones, enlaces y elementos destacados
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <HexColorPicker
                      color={primaryColor}
                      onChange={(color) => handleThemeChange("primaryColor", color)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      value={primaryColor}
                      onChange={(e) => handleThemeChange("primaryColor", e.target.value)}
                      className="font-mono"
                      style={{ backgroundColor: `${headerColor}33` }}
                    />
                    <div
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: primaryColor, borderColor: `${headerColor}33` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card style={cardStyle}>
                <CardHeader>
                  <CardTitle style={{ color: primaryColor }}>Color Secundario</CardTitle>
                  <CardDescription style={{ color: textColor, opacity: 0.7 }}>
                    Este color se utilizará para acentos y elementos secundarios
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <HexColorPicker
                      color={secondaryColor}
                      onChange={(color) => handleThemeChange("secondaryColor", color)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      value={secondaryColor}
                      onChange={(e) => handleThemeChange("secondaryColor", e.target.value)}
                      className="font-mono"
                      style={{ backgroundColor: `${headerColor}33` }}
                    />
                    <div
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: secondaryColor, borderColor: `${headerColor}33` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card style={cardStyle}>
                <CardHeader>
                  <CardTitle style={{ color: primaryColor }}>Color de Cabecera</CardTitle>
                  <CardDescription style={{ color: textColor, opacity: 0.7 }}>
                    Este color se utilizará para la barra de navegación y cabeceras
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <HexColorPicker color={headerColor} onChange={(color) => handleThemeChange("headerColor", color)} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      value={headerColor}
                      onChange={(e) => handleThemeChange("headerColor", e.target.value)}
                      className="font-mono"
                      style={{ backgroundColor: `${headerColor}33` }}
                    />
                    <div
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: headerColor, borderColor: `${headerColor}33` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card style={cardStyle}>
                <CardHeader>
                  <CardTitle style={{ color: primaryColor }}>Color de Fondo</CardTitle>
                  <CardDescription style={{ color: textColor, opacity: 0.7 }}>
                    Este color se utilizará para el fondo de la plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <HexColorPicker color={bgColor} onChange={(color) => handleThemeChange("bgColor", color)} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      value={bgColor}
                      onChange={(e) => handleThemeChange("bgColor", e.target.value)}
                      className="font-mono"
                      style={{ backgroundColor: `${headerColor}33` }}
                    />
                    <div
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: bgColor, borderColor: `${headerColor}33` }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card style={cardStyle}>
                <CardHeader>
                  <CardTitle style={{ color: primaryColor }}>Color de Texto</CardTitle>
                  <CardDescription style={{ color: textColor, opacity: 0.7 }}>
                    Este color se utilizará para el texto principal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <HexColorPicker color={textColor} onChange={(color) => handleThemeChange("textColor", color)} />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      value={textColor}
                      onChange={(e) => handleThemeChange("textColor", e.target.value)}
                      className="font-mono"
                      style={{ backgroundColor: `${headerColor}33` }}
                    />
                    <div
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: textColor, borderColor: `${headerColor}33` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logos" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card style={cardStyle}>
                <CardHeader>
                  <CardTitle style={{ color: primaryColor }}>Logo Principal</CardTitle>
                  <CardDescription style={{ color: textColor, opacity: 0.7 }}>
                    Este logo se mostrará en la barra de navegación y en el inicio de sesión
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center p-6 bg-opacity-10 rounded-lg border border-dashed">
                    <img
                      src={logoPreview || "/placeholder.svg"}
                      alt="Logo preview"
                      className="max-h-20 object-contain"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Subir nuevo logo</Label>
                    <Input type="file" accept="image/*" onChange={handleLogoUpload} />
                    <p className="text-xs opacity-70">
                      Formatos recomendados: PNG o SVG con fondo transparente. Tamaño máximo: 2MB.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card style={cardStyle}>
                <CardHeader>
                  <CardTitle style={{ color: primaryColor }}>Favicon</CardTitle>
                  <CardDescription style={{ color: textColor, opacity: 0.7 }}>
                    Este icono se mostrará en la pestaña del navegador
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center p-6 bg-opacity-10 rounded-lg border border-dashed">
                    <img
                      src={faviconUrl || "/placeholder.svg"}
                      alt="Favicon preview"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Subir nuevo favicon</Label>
                    <Input type="file" accept="image/*" onChange={handleFaviconUpload} />
                    <p className="text-xs opacity-70">
                      Formatos recomendados: ICO, PNG o SVG. Tamaño recomendado: 32x32px.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2" style={cardStyle}>
                <CardHeader>
                  <CardTitle style={{ color: primaryColor }}>Nombre de la Plataforma</CardTitle>
                  <CardDescription style={{ color: textColor, opacity: 0.7 }}>
                    Este nombre se mostrará en la barra de navegación y en el título de la página
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <Label>Nombre</Label>
                    <Input
                      value={platformName}
                      onChange={(e) => handleThemeChange("platformName", e.target.value)}
                      placeholder="Nombre de la plataforma"
                      style={{ backgroundColor: `${headerColor}33` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="opciones" className="space-y-4">
            <Card style={cardStyle}>
              <CardHeader>
                <CardTitle style={{ color: primaryColor }}>Opciones de Interfaz</CardTitle>
                <CardDescription style={{ color: textColor, opacity: 0.7 }}>
                  Personaliza aspectos visuales adicionales de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium" style={{ color: primaryColor }}>
                      Efecto Bokeh
                    </h4>
                    <p className="text-xs opacity-70">Habilitar efecto de fondo con luces difuminadas</p>
                  </div>
                  <Switch
                    checked={enableBokeh}
                    onCheckedChange={(checked) => handleThemeChange("enableBokeh", checked)}
                    style={{ "--primary-color": primaryColor } as React.CSSProperties}
                  />
                </div>

                <Separator style={{ backgroundColor: `${primaryColor}33` }} />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium" style={{ color: primaryColor }}>
                      Solo Modo Oscuro
                    </h4>
                    <p className="text-xs opacity-70">Deshabilitar el modo claro y usar solo el modo oscuro</p>
                  </div>
                  <Switch
                    checked={darkModeOnly}
                    onCheckedChange={(checked) => handleThemeChange("darkModeOnly", checked)}
                    style={{ "--primary-color": primaryColor } as React.CSSProperties}
                  />
                </div>

                <Separator style={{ backgroundColor: `${primaryColor}33` }} />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium" style={{ color: primaryColor }}>
                      Radio de Bordes
                    </h4>
                    <span className="text-xs opacity-70">{borderRadius}px</span>
                  </div>
                  <Slider
                    value={[borderRadius]}
                    min={0}
                    max={20}
                    step={1}
                    onValueChange={(value) => handleThemeChange("borderRadius", value[0])}
                    className="py-4"
                    style={{ "--primary-color": primaryColor } as React.CSSProperties}
                  />
                  <p className="text-xs opacity-70">Ajusta el redondeo de las esquinas en botones y tarjetas</p>
                </div>

                <Separator style={{ backgroundColor: `${primaryColor}33` }} />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium" style={{ color: primaryColor }}>
                      Color de Cajas de Contenido
                    </h4>
                    <span className="text-xs opacity-70">Personaliza el aspecto de las tarjetas</span>
                  </div>
                  <div className="grid gap-4 mt-4">
                    <div className="flex items-center gap-4">
                      <div className="w-full">
                        <Label htmlFor="card-bg-opacity" className="text-xs">
                          Opacidad del fondo
                        </Label>
                        <Slider
                          id="card-bg-opacity"
                          value={[Number.parseInt(cardStyle.backgroundColor.split(",")[3] || "0.4") * 100]}
                          min={0}
                          max={100}
                          step={5}
                          onValueChange={(value) => {
                            const opacity = value[0] / 100
                            const newCardStyle = {
                              ...cardStyle,
                              backgroundColor: `${headerColor}${Math.round(opacity * 99)
                                .toString(16)
                                .padStart(2, "0")}`,
                            }
                            setCardStyle(newCardStyle)
                            handleThemeChange("cardStyle", newCardStyle)
                          }}
                          className="py-4"
                          style={{ "--primary-color": primaryColor } as React.CSSProperties}
                        />
                      </div>
                      <div
                        className="w-16 h-16 rounded border"
                        style={{ backgroundColor: cardStyle.backgroundColor, borderColor: cardStyle.borderColor }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card style={cardStyle}>
              <CardHeader>
                <CardTitle style={{ color: primaryColor }}>Vista Previa</CardTitle>
                <CardDescription style={{ color: textColor, opacity: 0.7 }}>
                  Así se verá la plataforma con tu configuración
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <div
                    className="p-4 flex items-center justify-between border-b"
                    style={{ backgroundColor: headerColor }}
                  >
                    <div className="flex items-center gap-2">
                      <img src={logoPreview || "/placeholder.svg"} alt="Logo" className="h-8" />
                      <span className="font-bold" style={{ color: textColor }}>
                        {platformName}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div
                        className="w-20 h-8 rounded"
                        style={{ backgroundColor: primaryColor, borderRadius: `${borderRadius}px` }}
                      ></div>
                      <div className="w-8 h-8 rounded-full"></div>
                    </div>
                  </div>
                  <div className="p-6" style={{ backgroundColor: bgColor }}>
                    <div className="grid gap-4">
                      <div
                        className="p-4 rounded-lg bg-opacity-10"
                        style={{
                          borderRadius: `${borderRadius}px`,
                          backgroundColor: cardStyle.backgroundColor,
                          borderColor: cardStyle.borderColor,
                        }}
                      >
                        <h3 className="text-lg font-bold mb-2" style={{ color: primaryColor }}>
                          Título de ejemplo
                        </h3>
                        <p style={{ color: textColor, opacity: 0.7 }}>
                          Este es un texto de ejemplo para mostrar cómo se verán los contenidos.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="px-4 py-2 font-medium"
                          style={{ backgroundColor: primaryColor, color: "#000", borderRadius: `${borderRadius}px` }}
                        >
                          Botón primario
                        </button>
                        <button
                          className="px-4 py-2 font-medium border"
                          style={{
                            borderColor: secondaryColor,
                            color: secondaryColor,
                            borderRadius: `${borderRadius}px`,
                          }}
                        >
                          Botón secundario
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs opacity-70">
                  Esta es solo una vista previa simplificada. Los cambios reales pueden variar ligeramente.
                </p>
              </CardFooter>
            </Card>

            <Card style={cardStyle}>
              <CardHeader>
                <CardTitle style={{ color: primaryColor }}>Aplicar cambios</CardTitle>
                <CardDescription style={{ color: textColor, opacity: 0.7 }}>
                  Guarda la configuración para aplicar los cambios a toda la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <p>
                    Puedes previsualizar los cambios antes de guardarlos permanentemente. La previsualización te permite
                    ver cómo se verá la plataforma con la nueva configuración.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={previewConfiguration}>
                      <Eye className="mr-2 h-4 w-4" />
                      Previsualizar cambios
                    </Button>
                    <Button onClick={saveConfiguration}>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

