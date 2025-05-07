import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Registro } from "../types/register";

export default function Dashboard() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRegistros = async () => {
    try {
      const response = await api.get("/admin/punches");
      setRegistros(response.data);
    } catch (error) {
      console.error("Erro ao buscar registros dos usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Administrativo</h1>
        <button
          onClick={() => navigate("/ponto")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Voltar
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : registros.length === 0 ? (
        <p>Nenhum registro encontrado.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="py-2 px-4">Usuário</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Tipo</th>
                <th className="py-2 px-4">Horário</th>
              </tr>
            </thead>
            <tbody>
              {/* {registros.map((registro) => (
                <tr key={registro.id} className="border-t">
                  <td className="py-2 px-4">{registro.user.name}</td>
                  <td className="py-2 px-4">{registro.user.email}</td>
                  <td className="py-2 px-4 capitalize">
                    {registro.type === "check_in" ? "Entrada" : "Saída"}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(registro.timestamp).toLocaleString("pt-BR")}
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
