"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/profile";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = login(form.email.trim(), form.password);
    setLoading(false);
    if (!result.success) {
      setError(result.error ?? "Login failed.");
      return;
    }
    router.push(redirect);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-16">
      {/* Header */}
      <div className="bg-[#6B1E2E] px-4 pt-10 pb-20">
        <div className="max-w-md mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="font-heading text-4xl font-bold text-white">Welcome Back</h1>
          <p className="text-white/60 text-sm mt-1">Sign in to your account</p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-10">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0E4D8]">
          {/* Points promo banner */}
          <div className="bg-[#C9973A]/10 border border-[#C9973A]/30 rounded-xl p-3 mb-6 flex items-center gap-3">
            <span className="text-2xl">🎁</span>
            <div>
              <p className="font-semibold text-[#6B1E2E] text-sm">Earn points on every order</p>
              <p className="text-xs text-gray-500">Redeem for <span className="font-semibold">free meals &amp; drinks</span> — 1 pt per ₦100 spent</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                required
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 border border-[#E0D0C0] rounded-xl text-sm focus:outline-none focus:border-[#6B1E2E] focus:ring-2 focus:ring-[#6B1E2E]/20 bg-[#FFF8F0] transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                required
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 border border-[#E0D0C0] rounded-xl text-sm focus:outline-none focus:border-[#6B1E2E] focus:ring-2 focus:ring-[#6B1E2E]/20 bg-[#FFF8F0] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6B1E2E] text-white font-bold py-3.5 rounded-xl text-sm hover:bg-[#4A1520] active:scale-[0.98] transition-all disabled:opacity-60 mt-2"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-[11px] text-gray-400 mt-3 border-t border-[#F0E4D8] pt-3">
            Demo: <span className="font-mono font-semibold text-gray-600">test@gmail.com</span> / <span className="font-mono font-semibold text-gray-600">123456</span>
          </p>

          <p className="text-center text-sm text-gray-500 mt-3">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#6B1E2E] font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
