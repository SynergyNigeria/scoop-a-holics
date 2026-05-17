import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import Navbar from "@/components/navbar";
import CartDrawer from "@/components/cart-drawer";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Scoop-a-holics | Parfait, Shawarma & More",
  description:
    "Order your favourite parfaits, shawarma, meals and fresh blends from Scoop-a-holics, Uyo's favourite food brand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFF8F0]">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="pt-16">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
