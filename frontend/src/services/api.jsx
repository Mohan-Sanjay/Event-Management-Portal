// src/services/api.js
const API_URL = 'http://localhost:5000/api';

export const loginUser = async (data) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export const fetchAdminEvents = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/events/admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
};

export const fetchOrganizerEvents = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/events/organizer`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
};

export const updateEventStatus = async (eventId, status) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/events/update-status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ eventId, status }),
  });
  const result = await response.json();
  return result;
};
