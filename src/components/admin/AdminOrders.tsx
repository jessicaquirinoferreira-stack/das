import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { updateOrderStatus } from '../../lib/firebase';
import { ShoppingBag, Eye, MessageCircle, X, Check, Truck, CheckCircle2 } from 'lucide-react';
import { Order, OrderStatus } from '../../types';

export const AdminOrders: React.FC = () => {
  const { orders, settings, showToast } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await updateOrderStatus(orderId, newStatus);
    showToast(`Status do pedido atualizado para ${newStatus.toUpperCase()}`);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const statusBadges: Record<OrderStatus, { label: string; bg: string }> = {
    pending: { label: 'Pendente', bg: 'bg-amber-100 text-amber-800' },
    paid: { label: 'Pago', bg: 'bg-emerald-100 text-emerald-800' },
    shipped: { label: 'Enviado', bg: 'bg-blue-100 text-blue-800' },
    delivered: { label: 'Entregue', bg: 'bg-purple-100 text-purple-800' },
    canceled: { label: 'Cancelado', bg: 'bg-red-100 text-red-800' }
  };

  const openWhatsAppCustomer = (ord: Order) => {
    const raw = ord.customer.phone.replace(/\D/g, '');
    const phone = raw.length >= 10 ? `55${raw}` : settings.whatsappNumber;
    const text = encodeURIComponent(`Olá ${ord.customer.fullName}! Gostamos de falar sobre seu pedido Dua Modas #${ord.orderNumber}.`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <div>
          <h2 className="font-serif-luxury text-2xl font-bold">Gestão de Pedidos (Real-Time)</h2>
          <p className="text-xs text-stone-400">Acompanhamento e alteração de status instantâneos</p>
        </div>
        <span className="px-3 py-1 bg-[#8B9E87]/20 text-[#8B9E87] font-bold text-xs rounded-full">
          {orders.length} pedidos no total
        </span>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#2C221E] rounded-3xl p-6 max-w-xl w-full border border-[#C5A059]/30 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <div>
                <h3 className="font-serif-luxury font-bold text-lg">
                  Pedido #{selectedOrder.orderNumber}
                </h3>
                <p className="text-[10px] text-stone-400">
                  Data: {new Date(selectedOrder.createdAt).toLocaleString('pt-BR')}
                </p>
              </div>
              <button onClick={() => setSelectedOrder(null)}><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Customer Info */}
              <div className="p-3 bg-[#F8F5F2] dark:bg-[#3A2E2B] rounded-2xl space-y-1">
                <p className="font-bold text-stone-700 dark:text-stone-300">Dados do Cliente:</p>
                <p>Nome: {selectedOrder.customer.fullName}</p>
                <p>E-mail: {selectedOrder.customer.email}</p>
                <p>Telefone: {selectedOrder.customer.phone}</p>
                <p className="pt-1 font-bold">Endereço de Entrega:</p>
                <p>{selectedOrder.customer.address.street}, nº {selectedOrder.customer.address.number} {selectedOrder.customer.address.complement ? `(${selectedOrder.customer.address.complement})` : ''} - {selectedOrder.customer.address.neighborhood}, {selectedOrder.customer.address.city}/{selectedOrder.customer.address.state} - CEP: {selectedOrder.customer.address.cep}</p>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <p className="font-bold">Itens do Pedido:</p>
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between p-2 border rounded-xl">
                    <span>{item.quantity}x {item.name} ({item.selectedSize} / {item.selectedColor})</span>
                    <span className="font-bold">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                  </div>
                ))}
              </div>

              {/* Status Update Actions */}
              <div className="p-3 bg-[#F8F5F2] dark:bg-[#3A2E2B] rounded-2xl space-y-2">
                <p className="font-bold">Alterar Status do Pedido:</p>
                <div className="flex flex-wrap gap-2">
                  {(['pending', 'paid', 'shipped', 'delivered', 'canceled'] as OrderStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedOrder.id, st)}
                      className={`px-3 py-1.5 rounded-xl font-bold uppercase text-[10px] ${
                        selectedOrder.status === st ? 'bg-[#2C221E] text-white ring-2 ring-[#C5A059]' : 'bg-white border text-stone-600'
                      }`}
                    >
                      {statusBadges[st].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex justify-between items-center border-t">
                <button
                  onClick={() => openWhatsAppCustomer(selectedOrder)}
                  className="py-2 px-4 bg-[#25D366] text-white font-bold rounded-xl flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" /> Falar com Cliente
                </button>
                <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 border rounded-xl">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white dark:bg-[#3A2E2B] rounded-3xl border border-[#C5A059]/20 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#F8F5F2] dark:bg-[#2C221E] uppercase font-bold text-stone-500 border-b">
              <tr>
                <th className="p-4">Pedido</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Total</th>
                <th className="p-4">Pagamento</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-400">
                    Nenhum pedido realizado ainda.
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-stone-50 dark:hover:bg-[#2C221E]/50">
                    <td className="p-4 font-bold text-[#B87D7B]">#{ord.orderNumber}</td>
                    <td className="p-4 font-medium">{ord.customer.fullName}</td>
                    <td className="p-4 font-bold">R$ {ord.total.toFixed(2).replace('.', ',')}</td>
                    <td className="p-4 font-semibold uppercase">{ord.paymentMethod}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${statusBadges[ord.status].bg}`}>
                        {statusBadges[ord.status].label}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => setSelectedOrder(ord)} className="p-1.5 text-stone-600 hover:bg-stone-100 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => openWhatsAppCustomer(ord)} className="p-1.5 text-[#25D366] hover:bg-emerald-50 rounded">
                        <MessageCircle className="w-4 h-4 fill-current" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
