import React, { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { Education } from "../../../types/Education";
import EducationModal from "./EducationModal";
import {
  addEducationApi,
  deleteEducationApi,
  updateEducationApi,
} from "../../../api/student/student";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import type { UpdateStudentProfile } from "../../../api/student/request/UpdateProfileRequest";
import { useActionModal } from "../../../context/ActionModal";
import { ToastMessage } from "../../../utils/toast";

const EducationSection: React.FC<{
  educationList: Education[];
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<UpdateStudentProfile, Error>>;
}> = ({ educationList, refetch }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Education | null>(null);
  const { show, hide } = useActionModal();

  const handleAdd = () => {
    setSelected(null);
    setModalOpen(true);
  };

  const handleDelete = async (id: string | undefined) => {
    show({
      title: "Delete Education",
      description: "Are you sure you want to delete this education?",
      confirmText: "Delete",
      onConfirm: async () => {
        await ToastMessage.promise(deleteEducationApi(id), {
          loading: "Deleting Education.....",
          success: "Education deleted successfully!",
          error: "Failed to delete employer",
        });
        refetch();
        hide();
      },
    });
  };

  const handleEdit = (edu: Education) => {
    setSelected(edu);
    setModalOpen(true);
  };

  const handleSave = async (updated: Education) => {
    if (updated.id) {
      // update existing
      await ToastMessage.promise(updateEducationApi(updated.id, updated), {
        loading: "Updating Education.....",
        success: "Education updated successfully!",
        error: "failed to update",
      });
    } else {
      // add new
      await ToastMessage.promise(addEducationApi(updated), {
        loading: "Adding Education.....",
        success: "Education added successfully!",
        error: "failed to add",
      });
    }
    refetch();
    setModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl ">
      <div className="flex gap-3 items-center justify-between mb-5 border-b border-b-gray-400">
        <div className="flex justify-center items-center gap-2">
          <h3 className="text-2xl font-semibold text-gray-800">Education</h3>
        </div>
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 flex items-center gap-1"
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      <ul className="space-y-4 max-h-[350px] overflow-y-auto">
        {educationList?.map((edu) => (
          <li
            key={edu?.id}
            className="p-4 border border-gray-200 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {edu?.degree} ({edu?.type}) - {edu?.yearOfPassing}
              </p>
              <p className="text-sm text-gray-600">{edu?.college}</p>
              <p className="text-sm text-gray-600">
                Field: {edu?.fieldOfStudy}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(edu)}>
                <Pencil className="text-blue-500 hover:text-blue-600 cursor-pointer" />
              </button>
              <button
                onClick={() => handleDelete(edu.id)}
                className="text-red-500 hover:text-red-600 cursor-pointer"
              >
                <Trash2 />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {modalOpen && (
        <EducationModal
          education={selected}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default EducationSection;
