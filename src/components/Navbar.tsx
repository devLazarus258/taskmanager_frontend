// src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../api/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const auth = isAuthenticated();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-lg"><Link to="/">TaskManager</Link></div>
      <div className="space-x-4">
        {auth ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="bg-red-500 px-2 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Entrar</Link>
            <Link to="/register" className="bg-green-500 px-2 py-1 rounded">Registar</Link>
          </>
        )}
      </div>
    </nav>
  );
}
