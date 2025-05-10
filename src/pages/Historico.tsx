import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, LogIn, LogOut, Loader2, Timer } from "lucide-react";

import api from "../services/api";
import { Registro } from "../types/register";

export default function Historico() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<Registro[]>("/punch-clock/history");
        setRegistros(data);
      } catch (err) {
        console.error("Erro ao buscar registros", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-600 via-sky-500 to-indigo-500 p-4">
      <div className="w-full max-w-xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
        <header className="flex items-center mb-6">
          <button
            aria-label="Voltar"
            onClick={() => navigate("/ponto")}
            className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-full p-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <h1 className="flex-1 text-center text-3xl font-extrabold text-gray-800">
            Histórico de Pontos
          </h1>

          <span className="w-7" />
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-gray-600">
            <Loader2 className="animate-spin h-6 w-6 mr-2" /> Carregando…
          </div>
        ) : registros.length === 0 ? (
          <p className="text-center text-gray-600">
            Nenhum registro encontrado.
          </p>
        ) : (
          <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {registros.map((r) => (
              <li
                key={r.id}
                className="bg-white rounded-lg shadow-sm p-4 flex flex-col gap-3"
              >
                <span className="font-semibold text-gray-800">
                  {new Date(r.date).toLocaleDateString("pt-BR", {
                    weekday: "short",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>

                <div className="grid grid-cols-3 text-center text-sm font-medium">
                  <div className="flex flex-col items-center gap-1">
                    <LogIn className="h-5 w-5 text-emerald-600" />
                    <span className="font-mono text-gray-700">
                      {r.checkInHour}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-wide text-gray-500">
                      Entrada
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    {r.checkOutHour ? (
                      <>
                        <LogOut className="h-5 w-5 text-rose-600" />
                        <span className="font-mono text-gray-700">
                          {r.checkOutHour}
                        </span>
                      </>
                    ) : (
                      <>
                        <Timer className="h-5 w-5 text-gray-400" />
                        <span className="font-mono text-gray-400">--:--</span>
                      </>
                    )}
                    <span className="text-[0.65rem] uppercase tracking-wide text-gray-500">
                      Saída
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <span className="font-mono text-indigo-700 text-lg">
                      {r.hoursWorked} h
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-wide text-gray-500">
                      Total
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
