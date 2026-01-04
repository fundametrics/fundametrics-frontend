import { Fragment, Suspense, lazy, useEffect, useState, useRef } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { api } from '../utils/api';
import { getMockCompanyData } from '../mocks/company';
import ExplainabilityModal from '../components/ExplainabilityModal';
import CompanyHeader from '../components/CompanyHeader';
import ExecutiveSnapshot from '../components/ExecutiveSnapshot';
import GrowthSummary from '../components/GrowthSummary';
import InsightTile from '../components/InsightTile';
import SmartComparison from '../components/SmartComparison';
import FinancialChartsSection from '../components/FinancialChartsSection';
import FinancialTableCompact from '../components/FinancialTableCompact';
import SEO from '../components/SEO';
import type { MarketFacts, ComputedMetric, StockDetailResponse } from '../types';
import {
  Activity, ShieldCheck, Database, LayoutGrid, ChevronDown,
  BarChart3, PieChart, FileText, Zap, ArrowRight,
  TrendingUp, Scale, Wallet, LineChart as LineChartIcon,
  Info, Newspaper
} from 'lucide-react';

const OverviewSection = lazy(() => import('../components/OverviewSection'));
const FinancialsSection = lazy(() => import('../components/FinancialsSection'));
const OwnershipSection = lazy(() => import('../components/OwnershipSection'));
const DocumentsSection = lazy(() => import('../components/DocumentsSection'));
import Skeleton from '../components/Skeleton';

interface SectionState {
  company: StockDetailResponse | null;
  market: MarketFacts | null;
  peers: any[];
  loading: boolean;
  error: string | null;
  statusData?: { status: string; name?: string; sector?: string };
}

const AboutSection = lazy(() => import('../components/AboutSection'));
const ManagementSection = lazy(() => import('../components/ManagementSection'));
const NewsSection = lazy(() => import('../components/NewsSection'));

const NAV_ITEMS = [
  { id: 'snapshot', label: 'Snapshot', icon: LayoutGrid },
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'insights', label: 'Insights', icon: ShieldCheck },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'comparison', label: 'Comparison', icon: Activity },
  { id: 'charts', label: 'Charts', icon: BarChart3 },
  { id: 'pl', label: 'Profit & Loss', icon: TrendingUp },
  { id: 'balance-sheet', label: 'Balance Sheet', icon: Scale },
  { id: 'cash-flow', label: 'Cash Flow', icon: Wallet },
  { id: 'ratios', label: 'Ratios', icon: LineChartIcon },
  { id: 'ownership', label: 'Ownership', icon: PieChart },
  { id: 'documents', label: 'Documents', icon: Database },
];

const SectionHeader = ({ title, icon: Icon, id }: { title: string, icon: any, id: string }) => (
  <div id={id} className="flex items-center justify-between mb-8 scroll-mt-40 pt-4">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest leading-none">{title}</h3>
      </div>
    </div>
  </div>
);

