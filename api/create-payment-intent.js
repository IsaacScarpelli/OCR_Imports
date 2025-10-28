import Stripe from 'stripe';

// Inicializar Stripe com a chave secreta
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY não configurada');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Catálogo de produtos para validação segura (DEVE VIR DO BANCO DE DADOS EM PRODUÇÃO)
const PRODUCT_CATALOG = {
  "flamengo-2024": { price: 229.90, name: "Flamengo Home 2024 - Oficial" },
  "palmeiras-2024": { price: 229.90, name: "Palmeiras Home 2024 - Oficial" },
  "corinthians-2024": { price: 229.90, name: "Corinthians Home 2024 - Oficial" },
  "sao-paulo-2024": { price: 229.90, name: "São Paulo FC Home 2024 - Oficial" },
  "gremio-2024": { price: 219.90, name: "Grêmio Home 2024 - Oficial" },
  "internacional-2024": { price: 219.90, name: "Internacional Home 2024 - Oficial" },
  "real-madrid-2024": { price: 299.90, name: "Real Madrid Home 2024/25" },
  "barcelona-2024": { price: 289.90, name: "FC Barcelona Home 2024/25" },
  "bayern-2024": { price: 289.90, name: "Bayern de Munique Home 2024/25" },
  "psg-2024": { price: 299.90, name: "Paris Saint-Germain Home 2024/25" },
  "man-city-2024": { price: 299.90, name: "Manchester City Home 2024/25" },
  "liverpool-2024": { price: 289.90, name: "Liverpool Home 2024/25" },
  "chelsea-2024": { price: 289.90, name: "Chelsea Home 2024/25" },
  "juventus-2024": { price: 289.90, name: "Juventus Home 2024/25" },
  "milan-2024": { price: 289.90, name: "AC Milan Home 2024/25" },
  "brasil-2024": { price: 249.90, name: "Brasil Home 2024" },
  "argentina-2024": { price: 249.90, name: "Argentina Home 2024" },
  "franca-2024": { price: 259.90, name: "França Home 2024" },
  "alemanha-2024": { price: 259.90, name: "Alemanha Home 2024" },
  "portugal-2024": { price: 259.90, name: "Portugal Home 2024" },
  "inglaterra-2024": { price: 259.90, name: "Inglaterra Home 2024" },
  "italia-2024": { price: 259.90, name: "Itália Home 2024" },
  "espanha-2024": { price: 259.90, name: "Espanha Home 2024" },
  "holanda-2024": { price: 259.90, name: "Holanda Home 2024" },
  "croacia-2024": { price: 259.90, name: "Croácia Home 2024" },
  "brasil-retro-70": { price: 179.90, name: "Brasil Retrô Copa do Mundo 1970" },
  "brasil-retro-94": { price: 179.90, name: "Brasil Retrô Copa do Mundo 1994" },
  "flamengo-retro-80": { price: 159.90, name: "Flamengo Retrô Anos 80" },
  "corinthians-retro-90": { price: 159.90, name: "Corinthians Retrô Anos 90" }
};

export default async function handler(req, res) {
  // Apenas aceitar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { items } = req.body;

    // Validar entrada
    if (!items || !Array.isArray(items) || items.length
