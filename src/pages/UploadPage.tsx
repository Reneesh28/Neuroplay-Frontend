import UploadBox from "../features/upload/components/UploadBox";

const UploadPage = () => {
    return (
        <div className="min-h-[70vh] flex items-start justify-center pt-8">
            <div className="w-full">
                <UploadBox />
            </div>
        </div>
    );
};

export default UploadPage;