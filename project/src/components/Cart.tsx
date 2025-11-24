import { X, Plus, Minus, Trash2 } from 'lucide-react';
import type { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  total: number;
}

export function Cart({ cart, onClose, onUpdateQuantity, onRemoveItem, total }: CartProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-end"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:w-96 h-full sm:h-[90vh] sm:rounded-l-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-slate-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-slate-500">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 bg-slate-50 rounded-lg p-3"
                >
                  <img
                    src={item.product.images[0]?.image_url}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-900 text-sm mb-1 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-2">
                      ${item.product.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-slate-200 rounded transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-slate-200 rounded transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="ml-auto p-1 hover:bg-red-50 text-red-600 rounded transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 p-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className="w-full bg-slate-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
