import { useEffect, useState } from "react";
import api from "../api";

export default function OrganizerDashboard() {
  const [title, setTitle] = useState("");
  const [hall, setHall] = useState("homije_baba"); // default hall
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [requests, setRequests] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };



  const fetchRequests = async () => {
    const res = await api.get("/organizer/my-requests");
    setRequests(res.data);
  };
 
  const submitRequest = async () => {
    try {
      await api.post("/organizer/request", { title, hall, date, time });
      alert("Request sent");
      fetchRequests();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Organizer Dashboard</h2>
      <h3>Request New Event</h3>
      <input placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <select value={hall} onChange={(e) => setHall(e.target.value)}>
        <option value="homije_baba">Homije Baba Hall</option>
        <option value="mahatma_gandhi">Mahatma Gandhi Hall</option>
        <option value="sir_cv_raman">Sir C.V. Raman Hall</option>
      </select>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button onClick={submitRequest}>Submit</button>

      <h3>My Requests</h3>
      <ul>
        {requests.map((r) => (
          <li key={r._id}>
            {r.title} ({r.hall}) on {r.date} at {r.time} — <b>{r.status}</b>
          </li>
        ))}
      </ul>
      <button onClick={logout}>Logout</button>

    </div>
  );
}
