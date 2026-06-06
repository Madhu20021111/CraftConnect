import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-craft-bgAlt px-8 py-16 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Left Column - Branding */}
        <div className="md:col-span-4 text-craft-brown text-sm leading-relaxed">
          <Link href="/" className="font-serif font-bold text-3xl text-craft-accent tracking-tight block mb-4">
            CraftConnect
          </Link>
          <p className="max-w-xs text-[13px] leading-relaxed">
            Connecting global conscious consumers with the world's most talented master artisans.
          </p>
        </div>

        {/* Middle Columns - Links */}
        <div className="md:col-span-2">
          <h4 className="text-craft-accent text-xs font-bold tracking-widest uppercase mb-5">Explore</h4>
          <div className="flex flex-col gap-3">
            <Link href="/about" className="text-craft-brown text-[13px] hover:text-craft-accent transition-colors">About</Link>
            <Link href="/products" className="text-craft-brown text-[13px] hover:text-craft-accent transition-colors">Products</Link>
            <Link href="/artisans" className="text-craft-brown text-[13px] hover:text-craft-accent transition-colors">Artisans</Link>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="text-craft-accent text-xs font-bold tracking-widest uppercase mb-5">Legal</h4>
          <div className="flex flex-col gap-3">
            <Link href="/privacy" className="text-craft-brown text-[13px] hover:text-craft-accent transition-colors">Privacy</Link>
            <Link href="/shipping" className="text-craft-brown text-[13px] hover:text-craft-accent transition-colors">Shipping</Link>
            <Link href="/returns" className="text-craft-brown text-[13px] hover:text-craft-accent transition-colors">Returns</Link>
          </div>
        </div>

        {/* Right Column - Newsletter */}
        <div className="md:col-span-4">
          <h4 className="text-craft-accent text-xs font-bold tracking-widest uppercase mb-5">Newsletter</h4>
          <p className="text-craft-brown text-[13px] mb-4">
            Join our community for artisan stories and new arrivals.
          </p>
          <div className="flex w-full bg-white rounded-md overflow-hidden border border-craft-border shadow-sm">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-1 px-4 py-3 text-sm focus:outline-none text-craft-dark"
            />
            <button className="bg-craft-accent text-white px-5 text-sm font-semibold hover:bg-opacity-90 transition-all">
              Join
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto border-t border-craft-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-craft-brown text-xs">© 2024 CraftConnect. Hand-carved with intention.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-craft-brown text-xs hover:text-craft-accent transition-colors">Privacy</Link>
          <Link href="/shipping" className="text-craft-brown text-xs hover:text-craft-accent transition-colors">Shipping</Link>
          <Link href="/contact" className="text-craft-brown text-xs hover:text-craft-accent transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}