"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/app/components/Button";
import ReactMarkdown from "react-markdown";
import { z } from "zod";
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { uploadFile } from "@/app/lib/supabase/storage";
import { useRouter } from "next/navigation";

const BlogSchema = z.object({
  authorName: z.string().min(1, "Full name is required"),
  authorEmail: z.string().email("A valid email address is required"),
  socialProfile: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Short summary is required").max(200, "Short summary must be at most 200 characters"),
  tags: z.array(z.string()).optional(),
  content: z.string().min(1, "Article content is required"),
  coverImage: z.any().optional(),
  attachments: z.array(z.any()).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "You must affirm consent to submit your article" }) }),
});

const initialDraft: {
  authorName: string;
  authorEmail: string;
  socialProfile: string;
  title: string;
  excerpt: string;
  tags: string[];
  content: string;
  coverImage: File | null;
  attachments: File[];
  consent: boolean;
} = {
  authorName: "",
  authorEmail: "",
  socialProfile: "",
  title: "",
  excerpt: "",
  tags: [],
  content: "",
  coverImage: null,
  attachments: [],
  consent: false,
};

export default function BlogSubmitPage() {
  const [draft, setDraft] = useState(initialDraft);
  const [errorSummary, setErrorSummary] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [attachmentNames, setAttachmentNames] = useState<string[]>([]);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const filesInputRef = useRef<HTMLInputElement>(null);
  const [tagsInput, setTagsInput] = useState("");
  const router = useRouter();

  // Autosave draft to localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("blogDraft", JSON.stringify(draft));
    }, 30000);
    return () => clearInterval(interval);
  }, [draft]);

  // Load draft from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("blogDraft");
    if (saved) setDraft(JSON.parse(saved));
  }, []);

  // Word count
  useEffect(() => {
    setWordCount(draft.content.split(/\s+/).filter(Boolean).length);
  }, [draft.content]);

  // Cover image preview
  useEffect(() => {
    if (draft.coverImage && (draft.coverImage as any) instanceof File) {
      const url = URL.createObjectURL(draft.coverImage);
      setCoverPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setCoverPreview(null);
    }
  }, [draft.coverImage]);

  // Attachment names
  useEffect(() => {
    if (draft.attachments && draft.attachments.length > 0) {
      setAttachmentNames(draft.attachments.map((f: File) => f.name));
    } else {
      setAttachmentNames([]);
    }
  }, [draft.attachments]);

  const handleChange = (field: string, value: any) => {
    if (field === "tags") {
      setTagsInput(value);
    } else {
      setDraft((d) => ({ ...d, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorSummary([]);

    try {
      // Upload cover image if present
      let coverImageUrl = "";
      if (draft.coverImage) {
        const { url, error } = await uploadFile(
          draft.coverImage,
          "blog-images",
          "covers"
        );
        if (error) throw new Error("Failed to upload cover image");
        coverImageUrl = url;
      }

      // Upload attachments
      const attachmentUrls = [];
      for (const file of draft.attachments) {
        const { url, error } = await uploadFile(
          file,
          "blog-attachments",
          "files"
        );
        if (error) throw new Error(`Failed to upload attachment: ${file.name}`);
        attachmentUrls.push(url);
      }

      // Validate form data
      const validatedData = BlogSchema.parse({
        ...draft,
        coverImageUrl,
        attachmentUrls,
      });

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit blog post");
      }

      toast.success("Blog post submitted successfully!");
      router.push("/blogs");
    } catch (err) {
      console.error("Error submitting blog post:", err);
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => {
          toast.error(error.message);
        });
      } else {
        setErrorSummary([err instanceof Error ? err.message : "Failed to submit blog post"]);
        toast.error(err instanceof Error ? err.message : "Failed to submit blog post");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Drop handlers
  const handleCoverDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleChange("coverImage", e.dataTransfer.files[0]);
    }
  };
  const handleFilesDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      // Prevent duplicates by name and size
      const allFiles = [...draft.attachments, ...newFiles];
      const uniqueFiles = Array.from(new Map(allFiles.map(f => [f.name + f.size, f])).values());
      setDraft((d) => ({ ...d, attachments: uniqueFiles }));
      setAttachmentNames(uniqueFiles.map((f: File) => f.name));
    }
  };
  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      // Prevent duplicates by name and size
      const allFiles = [...draft.attachments, ...newFiles];
      const uniqueFiles = Array.from(new Map(allFiles.map(f => [f.name + f.size, f])).values());
      setDraft((d) => ({ ...d, attachments: uniqueFiles }));
      setAttachmentNames(uniqueFiles.map((f: File) => f.name));
    }
  };

  // Remove a file from attachments
  const removeAttachment = (index: number) => {
    setDraft((d) => ({ ...d, attachments: d.attachments.filter((_: any, i: number) => i !== index) }));
    setAttachmentNames((names) => names.filter((_: string, i: number) => i !== index));
  };
  // Remove cover image
  const removeCoverImage = () => {
    setDraft((d) => ({ ...d, coverImage: null }));
    setCoverPreview(null);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center text-white">
        <h2 className="text-2xl font-bold mb-4 text-accent">Thank you!</h2>
        <p className="text-gray-300">We'll review your article and email you within 3–5 business days.</p>
        <Link href="/blogs" className="mt-8 inline-block text-accent underline">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-900 py-12 px-4 pt-20 overflow-hidden w-full">
      {/* Top-center light gradient */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-blue-400/30 via-transparent to-transparent rounded-b-full blur-2xl opacity-70 z-0" />
      <div className="w-full relative z-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-10 text-center text-white">Submit Your Article</h1>
        <form className="w-full max-w-5xl mx-auto flex flex-col gap-6 bg-[#181c24] rounded-2xl shadow-xl border border-accent/10 p-4 md:p-8" onSubmit={handleSubmit}>
          {/* Top: Meta fields, cover image, attachments, consent */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4 min-w-0">
              <input className="border border-accent/20 bg-[#232b3a] text-white rounded px-3 py-2 placeholder-gray-400 focus:border-accent focus:ring-accent focus:outline-none text-base" placeholder="Full Name*" value={draft.authorName} onChange={e => handleChange("authorName", e.target.value)} />
              <input className="border border-accent/20 bg-[#232b3a] text-white rounded px-3 py-2 placeholder-gray-400 focus:border-accent focus:ring-accent focus:outline-none text-base" placeholder="Email Address*" value={draft.authorEmail} onChange={e => handleChange("authorEmail", e.target.value)} />
              <input className="border border-accent/20 bg-[#232b3a] text-white rounded px-3 py-2 placeholder-gray-400 focus:border-accent focus:ring-accent focus:outline-none text-base" placeholder="Social Profile (optional)" value={draft.socialProfile} onChange={e => handleChange("socialProfile", e.target.value)} />
              <input className="border border-accent/20 bg-[#232b3a] text-white rounded px-3 py-2 placeholder-gray-400 focus:border-accent focus:ring-accent focus:outline-none text-base" placeholder="Title*" value={draft.title} onChange={e => handleChange("title", e.target.value)} />
              <input className="border border-accent/20 bg-[#232b3a] text-white rounded px-3 py-2 placeholder-gray-400 focus:border-accent focus:ring-accent focus:outline-none text-base" placeholder="Tags (comma separated)" value={tagsInput} onChange={e => handleChange("tags", e.target.value)} />
            </div>
            <div className="flex flex-col gap-4 min-w-0">
              <div className="bg-[#232b3a] border-2 border-dashed border-accent/40 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-accent transition min-h-[100px]"
                onClick={() => coverInputRef.current?.click()}
                onDrop={handleCoverDrop}
                onDragOver={e => e.preventDefault()}
              >
                <label className="block text-gray-300 font-semibold mb-2">Cover Image</label>
                {coverPreview ? (
                  <div className="relative flex flex-col items-center">
                    <img src={coverPreview} alt="Cover Preview" className="rounded-lg max-h-24 mb-2 border border-accent/20" />
                    <button type="button" onClick={removeCoverImage} className="absolute top-1 right-1 bg-black/60 rounded-full p-1 hover:bg-red-600 transition" aria-label="Remove image">
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-400">Select or Drop your image</span>
                )}
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => handleChange("coverImage", e.target.files?.[0] || null)}
                />
              </div>
              <div className="bg-[#232b3a] border-2 border-dashed border-accent/40 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-accent transition min-h-[100px] w-full"
                onClick={() => filesInputRef.current?.click()}
                onDrop={handleFilesDrop}
                onDragOver={e => e.preventDefault()}
              >
                <label className="block text-gray-300 font-semibold mb-2">File Attachments</label>
                {attachmentNames.length > 0 && (
                  <ul className="text-gray-300 text-sm mb-2 w-full text-center">
                    {attachmentNames.map((name, i) => (
                      <li key={i} className="flex items-center justify-center gap-2">
                        <span>{name}</span>
                        <button type="button" onClick={e => { e.stopPropagation(); removeAttachment(i); }} className="ml-2 bg-black/60 rounded-full p-1 hover:bg-red-600 transition" aria-label="Remove file">
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {attachmentNames.length === 0 && (
                  <span className="text-gray-400">Select or Drop your files</span>
                )}
                <input
                  ref={filesInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFilesSelect}
                />
              </div>
            </div>
          </div>
          {/* Short summary full width below meta fields */}
          <textarea className="border border-accent/20 bg-[#232b3a] text-white rounded px-3 py-2 placeholder-gray-400 focus:border-accent focus:ring-accent focus:outline-none text-base min-h-[80px] max-h-[160px] resize-none w-full" placeholder="Short Summary / Excerpt (max 200 chars)*" maxLength={200} value={draft.excerpt} onChange={e => handleChange("excerpt", e.target.value)} />
          {/* Middle: Article Content and Live Preview side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 min-w-0">
              <label className="block text-gray-300 font-semibold mb-1">Article Content (Markdown)</label>
              <textarea className="border border-accent/20 bg-[#232b3a] text-white rounded px-3 py-2 placeholder-gray-400 focus:border-accent focus:ring-accent focus:outline-none text-base h-[220px] resize-none w-full scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-[#232b3a]" placeholder="Write your article in Markdown..." value={draft.content} onChange={e => handleChange("content", e.target.value)} />
              <div className="text-right text-xs text-gray-400">Word count: {wordCount}</div>
            </div>
            <div className="flex flex-col gap-2 min-w-0">
              <label className="block text-gray-300 font-semibold mb-1">Live Preview</label>
              <div className="bg-[#232b3a] border border-accent/20 rounded p-4 h-[220px] w-full prose prose-invert max-w-none overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-[#232b3a]">
                <ReactMarkdown>{draft.content || "Nothing to preview yet."}</ReactMarkdown>
              </div>
            </div>
          </div>
          {/* Consent checkbox above submit button */}
          <div className="flex items-center gap-3 text-gray-300 mt-2 mb-2">
            <input type="checkbox" id="consent" checked={draft.consent} onChange={e => handleChange("consent", e.target.checked)} className="w-5 h-5 rounded border-2 border-accent bg-[#232b3a] focus:ring-2 focus:ring-accent transition-all duration-150 cursor-pointer" />
            <label htmlFor="consent" className="select-none cursor-pointer text-base leading-tight">I affirm this is my work and grant Asvara permission to edit and publish.</label>
          </div>
          {/* Bottom: Submit button */}
          <Button className="w-full mt-2" onClick={handleSubmit} disabled={submitting} variant="primary" size="lg" type="submit">Send for Review</Button>
        </form>
        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-[#181c24] rounded-lg p-8 max-w-sm w-full text-center shadow-lg border border-accent/20">
              <h2 className="text-xl font-bold mb-4 text-white">Are you ready to submit?</h2>
              <p className="mb-6 text-gray-300">You won't be able to edit after submission until reviewed by our team.</p>
              <div className="flex gap-4 justify-center">
                <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit} disabled={submitting}>{submitting ? "Submitting..." : "Yes, Submit"}</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 