import type { FC } from 'react';

const PlatformIntelligence: FC = () => {
    return (
        <section className="max-w-[1400px] mx-auto px-6 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <header className="space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] block">
                    About Fundametrics
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                    Facts-first financial intelligence
                </h2>
                <p className="text-base sm:text-lg text-slate-500 max-w-2xl leading-relaxed font-medium">
                    Fundametrics is built for the investor who wants clarity. We aggregate, normalise, and 
                    explain company data without adding bias or speculation.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Our Operating Principles */}
                <div className="premium-card p-8 bg-white border border-slate-100/60 shadow-sm flex flex-col justify-between">
                    <div>
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
                </div>

                {/* Platform Coverage */}
                <div className="premium-card p-8 bg-white border border-slate-100/60 shadow-sm">
                    <h3 className="text-lg font-black text-slate-900 mb-8 uppercase tracking-tight">
                        Platform coverage
                    </h3>
                    <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Companies</div>
                            <div className="text-3xl font-black text-slate-900">500+</div>
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fundamental Metrics</div>
                            <div className="text-3xl font-black text-slate-900">80+</div>
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Signals</div>
                            <div className="text-2xl font-black text-slate-900">Observational</div>
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Advisory</div>
                            <div className="text-2xl font-black text-slate-900">None</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Where our data comes from */}
            <div className="space-y-6 pt-4">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                    Where our data comes from
                </h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-4xl">
                    Fundametrics aggregates filings, exchange disclosures, and publicly available market data. 
                    Every data point is traceable back to a disclosed source.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        "Exchange-provided market feeds with regulatory delay applied",
                        "Quarterly and annual financial statements filed with exchanges",
                        "Shareholding patterns disclosed to stock exchanges"
                    ].map((source, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-600 font-medium text-xs leading-relaxed">
                            <span className="text-indigo-400 mt-1">•</span>
                            <span>{source}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default PlatformIntelligence;
