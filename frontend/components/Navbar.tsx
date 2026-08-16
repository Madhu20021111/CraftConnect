"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

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
        <Link href="/products" className="text-craft-dark text-[13px] font-bold tracking-widest uppercase hover:text-craft-accent transition-colors">
          Shop
        </Link>
        <Link href="/artisans" className="text-craft-dark text-[13px] font-bold tracking-widest uppercase hover:text-craft-accent transition-colors">
          Artisans
        </Link>
      </div>

      {/* Right Icons & Auth */}
      <div className="flex gap-6 items-center justify-end w-1/3 text-craft-dark">
        {status === "loading" ? (
          <div className="w-6 h-6 animate-pulse bg-craft-bgAlt rounded-full"></div>
        ) : session ? (
          <div className="flex items-center gap-4 group relative">
            <Link href="/artisans/1/dashboard" className="text-[13px] font-bold tracking-widest uppercase text-craft-brown hover:text-craft-accent transition-colors hidden sm:block">
              Dashboard
            </Link>
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={session.user?.image || "https://ui-avatars.com/api/?name=User"} alt="Profile" className="w-8 h-8 rounded-full border border-craft-border" />
              <button onClick={() => signOut({ callbackUrl: '/' })} className="text-[11px] font-bold tracking-widest uppercase text-craft-accent hover:underline hidden sm:block">
                Sign Out
              </button>
            </div>
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