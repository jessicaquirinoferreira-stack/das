import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, RefreshCw } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('Mensagem enviada com sucesso! Entraremos em contato em breve.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 animate-in fade-in duration-300">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8B9E87]">
          Estamos Aqui para Você
        </span>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-[#2C221E] dark:text-[#F8F5F2]">
          Fale com a Dua Modas
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Dúvidas sobre pedidos, coleções, trocas ou parcerias? Entre em contato por formulário, e-mail ou WhatsApp direto.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#3A2E2B] p-8 rounded-3xl border border-[#C5A059]/20 shadow-md space-y-6">
            <h3 className="font-serif-luxury text-xl font-bold text-[#2C221E] dark:text-[#F8F5F2] pb-3 border-b">
              Canais de Atendimento
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#25D366]/15 text-[#25D366] rounded-2xl">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="font-bold text-[#2C221E] dark:text-[#F8F5F2]">WhatsApp Pedidos & Suporte:</p>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber || "5511956366343"}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8B9E87] font-semibold hover:underline block mt-0.5"
                  >
                    {settings.phone || "(11) 95636-6343"}
                  </a>
                  <p className="text-[10px] text-stone-400 mt-1">Atendimento de Segunda a Sábado das 9h às 19h</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#B87D7B]/15 text-[#B87D7B] rounded-2xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#2C221E] dark:text-[#F8F5F2]">E-mail Oficial:</p>
                  <a
                    href={`mailto:${settings.email || "anapriscilafrances19@gmail.com"}`}
                    className="text-[#B87D7B] font-semibold hover:underline block mt-0.5"
                  >
                    {settings.email || "anapriscilafrances19@gmail.com"}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#C5A059]/15 text-[#C5A059] rounded-2xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#2C221E] dark:text-[#F8F5F2]">Localização do Atelier:</p>
                  <p className="text-stone-500 mt-0.5">{settings.address || "R. Rui Barbosa, 110 - São Roque - SP, 18130-440"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Exchange Policy Card */}
          <div className="p-6 bg-[#F8F5F2] dark:bg-[#2C221E] rounded-3xl border border-stone-200 dark:border-stone-800 space-y-2 text-xs text-stone-600 dark:text-stone-300">
            <div className="flex items-center gap-2 text-[#B87D7B] font-bold">
              <RefreshCw className="w-4 h-4" /> Política de Trocas
            </div>
            <p>{settings.returnPolicy || "Primeira troca grátis em até 30 dias após o recebimento do pedido."}</p>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-[#3A2E2B] p-8 rounded-3xl border border-[#C5A059]/20 shadow-md">
            {sent ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#8B9E87] mx-auto" />
                <h3 className="font-serif-luxury text-2xl font-bold">Mensagem Enviada!</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Sua mensagem foi entregue à equipe Dua Modas. Responderemos no seu e-mail em até 24 horas úteis.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 px-6 py-2.5 bg-[#B87D7B] text-white text-xs font-bold rounded-xl uppercase"
                >
                  Enviar Outra Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-serif-luxury text-xl font-bold text-[#2C221E] dark:text-[#F8F5F2] pb-2 border-b">
                  Envie uma Mensagem
                </h3>

                <div>
                  <label className="font-bold block mb-1">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#B87D7B]"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Seu E-mail *</label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#B87D7B]"
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1">Mensagem ou Dúvida *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Como podemos te ajudar?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#B87D7B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 gradient-dua-bg text-white font-bold rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] transition-transform"
                >
                  <Send className="w-4 h-4" /> Enviar Mensagem
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
