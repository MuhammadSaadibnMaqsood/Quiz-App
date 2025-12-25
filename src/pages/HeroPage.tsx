import React from "react";
import { Button } from "antd";
import {
  LoginOutlined,
  UserAddOutlined,
  ThunderboltOutlined,
  FireOutlined,
  CrownOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const HeroPage = () => {
  const handleLogin = () => {
    console.log("Navigate to login");
    // window.location.href = '/login';
  };

  const handleSignup = () => {
    console.log("Navigate to signup");
    // window.location.href = '/signup';
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
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
      <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl"></div>

      {/* Animated lines */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-white to-transparent top-1/4 animate-pulse"></div>
        <div
          className="absolute h-px w-full bg-gradient-to-r from-transparent via-white to-transparent top-3/4 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Floating icons */}
        <div className="flex justify-center gap-12 mb-12">
          <div className="relative">
            <ThunderboltOutlined className="text-6xl text-white animate-pulse" />
            <div className="absolute inset-0 blur-xl bg-white opacity-30"></div>
          </div>
          <div className="relative">
            <CrownOutlined className="text-7xl text-white" />
            <div className="absolute inset-0 blur-xl bg-white opacity-30"></div>
          </div>
          <div className="relative">
            <FireOutlined
              className="text-6xl text-white animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div className="absolute inset-0 blur-xl bg-white opacity-30"></div>
          </div>
        </div>

        {/* Main heading */}
        <div className="mb-8">
          <div className="text-sm tracking-widest text-gray-400 mb-4 font-semibold uppercase">
            Saylani Mass IT Training
          </div>
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter leading-none">
            QUIZ
            <span className="block mt-2">ARENA</span>
          </h1>
          <div className="h-1 w-40 mx-auto bg-white"></div>
        </div>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl text-gray-300 mb-6 font-light tracking-wide">
          Where Knowledge Meets Victory
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <Link to={"/login"}>
            <Button
              size="large"
              icon={<UserAddOutlined />}
              onClick={handleSignup}
              className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-black h-16 px-12 text-xl font-bold tracking-wide transform transition-all hover:scale-105"
              style={{ borderRadius: "0" }}
            >
              JOIN NOW
            </Button>
          </Link>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 border-t border-gray-800">
          <div className="text-center group">
            <div className="text-5xl font-black text-white mb-3 group-hover:scale-110 transition-transform">
              10K+
            </div>
            <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
              Players
            </div>
          </div>
          <div className="text-center group">
            <div className="text-5xl font-black text-white mb-3 group-hover:scale-110 transition-transform">
              5K+
            </div>
            <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
              Quizzes
            </div>
          </div>
          <div className="text-center group">
            <div className="text-5xl font-black text-white mb-3 group-hover:scale-110 transition-transform">
              100+
            </div>
            <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
              Topics
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-16 text-gray-600 text-sm tracking-widest uppercase">
          Battle • Compete • Conquer
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
