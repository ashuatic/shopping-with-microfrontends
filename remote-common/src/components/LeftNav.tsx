export interface NavItem {
  path: string;
  title: string;
}

export interface LeftNavProps {
  leftNavConfig: Record<string, NavItem>;
  className?: string;
  isOpen: boolean;
  cartCount?: number;
  ordersCount?: number;
  onItemClick: (key: string, path: string) => void;
}

export default function LeftNav({ leftNavConfig, className = '', isOpen, cartCount = 0, ordersCount = 0, onItemClick }: LeftNavProps) {
  const navItems = Object.entries(leftNavConfig);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 h-screen bg-white border-r border-gray-200 p-6 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${className}`}
      >
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
        </div>
        
        <nav className="space-y-2">
          {navItems.map(([key, item]) => (
            <button
              key={key}
              onClick={() => onItemClick(key, item.path)}
              className="w-full flex items-center px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors group"
            >
              <span className="flex-1 font-medium">{item.title}</span>
              {key === 'cart' && cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              {key === 'orders' && ordersCount > 0 && (
                <span className="bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {ordersCount}
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


