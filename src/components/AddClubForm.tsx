import { useQueryClient } from "@tanstack/react-query";
import ProcessingButton from "./ProcessingButton";
import { useState } from "react";
import { ToastMessage } from "../utils/toast";
import { ClubApi } from "../api/club";
import Input from "./Input";

const AddClubForm = () => {
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title) {
      setError("Please enter a title.");
      return;
    }

    setProcessing(true);
    try {
      await ClubApi.addClub(title);
      ToastMessage.success("Club Added successfully.");
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
      setTitle("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      ToastMessage.error("Failed to upload image.");
    } finally {
      setProcessing(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Club Name"
        error={error}
        placeholder="Enter club name"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ProcessingButton type="submit" processing={processing}>
        Add Club
      </ProcessingButton>
    </form>
  );
};

export default AddClubForm;
