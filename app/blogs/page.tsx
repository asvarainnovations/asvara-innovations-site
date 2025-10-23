"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/Button";
import { Calendar, Clock, User, Plus } from 'lucide-react';
import axiosInstance from '@/lib/axios';
import { calculateReadingTime, formatReadingTime } from '@/lib/utils';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axiosInstance.get("/api/blogs?published=true")
      .then((res) => {
        setBlogs(res.data.blogs || []);
        setLoading(false);
      })
      .catch((e) => {
        setError("Failed to load blogs");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-[#181c24] border-b border-accent/10">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mt-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Blog
              </h1>
              <p className="text-xl text-gray-300">
                Insights, research, and legal innovation
              </p>
            </div>
            <Link href="/blogs/submit">
              <Button variant="primary" className="flex items-center gap-2">
                <Plus size={16} />
                Submit Article
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-24">
            <div className="text-gray-300 text-xl">Loading articles...</div>
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <div className="text-red-400 text-xl">{error}</div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-gray-400 text-xl mb-4">No published articles yet.</div>
            <p className="text-gray-500">Be the first to contribute!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.id}`}
                className="group block bg-[#181c24] border border-accent/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-accent/30 overflow-hidden"
              >
                {/* Cover Image */}
                {blog.coverImage && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  
                  {/* Excerpt */}
                  {blog.excerpt && (
                    <p className="text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {blog.excerpt}
                    </p>
                  )}
                  
                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span className="text-accent font-medium">
                        {blog.authorName || "Anonymous"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>
                          {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{blog.content ? formatReadingTime(calculateReadingTime(blog.content)) : "5 min read"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 