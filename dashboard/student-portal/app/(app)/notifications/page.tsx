"use client";
import { useState } from "react";
import { Bell, Award, Target, BookOpen, MessageSquare, Check, X } from "lucide-react";
import { Notification } from "@/lib/api";

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "1", type: "badge", title: "You earned the 'Consistency King' badge for a 7-day streak!", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), read: false },
  { id: "2", type: "new_company", title: "Google 2025 SDE-1 questions have been added to the portal.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), read: false },
  { id: "3", type: "roadmap", title: "You have 3 incomplete questions from Week 1. Finish them today to stay on track.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), read: true },
  { id: "4", type: "experience", title: "Rahul M. just posted a new Microsoft interview experience.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), read: true },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "badge": return <Award className="w-5 h-5 text-amber-500" />;
      case "new_company": return <Target className="w-5 h-5 text-blue-500" />;
      case "roadmap": return <BookOpen className="w-5 h-5 text-indigo-500" />;
      case "experience": return <MessageSquare className="w-5 h-5 text-green-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Notifications</h1>
          <p className="text-sm text-gray-500 mt-1">Stay updated with your progress and portal updates.</p>
        </div>
        <button
          onClick={markAllRead}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5"
        >
          <Check className="w-4 h-4" /> Mark all as read
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p>You&apos;re all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((n) => (
              <div key={n.id} className={`p-4 flex items-start gap-4 transition-colors ${n.read ? "bg-white" : "bg-blue-50/50"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.read ? "bg-gray-100" : "bg-white shadow-sm border border-blue-100"}`}>
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className={`text-sm ${n.read ? "text-gray-600 font-medium" : "text-gray-900 font-bold"}`}>
                    {n.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {Math.floor((Date.now() - n.timestamp.getTime()) / (1000 * 60 * 60 * 24))} days ago
                  </p>
                </div>
                {!n.read && (
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2"></div>
                )}
                <button
                  onClick={() => deleteNotification(n.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100"
                  style={{ opacity: 1 }} // Always show for now, or use group
                  aria-label="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
