"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/services/api";

const CRAFT_OPTIONS = [
  { id: "Pottery", name: "Pottery & Ceramics", icon: "🏺", desc: "Clay, terracotta & stoneware" },
  { id: "Weaving", name: "Weaving & Handloom", icon: "🧵", desc: "Textiles, rugs & tapestries" },
  { id: "Woodwork", name: "Woodwork & Carving", icon: "🪵", desc: "Sculpture, furniture & decor" },
  { id: "Jewelry", name: "Jewelry & Metal", icon: "✨", desc: "Silver, brass & gemstones" },
  { id: "Candle Making", name: "Candle & Wax Art", icon: "🕯️", desc: "Hand-poured aromatic craft" },
  { id: "Block Printing", name: "Block Printing & Batik", icon: "🎨", desc: "Traditional fabric prints" },
  { id: "Leather Craft", name: "Leathercraft", icon: "👜", desc: "Hand-stitched leather goods" },
  { id: "Basketry", name: "Basketry & Cane", icon: "🧺", desc: "Natural fiber weaving" }
];

export default function JoinAsArtisan() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    craft_type: "Pottery",
    village: "",
    years_experience: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCraftSelect = (craftId: string) => {
    setFormData(prev => ({ ...prev, craft_type: craftId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.craft_type) {
      setError("Please select your primary craft specialty.");
      setLoading(false);
      return;
    }

    try {
      await api.put("/artisans/my-profile", {
        name: formData.name,
        craft_type: formData.craft_type,
        village: formData.village,
        years_experience: parseInt(formData.years_experience, 10) || 1,
        contact_number: formData.phone,
        email: formData.email,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push(`/dashboard/profile`);
      }, 2200);
    } catch (err: any) {
      console.error("Registration failed:", err);
      setError(err.response?.data?.error || err.response?.data?.message || "Failed to submit application. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-craft-bg flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass bg-white/90 p-10 md:p-14 rounded-3xl max-w-lg w-full text-center shadow-2xl border border-craft-border/60"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner animate-pulse">
            ✨
          </div>
          <span className="text-[11px] font-bold tracking-[0.25em] text-craft-accent uppercase mb-2 block">
            Welcome to the Circle
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-craft-dark mb-4">
            Application Approved!
          </h1>
          <p className="text-craft-brown text-sm leading-relaxed mb-8">
            Your master artisan profile is officially configured. We are redirecting you to your creative studio dashboard...
          </p>
          <div className="w-12 h-1 bg-craft-accent mx-auto rounded-full animate-pulse"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-craft-bg text-craft-dark py-16 px-6 relative overflow-hidden">
      
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-craft-accent/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-craft-brown/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-3xl mx-auto">
        
        {/* Header Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-craft-accent/10 text-craft-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-4 shadow-sm border border-craft-accent/20">
            <span>🏺</span> Join the Maker's Guild
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-craft-dark mb-4 tracking-tight leading-tight">
            Share Your Craft With the World
          </h1>
          <p className="text-craft-brown text-[15px] max-w-xl mx-auto leading-relaxed">
            Create your artisan showcase to display your handcrafted collections and connect directly with conscious buyers worldwide.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass bg-white/80 backdrop-blur-md rounded-3xl border border-craft-border/60 p-8 md:p-12 shadow-xl"
        >
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl font-medium flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Section 1: Artisan Details */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-craft-border/40">
                <span className="w-7 h-7 rounded-full bg-craft-accent text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  1
                </span>
                <h3 className="font-serif text-xl font-bold text-craft-dark">Artisan Profile</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[11px] font-bold text-craft-brown uppercase tracking-widest mb-2">
                    Full / Studio Name <span className="text-craft-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Nirosha Madhumali"
                    className="w-full text-sm px-4 py-3.5 rounded-xl border border-craft-border bg-white text-craft-dark placeholder-craft-brown/40 focus:outline-none focus:border-craft-accent focus:ring-4 focus:ring-craft-accent/10 transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="years_experience" className="block text-[11px] font-bold text-craft-brown uppercase tracking-widest mb-2">
                    Years of Craft Mastery <span className="text-craft-accent">*</span>
                  </label>
                  <input
                    type="number"
                    id="years_experience"
                    name="years_experience"
                    required
                    min="1"
                    max="80"
                    value={formData.years_experience}
                    onChange={handleChange}
                    placeholder="e.g. 10"
                    className="w-full text-sm px-4 py-3.5 rounded-xl border border-craft-border bg-white text-craft-dark placeholder-craft-brown/40 focus:outline-none focus:border-craft-accent focus:ring-4 focus:ring-craft-accent/10 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Craft Specialty Selection */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-craft-border/40">
                <span className="w-7 h-7 rounded-full bg-craft-accent text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  2
                </span>
                <h3 className="font-serif text-xl font-bold text-craft-dark">Select Your Discipline</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {CRAFT_OPTIONS.map((craft) => {
                  const isSelected = formData.craft_type.toLowerCase() === craft.id.toLowerCase();
                  return (
                    <div
                      key={craft.id}
                      onClick={() => handleCraftSelect(craft.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col items-center text-center select-none ${
                        isSelected
                          ? "bg-craft-accent text-white border-craft-accent shadow-md shadow-craft-accent/30 scale-[1.02]"
                          : "bg-white hover:bg-craft-bgAlt border-craft-border/60 text-craft-dark"
                      }`}
                    >
                      <span className="text-2xl mb-2">{craft.icon}</span>
                      <span className="text-[12px] font-bold leading-tight mb-1">{craft.name}</span>
                      <span className={`text-[10px] ${isSelected ? "text-white/80" : "text-craft-brown/60"} leading-tight`}>
                        {craft.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Studio Location & Inquiries */}
            <div>
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-craft-border/40">
                <span className="w-7 h-7 rounded-full bg-craft-accent text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  3
                </span>
                <h3 className="font-serif text-xl font-bold text-craft-dark">Studio & Contact Channels</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="village" className="block text-[11px] font-bold text-craft-brown uppercase tracking-widest mb-2">
                    Studio Village / City / Region <span className="text-craft-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="village"
                    name="village"
                    required
                    maxLength={100}
                    value={formData.village}
                    onChange={handleChange}
                    placeholder="e.g. Embilipitiya, Southern Province"
                    className="w-full text-sm px-4 py-3.5 rounded-xl border border-craft-border bg-white text-craft-dark placeholder-craft-brown/40 focus:outline-none focus:border-craft-accent focus:ring-4 focus:ring-craft-accent/10 transition-all shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-[11px] font-bold text-craft-brown uppercase tracking-widest mb-2">
                      Direct WhatsApp / Phone <span className="text-craft-accent">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +94 76 023 2418"
                      className="w-full text-sm px-4 py-3.5 rounded-xl border border-craft-border bg-white text-craft-dark placeholder-craft-brown/40 focus:outline-none focus:border-craft-accent focus:ring-4 focus:ring-craft-accent/10 transition-all shadow-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[11px] font-bold text-craft-brown uppercase tracking-widest mb-2">
                      Direct Inquiry Email <span className="text-craft-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. artisan@craftconnect.com"
                      className="w-full text-sm px-4 py-3.5 rounded-xl border border-craft-border bg-white text-craft-dark placeholder-craft-brown/40 focus:outline-none focus:border-craft-accent focus:ring-4 focus:ring-craft-accent/10 transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-craft-accent text-white py-4 rounded-2xl text-[12px] font-bold uppercase tracking-widest shadow-lg shadow-craft-accent/25 hover:bg-craft-dark hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Artisan Application</span>
                    <span className="text-lg">→</span>
                  </>
                )}
              </button>
              <p className="text-[12px] text-craft-brown/60 text-center mt-4">
                By submitting, your profile will be featured on the CraftConnect global makers directory.
              </p>
            </div>

          </form>
        </motion.div>

      </div>
    </div>
  );
}