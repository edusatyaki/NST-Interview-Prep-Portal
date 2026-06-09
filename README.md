# NST Interview Prep Portal

A unified data-driven portal with two distinct use cases — helping NST students prepare for technical interviews at specific companies, and helping faculty align the B.Tech CS & AI curriculum with what industry actually tests and hires for.

---

## Project Overview

Both use cases are powered by the same underlying data infrastructure: structured datasets about technical interview questions, hiring patterns, and in-demand skills scraped and curated from public sources.

### Use Case 1: Company-Specific Interview Prep Portal (Student-Facing)

An intelligent, structured guide that answers questions like:
- What topics does Google typically test in its SDE interviews?
- What is the typical interview format at a company like Amazon or Flipkart?
- What LeetCode-style problem categories appear most frequently at a given company?
- Are there common system design or behavioral questions for a particular role?

### Use Case 2: Curriculum Intelligence Dashboard (Faculty-Facing)

An internally-facing tool for faculty and academic planners that answers:
> *Are the skills we teach in our B.Tech CS & AI curriculum aligned with what companies actually test and hire for?*

Concretely, this means mapping structured interview data — topics, skills, problem types — against the existing course syllabus to produce a **gap analysis**: topics industry expects but aren't taught, and topics heavily covered that may have lower industry relevance.

---

## Data Sources

| Source | What It Contains |
|--------|-----------------|
| GeeksForGeeks | Company-tagged DSA problems, interview experiences, topic-wise questions |
| Glassdoor | Interview reviews, question logs by company and role, difficulty ratings |
| LeetCode Discuss | Company-tagged problems, community interview reports |
| InterviewBit | Topic and company-wise structured problem sets |
| AmbitionBox | Indian company-specific interview experiences and questions |
| LinkedIn Jobs | Job descriptions, required skills by company and role |
| Naukri.com | Job postings with skill tags relevant to Indian tech market |
| Reddit (r/cscareerquestions, r/india) | Anecdotal interview experiences, company-specific threads |
| GitHub Repos | Curated interview prep repos (e.g. awesome-interview-questions) |

### Data Fields Captured

- Company name and role/level (e.g., SDE-1, SDE-2, Data Analyst)
- Interview round type (technical coding, system design, HR, managerial)
- Topic/skill area (e.g., Dynamic Programming, OS, DBMS, Machine Learning)
- Problem statement or question summary
- Source URL and date of collection
- Difficulty level (Easy / Medium / Hard, if available)
- Frequency/recurrence signal (how often a topic/question appears)

---

## Technical Pipeline

```
Raw Web Data → Staging → Schema → Transformation → Classification → Product Layer
```

| Stage | Description | Status |
|-------|-------------|--------|
| 1. Source Discovery | Identify relevant websites, assess scrapability, check ToS and robots.txt | Week 1 |
| 2. Data Extraction | Build scrapers/parsers, extract raw HTML/JSON data | Week 1 |
| 3. Ingestion Pipeline | Load raw data into a staging area (files/database) | Week 2 |
| 4. Schema Design | Define structured schema for normalized interview data | Week 2 |
| 5. Data Transformation | Clean, normalize, and structure raw data | Week 2–3 |
| 6. Classification & Tagging | Tag by topic/company/role/difficulty; map to course syllabus | TBD |
| 7. Product Layer | Build views/dashboards for Use Case 1 and Use Case 2 | TBD |

---

## Repository Structure

```
NST-Interview-Prep-Portal/
├── scrapers/          # Source-specific scrapers and parsers
├── data/              # Raw and processed data
├── pipeline/          # Ingestion and transformation scripts
├── schema/            # Schema definitions
├── dashboard/         # Product layer — student and faculty views
└── docs/              # Documentation and analysis
```

---

## Getting Started

```bash
git clone https://github.com/edusatyaki/NST-Interview-Prep-Portal.git
cd NST-Interview-Prep-Portal
```

More setup instructions will be added as the project develops.

---

## Contributors

| Name | Role |
|------|------|
| Satyaki Das | Contributor |

---

## License

This project is for educational and research purposes at NST. Data is sourced from publicly available platforms in compliance with their respective Terms of Service.
