"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import {
  User,
  Phone,
  MapPin,
  MessageSquare,
  ChevronLeft,
  Minus,
  Plus,
  Truck,
  ShoppingBag,
  Store,
  Navigation,
} from "lucide-react";

export default function CheckoutPage() {
  const { state, totalPrice, totalItems, updateQuantity, clearCart } =
    useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryNote: "",
    orderNote: "",
    payment: "on-delivery",
    fulfillment: "" as "delivery" | "carryout" | "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    router.push("/confirmation");
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8F0] px-4">
        <div className="text-center">
          <p className="font-heading text-2xl font-bold text-[#6B1E2E] mb-2">
            Your cart is empty
          </p>
          <p className="text-gray-400 mb-6 text-sm">
            Add some items before checking out
          </p>
          <Link href="/menu">
            <button className="bg-[#6B1E2E] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#4A1520] transition-colors">
              Browse Menu
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-16">
      {/* Header */}
      <div className="bg-[#6B1E2E] px-4 pt-10 pb-20">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/menu"
            className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Menu
          </Link>
          <h1 className="font-heading text-4xl font-bold text-white">
            Checkout
          </h1>
          <p className="text-white/60 text-sm mt-1">
            {totalItems} item{totalItems > 1 ? "s" : ""} in your order
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F0E4D8]">
            <h2 className="font-heading font-semibold text-[#6B1E2E] text-lg mb-4">
              Order Summary
            </h2>
            <div className="space-y-1">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 py-3 border-b border-[#F0E4D8] last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      ₦{item.price.toLocaleString()} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full bg-[#FFF8F0] border border-[#E0D0C0] flex items-center justify-center hover:bg-[#6B1E2E] hover:text-white hover:border-[#6B1E2E] transition-all"
                    >
                      <Minus className="w-3 h-3 text-[#6B1E2E]" />
                    </button>
                    <span className="font-bold text-[#6B1E2E] w-5 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-[#6B1E2E] flex items-center justify-center hover:bg-[#4A1520] transition-colors"
                    >
                      <Plus className="w-3 h-3 text-white" />
                    </button>
                  </div>
                  <p className="text-[#C9973A] font-bold text-sm w-20 text-right flex-shrink-0">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#F0E4D8]">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-800 text-sm">
                ₦{totalPrice.toLocaleString()}
              </span>
            </div>
            {form.fulfillment === "delivery" && (
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">Delivery fee</span>
                <span className="font-semibold text-gray-800 text-sm">₦1,500</span>
              </div>
            )}
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#F0E4D8]">
              <span className="font-heading font-bold text-[#6B1E2E] text-base">
                Total
              </span>
              <span className="font-bold text-2xl text-[#6B1E2E]">
                ₦{(totalPrice + (form.fulfillment === "delivery" ? 1500 : 0)).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Fulfillment Type */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F0E4D8]">
            <h2 className="font-heading font-semibold text-[#6B1E2E] text-lg mb-1">
              How would you like to receive your order?
            </h2>
            <p className="text-xs text-gray-400 mb-4">Select one to continue</p>
            <div className="grid grid-cols-2 gap-3">
              {/* Delivery */}
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, fulfillment: "delivery", payment: "now" }))
                }
                className={`relative flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${
                  form.fulfillment === "delivery"
                    ? "border-[#6B1E2E] bg-[#6B1E2E]/5"
                    : "border-[#E0D0C0] hover:border-[#C9973A]/60"
                }`}
              >
                {form.fulfillment === "delivery" && (
                  <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#6B1E2E] flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                      <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${form.fulfillment === "delivery" ? "bg-[#6B1E2E]" : "bg-[#FFF8F0]"}`}>
                  <Truck className={`w-6 h-6 ${form.fulfillment === "delivery" ? "text-white" : "text-[#6B1E2E]"}`} />
                </div>
                <span className="font-semibold text-[#6B1E2E] text-sm">Delivery</span>
                <span className="text-[11px] text-gray-400 text-center leading-tight">We bring it to your door</span>
              </button>

              {/* Carry Out */}
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, fulfillment: "carryout" }))
                }
                className={`relative flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${
                  form.fulfillment === "carryout"
                    ? "border-[#6B1E2E] bg-[#6B1E2E]/5"
                    : "border-[#E0D0C0] hover:border-[#C9973A]/60"
                }`}
              >
                {form.fulfillment === "carryout" && (
                  <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#6B1E2E] flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                      <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${form.fulfillment === "carryout" ? "bg-[#6B1E2E]" : "bg-[#FFF8F0]"}`}>
                  <ShoppingBag className={`w-6 h-6 ${form.fulfillment === "carryout" ? "text-white" : "text-[#6B1E2E]"}`} />
                </div>
                <span className="font-semibold text-[#6B1E2E] text-sm">Carry Out</span>
                <span className="text-[11px] text-gray-400 text-center leading-tight">Pick up at the store</span>
              </button>
            </div>
          </div>

          {/* Delivery Details — shown only when delivery is selected */}
          {form.fulfillment === "delivery" && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F0E4D8]">
              <h2 className="font-heading font-semibold text-[#6B1E2E] text-lg mb-4">
                Delivery Details
              </h2>
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 border border-[#E0D0C0] rounded-xl text-sm focus:outline-none focus:border-[#6B1E2E] focus:ring-2 focus:ring-[#6B1E2E]/20 bg-[#FFF8F0] transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    required
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    type="tel"
                    className="w-full pl-10 pr-4 py-3 border border-[#E0D0C0] rounded-xl text-sm focus:outline-none focus:border-[#6B1E2E] focus:ring-2 focus:ring-[#6B1E2E]/20 bg-[#FFF8F0] transition-all"
                  />
                </div>
                <div className="relative">
                  <Navigation className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    required
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House Address"
                    className="w-full pl-10 pr-4 py-3 border border-[#E0D0C0] rounded-xl text-sm focus:outline-none focus:border-[#6B1E2E] focus:ring-2 focus:ring-[#6B1E2E]/20 bg-[#FFF8F0] transition-all"
                  />
                </div>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  <textarea
                    name="deliveryNote"
                    value={form.deliveryNote}
                    onChange={handleChange}
                    placeholder="Delivery instruction (optional) — e.g. Call when you arrive, Gate code is 1234"
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-[#E0D0C0] rounded-xl text-sm focus:outline-none focus:border-[#6B1E2E] focus:ring-2 focus:ring-[#6B1E2E]/20 bg-[#FFF8F0] resize-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Carry Out — store info */}
          {form.fulfillment === "carryout" && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F0E4D8]">
              <h2 className="font-heading font-semibold text-[#6B1E2E] text-lg mb-4">
                Your Details
              </h2>
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 border border-[#E0D0C0] rounded-xl text-sm focus:outline-none focus:border-[#6B1E2E] focus:ring-2 focus:ring-[#6B1E2E]/20 bg-[#FFF8F0] transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    required
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    type="tel"
                    className="w-full pl-10 pr-4 py-3 border border-[#E0D0C0] rounded-xl text-sm focus:outline-none focus:border-[#6B1E2E] focus:ring-2 focus:ring-[#6B1E2E]/20 bg-[#FFF8F0] transition-all"
                  />
                </div>
              </div>

              {/* Store selection */}
              <h3 className="font-heading font-semibold text-[#6B1E2E] text-base mt-5 mb-3">
                Pick-up Store
              </h3>
              <label className="flex items-start gap-4 p-4 rounded-2xl border-2 border-[#6B1E2E] bg-[#6B1E2E]/5 cursor-pointer">
                <input type="radio" name="store" value="abak-road" defaultChecked className="sr-only" />
                <div className="w-10 h-10 rounded-xl bg-[#6B1E2E] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Store className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#6B1E2E] text-sm">Scoop-a-holics — Abak Road</p>
                    <span className="w-4 h-4 rounded-full bg-[#6B1E2E] flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                        <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    <p className="text-xs text-gray-500">Abak Road, Uyo, Akwa Ibom</p>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">Mon – Sun · 10 am – 9 pm</p>
                </div>
              </label>

              <div className="mt-4">
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  <textarea
                    name="orderNote"
                    value={form.orderNote}
                    onChange={handleChange}
                    placeholder="Order note (optional) — e.g. No onions"
                    rows={2}
                    className="w-full pl-10 pr-4 py-3 border border-[#E0D0C0] rounded-xl text-sm focus:outline-none focus:border-[#6B1E2E] focus:ring-2 focus:ring-[#6B1E2E]/20 bg-[#FFF8F0] resize-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Method — only show after fulfillment is chosen */}
          {form.fulfillment && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F0E4D8]">
              <h2 className="font-heading font-semibold text-[#6B1E2E] text-lg mb-4">
                Payment Method
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`relative rounded-xl border-2 p-4 transition-all ${
                    form.fulfillment === "delivery"
                      ? "border-[#E0D0C0] bg-gray-50 opacity-50 cursor-not-allowed"
                      : form.payment === "on-delivery"
                      ? "border-[#6B1E2E] bg-[#6B1E2E]/5 cursor-pointer"
                      : "border-[#E0D0C0] hover:border-[#C9973A]/50 cursor-pointer"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="on-delivery"
                    checked={form.payment === "on-delivery"}
                    onChange={handleChange}
                    disabled={form.fulfillment === "delivery"}
                    className="sr-only"
                  />
                  <p className="font-semibold text-[#6B1E2E] text-sm">
                    {form.fulfillment === "carryout" ? "💵 Pay at Store" : "💵 Pay on Delivery"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {form.fulfillment === "carryout" ? "Cash when you pick up" : "Cash when delivered"}
                  </p>
                </label>
                <label
                  className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                    form.payment === "now"
                      ? "border-[#6B1E2E] bg-[#6B1E2E]/5"
                      : "border-[#E0D0C0] hover:border-[#C9973A]/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="now"
                    checked={form.payment === "now"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <p className="font-semibold text-[#6B1E2E] text-sm">
                    💳 Pay Now
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Transfer before {form.fulfillment === "carryout" ? "pick-up" : "delivery"}
                  </p>
                </label>
              </div>
            </div>
          )}

          {/* Submit — only show when fulfillment is chosen */}
          {form.fulfillment && (
            <button
              type="submit"
              className="w-full bg-[#6B1E2E] text-white font-bold py-4 rounded-2xl text-base hover:bg-[#4A1520] active:scale-[0.98] transition-all shadow-xl shadow-[#6B1E2E]/25"
            >
              Place Order →
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

