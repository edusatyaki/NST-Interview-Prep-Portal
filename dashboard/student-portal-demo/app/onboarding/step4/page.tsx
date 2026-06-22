"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Timer, ArrowRight, Code } from "lucide-react";

export default function AssessmentQuizPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const options = [
    { id: "A", text: "O(1)" },
    { id: "B", text: "O(log n)" },
    { id: "C", text: "O(n)" },
    { id: "D", text: "O(n log n)" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center pt-16 px-4">
      {/* Top Loader */}
      <div className="w-6 h-6 border-4 border-blue-200 border-t-blue-500 rounded-full mb-8" />
      
      <h1 className="text-xl font-medium text-gray-900 mb-2">Let's assess your current level</h1>
      <p className="text-sm text-gray-500 mb-12">5 quick questions from your selected domain</p>

      <div className="w-full max-w-2xl flex justify-between text-sm text-gray-600 mb-4">
        <span>Question 2 of 5</span>
        <span>40% completed</span>
      </div>

      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        {/* Header inside card */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
            <Code className="w-4 h-4" /> Arrays
          </div>
          <div className="flex items-center gap-1.5 border border-gray-200 rounded-md px-3 py-1.5 text-sm font-semibold text-gray-800">
            <Timer className="w-4 h-4" /> 42s
          </div>
        </div>

        {/* Question */}
        <h2 className="text-lg text-gray-900 mb-8 leading-relaxed">
          What is the time complexity of searching for an element in a balanced Binary Search Tree (BST)?
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-10">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`w-full flex items-center gap-4 p-4 border rounded-xl text-left transition-colors ${
                selected === opt.id ? "border-blue-500 ring-1 ring-blue-500 bg-blue-50/30" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <div className={`w-6 h-6 flex items-center justify-center rounded text-xs font-bold ${
                selected === opt.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}>
                {opt.id}
              </div>
              <span className="text-gray-800 font-medium">{opt.text}</span>
            </button>
          ))}
        </div>

        {/* Footer actions */}
        <div className="border-t border-gray-100 pt-6 flex justify-between items-center">
          <button 
            className="text-gray-500 text-sm hover:text-gray-900 transition-colors"
          >
            Skip this question
          </button>
          <button 
            onClick={() => router.push("/onboarding/step5")}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-900 text-sm font-medium transition-colors"
          >
            Next Question <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
