import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Logo } from '../common/Logo';
import { AdminDashboard } from './AdminDashboard';
import { AdminPDV } from './AdminPDV';
import { AdminProducts } from './AdminProducts';
import { AdminCategories } from './AdminCategories';
import { AdminCoupons } from './AdminCoupons';
import { AdminOrders } from './AdminOrders';
import { AdminSettings } from './AdminSettings';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Layers, 
  Tag, 
  ListOrdered, 
  Settings as SettingsIcon, 
  Lock, 
  Unlock, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { setCurrentView, isAdmin, setIsAdmin, showToast } = useStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pdv' | 'products' | 'categories' | 'coupons' | 'orders' | 'settings'>('dashboard');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();
    if (cleanEmail === 'duamodas@x.com' && passwordInput === 'duamodas4321') {
      setIsAdmin(true);
      showToast('Acesso administrativo liberado com sucesso!');
    } else {
      showToast('E-mail ou senha incorretos!', 'error');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    showToast('Sessão encerrada com sucesso', 'info');
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="bg-white dark:bg-[#3A2E2B] p-8 rounded-3xl border border-[#C5A059]/30 shadow-2xl max-w-md w-full text-center space-y-6">
          <div className="flex justify-center">
            <Logo variant="symbol" size="lg" />
          </div>

          <div>
            <h2 className="font-serif-luxury text-2xl font-bold text-[#2C221E] dark:text-[#F8F5F2]">
              Painel Dua Modas
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Informe seu e-mail e senha de administrador.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                E-mail
              </label>
              <input
                type="email"
                placeholder="duamodas@x.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                className="w-full text-sm px-4 py-3 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-2xl focus:outline-none focus:border-[#B87D7B] dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                Senha
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                className="w-full text-sm px-4 py-3 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-2xl focus:outline-none focus:border-[#B87D7B] dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 gradient-dua-bg text-white font-bold rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
            >
              <Lock className="w-4 h-4" /> Entrar no Painel
            </button>
          </form>

          <div className="pt-4 border-t border-stone-200 dark:border-stone-700 text-[11px] text-stone-400">
            <button
              onClick={() => setCurrentView('home')}
              className="hover:underline text-[#B87D7B] flex items-center justify-center gap-1 mx-auto font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar para a Loja
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pdv', label: 'PDV Balcão', icon: ShoppingBag },
    { id: 'products', label: 'Produtos', icon: Package },
    { id: 'categories', label: 'Categorias', icon: Layers },
    { id: 'coupons', label: 'Cupons', icon: Tag },
    { id: 'orders', label: 'Pedidos', icon: ListOrdered },
    { id: 'settings', label: 'Configurações', icon: SettingsIcon },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Admin Top Header */}
      <div className="bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/30 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Logo variant="symbol" size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-luxury text-xl font-bold text-[#2C221E] dark:text-[#F8F5F2]">
                Painel Administrativo Dua Modas
              </h1>
              <span className="px-2 py-0.5 bg-[#8B9E87]/20 text-[#8B9E87] text-[10px] font-bold uppercase rounded-full">
                Sincronizado
              </span>
            </div>
            <p className="text-xs text-stone-500">Gerenciamento completo da loja online e balcão</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('home')}
            className="px-4 py-2 bg-[#F8F5F2] dark:bg-[#2C221E] text-stone-700 dark:text-stone-300 font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-stone-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Ver Loja Pública
          </button>
          <button
            onClick={() => { handleLogout(); setCurrentView('home'); }}
            className="px-4 py-2 bg-red-50 text-red-600 font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-red-100"
          >
            <Unlock className="w-3.5 h-3.5" /> Sair do Painel
          </button>
        </div>
      </div>

      {/* Navigation Sub-Header Tabs */}
      <div className="flex overflow-x-auto gap-2 bg-white dark:bg-[#3A2E2B] p-2 rounded-2xl border border-[#C5A059]/20 shadow-xs no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#2C221E] text-white shadow-md'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#2C221E]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#C5A059]' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab View Rendering */}
      <div className="min-h-[500px]">
        {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={(t) => setActiveTab(t as any)} />}
        {activeTab === 'pdv' && <AdminPDV />}
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'categories' && <AdminCategories />}
        {activeTab === 'coupons' && <AdminCoupons />}
        {activeTab === 'orders' && <AdminOrders />}
        {activeTab === 'settings' && <AdminSettings />}
      </div>
    </div>
  );
};
