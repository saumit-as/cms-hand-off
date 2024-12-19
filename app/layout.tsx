import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { CartContextProvider } from "@/context/CartContext";
import { CartFlyout } from "@/components/CartFlyout";

export const metadata: Metadata = {
  title: "Chill Mount Stays",
  description: "Discover the ultimate stay, travel, and food experience in Ooty - plan your perfect hill station getaway today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-poppins`}>
        <CartContextProvider>
          <Navbar />
          <div className="md:pt-20 pt-16">{children}</div>
          <div className="lg:mt-24 mt-8">
            <Footer />
          </div>
          <Toaster />
          <div className="fixed bottom-[16px] right-5">
            <CartFlyout />
          </div>
        </CartContextProvider>
      </body>
    </html>
  );
}
