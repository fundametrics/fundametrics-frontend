import { FC } from 'react';
import { Users } from 'lucide-react';

interface ManagementMember {
    name: string;
    designation: string;
}

interface ManagementSectionProps {
    management?: ManagementMember[];
}

const ManagementSection: FC<ManagementSectionProps> = ({ management }) => {
    if (!management || management.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <Users size={20} className="text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest leading-none">Key Management</h3>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5 block">Leadership & Governance</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                        Total {management.length} Members
                    </span>
                </div>
            </div>

            <div className="relative group">
                <div className="flex overflow-x-auto pb-6 gap-5 snap-x snap-mandatory scrollbar-hide no-scrollbar">
                    {management.map((member, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-80 h-52 snap-start premium-card p-6 bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300 group/card"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover/card:bg-indigo-50 group-hover/card:border-indigo-100 transition-colors">
                                    <span className="text-sm font-black text-slate-600 group-hover/card:text-indigo-600">
                                        {member.name.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest group-hover/card:text-indigo-600 transition-colors line-clamp-2 leading-relaxed">
                                        {member.name}
                                    </h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 leading-relaxed line-clamp-3">
                                        {member.designation || 'Senior Executive'}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest group-hover/card:text-indigo-300">Verified Profile</span>
                                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-200 animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Fade indicators for scroll */}
                <div className="absolute top-0 right-0 bottom-6 w-20 bg-gradient-to-l from-slate-50/50 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity" />
                <div className="absolute top-0 left-0 bottom-6 w-20 bg-gradient-to-r from-slate-50/50 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity" />
            </div>
        </div>
    );
};

export default ManagementSection;
