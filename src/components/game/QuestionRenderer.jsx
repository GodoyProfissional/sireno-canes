import React from 'react'
import { MultipleChoice } from './questionTypes/MultipleChoice'
import { BubbleSelect } from './questionTypes/BubbleSelect'
import { DragMatch } from './questionTypes/DragMatch'
import { Sequence } from './questionTypes/Sequence'
import { ImageHotspot } from './questionTypes/ImageHotspot'
import { RouteChoice } from './questionTypes/RouteChoice'
import { SpotError } from './questionTypes/SpotError'
import * as LucideIcons from 'lucide-react'

// Mapeamento de ícones Phosphor para Lucide
const iconMap = {
  'ph-map-pin': 'MapPin',
  'ph-bell-ringing': 'BellRing',
  'ph-list-numbers': 'ListOrdered',
  'ph-stairs': 'Stairs',
  'ph-elevator': 'Elevator',
  'ph-users': 'Users',
  'ph-warning': 'TriangleAlert',
  'ph-device-mobile': 'Smartphone',
  'ph-handshake': 'Handshake',
  'ph-backpack': 'Backpack',
  'ph-map-trifold': 'Map',
  'ph-magnifying-glass': 'Search',
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

// Função para renderizar ícones Lucide
const renderIcon = (iconName, className = 'w-5 h-5', size = 20) => {
  if (!iconName) return null

  const cleanName = iconName.replace('ph-', '')
  const lucideName = iconMap[iconName] || cleanName
  const IconComponent = LucideIcons[lucideName] || LucideIcons[cleanName]

  if (IconComponent) {
    return <IconComponent className={className} size={size} strokeWidth={1.5} />
  }

  const fallbackName = cleanName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
  const FallbackIcon = LucideIcons[fallbackName]

  if (FallbackIcon) {
    return <FallbackIcon className={className} size={size} strokeWidth={1.5} />
  }

  return <span className={className}>🔹</span>
}

export const QuestionRenderer = ({ question, index, total, onAnswer }) => {
  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple-choice':
        return <MultipleChoice question={question} onAnswer={onAnswer} />
      case 'bubble-select':
        return <BubbleSelect question={question} onAnswer={onAnswer} />
      case 'drag-match':
        return <DragMatch question={question} onAnswer={onAnswer} />
      case 'sequence':
        return <Sequence question={question} onAnswer={onAnswer} />
      case 'image-hotspot':
        return <ImageHotspot question={question} onAnswer={onAnswer} />
      case 'route-choice':
        return <RouteChoice question={question} onAnswer={onAnswer} />
      case 'spot-the-error':
        return <SpotError question={question} onAnswer={onAnswer} />
      default:
        return (
          <div className="text-red-500 font-bold">
            Tipo de pergunta não suportado: {question.type}
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="inline-flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm">
            {renderIcon(question.roomIcon, 'w-4 h-4', 16)}
            {question.room}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {index + 1}/{total}
          </span>
        </div>
        <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
          {question.situation}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 font-medium md:text-lg bg-gray-50 dark:bg-gray-800/80 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-inner">
          {question.question}
        </p>
      </div>
      <div className="flex-1 w-full relative">{renderQuestion()}</div>
    </div>
  )
}
