import React from 'react';
import { Database, ShieldCheck, Clock, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const DataSourcesPage = () => {
    return (
        <>
            <Helmet>
                <title>Data Sources & Methodology | Fundametrics</title>
                <meta name="description" content="Understand how Fundametrics aggregates, processes, and verifies financial data from NSE and BSE public filings. Our commitment to transparency and accuracy." />
                <link rel="canonical" href="https://fundametrics.in/data-sources" />
            </Helmet>

            <div className="bg-white min-h-screen py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-16">

                    <div className="text-center space-y-6">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Data Integrity & Sources</h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            We believe in radical transparency. Here is exactly where our data comes from and how it is processed.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                                <Database className="text-indigo-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Primary Sources</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Fundametrics aggregates data exclusively from official public disclosures made to the
                                <strong> National Stock Exchange of India (NSE)</strong> and <strong>Bombay Stock Exchange (BSE)</strong>.
                                This includes:
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-700 font-medium list-disc pl-4">
                                <li>Annual Reports (PDF/XBRL)</li>
                                <li>Quarterly Financial Results</li>
                                <li>Shareholding Pattern filings</li>
                                <li>Corporate Action announcements</li>
                            </ul>
                        </div>

                        <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                                <ShieldCheck className="text-emerald-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Verification Process</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Our "Trust Score" algorithm verifies data through a multi-step process:
                            </p>
                            <ol className="mt-4 space-y-3 text-sm text-slate-700 list-decimal pl-4">
                                <li><span className="font-bold">Extraction:</span> OCR and text parsing of raw filings.</li>
                                <li><span className="font-bold">Normalization:</span> Mapping varied accounting terms to a standard taxonomy.</li>
                                <li><span className="font-bold">Cross-Check:</span> Comparing derived metrics (like Assets - Liabilities = Equity) to ensure accounting balance.</li>
                                <li><span className="font-bold">Audit Trace:</span> Linking every data point back to its original source document.</li>
                            </ol>
                        </div>
                    </div>

                    <div className="p-8 border border-slate-200 rounded-[2rem]">
                        <div className="flex items-start gap-4">
                            <Clock className="text-slate-400 mt-1" size={24} />
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">Update Frequency</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Our systems scan for new filings every 15 minutes during market hours.
                                    Financial statements are typically updated within 2-4 hours of public release.
                                    Price data is delayed by 15 minutes as per exchange regulations for non-trading platforms.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center pt-10 border-t border-slate-100">
                        <Link to="/disclaimer" className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
                            Read our full Disclaimer
                        </Link>
                    </div>

                </div>
            </div>
        </>
    );
};

export default DataSourcesPage;
