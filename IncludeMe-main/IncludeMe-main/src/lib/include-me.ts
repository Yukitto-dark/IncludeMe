/* Dados e tipos compartilhados do app Include Me (protótipo em memória). */

export type Role = "student" | "professional";
export type UserTag = "new" | "verified" | "admin";

export type Person = {
  id: string;
  name: string;
  course: string;
  tags: UserTag[];
};

export type DiaryEntry = {
  id: string;
  date: string; // ISO yyyy-mm-dd
  mood: number; // 1..5
  good: string;
  bad: string;
  learned: string;
};

export type EventCategory = "festa" | "carreira" | "estudos" | "bemestar";

export type AppEvent = {
  id: string;
  category: EventCategory;
  title: string;
  date: string;
  time: string;
  place: string;
  address: string;
  host: string;
  going: number;
  capacity: number;
  description: string;
  requirements: string;
};

export type Community = {
  id: string;
  name: string;
  code: string; // matrícula/código da turma ou área
  area: string;
  kind: "curso" | "trabalho" | "geral";
  members: number;
  general: boolean;
  status: "member" | "none" | "pending";
};

export type Housing = {
  id: string;
  name: string;
  type: string;
  price: number;
  dist: string;
  safety: string;
  rate: number;
  vacancies: number;
  confirmedResidents?: number;
  image?: string;
  images?: string[];
  desc: string;
  owner: string;
};

export type RoommateComment = {
  id: string;
  authorId: string;
  authorName: string;
  authorVerified: boolean;
  text: string;
  date: string;
};

export type RoommatePost = {
  id: string;
  authorId: string; // "me" quando o post é do usuário atual
  authorName: string;
  authorVerified: boolean;
  title: string;
  spotsNeeded: number;
  targetPeople?: number;
  interestedCount?: number;
  groupProfile?: string;
  rooms?: string;
  priceRange?: string;
  preferredArea?: string;
  description: string;
  comments: RoommateComment[];
  selectedCommentId: string | null;
};

export type Spot = {
  id: string;
  name: string;
  category: string;
  by: string;
  note: string;
  up: number;
  down: number;
  voted?: "up" | "down" | null;
};

export const MOOD_LABELS = ["Muito difícil", "Difícil", "Neutro", "Bom", "Ótimo"];
export const MOOD_EMOJI = ["😞", "😕", "😐", "🙂", "😄"];

export const initialDiary: DiaryEntry[] = [
  {
    id: "d1",
    date: "2026-05-11",
    mood: 2,
    good: "Consegui organizar o quarto",
    bad: "Senti saudade de casa",
    learned: "Preciso criar rotina",
  },
  {
    id: "d2",
    date: "2026-05-13",
    mood: 3,
    good: "Fiz uma amiga na aula de anatomia",
    bad: "Me perdi no campus",
    learned: "Pedir ajuda é mais fácil do que parece",
  },
  {
    id: "d3",
    date: "2026-05-15",
    mood: 3,
    good: "Almocei acompanhada",
    bad: "Prova difícil",
    learned: "Estudar em grupo rende mais",
  },
  {
    id: "d4",
    date: "2026-05-17",
    mood: 4,
    good: "Fui ao café com o grupo",
    bad: "Dormi pouco",
    learned: "Sair faz bem para minha cabeça",
  },
  {
    id: "d5",
    date: "2026-05-19",
    mood: 4,
    good: "Entrei na comunidade de calouros",
    bad: "Ansiedade antes da apresentação",
    learned: "Respiração ajuda muito",
  },
  {
    id: "d6",
    date: "2026-05-21",
    mood: 5,
    good: "Apresentei bem o trabalho",
    bad: "Nada marcante",
    learned: "Eu consigo mais do que imagino",
  },
];

