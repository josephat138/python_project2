import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Product, Category } from '../types';

export function useProducts(categorySlug?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        let query = supabase
          .from('products')
          .select(`
            *,
            images:product_images(*)
          `);

        if (categorySlug) {
          const { data: category } = await supabase
            .from('categories')
            .select('id')
            .eq('slug', categorySlug)
            .maybeSingle();

          if (category) {
            query = query.eq('category_id', category.id);
          }
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        const productsWithImages = (data || []).map((product) => ({
          ...product,
          images: (product.images || []).sort(
            (a, b) => a.display_order - b.display_order
          ),
        }));

        setProducts(productsWithImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [categorySlug]);

  return { products, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      setCategories(data || []);
      setLoading(false);
    }

    fetchCategories();
  }, []);

  return { categories, loading };
}

export function useProduct(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase
        .from('products')
        .select(`
          *,
          images:product_images(*)
        `)
        .eq('id', productId)
        .maybeSingle();

      if (data) {
        setProduct({
          ...data,
          images: (data.images || []).sort(
            (a, b) => a.display_order - b.display_order
          ),
        });
      }

      setLoading(false);
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return { product, loading };
}
