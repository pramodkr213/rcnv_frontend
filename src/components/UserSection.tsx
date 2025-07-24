import { Settings, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useActionModal } from "../context/ActionModal";
import { useAuth } from "../context/jobility/AuthContext";

const UserSection: React.FC = () => {
  const navigate = useNavigate();

  const { show, hide } = useActionModal();

  const { logout } = useAuth();

  const dropDownMenu = [
    {
      label: "Dashboard",
      icon: User,
      onClick: () => (window.location.href = "/candidate/dashboard"),
    },
    {
      label: "Logout",
      icon: LogOut,
      onClick: () => {
        show({
          title: "Logout",
          description: "Are you sure you want to logout?",
          onConfirm: async () => {
            await toast.promise(logout(), {
              loading: "Logging out...",
              success: "Logout successful!",
            });
            hide();
            navigate("/");
          },
          confirmText: "Logout",
          cancelText: "Cancel",
        });
      },
    },
  ];

  return (
    // <div className="d-none d-lg-flex gap-3 justify-content-center align-items-center text-white position-relative">
    //   {/* Profile Section */}
    //   <div
    //     className="position-relative"
    //     onMouseEnter={() => setOpen(true)}
    //     onMouseLeave={() => setOpen(false)}
    //   >
    //     <div
    //       title="Profile"
    //       className="d-flex align-items-center gap-2 cursor-pointer"
    //       role="button"
    //     >
    //       <img
    //         src="https://avatar.iran.liara.run/public/5"
    //         alt="profile"
    //         draggable={false}
    //         className="rounded-circle"
    //         style={{ width: 40, height: 40, userSelect: "none" }}
    //       />
    //       <ChevronDown size={16} />
    //     </div>

    //     {/* Dropdown Menu */}
    //     <div
    //       className={`position-absolute rounded d-flex flex-column justify-content-center gap-3 bg-white text-black shadow-lg ${
    //         open ? "visible opacity-100" : "invisible opacity-0"
    //       }`}
    //       style={{
    //         top: "100%",
    //         left: -20,
    //         transition: "opacity 0.2s ease-in-out",
    //         zIndex: 999,
    //         minWidth: "180px",
    //       }}
    //     >
    //       {dropDownMenu.map((item, index) => (
    //         <div
    //           key={index}
    //           onClick={item.onClick}
    //           className="d-flex align-items-center user-dropdown text-dark hover-text-primary cursor-pointer"
    //           style={{ cursor: "pointer" }}
    //         >
    //           <item.icon size={18} />
    //           <span>{item.label}</span>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className="group relative nav_text mr-1">
      <button className="nav_text text-decoration-none">
        <img
          src="https://avatar.iran.liara.run/public/5"
          alt="profile"
          draggable={false}
          className="rounded-circle"
          style={{ width: 40, height: 40, userSelect: "none" }}
        />
      </button>
      <div className="absolute -left-5 z-30 bg-white shadow-lg border rounded-md hidden group-hover:block">
        {dropDownMenu.map((item, index) => {
          return (
            <button
              key={index}
              onClick={item.onClick}
              className="block px-4 py-2 nav_text text-decoration-none hover:bg-gray-100"
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UserSection;
