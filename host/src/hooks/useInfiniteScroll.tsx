import { useEffect, useState } from 'react';

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll({
  hasMore,
  loading,
  onLoadMore,
  threshold = 0.1,
  rootMargin = '100px'
}: UseInfiniteScrollOptions) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!element || !hasMore || loading) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [firstEntry] = entries;
        if (firstEntry.isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, hasMore, loading, onLoadMore, threshold, rootMargin]);

  return { setElement };
}