export const initialEvents: AppEvent[] = [
  {
    id: "e1",
    category: "festa",
    title: "Café de boas-vindas dos calouros",
    date: "Sex, 22 de maio",
    time: "18h00 — 21h00",
    place: "Centro de Convivência UVV",
    address: "Rua Comissário José Dantas de Melo, 21, Vila Velha - ES",
    host: "Comissão de Acolhimento",
    going: 84,
    capacity: 120,
    description:
      "Encontro leve para quem chegou agora na cidade. Tem café, música baixa e dinâmicas rápidas de apresentação. Não precisa vir acompanhado: a organização apresenta as pessoas em pequenos grupos.",
    requirements: "Aberto a estudantes com matrícula ativa. Entrada gratuita.",
  },
  {
    id: "e2",
    category: "festa",
    title: "Rolê no parque + piquenique",
    date: "Dom, 24 de maio",
    time: "16h00 — 19h00",
    place: "Parque da Prainha",
    address: "Av. Champagnat, Prainha, Vila Velha - ES",
    host: "Grupo Intercambistas",
    going: 37,
    capacity: 60,
    description:
      "Piquenique colaborativo: cada pessoa leva algo simples. Espaço aberto, bem iluminado e movimentado, escolhido por segurança.",
    requirements: "Levar um item de lanche. Grupo se encontra na entrada às 15h50.",
  },
  {
    id: "e3",
    category: "carreira",
    title: "Roda de conversa: primeiro estágio",
    date: "Ter, 26 de maio",
    time: "19h00 — 20h30",
    place: "Auditório Bloco C",
    address: "Universidade Vila Velha, Vila Velha - ES",
    host: "Núcleo de Carreiras",
    going: 112,
    capacity: 150,
    description:
      "Estudantes veteranos e recrutadores contam como conseguiram o primeiro estágio, como montar currículo sem experiência e o que esperar do processo seletivo.",
    requirements: "Aberto a estudantes e profissionais cadastrados.",
  },
  {
    id: "e4",
    category: "carreira",
    title: "Mutirão de LinkedIn e currículo",
    date: "Qui, 28 de maio",
    time: "14h00 — 17h00",
    place: "Laboratório de Informática 2",
    address: "Universidade Vila Velha, Vila Velha - ES",
    host: "Núcleo de Carreiras",
    going: 45,
    capacity: 40,
    description:
      "Traga seu notebook: revisamos perfil do LinkedIn, foto, resumo e currículo em duplas com apoio de monitores.",
    requirements: "Vagas limitadas. Levar notebook ou celular.",
  },
  {
    id: "e5",
    category: "estudos",
    title: "Grupo de estudos — Anatomia",
    date: "Sáb, 23 de maio",
    time: "14h00 — 17h00",
    place: "Biblioteca Central",
    address: "Universidade Vila Velha, Vila Velha - ES",
    host: "Medicina UVV",
    going: 22,
    capacity: 30,
    description:
      "Revisão de sistema nervoso com monitoria. Material compartilhado no grupo após o encontro.",
    requirements: "Levar atlas ou tablet.",
  },
  {
    id: "e6",
    category: "bemestar",
    title: "Caminhada matinal na orla",
    date: "Sáb, 30 de maio",
    time: "07h00 — 08h30",
    place: "Praia da Costa — Quiosque 3",
    address: "Av. Antônio Gil Veloso, Vila Velha - ES",
    host: "Bem-estar UVV",
    going: 29,
    capacity: 50,
    description:
      "Caminhada tranquila em grupo, com ponto de encontro fixo e retorno ao mesmo local. Boa opção para quem quer sair de casa sem pressão social.",
    requirements: "Levar água. Grupo não se dispersa.",
  },
];

export const initialCommunities: Community[] = [
  {
    id: "c1",
    name: "Alunos UVV",
    code: "UVV-GERAL",
    area: "Universidade",
    kind: "geral",
    members: 1840,
    general: true,
    status: "member",
  },
  {
    id: "c2",
    name: "Calouros 2026",
    code: "UVV-2026",
    area: "Universidade",
    kind: "geral",
    members: 248,
    general: true,
    status: "member",
  },
  {
    id: "c3",
    name: "Medicina — Turma 2026/1",
    code: "MED-2026-1",
    area: "Medicina",
    kind: "curso",
    members: 132,
    general: false,
    status: "none",
  },
  {
    id: "c4",
    name: "Ciência da Computação — 3º período",
    code: "CCO-2024-3",
    area: "Computação",
    kind: "curso",
    members: 178,
    general: false,
    status: "none",
  },
  {
    id: "c5",
    name: "Direito — Turma 2025/2",
    code: "DIR-2025-2",
    area: "Direito",
    kind: "curso",
    members: 96,
    general: false,
    status: "pending",
  },
  {
    id: "c6",
    name: "Profissionais de Saúde Mental",
    code: "PROF-SM",
    area: "Saúde",
    kind: "trabalho",
    members: 64,
    general: false,
    status: "none",
  },
  {
    id: "c7",
    name: "Tecnologia & Estágios",
    code: "PROF-TI",
    area: "Tecnologia",
    kind: "trabalho",
    members: 210,
    general: false,
    status: "none",
  },
];

