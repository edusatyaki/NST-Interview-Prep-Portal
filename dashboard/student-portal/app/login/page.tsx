"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Shield } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">Welcome back</h1>
        <p className="text-sm text-gray-500 text-center mb-8">Sign in to your PlacePrep account</p>

        {/* Email */}
        <div className="mb-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="email"
              placeholder="NST Email (.edu.in)"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Login button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          Sign In →
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google SSO */}
        <button className="w-full border border-gray-200 bg-white text-gray-700 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-3">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/>
            <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987z"/>
            <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21z"/>
            <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"/>
          </svg>
          Sign in with NST Google Account
        </button>

        {/* Register link */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
