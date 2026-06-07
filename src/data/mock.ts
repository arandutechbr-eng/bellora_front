import { Category, ChatMessage, Professional, Review, ServiceOrder } from '../types';

export const categories: Category[] = [
  { id: 'diarista', name: 'Diarista', icon: 'FaBroom', description: 'Limpeza residencial e comercial', color: 'from-pink-400 to-rose-500' },
  { id: 'baba', name: 'Babá', icon: 'FaBaby', description: 'Cuidado de crianças e apoio familiar', color: 'from-violet-400 to-purple-600' },
];

export const professionals: Professional[] = [
  {
    id: '2', name: 'Mariana Costa', title: 'Diarista caprichosa', category: 'Diarista', professionalType: 'diarista', location: 'São Vicente, SP', price: 160, rating: 4.8, reviewsCount: 92,
    jobSpecs: { tipo_limpeza: 'residencial', frequencia: 'semanal', traz_material: false, metros_aprox: 90, inclui_cozinha: true, inclui_banheiros: true, inclui_passar_roupa: true },
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop', verified: true,
    description: 'Limpeza detalhada, organização e pós-obra com materiais próprios sob consulta.',
    services: ['Faxina residencial', 'Limpeza pós-obra', 'Organização', 'Limpeza comercial'],
    gallery: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=500&auto=format&fit=crop','https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=500&auto=format&fit=crop'],
    availableToday: false
  },
  {
    id: '5', name: 'Patrícia Souza', title: 'Babá experiente', category: 'Babá', professionalType: 'baba', location: 'Santos, SP', price: 140, rating: 4.9, reviewsCount: 33,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    cover: 'https://images.unsplash.com/photo-1584515933487-779824ad3d8f?q=80&w=1200&auto=format&fit=crop', verified: true,
    description: 'Cuidado infantil com carinho, rotina educativa e apoio leve nas tarefas domésticas.',
    services: ['0-3 anos', 'manhã e tarde', 'primeiros socorros'],
    gallery: ['https://images.unsplash.com/photo-1584515933487-779824ad3d8f?q=80&w=500&auto=format&fit=crop'],
    availableToday: true,
    jobSpecs: { faixa_etaria: '0-3 anos', experiencia_anos: 5, turnos: ['manhã', 'tarde'], numero_criancas: 2, primeiros_socorros: true, ajuda_tarefas_domesticas: true },
  },
];

export const reviews: Review[] = [
  { id: 'r2', professionalId: '2', clientName: 'Fernando Silva', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop', rating: 5, comment: 'Minha casa ficou impecável. Recomendo demais.', date: '2026-04-10' },
  { id: 'r4', professionalId: '5', clientName: 'Camila Rocha', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop', rating: 5, comment: 'Babá carinhosa e muito responsável com meu filho.', date: '2026-04-18' },
];

export const orders: ServiceOrder[] = [
  { id: 'o2', title: 'Limpeza residencial completa', status: 'done', date: '2026-05-02', value: 220, clientName: 'Rafael Lima', professionalName: 'Mariana Costa' },
  { id: 'o4', title: 'Babá meio período', status: 'accepted', date: '2026-05-16', value: 140, clientName: 'Bianca Reis', professionalName: 'Patrícia Souza' },
];

export const messages: ChatMessage[] = [
  { id: 'm1', sender: 'other', text: 'Olá! Posso te ajudar com esse serviço hoje.', time: '09:32' },
  { id: 'm2', sender: 'me', text: 'Perfeito. Você atende em Santos?', time: '09:33' },
  { id: 'm3', sender: 'other', text: 'Sim, tenho horário no fim da tarde.', time: '09:34' }
];
