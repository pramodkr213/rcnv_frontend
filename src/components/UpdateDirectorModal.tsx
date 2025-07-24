import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { DirectorApi, type Director } from "../api/directors";
import { useQueryClient } from "@tanstack/react-query";
import { ToastMessage } from "../utils/toast";
import Input from "./Input";
import ProcessingButton from "./ProcessingButton";

interface UpdateDirectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  director: Director | null;
}

const UpdateDirectorModal: React.FC<UpdateDirectorModalProps> = ({
  isOpen,
  onClose,
  director,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (director) {
      setName(director.name);
      setEmail(director.email);
      setDesignation(director.designation);
      setStartDate(director.startDate || "");
      setEndDate(director.endDate || "");
    }
  }, [director]);

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

    // if (!name.trim()) {
    //   setError("Please enter director name.");
    //   return;
    // }

    // if (!email.trim()) {
    //   setError("Please enter director email.");
    //   return;
    // }

    // if (!designation.trim()) {
    //   setError("Please enter director designation.");
    //   return;
    // }

    if (!director?.id) {
      setError("Director ID is missing.");
      return;
    }

    setProcessing(true);
    try {
      const directorData: Director = {
        name: name.trim(),
        email: email.trim(),
        designation: designation.trim(),
        startDate: startDate.trim(),
        endDate: endDate.trim(),
        imageUrl: director.imageUrl,
      };

      // If no new file is selected, we need to handle this case
      // For now, we'll require a new image for updates
      // if (!file) {
      //   setError("Please select a new image file.");
      //   setProcessing(false);
      //   return;
      // }

      await DirectorApi.updateDirector(director.id, directorData, file);
      ToastMessage.success("Director updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["directors"] });
      onClose();
    } catch {
      ToastMessage.error("Failed to update director.");
    } finally {
      setProcessing(false);
    }
  };

  const handleClose = () => {
    setError("");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose();
  };

  if (!isOpen || !director) return null;

  return (
    <AnimatePresence>
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
          className="bg-white rounded shadow-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-purple-700">
              Update Director
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Director Name"
              placeholder="Enter director name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter director email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Designation"
              placeholder="Enter director designation"
              name="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />

            <Input
              label="Start Date"
              type="date"
              placeholder="Enter start date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <Input
              label="End Date"
              type="date"
              placeholder="Enter end date"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                New Director Image
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 border border-gray-200 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition"
              />
              {error && (
                <div className="mt-2 text-xs text-red-500">{error}</div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <div>
                <ProcessingButton type="submit" processing={processing}>
                  Update Director
                </ProcessingButton>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdateDirectorModal;
