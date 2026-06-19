import { FormEvent, useState } from 'react';
import { FiMapPin, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { BEAUTY_CATEGORIES } from '../../constants/categories';
import type { CategorySlug } from '../../constants/categories';

export function HeroSearchCard() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategorySlug | ''>('');
  const [location, setLocation] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();
    if (category) params.set('categoria', category);
    if (location.trim()) params.set('local', location.trim());

    const query = params.toString();
    navigate(`/buscar${query ? `?${query}` : ''}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="hero-search-card"
      aria-label="Buscar profissionais de beleza"
    >
      <div className="hero-search-field">
        <label className="hero-search-label" htmlFor="hero-category">
          Categoria
        </label>
        <select
          id="hero-category"
          className="hero-search-input"
          value={category}
          onChange={(e) => setCategory(e.target.value as CategorySlug | '')}
        >
          <option value="">Todas as categorias</option>
          {BEAUTY_CATEGORIES.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hero-search-field">
        <label className="hero-search-label" htmlFor="hero-location">
          Cidade ou bairro
        </label>
        <div className="relative">
          <FiMapPin
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
            aria-hidden
          />
          <input
            id="hero-location"
            type="text"
            className="hero-search-input pl-11"
            placeholder="Ex.: Santos, São Paulo..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            autoComplete="address-level2"
          />
        </div>
      </div>

      <button type="submit" className="hero-search-btn">
        <FiSearch aria-hidden />
        Encontrar Profissionais
      </button>
    </form>
  );
}
