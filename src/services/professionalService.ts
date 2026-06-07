import { api } from "./api";
import { JobSpecs, Professional, WeeklyAvailability } from "../types";
import { DEFAULT_WEEKLY_AVAILABILITY } from "../constants/professionalSpecs";
import {
  formatCategoryName,
  formatDescription,
  formatLocation,
  formatPersonName,
  formatTitle,
} from "../utils/formatDisplay";

function mapBackendProfessional(raw: any): Professional {
  const categoryRaw = raw.category?.name ?? raw.category ?? "serviços gerais";
  const city = raw.city ?? "";
  const state = raw.state ?? "";
  const location = city || state ? formatLocation(city, state) : "Localização não informada";
  const image = raw.image || "https://placehold.co/1200x400?text=Profissional";
  const avatar = raw.user?.avatar || "https://placehold.co/100x100?text=Avatar";
  const jobSpecs: JobSpecs | undefined = raw.job_specs ?? undefined;
  const availability: WeeklyAvailability | undefined = raw.availability ?? undefined;
  const servicesFromSpecs = jobSpecs
    ? Object.entries(jobSpecs)
        .filter(([, value]) => value !== false && value !== '' && value !== null)
        .slice(0, 4)
        .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : String(value)}`)
    : [formatCategoryName(categoryRaw)];

  const todayKey = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()];
  const weekly = availability ?? DEFAULT_WEEKLY_AVAILABILITY;
  const availableToday = (weekly[todayKey] ?? []).length > 0;
  const rawName = raw.user?.name ?? "profissional";
  const rawTitle = raw.title ?? rawName;

  return {
    id: String(raw.id),
    name: formatPersonName(rawName),
    title: formatTitle(rawTitle),
    category: formatCategoryName(categoryRaw),
    professionalType: raw.professional_type,
    location,
    price: raw.price_from ?? 0,
    rating: raw.rating ?? 0,
    reviewsCount: raw.reviews_count ?? 0,
    avatar,
    cover: image,
    verified: raw.is_featured ?? false,
    description: formatDescription(raw.description ?? ""),
    services: servicesFromSpecs,
    gallery: raw.image ? [raw.image] : [],
    availableToday,
    jobSpecs,
    availability: weekly,
  };
}

export async function getProfessionals(params?: { professional_type?: string }) {
  const response = await api.get("/professionals", { params });
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

export async function updateProfessional(professionalId: number, data: Record<string, unknown>) {
  const response = await api.put(`/professionals/${professionalId}`, data);
  return mapBackendProfessional(response.data);
}
