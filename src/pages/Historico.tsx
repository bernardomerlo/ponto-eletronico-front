import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, LogIn, LogOut, Loader2 } from "lucide-react";

import api from "../services/api";
import { Registro } from "../types/register";

export default function Historico() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const { data } = await api.get<Registro[]>("/punch-clock/history");
        setRegistros(data);
      } catch (err) {
        console.error("Erro ao buscar registros", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistros();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-600 via-sky-500 to-indigo-500 p-4">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        {/* Cabeçalho */}
        <div className="flex items-center mb-6">
          <button
            type="button"
            aria-label="Voltar"
            onClick={() => navigate("/ponto")}
            className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-full p-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <h1 className="flex-1 text-center text-3xl font-extrabold text-gray-800">
            Histórico de Pontos
          </h1>

          {/* placeholder para manter o título centralizado */}
          <span className="w-7" />
        </div>

        {/* Conteúdo */}
        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-600">
            <Loader2 className="animate-spin h-6 w-6 mr-2" /> Carregando...
          </div>
        ) : registros.length === 0 ? (
          <p className="text-center text-gray-600">
            Nenhum registro encontrado.
          </p>
        ) : (
          <ul className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {registros.map((r) => (
              <li
                key={r.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-white rounded-lg shadow p-4"
              >
                {/* Data */}
                <span className="font-semibold text-gray-700">
                  {new Date(r.date).toLocaleDateString("pt-BR")}
                </span>

                {/* Horários + total */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2 sm:mt-0">
                  <span className="flex items-center gap-1">
                    <LogIn className="h-5 w-5 text-emerald-600" />
                    {r.checkInHour}
                  </span>

                  {r.checkOutHour && (
                    <span className="flex items-center gap-1">
                      <LogOut className="h-5 w-5 text-rose-600" />
                      {r.checkOutHour}
                    </span>
                  )}

                  <span className="ml-2 font-mono">
                    {r.hoursWorked.toFixed(2)} h
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
)};
