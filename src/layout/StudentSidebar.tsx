import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Briefcase,
  Bookmark,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/jobility/AuthContext";
import { ToastMessage } from "../utils/toast";
import { useActionModal } from "../context/ActionModal";

const StudentSidebar: React.FC = () => {
  const auth = useAuth();
  const actionModal = useActionModal();
  const navigate = useNavigate();

  const handleLogout = () => {
    actionModal.show({
      title: "Logout",
      description: "Are you sure you want to logout?",
      confirmText: "Logout",
      onConfirm: async () => {
        await ToastMessage.promise(auth.logout(), {
          loading: "Logouting!!",
          success: "Logout Successful!!",
          error: "Failed to logout!!",
        });
        navigate("/");
      },
    });
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      to: "/candidate/dashboard",
    },
    {
      label: "Profile",
      icon: <User className="w-5 h-5" />,
      to: "/candidate/profile",
    },
    {
      label: "Applications",
      icon: <Briefcase className="w-5 h-5" />,
      to: "/candidate/applications",
    },
    {
      label: "Bookmarks",
      icon: <Bookmark className="w-5 h-5" />,
      to: "/candidate/bookmarks",
    },
    {
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
      to: "/candidate/settings",
    },
  ];

  return (
    <div className="bg-white shadow-lg w-64 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Candidate Portal</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your career</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`
                }
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default StudentSidebar;
