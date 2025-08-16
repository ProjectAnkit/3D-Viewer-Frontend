'use client';

interface Product {
  id: number;
  name: string;
  image_url: string;
  category: string;
  price: number;
  model_url: string;
}

interface ProductDescriptionProps {
  product: Product;
  isModelReady: boolean;
  setIsExpanded: (value: boolean) => void;
  handleRetry: () => void;
}

export default function ProductDescription({ product, isModelReady, setIsExpanded, handleRetry }: ProductDescriptionProps) {
  return (
    <div className="lg:w-1/3 flex flex-col gap-6 p-6 bg-white/70 backdrop-blur-lg border-l border-white/40 shadow-2xl ring-1 ring-blue-500/20 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400/50 scrollbar-track-blue-100/50">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-56 object-cover rounded-2xl shadow-lg transform hover:scale-105 hover:brightness-110 transition-all duration-300"
        onError={() => console.error('Error loading image:', product.image_url)}
      />
      <div className="flex flex-col gap-4 flex-1">
        <h2 className="text-4xl font-bold tracking-wide animate-fadeIn text-gray-800">{product.name}</h2>
        <p className="text-gray-600 text-lg"><strong>Category:</strong> {product.category}</p>
        <p className="text-blue-600 text-2xl font-semibold"><strong>Price:</strong> ${Number(product.price).toFixed(2)}</p>
        <p className="text-gray-600 text-lg leading-relaxed flex-1">
          Discover the elegance and functionality of this meticulously crafted product. Designed with precision engineering and premium materials, it blends modern aesthetics with practical utility, making it an ideal addition to your lifestyle. Experience unparalleled quality and innovation.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setIsExpanded(true)}
            disabled={!isModelReady}
            className={`flex-1 px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all duration-300 ${
              isModelReady
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:shadow-xl hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            aria-label="Expand 3D View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            Expand 3D View
          </button>
          {!isModelReady && (
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:from-cyan-600 hover:to-blue-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
              aria-label="Retry Loading Model"
            >
              Retry Model
            </button>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-medium text-gray-800">Key Features</h3>
          <ul className="list-disc list-inside text-gray-600 text-lg space-y-2">
            <li>High-quality, durable materials</li>
            <li>Sleek, modern design</li>
            <li>Easy to maintain</li>
            <li>Eco-friendly production</li>
            <li>Advanced technology</li>
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-medium text-gray-800">Customer Reviews</h3>
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-inner border border-white/40">
            <p className="text-gray-700 italic">"This product exceeded my expectations! The 3D view helped me visualize it perfectly."</p>
            <p className="text-gray-500 text-sm mt-2">— Satisfied Customer</p>
          </div>
        </div>
      </div>
    </div>
  );
}