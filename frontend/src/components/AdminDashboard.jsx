// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  const handleDecision = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/events/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchRequests(); // Refresh
    } catch (err) {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Pending Event Requests</h3>
      <ul>
        {requests.map((r) => (
          <li key={r._id}>
            {r.title} | {r.date} | {r.organizer.name} | Hall: {r.hall} | Status: {r.status}
            {r.status === "pending" && (
              <>
                <button onClick={() => handleDecision(r._id, "approved")}>Approve</button>
                <button onClick={() => handleDecision(r._id, "rejected")}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
