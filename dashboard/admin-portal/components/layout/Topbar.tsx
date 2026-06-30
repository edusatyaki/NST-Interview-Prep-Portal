export default function Topbar() {
  return (
    <header className="md:hidden fixed top-0 w-full h-16 bg-surface border-b border-outline-variant flex justify-between items-center px-6 z-40">
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">PlacePrep Admin</h1>
      <div className="flex gap-2">
        <button className="text-on-surface-variant hover:bg-surface-container-high rounded-full p-2 transition-opacity">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-on-surface-variant hover:bg-surface-container-high rounded-full p-2 transition-opacity">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
}
