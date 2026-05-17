import { useEffect, useState } from "react";
import { getProfessionals } from "../services/professionalService";
import { Professional } from "../types";

export default function Home() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  function getCategoryName(category?: string) {
    return category || "Serviços gerais";
  }

  useEffect(() => {
    async function loadProfessionals() {
      try {
        const data = await getProfessionals();
        setProfessionals(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao buscar profissionais:", error);
        setProfessionals([]);
      } finally {
        setLoading(false);
      }
    }

    loadProfessionals();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
        <div className="grid gap-10 rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-2xl shadow-slate-200/50 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-slate-950/40 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200">
              Conectando você aos melhores profissionais locais
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Encontre serviços confiáveis com rapidez e elegância.
            </h1>

            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Do conserto elétrico à limpeza residencial, reúna profissionais avaliados e prontos para atender sua rotina.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button className="inline-flex items-center justify-center rounded-3xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
                Ver profissionais
              </button>
              <button className="inline-flex items-center justify-center rounded-3xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">
                Saiba mais
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-950">
                <p className="text-3xl font-bold text-emerald-600">+120</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Profissionais ativos</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-950">
                <p className="text-3xl font-bold text-sky-600">4.9</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Avaliação média</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center dark:border-slate-800 dark:bg-slate-950">
                <p className="text-3xl font-bold text-rose-600">100%</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Atendimento rápido</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white shadow-xl">
            <div className="rounded-[1.8rem] bg-slate-950/10 p-6 shadow-inner shadow-slate-950/10">
              <h2 className="text-2xl font-semibold">Comece em poucos passos</h2>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-100/90">
                <li className="rounded-3xl bg-white/10 p-4 backdrop-blur-sm">
                  <strong className="block text-lg font-semibold">1. Escolha o serviço</strong>
                  Selecione profissionais qualificados para limpeza, manutenção ou reformas.
                </li>
                <li className="rounded-3xl bg-white/10 p-4 backdrop-blur-sm">
                  <strong className="block text-lg font-semibold">2. Compare e converse</strong>
                  Veja avaliações, horários disponíveis e mensagens diretas com o profissional.
                </li>
                <li className="rounded-3xl bg-white/10 p-4 backdrop-blur-sm">
                  <strong className="block text-lg font-semibold">3. Agende com confiança</strong>
                  Receba atendimento rápido e acompanhe cada etapa do serviço contratado.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
        <div className="grid gap-10 rounded-[2rem] bg-slate-900/95 p-10 text-white shadow-2xl shadow-slate-900/20 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Sobre nós</p>
            <h2 className="text-3xl font-bold sm:text-4xl">Somos o serviço local que une confiança e praticidade.</h2>
            <p className="max-w-xl text-base leading-8 text-slate-200">
              O ServiçoJá nasceu para facilitar a sua vida com um marketplace de profissionais de confiança. Conectamos moradores a prestadores com atendimento rápido e avaliações reais.
            </p>
            <p className="text-base leading-8 text-slate-300">
              Atuamos com transparência, foco em qualidade e segurança em cada serviço. Aqui, você encontra o profissional certo para cada necessidade, sem perder tempo.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-950/20">
              <h3 className="text-xl font-semibold text-white">Nossa missão</h3>
              <p className="mt-3 text-slate-200">Facilitar o acesso a serviços locais de qualidade e gerar oportunidades reais para profissionais da região.</p>
            </div>
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-950/20">
              <h3 className="text-xl font-semibold text-white">Nossa visão</h3>
              <p className="mt-3 text-slate-200">Ser a plataforma mais confiável para contratar serviços residenciais e comerciais no seu bairro.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
        <div className="flex flex-col gap-6 rounded-[2rem] bg-white p-8 shadow-2xl shadow-slate-200/50 dark:bg-slate-900 dark:shadow-slate-950/40">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-300">Profissionais em destaque</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">Confira alguns profissionais disponíveis</h2>
          </div>

          {loading && (
            <p className="text-slate-500 dark:text-slate-400">Carregando profissionais...</p>
          )}

          {!loading && professionals.length === 0 && (
            <p className="text-slate-500 dark:text-slate-400">Nenhum profissional cadastrado ainda.</p>
          )}

          <div className="grid gap-6 md:grid-cols-3">
            {professionals.map((pro) => (
              <div key={pro.id} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-5 shadow-lg transition hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
                <img
                  src={pro.cover || pro.avatar || "https://placehold.co/600x400?text=Profissional"}
                alt={pro.name || "Profissional"}
                className="h-44 w-full rounded-3xl object-cover"
                />

                <div className="mt-5 space-y-3">
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{pro.name || "Profissional sem nome"}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{getCategoryName(pro.category)}</p>
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{pro.description || "Profissional cadastrado na plataforma."}</p>
                </div>

                <div className="mt-5 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>{pro.location || "Localização não informada"}</span>
                  <span>⭐ {pro.rating || 5}</span>
                </div>

                <button className="mt-5 w-full rounded-3xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
                  Ver perfil
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
