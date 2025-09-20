export default function PlayerList({ players }) {
  if (!players || players.length === 0) {
    return <p>No hay jugadores en esta sala.</p>;
  }

  return (
    <ul style={{ listStyle: "none", paddingLeft: 0, fontSize: "14px" }}>
      {players.map((p) => (
        <li
          key={p.id}
          style={{
            marginBottom: "4px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>
            {p.name} {p.connected ? "🟢" : "🔴"}
          </span>
          <span>
            {p.eliminated ? "❌ Eliminado" : "✅ Activo"} | 🏆 {p.score ?? 0}
          </span>
        </li>
      ))}
    </ul>
  );
}
