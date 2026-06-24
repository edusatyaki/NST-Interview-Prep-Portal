"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Search, Circle } from "lucide-react";

// ── Types ─────────────────────────────────────────────
interface Message {
  id: string;
  senderId: "student" | "faculty";
  body: string;
  sentAt: string;
  seen: boolean;
}

interface Faculty {
  id: string;
  name: string;
  initials: string;
  subject: string;
  online: boolean;
  lastMessage: string;
  lastAt: string;
  unread: number;
}

// ── Mock Data ─────────────────────────────────────────
const mockFaculty: Faculty[] = [
  {
    id: "f1",
    name: "Prof. Sharma",
    initials: "PS",
    subject: "DSA & System Design Mentor",
    online: true,
    lastMessage: "You're on the right track! Keep practising.",
    lastAt: "2026-06-24T13:45:00Z",
    unread: 1,
  },
  {
    id: "f2",
    name: "Dr. Meera Kapoor",
    initials: "MK",
    subject: "HR & Soft Skills Coach",
    online: false,
    lastMessage: "Send me your updated STAR story by tomorrow.",
    lastAt: "2026-06-23T10:00:00Z",
    unread: 0,
  },
];

const mockMessages: Record<string, Message[]> = {
  f1: [
    { id: "m1", senderId: "faculty", body: "Hi Pranay! How is your prep going? Did you try the two-pointer problems I suggested?", sentAt: "2026-06-24T11:00:00Z", seen: true },
    { id: "m2", senderId: "student", body: "Yes sir! I solved 8 of them. The ones involving sorted arrays felt intuitive but the unsorted ones still confuse me.", sentAt: "2026-06-24T11:05:00Z", seen: true },
    { id: "m3", senderId: "faculty", body: "That's normal — for unsorted arrays you often need to sort first (O(n log n)) before applying two-pointer. The key insight is: two-pointer only works reliably when the array has some ordering property. Try 3Sum next!", sentAt: "2026-06-24T12:00:00Z", seen: true },
    { id: "m4", senderId: "student", body: "Got it! I'll try 3Sum today. Should I also look at the 4Sum problem after?", sentAt: "2026-06-24T12:30:00Z", seen: true },
    { id: "m5", senderId: "faculty", body: "You're on the right track! Keep practising.", sentAt: "2026-06-24T13:45:00Z", seen: false },
  ],
  f2: [
    { id: "m6", senderId: "faculty", body: "Pranay, I reviewed your behavioral answers. Your Situation and Task sections are strong but the Action section needs more specific details — avoid vague words like 'I helped'. Be specific about *what you did*.", sentAt: "2026-06-23T09:30:00Z", seen: true },
    { id: "m7", senderId: "student", body: "Thank you Dr. Kapoor! I'll rewrite those sections. Should I send the revised version to you?", sentAt: "2026-06-23T09:45:00Z", seen: true },
    { id: "m8", senderId: "faculty", body: "Send me your updated STAR story by tomorrow.", sentAt: "2026-06-23T10:00:00Z", seen: true },
  ],
};

