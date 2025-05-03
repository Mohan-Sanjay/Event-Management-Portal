// File: src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem('token');

  const fetchEvents = async () => {
    const res = await axios.get('http://localhost:5000/api/events/admin', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDecision = async (id, status) => {
    await axios.put(
      'http://localhost:5000/api/events/update-status',
      { eventId: id, status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchEvents();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {events.map(e => (
          <li key={e._id}>
            {e.title} - {e.status} - {new Date(e.eventTime).toLocaleString()}
            {e.status === 'pending' && (
              <>
                <button onClick={() => handleDecision(e._id, 'approved')}>Approve</button>
                <button onClick={() => handleDecision(e._id, 'rejected')}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
