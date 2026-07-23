import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { saveSettings } from '../../lib/firebase';
import { Save, Settings as SettingsIcon, MessageCircle, Globe, ShieldCheck } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, showToast } = useStore();

  const [storeName, setStoreName] = useState(settings.storeName || 'Dua Modas');
  const [slogan, setSlogan] = useState(settings.slogan || 'Moda que Conecta');
  const [phone, setPhone] = useState(settings.phone || '(11) 95636-6343');
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber || '5511956366343');
  const [email, setEmail] = useState(settings.email || 'anapriscilafrances19@gmail.com');
  const [address, setAddress] = useState(settings.address || 'São Paulo, SP');
  const [instagram, setInstagram] = useState(settings.instagram || 'https://instagram.com/duamodas');
  const [facebook, setFacebook] = useState(settings.facebook || 'https://facebook.com/duamodas');
  const [tiktok, setTiktok] = useState(settings.tiktok || 'https://tiktok.com/@duamodas');
  const [floatingWhatsappMsg, setFloatingWhatsappMsg] = useState(settings.floatingWhatsappMsg || 'Olá Dua Modas!');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState<number>(settings.freeShippingThreshold || 299);
  const [announcementBarText, setAnnouncementBarText] = useState(settings.announcementBarText || '✨ Frete Grátis acima de R$ 299');
  const [returnPolicy, setReturnPolicy] = useState(settings.returnPolicy || 'Primeira troca grátis em até 30 dias.');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSettings({
      storeName,
      slogan,
      phone,
      whatsappNumber,
      email,
      address,
      instagram,
      facebook,
      tiktok,
      floatingWhatsappMsg,
      freeShippingThreshold: Number(freeShippingThreshold),
      announcementBarText,
      returnPolicy
    });
    showToast('Configurações salvas no Firestore!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="font-serif-luxury text-2xl font-bold flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-[#C5A059]" /> Configurações da Loja
        </h2>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Main Info */}
        <div className="bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/20 shadow-sm space-y-4">
          <h3 className="font-serif-luxury text-lg font-bold pb-2 border-b">Informações Gerais da Dua Modas</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold block mb-1">Nome da Loja</label>
              <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="w-full p-2.5 bg-[#F8F5F2] border rounded-xl" />
            </div>
            <div>
              <label className="font-bold block mb-1">Slogan Oficial</label>
              <input type="text" value={slogan} onChange={(e) => setSlogan(e.target.value)} className="w-full p-2.5 bg-[#F8F5F2] border rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold block mb-1">Telefone Principal (Pedidos)</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2.5 bg-[#F8F5F2] border rounded-xl" />
            </div>
            <div>
              <label className="font-bold block mb-1">Número WhatsApp (só números)</label>
              <input type="text" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} className="w-full p-2.5 bg-[#F8F5F2] border rounded-xl font-mono" />
            </div>
            <div>
              <label className="font-bold block mb-1">E-mail Oficial</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2.5 bg-[#F8F5F2] border rounded-xl" />
            </div>
          </div>

          <div>
            <label className="font-bold block mb-1">Endereço do Atelier</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2.5 bg-[#F8F5F2] border rounded-xl" />
          </div>
        </div>

        {/* Floating WhatsApp & Banner */}
        <div className="bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/20 shadow-sm space-y-4">
          <h3 className="font-serif-luxury text-lg font-bold pb-2 border-b flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#25D366]" /> Mensagem Flutuante & Avisos
          </h3>

          <div>
            <label className="font-bold block mb-1">Texto do Botão Flutuante do WhatsApp</label>
            <input type="text" value={floatingWhatsappMsg} onChange={(e) => setFloatingWhatsappMsg(e.target.value)} className="w-full p-2.5 bg-[#F8F5F2] border rounded-xl" />
          </div>

          <div>
            <label className="font-bold block mb-1">Texto da Barra de Anúncios no Topo</label>
            <input type="text" value={announcementBarText} onChange={(e) => setAnnouncementBarText(e.target.value)} className="w-full p-2.5 bg-[#F8F5F2] border rounded-xl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold block mb-1">Valor Mínimo para Frete Grátis (R$)</label>
              <input type="number" value={freeShippingThreshold} onChange={(e) => setFreeShippingThreshold(Number(e.target.value))} className="w-full p-2.5 bg-[#F8F5F2] border rounded-xl" />
            </div>
            <div>
              <label className="font-bold block mb-1">Política de Troca (Resumo)</label>
              <input type="text" value={returnPolicy} onChange={(e) => setReturnPolicy(e.target.value)} className="w-full p-2.5 bg-[#F8F5F2] border rounded-xl" />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/20 shadow-sm space-y-4">
          <h3 className="font-serif-luxury text-lg font-bold pb-2 border-b flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#B87D7B]" /> Redes Sociais
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold block mb-1">Instagram URL</label>
              <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="w-full p-2.5 bg-[#F8F5F2] border rounded-xl" />
            </div>
            <div>
              <label className="font-bold block mb-1">Facebook URL</label>
              <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} className="w-full p-2.5 bg-[#F8F5F2] border rounded-xl" />
            </div>
            <div>
              <label className="font-bold block mb-1">TikTok URL</label>
              <input type="text" value={tiktok} onChange={(e) => setTiktok(e.target.value)} className="w-full p-2.5 bg-[#F8F5F2] border rounded-xl" />
            </div>
          </div>
        </div>

        <button type="submit" className="w-full py-4 gradient-dua-bg text-white font-bold rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg">
          <Save className="w-4 h-4" /> Salvar Configurações
        </button>
      </form>
    </div>
  );
};
