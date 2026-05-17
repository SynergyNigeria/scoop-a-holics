import Link from "next/link";
import { MapPin, Clock, Phone, Truck, ShoppingBag, ChevronRight } from "lucide-react";

const categories = [
  {
    id: "parfaits",
    name: "Parfaits",
    tagline: "Creamy layered indulgence",
    price: "From ₦3,000",
    image: "/images/parfait%202.png",
    href: "/menu#parfaits",
  },
  {
    id: "shawarma",
    name: "Shawarma",
    tagline: "Seasoned, stuffed & wrapped",
    price: "From ₦3,500",
    image: "/images/classic%20sharwama.png",
    href: "/menu#shawarma",
  },
  {
    id: "meals",
    name: "Meals",
    tagline: "Hearty Nigerian favourites",
    price: "From ₦3,500",
    image: "/images/pepper%20soup.png",
    href: "/menu#meals",
  },
  {
    id: "blends",
    name: "Fresh Blends",
    tagline: "Cold-pressed juices & smoothies",
    price: "From ₦2,500",
    image: "/images/smoothie.png",
    href: "/menu#blends",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* ── Hero banner ── */}
      <section className="bg-[#6B1E2E] pt-10 pb-8 px-4 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.png"
          alt="Scoop-a-holics"
          className="h-20 w-auto object-contain mx-auto mb-3"
        />
        <p className="text-[#C9973A] text-xs tracking-[0.25em] uppercase font-semibold mb-2">
          Uyo, Akwa Ibom
        </p>
        <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl leading-tight">
          Good food, fast delivery.
        </h1>
        <p className="text-white/60 text-sm mt-2 max-w-xs mx-auto">
          Order your favourites, delivered to you.
        </p>
      </section>

      {/* ── Start Your Order ── */}
      <section className="px-4 -mt-1">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl shadow-black/10 overflow-hidden border border-[#F0E4D8]">
            {/* Label */}
            <div className="bg-[#FFF8F0] border-b border-[#F0E4D8] px-5 py-3.5">
              <p className="font-heading font-semibold text-[#6B1E2E] text-base text-center">
                Start Your Order
              </p>
            </div>

            {/* Delivery / Carry Out */}
            <div className="grid grid-cols-2 divide-x divide-[#F0E4D8]">
              <Link href="/menu">
                <div className="group flex flex-col items-center justify-center gap-2.5 py-7 px-4 hover:bg-[#6B1E2E]/5 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-[#6B1E2E]/10 group-hover:bg-[#6B1E2E] rounded-2xl flex items-center justify-center transition-colors">
                    <Truck className="w-6 h-6 text-[#6B1E2E] group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="font-heading font-bold text-[#6B1E2E] text-base">
                      Delivery
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Delivered to your door
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#C9973A] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>

              <Link href="/menu">
                <div className="group flex flex-col items-center justify-center gap-2.5 py-7 px-4 hover:bg-[#6B1E2E]/5 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-[#C9973A]/10 group-hover:bg-[#C9973A] rounded-2xl flex items-center justify-center transition-colors">
                    <ShoppingBag className="w-6 h-6 text-[#C9973A] group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="font-heading font-bold text-[#6B1E2E] text-base">
                      Carry Out
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Pick up at our store
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#C9973A] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </div>

            {/* Location footer */}
            <div className="bg-[#FFF8F0] border-t border-[#F0E4D8] px-5 py-3 flex items-center justify-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C9973A] shrink-0" />
              <p className="text-xs text-gray-500 text-center">
                214 Abak Road by Mbebeng Roundabout, Uyo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Offer ── */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#6B1E2E]">
                What We Offer
              </h2>
              <p className="text-gray-400 text-sm mt-0.5">
                Fresh & made to order
              </p>
            </div>
            <Link
              href="/menu"
              className="text-[#C9973A] text-sm font-semibold hover:underline underline-offset-2 hidden sm:block"
            >
              See full menu →
            </Link>
          </div>

          {/* 2×2 photo cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={cat.href}>
                <div className="group relative h-52 sm:h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Photo background */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  {/* Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-heading font-bold text-white text-base sm:text-lg leading-tight">
                      {cat.name}
                    </p>
                    <p className="text-white/70 text-xs mt-0.5 hidden sm:block">
                      {cat.tagline}
                    </p>
                    <p className="text-[#C9973A] font-bold text-xs mt-1.5">
                      {cat.price}
                    </p>
                  </div>
                  {/* Hover order pill */}
                  <div className="absolute top-3 right-3 bg-[#C9973A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Order →
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6 sm:hidden">
            <Link href="/menu">
              <button className="bg-[#6B1E2E] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#4A1520] transition-colors text-sm">
                See Full Menu →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#6B1E2E] py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-5 text-white text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C9973A]" />
            <span>214 Abak Road, Uyo, Akwa Ibom</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C9973A]" />
            <span>Open Daily · 9am – 10pm</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#C9973A]" />
            <span>07088323317</span>
          </div>
        </div>
        <p className="text-center text-white/30 text-xs mt-6">
          © 2025 Scoop-a-holics Parfait. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
