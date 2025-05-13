// components/Navbar.tsx
"use client";

import Link from 'next/link'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { useSession, signOut } from "next-auth/react";

const Navbar = ({ animateIn = false }) => {
  const { data: session } = useSession();

  // Simple avatar dropdown
  const AvatarDropdown = () => (
    <div className="relative group">
      <button className="flex items-center space-x-2 focus:outline-none">
        <img
          src={session?.user?.image || "/avatar-placeholder.png"}
          alt={session?.user?.name || "User"}
          className="w-8 h-8 rounded-full border-2 border-accent"
        />
        <span className="text-white font-medium">{session?.user?.name?.split(" ")[0] || "User"}</span>
      </button>
      <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <Link href="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Dashboard</Link>
        <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</Link>
        <button
          onClick={() => signOut()}
          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={animateIn ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed w-full z-50 bg-transparent"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="asvara"
              width={40}
              height={40}
              className="w-12"
              priority
            />
            <div className="flex items-center">
              <span className="text-white text-xl font-medium">Asvara Innovation</span>
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-white hover:text-gray-200 transition-colors">
            Home
          </Link>
          <Link href="/innovations" className="text-white hover:text-gray-200 transition-colors">
            Innovations
          </Link>
          <Link href="/pricing" className="text-white hover:text-gray-200 transition-colors">
            Pricing
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-200 transition-colors">
            Contact Us
          </Link>
          {session?.user ? (
            <AvatarDropdown />
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="bg-[#F5F5F5] text-black px-6 py-2 rounded-full hover:bg-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-[#F5F5F5] text-black px-6 py-2 rounded-full hover:bg-white transition-colors"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar
