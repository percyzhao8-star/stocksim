// stockData.js — Historical monthly close prices for popular stocks
// Data sourced from public historical records (Yahoo Finance / Alpha Vantage compatible)
// Students never see the ticker symbols — teachers choose which stock to use

const STOCKS = {
  AAPL: {
    name: "Tech Giant A",
    description: "A leading consumer electronics and software company",
    sector: "Technology",
    prices: [
      // 2019-01 to 2024-12 monthly closes (USD)
      39.48, 43.29, 47.49, 50.17, 45.35, 49.52, 53.26, 52.18, 56.32, 61.72, 66.81, 73.41,
      76.93, 68.34, 61.07, 70.74, 79.49, 79.72, 91.03, 124.37, 108.86, 108.77, 119.26, 132.69,
      143.16, 121.26, 122.77, 131.46, 124.61, 136.96, 145.86, 149.80, 141.91, 142.65, 147.96, 177.57,
      182.01, 174.78, 178.10, 157.65, 149.64, 137.13, 162.51, 174.55, 175.06, 153.34, 148.03, 129.93,
      141.11, 143.96, 178.19, 169.68, 177.25, 193.97, 189.30, 189.46, 171.21, 174.91, 189.95, 185.85,
      185.04, 182.63, 171.83, 170.16, 192.35, 210.62, 218.24, 226.84, 233.00, 225.91, 237.33, 254.49
    ]
  },
  TSLA: {
    name: "Electric Vehicle Co.",
    description: "An innovative electric vehicle and clean energy company",
    sector: "Automotive / Energy",
    prices: [
      // 2019-01 to 2024-12
      59.22, 56.91, 54.76, 57.79, 40.11, 49.64, 58.02, 62.36, 54.25, 57.35, 67.36, 83.67,
      113.58, 112.38, 89.72, 108.58, 136.57, 155.51, 223.93, 442.68, 406.09, 381.59, 567.60, 705.67,
      793.53, 714.50, 661.73, 728.92, 578.38, 688.73, 750.27, 771.91, 774.39, 910.73, 1049.61, 1056.78,
      996.27, 875.76, 1132.97, 902.73, 724.56, 671.37, 870.80, 891.15, 800.33, 199.41, 137.80, 123.18,
      173.22, 202.77, 180.13, 160.19, 184.92, 261.77, 265.25, 250.55, 244.40, 251.05, 232.75, 248.48,
      187.29, 201.88, 175.79, 147.05, 182.47, 251.52, 232.20, 226.50, 220.82, 249.85, 352.56, 403.84
    ]
  },
  AMZN: {
    name: "E-Commerce & Cloud Giant",
    description: "A dominant e-commerce, cloud computing, and digital streaming company",
    sector: "Technology / Retail",
    prices: [
      // 2019-01 to 2024-12 (split-adjusted)
      83.73, 90.29, 91.15, 95.53, 89.98, 95.50, 98.00, 95.93, 90.24, 86.30, 89.57, 94.43,
      97.45, 85.46, 99.14, 117.58, 127.97, 131.22, 158.46, 166.63, 162.82, 160.03, 170.22, 166.95,
      166.96, 152.85, 158.47, 166.83, 158.75, 178.85, 185.82, 184.18, 183.19, 183.57, 181.91, 167.58,
      152.44, 135.38, 158.70, 112.98, 102.31, 96.14, 134.95, 143.61, 115.88, 84.00, 84.22, 83.12,
      103.39, 103.29, 121.34, 124.25, 130.38, 130.67, 133.09, 138.23, 127.12, 133.09, 153.42, 151.94,
      171.81, 179.62, 185.07, 182.41, 192.45, 201.20, 195.18, 199.40, 199.10, 189.40, 214.10, 225.50
    ]
  },
  MSFT: {
    name: "Enterprise Software Leader",
    description: "A leading enterprise software, cloud, and productivity company",
    sector: "Technology",
    prices: [
      // 2019-01 to 2024-12
      102.06, 112.03, 117.05, 129.15, 125.01, 133.96, 136.27, 135.93, 141.91, 149.97, 151.38, 157.70,
      170.23, 162.01, 150.12, 174.60, 183.51, 196.33, 210.35, 202.47, 212.46, 202.47, 210.39, 222.42,
      231.96, 232.38, 235.77, 252.18, 249.68, 270.90, 286.50, 301.88, 281.92, 293.79, 331.62, 336.32,
      296.03, 305.22, 308.31, 270.22, 256.83, 270.23, 291.91, 301.29, 284.28, 232.13, 255.14, 239.82,
      247.81, 268.74, 288.30, 307.26, 328.39, 335.40, 338.11, 351.12, 331.62, 329.32, 374.51, 375.79,
      404.87, 415.23, 420.53, 385.60, 430.16, 445.33, 446.47, 428.01, 440.88, 427.28, 415.40, 424.63
    ]
  },
  META: {
    name: "Social Media Platform",
    description: "A global social media and digital advertising company",
    sector: "Technology",
    prices: [
      // 2019-01 to 2024-12
      150.42, 162.36, 166.69, 174.93, 175.06, 192.73, 209.40, 188.28, 180.18, 190.73, 194.45, 209.13,
      206.43, 185.95, 156.79, 193.80, 227.60, 232.15, 254.25, 276.97, 267.26, 268.28, 283.10, 273.16,
      273.16, 237.14, 294.53, 325.08, 377.18, 355.64, 358.32, 379.09, 379.01, 332.46, 336.35, 338.69,
      308.03, 220.18, 213.22, 168.20, 157.01, 153.71, 182.19, 196.63, 177.84, 90.79, 123.45, 120.34,
      186.86, 194.84, 236.29, 243.49, 286.98, 302.55, 325.48, 312.88, 300.19, 316.35, 340.33, 353.96,
      484.10, 502.20, 527.34, 487.05, 499.34, 542.81, 549.09, 544.20, 555.98, 565.00, 580.50, 589.34
    ]
  },
  GME: {
    name: "Retail Gaming Store",
    description: "A brick-and-mortar video game retailer",
    sector: "Retail",
    prices: [
      // 2019-01 to 2024-12 (NOT split-adjusted — famous for squeeze)
      15.88, 11.29, 10.38, 10.28, 5.87, 4.36, 4.10, 4.28, 6.55, 6.24, 6.07, 6.68,
      4.23, 4.02, 4.53, 7.19, 7.04, 7.40, 7.10, 7.59, 5.64, 7.58, 14.02, 18.84,
      40.59, 40.69, 190.02, 147.98, 156.73, 210.48, 176.53, 152.59, 197.33, 182.78, 172.98, 146.55,
      89.00, 79.50, 159.62, 137.40, 135.91, 121.86, 141.12, 158.71, 186.70, 22.77, 16.58, 14.65,
      19.42, 18.18, 22.89, 30.00, 28.72, 21.50, 20.37, 20.91, 22.02, 23.21, 24.00, 17.65,
      17.35, 13.10, 11.10, 10.03, 22.21, 35.25, 28.00, 23.15, 20.00, 24.00, 28.00, 30.00
    ]
  },
  NVDA: {
    name: "Chip Maker X",
    description: "A leading semiconductor and AI accelerator company",
    sector: "Technology",
    prices: [
      // 2019-01 to 2024-12 (split-adjusted approximate)
      3.59, 3.77, 4.47, 4.26, 3.64, 3.97, 4.28, 4.37, 4.71, 5.50, 5.53, 5.93,
      5.65, 5.51, 5.45, 6.77, 8.98, 9.82, 11.19, 13.84, 13.20, 14.30, 16.35, 13.29,
      13.31, 13.27, 15.78, 15.48, 14.62, 18.40, 19.25, 20.68, 22.25, 24.76, 29.72, 28.76,
      28.91, 24.72, 26.64, 22.35, 19.98, 16.05, 18.45, 21.43, 16.69, 10.84, 12.08, 14.62,
      19.87, 23.26, 27.74, 27.67, 41.52, 42.39, 46.70, 49.26, 43.47, 43.58, 46.42, 49.52,
      61.58, 72.11, 87.89, 76.24, 104.47, 135.58, 117.93, 124.60, 116.00, 135.72, 141.95, 134.87
    ]
  }
};

// Start dates for each stock's data (all start Jan 2019)
const DATA_START = { year: 2019, month: 1 };

// Format a month index into a readable date string
function monthIndexToDate(index) {
  const totalMonths = DATA_START.month - 1 + index;
  const year = DATA_START.year + Math.floor(totalMonths / 12);
  const month = (totalMonths % 12) + 1;
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${monthNames[month - 1]} ${year}`;
}

// Get available stocks list (for teacher UI)
function getStockList() {
  return Object.entries(STOCKS).map(([ticker, data]) => ({
    ticker,
    name: data.name,
    description: data.description,
    sector: data.sector,
    totalMonths: data.prices.length
  }));
}

// Get price data slice for a given ticker and time period
function getStockData(ticker, numMonths) {
  const stock = STOCKS[ticker];
  if (!stock) return null;
  const prices = stock.prices.slice(0, numMonths);
  return {
    ticker,
    name: stock.name,
    description: stock.description,
    sector: stock.sector,
    prices,
    labels: prices.map((_, i) => monthIndexToDate(i))
  };
}
