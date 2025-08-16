'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import React from 'react';
import ErrorDisplay from '@/components/viewer/error';
import Header from '@/components/viewer/header';
import LoadingSpinner from '@/components/viewer/loading';
import ModelViewer from '@/components/viewer/modelViewer';
import ProductDescription from '@/components/viewer/productDesc';
import { useGLTF } from '@react-three/drei';

// Define Product interface
interface Product {
  id: number;
  name: string;
  image_url: string;
  category: string;
  price: number;
  model_url: string;
}

export default function ViewerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const router = useRouter();
  const { token, logout } = useAuth();

  // Function to validate GLB model URL
  async function validateModelUrl(url: string): Promise<boolean> {
    if (!url || typeof url !== 'string' || !url.endsWith('.glb')) {
      console.error('Invalid model URL:', url);
      return false;
    }

    try {
      const headResponse = await fetch(url, { method: 'HEAD' });
      if (!headResponse.ok) {
        console.error('Model URL inaccessible:', url, headResponse.statusText);
        return false;
      }

      const response = await fetch(url, {
        headers: { Range: 'bytes=0-11' },
      });
      if (!response.ok) {
        console.error('Failed to fetch GLB header:', url, response.statusText);
        return false;
      }

      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      if (uint8Array[0] !== 103 || uint8Array[1] !== 108 || uint8Array[2] !== 84 || uint8Array[3] !== 70) {
        console.error('Invalid GLB file format:', url);
        return false;
      }

      try {
        await useGLTF.preload(url);
        console.log('Model preloaded successfully:', url);
        return true;
      } catch (preloadErr: any) {
        console.error('Preload failed:', preloadErr.message, url);
        return false;
      }
    } catch (err: any) {
      console.error('Model URL validation failed:', err.message, url);
      return false;
    }
  }

  useEffect(() => {
    let isMounted = true;
    const maxRetries = 3;
    const timeout = 10000;

    async function fetchProductWithRetry(attempt = 1) {
      try {
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('API request timed out')), timeout));

        const response = await Promise.race([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }),
          timeoutPromise,
        ]);

        if (!(response instanceof Response)) throw new Error('API request timed out');

        if (!response.ok) {
          if (response.status === 401) {
            logout();
            router.push('/auth/login');
            return;
          }
          throw new Error(`Failed to fetch product: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched product data:', data);

        if (!data.image_url || !data.model_url) {
          console.warn('Incomplete product data, using fallback:', data);
          const fallbackData: Product = {
            id: Number(id),
            name: 'Sample Product',
            image_url: `${process.env.S3_BUCKET_URL}/images/fallback.jpg`,
            category: 'General',
            price: 99.99,
            model_url: `${process.env.S3_BUCKET_URL}/models/fallback.glb`,
          };
          if (isMounted) {
            setProduct(fallbackData);
            setIsModelReady(false);
            setLoading(false);
          }
          return;
        }

        const isValidModel = await validateModelUrl(data.model_url);
        if (!isValidModel) {
          console.warn('Model validation failed, using fallback:', data.model_url);
          const fallbackData: Product = {
            id: Number(id),
            name: data.name || 'Sample Product',
            image_url: data.image_url || `${process.env.S3_BUCKET_URL}/images/fallback.jpg`,
            category: data.category || 'General',
            price: data.price || 99.99,
            model_url: `${process.env.S3_BUCKET_URL}/models/fallback.glb`,
          };
          if (isMounted) {
            setProduct(fallbackData);
            setIsModelReady(false);
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          setProduct(data);
          setIsModelReady(true);
          setLoading(false);
        }
      } catch (err: any) {
        console.error(`Fetch attempt ${attempt} failed:`, err);
        if (attempt < maxRetries) {
          console.log(`Retrying fetch (attempt ${attempt + 1}/${maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          return fetchProductWithRetry(attempt + 1);
        }
        if (isMounted) {
          const fallbackData: Product = {
            id: Number(id),
            name: 'Sample Product',
            image_url: `${process.env.S3_BUCKET_URL}/images/fallback.jpg`,
            category: 'General',
            price: 99.99,
            model_url: `${process.env.S3_BUCKET_URL}/models/fallback.glb`,
          };
          setProduct(fallbackData);
          setError(err.message || 'Failed to load product after retries');
          setIsModelReady(false);
          setLoading(false);
        }
      }
    }

    if (token) {
      fetchProductWithRetry();
    } else {
      router.push('/auth/login');
    }

    return () => { isMounted = false; };
  }, [id, token, logout, router]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setIsModelReady(false);
  };

  if (loading) return <LoadingSpinner />;
  if (error || !product) return <ErrorDisplay error={error} onRetry={handleRetry} router={router} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-800 overflow-hidden">
      <Header router={router} />
      <div className="flex flex-col lg:flex-row gap-0 h-screen pt-16">
        <ModelViewer
          product={product}
          isModelReady={isModelReady}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          handleRetry={handleRetry}
        />
        {!isExpanded && (
          <ProductDescription
            product={product}
            isModelReady={isModelReady}
            setIsExpanded={setIsExpanded}
            handleRetry={handleRetry}
          />
        )}
      </div>
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