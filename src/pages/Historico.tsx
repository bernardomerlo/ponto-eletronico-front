import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Registro } from "../types/register";

export default function Historico() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRegistros = async () => {
    try {
      const response = await api.get("/punch");
      setRegistros(response.data);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Histórico de Pontos</h1>

      <button
        onClick={() => navigate("/ponto")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Voltar
      </button>

      {loading ? (
        <p>Carregando...</p>
      ) : registros.length === 0 ? (
        <p>Nenhum registro encontrado.</p>
      ) : (
        <ul className="space-y-3">
          {registros.map((registro) => (
            <li
              key={registro.id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <span className="capitalize">
                {registro.type === "check-in" ? "Entrada" : "Saída"}
              </span>
              <span>
                {new Date(registro.timestamp).toLocaleString("pt-BR")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
