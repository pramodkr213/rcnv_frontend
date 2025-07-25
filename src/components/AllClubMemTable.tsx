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
import { MemberApi, type ClubMember } from "../api/clubmem";
import UpdateClubMemModal from "./UpateClubMemModal";
import { formatDateNormal } from "../utils/helper";

const AllClubMemTable = () => {
  const queryClient = useQueryClient();
  const actionModal = useActionModal();
  const [selectedProject, setSelectedProject] = useState<ClubMember | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

 const { data: memberAdmin = [], isLoading } = useQuery({
     queryKey: ["Member-admin",currentPage],
       queryFn: async () => {
       const res = await MemberApi.getAllMembersHome(currentPage);
       setTotalPages(res.totalPages);
       return res?.members;
     },
   });

 

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const deleteMutation = useMutation({
    mutationFn: MemberApi.deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Member-admin",0] });
      ToastMessage.success(" Member deleted successfully.");
    },
    onError: () => {
      ToastMessage.error("Failed to delete project.");
    },
  });

  const handleUpdate = (member: ClubMember) => {
    setSelectedProject(member);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (id: number) => {
    actionModal.show({
      title: "Delete Member",
      description: "Are you sure you want to delete this Member?",
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
      <UpdateClubMemModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        member={selectedProject}
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
                Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Email Id
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Mobile No.
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Spouse Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Member D.O.B
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Spouse D.O.B
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Anniversary
              </th>
              
              
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Classification
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
            ) : memberAdmin.length === 0 ? (
              <tr>
                <td
                  colSpan={21}
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No projects uploaded yet.
                </td>
              </tr>
            ) : (
              memberAdmin.map((member, index) => (
                <tr key={member.id}>
                  <td className="px-4 text-nowrap py-2 font-medium text-gray-700">
                    {member.name || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {member.email || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {member.mobile || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {member.spousename || "-"}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {member.memberdob ?formatDateNormal(member.memberdob):'-' }
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {member.spousedob ? formatDateNormal(member.spousedob):'-'}
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {member.memberaniversary ? formatDateNormal(member.memberaniversary):'-' }
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-700 max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {member.classification || "-"}
                  </td>
                  
                  
                  <td className="font-medium text-gray-700">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleUpdate(member)}
                        className="text-purple-500"
                      >
                        <PiNotePencilBold size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(Number(member.id))}
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

      {totalPages>1 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default AllClubMemTable;