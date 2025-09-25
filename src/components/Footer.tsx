import { ShoppingBag, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <ShoppingBag className="h-8 w-8 mr-2" />
              <span className="font-bold text-2xl">FutebolShop</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              A maior loja online de camisas de futebol do Brasil. 
              Produtos oficiais, qualidade garantida e entrega rápida 
              para todo o país.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Ligas Internacionais
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Seleções
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Camisas Retrô
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Brasileirão
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary-foreground/80" />
                <span className="text-primary-foreground/80">
                  (11) 99999-9999
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary-foreground/80" />
                <span className="text-primary-foreground/80">
                  contato@futebolshop.com.br
                </span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-primary-foreground/80" />
                <span className="text-primary-foreground/80">
                  São Paulo, SP<br />
                  Brasil
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-primary-foreground/20 my-8"></div>

        {/* Copyright */}
        <div className="text-center text-primary-foreground/80">
          <p>
            © 2024 FutebolShop. Todos os direitos reservados. | 
            Desenvolvido com ❤️ para os amantes do futebol.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;