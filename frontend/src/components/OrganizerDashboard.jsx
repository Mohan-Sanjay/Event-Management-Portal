import React, { useState } from 'react';
import axios from 'axios';

export default function EventRequestForm() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [seminarHall, setSeminarHall] = useState('homije_baba');

  const handleEventRequest = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/event/request', { name, date, seminarHall }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error requesting event', error);
    }
  };

  return (
    <div>
      <h2>Request Event</h2>
      <form onSubmit={handleEventRequest}>
        <input type="text" placeholder="Event Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        <select value={seminarHall} onChange={(e) => setSeminarHall(e.target.value)}>
          <option value="homije_baba">Homije Baba Seminar Hall</option>
          <option value="mahatma_ganthi">Mahatma Gandhi Seminar Hall</option>
          <option value="sir_c_v_raman">Sir C.V Raman Seminar Hall</option>
        </select>
        <button type="submit">Request Event</button>
      </form>
    </div>
  );
}