const CompanyPage = () => {
  const { symbol = '' } = useParams();
  const [activeSection, setActiveSection] = useState('snapshot');
  const [state, setState] = useState<SectionState>({
    company: null,
    market: null,
    peers: [],
    loading: true,
    error: null,
  });
  const [isExplainabilityOpen, setIsExplainabilityOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<ComputedMetric | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadCompany = async () => {
      if (!symbol) return;
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const [companyRes, marketRes, peersRes] = await Promise.allSettled([
          api.getCompany(symbol),
          api.getMarketFacts(symbol),
          api.getPeers(symbol),
        ]);

        if (!isMounted) return;

        const companyData = companyRes.status === 'fulfilled' ? companyRes.value : null;
        const marketData = marketRes.status === 'fulfilled' ? marketRes.value as MarketFacts : null;
        const peersData = peersRes.status === 'fulfilled' ? peersRes.value.peers : [];

        if (companyRes.status === 'rejected' || !companyData) {
          throw new Error('API Unavailable');
        }

        setState({
          company: companyData,
          market: marketData,
          peers: peersData,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (!isMounted) return;

        console.warn('API connection failed, attempting registry fallback...', error);

        try {
          const statusRes = await api.getCompanyStatus(symbol);
          if (isMounted) {
            setState({
              company: null,
              market: null,
              peers: [],
              loading: false,
              error: null,
              statusData: statusRes
            });
          }
        } catch (statusErr) {
          if (!isMounted) return;
          console.error('Registry check failed', statusErr);
          setState((prev) => ({
            ...prev,
            loading: false,
            error: 'Company data unavailable in both live and offline registries.',
          }));
        }
      }
    };

    loadCompany();
    return () => { isMounted = false; };
  }, [symbol]);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExplainMetric = (metric: ComputedMetric) => {
    setSelectedMetric(metric);
    setIsExplainabilityOpen(true);
  };

  if (state.loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin shadow-xl shadow-indigo-50" />
          <div className="text-center">
            <p className="text-xs font-black text-slate-900 uppercase tracking-[0.3em]">Loading Company Registry</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 animate-pulse">Structuring Public Data...</p>
          </div>
        </div>
      </div>
    );
  }

  const fundametricsMetrics = state.company?.fundametrics_metrics || [];
  const reliability = state.company?.reliability;

  const isNotAnalyzed = !state.company && state.statusData?.status !== 'available';
  const companyName = state.company?.company?.name || state.statusData?.name || symbol;
  const sector = state.company?.company?.sector || state.statusData?.sector || 'NSE Listed';

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": companyName,
    "tickerSymbol": symbol,
    "exchange": "NSE",
    "url": `https://fundametrics.in/stocks/${symbol}`,
    "description": isNotAnalyzed
      ? `${companyName} is listed on NSE. Financial data has not been generated yet. Transparent data availability shown.`
      : `Structured financial data, disclosures, and reliability status for ${companyName} (NSE: ${symbol}). No opinions or investment advice.`,
    "sameAs": [
      `https://www.nseindia.com/get-quotes/equity?symbol=${symbol}`
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEO
        title={isNotAnalyzed
          ? `${companyName} (${symbol}) – NSE Listed Company | Fundametrics`
          : `${companyName} (${symbol}) – Financial Overview & Disclosures | Fundametrics`
        }
        description={isNotAnalyzed
          ? `${companyName} is listed on NSE. Financial data has not been generated yet. Transparent data availability and reliability status shown.`
          : `View structured financial data, disclosures, and reliability status for ${companyName} (NSE: ${symbol}). No opinions or investment advice.`
        }
      >
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </SEO>
      <CompanyHeader
        name={state.company?.company?.name || companyName}
        symbol={symbol}
        sector={state.company?.company?.sector || sector}
        metadataAsOfDate="Latest Filing"
        price={state.market?.market?.price}
        coverage={state.company?.coverage}
        statementScope="Standalone / Consolidated"
        isPsu={sector === 'PSU' || companyName.includes('India') || companyName.includes('Corporation')}
      />

      <div className="flex w-full relative">
        {/* Side Navigation */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto border-r border-slate-100 bg-white/50 backdrop-blur-sm z-30 pt-6 px-6">
          <div className="mb-6">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] bg-slate-100 px-2 py-1 rounded">Terminal Index</span>
          </div>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all mb-1 ${activeSection === item.id
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-300'
                : 'text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow-sm'
                }`}
            >
              <item.icon size={16} className={activeSection === item.id ? 'text-indigo-400' : 'text-slate-400'} />
              {item.label}
            </a>
          ))}
          <div className="pt-10">
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Status</span>
              <p className="text-[10px] font-medium text-slate-600 leading-relaxed">
                Structured data generated from original public filings.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        {isNotAnalyzed ? (
          <main className="flex-1 px-4 lg:px-8 py-20 flex items-center justify-center">
            <div className="max-w-xl w-full bg-white rounded-[2.5rem] border border-slate-200 p-12 text-center shadow-xl shadow-slate-100">
              <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <ShieldCheck size={40} className="text-amber-500" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-4">{companyName}</h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full mb-8">
                {symbol} • {sector}
              </div>
              <p className="text-slate-500 font-medium leading-relaxed mb-10">
                This company is in our registry but structured financial data has not been generated yet.
                Fundametrics generates data on-demand to ensure maximum accuracy from public filings.
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => window.location.href = '/admin'}
                  className="w-full py-4 bg-indigo-600 hover:bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                >
                  <Zap size={16} />
                  Ingest & Analyze Now
                </button>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-[11px] text-slate-400">
                  "Transparent data availability and reliability status shown."
                </div>
              </div>
            </div>
          </main>
        ) : (
          <main className="flex-1 px-4 lg:px-8 py-8 space-y-24 pb-40 min-w-0">

            {/* Snapshot */}
            <section id="snapshot" className="scroll-mt-24 space-y-10 border-b border-slate-100 pb-20">
              <SectionHeader title="Executive Snapshot" icon={LayoutGrid} id="snapshot" />
              <ExecutiveSnapshot metrics={fundametricsMetrics} onExplain={handleExplainMetric} reliability={reliability} />
              <GrowthSummary metrics={fundametricsMetrics} />
            </section>

            {/* Overview */}
            <section id="overview" className="scroll-mt-24 space-y-12 border-b border-slate-100 pb-20">
              <SectionHeader title="Corporate Overview" icon={FileText} id="overview" />
              <div className="space-y-12">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-3">
                    <AboutSection aboutText={state.company?.company?.about} />
                  </div>
                </div>
                <ManagementSection management={state.company?.management} />
              </div>
            </section>

            {/* Insights & Narratives */}
            <section id="insights" className="scroll-mt-24 space-y-10 border-b border-slate-100 pb-20">
              <SectionHeader title="Financial Overview" icon={ShieldCheck} id="insights" />

              {/* AI Narrative Brief */}
              {state.company?.ai_summary?.paragraphs && reliability && reliability.coverage_score >= 0.5 && (
                <div className={`premium-card p-8 border rounded-3xl mb-8 ${reliability.coverage_score < 0.8 ? 'bg-amber-50/50 border-amber-100' : 'bg-indigo-50/30 border-indigo-100'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest block ${reliability.coverage_score < 0.8 ? 'text-amber-600' : 'text-indigo-600'}`}>Company Summary</span>
                    {reliability.coverage_score < 0.8 && (
                      <span className="text-[9px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">Partial Data</span>
                    )}
                  </div>

                  {reliability.coverage_score < 0.8 && (
                    <div className="flex items-center gap-2 mb-4 p-3 bg-amber-100/50 rounded-xl border border-amber-200">
                      <Info size={14} className="text-amber-600 shrink-0" />
                      <p className="text-[11px] font-bold text-amber-800 leading-tight">
                        This narrative is generated from partial financial disclosures and may not reflect the complete picture. {reliability.is_stale && "Note: Some source data is stale."}
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    {state.company.ai_summary.paragraphs.map((p, i) => (
                      <p key={i} className="text-sm text-slate-700 leading-relaxed font-medium">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {reliability && reliability.coverage_score < 0.5 && (
                <div className="premium-card p-8 bg-slate-50 border border-slate-200 border-dashed rounded-3xl mb-8 text-center">
                  <Database size={24} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Insufficient Data Coverage for Synthesis</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {fundametricsMetrics.filter((m: any) => m.value !== null).slice(0, 8).map((m: any, idx: number) => (
                  <InsightTile key={idx} metric={m} onExplore={handleExplainMetric} />
                ))}
              </div>
            </section>

            {/* News */}
            <section id="news" className="scroll-mt-24 space-y-10 border-b border-slate-100 pb-20">
              <SectionHeader title="Media Disclosures" icon={Newspaper} id="news" />
              <Suspense fallback={<div className="h-[400px] w-full rounded-2xl bg-slate-100 animate-pulse" />}>
                <NewsSection news={state.company?.news} />
              </Suspense>
            </section>

            {/* Comparison */}
            {state.peers && state.peers.length > 0 && (
              <section id="comparison" className="scroll-mt-24 space-y-10 border-b border-slate-100 pb-20">
                <SectionHeader title="Sector Context" icon={Activity} id="comparison" />
                <SmartComparison
                  currentSymbol={symbol}
                  sectorMedianPE={24.5}
                  currentConfidenceTier={1}
                  peers={state.peers}
                />
              </section>
            )}

            {/* Visual Health */}
            <section id="charts" className="scroll-mt-24 space-y-10 border-b border-slate-100 pb-20">
              <SectionHeader title="Visual Trends" icon={BarChart3} id="charts" />
              <FinancialChartsSection yearlyData={state.company?.yearly_financials || {}} reliability={reliability} />
            </section>

            {/* Financial Statements */}
            <div className="space-y-32">
              <section id="pl" className="scroll-mt-24">
                <SectionHeader title="Profit & Loss" icon={TrendingUp} id="pl" />
                <div className="premium-card p-4 bg-white border border-slate-200 shadow-xl shadow-slate-100">
                  <FinancialTableCompact
                    yearlyData={state.company?.yearly_financials || {}}
                    reliability={reliability}
                    metrics={[
                      { key: 'revenue', label: 'Revenue (Sales)' },
                      { key: 'expenses', label: 'Expenses' },
                      { key: 'operating_profit', label: 'Operating Profit (EBITDA)' },
                      { key: 'operating_profit_margin', label: 'OPM %' },
                      { key: 'other_income', label: 'Other Income' },
                      { key: 'interest', label: 'Interest' },
                      { key: 'depreciation', label: 'Depreciation' },
                      { key: 'profit_before_tax', label: 'Profit before tax' },
                      { key: 'tax_pct', label: 'Tax %' },
                      { key: 'net_income', label: 'Net Profit (PAT)' },
                      { key: 'eps', label: 'EPS (INR)' },
                    ]}
                  />
                </div>
              </section>

              <section id="balance-sheet" className="scroll-mt-24">
                <SectionHeader title="Balance Sheet" icon={Scale} id="balance-sheet" />
                <div className="premium-card p-4 bg-white border border-slate-200 shadow-xl shadow-slate-100">
                  <FinancialTableCompact
                    yearlyData={state.company?.yearly_financials || {}}
                    reliability={reliability}
                    metrics={[
                      { key: 'equity_capital', label: 'Equity Capital' },
                      { key: 'reserves', label: 'Reserves' },
                      { key: 'borrowings', label: 'Borrowings (Debt)' },
                      { key: 'other_liabilities', label: 'Other Liabilities' },
                      { key: 'total_liabilities', label: 'Total Liabilities' },
                      { key: 'fixed_assets', label: 'Fixed Assets' },
                      { key: 'cwip', label: 'CWIP' },
                      { key: 'investments', label: 'Investments' },
                      { key: 'other_assets', label: 'Other Assets' },
                      { key: 'total_assets', label: 'Total Assets' },
                    ]}
                  />
                </div>
              </section>

              <section id="cash-flow" className="scroll-mt-24">
                <SectionHeader title="Cash Flow" icon={Wallet} id="cash-flow" />
                <div className="premium-card p-4 bg-white border border-slate-200 shadow-xl shadow-slate-100">
                  <FinancialTableCompact
                    yearlyData={state.company?.yearly_financials || {}}
                    reliability={reliability}
                    metrics={[
                      { key: 'cash_flow_operating', label: 'Cash from Operating Activity' },
                      { key: 'cash_flow_investing', label: 'Cash from Investing Activity' },
                      { key: 'cash_flow_financing', label: 'Cash from Financing Activity' },
                      { key: 'net_cash_flow', label: 'Net Cash Flow' },
                    ]}
                  />
                </div>
              </section>

              <section id="ratios" className="scroll-mt-24 pb-20 border-b border-slate-100">
                <SectionHeader title="Ratios & Metrics" icon={LineChartIcon} id="ratios" />
                <div className="premium-card p-4 bg-white border border-slate-200 shadow-xl shadow-slate-100">
                  <FinancialTableCompact
                    yearlyData={state.company?.yearly_financials || {}}
                    reliability={reliability}
                    metrics={[
                      { key: 'roe', label: 'ROE %' },
                      { key: 'roce', label: 'ROCE %' },
                      { key: 'net_profit_margin', label: 'Net Profit Margin %' },
                      { key: 'pe_ratio', label: 'Price to Earnings' },
                      { key: 'dividend_yield', label: 'Dividend Yield %' },
                      { key: 'face_value', label: 'Face Value (INR)' },
                      { key: 'book_value', label: 'Book Value (INR)' },
                    ]}
                  />
                </div>
              </section>
            </div>

            {/* Ownership */}
            {state.company?.shareholding?.status === 'available' ? (
              <section id="ownership" className="scroll-mt-24 space-y-10 border-b border-slate-100 pb-20">
                <SectionHeader title="Ownership Pattern" icon={PieChart} id="ownership" />
                <OwnershipSection
                  shareholding={state.company?.shareholding}
                  periodLabel="Latest Filing"
                />
              </section>
            ) : (
              <section id="ownership" className="scroll-mt-24 space-y-10 border-b border-slate-100 pb-20">
                <SectionHeader title="Ownership Pattern" icon={PieChart} id="ownership" />
                <div className="premium-card p-12 bg-slate-50 border-slate-200 border-dashed text-center">
                  <PieChart size={24} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ownership Disclosures Unavailable for this Symbol</p>
                </div>
              </section>
            )}

            {/* Documents */}
            <section id="documents" className="scroll-mt-24 space-y-10">
              <SectionHeader title="Source Documents" icon={Database} id="documents" />
              <DocumentsSection reliability={reliability} metadata={state.company?.metadata} />
            </section>

          </main>
        )}
      </div>


      <ExplainabilityModal
        open={isExplainabilityOpen}
        onClose={() => setIsExplainabilityOpen(false)}
        metric={selectedMetric}
      />
    </div >
  );
};

export default CompanyPage;
