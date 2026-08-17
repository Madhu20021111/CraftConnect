"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function JoinAsArtisan() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Form states configured to include contact channels along with your schema
  const [formData, setFormData] = useState({
    name: "",
    craft_type: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Update the empty profile allocated during registration
      const response = await api.put("/artisans/my-profile", {
        name: formData.name,
        craft_type: formData.craft_type,
        village: formData.village,
        years_experience: parseInt(formData.years_experience, 10),
        contact_number: formData.phone, // changed from 'phone' to 'contact_number'
        email: formData.email,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push(`/dashboard/profile`);
      }, 2000);
    } catch (err: any) {
      console.error("Registration failed:", err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl mb-4 shadow-sm animate-bounce">
          ✨
        </div>
        <h1 className="text-2xl font-bold text-craft-dark mb-2">Registration Complete!</h1>
        <p className="text-sm text-craft-brown max-w-sm">
          Your profile has been saved successfully with your contact details. Redirecting to your dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 max-w-xl mx-auto">
      <div className="bg-white rounded-3xl border border-[#e8d5c0] p-8 md:p-10 shadow-md">
        <div className="text-center mb-10">
          <span className="text-3xl mb-3 block">⚒️</span>
          <h1 className="text-2xl md:text-3xl font-bold text-[#4B2E2B] tracking-tight">Join as an Artisan</h1>
          <p className="text-sm text-[#8C5A3C] mt-2 leading-relaxed font-medium">
            Register your profile to showcase your traditional skills and receive inquiries from craft lovers worldwide.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl font-medium">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* name */}
          <div>
            <label htmlFor="name" className="block text-[11px] font-bold text-[#8C5A3C] uppercase tracking-widest mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              maxLength={100}
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Rania Al-Farsi"
              className="w-full text-sm px-4 py-3 rounded-xl border border-[#e8d5c0] bg-white text-[#4B2E2B] placeholder-gray-400 focus:outline-none focus:border-[#8C5A3C] focus:ring-4 focus:ring-[#e0c4a0]/20 transition-all"
            />
          </div>

          {/* craft_type Dropdown */}
          <div>
            <label htmlFor="craft_type" className="block text-[11px] font-bold text-[#8C5A3C] uppercase tracking-widest mb-2">
              Type of Craft
            </label>
            <select
              id="craft_type"
              name="craft_type"
              required
              value={formData.craft_type}
              onChange={handleChange}
              className="w-full text-sm px-4 py-3 rounded-xl border border-[#e8d5c0] bg-white text-[#4B2E2B] focus:outline-none focus:border-[#8C5A3C] focus:ring-4 focus:ring-[#e0c4a0]/20 transition-all"
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
          </div>

          {/* village */}
          <div>
            <label htmlFor="village" className="block text-[11px] font-bold text-[#8C5A3C] uppercase tracking-widest mb-2">
              Village / Town / Location
            </label>
            <input
              type="text"
              id="village"
              name="village"
              required
              maxLength={100}
              value={formData.village}
              onChange={handleChange}
              placeholder="e.g., Nizwa, Oman"
              className="w-full text-sm px-4 py-3 rounded-xl border border-[#e8d5c0] bg-white text-[#4B2E2B] placeholder-gray-400 focus:outline-none focus:border-[#8C5A3C] focus:ring-4 focus:ring-[#e0c4a0]/20 transition-all"
            />
          </div>

          {/* years_experience */}
          <div>
            <label htmlFor="years_experience" className="block text-[11px] font-bold text-[#8C5A3C] uppercase tracking-widest mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              id="years_experience"
              name="years_experience"
              required
              min="0"
              max="99"
              value={formData.years_experience}
              onChange={handleChange}
              placeholder="e.g., 12"
              className="w-full text-sm px-4 py-3 rounded-xl border border-[#e8d5c0] bg-white text-[#4B2E2B] placeholder-gray-400 focus:outline-none focus:border-[#8C5A3C] focus:ring-4 focus:ring-[#e0c4a0]/20 transition-all"
            />
          </div>

          {/* Contact Details Grid Block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-[#e8d5c0]/50 pt-6 mt-6">
            {/* phone */}
            <div>
              <label htmlFor="phone" className="block text-[11px] font-bold text-[#8C5A3C] uppercase tracking-widest mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., +94 7X XXX XXXX"
                className="w-full text-sm px-4 py-3 rounded-xl border border-[#e8d5c0] bg-white text-[#4B2E2B] placeholder-gray-400 focus:outline-none focus:border-[#8C5A3C] focus:ring-4 focus:ring-[#e0c4a0]/20 transition-all"
              />
            </div>

            {/* email */}
            <div>
              <label htmlFor="email" className="block text-[11px] font-bold text-[#8C5A3C] uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g., name@example.com"
                className="w-full text-sm px-4 py-3 rounded-xl border border-[#e8d5c0] bg-white text-[#4B2E2B] placeholder-gray-400 focus:outline-none focus:border-[#8C5A3C] focus:ring-4 focus:ring-[#e0c4a0]/20 transition-all"
              />
            </div>
          </div>

          {/* Submit Action Block */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#8C5A3C] text-white py-3.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing Application...
              </>
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}