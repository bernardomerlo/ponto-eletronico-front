import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { User } from "../types/user";
import { jwtDecode } from "jwt-decode";
import JwtPayload from "../types/JwtPayload";
import { useAuth } from "../contexts/AuthContext";

export default function Ponto() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      navigate("/", { replace: true });
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const userData: User = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      };
      setUser(userData);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const baterPonto = async (type: "check-in" | "check-out") => {
    try {
      await api.post("/punch", { type });
      alert(
        `Ponto de ${
          type === "check-in" ? "entrada" : "saída"
        } registrado com sucesso.`
      );
    } catch (error) {
      alert("Erro ao registrar ponto." + error);
    }
  };
  const logout = () => {
    signOut();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    fetchUser();
  }, [navigate]);

  if (loading) {
    return <div className="p-4">Carregando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">Olá, {user?.name}</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => baterPonto("check-in")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Check-in
        </button>
        <button
          onClick={() => baterPonto("check-out")}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Check-out
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/historico")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ver histórico
        </button>
        <button
          onClick={logout}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
