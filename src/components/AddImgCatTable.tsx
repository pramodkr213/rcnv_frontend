import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { PiNotePencilBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { ToastMessage } from "../utils/toast";
import { useActionModal } from "../context/ActionModal";
import { ImageCatApi } from "../api/imageCat";
import { useState } from "react";
import UpdateImgCatModal from "./UpdateImgCatModal";
import UpdateCategoryModal from "./UpdateCategoryModal";
import Pagination from "./Pagination";
const AddImgCatTable = () => {
  const queryClient = useQueryClient();
  const actionModal = useActionModal();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
 const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { data: imgCat = [], isLoading } = useQuery({
    queryKey: ["img-cat"],
   queryFn: async () => {
         const res = await ImageCatApi.getImageCat(currentPage);
         setTotalPages(Math.ceil(res?.totalCount / 10) || 1);
         return res?.content;
       },
  });
   const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const deleteMutation = useMutation({
    mutationFn: ImageCatApi.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["img-cat"] });
      ToastMessage.success("Category deleted successfully.");
    },
    onError: () => {
      ToastMessage.error("Failed to delete category.");
    },
  });

  const handleUpdate = (category: Category) => {
    setSelectedCategory(category);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (id: number | undefined) => {
    actionModal.show({
      title: "Delete Category",
      description: "Are you sure you want to delete this category?",
      onConfirm: () => {
        deleteMutation.mutate(id);
        actionModal.hide();
      },
    });
  };

//   const handleCloseUpdateModal = () => {
//     setIsUpdateModalOpen(false);
//     setSelectedCategory(null);
//   };

 const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedCategory(null);
  };
  return (
    <>
     
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 flex-1 overflow-x-auto"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6">Image Categories</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Name
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
            ) : imgCat.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                  No imgCat uploaded yet.
                </td>
              </tr>
            ) : (
              imgCat.map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {category.imgcatname || "-"}
                  </td>

                 

                  <td className=" font-medium text-gray-700">
                    <div className="flex items-center gap-1">
                      {/* <button
                        onClick={() => handleUpdate(category)}
                        className="text-purple-500"
                      >
                        <PiNotePencilBold size={20} />
                      </button> */}
                      <button
                        onClick={() => handleDelete(category.id)}
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
        {imgCat.length > 0 && (
                          <Pagination
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                            totalPages={totalPages}
                          />
                        )}
      </motion.div>
       <UpdateImgCatModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        category={selectedCategory}
      />
    </>
  );
};

export default AddImgCatTable;
