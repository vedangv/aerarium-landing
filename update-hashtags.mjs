import fs from 'fs/promises';

const mdPath = './social-media-kit/CAPTIONS.md';
let markdown = await fs.readFile(mdPath, 'utf-8');

// Replace the old Portfolio hashtags
markdown = markdown.replace(
  /#Aerarium #Investing #Fintech #PersonalFinance #PortfolioManagement/g,
  '#Aerarium #WealthManagement #AssetAllocation #InvestmentStrategy #Fintech #PortfolioConstruction #FinancialPlanning'
);

// Replace the old Research hashtags
markdown = markdown.replace(
  /#AerariumResearch #MarketData #Investing #StockMarket #Finance/g,
  '#AerariumResearch #MarketAnalysis #MacroEconomics #EquityResearch #FinancialData #InvestmentAnalysis #MarketInsights'
);

await fs.writeFile(mdPath, markdown);
console.log('Hashtags updated successfully!');
