import { useEffect, useState } from 'react';
import axios from 'axios';

function OrganizerDashboard() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [hall, setHall] = useState('');
  const [myEvents, setMyEvents] = useState([]);

  const token = localStorage.getItem('token');

  const fetchEvents = async () => {
    const res = await axios.get('http://localhost:5000/api/events/organizer', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMyEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async () => {
    await axios.post(
      'http://localhost:5000/api/events/create',
      { title, description, eventTime, hall },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchEvents();
  };

  return (
    <div>
      <h2>Organizer Dashboard</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="datetime-local" value={eventTime} onChange={e => setEventTime(e.target.value)} />
      <select value={hall} onChange={e => setHall(e.target.value)}>
        <option value="">Select Hall</option>
        <option value="homije baba">Homije Baba</option>
        <option value="mahatma gandhi">Mahatma Gandhi</option>
        <option value="sir cv raman">Sir CV Raman</option>
      </select>
      <button onClick={handleSubmit}>Request Event</button>

      <h3>My Event Requests</h3>
      <ul>
        {myEvents.map(e => (
          <li key={e._id}>{e.title} - {e.status} ({e.hall})</li>
        ))}
      </ul>
    </div>
  );
}

export default OrganizerDashboard;
