import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

// Load Stripe promise
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

interface CheckoutFormProps {
  clientSecret: string;
}

const CheckoutForm = ({ clientSecret }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { state, dispatch } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Confirmar pagamento e aguardar resposta
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        toast.error(`Erro no pagamento: ${error.message}`);
      } else if (paymentIntent) {
        // Verificar status do pagamento
        if (paymentIntent.status === 'succeeded') {
          toast.success('Pagamento realizado com sucesso!');
          dispatch({ type: 'CLEAR_CART' });
          navigate(`/pagamento-sucesso?payment_intent=${paymentIntent.id}`);
        } else {
          toast.error('Pagamento não foi concluído. Tente novamente.');
        }
      }
    } catch (err) {
      toast.error('Erro inesperado durante o pagamento');
      console.error('Erro no pagamento:', err);
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-muted/20 p-4 rounded-lg border">
        <PaymentElement />
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!stripe || isProcessing}
      >
        <Lock className="h-4 w-4 mr-2" />
        {isProcessing ? 'Processando...' : `Pagar R$ ${state.total.toFixed(2)}`}
      </Button>
    </form>
  );
};

const StripeCheckoutForm = ({ clientSecret }: CheckoutFormProps) => {
  if (!clientSecret) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        Carregando informações de pagamento...
      </div>
    );
  }

  return (
    <Elements 
      stripe={stripePromise} 
      options={{ 
        clientSecret,
        appearance: {
          theme: 'stripe',
        },
      }}
    >
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
};

export default StripeCheckoutForm;