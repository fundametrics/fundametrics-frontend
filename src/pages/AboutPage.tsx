const sections = [
  {
    id: 'data-sources',
    title: 'Where our data comes from',
    description:
      'Fundametrics aggregates filings, exchange disclosures, and publicly available market data. Every data point is traceable back to a disclosed source.',
    bullets: [
      'Exchange-provided market feeds with regulatory delay applied',
      'Quarterly and annual financial statements filed with exchanges',
      'Shareholding patterns disclosed to stock exchanges',
      'Corporate action announcements verified against official sources',
    ],
  },
  {
    id: 'methodology',
    title: 'How Fundametrics computes ratios & metrics',
    description:
      'Our computation engine transforms reported numbers into standardised ratios without guesswork. Each calculation is documented, auditable, and designed to avoid inference.',
    bullets: [
      'No forward-looking assumptions, forecasts, or price targets',
      'Every ratio uses reported figures with transparent formulas',
      'Market cap derived from delayed price × reported shares outstanding',
      'Signals are observational—highlighting patterns, not prescriptions',
    ],
  },
  {
    id: 'not-advisory',
    title: 'What Fundametrics is not',
    description:
      'Fundametrics exists to help investors interpret factual information. We explicitly avoid actions that could be mistaken for advice.',
    bullets: [
      'We are not a SEBI registered investment advisor',
      'We do not provide buy/sell/hold recommendations',
      'We do not publish price targets or earnings estimates',
      'We do not offer portfolio management services',
    ],
  },
];

import SEO from '../components/SEO';

const AboutPage = () => {
  return (
    <div className="space-y-12">
      <SEO
        title="About Fundametrics | Institutional Quality Data"
        description="Learn about our facts-first methodology and how we aggregate and normalize financial data for Indian public companies."
        canonical="https://fundametrics.in/about/"
      />
      <header className="max-w-3xl space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">About Fundametrics</p>
        <h1 className="text-3xl font-display font-semibold text-neutral-900">Facts-first financial intelligence</h1>
        <p className="text-neutral-600 text-lg">
          Fundametrics is built for the investor who wants clarity. We aggregate, normalise, and explain company data without adding bias or speculation.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-neutral-200 rounded-xl shadow-subtle p-6 space-y-4">
          <h2 className="text-lg font-semibold text-neutral-900">Our operating principles</h2>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li>• Neutral presentation—fields are descriptive, never suggestive.</li>
            <li>• Transparent sourcing—every figure can be traced to a disclosure.</li>
            <li>• Compliance-first design—disclaimers and delays are non-negotiable.</li>
          </ul>
        </div>
        <div className="bg-white border border-neutral-200 rounded-xl shadow-subtle p-6 space-y-4" id="methodology">
          <h2 className="text-lg font-semibold text-neutral-900">Platform coverage</h2>
          <ul className="grid grid-cols-2 gap-4 text-sm text-neutral-600">
            <li>
              <span className="block text-neutral-500 text-xs uppercase">Companies</span>
              <span className="text-2xl font-semibold text-neutral-900">500+</span>
            </li>
            <li>
              <span className="block text-neutral-500 text-xs uppercase">Fundamental metrics</span>
              <span className="text-2xl font-semibold text-neutral-900">80+</span>
            </li>
            <li>
              <span className="block text-neutral-500 text-xs uppercase">Signals</span>
              <span className="text-2xl font-semibold text-neutral-900">Observational</span>
            </li>
            <li>
              <span className="block text-neutral-500 text-xs uppercase">Advisory</span>
              <span className="text-2xl font-semibold text-neutral-900">None</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-10">
        {sections.map((section) => (
          <div key={section.id} id={section.id} className="bg-white border border-neutral-200 rounded-xl shadow-subtle p-6">
            <h2 className="text-xl font-semibold text-neutral-900">{section.title}</h2>
            <p className="text-neutral-600 mt-2 text-sm leading-relaxed">{section.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600">
              {section.bullets.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="bg-neutral-900 text-neutral-100 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-semibold">Reminder</h2>
        <p className="text-sm text-neutral-200">
          Fundametrics provides information so that you can perform your own analysis. We do not recommend securities or strategies. Consult a qualified advisor before acting on financial information.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
