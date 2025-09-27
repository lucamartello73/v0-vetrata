"use client"

import { useRouter } from "next/navigation"

export default function SeasonalUrgency() {
  const router = useRouter()

  return (
    <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card principale */}
        <div className="bg-white rounded-2xl shadow-2xl border-l-8 border-orange-500 overflow-hidden">
          <div className="p-8 lg:p-12">
            {/* Header con icona e titolo */}
            <div className="flex items-start gap-6 mb-8">
              <div className="text-6xl">🍂</div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Settembre-Ottobre: Il Momento Perfetto per Installare
                </h2>
              </div>
            </div>

            {/* Due colonne di contenuto */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-8">
              {/* Colonna sinistra - Perché ADESSO */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-green-600 flex items-center gap-2">
                  <span>✅</span>
                  Perché ADESSO
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span className="text-gray-700">Clima ideale per l'installazione</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span className="text-gray-700">Nessuna fretta per le ferie estive</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span className="text-gray-700">Pronto per la stagione autunnale</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">•</span>
                    <span className="text-gray-700">Preventivi più accurati</span>
                  </li>
                </ul>
              </div>

              {/* Colonna destra - Perché NON aspettare */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-red-600 flex items-center gap-2">
                  <span>⚠️</span>
                  Perché NON aspettare
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">Primavera 2025: +20% richieste</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">Inverno: Condizioni sfavorevoli</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">Materiali: Rincari programmati</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">Disponibilità: Lista d'attesa</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Box finale arancione */}
            <div className="bg-orange-500 rounded-xl p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="text-center lg:text-left">
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                    Promozione Settembre: Preventivo gratuito + Sconto 15%
                  </h3>
                  <p className="text-orange-100">Offerta valida solo fino al 30 Settembre 2024</p>
                </div>
                <button
                  onClick={() => router.push("/contatti")}
                  className="bg-white text-orange-600 font-bold px-8 py-4 rounded-lg hover:bg-orange-50 transition-colors duration-200 whitespace-nowrap shadow-lg"
                >
                  BLOCCA IL PREZZO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
