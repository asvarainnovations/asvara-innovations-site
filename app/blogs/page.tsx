"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/Button";
import { Calendar, User, Plus, Search, Hash } from 'lucide-react';
import axiosInstance from '@/lib/axios';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axiosInstance.get("/api/blogs?published=true")
      .then((res) => {
        setAllBlogs(res.data.blogs || []);
        setBlogs(res.data.blogs || []);
        setLoading(false);
      })
      .catch((e) => {
        setError("Failed to load blogs");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setBlogs(allBlogs);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = allBlogs.filter((blog) => {
      const matchesTitle = blog.title?.toLowerCase().includes(query);
      const matchesAuthor = blog.authorName?.toLowerCase().includes(query);
      const matchesPublicationId = blog.publicationId?.toLowerCase().includes(query);
      const matchesExcerpt = blog.excerpt?.toLowerCase().includes(query);
      
      return matchesTitle || matchesAuthor || matchesPublicationId || matchesExcerpt;
    });
    
    setBlogs(filtered);
  }, [searchQuery, allBlogs]);

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
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by Publication ID, title, author, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#181c24] border border-accent/20 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

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
            {searchQuery ? (
              <>
                <div className="text-gray-400 text-xl mb-4">No articles found matching "{searchQuery}"</div>
                <p className="text-gray-500">Try searching with a different term</p>
              </>
            ) : (
              <>
                <div className="text-gray-400 text-xl mb-4">No published articles yet.</div>
                <p className="text-gray-500">Be the first to contribute!</p>
              </>
            )}
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
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>
                        {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : ""}
                      </span>
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