export const initialHousing: Housing[] = [
  {
    id: "h1",
    name: "República Sol",
    type: "República",
    price: 850,
    dist: "0,4 km",
    safety: "Alta",
    rate: 4.8,
    vacancies: 4,
    confirmedResidents: 2,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80",
    ],
    desc: "Casa com 4 moradores, todos universitários. Portaria com câmera, mercado e ponto de ônibus na esquina.",
    owner: "Marina (verificada)",
  },
  {
    id: "h2",
    name: "Kitnet Estudantil",
    type: "Kitnet",
    price: 1200,
    dist: "0,8 km",
    safety: "Alta",
    rate: 4.6,
    vacancies: 2,
    confirmedResidents: 1,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80",
    ],
    desc: "Kitnet mobiliada, contas inclusas, prédio com controle de acesso.",
    owner: "Rodrigo (verificado)",
  },
  {
    id: "h3",
    name: "Pensionato Lar",
    type: "Pensionato",
    price: 950,
    dist: "1,2 km",
    safety: "Média",
    rate: 4.4,
    vacancies: 3,
    confirmedResidents: 0,
    image:
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1560185009-dddeb820c7b7?auto=format&fit=crop&w=900&q=80",
    ],
    desc: "Quartos individuais com refeições incluídas. Regras de silêncio após 22h.",
    owner: "Dona Célia (verificada)",
  },
  {
    id: "h4",
    name: "Apartamento compartilhado",
    type: "Apartamento",
    price: 700,
    dist: "1,5 km",
    safety: "Alta",
    rate: 4.7,
    vacancies: 1,
    confirmedResidents: 0,
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    ],
    desc: "Quarto individual em apartamento de 3 quartos, condomínio com portaria 24h.",
    owner: "Ana P. (verificada)",
  },
];

export const initialRoommatePosts: RoommatePost[] = [
  {
    id: "r1",
    authorId: "u_marina",
    authorName: "Marina Souza",
    authorVerified: true,
    title: "Formar grupo para procurar um apartamento",
    spotsNeeded: 4,
    targetPeople: 4,
    interestedCount: 2,
    groupProfile: "Pessoas organizadas que estudem ou trabalhem",
    rooms: "3 ou 4 quartos",
    priceRange: "Até R$ 900 por pessoa",
    preferredArea: "Perto da UVV",
    description:
      "Não encontrei nenhum anúncio que combinasse comigo. Quero reunir 4 pessoas para pesquisar e visitar um apartamento perto da UVV, com preço que caiba no bolso de todo mundo.",
    comments: [],
    selectedCommentId: null,
  },
  {
    id: "r2",
    authorId: "u_rodrigo",
    authorName: "Rodrigo Alves",
    authorVerified: true,
    title: "Procurar apartamento para dividir",
    spotsNeeded: 1,
    targetPeople: 2,
    interestedCount: 0,
    groupProfile: "Pessoa tranquila, sem festas durante a semana",
    rooms: "2 quartos",
    priceRange: "R$ 700 a R$ 1.000 por pessoa",
    preferredArea: "Até 15 min da faculdade",
    description:
      "Quero encontrar uma pessoa com interesses parecidos para dividir um apartamento, combinar o orçamento e procurar um lugar que agrade aos dois.",
    comments: [],
    selectedCommentId: null,
  },
];

