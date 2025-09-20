// src/components/DashboardStats.jsx
import { useEffect, useState } from "react";
import { getGlobalStats } from "../services/api";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    topWinners: [],
    topCategories: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getGlobalStats();
        setStats(data);
      } catch (err) {
        console.error("❌ Error cargando estadísticas globales:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <p>Cargando estadísticas...</p>;
  }

  return (
    <div className="mt-5 mb-5 p-6 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden">
      {/* Elementos flotantes decorativos */}
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full blur-xl animate-bounce"></div>

      {/* Título principal */}
      <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6 flex items-center gap-3 animate-pulse">
        📈 Estadísticas Globales
      </h2>

      {/* Card de partidas jugadas */}
      <div className="mb-6 p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-emerald-400/20 rounded-xl shadow-lg hover:shadow-emerald-400/20 hover:scale-105 transition-all duration-300">
        <p className="text-xl font-bold text-emerald-300 flex items-center gap-2">
          🎮 Partidas jugadas:
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent text-2xl animate-pulse">
            {stats.gamesPlayed ?? 0}
          </span>
        </p>
      </div>

      {/* Card de top ganadores */}
      <div className="mb-6 p-5 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-sm border border-yellow-400/20 rounded-xl shadow-lg hover:shadow-yellow-400/20 hover:scale-105 transition-all duration-300">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4 flex items-center gap-2">
          🏆 Top Ganadores
        </h3>
        {stats.topWinners && stats.topWinners.length > 0 ? (
          <ul className="space-y-3">
            {stats.topWinners.map((w, idx) => (
              <li
                key={idx}
                className={`p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                  idx === 0
                    ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-400/30 shadow-lg shadow-yellow-400/20"
                    : idx === 1
                      ? "bg-gradient-to-r from-gray-400/20 to-slate-400/20 border-gray-400/30 shadow-lg shadow-gray-400/20"
                      : idx === 2
                        ? "bg-gradient-to-r from-orange-600/20 to-amber-600/20 border-orange-400/30 shadow-lg shadow-orange-400/20"
                        : "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-400/20"
                }`}
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {idx === 0 && <span className="text-2xl">👑</span>}
                    {idx === 1 && <span className="text-2xl">🥈</span>}
                    {idx === 2 && <span className="text-2xl">🥉</span>}
                    <span className="font-semibold text-white">
                      {idx + 1}. {w.name}
                    </span>
                  </span>
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold">
                    {w.wins} victorias
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300 italic bg-gradient-to-r from-gray-400/10 to-slate-400/10 p-3 rounded-lg border border-gray-400/20">
            No hay ganadores registrados aún.
          </p>
        )}
      </div>

      {/* Card de categorías más acertadas */}
      <div className="p-5 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 backdrop-blur-sm border border-purple-400/20 rounded-xl shadow-lg hover:shadow-purple-400/20 hover:scale-105 transition-all duration-300">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4 flex items-center gap-2">
          📚 Categorías más acertadas
        </h3>
        {stats.topCategories && stats.topCategories.length > 0 ? (
          <ul className="space-y-3">
            {stats.topCategories.map((c, idx) => (
              <li
                key={idx}
                className="p-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-400/20 rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-400/20"
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-white">{c.category}</span>
                  </span>
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-bold">
                    {c.correctAnswers} aciertos
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300 italic bg-gradient-to-r from-gray-400/10 to-slate-400/10 p-3 rounded-lg border border-gray-400/20">
            No hay datos de categorías aún.
          </p>
        )}
      </div>
    </div>
  )
}
