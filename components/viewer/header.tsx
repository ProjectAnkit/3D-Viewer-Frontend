'use client';

import { useRouter } from 'next/navigation';

interface HeaderProps {
  router: ReturnType<typeof useRouter>;
}

export default function Header({ router }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center bg-white/60 backdrop-blur-lg border-b border-white/40 shadow-lg z-20 h-16">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">3D</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-800 via-blue-700 to-purple-700 bg-clip-text text-transparent">
          SPACE
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
          aria-label="Back to Gallery"
        >
          Back to Gallery
        </button>
      </div>
    </header>
  );
}