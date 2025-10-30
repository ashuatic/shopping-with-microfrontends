import { MouseEvent, lazy, Suspense } from 'react';

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

export default function Cart({ items, cartTotal, onUpdateQuantity, onRemove, onClear, onBuy }: CartProps) {
  const Button = lazy(() => import('remoteCommon/Button'));
  const Card = lazy(() => import('remoteCommon/Card'));
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 mb-4"
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600">Add items to your cart to see them here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        <Suspense fallback={<div className="w-24 h-8 bg-gray-200 rounded" />}> 
          <Button onClick={onClear} variant="secondary">Clear Cart</Button>
        </Suspense>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <Suspense key={item.id} fallback={<div className="h-28 bg-gray-100 rounded" />}> 
            <Card className="p-4 flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              <p className="text-lg font-bold text-blue-600 mt-1">Rs {item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                aria-label="Remove from cart"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
            </Card>
          </Suspense>
        ))}
      </div>

      <Suspense fallback={<div className="h-48 bg-gray-100 rounded" />}> 
        <Card className="p-6">
          <div className="space-y-4">
          <div className="flex justify-between text-gray-800">
            <span className="text-lg font-medium">Subtotal</span>
            <span className="text-lg font-medium">Rs {cartTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>Rs {(cartTotal * 0.1).toFixed(0)}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-2xl font-bold text-gray-800">
              <span>Total</span>
              <span>Rs {(cartTotal * 1.1).toFixed(0)}</span>
            </div>
          </div>
          <Button onClick={onBuy}>
            Buy (Cash on Delivery)
          </Button>
          </div>
        </Card>
      </Suspense>
    </div>
  );
}


