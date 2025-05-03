import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import OrganizerDashboard from "./components/OrganizerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route
  path="/organizer"
  element={
    <ProtectedRoute role="organizer">
      <OrganizerDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route path="/register" element={<Register />} />

        <Route path="/" element={<Login />} />
        <Route path="/organizer" element={<OrganizerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
