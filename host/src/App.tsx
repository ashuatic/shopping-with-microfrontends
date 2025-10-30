import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { fetchAppConfig, AppConfig } from './services/api';
import { LayoutProvider, useLayout } from './context/LayoutContext';
import { CartProvider, useCart } from './context/CartContext';
import { OrdersProvider, useOrders } from './context/OrdersContext';
const RemoteErrorBoundary = lazy(() => import('remoteCommon/ErrorBoundary'));
const RemoteHeader = lazy(() => import('remoteCommon/Header'));
const RemoteLeftNav = lazy(() => import('remoteCommon/LeftNav'));
const RemoteHome = lazy(() => import('remoteHome/Home'));
const RemoteCart = lazy(() => import('remoteCart/Cart'));
// Removed local CartPage in favor of remote-cart
const RemoteProfile = lazy(() => import('remoteProfile/Profile'));
const RemoteOrders = lazy(() => import('remoteOrders/Orders'));
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

  const CartRoute = () => {
    const { items, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
    const { addOrder } = useOrders();
    const nav = useNavigate();

    const handleBuy = () => {
      const total = cartTotal * 1.1;
      addOrder(items, total);
      clearCart();
      nav('/orders');
    };

    return (
      <Suspense fallback={<div className="py-20 text-center text-gray-600">Loading cart...</div>}>
        <RemoteCart
          items={items}
          cartTotal={cartTotal}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onClear={clearCart}
          onBuy={handleBuy}
        />
      </Suspense>
    );
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
      <RemoteErrorBoundary>
        <Suspense fallback={<div className="h-16" />}>
          <RemoteHeader
            headerConfig={appConfig.headerConfig}
            activeCategory={activeCategory}
            onCategorySelect={handleCategorySelect}
            onCartClick={handleCartClick}
            cartCount={useCart().cartCount}
            onToggleLeftNav={useLayout().toggleLeftNav}
          />
        </Suspense>
      </RemoteErrorBoundary>

      <div className="flex flex-1">
        {/* Left Navigation */}
        <RemoteErrorBoundary>
          <Suspense fallback={<div className="w-64" />}>
            <RemoteLeftNav
              leftNavConfig={appConfig.leftNavConfig}
              className="lg:block"
              isOpen={useLayout().isLeftNavOpen}
              cartCount={useCart().cartCount}
              ordersCount={useOrders().orders.length}
              onItemClick={(key, path) => {
                if (key === 'profile') {
                  navigate('/profile');
                } else if (key === 'cart') {
                  navigate('/cart');
                } else if (key === 'orders') {
                  navigate('/orders');
                } else {
                  navigate(path);
                }
              }}
            />
          </Suspense>
        </RemoteErrorBoundary>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <RemoteErrorBoundary>
              <Routes>
                <Route
                  path="/profile"
                  element={
                    <Suspense fallback={<div className="py-20 text-center text-gray-600">Loading profile...</div>}>
                      <RemoteProfile />
                    </Suspense>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <Suspense fallback={<div className="py-20 text-center text-gray-600">Loading orders...</div>}>
                      <RemoteOrders orders={useOrders().orders} />
                    </Suspense>
                  }
                />
                <Route path="/cart" element={<CartRoute />} />
                <Route
                  path="/:productType"
                  element={
                    <Suspense fallback={<div className="py-20 text-center text-gray-600">Loading home...</div>}>
                      <RemoteHome productType={activeCategory} />
                    </Suspense>
                  }
                />
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<div className="py-20 text-center text-gray-600">Loading home...</div>}>
                      <RemoteHome productType={activeCategory} />
                    </Suspense>
                  }
                />
              </Routes>
            </RemoteErrorBoundary>
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

