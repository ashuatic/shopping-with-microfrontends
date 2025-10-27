import { lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// This is for standalone preview
const Home = lazy(() => import('./components/Home'));

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <ErrorBoundary>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <Home />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;

