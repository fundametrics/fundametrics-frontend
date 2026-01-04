import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ComputedMetric } from '../types';
import { X, ShieldCheck, Database, Info } from 'lucide-react';

interface ExplainabilityModalProps {
  open: boolean;
  onClose: () => void;
  metric: ComputedMetric | null;
}

const ExplainabilityModal = ({ open, onClose, metric }: ExplainabilityModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open || !metric) return null;

  const { explainability, metric_name, trust_score, source_provenance } = metric;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-end md:items-stretch md:justify-end bg-slate-900/40 backdrop-blur-sm transition-all animate-in fade-in duration-300">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative w-full md:max-w-xl max-h-[90vh] md:h-full bg-white shadow-2xl animate-in slide-in-from-bottom md:slide-in-from-right duration-500 overflow-y-auto custom-scrollbar rounded-t-3xl md:rounded-none">

        {/* Mobile Sheet Handle */}
        <div className="md:hidden pt-3 pb-1 flex justify-center sticky top-0 bg-white z-20">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        <header className="sticky top-0 md:top-0 z-10 bg-white/80 backdrop-blur-md px-6 md:px-8 py-4 md:py-6 border-b border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] bg-indigo-50 px-2 py-0.5 rounded">
                Audit Trace
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Version 2.4.0</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{metric_name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-all"
          >
            <X size={20} />
          </button>
        </header>

        <div className="p-6 md:p-8 space-y-8 md:space-y-10 pb-safe">
          {/* Trust Score Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="premium-card p-4 bg-slate-50 border-none">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Confidence Score</p>
              <p className="text-2xl font-bold text-slate-900">{(metric.confidence ?? 0 * 100).toFixed(0)}%</p>
            </div>
            <div className="premium-card p-4 bg-slate-50 border-none text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Trust Grade</p>
              <p className="text-2xl font-bold text-indigo-600">Grade {trust_score?.grade || '—'}</p>
            </div>
          </div>

          {/* Formula */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-indigo-500" />
              Derivation Formula
            </h3>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 font-mono text-sm text-slate-700 leading-relaxed overflow-x-auto break-words">
              {explainability?.formula || 'Proprietary Fundametrics multi-factor aggregation.'}
            </div>
          </section>

          {/* Inputs Provenance */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Database size={14} className="text-indigo-500" />
              Input Provenance
            </h3>
            <div className="space-y-3">
              {(source_provenance?.inputs_provenance || []).map((prov, idx) => (
                <div key={idx} className="premium-card p-4 flex justify-between items-center group hover:border-indigo-100 transition-colors">
                  <div>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600">{prov.metric}</p>
                    <p className="text-[10px] font-medium text-slate-400 uppercase">{prov.source.source} • {prov.source.statement_scope}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest block">Confidence</span>
                    <span className="text-xs font-bold text-slate-600">High</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Assumptions & Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-50">
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Methodology Assumptions</h4>
              <ul className="space-y-2">
                {(explainability?.assumptions || []).map((a, i) => (
                  <li key={i} className="text-xs text-slate-600 flex gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1 flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Standard Limitations</h4>
              <ul className="space-y-2">
                {(explainability?.limitations || []).map((l, i) => (
                  <li key={i} className="text-xs text-slate-400 italic flex gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-200 mt-1 flex-shrink-0" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <footer className="pt-10 border-t border-slate-50">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-3 text-slate-500">
              <Info size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] leading-relaxed">
                Metric traceability provided under Fundametrics Phase 19 Integrity Standards.
                Calculations are based on 3rd-party electronic filings and are for informational purpose only.
                Zero predictive bias applied.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ExplainabilityModal;
