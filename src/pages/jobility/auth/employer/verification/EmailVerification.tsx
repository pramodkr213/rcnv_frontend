import React, { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getDecryptedAuthCookie,
  setEncryptedAuthCookie,
} from "../../../../../utils/cookieCrypto";
import { useAuth } from "../../../../../context/jobility/AuthContext";
import { ToastMessage } from "../../../../../utils/toast";
import { verifyEmailApi } from "../../../../../api/auth/Auth";

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const user = getDecryptedAuthCookie();
  const { setUser, handleSendOtp } = useAuth();

  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(30);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.isAuthenticated) {
      navigate("/");
    } else if (!user?.isEmailVerified) {
      handleSendOtp(user?.email);
    } else {
      navigate("/registration/organization");
    }
  }, []);

  useEffect(() => {
    const timer =
      counter > 0 ? setTimeout(() => setCounter(counter - 1), 1000) : undefined;
    return () => clearTimeout(timer);
  }, [counter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setError("Please enter a valid 6-digit numeric OTP.");
      return;
    }

    setError("");

    try {
      await ToastMessage.promise(verifyEmailApi({ email: user?.email, otp }), {
        loading: "Verifying email...",
        success: "Email verified successfully!...",
        error: "Failed to verify email",
      });
      const updatedUser = { ...user, isEmailVerified: true };
      setUser(updatedUser);
      setEncryptedAuthCookie(updatedUser);
      navigate("/registration/employer/organization");
    } catch (error) {
      console.log("Failed to verify", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fd] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 rounded-full p-3">
            <Mail className="text-white w-8 h-8" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">Verify your Email</h2>
        <p className="text-sm text-gray-600 mb-6">
          One time password (OTP) has been sent on <br />
          <span className="font-medium">{user?.email}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="otp" className="sr-only">
            Enter the OTP to verify your email
          </label>
          <input
            type="text"
            id="otp"
            maxLength={6}
            placeholder="Enter 6 digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button
            type="submit"
            disabled={otp.length !== 6}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold w-full py-3 rounded transition"
          >
            Verify Email
          </button>
        </form>

        {counter > 0 ? (
          <p className="text-sm text-gray-600 mt-4">
            Resend code in {counter} second{counter !== 1 ? "s" : ""}
          </p>
        ) : (
          <button
            onClick={() => {
              handleSendOtp(user?.email);
              setCounter(30);
            }}
            className="mt-4 text-sm text-blue-700 font-medium hover:underline"
          >
            Resend OTP
          </button>
        )}

        <p className="text-xs text-gray-400 mt-2">
          Can’t find our email? Check your spam folder or promotions tab too!
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
