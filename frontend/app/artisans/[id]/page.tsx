"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/services/api";
import ProductCard from "@/components/ProductCard";

interface Artisan {
  id: number;
  name: string;
  village: string;
  craft_type: string;
  years_experience: number;
  contact_number: string;
  email: string;
  image_url: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
}

export default function ArtisanProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchArtisanData = async () => {
      try {
        // Fetch artisan details
        const artisanRes = await api.get(`/artisans/${id}`);
        setArtisan(artisanRes.data);

        // Fetch their products
        const productsRes = await api.get(`/products/artisan/${id}`);
        setProducts(productsRes.data);
      } catch (err) {
        console.error("Failed to fetch artisan data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisanData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-craft-bg pt-24 pb-24 flex items-center justify-center text-craft-brown animate-pulse text-lg">
        Summoning artisan details...
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="min-h-screen bg-craft-bg pt-24 pb-24 flex flex-col items-center justify-center text-craft-dark">
        <h1 className="font-serif text-3xl mb-4">Artisan Not Found</h1>
        <p className="text-craft-brown mb-8">This maker's profile might have been removed or doesn't exist.</p>
        <button onClick={() => router.push('/artisans')} className="px-6 py-3 bg-craft-accent text-white font-bold tracking-widest text-[11px] uppercase">
          Back to Makers
        </button>
      </div>
    );
  }

  const displayImage = artisan.image_url 
    ? artisan.image_url 
    : "https://images.unsplash.com/photo-1544965850-6f91f37e69c1?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-craft-bg text-craft-dark pb-24">
      {/* Hero Header */}
      <div className="relative h-[30vh] min-h-[250px] overflow-hidden bg-craft-brown">
        <div className="absolute inset-0 bg-[#3A332E] opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-craft-bg to-transparent"></div>
      </div>

      {/* Profile Section */}
      <div className="max-w-5xl mx-auto px-8 relative -mt-32 z-10 mb-20">
        <div className="glass bg-white/80 p-8 md:p-12 rounded-2xl shadow-sm border border-craft-border/50 flex flex-col md:flex-row gap-10 items-start">
          {/* Avatar */}
          <motion.div 
            className="w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden shadow-lg shrink-0 border-4 border-white bg-craft-bgAlt"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src={displayImage} alt={artisan.name} className="w-full h-full object-cover" />
          </motion.div>

          {/* Details */}
          <div className="flex-1 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-[11px] font-bold tracking-[0.25em] text-craft-accent uppercase mb-2">
                {artisan.craft_type}
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-craft-dark mb-4">{artisan.name}</h1>
              
              <div className="flex flex-wrap gap-y-3 gap-x-6 mb-8 text-sm text-craft-brown font-medium">
                {artisan.village && (
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-craft-accent shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span>{artisan.village}</span>
                  </div>
                )}
                {artisan.years_experience && (
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-craft-accent shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{artisan.years_experience} Years Experience</span>
                  </div>
                )}
                {artisan.contact_number && (
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-craft-accent shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <a href={`tel:${artisan.contact_number}`} className="hover:text-craft-accent hover:underline transition-colors">
                      {artisan.contact_number}
                    </a>
                  </div>
                )}
                {artisan.email && (
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-craft-accent shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <a href={`mailto:${artisan.email}`} className="hover:text-craft-accent hover:underline transition-colors">
                      {artisan.email}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-craft-border/50">
                {artisan.email && (
                  <a 
                    href={`mailto:${artisan.email}`}
                    className="bg-craft-accent text-white px-8 py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-craft-dark transition-all duration-300 rounded-xl text-center shadow-sm flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <span>Email Artisan</span>
                  </a>
                )}
                {artisan.contact_number && (
                  <a 
                    href={`tel:${artisan.contact_number}`}
                    className="border border-craft-border bg-white text-craft-dark px-8 py-3 text-[11px] font-bold tracking-widest uppercase hover:bg-craft-bgAlt transition-all duration-300 rounded-xl text-center flex items-center justify-center gap-2 shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-craft-accent">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <span>Call: {artisan.contact_number}</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Artisan's Collection */}
      <div className="max-w-7xl mx-auto px-8 lg:px-24">
        <h2 className="font-serif text-3xl font-bold text-craft-dark mb-2">Collection</h2>
        <p className="text-craft-brown text-[14px] mb-10">Handcrafted pieces by {artisan.name}</p>

        {products.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-craft-border/50 rounded-2xl glass">
            <span className="text-4xl mb-4 block opacity-50">🏺</span>
            <p className="text-craft-brown font-medium">This artisan hasn't uploaded any pieces yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard 
                key={p.id}
                id={p.id}
                imageUrl={p.image_url ? (p.image_url.startsWith('http') ? p.image_url : `http://localhost:5000/uploads${p.image_url.startsWith('/') ? '' : '/'}${p.image_url}`) : undefined}
                name={p.name}
                price={p.price}
                artisanName={artisan.name}
                artisanAvatar={displayImage}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
