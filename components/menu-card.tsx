"use client";

import { Plus, Minus } from "lucide-react";
import { useCart } from "@/context/cart-context";
import type { MenuItem } from "@/lib/menu-data";

export default function MenuCard({ item }: { item: MenuItem }) {
  const { state, addItem, updateQuantity } = useCart();
  const cartItem = state.items.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
    });
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#F0E4D8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Photo */}
      <div className="relative h-36 sm:h-40 overflow-hidden bg-[#F5EBD8] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {quantity > 0 && (
          <div className="absolute top-2 right-2 bg-[#6B1E2E] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
            {quantity}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3">
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-[#6B1E2E] text-[14px] sm:text-[15px] leading-snug">
            {item.name}
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed line-clamp-2">
            {item.description}
          </p>
          <p className="text-[#C9973A] font-bold text-base mt-1.5">
            ₦{item.price.toLocaleString()}
          </p>
        </div>

        <div className="mt-3">
          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="w-full flex items-center justify-center gap-1.5 bg-[#6B1E2E] text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-[#4A1520] active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              Add to Order
            </button>
          ) : (
            <div className="flex items-center justify-between bg-[#FFF8F0] rounded-xl border border-[#E0D0C0] p-1">
              <button
                onClick={() => updateQuantity(item.id, quantity - 1)}
                className="w-8 h-8 rounded-lg bg-white border border-[#E0D0C0] flex items-center justify-center text-[#6B1E2E] hover:bg-[#6B1E2E] hover:text-white hover:border-[#6B1E2E] transition-all"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-bold text-[#6B1E2E] text-sm w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={handleAdd}
                className="w-8 h-8 rounded-lg bg-[#6B1E2E] flex items-center justify-center text-white hover:bg-[#4A1520] transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
