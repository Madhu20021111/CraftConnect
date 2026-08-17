"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import api from "@/services/api";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchProductDetails = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        
        // Optionally fetch related products by this artisan or just general products
        const relatedRes = await api.get('/products');
        // Filter out current product and get up to 4
        setRelatedProducts(relatedRes.data.filter((p: any) => p.id !== Number(id)).slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-craft-bg pt-24 pb-24 flex items-center justify-center text-craft-brown animate-pulse text-lg">
        Loading craftwork details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-craft-bg pt-24 pb-24 flex flex-col items-center justify-center text-craft-dark">
        <h1 className="font-serif text-3xl mb-4">Artwork Not Found</h1>
        <p className="text-craft-brown mb-8">The piece you are looking for might have been removed or doesn't exist.</p>
        <button onClick={() => router.push('/products')} className="px-6 py-3 bg-craft-accent text-white font-bold tracking-widest text-[11px] uppercase">
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-craft-bg pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-24">
        
        {/* Top Product Section */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mb-24">
          
          {/* Images */}
          <div>
            <div className="aspect-[4/5] bg-[#E8E8E8] mb-4 w-full rounded-md overflow-hidden shadow-sm">
              <img 
                src={product.image_url ? `http://localhost:5000/uploads${product.image_url}` : "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop"} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="py-4">
            <div className="text-[11px] text-craft-brown mb-6 font-medium tracking-widest uppercase">
              {product.category || "General"}
            </div>
            
            <h1 className="font-serif text-4xl font-bold text-craft-dark mb-4 leading-tight">{product.name}</h1>
            <div className="text-lg font-bold text-craft-accent mb-8">Rs. {Number(product.price).toFixed(2)}</div>

            {(product.material || product.color) && (
              <div className="flex gap-3 mb-8 flex-wrap">
                {product.material && (
                  <span className="bg-craft-bgAlt text-craft-accent px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">
                    {product.material}
                  </span>
                )}
                {product.color && (
                  <span className="bg-craft-bgAlt text-craft-accent px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm">
                    {product.color}
                  </span>
                )}
              </div>
            )}

            <p className="text-[14px] text-craft-dark leading-relaxed mb-10 whitespace-pre-wrap">
              {product.description || "No description provided."}
            </p>

            {product.size && (
              <div className="border-t border-craft-border py-6">
                <div className="text-[10px] font-bold tracking-widest uppercase text-craft-brown mb-2">Dimensions / Size</div>
                <div className="text-[13px] text-craft-dark font-medium">{product.size}</div>
              </div>
            )}

            <div className="flex flex-col gap-3 mt-8">
              <Link 
                href={`/artisans/${product.artisan_id}`}
                className="bg-craft-accent text-white w-full py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-opacity-90 transition-all shadow-md text-center block"
              >
                View Artisan Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Meet the Artisan Block */}
        <div className="bg-[#FAF7F2] rounded-md p-10 md:p-16 mb-32 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 border border-[#EBE5DE] shadow-sm">
          <div className="md:w-1/2 relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-lg bg-craft-brown text-craft-bg flex items-center justify-center font-serif text-xl shadow-inner border border-craft-border">
                {(product.artisan_name || 'A').charAt(0)}
              </div>
              <div>
                <div className="font-serif font-bold text-[17px] text-craft-dark">Meet {product.artisan_name}</div>
                <div className="text-[10px] tracking-widest uppercase text-craft-brown font-semibold mt-1">
                  {product.village || "Independent Artisan"}
                </div>
              </div>
            </div>
            
            <h3 className="font-serif text-2xl font-bold text-craft-accent mb-4">Crafting Heritage</h3>
            <p className="text-[13.5px] text-craft-dark leading-relaxed mb-10">
              Each piece by {product.artisan_name} is made with deep dedication to the craft of {product.craft_type || "their unique discipline"}. By contacting the artisan directly, you are supporting their workshop and helping preserve traditional crafting techniques.
            </p>
            
            <div className="flex gap-6">
              <a href={`mailto:${product.email}`} className="text-[11px] font-bold tracking-widest uppercase text-craft-accent hover:text-craft-dark flex items-center gap-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Contact {product.artisan_name?.split(' ')[0]}
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 relative md:absolute md:-right-10 md:top-10 md:-bottom-10 z-0 rotate-2 shadow-2xl overflow-hidden aspect-square md:aspect-auto border-4 border-white/50">
            <img 
              src="https://images.unsplash.com/photo-1513689404283-c7524ccb50a9?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover"
              alt="Artisan Studio"
            />
          </div>
        </div>

        {/* More from the Studio */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex justify-between items-end mb-10 border-b border-craft-border pb-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-craft-dark mb-1">More Pieces</h2>
                <p className="text-[13px] text-craft-brown">Other handcrafted items you might love.</p>
              </div>
              <Link href="/products" className="text-[11px] font-bold tracking-widest uppercase text-craft-accent hover:text-craft-dark transition-colors border-b border-craft-accent pb-0.5">
                View Collection
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard 
                  key={p.id}
                  id={p.id}
                  imageUrl={p.image_url ? `http://localhost:5000/uploads${p.image_url}` : undefined}
                  name={p.name}
                  price={p.price}
                  artisanName={p.artisan_name || p.artisanName || 'Unknown'}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
