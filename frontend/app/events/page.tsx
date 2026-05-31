import { fetchEvents } from "../../lib/api";

export default async function EventsPage() {
  const events = await fetchEvents();

  return (
    <div>
      <h1>Events</h1>

      <table style={{ width: "100%", marginTop: "24px", background: "white" }}>
        <thead>
          <tr>
            <th align="left">Type</th>
            <th align="left">Category</th>
            <th align="left">Severity</th>
            <th align="left">Username</th>
            <th align="left">Source IP</th>
            <th align="left">Occurred At</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event: any) => (
            <tr key={event.id}>
              <td>{event.event_type}</td>
              <td>{event.event_category}</td>
              <td>{event.severity}</td>
              <td>{event.username ?? "-"}</td>
              <td>{event.source_ip ?? "-"}</td>
              <td>{event.occurred_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}