import { useState } from "react";
import { registerUser } from "../services/authService";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "client" as "client" | "professional",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await registerUser(form);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Cadastro realizado com sucesso!");
      window.location.href = "/";
    } catch (error: any) {
      alert(error.response?.data?.detail || "Erro ao cadastrar usuário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-5"
      >
        <h1 className="text-2xl font-bold text-slate-900">Criar conta</h1>

        <input
          className="w-full border rounded-xl px-4 py-3"
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="w-full border rounded-xl px-4 py-3"
          placeholder="E-mail"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          className="w-full border rounded-xl px-4 py-3"
          placeholder="Senha"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <select
          className="w-full border rounded-xl px-4 py-3"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value as "client" | "professional",
            })
          }
        >
          <option value="client">Sou cliente</option>
          <option value="professional">Sou profissional</option>
        </select>

        <button
          disabled={loading}
          className="w-full bg-emerald-600 text-white rounded-xl py-3 font-semibold hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}