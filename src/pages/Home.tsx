import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiCalendar,
  FiSearch,
  FiStar,
  FiUser,
} from 'react-icons/fi';
import { HeroBanner } from '../components/home/HeroBanner';
import { BRAND } from '../design/brand';
import { HOME_CATEGORIES, categorySearchUrl, CATEGORY_LABELS } from '../constants/categories';
import type { CategorySlug } from '../constants/categories';
import { getProfessionals } from '../services/professionalService';
import { Professional } from '../types';
import { resolveMediaUrl } from '../utils/mediaUrl';

const CATEGORY_ICONS: Record<string, typeof FiStar> = {
  cabelo: FiUser,
  unhas: FiStar,
  cilios: FiStar,
  sobrancelhas: FiStar,
  estetica: FiStar,
  podologia: FiStar,
  maquiagem: FiStar,
  massagem: FiStar,
};

export default function Home() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  function getCategoryName(category?: string) {
    if (!category) return 'Beleza e estética';
    const slug = category.toLowerCase() as CategorySlug;
    return CATEGORY_LABELS[slug] ?? category;
  }

  useEffect(() => {
    async function loadProfessionals() {
      try {
        const data = await getProfessionals({ featured: true });
        const list = Array.isArray(data) ? data : [];
        setProfessionals(list.length > 0 ? list : await getProfessionals().then((d) => (Array.isArray(d) ? d : [])));
      } catch (error) {
        console.error('Erro ao buscar profissionais:', error);
        setProfessionals([]);
      } finally {
        setLoading(false);
      }
    }

    loadProfessionals();
  }, []);

  return (
    <main className="surface-page bg-white dark:bg-navy-950">
      <HeroBanner />

      {/* CATEGORIAS */}
      <section className="home-band-sage">
        <div className="container-page py-14 sm:py-20">
          <div className="section-accent-bar" />
          <h2 className="heading-section">Categorias</h2>
          <p className="mt-2 max-w-xl text-muted">Explore serviços de beleza e estética.</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {HOME_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.slug] ?? FiStar;
              return (
                <Link
                  key={cat.slug}
                  to={categorySearchUrl(cat.slug)}
                  className="category-card-vivid category-beauty bg-white dark:bg-brand-900/70"
                >
                  <div className="icon-circle bg-gradient-brand">
                    <Icon />
                  </div>
                  <h3 className="text-base font-bold text-brand-700 dark:text-white sm:text-lg">{cat.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted sm:text-sm">{cat.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 sm:text-sm">
                    Ver profissionais <FiArrowRight />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROFISSIONAIS EM DESTAQUE */}
      <section className="container-page py-14 sm:py-20">
        <div className="home-band-accent">
          <div className="home-band-accent-inner">
            <div className="mb-8">
              <p className="eyebrow">Destaques</p>
              <h2 className="heading-page mt-4">Profissionais em Destaque</h2>
            </div>

            {loading && <p className="text-muted">Carregando profissionais...</p>}
            {!loading && professionals.length === 0 && (
              <p className="text-muted">Nenhum profissional cadastrado ainda.</p>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {professionals.slice(0, 6).map((pro) => (
                <article key={pro.id} className="card-interactive overflow-hidden p-1">
                  <img
                    src={resolveMediaUrl(pro.cover || pro.avatar)}
                    alt={pro.name || 'Profissional'}
                    className="h-44 w-full rounded-xl object-cover"
                  />
                  <div className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-brand-700 dark:text-white">
                        {pro.name || 'Profissional'}
                      </h3>
                      <span className="badge-brand">⭐ {pro.rating || 5}</span>
                    </div>
                    <p className="text-sm font-medium text-brand-600 dark:text-brand-400">
                      {getCategoryName(pro.category || pro.professionalType)}
                    </p>
                    <p className="line-clamp-2 text-sm text-muted">
                      {pro.description || 'Profissional cadastrado na plataforma.'}
                    </p>
                    <p className="text-xs text-muted">
                      {pro.location || 'Localização não informada'}
                    </p>
                    <Link to={`/profissional/${pro.id}`} className="btn-primary mt-2 w-full">
                      Agendar
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="container-page pb-14 sm:pb-20">
        <div className="section-accent-bar" />
        <h2 className="heading-section">Como funciona</h2>
        <p className="mt-2 max-w-xl text-muted">Quatro passos simples para agendar seu atendimento.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: '1',
              title: 'Encontre um profissional',
              desc: 'Busque por categoria, cidade e avaliação.',
              icon: FiSearch,
              gradient: 'bg-gradient-brand',
            },
            {
              step: '2',
              title: 'Escolha o horário',
              desc: 'Veja a agenda e selecione o melhor momento.',
              icon: FiCalendar,
              gradient: 'bg-gradient-sage',
            },
            {
              step: '3',
              title: 'Agende online',
              desc: 'Confirme o serviço com praticidade e segurança.',
              icon: FiUser,
              gradient: 'bg-gradient-accent',
            },
            {
              step: '4',
              title: 'Aproveite seu atendimento',
              desc: 'Relaxe e avalie sua experiência depois.',
              icon: FiStar,
              gradient: 'bg-gradient-brand',
            },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`step-card-vivid ${item.gradient}`}
            >
              <item.icon className="text-2xl opacity-80" aria-hidden />
              <span className="text-3xl font-black opacity-30">{item.step}</span>
              <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section className="container-page pb-14 sm:pb-20">
        <div className="panel-dark relative overflow-hidden md:grid md:grid-cols-2 md:gap-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-400/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent-400/15 blur-3xl" aria-hidden />
          <div className="relative space-y-5">
            <p className="eyebrow border-white/10 bg-white/10 text-brand-200">Sobre a {BRAND.name}</p>
            <h2 className="text-3xl font-bold sm:text-4xl">Beleza, tecnologia e bem-estar em um só lugar.</h2>
            <p className="leading-relaxed text-white/85">
              A {BRAND.name} conecta você aos melhores profissionais de beleza e estética,
              com transparência, segurança e uma experiência premium.
            </p>
            <p className="leading-relaxed text-white/60">
              Cada perfil destaca especialidades, portfólio e disponibilidade real —
              para você agendar com confiança.
            </p>
          </div>
          <div className="relative mt-8 grid gap-4 md:mt-0">
            {[
              { title: 'Missão', text: 'Facilitar o acesso a profissionais de beleza qualificados com segurança e praticidade.', color: 'border-brand-400/40 bg-brand-500/10' },
              { title: 'Visão', text: 'Ser a plataforma de referência em beleza e estética no Brasil.', color: 'border-accent-400/40 bg-accent-400/10' },
            ].map((block) => (
              <div key={block.title} className={`rounded-2xl border p-6 ${block.color}`}>
                <h3 className="text-lg font-semibold">{block.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
