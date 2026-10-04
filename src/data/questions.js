// Importe suas imagens
import CanesElevador from '../assets/imagens/Canes-Elevador-Lotado.png'
import CanesRampa from '../assets/imagens/Canes-correndo-rampa1.png'
import CanesCelular from '../assets/imagens/Canes-correndo-rampa.png'
import SirenoJoinha from '../assets/imagens/Sireno-fazendo-joinha.png'
import SirenoTchau from '../assets/imagens/Sireno-fazendo-tchau.png'
import Sireno from '../assets/imagens/sireno.png'

import PontoFundo from '../assets/imagens/Pontoencontro-fundo.png'
import PontoFrente from '../assets/imagens/Pontoencontro-frente.png'

import Erros7 from '../assets/imagens/Erros7.jpg'

export const IMAGES = {
  SIRENO: Sireno,
  SIRENO_JOINHA: SirenoJoinha,
  SIRENO_TCHAU: SirenoTchau,
  CANES_ELEVADOR: CanesElevador,
  CANES_RAMPA: CanesRampa,
  CANES_CELULAR: CanesCelular,
  PONTO_FUNDO: PontoFundo,
  PONTO_FRENTE: PontoFrente,
  ERROS_7: Erros7,
}

// Placeholders para outras imagens
const IMG_SALA = 'https://placehold.co/800x400/334155/64748b?text=Sala+de+Aula'
const IMG_CORREDOR = 'https://placehold.co/800x400/0f172a/334155?text=Corredor'
const IMG_ESCADA = 'https://placehold.co/800x400/2d3748/4a5568?text=Escada'
const IMG_SAIDA = 'https://placehold.co/800x400/1e293b/475569?text=Hall+de+Saida'
const IMG_PONTO = 'https://placehold.co/800x400/2f855a/48bb78?text=Ponto+de+Encontro'
const IMG_7ERROS = 'https://placehold.co/800x450/4b5563/1f2937?text=Identifique+os+Erros+na+Imagem'

// Template do Balão do Sireno - TAMANHO GRANDE E UNIFORME
export const getSirenoBalloon = (text, imageUrl = IMAGES.SIRENO) => `
  <div class="flex items-start gap-4 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm mt-4">
    <img 
      src="${imageUrl}" 
      class="w-28 h-28 md:w-36 md:h-36 rounded-full shadow-md border-2 border-white flex-shrink-0 object-cover" 
      alt="Sireno - personagem que dá orientações de segurança"
      role="img"
    >
    <div class="flex-1 text-left text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
      <strong class="text-blue-800 dark:text-blue-300 block mb-1">Sireno diz:</strong>
      ${text}
    </div>
  </div>
`

