"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function SelfRatingPage() {
  const router = useRouter();
  const [ratings, setRatings] = useState({
    arrays: 5, dp: 3, trees: 6, sysDesign: 4, sql: 7, os: 5
  });
  const [time, setTime] = useState("12 weeks");

  const handleRatingChange = (key: string, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="text-xl font-bold text-gray-900">PlacePrep</div>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className={`h-1 w-6 rounded-full ${step === 3 ? "bg-gray-900" : "bg-gray-200"}`} />
            ))}
          </div>
        </div>

        {/* Titles */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Rate your topic-wise confidence</h1>
        <p className="text-gray-500 mb-8">This adjusts your roadmap difficulty</p>

        {/* Main Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-sm">
          <div className="space-y-6 mb-10">
            {[
              { id: "arrays", label: "Arrays & Strings" },
              { id: "dp", label: "Dynamic Programming" },
              { id: "trees", label: "Trees & Graphs" },
              { id: "sysDesign", label: "System Design" },
              { id: "sql", label: "SQL & DBMS" },
              { id: "os", label: "Operating Systems" },
            ].map((topic) => (
              <div key={topic.id} className="flex items-center">
                <div className="w-48 text-sm font-medium text-gray-900">{topic.label}</div>
                <div className="flex-1 px-4">
                  <input 
                    type="range" min="1" max="10" step="1"
                    value={ratings[topic.id as keyof typeof ratings]}
                    onChange={(e) => handleRatingChange(topic.id, parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                <div className="w-8 text-right text-blue-600 font-medium">
                  {ratings[topic.id as keyof typeof ratings]}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-8 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">How much time do you have?</h3>
            <div className="flex gap-3">
              {["4 weeks", "8 weeks", "12 weeks", "16 weeks", "24 weeks"].map((duration) => (
                <button
                  key={duration}
                  onClick={() => setTime(duration)}
                  className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                    time === duration ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => router.push("/onboarding/step4")}
            className="w-full bg-black text-white rounded-lg py-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
          >
            Generate My Roadmap <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button 
          onClick={() => router.push("/onboarding/step2")}
          className="mx-auto flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to previous step
        </button>
      </div>
    </div>
  );
}
