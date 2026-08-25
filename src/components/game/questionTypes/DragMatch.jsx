import React, { useState, useEffect, useRef, useCallback } from 'react'

export const DragMatch = ({ question, onAnswer }) => {
  const [leftItems, setLeftItems] = useState([])
  const [rightItems, setRightItems] = useState([])
  const [matches, setMatches] = useState({})
  const [activeDrag, setActiveDrag] = useState(null)
  const [lines, setLines] = useState([])
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const [isComplete, setIsComplete] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const shuffledLeft = [...question.pairs].sort(() => Math.random() - 0.5)
    const shuffledRight = [
      ...question.pairs.map((p) => p.right),
      ...(question.distractorsRight || []),
    ].sort(() => Math.random() - 0.5)

    setLeftItems(
      shuffledLeft.map((p) => ({
        id: p.left,
        text: p.left,
        right: p.right,
        locked: false,
      })),
    )
    setRightItems(
      shuffledRight.map((r) => ({
        id: r,
        text: r,
        locked: false,
      })),
    )
    setMatches({})
    setLines([])
    setActiveDrag(null)
    setIsComplete(false)
  }, [question])

  // Função para obter o centro da bolinha
  const getBolinhaCenter = (element, container) => {
    if (!element || !container) return { x: 0, y: 0 }
    const rect = element.getBoundingClientRect()
    const contRect = container.getBoundingClientRect()

    const isLeft = element.classList.contains('match-left')
    const bolinhaSize = 16
    const padding = 12

    if (isLeft) {
      return {
        x: rect.right - contRect.left - bolinhaSize / 2 - padding / 2,
        y: rect.top + rect.height / 2 - contRect.top,
      }
    } else {
      return {
        x: rect.left - contRect.left + bolinhaSize / 2 + padding / 2,
        y: rect.top + rect.height / 2 - contRect.top,
      }
    }
  }

  // Função para verificar se um ponto está dentro de um elemento
  const isPointInsideElement = (x, y, element) => {
    if (!element) return false
    const rect = element.getBoundingClientRect()
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
  }

  const handleDragStart = (e, item) => {
    if (item.locked) return
    e.preventDefault()

    const leftEl = e.currentTarget
    const container = containerRef.current
    const pos = getBolinhaCenter(leftEl, container)

    setActiveDrag({
      leftId: item.id,
      startX: pos.x,
      startY: pos.y,
      currentX: pos.x,
      currentY: pos.y,
    })
  }

  const handleDragMove = useCallback(
    (e) => {
      if (!activeDrag || !containerRef.current) return

      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      let clientX, clientY

      if (e.touches) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
        e.preventDefault()
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }

      const x = clientX - rect.left
      const y = clientY - rect.top

      setActiveDrag((prev) => ({
        ...prev,
        currentX: x,
        currentY: y,
      }))
    },
    [activeDrag],
  )

  const handleDragEnd = useCallback(
    (e) => {
      if (!activeDrag || !containerRef.current) {
        setActiveDrag(null)
        return
      }

      const container = containerRef.current
      let clientX, clientY

      if (e.changedTouches) {
        clientX = e.changedTouches[0].clientX
        clientY = e.changedTouches[0].clientY
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }

      // Verifica se o mouse/touch está sobre algum elemento da direita
      const rightElements = container.querySelectorAll('.match-right')
      let targetElement = null

      // Esconde o SVG temporariamente para o elementFromPoint funcionar
      const svg = container.querySelector('svg')
      if (svg) svg.style.display = 'none'

      // Usa elementFromPoint para encontrar o elemento exato sob o cursor
      const elementAtPoint = document.elementFromPoint(clientX, clientY)

      // Restaura o SVG
      if (svg) svg.style.display = ''

      // Verifica se o elemento encontrado é um .match-right ou está dentro de um
      if (elementAtPoint) {
        targetElement = elementAtPoint.closest('.match-right')
      }

      // Se encontrou um elemento alvo e ele não está bloqueado
      if (targetElement && !targetElement.classList.contains('locked')) {
        const rightText = targetElement.dataset.val
        const leftItem = leftItems.find((item) => item.id === activeDrag.leftId)

        if (leftItem && leftItem.right === rightText) {
          // CONEXÃO CORRETA!
          const leftEl = container.querySelector(`[data-left-id="${activeDrag.leftId}"]`)
          const rightEl = targetElement

          if (leftEl && rightEl) {
            const leftPos = getBolinhaCenter(leftEl, container)
            const rightPos = getBolinhaCenter(rightEl, container)

            setMatches((prev) => ({
              ...prev,
              [activeDrag.leftId]: rightText,
            }))

            setLines((prev) => [
              ...prev,
              {
                leftId: activeDrag.leftId,
                rightText: rightText,
                x1: leftPos.x,
                y1: leftPos.y,
                x2: rightPos.x,
                y2: rightPos.y,
              },
            ])

            setLeftItems((prev) =>
              prev.map((item) =>
                item.id === activeDrag.leftId ? { ...item, locked: true } : item,
              ),
            )
            setRightItems((prev) =>
              prev.map((item) => (item.text === rightText ? { ...item, locked: true } : item)),
            )

            const totalPairs = question.pairs.length
            const newMatchesCount = Object.keys(matches).length + 1
            if (newMatchesCount === totalPairs) {
              setIsComplete(true)
              setTimeout(() => {
                onAnswer(true)
              }, 600)
            }
          }
        } else {
          // CONEXÃO ERRADA - mostra erro
          targetElement.classList.add('animate-shake', 'border-danger-500', 'bg-danger-50')
          setTimeout(() => {
            targetElement.classList.remove('animate-shake', 'border-danger-500', 'bg-danger-50')
          }, 500)
        }
      }

      setActiveDrag(null)
    },
    [activeDrag, leftItems, matches, question.pairs.length, onAnswer],
  )

  useEffect(() => {
    if (activeDrag) {
      document.addEventListener('mousemove', handleDragMove)
      document.addEventListener('mouseup', handleDragEnd)
      document.addEventListener('touchmove', handleDragMove, { passive: false })
      document.addEventListener('touchend', handleDragEnd)

      return () => {
        document.removeEventListener('mousemove', handleDragMove)
        document.removeEventListener('mouseup', handleDragEnd)
        document.removeEventListener('touchmove', handleDragMove)
        document.removeEventListener('touchend', handleDragEnd)
      }
    }
  }, [activeDrag, handleDragMove, handleDragEnd])

  // Recalcular posições das linhas quando a tela for redimensionada
  useEffect(() => {
    const updateLines = () => {
      const container = containerRef.current
      if (!container || lines.length === 0) return

      const newLines = lines.map((line) => {
        const leftEl = container.querySelector(`[data-left-id="${line.leftId}"]`)
        const rightEl = container.querySelector(`[data-val="${line.rightText}"]`)

        if (leftEl && rightEl) {
          const leftPos = getBolinhaCenter(leftEl, container)
          const rightPos = getBolinhaCenter(rightEl, container)
          return {
            ...line,
            x1: leftPos.x,
            y1: leftPos.y,
            x2: rightPos.x,
            y2: rightPos.y,
          }
        }
        return line
      })

      setLines(newLines)
    }

    window.addEventListener('resize', updateLines)
    return () => window.removeEventListener('resize', updateLines)
  }, [lines])

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-500 mb-2 font-bold">
        <i className="ph ph-hand-swipe" aria-hidden="true"></i>
        Toque e arraste uma linha da esquerda para a resposta correta na direita:
      </p>

      <div
        ref={containerRef}
        className="relative w-full h-[300px] flex justify-between select-none touch-none"
        id="line-connect-container"
      >
        {/* SVG para as linhas */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
          aria-hidden="true"
        >
          {lines.map((line, idx) => (
            <line
              key={idx}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
          {activeDrag && (
            <line
              x1={activeDrag.startX}
              y1={activeDrag.startY}
              x2={activeDrag.currentX}
              y2={activeDrag.currentY}
              stroke="#0ea5e9"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="8,4"
            />
          )}
        </svg>

        {/* Coluna Esquerda */}
        <div className="flex flex-col justify-around gap-2 w-[45%] z-10" id="left-col">
          {leftItems.map((item) => (
            <div
              key={item.id}
              data-left-id={item.id}
              data-val={item.id}
              className={`match-left p-3 border-2 rounded-xl shadow-sm text-xs md:text-sm font-bold cursor-grab flex items-center justify-between relative transition-all
                ${
                  item.locked
                    ? 'border-success-500 bg-success-50 dark:bg-success-900/40'
                    : 'border-primary-300 dark:border-primary-700 bg-white dark:bg-gray-800 hover:border-primary-500'
                }`}
              role="button"
              tabIndex="0"
              onMouseDown={(e) => handleDragStart(e, item)}
              onTouchStart={(e) => handleDragStart(e, item)}
            >
              <span className="pointer-events-none text-gray-800 dark:text-gray-100">
                {item.id}
              </span>
              <div
                className={`w-4 h-4 rounded-full pointer-events-none flex-shrink-0 ml-2 border-2 border-white dark:border-gray-900 shadow-sm
                ${item.locked ? 'bg-success-500' : 'bg-primary-500'}`}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* Coluna Direita */}
        <div className="flex flex-col justify-around gap-2 w-[45%] z-10" id="right-col">
          {rightItems.map((item) => (
            <div
              key={item.id}
              data-val={item.id}
              className={`match-right p-3 border-2 rounded-xl shadow-sm text-xs md:text-sm font-semibold flex items-center relative transition-colors
                ${
                  item.locked
                    ? 'border-success-500 bg-success-50 dark:bg-success-900/40'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                }`}
              role="button"
              tabIndex="0"
            >
              <div
                className={`w-4 h-4 rounded-full pointer-events-none flex-shrink-0 mr-2 border-2 border-white dark:border-gray-900 shadow-sm
                ${item.locked ? 'bg-success-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                aria-hidden="true"
              />
              <span className="pointer-events-none text-gray-700 dark:text-gray-300">
                {item.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
