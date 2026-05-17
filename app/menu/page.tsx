"use client";

import { useState } from "react";
import { menuCategories } from "@/lib/menu-data";
import MenuCard from "@/components/menu-card";
import { useCart } from "@/context/cart-context";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { totalItems, totalPrice, openCart } = useCart();

  const filtered =
    activeCategory === "all"
      ? menuCategories
      : menuCategories.filter((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-36">
      {/* Header banner */}
      <div className="bg-[#6B1E2E] px-4 pt-10 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-heading text-4xl font-bold text-white mb-1">
            Our Menu
          </h1>
          <p className="text-white/60 text-sm">Made fresh daily in Uyo</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10">
        {/* Category pill tabs */}
        <div className="bg-white rounded-2xl shadow-md p-1.5 flex gap-1 overflow-x-auto no-scrollbar mb-8 sticky top-16 z-20">
          <button
            onClick={() => setActiveCategory("all")}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeCategory === "all"
                ? "bg-[#6B1E2E] text-white shadow-sm"
                : "text-gray-500 hover:text-[#6B1E2E] hover:bg-[#FFF8F0]"
            }`}
          >
            All Items
          </button>
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? "bg-[#6B1E2E] text-white shadow-sm"
                  : "text-gray-500 hover:text-[#6B1E2E] hover:bg-[#FFF8F0]"
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu sections */}
        {filtered.map((category) => (
          <section key={category.id} id={category.id} className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">{category.emoji}</span>
              <h2 className="font-heading text-2xl font-bold text-[#6B1E2E]">
                {category.name}
              </h2>
              <div className="flex-1 h-px bg-[#F0E4D8]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {category.items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Floating order bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-4 right-4 z-30 flex justify-center">
          <button
            onClick={openCart}
            className="w-full max-w-lg flex items-center justify-between bg-[#6B1E2E] text-white px-5 py-4 rounded-2xl shadow-2xl shadow-[#6B1E2E]/50 hover:bg-[#4A1520] transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-lg w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                {totalItems}
              </div>
              <span className="font-semibold text-sm">View Order</span>
            </div>
            <span className="font-bold text-[#C9973A]">
              ₦{totalPrice.toLocaleString()}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
