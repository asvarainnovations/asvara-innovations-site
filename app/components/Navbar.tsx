// components/Navbar.tsx
"use client";

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from "next-auth/react";
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = ({ animateIn = false }) => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Simple avatar dropdown
  const AvatarDropdown = () => (
    <div className="relative group">
      <button className="flex items-center space-x-2 focus:outline-none">
        <img
          src={session?.user?.image || "/avatar-placeholder.png"}
          alt={session?.user?.name || "User"}
          className="w-8 h-8 rounded-full border-2 border-accent"
        />
        <span className="text-white font-medium hidden md:inline">{session?.user?.name?.split(" ")[0] || "User"}</span>
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
      className="fixed w-full z-50 bg-gray-900/95 backdrop-blur-sm border-b border-white/10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/logo.png"
              alt="asvara"
              width={40}
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10"
              priority
            />
            <span className="text-white text-lg sm:text-xl font-medium whitespace-nowrap">Asvara Innovation</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/innovations" className="text-white hover:text-accent transition-colors">
              Innovations
            </Link>
            <Link href="/pricing" className="text-white hover:text-accent transition-colors">
              Pricing
            </Link>
            <Link href="/contact" className="text-white hover:text-accent transition-colors">
              Contact Us
            </Link>
            {session?.user ? (
              <AvatarDropdown />
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/signin"
                  className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-white text-accent px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-accent transition-colors focus:outline-none"
              aria-label="Open main menu"
            >
              {isMobileMenuOpen ? (
                <HiX className="h-7 w-7" />
              ) : (
                <HiMenu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-sm border-t border-white/10 shadow-lg"
          >
            <div className="px-4 py-4 space-y-2 flex flex-col">
              <Link
                href="/"
                className="block text-white hover:text-accent transition-colors py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/innovations"
                className="block text-white hover:text-accent transition-colors py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Innovations
              </Link>
              <Link
                href="/pricing"
                className="block text-white hover:text-accent transition-colors py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="block text-white hover:text-accent transition-colors py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
              {session?.user ? (
                <div className="pt-2">
                  <AvatarDropdown />
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link
                    href="/auth/signin"
                    className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-white text-accent px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
