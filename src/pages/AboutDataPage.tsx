import { FC } from 'react';
import { ShieldCheck, Database, FileCheck, Search, Info, Scale, Zap } from 'lucide-react';
import SEO from '../components/SEO';

const AboutDataPage: FC = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <SEO
                title="How We Source & Verify Company Data"
                description="Learn about the Fundametrics data pipeline. Transparent sourcing from public filings, automated ingestion, and factual reliability scores."
            />

            {/* Hero Section */}
            <header className="bg-white border-b border-slate-200 pt-20 pb-16">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        <Info size={14} />
                        Data Standards
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-6">
                        Transparent Data <br />
                        <span className="text-indigo-600">No Opinions.</span>
                    </h1>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Fundametrics is a data-first platform. We provide structured access to public disclosures.
                        We do not provide investment advice, price targets, or subjective ratings.
                    </p>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-20 space-y-24">
                {/* Core Principles */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center text-indigo-600">
                            <Database size={24} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Primary Sourcing</h3>
                        <p className="text-slate-600 leading-relaxed font-medium">
                            Every data point on Fundametrics originates from official exchange filings (NSE/BSE) or corporate
                            annual and quarterly reports. We bypass third-party "normalized" feeds to ensure you see what
                            the company actually reported.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center text-indigo-600">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Automated Ingestion</h3>
                        <p className="text-slate-600 leading-relaxed font-medium">
                            Our proprietary pipeline extracts unstructured financial tables and transforms them into
                            standardized formats. This minimizes human error and biased interpretation of "One-time" vs "Recurring" items.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center text-indigo-600">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Trust & Coverage Scores</h3>
                        <p className="text-slate-600 leading-relaxed font-medium">
                            Instead of "Star Ratings", we provide a Coverage Score. This quantitatively measures how much
                            data was successfully parsed from the filings. Higher scores mean more comprehensive disclosures
                            are available for your analysis.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center text-indigo-600">
                            <Scale size={24} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Regulated Data, Unregulated Platform</h3>
                        <p className="text-slate-600 leading-relaxed font-medium">
                            Fundametrics operates as a technology and data provider. We present raw financial facts in a
                            readable interface. We are not a SEBI registered research analyst because we do not recommend
                            buying or selling any security.
                        </p>
                    </div>
                </section>

                {/* Audit Trail Info */}
                <div className="bg-slate-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl font-black tracking-tighter uppercase mb-6">Source Document Verification</h2>
                        <p className="text-slate-300 font-medium leading-relaxed mb-8">
                            Every financial table on the platform links directly back to the source PDF document.
                            Users are encouraged to click "Source Documents" to verify any specific line item against
                            the original signed filing.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                <span className="text-sm font-medium text-slate-200">Zero manual entry for financial line items.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                <span className="text-sm font-medium text-slate-200">Checksum-verified data pipeline.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                <span className="text-sm font-medium text-slate-200">Historical versions maintained for audit consistency.</span>
                            </li>
                        </ul>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 p-12 opacity-10 animate-pulse">
                        <FileCheck size={200} />
                    </div>
                </div>

                {/* FAQ Style legal note */}
                <section className="space-y-8">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Legal Compliance</h3>
                    <div className="prose prose-slate max-w-none">
                        <p className="text-slate-600 font-medium">
                            The information provided on Fundametrics is for educational and informational purposes only.
                            It does not constitute financial, investment, or legal advice. Trading in securities involves
                            high risk. Always conduct your own research or consult a certified financial advisor before
                            making investment decisions.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AboutDataPage;
