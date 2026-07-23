import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { saveCategory, deleteCategory } from '../../lib/firebase';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { Category } from '../../types';

export const AdminCategories: React.FC = () => {
  const { categories, showToast } = useStore();
  const [editing, setEditing] = useState<Partial<Category> | null>(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const openForm = (cat?: Category) => {
    if (cat) {
      setEditing(cat);
      setName(cat.name);
      setSlug(cat.slug);
      setImage(cat.image);
      setDescription(cat.description || '');
    } else {
      setEditing({});
      setName('');
      setSlug('');
      setImage('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80');
      setDescription('');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const autoSlug = slug.trim() || name.toLowerCase().replace(/\s+/g, '-');

    await saveCategory({
      id: editing?.id,
      name,
      slug: autoSlug,
      image,
      description
    });

    showToast('Categoria salva!');
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja excluir esta categoria?')) {
      await deleteCategory(id);
      showToast('Categoria excluída', 'info');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="font-serif-luxury text-2xl font-bold">Gestão de Categorias</h2>
        <button
          onClick={() => openForm()}
          className="py-2.5 px-4 gradient-dua-bg text-white font-bold rounded-xl text-xs uppercase flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" /> Nova Categoria
        </button>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#2C221E] rounded-3xl p-6 max-w-md w-full border border-[#C5A059]/30 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-serif-luxury font-bold text-lg">
                {editing.id ? 'Editar Categoria' : 'Nova Categoria'}
              </h3>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Nome da Categoria *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border bg-[#F8F5F2] rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Slug URL (Ex: vestidos)</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 border bg-[#F8F5F2] rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">URL da Imagem de Capa</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3 py-2 border bg-[#F8F5F2] rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Descrição</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border bg-[#F8F5F2] rounded-xl"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 border rounded-xl">Cancelar</button>
                <button type="submit" className="px-6 py-2 gradient-dua-bg text-white font-bold rounded-xl uppercase">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white dark:bg-[#3A2E2B] p-4 rounded-2xl border border-[#C5A059]/20 shadow-sm flex items-center justify-between gap-4">
            <img src={cat.image} alt={cat.name} className="w-16 h-20 object-cover rounded-xl" />
            <div className="flex-1">
              <h4 className="font-serif-luxury font-bold text-base">{cat.name}</h4>
              <p className="text-[10px] text-stone-400">Slug: {cat.slug}</p>
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={() => openForm(cat)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(cat.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
