import { useEffect } from 'react'

export const useKeyboardNavigation = (options) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Navegação entre perguntas (se disponível)
      if (e.key === 'ArrowRight' && options.onNext) {
        e.preventDefault()
        options.onNext()
      }

      if (e.key === 'ArrowLeft' && options.onPrevious) {
        e.preventDefault()
        options.onPrevious()
      }

      // Selecionar opção por número (1-4)
      if (e.key >= '1' && e.key <= '4' && options.onSelectOption) {
        e.preventDefault()
        const index = parseInt(e.key) - 1
        options.onSelectOption(index)
      }

      // Confirmar seleção
      if (e.key === 'Enter' && options.onConfirm) {
        e.preventDefault()
        options.onConfirm()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [options])
}
