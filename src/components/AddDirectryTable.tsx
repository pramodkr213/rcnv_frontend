import { motion } from "framer-motion";
import { DirectryApi, type Directry } from "../api/directries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PiNotePencilBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { ToastMessage } from "../utils/toast";
import { useActionModal } from "../context/ActionModal";
import UpdateDirectryModal from "./UpdateDirectryModal";
import { useState } from "react";

const AddDirectryTable = () => {
  const queryClient = useQueryClient();
  const actionModal = useActionModal();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedDirectry, setSelectedDirectry] = useState<Directry | null>(
    null
  );

  const { data: directries = [], isLoading } = useQuery({
    queryKey: ["directries"],
    queryFn: DirectryApi.getDirectries,
  });

  const deleteMutation = useMutation({
    mutationFn: DirectryApi.deleteDirectry,
    onSuccess: () => {
      ToastMessage.success("Directory deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["directries"] });
    },
    onError: () => {
      ToastMessage.error("Failed to delete directory.");
    },
  });

  const handleDelete = (id: number) => {
    actionModal.show({
      title: "Delete Directory",
      description: "Are you sure you want to delete this directory?",
      onConfirm: () => {
        deleteMutation.mutate(id);
        actionModal.hide();
      },
    });
  };

  const handleUpdate = (directry: Directry) => {
    setSelectedDirectry(directry);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedDirectry(null);
  };

  return (
    <>
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 flex-1 overflow-x-auto"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6">
          Directories List
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Designation
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
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
            ) : directries.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                  No directories added yet.
                </td>
              </tr>
            ) : (
              directries?.map((directry: Directry) => (
                <tr key={directry.id}>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {directry.name}
                  </td>
                  <td className="px-4 py-2 text-gray-600">{directry.email}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {directry.designation}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    <button
                      onClick={() => handleUpdate(directry)}
                      className="text-purple-500 hover:text-purple-700 transition-colors"
                      title="Edit Directory"
                    >
                      <PiNotePencilBold size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(directry.id!)}
                      className="text-red-500 hover:text-red-700 ml-2 transition-colors"
                      title="Delete Directory"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      <UpdateDirectryModal
        isOpen={updateModalOpen}
        onClose={handleCloseUpdateModal}
        directry={selectedDirectry}
      />
    </>
  );
};

export default AddDirectryTable;
