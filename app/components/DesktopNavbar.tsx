"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

export default function DesktopNavbar() {
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
    <div className="hidden md:flex items-center space-x-8 w-full justify-between h-16 md:h-20">
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
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-white hover:text-accent transition-colors">
          Home
        </Link>
        <Link href="/innovations" className="text-white hover:text-accent transition-colors">
          Innovations
        </Link>
        <Link href="/pricing" className="text-white hover:text-accent transition-colors">
          Pricing
        </Link>
        <Link href="/blogs" className="text-white hover:text-accent transition-colors">
          Blogs
        </Link>
        <Link href="/about" className="text-white hover:text-accent transition-colors">
          About
        </Link>
        {/* <Link href="/contact" className="text-white hover:text-accent transition-colors">
          Contact
        </Link> */}
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
    </div>
  );
} 