import React from 'react'
import { GraduationCap, Heart, TrendingUp, Rocket } from 'lucide-react'
import fundoTutorial from '../../assets/imagens/Senac-fogo.png'

export const TutorialScreen = ({ onStart }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${fundoTutorial})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-black/60 z-1" aria-hidden="true"></div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-1"
        aria-hidden="true"
      ></div>

      {/* ===== SKIP LINK ===== */}
      <a href="#tutorial-content" className="skip-link">
        Pular para o conteúdo do tutorial
      </a>

      <div
        id="tutorial-content"
        className="w-full max-w-3xl glass rounded-3xl shadow-2xl overflow-hidden animate-slide-up border border-white/50 dark:border-gray-700/50 relative z-10"
      >
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-center text-white">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
            <GraduationCap size={32} className="text-primary-400" aria-hidden="true" />
            Como Funciona
          </h1>
        </div>

        <div className="p-8 space-y-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
          <p className="text-center text-gray-700 dark:text-gray-300 font-medium text-lg">
            Você deverá tomar decisões durante uma situação simulada de emergência. Observe bem as
            perguntas e avance até a saída segura.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50/80 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
              <Heart
                size={32}
                className="text-danger-500 flex-shrink-0"
                fill="#ef4444"
                aria-hidden="true"
              />
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white">Vidas e Tentativas</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Você não avança se errar. Perder as 3 vidas zera seu XP, mas você continua de onde
                  parou.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50/80 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
              <TrendingUp size={32} className="text-success-500 flex-shrink-0" aria-hidden="true" />
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white">Pontuação (XP)</h2>
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
              aria-label="Começar o treinamento"
            >
              Começar <Rocket size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
