import React, { useState } from "react";
import { BiImageAdd, BiLogoHeroku } from "react-icons/bi";
import {
  FaTachometerAlt,
  FaSignOutAlt,
  FaBars,
  FaPeopleCarry,
  FaProjectDiagram,
  FaUserTie,
  FaAddressBook,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastMessage } from "../utils/toast";
import { useActionModal } from "../context/ActionModal";
import { AiFillProject } from "react-icons/ai";
import { PiProjectorScreenChartFill } from "react-icons/pi";
import { GoProjectRoadmap } from "react-icons/go";
import { useAuth } from "../context/jobility/AuthContext";
import { getDecryptedAuthCookie } from "../utils/cookieCrypto";
import {
  Briefcase,
  ClipboardList,
  GraduationCap,
  School,
  SquareChartGantt,
  UserCheck,
  Users,
} from "lucide-react";

const adminNavItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, to: "/admin/dashboard" },
  {
    label: "Add Hero Image",
    icon: <BiLogoHeroku />,
    to: "/admin/add-hero-image",
  },
  {
    label: "Add Gallery",
    icon: <BiImageAdd />,
    to: "/admin/add-gallery-images",
  },
  {
    label: "Add Sponsors",
    icon: <FaPeopleCarry />,
    to: "/admin/add-sponsors",
  },
  {
    label: "Add Club",
    icon: <AiFillProject />,
    to: "/admin/add-club",
  },
  {
    label: "Add Category",
    icon: <MdCategory />,
    to: "/admin/add-category",
  },
  {
    label: "Add Sub Category",
    icon: <FaProjectDiagram />,
    to: "/admin/add-sub-category",
  },
  {
    label: "Add Project",
    icon: <PiProjectorScreenChartFill />,
    to: "/admin/add-project",
  },
  {
    label: "All Projects",
    icon: <GoProjectRoadmap />,
    to: "/admin/all-projects",
  },
  {
    label: "Add Directors",
    icon: <FaUserTie />,
    to: "/admin/add-directors",
  },
  {
    label: "Add Directries",
    icon: <FaAddressBook />,
    to: "/admin/add-directries",
  },
   {
    label: "Add Media Coverage",
    icon: <BiLogoHeroku />,
    to: "/admin/add-media-coverage",
  },
  {
    label: "Add Upcoming Events",
    icon: <BiLogoHeroku />,
    to: "/admin/add-upcoming-event",
  },
  {
    label: "Add Image Category",
    icon: <BiLogoHeroku />,
    to: "/admin/add-image-cat",
  },
  {
    label: "Employers",
    icon: <Users size={22} />,
    to: "/admin/employers",
  },
  {
    label: "Jobs",
    icon: <Briefcase size={22} />,
    to: "/admin/jobs-list",
  },
  {
    label: "Internships",
    icon: <School size={22} />,
    to: "/admin/internships-list",
  },
  {
    label: "Candidates",
    icon: <GraduationCap size={22} />,
    to: "/admin/candidates-list",
  },
  {
    label: "Job Applications",
    icon: <ClipboardList size={22} />,
    to: "/admin/job-applications",
  },
  {
    label: "Internship Applications",
    icon: <SquareChartGantt size={22} />,
    to: "/admin/internship-applications",
  },
  {
    label: "Employer Requests",
    icon: <UserCheck size={22} />,
    to: "/admin/employer-requests",
  },
];

const employerNavItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, to: "/employer/dashboard" },
  {
    label: "Post Job/Internship",
    icon: <BiImageAdd />,
    to: "/employer/post-job",
  },
  {
    label: "My Jobs",
    icon: <BiImageAdd />,
    to: "/employer/my-jobs",
  },
  {
    label: "My Internships",
    icon: <BiImageAdd />,
    to: "/employer/my-internships",
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const user = getDecryptedAuthCookie();

  const actionModal = useActionModal();
  // Helper to determine if we're on desktop
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

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

  return (
    <>
      {/* Mobile menu button */}
      {!open && (
        <button
          className={`md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow-lg border-2 border-purple-200 hover:border-purple-500 transition-colors duration-200`}
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <FaBars className="text-2xl text-purple-700" />
        </button>
      )}
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-[100vh] md:h-[95vh] bg-white shadow-2xl flex flex-col py-8 px-4 rounded-r-3xl m-0 md:m-4 z-40 transition-all duration-300 ease-in-out
        ${
          open ? "w-[90vw] translate-x-0" : "w-0 -translate-x-full"
        } md:w-[20vw] md:translate-x-0`}
        style={{
          width: isDesktop ? "20vw" : open ? "90vw" : "0",
          minWidth: isDesktop ? "20vw" : open ? "90vw" : "0",
        }}
      >
        <div
          className={`mb-10 flex items-center justify-between gap-3 px-2 transition-opacity duration-300 ${
            open || isDesktop ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <span className="text-2xl font-extrabold text-purple-700 tracking-tight">
            {auth?.user?.email?.split("@")[0].toUpperCase()}
          </span>
          {/* Close button only on mobile and when open */}
          {!isDesktop && open && (
            <span
              className="text-2xl cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <RxCross2 size={30} />
            </span>
          )}
        </div>
        <nav
          className={`flex-1 ${
            open || isDesktop ? "" : "pointer-events-none"
          } overflow-y-auto`}
          style={{ maxHeight: "calc(100vh - 220px)" }}
        >
          <ul className="space-y-2">
            {user?.role === "ADMIN"
              ? adminNavItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium text-lg hover:bg-purple-100 hover:text-purple-700 ${
                        location.pathname === item.to
                          ? "bg-purple-200 text-purple-800"
                          : "text-gray-700"
                      } ${
                        open || isDesktop ? "" : "opacity-0 pointer-events-none"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                ))
              : employerNavItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium text-lg hover:bg-purple-100 hover:text-purple-700 ${
                        location.pathname === item.to
                          ? "bg-purple-200 text-purple-800"
                          : "text-gray-700"
                      } ${
                        open || isDesktop ? "" : "opacity-0 pointer-events-none"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className={`mt-10 flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-100 transition font-medium text-lg ${
            open || isDesktop ? "" : "opacity-0 pointer-events-none"
          }`}
        >
          <FaSignOutAlt className="text-xl" /> Logout
        </button>
      </aside>
      {/* Overlay for mobile */}
      {open && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
