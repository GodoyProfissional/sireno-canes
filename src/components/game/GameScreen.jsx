import React, { useState, useEffect, useRef } from 'react'
import { QuestionRenderer } from './QuestionRenderer'
import { HUD } from '../shared/HUD'
import { Minimap } from '../shared/Minimap'
import { FeedbackModal } from './FeedbackModal'
import { GameOverModal } from './GameOverModal'
import { questionsDB } from '../../data/questions'
import { useTheme } from '../../hooks/useTheme'
import { Moon, Sun } from 'lucide-react'

export const GameScreen = ({ state, onFinish }) => {
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackData, setFeedbackData] = useState(null)
  const [showGameOver, setShowGameOver] = useState(false)
  const [hintCount, setHintCount] = useState(0)
  const [showHintButton, setShowHintButton] = useState(true)
  const { toggleTheme, isDark } = useTheme()

  const currentQuestion = state.getCurrentQuestion()
  const isFinished = state.isGameFinished

  // Verificar se a pergunta atual tem dicas
  useEffect(() => {
    if (currentQuestion) {
      // Perguntas que NÃO têm dicas
      const noHintTypes = ['image-hotspot', 'route-choice', 'spot-the-error']
      // Perguntas que TÊM dicas (todos os outros tipos)
      setShowHintButton(!noHintTypes.includes(currentQuestion.type))
    }
  }, [currentQuestion])

  // Resetar dicas quando mudar a pergunta
  useEffect(() => {
    setHintCount(0)
    const container = document.getElementById('question-container')
    if (container) {
      const banners = container.querySelectorAll('.hint-banner')
      banners.forEach((b) => b.remove())

      const allElements = container.querySelectorAll('*')
      allElements.forEach((el) => {
        el.classList.remove(
          'border-warning-500',
          'bg-warning-100',
          'dark:bg-warning-900/30',
          'animate-pulse',
          'scale-110',
          'scale-105',
          'border-success-500',
          'bg-success-50',
          'dark:bg-success-900/40',
          'bg-success-100',
          'dark:bg-success-900/30',
          'shadow-[0_0_15px_rgba(34,197,94,0.5)]',
          'shadow-[0_0_20px_rgba(34,197,94,0.6)]',
          'opacity-50',
          'line-through',
          'ring-4',
          'ring-success-300',
        )
        el.style.opacity = ''
        el.style.pointerEvents = ''
        el.disabled = false
        el.style.border = ''
        el.style.borderRadius = ''
        el.style.boxShadow = ''
      })

      const arrows = container.querySelectorAll('.animate-bounce')
      arrows.forEach((arrow) => arrow.remove())
    }
  }, [state.state.questionIndex])

  useEffect(() => {
    if (isFinished) {
      state.stopTimer()
      onFinish()
    }
  }, [isFinished, state, onFinish])

  useEffect(() => {
    if (state.state.lives <= 0 && state.state.isGameActive) {
      setShowGameOver(true)
    }
  }, [state.state.lives, state.state.isGameActive])

  const handleAnswer = (isCorrect) => {
    state.handleAnswer(isCorrect, currentQuestion)

    setFeedbackData({
      isCorrect,
      question: currentQuestion,
      xpEarned: isCorrect ? 100 : 0,
      combo: state.state.combo + (isCorrect ? 1 : 0),
      lives: state.state.lives - (isCorrect ? 0 : 1),
    })
    setShowFeedback(true)
  }

  const handleFeedbackClose = () => {
    setShowFeedback(false)
  }

  const handleGameOverContinue = () => {
    setShowGameOver(false)
    state.resetLives()
  }

  // ===== MOSTRA BANNER =====
  const showHintBanner = (container, message, isWarning = false) => {
    if (!container) return

    const oldBanner = container.querySelector('.hint-banner')
    if (oldBanner) oldBanner.remove()

    const banner = document.createElement('div')
    const bgClass = isWarning ? 'bg-gray-500' : 'bg-warning-500'
    banner.className = `hint-banner absolute top-4 left-1/2 transform -translate-x-1/2 ${bgClass} text-white px-4 py-3 rounded-full shadow-lg text-sm md:text-base font-bold z-50 animate-slide-up w-max max-w-[90%] text-center border-2 ${isWarning ? 'border-gray-400' : 'border-warning-400'}`
    banner.setAttribute('role', 'alert')
    banner.innerHTML = `<span class="mr-2">💡</span> ${message}`
    container.appendChild(banner)

    setTimeout(() => {
      banner.classList.add('opacity-0', 'translate-y-[-20px]')
      setTimeout(() => banner.remove(), 300)
    }, 4000)
  }

  // ===== LIMPA DESTAQUES =====
  const clearHighlights = (container) => {
    if (!container) return
    const elements = container.querySelectorAll(
      '.match-left, .match-right, .seq-item, .bubble-btn, .route-btn, .error-hotspot, .hotspot-area',
    )
    elements.forEach((el) => {
      el.classList.remove(
        'border-warning-500',
        'bg-warning-100',
        'dark:bg-warning-900/30',
        'animate-pulse',
        'scale-110',
        'scale-105',
        'border-success-500',
        'bg-success-50',
        'dark:bg-success-900/40',
        'shadow-[0_0_15px_rgba(34,197,94,0.5)]',
        'ring-4',
        'ring-success-300',
        'shadow-[0_0_20px_rgba(34,197,94,0.6)]',
      )
      el.style.opacity = ''
      el.style.pointerEvents = ''
      el.disabled = false
    })
  }

  // ===== SISTEMA DE DICAS =====
  const handleUseHint = () => {
    // Se a pergunta não tem dicas, não faz nada
    if (!showHintButton) {
      return
    }

    if (state.state.hints <= 0) {
      alert('Você já usou todas as suas dicas!')
      return
    }

    const q = currentQuestion
    const container = document.getElementById('question-container')
    if (!container) return

    // Define máximo de dicas por tipo
    let maxHints = 0
    switch (q.type) {
      case 'multiple-choice':
        maxHints = 2
        break
      case 'drag-match':
        maxHints = 1
        break
      case 'sequence':
        maxHints = 3
        break
      case 'bubble-select':
        maxHints = 3
        break
      case 'image-hotspot':
        maxHints = 0 // SEM DICAS
        break
      case 'route-choice':
        maxHints = 0 // SEM DICAS
        break
      case 'spot-the-error':
        maxHints = 0 // SEM DICAS
        break
      default:
        maxHints = 1
    }

    // Se não tem dicas permitidas
    if (maxHints === 0) {
      return
    }

    // Se já usou todas as dicas permitidas
    if (hintCount >= maxHints) {
      showHintBanner(container, 'Não é possível mais usar dicas nesta pergunta!', true)
      return
    }

    // CONSUME A DICA
    state.state.hints--
    state.state.xp = Math.max(0, state.state.xp - 50)
    state.updateHUD()
    setHintCount((prev) => prev + 1)

    let hintMsg = ''

    // ===== LIMPA DESTAQUES ANTERIORES =====
    clearHighlights(container)

    // ===== LÓGICA DE DICA POR TIPO =====
    switch (q.type) {
      case 'multiple-choice': {
        const btns = container.querySelectorAll('button[data-opt]')
        let activeBtns = []
        let wrongOptions = []

        btns.forEach((b) => {
          if (!b.disabled && b.style.opacity !== '0.3') {
            activeBtns.push(b)
            if (b.dataset.opt !== q.correctAnswer) {
              wrongOptions.push(b)
            }
          }
        })

        if (activeBtns.length <= 1) {
          showHintBanner(container, 'Somente a resposta ativa!', true)
          return
        }

        let toRemove = hintCount === 0 ? 2 : 1

        if (wrongOptions.length === 0 || toRemove > wrongOptions.length) {
          if (activeBtns.length > 1) {
            showHintBanner(container, 'Não há mais alternativas erradas para remover!', true)
          } else {
            showHintBanner(container, 'Somente a resposta ativa!', true)
          }
          return
        }

        wrongOptions.sort(() => Math.random() - 0.5)
        let removed = 0
        for (let b of wrongOptions) {
          if (removed < toRemove && !b.disabled) {
            b.style.opacity = '0.3'
            b.style.pointerEvents = 'none'
            b.disabled = true
            b.classList.add('opacity-50', 'line-through')
            removed++
          }
        }

        const remaining = container.querySelectorAll('button[data-opt]:not([disabled])').length
        hintMsg = `${removed} alternativa(s) errada(s) removida(s)! Restam ${remaining} opções.`
        break
      }

      case 'drag-match': {
        const leftItems = container.querySelectorAll('.match-left:not(.locked)')

        if (leftItems.length === 0) {
          showHintBanner(
            container,
            'Todas as conexões já foram feitas! Confirme sua resposta.',
            true,
          )
          return
        }

        let pairFound = false
        for (const pair of q.pairs) {
          const leftEl = container.querySelector(`.match-left[data-val="${pair.left}"]`)
          if (leftEl && !leftEl.classList.contains('locked')) {
            const rightEl = container.querySelector(`.match-right[data-val="${pair.right}"]`)

            if (leftEl && rightEl) {
              leftEl.classList.add(
                'border-success-500',
                'bg-success-50',
                'dark:bg-success-900/40',
                'scale-105',
                'shadow-[0_0_15px_rgba(34,197,94,0.5)]',
              )
              rightEl.classList.add(
                'border-success-500',
                'bg-success-50',
                'dark:bg-success-900/40',
                'scale-105',
                'shadow-[0_0_15px_rgba(34,197,94,0.5)]',
              )

              hintMsg = `Conecte "${pair.left}" com "${pair.right}" (destacado em verde)`
              pairFound = true
              break
            }
          }
        }

        if (!pairFound) {
          showHintBanner(
            container,
            'Todas as conexões já foram feitas! Confirme sua resposta.',
            true,
          )
          return
        }
        break
      }

      case 'sequence': {
        if (hintCount >= 3) {
          showHintBanner(container, 'Não é possível mais usar dicas nesta pergunta!', true)
          return
        }

        const target = container.querySelector('#seq-target')
        const currentItems = target ? target.querySelectorAll('.seq-item') : []
        const placedCount = currentItems.length

        if (placedCount >= q.steps.length) {
          showHintBanner(
            container,
            'Todos os itens já estão na ordem! Confirme sua resposta.',
            true,
          )
          return
        }

        const nextStep = q.steps[placedCount]
        const poolItems = container.querySelectorAll('#seq-pool .seq-item')
        let found = false

        poolItems.forEach((item) => {
          if (item.dataset.val === nextStep) {
            item.classList.add(
              'border-success-500',
              'bg-success-50',
              'dark:bg-success-900/40',
              'scale-110',
              'animate-pulse',
              'shadow-[0_0_20px_rgba(34,197,94,0.6)]',
              'ring-4',
              'ring-success-300',
            )
            setTimeout(() => {
              item.classList.remove(
                'border-success-500',
                'bg-success-50',
                'dark:bg-success-900/40',
                'scale-110',
                'animate-pulse',
                'shadow-[0_0_20px_rgba(34,197,94,0.6)]',
                'ring-4',
                'ring-success-300',
              )
            }, 3000)
            found = true
          }
        })

        if (found) {
          const position = placedCount + 1
          hintMsg = `Próximo item (posição ${position}): "${nextStep}" (destacado em verde)`
        } else {
          let nextMissing = null
          const placedSteps = Array.from(currentItems).map((el) => el.dataset.val)

          for (let i = 0; i < q.steps.length; i++) {
            const step = q.steps[i]
            if (!placedSteps.includes(step)) {
              nextMissing = step
              break
            }
          }

          if (nextMissing) {
            poolItems.forEach((item) => {
              if (item.dataset.val === nextMissing) {
                item.classList.add(
                  'border-success-500',
                  'bg-success-50',
                  'dark:bg-success-900/40',
                  'scale-110',
                  'animate-pulse',
                  'shadow-[0_0_20px_rgba(34,197,94,0.6)]',
                  'ring-4',
                  'ring-success-300',
                )
                setTimeout(() => {
                  item.classList.remove(
                    'border-success-500',
                    'bg-success-50',
                    'dark:bg-success-900/40',
                    'scale-110',
                    'animate-pulse',
                    'shadow-[0_0_20px_rgba(34,197,94,0.6)]',
                    'ring-4',
                    'ring-success-300',
                  )
                }, 3000)
                found = true
                const correctPosition = q.steps.indexOf(nextMissing) + 1
                hintMsg = `Próximo item (posição ${correctPosition}): "${nextMissing}" (destacado em verde)`
              }
            })
          }

          if (!found) {
            showHintBanner(
              container,
              'Todos os itens já estão na ordem! Confirme sua resposta.',
              true,
            )
            return
          }
        }
        break
      }

      case 'bubble-select': {
        if (hintCount >= 3) {
          showHintBanner(container, 'Não é possível mais usar dicas nesta pergunta!', true)
          return
        }

        const bubbles = container.querySelectorAll('.bubble-btn:not(.disabled)')
        let wrongBubbles = []
        let correctBubbles = []

        bubbles.forEach((btn, idx) => {
          const data = q.bubbles[idx]
          if (data.isCorrect) {
            correctBubbles.push(btn)
          } else {
            wrongBubbles.push(btn)
          }
        })

        if (wrongBubbles.length === 0) {
          showHintBanner(container, 'Todas as opções incorretas já foram removidas!', true)
          return
        }

        let toRemove = 0
        if (hintCount === 0) toRemove = Math.min(2, wrongBubbles.length)
        else if (hintCount === 1) toRemove = Math.min(2, wrongBubbles.length)
        else if (hintCount === 2) toRemove = Math.min(1, wrongBubbles.length)
        else toRemove = 0

        if (toRemove === 0 || wrongBubbles.length === 0) {
          if (wrongBubbles.length > 0) {
            correctBubbles.sort(() => Math.random() - 0.5)
            let highlighted = 0
            for (let btn of correctBubbles) {
              if (highlighted < 2 && !btn.classList.contains('border-primary-500')) {
                btn.classList.add(
                  'border-success-500',
                  'bg-success-100',
                  'dark:bg-success-900/30',
                  'animate-pulse',
                  'shadow-[0_0_15px_rgba(34,197,94,0.5)]',
                )
                setTimeout(() => {
                  btn.classList.remove(
                    'border-success-500',
                    'bg-success-100',
                    'dark:bg-success-900/30',
                    'animate-pulse',
                    'shadow-[0_0_15px_rgba(34,197,94,0.5)]',
                  )
                }, 3000)
                highlighted++
              }
            }
            hintMsg = 'Preste atenção nas opções destacadas em verde!'
          } else {
            showHintBanner(container, 'Todas as opções incorretas já foram removidas!', true)
            return
          }
        } else {
          wrongBubbles.sort(() => Math.random() - 0.5)
          let removed = 0
          for (let btn of wrongBubbles) {
            if (removed < toRemove && !btn.disabled) {
              btn.style.opacity = '0.2'
              btn.style.pointerEvents = 'none'
              btn.disabled = true
              btn.classList.add('opacity-50', 'line-through')
              removed++
            }
          }

          const remaining = container.querySelectorAll('.bubble-btn:not(.disabled)').length
          hintMsg = `${removed} opção(ões) incorreta(s) removida(s)! Restam ${remaining} opções.`
        }
        break
      }

      // SPOT-THE-ERROR REMOVIDO - SEM DICAS

      default: {
        showHintBanner(container, 'Tente novamente com mais atenção!')
        return
      }
    }

    showHintBanner(container, hintMsg)
  }

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">Carregando...</div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col p-2 sm:p-4 relative min-h-screen">
      <button
        onClick={toggleTheme}
        aria-label="Alternar tema"
        className="absolute top-2 right-2 z-50 p-2 rounded-full glass shadow-md text-gray-800 dark:text-gray-200 hover:scale-110 transition-transform"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {currentQuestion.bgImage && (
        <div className="env-bg" style={{ backgroundImage: `url('${currentQuestion.bgImage}')` }} />
      )}

      <div className="flex justify-center mb-2 mt-10">
        <Minimap currentIndex={state.state.questionIndex} questions={questionsDB} />
      </div>

      <HUD
        lives={state.state.lives}
        xp={state.state.xp}
        combo={state.state.combo}
        hints={state.state.hints}
        timeElapsed={state.state.timeElapsed}
        level={state.getLevel(state.state.xp)}
        levelName={state.LEVELS_CONFIG[state.getLevel(state.state.xp)].name}
        levelProgress={state.getLevelProgress(state.state.xp)}
        onUseHint={handleUseHint}
        hintCount={hintCount}
        showHintButton={showHintButton}
      />

      <div
        id="question-container"
        className="flex-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl p-4 md:p-8 flex flex-col border border-white/20 dark:border-gray-700/50 relative overflow-hidden transition-all duration-500 min-h-[400px]"
      >
        <QuestionRenderer
          question={currentQuestion}
          index={state.state.questionIndex}
          total={questionsDB.length}
          onAnswer={handleAnswer}
        />
      </div>

      <FeedbackModal
        isOpen={showFeedback}
        data={feedbackData}
        onClose={handleFeedbackClose}
        onNext={() => {
          setShowFeedback(false)
        }}
      />

      <GameOverModal isOpen={showGameOver} onContinue={handleGameOverContinue} />
    </div>
  )
}
