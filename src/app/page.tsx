"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/foundation");
    }, 3000);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7 }}
      className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#0F8A69]"
    >
      <div className="title cursor-pointer" onClick={() => router.push("/foundation")}>
        <h1 className="text-[190px] leading-[174px] font-extrabold">Simple</h1>
        <h1 className="text-[190px] leading-[174px] font-extrabold">Quicks</h1>
      </div>
    </motion.main>
  );
}
