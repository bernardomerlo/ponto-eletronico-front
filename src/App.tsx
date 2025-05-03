import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Ponto from "./pages/Ponto";
import Historico from "./pages/Historico";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./contexts/AuthContext";
import Registro from "./pages/Registro";

function App() {
  const { user } = useAuth();

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
        <Route path="/register" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default App;
