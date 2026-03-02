// ============================================================
// stockData.js — Stock price histories for StockSim
// Prices are real approximate monthly closing prices (2018–2023)
// ============================================================

const STOCKS = {
  AAPL: {
    name: "Apple Inc.",
    sector: "Technology",
    description: "Consumer electronics, software and services giant. Maker of iPhone, Mac, iPad and Apple Watch.",
    // Jan 2018 – Dec 2022 monthly closes (approx)
    prices: [
      177,167,168,165,186,185,190,207,218,219,222,157,
      167,174,179,200,178,198,204,209,218,243,261,293,
      298,288,273,289,317,364,364,462,467,425,408,432,
      131,136,120,132,125,137,146,149,156,150,148,178,
      182,190,175,165,157,137,147,162,150,143,148,130
    ]
  },
  TSLA: {
    name: "Tesla, Inc.",
    sector: "Automotive / Energy",
    description: "Electric vehicles and clean energy company. Produces Model S, 3, X, Y and energy storage products.",
    prices: [
      59,57,60,59,68,66,68,75,72,68,65,62,
      62,64,66,59,60,57,63,65,68,69,66,84,
      86,80,74,86,95,104,113,175,149,124,116,235,
      243,241,167,152,179,208,213,216,242,251,254,352,
      299,312,290,309,299,236,225,275,265,223,228,123
    ]
  },
  AMZN: {
    name: "Amazon.com, Inc.",
    sector: "E-Commerce / Cloud",
    description: "World's largest online retailer and cloud computing provider (AWS). Also operates streaming, logistics and advertising.",
    prices: [
      1390,1512,1447,1566,1597,1757,1876,1895,2003,1788,1572,1502,
      1626,1671,1789,1950,1821,1907,1964,1776,1736,1739,1800,1848,
      2284,2585,2495,2376,2436,2758,3104,3167,3475,3476,3144,3257,
      3259,3152,3141,3467,3448,3447,3482,3573,3632,3506,3400,3334,
      2954,2928,2447,2569,2352,2267,2187,2446,2748,2842,2912,2733
    ]
  },
  MSFT: {
    name: "Microsoft Corporation",
    sector: "Technology",
    description: "Software, cloud computing and hardware leader. Products include Windows, Office 365, Azure and Xbox.",
    prices: [
      88,93,89,90,96,98,102,106,110,106,104,102,
      105,112,117,130,125,132,136,138,141,147,150,157,
      170,168,163,177,184,196,213,225,234,220,215,222,
      232,244,235,262,246,271,303,301,305,301,331,336,
      295,289,308,280,290,265,261,280,242,228,241,239
    ]
  },
  NFLX: {
    name: "Netflix, Inc.",
    sector: "Entertainment",
    description: "Subscription streaming service with 260M+ subscribers globally. Produces award-winning original content.",
    prices: [
      225,268,327,333,354,392,357,367,381,381,281,271,
      352,368,362,370,349,374,338,490,578,570,542,323,
      449,391,378,348,350,501,521,529,613,630,690,508,
      508,457,376,508,517,570,610,620,637,694,647,597,
      566,450,376,345,190,175,201,224,235,292,305,294
    ]
  },
  DIS: {
    name: "The Walt Disney Company",
    sector: "Entertainment / Media",
    description: "Global entertainment company. Operates Disney+, ESPN, theme parks, movies and merchandise worldwide.",
    prices: [
      108,106,101,107,103,110,107,110,116,116,113,107,
      112,111,111,130,128,138,141,133,128,134,148,148,
      142,131,116,126,112,130,115,145,165,170,178,175,
      178,195,194,186,175,170,176,173,170,172,172,168,
      148,142,130,116,110,100,97,120,115,104,97,86
    ]
  },
  GOOGL: {
    name: "Alphabet Inc. (Google)",
    sector: "Technology / Advertising",
    description: "Parent company of Google, YouTube and Waymo. Dominates search, online advertising and cloud infrastructure.",
    prices: [
      1102,1078,1025,1017,1093,1103,1216,1218,1176,1033,1037,1044,
      1115,1078,1170,1227,1168,1115,1243,1241,1215,1264,1302,1339,
      1436,1486,1397,1349,1418,1433,1510,1496,1639,1722,1750,1752,
      1827,2081,2069,2290,2431,2550,2730,2823,2707,2789,2977,2897,
      2875,2786,2774,2801,2762,2244,2157,2303,2391,2395,2385,2088
    ]
  },
  JPM: {
    name: "JPMorgan Chase & Co.",
    sector: "Finance / Banking",
    description: "Largest US bank by assets. Provides investment banking, commercial banking, financial services and asset management.",
    prices: [
      109,114,109,110,107,105,97,114,115,101,103,97,
      103,104,101,115,107,111,118,119,117,122,130,139,
      140,127,94,87,96,99,102,103,127,119,124,128,
      136,157,155,162,165,164,165,168,170,167,164,162,
      159,167,158,137,125,115,110,115,120,107,108,133
    ]
  }
};

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const START_YEAR = 2018;

/**
 * Returns list of available stocks (for the picker grid)
 */
function getStockList() {
  return Object.entries(STOCKS).map(([ticker, s]) => ({
    ticker,
    name: s.name,
    sector: s.sector,
    description: s.description
  }));
}

/**
 * Returns price data for a given ticker and number of months.
 * Always starts from Jan 2018 and slices to numMonths.
 */
function getStockData(ticker, numMonths) {
  const s = STOCKS[ticker];
  if (!s) throw new Error(`Unknown ticker: ${ticker}`);

  const maxMonths = s.prices.length;
  const count = Math.min(numMonths, maxMonths);
  const prices = s.prices.slice(0, count);

  const labels = [];
  for (let i = 0; i < count; i++) {
    const year = START_YEAR + Math.floor(i / 12);
    const month = MONTH_NAMES[i % 12];
    labels.push(`${month} ${year}`);
  }

  return {
    ticker,
    name: s.name,
    sector: s.sector,
    description: s.description,
    prices,
    labels
  };
}
