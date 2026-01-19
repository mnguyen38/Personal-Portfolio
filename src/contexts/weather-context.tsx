"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

type WeatherCondition = "none" | "rain" | "snow" | "auto"

interface WeatherContextType {
  isRaining: boolean
  isSnowing: boolean
  weatherCondition: WeatherCondition
  cycleWeather: () => void
  temperature: number | null
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weatherCondition, setWeatherCondition] = useState<WeatherCondition>("none")
  const [autoWeather, setAutoWeather] = useState<"none" | "rain" | "snow">("none")
  const [temperature, setTemperature] = useState<number | null>(null)

  const cycleWeather = () => {
    setWeatherCondition((current) => {
      if (current === "none") return "rain"
      if (current === "rain") return "snow"
      if (current === "snow") return "auto"
      return "none"
    })
  }

  // Fetch Boston weather on mount and refresh periodically
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Using open-meteo API - free, no API key required
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=42.3601&longitude=-71.0589&current_weather=true&temperature_unit=fahrenheit"
        )
        const data = await response.json()

        // Weather codes from open-meteo API
        const weatherCode = data.current_weather.weather_code
        const temp = Math.round(data.current_weather.temperature)

        // Always update temperature
        setTemperature(temp)

        // Only update auto weather if in auto mode
        if (weatherCondition === "auto") {
          // Map weather codes to conditions
          // 61-67, 80-82: Rain
          // 71-77, 85-86: Snow
          if (weatherCode >= 61 && weatherCode <= 67 || weatherCode >= 80 && weatherCode <= 82) {
            setAutoWeather("rain")
          } else if (weatherCode >= 71 && weatherCode <= 77 || weatherCode >= 85 && weatherCode <= 86) {
            setAutoWeather("snow")
          } else {
            setAutoWeather("none")
          }
        }
      } catch (error) {
        console.error("Failed to fetch weather:", error)
        if (weatherCondition === "auto") {
          setAutoWeather("none")
        }
      }
    }

    // Fetch immediately
    fetchWeather()

    // Refresh every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000)

    return () => clearInterval(interval)
  }, [weatherCondition])

  // Determine actual weather to display
  const actualWeather = weatherCondition === "auto" ? autoWeather : weatherCondition
  const isRaining = actualWeather === "rain"
  const isSnowing = actualWeather === "snow"

  return (
    <WeatherContext.Provider value={{ isRaining, isSnowing, weatherCondition, cycleWeather, temperature }}>
      {children}
    </WeatherContext.Provider>
  )
}

export function useWeather() {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider")
  }
  return context
}
