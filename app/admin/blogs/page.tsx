"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/Button";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/blogs?all=true")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.blogs || []);
        setLoading(false);
      })
      .catch((e) => {
        setError("Failed to load blogs");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-black py-12 px-4">
      <div className="max-w-5xl mx-auto bg-[#181c24] rounded-xl shadow-lg border border-accent/10 p-8">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">Blog Moderation Dashboard</h1>
        {loading ? (
          <div className="text-gray-300 text-center py-12">Loading...</div>
        ) : error ? (
          <div className="text-red-400 text-center py-12">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="text-gray-400 text-center py-12">No blog submissions found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="bg-[#232b3a] text-accent">
                <tr>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Author</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-accent/10 hover:bg-[#232b3a] transition">
                    <td className="px-4 py-3">
                      <Link href={`/blogs/${blog.id}`} className="text-accent underline hover:text-gold-400">
                        {blog.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{blog.authorName || <span className="text-gray-500">—</span>}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${blog.status === "PUBLISHED" ? "bg-green-700 text-green-200" : blog.status === "REJECTED" ? "bg-red-700 text-red-200" : "bg-yellow-700 text-yellow-200"}`}>{blog.status}</span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <Button size="sm" variant="secondary" asChild>
                        <Link href={`/blogs/${blog.id}`}>View</Link>
                      </Button>
                      <Button size="sm" variant="primary" onClick={() => alert("Approve logic here")}>Approve</Button>
                      <Button size="sm" variant="danger" onClick={() => alert("Reject logic here")}>Reject</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 