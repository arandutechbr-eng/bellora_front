import type { CategorySlug } from '../constants/categories';

export const mockCategories = [
  { id: 'cabelo', name: 'Cabelo', icon: 'FiUser', description: 'Cortes, coloração e tratamentos', color: 'from-brand-400 to-brand-600' },
  { id: 'unhas', name: 'Unhas', icon: 'FiStar', description: 'Manicure e nail art', color: 'from-brand-300 to-brand-500' },
  { id: 'cilios', name: 'Cílios', icon: 'FiEye', description: 'Extensão e lifting', color: 'from-brand-400 to-accent-400' },
  { id: 'estetica', name: 'Estética', icon: 'FiHeart', description: 'Tratamentos faciais', color: 'from-brand-500 to-brand-700' },
];

export const mockProfessionals = [
  {
    id: '1',
    name: 'Juliana Mendes',
    title: 'Colorista e cabeleireira',
    category: 'Cabelo',
    professionalType: 'cabelo' as CategorySlug,
    location: 'Santos, SP',
    price: 120,
    rating: 4.9,
    reviewsCount: 87,
    avatar: 'https://images.unsplash.com/photo-1560066984-138dadb4c035',
    cover: 'https://images.unsplash.com/photo-1560066984-138dadb4c035',
    verified: true,
    description: 'Especialista em coloração e tratamentos capilares.',
    services: ['Corte', 'Coloração', 'Hidratação'],
    gallery: [],
    availableToday: true,
  },
  {
    id: '2',
    name: 'Camila Rocha',
    title: 'Nail designer',
    category: 'Unhas',
    professionalType: 'unhas' as CategorySlug,
    location: 'São Vicente, SP',
    price: 80,
    rating: 4.8,
    reviewsCount: 64,
    avatar: 'https://images.unsplash.com/photo-1604654894610-df63bc536371',
    cover: 'https://images.unsplash.com/photo-1604654894610-df63bc536371',
    verified: true,
    description: 'Alongamento em gel e nail art criativa.',
    services: ['Manicure', 'Alongamento', 'Nail art'],
    gallery: [],
    availableToday: true,
  },
];
