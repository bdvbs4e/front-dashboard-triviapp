import { useEffect, useState } from "react";
import { connectDashboard } from "../services/socket";
import RoomCard from "../components/RoomCard";
import { getGlobalStats } from "../services/api";

export default function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [stats, setStats] = useState({ 
    totalGames: 0, 
    totalPlayers: 0, 
    totalQuestions: 0, 
    totalCorrectAnswers: 0, 
    accuracy: 0,
    topWinners: [], 
    topCategories: [],
    lastUpdated: null
  });

  
  useEffect(() => {
    const adminData = localStorage.getItem("adminUser");
    if (!adminData) {
      window.location.href = "/login";
      return;
    }

    const socket = connectDashboard();

    // ✅ Escuchar actualizaciones en tiempo real de salas activas
    const handleDashboardUpdate = (data) => {
      console.log("📢 dashboard-update recibido:", data);
      if (data && Array.isArray(data.rooms)) {
        setRooms(data.rooms);
      } else {
        setRooms([]);
      }
    };

    socket.on("dashboard-update", handleDashboardUpdate);

    // ✅ Solicitar snapshot inicial cuando cargue el dashboard
    socket.emit("dashboard-join");

    // 📊 Cargar estadísticas globales (se actualizan solo al cargar/recargar la página)
    const fetchStats = async () => {
      try {
        console.log("📊 Solicitando estadísticas...");
        const data = await getGlobalStats();
        console.log("📈 Estadísticas recibidas:", data);
        setStats(data);
      } catch (err) {
        console.error("Error cargando estadísticas:", err);
      }
    };
    fetchStats();

    return () => {
      socket.off("dashboard-update", handleDashboardUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
            🎮 Dashboard de Partidas
          </h1>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 hover:from-red-600 hover:via-pink-600 hover:to-red-700 text-white rounded-xl px-6 py-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 font-semibold"
          >
            🔒 Cerrar Sesión
          </button>
        </div>

        {/* 📊 Estadísticas globales (solo se actualizan al refrescar la página) */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl mb-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              📈 Estadísticas Globales
            </h2>
            {stats.lastUpdated && (
              <p className="text-sm text-gray-300">
                Última actualización: {new Date(stats.lastUpdated).toLocaleString()}
              </p>
            )}
          </div>

          {/* Métricas principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-300/30 text-center">
              <p className="text-sm text-purple-300 mb-1">Partidas</p>
              <p className="text-2xl font-bold text-white">{stats.totalGames}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-300/30 text-center">
              <p className="text-sm text-blue-300 mb-1">Jugadores</p>
              <p className="text-2xl font-bold text-white">{stats.totalPlayers}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-xl p-4 border border-green-300/30 text-center">
              <p className="text-sm text-green-300 mb-1">Preguntas</p>
              <p className="text-2xl font-bold text-white">{stats.totalQuestions}</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-300/30 text-center">
              <p className="text-sm text-yellow-300 mb-1">Precisión</p>
              <p className="text-2xl font-bold text-white">{stats.accuracy}%</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-300/30">
              <h3 className="text-xl font-bold mb-3 text-yellow-300 flex items-center gap-2">🏆 Top Ganadores</h3>
              <ul className="space-y-2">
                {stats.topWinners?.length > 0 ? (
                  stats.topWinners.map((w, idx) => (
                    <li key={idx} className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/20">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-yellow-200">{w.playerName}</span>
                        <div className="text-right">
                          <span className="font-semibold text-orange-300">{w.wins} victorias</span>
                          <br />
                          <span className="text-xs text-gray-300">Rate: {(w.winRate * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-300 italic">No hay ganadores registrados aún.</li>
                )}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-xl p-4 border border-green-300/30">
              <h3 className="text-xl font-bold mb-3 text-green-300 flex items-center gap-2">
                📚 Categorías más acertadas
              </h3>
              <ul className="space-y-2">
                {stats.topCategories?.length > 0 ? (
                  stats.topCategories.map((c, idx) => (
                    <li key={idx} className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-white/20">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-green-200">{c.category}</span>
                        <div className="text-right">
                          <span className="font-semibold text-teal-300">{c.timesAsked} preguntas</span>
                          <br />
                          <span className="text-xs text-gray-300">Precisión: {(c.accuracy * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-300 italic">No hay datos de categorías aún.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* 🏟️ Salas activas (en tiempo real) */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            🏟️ Salas Activas
          </h2>
        </div>

        {rooms.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 inline-block">
              <p className="text-xl text-gray-300 mb-2">🎯 No hay partidas activas en este momento</p>
              <p className="text-gray-400">¡Las partidas aparecerán aquí cuando los jugadores se conecten!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room.roomId} className="transform hover:scale-105 transition-all duration-300">
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
