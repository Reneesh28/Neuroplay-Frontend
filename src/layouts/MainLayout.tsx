import React from 'react';
import { TopNavbar } from "../components/common/TopNavbar";
import { Footer } from "../components/common/Footer";
import { PageContainer } from "../components/common/PageContainer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col relative pb-6">
            <TopNavbar />

            <div className="flex-1 w-full max-w-[1400px] mx-auto relative border-x border-white/10 bg-[#06080c] flex flex-col">
                <PageContainer>
                    {children}
                </PageContainer>
            </div>

            {/* Tactical Diagnostics Strip */}
            <div className="fixed bottom-0 left-0 right-0 h-8 bg-black border-t border-white/10 z-50 flex items-center justify-between px-6 text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-none bg-cyan-500"></span> Telemetry Link Active</span>
                    <span className="opacity-50">|</span>
                    <span className="opacity-70">Latency: 12ms</span>
                </div>
                <div className="flex items-center gap-4 opacity-50 hidden sm:flex">
                    <span>Active Operator Nodes: 4</span>
                    <span>|</span>
                    <span>NeuroPlay Terminal v1.0.2</span>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MainLayout;