"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Button } from "./Button";
import { useSession, signOut } from "next-auth/react";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Our Innovations", href: "/innovations" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
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
    <nav className="fixed w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-white/10">
      <div className="max-w-[2000px] mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand Name */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Asvara Innovations Logo"
              width={40}
              height={30}
              className="w-auto h-6"
            />
            <span className="text-2xl font-poppins font-bold text-white">
              Asvara
              <span className="bg-gradient-to-r from-accent to-accent/70 text-transparent bg-clip-text">
                Innovations
              </span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative font-medium text-gray-300 hover:text-accent transition-colors group"
              >
                {item.name}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
            {session?.user ? (
              <AvatarDropdown />
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-white px-6"
                  onClick={() => window.location.href = "/auth/signin"}
                >
                  Login
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white text-accent px-6 border border-accent ml-2"
                  onClick={() => window.location.href = "/auth/register"}
                >
                  Signup
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-accent transition-colors"
            >
              {isOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-sm border-t border-white/10">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-accent hover:bg-white/5 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              {session?.user ? (
                <AvatarDropdown />
              ) : (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full bg-accent hover:bg-accent/90 text-white"
                    onClick={() => window.location.href = "/auth/signin"}
                  >
                    Login
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full bg-white text-accent border border-accent mt-2"
                    onClick={() => window.location.href = "/auth/register"}
                  >
                    Signup
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
} 