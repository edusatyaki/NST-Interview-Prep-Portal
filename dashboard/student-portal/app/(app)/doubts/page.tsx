"use client";
import { useState } from "react";
import {
  MessageCircle, Plus, ChevronDown, ChevronUp,
  Clock, CheckCircle2, Circle, Send, Tag, X,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────
type DoubtStatus = "pending" | "answered" | "resolved";
type DoubtTag = "DSA" | "System Design" | "LLD" | "HR" | "General";

interface DoubtReply {
  id: string;
  author: "faculty" | "student";
  authorName: string;
  body: string;
  sentAt: string;
}

interface Doubt {
  id: string;
  subject: string;
  body: string;
  tag: DoubtTag;
  status: DoubtStatus;
  createdAt: string;
  replies: DoubtReply[];
}

// ── Mock Data ─────────────────────────────────────────
const TAGS: DoubtTag[] = ["DSA", "System Design", "LLD", "HR", "General"];

const mockDoubts: Doubt[] = [
  {
    id: "d1",
    subject: "How to approach 2-pointer problems in interviews?",
    body: "I keep freezing when I see sliding window / two-pointer problems. Should I memorise templates or try to derive them from scratch each time?",
    tag: "DSA",
    status: "answered",
    createdAt: "2026-06-24T10:00:00Z",
    replies: [
      {
        id: "r1", author: "faculty", authorName: "Prof. Sharma",
        body: "Great question Pranay! You should understand the intuition behind both patterns so you can derive them. The template approach works initially but breaks down on novel variants. I'd recommend practising 5 two-pointer problems without templates first, then check solutions.",
        sentAt: "2026-06-24T12:30:00Z",
      },
      {
        id: "r2", author: "student", authorName: "You",
        body: "That makes sense! Should I start with LeetCode Easy problems or jump to Medium directly?",
        sentAt: "2026-06-24T13:00:00Z",
      },
    ],
  },
  {
    id: "d2",
    subject: "Difference between HLD and LLD — when to go deep?",
    body: "In a Google interview, if they say 'design a URL shortener', should I go into class diagrams or stay at system level? I get confused about how much depth to cover.",
    tag: "System Design",
    status: "pending",
    createdAt: "2026-06-24T14:00:00Z",
    replies: [],
  },
  {
    id: "d3",
    subject: "STAR method — how long should each answer be?",
    body: "My behavioral answers feel either too short or way too long. Is there a time limit I should target for each STAR response?",
    tag: "HR",
    status: "resolved",
    createdAt: "2026-06-23T09:00:00Z",
    replies: [
      {
        id: "r3", author: "faculty", authorName: "Prof. Sharma",
        body: "Target 2–3 minutes per STAR answer. Situation + Task = ~30 seconds, Action = ~90 seconds (the meat), Result = ~30 seconds. Practice recording yourself — you'll immediately see if you're running long.",
        sentAt: "2026-06-23T11:00:00Z",
      },
    ],
  },
];

// ── Status Badge ──────────────────────────────────────
function StatusBadge({ status }: { status: DoubtStatus }) {
  const map = {
    pending:  { label: "Pending",   cls: "bg-amber-50 text-amber-700 border-amber-200",  icon: Circle },
    answered: { label: "Answered",  cls: "bg-blue-50 text-blue-700 border-blue-200",     icon: MessageCircle },
    resolved: { label: "Resolved",  cls: "bg-green-50 text-green-700 border-green-200",  icon: CheckCircle2 },
  };
  const { label, cls, icon: Icon } = map[status];
  return (
    <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${cls}`}>
      <Icon className="w-3 h-3" /> {label}
    </span>
  );
}

// ── Tag Badge ─────────────────────────────────────────
function TagBadge({ tag }: { tag: DoubtTag }) {
  const colors: Record<DoubtTag, string> = {
    "DSA":           "bg-blue-100 text-blue-700",
    "System Design": "bg-purple-100 text-purple-700",
    "LLD":           "bg-indigo-100 text-indigo-700",
    "HR":            "bg-green-100 text-green-700",
    "General":       "bg-gray-100 text-gray-600",
  };
  return (
    <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg ${colors[tag]}`}>
      <Tag className="w-3 h-3" /> {tag}
    </span>
  );
}

