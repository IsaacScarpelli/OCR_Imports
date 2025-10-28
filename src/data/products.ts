import productsData from "./products.json";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  sizes: string[];
  category: string;
};

// Aqui transformamos os dados do JSON em Product[]
export const products: Product[] = productsData as Product[];

// Função para filtrar produtos por categoria
export const getProductsByCategory = (category: string): Product[] => {
  if (category === "home") return products.slice(0, 6); // Limita destaques a 6 itens
  return products.filter(product => product.category === category);
};

// Função para buscar produto pelo ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Função para retornar o título de cada categoria
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
