import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/jobility/AuthContext";
import LoginTabs from "../../../components/login/LoginTabs";
import LoginForm from "../../../components/login/LoginForm";
import type { UserRole } from "../../../types/UserRole";
import { RxCross2 } from "react-icons/rx";

const LoginModal: React.FC = () => {
  const navigate = useNavigate();
  const { setIsLoginModalOpen } = useAuth();
  const [role, setRole] = React.useState<UserRole>("STUDENT");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[70vw] max-w-md rounded-lg p-6 relative shadow-lg">
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute cursor-pointer top-3 right-4 text-3xl text-gray-500 hover:text-black"
        >
          <RxCross2 size={20} />
        </button>

        <LoginTabs setRole={setRole} />

        <LoginForm role={role} />

        <p className="text-sm text-center mt-4 text-gray-600">
          New to RCNV? Register (
          <span
            onClick={() => {
              setIsLoginModalOpen(false);
              navigate("/signup/candidate");
            }}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Candidate
          </span>{" "}
          /{" "}
          <span
            onClick={() => {
              setIsLoginModalOpen(false);
              navigate("/signup/employer");
            }}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Company
          </span>
          )
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
