import React from 'react'
import { ShieldCheck, PlayCircle, RotateCcw, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export const HomeScreen = ({ onStart, onContinue, hasProgress }) => {
  const { toggleTheme, isDark } = useTheme()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-8 p-4 relative">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Alternar tema"
        className="absolute top-4 right-4 z-50 p-2 rounded-full glass shadow-md text-gray-800 dark:text-gray-200 hover:scale-110 transition-transform"
      >
        {isDark ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-800 overflow-hidden group">
        <div className="absolute inset-0 bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors"></div>
        <ShieldCheck
          size={120}
          className="text-primary-500 animate-pulse-fast relative z-10"
          strokeWidth={1.5}
        />
      </div>

      <div className="space-y-4">
        <div className="inline-block px-4 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-sm font-bold text-gray-600 dark:text-gray-400 tracking-widest uppercase">
          Treinamento Corporativo
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
          Missão de Evacuação <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-700 text-3xl md:text-5xl">
            Escape da Unidade
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto font-medium">
          Verifique seus conhecimentos baseados no vídeo de segurança. Suas decisões podem salvar
          vidas.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-4">
          <button
            onClick={onStart}
            className="group relative px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-bold rounded-2xl shadow-[0_8px_0_rgb(12,74,110)] hover:shadow-[0_4px_0_rgb(12,74,110)] hover:translate-y-1 transition-all text-xl flex items-center gap-3 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Iniciar Missão
              <PlayCircle
                size={28}
                className="group-hover:scale-110 transition-transform"
                strokeWidth={1.5}
              />
            </span>
          </button>

          {hasProgress && (
            <button
              onClick={onContinue}
              className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition-all text-lg flex items-center gap-2 shadow-md"
            >
              <RotateCcw size={24} strokeWidth={1.5} />
              Continuar Progresso
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
