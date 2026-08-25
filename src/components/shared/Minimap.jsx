import React from 'react'
import * as LucideIcons from 'lucide-react'

// Mapeamento COMPLETO de ícones Phosphor para Lucide
const iconMap = {
  // Ícones usados no Minimap
  'ph-map-pin': 'MapPin',
  'ph-bell-ringing': 'BellRing',
  'ph-list-numbers': 'ListOrdered',
  'ph-stairs': 'Star',
  'ph-elevator': 'PanelTopDashed',
  'ph-users': 'Users',
  'ph-warning': 'TriangleAlert',
  'ph-device-mobile': 'Smartphone',
  'ph-handshake': 'Handshake',
  'ph-backpack': 'Backpack',
  'ph-users-three': 'Users',
  'ph-map-trifold': 'Map',
  'ph-magnifying-glass': 'Search',

  // Ícones usados em outros lugares
  'ph-shield-check': 'ShieldCheck',
  'ph-star': 'Star',
  'ph-eye': 'Eye',
  'ph-medal': 'Medal',
  'ph-trophy': 'Trophy',
  'ph-student': 'GraduationCap',
  'ph-rocket-launch': 'Rocket',
  'ph-play-circle': 'PlayCircle',
  'ph-arrow-counter-clockwise': 'RotateCcw',
  'ph-arrow-right': 'ArrowRight',
  'ph-check-circle': 'CheckCircle',
  'ph-x-circle': 'XCircle',
  'ph-warning-circle': 'AlertCircle',
  'ph-flag-checkered': 'Flag',
  'ph-target': 'Target',
  'ph-timer': 'Timer',
  'ph-trend-up': 'TrendingUp',
  'ph-share-network': 'Share2',
  'ph-moon': 'Moon',
  'ph-sun': 'Sun',
  'ph-lightbulb': 'Lightbulb',
  'ph-heart': 'Heart',
  'ph-check-fat': 'Check',
  'ph-arrow-down': 'ArrowDown',
  'ph-hand-swipe': 'Hand',
  'ph-mask-happy': 'Smile',
  'ph-fire': 'Flame',
  'ph-wheelchair': 'Wheelchair',
  'ph-hands-clapping': 'Clap',
  'ph-signpost': 'Signpost',
  'ph-sneaker': 'Footprints',
  'ph-hand-palm': 'Hand',
  'ph-person-simple-snowboard': 'Snowboard',
  'ph-person-simple-walk': 'Walk',
  'ph-smiley-sad': 'Frown',
  'ph-camera': 'Camera',
  'ph-arrow-left': 'ArrowLeft',
  'ph-person-simple-run': 'Run',
  'ph-hand-heart': 'HeartHandshake',
  'ph-speaker-slash': 'VolumeX',
  'ph-shield-plus': 'ShieldPlus',
}

// Função para renderizar ícones com fallback
const renderIcon = (iconName, className = 'w-4 h-4') => {
  if (!iconName) return null

  // Tenta encontrar no mapa
  let lucideName = iconMap[iconName]

  // Se não encontrar, tenta remover 'ph-'
  if (!lucideName) {
    lucideName = iconName.replace('ph-', '')
  }

  // Tenta encontrar o ícone no Lucide
  let IconComponent = LucideIcons[lucideName]

  // Se não encontrar, tenta capitalizar (ex: 'map-pin' -> 'MapPin')
  if (!IconComponent) {
    const fallbackName = lucideName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
    IconComponent = LucideIcons[fallbackName]
  }

  // Se ainda não encontrar, tenta com o nome original
  if (!IconComponent) {
    IconComponent = LucideIcons[iconName]
  }

  if (IconComponent) {
    return <IconComponent className={className} size={16} strokeWidth={1.5} />
  }

  // Fallback: mostra o nome do ícone como texto
  return (
    <span className={`${className} text-[10px] font-bold`}>
      {iconName.replace('ph-', '').substring(0, 2)}
    </span>
  )
}

export const Minimap = ({ currentIndex, questions }) => {
  // ===== CALCULAR PROGRESSO PARA ACESSIBILIDADE =====
  const totalQuestions = questions.length
  const currentQuestion = currentIndex + 1
  const progressPercent = Math.round((currentQuestion / totalQuestions) * 100)

  return (
    <div
      className="flex items-center gap-1 md:gap-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md px-4 py-2 rounded-full shadow-sm text-xs font-medium text-gray-500 dark:text-gray-400 overflow-x-auto max-w-full"
      role="navigation"
      aria-label="Mapa de progresso das fases"
    >
      {/* ===== PROGRESSO OCULTO PARA SCREEN READER ===== */}
      <div
        className="sr-only"
        role="progressbar"
        aria-valuenow={currentQuestion}
        aria-valuemin={1}
        aria-valuemax={totalQuestions}
        aria-label={`Progresso: ${currentQuestion} de ${totalQuestions} fases concluídas, ${progressPercent}% completo`}
      >
        {`Fase ${currentQuestion} de ${totalQuestions}`}
      </div>

      {questions.map((q, idx) => {
        const isPast = idx < currentIndex
        const isCurrent = idx === currentIndex
        let classes =
          'flex items-center justify-center w-8 h-8 rounded-full transition-all shrink-0 '

        if (isCurrent) {
          classes += 'bg-primary-500 text-white shadow-[0_0_10px_rgba(14,165,233,0.8)] scale-110'
        } else if (isPast) {
          classes += 'bg-success-500 text-white opacity-80'
        } else {
          classes += 'bg-gray-200 dark:bg-gray-700 text-gray-500'
        }

        // ===== STATUS PARA ACESSIBILIDADE =====
        let statusText = ''
        if (isCurrent) statusText = ' (atual)'
        else if (isPast) statusText = ' (concluída)'
        else statusText = ' (pendente)'

        return (
          <React.Fragment key={idx}>
            <div
              className={classes}
              title={`${q.room}${statusText}`}
              role="img"
              aria-label={`Fase ${idx + 1}: ${q.room}${statusText}`}
            >
              {renderIcon(q.roomIcon, 'w-4 h-4')}
            </div>
            {idx < questions.length - 1 && (
              <div
                className={`w-2 h-0.5 md:w-4 shrink-0 ${isPast ? 'bg-success-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}
