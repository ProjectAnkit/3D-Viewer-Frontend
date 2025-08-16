'use client';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white/70 backdrop-blur-lg border border-white/40 p-6 rounded-xl shadow-lg flex items-center gap-3 animate-fadeIn">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-700 text-lg font-medium">Loading product data...</span>
      </div>
    </div>
  );
}