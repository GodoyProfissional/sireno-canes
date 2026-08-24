import React from 'react'
import { ArrowRight } from 'lucide-react'

export const MultipleChoice = ({ question, onAnswer }) => {
  return (
    <div className="space-y-3 mt-4" role="radiogroup" aria-label="Opções de resposta">
      {question.options.map((opt) => (
        <button
          key={opt.id}
          data-opt={opt.id}
          onClick={() => onAnswer(opt.id === question.correctAnswer)}
          className="w-full text-left p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group flex items-center justify-between glass shadow-sm"
          role="radio"
        >
          <span className="text-gray-800 dark:text-gray-200 font-medium md:text-lg">
            {opt.text}
          </span>
          <ArrowRight
            size={24}
            className="text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all"
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  )
}
