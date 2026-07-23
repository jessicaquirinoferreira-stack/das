import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Logo } from './Logo';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    cart, 
    wishlist, 
    settings, 
    currentView, 
    setCurrentView, 
    selectCategory,
    setIsCartOpen,
    filters,
    setFilters,
    isAdmin,
    setIsAdmin,
    darkMode,
    setDarkMode
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
    if (currentView !== 'shop') {
      setCurrentView('shop');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#2C221E]/95 backdrop-blur-md border-b border-[#C5A059]/20 transition-colors duration-300">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#2C221E] dark:text-[#F8F5F2] hover:text-[#B87D7B] transition-colors"
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <div onClick={() => setCurrentView('home')} className="cursor-pointer">
          <Logo size="md" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest font-semibold text-[#2C221E] dark:text-[#F8F5F2]">
          <button
            onClick={() => setCurrentView('home')}
            className={`hover:text-[#B87D7B] transition-colors relative py-1 ${
              currentView === 'home' ? 'text-[#B87D7B] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B87D7B]' : ''
            }`}
          >
            Início
          </button>
          <button
            onClick={() => {
              selectCategory(null);
            }}
            className={`hover:text-[#B87D7B] transition-colors relative py-1 ${
              currentView === 'shop' && !filters.category ? 'text-[#B87D7B] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B87D7B]' : ''
            }`}
          >
            Coleção Completa
          </button>
          <button
            onClick={() => selectCategory('vestidos')}
            className="hover:text-[#B87D7B] transition-colors"
          >
            Vestidos
          </button>
          <button
            onClick={() => selectCategory('conjuntos')}
            className="hover:text-[#B87D7B] transition-colors"
          >
            Conjuntos
          </button>
          <button
            onClick={() => selectCategory('blusas')}
            className="hover:text-[#B87D7B] transition-colors"
          >
            Blusas
          </button>
          <button
            onClick={() => setCurrentView('about')}
            className={`hover:text-[#B87D7B] transition-colors ${currentView === 'about' ? 'text-[#B87D7B]' : ''}`}
          >
            Sobre Nós
          </button>
          <button
            onClick={() => setCurrentView('contact')}
            className={`hover:text-[#B87D7B] transition-colors ${currentView === 'contact' ? 'text-[#B87D7B]' : ''}`}
          >
            Contato
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* Quick Search Toggle / Input */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right duration-200">
                <input
                  type="text"
                  placeholder="Buscar vestido, linho, bolsa..."
                  value={filters.search}
                  onChange={handleSearchChange}
                  autoFocus
                  className="w-40 sm:w-60 px-3 py-1.5 text-xs bg-[#F8F5F2] dark:bg-[#3A2E2B] border border-[#C5A059]/30 rounded-full focus:outline-none focus:border-[#B87D7B] dark:text-white"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setFilters((prev) => ({ ...prev, search: '' }));
                  }}
                  className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-[#2C221E] dark:text-[#F8F5F2] hover:text-[#B87D7B] transition-colors"
                title="Buscar produtos"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setCurrentView('shop')}
            className="relative p-2 text-[#2C221E] dark:text-[#F8F5F2] hover:text-[#B87D7B] transition-colors"
            title="Favoritos"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#B87D7B] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#2C221E] dark:text-[#F8F5F2] hover:text-[#8B9E87] transition-colors flex items-center gap-1.5"
            title="Sacola de Compras"
          >
            <div className="relative">
              <ShoppingBag className="w-5.5 h-5.5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-[#8B9E87] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </div>
          </button>


          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-[#2C221E] dark:text-[#F8F5F2] hover:text-[#C5A059] transition-colors"
            title={darkMode ? 'Modo Claro' : 'Modo Escuro'}
          >
            {darkMode ? <Sun className="w-5 h-5 text-[#C5A059]" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#C5A059]/20 bg-[#F8F5F2] dark:bg-[#2C221E] px-4 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="space-y-3 font-serif-luxury text-lg text-[#2C221E] dark:text-[#F8F5F2]">
            <button
              onClick={() => {
                setCurrentView('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1 hover:text-[#B87D7B]"
            >
              Início
            </button>
            <button
              onClick={() => {
                selectCategory(null);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1 hover:text-[#B87D7B]"
            >
              Todas as Peças
            </button>
            <button
              onClick={() => {
                selectCategory('vestidos');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1 hover:text-[#B87D7B]"
            >
              Vestidos
            </button>
            <button
              onClick={() => {
                selectCategory('conjuntos');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1 hover:text-[#B87D7B]"
            >
              Conjuntos
            </button>
            <button
              onClick={() => {
                selectCategory('blusas');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1 hover:text-[#B87D7B]"
            >
              Blusas & Camisas
            </button>
            <button
              onClick={() => {
                setCurrentView('about');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1 hover:text-[#B87D7B]"
            >
              Sobre Nós
            </button>
            <button
              onClick={() => {
                setCurrentView('contact');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-1 hover:text-[#B87D7B]"
            >
              Contato
            </button>
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-600 dark:text-stone-300">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#8B9E87]" />
              <span>{settings.phone || "(11) 95636-6343"}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
