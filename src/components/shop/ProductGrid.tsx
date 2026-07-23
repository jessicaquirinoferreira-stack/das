import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Filters } from './Filters';
import { SlidersHorizontal, PackageX, Sparkles } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { products, filters, resetFilters } = useStore();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter Products
  const filteredProducts = products.filter((p) => {
    // Category match
    if (filters.category !== 'all' && !p.categories.includes(filters.category)) {
      return false;
    }

    // Size match
    if (filters.size !== 'all' && !p.sizes.includes(filters.size)) {
      return false;
    }

    // Search match
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCat = p.categories.some((c) => c.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchCat) return false;
    }

    return true;
  });

  // Sort Products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortBy === 'price-asc') {
      const priceA = a.promotionalPrice || a.price;
      const priceB = b.promotionalPrice || b.price;
      return priceA - priceB;
    }
    if (filters.sortBy === 'price-desc') {
      const priceA = a.promotionalPrice || a.price;
      const priceB = b.promotionalPrice || b.price;
      return priceB - priceA;
    }
    if (filters.sortBy === 'newest') {
      return (b.createdAt || 0) - (a.createdAt || 0);
    }
    // Default featured
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-[#C5A059]/20 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8B9E87] flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Dua Modas
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#2C221E] dark:text-[#F8F5F2]">
            Coleção Feminina
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Mostrando {sortedProducts.length} de {products.length} peças exclusivas
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="lg:hidden py-2.5 px-4 bg-white dark:bg-[#3A2E2B] border border-[#C5A059]/30 rounded-xl text-xs font-semibold text-[#2C221E] dark:text-[#F8F5F2] flex items-center justify-center gap-2 shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#B87D7B]" />
          Filtrar Peças
        </button>
      </div>

      {/* Grid Layout with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1">
          <Filters />
        </div>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
            <div className="w-4/5 max-w-sm bg-[#F8F5F2] dark:bg-[#2C221E] h-full p-6 overflow-y-auto">
              <div className="flex items-center justify-between pb-4 mb-4 border-b">
                <h3 className="font-serif-luxury font-bold text-lg">Filtros</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 text-stone-400 hover:text-stone-600"
                >
                  ✕
                </button>
              </div>
              <Filters />
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full mt-6 py-3 bg-[#B87D7B] text-white font-bold rounded-xl text-xs uppercase tracking-wider"
              >
                Ver Resultados
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white dark:bg-[#3A2E2B] rounded-3xl border border-dashed border-stone-300 dark:border-stone-700 p-8">
              <PackageX className="w-12 h-12 text-[#B87D7B] mx-auto mb-3 opacity-60" />
              <h3 className="font-serif-luxury text-xl font-bold text-[#2C221E] dark:text-[#F8F5F2] mb-1">
                Nenhuma peça encontrada
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-6">
                Não encontramos produtos correspondentes aos filtros selecionados. Tente buscar por outros termos ou limpar os filtros.
              </p>
              <button
                onClick={resetFilters}
                className="py-2.5 px-6 bg-[#B87D7B] text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md hover:bg-[#925A58] transition-colors"
              >
                Limpar Todos os Filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
