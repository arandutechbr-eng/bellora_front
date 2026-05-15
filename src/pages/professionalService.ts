import { api } from "./api";

export async function getProfessionals() {
  const response = await api.get("/professionals");
  return response.data;
}