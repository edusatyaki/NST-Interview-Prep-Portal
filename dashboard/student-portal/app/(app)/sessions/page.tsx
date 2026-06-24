"use client";
import { useState } from "react";
import {
 CalendarDays, Clock, CheckCircle2, XCircle, AlertCircle,
 Video, ChevronLeft, ChevronRight, X, Send, User,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────
type SessionStatus = "pending" | "confirmed" | "proposed" | "completed" | "cancelled";

interface Session {
 id: string;
 topic: string;
 notes: string;
 date: string;    // ISO date string
 time: string;    // e.g. "10:00 AM"
 duration: 30 | 60;
 status: SessionStatus;
 facultyName: string;
 meetLink?: string;
 proposedDate?: string;
 proposedTime?: string;
}

// ── Mock Data ─────────────────────────────────────────
const TIME_SLOTS = [
 "9:00 AM", "10:00 AM", "11:00 AM",
 "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

// Faculty available days (0=Sun, 1=Mon ... 6=Sat)
const FACULTY_AVAILABLE_DAYS = [1, 2, 3, 4, 5]; // Mon–Fri

const mockSessions: Session[] = [
 {
  id: "s1",
  topic: "System Design Mock Interview",
  notes: "Want to practice designing a URL shortener end-to-end",
  date: "2026-06-26",
  time: "10:00 AM",
  duration: 60,
  status: "confirmed",
  facultyName: "Prof. Sharma",
  meetLink: "https://meet.jit.si/NST-PlacePrep-s1-x7k2m",
 },
 {
  id: "s2",
  topic: "DSA Doubt Clearing",
  notes: "Two-pointer and sliding window patterns",
  date: "2026-06-28",
  time: "3:00 PM",
  duration: 30,
  status: "proposed",
  facultyName: "Prof. Sharma",
  proposedDate: "2026-06-29",
  proposedTime: "4:00 PM",
 },
 {
  id: "s3",
  topic: "HR Round Preparation",
  notes: "STAR method practice for Amazon Leadership Principles",
  date: "2026-06-20",
  time: "11:00 AM",
  duration: 60,
  status: "completed",
  facultyName: "Prof. Sharma",
  meetLink: "https://meet.jit.si/NST-PlacePrep-s3-a8b2c",
 },
];

// ── Helpers ───────────────────────────────────────────
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(year: number, month: number) {
 return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
 return new Date(year, month, 1).getDay();
}

function fmtDate(d: string) {
 const dt = new Date(d);
 return dt.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function daysUntil(dateStr: string) {
 const diff = Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
 if (diff < 0) return "Past";
 if (diff === 0) return "Today";
 if (diff === 1) return "Tomorrow";
 return `In ${diff} days`;
}

// ── Status Config ─────────────────────────────────────
const STATUS_CONFIG: Record<SessionStatus, { label: string; cls: string; icon: React.ElementType }> = {
 pending:  { label: "Pending",  cls: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
 confirmed: { label: "Confirmed", cls: "bg-green-50 text-green-700 border-green-200", icon: CheckCircle2 },
 proposed: { label: "New Time Proposed", cls: "bg-blue-50 text-blue-700 border-blue-200", icon: AlertCircle },
 completed: { label: "Completed", cls: "bg-gray-100 text-gray-600 border-gray-200",  icon: CheckCircle2 },
 cancelled: { label: "Cancelled", cls: "bg-red-50 text-red-600 border-red-200",    icon: XCircle },
};

// ── Mini Calendar ─────────────────────────────────────
function MiniCalendar({ onSelect, selected }: { onSelect: (d: string) => void; selected: string }) {
 const today = new Date();
 const [viewYear, setViewYear] = useState(today.getFullYear());
 const [viewMonth, setViewMonth] = useState(today.getMonth());

 const daysInMonth = getDaysInMonth(viewYear, viewMonth);
 const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

 const prevMonth = () => {
  if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
  else setViewMonth((m) => m - 1);
 };
 const nextMonth = () => {
  if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
  else setViewMonth((m) => m + 1);
 };

 const isAvailable = (day: number) => {
  const date = new Date(viewYear, viewMonth, day);
  return date >= today && FACULTY_AVAILABLE_DAYS.includes(date.getDay());
 };

 const dateStr = (day: number) =>
  `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

 return (
  <div className="bg-white border border-gray-200 rounded-md p-4">
   {/* Month nav */}
   <div className="flex items-center justify-between mb-4">
    <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-lg ">
     <ChevronLeft className="w-4 h-4 text-gray-500" />
    </button>
    <span className="text-sm font-bold text-gray-900">{MONTHS[viewMonth]} {viewYear}</span>
    <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-lg ">
     <ChevronRight className="w-4 h-4 text-gray-500" />
    </button>
   </div>

   {/* Day labels */}
   <div className="grid grid-cols-7 mb-1">
    {DAYS.map((d) => (
     <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
    ))}
   </div>

   {/* Date grid */}
   <div className="grid grid-cols-7 gap-0.5">
    {/* Empty cells */}
    {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
    {/* Days */}
    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
     const ds = dateStr(day);
     const avail = isAvailable(day);
     const isSelected = ds === selected;
     const isPast = new Date(viewYear, viewMonth, day) < today;
     return (
      <button
       key={day}
       disabled={!avail}
       onClick={() => onSelect(ds)}
       className={`aspect-square w-full rounded-lg text-xs font-semibold flex items-center justify-center ${
        isSelected ? "bg-blue-600 text-white shadow-sm" :
        avail ? "bg-green-50 text-green-800 hover:bg-green-100 border border-green-200" :
        isPast ? "text-gray-300 cursor-not-allowed" :
        "text-gray-300 cursor-not-allowed"
       }`}
      >
       {day}
      </button>
     );
    })}
   </div>

   {/* Legend */}
   <div className="flex items-center gap-4 mt-3 text-[10px] text-gray-400 pt-3 border-t border-gray-100">
    <div className="flex items-center gap-1.5">
     <div className="w-3 h-3 rounded-sm bg-green-100 border border-green-200" />
     Faculty Available
    </div>
    <div className="flex items-center gap-1.5">
     <div className="w-3 h-3 rounded-sm bg-blue-600" />
     Selected
    </div>
   </div>
  </div>
 );
}

// ── Booking Form Drawer ───────────────────────────────
function BookingDrawer({ selectedDate, onClose, onBook }: {
 selectedDate: string;
 onClose: () => void;
 onBook: (s: Omit<Session, "id" | "status" | "facultyName" | "meetLink">) => void;
}) {
 const [time, setTime] = useState(TIME_SLOTS[0]);
 const [topic, setTopic] = useState("");
 const [notes, setNotes] = useState("");
 const [duration, setDuration] = useState<30 | 60>(30);

 const canBook = topic.trim().length > 3 && time.length > 0;

 return (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
   <div className="bg-white rounded-lg w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
     <div>
      <h2 className="font-bold text-gray-900">Book a Session</h2>
      <p className="text-xs text-gray-500">{fmtDate(selectedDate)}</p>
     </div>
     <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
    </div>

    <div className="px-5 py-5 space-y-4">
     {/* Time Slot */}
     <div>
      <label className="text-xs font-semibold text-gray-600 mb-2 block">Select Time Slot</label>
      <div className="grid grid-cols-3 gap-2">
       {TIME_SLOTS.map((t) => (
        <button key={t} onClick={() => setTime(t)}
         className={`py-2 rounded-lg text-xs font-semibold border-2 ${
          time === t ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
         }`}
        >{t}</button>
       ))}
      </div>
     </div>

     {/* Duration */}
     <div>
      <label className="text-xs font-semibold text-gray-600 mb-2 block">Session Duration</label>
      <div className="flex gap-2">
       {([30, 60] as const).map((d) => (
        <button key={d} onClick={() => setDuration(d)}
         className={`flex-1 py-2.5 rounded-md text-sm font-bold border-2 ${
          duration === d ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
         }`}
        >{d} min</button>
       ))}
      </div>
     </div>

     {/* Topic */}
     <div>
      <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Session Topic</label>
      <input
       type="text"
       value={topic}
       onChange={(e) => setTopic(e.target.value)}
       placeholder="e.g. System Design Mock, DSA Doubt Clearing..."
       className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
     </div>

     {/* Notes */}
     <div>
      <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Additional Notes <span className="font-normal text-gray-400">(optional)</span></label>
      <textarea
       value={notes}
       onChange={(e) => setNotes(e.target.value)}
       rows={2}
       placeholder="Any specific topics or questions you want to cover..."
       className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
     </div>

     {/* Info */}
     <div className="bg-blue-50 border border-blue-100 rounded-md px-4 py-3 text-xs text-blue-700">
      A Google Meet / Jitsi link will be generated once the faculty confirms your booking.
     </div>
    </div>

    <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100">
     <button onClick={onClose} className="text-sm text-gray-600 font-medium hover:text-gray-900 px-4 py-2">Cancel</button>
     <button
      disabled={!canBook}
      onClick={() => { onBook({ topic, notes, date: selectedDate, time, duration }); onClose(); }}
      className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-md ${
       canBook ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"
      }`}
     >
      <Send className="w-4 h-4" /> Send Booking Request
     </button>
    </div>
   </div>
  </div>
 );
}

// ── Session Card ──────────────────────────────────────
function SessionCard({ session, onAcceptProposal }: { session: Session; onAcceptProposal: (id: string) => void }) {
 const { label, cls, icon: StatusIcon } = STATUS_CONFIG[session.status];
 const isUpcoming = session.status === "confirmed" || session.status === "proposed";
 const showJoin = session.status === "confirmed" && new Date(session.date) >= new Date();

 return (
  <div className={`bg-white border rounded-md p-4 ${
   session.status === "proposed" ? "border-blue-300 shadow-sm shadow-blue-100" :
   session.status === "confirmed" ? "border-green-200" : "border-gray-200"
  }`}>
   <div className="flex items-start justify-between gap-4">
    <div className="flex-1 min-w-0">
     <div className="flex flex-wrap items-center gap-2 mb-2">
      <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${cls}`}>
       <StatusIcon className="w-3 h-3" /> {label}
      </span>
      {isUpcoming && (
       <span className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
        {daysUntil(session.date)}
       </span>
      )}
     </div>
     <h3 className="font-bold text-gray-900">{session.topic}</h3>
     {session.notes && <p className="text-sm text-gray-500 mt-0.5">{session.notes}</p>}

     <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500">
      <span className="flex items-center gap-1">
       <CalendarDays className="w-3.5 h-3.5" /> {fmtDate(session.date)}
      </span>
      <span className="flex items-center gap-1">
       <Clock className="w-3.5 h-3.5" /> {session.time} · {session.duration} min
      </span>
      <span className="flex items-center gap-1">
       <User className="w-3.5 h-3.5" /> {session.facultyName}
      </span>
     </div>
    </div>

    {showJoin && session.meetLink && (
     <a
      href={session.meetLink}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-3 py-1.5 rounded-md hover:bg-green-700 "
     >
      <Video className="w-4 h-4" /> Join
     </a>
    )}
   </div>

   {/* Proposed alternative */}
   {session.status === "proposed" && session.proposedDate && (
    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-4">
     <p className="text-sm font-semibold text-blue-800 mb-1">Faculty proposed a new time:</p>
     <p className="text-sm text-blue-700">
      {fmtDate(session.proposedDate)} at {session.proposedTime}
     </p>
     <div className="flex gap-2 mt-3">
      <button
       onClick={() => onAcceptProposal(session.id)}
       className="flex items-center gap-1.5 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 "
      >
       <CheckCircle2 className="w-3.5 h-3.5" /> Accept New Time
      </button>
      <button className="flex items-center gap-1.5 border border-gray-300 text-gray-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 ">
       <XCircle className="w-3.5 h-3.5" /> Decline
      </button>
     </div>
    </div>
   )}
  </div>
 );
}

// ── Main Page ─────────────────────────────────────────
export default function SessionsPage() {
 const [sessions, setSessions] = useState<Session[]>(mockSessions);
 const [selectedDate, setSelectedDate] = useState("");
 const [showBooking, setShowBooking] = useState(false);
 const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

 const handleBook = (data: Omit<Session, "id" | "status" | "facultyName" | "meetLink">) => {
  const newSession: Session = {
   ...data,
   id: `s${Date.now()}`,
   status: "pending",
   facultyName: "Prof. Sharma",
  };
  setSessions((prev) => [newSession, ...prev]);
 };

 const handleAcceptProposal = (id: string) => {
  setSessions((prev) =>
   prev.map((s) =>
    s.id === id ? {
     ...s, status: "confirmed",
     date: s.proposedDate ?? s.date,
     time: s.proposedTime ?? s.time,
     meetLink: `https://meet.jit.si/NST-PlacePrep-${id}-${Math.random().toString(36).slice(2, 7)}`,
    } : s
   )
  );
 };

 const upcoming = sessions.filter((s) => ["pending", "confirmed", "proposed"].includes(s.status));
 const past   = sessions.filter((s) => ["completed", "cancelled"].includes(s.status));

 return (
  <div className="max-w-5xl">
   <div className="mb-6">
    <h1 className="text-2xl font-bold text-gray-900">Book a Session</h1>
    <p className="text-sm text-gray-500 mt-0.5">Schedule 1:1 sessions with your faculty mentor</p>
   </div>

   <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-4">
    {/* Calendar Panel */}
    <div className="space-y-4">
     <MiniCalendar onSelect={setSelectedDate} selected={selectedDate} />

     {selectedDate && (
      <div className="bg-white border border-gray-200 rounded-md p-4">
       <p className="text-xs font-semibold text-gray-600 mb-1">Selected Date</p>
       <p className="text-sm font-bold text-gray-900 mb-3">{fmtDate(selectedDate)}</p>
       <button
        onClick={() => setShowBooking(true)}
        className="w-full bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
       >
        <Send className="w-4 h-4" /> Request This Slot
       </button>
      </div>
     )}

     <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-xs text-gray-500 space-y-1.5">
      <p className="font-semibold text-gray-700">How it works</p>
      <p>1. Pick a green (available) date</p>
      <p>2. Choose your preferred time slot</p>
      <p>3. Faculty reviews and confirms or proposes a new time</p>
      <p>4. A Jitsi Meet link is auto-generated and shared with both parties</p>
     </div>
    </div>

    {/* Sessions Panel */}
    <div>
     <div className="flex gap-1 bg-gray-100 rounded-md p-1 mb-5 w-fit">
      {(["upcoming", "past"] as const).map((t) => (
       <button key={t} onClick={() => setTab(t)}
        className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize ${
         tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
        }`}
       >
        {t} ({t === "upcoming" ? upcoming.length : past.length})
       </button>
      ))}
     </div>

     <div className="space-y-4">
      {(tab === "upcoming" ? upcoming : past).length === 0 ? (
       <div className="text-center py-16 bg-white border border-gray-200 rounded-md">
        <CalendarDays className="w-10 h-10 text-gray-200 mx-auto mb-3" />
        <p className="font-medium text-gray-500">No {tab} sessions</p>
        <p className="text-sm text-gray-400 mt-1">
         {tab === "upcoming" ? "Pick a date on the calendar to book one" : "Your completed sessions will appear here"}
        </p>
       </div>
      ) : (
       (tab === "upcoming" ? upcoming : past).map((s) => (
        <SessionCard key={s.id} session={s} onAcceptProposal={handleAcceptProposal} />
       ))
      )}
     </div>
    </div>
   </div>

   {showBooking && selectedDate && (
    <BookingDrawer
     selectedDate={selectedDate}
     onClose={() => setShowBooking(false)}
     onBook={handleBook}
    />
   )}
  </div>
 );
}
