"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasToken(!!localStorage.getItem("craftconnect_token"));
    }
  }, []);

  useEffect(() => {
    if (hasToken === false && status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, hasToken, router]);

  if (status === "loading" || hasToken === null) {
    return (
      <div className="min-h-screen bg-craft-bg flex items-center justify-center text-craft-brown animate-pulse">
        Preparing your experience...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-craft-bg flex flex-col items-center justify-center py-20 px-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-craft-accent/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-craft-brown/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 max-w-lg"
      >
        <span className="text-[11px] font-bold tracking-[0.25em] text-craft-accent uppercase mb-3 block">
          Welcome to CraftConnect
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-craft-dark mb-4 tracking-tight">
          How will you journey with us?
        </h1>
        <p className="text-craft-brown text-[15px] leading-relaxed">
          Select your path to personalize your CraftConnect experience.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full relative z-10">
        
        {/* Artisan Option */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          whileHover={{ y: -6 }}
          className="glass bg-white/85 rounded-3xl border border-craft-border/60 p-8 md:p-10 shadow-lg flex flex-col items-center text-center group transition-all"
        >
          <div className="w-20 h-20 rounded-2xl bg-craft-accent/10 text-craft-accent flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
            🏺
          </div>
          <h2 className="font-serif text-2xl font-bold text-craft-dark mb-3">I am an Artisan</h2>
          <p className="text-sm text-craft-brown leading-relaxed mb-8 flex-1">
            I craft authentic, handmade pieces and want to publish my studio story, manage collections, and connect directly with collectors.
          </p>
          <Link 
            href="/artisans/join" 
            className="w-full bg-craft-accent text-white py-4 rounded-2xl text-[12px] font-bold uppercase tracking-widest shadow-md shadow-craft-accent/25 hover:bg-craft-dark transition-all text-center block"
          >
            Apply as Master Artisan →
          </Link>
        </motion.div>

        {/* Customer Option */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -6 }}
          className="glass bg-white/85 rounded-3xl border border-craft-border/60 p-8 md:p-10 shadow-lg flex flex-col items-center text-center group transition-all"
        >
          <div className="w-20 h-20 rounded-2xl bg-craft-brown/10 text-craft-brown flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
            ✨
          </div>
          <h2 className="font-serif text-2xl font-bold text-craft-dark mb-3">I am a Collector / Lover of Craft</h2>
          <p className="text-sm text-craft-brown leading-relaxed mb-8 flex-1">
            I want to explore curated handcrafted treasures, discover the masters behind each craft, and inquire directly without middlemen.
          </p>
          <Link 
            href="/products" 
            className="w-full bg-white border border-craft-border text-craft-dark py-4 rounded-2xl text-[12px] font-bold uppercase tracking-widest shadow-sm hover:bg-craft-bgAlt transition-all text-center block"
          >
            Explore Marketplace →
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
