import { useState } from "react";
import api from "../services/api";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
      setName("");
      setEmail("");
      setPassword("");
      setError("");
      navigate("/");
    } catch (error) {
      setError("Erro ao cadastrar. " + error);
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <div className="flex justify-center relative">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="absolute left-0 top-0 bottom-0 text-slate-900"
          >
            <ChevronLeftIcon />
          </button>
          <h2 className="text-2xl font-bold text-center">Cadastro</h2>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Nome
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded"
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded"
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Senha
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
