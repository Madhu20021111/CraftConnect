"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import api from "@/services/api";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: string | number;
  emoji?: string;
  badge?: string;
  name: string;
  price: string;
  artisanInitials: string;
  artisanName: string;
}

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584347714499-13e51f4728f3?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516054817452-fbc216d29944?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605814041300-34863c0d3810?q=80&w=800&auto=format&fit=crop"
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

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get("/products")
    .then((prodRes) => {
      setProducts(prodRes.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Data tracking error:", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-craft-bg text-craft-dark selection:bg-craft-accent/30 selection:text-craft-accent">
      <Hero />
      
      {/* Curated Pieces Section */}
      <section className="px-8 lg:px-24 py-32 max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-craft-dark mb-4">Curated Pieces</h2>
            <p className="text-[16px] text-craft-brown max-w-lg">A rotating gallery of limited edition items sourced directly from workshops around the globe.</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Link href="/products" className="text-[12px] font-bold uppercase tracking-[0.2em] text-craft-accent hover:text-white transition-colors flex items-center gap-2 shrink-0 group">
              View Entire Collection 
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </motion.div>

        {loading ? (
          <div className="text-center text-sm text-craft-brown py-12 animate-pulse">Summoning authentic creations...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-sm text-craft-brown py-12 glass p-8 rounded-2xl">No pieces found in the showroom catalog.</div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {products.slice(0, 4).map((p, index) => (
              <motion.div key={p.id} variants={fadeInUp}>
                <ProductCard 
                  id={p.id}
                  imageUrl={PRODUCT_IMAGES[index % PRODUCT_IMAGES.length]}
                  badge={index === 0 ? 'New Arrival' : index === 3 ? 'Limited' : undefined}
                  name={p.name}
                  price={p.price}
                  artisanName={(p as any).artisan_name || p.artisanName || 'Unknown Artisan'}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* The Maker's Journey */}
      <section className="relative py-32 bg-craft-bgAlt overflow-hidden border-y border-craft-border/50">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-craft-accent/20 via-craft-bgAlt to-craft-bgAlt pointer-events-none"></div>
        
        <div className="px-8 lg:px-24 max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="relative h-[650px] rounded-2xl overflow-hidden glass shadow-2xl">
              <motion.img 
                src="/artisan-weaving.png" 
                alt="Artisan weaving"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-craft-bgAlt/80 via-transparent to-transparent pointer-events-none"></div>
            </motion.div>
            
            <div className="pl-4 border-l border-craft-accent/20">
              <motion.div variants={fadeInUp} className="text-[11px] font-bold tracking-[0.25em] text-craft-accent uppercase mb-6">Our Intention</motion.div>
              <motion.h2 variants={fadeInUp} className="font-serif text-4xl lg:text-5xl font-bold text-craft-dark mb-8 leading-[1.2]">
                The Maker's Journey,<br/>From Their Hands to Yours
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-[16px] text-craft-brown leading-relaxed mb-6">
                We believe that objects should have a soul. CraftConnect was born from a desire to bypass the mass-produced and celebrate the authentic. We bridge the gap between rural artisans and global lovers of craft through direct communication and fair-trade principles.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-[16px] text-craft-brown leading-relaxed mb-12">
                Every purchase on our platform supports a lineage of skills that have been passed down for generations. No middlemen, no mystery—just pure intention.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex gap-16">
                <div>
                  <div className="font-serif text-5xl text-craft-dark mb-2 tracking-tight">100%</div>
                  <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-craft-brown">Direct Trade</div>
                </div>
                <div>
                  <div className="font-serif text-5xl text-craft-dark mb-2 tracking-tight">240<span className="text-craft-accent">+</span></div>
                  <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-craft-brown">Active Workshops</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Join the Maker's Circle (Newsletter Callout) */}
      <section className="px-8 py-40 text-center max-w-2xl mx-auto relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-8 text-craft-accent">
            <div className="w-16 h-16 rounded-full glass flex items-center justify-center border border-craft-accent/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="font-serif text-4xl font-bold text-craft-dark mb-6">Join the Maker's Circle</motion.h2>
          <motion.p variants={fadeInUp} className="text-[16px] text-craft-brown leading-relaxed mb-12">
            Monthly stories from the studios, early access to collections, and invitations to virtual workshops.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex w-full glass p-2 rounded-full border border-craft-border/50 focus-within:border-craft-accent/50 transition-colors">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-6 py-4 text-sm focus:outline-none text-craft-dark bg-transparent placeholder:text-craft-brown/50"
            />
            <button className="bg-craft-accent text-white px-10 py-4 text-sm font-bold tracking-[0.1em] rounded-full hover:shadow-[0_0_15px_rgba(217,119,87,0.3)] hover:-translate-y-0.5 transition-all duration-300">
              SUBSCRIBE
            </button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}