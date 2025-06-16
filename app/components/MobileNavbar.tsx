"use client";
import Link from 'next/link';
import Image from 'next/image';
import { HiMenu, HiX } from 'react-icons/hi';
import { useSession, signOut } from "next-auth/react";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type MobileNavbarProps = {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
};

export default function MobileNavbar({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileNavbarProps) {
  const { data: session } = useSession();

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
      <div className="absolute right-0 mt-2 w-max bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 border border-gray-700">
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-gray-700 rounded-t-md">
          <IoSettingsOutline className="w-5 h-5" />
          Account Settings
        </Link>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-2 text-left px-4 py-2 text-gray-200 hover:bg-gray-700 rounded-b-md"
        >
          <FiLogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="md:hidden flex items-center w-full justify-between h-16">
      <Link href="/" className="flex items-center gap-2 sm:gap-3">
        <Image
          src="/logo.png"
          alt="asvara"
          width={75}
          height={75}
          className="h-10 object-contain"
          priority
        />
        <span className="text-white text-lg sm:text-xl font-medium whitespace-nowrap">Asvara Innovation</span>
      </Link>
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 w-full bg-gray-900/95 backdrop-blur-sm border-t border-white/10 shadow-lg z-50"
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
                href="/blogs"
                className="block text-white hover:text-accent transition-colors py-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blogs
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
    </div>
  );
} 