import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserRole } from "../../types/UserRole";
import { useAuth } from "../../context/jobility/AuthContext";
import { useError } from "../../ErrorContext";
import { getDecryptedAuthCookie } from "../../utils/cookieCrypto";
import { ToastMessage } from "../../utils/toast";
import { validateLogin } from "../../utils/FormValidation";

interface LoginFormProps {
  role: UserRole;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { login, setIsLoginModalOpen, handleSendOtp } = useAuth();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { errors, setFormErrors } = useError();

  const loginErrors = errors.login;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateLogin(formData, setFormErrors)) {
      try {
        await ToastMessage.promise(login(formData, props.role), {
          loading: "Logging in...",
          success: "Login Successfull!",
         error: "Invalid credentials, Please sign up",

        });

        setFormErrors("login", {});
        setIsLoginModalOpen(false);

        const user = getDecryptedAuthCookie();

        if (props.role === "EMPLOYER") {
          if (!user?.isEmailVerified) {
            handleSendOtp(formData.email);
            navigate("/registration/employer/verify-email", { replace: true });
          } else {
            // navigate("/employer/dashboard", { replace: true });
            window.location.href = "/employer/dashboard";
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log("Failed to login", error);
      }
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={(e) => handleChange(e)}
          placeholder="john@example.com"
          className={`w-full border px-4 py-2 rounded-md text-sm outline-blue-500 ${
            loginErrors.email ? "border-red-500" : ""
          }`}
          required
        />
        {loginErrors.email && (
          <p className="text-red-500 text-xs mt-1">{loginErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => handleChange(e)}
          placeholder="Must be at least 6 characters"
          className={`w-full border px-4 py-2 rounded-md text-sm outline-blue-500 ${
            loginErrors.password ? "border-red-500" : ""
          }`}
          required
        />
        {loginErrors.password && (
          <p className="text-red-500 text-xs mt-1">{loginErrors.password}</p>
        )}
      </div>

      <div className="text-right">
        {/* <a href="#" className="text-blue-600 text-sm hover:underline">
          Forgot password?
        </a> */}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
