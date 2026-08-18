"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import api from "@/services/api";

interface Profile {
  profile_type: 'user' | 'artisan';
  user_id: number | null;
  artisan_id: number | null;
  name: string;
  email: string;
  role: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setProfiles(res.data);
    } catch (err: any) {
      console.error("Failed to fetch profiles:", err);
      setError("Failed to load profiles. Are you sure you're an admin?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteProfile = async (profile: Profile) => {
    const isConfirmed = window.confirm(
      `⚠️ WARNING ⚠️\n\nAre you sure you want to delete ${profile.name || profile.email}?\n\nThis will permanently delete their data and artworks. This action CANNOT be undone.`
    );

    if (!isConfirmed) return;

    try {
      const id = profile.profile_type === 'user' ? profile.user_id : profile.artisan_id;
      await api.delete(`/admin/profiles/${profile.profile_type}/${id}`);
      
      // Remove the deleted profile from state
      setProfiles(profiles.filter(p => 
        !(p.profile_type === profile.profile_type && p.user_id === profile.user_id && p.artisan_id === profile.artisan_id)
      ));
    } catch (err: any) {
      console.error("Failed to delete profile:", err);
      alert("Failed to delete profile: " + (err.response?.data?.error || err.message));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-craft-bg pt-32 flex justify-center text-craft-brown animate-pulse">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-craft-bg text-craft-dark pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-8">
        
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-craft-border/50 pb-6">
          <div>
            <div className="text-[11px] font-bold tracking-[0.2em] text-craft-accent uppercase mb-2">Admin Control Panel</div>
            <h1 className="font-serif text-4xl font-bold text-craft-dark">User Management</h1>
          </div>
          <div className="bg-craft-accent/10 text-craft-accent px-4 py-2 rounded-full text-[12px] font-bold tracking-widest uppercase">
            Total Profiles: {profiles.length}
          </div>
        </div>

        {error ? (
          <div className="glass bg-white/80 border border-red-200/80 p-10 rounded-2xl text-center max-w-xl mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              🔒
            </div>
            <h2 className="font-serif text-2xl font-bold text-craft-dark mb-2">Access Denied</h2>
            <p className="text-craft-brown text-sm leading-relaxed mb-6">
              The Admin Control Panel is strictly restricted to authorized administrators.
              Please sign in with your designated admin credentials to continue.
            </p>
            <button
              onClick={() => router.push("/auth/signin")}
              className="bg-craft-accent text-white px-8 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-craft-dark transition-all shadow-md"
            >
              Sign In as Admin
            </button>
          </div>
        ) : (
          /* Users Table */
          <div className="glass bg-white/50 rounded-2xl border border-craft-border/50 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-craft-bgAlt border-b border-craft-border/50">
                  <th className="py-5 px-6 text-[10px] font-bold tracking-[0.2em] uppercase text-craft-brown">Type</th>
                  <th className="py-5 px-6 text-[10px] font-bold tracking-[0.2em] uppercase text-craft-brown">Name</th>
                  <th className="py-5 px-6 text-[10px] font-bold tracking-[0.2em] uppercase text-craft-brown">Email</th>
                  <th className="py-5 px-6 text-[10px] font-bold tracking-[0.2em] uppercase text-craft-brown">Role</th>
                  <th className="py-5 px-6 text-[10px] font-bold tracking-[0.2em] uppercase text-craft-brown text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-craft-border/30">
                {profiles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-craft-brown font-medium">
                      No profiles found.
                    </td>
                  </tr>
                ) : (
                  profiles.map((profile, index) => (
                    <motion.tr 
                      key={`${profile.profile_type}-${profile.user_id || profile.artisan_id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-white/40 transition-colors"
                    >
                      <td className="py-4 px-6">
                        {profile.profile_type === 'user' ? (
                          <span className="text-[12px] font-medium text-craft-dark flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            Registered User
                          </span>
                        ) : (
                          <span className="text-[12px] font-medium text-craft-brown flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                            Standalone Artisan
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-[14px] text-craft-dark">{profile.name || "N/A"}</div>
                      </td>
                      <td className="py-4 px-6 text-[13px] text-craft-dark">{profile.email}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${profile.role === 'admin' ? 'bg-craft-dark text-white' : profile.role === 'artisan_only' ? 'bg-orange-50 text-orange-600 border border-orange-200' : 'bg-craft-border text-craft-dark'}`}>
                          {profile.role === 'artisan_only' ? 'Artisan Profile' : profile.role}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {profile.email?.toLowerCase() === "niroshamadumali37@gmail.com" ? (
                          <span className="text-[11px] font-bold uppercase tracking-wider text-craft-brown/60 px-3 py-1.5 bg-craft-bg rounded-lg border border-craft-border/60">
                            Primary Admin
                          </span>
                        ) : (
                          <button
                            onClick={() => handleDeleteProfile(profile)}
                            className="bg-transparent border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}

      </div>
    </div>
  );
}
