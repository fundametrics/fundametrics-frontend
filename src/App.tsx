import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';

// Lazy load pages for better FCP
const LandingPage = lazy(() => import('./pages/LandingPage'));
const StocksPage = lazy(() => import('./pages/StocksPage'));
const CompanyPage = lazy(() => import('./pages/CompanyPage'));
const WatchlistPage = lazy(() => import('./pages/WatchlistPage'));
const IndexPage = lazy(() => import('./pages/IndexPage'));
const IndicesListPage = lazy(() => import('./pages/IndicesListPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const AboutDataPage = lazy(() => import('./pages/AboutDataPage'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'));
const MethodologyPage = lazy(() => import('./pages/MethodologyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const DataSourcesPage = lazy(() => import('./pages/DataSourcesPage'));
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'));

import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  console.log("VERSION: Landing Page V13 (Ticker Fixed Below Nav)");
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="stocks" element={<StocksPage />} />
          <Route path="stocks/:symbol" element={<CompanyPage />} />
          <Route path="watchlist" element={<WatchlistPage />} /> {/* Phase 23: Watchlist */}
          <Route path="indices" element={<IndicesListPage />} />
          <Route path="indices/:indexId" element={<IndexPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="about-data" element={<AboutDataPage />} />
          <Route path="data-sources" element={<DataSourcesPage />} /> {/* Phase 4.2: Trust Signal */}

          {/* Phase 4.2: Authority Silos */}
          <Route path="pe-ratio" element={<GlossaryPage />} />
          <Route path="roe" element={<GlossaryPage />} />
          <Route path="roce" element={<GlossaryPage />} />
          <Route path="debt-equity-ratio" element={<GlossaryPage />} />
          <Route path="fundamental-analysis" element={<GlossaryPage />} />

          <Route path="admin" element={<AdminPage />} />
          <Route path="disclaimer" element={<DisclaimerPage />} />
          <Route path="methodology" element={<MethodologyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
