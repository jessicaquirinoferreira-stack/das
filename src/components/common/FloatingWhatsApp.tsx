import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageCircle, Instagram, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const rawNumber = settings.whatsappNumber || "5511956366343";
  const defaultMsg = encodeURIComponent(
    settings.floatingWhatsappMsg || "Olá Dua Modas! Vim pelo site e gostaria de tirar uma dúvida sobre a coleção."
  );
  const whatsappUrl = `https://wa.me/${rawNumber}?text=${defaultMsg}`;
  const instagramUrl = "https://www.instagram.com/dua_moda";

  return (
    <div className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-40 flex flex-col items-start gap-2.5 pointer-events-none">
      
      {/* Expanded WhatsApp Quick Contact Card */}
      {isOpen && (
        <div className="pointer-events-auto bg-white dark:bg-[#2C221E] p-4 rounded-2xl shadow-2xl border border-[#C5A059]/20 w-72 mb-1 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 border-b border-[#F8F5F2] dark:border-[#3A2E2B] mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#B87D7B]">Atendimento Dua Modas</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-stone-600 dark:text-stone-300 mb-3 leading-relaxed">
            Dúvidas sobre tamanhos, tecidos ou prazos? Fale diretamente com nossa equipe no WhatsApp!
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-[#8B9E87] hover:bg-[#748A70] text-white rounded-xl font-medium text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Iniciar Conversa no WhatsApp
          </a>
        </div>
      )}

      {/* Floating Buttons Group */}
      <div className="pointer-events-auto flex flex-col items-start gap-2.5">
        {/* Instagram Floating Button */}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Siga a Dua Modas no Instagram"
          className="relative group w-12 h-12 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:brightness-110 text-white rounded-full shadow-lg shadow-[#dc2743]/25 transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
        >
          <Instagram className="w-5 h-5 stroke-[2.2]" />
          <span className="absolute left-14 bg-[#2C221E] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md pointer-events-none">
            @dua_moda no Instagram
          </span>
        </a>

        {/* WhatsApp Floating Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Atendimento no WhatsApp"
          className="relative group w-12 h-12 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="absolute left-14 bg-[#2C221E] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md pointer-events-none">
            Fale no WhatsApp
          </span>
        </button>
      </div>

    </div>
  );
};

