import type { FC } from 'react';
import { Newspaper, ExternalLink, TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react';

interface NewsItem {
    title: string;
    url: string;
    published_at: string;
    source: string;
    sentiment: 'positive' | 'negative' | 'neutral';
}

interface NewsSectionProps {
    news?: NewsItem[];
}

const NewsSection: FC<NewsSectionProps> = ({ news }) => {
    if (!news || news.length === 0) {
        return (
            <div className="premium-card p-12 text-center text-slate-400 bg-white border border-slate-200">
                <p className="text-sm font-medium">No recent news disclosures found in the registry.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8" id="news">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item, idx) => (
                    <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col premium-card p-6 bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                    {item.source}
                                </span>
                            </div>
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter ${item.sentiment === 'positive' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                    item.sentiment === 'negative' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                        'bg-slate-50 text-slate-500 border border-slate-100'
                                }`}>
                                {item.sentiment === 'positive' ? <TrendingUp size={10} /> :
                                    item.sentiment === 'negative' ? <TrendingDown size={10} /> :
                                        <Minus size={10} />}
                                {item.sentiment}
                            </div>
                        </div>

                        <h4 className="text-sm font-black text-slate-900 leading-relaxed group-hover:text-indigo-600 transition-colors line-clamp-3 mb-6">
                            {item.title}
                        </h4>

                        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-slate-400">
                                <Clock size={12} />
                                <span className="text-[10px] font-bold uppercase tracking-tight">
                                    {new Date(item.published_at).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                                <ExternalLink size={14} />
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <div className="flex justify-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                    Live Registry Feed — Machine Audited News
                </p>
            </div>
        </div>
    );
};

export default NewsSection;
