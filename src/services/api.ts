const API_BASE_URL = 'http://localhost:3001/api';

// API Response types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  count?: number;
}

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  video?: string;
  category: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Portfolio API
export const portfolioApi = {
  getAll: () => apiRequest<PortfolioItem[]>('/portfolio'),
  getById: (id: string) => apiRequest<PortfolioItem>(`/portfolio/${id}`),
  getByCategory: (category: string) => 
    apiRequest<PortfolioItem[]>(`/portfolio?category=${category}`),
  getFeatured: () => 
    apiRequest<PortfolioItem[]>('/portfolio?featured=true'),
};

// Contact API
export const contactApi = {
  send: (data: ContactForm) => 
    apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Auth API
export const authApi = {
  getMe: () => apiRequest<User>('/auth/me'),
  login: (email: string, password: string) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (name: string, email: string, password: string) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
};

// Health check
export const healthApi = {
  check: () => apiRequest<{ status: string; message: string; timestamp: string }>('/health'),
};

export type { PortfolioItem, ContactForm, User, ApiResponse }; 