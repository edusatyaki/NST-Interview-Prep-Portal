export default function StudentsPage() {
  return (
    <>
      {/* Desktop Sticky Header (since layout no longer provides one) */}
      <header className="hidden md:flex h-16 px-container-padding justify-between items-center bg-surface border-b border-outline-variant shrink-0 sticky top-0 z-40">
        <div className="font-headline-md text-headline-md text-primary font-bold">
          PlacePrep Admin
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant">
          <button
            aria-label="notifications"
            className="p-2 rounded-full hover:bg-surface-container-high transition-opacity opacity-80"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button
            aria-label="settings"
            className="p-2 rounded-full hover:bg-surface-container-high transition-opacity opacity-80"
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button
            aria-label="help"
            className="p-2 rounded-full hover:bg-surface-container-high transition-opacity opacity-80"
          >
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-container-padding flex-1 min-h-[calc(100vh-64px)] bg-surface-container-low flex flex-col gap-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="font-headline-lg text-headline-lg text-on-surface m-0">
            Students
          </h1>
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-shadow"
                placeholder="Search students, batch, or ID..."
                type="text"
              />
            </div>
            <div className="flex gap-2 shrink-0">
              <select className="px-3 py-2 bg-surface border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary">
                <option>Batch (All)</option>
                <option>2024</option>
                <option>2025</option>
              </select>
              <select className="px-3 py-2 bg-surface border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary">
                <option>Status (All)</option>
                <option>Placed</option>
                <option>In Progress</option>
              </select>
              <button className="px-3 py-2 text-secondary hover:text-primary transition-colors flex items-center gap-1 font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[18px]">
                  clear_all
                </span>
                Clear Filters
              </button>
            </div>
          </div>
        </div>
        {/* Data Table Card */}
        <div className="bg-surface rounded-xl border border-outline-variant/50 shadow-sm overflow-hidden flex flex-col">
          <div className="px-container-padding py-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-bright">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Showing 120 students
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container text-on-surface-variant font-label-caps text-label-caps">
                <tr>
                  <th className="px-6 py-4 border-b border-outline-variant/50 font-bold w-[25%]">
                    NAME
                  </th>
                  <th className="px-6 py-4 border-b border-outline-variant/50 font-bold">
                    BATCH
                  </th>
                  <th className="px-6 py-4 border-b border-outline-variant/50 font-bold w-[20%]">
                    ROADMAP PROGRESS
                  </th>
                  <th className="px-6 py-4 border-b border-outline-variant/50 font-bold text-center">
                    DOUBTS RAISED
                  </th>
                  <th className="px-6 py-4 border-b border-outline-variant/50 font-bold text-center">
                    SESSIONS
                  </th>
                  <th className="px-6 py-4 border-b border-outline-variant/50 font-bold">
                    PLACEMENT STATUS
                  </th>
                  <th className="px-6 py-4 border-b border-outline-variant/50 font-bold text-right">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="font-data-cell text-data-cell text-on-surface bg-surface">
                {/* Row 1 */}
                <tr className="hover:bg-surface-container-low transition-colors group border-b border-outline-variant/20 last:border-b-0 h-row-height-standard">
                  <td className="px-6 py-3 font-semibold text-on-surface">
                    Arjun Sharma
                  </td>
                  <td className="px-6 py-3 text-on-surface-variant">2024</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                      <span className="text-xs text-on-surface-variant w-8">
                        85%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center text-on-surface-variant">
                    2
                  </td>
                  <td className="px-6 py-3 text-center text-on-surface-variant">
                    12
                  </td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-label-caps font-bold bg-teal-50 text-teal-700">
                      PLACED
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button className="text-primary hover:text-primary-container font-body-sm text-body-sm flex items-center justify-end gap-1 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                      View{" "}
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors group border-b border-outline-variant/20 last:border-b-0 h-row-height-standard">
                  <td className="px-6 py-3 font-semibold text-on-surface">
                    Meera Kapoor
                  </td>
                  <td className="px-6 py-3 text-on-surface-variant">2025</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: "45%" }}
                        ></div>
                      </div>
                      <span className="text-xs text-on-surface-variant w-8">
                        45%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center text-on-surface-variant">
                    5
                  </td>
                  <td className="px-6 py-3 text-center text-on-surface-variant">
                    8
                  </td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-label-caps font-bold bg-amber-50 text-amber-700">
                      IN PROGRESS
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button className="text-primary hover:text-primary-container font-body-sm text-body-sm flex items-center justify-end gap-1 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                      View{" "}
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="hover:bg-surface-container-low transition-colors group border-b border-outline-variant/20 last:border-b-0 h-row-height-standard">
                  <td className="px-6 py-3 font-semibold text-on-surface">
                    Rohan Desai
                  </td>
                  <td className="px-6 py-3 text-on-surface-variant">2024</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                      <span className="text-xs text-on-surface-variant w-8">
                        92%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center text-on-surface-variant">
                    1
                  </td>
                  <td className="px-6 py-3 text-center text-on-surface-variant">
                    15
                  </td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-label-caps font-bold bg-teal-50 text-teal-700">
                      PLACED
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button className="text-primary hover:text-primary-container font-body-sm text-body-sm flex items-center justify-end gap-1 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                      View{" "}
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </td>
                </tr>
                {/* Row 4 */}
                <tr className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors group border-b border-outline-variant/20 last:border-b-0 h-row-height-standard">
                  <td className="px-6 py-3 font-semibold text-on-surface">
                    Priya Singh
                  </td>
                  <td className="px-6 py-3 text-on-surface-variant">2025</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                      <span className="text-xs text-on-surface-variant w-8">
                        30%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center text-on-surface-variant">
                    8
                  </td>
                  <td className="px-6 py-3 text-center text-on-surface-variant">
                    4
                  </td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-label-caps font-bold bg-amber-50 text-amber-700">
                      IN PROGRESS
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button className="text-primary hover:text-primary-container font-body-sm text-body-sm flex items-center justify-end gap-1 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                      View{" "}
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </td>
                </tr>
                {/* Row 5 */}
                <tr className="hover:bg-surface-container-low transition-colors group border-b border-outline-variant/20 last:border-b-0 h-row-height-standard">
                  <td className="px-6 py-3 font-semibold text-on-surface">
                    Vikram Patel
                  </td>
                  <td className="px-6 py-3 text-on-surface-variant">2024</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                      <span className="text-xs text-on-surface-variant w-8">
                        15%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center text-on-surface-variant">
                    12
                  </td>
                  <td className="px-6 py-3 text-center text-on-surface-variant">
                    2
                  </td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-label-caps font-bold bg-rose-50 text-rose-700">
                      INACTIVE
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button className="text-primary hover:text-primary-container font-body-sm text-body-sm flex items-center justify-end gap-1 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                      View{" "}
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </td>
                </tr>
                {/* Row 6 */}
                <tr className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors group border-b border-outline-variant/20 last:border-b-0 h-row-height-standard">
                  <td className="px-6 py-3 font-semibold text-on-surface">
                    Ananya Iyer
                  </td>
                  <td className="px-6 py-3 text-on-surface-variant">2025</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                      <span className="text-xs text-on-surface-variant w-8">
                        78%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center text-on-surface-variant">
                    4
                  </td>
                  <td className="px-6 py-3 text-center text-on-surface-variant">
                    10
                  </td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-label-caps font-bold bg-amber-50 text-amber-700">
                      IN PROGRESS
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button className="text-primary hover:text-primary-container font-body-sm text-body-sm flex items-center justify-end gap-1 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                      View{" "}
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </td>
                </tr>
                {/* Row 7 */}
                <tr className="hover:bg-surface-container-low transition-colors group border-b border-outline-variant/20 last:border-b-0 h-row-height-standard">
                  <td className="px-6 py-3 font-semibold text-on-surface">
                    Karan Verma
                  </td>
                  <td className="px-6 py-3 text-on-surface-variant">2024</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                      <span className="text-xs text-on-surface-variant w-8">
                        100%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center text-on-surface-variant">
                    0
                  </td>
                  <td className="px-6 py-3 text-center text-on-surface-variant">
                    18
                  </td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-label-caps font-bold bg-teal-50 text-teal-700">
                      PLACED
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button className="text-primary hover:text-primary-container font-body-sm text-body-sm flex items-center justify-end gap-1 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                      View{" "}
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </td>
                </tr>
                {/* Row 8 */}
                <tr className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors group border-b border-outline-variant/20 last:border-b-0 h-row-height-standard">
                  <td className="px-6 py-3 font-semibold text-on-surface">
                    Sneha Reddy
                  </td>
                  <td className="px-6 py-3 text-on-surface-variant">2025</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: "55%" }}
                        ></div>
                      </div>
                      <span className="text-xs text-on-surface-variant w-8">
                        55%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-center text-on-surface-variant">
                    6
                  </td>
                  <td className="px-6 py-3 text-center text-on-surface-variant">
                    7
                  </td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-label-caps font-bold bg-amber-50 text-amber-700">
                      IN PROGRESS
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button className="text-primary hover:text-primary-container font-body-sm text-body-sm flex items-center justify-end gap-1 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                      View{" "}
                      <span className="material-symbols-outlined text-[16px]">
                        arrow_forward
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="px-container-padding py-4 border-t border-outline-variant/30 flex justify-end items-center bg-surface-bright">
            <div className="flex items-center gap-2">
              <button
                className="p-1.5 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50"
                disabled
              >
                <span className="material-symbols-outlined text-[20px]">
                  chevron_left
                </span>
              </button>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded bg-primary text-on-primary font-body-sm text-body-sm flex items-center justify-center">
                  1
                </button>
                <button className="w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-high font-body-sm text-body-sm flex items-center justify-center transition-colors">
                  2
                </button>
                <button className="w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-high font-body-sm text-body-sm flex items-center justify-center transition-colors">
                  3
                </button>
                <span className="w-8 h-8 flex items-center justify-center text-on-surface-variant">
                  ...
                </span>
                <button className="w-8 h-8 rounded text-on-surface-variant hover:bg-surface-container-high font-body-sm text-body-sm flex items-center justify-center transition-colors">
                  15
                </button>
              </div>
              <button className="p-1.5 rounded text-on-surface-variant hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined text-[20px]">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* Bottom Summary Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="bg-surface p-container-padding rounded-xl border border-outline-variant/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">work</span>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                PLACEMENT OVERVIEW
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">
                84% Success
              </div>
            </div>
          </div>
          <div className="bg-surface p-container-padding rounded-xl border border-outline-variant/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                AVG PROGRESS
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">
                72.4%
              </div>
            </div>
          </div>
          <div className="bg-surface p-container-padding rounded-xl border border-outline-variant/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">school</span>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                ACTIVE BATCHES
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">
                12
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
