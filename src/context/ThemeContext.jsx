import React, { createContext, useState, useContext, useEffect } from 'react'

// Exporta o contexto como named export
export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    try {
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        return true
      }
    } catch (e) {}
    return false
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      try {
        localStorage.theme = 'dark'
      } catch (e) {}
    } else {
      document.documentElement.classList.remove('dark')
      try {
        localStorage.theme = 'light'
      } catch (e) {}
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}
