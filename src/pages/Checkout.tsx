import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Lock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

// Lazy load Stripe components para evitar erros se a chave não estiver configurada
const StripeCheckoutForm = lazy(() => import('@/components/StripeCheckoutForm'));


const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useCart();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state.items.length === 0) {
      navigate('/carrinho');
      return;
    }

    // Create payment intent
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: state.total,
            items: state.items,
          }),
        });

        if (!response.ok) {
          throw new Error('Erro ao criar pagamento');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Erro ao criar payment intent:', error);
        toast.error('Erro ao carregar pagamento. Tente novamente.');
        navigate('/carrinho');
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [state.items, state.total, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-page">
        <Header onCategoryClick={() => navigate('/')} currentCategory="checkout" />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gradient-page">
        <Header onCategoryClick={() => navigate('/')} currentCategory="checkout" />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Erro no Checkout</h2>
            <p className="text-muted-foreground mb-8">
              Não foi possível processar seu pagamento. Tente novamente.
            </p>
            <Button onClick={() => navigate('/carrinho')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Carrinho
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-page">
      <Header onCategoryClick={() => navigate('/')} currentCategory="checkout" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/carrinho')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold">Finalizar Compra</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Tamanho: {item.selectedSize} | Qtd: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>R$ {state.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Informações de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                {import.meta.env.VITE_STRIPE_PUBLIC_KEY ? (
                  <Suspense fallback={<div className="flex justify-center p-4">Carregando pagamento...</div>}>
                    <StripeCheckoutForm clientSecret={clientSecret} />
                  </Suspense>
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    Sistema de pagamento não configurado
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;