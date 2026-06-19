import Link from "next/link";
import { Code2, Server, Calculator, Users, Binary, BookOpen, Target, Brain } from "lucide-react";
import { PracticeCategory } from "@/lib/api";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6" />,
  Server: <Server className="w-6 h-6" />,
  Calculator: <Calculator className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Binary: <Binary className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Target: <Target className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />
};

export default function CategoryCard({ category, isActive, onClick }: { category: PracticeCategory, isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative p-5 rounded-2xl border text-left transition-all ${
        isActive 
          ? "bg-white border-blue-600 ring-1 ring-blue-600 shadow-md" 
          : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${category.color} text-white`}>
        {iconMap[category.icon] || <Code2 className="w-6 h-6" />}
      </div>
      <h3 className="font-bold text-gray-900 mb-1">{category.label}</h3>
      <p className="text-xs text-gray-500">{category.totalQuestions}+ questions</p>
      
      {isActive && (
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-b border-r border-blue-600 transform rotate-45 z-10" />
      )}
    </button>
  );
}
