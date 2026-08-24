from pathlib import Path


# ============================================================
# CONFIGURAÇÃO
# ============================================================

# A raiz é a pasta onde este script está localizado.
#
# Exemplo:
#
# sireno-canes/
# ├── criar_projeto.py
# ├── package.json
# └── src/
#
# O script vai trabalhar dentro de "sireno-canes".
ROOT = Path(__file__).resolve().parent


# ============================================================
# ARQUIVOS COM CONTEÚDO
# ============================================================

FILES = {
    "vite.config.js": """import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
""",

    ".gitignore": """# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
""",

    "package.json": """{
  "name": "evacuation-mission",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "@phosphor-icons/react": "^2.0.10",
    "canvas-confetti": "^1.9.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "vite": "^5.0.8"
  }
}
""",

    "index.html": """<!doctype html>
<html lang="pt-BR" class="antialiased">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Missão de Evacuação - Escape da Unidade</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
""",

    "src/main.jsx": """import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
""",

    "src/App.jsx": """import React, { useState } from 'react';
import { HomeScreen } from './components/game/HomeScreen';
import { TutorialScreen } from './components/game/TutorialScreen';
import { GameScreen } from './components/game/GameScreen';
import { ResultsScreen } from './components/game/ResultsScreen';
import { useGameState } from './hooks/useGameState';
import { ThemeProvider } from './context/ThemeContext';
import './styles/globals.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const gameState = useGameState();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onStart={() => setCurrentScreen('tutorial')}
            onContinue={() => {
              gameState.continueGame();
              setCurrentScreen('game');
            }}
            hasProgress={gameState.hasProgress()}
          />
        );

      case 'tutorial':
        return (
          <TutorialScreen 
            onStart={() => {
              gameState.startGame();
              setCurrentScreen('game');
            }} 
          />
        );

      case 'game':
        return (
          <GameScreen 
            state={gameState}
            onFinish={() => setCurrentScreen('results')}
          />
        );

      case 'results':
        return (
          <ResultsScreen 
            state={gameState}
            onRestart={() => {
              gameState.resetGame();
              setCurrentScreen('home');
            }}
          />
        );

      default:
        return (
          <HomeScreen 
            onStart={() => setCurrentScreen('tutorial')} 
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
        {renderScreen()}
      </div>
    </ThemeProvider>
  );
}

export default App;
""",
}


# ============================================================
# PASTAS QUE DEVEM EXISTIR
# ============================================================

DIRECTORIES = [
    "public",

    "src",
    "src/styles",
    "src/context",
    "src/hooks",
    "src/data",

    "src/assets",
    "src/assets/imagens",

    "src/components",
    "src/components/game",
    "src/components/game/questionTypes",
    "src/components/shared",
]


# ============================================================
# ARQUIVOS QUE DEVEM EXISTIR
#
# Estes arquivos serão criados vazios se não existirem.
# Se já existirem, NÃO serão modificados.
# ============================================================

EMPTY_FILES = [
    "public/vite.svg",

    "src/styles/globals.css",

    "src/context/ThemeContext.jsx",

    "src/hooks/useGameState.js",
    "src/hooks/useTimer.js",
    "src/hooks/useTheme.js",

    "src/data/questions.js",

    "src/components/game/HomeScreen.jsx",
    "src/components/game/TutorialScreen.jsx",
    "src/components/game/GameScreen.jsx",
    "src/components/game/ResultsScreen.jsx",
    "src/components/game/QuestionRenderer.jsx",
    "src/components/game/FeedbackModal.jsx",
    "src/components/game/GameOverModal.jsx",

    "src/components/game/questionTypes/MultipleChoice.jsx",
    "src/components/game/questionTypes/BubbleSelect.jsx",
    "src/components/game/questionTypes/DragMatch.jsx",
    "src/components/game/questionTypes/Sequence.jsx",
    "src/components/game/questionTypes/ImageHotspot.jsx",
    "src/components/game/questionTypes/RouteChoice.jsx",
    "src/components/game/questionTypes/SpotError.jsx",

    "src/components/shared/HUD.jsx",
    "src/components/shared/Minimap.jsx",

    # Imagens esperadas
    "src/assets/imagens/Canes-Elevador-Lotado.png",
    "src/assets/imagens/Canes-querda-Rampa.png",
    "src/assets/imagens/Canes-Usando-celular.png",
    "src/assets/imagens/Sireno-fazendo-joinha.png",
    "src/assets/imagens/Sireno-fazendo-tchau.png",
    "src/assets/imagens/sireno.png",
]


# ============================================================
# CONTADORES
# ============================================================

created_files = 0
existing_files = 0
created_directories = 0
existing_directories = 0


# ============================================================
# CABEÇALHO
# ============================================================

print()
print("=" * 60)
print("      CRIADOR DA ESTRUTURA - SIRENO CANES")
print("=" * 60)
print()
print(f"Raiz do projeto:")
print(f"  {ROOT}")
print()


# ============================================================
# CRIAR PASTAS
# ============================================================

print("Criando pastas...")
print()

for directory in DIRECTORIES:
    path = ROOT / directory

    if path.exists():
        if path.is_dir():
            print(f"[OK]      {directory}/")
            existing_directories += 1
        else:
            print(f"[ERRO]    {directory} existe, mas NÃO é uma pasta!")
    else:
        path.mkdir(parents=True, exist_ok=True)
        print(f"[CRIADA]  {directory}/")
        created_directories += 1


# ============================================================
# CRIAR ARQUIVOS COM CONTEÚDO
# ============================================================

print()
print("Verificando arquivos principais...")
print()

for relative_path, content in FILES.items():
    path = ROOT / relative_path

    # Garante a existência da pasta pai
    path.parent.mkdir(parents=True, exist_ok=True)

    # Se já existe, não altera
    if path.exists():
        print(f"[OK]      {relative_path} -> já existe, mantido")
        existing_files += 1
        continue

    # Se não existe, cria
    path.write_text(content, encoding="utf-8")
    print(f"[CRIADO]  {relative_path}")
    created_files += 1


# ============================================================
# CRIAR ARQUIVOS VAZIOS
# ============================================================

print()
print("Verificando componentes, hooks, imagens e demais arquivos...")
print()

for relative_path in EMPTY_FILES:
    path = ROOT / relative_path

    # Garante a existência da pasta pai
    path.parent.mkdir(parents=True, exist_ok=True)

    # Se já existe, não altera
    if path.exists():
        print(f"[OK]      {relative_path} -> já existe, mantido")
        existing_files += 1
        continue

    # Cria arquivo vazio
    path.touch()
    print(f"[CRIADO]  {relative_path}")
    created_files += 1


# ============================================================
# RESUMO
# ============================================================

print()
print("=" * 60)
print("                    CONCLUÍDO")
print("=" * 60)
print()

print(f"Pastas criadas      : {created_directories}")
print(f"Pastas já existentes: {existing_directories}")
print(f"Arquivos criados    : {created_files}")
print(f"Arquivos mantidos   : {existing_files}")

print()
print("Raiz do projeto:")
print(f"  {ROOT}")
print()

print("IMPORTANTE:")
print("Nenhum arquivo existente foi sobrescrito.")
print("Nenhum arquivo existente foi apagado.")
print("Somente arquivos e pastas ausentes foram criados.")
print()

print("Para iniciar o projeto:")
print()
print("  npm install")
print("  npm run dev")
print()
