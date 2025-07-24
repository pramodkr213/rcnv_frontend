import type { RegisterStudentRequest } from "../api/auth/request/RegistrationStudentRequest.ts";
import type { LoginRequest } from "../api/auth/request/LoginRequest.ts";
import type { EmployerRegistrationRequest } from "../api/auth/request/EmployerRegistrationRequest.ts";
import type { CompanyRegistrationRequest } from "../api/auth/request/CompanyRegistrationRequest.ts";
import type { Post } from "../types/Post.ts";
import type { ErrorsState } from "../ErrorContext.tsx";

type FormErrors = (
  form: keyof ErrorsState,
  newErrors: Record<string, string>
) => void;

export const validateLogin = (
  formData: LoginRequest,
  setFormErrors: FormErrors
) => {
  const newErrors = { email: "", password: "" };
  const { email, password } = formData;
  let isValid = true;

  if (!email) {
    newErrors.email = "Email is required.";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    newErrors.email = "Invalid email format.";
    isValid = false;
  }

  if (!password) {
    newErrors.password = "Password is required.";
    isValid = false;
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters.";
    isValid = false;
  }

  setFormErrors("login", newErrors);
  return isValid;
};

export const validateAdminLogin = (
  formData: LoginRequest,
  captcha: string | null,
  setFormErrors: FormErrors
) => {
  const newErrors = { email: "", password: "", captcha: "" };
  const { email, password } = formData;
  let isValid = true;
  if (!email) {
    newErrors.email = "Email is required.";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    newErrors.email = "Invalid email format.";
    isValid = false;
  }

  if (!password) {
    newErrors.password = "Password is required.";
    isValid = false;
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters.";
    isValid = false;
  }

  // if (!captcha) {
  //   isValid = false;
  //   newErrors.captcha = "Verify the captcha";
  // }

  setFormErrors("adminLogin", newErrors);
  return isValid;
};

export const validateRegister = (
  formData: RegisterStudentRequest,
  setFormErrors: FormErrors
) => {
  const errs = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  let isValid = true;

  if (!formData.email || !emailRegex.test(formData.email)) {
    errs.email = "Enter a valid email";
    isValid = false;
  }

  if (!formData.password || formData.password.length < 6) {
    errs.password = "Password must be at least 6 characters";
    isValid = false;
  }

  if (!formData.firstName) {
    errs.firstName = "First name is required";
    isValid = false;
  }
  if (!formData.lastName) {
    errs.lastName = "Last name is required";
    isValid = false;
  }

  if (!formData.mobile || !phoneRegex.test(formData.mobile)) {
    errs.mobile = "Enter a valid 10-digit mobile number";
    isValid = false;
  }

  setFormErrors("register", errs);
  return isValid;
};

export const validateEmployerRegister = (
  formData: EmployerRegistrationRequest,
  setFormErrors: FormErrors
) => {
  const newErrors: { [key: string]: string } = {};
  let isValid = true;

  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Valid email is required";
    isValid = false;
  }

  if (!formData.password || formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
    isValid = false;
  }

  if (!formData.firstName) {
    newErrors.firstName = "First name is required";
    isValid = false;
  }
  if (!formData.lastName) {
    newErrors.lastName = "Last name is required";
    isValid = false;
  }
  if (!formData.designation) {
    newErrors.designation = "Designation is required";
    isValid = false;
  }
  if (!formData.mobile || !/^[0-9]{10}$/.test(formData.mobile)) {
    newErrors.mobile = "Enter valid 10-digit mobile number";
    isValid = false;
  }
  setFormErrors("employerRegister", newErrors);
  return isValid;
};

export const validateCompanyRegister = (
  formData: CompanyRegistrationRequest,
  setFormErrors: FormErrors
): boolean => {
  const newErrors: { [key: string]: string } = {};
  let isValid = true;

  // Check required fields
  ["name", "description", "city", "industry", "employees"].forEach((field) => {
    if (!formData[field as keyof typeof formData]?.toString().trim()) {
      newErrors[field] = "This field is required";
      isValid = false;
    }
  });

  // Verification validation
  if (formData.noDocs) {
    if (!formData.verification) {
      newErrors.verification = "Please provide valid verification details";
      isValid = false;
    } else if (
      (formData.verification === "social" && !formData.socialLink.trim()) ||
      (formData.verification === "website" && !formData.websiteLink.trim())
    ) {
      newErrors.verification = "Please provide valid verification details";
      isValid = false;
    }
  } else {
    if (formData.verification !== "docs") {
      newErrors.verification = "Please provide valid verification details";
      isValid = false;
    } else if (!formData.docFile) {
      newErrors.verification = "Please provide valid verification details";
      isValid = false;
    }
  }

  setFormErrors("companyRegister", newErrors);
  return isValid;
};

