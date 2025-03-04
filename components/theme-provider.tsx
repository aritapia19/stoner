"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, useCallback } from "react"

// Actualizar el tipo Theme para incluir cardStyle
type Theme = {
  primaryColor: string
  secondaryColor: string
  bgColor: string
  textColor: string
  headerColor: string
  borderRadius: number
  enableBokeh: boolean
  darkModeOnly: boolean
  platformName: string
  logoUrl: string
  faviconUrl: string
  cardStyle?: {
    backgroundColor: string
    borderColor: string
  }
}

type ThemeContextType = {
  theme: Theme
  updateTheme: (newTheme: Partial<Theme>) => void
  resetTheme: () => void
  applyTheme: () => void
}

// Actualizar defaultTheme para incluir cardStyle
const defaultTheme: Theme = {
  primaryColor: "#FFCC00", // Amarillo
  secondaryColor: "#FF9900", // Naranja
  bgColor: "#18181B", // Zinc-900
  textColor: "#FFFFFF", // Blanco
  headerColor: "#121212", // Negro para la cabecera
  borderRadius: 8,
  enableBokeh: true,
  darkModeOnly: true,
  platformName: "STONER",
  logoUrl: "/placeholder.svg?height=80&width=200",
  faviconUrl: "/placeholder.svg?height=32&width=32",
  cardStyle: {
    backgroundColor: "#12121266",
    borderColor: "#12121233",
  },
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [isInitialized, setIsInitialized] = useState(false)

  // Cargar tema desde localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("stoner-theme")
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme)
        setTheme((prev) => ({ ...prev, ...parsedTheme }))
      } catch (error) {
        console.error("Error parsing theme from localStorage:", error)
      }
    }
    setIsInitialized(true)
  }, [])

  // Actualizar applyTheme para aplicar cardStyle
  const applyTheme = useCallback(() => {
    // Aplicar colores principales como variables CSS
    document.documentElement.style.setProperty("--primary-color", theme.primaryColor)
    document.documentElement.style.setProperty("--secondary-color", theme.secondaryColor)
    document.documentElement.style.setProperty("--bg-color", theme.bgColor)
    document.documentElement.style.setProperty("--text-color", theme.textColor)
    document.documentElement.style.setProperty("--header-color", theme.headerColor || "#121212")
    document.documentElement.style.setProperty("--border-radius", `${theme.borderRadius}px`)

    // Aplicar estilos de tarjetas
    if (theme.cardStyle) {
      document.documentElement.style.setProperty("--card-bg-color", theme.cardStyle.backgroundColor)
      document.documentElement.style.setProperty("--card-border-color", theme.cardStyle.borderColor)
    }

    // Aplicar colores directamente a elementos clave
    document.body.style.backgroundColor = theme.bgColor
    document.body.style.color = theme.textColor

    // Aplicar efecto bokeh
    const bokehElements = document.querySelectorAll(".bokeh-bg")
    bokehElements.forEach((el) => {
      if (theme.enableBokeh) {
        el.classList.remove("hidden")
      } else {
        el.classList.add("hidden")
      }
    })

    // Actualizar título y favicon
    document.title = `${theme.platformName} - Plataforma de Gestión de Capacitaciones`
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
    if (favicon) {
      favicon.href = theme.faviconUrl
    }
  }, [theme])

  // Aplicar tema cuando se carga inicialmente
  useEffect(() => {
    if (isInitialized) {
      applyTheme()
    }
  }, [isInitialized, applyTheme])

  const updateTheme = useCallback((newTheme: Partial<Theme>) => {
    setTheme((prev) => {
      // Solo actualizar si hay cambios reales
      const updatedTheme = { ...prev, ...newTheme }

      // Verificar si realmente hay cambios
      const hasChanges = Object.keys(newTheme).some((key) => newTheme[key as keyof Theme] !== prev[key as keyof Theme])

      if (!hasChanges) {
        return prev // No hay cambios, devolver el tema anterior
      }

      // Guardar en localStorage
      localStorage.setItem("stoner-theme", JSON.stringify(updatedTheme))

      return updatedTheme
    })
  }, [])

  const resetTheme = () => {
    setTheme(defaultTheme)
    localStorage.removeItem("stoner-theme")
    applyTheme()
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme, applyTheme }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

