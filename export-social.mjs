import fs from 'fs/promises';
import path from 'path';

// Extract data from App.tsx
const appTsx = await fs.readFile('./src/App.tsx', 'utf-8');
const featuresMatch = appTsx.match(/const FEATURES = \[([\s\S]*?)\];/);
let features = [];
if (featuresMatch) {
  // A bit of a hack to parse the JS array of objects
  const featuresStr = featuresMatch[0].replace('const FEATURES = ', '').replace(/;$/, '');
  // Using eval is safe here as it's our own code
  features = eval(featuresStr);
}

// Extract data from FeatureGrid.tsx
const featureGridTsx = await fs.readFile('./src/components/FeatureGrid.tsx', 'utf-8');
const researchMatch = featureGridTsx.match(/const RESEARCH_SHOWCASES = \[([\s\S]*?)\];/);
let research = [];
if (researchMatch) {
  let researchStr = researchMatch[0].replace('const RESEARCH_SHOWCASES = ', '').replace(/;$/, '');
  // Fix imports
  researchStr = researchStr.replace(/image: (\w+)/g, 'image: "$1"');
  research = eval(researchStr);
}

const outDir = './social-media-kit';
await fs.mkdir(outDir, { recursive: true });

// We map features to ss0-ss6.png in src/assets
const portfolioImages = [
  'src/assets/ss0.png',
  'src/assets/ss1.png',
  'src/assets/ss2.png',
  'src/assets/ss3.png',
  'src/assets/ss4.png',
  'src/assets/ss5.png',
  'src/assets/ss6.png',
];

const researchImageMap = {
  researchFundsHeatmapSrc: 'assets/screenshots/aerarium-research-funds-overlap-heatmap.png',
  researchMacroDashboardSrc: 'assets/screenshots/aerarium-research-macro-dashboard.png',
  researchFedCurveSrc: 'assets/screenshots/aerarium-research-macro-fed-yield-curve.png',
  researchAaplSegmentsSrc: 'assets/screenshots/aerarium-research-aapl-segments.png',
  researchAaplMetricsSrc: 'assets/screenshots/aerarium-research-aapl-financial-charts.png',
  researchNvdaOwnershipSrc: 'assets/screenshots/aerarium-research-nvda-ownership-insiders.png',
  researchHomeSrc: 'assets/screenshots/aerarium-research-home-market-browser.png'
};

let markdown = `# Aerarium Social Media Kit\n\n`;

markdown += `## 📱 Aerarium Portfolio (iOS App)\n\n`;
for (let i = 0; i < features.length; i++) {
  const feat = features[i];
  const imgPath = portfolioImages[i];
  const destImg = `portfolio_${i + 1}_${feat.id}.png`;
  await fs.copyFile(imgPath, path.join(outDir, destImg));
  
  markdown += `### ${i + 1}. ${feat.title}\n`;
  markdown += `**Image:** \`${destImg}\`\n\n`;
  markdown += `**Caption Idea:**\n`;
  markdown += `${feat.title} ✨\n\n`;
  markdown += `${feat.description}\n\n`;
  markdown += `Link in bio to join the iOS Beta! 🚀\n\n`;
  markdown += `#Aerarium #Investing #Fintech #PersonalFinance #PortfolioManagement\n\n---\n\n`;
}

markdown += `## 🔍 Aerarium Research (Web Workspace)\n\n`;
for (let i = 0; i < research.length; i++) {
  const feat = research[i];
  const imgPath = researchImageMap[feat.image];
  const destImg = `research_${i + 1}_${feat.id}.png`;
  await fs.copyFile(imgPath, path.join(outDir, destImg));
  
  markdown += `### ${i + 1}. ${feat.title}\n`;
  markdown += `**Image:** \`${destImg}\`\n\n`;
  markdown += `**Caption Idea:**\n`;
  markdown += `${feat.title} 📊\n\n`;
  markdown += `${feat.description}\n\n`;
  markdown += `Check it out at research.aerarium.app 🔗\n\n`;
  markdown += `#AerariumResearch #MarketData #Investing #StockMarket #Finance\n\n---\n\n`;
}

await fs.writeFile(path.join(outDir, 'CAPTIONS.md'), markdown);
console.log('Social media kit generated in ./social-media-kit directory!');
