"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, Lock, ExternalLink } from "lucide-react";
import { RoadmapWeek } from "@/lib/api";

interface WeekAccordionProps {
  week: RoadmapWeek;
  isCurrent: boolean;
}

export default function WeekAccordion({ week, isCurrent }: WeekAccordionProps) {
  const [open, setOpen] = useState(isCurrent || week.status === "done");
  const isLocked = week.status === "locked";

  return (
    <div className={`border rounded-xl overflow-hidden mb-3 transition-colors ${
      isLocked ? "bg-gray-50 border-gray-100 opacity-75" : "bg-white border-gray-200"
    }`}>
      {/* Header */}
      <button
        onClick={() => !isLocked && setOpen(!open)}
        disabled={isLocked}
        className={`w-full flex items-center justify-between px-5 py-4 ${
          !isLocked ? "hover:bg-gray-50 cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        <div className="flex items-center gap-3">
          {week.status === "done" ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : isLocked ? (
            <Lock className="w-5 h-5 text-gray-400" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-blue-500" />
          )}
          
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h3 className={`font-semibold text-sm ${isLocked ? "text-gray-500" : "text-gray-900"}`}>
                Week {week.weekNumber}: {week.topic}
              </h3>
              {isCurrent && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase">
                  Current
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {week.doneQuestions} / {week.totalQuestions} completed
            </p>
          </div>
        </div>
        
        {!isLocked && (
          open ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Content */}
      {open && !isLocked && (
        <div className="px-5 pb-4 border-t border-gray-100 pt-4">
          <div className="space-y-2">
            {week.questions.map((q) => (
              <div key={q.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <button className="text-gray-300 hover:text-green-500 transition-colors shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </button>
                  <div>
                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {q.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        q.diff === "Easy" ? "bg-green-50 text-green-700" :
                        q.diff === "Medium" ? "bg-amber-50 text-amber-700" :
                        "bg-red-50 text-red-600"
                      }`}>
                        {q.diff}
                      </span>
                      {q.frequency && (
                        <span className="text-[10px] text-gray-500">
                          {q.frequency}% frequency
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <a
                  href={q.leetcodeUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors shrink-0"
                >
                  Solve <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
