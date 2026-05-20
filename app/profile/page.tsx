"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { LogOut, Star, ShoppingBag, ChevronRight, Trophy, User } from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ProfilePage() {
  const { state, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!state.isLoading && !state.user) {
      router.replace("/login");
    }
  }, [state.isLoading, state.user, router]);

  // Aggregate all ordered items by name across all orders
  const mealTotals = useMemo(() => {
    if (!state.user) return [];
    const map: Record<string, { name: string; category: string; qty: number }> = {};
    for (const order of state.user.orders) {
      for (const item of order.items) {
        if (map[item.name]) {
          map[item.name].qty += item.quantity;
        } else {
          map[item.name] = { name: item.name, category: item.category, qty: item.quantity };
        }
      }
    }
    return Object.values(map).sort((a, b) => b.qty - a.qty);
  }, [state.user]);

  const totalOrders = state.user?.orders.length ?? 0;
  const totalSpent = state.user?.orders.reduce((s, o) => s + o.total, 0) ?? 0;
  const points = state.user?.points ?? 0;

  if (state.isLoading || !state.user) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#6B1E2E] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] pb-16">
      {/* Header */}
      <div className="bg-[#6B1E2E] px-4 pt-10 pb-24">
        <div className="max-w-2xl mx-auto flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#C9973A] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-white leading-tight">
                {state.user.name}
              </h1>
              <p className="text-white/60 text-sm mt-0.5">{state.user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs mt-1 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-14 space-y-4">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F0E4D8] text-center">
            <div className="w-9 h-9 bg-[#C9973A]/15 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Star className="w-5 h-5 text-[#C9973A]" />
            </div>
            <p className="font-heading font-bold text-[#6B1E2E] text-xl leading-none">{points}</p>
            <p className="text-[11px] text-gray-400 mt-1">Points</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F0E4D8] text-center">
            <div className="w-9 h-9 bg-[#6B1E2E]/10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <ShoppingBag className="w-5 h-5 text-[#6B1E2E]" />
            </div>
            <p className="font-heading font-bold text-[#6B1E2E] text-xl leading-none">{totalOrders}</p>
            <p className="text-[11px] text-gray-400 mt-1">Orders</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#F0E4D8] text-center">
            <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-5 h-5 text-green-500" />
            </div>
            <p className="font-heading font-bold text-[#6B1E2E] text-lg leading-none">
              ₦{(totalSpent / 1000).toFixed(0)}k
            </p>
            <p className="text-[11px] text-gray-400 mt-1">Spent</p>
          </div>
        </div>

        {/* Points progress */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F0E4D8]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#C9973A]" />
              <h2 className="font-heading font-semibold text-[#6B1E2E] text-base">Reward Points</h2>
            </div>
            <span className="text-xs text-gray-400">1 pt = ₦100 spent</span>
          </div>
          <div className="flex items-end justify-between mb-2">
            <span className="font-heading font-bold text-3xl text-[#6B1E2E]">{points}</span>
            <span className="text-sm text-gray-500">≈ ₦{(points * 100).toLocaleString()} value</span>
          </div>
          {/* Progress bar toward next 500 pts */}
          {(() => {
            const nextMilestone = Math.ceil((points + 1) / 500) * 500;
            const prev = nextMilestone - 500;
            const pct = Math.min(((points - prev) / 500) * 100, 100);
            return (
              <>
                <div className="h-2.5 bg-[#F0E4D8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C9973A] rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1.5">
                  {nextMilestone - points} pts until your next {nextMilestone} milestone
                </p>
              </>
            );
          })()}
        </div>

        {/* Favourite meals */}
        {mealTotals.length > 0 && (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F0E4D8]">
            <h2 className="font-heading font-semibold text-[#6B1E2E] text-base mb-4">
              Your Favourite Meals
            </h2>
            <div className="space-y-2">
              {mealTotals.map((meal, i) => (
                <div
                  key={meal.name}
                  className="flex items-center gap-3 py-2.5 border-b border-[#F0E4D8] last:border-0"
                >
                  <span className="w-7 h-7 rounded-full bg-[#6B1E2E]/10 flex items-center justify-center text-[11px] font-bold text-[#6B1E2E] flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-800 truncate">{meal.name}</p>
                    <p className="text-[11px] text-gray-400">{meal.category}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="font-bold text-[#6B1E2E] text-sm">{meal.qty}</span>
                    <span className="text-xs text-gray-400">order{meal.qty > 1 ? "s" : ""}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order history */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#F0E4D8]">
          <h2 className="font-heading font-semibold text-[#6B1E2E] text-base mb-4">Order History</h2>
          {state.user.orders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No orders yet</p>
              <Link href="/menu">
                <button className="mt-4 bg-[#6B1E2E] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#4A1520] transition-colors">
                  Browse Menu
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {state.user.orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-[#F0E4D8] rounded-xl p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm text-gray-800">
                        {order.fulfillment === "delivery" ? "🚚 Delivery" : "🛍️ Carry Out"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#6B1E2E] text-sm">
                        ₦{order.total.toLocaleString()}
                      </p>
                      <p className="text-[11px] text-[#C9973A] font-semibold mt-0.5">
                        +{order.pointsEarned} pts
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {order.items.map((item) => (
                      <span
                        key={item.id}
                        className="text-[11px] bg-[#FFF8F0] border border-[#E0D0C0] rounded-lg px-2 py-0.5 text-gray-600"
                      >
                        {item.name} ×{item.quantity}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <Link href="/menu">
          <div className="bg-[#6B1E2E] rounded-2xl p-4 flex items-center justify-between shadow-md shadow-[#6B1E2E]/20">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-white" />
              <span className="font-semibold text-white text-sm">Order Again</span>
            </div>
            <ChevronRight className="w-4 h-4 text-white/60" />
          </div>
        </Link>
      </div>
    </div>
  );
}
