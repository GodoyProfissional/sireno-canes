import React, { useState, useEffect } from 'react'
import { Check, AlertCircle, ArrowRight } from 'lucide-react'

export const FeedbackModal = ({ isOpen, data, onClose, onNext }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isVisible || !data) return null

  const { isCorrect, question, xpEarned, combo, lives } = data

  const handleButtonClick = () => {
    onClose()
    if (onNext) {
      setTimeout(onNext, 300)
    }
  }

  const renderExplanation = () => {
    let html = isCorrect ? question.explanationCorrect : question.explanationWrong

    // Se tiver HTML com balão do Sireno, renderiza como HTML
    if (html && (html.includes('sireno-balloon') || html.includes('Sireno diz'))) {
      return <div dangerouslySetInnerHTML={{ __html: html }} />
    }

    return <p>{html}</p>
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div
        className={`bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg p-8 transform transition-all duration-300 border border-gray-100 dark:border-gray-700
          ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
      >
        <div
          className={`w-24 h-24 rounded-full mx-auto -mt-16 flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-800
          ${isCorrect ? 'bg-success-500' : 'bg-danger-500'}`}
        >
          {isCorrect ? (
            <Check size={48} className="text-white" strokeWidth={2} />
          ) : (
            <AlertCircle size={48} className="text-white" strokeWidth={2} />
          )}
        </div>

        <div className="text-center mt-6">
          <h3
            className={`text-3xl font-extrabold mb-3
            ${isCorrect ? 'text-success-600 dark:text-success-500' : 'text-danger-600 dark:text-danger-500'}`}
          >
            {isCorrect ? 'Correto!' : 'Atenção!'}
          </h3>

          <div className="text-gray-600 dark:text-gray-300 mb-8 text-base md:text-lg leading-relaxed text-left">
            {renderExplanation()}

            <div className="flex justify-center items-center gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <span
                className={`inline-block px-3 py-1.5 rounded-lg font-bold border
                ${
                  isCorrect
                    ? 'bg-blue-100 text-blue-800 border-blue-200'
                    : 'bg-danger-100 text-danger-700 border-danger-200'
                }`}
              >
                {isCorrect ? `+${xpEarned} XP` : '❤️ Vida perdida (-1)'}
              </span>
              {isCorrect && combo > 1 && (
                <span className="inline-block bg-warning-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  Combo x{combo}!
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleButtonClick}
            className={`w-full py-4 font-bold rounded-xl hover:scale-105 transition-transform text-lg shadow-lg flex items-center justify-center gap-2
              ${
                isCorrect
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : lives <= 0
                    ? 'bg-danger-600 hover:bg-danger-700 text-white'
                    : 'border-2 border-danger-500 text-danger-700 dark:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-900/20'
              }`}
          >
            {isCorrect ? (
              <>
                Próxima Pergunta <ArrowRight size={24} strokeWidth={1.5} />
              </>
            ) : lives <= 0 ? (
              <>
                Perdeu Vidas <AlertCircle size={24} strokeWidth={1.5} />
              </>
            ) : (
              <>
                Tentar Novamente <ArrowRight size={24} strokeWidth={1.5} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
