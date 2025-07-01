"use client";

import { useEffect, useState } from "react";
import { Download, Search, Eye, Trash2 } from "lucide-react";
import { format } from "date-fns";
import axios from '@/lib/axios';
import { toast } from 'sonner';

interface CareerSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  position: string;
  linkedin?: string;
  portfolio?: string;
  cover?: string;
  resumeUrl: string;
  createdAt: string;
}

const fetchSubmissions = async () => {
  const res = await fetch("/api/admin/careers");
  if (!res.ok) throw new Error("Failed to fetch submissions");
  return res.json();
};

const positions = [
  "All",
  "ML Engineer",
  "Frontend Engineer",
  "Legal Researcher",
  "DevOps",
  "Marketing",
  "Product Manager",
  "QA Engineer",
  "Content Writer",
  "Other"
];

export default function AdminCareersPage() {
  const [submissions, setSubmissions] = useState<CareerSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<CareerSubmission | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState<CareerSubmission | null>(null);

  useEffect(() => {
    fetchSubmissions()
      .then((data) => setSubmissions(data.submissions || []))
      .catch(() => setSubmissions([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = submissions
    .filter((s) =>
      (filter === "All" || s.position === filter) &&
      (s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.position.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleDelete = async (entry: CareerSubmission) => {
    setDeleting(entry.id);
    try {
      await axios.delete(`/api/admin/careers?id=${entry.id}`);
      setSubmissions(submissions => submissions.filter(s => s.id !== entry.id));
      toast.success('Submission deleted.');
    } catch (err: any) {
      toast.error('Failed to delete submission.');
    } finally {
      setDeleting(null);
      setConfirmOpen(false);
      setToDelete(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#0E0E10] text-[#F5F5F5] px-4 py-10">
      <div className="max-w-6xl mx-auto mt-12">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8">Career Submissions</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-[#18181b] rounded-md px-3 py-2 border border-[#23233a] w-full md:w-72">
            <Search className="w-5 h-5 text-[#A6A6A6]" />
            <input
              className="bg-transparent outline-none text-[#F5F5F5] w-full"
              placeholder="Search by name, email, or position"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="bg-[#18181b] border border-[#23233a] rounded-md px-3 py-2 text-[#F5F5F5] w-full md:w-56"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            {positions.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto rounded-lg shadow border border-[#23233a] bg-[#18181b]">
          <table className="min-w-full text-sm md:text-base">
            <thead>
              <tr className="text-left border-b border-[#23233a]">
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Position</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Resume</th>
                <th className="py-3 px-4 font-semibold">View</th>
                <th className="py-3 px-4 font-semibold">Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="py-8 text-center text-[#A6A6A6]">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="py-8 text-center text-[#A6A6A6]">No submissions found.</td></tr>
              ) : filtered.map(sub => (
                <tr key={sub.id} className="border-b border-[#23233a] hover:bg-[#23233a]/40 transition">
                  <td className="py-3 px-4 font-medium">{sub.name}</td>
                  <td className="py-3 px-4">{sub.email}</td>
                  <td className="py-3 px-4">{sub.position}</td>
                  <td className="py-3 px-4">{format(new Date(sub.createdAt), 'yyyy-MM-dd HH:mm')}</td>
                  <td className="py-3 px-4">
                    <a
                      href={sub.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#2979FF] hover:underline"
                    >
                      <Download className="w-4 h-4" /> Resume
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => setSelected(sub)} className="text-[#2979FF] hover:underline flex items-center gap-1">
                      <Eye className="w-5 h-5" /> View
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => { setToDelete(sub); setConfirmOpen(true); }}
                      className="text-red-500 hover:underline flex items-center gap-1"
                      disabled={deleting === sub.id}
                    >
                      <Trash2 className="w-5 h-5" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal for viewing details */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#18181b] rounded-2xl shadow-xl border border-[#23233a] p-8 w-full max-w-lg relative">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-[#A6A6A6] hover:text-[#F5F5F5] text-2xl font-bold">×</button>
            <h2 className="text-2xl font-extrabold mb-4">{selected.name}</h2>
            <div className="space-y-2 text-base">
              <div><b>Email:</b> {selected.email}</div>
              <div><b>Phone:</b> {selected.phone}</div>
              <div><b>Position:</b> {selected.position}</div>
              {selected.linkedin && (
                <div><b>LinkedIn:</b> <a href={selected.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#2979FF] hover:underline">{selected.linkedin}</a></div>
              )}
              {selected.portfolio && (
                <div><b>Portfolio/GitHub:</b> <a href={selected.portfolio} target="_blank" rel="noopener noreferrer" className="text-[#2979FF] hover:underline">{selected.portfolio}</a></div>
              )}
              {selected.cover && (
                <div><b>Cover Letter:</b>
                  <div className="bg-[#23233a] rounded p-3 mt-1 text-[#F5F5F5] whitespace-pre-line">{selected.cover}</div>
                </div>
              )}
              <div className="mt-4">
                <a href={selected.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#2979FF] text-white rounded-md font-semibold hover:bg-[#1761c7] transition">
                  <Download className="w-5 h-5" /> Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Delete confirmation dialog */}
      {confirmOpen && toDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#18181b] rounded-2xl shadow-xl border border-[#23233a] p-8 w-full max-w-md relative text-center">
            <button onClick={() => setConfirmOpen(false)} className="absolute top-4 right-4 text-[#A6A6A6] hover:text-[#F5F5F5] text-2xl font-bold">×</button>
            <h3 className="text-xl font-bold mb-4">Delete Submission?</h3>
            <p className="mb-6">Are you sure you want to delete the submission from <b>{toDelete.name}</b>?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 rounded-md bg-[#23233a] text-[#F5F5F5] font-semibold hover:bg-[#333]"
                disabled={deleting === toDelete.id}
              >Cancel</button>
              <button
                onClick={() => handleDelete(toDelete)}
                className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700"
                disabled={deleting === toDelete.id}
              >{deleting === toDelete.id ? 'Deleting...' : 'Delete'}</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 