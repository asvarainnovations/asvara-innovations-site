"use client";
import { useRef } from "react";

type ResumeUploadProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
};

export default function ResumeUpload({ onChange, error, touched }: ResumeUploadProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  return (
    <div>
      <label className="block text-[#F5F5F5] text-[0.875rem] font-medium uppercase mb-1 tracking-wide" htmlFor="resume">Resume (PDF/DOC) *</label>
      <input
        className={`w-full bg-[#18181b] border ${error && touched ? 'border-red-500' : 'border-[#A6A6A6]/30'} rounded-md px-4 py-2 text-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition-shadow text-base file:bg-[#2979FF] file:text-white file:font-semibold file:rounded file:px-4 file:py-2 file:border-0`}
        type="file"
        name="resume"
        id="resume"
        accept=".pdf,.doc,.docx"
        onChange={onChange}
        ref={fileInput}
      />
      <div className="h-5 mt-1 text-xs">
        {touched && error ? <span className="text-red-500">{error}</span> : <span className="text-[#A6A6A6]">&nbsp;</span>}
      </div>
    </div>
  );
} 