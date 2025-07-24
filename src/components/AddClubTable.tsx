import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { PiNotePencilBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { ToastMessage } from "../utils/toast";
import { useActionModal } from "../context/ActionModal";
import { ClubApi, type Club } from "../api/club";
import { useState } from "react";
import UpdateClubModal from "./UpdateClubModal";

const AddClubTable = () => {
  const queryClient = useQueryClient();
  const actionModal = useActionModal();
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => await ClubApi.getClubs(),
  });

  const deleteMutation = useMutation({
    mutationFn: ClubApi.deleteClub,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
      ToastMessage.success("Club deleted successfully.");
    },
    onError: () => {
      ToastMessage.error("Failed to delete club.");
    },
  });

  const handleUpdate = (club: Club) => {
    setSelectedClub(club);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (id: number | undefined) => {
    actionModal.show({
      title: "Delete Club",
      description: "Are you sure you want to delete this club?",
      onConfirm: () => {
        deleteMutation.mutate(id);
        actionModal.hide();
      },
    });
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedClub(null);
  };

  return (
    <>
      <UpdateClubModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        club={selectedClub}
      />
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 flex-1 overflow-x-auto"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-6">Clubs</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Title
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
            ) : clubs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                  No clubs uploaded yet.
                </td>
              </tr>
            ) : (
              clubs.map((club) => (
                <tr key={club.id}>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {club.name || "-"}
                  </td>

                  <td className=" font-medium text-gray-700">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleUpdate(club)}
                        className="text-purple-500"
                      >
                        <PiNotePencilBold size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(club.id)}
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

export default AddClubTable;
