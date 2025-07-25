import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MemberApi } from "../../api/clubmem";
import Pagination from "../../components/Pagination";
import { Eye } from "lucide-react";
import MemberProfile from "../../components/MemberProfile";
import { formatDateNormal } from "../../utils/helper";

const ClubMembers: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: memberHome = [], isLoading } = useQuery({
    queryKey: ["Member-home", currentPage],
    queryFn: async () => {
      const res = await MemberApi.getAllMembersHome(currentPage);
      setTotalPages(res.totalPages);
      return res?.members;
    },
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openModal = (member: any) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Club Members</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Sr.No</th>
              <th>Member Name</th>
              <th>Spouse Name</th>
              <th>Mobile No.</th>
              <th>Member D.O.B</th>
              <th>Spouse D.O.B</th>
              <th>Anniversary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {memberHome.map((member, idx) => (
              <tr key={idx}>
                <td>{currentPage * 10 + idx + 1}</td>
                <td>{member.name}</td>
                <td>{member.spousename}</td>
                <td>{member.mobile}</td>
                <td>{member.memberdob ?formatDateNormal(member.memberdob):''}</td>
                <td>{member.spousedob ?formatDateNormal(member.spousedob):''}</td>
                <td>{member.memberaniversary ? formatDateNormal(member.memberaniversary):''}</td>
                <td>
                  <button
                    onClick={() => openModal(member)}
                    className="btn btn-sm btn-outline-primary"
                    title="View Profile"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        )}
      </div>

      {selectedMember && (
        <MemberProfile
          member={selectedMember}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ClubMembers;
