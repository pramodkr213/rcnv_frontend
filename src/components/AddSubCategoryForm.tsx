import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProcessingButton from "./ProcessingButton";
import { useState } from "react";
import { ToastMessage } from "../utils/toast";
import Input from "./Input";
import { CategoryApi, type Category } from "../api/category";
import Select from "./Select";
import { SubCategoryApi } from "../api/subcategory";

const AddSubCategoryForm = () => {
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoryApi.getCategories,
  });
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title) {
      setError("Please enter a title.");
      return;
    }
    if (!categoryId) {
      setError("Please select a category.");
      return;
    }

    setProcessing(true);
    try {
      await SubCategoryApi.addSubCategory(title, categoryId);
      ToastMessage.success("Sub Category Added successfully.");
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
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
        label="Category"
        name="categoryId"
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        options={categories.map((category: Category) => ({
          label: category.name,
          value: category.id?.toString() || "",
        }))}
      />

      <Input
        label="Sub Category Name"
        error={error}
        placeholder="Enter sub category name"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ProcessingButton type="submit" processing={processing}>
        Add Sub Category
      </ProcessingButton>
    </form>
  );
};

export default AddSubCategoryForm;
