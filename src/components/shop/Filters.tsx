import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Filter, RotateCcw, Search } from 'lucide-react';

export const Filters: React.FC = () => {
  const { categories, filters, setFilters, resetFilters } = useStore();

  const handleCategoryChange = (catId: string) => {
    setFilters((prev) => ({ ...prev, category: catId }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }));
  };

  const handleSizeChange = (size: string) => {
    setFilters((prev) => ({ ...prev, size: prev.size === size ? 'all' : size }));
  };

  return (
    <div className="bg-white dark:bg-[#3A2E2B] p-5 rounded-2xl border border-[#C5A059]/20 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#F8F5F2] dark:border-stone-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#B87D7B]" />
          <h3 className="font-serif-luxury text-base font-bold text-[#2C221E] dark:text-[#F8F5F2]">
            Filtrar Peças
          </h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-[#B87D7B] hover:underline flex items-center gap-1 font-medium"
        >
          <RotateCcw className="w-3 h-3" /> Limpar
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
          Buscar
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Nome, tecido ou cor..."
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#B87D7B] dark:text-white"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
          Categorias
        </label>
        <div className="space-y-1.5">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
              filters.category === 'all'
                ? 'bg-[#B87D7B] text-white font-bold'
                : 'text-stone-600 dark:text-stone-300 hover:bg-[#F8F5F2] dark:hover:bg-[#2C221E]'
            }`}
          >
            <span>Todas as Peças</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                filters.category === cat.id
                  ? 'bg-[#B87D7B] text-white font-bold'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-[#F8F5F2] dark:hover:bg-[#2C221E]'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
          Tamanho
        </label>
        <div className="flex flex-wrap gap-2">
          {['P', 'M', 'G', 'GG', '36', '38', '40', '42', '44'].map((sz) => (
            <button
              key={sz}
              onClick={() => handleSizeChange(sz)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filters.size === sz
                  ? 'bg-[#8B9E87] text-white shadow-sm'
                  : 'bg-[#F8F5F2] dark:bg-[#2C221E] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-[#8B9E87]'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
          Ordenar Por
        </label>
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="w-full px-3 py-2 text-xs bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#C5A059] dark:text-white"
        >
          <option value="featured">Destaques da Vitrine</option>
          <option value="newest">Novidades Mais Recentes</option>
          <option value="price-asc">Menor Preço</option>
          <option value="price-desc">Maior Preço</option>
        </select>
      </div>
    </div>
  );
};
