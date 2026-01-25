import type { FC } from 'react';
import SEO from '../components/SEO';
import { ShieldCheck, Database, Zap, BookOpen, Layers } from 'lucide-react';

const MethodologyPage: FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <SEO
                title="Intelligence Methodology | fundametrics.in"
                description="How we calculate ratios and verify data at Fundametrics."
            />

            <div className="max-w-5xl mx-auto px-6 py-24">
                <header className="mb-16 space-y-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest">
                        <Layers size={12} />
                        Verified Compute
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Our Methodology</h1>
                    <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto italic">"Turning raw disclosures into actionable visual intelligence."</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Data Sourcing */}
                    <div className="premium-card p-10 bg-white">
                        <Database className="text-indigo-600 mb-6" size={32} />
                        <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Phase 1: Sourcing</h2>
                        <p className="text-slate-600 font-medium mb-6">
                            We pull raw data from standardized institutional feeds and public SEBI filings.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                                <ShieldCheck size={18} className="text-emerald-500 mt-1" />
                                <div>
                                    <span className="block font-black text-[11px] uppercase tracking-wider text-slate-900">Exchange Feeds</span>
                                    <span className="text-xs text-slate-500 font-medium">Delayed Price & Volume (15M delay)</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                                <ShieldCheck size={18} className="text-emerald-500 mt-1" />
                                <div>
                                    <span className="block font-black text-[11px] uppercase tracking-wider text-slate-900">Corporate Filings</span>
                                    <span className="text-xs text-slate-500 font-medium">Standardized XBRL disclosures from NSE/BSE.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Computation Engine */}
                    <div className="premium-card p-10 bg-white">
                        <Zap className="text-amber-500 mb-6" size={32} />
                        <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Phase 2: Computation</h2>
                        <p className="text-slate-600 font-medium mb-6">
                            Our proprietary engine normalizes varied reporting formats into a canonical schema.
                        </p>
                        <div className="space-y-4">
                            <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
                                <span className="block font-black text-[11px] uppercase tracking-wider text-indigo-700 mb-2">P/E Ratio Formula</span>
                                <code className="text-lg font-mono font-bold text-slate-900">Current Price / TTM EPS</code>
                            </div>
                            <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
                                <span className="block font-black text-[11px] uppercase tracking-wider text-indigo-700 mb-2">ROE Calculation</span>
                                <code className="text-lg font-mono font-bold text-slate-900">Net Income / Avg. Equity</code>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-24 bg-slate-900 rounded-3xl p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -mr-32 -mt-32" />
                    <div className="relative z-10 max-w-3xl">
                        <BookOpen className="text-indigo-400 mb-6" size={40} />
                        <h2 className="text-3xl font-black mb-6 tracking-tight">The "Trust Grade" Logic</h2>
                        <p className="text-lg text-slate-300 font-medium leading-relaxed mb-8">
                            Every stock page features a Fundametrics Trust Grade (A through C). This isn't a rating of the business performance—it's a measure of **Data Transparency**.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <span className="text-3xl font-black text-emerald-400 italic">Grade A</span>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Full Disclosures Verified</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-3xl font-black text-amber-400 italic">Grade B</span>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Partial Data Available</p>
                            </div>
                            <div className="space-y-2 border-l border-white/10 pl-6">
                                <span className="text-3xl font-black text-slate-500 italic">Grade C</span>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Sparse Filings Detected</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MethodologyPage;
