import React, { useState, useEffect } from 'react'
import { Type, Minus, Plus } from 'lucide-react'

export const FontSizeControl = () => {
  const [fontSize, setFontSize] = useState(100)

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`
  }, [fontSize])

  const increase = () => setFontSize(Math.min(200, fontSize + 10))
  const decrease = () => setFontSize(Math.max(80, fontSize - 10))
  const reset = () => setFontSize(100)

  return (
    <div
      className="flex items-center gap-1 bg-white/80 dark:bg-gray-800/80 rounded-full p-1 shadow-md"
      role="group"
      aria-label="Controle de tamanho de fonte"
    >
      <button
        onClick={decrease}
        aria-label="Diminuir fonte"
        className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        title="Diminuir tamanho da fonte"
      >
        <Minus size={16} />
      </button>
      <button
        onClick={reset}
        aria-label="Resetar tamanho da fonte"
        className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        title="Resetar tamanho da fonte"
      >
        <Type size={16} />
      </button>
      <button
        onClick={increase}
        aria-label="Aumentar fonte"
        className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        title="Aumentar tamanho da fonte"
      >
        <Plus size={16} />
      </button>
      <span className="text-xs text-gray-500 dark:text-gray-400 px-1 min-w-[2.5rem] text-center">
        {fontSize}%
      </span>
    </div>
  )
}
