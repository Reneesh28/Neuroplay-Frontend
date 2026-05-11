import React from 'react';
import { TopNavbar } from "../components/common/TopNavbar";
import { Footer } from "../components/common/Footer";
import { PageContainer } from "../components/common/PageContainer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <TopNavbar />

            <PageContainer>
                {children}
            </PageContainer>

            <Footer />
        </div>
    );
};

export default MainLayout;