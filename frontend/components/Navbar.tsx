"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const [localUser, setLocalUser] = useState<{ email: string } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("craftconnect_token");
    const email = localStorage.getItem("craftconnect_user_email");
    if (token && email) {
      setLocalUser({ email });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("craftconnect_token");
    localStorage.removeItem("craftconnect_user_email");
    if (session) {
      signOut({ callbackUrl: '/' });
    } else {
      window.location.href = "/";
    }
  };

  return (
    <nav className="w-full bg-craft-bg border-b border-craft-border py-5 px-8 flex justify-between items-center sticky top-0 z-50">
      {/* Left Logo */}
      <div className="flex items-center w-1/3">
        <Link href="/" className="flex items-center gap-3">
          <img src="/cc logo.png" alt="CraftConnect Logo" className="absolute h-29 w-auto object-contain" />
          <span className="font-serif text-2xl ml-25 font-bold tracking-tight text-craft-dark">
            CraftConnect
          </span>
        </Link>
      </div>

      {/* Center Links */}
      <div className="w-1/3 flex justify-center gap-8 items-center text-center">
        <Link href="/" className="text-craft-dark text-[13px] font-bold tracking-widest uppercase hover:text-craft-accent transition-colors">
          Home
        </Link>
        <Link href="/products" className="text-craft-dark text-[13px] font-bold tracking-widest uppercase hover:text-craft-accent transition-colors">
          Shop
        </Link>
        <Link href="/artisans" className="text-craft-dark text-[13px] font-bold tracking-widest uppercase hover:text-craft-accent transition-colors">
          Artisans
        </Link>
      </div>

      {/* Right Icons & Auth */}
      <div className="flex gap-6 items-center justify-end w-1/3 text-craft-dark">
        {(!isMounted || status === "loading") ? (
          <div className="w-6 h-6 animate-pulse bg-craft-bgAlt rounded-full"></div>
        ) : (session || localUser) ? (
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={session?.user?.image || "https://ui-avatars.com/api/?name=" + (session?.user?.name || localUser?.email || "User")}
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-transparent group-hover:border-craft-accent transition-all object-cover shadow-sm bg-craft-bgAlt"
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-3 h-3 text-craft-brown transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white border border-craft-border/50 rounded-2xl shadow-xl py-2 z-50">
                <div className="px-4 py-3 border-b border-craft-border/50">
                  <p className="text-[11px] font-bold text-craft-dark uppercase tracking-widest opacity-60 mb-1">Signed in as</p>
                  <p className="text-[13px] font-semibold text-craft-dark truncate">
                    {session?.user?.email || localUser?.email}
                  </p>
                </div>
                <div className="p-2">
                  <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2.5 text-[13px] font-bold text-craft-dark hover:bg-craft-bgAlt hover:text-craft-accent rounded-xl transition-colors">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2.5 text-[13px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-1"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link href="/auth/signin" className="text-[13px] font-bold tracking-widest uppercase text-craft-dark hover:text-craft-accent transition-colors">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}