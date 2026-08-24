import React, { useState, useEffect } from 'react'

export const SpotError = ({ question, onAnswer }) => {
  const [found, setFound] = useState(new Set())

  useEffect(() => {
    setFound(new Set())
  }, [question])

  const handleClick = (index) => {
    if (found.has(index)) return

    setFound((prev) => new Set(prev).add(index))

    if (found.size + 1 === question.errors.length) {
      setTimeout(() => {
        onAnswer(true)
      }, 800)
    }
  }

  return (
    <div className="mt-4">
      <div className="mb-2 flex justify-between items-center">
        <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
          Clique na imagem e encontre as atitudes incorretas:
        </p>
        <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full font-bold shadow-sm">
          <span>{found.size}</span> / {question.errors.length}
        </div>
      </div>

      <div className="relative w-full rounded-xl overflow-hidden shadow-xl border-2 border-gray-300 dark:border-gray-600 bg-black cursor-crosshair group select-none">
        <img
          src={question.imageUrl}
          className="w-full h-auto object-cover opacity-90 pointer-events-none"
          alt="Cenário com erros"
        />
        {question.errors.map((err, i) => {
          const isFound = found.has(i)
          return (
            <div
              key={i}
              className="error-hotspot absolute rounded-full transition-all duration-300 z-10 cursor-pointer"
              style={{
                left: `${err.x}%`,
                top: `${err.y}%`,
                width: `${err.w}%`,
                height: `${err.h}%`,
              }}
              role="button"
              tabIndex="0"
              onClick={() => handleClick(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleClick(i)
                }
              }}
              aria-label={`Erro ${i + 1}: ${err.label}`}
            >
              <div
                className={`w-full h-full border-4 rounded-full flex items-center justify-center transition-all duration-300
                ${
                  isFound
                    ? 'border-danger-500 bg-danger-500/30 scale-100 opacity-100'
                    : 'border-transparent scale-0 opacity-0'
                }`}
              >
                <i
                  className={`ph-fill ph-x-circle text-danger-500 text-3xl md:text-5xl drop-shadow-[0_0_8px_rgba(255,255,255,1)] 
                  ${isFound ? '' : 'hidden'}`}
                  aria-hidden="true"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
