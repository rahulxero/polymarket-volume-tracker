export default async function handler(req, res) {
  // CORS Configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  // Market templates for diverse questions
  const marketTemplates = [
    'Will {crypto} reach ${price} in {year}?',
    'Likelihood of {event} happening in {year}',
    '{tech} market dominance by {year}',
    'Probability of {geopolitical} event',
    '{industry} disruption by {technology}'
  ];

  // Data generation helpers
  function generateMarketQuestion() {
    const templates = [
      { 
        crypto: ['Bitcoin', 'Ethereum', 'Solana'], 
        price: [50000, 75000, 100000], 
        year: [2024, 2025, 2026] 
      },
      { 
        event: ['AI breakthrough', 'Space tourism', 'Quantum computing'], 
        year: [2024, 2025, 2026] 
      },
      { 
        tech: ['Blockchain', 'AI', 'Renewable Energy'], 
        year: [2024, 2025, 2026] 
      },
      { 
        geopolitical: ['Global peace treaty', 'Major trade agreement', 'International climate accord'] 
      },
      { 
        industry: ['Finance', 'Healthcare', 'Education'], 
        technology: ['AI', 'Blockchain', 'Quantum Computing'] 
      }
    ];

    const template = marketTemplates[Math.floor(Math.random() * marketTemplates.length)];
    const data = templates[Math.floor(Math.random() * templates.length)];

    return template.replace(/{(\w+)}/g, (match, key) => 
      data[key][Math.floor(Math.random() * data[key].length)]
    );
  }

  // Mock data generation
  const mockData = Array.from({ length: 10 }, (_, i) => ({
    fullAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
    account: `0x${Math.random().toString(16).substr(2, 40)}`,
    profit: Math.floor(Math.random() * 100000) + 10000,
    volume: Math.floor(Math.random() * 500000) + 100000,
    markets_traded: Math.floor(Math.random() * 50) + 5,
    win_rate: (Math.random() * 30 + 55).toFixed(1),
    recentBets: [
      {
        market: generateMarketQuestion(),
        amount: Math.floor(Math.random() * 5000) + 1000,
        outcome: Math.random() > 0.5 ? 'Yes' : 'No',
        timestamp: Date.now() - Math.random() * 86400000 * 3,
      },
      {
        market: generateMarketQuestion(),
        amount: Math.floor(Math.random() * 3000) + 1000,
        outcome: Math.random() > 0.5 ? 'Yes' : 'No',
        timestamp: Date.now() - Math.random() * 86400000 * 5,
      },
      {
        market: generateMarketQuestion(),
        amount: Math.floor(Math.random() * 4000) + 1500,
        outcome: Math.
