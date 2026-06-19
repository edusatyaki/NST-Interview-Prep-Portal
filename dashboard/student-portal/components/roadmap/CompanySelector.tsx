import { ChevronDown } from "lucide-react";

interface CompanySelectorProps {
  companies: { slug: string; name: string; role: string }[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
}

export default function CompanySelector({ companies, selectedSlug, onSelect }: CompanySelectorProps) {
  if (companies.length === 0) return null;

  return (
    <div className="relative inline-block text-left mb-6">
      <select
        value={selectedSlug}
        onChange={(e) => onSelect(e.target.value)}
        className="appearance-none bg-white border border-gray-200 text-gray-900 font-bold text-xl rounded-xl pl-4 pr-10 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        {companies.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name} {c.role}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}
