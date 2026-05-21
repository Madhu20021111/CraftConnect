"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import api from "@/services/api";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import ArtisanCard from "@/components/ArtisanCard";

interface Product {
  id: string | number;
  emoji: string;
  badge?: string;
  name: string;
  description: string;
  price: string;
  artisanInitials: string;
  artisanName: string;
  bgColor: string;
}

interface Artisan {
  id: string | number;
  initials: string;
  name: string;
  craft: string;
  location: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Parallel fetching for high performance
    Promise.all([
      api.get("/products"),
      api.get("/artisans").catch(() => ({ data: [] })) // Fallback safety layer
    ])
    .then(([prodRes, artRes]) => {
      setProducts(prodRes.data);
      setArtisans(artRes.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Data tracking error:", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Hero />
      
      {/* Featured Products Component Section */}
      <section className="px-6 md:px-12 py-12 max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-bold text-[#4B2E2B] tracking-tight">Featured products</h2>
          <Link href="/products" className="text-xs font-semibold text-[#C08552] hover:underline flex items-center gap-0.5">
            View all →
          </Link>
        </div>
        
        {/* Pills category selector view block matching mockup */}
        <div className="flex gap-2.5 mb-8 overflow-x-auto pb-1 scrollbar-none">
          <button className="bg-[#4B2E2B] text-white text-xs font-medium px-4 py-2 rounded-full shadow-sm shrink-0">All</button>
          <button className="bg-white border border-[#e8d5c0] text-[#8C5A3C] text-xs font-medium px-4 py-2 rounded-full hover:bg-[#FFF8F0] shrink-0">Pottery</button>
          <button className="bg-white border border-[#e8d5c0] text-[#8C5A3C] text-xs font-medium px-4 py-2 rounded-full hover:bg-[#FFF8F0] shrink-0">Textiles</button>
          <button className="bg-white border border-[#e8d5c0] text-[#8C5A3C] text-xs font-medium px-4 py-2 rounded-full hover:bg-[#FFF8F0] shrink-0">Woodwork</button>
        </div>

        {loading ? (
          <div className="text-center text-xs text-[#8C5A3C] font-medium py-12">Loading authentic creations...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-xs text-[#8C5A3C] font-medium py-12">No pieces found in the showroom catalog.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.slice(0, 4).map((p) => (
              <ProductCard 
                key={p.id}
                emoji={p.emoji} 
                badge={p.badge}
                name={p.name}
                description={p.description}
                price={p.price}
                artisanInitials={p.artisanInitials}
                artisanName={p.artisanName}
                bgColor={p.bgColor || "bg-[#f5e6d3]"}
              />
            ))}
          </div>
        )}
      </section>

      {/* Featured Artisans Component Section */}
      <section className="px-6 md:px-12 py-12 border-t border-[#e8d5c0]/60 max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-xl font-bold text-[#4B2E2B] tracking-tight">Featured artisans</h2>
          <Link href="/artisans" className="text-xs font-semibold text-[#C08552] hover:underline flex items-center gap-0.5">
            Meet all →
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center text-xs text-[#8C5A3C] font-medium py-6">Connecting with masters...</div>
        ) : artisans.length === 0 ? (
          // Static visual design fallbacks directly aligning with image specs if backend route is bare
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <ArtisanCard initials="RA" name="Rania Al-Farsi" craft="Pottery" location="Nizwa, Oman" />
            <ArtisanCard initials="DK" name="Devi Krishnan" craft="Weaving" location="Thanjavur, India" />
            <ArtisanCard initials="YH" name="Yusuf Hamdan" craft="Woodwork" location="Essaouira, Morocco" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {artisans.slice(0, 3).map((a) => (
              <ArtisanCard 
                key={a.id}
                initials={a.initials}
                name={a.name}
                craft={a.craft}
                location={a.location}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}