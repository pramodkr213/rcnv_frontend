import { useQueryClient } from "@tanstack/react-query";
import ProcessingButton from "./ProcessingButton";
import { useRef, useState } from "react";
import { DirectorApi, type Director } from "../api/directors";
import { ToastMessage } from "../utils/toast";
import Input from "./Input";

const AddDirectorForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [startDate, setStartDate] = useState("");
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

    // if (!startDate.trim()) {
    //   setError("Please enter start date.");
    //   return;
    // }

    // if (!file) {
    //   setError("Please select an image file.");
    //   return;
    // }

    setProcessing(true);
    try {
      const directorData: Director = {
        name: name.trim(),
        email: email.trim(),
        designation: designation.trim(),
        startDate: startDate.trim(),
        imageUrl: "", // This will be set by the backend
      };

      await DirectorApi.addDirector(directorData, file);
      ToastMessage.success("Director added successfully.");
      queryClient.invalidateQueries({ queryKey: ["directors"] });

      // Reset form
      setName("");
      setEmail("");
      setDesignation("");
      setStartDate("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      ToastMessage.error("Failed to add director.");
    } finally {
      setProcessing(false);
    }
  };

  return (
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

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Director Image
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
        Add Director
      </ProcessingButton>
    </form>
  );
};

export default AddDirectorForm;
