/** Formata textos do banco (minúsculas) para exibição na UI. */

const LOWER_PARTICLES = new Set(['de', 'da', 'do', 'dos', 'das', 'e']);

function capitalizeWord(word: string): string {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/** Nomes e cidades: primeira letra maiúscula; partículas em minúsculo. */
export function formatPersonName(value: string): string {
  return value
    .trim()
    .split(/\s+/)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && LOWER_PARTICLES.has(lower)) {
        return lower;
      }
      return capitalizeWord(lower);
    })
    .join(' ');
}

export function formatCity(value: string): string {
  return formatPersonName(value);
}

export function formatState(value: string): string {
  return value.trim().toUpperCase().slice(0, 2);
}

export function formatLocation(city: string, state: string): string {
  const cityLabel = city ? formatCity(city) : '';
  const stateLabel = state ? formatState(state) : '';
  if (cityLabel && stateLabel) return `${cityLabel}, ${stateLabel}`;
  return cityLabel || stateLabel || 'Localização não informada';
}

/** Título curto do perfil (várias palavras). */
export function formatTitle(value: string): string {
  return formatPersonName(value);
}

/** Descrições: primeira letra de cada frase em maiúscula. */
export function formatDescription(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;

  return trimmed
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => {
      const s = sentence.trim();
      if (!s) return s;
      return s.charAt(0).toUpperCase() + s.slice(1);
    })
    .join(' ');
}

export function formatCategoryName(value: string): string {
  return formatPersonName(value);
}
