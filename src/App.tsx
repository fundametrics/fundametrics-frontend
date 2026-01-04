import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import LandingPage from './pages/LandingPage';
import StocksPage from './pages/StocksPage';
import CompanyPage from './pages/CompanyPage';
import WatchlistPage from './pages/WatchlistPage'; // Phase 23: Watchlist
import IndexPage from './pages/IndexPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import AboutDataPage from './pages/AboutDataPage';
import DisclaimerPage from './pages/DisclaimerPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="stocks" element={<StocksPage />} />
        <Route path="stocks/:symbol" element={<CompanyPage />} />
        <Route path="watchlist" element={<WatchlistPage />} /> {/* Phase 23: Watchlist */}
        <Route path="indices/:indexId" element={<IndexPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="about-data" element={<AboutDataPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="disclaimer" element={<DisclaimerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
