"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import React from 'react';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  return (
    <>
      {!isAuthPage && <Navbar />}
      {children}
    </>
  );
} 