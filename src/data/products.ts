import { Product } from "@/components/ProductCard";

// Import das imagens geradas
import jerseyBrazil from "@/assets/jersey-brazil.jpg";
import jerseyRealMadrid from "@/assets/jersey-real-madrid.jpg";
import jerseyBarcelona from "@/assets/jersey-barcelona.jpg";
import jerseyBrazilRetro from "@/assets/jersey-brazil-retro.jpg";
import jerseyFlamengo from "@/assets/jersey-flamengo.jpg";
import jerseyPalmeiras from "@/assets/jersey-palmeiras.jpg";

export const products: Product[] = [
  // Seleções
  {
    id: "brasil-2024",
    name: "Camisa Brasil 2024 - Oficial",
    price: 249.90,
    image: jerseyBrazil,
    sizes: ["P", "M", "G", "GG"],
    category: "selecoes",
  },
  {
    id: "brasil-retro-1970",
    name: "Camisa Brasil Retrô 1970 - Tricampeão",
    price: 199.90,
    image: jerseyBrazilRetro,
    sizes: ["P", "M", "G", "GG"],
    category: "retro",
  },

  // Ligas Internacionais
  {
    id: "real-madrid-2024",
    name: "Real Madrid Home 2024/25",
    price: 299.90,
    image: jerseyRealMadrid,
    sizes: ["P", "M", "G", "GG"],
    category: "ligas",
  },
  {
    id: "barcelona-2024",
    name: "FC Barcelona Home 2024/25",
    price: 289.90,
    image: jerseyBarcelona,
    sizes: ["P", "M", "G", "GG"],
    category: "ligas",
  },

  // Brasileirão
  {
    id: "flamengo-2024",
    name: "Flamengo Home 2024 - Oficial",
    price: 229.90,
    image: jerseyFlamengo,
    sizes: ["P", "M", "G", "GG"],
    category: "brasileirao",
  },
  {
    id: "palmeiras-2024",
    name: "Palmeiras Home 2024 - Oficial",
    price: 229.90,
    image: jerseyPalmeiras,
    sizes: ["P", "M", "G", "GG"],
    category: "brasileirao",
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "home") return products;
  return products.filter(product => product.category === category);
};

export const getCategoryTitle = (category: string): string => {
  const titles: Record<string, string> = {
    home: "Destaques",
    ligas: "Ligas Internacionais",
    selecoes: "Seleções",
    retro: "Camisas Retrô",
    brasileirao: "Brasileirão",
  };
  return titles[category] || "Produtos";
};