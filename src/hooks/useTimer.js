import { useState, useRef, useCallback, useEffect } from 'react'

export const useTimer = (initialSeconds = 0, autoStart = false) => {
  const [seconds, setSeconds] = useState(initialSeconds)
  const timerRef = useRef(null)
  const isRunningRef = useRef(false)

  const start = useCallback(() => {
    if (isRunningRef.current) return
    isRunningRef.current = true
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)
  }, [])

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
      isRunningRef.current = false
    }
  }, [])

  const reset = useCallback(() => {
    stop()
    setSeconds(initialSeconds)
  }, [initialSeconds, stop])

  const restart = useCallback(() => {
    reset()
    start()
  }, [reset, start])

  const formatTime = useCallback(() => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }, [seconds])

  useEffect(() => {
    if (autoStart) {
      start()
    }
    return () => stop()
  }, [autoStart, start, stop])

  return {
    seconds,
    setSeconds,
    start,
    stop,
    reset,
    restart,
    formatTime,
    isRunning: isRunningRef.current,
  }
}
