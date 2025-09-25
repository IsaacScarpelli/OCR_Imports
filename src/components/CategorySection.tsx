import ProductCard, { Product } from "@/components/ProductCard";

interface CategorySectionProps {
  title: string;
  products: Product[];
}

const CategorySection = ({ title, products }: CategorySectionProps) => {
  if (products.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            {title}
          </h2>
          <div className="text-center text-muted-foreground">
            <p className="text-lg">Em breve novos produtos nesta categoria!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;