import React from "react";
import { useAuth } from "../../../context/jobility/AuthContext";
import { API_BASE_URL } from "../../../api/axios";
import RegisterForm from "../../../components/register/RegisterForm";
import { FcGoogle } from "react-icons/fc";

const Register: React.FC = () => {
  const { setIsLoginModalOpen } = useAuth();

  const handleGoogleClick = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <section className=" min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 my-5 rounded-lg shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
          Sign-up and apply for free
        </h2>
        {/* <p className="text-center text-sm text-gray-600 mb-6">
          3,00,000+ companies hiring on Jobility
        </p> */}

        <button
          onClick={handleGoogleClick}
          className="w-full border py-2 px-4 flex items-center justify-center gap-2 text-gray-700 rounded-md hover:bg-gray-50 transition mb-4"
        >
          <FcGoogle size={25} />
          Sign up with Google
        </button>

        <div className="flex items-center my-4 text-gray-400 text-sm">
          <hr className="flex-grow border-t" />
          <span className="px-2">OR</span>
          <hr className="flex-grow border-t" />
        </div>

        <RegisterForm />

        <div className="flex flex-col gap-4">
          <p className="text-center text-[14px] text-gray-600 mt-4">
            By signing up, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms and Conditions
            </a>
          </p>
          <p className="flex gap-1 justify-center items-center text-sm">
            Already Registered?{" "}
            <span
              onClick={() => setIsLoginModalOpen(true)}
              className="text-blue-600 cursor-pointer font-medium"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
