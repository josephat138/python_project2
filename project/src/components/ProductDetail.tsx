import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import type { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div>
            <div className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[selectedImageIndex]?.image_url}
                alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
                    {selectedImageIndex + 1} / {product.images.length}
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-6 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    index === selectedImageIndex
                      ? 'border-slate-900'
                      : 'border-transparent hover:border-slate-300'
                  }`}
                >
                  <img
                    src={image.image_url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <p className="text-3xl font-bold text-slate-900 mb-4">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAddedToCart}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                isAddedToCart
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-slate-900 hover:bg-slate-800'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {isAddedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </button>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-3">Product Details</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Free shipping on orders over $100</li>
                <li>30-day return policy</li>
                <li>Secure checkout</li>
                <li>Customer support available 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
