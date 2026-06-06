import ProductCard from "@/components/ProductCard";
import api from "@/services/api";

async function getProducts() {
  try {
    const res = await api.get("/products");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1580226343513-3b1029cba5ac?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584347714499-13e51f4728f3?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516054817452-fbc216d29944?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605814041300-34863c0d3810?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590214691494-0ba3ed525046?q=80&w=800&auto=format&fit=crop"
];

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-craft-bg pt-12 pb-24">
      <div className="px-8 lg:px-24 max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          {/* Categories */}
          <div className="mb-12">
            <h3 className="font-serif text-[17px] font-bold text-craft-dark mb-6">Categories</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-between group cursor-pointer">
                <span className="text-[13px] font-semibold text-craft-dark">Ceramics</span>
                <span className="text-[10px] font-bold bg-craft-bgAlt text-craft-accent/60 w-6 h-6 rounded-full flex items-center justify-center">24</span>
              </li>
              <li className="flex items-center justify-between group cursor-pointer">
                <span className="text-[13px] font-bold text-craft-accent">Textiles</span>
                <span className="text-[10px] font-bold bg-craft-accent text-white w-6 h-6 rounded-full flex items-center justify-center">18</span>
              </li>
              <li className="flex items-center justify-between group cursor-pointer">
                <span className="text-[13px] font-semibold text-craft-dark">Woodwork</span>
                <span className="text-[10px] font-bold bg-craft-bgAlt text-craft-accent/60 w-6 h-6 rounded-full flex items-center justify-center">12</span>
              </li>
              <li className="flex items-center justify-between group cursor-pointer">
                <span className="text-[13px] font-semibold text-craft-dark">Jewelry</span>
                <span className="text-[10px] font-bold bg-craft-bgAlt text-craft-accent/60 w-6 h-6 rounded-full flex items-center justify-center">31</span>
              </li>
            </ul>
          </div>

          {/* Price Range */}
          <div className="mb-12">
            <h3 className="font-serif text-[17px] font-bold text-craft-dark mb-6">Price Range</h3>
            <div className="w-full h-1 bg-craft-bgAlt relative rounded-full mb-4">
              <div className="absolute left-0 w-1/3 h-full bg-craft-accent rounded-full"></div>
              <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-craft-accent shadow-sm border border-white cursor-pointer"></div>
            </div>
            <div className="flex justify-between text-[11px] font-bold text-craft-dark">
              <span>$20</span>
              <span>$500+</span>
            </div>
          </div>

          {/* Region */}
          <div>
            <h3 className="font-serif text-[17px] font-bold text-craft-dark mb-6">Region</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 cursor-pointer">
                <div className="w-4 h-4 border border-craft-border bg-white rounded-sm"></div>
                <span className="text-[13px] text-craft-brown">Nordic Regions</span>
              </li>
              <li className="flex items-center gap-3 cursor-pointer">
                <div className="w-4 h-4 border border-craft-accent bg-craft-accent rounded-sm flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-[13px] text-craft-brown">Mediterranean Coast</span>
              </li>
              <li className="flex items-center gap-3 cursor-pointer">
                <div className="w-4 h-4 border border-craft-border bg-white rounded-sm"></div>
                <span className="text-[13px] text-craft-brown">Pacific Northwest</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
            <div>
              <div className="text-[10px] font-bold tracking-[0.15em] text-craft-accent uppercase mb-3">Curated Collection</div>
              <h1 className="font-serif text-4xl font-bold text-craft-dark">Handcrafted Textiles</h1>
            </div>
            <div className="text-[11px] font-bold text-craft-dark cursor-pointer flex items-center gap-1">
              Sort by: <span className="font-semibold text-craft-brown">Featured</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {products.map((p: any, i: number) => (
              <ProductCard 
                key={p.id}
                imageUrl={PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]}
                name={p.name}
                price={p.price}
                artisanName={p.artisanName}
              />
            ))}
            {products.length === 0 && (
              <div className="col-span-full py-12 text-[13px] text-craft-brown text-center">No products found.</div>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-24 flex items-center justify-center gap-3">
            <button className="w-8 h-8 flex items-center justify-center border border-craft-border rounded-full text-craft-brown hover:border-craft-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div className="flex items-center gap-5 text-[11px] font-bold mx-2 text-craft-dark">
              <span className="border-b-2 border-craft-accent pb-1 text-craft-accent">01</span>
              <span className="pb-1 hover:text-craft-accent cursor-pointer transition-colors">02</span>
              <span className="pb-1 hover:text-craft-accent cursor-pointer transition-colors">03</span>
              <span className="pb-1">...</span>
              <span className="pb-1 hover:text-craft-accent cursor-pointer transition-colors">12</span>
            </div>
            <button className="w-8 h-8 flex items-center justify-center border border-craft-border rounded-full text-craft-brown hover:border-craft-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}