"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ArtisanProfilePage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-craft-dark mb-2">My Profile</h1>
        <p className="text-[13px] text-craft-brown">Update your artisan details and contact information so buyers can connect with you.</p>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-craft-border/50">
        <form onSubmit={handleSave} className="flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Full Name</label>
              <input 
                type="text" 
                defaultValue="Jane Doe"
                className="w-full bg-white/50 border border-craft-border/50 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Email Address</label>
              <input 
                type="email" 
                defaultValue="jane@example.com"
                className="w-full bg-white/50 border border-craft-border/50 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Phone / Contact Number</label>
              <input 
                type="tel" 
                placeholder="+1 234 567 890"
                className="w-full bg-white/50 border border-craft-border/50 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Village / Location</label>
              <input 
                type="text" 
                placeholder="e.g., Portland, Oregon"
                className="w-full bg-white/50 border border-craft-border/50 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Craft Type</label>
              <select className="w-full bg-white/50 border border-craft-border/50 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold appearance-none">
                <option value="Ceramics">Ceramics</option>
                <option value="Textiles">Textiles</option>
                <option value="Woodworking">Woodworking</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Glass">Glassblowing</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Years of Experience</label>
              <input 
                type="number" 
                min="0"
                placeholder="e.g., 5"
                className="w-full bg-white/50 border border-craft-border/50 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Profile Image</label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-craft-bgAlt border border-craft-border flex items-center justify-center text-craft-brown shadow-inner overflow-hidden shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div className="flex-1">
                <label className="w-full flex items-center justify-center gap-2 bg-white/50 border border-craft-border/50 border-dashed text-craft-dark px-4 py-4 rounded-xl cursor-pointer hover:bg-white transition-all text-[13px] font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-craft-accent">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                  Click to upload photo
                  <input type="file" accept="image/*" className="hidden" />
                </label>
                <p className="text-[10px] text-craft-brown ml-1 mt-1.5">Max size 5MB. JPG, PNG, WEBP.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-craft-border/50 flex justify-end">
            <button 
              type="submit"
              disabled={isSaving}
              className={`bg-craft-accent text-white px-8 py-3 rounded-xl text-[12px] font-bold uppercase tracking-widest shadow-md hover:bg-craft-dark transition-all ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
          
        </form>
      </div>
    </motion.div>
  );
}
