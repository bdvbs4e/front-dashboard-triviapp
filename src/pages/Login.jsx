import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Login({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log (onLogin)

    if (!email.trim() || !password.trim()) {
      alert("Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password,
        requireAdmin: true, // 🔑 pedimos validación en el backend
      });

      if (res.data.role !== "admin") {
        alert("🚫 Acceso denegado: solo administradores pueden iniciar sesión aquí.");
        return;
      }

      // ✅ Si todo bien, enviamos el usuario al componente padre
      onLogin(res.data);

      // Limpiamos el formulario
      setEmail("");
      setPassword("");
    } catch (err) {
      const message =
        err.response?.data?.error ||
        (err.response?.status === 403
          ? "No tienes permisos para acceder al dashboard"
          : err.message);
      alert("❌ Error en login: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="p-6 max-w-md mx-auto mt-10 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 shadow-2xl rounded-3xl border border-white/20 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 animate-pulse"></div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent drop-shadow-lg animate-pulse">
            🎮 Login Admin
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="border-2 border-white/30 p-4 w-full rounded-2xl bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/30 focus:outline-none transition-all duration-300 hover:bg-white/20 shadow-lg"
                required
                disabled={loading}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse pointer-events-none"></div>
            </div>

            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="border-2 border-white/30 p-4 w-full rounded-2xl bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/30 focus:outline-none transition-all duration-300 hover:bg-white/20 shadow-lg"
                required
                disabled={loading}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse pointer-events-none"></div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold p-4 w-full rounded-2xl hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg relative overflow-hidden ${
                loading ? "opacity-60 cursor-not-allowed" : "hover:animate-pulse"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-pulse"></div>
              <span className="relative z-10">{loading ? "🔄 Iniciando..." : "🚀 Iniciar Sesión"}</span>
            </button>
          </form>

          <div className="text-center mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
            <p className="text-white/90 font-medium">¿No tienes cuenta?</p>
            <button
              onClick={onShowRegister}
              className="text-yellow-300 font-bold underline mt-2 hover:text-yellow-200 transition-colors duration-300 hover:scale-105 transform inline-block"
              disabled={loading}
            >
              ✨ Regístrate aquí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
