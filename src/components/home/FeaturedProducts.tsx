import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../shop/ProductCard';
import { Sparkles, Search, SlidersHorizontal, Grid, Tag, RefreshCw } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { products, categories } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');

  // Filter products by active category & search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category check
      if (activeCategory !== 'all') {
        const matchesCategory = p.categories.some(
          (c) => c.toLowerCase() === activeCategory.toLowerCase() || c.toLowerCase().includes(activeCategory.toLowerCase())
        );
        if (!matchesCategory) return false;
      }

      // Search check
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchCat = p.categories.some((c) => c.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchCat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return (a.promotionalPrice || a.price) - (b.promotionalPrice || b.price);
      }
      if (sortBy === 'price-desc') {
        return (b.promotionalPrice || b.price) - (a.promotionalPrice || a.price);
      }
      if (sortBy === 'newest') {
        return (b.createdAt || 0) - (a.createdAt || 0);
      }
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, activeCategory, searchTerm, sortBy]);

  const handleCategorySelect = (catSlug: string) => {
    setActiveCategory(catSlug);
  };

  return (
    <section id="vitrine" className="py-12 sm:py-20 bg-[#F8F5F2] dark:bg-[#3A2E2B] border-b border-[#C5A059]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B87D7B] inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Curadoria Exclusiva
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C221E] dark:text-[#F8F5F2]">
            Vitrine & Categorias Dua Modas
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2 font-light">
            Selecione a categoria desejada para filtrar ou navegue por toda a nossa coleção.
          </p>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start sm:justify-center">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border shadow-xs ${
              activeCategory === 'all'
                ? 'bg-[#2C221E] text-white border-[#2C221E] shadow-md scale-105'
                : 'bg-white dark:bg-[#2C221E] text-stone-700 dark:text-stone-200 border-[#C5A059]/30 hover:border-[#B87D7B]'
            }`}
          >
            <Grid className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Toda a Coleção ({products.length})</span>
          </button>

          {categories.map((cat) => {
            const count = products.filter((p) =>
              p.categories.some((c) => c.toLowerCase() === cat.slug.toLowerCase() || c.toLowerCase().includes(cat.slug.toLowerCase()))
            ).length;

            const isSelected = activeCategory.toLowerCase() === cat.slug.toLowerCase();

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border shadow-xs ${
                  isSelected
                    ? 'bg-[#B87D7B] text-white border-[#B87D7B] shadow-md scale-105'
                    : 'bg-white dark:bg-[#2C221E] text-stone-700 dark:text-stone-200 border-[#C5A059]/30 hover:border-[#B87D7B]'
                }`}
              >
                <Tag className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{cat.name} ({count})</span>
              </button>
            );
          })}
        </div>

        {/* Controls Bar: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#2C221E] p-4 rounded-2xl border border-[#C5A059]/20 shadow-xs mb-8">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por peça, linho, vestido..."
              className="w-full pl-10 pr-8 py-2.5 bg-[#F8F5F2] dark:bg-[#3A2E2B] border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-[#2C221E] dark:text-[#F8F5F2] focus:outline-none focus:border-[#B87D7B]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Results count & Sorting */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto text-xs">
            <span className="text-stone-500 font-medium">
              Exibindo {filteredProducts.length} {filteredProducts.length === 1 ? 'peça' : 'peças'}
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B87D7B]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F8F5F2] dark:bg-[#3A2E2B] border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2 text-xs font-semibold text-[#2C221E] dark:text-[#F8F5F2] focus:outline-none cursor-pointer"
              >
                <option value="featured">Destaques Primeiro</option>
                <option value="newest">Lançamentos</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white dark:bg-[#2C221E] rounded-3xl border border-dashed border-stone-300 dark:border-stone-700 p-8">
            <p className="font-serif-luxury text-xl font-bold text-[#2C221E] dark:text-[#F8F5F2] mb-2">
              Nenhuma peça encontrada para os filtros selecionados.
            </p>
            <p className="text-xs text-stone-500 mb-6">
              Tente escolher outra categoria ou limpar o campo de busca.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchTerm('');
              }}
              className="inline-flex items-center gap-2 py-2.5 px-6 bg-[#B87D7B] text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md hover:bg-[#925A58] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Ver Toda a Coleção</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

