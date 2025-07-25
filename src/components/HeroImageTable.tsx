import { motion } from "framer-motion";
import { HeroImageApi, type HeroImage } from "../api/hero";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PiNotePencilBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { ToastMessage } from "../utils/toast";
import { useActionModal } from "../context/ActionModal";
import UpdateHeroImageModal from "./UpdateHeroImageModal";
import { useState } from "react";

const HeroImageTable = () => {
  const queryClient = useQueryClient();
  const actionModal = useActionModal();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<HeroImage | null>(null);

  const { data: images = [], isLoading } = useQuery({
    queryKey: ["hero-images"],
    queryFn: HeroImageApi.getHeroImages,
  });

  const deleteMutation = useMutation({
    mutationFn: HeroImageApi.deleteHeroImage,
    onSuccess: () => {
      ToastMessage.success("Image deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["hero-images"] });
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

  const handleUpdate = (image: HeroImage) => {
    setSelectedImage(image);
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
          Uploaded Images
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
                <td colSpan={3} className="px-4 py-6 text-center text-gray-400">
                  No images uploaded yet.
                </td>
              </tr>
            ) : (
              images?.map((img: HeroImage) => (
                <tr key={img.id}>
                  <td className="px-4 py-2">
                    <img
                      src={`${img.imageUrl}`}
                      alt={img.title || "-"}
                      className="h-16 w-24 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {img.title || "-"}
                  </td>

                  <td className="px-4 py-2 font-medium text-gray-700">
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      <UpdateHeroImageModal
        isOpen={updateModalOpen}
        onClose={handleCloseUpdateModal}
        image={selectedImage}
      />
    </>
  );
};

export default HeroImageTable;
