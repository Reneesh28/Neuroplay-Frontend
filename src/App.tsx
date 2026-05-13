import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "./routes";
import { ErrorBoundary } from "./components/shared/ErrorBoundary";
import { ToastProvider } from "./components/shared/ToastContainer";
import { OfflineNotice } from "./components/shared/OfflineNotice";
import { SystemBackground } from "./components/shared/SystemBackground";
import { ScrollToTop } from "./components/shared/ScrollToTop";

/**
 * 🧠 NeuroPlay Engine: Core Root
 * 
 * Orchestrates global providers and shared system utilities.
 * Implements high-precision institutional design patterns.
 */
function App() {
    return (
        <ErrorBoundary>
            <HelmetProvider>
                <ToastProvider>
                    <BrowserRouter>
                        {/* ── Global Shared Context ── */}
                        <ScrollToTop />
                        <SystemBackground />
                        <OfflineNotice />

                        {/* ── Core Routing Engine ── */}
                        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-black text-accent animate-pulse font-black uppercase tracking-widest text-xs">Initializing Neural Interface...</div>}>
                            <AppRoutes />
                        </Suspense>
                    </BrowserRouter>
                </ToastProvider>
            </HelmetProvider>
        </ErrorBoundary>
    );
}

export default App;