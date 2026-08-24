import React, { useState, useEffect } from 'react'
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
  const { toggleTheme, isDark } = useTheme()

  const currentQuestion = state.getCurrentQuestion()
  const isFinished = state.isGameFinished

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
    // Recarrega a pergunta atual
  }

  const handleUseHint = () => {
    if (state.state.hints <= 0) {
      alert('Você já usou todas as suas dicas!')
      return
    }

    state.state.hints--
    state.state.xp = Math.max(0, state.state.xp - 50)
    state.updateHUD()

    const q = currentQuestion
    let hintMsg = ''

    const oldBanner = document.querySelector('.hint-banner')
    if (oldBanner) oldBanner.remove()

    switch (q.type) {
      case 'multiple-choice': {
        const btns = document.querySelectorAll('button[data-opt]')
        let wrongOptions = []
        btns.forEach((b) => {
          if (b.dataset.opt !== q.correctAnswer) {
            wrongOptions.push(b)
          }
        })
        wrongOptions.sort(() => Math.random() - 0.5)
        let removed = 0
        for (let b of wrongOptions) {
          if (removed < 2) {
            b.style.opacity = '0.3'
            b.style.pointerEvents = 'none'
            b.disabled = true
            b.classList.add('opacity-50', 'line-through')
            removed++
          }
        }
        hintMsg = `💡 ${removed} alternativas erradas foram removidas!`
        break
      }

      case 'drag-match': {
        const leftItems = document.querySelectorAll('.match-left:not(.locked)')
        const rightItems = document.querySelectorAll('.match-right:not(.locked)')

        if (leftItems.length === 0 && rightItems.length === 0) {
          hintMsg = '💡 Todas as conexões já foram feitas!'
          break
        }

        const availablePairs = q.pairs.filter((p) => {
          const leftEl = document.querySelector(`.match-left[data-val="${p.left}"]`)
          return leftEl && !leftEl.classList.contains('locked')
        })

        if (availablePairs.length > 0) {
          const pair = availablePairs[0]
          const leftEl = document.querySelector(`.match-left[data-val="${pair.left}"]`)
          const rightEl = document.querySelector(`.match-right[data-val="${pair.right}"]`)

          if (leftEl && rightEl) {
            leftEl.classList.add(
              'border-warning-500',
              'bg-warning-100',
              'dark:bg-warning-900/30',
              'animate-pulse',
            )
            rightEl.classList.add(
              'border-warning-500',
              'bg-warning-100',
              'dark:bg-warning-900/30',
              'animate-pulse',
            )

            setTimeout(() => {
              leftEl.classList.remove(
                'border-warning-500',
                'bg-warning-100',
                'dark:bg-warning-900/30',
                'animate-pulse',
              )
              rightEl.classList.remove(
                'border-warning-500',
                'bg-warning-100',
                'dark:bg-warning-900/30',
                'animate-pulse',
              )
            }, 3000)

            hintMsg = `💡 Tente conectar "${pair.left}" com "${pair.right}"`
          }
        } else {
          hintMsg = '💡 Todas as conexões já foram feitas! Confirme sua resposta.'
        }
        break
      }

      case 'sequence': {
        const target = document.querySelector('#seq-target')
        const currentItems = target ? target.querySelectorAll('.seq-item') : []
        const nextIndex = currentItems.length

        if (nextIndex < q.steps.length) {
          const nextStep = q.steps[nextIndex]
          const poolItems = document.querySelectorAll('#seq-pool .seq-item')

          let found = false
          poolItems.forEach((item) => {
            if (item.dataset.val === nextStep) {
              item.classList.add(
                'border-warning-500',
                'bg-warning-100',
                'dark:bg-warning-900/30',
                'animate-pulse',
                'scale-110',
              )
              setTimeout(() => {
                item.classList.remove(
                  'border-warning-500',
                  'bg-warning-100',
                  'dark:bg-warning-900/30',
                  'animate-pulse',
                  'scale-110',
                )
              }, 3000)
              found = true
            }
          })

          if (found) {
            hintMsg = `💡 O próximo item correto é: "${nextStep}"`
          } else {
            hintMsg = '💡 Você já colocou todos os itens na ordem! Confirme sua resposta.'
          }
        } else {
          hintMsg = '💡 Todos os itens já estão na ordem! Confirme sua resposta.'
        }
        break
      }

      case 'bubble-select': {
        const bubbles = document.querySelectorAll('.bubble-btn')
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

        wrongBubbles.sort(() => Math.random() - 0.5)
        let removed = 0
        for (let btn of wrongBubbles) {
          if (removed < 2) {
            btn.style.opacity = '0.2'
            btn.style.pointerEvents = 'none'
            btn.disabled = true
            btn.classList.add('opacity-50', 'line-through')
            removed++
          }
        }

        if (removed > 0) {
          hintMsg = `💡 ${removed} opções incorretas foram removidas!`
        } else {
          correctBubbles.sort(() => Math.random() - 0.5)
          let highlighted = 0
          for (let btn of correctBubbles) {
            if (highlighted < 2 && !btn.classList.contains('border-primary-500')) {
              btn.classList.add(
                'border-warning-500',
                'bg-warning-100',
                'dark:bg-warning-900/30',
                'animate-pulse',
              )
              setTimeout(() => {
                btn.classList.remove(
                  'border-warning-500',
                  'bg-warning-100',
                  'dark:bg-warning-900/30',
                  'animate-pulse',
                )
              }, 3000)
              highlighted++
            }
          }
          hintMsg = '💡 Preste atenção nas opções destacadas!'
        }
        break
      }

      case 'image-hotspot': {
        const hotspots = document.querySelectorAll('.hotspot-area')
        const correctHotspots = []

        hotspots.forEach((spot) => {
          if (spot.dataset.correct === 'true' && !spot.querySelector('.lucide-check')) {
            correctHotspots.push(spot)
          }
        })

        if (correctHotspots.length > 0) {
          const target = correctHotspots[0]
          const ring = document.createElement('div')
          ring.className =
            'absolute inset-0 rounded-full border-4 border-warning-500 animate-ping pointer-events-none'
          ring.style.animation = 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
          target.style.position = 'relative'
          target.appendChild(ring)

          setTimeout(() => {
            ring.remove()
          }, 3000)

          hintMsg = '💡 Clique na área destacada em amarelo!'
        } else {
          hintMsg = '💡 O hotspot correto já foi encontrado!'
        }
        break
      }

      case 'route-choice': {
        const routeBtns = document.querySelectorAll('.route-btn')

        routeBtns.forEach((btn) => {
          if (btn.dataset.correct === 'true') {
            btn.classList.add(
              'border-warning-500',
              'bg-warning-50',
              'dark:bg-warning-900/20',
              'animate-pulse',
              'scale-105',
            )
            setTimeout(() => {
              btn.classList.remove(
                'border-warning-500',
                'bg-warning-50',
                'dark:bg-warning-900/20',
                'animate-pulse',
                'scale-105',
              )
            }, 3000)
          }
        })

        hintMsg = '💡 A rota segura está destacada em amarelo!'
        break
      }

      case 'spot-the-error': {
        const errorSpots = document.querySelectorAll('.error-hotspot')
        let found = 0
        let notFound = []

        errorSpots.forEach((spot) => {
          const ring = spot.querySelector('.marker-ring')
          if (ring && ring.classList.contains('scale-100')) {
            found++
          } else {
            notFound.push(spot)
          }
        })

        if (notFound.length > 0 && found < q.errors.length) {
          const target = notFound[0]
          target.classList.add('animate-pulse')
          target.style.border = '4px solid #f59e0b'
          target.style.borderRadius = '50%'

          const arrow = document.createElement('div')
          arrow.className =
            'absolute -top-8 left-1/2 transform -translate-x-1/2 text-warning-500 text-2xl animate-bounce'
          arrow.innerHTML = '⬇️'
          target.style.position = 'relative'
          target.appendChild(arrow)

          setTimeout(() => {
            target.classList.remove('animate-pulse')
            target.style.border = ''
            arrow.remove()
          }, 3000)

          hintMsg = `💡 Encontre o erro destacado! (${found + 1}/${q.errors.length})`
        } else {
          hintMsg = '💡 Você já encontrou todos os erros!'
        }
        break
      }

      default: {
        hintMsg = '💡 Tente novamente com mais atenção!'
        break
      }
    }

    const container = document.getElementById('question-container')
    if (container) {
      const banner = document.createElement('div')
      banner.className =
        'hint-banner absolute top-4 left-1/2 transform -translate-x-1/2 bg-warning-500 text-white dark:text-white px-4 py-3 rounded-full shadow-lg text-sm md:text-base font-bold z-50 animate-slide-up w-max max-w-[90%] text-center border-2 border-warning-400'
      banner.setAttribute('role', 'alert')
      banner.innerHTML = `<span class="mr-2">💡</span> ${hintMsg}`
      container.appendChild(banner)

      setTimeout(() => {
        banner.classList.add('opacity-0', 'translate-y-[-20px]')
        setTimeout(() => banner.remove(), 300)
      }, 3500)
    }
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
