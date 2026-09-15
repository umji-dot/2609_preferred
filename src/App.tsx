import { Routes, Route, Navigate } from 'react-router-dom';
import CarCodeListPage from './pages/CarCodeListPage';
import VehicleListPage from './pages/VehicleListPage';
import PushHistoryPage from './pages/PushHistoryPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/car-codes" replace />} />
      <Route path="/car-codes" element={<CarCodeListPage />} />
      <Route path="/vehicles" element={<VehicleListPage />} />
      <Route path="/push-history" element={<PushHistoryPage />} />
      <Route path="*" element={<Navigate to="/car-codes" replace />} />
    </Routes>
  );
}
