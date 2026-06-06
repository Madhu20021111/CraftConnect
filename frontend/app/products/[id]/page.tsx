import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Static content matching the screenshot for the purpose of the redesign
  return (
    <div className="min-h-screen bg-craft-bg pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-24">
        
        {/* Top Product Section */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mb-24">
          
          {/* Images */}
          <div>
            <div className="aspect-[4/5] bg-[#E8E8E8] mb-4 w-full">
              <img 
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop" 
                alt="The Earthbound Amphora"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="aspect-square bg-craft-bgAlt">
                <img src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square bg-craft-bgAlt">
                <img src="https://images.unsplash.com/photo-1605810730419-8e2b8618eb3a?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square bg-craft-bgAlt">
                <img src="https://images.unsplash.com/photo-1590214691494-0ba3ed525046?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square bg-craft-bgAlt">
                <img src="https://images.unsplash.com/photo-1584347714499-13e51f4728f3?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="py-4">
            <div className="text-[11px] text-craft-brown mb-6 font-medium">Ceramics / Vessels</div>
            
            <h1 className="font-serif text-4xl font-bold text-craft-dark mb-4 leading-tight">The Earthbound Amphora</h1>
            <div className="text-lg font-bold text-craft-accent mb-8">$240.00</div>

            <div className="flex gap-3 mb-8">
              <span className="bg-craft-bgAlt text-craft-accent px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">Hand-Thrown</span>
              <span className="bg-craft-bgAlt text-craft-accent px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">Local Clay</span>
            </div>

            <p className="text-[13.5px] text-craft-dark leading-relaxed mb-10">
              Inspired by the sediment layers of the Ojai Valley, this amphora is thrown by hand using a custom blend of local stoneware and iron-rich clay. Each piece undergoes a 12-hour slow-fire process, resulting in a finish that is as unique as the terrain it mirrors.
            </p>

            <div className="border-t border-craft-border py-6">
              <div className="text-[10px] font-bold tracking-widest uppercase text-craft-brown mb-2">Technique</div>
              <div className="text-[13px] text-craft-dark">Sgraffito etching with organic wood-ash glaze.</div>
            </div>

            <div className="border-t border-craft-border py-6 mb-8">
              <div className="text-[10px] font-bold tracking-widest uppercase text-craft-brown mb-2">Materials</div>
              <div className="text-[13px] text-craft-dark">Wild-harvested clay, mineral oxides, sustainable pine ash glaze.</div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="bg-craft-accent text-white w-full py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-opacity-90 transition-all">
                Add to Bag
              </button>
              <button className="bg-transparent border border-craft-border text-craft-dark w-full py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-craft-bgAlt transition-all">
                Save to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Meet the Artisan Block */}
        <div className="bg-[#FAF7F2] rounded-md p-10 md:p-16 mb-32 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 border border-[#EBE5DE]">
          <div className="md:w-1/2 relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <img src="https://images.unsplash.com/photo-1544965850-6f91f37e69c1?q=80&w=150&auto=format&fit=crop" className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <div className="font-serif font-bold text-[17px] text-craft-dark">Meet Elena Rossi</div>
                <div className="text-[10px] tracking-widest uppercase text-craft-brown font-semibold mt-1">Ojai, California</div>
              </div>
            </div>
            
            <h3 className="font-serif text-2xl font-bold text-craft-accent mb-4">Crafting Heritage</h3>
            <p className="text-[13.5px] text-craft-dark leading-relaxed mb-10">
              Elena has spent twenty years perfecting the "slow-throw" technique passed down through her family. In her small studio tucked away in the Ojai valley, she works only with materials found within a fifty-mile radius, ensuring each vessel carries the literal dust and spirit of the land.
            </p>
            
            <div className="flex gap-6">
              <Link href="/artisans/1" className="text-[11px] font-bold tracking-widest uppercase text-craft-accent hover:text-craft-dark flex items-center gap-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Contact Elena
              </Link>
              <Link href="#" className="text-[11px] font-bold tracking-widest uppercase text-craft-accent hover:text-craft-dark flex items-center gap-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Schedule Studio Visit
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 relative md:absolute md:-right-10 md:top-10 md:-bottom-10 z-0 rotate-2 shadow-2xl overflow-hidden aspect-square md:aspect-auto">
            <img 
              src="https://images.unsplash.com/photo-1513689404283-c7524ccb50a9?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* More from the Studio */}
        <div>
          <div className="flex justify-between items-end mb-10 border-b border-craft-border pb-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-craft-dark mb-1">More from the Studio</h2>
              <p className="text-[13px] text-craft-brown">Pieces that share the same earth and intention.</p>
            </div>
            <Link href="/products" className="text-[11px] font-bold tracking-widest uppercase text-craft-accent hover:text-craft-dark transition-colors border-b border-craft-accent pb-0.5">
              View Collection
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard 
              imageUrl="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=600&auto=format&fit=crop"
              name="Ojai Tall Vase"
              price="$185.00"
              artisanName="Elena Rossi"
            />
            <ProductCard 
              imageUrl="https://images.unsplash.com/photo-1590214691494-0ba3ed525046?q=80&w=600&auto=format&fit=crop"
              name="Pinch Bowls (Set of 2)"
              price="$75.00"
              artisanName="Elena Rossi"
            />
            <ProductCard 
              imageUrl="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop"
              name="Solstice Platter"
              price="$320.00"
              artisanName="Elena Rossi"
            />
            <ProductCard 
              imageUrl="https://images.unsplash.com/photo-1584347714499-13e51f4728f3?q=80&w=600&auto=format&fit=crop"
              name="Studio Spice Jars"
              price="$110.00"
              artisanName="Elena Rossi"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
