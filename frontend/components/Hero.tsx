import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative h-[80vh] min-h-[600px] flex items-center justify-start px-8 lg:px-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop')" }}
      >
        {/* Light overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xl">
        <div className="text-[10px] font-bold tracking-[0.2em] text-craft-accent uppercase mb-4">
          Est. 2024
        </div>
        
        <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-craft-dark mb-6">
          Connecting artisans with the world
        </h1>
        
        <p className="text-craft-brown text-[15px] leading-relaxed mb-10 max-w-md">
          Experience the soul of slow commerce. Every piece tells a story of heritage, patience, and the human hand.
        </p>
        
        <div className="flex gap-4 items-center">
          <Link href="/products" className="bg-craft-accent text-white px-8 py-3.5 text-sm font-semibold hover:bg-opacity-90 transition-all">
            Explore Crafts
          </Link>
          <Link href="/artisans" className="bg-transparent text-craft-dark px-8 py-3.5 text-sm font-semibold border border-craft-dark hover:bg-craft-dark/5 transition-all">
            Meet the Makers
          </Link>
        </div>
      </div>
    </div>
  );
}