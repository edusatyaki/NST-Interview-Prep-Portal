export default function ManageFacultyPage() {
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
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-lg text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-shadow"
              placeholder="Search faculty members..."
              type="text"
            />
          </div>
          <button className="bg-primary text-on-primary font-body-md font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm cursor-pointer flex items-center gap-2">
            <span className="material-symbols-outlined">add</span>Add New Faculty
          </button>
        </div>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          {/* Left Panel: Add New Faculty (Not rendered in this view apparently, commented out in HTML) */}
          {/* Right Panel: Current Faculty */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
              Current Faculty
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Faculty Card 1 */}
              <div className="bg-surface rounded-xl border border-outline-variant/50 shadow-sm p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center text-on-surface-variant font-bold text-lg shrink-0">
                      AM
                    </div>
                    <div>
                      <h3 className="font-headline-md text-on-surface text-base">
                        Dr. Alan Mathison
                      </h3>
                      <p className="font-body-sm text-on-surface-variant">
                        Computer Science
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-label-caps font-bold bg-teal-50 text-teal-700 border border-teal-200/50">
                    ACTIVE
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
                  <span className="font-body-sm text-on-surface-variant truncate">
                    alan@university.edu
                  </span>
                  <button className="text-secondary hover:text-primary transition-colors p-1">
                    <span className="material-symbols-outlined text-[18px]">
                      more_vert
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Faculty Card 2 */}
              <div className="bg-surface rounded-xl border border-outline-variant/50 shadow-sm p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center text-on-surface-variant font-bold text-lg shrink-0">
                      SJ
                    </div>
                    <div>
                      <h3 className="font-headline-md text-on-surface text-base">
                        Prof. Sarah Jenkins
                      </h3>
                      <p className="font-body-sm text-on-surface-variant">
                        Mathematics
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-label-caps font-bold bg-teal-50 text-teal-700 border border-teal-200/50">
                    ACTIVE
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
                  <span className="font-body-sm text-on-surface-variant truncate">
                    s.jenkins@university.edu
                  </span>
                  <button className="text-secondary hover:text-primary transition-colors p-1">
                    <span className="material-symbols-outlined text-[18px]">
                      more_vert
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Faculty Card 3 */}
              <div className="bg-surface rounded-xl border border-outline-variant/50 shadow-sm p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center text-on-surface-variant font-bold text-lg shrink-0">
                      MR
                    </div>
                    <div>
                      <h3 className="font-headline-md text-on-surface text-base">
                        Dr. Marcus Reed
                      </h3>
                      <p className="font-body-sm text-on-surface-variant">
                        Physics
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-label-caps font-bold bg-amber-50 text-amber-700 border border-amber-200/50">
                    INVITE PENDING
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
                  <span className="font-body-sm text-on-surface-variant truncate">
                    m.reed@university.edu
                  </span>
                  <button className="text-secondary hover:text-primary transition-colors p-1">
                    <span className="material-symbols-outlined text-[18px]">
                      more_vert
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Faculty Card 4 */}
              <div className="bg-surface rounded-xl border border-outline-variant/50 shadow-sm p-5 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center text-on-surface-variant font-bold text-lg shrink-0">
                      EL
                    </div>
                    <div>
                      <h3 className="font-headline-md text-on-surface text-base">
                        Prof. Elena Lopez
                      </h3>
                      <p className="font-body-sm text-on-surface-variant">
                        Engineering
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-label-caps font-bold bg-teal-50 text-teal-700 border border-teal-200/50">
                    ACTIVE
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
                  <span className="font-body-sm text-on-surface-variant truncate">
                    elena.l@university.edu
                  </span>
                  <button className="text-secondary hover:text-primary transition-colors p-1">
                    <span className="material-symbols-outlined text-[18px]">
                      more_vert
                    </span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                className="p-2 rounded border border-outline-variant hover:bg-surface-container-high text-on-surface-variant disabled:opacity-50"
                disabled
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded bg-primary text-on-primary font-medium">
                1
              </button>
              <button className="w-10 h-10 rounded border border-outline-variant hover:bg-surface-container-high text-on-surface-variant">
                2
              </button>
              <button className="w-10 h-10 rounded border border-outline-variant hover:bg-surface-container-high text-on-surface-variant">
                3
              </button>
              <button className="p-2 rounded border border-outline-variant hover:bg-surface-container-high text-on-surface-variant">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Summary Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          <div className="bg-surface p-container-padding rounded-xl border border-outline-variant/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">group</span>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                TOTAL FACULTY
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">
                24
              </div>
            </div>
          </div>
          <div className="bg-surface p-container-padding rounded-xl border border-outline-variant/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                ACTIVE INVITES
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">
                03
              </div>
            </div>
          </div>
          <div className="bg-surface p-container-padding rounded-xl border border-outline-variant/50 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <div>
              <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                ENGAGEMENT RATE
              </div>
              <div className="font-headline-md text-headline-md text-on-surface">
                92%
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
