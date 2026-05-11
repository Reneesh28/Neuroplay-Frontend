import { ChunkUploader } from "../components/upload/ChunkUploader";

const UploadPage = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center pt-8 max-w-2xl mx-auto space-y-6">
            <div className="text-center py-4">
                <h2 style={{ color: "var(--text-heading)" }}>Upload Gameplay Video</h2>
                <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
                    Upload a video file to begin AI-powered analysis
                </p>
            </div>
            <div className="w-full">
                <ChunkUploader />
            </div>
        </div>
    );
};

export default UploadPage;