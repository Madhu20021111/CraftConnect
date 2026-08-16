"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [userData, setUserData] = useState<{name: string, image_url: string | null}>({
    name: "Loading...",
    image_url: null
  });

  const fetchProfile = () => {
    const token = localStorage.getItem("craftconnect_token");
    if (token) {
      fetch("http://localhost:5000/api/artisans/my-profile", {
        headers: { "Authorization": `Bearer ${token}` }
      })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Not ok");
      })
      .then(data => {
        setUserData({ name: data.name || "Artisan", image_url: data.image_url || null });
      })
      .catch(err => console.error(err));
    }
  };

  useEffect(() => {
    fetchProfile();
    // Listen for profile updates from the profile page
    window.addEventListener("profileUpdated", fetchProfile);
    return () => window.removeEventListener("profileUpdated", fetchProfile);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("craftconnect_token");
    router.push("/auth/signin");
  };

  const navItems = [
    { name: "My Profile", href: "/dashboard/profile" },
    { name: "My Artworks", href: "/dashboard/artworks" },
  ];

  return (
    <div className="min-h-screen bg-craft-bg pt-12 pb-24">
      <div className="px-6 lg:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="glass p-6 rounded-2xl border border-craft-border/50 shadow-sm md:sticky top-8">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-craft-border/50">
              <div className="w-12 h-12 rounded-full bg-craft-bgAlt text-craft-accent flex items-center justify-center font-serif text-xl font-bold shadow-sm border border-craft-border overflow-hidden shrink-0">
                {userData.image_url ? (
                  <img src={userData.image_url} alt={userData.name} className="w-full h-full object-cover" />
                ) : (
                  userData.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-craft-dark text-[15px] truncate">{userData.name}</h3>
                <p className="text-[11px] text-craft-brown uppercase tracking-widest font-semibold">Artisan</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname.includes(item.href);
                return (
                  <Link href={item.href} key={item.name}>
                    <div className={`relative px-4 py-3 rounded-xl text-[13px] font-bold transition-all duration-300 ${isActive ? 'text-craft-accent' : 'text-craft-dark hover:bg-white/50'}`}>
                      {isActive && (
                        <motion.div 
                          layoutId="activeTab" 
                          className="absolute inset-0 bg-white shadow-sm border border-craft-border/50 rounded-xl z-0" 
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
            
            <div className="mt-12 pt-6 border-t border-craft-border/50">
              <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-[12px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          {children}
        </main>
        
      </div>
    </div>
  );
}
