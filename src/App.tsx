import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Ponto from "./pages/Ponto";
import Historico from "./pages/Historico";
import Dashboard from "./pages/Dashboard";
import { User } from "./types/user";
import { jwtDecode } from "jwt-decode";
import JwtPayload from "./types/JwtPayload";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
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
    } catch (err) {
      console.error("Token inválido", err);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="p-4">Carregando...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!user ? <Login /> : <Navigate to="/ponto" />}
        />
        <Route path="/ponto" element={user ? <Ponto /> : <Navigate to="/" />} />
        <Route
          path="/historico"
          element={user ? <Historico /> : <Navigate to="/" />}
        />
        <Route
          path="/admin"
          element={
            user && user.role === "admin" ? (
              <Dashboard />
            ) : (
              <Navigate to="/ponto" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
