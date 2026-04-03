import type { Metadata } from "next";
import { Inter, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "FoReal — Rent Designer Fashion",
  description:
    "Rent premium and designer fashion pieces. Look extraordinary without the permanent price tag.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${playfair.variable} h-full`}
    >
      <body className="">
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
