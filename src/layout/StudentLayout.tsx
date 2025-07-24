import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";

const StudentLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;
