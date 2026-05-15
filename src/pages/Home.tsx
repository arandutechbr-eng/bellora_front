import { useEffect, useState } from "react";
import { getProfessionals } from "../services/professionalService";

type Category =
  | string
  | {
      id?: number;
      name?: string;
      icon?: string;
      description?: string;
    };

type Professional = {
  id: number;
  name?: string;
  category?: Category;
  description?: string;
  photo?: string;
  photo_url?: string;
  rating?: number;
  location?: string;
};

export default function Home() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  function getCategoryName(category?: Category) {
    if (!category) return "Serviços gerais";
    if (typeof category === "string") return category;
    return category.name || "Serviços gerais";
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
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-500 p-10 text-white shadow-xl">
          <h1 className="text-4xl font-extrabold">
            Encontre profissionais perto de você
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-emerald-50">
            Eletricistas, encanadores, diaristas, pintores, técnicos e muito mais.
          </p>
        </div>

        <h2 className="mt-10 text-2xl font-bold text-slate-900 dark:text-white">
          Profissionais em destaque
        </h2>

        {loading && (
          <p className="mt-6 text-slate-500">Carregando profissionais...</p>
        )}

        {!loading && professionals.length === 0 && (
          <p className="mt-6 text-slate-500">
            Nenhum profissional cadastrado ainda.
          </p>
        )}

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {professionals.map((pro) => (
            <div
              key={pro.id}
              className="rounded-3xl bg-white p-5 shadow-lg dark:bg-slate-900"
            >
              <img
                src={
                  pro.photo_url ||
                  pro.photo ||
                  "https://placehold.co/600x400?text=Profissional"
                }
                alt={pro.name || "Profissional"}
                className="h-44 w-full rounded-2xl object-cover"
              />

              <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                {pro.name || "Profissional sem nome"}
              </h3>

              <p className="text-sm text-slate-500">
                {getCategoryName(pro.category)}
              </p>

              <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                {pro.description || "Profissional cadastrado na plataforma."}
              </p>

              <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                <span>{pro.location || "Localização não informada"}</span>
                <span>⭐ {pro.rating || 5}</span>
              </div>

              <button className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700">
                Ver perfil
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}