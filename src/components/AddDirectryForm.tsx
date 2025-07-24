import { useQueryClient } from "@tanstack/react-query";
import ProcessingButton from "./ProcessingButton";
import { useState } from "react";
import { DirectryApi, type Directry } from "../api/directries";
import { ToastMessage } from "../utils/toast";
import Input from "./Input";

const AddDirectryForm = () => {
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const queryClient = useQueryClient();

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

    setProcessing(true);
    try {
      const directryData: Directry = {
        name: name.trim(),
        email: email.trim(),
        designation: designation.trim(),
      };

      await DirectryApi.addDirectry(directryData);
      ToastMessage.success("Directory added successfully.");
      queryClient.invalidateQueries({ queryKey: ["directries"] });

      // Reset form
      setName("");
      setEmail("");
      setDesignation("");
    } catch {
      ToastMessage.error("Failed to add directory.");
    } finally {
      setProcessing(false);
    }
  };

  return (
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

      <ProcessingButton type="submit" processing={processing}>
        Add Directory
      </ProcessingButton>
    </form>
  );
};

export default AddDirectryForm;
