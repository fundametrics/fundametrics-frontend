import type { FC } from 'react';
import { Building2 } from 'lucide-react';

interface AboutSectionProps {
    aboutText?: string;
}

const AboutSection: FC<AboutSectionProps> = ({ aboutText }) => {
    if (!aboutText) return null;

    return (
        <div className="premium-card p-8 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <Building2 size={20} className="text-indigo-600" />
                </div>
                <div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest leading-none">About Company</h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1 block">Entity Profile</span>
                </div>
            </div>

            <p className="text-sm font-medium text-slate-600 leading-loose max-w-4xl text-justify">
                {aboutText}
            </p>
        </div>
    );
};

export default AboutSection;
