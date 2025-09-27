"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function UrgencyBanner() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 7,
    hours: 14,
    minutes: 23,
    seconds: 45,
  })

  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else if (days > 0) {
          days--
          hours = 23
          minutes = 59
          seconds = 59
        } else {
          // Timer finished
          clearInterval(timer)
          return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isVisible])

  if (!isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleCTAClick = () => {
    router.push("/prodotti")
  }

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-red-500 to-orange-500 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Main message */}
          <div className="flex items-center gap-2 text-white font-semibold text-center lg:text-left">
            <span className="animate-pulse text-xl">🔥</span>
            <span className="text-sm lg:text-base">
              OFFERTA LAMPO SETTEMBRE - Preventivo GRATUITO + Sconto 15% su tutte le strutture
            </span>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Timer container with semi-transparent black background */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl px-3 py-2 lg:px-4 lg:py-3">
              <div className="text-white font-bold text-xs lg:text-sm mb-2 text-center">Scade tra:</div>
              <div className="flex gap-2 md:gap-3">
                {/* Days */}
                <div className="bg-white rounded-lg shadow-lg min-w-[50px] md:min-w-[60px] h-16 md:h-20 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-200">
                  <div className="text-red-700 font-bold text-lg md:text-xl">
                    {timeLeft.days.toString().padStart(2, "0")}
                  </div>
                  <div className="text-gray-500 text-xs font-medium">GIORNI</div>
                </div>

                {/* Hours */}
                <div className="bg-white rounded-lg shadow-lg min-w-[50px] md:min-w-[60px] h-16 md:h-20 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-200">
                  <div className="text-red-700 font-bold text-lg md:text-xl">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </div>
                  <div className="text-gray-500 text-xs font-medium">ORE</div>
                </div>

                {/* Minutes */}
                <div className="bg-white rounded-lg shadow-lg min-w-[50px] md:min-w-[60px] h-16 md:h-20 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-200">
                  <div className="text-red-700 font-bold text-lg md:text-xl">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </div>
                  <div className="text-gray-500 text-xs font-medium">MIN</div>
                </div>

                {/* Seconds */}
                <div className="bg-white rounded-lg shadow-lg min-w-[50px] md:min-w-[60px] h-16 md:h-20 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-200">
                  <div className="text-red-700 font-bold text-lg md:text-xl">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </div>
                  <div className="text-gray-500 text-xs font-medium">SEC</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleCTAClick}
              className="bg-white text-red-600 font-bold px-4 py-2 rounded hover:bg-gray-100 transition-colors duration-200 text-sm lg:text-base whitespace-nowrap"
            >
              APPROFITTA ORA →
            </button>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors duration-200"
              aria-label="Chiudi banner"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
