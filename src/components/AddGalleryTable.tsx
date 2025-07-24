import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GalleryApi, type GalleryImage } from "../api/gallery";
import { motion } from "framer-motion";
import { PiNotePencilBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { ToastMessage } from "../utils/toast";
import { useActionModal } from "../context/ActionModal";
import UpdateGalleryImageModal from "./UpdateGalleryImageModal";
import { useState } from "react";
import Pagination from "./Pagination";

const AddGalleryTable = () => {
  const queryClient = useQueryClient();
  const actionModal = useActionModal();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { data: images = [], isLoading } = useQuery({
    queryKey: ["gallery-images", currentPage],
    queryFn: async () => {
      const res = await GalleryApi.getGalleryImages(currentPage);
      setTotalPages(Math.ceil(res?.totalCount / 10) || 1);
      return res?.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: GalleryApi.deleteGalleryImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery-images"] });
      ToastMessage.success("Image deleted successfully.");
    },
    onError: () => {
      ToastMessage.error("Failed to delete image.");
    },
  });

  const handleDelete = (id: number) => {
    actionModal.show({
      title: "Delete Image",
      description: "Are you sure you want to delete this image?",
      onConfirm: () => {
        deleteMutation.mutate(id);
        actionModal.hide();
      },
    });
  };

  const handleUpdate = (image: GalleryImage) => {
    setSelectedImage(image);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedImage(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          Gallery Images
        </h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Preview
              </th>
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
            ) : images.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-400">
                  No images uploaded yet.
                </td>
              </tr>
            ) : (
              images.map((img: GalleryImage) => (
                <tr key={img.id}>
                  <td className="px-4 py-2">
                    <img
                      src={`${img.imageUrl}`}
                      alt={img.title || "Gallery Image"}
                      className="h-16 w-24 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {img.title || "-"}
                  </td>

                  <td className=" font-medium text-gray-700">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleUpdate(img)}
                        className="text-purple-500"
                      >
                        <PiNotePencilBold size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(img.id)}
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
        {images.length > 0 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        )}
      </motion.div>

      <UpdateGalleryImageModal
        isOpen={updateModalOpen}
        onClose={handleCloseUpdateModal}
        image={selectedImage}
      />
    </>
  );
};

export default AddGalleryTable;
