import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, ShoppingBag, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface HeaderProps {
  onCategoryClick: (category: string) => void;
  currentCategory: string;
}

const Header = ({ onCategoryClick, currentCategory }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { state } = useCart();

  const categories = [
    { id: "home", label: "Home" },
    { id: "ligas", label: "Ligas Internacionais" },
    { id: "selecoes", label: "Seleções" },
    { id: "retro", label: "Camisas Retrô" },
    { id: "brasileirao", label: "Brasileirão" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onCategoryClick("home")}
          >
            <ShoppingBag className="h-8 w-8 text-primary mr-2" />
            <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              FutebolShop
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryClick(category.id)}
                className={`font-medium transition-colors hover:text-primary ${
                  currentCategory === category.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {category.label}
              </button>
            ))}
          </nav>

          {/* Cart Icon */}
          <div className="hidden md:flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/carrinho')}
              className="relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {state.itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {state.itemCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Mobile Cart and Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/carrinho')}
              className="relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {state.itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {state.itemCount}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryClick(category.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left font-medium transition-colors hover:text-primary ${
                    currentCategory === category.id
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;