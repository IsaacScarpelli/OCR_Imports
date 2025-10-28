import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import das imagens geradas
import jerseyBrazil from "@/assets/jersey-brazil.jpg";
import jerseyRealMadrid from "@/assets/jersey-real-madrid.jpg";
import jerseyArgentina from "@/assets/jersey-argentina.jpg";
import jerseyFrance from "@/assets/jersey-france.jpg";

const heroSlides = [
  {
    id: 1,
    productId: "brasil-2024",
    image: jerseyBrazil,
    title: "Nova Camisa da Seleção Brasileira",
    subtitle: "Seja Hexa com estilo! Camisa oficial para Copa do Mundo 2026",
    price: "R$ 249,90",
  },
  {
    id: 2,
    productId: "real-madrid-2024",
    image: jerseyRealMadrid,
    title: "Real Madrid Home 2024/25",
    subtitle: "O manto sagrado do clube mais vitorioso da Europa",
    price: "R$ 299,90",
  },
  {
    id: 3,
    productId: "argentina-2024",
    image: jerseyArgentina,
    title: "Argentina Home 2024 - Campeã do Mundo",
    subtitle: "A camisa dos atuais campeões mundiais e bicampeões da América",
    price: "R$ 249,90",
  },
  {
    id: 4,
    productId: "franca-2024",
    image: jerseyFrance,
    title: "França Home 2024",
    subtitle: "Les Bleus - A elegância francesa em campo",
    price: "R$ 259,90",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleViewDetails = () => {
    const currentSlideData = heroSlides[currentSlide];
    navigate(`/produto/${currentSlideData.productId}`);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-hover">
      {/* Slides */}
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gradient-hero">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover opacity-20"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-white animate-fade-in">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-6 text-white/90">
                    {slide.subtitle}
                  </p>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl font-bold text-yellow-300">
                      {slide.price}
                    </span>
                    <Badge className="text-sm bg-yellow-400 text-black">
                      Frete Grátis
                    </Badge>
                  </div>
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="text-lg px-8"
                    onClick={handleViewDetails}
                    data-testid="button-hero-details"
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white border-0"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white border-0"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;