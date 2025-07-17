"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import axiosInstance from '@/lib/axios';

type UserWithRole = {
  id: string;
  role?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function Profile() {
  const { data: session, update } = useSession();
  const user = session?.user as UserWithRole | undefined;
  const [formData, setFormData] = useState({
    fullName: session?.user?.name || "",
    email: session?.user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axiosInstance.put("/api/user/profile", formData);
      const data = response.data;
      if (response.status !== 200) {
        throw new Error(data.error || "Failed to update profile");
      }
      // Update session with new data
      await update({
        ...session,
        user: {
          ...session?.user,
          name: formData.fullName,
        },
      });
      setMessage({ type: "success", text: "Profile updated successfully" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 min-h-screen bg-black">
      {/* Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <p className="mt-1 text-sm text-gray-300">
            Manage your personal and account information.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-[#181c24] p-6 shadow border border-[#222c3c]">
            <h2 className="mb-6 text-xl font-semibold text-white">Personal Information</h2>

            {message.text && (
              <div
                className={`mb-6 rounded-md p-4 ${
                  message.type === "success" ? "bg-green-900/30" : "bg-red-900/30"
                }`}
              >
                <p
                  className={`text-sm ${
                    message.type === "success" ? "text-green-300" : "text-red-300"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-[#222c3c] bg-[#232b3a] px-3 py-2 text-white shadow-sm focus:border-[#007BFF] focus:outline-none focus:ring-1 focus:ring-[#007BFF]"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="mt-1 block w-full rounded-md border border-[#222c3c] bg-[#181c24] px-3 py-2 text-gray-400 shadow-sm"
                />
                <p className="mt-1 text-sm text-gray-400">
                  Email cannot be changed. Contact support if you need to update your email.
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-[#007BFF] px-4 py-2 text-sm font-medium text-white hover:bg-[#339CFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:ring-offset-2 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Account Info */}
        <div>
          <div className="rounded-lg bg-[#181c24] p-6 shadow border border-[#222c3c]">
            <h2 className="mb-6 text-xl font-semibold text-white">Account Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-300">Account Type</p>
                <p className="mt-1 text-sm text-white">
                  {user?.role === "ADMIN" ? "Administrator" : "Standard User"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-300">Member Since</p>
                <p className="mt-1 text-sm text-white">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 