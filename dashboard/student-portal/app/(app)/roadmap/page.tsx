"use client";
import { CheckCircle, Lock, ExternalLink } from "lucide-react";
import Link from "next/link";

const weeks = [
  { n: 1, topic: "Arrays & Strings", status: "done", xp: "80 XP" },
  { n: 2, topic: "Binary Search", status: "done", xp: "60 XP" },
  { n: 3, topic: "Dynamic Programming", status: "active", xp: "3/8" },
  { n: 4, topic: "Trees", status: "locked", xp: "" },
  { n: 5, topic: "Graphs", status: "locked", xp: "" },
  { n: 6, topic: "Linked Lists", status: "locked", xp: "" },
  { n: 7, topic: "Stacks & Queues", status: "locked", xp: "" },
  { n: 8, topic: "Heap & Priority Queue", status: "locked", xp: "" },
  { n: 9, topic: "System Design HLD", status: "locked", xp: "" },
  { n: 10, topic: "System Design LLD", status: "locked", xp: "" },
  { n: 11, topic: "SQL & DBMS", status: "locked", xp: "" },
  { n: 12, topic: "Mock Interviews", status: "locked", xp: "" },
];

const problems = [
  { n: 1, title: "Climbing Stairs", diff: "Easy", xp: 10, done: true },
  { n: 2, title: "House Robber", diff: "Medium", xp: 20, done: true },
  { n: 3, title: "Jump Game", diff: "Medium", xp: 20, done: true },
  { n: 4, title: "Coin Change", diff: "Medium", xp: 20, done: false },
  { n: 5, title: "Longest Common Subsequence", diff: "Medium", xp: 20, done: false },
  { n: 6, title: "0/1 Knapsack", diff: "Hard", xp: 30, done: false },
  { n: 7, title: "Edit Distance", diff: "Hard", xp: 30, done: false },
  { n: 8, title: "Maximum Subarray", diff: "Easy", xp: 10, done: false },
];

export default function RoadmapPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-5">My Roadmap</h1>

      {/* Summary bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap items-center gap-4 mb-6">
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">Google SDE-1</span>
        <span className="text-sm font-medium text-gray-700">Week 3 of 12</span>
        <div className="flex-1 flex items-center gap-3 min-w-40">
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-blue-500 rounded-full w-1/4" />
          </div>
          <span className="text-sm text-gray-500">25%</span>
        </div>
        <span className="text-sm text-gray-500">68 days remaining</span>
      </div>

      {/* Current Week */}
      <div className="border-2 border-blue-500 rounded-xl p-6 mb-6 bg-blue-50/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold bg-blue-500 text-white rounded px-2 py-1">This Week</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mt-2">Week 3 — Dynamic Programming</h2>
        <p className="text-sm text-gray-500 mt-1">8 problems · 40 XP available</p>
        <p className="text-sm text-blue-600 font-medium mt-1">3/8 completed</p>

        <div className="mt-5 space-y-2">
          {problems.map((p) => (
            <div key={p.n} className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${p.done ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}>
                {p.done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
              </div>
              <span className={`flex-1 text-sm ${p.done ? "line-through text-gray-400" : "text-gray-900 font-medium"}`}>
                {p.title}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                p.diff === "Easy" ? "bg-green-50 text-green-700" :
                p.diff === "Medium" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-600"
              }`}>{p.diff}</span>
              <span className="text-xs text-amber-600 font-medium">+{p.xp} XP</span>
              <a
                href={`https://leetcode.com/problems/${p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}/`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${p.title} on LeetCode`}
              >
                <ExternalLink className="w-4 h-4 text-blue-400 hover:text-blue-600 cursor-pointer" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Week Grid */}
      <h2 className="text-base font-semibold text-gray-900 mb-4">All Weeks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {weeks.map((w) => (
          <div
            key={w.n}
            className={`border rounded-xl p-4 ${
              w.status === "done" ? "bg-green-50 border-green-200" :
              w.status === "active" ? "bg-blue-50 border-blue-500 border-2" :
              "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500">WEEK {w.n}</span>
              {w.status === "done" && <CheckCircle className="w-4 h-4 text-green-600" />}
              {w.status === "locked" && <Lock className="w-4 h-4 text-gray-300" />}
              {w.status === "active" && <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
            </div>
            <div className="font-semibold text-gray-900 text-sm">{w.topic}</div>
            <div className={`text-xs mt-1 ${
              w.status === "done" ? "text-green-600" :
              w.status === "active" ? "text-blue-600" : "text-gray-400"
            }`}>
              {w.status === "done" ? `Completed · ${w.xp}` :
               w.status === "active" ? `In Progress · ${w.xp}` : "Locked"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
