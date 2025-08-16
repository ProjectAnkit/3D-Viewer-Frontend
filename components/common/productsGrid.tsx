import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  image_url: string;
  category: string;
  price: number;
  model_url: string;
}

interface ProductGridProps {
  products: Product[];
  filteredProducts: Product[];
}

export default function ProductGrid({ products, filteredProducts }: ProductGridProps) {
  return (
    <div className="px-6 py-12">
      {products.length === 0 ? (
        <div>
          {[...Array(4)].map((_, index) => (
            <div key={index} className={index !== 3 ? "mb-12" : ""}>
              <div className="bg-white/60 backdrop-blur-lg border border-white/40 p-4 rounded-2xl animate-pulse shadow-lg flex gap-4">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No products found</h3>
          <p className="text-gray-500">Try a different keyword or browse our full collection.</p>
        </div>
      ) : (
        <div>
          {filteredProducts.map((product, index) => (
            <div key={product.id} className={index !== filteredProducts.length - 1 ? "mb-6" : ""}>
              <Link href={`/viewer/${product.id}`}>
                <div className="group bg-white/70 backdrop-blur-lg border border-white/40 p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 animate-fadeIn hover:bg-white/90">
                  <div className="flex gap-4 items-center">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={() => console.error('Error loading image:', product.image_url)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 truncate">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {product.category}
                            </span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">3D Model Available</span>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ${Number(product.price).toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Free Shipping</div>
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span>In Stock</span>
                        </div>
                        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View in 3D
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}