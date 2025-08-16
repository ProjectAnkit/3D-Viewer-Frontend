'use client';

import { Html, useProgress } from '@react-three/drei';

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="bg-gray-900/20 backdrop-blur-lg border border-gray-700/30 p-4 rounded-xl shadow-lg flex items-center gap-2 animate-fadeIn">
        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-50 text-lg font-medium">{progress.toFixed(0)}% loaded</span>
      </div>
    </Html>
  );
}
