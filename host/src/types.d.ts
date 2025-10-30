declare module 'remoteHome/Home' {
  import { ComponentType } from 'react';
  export interface HomeProps {
    productType?: string;
  }
  const Home: ComponentType<HomeProps>;
  export default Home;
}

declare module 'remoteCart/Cart' {
  import { ComponentType, MouseEvent } from 'react';
  export interface CartItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
  }
  export interface CartProps {
    items: CartItem[];
    cartTotal: number;
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
    onClear: () => void;
    onBuy: (e?: MouseEvent) => void;
  }
  const Cart: ComponentType<CartProps>;
  export default Cart;
}

declare module 'remoteProfile/Profile' {
  import { ComponentType } from 'react';
  const Profile: ComponentType;
  export default Profile;
}

declare module 'remoteOrders/Orders' {
  import { ComponentType } from 'react';
  export interface OrderItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }
  export interface Order {
    id: number;
    date: string | number | Date;
    status: 'pending' | 'delivered' | 'cancelled';
    total: number;
    items: OrderItem[];
  }
  export interface OrdersProps {
    orders: Order[];
  }
  const Orders: ComponentType<OrdersProps>;
  export default Orders;
}

declare module 'remoteCommon/Button' {
  import { ComponentType, ButtonHTMLAttributes } from 'react';
  export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
  }
  const Button: ComponentType<ButtonProps>;
  export default Button;
}

declare module 'remoteCommon/Card' {
  import { ComponentType, ReactNode } from 'react';
  export interface CardProps {
    title?: string;
    description?: string;
    children: ReactNode;
    className?: string;
  }
  const Card: ComponentType<CardProps>;
  export default Card;
}

declare module 'remoteCommon/Header' {
  import { ComponentType } from 'react';
  export interface NavItem { path: string; title: string; }
  export interface HeaderProps {
    headerConfig: Record<string, NavItem>;
    onCategorySelect?: (category: string | undefined) => void;
    activeCategory?: string;
    onCartClick?: () => void;
    cartCount?: number;
    onToggleLeftNav?: () => void;
  }
  const Header: ComponentType<HeaderProps>;
  export default Header;
}

declare module 'remoteCommon/LeftNav' {
  import { ComponentType } from 'react';
  export interface NavItem { path: string; title: string; }
  export interface LeftNavProps {
    leftNavConfig: Record<string, NavItem>;
    className?: string;
    isOpen: boolean;
    cartCount?: number;
    ordersCount?: number;
    onItemClick: (key: string, path: string) => void;
  }
  const LeftNav: ComponentType<LeftNavProps>;
  export default LeftNav;
}

declare module 'remoteCommon/ErrorBoundary' {
  import { ComponentType, ReactNode } from 'react';
  export interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: any) => void;
  }
  const ErrorBoundary: ComponentType<ErrorBoundaryProps>;
  export default ErrorBoundary;
}

