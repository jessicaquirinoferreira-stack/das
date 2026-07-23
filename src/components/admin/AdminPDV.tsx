import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Search, 
  Plus, 
  Trash2, 
  DollarSign, 
  ShoppingBag, 
  Tag, 
  CheckCircle2, 
  Printer, 
  MessageCircle,
  X,
  Sparkles
} from 'lucide-react';
import { Product, CartItem, Order } from '../../types';

export const AdminPDV: React.FC = () => {
  const { products, coupons, submitOrder, settings, showToast } = useStore();

  const [search, setSearch] = useState('');
  const [pdvCart, setPdvCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [appliedCouponCode, setAppliedCouponCode] = useState('');
  const [discountValue, setDiscountValue] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'boleto'>('pix');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Search Filter
  const filteredProducts = products.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.categories.some((c) => c.toLowerCase().includes(q));
  });

  const addToPdvCart = (product: Product) => {
    const defaultSize = product.sizes[0] || 'M';
    const defaultColor = product.colors[0] || { name: 'Padrão', hex: '#2C221E' };

    setPdvCart((prev) => {
      const existingIdx = prev.findIndex((i) => i.product.id === product.id);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      }
      return [...prev, { product, selectedSize: defaultSize, selectedColor: defaultColor, quantity: 1 }];
    });
  };

  const removePdvItem = (index: number) => {
    setPdvCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePdvQty = (index: number, delta: number) => {
    setPdvCart((prev) => {
      const copy = [...prev];
      const newQty = copy[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const cartSubtotal = pdvCart.reduce((sum, item) => {
    const price = item.product.promotionalPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const handleApplyCoupon = () => {
    const found = coupons.find((c) => c.code.toUpperCase() === appliedCouponCode.trim().toUpperCase() && c.active);
    if (!found) {
      showToast('Cupom não encontrado', 'error');
      setDiscountValue(0);
      return;
    }

    let disc = 0;
    if (found.discountType === 'percent') {
      disc = (cartSubtotal * found.discountValue) / 100;
    } else {
      disc = found.discountValue;
    }
    setDiscountValue(disc);
    showToast(`Cupom ${found.code} aplicado!`);
  };

  const cartTotal = Math.max(0, cartSubtotal - discountValue);

  const handleFinalizeSale = async () => {
    if (pdvCart.length === 0) {
      showToast('Adicione produtos para vender', 'error');
      return;
    }

    try {
      const pdvCustomer = {
        fullName: customerName || 'Cliente Balcão PDV',
        email: 'vendas@duamodas.com.br',
        phone: customerPhone || '(11) 95636-6343',
        address: {
          cep: '00000-000',
          street: 'Venda Presencial Balcão',
          number: 'S/N',
          neighborhood: 'Loja Física',
          city: 'São Paulo',
          state: 'SP'
        }
      };

      const orderItems = pdvCart.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.promotionalPrice || i.product.price,
        quantity: i.quantity,
        selectedSize: i.selectedSize,
        selectedColor: i.selectedColor.name,
        image: i.product.images[0] || ''
      }));

      const newOrder = await submitOrder(pdvCustomer, paymentMethod, 'Venda de Balcão PDV');
      setCompletedOrder(newOrder);
      showToast('Venda PDV finalizada com sucesso!');
    } catch (err) {
      showToast('Erro ao processar venda PDV', 'error');
    }
  };

  const resetPdv = () => {
    setPdvCart([]);
    setCustomerName('');
    setCustomerPhone('');
    setAppliedCouponCode('');
    setDiscountValue(0);
    setCompletedOrder(null);
  };

  const handleSendWhatsAppReceipt = () => {
    if (!completedOrder) return;
    const rawNumber = customerPhone.replace(/\D/g, '');
    const targetPhone = rawNumber.length >= 10 ? `55${rawNumber}` : settings.whatsappNumber;

    const receiptText = `🛍️ *COMPROVANTE DE COMPRA - DUA MODAS*\n` +
      `----------------------------------------\n` +
      `Pedido: #${completedOrder.orderNumber}\n` +
      `Cliente: ${completedOrder.customer.fullName}\n` +
      `Data: ${new Date(completedOrder.createdAt).toLocaleDateString('pt-BR')}\n\n` +
      `Itens:\n` +
      completedOrder.items.map((i) => `• ${i.quantity}x ${i.name} (${i.selectedSize}/${i.selectedColor}) - R$ ${(i.price * i.quantity).toFixed(2)}`).join('\n') +
      `\n\n*TOTAL: R$ ${completedOrder.total.toFixed(2)}*\n` +
      `Pagamento: ${completedOrder.paymentMethod.toUpperCase()}\n` +
      `----------------------------------------\n` +
      `Obrigado por comprar na Dua Modas - Moda que Conecta!`;

    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(receiptText)}`, '_blank');
  };

  if (completedOrder) {
    return (
      <div className="bg-white dark:bg-[#3A2E2B] p-8 rounded-3xl border border-[#C5A059]/20 shadow-lg max-w-2xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-[#8B9E87]/20 text-[#8B9E87] rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="font-serif-luxury text-2xl font-bold">Venda PDV Concluída!</h2>
        <p className="text-xs text-stone-500">
          Pedido <strong className="text-[#B87D7B]">#{completedOrder.orderNumber}</strong> registrado com sucesso.
        </p>

        <div className="p-4 bg-[#F8F5F2] dark:bg-[#2C221E] rounded-2xl text-left space-y-2 text-xs">
          <div className="flex justify-between font-bold border-b pb-2">
            <span>Cliente: {completedOrder.customer.fullName}</span>
            <span>R$ {completedOrder.total.toFixed(2).replace('.', ',')}</span>
          </div>
          {completedOrder.items.map((it, idx) => (
            <div key={idx} className="flex justify-between text-stone-600">
              <span>{it.quantity}x {it.name} ({it.selectedSize})</span>
              <span>R$ {(it.price * it.quantity).toFixed(2).replace('.', ',')}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSendWhatsAppReceipt}
            className="flex-1 py-3 bg-[#25D366] text-white font-bold rounded-xl text-xs uppercase flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" /> Enviar Comprovante no WhatsApp
          </button>
          <button
            onClick={resetPdv}
            className="py-3 px-6 bg-[#2C221E] text-white font-bold rounded-xl text-xs uppercase"
          >
            Nova Venda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Product Selection Catalog (7 cols) */}
      <div className="lg:col-span-7 bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/20 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b">
          <h2 className="font-serif-luxury text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B87D7B]" /> Catálogo PDV Balcão
          </h2>
          <span className="text-xs text-stone-400">{products.length} produtos disponíveis</span>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nome do produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 rounded-xl text-xs"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto p-1">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => addToPdvCart(p)}
              className="p-3 bg-[#F8F5F2] dark:bg-[#2C221E] rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-[#B87D7B] cursor-pointer transition-all flex flex-col justify-between group"
            >
              <img src={p.images[0]} alt={p.name} className="w-full aspect-square object-cover rounded-xl mb-2" />
              <div>
                <p className="font-serif-luxury font-bold text-xs line-clamp-1 group-hover:text-[#B87D7B]">{p.name}</p>
                <p className="text-[10px] text-stone-400">Estoque: {p.stock} un.</p>
                <p className="font-bold text-xs text-[#2C221E] dark:text-[#F8F5F2] mt-1">
                  R$ {(p.promotionalPrice || p.price).toFixed(2).replace('.', ',')}
                </p>
              </div>
              <button className="w-full mt-2 py-1 bg-[#8B9E87] text-white rounded-lg text-[10px] font-bold uppercase flex items-center justify-center gap-1">
                <Plus className="w-3 h-3" /> Adicionar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PDV Cart Summary (5 cols) */}
      <div className="lg:col-span-5 bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/20 shadow-md space-y-4 flex flex-col justify-between">
        <div>
          <h3 className="font-serif-luxury text-lg font-bold pb-3 border-b flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#C5A059]" /> Resumo do Caixa PDV
          </h3>

          {/* Customer info */}
          <div className="space-y-2 mt-3 text-xs">
            <input
              type="text"
              placeholder="Nome da Cliente (Opcional)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 bg-[#F8F5F2] dark:bg-[#2C221E] border rounded-xl"
            />
            <input
              type="tel"
              placeholder="WhatsApp da Cliente (Ex: 11956366343)"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full px-3 py-2 bg-[#F8F5F2] dark:bg-[#2C221E] border rounded-xl"
            />
          </div>

          {/* Items */}
          <div className="space-y-2 mt-4 max-h-48 overflow-y-auto">
            {pdvCart.length === 0 ? (
              <p className="text-xs text-stone-400 text-center py-8">Nenhum item no caixa.</p>
            ) : (
              pdvCart.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-[#F8F5F2] dark:bg-[#2C221E] rounded-xl text-xs">
                  <div className="flex-1 pr-2">
                    <p className="font-semibold line-clamp-1">{item.product.name}</p>
                    <p className="text-[10px] text-stone-400">R$ {(item.product.promotionalPrice || item.product.price).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updatePdvQty(idx, -1)} className="px-1.5 py-0.5 bg-stone-200 rounded font-bold">-</button>
                    <span className="font-bold">{item.quantity}</span>
                    <button onClick={() => updatePdvQty(idx, 1)} className="px-1.5 py-0.5 bg-stone-200 rounded font-bold">+</button>
                    <button onClick={() => removePdvItem(idx)} className="text-red-500 ml-1"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Coupon */}
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              placeholder="Cupom de Desconto"
              value={appliedCouponCode}
              onChange={(e) => setAppliedCouponCode(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-[#F8F5F2] dark:bg-[#2C221E] border rounded-xl text-xs uppercase"
            />
            <button onClick={handleApplyCoupon} className="px-3 py-1.5 bg-[#2C221E] text-white text-xs font-bold rounded-xl">
              Aplicar
            </button>
          </div>
        </div>

        {/* Footer Totals & Action */}
        <div className="pt-4 border-t space-y-3">
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span>Subtotal:</span><span>R$ {cartSubtotal.toFixed(2).replace('.', ',')}</span></div>
            {discountValue > 0 && (
              <div className="flex justify-between text-[#8B9E87] font-bold"><span>Desconto:</span><span>- R$ {discountValue.toFixed(2).replace('.', ',')}</span></div>
            )}
            <div className="flex justify-between text-base font-bold text-[#2C221E] dark:text-[#F8F5F2] pt-2 border-t">
              <span>Total PDV:</span>
              <span className="text-[#B87D7B]">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          <button
            onClick={handleFinalizeSale}
            className="w-full py-3.5 gradient-dua-bg text-white font-bold rounded-2xl text-xs uppercase tracking-widest shadow-md"
          >
            Finalizar Venda no Caixa
          </button>
        </div>
      </div>
    </div>
  );
};
