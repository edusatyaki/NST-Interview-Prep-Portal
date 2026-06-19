"use client";
import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, CheckCircle, XCircle, Zap, ExternalLink, X } from "lucide-react";
import {
  allQuestions, allTopics, allCompanySlugs, allRoundTypes,
  filterQuestions, type Difficulty, type RoundType,
} from "@/lib/mock-data";

const PAGE_SIZE = 15;

const diffBadge = (d: string) =>
  d === "Easy"   ? "bg-green-50 text-green-700" :
  d === "Medium" ? "bg-amber-50 text-amber-700" : "bg-gray-900 text-white";

// ─── Inner component — uses useSearchParams, must be inside Suspense ──────────
function PracticeContent() {
  const searchParams = useSearchParams();

  // Initialise filters from URL query params so links like /practice?company=google work
  const [search,     setSearch]     = useState(searchParams.get("search")   ?? "");
  const [company,    setCompany]    = useState(searchParams.get("company")  ?? "All");
  const [topic,      setTopic]      = useState(searchParams.get("topic")    ?? "All");
  const [roundType,  setRoundType]  = useState<RoundType | "">(
    (searchParams.get("roundType") as RoundType) ?? ""
  );
  const [difficulty, setDifficulty] = useState<Difficulty | "">(
    (searchParams.get("difficulty") as Difficulty) ?? ""
  );
  const [page, setPage] = useState(1);

  // Reset pagination whenever filters change — this is the correct pattern for pagination resets
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setPage(1); }, [search, company, topic, roundType, difficulty]);

  // ── Filtered + paginated results ──────────────────────────────────────────
  const filtered = useMemo(
    () => filterQuestions({ company, topic, difficulty, roundType, search }),
    [company, topic, difficulty, roundType, search]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Mock solved state — BACKEND TODO: derive from user.solved_ids
  const solved = allQuestions.filter((_, i) => i % 5 === 0).length;
  const pct    = Math.round((solved / allQuestions.length) * 100);

  const hasFilters = !!(search || company !== "All" || topic !== "All" || difficulty || roundType);

  const clearFilters = () => {
    setSearch(""); setCompany("All"); setTopic("All");
    setDifficulty(""); setRoundType("");
  };

  return (
    <div>
      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Practice Questions</h1>
          <p className="text-sm text-gray-500 mt-1">
            {filtered.length} questions matching your filters.
          </p>
        </div>

        {/* Overall progress badge */}
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="18" fill="none" stroke="#E5E7EB" strokeWidth="5" />
              <circle
                cx="24" cy="24" r="18" fill="none" stroke="#3B82F6" strokeWidth="5"
                strokeDasharray={`${pct * 1.13} 113`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900">
              {pct}%
            </div>
          </div>
          <div>
            <div className="text-base font-bold text-gray-900">{solved}/{allQuestions.length} Solved</div>
            <div className="text-xs text-gray-500">Total Progress</div>
          </div>
        </div>
      </div>

      {/* ── Filters ──────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 mb-2">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Company */}
        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter by company"
        >
          <option value="All">All Companies</option>
          {allCompanySlugs.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>

        {/* Topic */}
        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter by topic"
        >
          <option value="All">All Topics</option>
          {allTopics.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Difficulty toggle */}
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          {(["Easy", "Medium", "Hard"] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(difficulty === d ? "" : d)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                difficulty === d
                  ? d === "Easy"
                    ? "bg-green-500 text-white"
                    : d === "Medium"
                    ? "bg-amber-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Round type */}
        <select
          value={roundType}
          onChange={(e) => setRoundType(e.target.value as RoundType | "")}
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Filter by round type"
        >
          <option value="">All Rounds</option>
          {allRoundTypes.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* ── Active filter pills ──────────────────────────────────────── */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-4 mt-1">
          <span className="text-xs text-gray-500">Active:</span>
          {company !== "All" && (
            <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 rounded-full px-2.5 py-1">
              {company} <button onClick={() => setCompany("All")} aria-label="Remove company filter"><X className="w-3 h-3" /></button>
            </span>
          )}
          {topic !== "All" && (
            <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 rounded-full px-2.5 py-1">
              {topic} <button onClick={() => setTopic("All")} aria-label="Remove topic filter"><X className="w-3 h-3" /></button>
            </span>
          )}
          {difficulty && (
            <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 rounded-full px-2.5 py-1">
              {difficulty} <button onClick={() => setDifficulty("")} aria-label="Remove difficulty filter"><X className="w-3 h-3" /></button>
            </span>
          )}
          {roundType && (
            <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 rounded-full px-2.5 py-1">
              {roundType} <button onClick={() => setRoundType("")} aria-label="Remove round filter"><X className="w-3 h-3" /></button>
            </span>
          )}
          <button onClick={clearFilters} className="text-xs text-gray-400 hover:text-gray-600 underline ml-1">
            Clear all
          </button>
        </div>
      )}

      {/* ── Questions table ──────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_80px_1fr_70px_70px_40px] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200">
          {["QUESTION", "COMPANY", "DIFF", "TOPIC / ROUND", "XP", "STATUS", ""].map((h) => (
            <div key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {paginated.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            No questions match your filters.{" "}
            <button onClick={clearFilters} className="text-blue-600 hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          paginated.map((q, idx) => {
            // BACKEND TODO: derive isSolved/isWrong from user.solved_ids
            const isSolved       = idx % 5 === 0;
            const isWrong        = idx % 7 === 0 && !isSolved;
            const primaryCompany = q.companies[0];

            return (
              <div
                key={q.id}
                className="grid grid-cols-[2fr_1fr_80px_1fr_70px_70px_40px] gap-4 px-5 py-3.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors group"
              >
                {/* Title */}
                <div className="font-medium text-gray-900 text-sm truncate">{q.title}</div>

                {/* Company */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    {primaryCompany?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-700 truncate capitalize">{primaryCompany}</span>
                </div>

                {/* Difficulty */}
                <div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${diffBadge(q.diff)}`}>
                    {q.diff}
                  </span>
                </div>

                {/* Topic + Round type */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs text-gray-600">{q.topic}</span>
                  <span className="text-[10px] bg-gray-100 text-gray-500 rounded px-1.5 py-0.5">
                    {q.roundType}
                  </span>
                </div>

                {/* XP */}
                <div className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span className="text-xs font-medium text-amber-600">{q.xp}</span>
                </div>

                {/* Status */}
                <div>
                  {isSolved ? (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  ) : isWrong ? (
                    <XCircle className="w-5 h-5 text-red-500" />
                  ) : (
                    <span className="text-gray-300 text-lg">—</span>
                  )}
                </div>

                {/* LeetCode link — visible on row hover */}
                {q.leetcodeUrl ? (
                  <a
                    href={q.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${q.title} on LeetCode`}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4 text-blue-500 hover:text-blue-700" />
                  </a>
                ) : (
                  <div />
                )}
              </div>
            );
          })
        )}

        {/* Pagination footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-t border-gray-200">
          <span className="text-xs text-gray-500">
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} entries
          </span>
          <div className="flex gap-2 items-center">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-xs text-gray-500">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="border border-gray-200 bg-white text-gray-900 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Loading skeleton shown while Suspense resolves ───────────────────────────
function PracticeLoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-48 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-64 mb-6" />
      <div className="flex gap-3 mb-6">
        <div className="h-10 bg-gray-200 rounded flex-1" />
        <div className="h-10 bg-gray-200 rounded w-32" />
        <div className="h-10 bg-gray-200 rounded w-32" />
        <div className="h-10 bg-gray-200 rounded w-36" />
      </div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex gap-4 px-5 py-4 border-b border-gray-100 last:border-0">
            <div className="flex-1 h-4 bg-gray-100 rounded" />
            <div className="w-20 h-4 bg-gray-100 rounded" />
            <div className="w-16 h-4 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Exported page — wraps content in Suspense (required for useSearchParams) ─
export default function PracticePage() {
  return (
    <Suspense fallback={<PracticeLoadingSkeleton />}>
      <PracticeContent />
    </Suspense>
  );
}
