import React from "react";

export default function FacultyPage() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface m-0">
          Faculty Performance
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Performance Analytics — Real-time engagement and satisfaction metrics
          across departments.
        </p>
      </div>
      
      {/* Bento Grid Layout for Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-xl border border-outline-variant/50 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined">check_circle</span>
          </div>
          <div>
            <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
              TOTAL SESSIONS
            </div>
            <div className="font-headline-md text-headline-md text-on-surface">
              1,248
            </div>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-outline-variant/50 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined">star</span>
          </div>
          <div>
            <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
              GLOBAL SATISFACTION
            </div>
            <div className="font-headline-md text-headline-md text-on-surface">
              4.52
            </div>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-outline-variant/50 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined">trending_up</span>
          </div>
          <div>
            <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
              RESPONSE TARGET
            </div>
            <div className="font-headline-md text-headline-md text-on-surface">
              82% Success
            </div>
          </div>
        </div>
      </div>
      
      {/* Data Table Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/50 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-outline-variant/30 flex justify-between items-center bg-surface-bright">
          <h3 className="font-headline-lg text-headline-lg text-on-surface text-[20px]">
            Faculty Directory
          </h3>
          <button className="flex items-center gap-2 text-primary hover:bg-surface-container-low px-4 py-2 rounded-lg transition-colors font-label-sm text-label-sm uppercase">
            <span className="material-symbols-outlined text-[18px]">
              filter_list
            </span>
            Filter
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container text-on-surface-variant font-label-caps text-label-caps">
                <th className="font-label-sm text-label-sm text-on-surface-variant py-3 px-6 uppercase tracking-wider font-bold">
                  Faculty Member
                </th>
                <th className="font-label-sm text-label-sm text-on-surface-variant py-3 px-6 uppercase tracking-wider font-bold">
                  Subject
                </th>
                <th className="font-label-sm text-label-sm text-on-surface-variant py-3 px-6 uppercase tracking-wider font-bold text-center">
                  Accepted / Declined
                </th>
                <th className="font-label-sm text-label-sm text-on-surface-variant py-3 px-6 uppercase tracking-wider font-bold text-center">
                  Avg Satisfaction
                </th>
                <th className="font-label-sm text-label-sm text-on-surface-variant py-3 px-6 uppercase tracking-wider font-bold text-center">
                  Response Rate
                </th>
                <th className="font-label-sm text-label-sm text-on-surface-variant py-3 px-6 uppercase tracking-wider font-bold text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md text-on-surface divide-y divide-outline-variant/20">
              {/* Row 1 */}
              <tr className="even:bg-primary/[0.02] hover:bg-surface-container-low/50 transition-colors h-[52px]">
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden shrink-0">
                      <img
                        alt="Faculty Avatar"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfazAxOQ5Rf2z1oHRIhep5DHNujb1pK8-4rKb_f2difJtJDofEoStKHy0KG2Tz2Nq3Fz_JkCjXExe-y4sEm1Wyf8ogHD1qVWwTRIQvjPWfCkJjzpona5qEUHQlrpdk0iPPIXxJiF9gKmioeWHqyRTr57pZfwYKF82vqziyfd97fkFRYStXgp4lljVlbInX31a0otG3inalAzrJZH7OlUEuoH0H0ji5gx6DYcCdZHRf_CsqNnBnZcrL2xe4wJml_zOwkFECPyZABBGB"
                      />
                    </div>
                    <span className="font-medium">John Doe</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-on-surface-variant">DS</td>
                <td className="py-3 px-6 text-center">
                  <span className="text-secondary font-medium">45</span>{" "}
                  <span className="text-outline mx-1">/</span>{" "}
                  <span className="text-error/80">2</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px] text-tertiary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-medium">4.2</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">87%</td>
                <td className="py-3 px-6 text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-label-caps font-bold bg-teal-50 text-teal-700">
                    ACTIVE
                  </span>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="even:bg-primary/[0.02] hover:bg-surface-container-low/50 transition-colors h-[52px]">
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">
                      SS
                    </div>
                    <span className="font-medium">Sarah Smith</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-on-surface-variant">ML</td>
                <td className="py-3 px-6 text-center">
                  <span className="text-secondary font-medium">32</span>{" "}
                  <span className="text-outline mx-1">/</span>{" "}
                  <span className="text-error/80">8</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px] text-tertiary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-medium">4.9</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">94%</td>
                <td className="py-3 px-6 text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold leading-none bg-surface-container-high text-on-surface-variant tracking-wider uppercase border border-outline-variant/50">
                    Active
                  </span>
                </td>
              </tr>
              {/* Row 3 (Inactive) */}
              <tr className="even:bg-primary/[0.02] hover:bg-surface-container-low/50 transition-colors h-[52px] opacity-60">
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold text-xs">
                      MK
                    </div>
                    <span className="font-medium text-on-surface-variant">
                      Mark Knight
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-outline">Web Dev</td>
                <td className="py-3 px-6 text-center">
                  <span className="text-secondary/60 font-medium">18</span>{" "}
                  <span className="text-outline/60 mx-1">/</span>{" "}
                  <span className="text-error/60">15</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px] text-tertiary-container/60"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-medium text-on-surface-variant">
                      2.5
                    </span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center text-on-surface-variant">
                  42%
                </td>
                <td className="py-3 px-6 text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-label-caps font-bold bg-rose-50 text-rose-700">
                    INACTIVE
                  </span>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="even:bg-primary/[0.02] hover:bg-surface-container-low/50 transition-colors h-[52px]">
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">
                      AL
                    </div>
                    <span className="font-medium">Alice Liu</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-on-surface-variant">
                  System Design
                </td>
                <td className="py-3 px-6 text-center">
                  <span className="text-secondary font-medium">56</span>{" "}
                  <span className="text-outline mx-1">/</span>{" "}
                  <span className="text-error/80">4</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px] text-tertiary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-medium">4.8</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">91%</td>
                <td className="py-3 px-6 text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold leading-none bg-surface-container-high text-on-surface-variant tracking-wider uppercase border border-outline-variant/50">
                    Active
                  </span>
                </td>
              </tr>
              {/* Row 5 */}
              <tr className="even:bg-primary/[0.02] hover:bg-surface-container-low/50 transition-colors h-[52px]">
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">
                      RP
                    </div>
                    <span className="font-medium">Robert Patel</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-on-surface-variant">Algorithms</td>
                <td className="py-3 px-6 text-center">
                  <span className="text-secondary font-medium">41</span>{" "}
                  <span className="text-outline mx-1">/</span>{" "}
                  <span className="text-error/80">5</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px] text-tertiary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-medium">4.5</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">88%</td>
                <td className="py-3 px-6 text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold leading-none bg-surface-container-high text-on-surface-variant tracking-wider uppercase border border-outline-variant/50">
                    Active
                  </span>
                </td>
              </tr>
              {/* Row 6 */}
              <tr className="even:bg-primary/[0.02] hover:bg-surface-container-low/50 transition-colors h-[52px]">
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">
                      EM
                    </div>
                    <span className="font-medium">Elena Moore</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-on-surface-variant">
                  Database Mgmt
                </td>
                <td className="py-3 px-6 text-center">
                  <span className="text-secondary font-medium">29</span>{" "}
                  <span className="text-outline mx-1">/</span>{" "}
                  <span className="text-error/80">12</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px] text-tertiary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-medium">3.9</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">76%</td>
                <td className="py-3 px-6 text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-label-caps font-bold bg-amber-50 text-amber-700">
                    PENDING
                  </span>
                </td>
              </tr>
              {/* Row 7 */}
              <tr className="even:bg-primary/[0.02] hover:bg-surface-container-low/50 transition-colors h-[52px] border-b-0">
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">
                      DC
                    </div>
                    <span className="font-medium">David Chang</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-on-surface-variant">Cloud Comp</td>
                <td className="py-3 px-6 text-center">
                  <span className="text-secondary font-medium">50</span>{" "}
                  <span className="text-outline mx-1">/</span>{" "}
                  <span className="text-error/80">1</span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px] text-tertiary-container"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-medium">4.9</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">98%</td>
                <td className="py-3 px-6 text-right">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold leading-none bg-surface-container-high text-on-surface-variant tracking-wider uppercase border border-outline-variant/50">
                    Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
