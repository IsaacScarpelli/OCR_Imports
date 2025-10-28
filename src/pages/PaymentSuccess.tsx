import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-page">
      <Header onCategoryClick={() => navigate('/')} currentCategory="sucesso" />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl text-green-600">
                Pagamento Aprovado!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-lg">
                  Obrigado pela sua compra na FutebolShop!
                </p>
                <p className="text-muted-foreground">
                  Seu pedido foi processado com sucesso e você receberá um email de confirmação em breve.
                </p>
              </div>

              <div className="bg-muted/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Próximos Passos:</h3>
                <ul className="text-sm text-muted-foreground space-y-1 text-left">
                  <li>• Você receberá um email de confirmação com os detalhes do pedido</li>
                  <li>• Suas camisas serão preparadas e enviadas em até 2 dias úteis</li>
                  <li>• O código de rastreamento será enviado por email</li>
                  <li>• Prazo de entrega: 5-7 dias úteis</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => navigate('/')}
                  className="flex-1"
                  size="lg"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Voltar ao Início
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Continuar Comprando
                </Button>
              </div>

              <div className="text-sm text-muted-foreground pt-4 border-t">
                <p>
                  Dúvidas? Entre em contato conosco pelo email:{" "}
                  <span className="font-medium">contato@futebolshop.com</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;