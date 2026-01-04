import { useRef } from 'react';

export interface TabDefinition<T extends string> {
  id: T;
  label: string;
}

interface TabNavProps<T extends string> {
  tabs: TabDefinition<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
}

const TabNav = <T extends string>({ tabs, activeTab, onChange }: TabNavProps<T>) => {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (index: number) => {
    const clampedIndex = (index + tabs.length) % tabs.length;
    const target = buttonRefs.current[clampedIndex];
    target?.focus();
  };

  return (
    <nav className="flex flex-wrap" role="tablist" aria-label="Company sections">
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`tab-panel-${tab.id}`}
            ref={(element) => {
              buttonRefs.current[index] = element;
            }}
            className={`tab-btn flex-1 px-4 py-4 text-[11px] font-bold uppercase tracking-[0.15em] transition-all focus:outline-none ${isActive ? 'tab-btn-active' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50/50'
              }`}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') {
                event.preventDefault();
                focusTab(index + 1);
              } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                focusTab(index - 1);
              } else if (event.key === 'Home') {
                event.preventDefault();
                focusTab(0);
              } else if (event.key === 'End') {
                event.preventDefault();
                focusTab(tabs.length - 1);
              } else if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onChange(tab.id);
              }
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};

export default TabNav;
