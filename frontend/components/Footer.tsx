import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-craft-dark px-8 py-8 mt-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
        <div className="md:col-span-2 text-[#d4b89a] text-sm leading-relaxed">
          <strong className="text-white text-base block mb-2 font-medium">CraftConnect</strong>
          Bridging the gap between skilled artisans and people who appreciate authentic handmade goods worldwide.
        </div>
        <div>
          <h4 className="text-white text-sm font-medium mb-3">Explore</h4>
          <div className="flex flex-col gap-2">
            <Link href="/products" className="text-[#8a7060] text-sm hover:text-[#d4b89a]">Products</Link>
            <Link href="/artisans" className="text-[#8a7060] text-sm hover:text-[#d4b89a]">Artisans</Link>
          </div>
        </div>
        <div>
          <h4 className="text-white text-sm font-medium mb-3">Support</h4>
          <div className="flex flex-col gap-2">
            <a className="text-[#8a7060] text-sm hover:text-[#d4b89a] cursor-pointer">Contact us</a>
            <a className="text-[#8a7060] text-sm hover:text-[#d4b89a] cursor-pointer">FAQ</a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-[#6a5a50] text-xs">© 2026 CraftConnect. All rights reserved.</p>
        <p className="text-[#6a5a50] text-xs">Made with care for artisans everywhere.</p>
      </div>
    </footer>
  );
}