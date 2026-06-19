"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Target, Map as MapIcon, Compass } from "lucide-react";
import CompanySelector from "@/components/roadmap/CompanySelector";
import WeekAccordion from "@/components/roadmap/WeekAccordion";
import { UserRoadmapCompany, getPracticeQuestions } from "@/lib/api";
import { Question } from "@/lib/mock-data";

// Mock helper to generate roadmap data for a company
async function generateCompanyRoadmap(slug: string, name: string): Promise<UserRoadmapCompany> {
  const qs = await getPracticeQuestions({ company: name });
  
  // Distribute questions into weeks
  const weeks = [];
  const qPerWeek = 5;
  const numWeeks = Math.ceil(qs.length / qPerWeek) || 1;
  
  for (let i=0; i<numWeeks; i++) {
    const wQs = qs.slice(i * qPerWeek, (i+1) * qPerWeek);
    weeks.push({
      weekNumber: i + 1,
      topic: wQs[0]?.topic || "Mixed Practice",
      totalQuestions: wQs.length,
      doneQuestions: i === 0 ? Math.floor(wQs.length / 2) : 0,
      status: i === 0 ? "active" : i < 0 ? "done" : "locked",
      questions: wQs
    });
  }

  // Set the first week to active, others locked
  if (weeks.length > 0) {
    weeks[0].status = "active";
  }

  return {
    slug,
    name,
    role: "SDE-1",
    totalWeeks: numWeeks,
    currentWeek: 1,
    completedWeeks: 0,
    pctComplete: Math.floor((1 / (numWeeks * qPerWeek)) * 100) || 0,
    weeks: weeks as any
  };
}

function RoadmapContent() {
  const searchParams = useSearchParams();
  const initialCompany = searchParams.get("company") || "google";
  
  // Hardcode enrolled companies for now, later fetch from User profile
  const enrolledCompanies = [
    { slug: "google", name: "Google", role: "SDE-1" },
    { slug: "microsoft", name: "Microsoft", role: "Software Engineer" }
  ];

  const [activeSlug, setActiveSlug] = useState(initialCompany);
  const [roadmapData, setRoadmapData] = useState<UserRoadmapCompany | null>(null);

  useEffect(() => {
    const comp = enrolledCompanies.find(c => c.slug === activeSlug) || enrolledCompanies[0];
    if (comp) {
      generateCompanyRoadmap(comp.slug, comp.name).then(setRoadmapData);
    }
  }, [activeSlug]);

  if (!roadmapData) return <div className="p-12 text-center text-gray-500">Loading roadmap...</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">My Roadmap</h1>
        <p className="text-gray-500">Your personalized path to cracking the interview.</p>
      </div>

      <CompanySelector 
        companies={enrolledCompanies} 
        selectedSlug={activeSlug} 
        onSelect={setActiveSlug} 
      />

      {/* Progress Overview */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-blue-100 flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-blue-100" />
              <circle 
                cx="30" cy="30" r="28" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                className="text-blue-600" 
                strokeDasharray={`${(roadmapData.pctComplete / 100) * 176} 176`} 
              />
            </svg>
            <span className="text-sm font-bold text-gray-900">{roadmapData.pctComplete}%</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Overall Progress</h2>
            <p className="text-sm text-gray-500">{roadmapData.completedWeeks} of {roadmapData.totalWeeks} weeks completed</p>
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none bg-blue-50 px-4 py-3 rounded-lg flex items-center gap-3">
            <Target className="w-5 h-5 text-blue-600" />
            <div>
              <div className="text-xs text-blue-600 font-bold uppercase tracking-wider">Current</div>
              <div className="text-sm font-semibold text-gray-900">Week {roadmapData.currentWeek}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Weeks Timeline */}
      <div className="relative">
        <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gray-200 z-0 hidden md:block" />
        
        <div className="space-y-6 relative z-10">
          {roadmapData.weeks.map((week) => (
            <div key={week.weekNumber} className="flex flex-col md:flex-row gap-4">
              <div className="hidden md:flex flex-col items-center mt-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-white ${
                  week.status === "done" ? "bg-green-100 text-green-600" :
                  week.status === "active" ? "bg-blue-600 text-white shadow-lg shadow-blue-200" :
                  "bg-gray-100 text-gray-400"
                }`}>
                  <span className="font-bold">{week.weekNumber}</span>
                </div>
              </div>
              
              <div className="flex-1">
                <WeekAccordion 
                  week={week} 
                  isCurrent={week.weekNumber === roadmapData.currentWeek} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RoadmapPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading roadmap...</div>}>
      <RoadmapContent />
    </Suspense>
  );
}
