import type { FC } from 'react';
import type { Reliability } from '../types';
import { FileText, Shield, Clock } from 'lucide-react';

interface DocumentsSectionProps {
  reliability?: Reliability | null;
  metadata?: any;
}

const DocumentsSection: FC<DocumentsSectionProps> = ({ metadata }) => (
  <div className="space-y-6">
    <div className="premium-card p-6 bg-white border border-slate-200 shadow-xl shadow-slate-100/50 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <FileText size={20} className="text-indigo-600" />
        <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Source Documents</h4>
      </div>

      <div className="space-y-3">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Latest Annual Disclosure</span>
          <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest bg-white px-2 py-1 rounded border border-slate-200">Processed</span>
        </div>
        <p className="text-[10px] font-medium text-slate-400 leading-relaxed italic">
          Data extracted from original public company filings.
        </p>
      </div>
    </div>

    <div className="bg-slate-900 rounded-2xl p-6 text-white">
      <p className="text-[11px] font-medium leading-relaxed opacity-60">
        This platform provides structured historical company data. Records are factual and intended for information purposes only.
      </p>
    </div>
  </div>
);

export default DocumentsSection;
