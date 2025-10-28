import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, ShoppingCart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProductById } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  
  const product = id ? getProductById(id) : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCategoryClick={() => navigate("/")} currentCategory="home" />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Button onClick={() => navigate("/")} variant="default">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Por favor, selecione um tamanho antes de continuar.");
      return;
    }
    
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { product, size: selectedSize } 
    });
    
    toast.success(`${product.name} (${selectedSize}) adicionado ao carrinho!`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Por favor, selecione um tamanho antes de continuar.");
      return;
    }
    
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { product, size: selectedSize } 
    });
    
    navigate('/checkout');
  };

  const handleWhatsAppClick = () => {
    if (!selectedSize) {
      alert("Por favor, selecione um tamanho antes de continuar.");
      return;
    }
    
    const message = `Olá, tenho interesse nesta camisa ${product.name}, tamanho ${selectedSize}. Poderia me passar mais informações?`;
    const whatsappUrl = `https://wa.me/5531997234480?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCategoryClick={() => navigate("/")} currentCategory="home" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={handleBackClick}
          className="mb-6 animate-fade-in"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="animate-fade-in">
            <div className="relative overflow-hidden rounded-lg shadow-hover bg-gradient-card">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-slide-in space-y-6">
            <div>
              <Badge variant="outline" className="mb-4">
                {product.category === "ligas" && "Ligas Internacionais"}
                {product.category === "selecoes" && "Seleções"}
                {product.category === "retro" && "Camisas Retrô"}
                {product.category === "brasileirao" && "Brasileirão"}
              </Badge>
              
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">
                  R$ {product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Frete Grátis
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    Produto Oficial
                  </Badge>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Descrição do Produto</h3>
              <p className="text-muted-foreground leading-relaxed">
                Camisa oficial de alta qualidade, confeccionada com materiais premium. 
                Design autêntico e licenciado oficialmente. Ideal para torcer pelo seu time 
                ou usar no dia a dia com muito estilo.
              </p>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Características:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Material: 100% Poliéster</li>
                  <li>• Tecnologia Dri-FIT</li>
                  <li>• Corte regular</li>
                  <li>• Licenciamento oficial</li>
                  <li>• Lavagem à máquina</li>
                </ul>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Selecione o Tamanho</h3>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 border-2 rounded-lg font-semibold transition-all hover:shadow-card ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground shadow-glow"
                        : "border-border bg-card text-card-foreground hover:border-primary/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase Actions */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="lg"
                  className="w-full text-lg py-6 hover-scale"
                  disabled={!selectedSize}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                
                <Button
                  onClick={handleBuyNow}
                  variant="default"
                  size="lg"
                  className="w-full text-lg py-6 hover-scale bg-primary"
                  disabled={!selectedSize}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Comprar Agora
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">ou</p>
                <Button
                  onClick={handleWhatsAppClick}
                  variant="outline"
                  size="lg"
                  className="w-full text-lg py-4 border-green-200 text-green-700 hover:bg-green-50"
                  disabled={!selectedSize}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Comprar via WhatsApp
                </Button>
                
                <p className="text-xs text-muted-foreground mt-2">
                  Pagamento online seguro ou atendimento personalizado
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-muted/30 rounded-lg p-6 space-y-4">
              <h4 className="font-semibold flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-primary" />
                Informações de Compra
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• <strong>Entrega:</strong> Frete grátis para todo o Brasil</p>
                <p>• <strong>Prazo:</strong> 3-7 dias úteis via Correios</p>
                <p>• <strong>Pagamento:</strong> PIX, cartão ou boleto</p>
                <p>• <strong>Garantia:</strong> 30 dias para troca</p>
                <p>• <strong>Atendimento:</strong> Segunda a sexta, 9h às 18h</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
