import { useState } from 'react';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { useProducts, useCategories } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import type { Product } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);

  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading } = useProducts(selectedCategory || undefined);
  const { cart, addToCart, updateQuantity, removeFromCart, total, itemCount } = useCart();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header itemCount={itemCount} onCartClick={() => setShowCart(true)} />

      {!categoriesLoading && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductGrid
          products={products}
          loading={productsLoading}
          onSelectProduct={setSelectedProduct}
        />
      </main>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product) => {
            addToCart(product);
          }}
        />
      )}

      {showCart && (
        <Cart
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          total={total}
        />
      )}
    </div>
  );
}

export default App;
