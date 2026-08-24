import React, { useState, useEffect } from 'react'
import * as LucideIcons from 'lucide-react'

// Mapeamento de ícones para BubbleSelect
const bubbleIconMap = {
  'ph-users-three': 'Users',
  'ph-mask-happy': 'Smile',
  'ph-fire': 'Flame',
  'ph-wheelchair': 'Wheelchair',
  'ph-check-circle': 'CheckCircle',
  'ph-hands-clapping': 'Clap',
  'ph-stairs': 'Stairs',
  'ph-signpost': 'Signpost',
  'ph-handshake': 'Handshake',
  'ph-shield-plus': 'ShieldPlus',
  'ph-sneaker': 'Footprints',
  'ph-hand-palm': 'Hand',
  'ph-person-simple-snowboard': 'Snowboard',
  'ph-arrow-right': 'ArrowRight',
  'ph-hand': 'Hand',
  'ph-eye': 'Eye',
  'ph-smiley-sad': 'Frown',
  'ph-camera': 'Camera',
  'ph-arrow-left': 'ArrowLeft',
  'ph-person-simple-run': 'Run',
  'ph-hand-heart': 'HeartHandshake',
  'ph-speaker-slash': 'VolumeX',
  'ph-person-simple-walk': 'Walk',
  'ph-device-mobile': 'Smartphone',
  'ph-elevator': 'Elevator',
  'ph-warning': 'TriangleAlert',
}

const renderBubbleIcon = (iconName, className = 'w-5 h-5 md:w-6 md:h-6', size = 20) => {
  if (!iconName) return null

  const lucideName = bubbleIconMap[iconName] || iconName.replace('ph-', '')
  const IconComponent = LucideIcons[lucideName]

  if (IconComponent) {
    return <IconComponent className={`${className} pointer-events-none`} size={size} />
  }

  // Fallback: tenta capitalizar
  const fallbackName = iconName
    .replace('ph-', '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
  const FallbackIcon = LucideIcons[fallbackName]

  if (FallbackIcon) {
    return <FallbackIcon className={`${className} pointer-events-none`} size={size} />
  }

  return <span className={className}>🔹</span>
}

export const BubbleSelect = ({ question, onAnswer }) => {
  const [selected, setSelected] = useState(new Set())
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600)

  useEffect(() => {
    setSelected(new Set())

    const handleResize = () => {
      setIsMobile(window.innerWidth < 600)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [question.id])

  const handleSelect = (index) => {
    setSelected((prev) => {
      const newSelected = new Set(prev)
      if (newSelected.has(index)) {
        newSelected.delete(index)
      } else {
        newSelected.add(index)
      }
      return newSelected
    })
  }

  const handleConfirm = () => {
    if (selected.size === 0) {
      alert('Selecione pelo menos uma opção antes de verificar.')
      return
    }

    let isCorrect = true
    question.bubbles.forEach((b, i) => {
      const isSelected = selected.has(i)
      if ((b.isCorrect && !isSelected) || (!b.isCorrect && isSelected)) {
        isCorrect = false
      }
    })

    onAnswer(isCorrect)
  }

  return (
    <div className="mt-4 flex flex-col w-full">
      <div className="relative w-full" style={{ minHeight: '420px' }}>
        {/* Imagem Central */}
        {question.centerImage && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-[0_0_20px_rgba(0,0,0,0.3)] overflow-hidden bg-white group-hover:scale-105 transition-transform">
              <img src={question.centerImage} className="w-full h-full object-cover" alt="Centro" />
            </div>
          </div>
        )}

        {/* Bolhas ao redor */}
        <div className="absolute inset-0 w-full h-full" id="bubbles-wrapper">
          {question.bubbles.map((b, i) => {
            const total = question.bubbles.length
            const angle = (i / total) * 2 * Math.PI - Math.PI / 2
            const radiusX = isMobile ? 38 : 32
            const radiusY = 40
            const left = 50 + Math.cos(angle) * radiusX
            const top = 50 + Math.sin(angle) * radiusY
            const isSelected = selected.has(i)

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`bubble-btn absolute transform -translate-x-1/2 -translate-y-1/2 px-2 py-1 md:px-4 md:py-2 flex flex-col items-center justify-center gap-1 rounded-xl border-2 ${
                  isSelected
                    ? 'border-primary-500 bg-primary-100 dark:bg-primary-900 text-primary-800'
                    : 'border-gray-300 dark:border-gray-600 bg-white/95 dark:bg-gray-800/95 text-gray-800 dark:text-gray-200'
                } font-bold shadow-md hover:scale-110 hover:z-30 transition-all text-[10px] md:text-sm text-center min-w-[80px] max-w-[110px] md:max-w-[140px]`}
                style={{ left: `${left}%`, top: `${top}%` }}
                role="checkbox"
                aria-checked={isSelected}
              >
                {b.icon &&
                  renderBubbleIcon(b.icon, 'w-5 h-5 md:w-6 md:h-6 pointer-events-none', 24)}
                <span className="pointer-events-none leading-tight">{b.text}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleConfirm}
          className="w-full max-w-xs py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl shadow-lg transition-colors text-lg uppercase tracking-wide"
        >
          Verificar Seleção
        </button>
      </div>
    </div>
  )
}
