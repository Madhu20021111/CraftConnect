"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function OnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="min-h-screen bg-craft-bg flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-craft-bg flex flex-col items-center justify-center py-12 px-6">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-craft-dark mb-4">Welcome, {session?.user?.name}!</h1>
        <p className="text-craft-brown text-[15px]">To get started, tell us how you'll be using CraftConnect.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Artisan Option */}
        <div className="bg-white rounded-3xl border border-craft-border p-8 hover:shadow-lg hover:border-craft-tan transition-all flex flex-col text-center">
          <div className="text-6xl mb-6">🏺</div>
          <h2 className="font-serif text-2xl font-bold text-craft-dark mb-3">I am an Artisan</h2>
          <p className="text-sm text-craft-brown leading-relaxed mb-8 flex-1">
            I create handcrafted goods and want to showcase my work, connect with buyers, and share my story.
          </p>
          <Link href="/artisans/join" className="w-full bg-craft-accent text-white py-3.5 rounded-xl text-sm font-bold shadow-sm inline-block">
            Setup Artisan Profile
          </Link>
        </div>

        {/* Customer Option */}
        <div className="bg-white rounded-3xl border border-craft-border p-8 hover:shadow-lg hover:border-craft-tan transition-all flex flex-col text-center">
          <div className="text-6xl mb-6">🛍️</div>
          <h2 className="font-serif text-2xl font-bold text-craft-dark mb-3">I am a Customer</h2>
          <p className="text-sm text-craft-brown leading-relaxed mb-8 flex-1">
            I want to discover authentic, handcrafted pieces and support artisans directly from around the world.
          </p>
          <Link href="/products" className="w-full bg-transparent border border-craft-border text-craft-dark py-3.5 rounded-xl text-sm font-bold shadow-sm inline-block hover:bg-craft-bgAlt">
            Start Exploring
          </Link>
        </div>
      </div>
    </div>
  );
}
