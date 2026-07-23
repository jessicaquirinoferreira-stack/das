import React from 'react';
import { useStore } from '../../context/StoreContext';
import { DollarSign, ShoppingBag, AlertTriangle, Tag, ArrowUpRight, TrendingUp } from 'lucide-react';

export const AdminDashboard: React.FC<{ onNavigateTab: (tab: string) => void }> = ({ onNavigateTab }) => {
  const { products, orders, coupons } = useStore();

  const totalSales = orders
    .filter((o) => o.status !== 'canceled')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const lowStockProducts = products.filter((p) => p.stock <= 5);
  const activeCouponsCount = coupons.filter((c) => c.active).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1: Sales */}
        <div className="bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/20 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">Vendas Totais</p>
            <p className="text-2xl font-bold text-[#2C221E] dark:text-[#F8F5F2] mt-1">
              R$ {totalSales.toFixed(2).replace('.', ',')}
            </p>
            <p className="text-[11px] text-[#8B9E87] flex items-center gap-1 mt-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> {orders.length} pedidos realizados
            </p>
          </div>
          <div className="p-3 bg-[#8B9E87]/20 text-[#8B9E87] rounded-2xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2: Pending Orders */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/20 shadow-sm flex items-center justify-between cursor-pointer hover:border-[#B87D7B] transition-colors"
        >
          <div>
            <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">Pedidos Pendentes</p>
            <p className="text-2xl font-bold text-[#B87D7B] mt-1">{pendingOrdersCount}</p>
            <p className="text-[11px] text-stone-400 mt-1">Aguardando envio ou confirmação</p>
          </div>
          <div className="p-3 bg-[#B87D7B]/20 text-[#B87D7B] rounded-2xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3: Low Stock */}
        <div 
          onClick={() => onNavigateTab('products')}
          className="bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/20 shadow-sm flex items-center justify-between cursor-pointer hover:border-[#C5A059] transition-colors"
        >
          <div>
            <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">Estoque Baixo</p>
            <p className="text-2xl font-bold text-[#C5A059] mt-1">{lowStockProducts.length}</p>
            <p className="text-[11px] text-stone-400 mt-1">Produtos com 5 ou menos peças</p>
          </div>
          <div className="p-3 bg-[#C5A059]/20 text-[#C5A059] rounded-2xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 4: Coupons */}
        <div 
          onClick={() => onNavigateTab('coupons')}
          className="bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/20 shadow-sm flex items-center justify-between cursor-pointer hover:border-[#8B9E87] transition-colors"
        >
          <div>
            <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">Cupons Ativos</p>
            <p className="text-2xl font-bold text-[#8B9E87] mt-1">{activeCouponsCount}</p>
            <p className="text-[11px] text-stone-400 mt-1">Campanhas ativas na loja</p>
          </div>
          <div className="p-3 bg-[#8B9E87]/20 text-[#8B9E87] rounded-2xl">
            <Tag className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Launch Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PDV Counter Sale Launcher */}
        <div className="p-8 bg-gradient-to-r from-[#2C221E] to-[#3A2E2B] text-white rounded-3xl shadow-xl space-y-4 border border-[#C5A059]/30">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-[#C5A059] text-white font-bold text-[10px] uppercase rounded-full">
              Balcão de Vendas
            </span>
            <DollarSign className="w-6 h-6 text-[#C5A059]" />
          </div>
          <h3 className="font-serif-luxury text-2xl font-bold">PDV Físico & Vendas Diretas</h3>
          <p className="text-xs text-stone-300 font-light leading-relaxed">
            Realize vendas rápidas presenciais no balcão ou via WhatsApp com busca instantânea, cupons e envio de recibo automático.
          </p>
          <button
            onClick={() => onNavigateTab('pdv')}
            className="py-3 px-6 bg-[#C5A059] hover:bg-[#a3803c] text-white font-bold text-xs uppercase rounded-xl flex items-center gap-2 transition-transform active:scale-95"
          >
            <span>Abrir Tela do PDV</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Low Stock Alerts Box */}
        <div className="bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/20 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <h3 className="font-serif-luxury text-lg font-bold">Alertas de Reposição de Estoque</h3>
            <span className="text-xs text-[#B87D7B] font-bold">{lowStockProducts.length} itens baixos</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-stone-400 py-4 text-center">Todos os estoques estão normais!</p>
            ) : (
              lowStockProducts.map((p) => (
                <div key={p.id} className="flex justify-between items-center text-xs p-2.5 bg-[#F8F5F2] dark:bg-[#2C221E] rounded-xl">
                  <span className="font-medium truncate max-w-[200px]">{p.name}</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 font-bold rounded-full text-[10px]">
                    Apenas {p.stock} un.
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
