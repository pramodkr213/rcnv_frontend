import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Input from "../components/Input";
import ProcessingButton from "../components/ProcessingButton";
import { useNavigate } from "react-router-dom";
import { getDecryptedAuthCookie } from "../utils/cookieCrypto";
import { validateAdminLogin } from "../utils/FormValidation";
import type { LoginRequest } from "../api/auth/request/LoginRequest";
import { useError } from "../ErrorContext";
import { ToastMessage } from "../utils/toast";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../context/jobility/AuthContext";

const SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY;

export interface AdminLoginState {
  email: string;
  password: string;
  captcha: string | null;
}
const Login: React.FC = () => {
  const user = getDecryptedAuthCookie();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  const [form, setForm] = useState<AdminLoginState>({
    email: "",
    password: "",
    captcha: null,
  });

  const { login } = useAuth();

  const { errors, setFormErrors } = useError();

  const loginErrors = errors.adminLogin;

  const handleCaptchaChange = (token: string | null) => {
    setForm((prev) => ({
      ...prev,
      captcha: token,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      validateAdminLogin(
        { email: form.email, password: form.password },
        form.captcha,
        setFormErrors
      )
    ) {
      const loginReq: LoginRequest = {
        email: form.email,
        password: form.password,
      };

      setLoading(true);

      await ToastMessage.promise(login(loginReq, "ADMIN"), {
        loading: "Logging in....",
        success: "Login Successfull!",
        error: "Failed to login",
      });

      setFormErrors("adminLogin", {});

      navigate("/admin/dashboard");

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="bg-white rounded-md shadow-2xl p-10 w-full max-w-md flex flex-col items-center"
      >
        <motion.h2
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold mb-8 text-purple-700 tracking-wide"
        >
          Admin Login
        </motion.h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            icon={<FaUserAlt />}
            error={loginErrors.email}
          />
          <Input
            type="password"
            name="password"
            required
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            icon={<FaLock />}
            error={loginErrors.password}
          />
          {/* <div className="flex justify-center">
            <ReCAPTCHA sitekey={SITE_KEY} onChange={handleCaptchaChange} />
          </div> */}
          {loginErrors.captcha && (
            <p className="text-red-500 text-sm">{loginErrors.captcha}</p>
          )}
          <ProcessingButton type="submit" className="mt-4" processing={loading}>
            Login
          </ProcessingButton>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
