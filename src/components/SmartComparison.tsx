import type { FC } from 'react';
import { ShieldCheck, Info, Lock } from 'lucide-react';
import TrustBadge from './TrustBadge';

interface PeerRow {
    name: string;
    symbol: string;
    pe: number;
    market_cap: string;
    trust_grade: 'A' | 'B' | 'C' | 'D';
    confidence_tier: number; // 1 (High), 2 (Medium), 3 (Low)
}

interface SmartComparisonProps {
    currentSymbol: string;
    peers: PeerRow[];
    sectorMedianPE: number;
    currentConfidenceTier: number;
}

const SmartComparison: FC<SmartComparisonProps> = ({ currentSymbol, peers, sectorMedianPE, currentConfidenceTier }) => {
    return (
        <div className="premium-card overflow-hidden bg-white border border-slate-200 shadow-xl shadow-slate-100">
            <div className="px-6 py-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none">Sector Intelligence Comparison</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">Benchmarked vs {peers.length} Sector Peers</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded text-[9px] font-black text-slate-500 uppercase tracking-[0.1em]">
                    Segment: G-Industrial
                </div>
            </div>

            <div className="p-0 overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/30 border-b border-slate-100">
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Enterprise</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">P/E Ratio</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Market Cap</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Audit Grade</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Intel Lock</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {peers.map((peer) => {
                            const isBlocked = Math.abs(currentConfidenceTier - peer.confidence_tier) > 1;
                            const relVal = ((peer.pe / (sectorMedianPE || 1)) - 1) * 100;

                            return (
                                <tr key={peer.symbol} className={`${peer.symbol === currentSymbol ? 'bg-indigo-50/40' : 'hover:bg-slate-50/50'} transition-colors group`}>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-900 leading-none">{peer.name}</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 group-hover:text-indigo-600 transition-colors">{peer.symbol}</span>
                                        </div>
                                    </td>
                                    <td className={`px-6 py-5 text-right font-mono text-sm font-black ${isBlocked ? 'text-slate-200' : 'text-slate-900'}`}>
                                        {isBlocked ? '—' : (peer.pe != null ? peer.pe.toFixed(0) : '—')}
                                    </td>
                                    <td className={`px-6 py-5 text-right font-mono text-[11px] font-black ${isBlocked ? 'text-slate-200' : 'text-slate-600'}`}>
                                        {peer.market_cap != null ? peer.market_cap : '—'}
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex justify-end">
                                            <TrustBadge grade={peer.trust_grade} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        {isBlocked ? (
                                            <div className="flex items-center justify-end gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100" title="Data confidence mismatch prevents safe comparison">
                                                <Lock size={10} className="text-slate-300" />
                                                Blocked
                                            </div>
                                        ) : (
                                            <div className={`text-[10px] font-black uppercase tracking-widest ${relVal > 0 ? 'text-indigo-600' : 'text-emerald-600'}`}>
                                                {relVal > 0 ? `+${relVal.toFixed(0)}%` : `${relVal.toFixed(0)}%`}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {(peers.some(p => Math.abs(currentConfidenceTier - p.confidence_tier) > 1) || peers.length === 0) && (
                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center gap-3">
                    <Lock size={14} className="text-slate-400" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] leading-relaxed">
                        Data Integrity Notice: Some comparisons may be restricted to prevent inference leakage between disparate data confidence tiers.
                    </p>
                </div>
            )}
        </div>
    );
};

export default SmartComparison;
