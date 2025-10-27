import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { fetchAppConfig, AppConfig } from './services/api';
import { LayoutProvider } from './context/LayoutContext';
import { CartProvider } from './context/CartContext';
import { OrdersProvider } from './context/OrdersContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import LeftNav from './components/LeftNav';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
import OrdersPage from './components/OrdersPage';
import ProfilePage from './components/ProfilePage';
import './App.css';

function AppContent() {
  const [appConfig, setAppConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const params = useParams();
  
  // Get category from URL
  const activeCategory = params.productType;

  useEffect(() => {
    // Fetch app configuration on startup
    const loadConfig = async () => {
      try {
        const config = await fetchAppConfig();
        setAppConfig(config);
      } catch (err) {
        setError('Failed to load application configuration');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  const handleCategorySelect = (category: string | undefined) => {
    if (category) {
      navigate(`/${category}`);
    } else {
      navigate('/');
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  if (error || !appConfig) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Failed to Load Application</h1>
          <p className="text-gray-600 mb-4">{error || 'Unknown error'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <ErrorBoundary>
        <Header
          headerConfig={appConfig.headerConfig}
          activeCategory={activeCategory}
          onCategorySelect={handleCategorySelect}
          onCartClick={handleCartClick}
        />
      </ErrorBoundary>

      <div className="flex flex-1">
        {/* Left Navigation */}
        <ErrorBoundary>
          <LeftNav leftNavConfig={appConfig.leftNavConfig} className="lg:block" />
        </ErrorBoundary>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <ErrorBoundary>
              <Routes>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/:productType" element={<HomePage />} />
                <Route path="/" element={<HomePage />} />
              </Routes>
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <OrdersProvider>
      <CartProvider>
        <LayoutProvider>
          <Router>
            <AppContent />
          </Router>
        </LayoutProvider>
      </CartProvider>
    </OrdersProvider>
  );
}

export default App;

