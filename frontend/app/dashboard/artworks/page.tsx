"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProductCard from "@/components/ProductCard";
import api from "@/services/api";

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1580226343513-3b1029cba5ac?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584347714499-13e51f4728f3?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516054817452-fbc216d29944?q=80&w=800&auto=format&fit=crop"
];

export default function ArtisanArtworksPage() {
  const { data: session } = useSession();
  const [myArtworks, setMyArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      const email = session?.user?.email;
      if (!email) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get(`/products/artisan/${email}`);
        setMyArtworks(res.data);
      } catch (error) {
        console.error("Failed to fetch artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    // If session is still loading, NextAuth will eventually update it.
    // However, if we're not using auth strongly yet, we can just fetch.
    fetchArtworks();
  }, [session]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-craft-dark mb-2">My Artworks</h1>
          <p className="text-[13px] text-craft-brown">Manage and publish your handcrafted creations to the world.</p>
        </div>
        <Link href="/dashboard/artworks/new">
          <button className="bg-craft-accent text-white px-6 py-3 rounded-xl text-[12px] font-bold uppercase tracking-widest shadow-md hover:bg-craft-dark transition-all flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Publish New
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 text-[13px] text-craft-brown font-semibold animate-pulse">
          Loading your artworks...
        </div>
      ) : myArtworks.length === 0 ? (
        <div className="glass-panel p-16 rounded-2xl border border-craft-border/50 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-craft-accent mb-4 shadow-sm border border-craft-border/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h3 className="font-serif text-xl font-bold text-craft-dark mb-2">No artworks published yet</h3>
          <p className="text-[13px] text-craft-brown max-w-sm mb-6">You haven't listed any of your creations. Publish your first artwork to start selling.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myArtworks.map((art, i) => (
            <div key={art.id} className="flex flex-col h-full relative group">
              <ProductCard 
                imageUrl={art.image_url ? `http://localhost:5000/uploads${art.image_url}` : PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]}
                name={art.name}
                price={art.price}
                artisanName={art.artisan_name || 'You'}
              />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full text-craft-dark flex items-center justify-center hover:text-craft-accent shadow-sm border border-craft-border">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
                <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full text-red-500 flex items-center justify-center hover:bg-red-50 shadow-sm border border-craft-border">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
