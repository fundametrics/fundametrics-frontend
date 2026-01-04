import type { CompanyResponse, MarketFacts } from '../types';

type MockCompanyBundle = {
  company: CompanyResponse;
  market: MarketFacts;
};

const createCompany = (overrides: Partial<CompanyResponse> = {}): CompanyResponse => ({
  symbol: overrides.symbol ?? 'RELIANCE',
  company: overrides.company ?? {
    name: 'Reliance Industries Limited',
    sector: 'Oil & Gas',
    industry: 'Diversified Energy Conglomerate',
  },
  financials: overrides.financials ?? {
    latest: {
      revenue: 739000,
      profit: 92456,
      margins: {
        operating: 18.4,
        net: 12.5,
      },
    },
    ratios: [
      {
        name: 'Return on Equity (ROE)',
        value: 14.2,
        category: 'Profitability',
        note: 'Net profit / average shareholders equity for FY24.',
      },
      {
        name: 'Return on Capital Employed (ROCE)',
        value: 11.6,
        category: 'Profitability',
        note: 'Earnings before interest and tax divided by capital employed.',
      },
      {
        name: 'Operating Margin',
        value: 18.4,
        category: 'Margins',
        note: 'Operating profit divided by revenue.',
      },
      {
        name: 'Net Margin',
        value: 12.5,
        category: 'Margins',
        note: 'Net profit divided by revenue.',
      },
    ],
  },
  signals: overrides.signals ?? [
    {
      label: 'Promoter holding stable',
      severity: 'info',
      description:
        'Promoter ownership has remained within +/- 0.2% over the last four disclosed quarters, indicating stability.',
    },
    {
      label: 'Debt service coverage healthy',
      severity: 'low',
      description:
        'Interest coverage ratio remains above 3.5x for the latest annual filing. Observation only, not a recommendation.',
    },
  ],
  shareholding: overrides.shareholding ?? {
    status: 'available',
    summary: {
      promoter: 49.11,
      fii: 18.26,
      dii: 13.42,
      public: 19.21,
    },
    insights: [
      {
        title: 'Institutional inflows observed',
        description: 'FII stake increased by ~20 bps QoQ in the latest shareholding pattern disclosure.',
      },
      {
        title: 'Stable promoter shareholding',
        description: 'Promoters maintained stake above 49% for the last four quarters with negligible change.',
      },
    ],
  },
  metadata: {
    scraped_at: overrides.metadata?.scraped_at ?? '2025-10-15T09:30:00Z',
    data_sources: overrides.metadata?.data_sources ?? {
      screener: 'https://www.screener.in/company/RELIANCE/consolidated/',
      moneycontrol: 'https://www.moneycontrol.com/india/stockpricequote/refineries/relianceindustries/RI',
      bse_filings: 'https://www.bseindia.com/corporates/ann.aspx?scrip=500325',
    },
    run_id: overrides.metadata?.run_id ?? 'mock-run-rel-001',
    as_of_date: overrides.metadata?.as_of_date ?? 'FY24',
    computation_engine: overrides.metadata?.computation_engine ?? 'Fundametrics Quant Engine v1.8.2-mock',
    financial_period_label: overrides.metadata?.financial_period_label ?? 'FY24 (Consolidated)',
    financial_frequency: overrides.metadata?.financial_frequency ?? 'Annual consolidated statements',
    quarterly_period_label: overrides.metadata?.quarterly_period_label ?? 'Q2 FY25',
    yearly_period_label: overrides.metadata?.yearly_period_label ?? 'FY24',
    ratios_period_label: overrides.metadata?.ratios_period_label ?? 'FY24 audited financials',
    trends_period_label: overrides.metadata?.trends_period_label ?? 'FY23-FY24 filings',
    data_quality_notes: overrides.metadata?.data_quality_notes ?? [
      'Mock dataset: replace with live API output once available.',
      'Market data values are illustrative and do not reflect live quotes.',
    ],
    ai_summary_generated: overrides.metadata?.ai_summary_generated ?? true,
    warnings: overrides.metadata?.warnings ?? [
      {
        code: 'mock_data',
        level: 'info',
        message: 'This company is rendered using Fundametrics mock data for demonstration.',
      },
    ],
    disclaimer:
      overrides.metadata?.disclaimer ??
      'Mock coverage is informational only and does not translate to investment suitability.',
  },
  ai_summary:
    overrides.ai_summary ?? {
      paragraphs: [
        'Revenue expanded through FY24 on the back of energy and retail operations, while net margins held near the low-teens range, indicating stable cost management within historical bands.',
        'Quarterly disclosures for Q2 FY25 show promoter ownership steady near 49%, with incremental foreign institutional inflows noted over the last four filings.',
        'Debt service indicators remained within observed historical thresholds, supported by coverage ratios above 3x across the last reported fiscal periods.',
      ],
      updated_at: '2025-10-15T09:30:00Z',
      generated: true,
      mode: 'historical-only',
      advisory: false,
      explainability_available: true,
    },
  coverage: overrides.coverage ?? {
    coverage_ratio: 86,
    score: 0.86,
    available: ['company_profile', 'financials_snapshot', 'financial_ratios', 'shareholding', 'signals', 'metadata'],
    missing: ['ai_summary'],
    note:
      'Coverage reflects which factual blocks were included in the latest mock run. It does not imply quality or performance.',
  },
});

