import { useQueryClient } from "@tanstack/react-query";
import ProcessingButton from "./ProcessingButton";

import { useRef, useState } from "react";
import { MediaImageApi } from "../api/mediacov";
import { ToastMessage } from "../utils/toast";

const MediaImageForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (!selected.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        setFile(null);
        return;
      }
      setFile(selected);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!file) {
      setError("Please select an image file.");
      return;
    }

    setProcessing(true);
    try {
      await MediaImageApi.addMediaImage(file);
      ToastMessage.success("Image uploaded successfully.");
      queryClient.invalidateQueries({ queryKey: ["media-images"] });
      setFile(null);
      setTitle("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      ToastMessage.error("Failed to upload image.");
    } finally {
      setProcessing(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Image File
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border border-gray-200 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition"
        />
        {error && <div className="mt-2 text-xs text-red-500">{error}</div>}
      </div>

    
      <ProcessingButton type="submit" processing={processing}>
        Upload Image
      </ProcessingButton>
    </form>
  );
};

export default MediaImageForm;
