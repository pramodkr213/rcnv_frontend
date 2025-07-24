import { motion } from "framer-motion";
import { DirectorApi, type Director } from "../api/directors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PiNotePencilBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { ToastMessage } from "../utils/toast";
import { useActionModal } from "../context/ActionModal";
import UpdateDirectorModal from "./UpdateDirectorModal";
import { useState } from "react";

const AddDirectorTable = () => {
  const queryClient = useQueryClient();
  const actionModal = useActionModal();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(
    null
  );

  const { data: directors = [], isLoading } = useQuery({
    queryKey: ["directors"],
    queryFn: DirectorApi.getDirectors,
  });

  const deleteMutation = useMutation({
    mutationFn: DirectorApi.deleteDirector,
    onSuccess: () => {
      ToastMessage.success("Director deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["directors"] });
    },
    onError: () => {
      ToastMessage.error("Failed to delete director.");
    },
  });

  const handleDelete = (id: number) => {
    actionModal.show({
      title: "Delete Director",
      description: "Are you sure you want to delete this director?",
      onConfirm: () => {
        deleteMutation.mutate(id);
        actionModal.hide();
      },
    });
  };

  const handleUpdate = (director: Director) => {
    setSelectedDirector(director);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedDirector(null);
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
          Directors List
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>
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
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : directors.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  No directors added yet.
                </td>
              </tr>
            ) : (
              directors?.map((director: Director) => (
                <tr key={director.id}>
                  <td className="px-4 py-2">
                    <img
                      src={`${director.imageUrl}`}
                      alt={director.name}
                      className="h-16 w-16 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {director.name}
                  </td>
                  <td className="px-4 py-2 text-gray-600">{director.email}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {director.designation}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    <button
                      onClick={() => handleUpdate(director)}
                      className="text-purple-500 hover:text-purple-700 transition-colors"
                      title="Edit Director"
                    >
                      <PiNotePencilBold size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(director.id!)}
                      className="text-red-500 hover:text-red-700 ml-2 transition-colors"
                      title="Delete Director"
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

      <UpdateDirectorModal
        isOpen={updateModalOpen}
        onClose={handleCloseUpdateModal}
        director={selectedDirector}
      />
    </>
  );
};

export default AddDirectorTable;
