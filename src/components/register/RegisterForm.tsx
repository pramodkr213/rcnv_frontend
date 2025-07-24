import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { RegisterStudentRequest } from "../../api/auth/request/RegistrationStudentRequest";
import { useAuth } from "../../context/jobility/AuthContext";
import { useError } from "../../ErrorContext";
import { validateRegister } from "../../utils/FormValidation";
import { ToastMessage } from "../../utils/toast";

const RegisterForm = () => {
  const [formData, setFormData] = useState<RegisterStudentRequest>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
  });

  const navigate = useNavigate();
  const { registerStudent } = useAuth();

  const { errors, setFormErrors } = useError();

  const registerErrors = errors.register;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateRegister(formData, setFormErrors)) {
      toast.error("Fill the required details");
      return;
    }

    try {
      await ToastMessage.promise(registerStudent(formData), {
        loading: "Registering in...",
        success: "Register successful!",
        error: "Failed to register",
      });
      navigate("/");
    } catch (error) {
      console.log("Failed to register", error);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div>
        <label className="text-sm font-medium text-gray-800">Email</label>
        <input
          type="email"
          name="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          className={`w-full border px-4 py-2 rounded-md mt-1 text-sm outline-blue-500 ${
            registerErrors.email && "border-red-500"
          }`}
          required
        />
        {registerErrors.email && (
          <p className="text-xs text-red-500">{registerErrors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="text-sm font-medium text-gray-800">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Must be at least 6 characters"
          value={formData.password}
          onChange={handleChange}
          className={`w-full border px-4 py-2 rounded-md mt-1 text-sm outline-blue-500 ${
            registerErrors.password && "border-red-500"
          }`}
          required
        />
        {registerErrors.password && (
          <p className="text-xs text-red-500">{registerErrors.password}</p>
        )}
      </div>

      {/* Name Fields */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-800">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full border px-4 py-2 rounded-md mt-1 text-sm outline-blue-500 ${
              registerErrors.firstName && "border-red-500"
            }`}
            required
          />
          {registerErrors.firstName && (
            <p className="text-xs text-red-500">{registerErrors.firstName}</p>
          )}
        </div>
        <div className="w-1/2">
          <label className="text-sm font-medium text-gray-800">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full border px-4 py-2 rounded-md mt-1 text-sm outline-blue-500 ${
              registerErrors.lastName && "border-red-500"
            }`}
            required
          />
          {registerErrors.lastName && (
            <p className="text-xs text-red-500">{registerErrors.lastName}</p>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div>
        <label className="text-sm font-medium text-gray-800">
          Mobile Number
        </label>
        <input
          type="tel"
          name="mobile"
          placeholder="10-digit mobile number"
          value={formData.mobile}
          onChange={handleChange}
          className={`w-full border px-4 py-2 rounded-md mt-1 text-sm outline-blue-500 ${
            registerErrors.mobile && "border-red-500"
          }`}
          required
        />
        {registerErrors.mobile && (
          <p className="text-xs text-red-500">{registerErrors.mobile}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#0047ab] text-white font-semibold py-2 rounded-md hover:bg-[#003a8c] transition"
      >
        Sign up
      </button>
    </form>
  );
};

export default RegisterForm;
