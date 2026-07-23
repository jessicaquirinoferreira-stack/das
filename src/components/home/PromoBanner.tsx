import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Gift, Tag, ArrowRight, Sparkles } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const { selectCategory, showToast } = useStore();

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showToast(`Cupom "${code}" copiado! Use no checkout.`);
  };

  return (
    <section className="py-16 bg-[#2C221E] text-[#F8F5F2] relative overflow-hidden">
      {/* Decorative Accent Background Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#B87D7B]/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#8B9E87]/20 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#3A2E2B] p-8 sm:p-12 rounded-3xl border border-[#C5A059]/30 shadow-2xl">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C5A059]/20 text-[#C5A059] rounded-full text-xs font-bold uppercase tracking-widest border border-[#C5A059]/40">
              <Gift className="w-3.5 h-3.5" /> Presente de Boas-Vindas
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold leading-tight">
              Ganhe <span className="gradient-dua-text">15% OFF</span> na sua Primeira Compra
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 max-w-xl font-light leading-relaxed">
              Descubra por que a Dua Modas conecta milhares de mulheres em todo o Brasil. Use o cupom oficial na sacola de compras.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div
                onClick={() => handleCopyCode('BEMVINDA15')}
                className="px-5 py-3 bg-[#2C221E] border-2 border-dashed border-[#C5A059] rounded-2xl flex items-center gap-3 cursor-pointer hover:border-[#B87D7B] transition-colors group"
                title="Clique para copiar"
              >
                <Tag className="w-4 h-4 text-[#C5A059] group-hover:scale-110 transition-transform" />
                <span className="font-mono font-bold text-sm tracking-widest text-[#F8F5F2]">BEMVINDA15</span>
                <span className="text-[10px] text-[#8B9E87] uppercase font-bold ml-2">Copiar</span>
              </div>

              <button
                onClick={() => selectCategory(null)}
                className="py-3.5 px-6 gradient-dua-bg text-white font-bold rounded-2xl text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <span>Usar Meu Desconto Agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block text-center border-l border-[#C5A059]/20 pl-8">
            <div className="w-24 h-24 bg-[#B87D7B]/20 text-[#B87D7B] rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-10 h-10 animate-spin-slow" />
            </div>
            <p className="font-serif-luxury text-xl font-bold text-[#C5A059]">Moda que Conecta</p>
            <p className="text-xs text-stone-400 mt-1 font-light">Qualidade premium • Envio rápido • Troca fácil</p>
          </div>
        </div>
      </div>
    </section>
  );
};