const createMarket = (overrides: Partial<MarketFacts> = {}): MarketFacts => ({
  symbol: overrides.symbol ?? 'RELIANCE',
  market: {
    price: {
      value: overrides.market?.price?.value ?? 2345.65,
      currency: overrides.market?.price?.currency ?? 'INR',
      delay_minutes: overrides.market?.price?.delay_minutes ?? 15,
    },
    market_cap: {
      value: overrides.market?.market_cap?.value ?? 1580000,
      currency: overrides.market?.market_cap?.currency ?? 'INR',
      computed: overrides.market?.market_cap?.computed ?? 'Delayed price × reported shares',
    },
    range_52_week: {
      high: overrides.market?.range_52_week?.high ?? 2680,
      low: overrides.market?.range_52_week?.low ?? 2010,
      currency: overrides.market?.range_52_week?.currency ?? 'INR',
    },
    shares_outstanding: {
      value: overrides.market?.shares_outstanding?.value ?? 6750,
      currency: overrides.market?.shares_outstanding?.currency ?? 'crore',
    },
    metadata: {
      source: overrides.market?.metadata?.source ?? 'Illustrative Fundametrics dataset',
      data_type: overrides.market?.metadata?.data_type ?? 'Delayed quote (mock)',
      delay_disclaimer:
        overrides.market?.metadata?.delay_disclaimer ??
        'Pricing data is delayed by at least 15 minutes and provided for demonstration only.',
      source_disclaimer:
        overrides.market?.metadata?.source_disclaimer ??
        'Replace with exchange-authorised data feed for production usage.',
      last_updated: overrides.market?.metadata?.last_updated ?? '2025-10-15T09:15:00Z',
    },
  },
});

