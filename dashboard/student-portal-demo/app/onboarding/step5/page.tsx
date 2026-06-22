"use client";
import { useRouter } from "next/navigation";
import { Rocket, CheckCircle } from "lucide-react";

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3, 4, 5].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${s <= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>{s}</div>
          {s < 5 && <div className={`w-10 h-0.5 ${s < step ? "bg-blue-600" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  );
}

export default function Step5() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-12 text-center">
      <Stepper step={5} />
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <Rocket className="w-10 h-10 text-blue-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">You're all set, Pranay!</h1>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">Your personalized roadmap is ready. Here's what we've prepared based on your goals:</p>

      <div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-5 text-left space-y-3 mb-8">
        {[
          "12-Week SDE-1 Roadmap (Google + Amazon track)",
          "Daily practice plan — 4 hrs/day",
          "Pre-mapped 320 company-tagged questions",
          "Bi-weekly progress check-ins",
        ].map((item) => (
          <div key={item} className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">{item}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push("/dashboard")}
        className="w-full max-w-md bg-gray-900 text-white py-3 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
      >
        Launch My Dashboard 🚀
      </button>
    </div>
  );
}
