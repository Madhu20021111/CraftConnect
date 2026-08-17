"use client";

import { useState, useEffect, useRef, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function ArtisanDashboard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    craft_type: "",
    village: "",
    years_experience: "",
    contact_number: "",
    email: "",
    image_url: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    // Fetch artisan data
    api.get(`/artisans/${id}`)
      .then((res) => {
        setFormData({
          name: res.data.name || "",
          craft_type: res.data.craft_type || "",
          village: res.data.village || "",
          years_experience: res.data.years_experience || "",
          contact_number: res.data.contact_number || "",
          email: res.data.email || "",
          image_url: res.data.image_url || "",
        });
        if (res.data.image_url) {
          setPreviewUrl(res.data.image_url);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load artisan", err);
        setErrorMsg("Failed to load your profile data.");
        setLoading(false);
      });
  }, [id, status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      let finalImageUrl = formData.image_url;

      // 1. If there's a new file, upload it first
      if (selectedFile) {
        const uploadData = new FormData();
        uploadData.append("profileImage", selectedFile);

        // Ensure you configure axios properly for multipart/form-data
        const uploadRes = await api.post(`/artisans/${id}/upload`, uploadData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        finalImageUrl = uploadRes.data.imageUrl;
      }

      // 2. Update artisan profile
      await api.put(`/artisans/${id}`, {
        ...formData,
        image_url: finalImageUrl
      });

      setFormData(prev => ({ ...prev, image_url: finalImageUrl }));
      setSuccessMsg("Profile updated successfully!");
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-craft-bg flex items-center justify-center">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-craft-bg py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl font-bold text-craft-dark mb-2">Artisan Dashboard</h1>
        <p className="text-craft-brown text-[14px] mb-8">Manage your profile details and studio imagery.</p>

        <div className="bg-white p-8 md:p-10 rounded-2xl border border-craft-border shadow-sm">
          {successMsg && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 text-[13px] rounded-lg">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-[13px] rounded-lg">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Profile Image Section */}
            <div className="flex flex-col md:flex-row gap-8 items-start border-b border-craft-border pb-8">
              <div className="shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-craft-bgAlt border border-craft-border mb-3 relative">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">🏺</div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full text-center text-[11px] font-bold uppercase tracking-widest text-craft-accent hover:text-craft-dark transition-colors"
                >
                  Change Photo
                </button>
              </div>

              <div className="flex-1 pt-2">
                <h3 className="font-serif text-lg font-bold text-craft-dark mb-1">Studio Portrait</h3>
                <p className="text-[13px] text-craft-brown mb-4">
                  Upload a high-quality photo of yourself in your workspace. This helps customers connect with the maker behind the craft.
                </p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-craft-brown uppercase tracking-widest mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-craft-bgAlt text-[13px] text-craft-dark focus:outline-none border border-transparent focus:border-craft-border transition-colors rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-craft-brown uppercase tracking-widest mb-2">Craft Specialization</label>
                <select
                  name="craft_type"
                  required
                  value={formData.craft_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-craft-bgAlt text-[13px] text-craft-dark focus:outline-none border border-transparent focus:border-craft-border transition-colors rounded-sm cursor-pointer"
                >
                  <option value="" disabled>Select your craft</option>
                  <option value="Pottery">Pottery</option>
                  <option value="Weaving">Weaving</option>
                  <option value="Woodwork">Woodwork</option>
                  <option value="Block Printing">Block Printing</option>
                  <option value="Candle Making">Candle Making</option>
                  <option value="Ceramics">Ceramics</option>
                  <option value="Jewelry">Jewelry</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-craft-brown uppercase tracking-widest mb-2">Location / Village</label>
                <input
                  type="text"
                  name="village"
                  required
                  value={formData.village}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-craft-bgAlt text-[13px] text-craft-dark focus:outline-none border border-transparent focus:border-craft-border transition-colors rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-craft-brown uppercase tracking-widest mb-2">Years of Experience</label>
                <input
                  type="number"
                  name="years_experience"
                  required
                  value={formData.years_experience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-craft-bgAlt text-[13px] text-craft-dark focus:outline-none border border-transparent focus:border-craft-border transition-colors rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-craft-brown uppercase tracking-widest mb-2">Contact Number</label>
                <input
                  type="tel"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-craft-bgAlt text-[13px] text-craft-dark focus:outline-none border border-transparent focus:border-craft-border transition-colors rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-craft-brown uppercase tracking-widest mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-craft-bgAlt text-[13px] text-craft-dark focus:outline-none border border-transparent focus:border-craft-border transition-colors rounded-sm"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-craft-border flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="bg-craft-accent text-white px-8 py-3.5 text-[11px] font-bold tracking-widest uppercase hover:bg-opacity-90 transition-all disabled:opacity-50"
              >
                {saving ? "Saving Changes..." : "Save Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
