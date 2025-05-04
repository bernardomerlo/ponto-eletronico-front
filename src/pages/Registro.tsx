import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Mail, Lock, User } from "lucide-react";

import api from "../services/api";

export default function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/users/register", { email, password, name });

      setEmail("");
      setPassword("");
      setName("");
      setError("");
      setSuccess("Cadastro realizado com sucesso!");

      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      console.error(err);
      setError("Erro ao cadastrar.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        <div className="flex items-center mb-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="Voltar ao login"
            className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-full p-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="flex-1 text-center text-3xl font-extrabold text-gray-800">
            Cadastro
          </h1>
          <span className="w-7" />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm mb-4 text-center">{success}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="name"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white/60 px-10 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white/60 px-10 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white/60 px-10 py-3 text-gray-800 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
