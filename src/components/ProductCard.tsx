import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  sizes: string[];
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleWhatsAppClick = (size: string) => {
    const message = `Olá, tenho interesse nesta camisa ${product.name}, tamanho ${size}. Poderia me passar mais informações?`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="group bg-card rounded-lg shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden animate-fade-in">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-card">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-semibold text-lg text-card-foreground mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary">
            R$ {product.price.toFixed(2)}
          </span>
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Tamanhos disponíveis:</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <Badge key={size} variant="outline" className="text-xs">
                {size}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground mb-2">Escolha o tamanho:</p>
          <div className="grid grid-cols-2 gap-2">
            {product.sizes.map((size) => (
              <Button
                key={size}
                variant="whatsapp"
                size="sm"
                onClick={() => handleWhatsAppClick(size)}
                className="text-xs"
              >
                {size} - WhatsApp
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;