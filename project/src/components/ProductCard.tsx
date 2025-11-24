import { useState } from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mainImage = product.images[currentImageIndex]?.image_url || product.images[0]?.image_url;

  return (
    <div
      className="group cursor-pointer"
      onClick={() => onSelect(product)}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100 mb-3">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {product.images.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'bg-white w-4'
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <h3 className="text-sm font-medium text-slate-900 mb-1 group-hover:text-slate-600 transition-colors">
        {product.name}
      </h3>
      <p className="text-sm text-slate-900 font-semibold">
        ${product.price.toFixed(2)}
      </p>
    </div>
  );
}
