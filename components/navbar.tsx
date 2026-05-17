"use client";

import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function Navbar() {
  const { totalItems, toggleCart } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#6B1E2E] shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 grid grid-cols-3 items-center">
        {/* Left — menu icon */}
        <div className="flex items-center">
          <Link
            href="/menu"
            className="p-2 text-white/80 hover:text-[#C9973A] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </Link>
        </div>

        {/* Center — logo */}
        <div className="flex flex-col items-center justify-center">
          <Link href="/" className="flex items-center justify-center" aria-label="Scoop-a-holics">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/txt-logo.png"
              alt="Scoop-a-holics"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Right — cart icon */}
        <div className="flex items-center justify-end">
          <button
            onClick={toggleCart}
            className="relative p-2 text-white/80 hover:text-[#C9973A] transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#C9973A] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

