"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import api from "@/services/api";

export default function NewArtworkPage() {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [isPublishing, setIsPublishing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Textiles",
    price: "",
    material: "",
    color: "",
    size: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    
    try {
      const data = new FormData();
      if (imageFile) {
        data.append("image", imageFile);
      }
      
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("material", formData.material);
      data.append("color", formData.color);
      data.append("size", formData.size);
      
      // Default to artisan ID 1 if session is unavailable (for testing purposes)
      const artisanId = (session?.user as any)?.id || "1";
      const email = session?.user?.email || "";
      data.append("artisan_id", artisanId as string);
      data.append("email", email);

      await api.post("/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      
      router.push("/dashboard/artworks");
    } catch (error) {
      console.error("Error publishing artwork:", error);
      alert("Failed to publish artwork. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/artworks">
          <button className="w-10 h-10 rounded-full bg-white border border-craft-border flex items-center justify-center text-craft-brown hover:text-craft-accent hover:border-craft-accent shadow-sm transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
        </Link>
        <div>
          <h1 className="font-serif text-3xl font-bold text-craft-dark mb-1">Publish New Artwork</h1>
          <p className="text-[13px] text-craft-brown">Add a new handcrafted piece to your shop.</p>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-craft-border/50">
        <form onSubmit={handlePublish} className="flex flex-col gap-6">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Artwork Photo</label>
            <label className="w-full h-48 flex flex-col items-center justify-center gap-3 bg-white/50 border-2 border-craft-border/50 border-dashed text-craft-brown px-4 py-4 rounded-xl cursor-pointer hover:bg-white transition-all text-[13px] font-semibold relative overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-12 h-12 bg-craft-bgAlt rounded-full flex items-center justify-center text-craft-accent shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <span className="text-craft-dark font-bold">Click to upload</span> or drag and drop
                    <p className="text-[10px] font-normal mt-1">High resolution PNG, JPG up to 10MB</p>
                  </div>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} required />
            </label>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Artwork Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Handwoven Cotton Throw"
              className="w-full bg-white/50 border border-craft-border/50 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Description</label>
            <textarea 
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the inspiration, process, and story behind this piece..."
              className="w-full bg-white/50 border border-craft-border/50 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-medium resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white/50 border border-craft-border/50 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold appearance-none"
              >
                <option value="Textiles">Textiles</option>
                <option value="Ceramics">Ceramics</option>
                <option value="Woodwork">Woodwork</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Glass">Glass</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Price (USD)</label>
              <input 
                type="number" 
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="0.00"
                className="w-full bg-white/50 border border-craft-border/50 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Material</label>
              <input 
                type="text" 
                name="material"
                value={formData.material}
                onChange={handleChange}
                placeholder="e.g., Organic Cotton"
                className="w-full bg-white/50 border border-craft-border/50 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Color / Finish</label>
              <input 
                type="text" 
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g., Natural Indigo"
                className="w-full bg-white/50 border border-craft-border/50 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold"
              />
            </div>
            
            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Dimensions / Size</label>
              <input 
                type="text" 
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="e.g., 50x60 inches"
                className="w-full bg-white/50 border border-craft-border/50 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-craft-border/50 flex justify-end gap-3">
            <Link href="/dashboard/artworks">
              <button 
                type="button"
                className="bg-white border border-craft-border text-craft-dark px-6 py-3 rounded-xl text-[12px] font-bold uppercase tracking-widest shadow-sm hover:bg-craft-bgAlt transition-all"
              >
                Cancel
              </button>
            </Link>
            <button 
              type="submit"
              disabled={isPublishing}
              className={`bg-craft-accent text-white px-8 py-3 rounded-xl text-[12px] font-bold uppercase tracking-widest shadow-md hover:bg-craft-dark transition-all ${isPublishing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isPublishing ? "Publishing..." : "Publish Artwork"}
            </button>
          </div>
          
        </form>
      </div>
    </motion.div>
  );
}
