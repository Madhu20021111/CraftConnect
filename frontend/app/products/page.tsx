"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import api from "@/services/api";

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1580226343513-3b1029cba5ac?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584347714499-13e51f4728f3?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516054817452-fbc216d29944?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605814041300-34863c0d3810?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590214691494-0ba3ed525046?q=80&w=800&auto=format&fit=crop"
];

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dropdown state
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Featured");

  useEffect(() => {
    api.get("/products")
    .then((res) => {
      setProducts(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Failed to fetch products:", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-craft-bg pt-12 pb-24">
      <div className="px-8 lg:px-24 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 relative">
        
        {/* Sticky Glass Sidebar */}
        <aside className="w-full md:w-64 shrink-0 md:sticky top-8 h-fit glass p-6 rounded-2xl border border-craft-border/50 shadow-sm z-30 hidden md:block">
          {/* Categories */}
          <div className="mb-10">
            <h3 className="font-serif text-[17px] font-bold text-craft-dark mb-5">Categories</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-between group cursor-pointer">
                <span className="text-[13px] font-semibold text-craft-dark group-hover:text-craft-accent transition-colors">Ceramics</span>
                <span className="text-[10px] font-bold bg-white text-craft-accent/60 w-6 h-6 rounded-full flex items-center justify-center border border-craft-border shadow-sm">24</span>
              </li>
              <li className="flex items-center justify-between group cursor-pointer">
                <span className="text-[13px] font-bold text-craft-accent">Textiles</span>
                <span className="text-[10px] font-bold bg-craft-accent text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md shadow-craft-accent/30">18</span>
              </li>
              <li className="flex items-center justify-between group cursor-pointer">
                <span className="text-[13px] font-semibold text-craft-dark group-hover:text-craft-accent transition-colors">Woodwork</span>
                <span className="text-[10px] font-bold bg-white text-craft-accent/60 w-6 h-6 rounded-full flex items-center justify-center border border-craft-border shadow-sm">12</span>
              </li>
              <li className="flex items-center justify-between group cursor-pointer">
                <span className="text-[13px] font-semibold text-craft-dark group-hover:text-craft-accent transition-colors">Jewelry</span>
                <span className="text-[10px] font-bold bg-white text-craft-accent/60 w-6 h-6 rounded-full flex items-center justify-center border border-craft-border shadow-sm">31</span>
              </li>
            </ul>
          </div>

          {/* Price Range */}
          <div className="mb-10">
            <h3 className="font-serif text-[17px] font-bold text-craft-dark mb-5">Price Range</h3>
            <div className="w-full h-1.5 bg-craft-border/50 relative rounded-full mb-4">
              <div className="absolute left-0 w-1/3 h-full bg-craft-accent rounded-full shadow-[0_0_8px_rgba(141,90,58,0.5)]"></div>
              <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-md border-2 border-craft-accent cursor-pointer hover:scale-110 transition-transform"></div>
            </div>
            <div className="flex justify-between text-[11px] font-bold text-craft-brown">
              <span>$20</span>
              <span>$500+</span>
            </div>
          </div>

          {/* Region */}
          <div>
            <h3 className="font-serif text-[17px] font-bold text-craft-dark mb-5">Region</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 border border-craft-border bg-white rounded-sm group-hover:border-craft-accent transition-colors"></div>
                <span className="text-[13px] text-craft-brown group-hover:text-craft-dark transition-colors">Nordic Regions</span>
              </li>
              <li className="flex items-center gap-3 cursor-pointer">
                <div className="w-4 h-4 border border-craft-accent bg-craft-accent rounded-sm flex items-center justify-center shadow-[0_0_8px_rgba(141,90,58,0.4)]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-[13px] font-semibold text-craft-dark">Mediterranean</span>
              </li>
              <li className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 border border-craft-border bg-white rounded-sm group-hover:border-craft-accent transition-colors"></div>
                <span className="text-[13px] text-craft-brown group-hover:text-craft-dark transition-colors">Pacific Northwest</span>
              </li>
            </ul>
          </div>
        </aside>
        
        {/* Mobile Sidebar Toggle (Placeholder) */}
        <div className="md:hidden w-full glass rounded-xl p-4 flex justify-center text-[12px] font-bold text-craft-dark border border-craft-border uppercase tracking-widest cursor-pointer shadow-sm">
          Show Filters
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
            <div>
              <div className="text-[10px] font-bold tracking-[0.15em] text-craft-accent uppercase mb-3">Curated Collection</div>
              <h1 className="font-serif text-4xl font-bold text-craft-dark drop-shadow-sm">Handcrafted Textiles</h1>
            </div>
            
            {/* Custom Sort Dropdown */}
            <div className="relative text-[12px] font-bold text-craft-dark flex items-center gap-2">
              <span className="text-craft-brown/70">Sort by:</span>
              <div 
                className="flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-full border border-craft-border hover:border-craft-accent/50 transition-colors shadow-sm"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <span className="font-semibold">{selectedSort}</span>
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 text-craft-accent"
                  animate={{ rotate: isSortOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </motion.svg>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -10, pointerEvents: "none" }}
                animate={{ 
                  opacity: isSortOpen ? 1 : 0, 
                  y: isSortOpen ? 0 : -10, 
                  pointerEvents: isSortOpen ? "auto" : "none" 
                }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-2 w-40 glass bg-white/90 rounded-xl overflow-hidden shadow-lg border border-craft-border/50 z-50 flex flex-col"
              >
                {["Featured", "Price: Low to High", "Price: High to Low", "Newest"].map(option => (
                  <div 
                    key={option}
                    className={`px-4 py-2.5 text-[12px] hover:bg-craft-accent hover:text-white cursor-pointer transition-colors ${selectedSort === option ? 'bg-craft-accent/10 text-craft-accent font-bold' : 'text-craft-dark'}`}
                    onClick={() => {
                      setSelectedSort(option);
                      setIsSortOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20 text-[13px] text-craft-brown font-semibold animate-pulse">
              Curating your collection...
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {products.map((p, i) => (
                <motion.div key={p.id} variants={fadeInUp} className="flex flex-col h-full">
                  <ProductCard 
                    imageUrl={PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]}
                    name={p.name}
                    price={p.price}
                    artisanName={p.artisanName}
                  />
                </motion.div>
              ))}
              {products.length === 0 && (
                <div className="col-span-full py-12 text-[13px] text-craft-brown text-center">No products found.</div>
              )}
            </motion.div>
          )}

          {/* Pagination */}
          <div className="mt-24 flex items-center justify-center gap-3">
            <button className="w-10 h-10 flex items-center justify-center bg-white border border-craft-border rounded-full text-craft-brown hover:border-craft-accent hover:text-craft-accent shadow-sm hover:shadow-md transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div className="flex items-center gap-4 text-[13px] font-bold mx-3 text-craft-dark">
              <span className="bg-craft-accent text-white w-8 h-8 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(141,90,58,0.3)]">1</span>
              <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-craft-bgAlt cursor-pointer transition-colors">2</span>
              <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-craft-bgAlt cursor-pointer transition-colors">3</span>
              <span className="px-1 text-craft-brown/50">...</span>
              <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-craft-bgAlt cursor-pointer transition-colors">12</span>
            </div>
            <button className="w-10 h-10 flex items-center justify-center bg-white border border-craft-border rounded-full text-craft-brown hover:border-craft-accent hover:text-craft-accent shadow-sm hover:shadow-md transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}