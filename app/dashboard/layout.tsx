"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import { User, Key, Settings, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { motion } from "framer-motion";

const accountTabs = [
  { name: 'Dashboard', href: '/dashboard', icon: Settings },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'API Keys', href: '/dashboard/api-keys', icon: Key },
  { name: 'Subscriptions', href: '/dashboard/subscription', icon: CreditCard },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Loading...</h1>
          <p className="text-gray-600">Please wait while we load your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 gap-10">
        {/* Sidebar Tabs */}
        <aside className="hidden md:flex flex-col w-56 bg-[#181c24] rounded-2xl border border-[#222c3c] py-10 px-4 gap-2 h-fit sticky top-32">
          {accountTabs.map(tab => (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-base transition-colors duration-200 hover:bg-[#232b3a] hover:text-white ${pathname === tab.href ? 'bg-[#232b3a] text-[#007BFF]' : 'text-gray-300'}`}
              prefetch={false}
            >
              <tab.icon className="w-5 h-5" />
              {tab.name}
            </Link>
          ))}
        </aside>
        {/* Divider */}
        <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-[#222c3c] to-transparent my-4" />
        {/* Main Content */}
        <motion.main initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5}} className="flex-1 w-full pt-8">
          {children}
        </motion.main>
      </div>
    </div>
  );
} 