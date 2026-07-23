import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Mariana Alvez",
      city: "São Paulo, SP",
      comment: "Comprei o vestido Midi Aurora e fiquei encantada! O caimento no corpo é impecável, o tecido é super leve e recebi dezenas de elogios na festa.",
      rating: 5,
      product: "Vestido Midi Fluido Aurora"
    },
    {
      name: "Camila Fernandes",
      city: "Campinas, SP",
      comment: "Atendimento no WhatsApp sensacional! Me ajudaram a escolher o tamanho exato da minha calça pantalona. Chegou em 2 dias bem embalado com cheirinho maravilhoso.",
      rating: 5,
      product: "Conjunto Alfaiataria Linho"
    },
    {
      name: "Juliana Rocha",
      city: "Belo Horizonte, MG",
      comment: "A Dua Modas realmente cumpre o slogan 'Moda que Conecta'. Peças sofisticadas que me fazem sentir elegante tanto no trabalho quanto em eventos de final de semana.",
      rating: 5,
      product: "Camisa Acetinada Botões Dourados"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F8F5F2] dark:bg-[#2C221E] border-b border-[#C5A059]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8B9E87] flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Depoimentos Reais
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#2C221E] dark:text-[#F8F5F2]">
            O que Nossas Clientes Dizem
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/20 shadow-sm relative flex flex-col justify-between space-y-4"
            >
              <Quote className="w-8 h-8 text-[#B87D7B]/20 absolute top-4 right-4" />

              <div>
                <div className="flex items-center gap-1 text-[#C5A059] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                <p className="font-serif-luxury font-bold text-sm text-[#2C221E] dark:text-[#F8F5F2]">
                  {rev.name}
                </p>
                <div className="flex items-center justify-between text-[11px] text-stone-400 mt-0.5">
                  <span>{rev.city}</span>
                  <span className="text-[#8B9E87] font-semibold">{rev.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
