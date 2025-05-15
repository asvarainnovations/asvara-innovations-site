"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Profile", href: "/profile" },
  { name: "API Keys", href: "/api-keys" },
  { name: "Subscriptions", href: "/subscriptions" },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/dashboard" className="text-xl font-bold text-gray-900">
                Asvara
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    pathname === item.href
                      ? "border-accent text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            {session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((open) => !open)}
                  className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <img
                    src={session.user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name || session.user.email || "User")}`}
                    alt="User Avatar"
                    className="h-9 w-9 rounded-full border border-gray-200 object-cover"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-xs text-gray-500 border-b">{session.user.email}</div>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <Link href="/api-keys" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">API Keys</Link>
                    <Link href="/subscriptions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Subscriptions</Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            {/* Mobile menu button */}
            <div className="sm:hidden ml-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-gray-700"
              >
                {isMobileMenuOpen ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden border-t border-gray-200"
          >
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                    pathname === item.href
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {session?.user ? (
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full border-l-4 border-transparent py-2 pl-3 pr-4 text-left text-base font-medium text-red-600 hover:border-red-300 hover:bg-red-50"
                >
                  Sign Out
                </button>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 