import {
  CompanyCategory,
  Difficulty,
  RoundType,
  Question,
  RoundGroup,
  CompanyIntel,
  companiesList,
  allQuestions,
  getCompanyIntel as mockGetCompanyIntel,
} from "./mock-data";

export interface PracticeFilters {
  category?: string;
  company?: string;
  topic?: string;
  difficulty?: Difficulty | "";
}

export interface UserRoadmapCompany {
  slug: string;
  name: string;
  role: string;
  totalWeeks: number;
  currentWeek: number;
  completedWeeks: number;
  pctComplete: number;
  weeks: RoadmapWeek[];
}

export interface RoadmapWeek {
  weekNumber: number;
  topic: string;
  totalQuestions: number;
  doneQuestions: number;
  status: "done" | "active" | "locked";
  questions: Question[];
}

export interface PracticeCategory {
  id: string;
  label: string;
  icon: string;
  totalQuestions: number;
  color: string;
  roundType: RoundType | "Mock OA" | "MCQs" | "Maths";
}

export interface Notification {
  id: string;
  type: "badge" | "new_company" | "roadmap" | "experience" | "question";
  title: string;
  timestamp: Date;
  read: boolean;
}

// ---------------------------------------------------------
// API ABSTRACTION LAYER
// ---------------------------------------------------------

export async function getCompanies() {
  // MOCK
  return companiesList;
}

export async function getCompanyIntel(slug: string): Promise<CompanyIntel> {
  return mockGetCompanyIntel(slug);
}

export async function getPracticeQuestions(filters: PracticeFilters): Promise<Question[]> {
  // In MOCK, we just filter the allQuestions array
  return allQuestions.filter((q) => {
    const matchesCompany = !filters.company || filters.company === "All" || q.companies.includes(filters.company);
    const matchesTopic = !filters.topic || filters.topic === "All" || q.topic === filters.topic;
    const matchesDiff = !filters.difficulty || q.diff === filters.difficulty;
    
    // In the new design, "category" maps to a roundType loosely for the Mock data
    let matchesCategory = true;
    if (filters.category) {
      if (filters.category === "dsa") matchesCategory = q.roundType === "Coding";
      else if (filters.category === "system-design") matchesCategory = q.roundType === "System Design";
      else if (filters.category === "hr") matchesCategory = q.roundType === "HR";
      else if (filters.category === "aptitude") matchesCategory = q.roundType === "Aptitude";
      else if (filters.category === "lld") matchesCategory = q.roundType === "LLD";
      // other categories...
    }

    return matchesCompany && matchesTopic && matchesDiff && matchesCategory;
  });
}

// Add more as needed
