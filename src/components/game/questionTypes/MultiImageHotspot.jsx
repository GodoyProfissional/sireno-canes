import React, { useState } from 'react'
import { CheckCircle, XCircle, MapPin } from 'lucide-react'

export const MultiImageHotspot = ({ question, onAnswer }) => {
  const [clickedHotspots, setClickedHotspots] = useState({})
  const [wrongClicks, setWrongClicks] = useState({})

  const handleHotspotClick = (imageIndex, hotspotIndex, isCorrect) => {
    // Se já clicou corretamente nesta imagem, ignora
    if (clickedHotspots[imageIndex]) return

    if (isCorrect) {
      const newClicked = { ...clickedHotspots, [imageIndex]: hotspotIndex }
      setClickedHotspots(newClicked)

      // Se clicou em todas as imagens corretamente
      if (Object.keys(newClicked).length === question.images.length) {
        setTimeout(() => {
          onAnswer(true)
        }, 800)
      }
    } else {
      // Marca o erro temporariamente
      setWrongClicks((prev) => ({ ...prev, [`${imageIndex}-${hotspotIndex}`]: true }))
      setTimeout(() => {
        setWrongClicks((prev) => {
          const newWrong = { ...prev }
          delete newWrong[`${imageIndex}-${hotspotIndex}`]
          return newWrong
        })
      }, 800)
    }
  }

  const totalImages = question.images.length
  const correctCount = Object.keys(clickedHotspots).length

  return (
    <div className="mt-4 flex flex-col w-full">
      {/* Contador de progresso */}
      <div className="mb-4 flex justify-center items-center gap-3">
        <div className="bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-200 px-4 py-2 rounded-full font-bold shadow-sm border border-primary-200 dark:border-primary-700">
          <MapPin size={18} className="inline mr-2" aria-hidden="true" />
          <span aria-live="polite">
            {correctCount} de {totalImages} pontos encontrados
          </span>
        </div>
      </div>

      {/* Grid com as duas imagens lado a lado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.images.map((image, imageIndex) => {
          const isFound = clickedHotspots[imageIndex] !== undefined
          return (
            <div
              key={imageIndex}
              className="flex flex-col rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 dark:border-gray-700 bg-black"
            >
              {/* Label da imagem */}
              <div
                className={`py-2 px-3 text-center text-sm font-bold transition-colors ${
                  isFound ? 'bg-success-500 text-white' : 'bg-gray-800 text-white'
                }`}
                role="status"
                aria-live="polite"
              >
                {isFound ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle size={16} aria-hidden="true" />
                    {image.label} — Encontrado!
                  </span>
                ) : (
                  <span>{image.label}</span>
                )}
              </div>

              {/* Imagem com hotspots */}
              <div className="relative flex-1">
                <img src={image.url} alt={image.alt} className="w-full h-auto object-cover block" />

                {/* Hotspots */}
                {image.hotspots.map((hotspot, hotspotIndex) => {
                  const isClicked = clickedHotspots[imageIndex] === hotspotIndex
                  const isWrong = wrongClicks[`${imageIndex}-${hotspotIndex}`]

                  if (isFound && !isClicked) return null

                  return (
                    <button
                      key={hotspotIndex}
                      onClick={() =>
                        handleHotspotClick(imageIndex, hotspotIndex, hotspot.isCorrect)
                      }
                      disabled={isFound}
                      className={`absolute cursor-pointer flex items-center justify-center rounded-full border-4 transition-all duration-300 ${
                        isClicked
                          ? 'border-success-400 bg-success-500/80 scale-110 shadow-[0_0_20px_rgba(34,197,94,0.8)]'
                          : isWrong
                            ? 'border-danger-400 bg-danger-500/80 animate-shake'
                            : 'border-white/40 bg-white/10 hover:bg-white/30 hover:border-white/80'
                      }`}
                      style={{
                        left: `${hotspot.x}%`,
                        top: `${hotspot.y}%`,
                        width: `${hotspot.width}%`,
                        height: `${hotspot.height}%`,
                      }}
                      aria-label={`${hotspot.label} na imagem ${image.label}${isClicked ? ' - já encontrado' : ''}`}
                      role="button"
                      tabIndex={isFound ? -1 : 0}
                    >
                      {isClicked ? (
                        <CheckCircle
                          size={48}
                          className="text-white drop-shadow-lg"
                          aria-hidden="true"
                        />
                      ) : isWrong ? (
                        <XCircle
                          size={48}
                          className="text-white drop-shadow-lg"
                          aria-hidden="true"
                        />
                      ) : (
                        <MapPin
                          size={32}
                          className="text-white/60 drop-shadow-md"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Mensagem de status */}
      {correctCount === totalImages && (
        <div className="mt-4 text-center text-success-600 dark:text-success-400 font-bold animate-fade-in text-lg">
          Parabéns! Você encontrou os {totalImages} pontos de encontro!
        </div>
      )}
    </div>
  )
}
