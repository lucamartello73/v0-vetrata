"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const notifications = [
  {
    name: "Marco V.",
    city: "Genova",
    product: "pergola bioclimatica 4x3m",
    time: "2 min fa",
  },
  {
    name: "Giulia R.",
    city: "La Spezia",
    product: "carport doppio",
    time: "5 min fa",
  },
  {
    name: "Andrea M.",
    city: "Parma",
    product: "chiusure in vetro",
    time: "8 min fa",
  },
  {
    name: "Francesca L.",
    city: "Piacenza",
    product: "pergola 3x4m",
    time: "12 min fa",
  },
  {
    name: "Roberto S.",
    city: "Milano",
    product: "copertura auto",
    time: "15 min fa",
  },
]

export default function LiveNotifications() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setIsAnimating(true)

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length)
        setIsAnimating(false)
      }, 200)
    }, 4000)

    return () => clearInterval(interval)
  }, [isVisible])

  if (!isVisible) return null

  const currentNotification = notifications[currentIndex]

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 max-w-sm hidden md:block transition-all duration-300 ${
        isAnimating ? "transform -translate-x-2 opacity-80" : "transform translate-x-0 opacity-100"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-100 animate-slide-in-left">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-900">Preventivo Richiesto</span>
          </div>
          <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="text-sm text-gray-800">
            <span className="font-bold">{currentNotification.name}</span> da{" "}
            <span className="font-medium">{currentNotification.city}</span> ha richiesto preventivo per{" "}
            <span className="font-medium">{currentNotification.product}</span>
          </div>
          <div className="text-xs text-gray-500">{currentNotification.time}</div>
        </div>
      </div>
    </div>
  )
}
