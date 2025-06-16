"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/Button";
import axiosInstance from '@/lib/axios';

export default function AdminBlogsPage() {
  const [pending, setPending] = useState<any[]>([]);
  const [approved, setApproved] = useState<any[]>([]);
  const [rejected, setRejected] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState<{ id: string; type: "APPROVED" | "REJECTED" } | null>(null);

  useEffect(() => {
    axiosInstance.get("/api/admin/blog-submissions")
      .then((res) => {
        const all = res.data.submissions || [];
        setPending(all.filter((s: any) => s.status === "PENDING"));
        setApproved(all.filter((s: any) => s.status === "APPROVED"));
        setRejected(all.filter((s: any) => s.status === "REJECTED"));
        setLoading(false);
      })
      .catch((e) => {
        setError("Failed to load blog submissions");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string, type: "APPROVED" | "REJECTED") => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    try {
      await axiosInstance.delete(`/api/admin/blog-submissions?id=${id}`);
      if (type === "APPROVED") setApproved((prev) => prev.filter((s) => s.id !== id));
      if (type === "REJECTED") setRejected((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Failed to delete submission.");
    }
  };

  const handleModerate = async (id: string, action: "APPROVE" | "REJECT") => {
    try {
      const res = await axiosInstance.post(`/api/admin/blog-submissions/moderate`, { id, action });
      setPending((prev) => prev.filter((s) => s.id !== id));
      const updated = res.data;
      if (action === "APPROVE") {
        setApproved((prev) => [updated.submission, ...prev]);
      } else {
        setRejected((prev) => [updated.submission, ...prev]);
      }
    } catch {
      alert("Failed to moderate submission.");
    }
  };

  const openDeleteDialog = (id: string, type: "APPROVED" | "REJECTED") => {
    setSubmissionToDelete({ id, type });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!submissionToDelete) return;
    try {
      await axiosInstance.delete(`/api/admin/blog-submissions?id=${submissionToDelete.id}`);
      if (submissionToDelete.type === "APPROVED") setApproved((prev) => prev.filter((s) => s.id !== submissionToDelete.id));
      if (submissionToDelete.type === "REJECTED") setRejected((prev) => prev.filter((s) => s.id !== submissionToDelete.id));
      setDeleteDialogOpen(false);
      setSubmissionToDelete(null);
    } catch {
      alert("Failed to delete submission.");
      setDeleteDialogOpen(false);
      setSubmissionToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-black py-20 px-4">
      <div className="max-w-5xl mx-auto bg-[#181c24] rounded-xl shadow-lg border border-accent/10 p-8">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">Blog Moderation Dashboard</h1>
        {loading ? (
          <div className="text-gray-300 text-center py-12">Loading...</div>
        ) : error ? (
          <div className="text-red-400 text-center py-12">{error}</div>
        ) : (
          <>
            {/* Pending List */}
            <h2 className="text-xl font-bold text-yellow-400 mb-4 mt-2">Pending Submissions</h2>
            {pending.length === 0 ? (
              <div className="text-gray-400 text-center py-4">No pending submissions found.</div>
            ) : (
              <div className="overflow-x-auto mb-8">
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
                    {pending.map((submission) => (
                      <tr key={submission.id} className="border-b border-accent/10 hover:bg-[#232b3a] transition">
                        <td className="px-4 py-3 font-semibold text-white">{submission.title}</td>
                        <td className="px-4 py-3">{submission.authorName || <span className="text-gray-500">—</span>}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-700 text-yellow-200">{submission.status}</span>
                        </td>
                        <td className="px-4 py-3 flex gap-2">
                          <Link href={`/blogs/${submission.id}`} className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-white/10 text-white hover:bg-white/20 h-9 px-4 text-sm">
                            View
                          </Link>
                          <Button size="sm" variant="primary" className="bg-green-600 hover:bg-green-700" onClick={() => handleModerate(submission.id, "APPROVE")}>Approve</Button>
                          <Button size="sm" variant="primary" className="bg-red-600 hover:bg-red-700" onClick={() => handleModerate(submission.id, "REJECT")}>Reject</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Approved List */}
            <h2 className="text-xl font-bold text-green-400 mb-4 mt-8">Approved Submissions</h2>
            {approved.length === 0 ? (
              <div className="text-gray-400 text-center py-4">No approved submissions found.</div>
            ) : (
              <div className="overflow-x-auto mb-8">
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
                    {approved.map((submission) => (
                      <tr key={submission.id} className="border-b border-accent/10 hover:bg-[#232b3a] transition">
                        <td className="px-4 py-3 font-semibold text-white">{submission.title}</td>
                        <td className="px-4 py-3">{submission.authorName || <span className="text-gray-500">—</span>}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-green-700 text-green-200">{submission.status}</span>
                        </td>
                        <td className="px-4 py-3 flex gap-2">
                          <Link href={`/blogs/${submission.id}`} className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-white/10 text-white hover:bg-white/20 h-9 px-4 text-sm">
                            View
                          </Link>
                          <Button size="sm" variant="secondary" onClick={() => openDeleteDialog(submission.id, "APPROVED")}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Rejected List */}
            <h2 className="text-xl font-bold text-red-400 mb-4 mt-8">Rejected Submissions</h2>
            {rejected.length === 0 ? (
              <div className="text-gray-400 text-center py-4">No rejected submissions found.</div>
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
                    {rejected.map((submission) => (
                      <tr key={submission.id} className="border-b border-accent/10 hover:bg-[#232b3a] transition">
                        <td className="px-4 py-3 font-semibold text-white">{submission.title}</td>
                        <td className="px-4 py-3">{submission.authorName || <span className="text-gray-500">—</span>}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-red-700 text-red-200">{submission.status}</span>
                        </td>
                        <td className="px-4 py-3 flex gap-2">
                          <Link href={`/blogs/${submission.id}`} className="inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-white/10 text-white hover:bg-white/20 h-9 px-4 text-sm">
                            View
                          </Link>
                          <Button size="sm" variant="secondary" onClick={() => openDeleteDialog(submission.id, "REJECTED")}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
      {/* Custom Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#181c24] border border-accent/20 rounded-xl shadow-xl p-8 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold text-white mb-4">Delete Submission?</h2>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this submission? This action cannot be undone.</p>
            <div className="flex gap-4 justify-center">
              <Button variant="secondary" onClick={() => { setDeleteDialogOpen(false); setSubmissionToDelete(null); }}>Cancel</Button>
              <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/30" onClick={confirmDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 