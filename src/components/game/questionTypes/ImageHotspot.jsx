import React, { useState } from 'react'

export const ImageHotspot = ({ question, onAnswer }) => {
  const [clicked, setClicked] = useState(false)

  const handleClick = (isCorrect) => {
    if (clicked) return
    setClicked(true)
    setTimeout(() => {
      onAnswer(isCorrect)
    }, 600)
  }

  return (
    <div className="mt-4 relative rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 dark:border-gray-700 bg-black flex items-center justify-center">
      <img
        src={question.imageUrl}
        className="w-full h-auto object-cover opacity-80"
        alt="Cenário"
      />
      {question.hotspots.map((h, i) => (
        <div
          key={i}
          className="hotspot-area absolute cursor-pointer flex items-center justify-center rounded border border-white/30 hover:bg-white/20 transition-colors"
          style={{
            left: `${h.x}%`,
            top: `${h.y}%`,
            width: `${h.width}%`,
            height: `${h.height}%`,
          }}
          role="button"
          tabIndex="0"
          onClick={() => handleClick(h.isCorrect)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleClick(h.isCorrect)
            }
          }}
        >
          <i className="ph ph-target text-white/50 text-2xl drop-shadow-md" aria-hidden="true"></i>
        </div>
      ))}
    </div>
  )
}
