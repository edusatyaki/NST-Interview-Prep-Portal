"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const allCompanies = ["Google", "Amazon", "Microsoft", "Flipkart", "TCS", "Infosys", "Razorpay", "Swiggy", "Paytm", "PhonePe", "Adobe", "Goldman Sachs", "Wipro", "Uber", "Atlassian"];

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

export default function Step2() {
  const [selected, setSelected] = useState<string[]>(["Google", "Amazon"]);
  const router = useRouter();

  const toggle = (c: string) => {
    if (selected.includes(c)) { setSelected(selected.filter((x) => x !== c)); return; }
    if (selected.length < 5) setSelected([...selected, c]);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-12">
      <Stepper step={2} />
      <p className="text-xs text-gray-400 mb-8">Step 2 of 4</p>
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Which companies are you targeting?</h1>
      <p className="text-sm text-gray-500 text-center mb-6">Select up to 5 companies</p>

      <div className="w-full max-w-lg relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input placeholder="Search companies..." className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="flex flex-wrap gap-3 justify-center w-full max-w-lg mb-3">
        {allCompanies.map((c) => {
          const isSelected = selected.includes(c);
          return (
            <button
              key={c}
              onClick={() => toggle(c)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                isSelected ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
      <p className="text-sm text-gray-400 mb-8">{selected.length} companies selected (max 5)</p>

      <div className="flex gap-3 w-full max-w-lg">
        <button onClick={() => router.push("/onboarding/step1")} className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg text-sm font-medium hover:bg-gray-50">Back</button>
        <button onClick={() => router.push("/onboarding/step3")} className="flex-1 bg-gray-900 text-white py-3 rounded-lg text-sm font-semibold hover:bg-gray-800">Continue</button>
      </div>
    </div>
  );
}
