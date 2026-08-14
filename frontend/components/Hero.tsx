"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative h-[80vh] min-h-[600px] flex items-center justify-start px-8 lg:px-24 overflow-hidden">
      {/* Background Image with Parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop')" }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-craft-bg/95 via-craft-bg/70 to-transparent"></div>
      </motion.div>

      {/* Content wrapped in a glassmorphic panel */}
      <motion.div 
        className="relative z-10 max-w-2xl glass-panel p-8 md:p-12 rounded-2xl"
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
          Est. 2024
        </motion.div>
        
        <motion.h1 
          className="font-serif text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-craft-dark mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Connecting artisans with the world
        </motion.h1>
        
        <motion.p 
          className="text-craft-brown text-[16px] leading-relaxed mb-10 max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Experience the soul of slow commerce. Every piece tells a story of heritage, patience, and the human hand. Authentic craft, delivered directly.
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-4 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Link href="/products" className="bg-craft-accent text-white px-8 py-3.5 text-sm font-semibold rounded-full hover:shadow-[0_0_20px_rgba(217,119,87,0.4)] hover:-translate-y-0.5 transition-all duration-300">
            Explore Crafts
          </Link>
          <Link href="/artisans" className="bg-transparent text-craft-dark px-8 py-3.5 text-sm font-semibold rounded-full border border-craft-border hover:bg-craft-dark/5 hover:border-craft-brown transition-all duration-300">
            Meet the Makers
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}