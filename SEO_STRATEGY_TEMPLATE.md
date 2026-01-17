# 🔍 SEO HEADER STRATEGY: COMPANY FUNDAMENTALS

## Template Logic

### 1. URL Structure
**Format:** `/stocks/{{slugify(company_name)}}-{{symbol}}-fundamentals`
**Example:** `/stocks/tata-motors-TATAMOTORS-fundamentals`
**Why:** Includes full keywords (Company Name + Symbol) in the URL path.

### 2. Title Tag Logic
**Template:** `{{SYMBOL}} Share Price, Fundamentals, Financials & Analysis | Fundametrics`
**Fallback:** `{{COMPANY_NAME}} ({{SYMBOL}}) - Financial Overview | Fundametrics`
**Keywords Targeted:** Share Price, Fundamentals, Financials, Analysis.

### 3. Meta Description Logic
**Template:**
"Analyze {{COMPANY_NAME}} ({{SYMBOL}}) fundamentals. View Balance Sheet, Profit & Loss, PE Ratio, ROE, and shareholding pattern. Detailed financial analysis."
**Length:** ~155 characters (perfect for SERP snippets).

### 4. H1 Header
**Template:** `{{COMPANY_NAME}} ({{SYMBOL}}) – Financial Fundamentals & Analysis`

---

## JSON-LD Schema Template (Dynamic)

```javascript
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Corporation",
      "name": company.name,
      "tickerSymbol": `NSE:${company.symbol}`,
      "legalName": company.name,
    },
    {
      "@type": "WebPage",
      "name": `${company.symbol} Share Price, Fundamentals, Financials & Analysis`,
      "description": `Comprehensive financial analysis of ${company.name}.`
    }
  ]
}
```
