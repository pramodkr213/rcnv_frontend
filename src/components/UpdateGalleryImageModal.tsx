import React, { useRef, useState,useEffect } from "react";
import { motion } from "framer-motion";
import ProcessingButton from "./ProcessingButton";
import { GalleryApi } from "../api/gallery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastMessage } from "../utils/toast";

interface UpdateGalleryImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    id: number;
    imageUrl: string;
    title?: string;
    catid?: string;
  } | null;
}

const UpdateGalleryImageModal: React.FC<UpdateGalleryImageModalProps> = ({
  isOpen,
  onClose,
  image,
}) => {
  console.log(image,'image')
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState(image?.title || "");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  
   const [category, setCategory] = useState(image?.catid || "");

  useEffect(() => {
    if (image) {
      setTitle(image.title || "");
      setCategory(image.catid || "");
    }
  }, [image]);


  const categories = [
    { label: "Select Category", value: "" },
    { label: "Medical", value: 1 },
    { label: "TreePlantation", value: 2 },
  ];
  
  const updateMutation = useMutation({
    mutationFn: ({
      image,
      title,
      id,
    }: {
      image: File;
      title: string;
      id: number | undefined;
    }) => GalleryApi.updateGalleryImage(image, title, id, category),
    onSuccess: () => {
      ToastMessage.success("Image updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["gallery-images"] });
      onClose();
      resetForm();
    },
    onError: () => {
      ToastMessage.error("Failed to update image.");
    },
  });

  const resetForm = () => {
    setFile(null);
    setTitle("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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

    if (!file && !title.trim()) {
      setError("Please select an image or update the title.");
      return;
    }

    const imageToUpload = file || new File([], "placeholder");
    const titleToUpdate = title.trim() || image?.title || "";

    updateMutation.mutate({
      image: imageToUpload,
      title: titleToUpdate,
      id: image?.id,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Update Gallery Image
        </h2>

        <div className="mb-6">
          <img
            src={`${image.imageUrl}`}
            alt={image.title || "Gallery Image"}
            className="w-full h-auto max-h-[216px] object-contain rounded-lg border border-gray-300"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              New Image (Optional)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 border border-gray-200 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={ "Enter title"}
              className="block w-full text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 px-4 py-2"
            />
          </div>

          {error && <div className="text-xs text-red-500">{error}</div>}
     <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {categories.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <ProcessingButton
              type="submit"
              processing={updateMutation.isPending}
              className="flex-1"
            >
              Update
            </ProcessingButton>
          </div>

       
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateGalleryImageModal;
