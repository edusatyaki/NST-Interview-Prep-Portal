# NST PlacePrep - Student Portal Demo

NST PlacePrep is a structured, data-driven interview preparation portal designed for Newton School of Technology (NST) students to prepare for high-tier technical and behavioral interviews. The application provides personalized roadmaps, company intelligence, curriculum gap analysis, and progress tracking.

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Package Manager**: npm

---

## Directory Structure

The following layout represents the tracked codebase structure. Build artifacts, local environment variables, design assets, and development dependencies are omitted in accordance with the project's `.gitignore` rules.

```text
student-portal-demo/
├── app/                              # Next.js App Router root
│   ├── (app)/                        # Main dashboard shell (requires authentication)
│   │   ├── companies/                # Company intelligence & interview experiences
│   │   ├── dashboard/                # Main student dashboard
│   │   ├── leaderboard/              # Peer rankings and leaderboards
│   │   ├── practice/                 # Curated interview questions
│   │   ├── profile/                  # Student profile settings
│   │   ├── progress/                 # Dynamic progress tracking
│   │   ├── roadmap/                  # Custom 100-day roadmaps
│   │   ├── submit/                   # Submit interview experience portal
│   │   └── layout.tsx                # Dashboard navigation frame (Sidebar + Navbar)
│   ├── login/                        # Student sign-in page
│   ├── onboarding/                   # Multi-step onboarding experience
│   │   ├── step1/                    # Domain selection (e.g., Software Dev, AI)
│   │   ├── step2/                    # Target companies selection
│   │   ├── step3/                    # Self-rating assessment
│   │   ├── step4/                    # Assessment quiz
│   │   └── step5/                    # Final roadmap generation step
│   ├── register/                     # Registration/Sign-up page
│   ├── favicon.ico                   # App icon
│   ├── globals.css                   # Global CSS & Tailwind rules
│   ├── layout.tsx                    # Root layout wrapper
│   ├── not-found.tsx                 # Custom 404 page
│   └── page.tsx                      # Public landing page
├── components/                       # Shared component library
│   └── layout/                       # App layout components
│       ├── Navbar.tsx                # Dashboard top navigation
│       └── Sidebar.tsx               # Dashboard sidebar navigation
├── public/                           # Static assets & graphics
├── eslint.config.mjs                 # ESLint linting configuration
├── next.config.ts                    # Next.js configuration rules
├── package.json                      # NPM package scripts & dependencies
├── postcss.config.mjs                # PostCSS configuration for Tailwind
└── tsconfig.json                     # TypeScript compiler configuration
```

---

## Features

### 1. Interactive Onboarding Journey
Students complete a tailored 5-step wizard to dynamically initialize their profile:
- **Domain Selection**: Specify focus tracks (e.g. Frontend, Backend, Data Science).
- **Target Companies**: Identify target interview styles (e.g. MAANG, High-growth Startups).
- **Self-Rating**: Benchmark baseline skills across subjects.
- **Assessment Quiz**: Test current knowledge to identify skill gaps.
- **Roadmap Generation**: Receive a generated roadmap.

### 2. Company Intelligence
Deep-dives into specific hiring pipelines, focusing on active recruiting trends, interview loops, coding standards, and recent candidate reports.

### 3. Structured 100-Day Roadmaps
Day-by-day learning tasks customized according to the student’s current track and target companies.

### 4. Curriculum Gap Analysis
Surfaces non-traditional and advanced topics that are rarely covered in core classes but are regularly tested by elite engineering teams.

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.x or later) installed.

### Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.
