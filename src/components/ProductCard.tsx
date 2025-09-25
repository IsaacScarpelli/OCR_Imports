import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/produto/${product.id}`);
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

        {/* Action Button */}
        <Button
          onClick={handleViewDetails}
          variant="default"
          size="lg"
          className="w-full hover-scale"
        >
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;