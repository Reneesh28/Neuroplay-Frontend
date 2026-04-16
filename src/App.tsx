import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import UploadPage from "./pages/UploadPage";
import JobPage from "./pages/JobPage";
import DashboardPage from "./pages/DashboardPage";
import SimulatorPage from "./pages/SimulatorPage";

/* ── 404 ── */
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

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    {/* Upload Entry */}
                    <Route path="/" element={<UploadPage />} />

                    {/* Job Tracking + Pipeline */}
                    <Route path="/job/:id" element={<JobPage />} />

                    {/* Dashboard (Insights View) */}
                    <Route path="/dashboard/:id" element={<DashboardPage />} />

                    {/* Simulator */}
                    <Route path="/simulator" element={<SimulatorPage />} />

                    {/* 404 Fallback */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;