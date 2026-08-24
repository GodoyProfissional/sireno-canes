import { useState, useCallback, useRef, useEffect } from 'react'
import { questionsDB } from '../data/questions'

const LEVELS_CONFIG = [
  { name: 'Aluno', minXp: 0, icon: 'star' },
  { name: 'Observador', minXp: 300, icon: 'eye' },
  { name: 'Preparado', minXp: 700, icon: 'shield-check' },
  { name: 'Brigadista Honorário', minXp: 1200, icon: 'medal' },
]

// Estado inicial padrão
const getInitialState = () => ({
  questionIndex: 0,
  xp: 0,
  combo: 0,
  lives: 3,
  hints: 10,
  timeElapsed: 0,
  level: 0,
  lastAnswerCorrect: false,
  totalCorrect: 0,
  totalAttempts: 0,
  isGameActive: false,
})

export const useGameState = () => {
  const [state, setState] = useState(getInitialState)
  const timerRef = useRef(null)

  // Carregar progresso do localStorage (apenas na montagem inicial)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('evacuationProgress')
      if (saved) {
        const progress = JSON.parse(saved)
        // Verifica se o progresso é válido e não está no final
        if (progress.questionIndex >= 0 && progress.questionIndex < questionsDB.length) {
          setState((prev) => ({ ...prev, ...progress, isGameActive: true }))
        } else {
          // Se o progresso for inválido, limpa
          localStorage.removeItem('evacuationProgress')
        }
      }
    } catch (e) {
      localStorage.removeItem('evacuationProgress')
    }
  }, [])

  // Salvar progresso (apenas quando o jogo está ativo)
  useEffect(() => {
    if (state.isGameActive && state.questionIndex < questionsDB.length) {
      try {
        const progress = {
          questionIndex: state.questionIndex,
          xp: state.xp,
          level: state.level,
          lives: state.lives,
          hints: state.hints,
          timeElapsed: state.timeElapsed,
          totalCorrect: state.totalCorrect,
          totalAttempts: state.totalAttempts,
        }
        localStorage.setItem('evacuationProgress', JSON.stringify(progress))
      } catch (e) {}
    }
  }, [state])

  const hasProgress = useCallback(() => {
    try {
      const saved = localStorage.getItem('evacuationProgress')
      if (saved) {
        const progress = JSON.parse(saved)
        return progress.questionIndex > 0 && progress.questionIndex < questionsDB.length
      }
    } catch (e) {}
    return false
  }, [])

  const startGame = useCallback(() => {
    // Reset completo antes de começar
    setState(getInitialState)
    localStorage.removeItem('evacuationProgress')

    // Inicia com estado ativo
    setState((prev) => ({ ...prev, isGameActive: true }))

    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setState((prev) => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }))
    }, 1000)
  }, [])

  const continueGame = useCallback(() => {
    setState((prev) => ({ ...prev, isGameActive: true }))
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setState((prev) => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }))
    }, 1000)
  }, [])

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const handleAnswer = useCallback((isCorrect, question) => {
    setState((prev) => {
      const newState = { ...prev }
      newState.totalAttempts++

      if (isCorrect) {
        newState.totalCorrect++
        newState.combo++

        let xpEarned = 100
        if (newState.combo >= 5) xpEarned = Math.floor(xpEarned * 2.5)
        else if (newState.combo >= 3) xpEarned = Math.floor(xpEarned * 1.5)
        newState.xp += xpEarned
        newState.lastAnswerCorrect = true
        newState.questionIndex++
      } else {
        newState.combo = 0
        newState.lives--
        newState.lastAnswerCorrect = false
      }

      return newState
    })
  }, [])

  // RESET COMPLETO - limpa tudo
  const resetGame = useCallback(() => {
    stopTimer()
    setState(getInitialState())
    localStorage.removeItem('evacuationProgress')
  }, [stopTimer])

  const resetLives = useCallback(() => {
    setState((prev) => ({
      ...prev,
      lives: 3,
      xp: 0,
      combo: 0,
      lastAnswerCorrect: false,
    }))
  }, [])

  const getLevel = useCallback((xp) => {
    let level = 0
    for (let i = LEVELS_CONFIG.length - 1; i >= 0; i--) {
      if (xp >= LEVELS_CONFIG[i].minXp) {
        level = i
        break
      }
    }
    return level
  }, [])

  const getLevelProgress = useCallback(
    (xp) => {
      const currentLevel = getLevel(xp)
      const nextLevel = LEVELS_CONFIG[currentLevel + 1]
      if (!nextLevel) return 100
      const range = nextLevel.minXp - LEVELS_CONFIG[currentLevel].minXp
      const currentXPInLevel = xp - LEVELS_CONFIG[currentLevel].minXp
      return Math.min(100, Math.max(0, (currentXPInLevel / range) * 100))
    },
    [getLevel],
  )

  const getCurrentQuestion = useCallback(() => {
    return questionsDB[state.questionIndex]
  }, [state.questionIndex])

  const updateHUD = useCallback(() => {
    // Força atualização
  }, [])

  const isGameFinished = state.questionIndex >= questionsDB.length

  return {
    state,
    LEVELS_CONFIG,
    startGame,
    continueGame,
    stopTimer,
    handleAnswer,
    resetGame,
    resetLives,
    getLevel,
    getLevelProgress,
    getCurrentQuestion,
    isGameFinished,
    hasProgress,
    updateHUD,
  }
}
