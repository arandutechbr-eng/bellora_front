import { api } from "./api";
import { Professional } from "../types";

function mapBackendProfessional(raw: any): Professional {
  const category = raw.category?.name ?? raw.category ?? "Serviços gerais";
  const location = raw.city && raw.state ? `${raw.city}, ${raw.state}` : raw.city ?? raw.state ?? "Localização não informada";
  const image = raw.image || "https://placehold.co/1200x400?text=Profissional";
  const avatar = raw.user?.avatar || "https://placehold.co/100x100?text=Avatar";

  return {
    id: raw.id,
    name: raw.user?.name ?? raw.title ?? "Profissional",
    category,
    location,
    price: raw.price_from ?? 0,
    rating: raw.rating ?? 0,
    reviewsCount: raw.reviews_count ?? 0,
    avatar,
    cover: image,
    verified: raw.is_featured ?? false,
    description: raw.description ?? "",
    services: [category],
    gallery: raw.image ? [raw.image] : [],
    availableToday: raw.is_featured ?? false,
  };
}

export async function getProfessionals() {
  const response = await api.get("/professionals");
  return Array.isArray(response.data) ? response.data.map(mapBackendProfessional) : [];
}

export async function getProfessional(professionalId: number) {
  const response = await api.get(`/professionals/${professionalId}`);
  return mapBackendProfessional(response.data);
}

export async function getMyProfessional() {
  const response = await api.get("/professionals/me");
  return mapBackendProfessional(response.data);
}

export async function updateProfessional(professionalId: number, data: Record<string, any>) {
  const response = await api.put(`/professionals/${professionalId}`, data);
  return response.data;
}
