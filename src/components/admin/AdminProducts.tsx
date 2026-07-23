import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { saveProduct, deleteProduct } from '../../lib/firebase';
import { Plus, Edit2, Trash2, Image, Sparkles, Check, X } from 'lucide-react';
import { Product } from '../../types';

export const AdminProducts: React.FC = () => {
  const { products, categories, showToast } = useStore();
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [promotionalPrice, setPromotionalPrice] = useState<number>(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sizesInput, setSizesInput] = useState('P, M, G, GG');
  const [colorNameInput, setColorNameInput] = useState('Mauve Terroso');
  const [colorHexInput, setColorHexInput] = useState('#B87D7B');
  const [colorsList, setColorsList] = useState<{ name: string; hex: string }[]>([]);
  const [stock, setStock] = useState<number>(10);
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const openNewForm = () => {
    setEditingProduct({});
    setName('');
    setDescription('');
    setPrice(199.90);
    setPromotionalPrice(0);
    setSelectedCategories(['vestidos']);
    setSizesInput('P, M, G, GG');
    setColorsList([
      { name: 'Mauve Terroso', hex: '#B87D7B' },
      { name: 'Verde Sálvia', hex: '#8B9E87' }
    ]);
    setStock(10);
    setImageUrls(['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80']);
    setIsFeatured(true);
    setIsNew(true);
  };

  const openEditForm = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setDescription(p.description);
    setPrice(p.price);
    setPromotionalPrice(p.promotionalPrice || 0);
    setSelectedCategories(p.categories || []);
    setSizesInput(p.sizes.join(', '));
    setColorsList(p.colors || []);
    setStock(p.stock || 0);
    setImageUrls(p.images.length > 0 ? p.images : ['']);
    setIsFeatured(!!p.isFeatured);
    setIsNew(!!p.isNew);
  };

  const handleAddColor = () => {
    if (!colorNameInput.trim()) return;
    setColorsList([...colorsList, { name: colorNameInput, hex: colorHexInput }]);
    setColorNameInput('');
  };

  const handleRemoveColor = (idx: number) => {
    setColorsList(colorsList.filter((_, i) => i !== idx));
  };

  const handleImageChange = (index: number, value: string) => {
    const copy = [...imageUrls];
    copy[index] = value;
    setImageUrls(copy);
  };

  const handleAddImageField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const handleRemoveImageField = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedSizes = sizesInput.split(',').map((s) => s.trim()).filter(Boolean);
    const validImages = imageUrls.map((i) => i.trim()).filter(Boolean);

    const productPayload: Partial<Product> = {
      id: editingProduct?.id,
      name,
      description,
      price: Number(price),
      promotionalPrice: promotionalPrice > 0 ? Number(promotionalPrice) : undefined,
      categories: selectedCategories,
      sizes: parsedSizes,
      colors: colorsList,
      stock: Number(stock),
      images: validImages.length > 0 ? validImages : ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'],
      isFeatured,
      isNew
    };

    await saveProduct(productPayload);
    showToast('Produto salvo no Firestore!');
    setEditingProduct(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente excluir este produto?')) {
      await deleteProduct(id);
      showToast('Produto removido', 'info');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="font-serif-luxury text-2xl font-bold">Gestão de Produtos</h2>
        <button
          onClick={openNewForm}
          className="py-2.5 px-4 gradient-dua-bg text-white font-bold rounded-xl text-xs uppercase flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" /> Novo Produto
        </button>
      </div>

      {/* Product Form Modal / View */}
      {editingProduct !== null && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#2C221E] rounded-3xl p-6 max-w-2xl w-full border border-[#C5A059]/30 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b mb-4">
              <h3 className="font-serif-luxury font-bold text-xl">
                {editingProduct.id ? 'Editar Produto' : 'Cadastrar Novo Produto'}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="text-stone-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs max-h-[70vh] overflow-y-auto pr-2">
              <div>
                <label className="font-bold block mb-1">Nome do Produto *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F5F2] dark:bg-[#3A2E2B] border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Descrição Detalhada *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F5F2] dark:bg-[#3A2E2B] border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold block mb-1">Preço (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F8F5F2] dark:bg-[#3A2E2B] border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Preço Promo (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={promotionalPrice}
                    onChange={(e) => setPromotionalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F8F5F2] dark:bg-[#3A2E2B] border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Estoque (Unid) *</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F8F5F2] dark:bg-[#3A2E2B] border rounded-xl"
                  />
                </div>
              </div>

              {/* Multiple Categories */}
              <div>
                <label className="font-bold block mb-1">Categorias (Selecione)</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => {
                        if (selectedCategories.includes(cat.id)) {
                          setSelectedCategories(selectedCategories.filter((c) => c !== cat.id));
                        } else {
                          setSelectedCategories([...selectedCategories, cat.id]);
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        selectedCategories.includes(cat.id)
                          ? 'bg-[#B87D7B] text-white border-[#B87D7B]'
                          : 'bg-[#F8F5F2] border-stone-200 text-stone-600'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Tamanhos (separados por vírgula)</label>
                <input
                  type="text"
                  value={sizesInput}
                  onChange={(e) => setSizesInput(e.target.value)}
                  placeholder="P, M, G, GG, 36, 38"
                  className="w-full px-3 py-2 bg-[#F8F5F2] dark:bg-[#3A2E2B] border rounded-xl"
                />
              </div>

              {/* Colors Swatches */}
              <div>
                <label className="font-bold block mb-1">Cores Disponíveis</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Nome da cor (ex: Verde Sálvia)"
                    value={colorNameInput}
                    onChange={(e) => setColorNameInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-[#F8F5F2] border rounded-xl"
                  />
                  <input
                    type="color"
                    value={colorHexInput}
                    onChange={(e) => setColorHexInput(e.target.value)}
                    className="w-10 h-8 p-0 rounded cursor-pointer border"
                  />
                  <button type="button" onClick={handleAddColor} className="px-3 py-1 bg-[#8B9E87] text-white font-bold rounded-xl">
                    +
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {colorsList.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 bg-[#F8F5F2] border rounded-full flex items-center gap-1.5 font-medium">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                      <button type="button" onClick={() => handleRemoveColor(i)} className="text-red-500 font-bold ml-1">✕</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Multiple Image URLs */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold block">Fotos do Produto (URLs de Imagens)</label>
                  <button type="button" onClick={handleAddImageField} className="text-[#B87D7B] font-bold text-[10px] hover:underline">
                    + Adicionar Imagem
                  </button>
                </div>
                {imageUrls.map((url, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={url}
                      onChange={(e) => handleImageChange(idx, e.target.value)}
                      className="flex-1 px-3 py-2 bg-[#F8F5F2] dark:bg-[#3A2E2B] border rounded-xl"
                    />
                    {imageUrls.length > 1 && (
                      <button type="button" onClick={() => handleRemoveImageField(idx)} className="p-2 text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Flags */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
                  <span className="font-bold">Destaque na Vitrine</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={isNew} onChange={(e) => setIsNew(e.target.checked)} />
                  <span className="font-bold">Marcar como Lançamento</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                <button type="button" onClick={() => setEditingProduct(null)} className="px-4 py-2 border rounded-xl">
                  Cancelar
                </button>
                <button type="submit" className="px-6 py-2 gradient-dua-bg text-white font-bold rounded-xl uppercase">
                  Salvar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table List */}
      <div className="bg-white dark:bg-[#3A2E2B] rounded-3xl border border-[#C5A059]/20 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#F8F5F2] dark:bg-[#2C221E] uppercase font-bold text-stone-500 border-b">
              <tr>
                <th className="p-4">Produto</th>
                <th className="p-4">Preço</th>
                <th className="p-4">Estoque</th>
                <th className="p-4">Categorias</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50 dark:hover:bg-[#2C221E]/50">
                  <td className="p-4 flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover rounded-lg" />
                    <div>
                      <p className="font-bold text-[#2C221E] dark:text-[#F8F5F2]">{p.name}</p>
                      <p className="text-[10px] text-stone-400">Tamanhos: {p.sizes.join(', ')}</p>
                    </div>
                  </td>
                  <td className="p-4 font-bold">
                    R$ {(p.promotionalPrice || p.price).toFixed(2).replace('.', ',')}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      p.stock <= 5 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {p.stock} un.
                    </span>
                  </td>
                  <td className="p-4 text-stone-500">{p.categories.join(', ')}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => openEditForm(p)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
