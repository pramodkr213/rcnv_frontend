import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { PiNotePencilBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { ToastMessage } from "../utils/toast";
import { useActionModal } from "../context/ActionModal";
import { SubCategoryApi, type SubCategory } from "../api/subcategory";
import { useState } from "react";
import UpdateSubCategoryModal from "./UpdateSubCategoryModal";

const AddSubCategoryTable = () => {
  const queryClient = useQueryClient();
  const actionModal = useActionModal();
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const { data: subcategories = [], isLoading } = useQuery({
    queryKey: ["subcategories"],
    queryFn: async () => await SubCategoryApi.getSubCategories(),
  });

  const deleteMutation = useMutation({
    mutationFn: SubCategoryApi.deleteSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
      ToastMessage.success("Sub Category deleted successfully.");
    },
    onError: () => {
      ToastMessage.error("Failed to delete sub category.");
    },
  });

  const handleUpdate = (subcategory: SubCategory) => {
    setSelectedSubCategory(subcategory);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (id: number | undefined) => {
    actionModal.show({
      title: "Delete Sub Category",
      description: "Are you sure you want to delete this sub category?",
      onConfirm: () => {
        deleteMutation.mutate(id);
        actionModal.hide();
      },
    });
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedSubCategory(null);
  };

  return (
    <>
      <UpdateSubCategoryModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        subcategory={selectedSubCategory}
      />
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 flex-1 overflow-x-auto"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          SubCategories
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Club Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Category Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : subcategories.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                  No sub categories uploaded yet.
                </td>
              </tr>
            ) : (
              subcategories.map((subcategory) => (
                <tr key={subcategory.id}>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {subcategory.name || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {subcategory.club_name || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {subcategory.category_name || "-"}
                  </td>

                  <td className=" font-medium text-gray-700">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleUpdate(subcategory)}
                        className="text-purple-500"
                      >
                        <PiNotePencilBold size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(subcategory.id)}
                        className="text-red-500 ml-2"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </>
  );
};

export default AddSubCategoryTable;