const FALLBACK_DATA: Record<string, MockCompanyBundle> = {
  RELIANCE: {
    company: createCompany(),
    market: createMarket(),
  },
  TCS: {
    company: createCompany({
      symbol: 'TCS',
      company: {
        name: 'Tata Consultancy Services Limited',
        sector: 'IT Services',
        industry: 'Information Technology',
      },
      financials: {
        latest: {
          revenue: 229000,
          profit: 45210,
          margins: {
            operating: 24.3,
            net: 19.8,
          },
        },
        ratios: [
          {
            name: 'Return on Equity (ROE)',
            value: 43.6,
            category: 'Profitability',
            note: 'Net profit / average shareholders equity for FY24.',
          },
          {
            name: 'Return on Capital Employed (ROCE)',
            value: 41.1,
            category: 'Profitability',
            note: 'Earnings before interest and tax divided by capital employed.',
          },
          {
            name: 'Operating Margin',
            value: 24.3,
            category: 'Margins',
            note: 'Operating profit divided by revenue.',
          },
          {
            name: 'Net Margin',
            value: 19.8,
            category: 'Margins',
            note: 'Net profit divided by revenue.',
          },
        ],
      },
      metadata: {
        scraped_at: '2025-09-05T08:10:00Z',
        financial_period_label: 'FY24 (Standalone)',
        quarterly_period_label: 'Q2 FY25',
        yearly_period_label: 'FY24',
        ratios_period_label: 'FY24 audited financials',
        trends_period_label: 'FY23-FY24 filings',
        run_id: 'mock-run-tcs-001',
        as_of_date: 'FY24',
        computation_engine: 'Fundametrics Quant Engine v1.8.2-mock',
        data_sources: {
          screener: 'https://www.screener.in/company/TCS/',
          moneycontrol: 'https://www.moneycontrol.com/india/stockpricequote/computers-software/tataconsultancyservices/TCS',
        },
        data_quality_notes: [
          'Mock dataset for TCS: replace with live API output once backend is connected.',
        ],
        ai_summary_generated: true,
      },
      ai_summary: {
        paragraphs: [
          'FY24 standalone statements show revenue progression within the mid-teen growth band, with operating margins sustained above 24% through disciplined utilisation.',
          'Quarterly shareholding disclosures up to Q2 FY25 indicate promoter ownership steady above 72%, while institutional participation remained broadly unchanged.',
          'Cash generation metrics and payout ratios tracked in historical filings reflect consistent dividend distribution supported by stable free cash flow conversion.',
        ],
        updated_at: '2025-09-05T08:10:00Z',
        generated: true,
        mode: 'historical-only',
        advisory: false,
        explainability_available: true,
      },
      signals: [
        {
          label: 'Order book visibility high',
          severity: 'info',
          description: 'Book-to-bill ratio remains above 1.1x in the latest quarter. Observation only.',
        },
      ],
      shareholding: {
        status: 'available',
        summary: {
          promoter: 72.19,
          fii: 12.8,
          dii: 7.9,
          public: 7.11,
        },
        insights: [
          {
            title: 'Promoter holding steady',
            description: 'Promoter stake unchanged for the last six quarters.',
          },
        ],
      },
    }),
    market: createMarket({
      symbol: 'TCS',
      market: {
        price: {
          value: 3675.25,
          currency: 'INR',
          delay_minutes: 15,
        },
        market_cap: {
          value: 1345000,
          currency: 'INR',
          computed: 'Delayed price × reported shares',
        },
        range_52_week: {
          high: 3920,
          low: 3035,
          currency: 'INR',
        },
        shares_outstanding: {
          value: 365,
          currency: 'crore',
        },
        metadata: {
          source: 'Illustrative Fundametrics dataset',
          data_type: 'Delayed quote (mock)',
          delay_disclaimer: 'Pricing data is delayed by at least 15 minutes and provided for demonstration only.',
          source_disclaimer: 'Replace with exchange-authorised data feed for production usage.',
          last_updated: '2025-09-05T08:05:00Z',
        },
      },
    }),
  },
  TATAMOTORS: {
    company: createCompany({
      symbol: 'TATAMOTORS',
      company: {
        name: 'Tata Motors Limited',
        sector: 'Automobile',
        industry: 'Passenger & Commercial Vehicles',
      },
      financials: {
        latest: {
          revenue: 437928,
          profit: 31807,
          margins: {
            operating: 14.3,
            net: 7.2
          }
        },
        ratios: [
          { name: "Return on Equity (ROE)", value: 48.2, category: "Profitability", note: "High due to tax credits & JLR turnaround." },
          { name: "Return on Capital Employed (ROCE)", value: 18.4, category: "Profitability", note: "EBIT / (Equity + Debt)" },
          { name: "Operating Margin", value: 14.3, category: "Margins", note: "Consolidated EBITDA Margin" },
          { name: "Net Margin", value: 7.2, category: "Margins", note: "PAT / Revenue" },
          { name: "Debt to Equity", value: 1.8, category: "Solvency", note: "Includes JLR Lease Liabilities" },
          { name: "Interest Coverage", value: 4.2, category: "Solvency", note: "EBIT / Interest Expense" }
        ]
      },
      metadata: {
        scraped_at: '2025-10-15T12:00:00Z',
        financial_period_label: 'FY24 (Consolidated)',
        quarterly_period_label: 'Q2 FY25',
        yearly_period_label: 'FY24',
        ratios_period_label: 'FY24 audited',
        trends_period_label: 'FY23-FY24',
        run_id: 'mock-tatamotors-001',
        as_of_date: 'FY24',
        computation_engine: 'Fundametrics Quant Engine v1.8.2-mock',
        data_sources: {
          screener: 'https://www.screener.in/company/TATAMOTORS/',
          bse_filings: 'https://www.bseindia.com/'
        },
        data_quality_notes: ['Mock Data for Demo: Matches "BHEL" quality standard.'],
        ai_summary_generated: true,
      },
      ai_summary: {
        paragraphs: [
          "Consolidated revenue grew 26% YoY in FY24, driven by record JLR performance and strong domestic passenger vehicle volumes. The PV segment (including EVs) has cemented a #2 market share position.",
          "JLR Free Cash Flow hit record highs of £2.3bn, reducing net debt to <£700m. The 'Reimagine' strategy is yielding margin expansion through mix improvement (Defender/Range Rover focus).",
          "Domestic Commercial Vehicle (CV) segment maintains market leadership (>40% share) but faces cyclical headwinds. EV bus order book provides long-term revenue visibility."
        ],
        updated_at: '2025-10-15T12:00:00Z',
        generated: true,
        mode: 'historical-only',
        advisory: false,
        explainability_available: true
      },
      signals: [
        { label: "JLR Net Debt reduction ahead of target", severity: "info", description: "Net debt expected to be zero by FY25 end." },
        { label: "EV Market Share Dominance", severity: "info", description: "Holds >70% share in Indian electric passenger vehicle market." }
      ],
      shareholding: {
        status: 'available',
        summary: { promoter: 46.36, fii: 19.20, dii: 16.03, public: 18.41 },
        insights: [
          { title: "FII Accumulation", description: "Foreign investors increased stake by 1.2% over last 2 quarters." },
          { title: "Promoter Pledge Negligible", description: "Encumbrance is <1% of promoter holding." }
        ]
      }
    }),
    market: createMarket({
      symbol: 'TATAMOTORS',
      market: {
        price: { value: 982.50, currency: 'INR', delay_minutes: 15 },
        market_cap: { value: 362000, currency: 'INR', computed: 'Reported shares * Price' },
        range_52_week: { high: 1179, low: 676, currency: 'INR' },
        shares_outstanding: { value: 332, currency: 'crore' },
        metadata: {
          source: 'Illustrative Fundametrics',
          data_type: 'Mock Quote',
          delay_disclaimer: 'Delayed by 15 mins',
          source_disclaimer: 'Demo only',
          last_updated: '2025-10-15T12:00:00Z'
        }
      }
    })
  },

};

