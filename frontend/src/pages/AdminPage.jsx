import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const [pending, setPending] = useState([]);
  const [seminarHall, setSeminarHall] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token');
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const seminarHallMap = {
        'admin_eie@college.com': 'homije baba',
        'admin_eee@college.com': 'mahatma ganthi',
        'admin_sandh@college.com': 'sir c.v raman',
      };
      const email = decoded.email;
      setSeminarHall(seminarHallMap[email]);
    } catch (error) {
      console.error('Token error:', error.message);
    }
  }, []);

  const fetchPending = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/events/pending/${seminarHall}`, {
        headers: { 'x-auth-token': token }
      });
      setPending(res.data);
    } catch (err) {
      console.error('Error fetching data:', err.message);
    }
  };

  const handleApprove = async (id) => {
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:5000/api/events/approve/${id}`, {}, {
      headers: { 'x-auth-token': token }
    });
    fetchPending();
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:5000/api/events/reject/${id}`, {}, {
      headers: { 'x-auth-token': token }
    });
    fetchPending();
  };

  useEffect(() => {
    if (seminarHall) fetchPending();
  }, [seminarHall]);

  if (!seminarHall) return <div>Loading or invalid user token</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending Events for {seminarHall}</h2>
      <ul>
        {pending.map((r) => (
          <li key={r._id} className="border p-2 mb-2">
            {r.seminarHall} on {new Date(r.eventDate).toDateString()} —
            <button
              className="ml-2 px-2 bg-green-500 text-white"
              onClick={() => handleApprove(r._id)}
            >
              Approve
            </button>
            <button
              className="ml-2 px-2 bg-red-500 text-white"
              onClick={() => handleReject(r._id)}
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

