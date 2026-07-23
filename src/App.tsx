import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { Toast } from './components/common/Toast';
import { CartDrawer } from './components/cart/CartDrawer';
import { LuxuryIntro } from './components/common/LuxuryIntro';

import { Hero } from './components/home/Hero';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { PromoBanner } from './components/home/PromoBanner';
import { Testimonials } from './components/home/Testimonials';
import { TrustAndPaymentBar } from './components/home/TrustAndPaymentBar';

import { ProductGrid } from './components/shop/ProductGrid';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { AboutPage } from './components/about/AboutPage';
import { ContactPage } from './components/contact/ContactPage';
import { AdminLayout } from './components/admin/AdminLayout';

const MainContent: React.FC = () => {
  const { currentView, showLuxuryIntro, closeLuxuryIntro } = useStore();

  return (
    <div className="min-h-screen bg-[#F8F5F2] dark:bg-[#2C221E] text-[#2C221E] dark:text-[#F8F5F2] flex flex-col font-sans selection:bg-[#B87D7B] selection:text-white">
      {showLuxuryIntro && <LuxuryIntro onComplete={closeLuxuryIntro} />}
      <Header />
      <Toast />
      <CartDrawer />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <FeaturedProducts />
            <PromoBanner />
            <Testimonials />
            <TrustAndPaymentBar />
          </>
        )}

        {currentView === 'shop' && <ProductGrid />}
        {currentView === 'product' && <ProductDetailPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'admin' && <AdminLayout />}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
