export default function Footer() {

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-3">
              <svg className="w-6 h-6 text-ocean" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
              </svg>
              <h3 className="text-lg font-bold">Phuket Bus Routes</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Your comprehensive guide to public transportation in Phuket. 
              Helping tourists and locals navigate the island efficiently and affordably.
            </p>
          </div>
          

        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Phuket Bus Routes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
