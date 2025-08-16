import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="p-8 bg-white/60 backdrop-blur-lg border-t border-white/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div className="text-left">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">About Us</h4>
          <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
            We are passionate about delivering innovative products that redefine your lifestyle. Explore our curated collection today.
          </p>
        </div>
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h4>
          <div className="flex flex-col gap-2">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm hover:translate-x-1 inline-block">
              Home
            </Link>
            <Link href="/shop" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm hover:translate-x-1 inline-block">
              Shop
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm hover:translate-x-1 inline-block">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm hover:translate-x-1 inline-block">
              Contact
            </Link>
          </div>
        </div>
        <div className="text-right">
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Stay Connected</h4>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed max-w-xs ml-auto">Subscribe to our newsletter for updates and exclusive offers.</p>
          <div className="flex gap-2 mb-4 justify-end">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 max-w-48 px-4 py-2 bg-white/80 border border-gray-200 rounded-full text-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              aria-label="Newsletter email"
            />
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-md hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all duration-300 text-sm font-medium whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <div className="flex gap-3 justify-end">
            {['facebook', 'twitter', 'instagram'].map(social => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
                aria-label={social}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3l-1 3h-2v4h-2v-4H9v-3h2V7z" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-8 pt-6">
        <p className="text-center text-gray-500 text-sm">© 2025 Ankit Thakur. All rights reserved.</p>
      </div>
    </footer>
  );
}