import React from 'react'
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

export const ResultsScreen = ({ state, onRestart }) => {
  const { state: gameState, LEVELS_CONFIG, getLevel } = state

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
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        <div className="bg-gradient-to-r from-success-600 to-emerald-500 p-10 text-center text-white relative overflow-hidden">
          <Flag
            size={72}
            className="mb-4 relative z-10 animate-bounce-slight mx-auto"
            strokeWidth={1.5}
          />
          <h2 className="text-4xl font-extrabold relative z-10 tracking-tight">
            Treinamento Concluído!
          </h2>
          <p className="opacity-90 mt-2 text-lg relative z-10">
            Este quiz foi criado para tornar o ambiente mais seguro e preparar todos para agir
            corretamente em situações de emergência.
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