export const initialSpots: Spot[] = [
  {
    id: "s1",
    name: "Café Galeria",
    category: "Cafés",
    by: "Marina S.",
    note: "Wi-Fi bom e tomada em quase toda mesa. Ótimo para estudar sozinha com segurança.",
    up: 42,
    down: 3,
    voted: null,
  },
  {
    id: "s2",
    name: "Partido Alto",
    category: "Restaurantes",
    by: "Lucas M.",
    note: "Moqueca capixaba de verdade. Porção serve duas pessoas.",
    up: 31,
    down: 5,
    voted: null,
  },
  {
    id: "s3",
    name: "Convento da Penha",
    category: "Turismo",
    by: "Equipe Include Me",
    note: "Vista incrível. Ir de manhã, subida cansa no calor.",
    up: 58,
    down: 2,
    voted: null,
  },
  {
    id: "s4",
    name: "Parque da Prainha",
    category: "Parques",
    by: "Bruno T.",
    note: "Bem iluminado à noite e sempre movimentado.",
    up: 24,
    down: 1,
    voted: null,
  },
];

export const initialFriends: Person[] = [
  { id: "p1", name: "Marina Souza", course: "Medicina", tags: ["verified"] },
  { id: "p2", name: "Lucas Martins", course: "Computação", tags: ["verified", "admin"] },
];

export const suggestedFriends: Person[] = [
  { id: "p3", name: "Bruno Teles", course: "Direito", tags: ["new"] },
  { id: "p4", name: "Júlia Andrade", course: "Medicina", tags: ["verified"] },
  { id: "p5", name: "Rafael Lima", course: "Engenharia", tags: ["new"] },
  { id: "p6", name: "Carla Nunes", course: "Psicologia", tags: ["verified"] },
];

export const quizCity = [
  {
    q: "Qual é o cartão-postal mais conhecido de Vila Velha?",
    a: ["Convento da Penha", "Pão de Açúcar", "Cristo Redentor"],
    correct: 0,
  },
  {
    q: "Qual prato típico capixaba é servido em panela de barro?",
    a: ["Feijoada", "Moqueca", "Baião de dois"],
    correct: 1,
  },
  {
    q: "Qual transporte liga Vila Velha a Vitória com mais frequência?",
    a: ["Metrô", "Ônibus do Transcol", "Bondinho"],
    correct: 1,
  },
  {
    q: "Em qual número você liga em uma emergência de segurança?",
    a: ["190", "199", "911"],
    correct: 0,
  },
];

export const quizUni = [
  {
    q: "O que significa 'período' na faculdade?",
    a: ["A nota final", "O semestre que você cursa", "O nome do curso"],
    correct: 1,
  },
  {
    q: "Monitoria é...",
    a: [
      "Aula extra dada por um estudante veterano",
      "Uma prova substitutiva",
      "Um estágio remunerado",
    ],
    correct: 0,
  },
  {
    q: "O que é ementa da disciplina?",
    a: ["Lista de presença", "Conteúdo programático", "Boletim"],
    correct: 1,
  },
  {
    q: "Qual a melhor atitude ao se sentir sobrecarregado?",
    a: ["Ignorar e seguir", "Buscar apoio e reorganizar a rotina", "Trancar tudo sem pensar"],
    correct: 1,
  },
];

export const truthOrDare = {
  truth: [
    "Qual foi a coisa mais estranha que te aconteceu na primeira semana de aula?",
    "O que mais te deu medo ao mudar de cidade?",
    "Qual música te lembra da sua casa?",
    "Qual matéria você fingiu entender e não entendeu nada?",
  ],
  dare: [
    "Mande mensagem para alguém do grupo convidando para um café.",
    "Conte uma curiosidade sua que ninguém aqui sabe.",
    "Imite o jeito que um professor seu explica algo.",
    "Fale 3 coisas boas sobre a pessoa à sua direita.",
  ],
};

export const bingoItems = [
  "Veio de outro estado",
  "Já se perdeu no campus",
  "Mora sozinho",
  "Toca um instrumento",
  "Fala outro idioma",
  "Já matou aula (uma vez)",
  "Ama café",
  "Tem pet",
  "Acorda antes das 6h",
];

export const scrambleWords = [
  { word: "AMIZADE", hint: "O que a gente vem construir aqui" },
  { word: "CAMPUS", hint: "Onde ficam os prédios da faculdade" },
  { word: "ROTINA", hint: "Ajuda a organizar o dia" },
  { word: "ACOLHER", hint: "Receber bem quem chegou" },
];
