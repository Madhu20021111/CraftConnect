import Link from 'next/link';

export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-[#4B2E2B] via-[#7a3e2e] to-[#C08552] pt-20 pb-16 px-6 text-center shadow-inner">
      <div className="inline-block bg-white/10 text-white text-[11px] font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/20 tracking-wider uppercase backdrop-blur-sm">
        Handmade with love
      </div>
      <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 max-w-2xl mx-auto">
        Connecting artisans<br />with the world
      </h1>
      <p className="text-[#d4b89a] text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed font-light">
        Discover authentic handcrafted goods from skilled artisans in villages worldwide. Every purchase supports a maker.
      </p>
      <div className="flex gap-4 justify-center flex-wrap mb-12">
        <Link href="/products" className="bg-[#C08552] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-opacity-90 shadow-md transition-all">
          Explore crafts
        </Link>
        <Link href="/artisans" className="bg-transparent text-white px-6 py-3 rounded-lg text-sm font-semibold border border-white/30 hover:bg-white/10 transition-all">
          Meet artisans
        </Link>
      </div>
      <div className="flex gap-12 justify-center max-w-md mx-auto border-t border-white/10 pt-8 flex-wrap">
        <div className="text-center"><div className="text-white text-2xl font-bold tracking-wide">340+</div><div className="text-[#b89a7a] text-xs mt-0.5 font-medium uppercase">Artisans</div></div>
        <div className="text-center"><div className="text-white text-2xl font-bold tracking-wide">1,200+</div><div className="text-[#b89a7a] text-xs mt-0.5 font-medium uppercase">Products</div></div>
        <div className="text-center"><div className="text-white text-2xl font-bold tracking-wide">28</div><div className="text-[#b89a7a] text-xs mt-0.5 font-medium uppercase">Countries</div></div>
      </div>
    </div>
  );
}