import { useState } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import CategorySection from "@/components/CategorySection";
import Footer from "@/components/Footer";
import { getProductsByCategory, getCategoryTitle } from "@/data/products";

const Index = () => {
  const [currentCategory, setCurrentCategory] = useState("home");

  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category);
  };

  const products = getProductsByCategory(currentCategory);
  const categoryTitle = getCategoryTitle(currentCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onCategoryClick={handleCategoryClick} 
        currentCategory={currentCategory} 
      />

      {/* Main Content */}
      <main>
        {/* Hero Section - apenas na home */}
        {currentCategory === "home" && (
          <section className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-primary bg-clip-text text-transparent">
                Sua Paixão pelo Futebol Começa Aqui
              </h1>
              <p className="text-xl text-center text-muted-foreground max-w-2xl mx-auto">
                Camisas oficiais das principais ligas e seleções do mundo. 
                Qualidade premium, entrega rápida e segura.
              </p>
            </div>
            <HeroCarousel />
          </section>
        )}

        {/* Products Section */}
        <CategorySection title={categoryTitle} products={products} />

        {/* Features Section - apenas na home */}
        {currentCategory === "home" && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                Por que escolher a FutebolShop?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 rounded-lg bg-card shadow-card">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Produtos Oficiais</h3>
                  <p className="text-muted-foreground">
                    Todas as camisas são oficiais e licenciadas pelos clubes e federações.
                  </p>
                </div>
                
                <div className="text-center p-6 rounded-lg bg-card shadow-card">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Entrega Rápida</h3>
                  <p className="text-muted-foreground">
                    Entregamos em todo o Brasil com rapidez e segurança garantidas.
                  </p>
                </div>
                
                <div className="text-center p-6 rounded-lg bg-card shadow-card">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-2-2V10a2 2 0 012-2h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Atendimento WhatsApp</h3>
                  <p className="text-muted-foreground">
                    Suporte personalizado via WhatsApp para tirar todas suas dúvidas.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;