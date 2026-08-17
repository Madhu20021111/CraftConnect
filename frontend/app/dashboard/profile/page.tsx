"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ArtisanProfilePage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [artisanId, setArtisanId] = useState<number | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_number: "",
    village: "",
    craft_type: "Ceramics",
    years_experience: "",
    image_url: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("craftconnect_token");
    if (!token) {
      router.push("/auth/signin");
      return;
    }

    // Fetch profile
    fetch("http://localhost:5000/api/artisans/my-profile", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then(data => {
        setArtisanId(data.id);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          contact_number: data.contact_number || "",
          village: data.village || "",
          craft_type: data.craft_type || "Ceramics",
          years_experience: data.years_experience || "",
          image_url: data.image_url || ""
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        router.push("/auth/signin");
      });
  }, [router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !artisanId) return;

    const file = e.target.files[0];
    const token = localStorage.getItem("craftconnect_token");

    const formData = new FormData();
    formData.append("profileImage", file);

    setUploadingImage(true);
    try {
      const res = await fetch(`http://localhost:5000/api/artisans/${artisanId}/upload`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setFormData(prev => ({ ...prev, image_url: data.imageUrl }));
      }
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artisanId) return;

    setIsSaving(true);
    const token = localStorage.getItem("craftconnect_token");

    try {
      const res = await fetch(`http://localhost:5000/api/artisans/${artisanId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Profile saved successfully!");
        window.dispatchEvent(new Event("profileUpdated"));
      } else {
        alert("Failed to save profile.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-[13px] text-craft-brown animate-pulse">Loading profile...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Decorative Header */}
      <div className="relative h-48 rounded-t-3xl overflow-hidden mb-8 shadow-sm">
        <img src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=2070&auto=format&fit=crop" alt="Workspace" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-craft-bg/95 to-transparent"></div>
        <div className="absolute bottom-6 left-8">
          <h1 className="font-serif text-4xl font-bold text-craft-dark drop-shadow-md">Artisan Profile</h1>
          <p className="text-[14px] text-craft-dark font-medium mt-1">Manage your craft identity and storefront details.</p>
        </div>
      </div>

      <div className="glass p-8 md:p-12 rounded-b-3xl rounded-t-xl sm:rounded-t-3xl sm:-mt-16 mx-4 sm:mx-0 relative z-10 border border-craft-border/50 shadow-xl bg-white/40">
        <form onSubmit={handleSave} className="flex flex-col gap-10">

          {/* Profile Picture Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 pb-8 border-b border-craft-border/50">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-craft-bgAlt shrink-0 group">
              {formData.image_url ? (
                <img src={formData.image_url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-craft-brown">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                </div>
              )}
              {/* Overlay for hover */}
              <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
              </label>
            </div>

            <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
              <h3 className="font-serif text-xl font-bold text-craft-dark mb-2">Profile Photo</h3>
              <p className="text-[13px] text-craft-brown mb-5 max-w-sm mx-auto sm:mx-0 leading-relaxed">
                This image will be displayed on your product pages and public profile. A high-quality photo of yourself or your workspace is recommended.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-4">
                <label className="text-[11px] font-bold text-craft-accent uppercase tracking-widest cursor-pointer hover:text-craft-dark transition-colors px-4 py-2 border border-craft-accent/30 rounded-full hover:bg-craft-accent/5">
                  {uploadingImage ? "Uploading..." : "Upload Photo"}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                </label>
                {formData.image_url && (
                  <button type="button" onClick={() => setFormData(prev => ({ ...prev, image_url: "" }))} className="text-[11px] font-bold text-red-500 hover:text-red-600 uppercase tracking-widest transition-colors">
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Form Grid sections */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <h3 className="font-serif text-[17px] font-bold text-craft-dark mb-2">Personal Details</h3>
              <p className="text-[13px] text-craft-brown max-w-[200px]">Basic contact information for platform communication and buyer inquiries.</p>
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-craft-dark uppercase tracking-widest ml-1 opacity-70">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/70 border border-craft-border/60 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold hover:border-craft-brown/40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-craft-dark uppercase tracking-widest ml-1 opacity-70">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full bg-craft-bgAlt/50 border border-craft-border/30 text-craft-dark px-4 py-3 rounded-xl focus:outline-none text-[13px] font-semibold opacity-60 cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] font-bold text-craft-dark uppercase tracking-widest ml-1 opacity-70">Contact Number</label>
                <input
                  type="tel"
                  placeholder="+1 234 567 890"
                  value={formData.contact_number}
                  onChange={e => setFormData({ ...formData, contact_number: e.target.value })}
                  className="w-full bg-white/70 border border-craft-border/60 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold hover:border-craft-brown/40"
                />
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-craft-border/40"></div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <h3 className="font-serif text-[17px] font-bold text-craft-dark mb-2">Craft Identity</h3>
              <p className="text-[13px] text-craft-brown max-w-[200px]">What distinguishes and categorizes your handcrafted goods.</p>
            </div>

            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-[10px] font-bold text-craft-dark uppercase tracking-widest ml-1 opacity-70">Village / Location</label>
                <input
                  type="text"
                  placeholder="e.g., Portland, Oregon"
                  value={formData.village}
                  onChange={e => setFormData({ ...formData, village: e.target.value })}
                  className="w-full bg-white/70 border border-craft-border/60 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold hover:border-craft-brown/40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-craft-dark uppercase tracking-widest ml-1 opacity-70">Primary Craft Type</label>
                <div className="relative">
                  <select
                    value={formData.craft_type}
                    onChange={e => setFormData({ ...formData, craft_type: e.target.value })}
                    className="w-full bg-white/70 border border-craft-border/60 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold appearance-none hover:border-craft-brown/40"
                  >
                    <option value="" disabled>Select your craft classification</option>
                    <option value="Bamboo Work">Bamboo Work</option>
                    <option value="Block Printing">Block Printing</option>
                    <option value="Candle Making">Candle Making</option>
                    <option value="Ceramics">Ceramics</option>
                    <option value="Glass">Glassblowing</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Pottery">Pottery</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Weaving">Weaving</option>
                    <option value="Woodwork">Woodwork</option>
                  </select>
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-craft-brown">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-craft-dark uppercase tracking-widest ml-1 opacity-70">Years of Experience</label>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g., 5"
                  value={formData.years_experience}
                  onChange={e => setFormData({ ...formData, years_experience: e.target.value })}
                  className="w-full bg-white/70 border border-craft-border/60 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-[13px] font-semibold hover:border-craft-brown/40"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-craft-border/50 flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="px-6 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest text-craft-dark hover:bg-craft-border/30 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || uploadingImage}
              className={`bg-craft-accent text-white px-8 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-md shadow-craft-accent/30 hover:shadow-lg hover:shadow-craft-accent/40 hover:-translate-y-0.5 transition-all ${isSaving || uploadingImage ? 'opacity-70 cursor-not-allowed transform-none' : ''}`}
            >
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
          </div>

        </form>
      </div>
    </motion.div>
  );
}
