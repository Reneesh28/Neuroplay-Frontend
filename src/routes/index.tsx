import { Routes, Route, Link, Navigate } from 'react-router-dom';
import UploadPage from '../pages/UploadPage';
import JobPage from '../pages/JobPage';
import DashboardPage from '../pages/DashboardPage';
import SimulatorPage from '../pages/SimulatorPage';
import SystemPage from '../pages/SystemPage';
import AdminDLQPage from '../pages/AdminDLQPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import InsightsPage from '../pages/InsightsPage';
import MainLayout from '../layouts/MainLayout';
import { useSessionStore } from '../features/auth/stores/sessionStore';

/**
 * 🛡️ Protected Route Wrapper
 * Enforces session token presence and wraps content in the Main application layout.
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { token } = useSessionStore();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <MainLayout>
            {children}
        </MainLayout>
    );
};

/**
 * 🛡️ Admin Route Wrapper
 * Enforces admin role for system level access.
 */
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const { role } = useSessionStore();

    if (role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

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
            ← Back to Terminal
        </Link>
    </div>
);

export const AppRoutes = () => {
    return (
        <Routes>
            {/* 🔐 Public Routes (No MainLayout) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* 🛡️ Protected Core Routes (Wrapped in MainLayout via ProtectedRoute) */}
            <Route path="/" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
            <Route path="/job/:id" element={<ProtectedRoute><JobPage /></ProtectedRoute>} />
            <Route path="/dashboard/:id" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/insights" element={<ProtectedRoute><InsightsPage /></ProtectedRoute>} />
            <Route path="/simulator" element={<ProtectedRoute><SimulatorPage /></ProtectedRoute>} />
            <Route path="/system" element={<ProtectedRoute><AdminRoute><SystemPage /></AdminRoute></ProtectedRoute>} />
            <Route path="/admin/dlq" element={<ProtectedRoute><AdminRoute><AdminDLQPage /></AdminRoute></ProtectedRoute>} />

            {/* 404 handler wrapped in MainLayout for consistency if logged in, or simple if not? 
                Let's keep it simple for now or wrap it if token exists. 
            */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
