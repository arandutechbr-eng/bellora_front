/** Categorias do marketplace Bellora — expansível */

export type CategorySlug =
  | 'cabelo'
  | 'unhas'
  | 'cilios'
  | 'sobrancelhas'
  | 'estetica'
  | 'podologia'
  | 'maquiagem'
  | 'massagem'
  | 'terapia-capilar'
  | 'depilacao'
  | 'micropigmentacao';

export interface BeautyCategory {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
  /** Exibir na home (grid principal) */
  featuredOnHome?: boolean;
}

export const BEAUTY_CATEGORIES: BeautyCategory[] = [
  { slug: 'cabelo', name: 'Cabelo', description: 'Cortes, coloração, tratamentos e penteados.', icon: 'FiScissors', featuredOnHome: true },
  { slug: 'unhas', name: 'Unhas', description: 'Manicure, nail art e alongamento.', icon: 'FiStar', featuredOnHome: true },
  { slug: 'cilios', name: 'Cílios', description: 'Extensão, volume russo e lifting.', icon: 'FiEye', featuredOnHome: true },
  { slug: 'sobrancelhas', name: 'Sobrancelhas', description: 'Design, henna e micropigmentação leve.', icon: 'FiEdit3', featuredOnHome: true },
  { slug: 'estetica', name: 'Estética', description: 'Limpeza de pele, peeling e harmonização.', icon: 'FiHeart', featuredOnHome: true },
  { slug: 'podologia', name: 'Podologia', description: 'Cuidados com os pés e unhas dos pés.', icon: 'FiActivity', featuredOnHome: true },
  { slug: 'maquiagem', name: 'Maquiagem', description: 'Social, noiva e editorial.', icon: 'FiFeather', featuredOnHome: true },
  { slug: 'massagem', name: 'Massagem', description: 'Relaxante, modeladora e terapêutica.', icon: 'FiZap', featuredOnHome: true },
  { slug: 'terapia-capilar', name: 'Terapia Capilar', description: 'Cronograma capilar e tratamentos.', icon: 'FiDroplet', featuredOnHome: false },
  { slug: 'depilacao', name: 'Depilação', description: 'Cera, linha e laser.', icon: 'FiSun', featuredOnHome: false },
  { slug: 'micropigmentacao', name: 'Micropigmentação', description: 'Sobrancelhas, lábios e olhos.', icon: 'FiPenTool', featuredOnHome: false },
];

export const HOME_CATEGORIES = BEAUTY_CATEGORIES.filter((c) => c.featuredOnHome);

export const CATEGORY_SLUGS: CategorySlug[] = BEAUTY_CATEGORIES.map((c) => c.slug);

export const CATEGORY_LABELS: Record<CategorySlug, string> = Object.fromEntries(
  BEAUTY_CATEGORIES.map((c) => [c.slug, c.name])
) as Record<CategorySlug, string>;

export function getCategoryBySlug(slug: string): BeautyCategory | undefined {
  return BEAUTY_CATEGORIES.find((c) => c.slug === slug);
}

export function categorySearchUrl(slug: CategorySlug): string {
  return `/buscar?categoria=${slug}`;
}
