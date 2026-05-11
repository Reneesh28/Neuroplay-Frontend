import { Routes, Route, Link } from 'react-router-dom';
import UploadPage from '../pages/UploadPage';
import JobPage from '../pages/JobPage';
import DashboardPage from '../pages/DashboardPage';
import SimulatorPage from '../pages/SimulatorPage';
import SystemPage from '../pages/SystemPage';

const NotFound = () => (
    <div className="flex flex-col items-center justify-center py-24 gap-6">
        <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
            style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
            }}
        >
            404
        </div>
        <div className="text-center">
            <h2 style={{ color: "var(--text-heading)" }}>Page not found</h2>
            <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
                The route you're looking for doesn't exist.
            </p>
        </div>
        <Link
            to="/"
            className="btn btn-primary no-underline"
            style={{ padding: "10px 24px", fontSize: "14px" }}
        >
            ← Back to Upload
        </Link>
    </div>
);

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<UploadPage />} />
            <Route path="/job/:id" element={<JobPage />} />
            <Route path="/dashboard/:id" element={<DashboardPage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/system" element={<SystemPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
