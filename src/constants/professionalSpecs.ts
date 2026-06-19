import {
  BEAUTY_CATEGORIES,
  CATEGORY_LABELS,
  CATEGORY_SLUGS,
  CategorySlug,
} from './categories';

export type ProfessionalType = CategorySlug;

export const PROFESSIONAL_TYPE_LABELS = CATEGORY_LABELS;
export const PROFESSIONAL_TYPES = CATEGORY_SLUGS;

export const WEEKDAYS = [
  { key: 'monday', label: 'Segunda' },
  { key: 'tuesday', label: 'Terça' },
  { key: 'wednesday', label: 'Quarta' },
  { key: 'thursday', label: 'Quinta' },
  { key: 'friday', label: 'Sexta' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' },
] as const;

export const TIME_SLOT_OPTIONS = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
];

export const BEAUTY_SPEC_FIELDS = [
  { key: 'especialidade', label: 'Especialidade principal', type: 'text' },
  { key: 'experiencia_anos', label: 'Anos de experiência', type: 'number' },
  { key: 'atendimento_domicilio', label: 'Atende em domicílio', type: 'boolean' },
  { key: 'atendimento_salao', label: 'Atende em salão/estúdio', type: 'boolean' },
  { key: 'aceita_cartao', label: 'Aceita cartão', type: 'boolean' },
] as const;

export const SPEC_FIELD_LABELS: Record<string, string> = {
  especialidade: 'Especialidade',
  experiencia_anos: 'Experiência (anos)',
  atendimento_domicilio: 'Atendimento em domicílio',
  atendimento_salao: 'Atendimento em salão',
  aceita_cartao: 'Aceita cartão',
};

export function getSpecFields(_type: ProfessionalType) {
  return BEAUTY_SPEC_FIELDS;
}

export function defaultJobSpecs(type: ProfessionalType): Record<string, string | number | boolean | string[]> {
  const category = BEAUTY_CATEGORIES.find((c) => c.slug === type);
  return {
    especialidade: category?.name ?? 'Beleza',
    experiencia_anos: 3,
    atendimento_domicilio: false,
    atendimento_salao: true,
    aceita_cartao: true,
  };
}

export function formatSpecValue(key: string, value: unknown): string {
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'string' ? capitalizeLabel(item) : String(item)))
      .join(', ');
  }
  if (typeof value === 'string') return capitalizeLabel(value);
  return String(value ?? '—');
}

function capitalizeLabel(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export const DEFAULT_WEEKLY_AVAILABILITY: Record<string, string[]> = {
  monday: ['08:00', '09:00', '14:00'],
  tuesday: ['08:00', '09:00', '14:00'],
  wednesday: ['08:00', '14:00'],
  thursday: ['08:00', '09:00', '14:00'],
  friday: ['08:00', '14:00'],
  saturday: ['09:00', '10:00'],
  sunday: [],
};
