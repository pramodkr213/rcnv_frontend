import AddProjectTable from "../components/AddProjectTable";
import AllClubMemTable from "../components/AllClubMemTable";

const AllClubMembers = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Club Members</h2>

      <AllClubMemTable />
    </div>
  );
};

export default AllClubMembers;
