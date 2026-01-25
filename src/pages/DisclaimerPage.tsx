import type { FC } from 'react';
import SEO from '../components/SEO';
import { ShieldAlert, Info, Clock, ExternalLink } from 'lucide-react';

const DisclaimerPage: FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Disclaimer | fundametrics.in"
        description="Institutional disclaimer and data policy for Fundametrics."
      />

      <div className="max-w-4xl mx-auto px-6 py-24">
        <header className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest">
            <ShieldAlert size={12} />
            Legal & Data Policy
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Institutional Disclaimer</h1>
        </header>

        <div className="space-y-12 text-slate-600 leading-relaxed font-medium">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Info size={20} className="text-indigo-600" />
              Not Investment Advice
            </h2>
            <p>
              All information provided by Fundametrics (fundametrics.in) is for educational and informational purposes only. Fundametrics is not a registered investment advisor (RIA), broker-dealer, or financial analyst.
            </p>
            <p className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-900 font-bold italic">
              "The data provided on this platform should not be construed as medical, legal, or financial advice. Always consult with a qualified professional before making investment decisions."
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Clock size={20} className="text-indigo-600" />
              Data Freshness & Accuracy
            </h2>
            <p>
              While we strive for 100% accuracy through our institutional-grade data pipelines, stock market data is inherently volatile.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Market prices are delayed by at least 15 minutes as per standard NSE/BSE policy.</li>
              <li>Financial ratios (PE, ROE) are computed based on the latest available SEBI filings and may not reflect very recent corporate actions.</li>
              <li>The Trust Grade (A/B/C) is a proprietary heuristic based on data coverage and is not a recommendation of company health.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ExternalLink size={20} className="text-indigo-600" />
              Third Party Data
            </h2>
            <p>
              Fundametrics aggregates data from public sources including but not limited to stock exchanges, corporate disclosures, and news aggregators. We do not guarantee the completeness or timeliness of third-party data feeds.
            </p>
          </section>

          <footer className="pt-12 border-t border-slate-100 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
            Last Updated: January 2026 | Fundametrics Intelligence Ops
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
