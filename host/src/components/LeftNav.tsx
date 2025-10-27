import { useNavigate } from 'react-router-dom';
import { NavItem } from '../services/api';
import { useLayout } from '../context/LayoutContext';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';

interface LeftNavProps {
  leftNavConfig: Record<string, NavItem>;
  className?: string;
}

export default function LeftNav({ leftNavConfig, className = '' }: LeftNavProps) {
  const navigate = useNavigate();
  const { isLeftNavOpen } = useLayout();
  const { cartCount } = useCart();
  const { orders } = useOrders();
  const navItems = Object.entries(leftNavConfig);

  const handleItemClick = (key: string, path: string) => {
    // Close the mobile nav when item is clicked
    // Navigation will be handled based on the key
    if (key === 'profile') {
      navigate('/profile');
    } else if (key === 'cart') {
      navigate('/cart');
    } else if (key === 'orders') {
      navigate('/orders');
    } else {
      navigate(path);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isLeftNavOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => {}}
        />
      )}

      {/* Left Navigation */}
      <aside
        className={`fixed lg:sticky top-0 h-screen bg-white border-r border-gray-200 p-6 transform transition-transform duration-300 ease-in-out z-50 ${
          isLeftNavOpen ? 'translate-x-0' : '-translate-x-full'
        } ${className}`}
      >
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
        </div>
        
        <nav className="space-y-2">
          {navItems.map(([key, item]) => (
            <button
              key={key}
              onClick={() => handleItemClick(key, item.path)}
              className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group"
            >
              <span className="flex-1 font-medium">{item.title}</span>
              {/* Show badges for cart and orders */}
              {key === 'cart' && cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              {key === 'orders' && orders.length > 0 && (
                <span className="bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {orders.length}
                </span>
              )}
              <svg
                className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}

