import React from 'react';
import { ShieldCheck, Lock, Award } from 'lucide-react';

export const TrustAndPaymentBar: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-white dark:bg-[#2C221E] border-t border-b border-[#C5A059]/15">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-12">
        
        {/* Formas de pagamento */}
        <div className="space-y-6">
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2C221E] dark:text-[#F8F5F2] tracking-wide">
            Formas de pagamento
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto">
            {/* Mastercard */}
            <div className="h-11 px-4 bg-white border border-stone-200 rounded-xl flex items-center justify-center shadow-xs hover:border-[#C5A059] transition-all">
              <svg className="h-6 w-auto" viewBox="0 0 36 24" fill="none">
                <circle cx="13" cy="12" r="9" fill="#EB001B" />
                <circle cx="23" cy="12" r="9" fill="#F79E1B" fillOpacity="0.9" />
                <path d="M18 5.76a8.96 8.96 0 013 6.24 8.96 8.96 0 01-3 6.24 8.96 8.96 0 01-3-6.24 8.96 8.96 0 013-6.24z" fill="#FF5F00" />
              </svg>
              <span className="ml-2 text-xs font-bold text-stone-800 tracking-tight">mastercard</span>
            </div>

            {/* VISA */}
            <div className="h-11 px-4 bg-white border border-stone-200 rounded-xl flex items-center justify-center shadow-xs hover:border-[#C5A059] transition-all">
              <span className="font-extrabold italic text-base tracking-tighter text-[#1A1F71]">
                VISA
              </span>
            </div>

            {/* American Express */}
            <div className="h-11 px-4 bg-[#016FD0] border border-[#016FD0] rounded-xl flex items-center justify-center shadow-xs hover:opacity-95 transition-all text-white">
              <span className="font-black text-xs tracking-wider uppercase leading-none">
                AMEX
              </span>
            </div>

            {/* Diners Club */}
            <div className="h-11 px-4 bg-white border border-stone-200 rounded-xl flex items-center justify-center shadow-xs hover:border-[#C5A059] transition-all gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#004A97] flex items-center justify-center text-white font-serif text-[10px] font-bold">
                D
              </div>
              <span className="text-xs font-bold text-[#004A97] tracking-tight">Diners Club</span>
            </div>

            {/* Hipercard */}
            <div className="h-11 px-4 bg-[#B3131B] border border-[#B3131B] rounded-xl flex items-center justify-center shadow-xs hover:opacity-95 transition-all text-white">
              <span className="font-black italic text-xs tracking-tight">
                Hipercard
              </span>
            </div>

            {/* Hiper */}
            <div className="h-11 px-4 bg-[#1F1F1F] border border-[#1F1F1F] rounded-xl flex items-center justify-center shadow-xs hover:opacity-95 transition-all text-white">
              <span className="font-black italic text-xs tracking-tight text-amber-400">
                Hiper
              </span>
            </div>

            {/* Elo */}
            <div className="h-11 px-4 bg-black border border-black rounded-xl flex items-center justify-center shadow-xs hover:opacity-95 transition-all text-white">
              <span className="font-black text-xs tracking-widest uppercase text-amber-400">
                elo
              </span>
            </div>

            {/* PIX */}
            <div className="h-11 px-4 bg-white border border-stone-200 rounded-xl flex items-center justify-center shadow-xs hover:border-[#C5A059] transition-all gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4.5 9.5L12 17L19.5 9.5L12 2Z" fill="#32BCAD" />
                <path d="M12 7L7.5 11.5L12 16L16.5 11.5L12 7Z" fill="#008080" />
              </svg>
              <span className="font-black text-xs text-[#32BCAD] tracking-wide uppercase">pix</span>
            </div>
          </div>
        </div>

        {/* Compra 100% Segura */}
        <div className="space-y-6 pt-4">
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2C221E] dark:text-[#F8F5F2] tracking-wide">
            Compra 100% segura
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-4 max-w-xl mx-auto">
            {/* Site Blindado */}
            <div className="flex items-center gap-2.5 px-5 py-2.5 bg-[#202938] text-white rounded-xl shadow-xs border border-stone-700">
              <div className="w-7 h-7 bg-[#38A169] rounded-lg flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left leading-none">
                <span className="block text-xs font-black tracking-wider uppercase text-white">SITE BLINDADO</span>
              </div>
            </div>

            {/* Google Safe Browsing */}
            <div className="flex items-center gap-2.5 px-5 py-2.5 bg-white border border-stone-200 rounded-xl shadow-xs">
              <div className="w-7 h-7 bg-[#34A853] rounded-full flex items-center justify-center text-white">
                <Lock className="w-4 h-4" />
              </div>
              <div className="text-left leading-none">
                <span className="block text-[10px] font-bold text-stone-500 uppercase">Google</span>
                <span className="block text-xs font-black text-stone-800 tracking-tight">Safe Browsing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Certification Stamps / Badges (GPTW & Lugar Incrível) */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
          {/* Great Place To Work Badge */}
          <div className="w-36 bg-[#E31B23] text-white rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md border-2 border-white">
            <span className="text-xs font-black tracking-tight leading-tight uppercase">
              Great<br/>Place<br/>To<br/>Work®
            </span>
            <div className="w-full my-2 border-t border-white/40" />
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white text-[#E31B23] px-2 py-0.5 rounded-full">
              Certificada
            </span>
            <span className="text-[8px] mt-1 text-white/90 font-medium">Nov/2024 - Nov/2025</span>
          </div>

          {/* Lugar Incrível para Trabalhar */}
          <div className="w-36 bg-gradient-to-b from-[#FF6B00] to-[#D93800] text-white rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-md border-2 border-white">
            <Award className="w-6 h-6 mb-1 text-amber-200" />
            <span className="text-xs font-black tracking-tight uppercase leading-tight">
              Lugar Incrível
            </span>
            <span className="text-[9px] font-semibold text-amber-100 uppercase">Para Trabalhar</span>
            <div className="w-full my-1.5 border-t border-white/30" />
            <span className="text-[8px] uppercase font-bold text-white/90">Certificado de Clima</span>
          </div>
        </div>

      </div>
    </section>
  );
};
