import type { Metadata } from "next";
import PageTransitionEffect from "../component/pagetransition";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Quicks",
  description: "developed by ardanclassic",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PageTransitionEffect>{children}</PageTransitionEffect>
      </body>
    </html>
  );
}
