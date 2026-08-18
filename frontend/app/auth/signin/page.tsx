"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isSignUp ? "/api/auth/register" : "/api/auth/login";

      const payload = isSignUp
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      // Save token (in a real app, prefer HttpOnly cookies)
      localStorage.setItem("craftconnect_token", data.token);
      localStorage.setItem("craftconnect_user_email", formData.email);

      // Redirect based on role / signup vs login
      if (isSignUp) {
        router.push("/onboarding");
      } else if (data.user?.role === "admin" || formData.email.toLowerCase() === "niroshamadumali37@gmail.com") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-craft-bg flex items-center justify-center py-12 px-6 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-craft-accent/10 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-craft-brown/10 blur-3xl"></div>
      </div>

      <motion.div
        className="glass-panel p-8 sm:p-10 max-w-[420px] w-full rounded-3xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        layout
      >
        <div className="text-center mb-8">
          <motion.h1 layout className="font-serif text-3xl font-bold text-craft-dark mb-2">
            {isSignUp ? "Join the Makers" : "Welcome Back"}
          </motion.h1>
          <motion.p layout className="text-sm text-craft-brown">
            {isSignUp
              ? "Create an account to connect with artisans."
              : "Sign in to continue to CraftConnect."}
          </motion.p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-[12px] font-bold rounded-xl text-center">
            {error}
          </motion.div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleAuth}>
          <AnimatePresence mode="popLayout">
            {isSignUp && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-1.5 pb-1">
                  <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-white/50 border border-craft-border/50 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-sm"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="jane@example.com"
              className="w-full bg-white/50 border border-craft-border/50 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-sm"
            />
          </motion.div>

          <motion.div layout className="flex flex-col gap-1.5 mb-2">
            <label className="text-[11px] font-bold text-craft-dark uppercase tracking-widest ml-1">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-white/50 border border-craft-border/50 text-craft-dark px-4 py-3 rounded-xl focus:outline-none focus:border-craft-accent focus:bg-white transition-all shadow-sm text-sm"
            />
          </motion.div>

          <motion.button
            layout
            disabled={loading}
            className={`w-full bg-craft-accent text-white py-3.5 rounded-xl text-[13px] font-bold uppercase tracking-widest shadow-md hover:bg-craft-dark transition-all duration-300 ${loading ? 'opacity-70' : ''}`}
          >
            {loading ? "Please wait..." : (isSignUp ? "Create Account" : "Sign In")}
          </motion.button>
        </form>

        <motion.div layout className="mt-8 mb-6 flex items-center gap-3">
          <div className="h-px bg-craft-border flex-1"></div>
          <span className="text-[10px] uppercase font-bold text-craft-brown tracking-widest">Or continue with</span>
          <div className="h-px bg-craft-border flex-1"></div>
        </motion.div>

        <motion.button
          layout
          onClick={() => signIn('google', { callbackUrl: '/onboarding' })}
          className="w-full bg-white border border-craft-border text-craft-dark py-3.5 rounded-xl text-[13px] font-bold shadow-sm flex items-center justify-center gap-3 hover:bg-craft-bgAlt hover:border-craft-accent/50 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          Google
        </motion.button>

        <motion.p layout className="mt-8 text-center text-[12px] text-craft-dark">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="ml-2 font-bold text-craft-accent hover:text-craft-dark transition-colors"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}
