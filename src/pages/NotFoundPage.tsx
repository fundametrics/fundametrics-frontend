import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-6">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Error 404</p>
        <h1 className="text-3xl font-display font-semibold text-neutral-900">This page is unavailable</h1>
        <p className="text-neutral-600 text-sm">
          We could not find the page you were looking for. Return to the dashboard to continue exploring factual financial data.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center px-5 py-2 rounded-md bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800"
      >
        Go to home
      </Link>
    </div>
  );
};

export default NotFoundPage;
