import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setCurrentView, selectCategory } = useStore();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#F8F5F2] dark:bg-[#2C221E] py-12 lg:py-20 border-b border-[#C5A059]/20">
      {/* Background Decorative Soft Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B87D7B]/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B9E87]/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-[#3A2E2B]/80 rounded-full border border-[#C5A059]/30 shadow-xs backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#C5A059] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B87D7B]">
                Coleção Primavera-Verão 2026
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold text-[#2C221E] dark:text-[#F8F5F2] leading-[1.08] tracking-tight">
                Elegância que Expressa Quem Você É.
              </h1>

              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Modelagens fluidas, alfaiataria impecável e tecidos nobres pensados para conectar sofisticação, conforto e feminilidade em cada detalhe.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => selectCategory(null)}
                className="w-full sm:w-auto py-4 px-8 gradient-dua-bg text-white font-bold rounded-2xl text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-[#B87D7B]/20 hover:scale-105 transition-all duration-300"
              >
                <span>Explorar Coleção</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => selectCategory('vestidos')}
                className="w-full sm:w-auto py-4 px-8 bg-white dark:bg-[#3A2E2B] text-[#2C221E] dark:text-[#F8F5F2] border border-[#C5A059]/40 hover:border-[#B87D7B] font-bold rounded-2xl text-xs uppercase tracking-[0.2em] transition-all hover:shadow-md"
              >
                Ver Vestidos Midis
              </button>
            </div>

            {/* Mini Trust Stats */}
            <div className="pt-6 border-t border-[#C5A059]/20 flex items-center justify-center lg:justify-start gap-8 text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8B9E87]" />
                <span>+5.000 Peças Entregues</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#B87D7B]" />
                <span>Nota 4.9/5 em Satisfação</span>
              </div>
            </div>
          </div>

          {/* Right Composite Photography Stage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Luxury Frame Image */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C5A059]/30">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
                  alt="Dua Modas Look Exclusivo"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="px-2.5 py-1 bg-[#C5A059] text-[10px] font-bold uppercase rounded-full">
                    Destaque da Semana
                  </span>
                  <p className="font-serif-luxury text-xl font-bold mt-1">Conjunto Alfaiataria Linho Sálvia</p>
                </div>
              </div>

              {/* Floating Small Badge Card */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-[#3A2E2B] p-4 rounded-2xl border border-[#C5A059]/30 shadow-xl hidden sm:flex items-center gap-3 max-w-xs animate-bounce-slow">
                <div className="w-10 h-10 rounded-full bg-[#B87D7B]/20 text-[#B87D7B] flex items-center justify-center font-serif-luxury font-bold text-lg">
                  15%
                </div>
                <div className="text-xs">
                  <p className="font-bold text-[#2C221E] dark:text-[#F8F5F2]">Cupom BEMVINDA15</p>
                  <p className="text-stone-400">Na sua primeira compra no site</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
