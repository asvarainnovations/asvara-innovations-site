"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 min-h-screen bg-black">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-300">
            Welcome back, {session?.user?.name || "User"}!
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/dashboard/api-keys"
            className="inline-flex items-center rounded-md bg-[#007BFF] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#339CFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007BFF]"
          >
            Generate API Key
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Usage Stats Card */}
        <div className="overflow-hidden rounded-lg bg-[#181c24] shadow border border-[#222c3c]">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-[#007BFF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-300">
                    API Calls (This Month)
                  </dt>
                  <dd className="text-lg font-medium text-white">0</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Status Card */}
        <div className="overflow-hidden rounded-lg bg-[#181c24] shadow border border-[#222c3c]">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-[#007BFF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-300">
                    Subscription Plan
                  </dt>
                  <dd className="text-lg font-medium text-white">Free Trial</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* API Keys Card */}
        <div className="overflow-hidden rounded-lg bg-[#181c24] shadow border border-[#222c3c]">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-[#007BFF]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-300">
                    Active API Keys
                  </dt>
                  <dd className="text-lg font-medium text-white">0</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-white">Quick Actions</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/dashboard/api-keys"
            className="relative flex items-center space-x-3 rounded-lg border border-[#222c3c] bg-[#181c24] px-6 py-5 shadow-sm hover:border-[#007BFF]"
          >
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-[#007BFF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-white">Manage API Keys</p>
              <p className="truncate text-sm text-gray-300">
                Create and manage your API keys
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/subscription"
            className="relative flex items-center space-x-3 rounded-lg border border-[#222c3c] bg-[#181c24] px-6 py-5 shadow-sm hover:border-[#007BFF]"
          >
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-[#007BFF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-white">Subscription</p>
              <p className="truncate text-sm text-gray-300">
                View and manage your subscription
              </p>
            </div>
          </Link>

          <Link
            href="/profile"
            className="relative flex items-center space-x-3 rounded-lg border border-[#222c3c] bg-[#181c24] px-6 py-5 shadow-sm hover:border-[#007BFF]"
          >
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-[#007BFF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-white">Profile Settings</p>
              <p className="truncate text-sm text-gray-300">
                Update your account information
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 