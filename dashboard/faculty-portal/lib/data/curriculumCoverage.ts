export interface SubjectCoverage {
  subjectName: string;
  courseCode: string;
  coverage: {
    faang: number;
    indianProduct: number;
    indianService: number;
    startups: number;
  };
  industryDemand: "High" | "Medium" | "Low";
}

export const mockCurriculumCoverage: SubjectCoverage[] = [
  {
    subjectName: "Data Structures & Algo",
    courseCode: "CS201",
    coverage: { faang: 25, indianProduct: 45, indianService: 85, startups: 30 },
    industryDemand: "High"
  },
  {
    subjectName: "System Design",
    courseCode: "CS402",
    coverage: { faang: 5, indianProduct: 15, indianService: 40, startups: 10 },
    industryDemand: "High"
  },
  {
    subjectName: "DBMS & SQL",
    courseCode: "CS302",
    coverage: { faang: 60, indianProduct: 75, indianService: 95, startups: 55 },
    industryDemand: "High"
  },
  {
    subjectName: "Modern Web Dev",
    courseCode: "CS401",
    coverage: { faang: 20, indianProduct: 45, indianService: 50, startups: 15 },
    industryDemand: "High"
  },
  {
    subjectName: "OS & Networks",
    courseCode: "CS301",
    coverage: { faang: 65, indianProduct: 80, indianService: 90, startups: 50 },
    industryDemand: "Medium"
  },
  {
    subjectName: "Cloud Computing",
    courseCode: "CS305",
    coverage: { faang: 50, indianProduct: 55, indianService: 60, startups: 45 },
    industryDemand: "High"
  }
];

export function computeOverall(coverage: SubjectCoverage["coverage"]): number {
  const sum = coverage.faang + coverage.indianProduct + coverage.indianService + coverage.startups;
  return Math.round(sum / 4);
}
