import { motion } from "framer-motion";
import { UpEvnApi } from "../api/upevent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PiNotePencilBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { ToastMessage } from "../utils/toast";
import { useActionModal } from "../context/ActionModal";
import Pagination from "./Pagination";
import Updateevent from "./Updateevent";
import { useState } from "react";

const UpcminfEvnTable = () => {
  const queryClient = useQueryClient();
  const actionModal = useActionModal();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<MediaImage | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { data: upEvent = [], isLoading } = useQuery({
    queryKey: ["upc-evt", currentPage],
    queryFn: async () => {
      const res = await UpEvnApi.getUpEvn(currentPage);
      setTotalPages( res.totalPages);
      return res?.events || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: UpEvnApi.deleteEvent,
    onSuccess: () => {
      ToastMessage.success("Event deleted successfully.");
      setCurrentPage(0)
      queryClient.invalidateQueries({ queryKey: ["upc-evt",0] });
    },
    onError: () => {
      ToastMessage.error("Failed to delete image.");
    },
  });
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (id: number) => {
    actionModal.show({
      title: "Delete Event",
      description: "Are you sure you want to delete this Event?",
      onConfirm: () => {
        deleteMutation.mutate(id);
        actionModal.hide();
      },
    });
  };

  const handleUpdate = (item: MediaImage) => {
    setSelectedImage(item);
    setUpdateModalOpen(true);
  };
  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedImage(null);
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
          Uploaded Upcoming Events
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Title
              </th>

              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Date
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
            ) : upEvent.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-400">
                  No Upcoming Images uploaded yet.
                </td>
              </tr>
            ) : (
              upEvent?.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {item.title || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {item.date || "-"}
                  </td>

                  <td className="px-4 py-2 font-medium text-gray-700">
                    <button
                      onClick={() => handleUpdate(item)}
                      className="text-purple-500"
                    >
                      <PiNotePencilBold size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 ml-2"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {upEvent.length > 0 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        )}
      </motion.div>

      <Updateevent
        isOpen={updateModalOpen}
        onClose={handleCloseUpdateModal}
        item={selectedImage}
      />
    </>
  );
};

export default UpcminfEvnTable;
