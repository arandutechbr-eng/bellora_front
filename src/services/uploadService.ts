import { api } from "./api";

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/uploads/image", formData);

  return response.data;
}