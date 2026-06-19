import { api } from './api';
import type { Service } from '../types';

function mapService(raw: Record<string, unknown>): Service {
  return {
    id: String(raw.id),
    professionalId: String(raw.professional_id),
    title: String(raw.title),
    description: String(raw.description ?? ''),
    duration: Number(raw.duration ?? 60),
    price: Number(raw.price ?? 0),
  };
}

export async function getProfessionalServices(professionalId: number): Promise<Service[]> {
  const response = await api.get(`/services/professional/${professionalId}`);
  return Array.isArray(response.data) ? response.data.map(mapService) : [];
}

export async function getMyServices(): Promise<Service[]> {
  const response = await api.get('/services/me');
  return Array.isArray(response.data) ? response.data.map(mapService) : [];
}

export async function createService(data: {
  title: string;
  description?: string;
  duration?: number;
  price: number;
}): Promise<Service> {
  const response = await api.post('/services', data);
  return mapService(response.data);
}

export async function updateService(
  serviceId: number,
  data: Partial<{ title: string; description: string; duration: number; price: number }>
): Promise<Service> {
  const response = await api.put(`/services/${serviceId}`, data);
  return mapService(response.data);
}

export async function deleteService(serviceId: number): Promise<void> {
  await api.delete(`/services/${serviceId}`);
}
