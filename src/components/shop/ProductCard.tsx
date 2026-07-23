import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductDetail, toggleWishlist, isInWishlist, addToCart } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');

  const inWishlist = isInWishlist(product.id);

  const mainImage = product.images[0] || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80";
  const hoverImage = product.images[1] || mainImage;

  const hasDiscount = product.promotionalPrice && product.promotionalPrice < product.price;
  const currentPrice = hasDiscount ? product.promotionalPrice! : product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.promotionalPrice!) / product.price) * 100) 
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.colors[0] || { name: 'Padrão', hex: '#2C221E' };
    addToCart(product, selectedSize, defaultColor, 1);
  };

  return (
    <div 
      onClick={() => openProductDetail(product.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-[#3A2E2B] rounded-2xl overflow-hidden border border-[#C5A059]/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full bg-[#F8F5F2] dark:bg-[#2C221E] overflow-hidden">
        {/* Main Image with Smooth Zoom */}
        <img
          src={isHovered ? hoverImage : mainImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-[#8B9E87] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              Novo
            </span>
          )}
          {hasDiscount && (
            <span className="px-2.5 py-1 bg-[#B87D7B] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
          {product.isFeatured && !product.isNew && !hasDiscount && (
            <span className="px-2.5 py-1 bg-[#C5A059] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Destaque
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={inWishlist ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            inWishlist 
              ? 'bg-[#B87D7B] text-white' 
              : 'bg-white/80 dark:bg-[#2C221E]/80 text-[#2C221E] dark:text-[#F8F5F2] hover:text-[#B87D7B]'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick Actions Drawer */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 bg-[#2C221E]/90 hover:bg-[#2C221E] text-white text-xs font-semibold rounded-xl backdrop-blur-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
            Adicionar à Sacola
          </button>
          <button
            onClick={() => openProductDetail(product.id)}
            className="p-2.5 bg-white/90 hover:bg-white text-[#2C221E] rounded-xl backdrop-blur-sm shadow-lg transition-transform active:scale-95"
            title="Ver Detalhes"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Info */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white dark:bg-[#3A2E2B]">
        <div>
          {/* Colors Dot Swatches */}
          <div className="flex items-center gap-1.5 mb-2">
            {product.colors.map((col, idx) => (
              <span
                key={idx}
                className="w-3 h-3 rounded-full border border-stone-300 dark:border-stone-600 shadow-2xs"
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
          </div>

          <h3 className="font-serif-luxury text-base font-semibold text-[#2C221E] dark:text-[#F8F5F2] line-clamp-1 group-hover:text-[#B87D7B] transition-colors">
            {product.name}
          </h3>

          {/* Sizes chips */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <span className="text-[10px] text-stone-400 font-medium mr-1">Tamanhos:</span>
            {product.sizes.map((sz) => (
              <span
                key={sz}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(sz);
                }}
                className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                  selectedSize === sz
                    ? 'border-[#B87D7B] text-[#B87D7B] font-bold bg-[#B87D7B]/10'
                    : 'border-stone-200 dark:border-stone-700 text-stone-500'
                }`}
              >
                {sz}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-3 pt-3 border-t border-[#F8F5F2] dark:border-stone-800 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#2C221E] dark:text-[#F8F5F2]">
              R$ {currentPrice.toFixed(2).replace('.', ',')}
            </span>
            {hasDiscount && (
              <span className="text-xs text-stone-400 line-through font-normal">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium text-[#8B9E87] bg-[#8B9E87]/10 px-2 py-0.5 rounded-full">
            6x de R$ {(currentPrice / 6).toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>
    </div>
  );
};
