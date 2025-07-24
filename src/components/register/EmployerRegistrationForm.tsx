import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/jobility/AuthContext";
import { useError } from "../../ErrorContext";
import { validateEmployerRegister } from "../../utils/FormValidation";
import { ToastMessage } from "../../utils/toast";

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  designation: string;
  mobile: string;
}

const EmployerRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormValues>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    designation: "",
    mobile: "",
  });

  const navigate = useNavigate();

  const { registerEmployer, handleSendOtp } = useAuth();

  const { errors, setFormErrors } = useError();

  const employerRegisterErrors = errors.employerRegister;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmployerRegister(formData, setFormErrors)) {
      ToastMessage.error("Fill the required details");
      return;
    }

    try {
      await ToastMessage.promise(registerEmployer(formData), {
        loading: "Registering in...",
        success:
          "Register successful! Otp Send to your official email id. Please check your inbox.",
        error: "failed to register!!",
      });
      handleSendOtp(formData.email);
      navigate("/registration/employer/verify-email");
    } catch (error) {
      console.log("Failed to register", error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Official Email Id
        </label>
        <input
          name="email"
          type="email"
          placeholder="name@company.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {employerRegisterErrors.email && (
          <p className="text-xs text-red-600 mt-1">
            {employerRegisterErrors.email}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="Minimum 6 characters"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {employerRegisterErrors.password && (
          <p className="text-xs text-red-600 mt-1">
            {employerRegisterErrors.password}
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            name="firstName"
            type="text"
            placeholder="Your First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {employerRegisterErrors.firstName && (
            <p className="text-xs text-red-600 mt-1">
              {employerRegisterErrors.firstName}
            </p>
          )}
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            placeholder="Your Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {employerRegisterErrors.lastName && (
            <p className="text-xs text-red-600 mt-1">
              {employerRegisterErrors.lastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Designation
        </label>
        <input
          name="designation"
          type="text"
          placeholder="Your Designation"
          value={formData.designation}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {employerRegisterErrors.designation && (
          <p className="text-xs text-red-600 mt-1">
            {employerRegisterErrors.designation}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Number
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-100 text-gray-600 rounded-l-md text-sm">
            +91
          </span>
          <input
            name="mobile"
            type="tel"
            placeholder="Enter Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-r-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {employerRegisterErrors.mobile && (
          <p className="text-xs text-red-600 mt-1">
            {employerRegisterErrors.mobile}
          </p>
        )}
      </div>

      <p className="text-xs text-gray-600 mt-2">
        By clicking on{" "}
        <span className="font-semibold text-black">Post for Free</span>, you
        agree to our{" "}
        <span className="text-blue-600 underline cursor-pointer">T&C.</span>
      </p>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 text-sm"
      >
        Post for Free
      </button>

      <p className="text-sm text-center mt-4">
        Already Registered?{" "}
        <span className="text-blue-600 underline cursor-pointer">Login</span>
      </p>
    </form>
  );
};

export default EmployerRegistrationForm;
