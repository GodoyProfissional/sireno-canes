import React from 'react'
import { Heart, Star, Lightbulb } from 'lucide-react'

export const HUD = ({
  lives,
  xp,
  combo,
  hints,
  timeElapsed,
  levelName,
  levelProgress,
  onUseHint,
  hintCount = 0,
  showHintButton = true,
}) => {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <div className="w-full flex justify-between items-center mb-4 glass p-3 md:p-4 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
      {/* Vidas e Dica */}
      <div className="flex flex-col gap-2">
        <div className="flex text-danger-500 gap-1 text-xl drop-shadow-md">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              size={24}
              fill={i < lives ? '#ef4444' : 'none'}
              strokeWidth={i < lives ? 0 : 1.5}
              className={i >= lives ? 'text-gray-400 dark:text-gray-600' : ''}
            />
          ))}
        </div>
        {showHintButton && (
          <button
            onClick={onUseHint}
            className="flex items-center gap-1.5 text-xs bg-warning-100 dark:bg-warning-900/60 text-warning-700 dark:text-warning-400 px-2 py-1 rounded-md border border-warning-200 dark:border-warning-700 shadow-sm transition-colors hover:scale-105"
          >
            <Lightbulb size={14} className="text-warning-500" fill="#f59e0b" strokeWidth={1.5} />
            Dica (<span className="font-bold">{hints}</span>)
            {hintCount > 0 && (
              <span className="ml-1 text-[10px] bg-warning-500 text-white px-1.5 py-0.5 rounded-full">
                {hintCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Nível e Timer */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-xs font-bold text-white bg-gradient-to-r from-gray-700 to-gray-900 px-3 py-1 rounded-t-lg shadow-inner">
          <Star size={14} className="fill-yellow-400 text-yellow-400" strokeWidth={0} />
          <span>{levelName}</span>
        </div>
        <div className="font-mono font-bold text-2xl text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800 px-4 py-1 rounded-b-lg border border-gray-300 dark:border-gray-700">
          {formatTime(timeElapsed)}
        </div>
      </div>

      {/* XP */}
      <div className="flex flex-col items-end">
        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mb-1">
          Experiência
        </span>
        <div className="flex items-center gap-2">
          {combo >= 2 && (
            <span className="bg-gradient-to-r from-warning-400 to-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm animate-bounce-slight">
              x{combo}
            </span>
          )}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-600 text-2xl drop-shadow-sm">
            {xp}
          </span>
        </div>
        <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
          <div
            className="bg-blue-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
