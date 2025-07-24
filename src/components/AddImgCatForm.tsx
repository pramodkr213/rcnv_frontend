import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProcessingButton from "./ProcessingButton";
import { useState } from "react";
import { ToastMessage } from "../utils/toast";
import Input from "./Input";
import { ImageCatApi } from "../api/imageCat";
import Select from "./Select";

const AddImgCatForm = () => {
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [title, setTitle] = useState("");
  const [clubId, setClubId] = useState<number | undefined>(undefined);

  
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
      await ImageCatApi.addImageCat(title);
      ToastMessage.success("Image Category Added successfully.");
      queryClient.invalidateQueries({ queryKey: ["img-cat"] });
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
        label="Title of Category"
        error={error}
        placeholder="Enter Title of Category"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ProcessingButton type="submit" processing={processing}>
        Add Image Category
      </ProcessingButton>
    </form>
  );
};

export default AddImgCatForm;
