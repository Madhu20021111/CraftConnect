import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-craft-dark px-8 h-14 flex items-center justify-between sticky top-0 z-50 shadow-md">
      <Link href="/" className="text-[#7B3F00] text-lg font-medium tracking-wide">
        Craft<span className="text-craft-tan">Connect</span>
      </Link>
      <div className="flex gap-6 items-center">
        <Link href="/" className="text-[#7B3F00] text-sm hover:text-[#3D0C02] transition-colors">
          Home
        </Link>
        <Link href="/products" className="text-[#7B3F00] text-sm hover:text-[#3D0C02] transition-colors">
          Products
        </Link>
        <Link href="/artisans" className="text-[#7B3F00] text-sm hover:text-[#3D0C02] transition-colors">
          Artisans
        </Link>
        <Link href="/artisans/join">
        <button className="cursor-pointer bg-craft-tan text-[#7B3F00] px-3.5 py-1.5 rounded-md text-sm hover:text-[#3D0C02] font-medium hover:bg-opacity-90 transition-all">
          Join as Artisan
        </button>
        </Link>
      </div>
    </nav>
  );
}