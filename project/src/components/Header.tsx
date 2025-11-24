import { ShoppingCart, Store } from 'lucide-react';

interface HeaderProps {
  itemCount: number;
  onCartClick: () => void;
}

export function Header({ itemCount, onCartClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Store className="w-8 h-8 text-slate-900" />
            <h1 className="text-2xl font-bold text-slate-900">StyleHub</h1>
          </div>

          <button
            onClick={onCartClick}
            className="relative p-2 text-slate-700 hover:text-slate-900 transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
