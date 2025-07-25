import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { ToastMessage } from "../utils/toast";
import Input from "./Input";
import Textarea from "./Textarea";
import ProcessingButton from "./ProcessingButton";
import { type ClubMember, MemberApi } from "../api/clubmem";

interface UpdateClubMemModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: ClubMember | null;
}

const UpdateClubMemModal: React.FC<UpdateClubMemModalProps> = ({
  isOpen,
  onClose,
  member,
}) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    memberDOB: "",
    spouseName: "",
    spouseDOB: "",
    memberAnniversary: "",
    classification: "",
    description: "",
    imageUrls: "",
  });

  // Single new image file and preview URL
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Existing images (string URLs)
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        email: member.email,
        mobile: member.mobile ?? "",
        memberDOB: member.memberdob,
        spouseName: member.spousename,
        spouseDOB: member.spousedob,
        memberAnniversary: member.memberaniversary,
        classification: member.classification,
        description: member.description || "",
        imageUrls: member.imgurl || "",
      });

      // Existing images array from single URL
      setExistingImages(member.imgurl ? [member.imgurl] : []);

      // Reset new image states when member changes
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setNewImage(null);
      setImagePreview("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (imagePreview) URL.revokeObjectURL(imagePreview);

    // When new image added, remove existing images immediately
    setExistingImages([]);

    setNewImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeNewImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setNewImage(null);
    setImagePreview("");
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setProcessing(true);

    try {
      const payload: ClubMember = {
        ...member!,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        memberdob: formData.memberDOB,
        spousename: formData.spouseName,
        spousedob: formData.spouseDOB,
        memberaniversary: formData.memberAnniversary,
        classification: formData.classification,
        description: formData.description,
        imgurl: existingImages[0] || "", // keep single image string for existing images
      };

      await MemberApi.updateMember(
        Number(member?.id),
        payload,
        newImage ? [newImage] : []
      );

      ToastMessage.success("Member updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["Member-admin"] });
      handleClose();
    } catch (err) {
      ToastMessage.error("Failed to update member.");
    } finally {
      setProcessing(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      memberDOB: "",
      spouseName: "",
      spouseDOB: "",
      memberAnniversary: "",
      classification: "",
      description: "",
      imageUrls: "",
    });
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setNewImage(null);
    setImagePreview("");
    setExistingImages([]);
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded shadow-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-700">
                Update Club Member
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Input
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="mobile"
                    label="Mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="memberDOB"
                    label="Member DOB"
                    type="date"
                    value={formData.memberDOB}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="spouseDOB"
                    label="Spouse DOB"
                    type="date"
                    value={formData.spouseDOB}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-4">
                  <Input
                    name="spouseName"
                    label="Spouse Name"
                    value={formData.spouseName}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="memberAnniversary"
                    label="Anniversary"
                    type="date"
                    value={formData.memberAnniversary}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="classification"
                    label="Classification"
                    value={formData.classification}
                    onChange={handleInputChange}
                  />
                  <Textarea
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Preview new single image */}
              {imagePreview && (
                <div className="relative inline-block mt-4">
                  <img
                    src={imagePreview}
                    className="h-24 object-cover rounded"
                    alt="New upload preview"
                  />
                  <button
                    type="button"
                    onClick={removeNewImage}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}

              {/* Existing images */}
              {existingImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {existingImages.map((url, i) => (
                    <div key={i} className="relative">
                      <img
                        src={url}
                        className="h-24 object-cover rounded"
                        alt={`Existing image ${i + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(i)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add New Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Plus className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {error && <div className="text-sm text-red-500">{error}</div>}

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-2 border border-gray-300 rounded"
                >
                  Cancel
                </button>
                <div className="flex-1">
                  <ProcessingButton type="submit" processing={processing}>
                    Update Member
                  </ProcessingButton>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdateClubMemModal;
