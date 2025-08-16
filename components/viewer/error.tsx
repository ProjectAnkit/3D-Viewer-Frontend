'use client';

import { useRouter } from 'next/navigation';

interface ErrorDisplayProps {
  error: string | null;
  onRetry: () => void;
  router: ReturnType<typeof useRouter>;
}

export default function ErrorDisplay({ error, onRetry, router }: ErrorDisplayProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center">
      <div className="bg-white/70 backdrop-blur-lg border border-white/40 p-6 rounded-xl shadow-lg text-center animate-fadeIn">
        <p className="text-red-600 text-2xl font-medium mb-4">{error || 'Product not found'} (Showing fallback data)</p>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
            aria-label="Back to Gallery"
          >
            Back to Gallery
          </button>
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:from-cyan-600 hover:to-blue-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
            aria-label="Retry Loading"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}