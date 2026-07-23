import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { categories, selectCategory } = useStore();

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-[#2C221E] border-b border-[#C5A059]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8B9E87] flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Descubra Seu Estilo
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#2C221E] dark:text-[#F8F5F2]">
            Categorias em Destaque
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2">
            Explore nossas seleções cuidadosamente curadas para compor looks versáteis e sofisticados.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => selectCategory(cat.slug)}
              className={`group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-[#C5A059]/20 ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/80 via-[#2C221E]/20 to-transparent transition-opacity group-hover:opacity-90" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white z-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
                    Coleção Dua Modas
                  </span>
                  <h3 className="font-serif-luxury text-2xl font-bold">{cat.name}</h3>
                  {cat.description && (
                    <p className="text-xs text-stone-300 line-clamp-1 mt-1 font-light">
                      {cat.description}
                    </p>
                  )}
                </div>

                <div className="p-3 bg-white/20 hover:bg-[#B87D7B] text-white rounded-full backdrop-blur-md transition-colors group-hover:scale-110">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
