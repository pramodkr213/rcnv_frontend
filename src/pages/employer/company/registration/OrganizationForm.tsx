import React, { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { validateCompanyRegister } from "../../../../utils/FormValidation";
import type { CompanyRegistrationRequest } from "../../../../api/auth/request/CompanyRegistrationRequest";
import { useNavigate } from "react-router-dom";
import { getDecryptedAuthCookie } from "../../../../utils/cookieCrypto";
import { useError } from "../../../../ErrorContext";
import { useAuth } from "../../../../context/jobility/AuthContext";
import { ToastMessage } from "../../../../utils/toast";

const OrganizationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    city: "",
    industry: "",
    employees: "",
    logo: null,
    verification: "",
    noDocs: false,
    docFile: null,
    socialLink: "",
    websiteLink: "",
  });

  const user = getDecryptedAuthCookie();

  const { errors, setFormErrors } = useError();

  const { registerCompany } = useAuth();

  const navigate = useNavigate();

  const companyErrors = errors.companyRegister;

  useEffect(() => {
    if (!user?.isAuthenticated) {
      navigate("/");
    } else if (!user?.isEmailVerified) {
      navigate("/registration/employer/verify-email");
    } else if (user?.hasCompany) {
      navigate("/employer/dashboard");
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      if (name === "noDocs") {
        setFormData((prev) => ({
          ...prev,
          noDocs: target.checked,
          verification: "",
          socialLink: "",
          websiteLink: "",
          docFile: null,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: target.checked,
        }));
      }
    } else if (type === "file") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: target.files?.[0] || null,
      }));
    } else if (type === "radio") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        verification: target.value,
        // clear dependent inputs on verification change
        socialLink: target.value === "social" ? prev.socialLink : "",
        websiteLink: target.value === "website" ? prev.websiteLink : "",
        docFile: target.value === "docs" ? prev.docFile : null,
      }));
    } else {
      const target = e.target as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement;
      setFormData((prev) => ({
        ...prev,
        [name]: target.value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateCompanyRegister(formData, setFormErrors)) {
      try {
        await ToastMessage.promise(
          registerCompany(formData as CompanyRegistrationRequest),
          {
            loading: "Registering company...",
            success: "Registration successful!",
            error: "Failed to add company",
          }
        );
        setFormErrors("companyRegister", {});
        window.location.href = "/employer/dashboard";
      } catch (error) {
        console.log("Failed to register company", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-12 px-4 py-8"
      noValidate
    >
      {/* Section 1: Organization Details */}
      <div className="space-y-6 p-6 border border-gray-300  rounded-lg shadow-sm bg-white">
        <h2 className="text-2xl font-semibold">Organization details</h2>

        <div>
          <label className="block text-sm font-medium mb-1">
            Organization name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Organization Name"
            className={`w-full border px-3 py-2 rounded-md focus:outline-none ${
              companyErrors.name
                ? "border-red-500"
                : "border-gray-400 focus:border-blue-600"
            }`}
            onChange={handleChange}
          />
          {companyErrors.name && (
            <p className="text-sm text-red-500 mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Organization description
          </label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            className={`w-full border px-3 py-2 rounded-md focus:outline-none ${
              companyErrors.description
                ? "border-red-500"
                : "border-gray-400 focus:border-blue-600"
            }`}
            onChange={handleChange}
            required
          />
          {companyErrors.description && (
            <p className="text-sm text-red-500 mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Organization city
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            placeholder="e.g. Mumbai"
            className={`w-full border px-3 py-2 rounded-md focus:outline-none ${
              companyErrors.city
                ? "border-red-500"
                : "border-gray-400 focus:border-blue-600"
            }`}
            onChange={handleChange}
            required
          />
          {companyErrors.city && (
            <p className="text-sm text-red-500 mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Industry</label>
          <select
            name="industry"
            className={`w-full border px-3 py-2 rounded-md focus:outline-none ${
              companyErrors.industry
                ? "border-red-500"
                : "border-gray-400 focus:border-blue-600"
            }`}
            onChange={handleChange}
            value={formData.industry}
            required
          >
            <option value="">Select industry</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
          </select>
          {companyErrors.industry && (
            <p className="text-sm text-red-500 mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            No. of employees
          </label>
          <select
            name="employees"
            className={`w-full border px-3 py-2 rounded-md focus:outline-none ${
              companyErrors.employees
                ? "border-red-500"
                : "border-gray-400 focus:border-blue-600"
            }`}
            onChange={handleChange}
            value={formData.employees}
            required
          >
            <option value="">Select an option</option>
            <option value="1-10">1-10</option>
            <option value="10-50">10-50</option>
            <option value="50+">50+</option>
          </select>
          {companyErrors.employees && (
            <p className="text-sm text-red-500 mt-1">This field is required</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Organization logo{" "}
            <span className="text-gray-500">(Recommended)</span>
          </label>
          <div className="border border-dashed border-blue-400 p-3 rounded-md flex items-center gap-2">
            <Upload className="text-blue-600" />
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Max file size: 1Mb and max resolution: 500px x 500px. File type:
            jpeg, jpg, png, gif, bmp
          </p>
        </div>
      </div>

      {/* Section 2: Organization Verification */}
      <div className="space-y-6 border border-gray-300 p-6 rounded shadow-sm bg-white">
        <h2 className="text-2xl font-semibold">Organization verification</h2>

        <p className="text-sm text-gray-600">
          Get your organization verified by submitting the below mentioned
          details and start posting internships/jobs.
        </p>

        <div className="space-y-4">
          {/* Official documents option */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="radio"
              name="verification"
              value="docs"
              checked={formData.verification === "docs"}
              onChange={handleChange}
              disabled={formData.noDocs}
            />
            <span>
              <strong>Official company documents</strong>
              <br />
              <span className="text-sm text-gray-600">
                Verify using any government-issued business registration
                document
              </span>
            </span>
          </label>

          {/* File upload input (only if "docs" selected and noDocs is false) */}
          {formData.verification === "docs" && !formData.noDocs && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Upload document
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.png"
                className="block border border-gray-400 rounded-md focus:outline-none focus:border-blue-600 px-3 py-2"
                name="docFile"
                onChange={handleChange}
              />
            </div>
          )}

          {/* Checkbox for not having documents */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="noDocs"
              checked={formData.noDocs}
              onChange={handleChange}
            />
            <span className="text-sm flex justify-center items-center font-medium">
              I do not have required documents
            </span>
          </label>

          {/* Conditional options if noDocs is true */}
          {formData.noDocs && (
            <div className="space-y-4">
              {/* Social media option */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="verification"
                  value="social"
                  checked={formData.verification === "social"}
                  onChange={handleChange}
                />
                <span>
                  <strong>Active social media page</strong>
                  <br />
                  <span className="text-sm text-gray-600">
                    Connect your LinkedIn or other social profile (min ~1000
                    followers)
                  </span>
                </span>
              </label>

              {/* Social media input */}
              {formData.verification === "social" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Social media link
                  </label>
                  <input
                    type="url"
                    name="socialLink"
                    placeholder="https://linkedin.com/company/example"
                    className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:border-blue-600"
                    value={formData.socialLink}
                    onChange={handleChange}
                    required={formData.verification === "social"}
                  />
                </div>
              )}

              {/* Website option */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="verification"
                  value="website"
                  checked={formData.verification === "website"}
                  onChange={handleChange}
                />
                <span>
                  <strong>Organization's website</strong>
                  <br />
                  <span className="text-sm text-gray-600">
                    Website should mention your organization name clearly on the
                    home/about page
                  </span>
                </span>
              </label>

              {/* Website input */}
              {formData.verification === "website" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Website URL
                  </label>
                  <input
                    type="url"
                    name="websiteLink"
                    placeholder="https://example.org"
                    className="w-full border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:border-blue-600"
                    value={formData.websiteLink}
                    onChange={handleChange}
                    required={formData.verification === "website"}
                  />
                </div>
              )}
            </div>
          )}

          {/* Error message for verification */}
          {companyErrors.verification && (
            <p className="text-sm text-red-500 mt-1">
              {companyErrors.verification}
            </p>
          )}
        </div>
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default OrganizationForm;
