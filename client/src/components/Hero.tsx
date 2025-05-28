export default function Hero() {

  return (
    <section className="relative py-12 overflow-hidden">
      {/* Subtle tropical background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-500"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/15 via-transparent to-orange-300/20"></div>
      
      {/* Gentle floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-32 h-32 bg-yellow-200/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl animate-bounce" style={{animationDuration: '4s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-pink-200/15 rounded-full blur-2xl animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-emerald-200/18 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* Geometric wave patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform rotate-12 scale-150 opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-l from-transparent via-cyan-300/20 to-transparent transform -rotate-12 scale-150 opacity-40"></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white drop-shadow-lg">
            Navigate Phuket with Ease
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90 drop-shadow-md">
            Complete bus schedule and route information from Phuket Airport to all major destinations
          </p>
          

        </div>
      </div>
    </section>
  );
}
