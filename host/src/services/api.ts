export interface NavItem {
  path: string;
  title: string;
}

export interface AppConfig {
  version: string;
  headerConfig: Record<string, NavItem>;
  leftNavConfig: Record<string, NavItem>;
  secondaryConfig: Record<string, NavItem>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export async function fetchAppConfig(version?: string): Promise<AppConfig> {
  try {
    const url = version 
      ? `http://localhost:3000/api/app-config?version=${version}`
      : 'http://localhost:3000/api/app-config';
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse<AppConfig> = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching app config:', error);
    throw error;
  }
}

export async function fetchProducts(category?: string, type?: string): Promise<Product[]> {
  try {
    let url = 'http://localhost:3000/api/products';
    const params = new URLSearchParams();
    
    // Use category first, then type as fallback
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
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
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

// Mock product data - replace with actual API call later
export function getMockProducts(): Product[] {
  return [
    // Clothing
    {
      id: 1,
      name: 'Cotton T-Shirt',
      description: 'Comfortable cotton t-shirt',
      price: 2499,
      image: 'https://via.placeholder.com/300x300?text=Clothing+1',
      category: 'clothing',
      inStock: true,
      rating: 4.5
    },
    {
      id: 2,
      name: 'Denim Jeans',
      description: 'Classic fit denim jeans',
      price: 4199,
      image: 'https://via.placeholder.com/300x300?text=Clothing+2',
      category: 'clothing',
      inStock: true,
      rating: 4.8
    },
    {
      id: 3,
      name: 'Summer Dress',
      description: 'Elegant summer dress',
      price: 4999,
      image: 'https://via.placeholder.com/300x300?text=Clothing+3',
      category: 'clothing',
      inStock: true,
      rating: 4.3
    },
    // Electronics
    {
      id: 4,
      name: 'Smart TV',
      description: '55 inch 4K Smart TV',
      price: 49999,
      image: 'https://via.placeholder.com/300x300?text=Electronics+1',
      category: 'electronics',
      inStock: true,
      rating: 4.9
    },
    {
      id: 5,
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse',
      price: 2099,
      image: 'https://via.placeholder.com/300x300?text=Electronics+2',
      category: 'electronics',
      inStock: true,
      rating: 4.6
    },
    {
      id: 6,
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker',
      price: 6799,
      image: 'https://via.placeholder.com/300x300?text=Electronics+3',
      category: 'electronics',
      inStock: true,
      rating: 4.7
    },
    // Mobiles
    {
      id: 7,
      name: 'Smartphone Pro',
      description: 'Latest smartphone with 128GB',
      price: 74999,
      image: 'https://via.placeholder.com/300x300?text=Mobile+1',
      category: 'mobiles',
      inStock: true,
      rating: 4.9
    },
    {
      id: 8,
      name: 'Budget Phone',
      description: 'Affordable smartphone',
      price: 16999,
      image: 'https://via.placeholder.com/300x300?text=Mobile+2',
      category: 'mobiles',
      inStock: true,
      rating: 4.2
    },
    {
      id: 9,
      name: 'Gaming Phone',
      description: 'High-performance gaming phone',
      price: 99999,
      image: 'https://via.placeholder.com/300x300?text=Mobile+3',
      category: 'mobiles',
      inStock: true,
      rating: 4.8
    }
  ];
}

export async function getProductsByCategory(category?: string): Promise<Product[]> {
  return fetchProducts(category, category); // Pass category as both category and type for flexibility
}

// Keep mock function as fallback
export function getMockProductsByCategory(category?: string): Product[] {
  const products = getMockProducts();
  
  if (!category) {
    return products;
  }
  
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
}

