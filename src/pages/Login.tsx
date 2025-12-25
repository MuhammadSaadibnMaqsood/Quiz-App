import React, { useState } from "react";
import { Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  ArrowLeftOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
  auth?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    const newErrors: Errors = {};

    if (!formData.email) {
      newErrors.email = "Please input your email!";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email!";
    }

    if (!formData.password) {
      newErrors.password = "Please input your password!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({}); // Clear previous errors

    try {
      // Import supabase from your config
      const { default: supabase } = await import("../../config/supabaseClient");

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error("Supabase error:", error);
        setErrors({ auth: error.message });
        setLoading(false);
        return;
      }

      if (data?.user) {
        console.log("Login successful:", data.user);
        setTimeout(() => {
          setLoading(false);
          navigate("/topics");
        }, 500);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setErrors({ auth: error.message || "An unexpected error occurred" });
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="h-screen w-full flex bg-black relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Glowing orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl"></div>

      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative z-10 px-12">
        <div className="max-w-md">
          <div className="relative mb-6">
            <ThunderboltOutlined className="text-7xl text-white" />
            <div className="absolute inset-0 blur-2xl bg-white opacity-30"></div>
          </div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tighter leading-tight">
            WELCOME
            <span className="block mt-2">BACK</span>
          </h1>
          <div className="h-1 w-32 bg-white mb-6"></div>
          <p className="text-lg text-gray-400 leading-relaxed">
            Continue your journey to become the ultimate quiz champion. Your
            next victory awaits.
          </p>
          <div className="mt-8 space-y-3 text-gray-500 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white"></div>
              <span>Track your progress</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white"></div>
              <span>Compete on leaderboards</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white"></div>
              <span>Unlock achievements</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative z-10 p-6 overflow-y-auto">
        <div className="w-full max-w-md py-6">
          {/* Back button */}
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            className="text-white hover:text-gray-300 mb-6 text-sm"
            style={{ padding: 0 }}
          >
            Back to Home
          </Button>

          {/* Form container */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
                LOGIN
              </h2>
              <p className="text-gray-400 text-sm">
                Enter your credentials to continue
              </p>
            </div>

            {/* Auth Error Message */}
            {errors.auth && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {errors.auth}
              </div>
            )}

            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="text-white font-semibold block mb-2 text-sm">
                  EMAIL
                </label>
                <Input
                  prefix={<UserOutlined className="text-gray-400" />}
                  placeholder="your.email@example.com"
                  size="large"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onPressEnter={handleSubmit}
                  className="bg-black/50 border-white/20 text-white placeholder-gray-500 hover:border-white focus:border-white"
                  style={{
                    borderRadius: 0,
                    height: "45px",
                  }}
                />
                {errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="text-white font-semibold block mb-2 text-sm">
                  PASSWORD
                </label>
                <Input.Password
                  prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Enter your password"
                  size="large"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  onPressEnter={handleSubmit}
                  className="bg-black/50 border-white/20 text-white placeholder-gray-500 hover:border-white focus:border-white"
                  style={{
                    borderRadius: 0,
                    height: "45px",
                  }}
                />
                {errors.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="primary"
                size="large"
                loading={loading}
                onClick={handleSubmit}
                className="w-full bg-white text-black border-0 hover:bg-gray-200 font-bold text-base tracking-wide h-12 transform transition-all hover:scale-105 mt-2"
                style={{ borderRadius: 0 }}
              >
                LOGIN
              </Button>

              {/* Sign up link */}
              <div className="text-center text-sm">
                <span className="text-gray-400">Don't have an account? </span>
                <Link
                  to="/signup"
                  className="text-white hover:text-gray-300 font-bold underline ml-1"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile branding */}
          <div className="lg:hidden mt-8 text-center">
            <p className="text-gray-600 text-xs uppercase tracking-widest">
              SMIT Quiz Arena
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
