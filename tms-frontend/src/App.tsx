import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import VehicleList from './components/VehicleList';
import TripList from './components/TripList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<div>Welcome to the Dashboard</div>} />
            <Route path="/vehicles" element={<VehicleList />} />
            <Route path="/trips" element={<TripList />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
