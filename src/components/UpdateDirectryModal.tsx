import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { DirectryApi, type Directry } from "../api/directries";
import { useQueryClient } from "@tanstack/react-query";
import { ToastMessage } from "../utils/toast";
import Input from "./Input";
import ProcessingButton from "./ProcessingButton";

interface UpdateDirectryModalProps {
  isOpen: boolean;
  onClose: () => void;
  directry: Directry | null;
}

const UpdateDirectryModal: React.FC<UpdateDirectryModalProps> = ({
  isOpen,
  onClose,
  directry,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (directry) {
      setName(directry.name);
      setEmail(directry.email);
      setDesignation(directry.designation);
    }
  }, [directry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter directory name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter directory email.");
      return;
    }

    if (!designation.trim()) {
      setError("Please enter directory designation.");
      return;
    }

    if (!directry?.id) {
      setError("Directory ID is missing.");
      return;
    }

    setProcessing(true);
    try {
      const directryData: Directry = {
        name: name.trim(),
        email: email.trim(),
        designation: designation.trim(),
      };

      await DirectryApi.updateDirectry(directry.id, directryData);
      ToastMessage.success("Directory updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["directries"] });
      onClose();
    } catch {
      ToastMessage.error("Failed to update directory.");
    } finally {
      setProcessing(false);
    }
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  if (!isOpen || !directry) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-purple-700">
              Update Directory
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
              label="Directory Name"
              placeholder="Enter directory name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter directory email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Designation"
              placeholder="Enter directory designation"
              name="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />

            {error && <div className="text-xs text-red-500">{error}</div>}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <ProcessingButton type="submit" processing={processing}>
                Update Directory
              </ProcessingButton>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdateDirectryModal;
