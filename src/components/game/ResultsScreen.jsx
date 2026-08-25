import React, { useEffect, useRef, useState } from 'react'
import {
  Flag,
  Star,
  Target,
  Timer,
  TrendingUp,
  Medal,
  RotateCcw,
  Share2,
  Trophy,
  ShieldCheck,
  FileText,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// ==== MESMA ABORDAGEM DO questions.js ====
const SirenoItens = '/imagens/Sireno-itensbrigada.png'

export const ResultsScreen = ({ state, onRestart }) => {
  const { state: gameState, LEVELS_CONFIG, getLevel } = state
  const confettiTriggered = useRef(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const resultsRef = useRef(null)

  const accuracy =
    gameState.totalAttempts > 0
      ? Math.round((gameState.totalCorrect / gameState.totalAttempts) * 100)
      : 0

  const level = getLevel(gameState.xp)
  const levelConfig = LEVELS_CONFIG[level]

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  // ===== FOGOS DE ARTIFÍCIO / CONFETES =====
  useEffect(() => {
    if (!confettiTriggered.current) {
      confettiTriggered.current = true

      const duration = 5 * 1000
      const end = Date.now() + duration
      const colors = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

      ;(function frame() {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 80,
          origin: { x: 0, y: 0.6 },
          colors: colors,
          startVelocity: 30,
        })
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 80,
          origin: { x: 1, y: 0.6 },
          colors: colors,
          startVelocity: 30,
        })
        confetti({
          particleCount: 15,
          spread: 100,
          origin: { x: 0.5, y: 0.4 },
          colors: colors,
          startVelocity: 25,
        })
        confetti({
          particleCount: 5,
          spread: 60,
          origin: { x: 0.3, y: 0.2 },
          colors: ['#fbbf24', '#f59e0b', '#fcd34d'],
          shapes: ['star'],
          startVelocity: 20,
        })
        confetti({
          particleCount: 5,
          spread: 60,
          origin: { x: 0.7, y: 0.2 },
          colors: ['#fbbf24', '#f59e0b', '#fcd34d'],
          shapes: ['star'],
          startVelocity: 20,
        })
        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      })()

      setTimeout(() => {
        const end2 = Date.now() + 3000
        ;(function frame2() {
          confetti({
            particleCount: 10,
            spread: 120,
            origin: { x: 0.2, y: 0.8 },
            colors: ['#ec4899', '#8b5cf6', '#06b6d4'],
            startVelocity: 35,
          })
          confetti({
            particleCount: 10,
            spread: 120,
            origin: { x: 0.8, y: 0.8 },
            colors: ['#ec4899', '#8b5cf6', '#06b6d4'],
            startVelocity: 35,
          })
          if (Date.now() < end2) {
            requestAnimationFrame(frame2)
          }
        })()
      }, 2000)

      setTimeout(() => {
        const end3 = Date.now() + 2000
        ;(function frame3() {
          confetti({
            particleCount: 20,
            spread: 150,
            origin: { x: 0.5, y: 0.3 },
            colors: ['#f59e0b', '#ef4444', '#22c55e', '#0ea5e9'],
            startVelocity: 40,
          })
          if (Date.now() < end3) {
            requestAnimationFrame(frame3)
          }
        })()
      }, 4000)
    }
  }, [])

  // ===== GERAR PDF =====
  const generatePDF = async () => {
    setIsGeneratingPDF(true)

    try {
      const { questionsDB } = await import('../../data/questions')

      const container = document.createElement('div')
      container.style.cssText = `
        padding: 40px;
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        background: white;
        color: #1a1a2e;
      `

      container.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #0ea5e9; padding-bottom: 20px;">
          <h1 style="color: #0ea5e9; font-size: 28px; margin: 0;">📋 Gabarito - Missão de Evacuação</h1>
          <h2 style="color: #1a1a2e; font-size: 18px; margin: 5px 0; font-weight: normal;">Escape da Unidade - Respostas Corretas</h2>
          <div style="font-size: 14px; color: #64748b; margin-top: 5px;">
            Gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1a1a2e; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; display: flex; align-items: center; gap: 10px; font-size: 18px;">
            📝 Lista de Respostas Corretas
          </h3>
          <div style="margin-top: 15px;">
      `

      questionsDB.forEach((q, index) => {
        let resposta = ''
        let detalhe = ''

        switch (q.type) {
          case 'multiple-choice':
            const correctOption = q.options.find((opt) => opt.id === q.correctAnswer)
            resposta = correctOption ? correctOption.text : q.correctAnswer
            detalhe = `Alternativa ${q.correctAnswer.toUpperCase()}`
            break
          case 'drag-match':
            resposta = q.pairs.map((p) => `<strong>${p.left}</strong> → ${p.right}`).join('<br>')
            detalhe = 'Conecte os pares corretamente'
            break
          case 'sequence':
            resposta = q.steps.map((s, i) => `${i + 1}. ${s}`).join('<br>')
            detalhe = 'Ordem correta dos procedimentos'
            break
          case 'bubble-select':
            const correctBubbles = q.bubbles.filter((b) => b.isCorrect).map((b) => b.text)
            resposta = correctBubbles.join('<br>')
            detalhe = 'Selecione as atitudes corretas'
            break
          case 'image-hotspot':
            resposta = 'Clique na região do Ponto de Encontro Isolado'
            detalhe = 'Localização do ponto de encontro'
            break
          case 'route-choice':
            const correctRoute = q.routes.find((r) => r.isCorrect)
            resposta = correctRoute ? correctRoute.title : 'Caminho Sinalizado'
            detalhe = 'Rota de fuga correta'
            break
          case 'spot-the-error':
            resposta = q.errors.map((e) => `❌ ${e.label}`).join('<br>')
            detalhe = '7 erros identificados'
            break
          default:
            resposta = 'Verificar no sistema'
            detalhe = ''
        }

        container.innerHTML += `
          <div style="background: #f8fafc; padding: 14px 18px; margin-bottom: 10px; border-radius: 10px; border-left: 4px solid #0ea5e9; border: 1px solid #e2e8f0;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 200px;">
                <div style="font-weight: bold; font-size: 15px; color: #0ea5e9;">
                  ${index + 1}. ${q.room}
                </div>
                <div style="font-size: 13px; color: #64748b; margin-top: 2px;">
                  ${q.situation}
                </div>
                <div style="font-size: 13px; color: #475569; margin-top: 4px; background: #f1f5f9; padding: 6px 10px; border-radius: 6px;">
                  <span style="font-weight: 600; color: #1e293b;">Resposta correta:</span>
                  <div style="margin-top: 4px; font-weight: 500; color: #0f172a;">
                    ${resposta}
                  </div>
                  ${detalhe ? `<div style="font-size: 11px; color: #94a3b8; margin-top: 3px;">${detalhe}</div>` : ''}
                </div>
              </div>
              <div style="font-size: 14px; color: #22c55e; font-weight: bold; background: #dcfce7; padding: 4px 12px; border-radius: 20px; margin-left: 10px; white-space: nowrap; align-self: center;">
                ✅ Correta
              </div>
            </div>
          </div>
        `
      })

      container.innerHTML += `
          </div>
        </div>
        
        <div style="text-align: center; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #94a3b8; font-size: 12px;">
          © Missão de Evacuação - Treinamento Corporativo
          <br>
          Use este gabarito para revisar seus conhecimentos sobre segurança e evacuação.
        </div>
      `

      document.body.appendChild(container)

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      })

      document.body.removeChild(container)

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      let heightLeft = pdfHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight)
      heightLeft -= pdf.internal.pageSize.getHeight()

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight)
        heightLeft -= pdf.internal.pageSize.getHeight()
      }

      pdf.save('Gabarito-Missao-Evacuacao.pdf')
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      alert('Erro ao gerar PDF. Tente novamente.')
    }

    setIsGeneratingPDF(false)
  }

  // ===== COMPARTILHAR (TEXTO) =====
  const handleShare = async () => {
    const text = `🏆 Completei a Missão de Evacuação!\n\n⭐ ${gameState.xp} XP\n🎯 ${accuracy}% de precisão\n⏱️ ${formatTime(gameState.timeElapsed)}\n📊 Nível: ${levelConfig.name}\n\nTreine você também! #EscapeDaUnidade #SegurançaSenac`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Missão de Evacuação - Escape da Unidade',
          text: text,
        })
      } catch (e) {}
    } else {
      try {
        await navigator.clipboard.writeText(text)
        alert('Resultados copiados para a área de transferência!')
      } catch (e) {
        prompt('Copie os resultados:', text)
      }
    }
  }

  const getMedals = () => {
    const medals = []
    if (level >= 3) {
      medals.push({
        icon: Medal,
        color: 'text-yellow-500',
        bg: 'bg-gradient-to-br from-yellow-100 to-amber-200',
        name: 'Mestre Brigadista',
        border: 'border-yellow-400',
      })
    }
    if (level >= 2) {
      medals.push({
        icon: ShieldCheck,
        color: 'text-blue-500',
        bg: 'bg-gradient-to-br from-blue-100 to-cyan-200',
        name: 'Brigadista Honorário',
        border: 'border-blue-400',
      })
    }
    if (gameState.totalCorrect >= 10) {
      medals.push({
        icon: Trophy,
        color: 'text-purple-500',
        bg: 'bg-gradient-to-br from-purple-100 to-violet-200',
        name: 'Especialista em Evacuação',
        border: 'border-purple-400',
      })
    }
    if (medals.length === 0) {
      medals.push({
        icon: Star,
        color: 'text-gray-500',
        bg: 'bg-gray-100',
        name: 'Em Treinamento',
        border: 'border-gray-300',
      })
    }
    return medals
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative" ref={resultsRef}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-primary-500/5"></div>
      </div>

      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden animate-slide-up relative z-10">
        {/* ===== HEADER COM SIRENO ===== */}
        <div className="bg-gradient-to-r from-success-600 to-emerald-500 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* SIRENO COM ITENS DA BRIGADA */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/50 shadow-2xl overflow-hidden bg-white/10 backdrop-blur-sm mb-4">
              <img
                src={SirenoItens}
                alt="Sireno - Itens da Brigada"
                className="w-full h-full object-cover"
              />
            </div>
            <Flag
              size={48}
              className="absolute -top-2 -right-2 z-20 text-yellow-300 animate-bounce-slight"
              strokeWidth={1.5}
              fill="#fbbf24"
            />
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              🎉 Treinamento Concluído! 🎉
            </h2>
            <p className="opacity-90 mt-1 text-base md:text-lg">
              Parabéns! Você completou a missão de evacuação com sucesso!
            </p>
          </div>
        </div>

        <div className="p-6 md:p-10">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 md:p-5 rounded-2xl text-center border border-gray-100 dark:border-gray-600 shadow-sm">
              <Star size={28} className="text-warning-500 mb-2 mx-auto" fill="#f59e0b" />
              <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                XP Total
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                {gameState.xp}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 md:p-5 rounded-2xl text-center border border-gray-100 dark:border-gray-600 shadow-sm">
              <Target size={28} className="text-primary-500 mb-2 mx-auto" strokeWidth={1.5} />
              <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                Precisão
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                {accuracy}%
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 md:p-5 rounded-2xl text-center border border-gray-100 dark:border-gray-600 shadow-sm">
              <Timer size={28} className="text-blue-500 mb-2 mx-auto" strokeWidth={1.5} />
              <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                Tempo
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                {formatTime(gameState.timeElapsed)}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 md:p-5 rounded-2xl text-center border border-gray-100 dark:border-gray-600 shadow-sm">
              <TrendingUp size={28} className="text-purple-500 mb-2 mx-auto" strokeWidth={1.5} />
              <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                Nível Final
              </div>
              <div className="text-base md:text-xl font-bold text-gray-900 dark:text-white mt-1 leading-tight">
                {levelConfig.name}
              </div>
            </div>
          </div>

          {/* Medals */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 text-center flex items-center justify-center gap-2">
              <Medal size={22} className="text-warning-500" />
              Conquistas
            </h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {getMedals().map((medal, index) => {
                const IconComponent = medal.icon
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 transform hover:scale-110 transition-all cursor-default group"
                  >
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${medal.bg} flex items-center justify-center border-4 ${medal.border} shadow-lg relative overflow-hidden`}
                    >
                      <IconComponent
                        size={32}
                        className={`${medal.color} drop-shadow-md`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 max-w-[80px] md:max-w-[100px] leading-tight text-center">
                      {medal.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            <button
              onClick={onRestart}
              className="px-6 md:px-8 py-3 md:py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <RotateCcw size={20} strokeWidth={1.5} />
              Refazer Simulação
            </button>

            <button
              onClick={generatePDF}
              disabled={isGeneratingPDF}
              className="px-6 md:px-8 py-3 md:py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              {isGeneratingPDF ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Gerando...
                </>
              ) : (
                <>
                  <FileText size={20} strokeWidth={1.5} />
                  Baixar Gabarito
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="px-6 md:px-8 py-3 md:py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Share2 size={20} strokeWidth={1.5} />
              Compartilhar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
