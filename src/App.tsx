import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ModalRoot, Toaster } from 'installer-design-system';
import LoginPage from './pages/Login';
import JobListPage from './pages/JobList';
import JobDetailPage from './pages/JobDetail';
import WorkTasksPage from './pages/WorkTasks';
import SelectDevicePage from './pages/SelectDevice';
import SettingsPage from './pages/Settings';
import ReferenceImagesPage from './pages/ReferenceImages';
import EvidencePhotosPage from './pages/EvidencePhotos';
import RemovalPhotosPage from './pages/RemovalPhotos';
import AsItemPhotoPage from './pages/AsItemPhoto';
import VerifyPage from './pages/Verify';
import VerifyResultPage from './pages/VerifyResult';
import HistoryPage from './pages/History';
import HistoryDetailPage from './pages/HistoryDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/jobs" element={<JobListPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/jobs/:id/tasks" element={<WorkTasksPage />} />
        <Route path="/jobs/:id/select-device" element={<SelectDevicePage />} />
        <Route path="/jobs/:id/settings" element={<SettingsPage />} />
        <Route path="/jobs/:id/reference-images" element={<ReferenceImagesPage />} />
        <Route path="/jobs/:id/evidence-photos" element={<EvidencePhotosPage />} />
        <Route path="/jobs/:id/removal" element={<RemovalPhotosPage />} />
        <Route path="/jobs/:id/as/:idx" element={<AsItemPhotoPage />} />
        <Route path="/jobs/:id/verify" element={<VerifyPage />} />
        <Route path="/jobs/:id/verify-result" element={<VerifyResultPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/history/:id" element={<HistoryDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ModalRoot />
      <Toaster />
    </BrowserRouter>
  );
}
