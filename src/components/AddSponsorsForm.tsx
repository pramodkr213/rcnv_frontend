import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { ToastMessage } from "../utils/toast";
import ProcessingButton from "./ProcessingButton";
import { SponsorsApi } from "../api/sponsors";

const AddSponsorsForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const invalid = selectedFiles.find((f) => !f.type.startsWith("image/"));
      if (invalid) {
        setError("All selected files must be images.");
        setFiles([]);
        return;
      }
      setFiles(selectedFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!files.length) {
      setError("Please select at least one image file.");
      return;
    }
    setProcessing(true);
    try {
      await SponsorsApi.addSponsor(files);
      queryClient.invalidateQueries({ queryKey: ["sponsors-images"] });
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      ToastMessage.success("Images uploaded successfully.");
      setProcessing(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      ToastMessage.error("Failed to upload images.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Image Files
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border border-gray-200 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition"
        />
        {error && <div className="mt-2 text-xs text-red-500">{error}</div>}
      </div>

      <ProcessingButton type="submit" processing={processing}>
        Upload Images
      </ProcessingButton>
    </form>
  );
};

export default AddSponsorsForm;
