import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Mail, Lock } from "lucide-react";

import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { User } from "../types/user";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/login", { email, password });
      localStorage.setItem("token", data.token);
      setUser(jwtDecode<User>(data.token));
      navigate("/ponto");
    } catch (err) {
      console.error(err);
      setError("Credenciais inválidas.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-500 p-4">
      <div className="w-full max-w-md rounded-2xl shadow-2xl bg-white/90 backdrop-blur-sm p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Ponto Eletrônico
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white/60 px-10 py-3 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
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
              className="w-full rounded-lg border border-gray-300 bg-white/60 px-10 py-3 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full rounded-lg bg-white py-3 font-semiboøld text-indigo-600 border border-indigo-600 shadow hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
