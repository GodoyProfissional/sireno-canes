import React, { useEffect, useRef } from 'react'
import {
  Flag,
  Star,
  Target,
  Timer,
  TrendingUp,
  Medal,
  RotateCcw,
  Share2,
  Trophy,
  ShieldCheck,
} from 'lucide-react'
import confetti from 'canvas-confetti'

export const ResultsScreen = ({ state, onRestart }) => {
  const { state: gameState, LEVELS_CONFIG, getLevel } = state
  const confettiTriggered = useRef(false)

  const accuracy =
    gameState.totalAttempts > 0
      ? Math.round((gameState.totalCorrect / gameState.totalAttempts) * 100)
      : 0

  const level = getLevel(gameState.xp)
  const levelConfig = LEVELS_CONFIG[level]

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  // ===== FOGOS DE ARTIFÍCIO / CONFETES =====
  useEffect(() => {
    if (!confettiTriggered.current) {
      confettiTriggered.current = true

      // Confetes principais
      const duration = 5 * 1000
      const end = Date.now() + duration

      const colors = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

      ;(function frame() {
        // Confete da esquerda
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 80,
          origin: { x: 0, y: 0.6 },
          colors: colors,
          startVelocity: 30,
        })

        // Confete da direita
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 80,
          origin: { x: 1, y: 0.6 },
          colors: colors,
          startVelocity: 30,
        })

        // Confete do centro (explosão)
        confetti({
          particleCount: 15,
          spread: 100,
          origin: { x: 0.5, y: 0.4 },
          colors: colors,
          startVelocity: 25,
        })

        // Estrelas
        confetti({
          particleCount: 5,
          spread: 60,
          origin: { x: 0.3, y: 0.2 },
          colors: ['#fbbf24', '#f59e0b', '#fcd34d'],
          shapes: ['star'],
          startVelocity: 20,
        })

        confetti({
          particleCount: 5,
          spread: 60,
          origin: { x: 0.7, y: 0.2 },
          colors: ['#fbbf24', '#f59e0b', '#fcd34d'],
          shapes: ['star'],
          startVelocity: 20,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      })()

      // Segunda rodada de confetes após 2 segundos
      setTimeout(() => {
        const end2 = Date.now() + 3000
        ;(function frame2() {
          confetti({
            particleCount: 10,
            spread: 120,
            origin: { x: 0.2, y: 0.8 },
            colors: ['#ec4899', '#8b5cf6', '#06b6d4'],
            startVelocity: 35,
          })
          confetti({
            particleCount: 10,
            spread: 120,
            origin: { x: 0.8, y: 0.8 },
            colors: ['#ec4899', '#8b5cf6', '#06b6d4'],
            startVelocity: 35,
          })
          if (Date.now() < end2) {
            requestAnimationFrame(frame2)
          }
        })()
      }, 2000)

      // Terceira rodada após 4 segundos
      setTimeout(() => {
        const end3 = Date.now() + 2000
        ;(function frame3() {
          confetti({
            particleCount: 20,
            spread: 150,
            origin: { x: 0.5, y: 0.3 },
            colors: ['#f59e0b', '#ef4444', '#22c55e', '#0ea5e9'],
            startVelocity: 40,
          })
          if (Date.now() < end3) {
            requestAnimationFrame(frame3)
          }
        })()
      }, 4000)
    }
  }, [])

  const getMedals = () => {
    const medals = []
    if (level >= 3) {
      medals.push({
        icon: Medal,
        color: 'text-yellow-500',
        bg: 'bg-gradient-to-br from-yellow-100 to-amber-200',
        name: 'Mestre Brigadista',
        border: 'border-yellow-400',
      })
    }
    if (level >= 2) {
      medals.push({
        icon: ShieldCheck,
        color: 'text-blue-500',
        bg: 'bg-gradient-to-br from-blue-100 to-cyan-200',
        name: 'Brigadista Honorário',
        border: 'border-blue-400',
      })
    }
    if (gameState.totalCorrect >= 10) {
      medals.push({
        icon: Trophy,
        color: 'text-purple-500',
        bg: 'bg-gradient-to-br from-purple-100 to-violet-200',
        name: 'Especialista em Evacuação',
        border: 'border-purple-400',
      })
    }
    if (medals.length === 0) {
      medals.push({
        icon: Star,
        color: 'text-gray-500',
        bg: 'bg-gray-100',
        name: 'Em Treinamento',
        border: 'border-gray-300',
      })
    }
    return medals
  }

  const handleShare = async () => {
    const text = `🏆 Completei a Missão de Evacuação!\n\n⭐ ${gameState.xp} XP\n🎯 ${accuracy}% de precisão\n⏱️ ${formatTime(gameState.timeElapsed)}\n📊 Nível: ${levelConfig.name}\n\nTreine você também! #EscapeDaUnidade #SegurançaSenac`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Missão de Evacuação - Escape da Unidade',
          text: text,
        })
      } catch (e) {}
    } else {
      try {
        await navigator.clipboard.writeText(text)
        alert('Resultados copiados para a área de transferência!')
      } catch (e) {
        prompt('Copie os resultados:', text)
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative">
      {/* Overlay de festa com animação */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-primary-500/5"></div>
      </div>

      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-slide-up relative z-10">
        <div className="bg-gradient-to-r from-success-600 to-emerald-500 p-10 text-center text-white relative overflow-hidden">
          {/* Decoração de festa */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <Flag
            size={72}
            className="mb-4 relative z-10 animate-bounce-slight mx-auto"
            strokeWidth={1.5}
          />
          <h2 className="text-4xl font-extrabold relative z-10 tracking-tight">
            🎉 Treinamento Concluído! 🎉
          </h2>
          <p className="opacity-90 mt-2 text-lg relative z-10">
            Parabéns! Você completou a missão de evacuação com sucesso!
          </p>
        </div>

        <div className="p-8 md:p-10">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-2xl text-center border border-gray-100 dark:border-gray-600 shadow-sm">
              <Star size={32} className="text-warning-500 mb-2 mx-auto" fill="#f59e0b" />
              <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                XP Total
              </div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {gameState.xp}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-2xl text-center border border-gray-100 dark:border-gray-600 shadow-sm">
              <Target size={32} className="text-primary-500 mb-2 mx-auto" strokeWidth={1.5} />
              <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                Precisão
              </div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {accuracy}%
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-2xl text-center border border-gray-100 dark:border-gray-600 shadow-sm">
              <Timer size={32} className="text-blue-500 mb-2 mx-auto" strokeWidth={1.5} />
              <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                Tempo
              </div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                {formatTime(gameState.timeElapsed)}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-2xl text-center border border-gray-100 dark:border-gray-600 shadow-sm">
              <TrendingUp size={32} className="text-purple-500 mb-2 mx-auto" strokeWidth={1.5} />
              <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                Nível Final
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white mt-1 leading-tight">
                {levelConfig.name}
              </div>
            </div>
          </div>

          {/* Medals */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center gap-2">
              <Medal size={24} className="text-warning-500" />
              Conquistas
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {getMedals().map((medal, index) => {
                const IconComponent = medal.icon
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-3 transform hover:scale-110 transition-all cursor-default group"
                  >
                    <div
                      className={`w-20 h-20 rounded-full ${medal.bg} flex items-center justify-center border-4 ${medal.border} shadow-lg relative overflow-hidden`}
                    >
                      <IconComponent
                        size={40}
                        className={`${medal.color} drop-shadow-md`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 max-w-[100px] leading-tight text-center">
                      {medal.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRestart}
              className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={24} strokeWidth={1.5} />
              Refazer Simulação
            </button>
            <button
              onClick={handleShare}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Share2 size={24} strokeWidth={1.5} />
              Compartilhar Resultado
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
