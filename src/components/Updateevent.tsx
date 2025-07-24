import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ProcessingButton from "./ProcessingButton";
import { UpEvnApi } from "../api/upevent"; // changed from HeroImageApi
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastMessage } from "../utils/toast";
import Textarea from "./Textarea"; // assumed custom component

interface UpdateeventProps {
  isOpen: boolean;
  onClose: () => void;
  item: MediaImage | null;
}

const Updateevent: React.FC<UpdateeventProps> = ({ isOpen, onClose, item }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [errordesc, setErrorDesc] = useState("");
  const [errordate, setErrorDate] = useState("");
  const [processing, setProcessing] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (item) {
      setTitle(item.title || "");
      setDescription(item.description || "");
      setDate(item.date || "");
    }
  }, [item]);

  const updateMutation = useMutation({
      mutationFn: ({
     
     
      id,
       title,
      description, 
      date
    }: {
     id: number | undefined;
      title: string;
      
      description: string;
        date: string;
    })  => UpEvnApi.updateEvent(id, title, description, date, ),
    onSuccess: () => {
      ToastMessage.success("Event updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["upc-evt"] });
      handleClose();
    },
    onError: () => {
      ToastMessage.error("Failed to update event.");
      setProcessing(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setErrorDesc("");
    setErrorDate("");

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    if (!description.trim()) {
      setErrorDesc("Description is required.");
      return;
    }

    if (!date) {
      setErrorDate("Date is required.");
      return;
    }

    setProcessing(true);

    updateMutation.mutate({
      id: item?.id,
      title,
      description,
      date,
    });
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setError("");
    setErrorDate("");
    setErrorDesc("");
    setProcessing(false);
    onClose();
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Update Upcoming Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Textarea
              label="Title"
              placeholder="Enter Upcoming event title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {error && <div className="mt-2 text-xs text-red-500">{error}</div>}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block w-full text-sm text-gray-700 border border-gray-200 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            {errordate && (
              <div className="mt-2 text-xs text-red-500">{errordate}</div>
            )}
          </div>

          <div>
            <Textarea
              label="Description"
              placeholder="Enter Upcoming event description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errordesc && (
              <div className="mt-2 text-xs text-red-500">{errordesc}</div>
            )}
          </div>

          <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <ProcessingButton type="submit" processing={processing}>
            Update Event
          </ProcessingButton>
                    </div>

        
        </form>
      </motion.div>
    </div>
  );
};

export default Updateevent;