// ── Time Ago ──────────────────────────────────────────
function timeAgo(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / 1440)}d ago`;
}

// ── Doubt Thread Card ─────────────────────────────────
function DoubtCard({ doubt, onResolve }: { doubt: Doubt; onResolve: (id: string) => void }) {
  const [open, setOpen] = useState(doubt.status === "answered");
  const [replyText, setReplyText] = useState("");

  return (
    <div className={`bg-white border rounded-xl overflow-hidden transition-all ${
      doubt.status === "pending" ? "border-amber-200" :
      doubt.status === "answered" ? "border-blue-200" : "border-gray-200"
    }`}>
      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <TagBadge tag={doubt.tag} />
            <StatusBadge status={doubt.status} />
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {timeAgo(doubt.createdAt)}
            </span>
          </div>
          <p className="font-semibold text-gray-900 text-sm">{doubt.subject}</p>
          {!open && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{doubt.body}</p>
          )}
        </div>
        <div className="shrink-0 text-gray-400 mt-0.5">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded Thread */}
      {open && (
        <div className="border-t border-gray-100">
          {/* Original question body */}
          <div className="px-5 py-4 bg-gray-50/60">
            <p className="text-sm text-gray-700 leading-relaxed">{doubt.body}</p>
          </div>

          {/* Replies */}
          {doubt.replies.length > 0 && (
            <div className="divide-y divide-gray-50">
              {doubt.replies.map((r) => (
                <div key={r.id} className={`px-5 py-4 flex gap-3 ${r.author === "faculty" ? "bg-blue-50/30" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    r.author === "faculty" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}>
                    {r.authorName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold ${r.author === "faculty" ? "text-blue-700" : "text-gray-700"}`}>
                        {r.authorName}
                      </span>
                      {r.author === "faculty" && (
                        <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">FACULTY</span>
                      )}
                      <span className="text-xs text-gray-400">{timeAgo(r.sentAt)}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{r.body}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {doubt.status === "pending" && (
            <div className="px-5 py-4 text-sm text-amber-700 bg-amber-50/60 flex items-center gap-2">
              <Clock className="w-4 h-4 shrink-0" />
              Waiting for faculty reply — usually within 24 hours
            </div>
          )}

          {/* Reply box (only if answered) */}
          {doubt.status === "answered" && (
            <div className="px-5 py-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a follow-up..."
                  className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                />
                <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => onResolve(doubt.id)}
                className="mt-2 text-xs text-green-600 font-medium hover:underline flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Mark as Resolved
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── New Doubt Drawer ──────────────────────────────────
function NewDoubtDrawer({ onClose, onSubmit }: { onClose: () => void; onSubmit: (d: Omit<Doubt, "id" | "replies" | "createdAt" | "status">) => void }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState<DoubtTag>("DSA");

  const canSubmit = subject.trim().length > 5 && body.trim().length > 10;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900">Ask a Doubt</h2>
            <p className="text-xs text-gray-500">Faculty typically replies within 24 hours</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-5 space-y-4">
          {/* Tag */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-2 block">Topic Area</label>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${
                    tag === t ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value.slice(0, 100))}
              placeholder="e.g. How to approach graph BFS problems?"
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Body */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Describe Your Doubt</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder="Explain your doubt in detail — the more context you give, the better the answer will be..."
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100">
          <button onClick={onClose} className="text-sm text-gray-600 font-medium hover:text-gray-900 px-4 py-2">Cancel</button>
          <button
            disabled={!canSubmit}
            onClick={() => { onSubmit({ subject, body, tag }); onClose(); }}
            className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors ${
              canSubmit ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4" /> Submit Doubt
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────
export default function DoubtsPage() {
  const [doubts, setDoubts] = useState<Doubt[]>(mockDoubts);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<"all" | DoubtStatus>("all");

  const handleSubmit = (d: Omit<Doubt, "id" | "replies" | "createdAt" | "status">) => {
    const newDoubt: Doubt = {
      ...d,
      id: `d${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      replies: [],
    };
    setDoubts((prev) => [newDoubt, ...prev]);
  };

  const handleResolve = (id: string) => {
    setDoubts((prev) => prev.map((d) => d.id === id ? { ...d, status: "resolved" } : d));
  };

  const filtered = filter === "all" ? doubts : doubts.filter((d) => d.status === filter);

  const counts = {
    all: doubts.length,
    pending: doubts.filter((d) => d.status === "pending").length,
    answered: doubts.filter((d) => d.status === "answered").length,
    resolved: doubts.filter((d) => d.status === "resolved").length,
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Doubts</h1>
          <p className="text-sm text-gray-500 mt-0.5">Ask questions, get answers from your faculty</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Ask a Doubt
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
        {(["all", "pending", "answered", "resolved"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              filter === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {f}
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
              filter === f ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-500"
            }`}>
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* Doubt List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
            <MessageCircle className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="font-medium text-gray-500">No doubts here yet</p>
            <p className="text-sm text-gray-400 mt-1">Click &quot;Ask a Doubt&quot; to get started</p>
          </div>
        ) : (
          filtered.map((d) => (
            <DoubtCard key={d.id} doubt={d} onResolve={handleResolve} />
          ))
        )}
      </div>

      {showForm && <NewDoubtDrawer onClose={() => setShowForm(false)} onSubmit={handleSubmit} />}
    </div>
  );
}
