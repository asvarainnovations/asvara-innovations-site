"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/Button";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/blogs?published=true")
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
    <div className="relative min-h-screen bg-gray-900 py-12 px-4 pt-32 overflow-hidden">
      {/* Top-center light gradient */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-blue-400/30 via-transparent to-transparent rounded-b-full blur-2xl opacity-70 z-0" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-white">Blog</h1>
          <Link href="/blogs/submit">
            <Button variant="primary">Submit Article</Button>
          </Link>
        </div>
        {loading ? (
          <div className="text-gray-300 text-center py-24">Loading...</div>
        ) : error ? (
          <div className="text-red-400 text-center py-24">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="text-gray-400 text-center py-24">No published articles yet.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.id}`}
                className="block bg-[#181c24] border border-accent/10 rounded-xl shadow-lg hover:shadow-xl transition p-6 group"
              >
                {blog.coverImageUrl && (
                  <img
                    src={blog.coverImageUrl}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-lg mb-4 border border-accent/20 group-hover:border-accent"
                  />
                )}
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition">
                  {blog.title}
                </h2>
                <p className="text-gray-300 mb-4 line-clamp-3">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-accent font-semibold">
                    {blog.authorName || "Anonymous"}
                  </span>
                  <span className="text-gray-400">
                    {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : ""}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 