import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Logo } from '../common/Logo';
import { Sparkles, Heart, ShieldCheck, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentView } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="flex justify-center mb-4">
          <Logo variant="full" size="xl" showSlogan={true} />
        </div>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8B9E87] flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Nossa Filosofia
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-[#2C221E] dark:text-[#F8F5F2]">
          A História por Trás da Dua Modas
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-light">
          Acreditamos que vestir-se é um ato de conexão profunda com a própria beleza, força e autenticidade.
        </p>
      </div>

      {/* Story Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-[#C5A059]/20">
          <img
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80"
            alt="Dua Modas Atelier"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6 text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
          <h2 className="font-serif-luxury text-3xl font-bold text-[#2C221E] dark:text-[#F8F5F2]">
            Moda que Conecta Pessoas e Momentos
          </h2>

          <p>
            Fundada com a missão de trazer sofisticação atemporal para o dia a dia da mulher contemporânea, a <strong className="text-[#B87D7B]">Dua Modas</strong> nasceu do encontro entre design moderno, matérias-primas nobres e um olhar atento às necessidades femininas.
          </p>

          <p>
            Cada vestido, conjunto e peça de alfaiataria em nosso catálogo é fruto de uma curadoria rigorosa. Valorizamos linhas fluídas, caimentos que abraçam a silhueta de forma natural e tecidos como linho puro, tecidos acetinados e algodão nobre.
          </p>

          <div className="p-6 bg-white dark:bg-[#3A2E2B] rounded-2xl border border-[#C5A059]/30 shadow-xs space-y-3">
            <h3 className="font-serif-luxury font-bold text-lg text-[#C5A059]">Nossos Pilares de Excelência</h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#B87D7B]" />
                <span>Empoderamento Feminino</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8B9E87]" />
                <span>Alta Costura Acessível</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#C5A059]" />
                <span>Garantia de Qualidade</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B87D7B]" />
                <span>Atendimento Humano</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('shop')}
            className="py-3.5 px-8 gradient-dua-bg text-white font-bold rounded-2xl text-xs uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Conhecer Nossas Coleções
          </button>
        </div>
      </div>
    </div>
  );
};
