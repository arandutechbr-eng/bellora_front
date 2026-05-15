import { api } from "./api";

export async function getMyRequests() {
  const response = await api.get("/requests/me");
  return response.data;
}
