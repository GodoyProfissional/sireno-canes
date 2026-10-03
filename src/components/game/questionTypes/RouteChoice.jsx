import React from 'react'
import * as LucideIcons from 'lucide-react'

// Mapeamento de ícones
const iconMap = {
  'ph-stairs': 'Stairs',
  'ph-elevator': 'Elevator',
}

const renderIcon = (iconName, className = 'w-12 h-12') => {
  if (!iconName) return null

  const cleanName = iconName.replace('ph-', '')
  const lucideName = iconMap[iconName] || cleanName
  const IconComponent = LucideIcons[lucideName] || LucideIcons[cleanName]

  if (IconComponent) {
    return <IconComponent className={className} strokeWidth={1.5} />
  }

  const fallbackName = cleanName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
  const FallbackIcon = LucideIcons[fallbackName]

  if (FallbackIcon) {
    return <FallbackIcon className={className} strokeWidth={1.5} />
  }

  return <span className={className}>🔹</span>
}

export const RouteChoice = ({ question, onAnswer }) => {
  const handleClick = (isCorrect, buttonElement) => {
    if (isCorrect) {
      buttonElement.classList.add(
        'border-success-500',
        'bg-success-50',
        'dark:bg-success-900/30',
        'scale-[1.02]',
      )
      setTimeout(() => onAnswer(true), 500)
    } else {
      buttonElement.classList.add(
        'border-danger-500',
        'bg-danger-50',
        'dark:bg-danger-900/30',
        'animate-shake',
      )
      setTimeout(() => onAnswer(false), 500)
    }
  }

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
      {question.routes.map((route) => (
        <button
          key={route.id}
          onClick={(e) => handleClick(route.isCorrect, e.currentTarget)}
          className="route-btn group relative p-8 rounded-3xl border-3 border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-lg overflow-hidden"
          role="button"
          aria-label={route.title}
        >
          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:via-primary-500/10 group-hover:to-primary-500/5 transition-all duration-500 pointer-events-none" />

          {/* Título */}
          <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {route.title}
          </h3>

          {/* Divisor */}
          <div className="w-12 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full mb-4 group-hover:w-20 transition-all duration-300" />

          {/* Descrição */}
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-xs">
            {route.desc}
          </p>

          {/* Seta indicativa no hover */}
          <div className="mt-5 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <span className="inline-flex items-center gap-1.5 text-primary-600 dark:text-primary-400 text-sm font-bold">
              Escolher esta rota
              <LucideIcons.ArrowRight size={16} aria-hidden="true" />
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
