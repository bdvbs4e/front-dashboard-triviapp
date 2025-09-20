// src/components/RoomCard.jsx
import PlayerList from "./PlayerList";

export default function RoomCard({ room }) {
  if (!room) return null;

  return (
    <div className="relative w-80 p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 backdrop-blur-lg border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group overflow-hidden">
      {/* Elementos flotantes decorativos */}
      <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-30 animate-bounce"></div>

      {/* Header con ID y Status */}
      <div className="relative z-10 mb-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-2">
          🎮 {room.roomId}
        </h3>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg ${
            room.status === "started"
              ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-green-500/50"
              : room.status === "finished"
                ? "bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-red-500/50"
                : "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-orange-500/50"
          } animate-pulse`}
        >
          {room.status === "started" ? "🟢" : room.status === "finished" ? "🔴" : "🟡"} {room.status}
        </span>
      </div>

      {/* Lista de jugadores */}
      <div className="relative z-10 mb-4">
        <PlayerList players={room.players || []} />
      </div>

      {/* Pregunta actual */}
      <div className="relative z-10 mb-4 p-4 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-300/30 backdrop-blur-sm">
        <p className="text-sm font-medium text-cyan-100 mb-1 flex items-center">
          <span className="text-lg mr-2">📖</span>
          Pregunta Actual:
        </p>
        <p className="text-white font-semibold">
          {room.currentQuestion?.text ? room.currentQuestion.text : "Esperando pregunta..."}
        </p>
      </div>

      {/* Resultados parciales */}
      {room.players && room.players.length > 0 && (
        <div className="relative z-10">
          <div className="flex items-center mb-3">
            <span className="text-lg mr-2">📊</span>
            <h4 className="text-lg font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Resultados Parciales
            </h4>
          </div>
          <div className="space-y-2">
            {room.players.map((p, index) => (
              <div
                key={p.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                  index === 0
                    ? "bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border border-yellow-400/50"
                    : index === 1
                      ? "bg-gradient-to-r from-gray-400/30 to-gray-500/30 border border-gray-400/50"
                      : index === 2
                        ? "bg-gradient-to-r from-amber-600/30 to-yellow-600/30 border border-amber-500/50"
                        : "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "👤"}</span>
                  <span className="font-semibold text-white">{p.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-cyan-300">{p.score ?? 0} pts</span>
                  <span className="text-sm">{p.eliminated ? "❌" : "✅"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
    </div>
  )
}
