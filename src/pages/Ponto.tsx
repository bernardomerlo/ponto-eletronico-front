import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut, Clock, History, Power } from "lucide-react";
import axios from "axios";

import api from "../services/api";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/user";
import JwtPayload from "../types/JwtPayload";
import { useAuth } from "../contexts/AuthContext";

export default function Ponto() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      navigate("/", { replace: true });
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setUser({
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      });
    } catch (err) {
      console.error("Erro ao decodificar JWT", err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const baterPonto = async (type: "check_in" | "check_out") => {
    try {
      await api.post("/punch-clock", { type });
      alert(
        `Ponto de ${
          type === "check_in" ? "entrada" : "saída"
        } registrado com sucesso.`
      );
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        alert(
          `Você já registrou o ponto ${
            type === "check_in" ? "de entrada" : "de saída"
          } hoje.`
        );
      } else {
        alert("Erro ao registrar ponto.");
      }
    }
  };

  const logout = () => {
    signOut();
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-600 via-blue-500 to-indigo-500 p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-2">
          <Clock className="h-7 w-7 text-indigo-600" />
          Olá, {user?.name?.split(" ")[0]}
        </h1>
        <p className="text-sm text-gray-500">
          Pronto para registrar seu ponto de hoje?
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => baterPonto("check_in")}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 py-3 font-semibold text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          >
            <LogIn className="h-5 w-5" /> Entrada
          </button>

          <button
            onClick={() => baterPonto("check_out")}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 py-3 font-semibold text-white shadow hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
          >
            <LogOut className="h-5 w-5" /> Saída
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-2 border-t border-gray-200">
          <button
            onClick={() => navigate("/historico")}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          >
            <History className="h-5 w-5" /> Histórico
          </button>

          <button
            onClick={logout}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-600 py-3 font-semibold text-white shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
          >
            <Power className="h-5 w-5" /> Sair
          </button>
        </div>
      </div>
    </div>
  );
}
