import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { AppRoutes } from "./routes";
import { ErrorBoundary } from "./components/shared/ErrorBoundary";
import { ToastProvider } from "./components/shared/ToastContainer";
import { OfflineNotice } from "./components/shared/OfflineNotice";
import { SystemBackground } from "./components/shared/SystemBackground";
import { ScrollToTop } from "./components/shared/ScrollToTop";

function App() {
    return (
        <ErrorBoundary>
            <ToastProvider>
                <BrowserRouter>
                    {/* Global Shared Components */}
                    <ScrollToTop />
                    <SystemBackground />
                    <OfflineNotice />
                    
                    {/* Main Application Layout */}
                    <MainLayout>
                        <AppRoutes />
                    </MainLayout>
                </BrowserRouter>
            </ToastProvider>
        </ErrorBoundary>
    );
}

export default App;