export interface MarketFacts {
  symbol: string;
  market: {
    price: {
      value: number | null;
      change?: number | null;
      change_percent?: number | null;
      currency: string;
      delay_minutes: number | null;
    };
    market_cap: {
      value: number | null;
      currency: string;
      computed: string;
    };
    range_52_week: {
      high: number | null;
      low: number | null;
      currency: string;
    };
    shares_outstanding: {
      value: number | null;
      currency: string;
    };
    metadata: {
      source: string;
      data_type: string;
      delay_disclaimer: string;
      source_disclaimer: string;
      last_updated: string | null;
    };
  };
}

export interface CompanyFinancials {
  revenue?: number | null;
  profit?: number | null;
  margins?: {
    operating?: number | null;
    net?: number | null;
  };
}

export interface RatioRow {
  name: string;
  value: string | number | null;
  category?: string;
  note?: string;
}

export interface WarningMessage {
  code: string;
  level: string;
  message: string;
}

export interface CoverageSummary {
  score: number;
  coverage_ratio: number; // Percentage 0-100
  available: string[];
  missing: string[];
  note: string;
}

export interface Reliability {
  coverage_score: number;
  status: 'good' | 'partial' | 'poor' | string;
  missing: string[];
  is_stale: boolean;
  last_audit: string | null;
}

export interface ShareholdingBlock {
  status: 'available' | 'unavailable';
  summary: Record<string, unknown>;
  insights: Array<{ title: string; description: string }>;
  history?: Array<{
    period: string;
    promoter?: number | null;
    fii?: number | null;
    dii?: number | null;
    public?: number | null;
  }>;
}

export interface CompanyResponse {
  symbol: string;
  company: {
    name: string;
    sector?: string;
    industry?: string;
  };
  financials: {
    latest: CompanyFinancials;
    ratios?: RatioRow[];
    metrics?: Record<string, number | null>;
  };
  signals: Array<{
    label: string;
    severity?: string;
    description: string;
  }>;
  shareholding: ShareholdingBlock;
  metadata: {
    scraped_at: string;
    data_sources: Record<string, unknown>;
    run_id?: string;
    as_of_date?: string;
    computation_engine?: string;
    financial_period_label?: string;
    financial_frequency?: string;
    quarterly_period_label?: string;
    yearly_period_label?: string;
    ratios_period_label?: string;
    trends_period_label?: string;
    data_quality_notes?: string[];
    ai_summary_generated?: boolean;
    warnings?: WarningMessage[];
    disclaimer?: string;
  };
  ai_summary?: {
    paragraphs: string[];
    updated_at?: string;
    generated?: boolean;
    mode?: 'historical-only' | 'mixed' | 'forecast';
    advisory?: boolean;
    explainability_available?: boolean;
  };
  coverage?: CoverageSummary;
  reliability?: Reliability;
}

export interface StockListRow {
  symbol: string;
  company: string;
  name?: string; // Backend uses name
  sector: string;
}

export interface StocksResponse {
  count: number;
  total?: number;
  skip?: number;
  limit?: number;
  symbols?: string[];        // Legacy
  companies?: StockListRow[]; // Phase 23
}

export interface CoverageIndexRecord {
  symbol: string;
  name?: string;
  sector?: string;
  coverage: CoverageSummary;
  last_processed?: string;
  warnings: WarningMessage[];
}

export interface CoverageIndexResponse {
  generated_at: string;
  totals: {
    symbols: number;
    block_availability: Record<string, number>;
  };
  results: CoverageIndexRecord[];
  disclaimer: string;
}
export interface TrustComponents {
  confidence: number;
  drift_penalty: number;
  source_weight: number;
  freshness: number;
}

export interface TrustScore {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D';
  label: string;
  components: TrustComponents;
  overall: string;
}

export interface MetricInput {
  name: string;
  value: number;
  source: SourceProvenance | null;
}

export interface Explainability {
  why_available: string | boolean | null;
  why_unavailable: string | null;
  formula: string | null;
  inputs_used: string[] | MetricInput[] | null;
  assumptions: string[];
  limitations: string[];
}

export interface Drift {
  previous_value?: number;
  current_value?: number;
  change_pct?: number;
  magnitude: number; // For trend direction (Improving/Declining)
  z_score?: number;
  drift_flag: boolean;
  classification?: string;
  reason?: string;
  confidence_impact?: string;
}

export interface SourceProvenance {
  source: string;
  document?: string;
  page?: number;
  scraped_at?: string;
  url?: string;
  statement_scope?: string;
}

export interface ProvenanceContainer {
  calculation_agent: string;
  computed_at: string;
  inputs_provenance: Array<{
    metric: string;
    source: SourceProvenance;
  }>;
}

export interface ComputedMetric {
  metric_name: string;
  period: string;
  value: number | null;
  unit?: string;
  confidence: number | null;
  reason: string | null;
  computed_at: string;

  // Phase 17+
  explainability: Explainability | null;
  drift: Drift | null;
  source_provenance: ProvenanceContainer | null;
  trust_score: TrustScore | null;
  integrity: string | null;
}

// Update CompanyResponse to include detailed list of ComputedMetrics if needed
// For now, extending CompanyDetails to hold them or adding them to 'financials'
export interface StockDetailResponse {
  company: {
    name: string;
    symbol: string;
    exchange: string;
    sector?: string;
    industry?: string;
    about?: string;
    is_active: boolean;
  };
  latest_facts: any;
  historical_facts: any[];
  yearly_financials: Record<string, any[]>;
  fundametrics_metrics: ComputedMetric[];
  management: any[];
  news?: Array<{
    title: string;
    url: string;
    published_at: string;
    source: string;
    sentiment: 'positive' | 'negative' | 'neutral';
  }>;
  shareholding: ShareholdingBlock;
  ai_summary?: {
    paragraphs: string[];
    updated_at?: string;
    generated?: boolean;
    mode?: 'historical-only' | 'mixed' | 'forecast';
    advisory?: boolean;
    explainability_available?: boolean;
  };
  reliability?: Reliability;
  coverage?: CoverageSummary;
  metadata?: {
    scraped_at: string;
    data_sources: Record<string, unknown>;
    as_of_date?: string;
    financial_period_label?: string;
    yearly_period_label?: string;
    constants?: {
      share_price: number | null;
    };
  };
}
