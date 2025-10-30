"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/app/components/Button";
import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, ExternalLink, Hash } from 'lucide-react';
import axiosInstance from '@/lib/axios';
import { calculateReadingTime, formatReadingTime } from '@/lib/utils';

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      setNotFound(false);
      
      try {
      // Try BlogPost first
      let res = await axiosInstance.get(`/api/blogs/${id}`);
      if (res.status === 200) {
        const data = res.data;
        if (data && data.blog) {
          setPost({
            title: data.blog.title,
            excerpt: data.blog.excerpt,
            author: data.blog.author || { name: "Anonymous", avatar: null, bio: "", social: "#" },
            date: data.blog.publishedAt ? new Date(data.blog.publishedAt).toLocaleDateString() : "",
              readTime: formatReadingTime(calculateReadingTime(data.blog.content)),
            content: data.blog.content,
            tags: data.blog.tags || [],
            publicationId: data.blog.publicationId || null,
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
            author: { name: data.submission.authorName, avatar: null, bio: "", social: data.submission.socialProfile || "#" },
            date: data.submission.createdAt ? new Date(data.submission.createdAt).toLocaleDateString() : "",
              readTime: formatReadingTime(calculateReadingTime(data.submission.content)),
            content: data.submission.content,
            tags: data.submission.tags || [],
          });
          setLoading(false);
          return;
        }
      }
        
        setNotFound(true);
      } catch (error) {
        console.error('Error fetching blog:', error);
      setNotFound(true);
      } finally {
      setLoading(false);
      }
    }
    
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }
  
  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Blog not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-[#181c24] border-b border-accent/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to Blogs
          </Link>
        </div>
            </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Article Header */}
        <article className="mb-12">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8 pb-8 border-b border-gray-700">
            {/* Publication ID */}
            {post.publicationId && (
              <div className="flex items-center gap-2">
                <Hash size={16} />
                <span className="text-white font-medium">Publication ID: {post.publicationId}</span>
              </div>
            )}
            
            {/* Author */}
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="text-white font-medium">{post.author.name}</span>
              </div>
            
            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{post.date}</span>
            </div>
            
            {/* Read Time */}
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
            
            {/* Social Link */}
            {post.author.social && post.author.social !== "#" && (
              <a 
                href={post.author.social} 
                      target="_blank"
                      rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
              >
                <ExternalLink size={16} />
                <span>Author Profile</span>
              </a>
            )}
          </div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag: string, i: number) => (
                <span 
                  key={i} 
                  className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown 
            components={{
              // Headings
              h1: ({ node, ...props }) => (
                <h1 {...props} className="text-3xl font-bold text-white mb-6 mt-12 first:mt-0" />
              ),
              h2: ({ node, ...props }) => (
                <h2 {...props} className="text-2xl font-bold text-white mb-4 mt-10" />
              ),
              h3: ({ node, ...props }) => (
                <h3 {...props} className="text-xl font-bold text-white mb-3 mt-8" />
              ),
              h4: ({ node, ...props }) => (
                <h4 {...props} className="text-lg font-bold text-white mb-2 mt-6" />
              ),
              
              // Paragraphs
              p: ({ node, ...props }) => (
                <p {...props} className="text-gray-300 leading-relaxed mb-6 text-lg" />
              ),
              
              // Links
              a: ({ node, ...props }) => (
                <a 
                  {...props} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-accent underline hover:text-accent/80 transition-colors" 
                />
              ),
              
              // Images
              img: ({ node, ...props }) => (
                <img 
                  {...props} 
                  className="w-full rounded-lg border border-gray-700 shadow-lg my-8" 
                  loading="lazy"
                  onError={(e) => {
                    console.log('Image failed to load:', props.src);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ),
              
              // Lists
              ul: ({ node, ...props }) => (
                <ul {...props} className="list-disc list-outside text-gray-300 mb-6 space-y-2 ml-6" />
              ),
              ol: ({ node, ...props }) => (
                <ol {...props} className="list-decimal list-outside text-gray-300 mb-6 space-y-2 ml-6" />
              ),
              li: ({ node, ...props }) => (
                <li {...props} className="text-lg pl-2" />
              ),
              
              // Blockquotes
              blockquote: ({ node, ...props }) => (
                <blockquote {...props} className="border-l-4 border-accent pl-6 py-4 my-8 bg-gray-800/50 rounded-r-lg italic text-gray-300" />
              ),
              
              // Code blocks
              code: ({ node, ...props }: any) => {
                const isInline = !props.className?.includes('language-');
                if (isInline) {
                  return <code {...props} className="bg-gray-800 text-accent px-2 py-1 rounded text-sm" />;
                }
                return (
                  <code {...props} className="block bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm" />
                );
              },
              
              // Tables
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-8">
                  <table {...props} className="w-full border-collapse border border-gray-700" />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th {...props} className="border border-gray-700 px-4 py-2 text-left bg-gray-800 text-white font-semibold" />
              ),
              td: ({ node, ...props }) => (
                <td {...props} className="border border-gray-700 px-4 py-2 text-gray-300" />
              ),
            }}
          >
            {post.content || "No content available."}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                <User size={20} className="text-gray-400" />
              </div>
              <div>
                <p className="text-white font-medium">{post.author.name}</p>
                <p className="text-gray-400 text-sm">Author</p>
              </div>
            </div>
            
            <Link href="/blogs">
              <Button variant="secondary">
                <ArrowLeft size={16} className="mr-2" />
                Back to Blogs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 