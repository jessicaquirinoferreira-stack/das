import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Logo } from './Logo';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Lock,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setCurrentView, selectCategory, triggerLuxuryIntro } = useStore();

  return (
    <footer className="bg-[#2C221E] text-[#F8F5F2] pt-16 pb-8 border-t-4 border-[#C5A059]">
      {/* Value Proposition Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-[#3A2E2B] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#B87D7B]/20 rounded-2xl text-[#B87D7B]">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#F8F5F2]">Entrega para todo o Brasil</h4>
            <p className="text-xs text-stone-400 mt-0.5">Com rastreamento e frete grátis acima de R$ 299</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#8B9E87]/20 rounded-2xl text-[#8B9E87]">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#F8F5F2]">Primeira Troca Grátis</h4>
            <p className="text-xs text-stone-400 mt-0.5">Até 30 dias para trocar suas peças com tranquilidade</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#C5A059]/20 rounded-2xl text-[#C5A059]">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#F8F5F2]">Pagamento 100% Seguro</h4>
            <p className="text-xs text-stone-400 mt-0.5">Pix com 5% de desconto, Cartão em 6x ou Boleto</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#B87D7B]/20 rounded-2xl text-[#B87D7B]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#F8F5F2]">Atendimento Personalizado</h4>
            <p className="text-xs text-stone-400 mt-0.5">Atendimento via WhatsApp por estilistas</p>
          </div>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#3A2E2B]">
        {/* Col 1: Store Bio */}
        <div className="space-y-4">
          <Logo variant="full" size="md" />
          <p className="text-xs text-stone-300 leading-relaxed font-light pt-2">
            A Dua Modas nasceu do desejo de conectar mulheres à sua essência através de peças sofisticadas, atemporais e de caimento impecável.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={settings.instagram || "https://instagram.com/duamodas"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Dua Modas"
              className="p-2.5 bg-[#3A2E2B] hover:bg-[#B87D7B] text-[#F8F5F2] rounded-full transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={settings.facebook || "https://facebook.com/duamodas"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook da Dua Modas"
              className="p-2.5 bg-[#3A2E2B] hover:bg-[#8B9E87] text-[#F8F5F2] rounded-full transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Categories */}
        <div>
          <h4 className="font-serif-luxury text-base font-bold text-[#C5A059] uppercase tracking-wider mb-4">
            Categorias em Destaque
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-300">
            <li>
              <button onClick={() => selectCategory('vestidos')} className="hover:text-[#B87D7B] transition-colors flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-[#C5A059]" /> Vestidos
              </button>
            </li>
            <li>
              <button onClick={() => selectCategory('conjuntos')} className="hover:text-[#B87D7B] transition-colors flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-[#C5A059]" /> Conjuntos em Linho
              </button>
            </li>
            <li>
              <button onClick={() => selectCategory('blusas')} className="hover:text-[#B87D7B] transition-colors flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-[#C5A059]" /> Blusas & Camisas
              </button>
            </li>
            <li>
              <button onClick={() => selectCategory('calcas')} className="hover:text-[#B87D7B] transition-colors flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-[#C5A059]" /> Calças & Alfaiataria
              </button>
            </li>
            <li>
              <button onClick={() => selectCategory('acessorios')} className="hover:text-[#B87D7B] transition-colors flex items-center gap-1.5">
                <ArrowRight className="w-3 h-3 text-[#C5A059]" /> Acessórios & Bolsas
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Customer Care & Pages */}
        <div>
          <h4 className="font-serif-luxury text-base font-bold text-[#C5A059] uppercase tracking-wider mb-4">
            Institucional & Ajuda
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-300">
            <li>
              <button onClick={() => setCurrentView('about')} className="hover:text-[#B87D7B] transition-colors">
                Nossa História & Conceito
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('contact')} className="hover:text-[#B87D7B] transition-colors">
                Fale Conosco
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('contact')} className="hover:text-[#B87D7B] transition-colors">
                Política de Troca e Devolução
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('contact')} className="hover:text-[#B87D7B] transition-colors">
                Prazos e Entregas
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('admin')} className="text-[#C5A059] font-semibold hover:underline flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> Área Administrativa (Login Admin)
              </button>
            </li>
            <li>
              <button onClick={triggerLuxuryIntro} className="text-[#C5A059] font-semibold hover:underline flex items-center gap-1 mt-1">
                <Sparkles className="w-3.5 h-3.5" /> Assistir Entrada Luxo (6s)
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Direct Contacts */}
        <div>
          <h4 className="font-serif-luxury text-base font-bold text-[#C5A059] uppercase tracking-wider mb-4">
            Atendimento
          </h4>
          <div className="space-y-3 text-xs text-stone-300">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#8B9E87] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#F8F5F2]">Telefone & WhatsApp Pedidos:</p>
                <a href={`https://wa.me/${settings.whatsappNumber || '5511956366343'}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">
                  {settings.phone || "(11) 95636-6343"}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#B87D7B] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#F8F5F2]">E-mail Oficial:</p>
                <a href={`mailto:${settings.email || 'anapriscilafrances19@gmail.com'}`} className="hover:text-[#B87D7B] transition-colors">
                  {settings.email || "anapriscilafrances19@gmail.com"}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#F8F5F2]">Localização:</p>
                <p>{settings.address || "R. Rui Barbosa, 110 - São Roque - SP, 18130-440"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Payment Icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
        <p>© {new Date().getFullYear()} Dua Modas - Todos os direitos reservados. CNPJ: 42.189.562/0001-90.</p>
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase font-semibold text-stone-400">Pagamento:</span>
          <span className="px-2 py-1 bg-[#3A2E2B] text-[#C5A059] rounded text-[10px] font-bold">PIX (-5%)</span>
          <span className="px-2 py-1 bg-[#3A2E2B] text-stone-200 rounded text-[10px] font-bold">Cartão de Crédito</span>
          <span className="px-2 py-1 bg-[#3A2E2B] text-stone-200 rounded text-[10px] font-bold">Boleto</span>
        </div>
      </div>
    </footer>
  );
};
