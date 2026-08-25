import React, { useState } from 'react'
import { HomeScreen } from './components/game/HomeScreen'
import { TutorialScreen } from './components/game/TutorialScreen'
import { GameScreen } from './components/game/GameScreen'
import { ResultsScreen } from './components/game/ResultsScreen'
import { useGameState } from './hooks/useGameState'
import { ThemeProvider } from './context/ThemeContext'
import './styles/globals.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('home')
  const gameState = useGameState()

  const handleRestart = () => {
    gameState.resetGame()
    setCurrentScreen('home')
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onStart={() => setCurrentScreen('tutorial')}
            onContinue={() => {
              gameState.continueGame()
              setCurrentScreen('game')
            }}
            hasProgress={gameState.hasProgress()}
          />
        )
      case 'tutorial':
        return (
          <TutorialScreen
            onStart={() => {
              gameState.startGame()
              setCurrentScreen('game')
            }}
          />
        )
      case 'game':
        return <GameScreen state={gameState} onFinish={() => setCurrentScreen('results')} />
      case 'results':
        return <ResultsScreen state={gameState} onRestart={handleRestart} />
      default:
        return <HomeScreen onStart={() => setCurrentScreen('tutorial')} />
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
        <main role="main" aria-label="Conteúdo principal do jogo">
          {renderScreen()}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
