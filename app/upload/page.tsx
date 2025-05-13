"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudArrowUpIcon, DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axiosInstance from '@/lib/axios';

// Mock data - replace with actual data from your backend
const processingQueue = [
  {
    id: 1,
    fileName: "legal_document_1.pdf",
    status: "Processing",
    progress: 75,
    uploadedAt: "2024-03-20 14:30",
  },
  {
    id: 2,
    fileName: "case_notes.jsonl",
    status: "Queued",
    progress: 0,
    uploadedAt: "2024-03-20 14:35",
  },
];

export default function Upload() {
  const [files, setFiles] = useState<File[]>([]);
  const [settings, setSettings] = useState({
    skipFirstPages: 0,
    chunkSize: 1000,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/jsonl": [".jsonl"],
    },
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('skipFirstPages', settings.skipFirstPages.toString());
    formData.append('chunkSize', settings.chunkSize.toString());
    try {
      // TODO: Replace with actual upload API endpoint
      await axiosInstance.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Files uploaded successfully!');
    } catch (err) {
      alert('Failed to upload files. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background dots/grid effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] bg-[size:16px_16px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-6">
            Upload & Process Data
          </h1>
          <p className="text-xl text-gray-300">
            Upload your legal documents for AI-powered analysis
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Upload Files
              </h2>

              {/* Dropzone */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-accent bg-accent/10"
                    : "border-white/20 hover:border-white/40"
                }`}
              >
                <input {...getInputProps()} />
                <CloudArrowUpIcon className="h-12 w-12 text-white/50 mx-auto mb-4" />
                <p className="text-white mb-2">
                  {isDragActive
                    ? "Drop the files here"
                    : "Drag & drop files here, or click to select"}
                </p>
                <p className="text-sm text-gray-400">
                  Supported formats: PDF, JSONL
                </p>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-medium text-white">Selected Files</h3>
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white/5 rounded-lg p-4"
                    >
                      <div className="flex items-center">
                        <DocumentIcon className="h-5 w-5 text-white/50 mr-3" />
                        <span className="text-white">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-white/50 hover:text-white"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Settings */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-white mb-4">Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="skipFirstPages"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Skip First Pages
                    </label>
                    <input
                      type="number"
                      id="skipFirstPages"
                      value={settings.skipFirstPages}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          skipFirstPages: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      min="0"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="chunkSize"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Chunk Size (characters)
                    </label>
                    <input
                      type="number"
                      id="chunkSize"
                      value={settings.chunkSize}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          chunkSize: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      min="100"
                      step="100"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleUpload}
                disabled={files.length === 0}
                className="w-full mt-8 bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload & Process
              </button>
            </div>
          </motion.div>

          {/* Processing Queue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Processing Queue
              </h2>
              <div className="space-y-4">
                {processingQueue.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/5 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <DocumentIcon className="h-5 w-5 text-white/50 mr-3" />
                        <span className="text-white">{item.fileName}</span>
                      </div>
                      <span
                        className={`text-sm ${
                          item.status === "Processing"
                            ? "text-accent"
                            : "text-gray-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    {item.status === "Processing" && (
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    )}
                    <p className="text-sm text-gray-400 mt-2">
                      Uploaded: {item.uploadedAt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 