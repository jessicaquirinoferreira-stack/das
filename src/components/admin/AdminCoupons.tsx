import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { saveCoupon, deleteCoupon } from '../../lib/firebase';
import { Plus, Edit2, Trash2, Tag, X } from 'lucide-react';
import { Coupon } from '../../types';

export const AdminCoupons: React.FC = () => {
  const { coupons, showToast } = useStore();
  const [editing, setEditing] = useState<Partial<Coupon> | null>(null);

  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('percent');
  const [discountValue, setDiscountValue] = useState<number>(10);
  const [expirationDate, setExpirationDate] = useState('2026-12-31');
  const [minPurchase, setMinPurchase] = useState<number>(100);
  const [active, setActive] = useState(true);

  const openForm = (c?: Coupon) => {
    if (c) {
      setEditing(c);
      setCode(c.code);
      setDiscountType(c.discountType);
      setDiscountValue(c.discountValue);
      setExpirationDate(c.expirationDate);
      setMinPurchase(c.minPurchase || 0);
      setActive(c.active);
    } else {
      setEditing({});
      setCode('NOVO10');
      setDiscountType('percent');
      setDiscountValue(10);
      setExpirationDate('2026-12-31');
      setMinPurchase(100);
      setActive(true);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    await saveCoupon({
      id: editing?.id,
      code: code.trim().toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      expirationDate,
      usageType: 'multiple',
      minPurchase: Number(minPurchase),
      active
    });

    showToast('Cupom salvo!');
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja excluir este cupom?')) {
      await deleteCoupon(id);
      showToast('Cupom removido', 'info');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="font-serif-luxury text-2xl font-bold">Cupons de Desconto</h2>
        <button
          onClick={() => openForm()}
          className="py-2.5 px-4 gradient-dua-bg text-white font-bold rounded-xl text-xs uppercase flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" /> Criar Cupom
        </button>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#2C221E] rounded-3xl p-6 max-w-md w-full border border-[#C5A059]/30 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-serif-luxury font-bold text-lg">
                {editing.id ? 'Editar Cupom' : 'Novo Cupom'}
              </h3>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Código do Cupom *</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="EX: DUA10"
                  className="w-full px-3 py-2 border bg-[#F8F5F2] rounded-xl font-mono uppercase font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Tipo de Desconto</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full px-3 py-2 border bg-[#F8F5F2] rounded-xl"
                  >
                    <option value="percent">Porcentagem (%)</option>
                    <option value="fixed">Valor Fixo (R$)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1">Valor do Desconto *</label>
                  <input
                    type="number"
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                    className="w-full px-3 py-2 border bg-[#F8F5F2] rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Compra Mínima (R$)</label>
                  <input
                    type="number"
                    value={minPurchase}
                    onChange={(e) => setMinPurchase(Number(e.target.value))}
                    className="w-full px-3 py-2 border bg-[#F8F5F2] rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Data de Validade</label>
                  <input
                    type="date"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className="w-full px-3 py-2 border bg-[#F8F5F2] rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
                  <span>Cupom Ativo</span>
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 border rounded-xl">Cancelar</button>
                <button type="submit" className="px-6 py-2 gradient-dua-bg text-white font-bold rounded-xl uppercase">Salvar Cupom</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div key={c.id} className="bg-white dark:bg-[#3A2E2B] p-5 rounded-2xl border border-[#C5A059]/20 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-lg text-[#B87D7B] flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#C5A059]" /> {c.code}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${c.active ? 'bg-emerald-100 text-emerald-700' : 'bg-stone-200 text-stone-600'}`}>
                {c.active ? 'Ativo' : 'Inativo'}
              </span>
            </div>

            <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1">
              <p>Desconto: <strong>{c.discountType === 'percent' ? `${c.discountValue}%` : `R$ ${c.discountValue.toFixed(2)}`}</strong></p>
              <p>Mínimo: <strong>R$ {(c.minPurchase || 0).toFixed(2)}</strong></p>
              <p>Validade: <strong>{c.expirationDate}</strong></p>
            </div>

            <div className="pt-2 border-t flex justify-end gap-2">
              <button onClick={() => openForm(c)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(c.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