// ── Helpers ───────────────────────────────────────────
function timeAgo(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h`;
  return `${Math.floor(mins / 1440)}d`;
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function groupByDate(messages: Message[]): Array<{ dateLabel: string; messages: Message[] }> {
  const groups: Record<string, Message[]> = {};
  messages.forEach((m) => {
    const d = new Date(m.sentAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const key = d.toDateString() === today.toDateString() ? "Today"
      : d.toDateString() === yesterday.toDateString() ? "Yesterday"
      : d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    if (!groups[key]) groups[key] = [];
    groups[key].push(m);
  });
  return Object.entries(groups).map(([dateLabel, messages]) => ({ dateLabel, messages }));
}

// ── Faculty List ──────────────────────────────────────
function FacultyList({ faculty, selected, onSelect }: {
  faculty: Faculty[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const filtered = faculty.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="w-full h-full flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100">
        <h2 className="font-bold text-gray-900 mb-3">Messages</h2>
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search faculty..."
            className="flex-1 bg-transparent text-sm text-gray-700 focus:outline-none"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((f) => (
          <button
            key={f.id}
            onClick={() => onSelect(f.id)}
            className={`w-full flex items-start gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 ${
              selected === f.id ? "bg-blue-50" : ""
            }`}
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {f.initials}
              </div>
              {f.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900 truncate">{f.name}</span>
                <span className="text-xs text-gray-400 shrink-0 ml-2">{timeAgo(f.lastAt)}</span>
              </div>
              <p className="text-xs text-gray-500 truncate mt-0.5">{f.lastMessage}</p>
            </div>

            {/* Unread badge */}
            {f.unread > 0 && (
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                {f.unread}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Chat Window ───────────────────────────────────────
function ChatWindow({ facultyId, faculty }: { facultyId: string; faculty: Faculty }) {
  const [messages, setMessages] = useState<Message[]>(mockMessages[facultyId] || []);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const msg: Message = {
      id: `m${Date.now()}`,
      senderId: "student",
      body: input.trim(),
      sentAt: new Date().toISOString(),
      seen: false,
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
    // BACKEND TODO: POST /api/messages { chatRoomId, body }
  };

  const groups = groupByDate(messages);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {faculty.initials}
          </div>
          {faculty.online && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">{faculty.name}</p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            {faculty.online ? (
              <><Circle className="w-2 h-2 fill-green-500 text-green-500" /> Online</>
            ) : (
              <><Circle className="w-2 h-2 fill-gray-300 text-gray-300" /> Offline</>
            )}
            · {faculty.subject}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {groups.map(({ dateLabel, messages: groupMsgs }) => (
          <div key={dateLabel}>
            {/* Date separator */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400 font-medium shrink-0">{dateLabel}</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Messages in group */}
            <div className="space-y-3">
              {groupMsgs.map((msg) => {
                const isMe = msg.senderId === "student";
                return (
                  <div key={msg.id} className={`flex gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
                    {!isMe && (
                      <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                        {faculty.initials}
                      </div>
                    )}
                    <div className={`max-w-[75%] group`}>
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        isMe
                          ? "bg-blue-600 text-white rounded-tr-sm"
                          : "bg-gray-100 text-gray-800 rounded-tl-sm"
                      }`}>
                        {msg.body}
                      </div>
                      <p className={`text-[10px] text-gray-400 mt-1 ${isMe ? "text-right" : "text-left"}`}>
                        {fmtTime(msg.sentAt)}
                        {isMe && (
                          <span className="ml-1">{msg.seen ? "· Seen" : "· Sent"}</span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <div className="px-5 py-4 border-t border-gray-100">
        <div className="flex items-end gap-3">
          <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
              placeholder="Type a message... (Enter to send)"
              rows={1}
              className="flex-1 bg-transparent text-sm text-gray-800 resize-none focus:outline-none max-h-32 leading-5"
              style={{ height: "auto" }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              input.trim() ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Empty State ───────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50/50 text-center p-8">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
        <Send className="w-8 h-8 text-blue-300" />
      </div>
      <p className="font-semibold text-gray-600">Select a conversation</p>
      <p className="text-sm text-gray-400 mt-1">Choose a faculty member to start messaging</p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────
export default function MessagesPage() {
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>("");
  const selectedFaculty = mockFaculty.find((f) => f.id === selectedFacultyId);

  return (
    <div className="-mx-6 -my-6" style={{ height: "calc(100vh - 3.5rem)" }}>
      <div className="flex h-full">
        {/* Left panel */}
        <div className="w-72 shrink-0 border-r border-gray-200">
          <FacultyList
            faculty={mockFaculty}
            selected={selectedFacultyId}
            onSelect={setSelectedFacultyId}
          />
        </div>

        {/* Right panel */}
        <div className="flex-1 min-w-0">
          {selectedFaculty ? (
            <ChatWindow facultyId={selectedFacultyId} faculty={selectedFaculty} />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </div>
  );
}
