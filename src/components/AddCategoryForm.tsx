import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProcessingButton from "./ProcessingButton";
import { useState } from "react";
import { ToastMessage } from "../utils/toast";
import Input from "./Input";
import { ClubApi, type Club } from "../api/club";
import { CategoryApi } from "../api/category";
import Select from "./Select";

const AddCategoryForm = () => {
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [title, setTitle] = useState("");
  const [clubId, setClubId] = useState<number | undefined>(undefined);

  const { data: clubs = [] } = useQuery({
    queryKey: ["clubs"],
    queryFn: ClubApi.getClubs,
  });
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title) {
      setError("Please enter a title.");
      return;
    }
    if (!clubId) {
      setError("Please select a club.");
      return;
    }

    setProcessing(true);
    try {
      await CategoryApi.addCategory(title, clubId);
      ToastMessage.success("Category Added successfully.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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
      <Select
        label="Club"
        name="clubId"
        value={clubId}
        onChange={(e) => setClubId(Number(e.target.value))}
        options={clubs.map((club: Club) => ({
          label: club.name,
          value: club.id?.toString() || "",
        }))}
      />

      <Input
        label="Category Name"
        error={error}
        placeholder="Enter category name"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ProcessingButton type="submit" processing={processing}>
        Add Category
      </ProcessingButton>
    </form>
  );
};

export default AddCategoryForm;
