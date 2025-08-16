'use client';

import { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import Header from '../components/common/header';
import HeroSection from '../components/common/heroSection';
import ProductGrid from '../components/common/productsGrid';
import Footer from '../components/common/footer';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  image_url: string;
  category: string;
  price: number;
  model_url: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, token, logout, loading: authLoading } = useAuth();

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          return;
        }
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      console.log('Fetched products:', data);
      setProducts(data);
      setFilteredProducts(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const filtered = products.filter(
      product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log('Filtered products:', filtered);
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredProducts(products);
  };

  const handleLogout = () => {
    logout();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 to-indigo-950 flex items-center justify-center">
        <div className="bg-gray-900/20 backdrop-blur-lg border border-gray-700/30 p-6 rounded-xl shadow-lg flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-50 text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user || !token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 to-indigo-950 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Welcome to 3D Product Gallery</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Experience products in stunning 3D detail. Sign in to explore our curated collection of innovative products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <button className="px-8 py-4 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 hover:scale-105 transition-all duration-300 shadow-lg">
                Sign In
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="px-8 py-4 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 hover:scale-105 transition-all duration-300 shadow-lg">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-2xl font-medium mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 hover:scale-105 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-800">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleClearSearch={handleClearSearch}
        user={user}
        handleLogout={handleLogout}
      />
      <main className="flex-grow pt-16 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400/50 scrollbar-track-blue-100/50">
        <HeroSection />
        <ProductGrid products={products} filteredProducts={filteredProducts} />
      </main>
      <Footer />
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}