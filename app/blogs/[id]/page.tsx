"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/app/components/Button";
import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";
import { X } from 'lucide-react';
import axiosInstance from '@/lib/axios';

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      setNotFound(false);
      // Try BlogPost first
      let res = await axiosInstance.get(`/api/blogs/${id}`);
      if (res.status === 200) {
        const data = res.data;
        if (data && data.blog) {
          setPost({
            title: data.blog.title,
            excerpt: data.blog.excerpt,
            coverImage: data.blog.coverImage,
            author: data.blog.author || { name: "Anonymous", avatar: null, bio: "", social: "#" },
            date: data.blog.publishedAt ? new Date(data.blog.publishedAt).toLocaleDateString() : "",
            readTime: "3 min read",
            content: data.blog.content,
            tags: data.blog.tags || [],
            attachments: data.blog.attachments || [],
          });
          setLoading(false);
          return;
        }
      }
      // Try BlogSubmission if not found
      res = await axiosInstance.get(`/api/admin/blog-submissions?id=${id}`);
      if (res.status === 200) {
        const data = res.data;
        if (data && data.submission) {
          setPost({
            title: data.submission.title,
            excerpt: data.submission.excerpt,
            coverImage: data.submission.coverImage,
            author: { name: data.submission.authorName, avatar: null, bio: "", social: data.submission.socialProfile || "#" },
            date: data.submission.createdAt ? new Date(data.submission.createdAt).toLocaleDateString() : "",
            readTime: "3 min read",
            content: data.submission.content,
            tags: data.submission.tags || [],
            attachments: data.submission.attachments || [],
          });
          setLoading(false);
          return;
        }
      }
      setNotFound(true);
      setLoading(false);
    }
    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }
  if (notFound || !post) {
    return <div className="min-h-screen flex items-center justify-center text-red-400">Blog not found.</div>;
  }

  return (
    <div className="relative min-h-screen bg-gray-900 py-12 px-4 pt-20 overflow-hidden w-full">
      {/* Top-center light gradient */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-blue-400/30 via-transparent to-transparent rounded-b-full blur-2xl opacity-70 z-0" />
      <div className="w-full relative z-10 flex flex-col items-center">
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 bg-[#181c24] rounded-2xl shadow-xl border border-accent/10 p-4 md:p-8">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="flex justify-center mb-4">
              <img
                src={post.coverImage.startsWith('http')
                  ? post.coverImage
                  : `https://hufynfvixoauwggufgol.supabase.co/storage/v1/object/public/blog-images/${post.coverImage}`}
                alt="Cover"
                className="rounded-lg max-h-64 border border-accent/20"
              />
            </div>
          )}
          {/* Title, Excerpt, Tags */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{post.title}</h1>
              <p className="text-gray-300 mb-1">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {post.tags && post.tags.length > 0 && post.tags.map((tag: string, i: number) => (
                  <span key={i} className="bg-accent/20 text-accent px-2 py-0.5 rounded text-xs font-semibold">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 min-w-[160px]">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <span className="text-white font-semibold">{post.author.name}</span>
              </div>
              <div className="text-xs text-gray-400">{post.date} &nbsp;·&nbsp; {post.readTime}</div>
              {post.author.social && post.author.social !== "#" && (
                <a href={post.author.social} className="text-accent text-xs underline" target="_blank" rel="noopener noreferrer">Social</a>
              )}
            </div>
          </div>
          {/* Attachments */}
          {post.attachments && post.attachments.length > 0 && (
            <div className="bg-[#232b3a] border border-accent/20 rounded-xl p-4 flex flex-col gap-2 mb-2">
              <label className="block text-gray-300 font-semibold mb-1">Attachments</label>
              <ul className="text-gray-300 text-sm flex flex-wrap gap-3">
                {post.attachments.map((file: any, i: number) => (
                  <li key={i} className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded">
                    <a
                      href={file.url.startsWith('http')
                        ? file.url
                        : `https://hufynfvixoauwggufgol.supabase.co/storage/v1/object/public/blog-attachments/${file.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline break-all"
                    >
                      {file.url.split('/').pop()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Content */}
          <div className="bg-[#232b3a] border border-accent/20 rounded-xl p-6 prose prose-invert max-w-none overflow-x-auto">
            <ReactMarkdown>{post.content || "No content."}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
} 