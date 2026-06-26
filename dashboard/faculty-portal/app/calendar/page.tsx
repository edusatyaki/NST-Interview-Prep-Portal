"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, ArrowRight, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { mockSessionRequests, SessionRequest } from "@/lib/data/sessionRequests";
import { cn } from "@/lib/utils";

const DAYS_OF_WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); // Start at June 2026
  const [open, setOpen] = useState(false);
  const [sessions, setSessions] = useState<SessionRequest[]>(
    mockSessionRequests.filter(r => r.status === "accepted")
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get days in month and starting day of the week
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Calculate grid cells (previous month trailing days, current month days, next month leading days)
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const calendarCells = [];

  // Trailing days of previous month
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarCells.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  // Days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // Leading days of next month to fill grid (always 6 rows = 42 cells or just enough to finish the last week)
  const remainingCells = 42 - calendarCells.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarCells.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (d: Date) => {
    // For this simulation, today is June 26, 2026
    return d.getFullYear() === 2026 && d.getMonth() === 5 && d.getDate() === 26;
  };

  const getSessionsForDate = (d: Date) => {
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    // Also support custom format from mock data like "Jun 12, 2026"
    return sessions.filter(s => {
      // Very basic date matching for our mock format
      const reqDate = new Date(s.preferredDate);
      return reqDate.getDate() === d.getDate() && 
             reqDate.getMonth() === d.getMonth() && 
             reqDate.getFullYear() === d.getFullYear();
    });
  };

  const handleAddSession = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dateStr = formData.get("date") as string;
    
    const newReq: SessionRequest = {
      id: `req-${Date.now()}`,
      studentName: formData.get("name") as string,
      studentInitials: (formData.get("name") as string).split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase(),
      branch: "Faculty Added",
      year: "N/A",
      topicTag: formData.get("topic") as string,
      preferredDate: dateStr,
      preferredTime: formData.get("time") as string,
      endTime: "",
      note: "",
      status: "accepted",
    };
    setSessions([...sessions, newReq]);
    setOpen(false);
    toast.success("New session scheduled on calendar");
  };

  return (
    <div className="space-y-6 relative pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 hidden sm:block">Scheduled Sessions</h1>
        
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Button variant="outline" size="icon" onClick={handlePrevMonth} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-semibold w-28 text-center text-gray-800">
            {MONTHS[month]} {year}
          </span>
          <Button variant="outline" size="icon" onClick={handleNextMonth} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button className="bg-[#534AB7] hover:bg-[#433b9f] shadow-sm hidden sm:flex">
                <Plus className="mr-2 h-4 w-4" />
                New Session
              </Button>
            }
          />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Session</DialogTitle>
              <DialogDescription>
                Schedule a new doubt-clearing session directly on the calendar.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddSession} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Student Name</Label>
                <Input id="name" name="name" required placeholder="e.g. Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input id="topic" name="topic" required placeholder="e.g. System Design" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" required placeholder="Jun 16, 2026" defaultValue={`${MONTHS[month].substring(0,3)} 16, 2026`} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" name="time" required placeholder="10:00 AM" />
                </div>
              </div>
              <DialogFooter className="pt-4">
                <Button type="submit" className="bg-[#534AB7] hover:bg-[#433b9f]">Add Session</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50/50">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="py-3 text-center text-xs font-semibold tracking-wider text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 bg-gray-200 gap-[1px]">
          {calendarCells.map((cell, idx) => {
            const today = isToday(cell.date);
            const daySessions = getSessionsForDate(cell.date);
            
            return (
              <div 
                key={idx} 
                className={cn(
                  "min-h-28 bg-white p-2 relative transition-colors",
                  !cell.isCurrentMonth && "bg-gray-50/50 text-gray-400",
                  today && "bg-indigo-50/30"
                )}
              >
                <div className="flex flex-col">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className={cn(
                      "text-sm font-medium",
                      today ? "text-[#534AB7] font-bold" : (cell.isCurrentMonth ? "text-gray-900" : "text-gray-400")
                    )}>
                      {cell.date.getDate()}
                    </span>
                    {today && (
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] font-bold text-[#534AB7] tracking-wider mb-0.5">TODAY</span>
                        <div className="h-1.5 w-1.5 rounded-full bg-[#534AB7]" />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-1 mt-1">
                    {daySessions.map(session => (
                      <Popover key={session.id}>
                        <PopoverTrigger
                          render={
                            <button className="w-full text-left truncate rounded bg-indigo-100/80 hover:bg-indigo-200/80 px-1.5 py-1 text-xs font-medium text-indigo-800 border border-indigo-200/50 transition-colors" />
                          }
                        >
                          {session.studentName.split(' ')[0]} — {session.preferredTime}
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-4 shadow-lg border-gray-200">
                          <div className="space-y-3">
                            <div className="border-b border-gray-100 pb-3">
                              <h4 className="font-semibold text-gray-900">{session.studentName}</h4>
                              <p className="text-sm text-gray-500">{session.topicTag}</p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                                {session.preferredDate}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="mr-2 h-4 w-4 text-gray-400" />
                                {session.preferredTime} {session.endTime ? `- ${session.endTime}` : ''}
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming This Week</h2>
          <Button variant="link" className="text-[#534AB7] hover:text-indigo-800 p-0 h-auto font-medium">
            View All Sessions
          </Button>
        </div>
        
        <div className="space-y-3">
          {sessions.slice(0, 3).map((session, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-colors relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#534AB7]" />
              <div className="pl-3">
                <h4 className="font-bold text-gray-900 text-sm mb-0.5">{session.studentName}</h4>
                <p className="text-sm text-gray-500">{session.topicTag} {session.note ? `— ${session.note}` : ''}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#534AB7]">{session.preferredTime} {session.endTime ? `- ${session.endTime}` : ''}</p>
                  <p className="text-xs text-gray-500 font-medium">{session.preferredDate}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 group-hover:text-[#534AB7] h-8 w-8">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button (Mobile & Desktop) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button
              className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg bg-[#534AB7] hover:bg-[#433b9f] flex items-center justify-center p-0 z-10"
            />
          }
        >
          <Plus className="h-6 w-6 text-white" />
          <span className="sr-only">Add Session</span>
        </DialogTrigger>
        {/* The DialogContent is shared with the header button by keeping it un-nested or using the same state */}
      </Dialog>
    </div>
  );
}
