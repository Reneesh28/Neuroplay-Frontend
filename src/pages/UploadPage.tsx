import { Helmet } from "react-helmet-async";
import { ChunkUploader } from "../components/upload/ChunkUploader";

const UploadPage = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center pt-8 max-w-2xl mx-auto space-y-6">
            <Helmet>
                <title>Neural Ingestion | NeuroPlay Engine</title>
                <meta name="description" content="Initialize high-fidelity gameplay ingestion for tactical AI analysis." />
            </Helmet>

            <div className="text-center py-4">
                <h2 style={{ color: "var(--text-heading)" }} className="text-2xl font-black uppercase tracking-tighter italic">
                    <span className="text-accent">🎬</span> Neural Ingestion
                </h2>
                <p className="text-xs mt-2 font-mono uppercase tracking-[0.2em] opacity-40">
                    Submit telemetry source for intelligence extraction
                </p>
            </div>
            <div className="w-full">
                <ChunkUploader />
            </div>
        </div>
    );
};

export default UploadPage;