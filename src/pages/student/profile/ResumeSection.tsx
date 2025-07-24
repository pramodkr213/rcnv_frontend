import React, { useRef } from "react";
import { Download, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { uploadResumeApi } from "../../../api/student/student";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import type { UpdateStudentProfile } from "../../../api/student/request/UpdateProfileRequest";
import { ToastMessage } from "../../../utils/toast";

const ResumeSection: React.FC<{
  resumeUrl?: string;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<UpdateStudentProfile, Error>>;
}> = ({ resumeUrl, refetch }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a valid PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    await ToastMessage.promise(uploadResumeApi(formData), {
      loading: "Uploading resume...",
      success: "Resume uploaded successfully!",
      error: "failed to upload",
    });
    refetch();
  };

  const handleDownload = async () => {
    if (!resumeUrl) return;
    window.open(resumeUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="rounded-xl p-6 mt-6">
      <div className="flex gap-3 items-center mb-6 border-b border-b-gray-400">
        <h3 className="text-2xl font-semibold text-gray-800">Resume</h3>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {resumeUrl && (
          <button
            onClick={handleDownload}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer flex items-center gap-2"
          >
            <Download size={18} />
            Download Resume
          </button>
        )}
        <button
          onClick={handleUploadClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer flex items-center gap-2"
        >
          <Upload size={18} />
          Upload New Resume
        </button>
      </div>

      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ResumeSection;
