import React, { useState, useEffect } from 'react'

export const Sequence = ({ question, onAnswer }) => {
  const [pool, setPool] = useState([])
  const [selected, setSelected] = useState([])
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Embaralha os itens do pool
    const shuffled = [...question.steps].sort(() => Math.random() - 0.5)
    setPool(shuffled)
    setSelected([])
    setIsComplete(false)
  }, [question])

  const handleSelect = (step) => {
    // Remove do pool e adiciona ao selected
    setPool((prev) => prev.filter((s) => s !== step))
    setSelected((prev) => [...prev, step])
  }

  const handleRemove = (step) => {
    // Remove do selected e volta para o pool
    setSelected((prev) => prev.filter((s) => s !== step))
    setPool((prev) => [...prev, step])
  }

  const handleReset = () => {
    const shuffled = [...question.steps].sort(() => Math.random() - 0.5)
    setPool(shuffled)
    setSelected([])
    setIsComplete(false)
  }

  const handleConfirm = () => {
    if (selected.length !== question.steps.length) return

    let isCorrect = true
    for (let i = 0; i < question.steps.length; i++) {
      if (question.steps[i] !== selected[i]) {
        isCorrect = false
        break
      }
    }

    if (isCorrect) {
      setIsComplete(true)
    }
    onAnswer(isCorrect)
  }

  // Função para verificar se um item está na posição correta
  const isItemInCorrectPosition = (step, index) => {
    // Verifica se o item está na posição correta na ordem
    return question.steps[index] === step
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* Pool de itens (não selecionados) */}
      <div
        id="seq-pool"
        className="flex flex-wrap gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 min-h-[100px]"
      >
        {pool.map((step) => (
          <button
            key={step}
            onClick={() => handleSelect(step)}
            className="seq-item px-4 py-2 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-sm font-medium hover:border-primary-500 text-gray-800 dark:text-white text-left text-sm md:text-base transition-all"
            data-val={step}
          >
            {step}
          </button>
        ))}
      </div>

      {/* Setinha */}
      <div className="text-center font-bold text-gray-500 uppercase tracking-widest text-xs">
        <i className="ph ph-arrow-down" aria-hidden="true"></i> Ordem Correta{' '}
        <i className="ph ph-arrow-down" aria-hidden="true"></i>
      </div>

      {/* Ordem selecionada */}
      <div
        id="seq-target"
        className="flex flex-col gap-2 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border-2 border-dashed border-primary-300 dark:border-primary-700 min-h-[150px]"
      >
        {selected.map((step, index) => {
          const isCorrect = isItemInCorrectPosition(step, index)
          return (
            <button
              key={`${step}-${index}`}
              onClick={() => handleRemove(step)}
              className={`seq-item px-4 py-2 border-2 rounded-lg shadow-sm font-medium text-left text-sm md:text-base transition-all flex items-center justify-between
                ${
                  isCorrect
                    ? 'border-success-500 bg-success-50 dark:bg-success-900/40 text-success-700 dark:text-success-300'
                    : 'border-danger-500 bg-danger-50 dark:bg-danger-900/40 text-danger-700 dark:text-danger-300'
                }`}
              data-val={step}
            >
              <span>
                {index + 1}. {step}
              </span>
              <span className="text-xs">{isCorrect ? '✅' : '❌'}</span>
            </button>
          )
        })}
        {selected.length === 0 && (
          <div className="text-gray-400 text-sm text-center py-4">
            Clique nos itens acima para montar a ordem correta
          </div>
        )}
      </div>

      {/* Botões */}
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-gray-500 hover:text-danger-500 font-bold transition-colors"
        >
          <i className="ph ph-arrow-counter-clockwise" aria-hidden="true"></i> Limpar
        </button>
        <button
          onClick={handleConfirm}
          disabled={selected.length !== question.steps.length}
          className={`px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-lg shadow-md hover:scale-105 transition-transform
            ${selected.length !== question.steps.length ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}
