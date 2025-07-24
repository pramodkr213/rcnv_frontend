import React from "react";
import data from "../../data/rotary_data.json";

const ClubMembers: React.FC = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Club Members</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Sr.No</th>
              <th>Rotary ID</th>
              <th>Name & Surname</th>
              <th>Spouse Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((member, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{member.rotary_id}</td>
                <td>{member.name_surname}</td>
                <td>{member.spouce_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClubMembers;
