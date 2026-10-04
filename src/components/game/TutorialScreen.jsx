import { useState, useEffect, useRef } from 'react'
import { Heart, TrendingUp, Rocket, X, ArrowLeft } from 'lucide-react'
import sirenoItens from '../../assets/imagens/Sireno-itensbrigada.png'
import CanesItens from '../../assets/imagens/Canes-Apresentacao.png'
import CanesImg from '../../assets/imagens/Canesapresentacao.png'
import sirenoHome from '../../assets/imagens/Sireno-Home.png'
import sirenoImg from '../../assets/imagens/Sirenoapresentacao.jpg'
import mascotesImg from '../../assets/imagens/CanesSirenoNovo.jpg'

export const TutorialScreen = ({ onStart }) => {
  const [showMascotes, setShowMascotes] = useState(false)
  const [showHistoria, setShowHistoria] = useState(false)
  const modalRef = useRef(null)
  const previousFocus = useRef(null)

  // ===== FOCUS TRAP E ESC =====
  useEffect(() => {
    if (showMascotes) {
      previousFocus.current = document.activeElement
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus()
        }
      }, 100)
    } else {
      if (previousFocus.current) {
        previousFocus.current.focus()
      }
    }
  }, [showMascotes])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showMascotes) {
        if (showHistoria) {
          setShowHistoria(false)
        } else {
          setShowMascotes(false)
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showMascotes, showHistoria])

  useEffect(() => {
    if (showMascotes) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setShowHistoria(false)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showMascotes])

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden bg-gray-200 dark:bg-gray-900">
      {/* ===== FUNDO DESFOCADO ===== */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${sirenoItens})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(30px)',
          opacity: 0.4,
          transform: 'scale(1.1)',
        }}
        aria-hidden="true"
      />

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/70 z-1" aria-hidden="true"></div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 z-1"
        aria-hidden="true"
      ></div>

      {/* ===== IMAGEM ESQUERDA ===== */}
      <div
        className="hidden lg:block absolute left-4 xl:left-12 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <img
          src={sirenoItens}
          alt=""
          className="w-48 xl:w-72 h-auto drop-shadow-2xl animate-bounce-slight"
          style={{
            filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
          }}
        />
      </div>

      {/* ===== IMAGEM DIREITA ===== */}
      <div
        className="hidden lg:block absolute right-4 xl:right-12 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <img
          src={sirenoHome}
          alt=""
          className="w-48 xl:w-72 h-auto drop-shadow-2xl animate-bounce-slight"
          style={{
            filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
            animationDelay: '0.5s',
          }}
        />
      </div>

      {/* ===== SKIP LINK ===== */}
      <a href="#tutorial-content" className="skip-link">
        Pular para o conteúdo do tutorial
      </a>

      {/* ===== CONTEÚDO PRINCIPAL ===== */}
      <div
        id="tutorial-content"
        className="w-full max-w-3xl glass rounded-3xl shadow-2xl overflow-hidden animate-slide-up border border-white/50 dark:border-gray-700/50 relative z-20"
      >
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-center text-white">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
            Como Funciona
          </h1>
        </div>

        <div className="p-8 space-y-6 bg-gray-100/95 dark:bg-gray-900/90 backdrop-blur-sm">
          <p className="text-center text-gray-700 dark:text-gray-300 font-medium text-lg">
            Você deverá tomar decisões durante uma situação simulada de emergência. Observe bem as
            perguntas e avance até a saída segura.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
              <Heart
                size={32}
                className="text-danger-500 flex-shrink-0"
                fill="#ef4444"
                aria-hidden="true"
              />
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white">Vidas e Tentativas</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Você não avança se errar. Perder as 3 vidas zera seu XP, mas você continua de onde
                  parou.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
              <TrendingUp size={32} className="text-success-500 flex-shrink-0" aria-hidden="true" />
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white">Pontuação (XP)</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ganhe XP acertando alternativas para subir de nível de Brigadista.
                </p>
              </div>
            </div>
          </div>

          {/* ===== BOTÕES ===== */}
          <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-gray-300 dark:border-gray-700 mt-6">
            <button
              onClick={onStart}
              className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-lg rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center"
              aria-label="Começar o treinamento"
            >
              Começar <Rocket size={24} aria-hidden="true" />
            </button>

            <button
              onClick={() => setShowMascotes(true)}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-bold text-lg rounded-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-lg w-full sm:w-auto justify-center"
              aria-label="Conheça nossos mascotes"
            >
              Conheça nossos mascotes
            </button>
          </div>
        </div>
      </div>

      {/* ===== MODAL DOS MASCOTES ===== */}
      {showMascotes && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mascotes-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowMascotes(false)
            }
          }}
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className="relative w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden animate-slide-up bg-gray-100 dark:bg-gray-900 border border-white/30 dark:border-white/20"
          >
            {/* Botão fechar */}
            <button
              onClick={() => setShowMascotes(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
              aria-label="Fechar janela dos mascotes"
            >
              <X size={24} aria-hidden="true" />
            </button>

            {/* Botão voltar (aparece só quando mostra a história) */}
            {showHistoria && (
              <button
                onClick={() => setShowHistoria(false)}
                className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors flex items-center gap-2"
                aria-label="Voltar para a imagem dos mascotes"
              >
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
            )}

            {/* Título */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-4 text-center text-white">
              <h2
                id="mascotes-title"
                className="text-xl md:text-2xl font-bold flex items-center justify-center gap-3"
              >
                {showHistoria ? 'Conheça a história' : 'Clique na imagem para saber mais'}
              </h2>
            </div>

            {/* ===== CONTEÚDO ===== */}
            <div className="overflow-auto max-h-[calc(90vh-80px)] bg-gray-100 dark:bg-gray-900">
              {!showHistoria ? (
                // ===== IMAGEM (clicável) =====
                <button
                  onClick={() => setShowHistoria(true)}
                  className="w-full h-full cursor-pointer group relative"
                  aria-label="Clique para saber mais sobre os mascotes"
                >
                  <img
                    src={mascotesImg}
                    alt="Mascotes da segurança: Sireno e Canes, personagens do treinamento de abandono de área. Clique para saber mais."
                    className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.02]"
                    onError={(e) => {
                      console.error('Erro ao carregar a imagem dos mascotes')
                      e.target.alt = 'Imagem dos mascotes não encontrada'
                    }}
                  />
                  {/* Overlay sutil no hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center pb-6 pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm">
                      Clique para conhecer os mascotes
                    </span>
                  </div>
                </button>
              ) : (
                // ===== HISTÓRIA =====
                <div className="p-6 md:p-10 space-y-6">
                  {/* SIRENO */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-l-4 border-blue-500 shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center overflow-hidden border-2 border-blue-300">
                        <img
                          src={sirenoImg}
                          alt="Sireno, o elefante da brigada"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
                          Sireno
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                          O elefante da Brigada Senac. Organizado, cuidadoso e sempre pronto para
                          ajudar a manter tudo seguro e funcionando bem.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CANES */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-l-4 border-red-500 shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center overflow-hidden border-2 border-red-300">
                        <img
                          src={CanesImg}
                          alt="Canes, o dragão da bagunça"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-extrabold text-red-600 dark:text-red-400 mb-2">
                          Canes
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                          O dragão da bagunça! Travesso, distraído e sempre aprontando pelo Senac.
                          Ele mostra, de forma divertida, aquelas atitudes que podem causar
                          problemas e que devemos evitar no dia a dia.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botão fechar */}
                  <div className="pt-4 text-center">
                    <button
                      onClick={() => setShowMascotes(false)}
                      className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105"
                    >
                      Vamos começar!
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
