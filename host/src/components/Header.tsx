import { useState } from 'react';
import { NavItem } from '../services/api';
import { useLayout } from '../context/LayoutContext';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  headerConfig: Record<string, NavItem>;
  onCategorySelect?: (category: string | undefined) => void;
  activeCategory?: string;
  onCartClick?: () => void;
}

export default function Header({ headerConfig, onCategorySelect, activeCategory, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleLeftNav } = useLayout();
  const { cartCount } = useCart();

  const navItems = Object.entries(headerConfig);

  const handleCategoryClick = (category: string) => {
    onCategorySelect?.(category);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center h-16 pl-[10px]">
        <div className="flex items-center flex-1">
          {/* Left Nav Toggle Button */}
          <button
            onClick={toggleLeftNav}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-4"
            aria-label="Toggle left navigation"
          >
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo */}
          <button
            onClick={() => onCategorySelect?.('')}
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <h1 className="text-2xl font-bold text-blue-600">Shop</h1>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 ml-6">
            {navItems.map(([key, item]) => (
              <button
                key={key}
                onClick={() => handleCategoryClick(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeCategory === key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Cart Icon */}
        <div className="flex items-center gap-4 pr-4">
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Shopping cart"
            >
              <svg
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="px-4 pb-4">
          <nav className="md:hidden space-y-2">
            {navItems.map(([key, item]) => (
              <button
                key={key}
                onClick={() => handleCategoryClick(key)}
                className={`block w-full px-4 py-2 rounded-lg text-left font-medium transition-colors ${
                  activeCategory === key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

