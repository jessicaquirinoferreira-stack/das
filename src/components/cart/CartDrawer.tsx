import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, X, Trash2, ArrowRight, Tag, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal, 
    appliedCoupon, 
    applyCouponCode, 
    removeCoupon, 
    couponDiscount, 
    setCurrentView 
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput);
    setCouponMsg(res.message);
    if (res.success) setCouponInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#2C221E] shadow-2xl flex flex-col border-l border-[#C5A059]/20">
          {/* Header */}
          <div className="p-5 border-b border-[#F8F5F2] dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B87D7B]" />
              <h2 className="font-serif-luxury text-xl font-bold text-[#2C221E] dark:text-[#F8F5F2]">
                Sua Sacola Dua Modas
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <p className="text-sm font-semibold text-stone-600 dark:text-stone-300">
                  Sua sacola está vazia
                </p>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  Explore nossas coleções de vestidos, conjuntos e alfaiataria atemporal.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('shop');
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#B87D7B] text-white font-bold rounded-xl text-xs uppercase tracking-wider"
                >
                  Explorar Loja
                </button>
              </div>
            ) : (
              cart.map((item, index) => {
                const itemPrice = item.product.promotionalPrice && item.product.promotionalPrice < item.product.price
                  ? item.product.promotionalPrice
                  : item.product.price;

                return (
                  <div
                    key={index}
                    className="flex gap-4 p-3 bg-[#F8F5F2] dark:bg-[#3A2E2B] rounded-2xl border border-stone-200 dark:border-stone-800"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-xl"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif-luxury font-semibold text-sm line-clamp-1 text-[#2C221E] dark:text-[#F8F5F2]">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-stone-400 hover:text-red-500 p-1"
                            title="Remover item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-[11px] text-stone-500 mt-0.5 space-x-2">
                          <span>Tam: <strong className="text-[#B87D7B]">{item.selectedSize}</strong></span>
                          <span>Cor: <strong className="text-[#8B9E87]">{item.selectedColor.name}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-[#2C221E]">
                          <button
                            onClick={() => updateCartQuantity(index, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs text-stone-600"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(index, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs text-stone-600"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-bold text-sm text-[#2C221E] dark:text-[#F8F5F2]">
                          R$ {(itemPrice * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Subtotal & Coupon */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#F8F5F2] dark:bg-[#2C221E] border-t border-[#C5A059]/20 space-y-4">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#8B9E87]/15 rounded-xl border border-[#8B9E87]/30 text-xs">
                    <div className="flex items-center gap-2 text-[#8B9E87] font-bold">
                      <Tag className="w-4 h-4" />
                      <span>Cupom {appliedCoupon.code} aplicado!</span>
                    </div>
                    <button onClick={removeCoupon} className="text-stone-400 hover:text-red-500 text-xs font-semibold">
                      Remover
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Cupom de desconto (ex: DUA10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white dark:bg-[#3A2E2B] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none uppercase font-semibold"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#2C221E] text-[#C5A059] font-bold text-xs rounded-xl hover:bg-black"
                    >
                      Aplicar
                    </button>
                  </form>
                )}
                {couponMsg && <p className="text-[11px] text-[#B87D7B] mt-1 font-medium">{couponMsg}</p>}
              </div>

              {/* Subtotal summary */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600 dark:text-stone-300">
                  <span>Subtotal:</span>
                  <span>R$ {cartSubtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#8B9E87] font-bold">
                    <span>Desconto ({appliedCoupon.code}):</span>
                    <span>- R$ {couponDiscount.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-500">
                  <span>Frete:</span>
                  <span>Calculado no checkout</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2C221E] dark:text-[#F8F5F2] pt-2 border-t">
                  <span>Total estimado:</span>
                  <span className="text-[#B87D7B]">
                    R$ {(cartSubtotal - couponDiscount).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 gradient-dua-bg text-white font-bold rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#B87D7B]/20 hover:scale-[1.01] transition-all"
              >
                <span>Ir para o Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
