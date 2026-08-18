"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArtisanCard from "@/components/ArtisanCard";
import api from "@/services/api";

interface Artisan {
  id: string | number;
  name: string;
  craft_type: string;
  village: string;
  email?: string;
  image_url?: string;
}

const ARTISAN_IMAGES = [
  "https://images.unsplash.com/photo-1544965850-6f91f37e69c1?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589824781471-a47781b0a827?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605810730419-8e2b8618eb3a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513689404283-c7524ccb50a9?q=80&w=800&auto=format&fit=crop"
];

// Expanded craft type options
const DEFAULT_CRAFT_TYPES = [
  "All Craft Types",
  "Pottery",
  "Weaving",
  "Woodwork",
  "Candle Making",
  "Block Printing",
  "Ceramics",
  "Jewelry",
  "Textiles",
  "Leather Craft",
  "Basketry",
  "Metalwork",
  "Stone Carving"
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
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

export default function ArtisansPage() {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCraft, setSelectedCraft] = useState<string>("All Craft Types");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    api.get("/artisans")
    .then((res) => {
      const publicArtisans = res.data.filter((a: any) => 
        a.email?.toLowerCase() !== 'niroshamadumali37@gmail.com' &&
        !a.name?.toLowerCase().includes('admin')
      );
      setArtisans(publicArtisans);
      setLoading(false);
    })
    .catch(err => {
      console.error("Data tracking error:", err);
      setLoading(false);
    });
  }, []);

  // Compute all craft type options dynamically
  const availableCraftTypes = useMemo(() => {
    const types = new Set<string>(DEFAULT_CRAFT_TYPES);
    artisans.forEach((a) => {
      if (a.craft_type && a.craft_type.trim()) {
        types.add(a.craft_type.trim());
      }
    });
    return Array.from(types);
  }, [artisans]);

  // Filter artisans based on search query and selected craft type
  const filteredArtisans = useMemo(() => {
    return artisans.filter((artisan) => {
      // 1. Craft Type Filter
      if (selectedCraft !== "All Craft Types") {
        if (!artisan.craft_type || !artisan.craft_type.toLowerCase().includes(selectedCraft.toLowerCase())) {
          return false;
        }
      }

      // 2. Search Query Filter (name, village, craft)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = artisan.name?.toLowerCase().includes(query);
        const matchesVillage = artisan.village?.toLowerCase().includes(query);
        const matchesCraft = artisan.craft_type?.toLowerCase().includes(query);
        if (!matchesName && !matchesVillage && !matchesCraft) {
          return false;
        }
      }

      return true;
    });
  }, [artisans, searchQuery, selectedCraft]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCraft("All Craft Types");
  };

  const isFiltered = searchQuery.trim() !== "" || selectedCraft !== "All Craft Types";

  return (
    <div className="min-h-screen bg-craft-bg text-craft-dark">
      
      {/* Dynamic Header Banner */}
      <div className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden border-b border-craft-border/50">
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/artician.png')" }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-craft-bg via-craft-bg/70 to-transparent"></div>
        </motion.div>
        
        <motion.div 
          className="relative z-10 text-center max-w-2xl px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-[11px] font-bold tracking-[0.25em] text-craft-accent uppercase mb-4">The Makers</div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-craft-dark mb-4 drop-shadow-sm">Meet Our Artisans</h1>
          <p className="text-[16px] text-craft-brown leading-relaxed max-w-lg mx-auto">
            Discover the hands behind the craft. Every piece tells a story of heritage, patience, and meticulous skill passed down through generations.
          </p>
        </motion.div>
      </div>

      <div className="px-8 lg:px-24 py-16 max-w-7xl mx-auto">
        
        {/* Filter Bar */}
        <motion.div 
          className="sticky top-4 z-40 glass bg-white/80 backdrop-blur-md flex flex-col md:flex-row gap-4 p-3 shadow-lg border border-craft-border/60 mb-12 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Search Input */}
          <div className="relative flex-1 flex items-center px-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-craft-brown/60">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by artisan name, village, or craft..." 
              className="w-full pl-3 pr-4 py-2.5 text-[14px] text-craft-dark bg-transparent focus:outline-none placeholder-craft-brown/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-craft-brown/50 hover:text-craft-dark text-xs px-2 py-1 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="w-px bg-craft-border/50 hidden md:block"></div>

          {/* Craft Type Custom Dropdown */}
          <div className="w-full md:w-64 px-2 border-t border-craft-border/50 md:border-t-0 pt-2 md:pt-0 flex items-center relative">
            <div 
              className="w-full bg-transparent text-[13px] font-semibold text-craft-dark py-2 px-3 focus:outline-none cursor-pointer flex items-center justify-between rounded-xl hover:bg-white/60 transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="truncate pr-2">{selectedCraft}</span>
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-craft-accent shrink-0"
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </motion.svg>
            </div>
            
            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 w-full max-h-72 overflow-y-auto mt-2 glass bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-craft-border/60 z-50 flex flex-col py-1.5"
                >
                  {availableCraftTypes.map(craft => (
                    <div 
                      key={craft}
                      className={`px-4 py-2.5 text-[13px] cursor-pointer transition-colors ${
                        selectedCraft === craft 
                          ? 'bg-craft-accent text-white font-bold' 
                          : 'text-craft-dark hover:bg-craft-bgAlt'
                      }`}
                      onClick={() => {
                        setSelectedCraft(craft);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {craft}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action / Reset Button */}
          {isFiltered ? (
            <button 
              onClick={handleReset}
              className="bg-craft-dark text-white px-6 py-2.5 text-[11px] font-bold tracking-widest uppercase hover:bg-craft-accent transition-all duration-300 w-full md:w-auto rounded-xl shadow-sm"
            >
              Reset
            </button>
          ) : (
            <button 
              className="bg-craft-accent text-white px-6 py-2.5 text-[11px] font-bold tracking-widest uppercase hover:bg-craft-dark transition-all duration-300 w-full md:w-auto rounded-xl shadow-sm"
            >
              Search
            </button>
          )}
        </motion.div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-[12px] font-bold tracking-wider text-craft-brown uppercase">
            Showing {filteredArtisans.length} {filteredArtisans.length === 1 ? "Artisan" : "Artisans"}
          </span>
          {isFiltered && (
            <button
              onClick={handleReset}
              className="text-[12px] font-bold text-craft-accent hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center text-sm text-craft-brown py-20 animate-pulse">Summoning master artisans...</div>
        ) : filteredArtisans.length === 0 ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-24 px-6 border border-dashed border-craft-border glass rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-4xl mb-4">🏺</span>
            <h3 className="font-serif text-2xl font-bold text-craft-dark mb-2">No artisans found</h3>
            <p className="text-sm text-craft-brown text-center max-w-sm mb-6">
              We couldn't find any artisans matching "{searchQuery || selectedCraft}".
            </p>
            <button
              onClick={handleReset}
              className="bg-craft-accent text-white px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-craft-dark transition-all"
            >
              Show All Artisans
            </button>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            {filteredArtisans.map((artisan, index) => (
              <motion.div key={artisan.id} variants={fadeInUp} className="flex flex-col h-full">
                <ArtisanCard
                  id={artisan.id}
                  imageUrl={artisan.image_url || ARTISAN_IMAGES[index % ARTISAN_IMAGES.length]}
                  name={artisan.name}
                  craft={artisan.craft_type}
                  location={artisan.village}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}