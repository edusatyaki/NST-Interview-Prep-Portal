"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House, Map, Building2, Code2, TrendingUp, Trophy, Send,
  Shield, HelpCircle, MessageCircle, CalendarDays, MessageSquare,
} from "lucide-react";

const navItems = [
  { icon: House,          label: "Home",                href: "/dashboard" },
  { icon: Map,            label: "My Roadmap",          href: "/roadmap" },
  { icon: Building2,      label: "Companies",           href: "/companies" },
  { icon: Code2,          label: "Practice",            href: "/practice" },
  { icon: TrendingUp,     label: "My Progress",         href: "/progress" },
  { icon: Trophy,         label: "Leaderboard",         href: "/leaderboard" },
  { icon: Send,           label: "Interview Experience",href: "/submit" },
];

const connectItems = [
  { icon: MessageCircle, label: "Ask a Doubt",    href: "/doubts" },
  { icon: CalendarDays,  label: "Book a Session", href: "/sessions" },
  { icon: MessageSquare, label: "Messages",        href: "/messages" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-[216px] bg-white border-r border-gray-200 flex flex-col z-40">
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {/* Main Nav */}
        <div className="space-y-0.5">
          {navItems.map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(href)
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          ))}
        </div>

        {/* Faculty Connect Section */}
        <div className="mt-5">
          <p className="px-3 mb-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Faculty Connect
          </p>
          <div className="space-y-0.5">
            {connectItems.map(({ icon: Icon, label, href }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="px-3 pb-4 space-y-0.5 border-t border-gray-100 pt-3">
        <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium w-full bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
          <Shield className="w-4 h-4 shrink-0" />
          Share a Concern
        </button>
        <button className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium w-full text-gray-500 hover:bg-gray-100 transition-colors">
          <HelpCircle className="w-4 h-4 shrink-0" />
          Help &amp; Support
        </button>
      </div>
    </aside>
  );
}
