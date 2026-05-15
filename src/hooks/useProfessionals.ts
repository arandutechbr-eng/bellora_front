import { useEffect, useMemo, useState } from 'react';
import { getProfessionals } from '../services/professionalService';
import { Professional } from '../types';

export function useProfessionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfessionals().then(setProfessionals).finally(() => setLoading(false));
  }, []);

  const featured = useMemo(() => professionals.filter((item) => item.rating >= 4.8), [professionals]);

  return { professionals, featured, loading };
}
