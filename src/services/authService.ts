import { api } from "./api";

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  role: "client" | "professional";
};

export async function registerUser(data: RegisterData) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function loginUser(email: string, password: string) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
}