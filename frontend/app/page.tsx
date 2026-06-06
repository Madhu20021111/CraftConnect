"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
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

// Fallback high quality Unsplash images for products
const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584347714499-13e51f4728f3?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516054817452-fbc216d29944?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605814041300-34863c0d3810?q=80&w=800&auto=format&fit=crop"
];

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
    <div className="min-h-screen bg-craft-bg">
      <Hero />
      
      {/* Curated Pieces Section */}
      <section className="px-8 lg:px-24 py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-6">
          <div>
            <h2 className="font-serif text-3xl font-bold text-craft-dark mb-2">Curated Hand-Carved Pieces</h2>
            <p className="text-sm text-craft-brown">A rotating gallery of limited edition items sourced directly from workshops around the globe.</p>
          </div>
          <Link href="/products" className="text-[11px] font-bold uppercase tracking-widest text-craft-accent hover:text-craft-dark transition-colors flex items-center gap-1 shrink-0">
            View Entire Collection →
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-sm text-craft-brown py-12">Loading authentic creations...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-sm text-craft-brown py-12">No pieces found in the showroom catalog.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((p, index) => (
              <ProductCard 
                key={p.id}
                imageUrl={PRODUCT_IMAGES[index % PRODUCT_IMAGES.length]}
                badge={index === 0 ? 'New Arrival' : index === 3 ? 'Limited' : undefined}
                name={p.name}
                price={p.price}
                artisanName={p.artisanName}
              />
            ))}
          </div>
        )}
      </section>

      {/* The Maker's Journey */}
      <section className="bg-craft-bgAlt/50">
        <div className="px-8 lg:px-24 py-24 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative h-[600px] rounded-sm overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1544965850-6f91f37e69c1?q=80&w=1000&auto=format&fit=crop" 
                alt="Artisan weaving"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-[0.2em] text-craft-accent uppercase mb-4">Our Intention</div>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-craft-dark mb-6 leading-tight">
                The Maker's Journey, From Their Hands to Yours
              </h2>
              <p className="text-[15px] text-craft-brown leading-relaxed mb-6">
                We believe that objects should have a soul. CraftConnect was born from a desire to bypass the mass-produced and celebrate the authentic. We bridge the gap between rural artisans and global lovers of craft through direct communication and fair-trade principles.
              </p>
              <p className="text-[15px] text-craft-brown leading-relaxed mb-12">
                Every purchase on our platform supports a lineage of skills that have been passed down for generations. No middlemen, no mystery—just pure intention.
              </p>
              <div className="flex gap-16">
                <div>
                  <div className="font-serif text-4xl text-craft-dark mb-1">100%</div>
                  <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-craft-brown">Direct Trade</div>
                </div>
                <div>
                  <div className="font-serif text-4xl text-craft-dark mb-1">240<span className="text-craft-accent">+</span></div>
                  <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-craft-brown">Active Workshops</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Maker's Circle (Newsletter Callout) */}
      <section className="px-8 py-32 text-center max-w-xl mx-auto">
        <div className="flex justify-center mb-6 text-craft-accent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <h2 className="font-serif text-3xl font-bold text-craft-dark mb-4">Join the Maker's Circle</h2>
        <p className="text-sm text-craft-brown leading-relaxed mb-8">
          Monthly stories from the studios, early access to collections, and invitations to virtual workshops.
        </p>
        <div className="flex w-full overflow-hidden">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-1 px-5 py-4 text-sm focus:outline-none text-craft-dark bg-craft-bgAlt border-none"
          />
          <button className="bg-craft-accent text-white px-8 text-sm font-bold tracking-wide hover:bg-opacity-90 transition-all">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}