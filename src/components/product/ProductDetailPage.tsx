import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Heart, 
  ShoppingBag, 
  MessageCircle, 
  Ruler, 
  Truck, 
  RefreshCw, 
  Check, 
  Share2, 
  ArrowLeft,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ProductCard } from '../shop/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { 
    products, 
    selectedProductId, 
    setCurrentView, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    settings,
    setIsCartOpen,
    showToast
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>(
    product?.colors[0] || { name: 'Padrão', hex: '#2C221E' }
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'care' | 'shipping'>('desc');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p>Produto não encontrado.</p>
        <button onClick={() => setCurrentView('shop')} className="mt-4 text-[#B87D7B] font-bold underline">
          Voltar para a loja
        </button>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.promotionalPrice && product.promotionalPrice < product.price;
  const currentPrice = hasDiscount ? product.promotionalPrice! : product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.promotionalPrice!) / product.price) * 100) 
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCartOpen(true);
  };

  const handleBuyWhatsApp = () => {
    const rawNumber = settings.whatsappNumber || "5511956366343";
    const msg = encodeURIComponent(
      `Olá Dua Modas! Gostaria de comprar o produto:\n- *${product.name}*\n- Tamanho: ${selectedSize}\n- Cor: ${selectedColor.name}\n- Valor: R$ ${currentPrice.toFixed(2).replace('.', ',')}\n\nComo prossigo com o pedido?`
    );
    window.open(`https://wa.me/${rawNumber}?text=${msg}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Confira ${product.name} na Dua Modas - Moda que Conecta!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link do produto copiado!');
    }
  };

  // Related products from same category or fallback
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categories.some((c) => product.categories.includes(c)))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Back Button */}
      <button
        onClick={() => setCurrentView('shop')}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 hover:text-[#B87D7B] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar para a Coleção
      </button>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
        {/* Left Gallery (7 cols on large screens) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnail List */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] scrollbar-none">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeImageIndex === idx 
                    ? 'border-[#B87D7B] ring-2 ring-[#B87D7B]/20' 
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Stage Display Image */}
          <div className="relative flex-1 aspect-[3/4] bg-[#F8F5F2] dark:bg-[#2C221E] rounded-3xl overflow-hidden border border-[#C5A059]/20 shadow-md">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {hasDiscount && (
                <span className="px-3 py-1 bg-[#B87D7B] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                  -{discountPercent}% OFF
                </span>
              )}
              {product.isNew && (
                <span className="px-3 py-1 bg-[#8B9E87] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                  Lançamento
                </span>
              )}
            </div>

            {/* Actions top right */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-3 bg-white/90 dark:bg-[#2C221E]/90 text-[#2C221E] dark:text-[#F8F5F2] rounded-full backdrop-blur-md shadow-md hover:bg-white transition-all"
                title="Compartilhar"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-full backdrop-blur-md shadow-md transition-all ${
                  inWishlist 
                    ? 'bg-[#B87D7B] text-white' 
                    : 'bg-white/90 dark:bg-[#2C221E]/90 text-[#2C221E] dark:text-[#F8F5F2] hover:text-[#B87D7B]'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Product Information (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8B9E87] mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Dua Modas • Exclusividade
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#2C221E] dark:text-[#F8F5F2] leading-tight">
              {product.name}
            </h1>

            {/* Pricing Box */}
            <div className="mt-4 p-4 bg-white dark:bg-[#3A2E2B] rounded-2xl border border-[#C5A059]/20 flex items-baseline justify-between shadow-2xs">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-[#2C221E] dark:text-[#F8F5F2]">
                    R$ {currentPrice.toFixed(2).replace('.', ',')}
                  </span>
                  {hasDiscount && (
                    <span className="text-base text-stone-400 line-through">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#8B9E87] font-semibold mt-1">
                  ou até 6x de R$ {(currentPrice / 6).toFixed(2).replace('.', ',')} sem juros
                </p>
              </div>
              <span className="text-xs font-bold text-[#C5A059] bg-[#C5A059]/10 px-3 py-1 rounded-full">
                -5% no Pix
              </span>
            </div>

            {/* Color Swatches Selection */}
            <div className="mt-6">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 block mb-2">
                Cor: <span className="text-[#B87D7B] font-semibold">{selectedColor.name}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                      selectedColor.name === color.name
                        ? 'border-[#B87D7B] ring-2 ring-[#B87D7B]/20 bg-white dark:bg-[#3A2E2B]'
                        : 'border-stone-200 dark:border-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full border border-stone-300" style={{ backgroundColor: color.hex }} />
                    <span className="text-stone-700 dark:text-stone-200">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                  Tamanho: <span className="text-[#B87D7B] font-semibold">{selectedSize}</span>
                </label>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs text-[#C5A059] hover:underline font-semibold flex items-center gap-1"
                >
                  <Ruler className="w-3.5 h-3.5" /> Guia de Medidas
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-[#2C221E] text-white shadow-md border-2 border-[#C5A059]'
                        : 'bg-white dark:bg-[#3A2E2B] text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:border-[#2C221E]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Stock */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-xl bg-white dark:bg-[#3A2E2B] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-black font-bold"
                >
                  -
                </button>
                <span className="w-10 text-center text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-black font-bold"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-[#8B9E87] font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> Em estoque ({product.stock} peças disponíveis)
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 px-6 gradient-dua-bg text-white font-bold rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#B87D7B]/20 hover:scale-[1.01] transition-transform"
              >
                <ShoppingBag className="w-4 h-4" /> Adicionar à Sacola
              </button>

              <button
                onClick={handleBuyWhatsApp}
                className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-transform"
              >
                <MessageCircle className="w-4 h-4 fill-current" /> Comprar via WhatsApp
              </button>
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="p-4 bg-[#F8F5F2] dark:bg-[#2C221E] rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2.5 text-xs text-stone-600 dark:text-stone-300">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#8B9E87]" />
              <span>Envio rápido para todo o Brasil com código de rastreio</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-[#B87D7B]" />
              <span>Troca grátis em até 30 dias na primeira compra</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Garantia de Qualidade e Caimento Impecável Dua Modas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section (Description, Care, Shipping) */}
      <div className="bg-white dark:bg-[#3A2E2B] rounded-3xl p-6 sm:p-8 border border-[#C5A059]/20 shadow-sm mb-16">
        <div className="flex items-center gap-6 border-b border-stone-200 dark:border-stone-800 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('desc')}
            className={`font-serif-luxury text-base sm:text-lg font-bold pb-2 transition-all border-b-2 ${
              activeTab === 'desc'
                ? 'border-[#B87D7B] text-[#B87D7B]'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            Descrição da Peça
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`font-serif-luxury text-base sm:text-lg font-bold pb-2 transition-all border-b-2 ${
              activeTab === 'care'
                ? 'border-[#B87D7B] text-[#B87D7B]'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            Composição & Cuidados
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`font-serif-luxury text-base sm:text-lg font-bold pb-2 transition-all border-b-2 ${
              activeTab === 'shipping'
                ? 'border-[#B87D7B] text-[#B87D7B]'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            Entrega & Política de Troca
          </button>
        </div>

        {activeTab === 'desc' && (
          <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed space-y-3">
            <p>{product.description}</p>
            <p>
              Desenvolvido com padrão de alta costura, garantindo elegância atemporal e versatilidade para diversas ocasiões do dia à noite.
            </p>
          </div>
        )}

        {activeTab === 'care' && (
          <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed space-y-2">
            <p>• Composição: 70% Linho Nobre / 30% Viscose de Alta Gramatura</p>
            <p>• Lavagem à mão ou no ciclo delicado da máquina em água fria</p>
            <p>• Não utilizar alvejante ou secadora de tambor</p>
            <p>• Passar a ferro em temperatura média pelo avesso</p>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed space-y-2">
            <p>• Despachamos seu pedido em até 24h úteis após a confirmação do pagamento.</p>
            <p>• Frete Grátis automático para compras a partir de R$ 299,00.</p>
            <p>• Primeira troca totalmente grátis em até 30 dias corridos após o recebimento.</p>
          </div>
        )}
      </div>

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="font-serif-luxury text-2xl font-bold text-[#2C221E] dark:text-[#F8F5F2] mb-6">
            Você Também Vai Amar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal Popup */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#2C221E] rounded-3xl p-6 max-w-lg w-full border border-[#C5A059]/30 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-4">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-[#B87D7B]" />
                <h3 className="font-serif-luxury font-bold text-lg">Tabela de Medidas Dua Modas</h3>
              </div>
              <button onClick={() => setShowSizeGuide(false)} className="text-stone-400 hover:text-black">
                ✕
              </button>
            </div>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8F5F2] dark:bg-[#3A2E2B] text-[#B87D7B]">
                    <th className="p-2 border">Tamanho</th>
                    <th className="p-2 border">Busto (cm)</th>
                    <th className="p-2 border">Cintura (cm)</th>
                    <th className="p-2 border">Quadril (cm)</th>
                  </tr>
                </thead>
                <tbody className="text-stone-600 dark:text-stone-300">
                  <tr>
                    <td className="p-2 border font-bold">P (36-38)</td>
                    <td className="p-2 border">84 - 88</td>
                    <td className="p-2 border">66 - 70</td>
                    <td className="p-2 border">94 - 98</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-bold">M (40)</td>
                    <td className="p-2 border">89 - 94</td>
                    <td className="p-2 border">71 - 76</td>
                    <td className="p-2 border">99 - 104</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-bold">G (42)</td>
                    <td className="p-2 border">95 - 100</td>
                    <td className="p-2 border">77 - 82</td>
                    <td className="p-2 border">105 - 110</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-bold">GG (44)</td>
                    <td className="p-2 border">101 - 108</td>
                    <td className="p-2 border">83 - 90</td>
                    <td className="p-2 border">111 - 118</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full mt-6 py-2.5 bg-[#8B9E87] text-white font-bold rounded-xl text-xs uppercase"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
