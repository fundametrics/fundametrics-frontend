import type { FC } from 'react';
import SEO from '../components/SEO';

const AboutPage: FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <SEO
        title="About Fundametrics | Institutional Quality Data"
        description="Learn about our facts-first methodology and how we aggregate and normalize financial data for Indian public companies."
      />

      {/* Hero Section */}
      <header className="bg-white border-b border-slate-200 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block mb-4">
            About Fundametrics
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-6">
            Facts-first <br />
            <span className="text-indigo-600">financial intelligence</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
            Fundametrics is built for the investor who wants clarity. We aggregate, normalise, and
            explain company data without adding bias or speculation.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {/* Principles & Coverage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Our Operating Principles */}
          <div className="premium-card p-8 bg-white border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-tight">
              Our operating principles
            </h3>
            <ul className="space-y-4">
              {[
                "Neutral presentation—fields are descriptive, never suggestive.",
                "Transparent sourcing—every figure can be traced to a disclosure.",
                "Compliance-first design—disclaimers and delays are non-negotiable."
              ].map((principle, idx) => (
                <li key={idx} className="flex gap-3 text-slate-600 font-medium text-sm leading-relaxed">
                  <span className="text-indigo-400 mt-1.5">•</span>
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Coverage */}
          <div className="premium-card p-8 bg-white border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-8 uppercase tracking-tight">
              Platform coverage
            </h3>
            <div className="grid grid-cols-2 gap-y-10 gap-x-4">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Companies</div>
                <div className="text-3xl font-black text-slate-900">500+</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Metrics</div>
                <div className="text-3xl font-black text-slate-900">80+</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Signals</div>
                <div className="text-xl font-black text-slate-900">Observational</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Advisory</div>
                <div className="text-xl font-black text-slate-900">None</div>
              </div>
            </div>
          </div>
        </div>

        {/* Where our data comes from */}
        <section className="space-y-6">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
            Where our data comes from
          </h3>
          <p className="text-base font-medium text-slate-500 leading-relaxed">
            Fundametrics aggregates filings, exchange disclosures, and publicly available market data.
            Every data point is traceable back to a disclosed source.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Exchange-provided market feeds with regulatory delay applied",
              "Quarterly and annual financial statements filed with exchanges",
              "Shareholding patterns disclosed to stock exchanges",
              "Corporate action announcements verified against official sources"
            ].map((source, idx) => (
              <div key={idx} className="flex gap-3 p-4 bg-white border border-slate-100 rounded-xl text-slate-600 font-medium text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                <span>{source}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Legal Note */}
        <section className="p-8 bg-slate-900 text-slate-100 rounded-[2rem] space-y-4">
          <h2 className="text-xl font-black uppercase tracking-tight">Legal Compliance</h2>
          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            Fundametrics provides information so that you can perform your own analysis. We do not recommend securities or strategies.
            We are not a SEBI registered investment advisor. Consult a qualified advisor before acting on financial information.
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
