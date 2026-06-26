import Link from "next/link";
import {
  Inbox, Calendar, BarChart2, ArrowRight, CheckCircle2,
  LayoutGrid, ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockSessionRequests } from "@/lib/data/sessionRequests";
import { TOPICS, CATEGORIES, DEFAULT_MATRIX } from "@/lib/data/relevanceMatrix";
import { cn } from "@/lib/utils";

// ─── Date helpers (no external deps) ─────────────────────────────────────────
// Simulate "today" as June 26, 2026 — consistent with the rest of the portal.
const TODAY = new Date(2026, 5, 26);

function getWeekBounds(date: Date): { start: Date; end: Date } {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun
  const start = new Date(d);
  start.setDate(d.getDate() - day);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

function parseSessionDate(dateStr: string): Date {
  return new Date(dateStr);
}

// ─── KPI computations ────────────────────────────────────────────────────────
const pendingRequests = mockSessionRequests.filter(r => r.status === "pending");
const acceptedSessions = mockSessionRequests.filter(r => r.status === "accepted");

const { start: weekStart, end: weekEnd } = getWeekBounds(TODAY);
const sessionsThisWeek = acceptedSessions.filter(s => {
  const d = parseSessionDate(s.preferredDate);
  return d >= weekStart && d <= weekEnd;
});

// Average coverage across all columns in DEFAULT_MATRIX
const totalCells = TOPICS.length * CATEGORIES.length; // 10 × 5 = 50
const tickedCells = TOPICS.reduce((acc, topic) =>
  acc + CATEGORIES.filter(cat => DEFAULT_MATRIX[topic.id]?.[cat.id]).length
, 0);
const coveragePct = Math.round((tickedCells / totalCells) * 100);

// ─── Quick Links data ────────────────────────────────────────────────────────
const quickLinks = [
  {
    href: "/requests",
    icon: Inbox,
    label: "Session Requests",
    description: "Review and action pending student session bookings",
    badge: pendingRequests.length > 0 ? `${pendingRequests.length} pending` : null,
    accentColor: "bg-indigo-50 text-indigo-600",
  },
  {
    href: "/calendar",
    icon: Calendar,
    label: "Calendar",
    description: "View all scheduled sessions on a monthly calendar",
    badge: null,
    accentColor: "bg-violet-50 text-violet-600",
  },
  {
    href: "/relevance-matrix",
    icon: BarChart2,
    label: "Curriculum Gap Matrix",
    description: "Check syllabus coverage against real interview categories",
    badge: null,
    accentColor: "bg-teal-50 text-teal-600",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10">

      {/* ── KPI Cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Pending Requests */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <Inbox className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{pendingRequests.length}</p>
              <p className="text-sm text-gray-500 font-medium mt-0.5">Pending Requests</p>
            </div>
          </CardContent>
        </Card>

        {/* Sessions This Week */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
              <Calendar className="h-6 w-6 text-[#534AB7]" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{sessionsThisWeek.length}</p>
              <p className="text-sm text-gray-500 font-medium mt-0.5">Sessions This Week</p>
            </div>
          </CardContent>
        </Card>

        {/* Curriculum Coverage */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <BarChart2 className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900">{coveragePct}%</p>
              </div>
              <p className="text-sm text-gray-500 font-medium mt-0.5">Curriculum Coverage</p>
              <div className="mt-2 w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full",
                    coveragePct >= 70 ? "bg-emerald-500" : coveragePct >= 40 ? "bg-amber-500" : "bg-rose-500"
                  )}
                  style={{ width: `${coveragePct}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Two-panel row ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left: Upcoming Sessions */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-semibold text-gray-900">
              Upcoming Sessions
            </CardTitle>
            <Link
              href="/calendar"
              className="text-sm font-medium text-[#534AB7] hover:text-indigo-800 flex items-center gap-1"
            >
              View Calendar
              <ChevronRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {acceptedSessions.slice(0, 3).map(session => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3.5 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-colors relative overflow-hidden group"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#534AB7]" />
                <div className="pl-3">
                  <p className="font-bold text-gray-900 text-sm leading-none mb-1">
                    {session.studentName}
                  </p>
                  <p className="text-xs text-gray-500">{session.topicTag}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-[#534AB7]">{session.preferredTime}</p>
                  <p className="text-xs text-gray-400">{session.preferredDate}</p>
                </div>
              </div>
            ))}
            {acceptedSessions.length === 0 && (
              <p className="text-sm text-gray-400 italic text-center py-4">
                No upcoming sessions.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Right: Pending Action Needed */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-semibold text-gray-900">
              Pending Action Needed
            </CardTitle>
            <Link
              href="/requests"
              className="text-sm font-medium text-[#534AB7] hover:text-indigo-800 flex items-center gap-1"
            >
              View All Requests
              <ChevronRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {pendingRequests.slice(0, 3).map(req => (
              <div
                key={req.id}
                className="flex items-center gap-3 p-3.5 rounded-lg border border-gray-100 hover:border-amber-100 hover:bg-amber-50/30 transition-colors group"
              >
                <div className="h-9 w-9 rounded-full bg-[#534AB7] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {req.studentInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm leading-none mb-1 truncate">
                    {req.studentName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {req.branch} · {req.year}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 shadow-none text-[10px] font-semibold border border-amber-100">
                    {req.topicTag}
                  </Badge>
                  <p className="text-[10px] text-gray-400">{req.preferredDate}</p>
                </div>
              </div>
            ))}
            {pendingRequests.length === 0 && (
              <p className="text-sm text-gray-400 italic text-center py-4 flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                All caught up! No pending requests.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Quick Links ───────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Quick Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickLinks.map(link => (
            <Link key={link.href} href={link.href} className="group block">
              <Card className="border-gray-200 shadow-sm h-full hover:border-[#534AB7]/30 hover:shadow-md transition-all">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", link.accentColor)}>
                    <link.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900 text-sm group-hover:text-[#534AB7] transition-colors">
                        {link.label}
                      </p>
                      {link.badge && (
                        <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 shadow-none text-[10px] border border-amber-100">
                          {link.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-[#534AB7] group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
