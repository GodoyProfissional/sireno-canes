import React from 'react'
import { GraduationCap, Heart, TrendingUp, Rocket } from 'lucide-react'

export const TutorialScreen = ({ onStart }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-3xl glass rounded-3xl shadow-2xl overflow-hidden animate-slide-up border border-white/50 dark:border-gray-700/50">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-center text-white">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
            <GraduationCap size={32} className="text-primary-400" />
            Como Funciona
          </h2>
        </div>

        <div className="p-8 space-y-6">
          <p className="text-center text-gray-700 dark:text-gray-300 font-medium text-lg">
            Você deverá tomar decisões durante uma situação simulada de emergência. Observe bem as
            perguntas e avance até a saída segura.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
              <Heart size={32} className="text-danger-500" fill="#ef4444" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Vidas e Tentativas</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Você não avança se errar. Perder as 3 vidas zera seu XP, mas você continua de onde
                  parou.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
              <TrendingUp size={32} className="text-success-500" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Pontuação (XP)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ganhe XP acertando alternativas para subir de nível de Brigadista.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-center border-t border-gray-200 dark:border-gray-700 mt-6">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-lg rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-lg"
            >
              Começar <Rocket size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
