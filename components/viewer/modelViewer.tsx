'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import LoadingSpinner from './loading';
import Model from './model';
import Loader from './loader';

interface Product {
  id: number;
  name: string;
  image_url: string;
  category: string;
  price: number;
  model_url: string;
}

interface ModelViewerProps {
  product: Product;
  isModelReady: boolean;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  handleRetry: () => void;
}

export default function ModelViewer({ product, isModelReady, isExpanded, setIsExpanded, handleRetry }: ModelViewerProps) {
  return (
    <div className={`relative flex-1 bg-gray-900/50 backdrop-blur-sm shadow-2xl ring-1 ring-indigo-500/20 overflow-hidden transition-all duration-500 ${isExpanded ? 'lg:absolute lg:inset-0 lg:z-20' : 'lg:w-2/3'}`}>
      {isModelReady ? (
        <Canvas
          camera={{ position: [0, 2, 5], fov: 45 }}
          shadows
          style={{ height: '100%' }}
        >
          <Suspense fallback={<Loader />}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
            <Model url={product.model_url} />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} dampingFactor={0.1} />
          </Suspense>
        </Canvas>
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="bg-gray-900/20 backdrop-blur-lg border border-gray-700/30 p-6 rounded-xl shadow-lg text-center animate-fadeIn">
            <p className="text-gray-400 text-lg mb-4">Unable to load 3D model. Please try again or view the preview image.</p>
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full max-w-md h-auto object-cover rounded-xl shadow-lg"
              onError={() => console.error('Error loading fallback image:', product.image_url)}
            />
            <button
              onClick={handleRetry}
              className="mt-4 px-6 py-3 bg-cyan-500 text-white rounded-xl shadow-lg hover:bg-cyan-600 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
              aria-label="Retry Loading Model"
            >
              Retry Loading Model
            </button>
          </div>
        </div>
      )}
      {isExpanded && isModelReady && (
        <button
          onClick={() => setIsExpanded(false)}
          className="absolute top-20 right-4 px-4 py-2 bg-indigo-500/80 text-white rounded-full shadow-xl hover:bg-indigo-600 hover:shadow-indigo-500/50 hover:scale-110 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 z-30"
          aria-label="Close Full View"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
          </svg>
          Close Full View
        </button>
      )}
    </div>
  );
}