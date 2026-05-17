"use client";

import Link from "next/link";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function CartDrawer() {
  const {
    state,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      {state.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#FFF8F0] z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          state.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-[#6B1E2E] px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="font-heading text-xl font-bold text-white">
              Your Order
            </h2>
            {totalItems > 0 && (
              <p className="text-white/60 text-xs mt-0.5">
                {totalItems} item{totalItems > 1 ? "s" : ""}
              </p>
            )}
          </div>
          <button
            onClick={closeCart}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag className="w-16 h-16 text-[#C9973A]/30 mb-4" />
              <p className="font-heading text-lg text-[#6B1E2E] font-semibold">
                Your cart is empty
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Add something delicious!
              </p>
              <button
                onClick={closeCart}
                className="mt-5 text-sm text-[#C9973A] font-semibold underline underline-offset-2"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#F0E4D8]"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#6B1E2E] text-sm leading-tight">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.category}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-full bg-[#FFF8F0] border border-[#E0D0C0] flex items-center justify-center text-[#6B1E2E] hover:bg-[#6B1E2E] hover:text-white hover:border-[#6B1E2E] transition-all"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-[#6B1E2E] w-6 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full bg-[#6B1E2E] flex items-center justify-center text-white hover:bg-[#4A1520] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-[#C9973A] font-bold text-sm">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="bg-white border-t border-[#F0E4D8] p-4 flex-shrink-0">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium text-sm">
                Subtotal ({totalItems} item{totalItems > 1 ? "s" : ""})
              </span>
              <span className="font-bold text-[#6B1E2E] text-xl">
                ₦{totalPrice.toLocaleString()}
              </span>
            </div>
            <Link href="/checkout" onClick={closeCart}>
              <button className="w-full bg-[#6B1E2E] text-white font-bold py-4 rounded-2xl hover:bg-[#4A1520] transition-colors text-sm tracking-wide shadow-lg shadow-[#6B1E2E]/20">
                Proceed to Checkout →
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