export const questionsDB = [
  // 1. Ponto de Encontro
  {
    id: 1,
    type: 'multiple-choice',
    room: 'Apresentação Inicial',
    roomIcon: 'ph-map-pin',
    bgImage: IMG_PONTO,
    situation: 'Fase 1: Conhecendo o Destino',
    question: 'Sobre os pontos de encontro da nossa unidade, qual é a afirmação correta?',
    options: [
      {
        id: 'a',
        text: 'A) Temos apenas um ponto de encontro, localizado na entrada principal.',
      },
      {
        id: 'b',
        text: 'B) Temos dois pontos de encontro: o ponto 1 na entrada principal e o ponto 2 no estacionamento.',
      },
      {
        id: 'c',
        text: 'C) Temos três pontos de encontro, sendo o terceiro na quadra de esportes.',
      },
      {
        id: 'd',
        text: 'D) Não temos um ponto de encontro fixo, deve-se aguardar na rua.',
      },
    ],
    correctAnswer: 'b',
    explanationCorrect:
      'Perfeito! A unidade possui dois pontos: um na entrada principal e outro no estacionamento.',
    explanationWrong:
      'O vídeo instrui que existem apenas dois pontos de encontro (entrada principal e estacionamento).',
  },

  // 2. Alarme
  {
    id: 2,
    type: 'drag-match',
    room: 'Sala de Aula',
    roomIcon: 'ph-bell-ringing',
    bgImage: IMG_SALA,
    situation: 'Fase 2: O Som do Alerta',
    question:
      'Arraste uma linha para conectar o toque do alarme à ação correta que você deve realizar.',
    pairs: [
      {
        left: '1º Toque (30 segundos)',
        right: 'Fique na sala e aguarde orientações',
      },
      { left: '2º Toque (1 minuto)', right: 'Evacuar o prédio imediatamente' },
    ],
    distractorsRight: ['Ligar para os bombeiros', 'Procurar a origem do fogo'],
    correctAnswer: 'correct',
    explanationCorrect:
      'No 1º toque apenas a brigada se mobiliza. O 2º toque é o sinal para abandono de área total.',
    explanationWrong:
      'Confundir os toques pode gerar pânico. 1º Toque = Aguardar; 2º Toque = Evacuar a área.',
  },

  // 3. Procedimentos
  {
    id: 3,
    type: 'sequence',
    room: 'Evacuação',
    roomIcon: 'ph-list-numbers',
    bgImage: IMG_CORREDOR,
    situation: 'Fase 3: A Ordem de Saída',
    question: 'Organize corretamente a sequência dos procedimentos de abandono de área:',
    steps: [
      'Tocar o alarme (primeiros 30 segundos) — Atenção',
      'Organizar em fila',
      'Segundo alarme (1 minuto) — Abandono de Área',
      'Aguardar o brigadista chegar e orientar o ponto de encontro',
      'Seguir para o ponto de encontro',
      'Permanecer no ponto de encontro',
    ],
    correctAnswer: 'correct',
    explanationCorrect: 'Esta é a sequência perfeita para garantir a segurança.',
    explanationWrong:
      'A ordem está incorreta. Lembre-se que devemos primeiro nos atentar ao 1º toque.',
  },

  // 4. Escadas
  {
    id: 4,
    type: 'multiple-choice',
    room: 'Escadas',
    roomIcon: 'ph-stairs',
    bgImage: IMG_ESCADA,
    situation: 'Fase 4: Áreas de Circulação',
    question: 'Por que é expressamente proibido sentar-se nos corredores e escadas?',
    options: [
      { id: 'a', text: 'A) Porque atrapalha a estética do prédio.' },
      {
        id: 'b',
        text: 'B) Porque são rotas de fuga e locais de circulação intensa.',
      },
      { id: 'c', text: 'C) Porque o corrimão pode quebrar com o peso.' },
      { id: 'd', text: 'D) Porque não há iluminação suficiente.' },
    ],
    correctAnswer: 'b',
    explanationCorrect:
      'Corredores e escadas são rotas de fuga vitais e devem estar sempre desobstruídos.',
    explanationWrong:
      'Eles não podem ser obstruídos pois são rotas de fuga e locais de circulação.',
  },

  // 5. Elevadores - CANES ELEVADOR
  {
    id: 5,
    type: 'bubble-select',
    room: 'Elevadores',
    roomIcon: 'ph-elevator',
    bgImage: IMG_CORREDOR,
    situation: 'Fase 5: O Perigo dos Elevadores',
    question: 'Selecione SOMENTE as quatro atitudes INCORRETAS em relação ao uso de elevadores.',
    centerImage: IMAGES.CANES_ELEVADOR,
    bubbles: [
      { text: 'Superlotação', icon: 'ph-users-three', isCorrect: true },
      {
        text: 'Respeitar a capacidade',
        icon: 'ph-check-circle',
        isCorrect: false,
      },
      { text: 'Brincadeiras', icon: 'ph-mask-happy', isCorrect: true },
      { text: 'Usar as escadas', icon: 'list-sort-ascending', isCorrect: false },
      { text: 'Uso em caso de incêndio', icon: 'ph-fire', isCorrect: true },
      {
        text: 'Aguardar com calma',
        icon: 'octagon-pause',
        isCorrect: false,
      },
      {
        text: 'Não respeitar preferencial',
        icon: 'person-standing',
        isCorrect: true,
      },
      { text: 'Ajudar colegas', icon: 'ph-handshake', isCorrect: false },
      { text: 'Seguir a sinalização', icon: 'ph-signpost', isCorrect: false },
      { text: 'Avisar a brigada', icon: 'ph-shield-plus', isCorrect: false },
    ],
    correctAnswer: 'correct',
    explanationCorrect: 'Perfeito! Você identificou as piores práticas no uso dos elevadores.',
    explanationWrong: 'Você não selecionou todos os comportamentos incorretos.',
  },

  // 6. Funções - SIRENO JOINHA
  {
    id: 6,
    type: 'drag-match',
    room: 'Organização',
    roomIcon: 'ph-users',
    bgImage: IMG_SALA,
    situation: 'Fase 6: O Papel de Cada Um',
    question:
      'Arraste uma linha para conectar a função ao responsável correto durante o abandono de área:',
    pairs: [
      { left: 'Puxa-fila', right: 'Representante da Turma' },
      { left: 'Cerra-fila', right: 'Docente (Professor)' },
      { left: 'Anjo da Guarda', right: 'Pessoa escolhida no início do curso' },
    ],
    distractorsRight: ['Vice-representante', 'Coordenador'],
    correctAnswer: 'correct',
    explanationCorrect: `Em situações habituais, o representante puxa-fila, o docente cerra-fila e o anjo da Guarda ajuda alunos com singularidades.<br>
      ${getSirenoBalloon(
        'Caso os docentes sejam brigadistas, o cerra-fila será o vice-representante.<br><br><b>Atenção:</b> Após o abandono de área de todos, a sala deverá ser lacrada.',
        IMAGES.SIRENO_JOINHA,
      )}`,
    explanationWrong: 'Combinação incorreta! Lembre-se da estrutura padrão ensinada.',
  },

  // 7. Rampa - CANES RAMPA + SIRENO TCHAU
  {
    id: 7,
    type: 'bubble-select',
    room: 'Rampas e Escadas',
    roomIcon: 'ph-warning',
    bgImage: IMG_ESCADA,
    situation: 'Fase 7: Comportamento Seguro',
    question:
      'Selecione as três alternativas que indicam atitudes INCORRETAS ao utilizar as rampas:',
    centerImage: IMAGES.CANES_RAMPA,
    bubbles: [
      { text: 'Correr', icon: 'ph-sneaker', isCorrect: true },
      { text: 'Usar o corrimão', icon: 'ph-hand', isCorrect: false },
      { text: 'Empurrar', icon: 'ph-hand-palm', isCorrect: true },
      { text: 'Ajudar pessoas', icon: 'heart-handshake', isCorrect: false },
      {
        text: 'Andar de skate',
        icon: 'motorbike',
        isCorrect: true,
      },
      { text: 'Manter a calma', icon: 'face-slightly-smiling', isCorrect: false },
      {
        text: 'Andar pelo lado direito',
        icon: 'ph-arrow-right',
        isCorrect: false,
      },
      { text: 'Descer em fila indiana', icon: 'ph-users', isCorrect: false },
      { text: 'Prestar atenção ao piso', icon: 'ph-eye', isCorrect: false },
    ],
    correctAnswer: 'correct',
    explanationCorrect: `Ótimo! Essas atitudes colocam todos em risco. 
      ${getSirenoBalloon(
        'Respeite a sinalização de limpeza para evitar acidentes.',
        IMAGES.SIRENO_TCHAU,
      )}`,
    explanationWrong: 'Você marcou algo que é correto fazer ou deixou passar algo proibido.',
  },

  // 8. CANES CELULAR
  {
    id: 8,
    type: 'bubble-select',
    room: 'Comportamento',
    roomIcon: 'ph-device-mobile',
    bgImage: IMG_CORREDOR,
    situation: 'Fase 8: Durante o Abandono de Área',
    question: 'Selecione apenas os seis comportamentos INCORRETOS durante um abandono de área:',
    centerImage: IMAGES.CANES_CELULAR,
    bubbles: [
      { text: 'Fazer brincadeiras', icon: 'ph-mask-happy', isCorrect: true },
      { text: 'Seguir a Brigada', icon: 'ph-check-circle', isCorrect: false },
      { text: 'Correr', icon: 'ph-sneaker', isCorrect: true },
      {
        text: 'Caminhar rápido',
        icon: 'timer-reset',
        isCorrect: false,
      },
      {
        text: 'Andar lentamente',
        icon: 'timer',
        isCorrect: true,
      },
      { text: 'Ajudar quem precisa', icon: 'ph-hand-heart', isCorrect: false },
      { text: 'Entrar em pânico', icon: 'ph-smiley-sad', isCorrect: true },
      { text: 'Silêncio', icon: 'ph-speaker-slash', isCorrect: false },
      { text: 'Filmar/fotografar', icon: 'ph-camera', isCorrect: true },
      { text: 'Ficar na fila', icon: 'ph-users-three', isCorrect: false },
      { text: 'Lado esquerdo', icon: 'ph-arrow-left', isCorrect: true },
    ],
    correctAnswer: 'correct',
    explanationCorrect: 'Usar celular, correr ou entrar em pânico só aumenta os riscos.',
    explanationWrong: 'Você precisa identificar os riscos, e os comportamentos inadequados.',
  },

  // 9. Anjo da Guarda
  {
    id: 9,
    type: 'multiple-choice',
    room: 'Inclusão',
    roomIcon: 'ph-handshake',
    bgImage: IMG_SALA,
    situation: 'Fase 9: Acessibilidade',
    question: 'Qual é a função do Anjo da Guarda e quando ele é indicado?',
    options: [
      {
        id: 'a',
        text: 'A) Acompanhar pessoas com singularidades; é indicado no início do curso.',
      },
      { id: 'b', text: 'B) Trancar a sala de aula; definido pelo alarme.' },
      { id: 'c', text: 'C) Ajudar o bombeiro; é escolhido na hora.' },
      { id: 'd', text: 'D) Carregar extintores; é um funcionário exclusivo.' },
    ],
    correctAnswer: 'a',
    explanationCorrect: 'O anjo da guarda acompanha pessoas com necessidades específicas.',
    explanationWrong: 'Incorreto. O anjo da guarda deve ser indicado no início do curso.',
  },

  // 10. Não retornar
  {
    id: 10,
    type: 'multiple-choice',
    room: 'Pertences',
    roomIcon: 'ph-backpack',
    bgImage: IMG_CORREDOR,
    situation: 'Fase 10: Regra de Ouro',
    question:
      'Durante o abandono de área, você percebe que esqueceu seu celular e mochila na sala. O que fazer?',
    options: [
      { id: 'a', text: 'A) Voltar correndo para buscar, pois é rápido.' },
      { id: 'b', text: 'B) Jamais retornar. A sua segurança é a prioridade.' },
      { id: 'c', text: 'C) Pedir para o Docente ir buscar.' },
      {
        id: 'd',
        text: 'D) Aguardar no corredor e voltar quando achar seguro.',
      },
    ],
    correctAnswer: 'b',
    explanationCorrect: 'Sempre priorize a vida! Jamais retorne para buscar qualquer pertence.',
    explanationWrong: 'Resposta extremamente perigosa! Nunca retorne para buscar itens materiais.',
  },

  // 11. Permanecer no Ponto de Encontro + Sireno
  // 11. Permanecer no Ponto de Encontro + Sireno (DUPLO HOTSPOT)
  {
    id: 11,
    type: 'multi-image-hotspot',
    room: 'Zona Segura',
    roomIcon: 'ph-users-three',
    bgImage: IMG_SAIDA,
    situation: 'Fase 11: Chegada Segura',
    question: 'Clique no PONTO DE ENCONTRO nas DUAS imagens (fundo e frente da unidade):',
    images: [
      {
        url: IMAGES.PONTO_FUNDO,
        label: 'Fundo da Unidade',
        alt: 'Vista do fundo da unidade - clique no ponto de encontro',
        hotspots: [
          {
            x: 30,
            y: 40,
            width: 40,
            height: 40,
            isCorrect: true,
            label: 'Ponto de Encontro - Fundo',
          },
        ],
      },
      {
        url: IMAGES.PONTO_FRENTE,
        label: 'Frente da Unidade',
        alt: 'Vista da frente da unidade - clique no ponto de encontro',
        hotspots: [
          {
            x: 30,
            y: 40,
            width: 40,
            height: 40,
            isCorrect: true,
            label: 'Ponto de Encontro - Frente',
          },
        ],
      },
    ],
    correctAnswer: 'correct',
    explanationCorrect: `Você identificou os pontos de encontro nas duas vistas da unidade.<br>
      ${getSirenoBalloon(
        'Permaneça no ponto de encontro. Isso é importante para a conferência das pessoas e para evitar acidentes.',
        IMAGES.SIRENO,
      )}`,
    explanationWrong: 'Atenção! Você deve clicar no Ponto de Encontro nas DUAS imagens.',
  },

  // 12. Rota de Fuga + Sireno
  {
    id: 12,
    type: 'route-choice',
    room: 'Navegação',
    roomIcon: 'ph-map-trifold',
    bgImage: IMG_CORREDOR,
    situation: 'Fase 12: Decisão de Rota',
    question: 'O alarme tocou e você precisa escolher a rota:',
    routes: [
      {
        id: 'a',
        title: 'Caminho Sinalizado',
        desc: 'Seguir as placas verdes de Saída localizada por todas as rotas de fuga.',
        isCorrect: true,
        icon: 'ph-stairs',
      },
      {
        id: 'b',
        title: 'Caminho Curto',
        desc: 'Utilizar o elevador ou ir para o local mais próximo, mesmo que não seja a rota de fuga.',
        isCorrect: false,
        icon: 'ph-elevator',
      },
    ],
    correctAnswer: 'correct',
    explanationCorrect: `Decisão segura! Siga sempre as placas de sinalização <br> ${getSirenoBalloon(
      'É muito importante conhecer as rotas de fuga do local onde você se encontra. Elas estão sinalizadas nos corredores.',
      IMAGES.SIRENO,
    )}`,
    explanationWrong: `Você escolheu a rota perigosa. <br> ${getSirenoBalloon(
      'É muito importante conhecer as rotas de fuga do local onde você se encontra. Elas estão sinalizadas nos corredores.',
      IMAGES.SIRENO,
    )}`,
  },

  // 13. Jogo dos 7 Erros
  {
    id: 13,
    type: 'spot-the-error',
    room: 'Atenção Total',
    roomIcon: 'ph-magnifying-glass',
    bgImage: IMG_CORREDOR,
    situation: 'Fase 13: Os 7 Erros',
    question:
      'Clique diretamente na imagem para identificar 7 atitudes erradas de segurança e comportamento.',
    imageUrl: IMAGES.ERROS_7,
    errors: [
      // 1. Homem correndo no corredor (inferior esquerdo)
      {
        x: 4,
        y: 50,
        w: 14,
        h: 35,
        label: 'Correr pelo corredor',
      },

      // 2. Homem de amarelo filmando com celular (superior esquerdo)
      {
        x: 22,
        y: 40,
        w: 8,
        h: 20,
        label: 'Filmar com celular',
      },

      // 3. Homem azul empurrando a mulher
      {
        x: 36,
        y: 42,
        w: 10,
        h: 20,
        label: 'Empurrar colegas',
      },

      // 4. Mulher ruiva filmando (centro inferior)
      {
        x: 28,
        y: 72,
        w: 10,
        h: 22,
        label: 'Filmar/fotografar',
      },

      // 5. Homem amarelo apertando o elevador
      {
        x: 55,
        y: 43,
        w: 7,
        h: 20,
        label: 'Usar o elevador durante incêndio',
      },

      // 6. Duas mulheres conversando e bloqueando
      {
        x: 68,
        y: 55,
        w: 14,
        h: 30,
        label: 'Conversar e bloquear o corredor',
      },

      // 7. Menino sentado na escada (direito inferior)
      {
        x: 88,
        y: 68,
        w: 10,
        h: 22,
        label: 'Sentar nas escadas',
      },
    ],
    correctAnswer: 'correct',
    explanationCorrect:
      'Sensacional! Você possui um olhar clínico e identificou todas as infrações.',
    explanationWrong: 'Tente achar todos os pontos.',
  },
]
