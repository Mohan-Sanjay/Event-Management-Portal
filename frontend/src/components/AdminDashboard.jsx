import { useEffect, useState } from "react";
import api from "../api";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };


  const fetchRequests = async () => {
    const res = await api.get("/admin/requests");
    setRequests(res.data);
  };

  const handleDecision = async (id, decision) => {
    try {
      await api.post("/admin/decision", { eventId: id, decision });
      alert(`Event ${decision}`);
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
      <h2>Admin Dashboard</h2>
      <h3>Pending Requests</h3>
      <ul>
        {requests.map((r) => (
          <li key={r._id}>
            <b>{r.title}</b> on {r.date} at {r.time} by {r.organizer?.username || "unknown"}
            <button onClick={() => handleDecision(r._id, "approved")}>Approve</button>
            <button onClick={() => handleDecision(r._id, "rejected")}>Reject</button>
          </li>
        ))}
      </ul>
      <button onClick={logout}>Logout</button>

    </div>
  );
}
