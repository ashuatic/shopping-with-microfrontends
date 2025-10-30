import { useEffect, useState } from 'react';
import { Product, fetchProducts } from '../services/api';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import ProductGrid from './ProductGrid';

const ITEMS_PER_PAGE = 12;

interface HomeProps {
  productType?: string;
}

export default function Home({ productType }: HomeProps) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await fetchProducts(undefined, productType);
        setAllProducts(fetchedProducts);
        setDisplayedProducts(fetchedProducts.slice(0, ITEMS_PER_PAGE));
        setHasMore(fetchedProducts.length > ITEMS_PER_PAGE);
      } catch (error) {
        console.error('Failed to load products:', error);
        setAllProducts([]);
        setDisplayedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [productType]);

  const loadMore = () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const currentLength = displayedProducts.length;
      const nextProducts = allProducts.slice(
        currentLength,
        currentLength + ITEMS_PER_PAGE
      );
      setDisplayedProducts(prev => [...prev, ...nextProducts]);
      setHasMore(currentLength + nextProducts.length < allProducts.length);
      setLoadingMore(false);
    }, 500);
  };

  const { setElement } = useInfiniteScroll({
    hasMore,
    loading: loadingMore,
    onLoadMore: loadMore
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading products...</span>
        </div>
      </div>
    );
  }

  const categoryTitle = productType 
    ? productType.charAt(0).toUpperCase() + productType.slice(1)
    : 'All Products';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">{categoryTitle}</h2>
        <span className="text-gray-600">{allProducts.length} products</span>
      </div>
      <ProductGrid products={displayedProducts} />
      {hasMore && (
        <div 
          ref={setElement}
          className="flex items-center justify-center py-8"
        >
          {loadingMore && (
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span>Loading more products...</span>
            </div>
          )}
        </div>
      )}
      {!hasMore && displayedProducts.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          No more products to load
        </div>
      )}
    </div>
  );
}

