import { api } from "./api";

export interface BackendReview {
  id: number;
  professional_id: number;
  client_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export async function getReviews(professionalId: string | number) {
  const response = await api.get<BackendReview[]>(`/reviews/professional/${professionalId}`);
  return response.data;
}
