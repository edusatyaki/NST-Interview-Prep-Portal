import { useState } from "react";
import { X, Calendar, PlusCircle } from "lucide-react";

interface AddToRoadmapModalProps {
  company: { slug: string; name: string; role: string; initial: string; color: string } | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (duration: number) => void;
}

export default function AddToRoadmapModal({ company, isOpen, onClose, onConfirm }: AddToRoadmapModalProps) {
  const [duration, setDuration] = useState<number>(12);

  if (!isOpen || !company) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-lg">Add to Roadmap</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6 bg-gray-50 p-4 rounded-xl">
            <div className={`w-12 h-12 ${company.color} rounded-xl flex items-center justify-center text-white font-bold`}>
              {company.initial}
            </div>
            <div>
              <div className="font-bold text-gray-900">{company.name}</div>
              <div className="text-sm text-gray-500">{company.role}</div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Target Duration (Weeks)</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={4}>4 Weeks (Crash Course)</option>
                <option value={8}>8 Weeks (Standard)</option>
                <option value={12}>12 Weeks (Comprehensive)</option>
                <option value={24}>24 Weeks (Mastery)</option>
              </select>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              We&apos;ll automatically distribute the {company.name} curriculum across {duration} weeks based on your current skill level.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(duration);
                onClose();
              }}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
            >
              <PlusCircle className="w-4 h-4" /> Add to Roadmap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
