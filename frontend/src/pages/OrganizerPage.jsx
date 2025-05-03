import { useState, useEffect } from 'react';
import axios from 'axios';

const OrganizerPage = () => {
  const [seminarHall, setSeminarHall] = useState('homije baba');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');
  const [myRequests, setMyRequests] = useState([]);

  const fetchRequests = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/events/myrequests', {
      headers: { 'x-auth-token': token }
    });
    setMyRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const submitRequest = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/events/request', {
        seminarHall, eventDate
      }, {
        headers: { 'x-auth-token': token }
      });
      setMessage('Event requested successfully');
      fetchRequests();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Request failed');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Request Event</h2>
      <select value={seminarHall} onChange={(e) => setSeminarHall(e.target.value)} className="p-2 border mb-3 mr-2">
        <option value="homije baba">Homije Baba</option>
        <option value="mahatma ganthi">Mahatma Ganthi</option>
        <option value="sir c.v raman">Sir C.V Raman</option>
      </select>
      <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="p-2 border mr-2" />
      <button onClick={submitRequest} className="bg-green-500 text-white px-4 py-2">Submit</button>
      {message && <p className="mt-3 text-blue-600">{message}</p>}

      <h3 className="mt-6 font-bold">My Event Requests</h3>
      <ul className="mt-2">
        {myRequests.map((r) => (
          <li key={r._id} className="border p-2 mb-2">
            {r.seminarHall} on {new Date(r.eventDate).toDateString()} — <strong>{r.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizerPage;
