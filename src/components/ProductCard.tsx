import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

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
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleViewDetails = () => {
    navigate(`/produto/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedSize) {
      toast.error("Por favor, selecione um tamanho");
      return;
    }
    
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, size: selectedSize }
    });
    
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div 
      className="group bg-card rounded-lg shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden animate-fade-in cursor-pointer"
      onClick={handleViewDetails}
      data-testid={`card-product-${product.id}`}
    >
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

        {/* Size Selector */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Selecione o tamanho:</p>
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger className="w-full" onClick={(e) => e.stopPropagation()}>
              <SelectValue placeholder="Escolha um tamanho" />
            </SelectTrigger>
            <SelectContent>
              {product.sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            variant="default"
            size="lg"
            className="w-full"
            onClick={handleAddToCart}
            disabled={!selectedSize}
            data-testid={`button-add-cart-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Adicionar ao Carrinho
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            data-testid={`button-product-details-${product.id}`}
          >
            Ver Detalhes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;