"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Shield className="w-7 h-7 text-blue-600" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">Create your account</h1>
        <p className="text-sm text-gray-500 text-center mb-8">Join PlacePrep and start your prep journey</p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="NST Email (.edu.in)"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Batch Year</label>
              <select className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>2022</option>
                <option selected>2023</option>
                <option>2024</option>
                <option>2025</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Branch</label>
              <select className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>CS</option>
                <option selected>CS-AI</option>
                <option>ECE</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={() => router.push("/onboarding/step1")}
          className="w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors mt-6"
        >
          Create Account →
        </button>

        <p className="text-sm text-gray-500 text-center mt-5">
          Already registered?{" "}
          <Link href="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
