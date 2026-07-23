import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import confetti from 'canvas-confetti';
import { 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  QrCode, 
  FileText, 
  CheckCircle2, 
  Truck, 
  ArrowLeft, 
  MessageCircle, 
  Copy, 
  Check, 
  Sparkles,
  ShieldCheck,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { Order } from '../../types';
import { calculateCorreiosShipping, ShippingOption } from '../../utils/shipping';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    appliedCoupon, 
    couponDiscount, 
    shippingFee, 
    setShippingFee, 
    shippingMethodName, 
    setShippingMethodName,
    cartTotal, 
    submitOrder, 
    settings, 
    setCurrentView,
    showToast
  } = useStore();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  
  // Address State
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [reference, setReference] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState('');

  // Shipping Calculation Options State
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedShippingId, setSelectedShippingId] = useState<string>('pac');

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'boleto'>('pix');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Flow State
  const [submitting, setSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);
  const [generatedWaUrl, setGeneratedWaUrl] = useState<string>('');

  // Auto calculate free shipping or default PAC initially
  useEffect(() => {
    const freeThreshold = settings.freeShippingThreshold || 299;
    if (cartSubtotal >= freeThreshold) {
      setShippingFee(0);
      setShippingMethodName('Correios PAC (Frete Grátis)');
    } else if (!shippingMethodName) {
      setShippingFee(18.90);
      setShippingMethodName('Correios PAC');
    }
  }, [cartSubtotal, settings.freeShippingThreshold]);

  // Execute shipping calculation for a CEP
  const recalculateShippingForCep = (cleanCep: string, stateUf: string) => {
    const options = calculateCorreiosShipping(
      cleanCep,
      stateUf,
      cartSubtotal,
      settings.freeShippingThreshold || 299
    );
    setShippingOptions(options);

    const chosen = options.find((o) => o.id === selectedShippingId) || options[0];
    if (chosen) {
      setSelectedShippingId(chosen.id);
      setShippingFee(chosen.price);
      setShippingMethodName(chosen.name);
    }
  };

  // ViaCEP Automatic Address Lookup & Correios Calculation
  const handleCepLookup = async (cepValue: string) => {
    const cleanCep = cepValue.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    setLoadingCep(true);
    setCepError('');
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();
      if (data.erro) {
        setCepError('CEP não encontrado. Por favor, preencha o endereço manualmente.');
        recalculateShippingForCep(cleanCep, 'SP');
      } else {
        setStreet(data.logradouro || '');
        setNeighborhood(data.bairro || '');
        setCity(data.localidade || '');
        setUf(data.uf || '');
        showToast(`Endereço localizado: ${data.localidade}/${data.uf}`);

        // Recalculate Correios shipping options based on customer UF
        recalculateShippingForCep(cleanCep, data.uf || 'SP');
      }
    } catch {
      setCepError('Erro ao buscar CEP. Preencha o endereço.');
      recalculateShippingForCep(cleanCep, 'SP');
    } finally {
      setLoadingCep(false);
    }
  };

  const handleSelectShippingOption = (opt: ShippingOption) => {
    setSelectedShippingId(opt.id);
    setShippingFee(opt.price);
    setShippingMethodName(opt.name);
  };

  // Pix Extra Discount (5%)
  const isPix = paymentMethod === 'pix';
  const pixDiscount = isPix ? (cartSubtotal - couponDiscount) * 0.05 : 0;
  const finalPayableTotal = Math.max(0, cartTotal - pixDiscount);

  // Handle Order Submit
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !email) {
      showToast('Por favor, preencha seu nome, telefone e e-mail.', 'error');
      return;
    }

    if (!cep || !street || !number || !city) {
      showToast('Por favor, preencha o endereço de entrega completo.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const customer = {
        fullName,
        email,
        phone,
        cpf: cpf || undefined,
        address: {
          cep,
          street,
          number,
          complement,
          neighborhood,
          city,
          state: uf,
          reference
        }
      };

      const newOrder = await submitOrder(customer, paymentMethod);
      setCompletedOrder(newOrder);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B87D7B', '#8B9E87', '#C5A059']
      });

      // Format WhatsApp pre-filled message string cleanly
      const rawNumber = settings.whatsappNumber || "5511956366343";
      const formattedItems = newOrder.items
        .map((i) => `• *${i.quantity}x ${i.name}* (Tam: ${i.selectedSize}, Cor: ${i.selectedColor}) - R$ ${(i.price * i.quantity).toFixed(2).replace('.', ',')}`)
        .join('\n');

      const paymentLabel = paymentMethod === 'pix' 
        ? 'PIX (com 5% de desconto especial)' 
        : paymentMethod === 'credit_card' 
        ? 'Cartão de Crédito' 
        : 'Boleto Bancário';

      const whatsappText = `🌸 *NOVO PEDIDO DUA MODAS #${newOrder.orderNumber}*\n` +
        `----------------------------------------\n` +
        `👤 *CLIENTE:* ${fullName}\n` +
        `📞 *Telefone:* ${phone}\n` +
        `✉️ *E-mail:* ${email}\n` +
        `${cpf ? `🆔 *CPF:* ${cpf}\n` : ''}` +
        `📍 *ENDEREÇO DE ENTREGA:*\n` +
        `• Rua: ${street}, nº ${number}${complement ? ` (${complement})` : ''}\n` +
        `• Bairro: ${neighborhood}\n` +
        `• Cidade/UF: ${city}/${uf} - CEP: ${cep}\n` +
        `${reference ? `• Ponto de Ref: ${reference}\n` : ''}\n` +
        `🛍️ *ITENS DO PEDIDO (${newOrder.items.length} itens):*\n${formattedItems}\n\n` +
        `💳 *FORMA DE PAGAMENTO:* ${paymentLabel}\n\n` +
        `💰 *RESUMO FINANCEIRO:*\n` +
        `• Subtotal: R$ ${newOrder.subtotal.toFixed(2).replace('.', ',')}\n` +
        `${newOrder.discountAmount ? `• Desconto Cupom: -R$ ${newOrder.discountAmount.toFixed(2).replace('.', ',')}\n` : ''}` +
        `${isPix ? `• Desconto Pix (5%): -R$ ${pixDiscount.toFixed(2).replace('.', ',')}\n` : ''}` +
        `• Frete (${newOrder.shippingMethod}): ${newOrder.shippingFee === 0 ? 'GRÁTIS' : `R$ ${newOrder.shippingFee.toFixed(2).replace('.', ',')}`}\n` +
        `• *TOTAL FINAL: R$ ${finalPayableTotal.toFixed(2).replace('.', ',')}*\n` +
        `----------------------------------------\n` +
        `Olá Dua Modas! Gostaria de confirmar meu pedido e os detalhes para envio. Obrigada!`;

      const waUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(whatsappText)}`;
      setGeneratedWaUrl(waUrl);

      // Try opening WhatsApp automatically
      try {
        window.open(waUrl, '_blank');
      } catch (err) {
        console.warn('Pop-up blocked window.open, user will click button manually:', err);
      }

    } catch (err) {
      console.error('Error submitting order:', err);
      showToast('Sua compra foi processada! Clique no botão para enviar no WhatsApp.', 'info');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyPix = () => {
    const mockPixCode = "00020126580014BR.GOV.BCB.PIX0136anapriscilafrances19@gmail.com5204000053039865405" + finalPayableTotal.toFixed(2) + "5802BR5909DUAMODAS6009SAOPAULO62070503***6304E8A1";
    navigator.clipboard.writeText(mockPixCode);
    setCopiedPix(true);
    showToast('Código Pix copia e cola copiado!');
    setTimeout(() => setCopiedPix(false), 3000);
  };

  // Success Confirmation View
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-[#8B9E87]/20 text-[#8B9E87] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B9E87]">
          Pedido Gerado com Sucesso!
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#2C221E] dark:text-[#F8F5F2] mt-1 mb-2">
          Obrigado pela sua compra na Dua Modas
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto mb-6">
          Seu pedido <strong className="text-[#B87D7B]">#{completedOrder.orderNumber}</strong> foi gerado. Clique abaixo para enviar o resumo completo para o WhatsApp da loja:
        </p>

        {/* WhatsApp Main Button */}
        {generatedWaUrl && (
          <div className="mb-8 max-w-md mx-auto">
            <a
              href={generatedWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-[#25D366]/25 transition-transform hover:scale-105"
            >
              <MessageCircle className="w-6 h-6 fill-current" />
              <span>Enviar Resumo do Pedido no WhatsApp</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        )}

        {/* Order Card Summary */}
        <div className="bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/20 shadow-lg text-left mb-8 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b">
            <div>
              <p className="text-xs text-stone-400">Total do Pedido:</p>
              <p className="text-2xl font-bold text-[#B87D7B]">
                R$ {finalPayableTotal.toFixed(2).replace('.', ',')}
              </p>
            </div>
            <span className="px-3 py-1 bg-[#8B9E87]/15 text-[#8B9E87] font-bold text-xs rounded-full uppercase">
              {completedOrder.paymentMethod.toUpperCase()}
            </span>
          </div>

          {/* Pix QR Code Section if Pix */}
          {completedOrder.paymentMethod === 'pix' && (
            <div className="p-4 bg-[#F8F5F2] dark:bg-[#2C221E] rounded-2xl border border-dashed border-[#C5A059]/40 text-center space-y-3">
              <p className="text-xs font-bold text-[#2C221E] dark:text-[#F8F5F2]">
                Aproveite seu desconto de 5%! Escaneie ou copie o Pix abaixo:
              </p>
              <div className="w-36 h-36 bg-white p-2 rounded-xl mx-auto border shadow-sm flex items-center justify-center">
                <QrCode className="w-28 h-28 text-[#2C221E]" />
              </div>
              <button
                onClick={handleCopyPix}
                className="py-2.5 px-5 bg-[#C5A059] hover:bg-[#a3803c] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 mx-auto transition-transform active:scale-95 cursor-pointer"
              >
                {copiedPix ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedPix ? 'Pix Copiado!' : 'Copiar Código Pix Copia e Cola'}
              </button>
            </div>
          )}

          {/* Items Summary */}
          <div>
            <h4 className="font-serif-luxury font-bold text-sm mb-2">Peças do Pedido:</h4>
            <div className="space-y-2">
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs py-1 border-b border-stone-100 dark:border-stone-800">
                  <span>{item.quantity}x {item.name} ({item.selectedSize} / {item.selectedColor})</span>
                  <span className="font-bold">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Return Button */}
        <div>
          <button
            onClick={() => setCurrentView('home')}
            className="text-xs text-stone-500 hover:text-[#B87D7B] font-semibold underline cursor-pointer"
          >
            Voltar para a Página Inicial
          </button>
        </div>
      </div>
    );
  }

  // Empty Cart Guard
  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto" />
        <h2 className="font-serif-luxury text-2xl font-bold">Sua sacola está vazia</h2>
        <p className="text-xs text-stone-500">Adicione produtos antes de ir para o checkout.</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-3 bg-[#B87D7B] text-white font-bold rounded-xl text-xs uppercase cursor-pointer"
        >
          Explorar Coleção
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Button */}
      <button
        onClick={() => setCurrentView('shop')}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-[#B87D7B] transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Continuar Comprando
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form Column (7 cols) */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-8">
          {/* Step 1: Customer Contact Info */}
          <div className="bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/20 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F8F5F2] dark:border-stone-800">
              <span className="w-6 h-6 rounded-full bg-[#B87D7B] text-white text-xs font-bold flex items-center justify-center">1</span>
              <h2 className="font-serif-luxury text-lg font-bold text-[#2C221E] dark:text-[#F8F5F2]">
                Dados Pessoais
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Nome Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Ana Priscila Francês"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#B87D7B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">E-mail *</label>
                  <input
                    type="email"
                    required
                    placeholder="ana@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#B87D7B]"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Telefone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 95636-6343"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#B87D7B]"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">CPF (Opcional)</label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#B87D7B]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Address & Automatic Correios Rates */}
          <div className="bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/20 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F8F5F2] dark:border-stone-800">
              <span className="w-6 h-6 rounded-full bg-[#8B9E87] text-white text-xs font-bold flex items-center justify-center">2</span>
              <h2 className="font-serif-luxury text-lg font-bold text-[#2C221E] dark:text-[#F8F5F2]">
                Endereço de Entrega & Cálculo de Frete
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">CEP *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="00000-000"
                      value={cep}
                      onChange={(e) => {
                        setCep(e.target.value);
                        if (e.target.value.replace(/\D/g, '').length === 8) {
                          handleCepLookup(e.target.value);
                        }
                      }}
                      onBlur={() => handleCepLookup(cep)}
                      maxLength={9}
                      className="w-full px-3 py-2.5 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#8B9E87]"
                    />
                    {loadingCep && <span className="absolute right-3 top-2.5 text-[10px] text-[#8B9E87] font-bold">Buscando...</span>}
                  </div>
                  {cepError && <p className="text-[10px] text-red-500 mt-1">{cepError}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Rua / Logradouro *</label>
                  <input
                    type="text"
                    required
                    placeholder="Rua das Flores"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#8B9E87]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Número *</label>
                  <input
                    type="text"
                    required
                    placeholder="120"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#8B9E87]"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Complemento</label>
                  <input
                    type="text"
                    placeholder="Apto 42"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#8B9E87]"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Bairro *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jardins"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#8B9E87]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Cidade *</label>
                  <input
                    type="text"
                    required
                    placeholder="São Paulo"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#8B9E87]"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">UF *</label>
                  <input
                    type="text"
                    required
                    placeholder="SP"
                    maxLength={2}
                    value={uf}
                    onChange={(e) => {
                      const val = e.target.value.toUpperCase();
                      setUf(val);
                      if (cep.replace(/\D/g, '').length === 8) {
                        recalculateShippingForCep(cep, val);
                      }
                    }}
                    className="w-full px-3 py-2.5 bg-[#F8F5F2] dark:bg-[#2C221E] border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:border-[#8B9E87] uppercase"
                  />
                </div>
              </div>

              {/* Correios Shipping Methods Selector Box */}
              <div className="p-4 bg-[#F8F5F2] dark:bg-[#2C221E] rounded-2xl border border-[#C5A059]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#2C221E] dark:text-[#F8F5F2] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#8B9E87]" /> Opções de Envio Correios
                  </span>
                  {cartSubtotal >= (settings.freeShippingThreshold || 299) && (
                    <span className="text-[10px] bg-[#8B9E87]/20 text-[#8B9E87] px-2 py-0.5 rounded-full font-bold uppercase">
                      🎉 Frete Grátis Qualificado!
                    </span>
                  )}
                </div>

                {shippingOptions.length > 0 ? (
                  <div className="space-y-2">
                    {shippingOptions.map((opt) => (
                      <label
                        key={opt.id}
                        onClick={() => handleSelectShippingOption(opt)}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedShippingId === opt.id
                            ? 'border-[#B87D7B] bg-white dark:bg-[#3A2E2B] shadow-xs font-bold ring-1 ring-[#B87D7B]'
                            : 'border-stone-200 dark:border-stone-700 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="checkoutShippingOption"
                            checked={selectedShippingId === opt.id}
                            onChange={() => handleSelectShippingOption(opt)}
                            className="text-[#B87D7B]"
                          />
                          <div>
                            <span className="block text-xs font-bold text-[#2C221E] dark:text-[#F8F5F2]">
                              {opt.name}
                            </span>
                            <span className="block text-[10px] text-stone-500 font-normal">
                              Prazo estimado: {opt.deliveryTime}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#B87D7B]">
                          {opt.isFree ? (
                            <span className="text-[#8B9E87] font-extrabold">GRÁTIS</span>
                          ) : (
                            `R$ ${opt.price.toFixed(2).replace('.', ',')}`
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-stone-500 italic">
                    Informe seu CEP acima para visualizar o valor exato e prazo do Correios PAC e SEDEX.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/20 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#F8F5F2] dark:border-stone-800">
              <span className="w-6 h-6 rounded-full bg-[#C5A059] text-white text-xs font-bold flex items-center justify-center">3</span>
              <h2 className="font-serif-luxury text-lg font-bold text-[#2C221E] dark:text-[#F8F5F2]">
                Forma de Pagamento
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {/* PIX */}
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  paymentMethod === 'pix'
                    ? 'border-[#8B9E87] bg-[#8B9E87]/10 ring-2 ring-[#8B9E87]/20 text-[#8B9E87] font-bold'
                    : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-stone-400'
                }`}
              >
                <QrCode className="w-6 h-6" />
                <span className="text-xs">Pix (-5%)</span>
              </button>

              {/* Credit Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  paymentMethod === 'credit_card'
                    ? 'border-[#B87D7B] bg-[#B87D7B]/10 ring-2 ring-[#B87D7B]/20 text-[#B87D7B] font-bold'
                    : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-stone-400'
                }`}
              >
                <CreditCard className="w-6 h-6" />
                <span className="text-xs">Cartão</span>
              </button>

              {/* Boleto */}
              <button
                type="button"
                onClick={() => setPaymentMethod('boleto')}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                  paymentMethod === 'boleto'
                    ? 'border-[#C5A059] bg-[#C5A059]/10 ring-2 ring-[#C5A059]/20 text-[#C5A059] font-bold'
                    : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-stone-400'
                }`}
              >
                <FileText className="w-6 h-6" />
                <span className="text-xs">Boleto</span>
              </button>
            </div>

            {/* Payment Details Form depending on method */}
            {paymentMethod === 'pix' && (
              <div className="p-4 bg-[#8B9E87]/10 rounded-2xl border border-[#8B9E87]/30 text-xs text-[#5B6D57] space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-[#8B9E87]" /> Desconto especial de 5% aplicado no Pix!
                </p>
                <p>O QR Code e chave Pix serão gerados logo após clicar em Finalizar Compra.</p>
              </div>
            )}

            {paymentMethod === 'credit_card' && (
              <div className="space-y-3 text-xs animate-in fade-in pt-2">
                <div>
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Número do Cartão</label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8F5F2] dark:bg-[#2C221E] border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Nome no Cartão</label>
                  <input
                    type="text"
                    placeholder="Como impresso no cartão"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8F5F2] dark:bg-[#2C221E] border rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">Validade (MM/AA)</label>
                    <input
                      type="text"
                      placeholder="12/28"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F8F5F2] dark:bg-[#2C221E] border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 dark:text-stone-300 block mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F8F5F2] dark:bg-[#2C221E] border rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'boleto' && (
              <div className="p-4 bg-[#F8F5F2] dark:bg-[#2C221E] rounded-2xl text-xs text-stone-600 dark:text-stone-300">
                O boleto bancário tem vencimento em 3 dias úteis. A confirmação é automática após o pagamento.
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 gradient-dua-bg text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-[#B87D7B]/20 hover:scale-[1.01] transition-transform disabled:opacity-50 cursor-pointer"
          >
            {submitting ? (
              <span>Processando Pedido...</span>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                <span>FINALIZAR COMPRA E ENVIAR WHATSAPP</span>
              </>
            )}
          </button>
        </form>

        {/* Right Column: Order Summary Sidebar (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#3A2E2B] p-6 rounded-3xl border border-[#C5A059]/20 shadow-md space-y-6 sticky top-24">
            <h3 className="font-serif-luxury text-xl font-bold text-[#2C221E] dark:text-[#F8F5F2] pb-3 border-b">
              Resumo do Pedido ({cart.length} itens)
            </h3>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-3 text-xs">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-semibold line-clamp-1">{item.product.name}</p>
                    <p className="text-[10px] text-stone-500">Tam: {item.selectedSize} | Cor: {item.selectedColor.name}</p>
                    <p className="font-bold text-[#B87D7B] mt-1">
                      {item.quantity}x R$ {((item.product.promotionalPrice || item.product.price)).toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Calculations */}
            <div className="space-y-2 text-xs pt-4 border-t">
              <div className="flex justify-between text-stone-600 dark:text-stone-300">
                <span>Subtotal:</span>
                <span>R$ {cartSubtotal.toFixed(2).replace('.', ',')}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-[#8B9E87] font-bold">
                  <span>Desconto Cupom ({appliedCoupon.code}):</span>
                  <span>- R$ {couponDiscount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}

              {isPix && (
                <div className="flex justify-between text-[#8B9E87] font-bold">
                  <span>Desconto Especial Pix (5%):</span>
                  <span>- R$ {pixDiscount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600 dark:text-stone-300">
                <span>Frete ({shippingMethodName}):</span>
                <span>{shippingFee === 0 ? 'GRÁTIS' : `R$ ${shippingFee.toFixed(2).replace('.', ',')}`}</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-[#2C221E] dark:text-[#F8F5F2] pt-3 border-t">
                <span>Total Final:</span>
                <span className="text-[#B87D7B]">R$ {finalPayableTotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <div className="p-3 bg-[#F8F5F2] dark:bg-[#2C221E] rounded-xl text-[11px] text-stone-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Compra 100% segura com suporte direto pelo WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

