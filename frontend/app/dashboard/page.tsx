"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("craftconnect_user_email");
    if (email && email.toLowerCase() === "niroshamadumali37@gmail.com") {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/dashboard/profile");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-craft-bg flex items-center justify-center text-craft-brown animate-pulse">
      Routing to your dashboard...
    </div>
  );
}
