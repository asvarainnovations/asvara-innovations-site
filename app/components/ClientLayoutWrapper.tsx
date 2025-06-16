"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import React, { useEffect, useState } from 'react';
import GavelLoading from "./GavelLoading";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');
  const isHomePage = pathname === "/";

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Suspense fallback={
        !isHomePage && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#121212]">
            <GavelLoading />
          </div>
        )
      }>
        {children}
      </Suspense>
    </>
  );
} 