export const validatePost = (
  type: "job" | "internship",
  form: Post,
  setFormErrors: FormErrors
): boolean => {
  const errors: { [key: string]: string } = {};
  let isValid = true;

  if (type === "job") {
    if (!form.jobTitle.trim()) {
      errors.jobTitle = "Job Title is required";
      isValid = false;
    }
    if (!form.experienceType) {
      errors.experienceType = "Select experience type";
      isValid = false;
    }

    if (form.experienceType === "experienced") {
      if (!form.experienceMin) {
        errors.experienceMin = "Minimum experience required";
        isValid = false;
      }
      if (!form.experienceMax) {
        errors.experienceMax = "Maximum experience required";
        isValid = false;
      }
      if (
        form.experienceMin &&
        form.experienceMax &&
        Number(form.experienceMin) > Number(form.experienceMax)
      ) {
        errors.experienceMax = "Max experience must be greater than min";
        isValid = false;
      }
    }

    if (!form.skills.trim()) {
      errors.skills = "Skills are required";
      isValid = false;
    }
    if (!form.jobType) {
      errors.jobType = "Select job type";
      isValid = false;
    }
    if (
      (form.jobType === "Hybrid" || form.jobType === "In-Office") &&
      !form.jobCity.trim()
    ) {
      errors.jobCity = "City is required";
      isValid = false;
    }
    if (form.jobType === "Hybrid" && !form.jobDays) {
      errors.jobDays = "Select number of days";
      isValid = false;
    }

    if (!form.timeType) {
      errors.timeType = "Select full-time or part-time";
      isValid = false;
    }
    const jobOpenings = Number(form.openings);
    if (!form.openings || isNaN(jobOpenings) || jobOpenings <= 0) {
      errors.openings = "Enter a valid number of openings";
      isValid = false;
    }
    if (!form.description.trim()) {
      errors.description = "Job description is required";
      isValid = false;
    }
    if (!form.lastApplyDateJob.trim()) {
      errors.lastApplyDateJob = "last apply date is required";
      isValid = false;
    }
    if (!form.salaryMin || !form.salaryMax) {
      errors.salary = "Enter salary range";
      isValid = false;
    }
  }

  if (type === "internship") {
    if (!form.internshipTitle.trim()) {
      errors.internshipTitle = "Internship title is required";
      isValid = false;
    }
    if (!form.internshipSkills.trim()) {
      errors.internshipSkills = "Skills are required";
      isValid = false;
    }
    if (!form.internshipType) {
      errors.internshipType = "Select internship type";
      isValid = false;
    }
    if (
      (form.internshipType === "Hybrid" ||
        form.internshipType === "In-Office") &&
      !form.internshipCity.trim()
    ) {
      errors.internshipCity = "City is required";
      isValid = false;
    }
    if (form.internshipType === "Hybrid" && !form.internshipDays) {
      errors.internshipDays = "Select number of in-office days";
      isValid = false;
    }
    if (!form.internshipTime) {
      errors.internshipTime = "Select full-time or part-time";
      isValid = false;
    }
    const internshipOpenings = Number(form.internshipOpenings);
    if (
      !form.internshipOpenings ||
      isNaN(internshipOpenings) ||
      internshipOpenings <= 0
    ) {
      errors.internshipOpenings = "Enter a valid number of openings";
      isValid = false;
    }
    if (form.internshipStart === "later") {
      if (!form.startDateFrom || !form.startDateTo) {
        errors.internshipStartDate = "Select both start dates";
        isValid = false;
      } else if (form.startDateFrom > form.startDateTo) {
        errors.internshipStartDate = "End date must be after start date";
        isValid = false;
      }
    }
    if (!form.duration || !form.durationUnit) {
      errors.duration = "Select duration";
      isValid = false;
    }
    if (!form.responsibilities.trim()) {
      errors.responsibilities = "Responsibilities are required";
      isValid = false;
    }
    if (!form.lastApplyDateInternship.trim()) {
      errors.lastApplyDateInternship = "Last apply date is are required";
      isValid = false;
    }

    if (!form.stipendType) {
      errors.stipendType = "Select stipend type";
      isValid = false;
    } else if (
      form.stipendType === "Paid" &&
      (!form.stipendMin || !form.stipendMax)
    ) {
      errors.stipend = "Enter stipend range";
      isValid = false;
    }
  }

  setFormErrors("post", errors);
  return isValid;
};
