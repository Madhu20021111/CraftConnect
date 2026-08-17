"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ArtisanCardProps {
  id?: string | number;
  initials?: string;
  imageUrl?: string;
  name: string;
  craft: string;
  location: string;
}

export default function ArtisanCard({ id, initials, imageUrl, name, craft, location }: ArtisanCardProps) {
  const displayImage = imageUrl || "https://images.unsplash.com/photo-1544965850-6f91f37e69c1?q=80&w=800&auto=format&fit=crop";

  return (
    <motion.div 
      className="group glass bg-white/50 flex flex-col h-full hover:shadow-[0_10px_40px_rgba(141,90,58,0.08)] transition-all duration-500 overflow-hidden rounded-xl border border-craft-border/50 hover:border-craft-brown/30"
      whileHover={{ y: -8 }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F5F5]">
        <motion.img 
          src={displayImage} 
          alt={name} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        {/* Craft Badge Overlay */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-block bg-white/90 backdrop-blur-md text-craft-dark text-[9px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase shadow-sm">
            {craft}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 pt-5 flex flex-col flex-1">
        {/* Name & Location */}
        <h3 className="font-serif text-[22px] font-bold text-craft-dark mb-2 leading-tight group-hover:text-craft-accent transition-colors">{name}</h3>
        <div className="text-[10px] text-craft-brown flex items-center gap-1.5 mb-6 uppercase tracking-widest font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-craft-accent">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <span className="truncate">{location}</span>
        </div>

        {/* Contact Button */}
        {id ? (
          <Link href={`/artisans/${id}`} className="mt-auto w-full py-3 border border-craft-border text-craft-dark text-[11px] font-bold tracking-widest uppercase rounded-full hover:bg-craft-accent hover:border-craft-accent hover:text-white hover:shadow-[0_0_15px_rgba(217,119,87,0.3)] transition-all duration-300 text-center block">
            View Profile
          </Link>
        ) : (
          <button className="mt-auto w-full py-3 border border-craft-border text-craft-dark text-[11px] font-bold tracking-widest uppercase rounded-full hover:bg-craft-accent hover:border-craft-accent hover:text-white hover:shadow-[0_0_15px_rgba(217,119,87,0.3)] transition-all duration-300">
            View Profile
          </button>
        )}
      </div>
    </motion.div>
  );
}