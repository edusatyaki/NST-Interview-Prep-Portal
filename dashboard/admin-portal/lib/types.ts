export type PlacementStatus = "placed" | "in_progress" | "not_started"
export type FacultyStatus = "active" | "inactive"

export interface Student {
  id: string
  name: string
  initials: string
  batch: string
  roadmapProgress: number
  doubtsRaised: number
  sessionsAttended: number
  placementStatus: PlacementStatus
  company?: string
  email: string
}

export interface FacultyMember {
  id: string
  name: string
  initials: string
  subject: string
  department: string
  email: string
  sessionsAccepted: number
  sessionsDeclined: number
  avgSatisfaction: number
  responseRate: number
  status: FacultyStatus
}

export interface WeeklySession {
  week: string
  sessions: number
}
