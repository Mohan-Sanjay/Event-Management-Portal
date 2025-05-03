// File: src/App.jsx
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import OrganizerDashboard from './pages/OrganizerDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/organizer" element={<OrganizerDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}

export default App;