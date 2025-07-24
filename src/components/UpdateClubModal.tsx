import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClubApi, type Club } from "../api/club";
import { ToastMessage } from "../utils/toast";
import Input from "./Input";
import ProcessingButton from "./ProcessingButton";

interface UpdateClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  club: Club | null;
}

const UpdateClubModal: React.FC<UpdateClubModalProps> = ({
  isOpen,
  onClose,
  club,
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (club) {
      setName(club.name || "");
    }
  }, [club]);

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      ClubApi.updateClub(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
      ToastMessage.success("Club updated successfully.");
      onClose();
    },
    onError: () => {
      ToastMessage.error("Failed to update club.");
    },
    onSettled: () => {
      setProcessing(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter club name.");
      return;
    }

    if (!club?.id) {
      setError("Club ID is missing.");
      return;
    }

    setProcessing(true);
    updateMutation.mutate({
      id: club.id,
      name: name.trim(),
    });
  };

  const handleClose = () => {
    setError("");
    setName("");
    onClose();
  };

  if (!isOpen || !club) return null;

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
            <h2 className="text-2xl font-bold text-purple-700">Update Club</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Club Name"
              placeholder="Enter club name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {error && (
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <div>
                <ProcessingButton type="submit" processing={processing}>
                  Update Club
                </ProcessingButton>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdateClubModal;
