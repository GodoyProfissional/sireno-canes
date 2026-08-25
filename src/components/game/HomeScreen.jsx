import React, { useRef, useEffect } from 'react'
import { PlayCircle, RotateCcw, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

import videoBg from '../../assets/videos/CANES E ELEFANTE.mp4'
import sirenoHome from '../../assets/imagens/Sireno-Home.png'

export const HomeScreen = ({ onStart, onContinue, hasProgress }) => {
  const { toggleTheme, isDark } = useTheme()
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playVideo = () => {
      video.play().catch(() => {})
    }

    const handleEnded = () => {
      video.currentTime = 0
      playVideo()
    }

    video.addEventListener('ended', handleEnded)
    playVideo()

    return () => {
      video.removeEventListener('ended', handleEnded)
      video.pause()
    }
  }, [])

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden bg-black"
      role="main"
      aria-label="Tela inicial"
    >
      {/* ===== SKIP LINK ===== */}
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>

      {/* ===== VÍDEO DE FUNDO ===== */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover z-0"
      >
        <source src={videoBg} type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/60 z-1" aria-hidden="true"></div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-1"
        aria-hidden="true"
      ></div>

      {/* ===== THEME TOGGLE ===== */}
      <button
        onClick={toggleTheme}
        aria-label={`Alternar para tema ${isDark ? 'claro' : 'escuro'}`}
        className="absolute top-4 right-4 z-20 p-2 rounded-full glass shadow-md text-gray-800 dark:text-gray-200 hover:scale-110 transition-transform"
      >
        {isDark ? <Sun size={24} aria-hidden="true" /> : <Moon size={24} aria-hidden="true" />}
      </button>

      {/* ===== CONTEÚDO PRINCIPAL ===== */}
      <div
        id="main-content"
        className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-4xl mx-auto px-4 py-8 text-center"
      >
        {/* SIRENO */}
        <div
          className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-red-500/10 backdrop-blur-sm flex items-center justify-center shadow-2xl border-4 border-white/20 dark:border-gray-800/30 overflow-hidden group"
          role="img"
          aria-label="Sireno - mascote da segurança"
        >
          <div
            className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/15 transition-colors duration-300"
            aria-hidden="true"
          ></div>
          <img
            src={sirenoHome}
            alt="Sireno - mascote da segurança, personagem que orienta sobre segurança"
            className="w-full h-full object-cover relative z-10 scale-90 group-hover:scale-95 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        <div className="space-y-4 mt-6">
          <div
            className="inline-block px-4 py-1 rounded-full bg-gray-900/80 backdrop-blur-sm text-sm font-bold text-white/90 tracking-widest uppercase border border-white/10"
            aria-label="Treinamento corporativo"
          >
            Treinamento Corporativo
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-xl">
            Missão de Evacuação
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-400 text-3xl md:text-5xl drop-shadow-lg">
              Escape da Unidade
            </span>
          </h1>
          <p className="text-lg text-white/90 max-w-xl mx-auto font-medium drop-shadow-lg">
            Verifique seus conhecimentos baseados no vídeo de segurança. Suas decisões podem salvar
            vidas.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-4">
            <button
              onClick={onStart}
              aria-label="Iniciar missão de evacuação"
              className="group relative px-10 py-5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-bold rounded-2xl shadow-[0_8px_0_rgb(12,74,110)] hover:shadow-[0_4px_0_rgb(12,74,110)] hover:translate-y-1 transition-all text-xl flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Iniciar Missão
                <PlayCircle
                  size={28}
                  className="group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                />
              </span>
            </button>

            {hasProgress && (
              <button
                onClick={onContinue}
                aria-label="Continuar jogo de onde parou"
                className="px-8 py-4 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 text-white font-bold rounded-xl transition-all text-lg flex items-center gap-2 shadow-md border border-white/10"
              >
                <RotateCcw size={24} aria-hidden="true" />
                Continuar Progresso
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
