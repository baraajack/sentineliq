import { fetchAssets, fetchEvents } from "../../lib/api";

export default async function DashboardPage() {
  const assets = await fetchAssets();
  const events = await fetchEvents();

  const recentEvents = events.slice(0, 10);

  const cards = [
    {
      label: "Total Assets",
      value: assets.length,
    },
    {
      label: "Total Events",
      value: events.length,
    },
    {
      label: "Open Alerts",
      value: 0,
    },
    {
      label: "Open Incidents",
      value: 0,
    },
  ];

  return (
    <div>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.label}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
            }}
          >
            <div>{card.label}</div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: 700,
                marginTop: "8px",
              }}
            >
              {card.value}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "24px",
        }}
      >
        <section
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2>Recent Security Events</h2>

          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th align="left">Type</th>
                <th align="left">Severity</th>
                <th align="left">Source IP</th>
                <th align="left">Username</th>
              </tr>
            </thead>

            <tbody>
              {recentEvents.map((event: any) => (
                <tr key={event.id}>
                  <td>{event.event_type}</td>
                  <td>{event.severity}</td>
                  <td>{event.source_ip ?? "-"}</td>
                  <td>{event.username ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2>Recent Alerts</h2>

          <p>No alerts available yet.</p>
        </section>

        <section
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2>Recent Incidents</h2>

          <p>No incidents available yet.</p>
        </section>
      </div>
    </div>
  );
}