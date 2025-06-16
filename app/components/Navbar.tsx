// components/Navbar.tsx
"use client";

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed w-full z-50 transition-colors duration-300 bg-transparent backdrop-blur-md"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <DesktopNavbar />
        <MobileNavbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </div>
    </motion.nav>
  );
};

export default Navbar;
