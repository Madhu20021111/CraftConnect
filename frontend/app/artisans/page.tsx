"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ArtisanCard from "@/components/ArtisanCard";
import api from "@/services/api";

interface Artisan {
  id: string | number;
  name: string;
  craft_type: string;
  village: string;
  image_url?: string;
}

const ARTISAN_IMAGES = [
  "https://images.unsplash.com/photo-1544965850-6f91f37e69c1?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589824781471-a47781b0a827?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605810730419-8e2b8618eb3a?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513689404283-c7524ccb50a9?q=80&w=800&auto=format&fit=crop"
];

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ArtisansPage() {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Custom dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState("All Craft Types");

  useEffect(() => {
    api.get("/artisans")
    .then((res) => {
      setArtisans(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Data tracking error:", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-craft-bg text-craft-dark">
      
      {/* Dynamic Header Banner */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden border-b border-craft-border/50">
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=2070&auto=format&fit=crop')" }}
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
          className="sticky top-4 z-40 glass flex flex-col md:flex-row gap-4 p-3 shadow-md border border-craft-border mb-16 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative flex-1 flex items-center px-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-craft-brown/50">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by artisan name..." 
              className="w-full pl-3 pr-4 py-2 text-[14px] text-craft-dark bg-transparent focus:outline-none placeholder-craft-brown/50"
            />
          </div>
          <div className="w-px bg-craft-border/50 hidden md:block"></div>
          <div className="w-full md:w-56 px-2 border-t border-craft-border/50 md:border-t-0 pt-2 md:pt-0 flex items-center relative">
            <div 
              className="w-full bg-transparent text-[14px] text-craft-dark py-2 px-2 focus:outline-none cursor-pointer flex items-center justify-between"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="flex-1 text-center">{selectedCraft}</span>
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-craft-brown shrink-0"
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </motion.svg>
            </div>
            
            {/* Custom Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, pointerEvents: "none" }}
              animate={{ 
                opacity: isDropdownOpen ? 1 : 0, 
                y: isDropdownOpen ? 0 : -10, 
                pointerEvents: isDropdownOpen ? "auto" : "none" 
              }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full mt-2 glass bg-white/80 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(141,90,58,0.1)] border border-craft-border/50 z-50 flex flex-col"
            >
              {["All Craft Types", "Textiles", "Ceramics", "Woodworking"].map(craft => (
                <div 
                  key={craft}
                  className={`px-4 py-3 text-[13px] hover:bg-craft-accent hover:text-white cursor-pointer transition-colors text-center ${selectedCraft === craft ? 'bg-craft-accent/10 text-craft-accent font-bold' : 'text-craft-dark'}`}
                  onClick={() => {
                    setSelectedCraft(craft);
                    setIsDropdownOpen(false);
                  }}
                >
                  {craft}
                </div>
              ))}
            </motion.div>
          </div>
          <button className="bg-craft-accent text-white px-8 py-3 text-[12px] font-bold tracking-widest uppercase hover:bg-craft-dark transition-all duration-300 w-full md:w-auto rounded-lg shadow-sm">
            Filter
          </button>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="text-center text-sm text-craft-brown py-20 animate-pulse">Summoning master artisans...</div>
        ) : artisans.length === 0 ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-24 px-6 border border-dashed border-craft-border glass rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-4xl mb-4">🏺</span>
            <h3 className="font-serif text-2xl font-bold text-craft-dark mb-2">No artisans found</h3>
            <p className="text-sm text-craft-brown text-center max-w-sm">
              We haven't registered any artisans matching that criteria yet.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {artisans.map((artisan, index) => (
              <motion.div key={artisan.id} variants={fadeInUp} className="flex flex-col h-full">
                <ArtisanCard
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