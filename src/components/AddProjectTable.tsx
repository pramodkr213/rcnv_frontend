import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { PiNotePencilBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { ToastMessage } from "../utils/toast";
import { useActionModal } from "../context/ActionModal";
import { ProjectApi, type Project } from "../api/project";
import { useState } from "react";
import UpdateProjectModal from "./UpdateProjectModal";
import Pagination from "./Pagination";
import type { ProjectsResponse } from "../api/admin/response/ApplicationResponse";

const AddProjectTable = () => {
  const queryClient = useQueryClient();
  const actionModal = useActionModal();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery<ProjectsResponse>({
    queryKey: ['projects', currentPage],
    queryFn: async () => {
      const res = await ProjectApi.getProjectsForAdmin({ page: currentPage });
      setTotalPages(Math.ceil(res.totalCount / 10) || 1);
      return res;
    },
    keepPreviousData: true,
  });

  const projects = response?.data || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const deleteMutation = useMutation({
    mutationFn: ProjectApi.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      ToastMessage.success("Project deleted successfully.");
    },
    onError: () => {
      ToastMessage.error("Failed to delete project.");
    },
  });

  const handleUpdate = (project: Project) => {
    setSelectedProject(project);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (id: number) => {
    actionModal.show({
      title: "Delete Project",
      description: "Are you sure you want to delete this project?",
      onConfirm: () => {
        deleteMutation.mutate(id);
        actionModal.hide();
      },
    });
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <UpdateProjectModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        project={selectedProject}
      />
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 flex-1 overflow-x-auto"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Title
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Detail
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Club Id
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Club Project Id
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Category Id
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Sub Category Id
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Year
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                District Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                District No
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Cost
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Beneficiaries
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Man Hours
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Rotarians
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Rotaractors
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                President Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                President Contact
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Facebook
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Instagram
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td
                  colSpan={21}
                  className="px-4 py-6 text-center text-gray-400"
                >
                  Loading...
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td
                  colSpan={21}
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No projects uploaded yet.
                </td>
              </tr>
            ) : (
              projects.map((project: Project) => (
                <tr key={project.id}>
                  <td className="px-4 text-nowrap py-2 font-medium text-gray-700">
                    {project.title || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {project.detail || "-"}
                  </td>
                  <td className="px-4 text-nowrap py-2 font-medium text-gray-700">
                    {project.date || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.clubId || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.clubProjectId ?? "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.categoryId ?? "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.subCategoryId ?? "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.year || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.districtName || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.destrictNo || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.cost ?? "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.beneficiaries ?? "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.manHours ?? "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.rotarians ?? "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.rotaractors ?? "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.presidentName || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.presidentContact || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.facebookLink || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.instaLink || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {project.email || "-"}
                  </td>
                  <td className="font-medium text-gray-700">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleUpdate(project)}
                        className="text-purple-500"
                      >
                        <PiNotePencilBold size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(Number(project.id))}
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

      {projects.length > 0 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default AddProjectTable;