import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast) return null;

  const bgColors = {
    success: 'bg-[#8B9E87] text-white shadow-lg shadow-[#8B9E87]/20',
    error: 'bg-[#B87D7B] text-white shadow-lg shadow-[#B87D7B]/20',
    info: 'bg-[#2C221E] text-[#F8F5F2] shadow-lg shadow-[#2C221E]/20'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-full text-sm font-medium ${bgColors[toast.type]}`}>
        {icons[toast.type]}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
