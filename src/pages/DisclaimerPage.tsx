const paragraphs = [
  'Fundametrics is a technology platform that aggregates and presents factual financial information sourced from public filings, regulated exchanges, and company disclosures. The content is provided on an “as is” basis for informational and educational purposes only.',
  'Fundametrics is not a SEBI registered investment advisor, research analyst, or portfolio manager. We do not provide investment advice, recommendations, or endorsements with respect to any securities, financial products, or investment strategies. Nothing on this platform should be interpreted as a solicitation to buy, sell, or hold any securities.',
  'While we endeavour to ensure accuracy, completeness, and timeliness, Fundametrics makes no representations or warranties, express or implied, regarding the completeness, accuracy, reliability, suitability, or availability of the information presented. Market data may be delayed in accordance with exchange regulations. Users are responsible for verifying any information before relying on it.',
  'Investing in securities carries inherent risks, including the possible loss of principal. Past performance is not indicative of future results. Before making any financial or investment decisions, you should consider consulting a qualified financial advisor registered with SEBI or the appropriate regulatory authority.',
  'By using the Fundametrics platform, you acknowledge and agree that Fundametrics, its affiliates, employees, and partners shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your access to, use of, or reliance on the information provided.',
  'The Fundametrics platform may contain links to third-party websites or resources. Fundametrics does not endorse, control, or assume responsibility for the content, products, or services offered by third parties. Accessing third-party sites is at your own discretion and risk.',
  'Fundametrics reserves the right to modify, suspend, or discontinue any part of the platform or the information provided at any time without prior notice. Continued use of the platform after updates to this disclaimer constitutes acceptance of those changes.'
];

const DisclaimerPage = () => {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Legal Notice</p>
        <h1 className="text-3xl font-display font-semibold text-neutral-900">Comprehensive disclaimer</h1>
        <p className="text-neutral-600 text-sm">
          Please read this disclaimer carefully before using the Fundametrics platform. Your continued use implies acceptance of these terms.
        </p>
      </header>

      <section className="bg-white border border-neutral-200 rounded-xl shadow-subtle p-6 space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-sm leading-relaxed text-neutral-600">
            {paragraph}
          </p>
        ))}
        <div className="bg-neutral-900 text-neutral-100 rounded-lg p-4 text-sm">
          <p className="font-semibold">Important:</p>
          <p>
            If you require personalised investment advice, please engage a SEBI registered investment advisor or other qualified professional.
          </p>
        </div>
        <p className="text-xs text-neutral-400">Last updated: 22 December 2025</p>
      </section>
    </div>
  );
};

export default DisclaimerPage;