export const getMockCompanyData = (symbol: string): MockCompanyBundle | null => {
  if (!symbol) return null;
  const upper = symbol.toUpperCase();
  if (FALLBACK_DATA[upper]) {
    return FALLBACK_DATA[upper];
  }

  // Alias for Tata Motors Passenger Vehicle
  if (upper === 'TMPV') {
    const base = JSON.parse(JSON.stringify(FALLBACK_DATA['TATAMOTORS']));
    base.company.company.name = 'Tata Motors Passenger Vehicles Ltd';
    base.company.company.industry = 'Passenger Vehicles (Subsidiary)';
    return base;
  }

  return {
    company: createCompany({
      symbol: upper,
      company: {
        name: `${upper} Limited`,
        sector: 'Not disclosed',
        industry: '—',
      },
      signals: [],
      shareholding: {
        status: 'unavailable',
        summary: {},
        insights: [],
      },
      metadata: {
        scraped_at: 'N/A',
        data_sources: {},
        run_id: 'mock-run-generic',
        as_of_date: 'N/A',
        computation_engine: 'Fundametrics Placeholder Engine',
        financial_period_label: 'Not available',
        financial_frequency: 'Not available',
        quarterly_period_label: 'Not available',
        yearly_period_label: 'Not available',
        ratios_period_label: 'Not available',
        trends_period_label: 'Not available',
        data_quality_notes: ['Generic mock data populated due to missing backend response.'],
        ai_summary_generated: false,
      },
      financials: {
        latest: {},
        ratios: [],
      },
      ai_summary: {
        paragraphs: [
          'Historical statements for this company are not available in the current Fundametrics mock dataset.',
          'Connect to the live Fundametrics API or ingest filings to generate an analytical summary based solely on reported history.',
        ],
        updated_at: 'N/A',
        generated: false,
        mode: 'historical-only',
        advisory: false,
        explainability_available: true,
      },
    }),
    market: createMarket({
      symbol: upper,
      market: {
        price: {
          value: null,
          currency: 'INR',
          delay_minutes: null,
        },
        market_cap: {
          value: null,
          currency: 'INR',
          computed: 'Not available',
        },
        range_52_week: {
          high: null,
          low: null,
          currency: 'INR',
        },
        shares_outstanding: {
          value: null,
          currency: 'crore',
        },
        metadata: {
          source: 'Mock dataset',
          data_type: 'Placeholder',
          delay_disclaimer: 'Market data unavailable. Displayed values are placeholders only.',
          source_disclaimer: 'Connect Fundametrics API for actual market data.',
          last_updated: 'N/A',
        },
      },
    }),
  };
};

export const searchMockSymbols = (query: string) => {
  const q = query.toLowerCase();
  const mocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Limited', sector: 'Oil & Gas' },
    { symbol: 'TCS', name: 'Tata Consultancy Services Limited', sector: 'IT Services' },
    { symbol: 'TATAMOTORS', name: 'Tata Motors Limited', sector: 'Automobile' },
    { symbol: 'TMPV', name: 'Tata Motors Passenger Vehicles Ltd', sector: 'Automobile' }
  ];
  return mocks.filter(m =>
    m.symbol.toLowerCase().includes(q) ||
    m.name.toLowerCase().includes(q)
  );
};
