import type { Student, FacultyMember, WeeklySession } from "./types"

export const overviewStats = {
  studentsOnRoadmap: 84,
  doubtsRaised: 210,
  sessionsBooked: 143,
  sessionsCompleted: 118,
  avgSatisfaction: 4.3,
  placementRate: 68,
  studentsInProgress: 20,
  studentsNotStarted: 12,
}

export const sessionsPerWeek: WeeklySession[] = [
  { week: "W1", sessions: 12 },
  { week: "W2", sessions: 18 },
  { week: "W3", sessions: 15 },
  { week: "W4", sessions: 22 },
  { week: "W5", sessions: 28 },
  { week: "W6", sessions: 25 },
  { week: "W7", sessions: 31 },
  { week: "W8", sessions: 29 },
]

export const students: Student[] = [
  { id: "STU-8821", name: "Arjun Sharma",  initials: "AS", batch: "2025 A", roadmapProgress: 78, doubtsRaised: 12, sessionsAttended: 45, placementStatus: "placed",      company: "Flipkart",  email: "arjun.sharma@nst.edu"  },
  { id: "STU-8822", name: "Meera Kapoor",  initials: "MK", batch: "2024 C", roadmapProgress: 92, doubtsRaised: 4,  sessionsAttended: 52, placementStatus: "in_progress",               email: "meera.kapoor@nst.edu"  },
  { id: "STU-8823", name: "Rohan Verma",   initials: "RV", batch: "2025 A", roadmapProgress: 45, doubtsRaised: 28, sessionsAttended: 31, placementStatus: "not_started",               email: "rohan.verma@nst.edu"   },
  { id: "STU-8824", name: "Sneha Patel",   initials: "SP", batch: "2025 B", roadmapProgress: 61, doubtsRaised: 8,  sessionsAttended: 48, placementStatus: "in_progress",               email: "sneha.patel@nst.edu"   },
  { id: "STU-8825", name: "Aditya Kumar",  initials: "AK", batch: "2024 C", roadmapProgress: 100,doubtsRaised: 2,  sessionsAttended: 60, placementStatus: "placed",      company: "Google",    email: "aditya.kumar@nst.edu"  },
  { id: "STU-8826", name: "Isha Singh",    initials: "IS", batch: "2025 A", roadmapProgress: 25, doubtsRaised: 15, sessionsAttended: 12, placementStatus: "not_started",               email: "isha.singh@nst.edu"    },
  { id: "STU-8827", name: "Vikram Das",    initials: "VD", batch: "2025 B", roadmapProgress: 84, doubtsRaised: 6,  sessionsAttended: 50, placementStatus: "in_progress",               email: "vikram.das@nst.edu"    },
  { id: "STU-8828", name: "Pooja Reddy",   initials: "PR", batch: "2024 C", roadmapProgress: 100,doubtsRaised: 0,  sessionsAttended: 64, placementStatus: "placed",      company: "Amazon",    email: "pooja.reddy@nst.edu"   },
  { id: "STU-8829", name: "Nikhil Joshi",  initials: "NJ", batch: "2025 A", roadmapProgress: 55, doubtsRaised: 9,  sessionsAttended: 33, placementStatus: "in_progress",               email: "nikhil.joshi@nst.edu"  },
  { id: "STU-8830", name: "Ananya Roy",    initials: "AR", batch: "2024 C", roadmapProgress: 70, doubtsRaised: 5,  sessionsAttended: 41, placementStatus: "placed",      company: "Microsoft", email: "ananya.roy@nst.edu"    },
  { id: "STU-8831", name: "Rahul Mehta",   initials: "RM", batch: "2025 B", roadmapProgress: 38, doubtsRaised: 19, sessionsAttended: 22, placementStatus: "not_started",               email: "rahul.mehta@nst.edu"   },
  { id: "STU-8832", name: "Priya Nair",    initials: "PN", batch: "2025 A", roadmapProgress: 66, doubtsRaised: 11, sessionsAttended: 37, placementStatus: "in_progress",               email: "priya.nair@nst.edu"    },
  { id: "STU-8833", name: "Siddharth Rao", initials: "SR", batch: "2024 C", roadmapProgress: 89, doubtsRaised: 3,  sessionsAttended: 55, placementStatus: "placed",      company: "Wipro",     email: "siddharth.rao@nst.edu" },
  { id: "STU-8834", name: "Kavya Iyer",    initials: "KI", batch: "2025 B", roadmapProgress: 52, doubtsRaised: 14, sessionsAttended: 29, placementStatus: "in_progress",               email: "kavya.iyer@nst.edu"    },
  { id: "STU-8835", name: "Devraj Pillai", initials: "DP", batch: "2025 A", roadmapProgress: 18, doubtsRaised: 22, sessionsAttended: 8,  placementStatus: "not_started",               email: "devraj.pillai@nst.edu" },
]

export const faculty: FacultyMember[] = [
  { id: "FAC-001", name: "Dr. Sarah Smith",  initials: "SS", subject: "Machine Learning",    department: "CS & AI", email: "sarah.smith@nst.edu",   sessionsAccepted: 32, sessionsDeclined: 8,  avgSatisfaction: 4.9, responseRate: 94, status: "active"   },
  { id: "FAC-002", name: "Prof. John Doe",   initials: "JD", subject: "Data Structures",     department: "CS",      email: "john.doe@nst.edu",      sessionsAccepted: 45, sessionsDeclined: 2,  avgSatisfaction: 4.2, responseRate: 87, status: "active"   },
  { id: "FAC-003", name: "Mark Knight",      initials: "MK", subject: "Web Development",     department: "CS",      email: "mark.knight@nst.edu",   sessionsAccepted: 18, sessionsDeclined: 15, avgSatisfaction: 2.5, responseRate: 42, status: "inactive" },
  { id: "FAC-004", name: "Dr. Alice Liu",    initials: "AL", subject: "System Design",       department: "CS & AI", email: "alice.liu@nst.edu",     sessionsAccepted: 56, sessionsDeclined: 4,  avgSatisfaction: 4.8, responseRate: 91, status: "active"   },
  { id: "FAC-005", name: "Robert Patel",     initials: "RP", subject: "Cybersecurity",       department: "CS",      email: "robert.patel@nst.edu",  sessionsAccepted: 29, sessionsDeclined: 1,  avgSatisfaction: 4.0, responseRate: 98, status: "active"   },
  { id: "FAC-006", name: "Dr. Elena Moore",  initials: "EM", subject: "Ethics in AI",        department: "CS & AI", email: "elena.moore@nst.edu",   sessionsAccepted: 64, sessionsDeclined: 5,  avgSatisfaction: 4.7, responseRate: 89, status: "active"   },
  { id: "FAC-007", name: "David Chang",      initials: "DC", subject: "Distributed Systems", department: "CS",      email: "david.chang@nst.edu",   sessionsAccepted: 22, sessionsDeclined: 3,  avgSatisfaction: 4.4, responseRate: 78, status: "active"   },
  { id: "FAC-008", name: "Priya Suresh",     initials: "PS", subject: "DBMS & SQL",          department: "CS & AI", email: "priya.suresh@nst.edu",  sessionsAccepted: 11, sessionsDeclined: 20, avgSatisfaction: 2.1, responseRate: 35, status: "inactive" },
]
