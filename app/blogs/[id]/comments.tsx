"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/Button";

export default function BlogComments({ blogId }: { blogId: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/blogs/${blogId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments || []);
        setLoading(false);
      })
      .catch((e) => {
        setError("Failed to load comments");
        setLoading(false);
      });
  }, [blogId]);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    // TODO: Post to API
    await new Promise((r) => setTimeout(r, 500));
    setComments([
      ...comments,
      {
        id: Math.random().toString(),
        text,
        authorName: "You",
        createdAt: new Date().toISOString(),
      },
    ]);
    setText("");
    setSubmitting(false);
  };

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-white mb-4">Comments</h3>
      <div className="mb-6 flex gap-2">
        <input
          className="flex-1 border border-accent/20 bg-[#232b3a] text-white rounded px-3 py-2 placeholder-gray-400 focus:border-accent focus:ring-accent focus:outline-none"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={submitting}
        />
        <Button onClick={handleSubmit} disabled={submitting || !text.trim()} variant="primary">
          Post
        </Button>
      </div>
      {loading ? (
        <div className="text-gray-300 py-8 text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-400 py-8 text-center">{error}</div>
      ) : comments.length === 0 ? (
        <div className="text-gray-400 py-8 text-center">No comments yet.</div>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="bg-[#181c24] border border-accent/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-accent font-semibold text-sm">{c.authorName || "Anonymous"}</span>
                <span className="text-gray-500 text-xs ml-auto">{c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}</span>
              </div>
              <div className="text-gray-200">{c.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 