export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
}

export async function fetchProducts(category?: string, type?: string): Promise<Product[]> {
  let url = 'http://localhost:3000/api/products';
  const params = new URLSearchParams();

  const filterParam = category || type;
  if (filterParam && filterParam !== 'all') {
    params.append('type', filterParam);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ApiResponse<Product[]> = await response.json();
  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data;
}


