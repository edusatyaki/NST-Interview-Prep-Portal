"use client";
import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, CheckCircle, ExternalLink, Filter } from "lucide-react";
import { PracticeCategory, getPracticeQuestions } from "@/lib/api";
import { Difficulty, Question, companiesList } from "@/lib/mock-data";
import CategoryCard from "@/components/practice/CategoryCard";

// Mock Categories - move to api.ts or mock-data.ts later
const categories: PracticeCategory[] = [
  { id: "dsa", label: "DSA", icon: "Code2", totalQuestions: 2400, color: "bg-blue-600", roundType: "Coding" },
  { id: "system-design", label: "System Design", icon: "Server", totalQuestions: 380, color: "bg-purple-600", roundType: "System Design" },
  { id: "aptitude", label: "Aptitude", icon: "Calculator", totalQuestions: 650, color: "bg-amber-500", roundType: "Aptitude" },
  { id: "hr", label: "HR / Behavioral", icon: "Users", totalQuestions: 290, color: "bg-green-600", roundType: "HR" },
  { id: "lld", label: "LLD", icon: "Binary", totalQuestions: 120, color: "bg-indigo-600", roundType: "LLD" },
  { id: "mcqs", label: "MCQs", icon: "BookOpen", totalQuestions: 500, color: "bg-pink-600", roundType: "MCQs" },
  { id: "mock-oa", label: "Mock OA", icon: "Target", totalQuestions: 40, color: "bg-red-500", roundType: "Mock OA" },
  { id: "maths", label: "Maths", icon: "Brain", totalQuestions: 200, color: "bg-teal-600", roundType: "Maths" }
];

function PracticeContent() {
  const searchParams = useSearchParams();
  
  // URL Params parsing
  const initialCategory = searchParams.get("category") || "";
  const paramCompany = searchParams.get("company") || "All";
  // Try to find if paramCompany is a slug
  const foundCompany = companiesList.find(c => c.slug === paramCompany);
  const initialCompany = foundCompany ? foundCompany.name : paramCompany;
  
  const initialTopic = searchParams.get("topic") || "All";
  const initialDifficulty = (searchParams.get("difficulty") as Difficulty) || "";

  // State
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [company, setCompany] = useState<string>(initialCompany);
  const [topic, setTopic] = useState<string>(initialTopic);
  const [difficulty, setDifficulty] = useState<Difficulty | "">(initialDifficulty);
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [page, setPage] = useState(1);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setPage(1); }, [activeCategory, company, topic, difficulty, search]);

  useEffect(() => {
    // In real app, call getPracticeQuestions
    const fetchQ = async () => {
      const res = await getPracticeQuestions({
        category: activeCategory,
        company: company,
        topic: topic,
        difficulty: difficulty,
      });
      // also filter by search text
      const filtered = res.filter(q => 
        !search.trim() || q.title.toLowerCase().includes(search.toLowerCase())
      );
      setQuestions(filtered);
    };
    fetchQ();
  }, [activeCategory, company, topic, difficulty, search]);

  // Pagination
  const ITEMS_PER_PAGE = 15;
  const totalPages = Math.max(1, Math.ceil(questions.length / ITEMS_PER_PAGE));
  const paginated = questions.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Practice Zone</h1>
        <p className="text-gray-500">Master every concept before your interview.</p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 relative z-0">
        {categories.map(cat => (
          <CategoryCard 
            key={cat.id} 
            category={cat} 
            isActive={activeCategory === cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.id ? "" : cat.id)}
          />
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 relative z-0">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          
          {/* Search */}
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Company */}
          <div className="w-full md:w-48">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Company</label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Companies</option>
              {companiesList.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          {/* Topic */}
          <div className="w-full md:w-48">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Topics</option>
              {/* Dummy topics, fetch from API later */}
              <option value="Arrays">Arrays</option>
              <option value="Dynamic Programming">Dynamic Programming</option>
              <option value="Graphs">Graphs</option>
              <option value="System Design">System Design</option>
            </select>
          </div>

          {/* Difficulty Toggles */}
          <div className="w-full md:w-auto">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Difficulty</label>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {(["", "Easy", "Medium", "Hard"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    difficulty === d
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {d === "" ? "All" : d}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
        {paginated.length === 0 ? (
          <div className="py-12 text-center text-gray-500 text-sm">No questions found. Try adjusting filters.</div>
        ) : (
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 w-8">Status</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4 w-48">Company</th>
                <th className="px-6 py-4 w-32">Topic</th>
                <th className="px-6 py-4 w-24">Difficulty</th>
                <th className="px-6 py-4 w-20">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <button className="text-gray-300 hover:text-green-500 transition-colors">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{q.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {q.companies.slice(0, 2).map((co, i) => (
                        <span key={i} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase tracking-wider">
                          {co}
                        </span>
                      ))}
                      {q.companies.length > 2 && (
                        <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase tracking-wider">
                          +{q.companies.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                      {q.topic}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                      q.diff === "Easy" ? "bg-green-50 text-green-700" :
                      q.diff === "Medium" ? "bg-amber-50 text-amber-700" :
                      "bg-red-50 text-red-600"
                    }`}>
                      {q.diff}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={q.leetcodeUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 transition-all inline-flex items-center justify-center"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{Math.min(page * ITEMS_PER_PAGE, questions.length)}</span> of <span className="font-medium">{questions.length}</span> results
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading practice zone...</div>}>
      <PracticeContent />
    </Suspense>
  );
}
