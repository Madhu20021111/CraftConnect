"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    transition: { staggerChildren: 0.08 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter & Sort state
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(10000);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("Featured");
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        setProducts(res.data);
        if (res.data.length > 0) {
          const prices = res.data.map((p: any) => Number(p.price) || 0);
          const maxP = Math.max(...prices, 1000);
          setSelectedMaxPrice(Math.ceil(maxP));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  // Compute available categories and live item counts
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      const cat = p.category || p.craft_type || "Handcrafted";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Compute unique regions (villages) from real data
  const uniqueRegions = useMemo(() => {
    const regions = new Set<string>();
    products.forEach((p) => {
      if (p.village && p.village.trim() !== "") {
        regions.add(p.village.trim());
      }
    });
    return Array.from(regions);
  }, [products]);

  // Maximum price in dataset
  const maxAvailablePrice = useMemo(() => {
    if (products.length === 0) return 5000;
    const prices = products.map((p) => Number(p.price) || 0);
    return Math.max(...prices, 1000);
  }, [products]);

  // Toggle region filter selection
  const handleRegionToggle = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedMaxPrice(maxAvailablePrice);
    setSelectedRegions([]);
    setSelectedSort("Featured");
  };

  const isFiltered = selectedCategory !== "All" || selectedMaxPrice < maxAvailablePrice || selectedRegions.length > 0;

  // Filter and sort products in real time
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (selectedCategory !== "All") {
          const cat = p.category || p.craft_type;
          if (!cat || cat.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }

        // Price Filter
        const price = Number(p.price) || 0;
        if (price > selectedMaxPrice) {
          return false;
        }

        // Region Filter
        if (selectedRegions.length > 0) {
          if (!p.village || !selectedRegions.includes(p.village.trim())) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = Number(a.price) || 0;
        const priceB = Number(b.price) || 0;
        if (selectedSort === "Price: Low to High") return priceA - priceB;
        if (selectedSort === "Price: High to Low") return priceB - priceA;
        if (selectedSort === "Newest") return b.id - a.id;
        return 0; // Default: Featured (natural order)
      });
  }, [products, selectedCategory, selectedMaxPrice, selectedRegions, selectedSort]);

  const filterSidebarContent = (
    <>
      {/* Active Filter Clear Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-craft-border/50">
        <h3 className="font-serif text-lg font-bold text-craft-dark">Filters</h3>
        {isFiltered && (
          <button
            onClick={handleResetFilters}
            className="text-[11px] font-bold text-craft-accent uppercase tracking-wider hover:underline"
          >
            Reset All
          </button>
        )}
      </div>

      {/* Categories Filter */}
      <div className="mb-10">
        <h4 className="font-serif text-[15px] font-bold text-craft-dark mb-4">Categories</h4>
        <ul className="space-y-2.5">
          <li
            onClick={() => setSelectedCategory("All")}
            className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-200 ${
              selectedCategory === "All"
                ? "bg-craft-accent text-white font-bold shadow-md shadow-craft-accent/20"
                : "text-craft-dark hover:bg-white/60"
            }`}
          >
            <span className="text-[13px]">All Items</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              selectedCategory === "All" ? "bg-white/20 text-white" : "bg-craft-bgAlt text-craft-brown"
            }`}>
              {products.length}
            </span>
          </li>

          {Object.entries(categoriesWithCounts).map(([cat, count]) => {
            const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <li
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-craft-accent text-white font-bold shadow-md shadow-craft-accent/20"
                    : "text-craft-dark hover:bg-white/60"
                }`}
              >
                <span className="text-[13px]">{cat}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isSelected ? "bg-white/20 text-white" : "bg-craft-bgAlt text-craft-brown"
                }`}>
                  {count}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Price Range Filter */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-serif text-[15px] font-bold text-craft-dark">Price Range</h4>
          <span className="text-[11px] font-bold text-craft-accent">
            Up to Rs. {selectedMaxPrice.toLocaleString()}
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={maxAvailablePrice}
          step={50}
          value={selectedMaxPrice}
          onChange={(e) => setSelectedMaxPrice(Number(e.target.value))}
          className="w-full accent-craft-accent cursor-pointer h-2 bg-craft-border/50 rounded-lg appearance-none"
        />

        <div className="flex justify-between text-[11px] font-bold text-craft-brown mt-3">
          <span>Rs. 0</span>
          <span>Rs. {maxAvailablePrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Region / Village Filter */}
      {uniqueRegions.length > 0 && (
        <div>
          <h4 className="font-serif text-[15px] font-bold text-craft-dark mb-4">Artisan Region</h4>
          <ul className="space-y-3">
            {uniqueRegions.map((region) => {
              const isChecked = selectedRegions.includes(region);
              return (
                <li
                  key={region}
                  onClick={() => handleRegionToggle(region)}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                >
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                      isChecked
                        ? "border-craft-accent bg-craft-accent text-white shadow-sm"
                        : "border-craft-border bg-white group-hover:border-craft-accent"
                    }`}
                  >
                    {isChecked && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-[13px] transition-colors ${isChecked ? "font-bold text-craft-dark" : "text-craft-brown group-hover:text-craft-dark"}`}>
                    {region}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-craft-bg pb-24">
      {/* Hero Banner */}
      <div className="relative h-[45vh] min-h-[350px] flex items-center justify-start px-8 lg:px-24 overflow-hidden mb-16 border-b border-craft-border/50">
        <motion.div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/shop-banner.png')" }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-craft-bg/95 via-craft-bg/80 to-transparent"></div>
        </motion.div>

        <motion.div
          className="relative z-10 max-w-2xl glass p-8 md:p-12 rounded-3xl shadow-xl border border-craft-border/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <motion.div
            className="text-[11px] font-bold tracking-[0.25em] text-craft-accent uppercase mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            The Marketplace
          </motion.div>
          <motion.h1
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-craft-dark mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Curated Collections
          </motion.h1>
          <motion.p
            className="text-craft-brown text-[15px] leading-relaxed max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Discover unique, handcrafted creations directly from master artisans.
            Every piece is selected for its authenticity and uncompromising quality.
          </motion.p>
        </motion.div>
      </div>

      <div className="px-8 lg:px-24 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 relative">

        {/* Desktop Sticky Glass Sidebar */}
        <aside className="w-full md:w-64 shrink-0 md:sticky top-8 h-fit glass p-6 rounded-2xl border border-craft-border/50 shadow-sm z-30 hidden md:block">
          {filterSidebarContent}
        </aside>

        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden w-full">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="w-full glass rounded-xl p-4 flex items-center justify-between text-[12px] font-bold text-craft-dark border border-craft-border uppercase tracking-widest shadow-sm"
          >
            <span>Filters {isFiltered && "(Active)"}</span>
            <span className="text-craft-accent font-bold">Adjust</span>
          </button>
        </div>

        {/* Mobile Filter Modal */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end md:hidden"
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-[85%] max-w-sm h-full bg-craft-bg p-6 overflow-y-auto shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif text-xl font-bold text-craft-dark">Filters</h3>
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="w-8 h-8 rounded-full bg-craft-bgAlt flex items-center justify-center font-bold text-craft-dark"
                    >
                      ✕
                    </button>
                  </div>
                  {filterSidebarContent}
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full mt-8 bg-craft-accent text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-md"
                >
                  View {filteredProducts.length} Results
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
            <div className="flex items-center gap-4">
              <span className="font-serif text-2xl font-bold text-craft-dark">Explore Artworks</span>
              <span className="text-[12px] font-semibold text-craft-brown/70 bg-craft-bgAlt px-3 py-1 rounded-full border border-craft-border/60">
                {filteredProducts.length} {filteredProducts.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            {/* Custom Sort Dropdown */}
            <div className="relative text-[12px] font-bold text-craft-dark flex items-center gap-2">
              <span className="text-craft-brown/70">Sort by:</span>
              <div
                className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-full border border-craft-border hover:border-craft-accent/50 transition-colors shadow-sm"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <span className="font-semibold text-craft-dark">{selectedSort}</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-craft-accent"
                  animate={{ rotate: isSortOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </motion.svg>
              </div>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-44 glass bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-craft-border/60 z-50 flex flex-col py-1.5"
                  >
                    {["Featured", "Price: Low to High", "Price: High to Low", "Newest"].map(option => (
                      <div
                        key={option}
                        className={`px-4 py-2.5 text-[12px] cursor-pointer transition-colors ${
                          selectedSort === option
                            ? 'bg-craft-accent text-white font-bold'
                            : 'text-craft-dark hover:bg-craft-bgAlt'
                        }`}
                        onClick={() => {
                          setSelectedSort(option);
                          setIsSortOpen(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-24 text-[13px] text-craft-brown font-semibold animate-pulse">
              Curating your collection...
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
              initial="hidden"
              animate="show"
              variants={staggerContainer}
            >
              {filteredProducts.map((p, i) => (
                <motion.div key={p.id} variants={fadeInUp} className="flex flex-col h-full">
                  <ProductCard
                    id={p.id}
                    imageUrl={p.image_url ? (p.image_url.startsWith('http') ? p.image_url : `http://localhost:5000/uploads${p.image_url.startsWith('/') ? '' : '/'}${p.image_url}`) : PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]}
                    name={p.name}
                    price={p.price}
                    artisanName={p.artisan_name || p.artisanName || 'Master Artisan'}
                  />
                </motion.div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="col-span-full py-20 px-6 text-center glass rounded-2xl border border-dashed border-craft-border/60">
                  <span className="text-4xl block mb-3 opacity-60">🎨</span>
                  <h4 className="font-serif text-xl font-bold text-craft-dark mb-2">No matching artworks</h4>
                  <p className="text-sm text-craft-brown mb-6 max-w-sm mx-auto">
                    Try adjusting your filters or price range to discover more pieces.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="bg-craft-accent text-white px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-craft-dark transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </motion.div>
          )}

        </div>

      </div>
    </div>
  );
}