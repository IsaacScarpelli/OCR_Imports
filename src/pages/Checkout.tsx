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

    // Check if Stripe is configured before trying to create payment intent
    if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
      setLoading(false);
      setClientSecret(''); // This will trigger the fallback UI
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
          const errorData = await response.json();
          // Se for 503 (Stripe não configurado), mostra fallback em vez de redirecionar
          if (response.status === 503) {
            setClientSecret(''); // Triggers fallback UI
            setLoading(false);
            return;
          }
          throw new Error(errorData.error || 'Erro ao criar pagamento');
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
          <div className="text-center py-16 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Pagamento Online Temporariamente Indisponível</h2>
            <p className="text-muted-foreground mb-8">
              No momento, o pagamento online não está disponível. Você pode finalizar sua compra via WhatsApp com nossa equipe.
            </p>
            
            <div className="space-y-4">
              <Button 
                onClick={() => {
                  const message = `Olá! Gostaria de finalizar minha compra:\n\n${state.items.map(item => `• ${item.name} (Tamanho: ${item.selectedSize}, Qtd: ${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n')}\n\nTotal: R$ ${state.total.toFixed(2)}`;
                  const whatsappUrl = `https://wa.me/5531997234480?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Finalizar via WhatsApp
              </Button>
              
              <Button variant="outline" onClick={() => navigate('/carrinho')} className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Carrinho
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-6">
              Pagamento via PIX, cartão ou boleto disponível pelo WhatsApp
            </p>
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