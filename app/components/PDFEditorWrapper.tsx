'use client';

import { useState } from 'react';
import PDFEditor from './PDFEditor';

export default function PDFEditorWrapper() {
  const [file, setFile] = useState<File | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setShowEditor(true);
    }
  };

  const handleOpenEditor = () => {
    document.getElementById('file-upload')?.click();
  };

  if (showEditor && file) {
    return <PDFEditor file={file} onClose={() => setShowEditor(false)} />;
  }

  return (
    <>
      <button
        onClick={handleOpenEditor}
        className="btn-primary text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-3 md:py-4 inline-flex items-center gap-2 sm:gap-3 group"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Open PDF editor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="hidden xs:inline">Open PDF Editor</span>
        <span className="inline xs:hidden">Open Editor</span>
        <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
      <input
        id="file-upload"
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="hidden"
      />
    </>
  );
}
