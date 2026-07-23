import { Product, Category, Coupon, StoreSettings } from '../types';

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: "Dua Modas",
  slogan: "Moda que Conecta",
  phone: "(11) 95636-6343",
  whatsappNumber: "5511956366343",
  email: "anapriscilafrances19@gmail.com",
  address: "R. Rui Barbosa, 110 - São Roque - SP, 18130-440",
  instagram: "https://instagram.com/duamodas",
  facebook: "https://facebook.com/duamodas",
  tiktok: "https://tiktok.com/@duamodas",
  floatingWhatsappMsg: "Olá Dua Modas! Vi os produtos no site e gostaria de informações sobre tamanhos e disponibilidade.",
  freeShippingThreshold: 299,
  announcementBarText: "✨ Frete Grátis para todo o Brasil em compras acima de R$ 299 | Parcele em até 6x sem juros",
  returnPolicy: "Primeira troca grátis em até 30 dias após o recebimento. Garantia de qualidade Dua Modas."
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "vestidos",
    name: "Vestidos",
    slug: "vestidos",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
    description: "Vestidos fluidos, elegantes e versáteis para qualquer ocasião especial."
  },
  {
    id: "conjuntos",
    name: "Conjuntos",
    slug: "conjuntos",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    description: "Conjuntos harmoniosos em linho, alfaiataria e tricot para looks sofisticados."
  },
  {
    id: "blusas",
    name: "Blusas & Camisas",
    slug: "blusas",
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=800&q=80",
    description: "Blusas delicadas, camisas acetinadas e croppeds elegantes."
  },
  {
    id: "calcas",
    name: "Calças & Saias",
    slug: "calcas",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    description: "Alfaiataria impecável, calças pantalona e saias plissadas refinadas."
  },
  {
    id: "acessorios",
    name: "Acessórios",
    slug: "acessorios",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    description: "Bolsas de couro, cintos dourados e joias delicadas para compor seu estilo."
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Vestido Midi Fluido Aurora Mauve",
    description: "Vestido midi confeccionado em tecido leve com caimento impecável. Decote em V delicado, cintura com amarrações ajustáveis e saia fluida que proporciona movimento e sofisticação.",
    price: 289.90,
    promotionalPrice: 239.90,
    categories: ["vestidos"],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Mauve Terroso", hex: "#B87D7B" },
      { name: "Verde Sálvia", hex: "#8B9E87" },
      { name: "Creme Off-White", hex: "#F8F5F2" }
    ],
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
    ],
    isFeatured: true,
    isNew: true,
    createdAt: Date.now() - 1000000
  },
  {
    id: "prod-2",
    name: "Conjunto Alfaiataria Linho Sálvia",
    description: "Conjunto exclusivo Dua Modas em linho puro com fiação nobre. Composto por blazer estruturado cropped e calça pantalona de cintura alta com bolsos faca funcionais.",
    price: 389.90,
    promotionalPrice: 329.90,
    categories: ["conjuntos", "calcas"],
    sizes: ["P", "M", "G"],
    colors: [
      { name: "Verde Sálvia", hex: "#8B9E87" },
      { name: "Areia Dourada", hex: "#C5A059" }
    ],
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=1000&q=80"
    ],
    isFeatured: true,
    isNew: true,
    createdAt: Date.now() - 800000
  },
  {
    id: "prod-3",
    name: "Camisa Acetinada Botões Dourados",
    description: "Camisa feminina com toque de seda extremamente suave. Modelagem clássica relaxada, gola tradicional e botões banhados a ouro suave de alta durabilidade.",
    price: 199.90,
    categories: ["blusas"],
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Champagne Dourado", hex: "#C5A059" },
      { name: "Preto Suave", hex: "#2C221E" },
      { name: "Mauve Terroso", hex: "#B87D7B" }
    ],
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80"
    ],
    isFeatured: true,
    isNew: false,
    createdAt: Date.now() - 600000
  },
  {
    id: "prod-4",
    name: "Vestido Longo Plissado Dourado Conecta",
    description: "Uma peça escultural desenhada para momentos inesquecíveis. Tecido plissado metalizado suave em tom dourado champanhe, costas nuas elegantes e fenda discreta.",
    price: 459.90,
    promotionalPrice: 399.90,
    categories: ["vestidos"],
    sizes: ["P", "M", "G"],
    colors: [
      { name: "Dourado Nobre", hex: "#C5A059" },
      { name: "Rosé Mauve", hex: "#B87D7B" }
    ],
    stock: 5,
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80"
    ],
    isFeatured: true,
    isNew: true,
    createdAt: Date.now() - 400000
  },
  {
    id: "prod-5",
    name: "Calça Pantalona Alfaiataria Premium",
    description: "Corte reto com caimento fluido impecável. Possui passantes para cinto, fechamento frontal em zíper e gancho embutido. Essencial no guarda-roupa da mulher elegante.",
    price: 229.90,
    categories: ["calcas"],
    sizes: ["36", "38", "40", "42", "44"],
    colors: [
      { name: "Verde Sálvia", hex: "#8B9E87" },
      { name: "Espresso Escuro", hex: "#2C221E" },
      { name: "Creme Luxo", hex: "#F8F5F2" }
    ],
    stock: 20,
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80"
    ],
    isFeatured: false,
    isNew: false,
    createdAt: Date.now() - 300000
  },
  {
    id: "prod-6",
    name: "Bolsa Couro Estruturada Dua Gold",
    description: "Bolsa artesanal em couro ecológico premium com fecho em fivela geométrica dourada. Alça ajustável que permite usar no ombro ou transversal.",
    price: 279.90,
    promotionalPrice: 249.90,
    categories: ["acessorios"],
    sizes: ["Único"],
    colors: [
      { name: "Couro Caramel Gold", hex: "#C5A059" },
      { name: "Couro Mauve", hex: "#B87D7B" },
      { name: "Preto Nobre", hex: "#2C221E" }
    ],
    stock: 10,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80"
    ],
    isFeatured: true,
    isNew: true,
    createdAt: Date.now() - 200000
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: "coup-1",
    code: "DUA10",
    discountType: "percent",
    discountValue: 10,
    expirationDate: "2026-12-31",
    usageType: "multiple",
    minPurchase: 100,
    active: true,
    usedCount: 14
  },
  {
    id: "coup-2",
    code: "BEMVINDA15",
    discountType: "percent",
    discountValue: 15,
    expirationDate: "2026-12-31",
    usageType: "multiple",
    minPurchase: 200,
    active: true,
    usedCount: 38
  },
  {
    id: "coup-3",
    code: "FRETE30",
    discountType: "fixed",
    discountValue: 30,
    expirationDate: "2026-12-31",
    usageType: "multiple",
    minPurchase: 150,
    active: true,
    usedCount: 7
  }
];
