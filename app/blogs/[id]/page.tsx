"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/app/components/Button";

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  // TODO: Fetch blog post by id
  const post = {
    title: "Sample Blog Title",
    excerpt: "Short excerpt of the blog post goes here...",
    coverImage: null,
    author: { name: "Author Name", avatar: null, bio: "Author bio...", social: "#" },
    date: "2024-06-16",
    readTime: "3 min read",
    content: "# Heading\n\nSample content...",
    tags: ["AI", "Law"],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-black relative overflow-hidden">
      {/* Header with cover image */}
      <div className="relative h-64 bg-gradient-to-b from-black/80 to-transparent flex items-end justify-center">
        {post.coverImage ? (
          <img src={post.coverImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-[#232b3a]" />
        )}
        <div className="relative z-10 bg-black/80 w-full p-6 rounded-t-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-2 text-white">{post.title}</h1>
          <p className="text-gray-300 mb-2">{post.excerpt}</p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            <span>{post.author.name}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
      {/* Sticky Share Toolbar */}
      <div className="fixed left-4 top-1/3 z-20 hidden lg:flex flex-col gap-4">
        <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 flex items-center justify-center">T</Button>
        <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 flex items-center justify-center">L</Button>
        <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 flex items-center justify-center">F</Button>
        <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0 flex items-center justify-center">★</Button>
      </div>
      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-12 flex gap-8">
        {/* Sticky Table of Contents */}
        <aside className="hidden lg:block w-56 sticky top-24 h-fit">
          <div className="bg-[#181c24] rounded p-4 mb-6 border border-accent/10">
            <h3 className="font-semibold mb-2 text-white">Table of Contents</h3>
            <ul className="text-sm text-accent space-y-1">
              <li><a href="#section1">Section 1</a></li>
              <li><a href="#section2">Section 2</a></li>
            </ul>
          </div>
        </aside>
        <main className="flex-1 min-w-0">
          <article className="prose prose-invert max-w-none">
            <h2 id="section1">Section 1</h2>
            <p>Sample content block. (TODO: Render actual content)</p>
            <h2 id="section2">Section 2</h2>
            <p>More content here.</p>
          </article>
          {/* End-of-Post Widgets */}
          <div className="mt-12 border-t border-accent/10 pt-8">
            {/* Author Bio Card */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
              <div>
                <div className="font-bold text-white">{post.author.name}</div>
                <div className="text-sm text-gray-400">{post.author.bio}</div>
                <a href={post.author.social} className="text-accent text-xs underline">Social</a>
              </div>
            </div>
            {/* Related Posts Carousel */}
            <div className="mb-8">
              <h3 className="font-semibold mb-2 text-white">Related Posts</h3>
              <div className="flex gap-4 overflow-x-auto">
                <div className="w-64 h-32 bg-[#181c24] rounded flex items-center justify-center text-gray-500 border border-accent/10">Related 1</div>
                <div className="w-64 h-32 bg-[#181c24] rounded flex items-center justify-center text-gray-500 border border-accent/10">Related 2</div>
              </div>
            </div>
            {/* Comments Section */}
            <div>
              <h3 className="font-semibold mb-2 text-white">Comments</h3>
              <div className="text-gray-500">Comments coming soon...</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 