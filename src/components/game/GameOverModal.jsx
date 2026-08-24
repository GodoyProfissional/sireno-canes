import React, { useState, useEffect } from 'react'
import { AlertCircle, RotateCcw } from 'lucide-react'

export const GameOverModal = ({ isOpen, onContinue }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-danger-900/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div
        className={`bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md p-8 text-center transform transition-all duration-300
          ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
      >
        <AlertCircle
          size={64}
          className="text-danger-500 mb-4 animate-bounce-slight mx-auto"
          strokeWidth={1.5}
        />
        <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Atenção!</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Você perdeu todas as vidas. Sua pontuação foi zerada, mas não desista, tente novamente
          nesta mesma etapa.
        </p>
        <button
          onClick={onContinue}
          className="w-full py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-bold text-lg rounded-xl shadow-lg hover:scale-105 transition-transform flex justify-center items-center gap-2"
        >
          Continuar Missão (0 XP)
          <RotateCcw size={24} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
