import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validaciones simples
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/users/admin`, {
        name,
        email,
        password,
      });

      alert("✅ Usuario admin creado con éxito");

      // Limpieza del formulario
      setName("");
      setEmail("");
      setPassword("");

      // Si hay callback, lo llamamos
      if (onRegister) onRegister(res.data);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        (err.response?.status === 409
          ? "El correo ya está en uso"
          : err.message);
      alert("❌ Error al registrar: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400 to-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative p-8 max-w-md w-full mx-auto bg-white/10 backdrop-blur-lg shadow-2xl rounded-3xl border border-white/20 hover:shadow-purple-500/25 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-y-3 animate-shimmer"></div>

        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
          🎮 Registro de Administrador ⚡
        </h1>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="👤 Nombre"
              className="w-full p-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 focus:shadow-lg focus:shadow-yellow-400/25 transition-all duration-300 hover:bg-white/15"
              required
              disabled={loading}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-pink-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="📧 Correo electrónico"
              className="w-full p-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:border-blue-400 focus:shadow-lg focus:shadow-blue-400/25 transition-all duration-300 hover:bg-white/15"
              required
              disabled={loading}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="🔒 Contraseña"
              className="w-full p-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:border-purple-400 focus:shadow-lg focus:shadow-purple-400/25 transition-all duration-300 hover:bg-white/15"
              required
              minLength={4}
              disabled={loading}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`relative w-full p-4 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden group ${
              loading
                ? "opacity-60 cursor-not-allowed bg-gray-500"
                : "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 active:scale-95"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 text-white drop-shadow-lg">
              {loading ? "🔄 Registrando..." : "✨ Registrar ✨"}
            </span>
            {!loading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-y-3 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
