import type { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex gap-8 overflow-x-auto py-4">
          <button
            onClick={() => onSelectCategory(null)}
            className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              selectedCategory === null
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.slug)}
              className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                selectedCategory === category.slug
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
