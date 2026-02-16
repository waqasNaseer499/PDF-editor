import { Suspense } from 'react';
import PDFEditorWrapper from './components/PDFEditorWrapper';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-6 py-6 sm:py-12">
        <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in-up">
          <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-4">
            Professional PDF Editor
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto px-2">
            Edit, annotate, and customize your PDF documents with powerful tools. Free online PDF editor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <div className="glass rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-lg mx-auto">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Upload PDF files">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-2 sm:mb-3">Upload PDF</h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-600">Load any PDF document to start editing.</p>
          </div>

          <div className="glass rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-lg mx-auto">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Edit and annotate PDFs">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-2 sm:mb-3">Edit & Annotate</h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-600">Add text, shapes, drawings, and highlights.</p>
          </div>

          <div className="glass rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 hover:scale-105 transition-transform duration-300 animate-fade-in-up sm:col-span-2 lg:col-span-1" style={{ animationDelay: '0.3s' }}>
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-lg mx-auto">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Download edited PDF">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-2 sm:mb-3">Download</h3>
            <p className="text-xs sm:text-sm md:text-base text-slate-600">Save your edited PDF with all annotations.</p>
          </div>
        </div>

        <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Suspense fallback={<div className="text-sm sm:text-base">Loading editor...</div>}>
            <PDFEditorWrapper />
          </Suspense>
        </div>

        <section className="max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16 bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4 sm:mb-6">About Our PDF Editor</h2>
          <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed">
            <p>
              Our Professional PDF Editor is a free, online tool that allows you to edit and annotate PDF documents without any installation required. Whether you need to add text, draw on documents, highlight important sections, or add shapes, our intuitive editor makes it easy.
            </p>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 mt-4 sm:mt-6 mb-2 sm:mb-3">Key Features</h3>
            <ul className="list-disc pl-5 sm:pl-6 space-y-1 sm:space-y-2">
              <li><strong>Text Annotation:</strong> Add custom text with adjustable font sizes</li>
              <li><strong>Shape Tools:</strong> Draw rectangles and circles</li>
              <li><strong>Free Drawing:</strong> Use the pencil tool for freehand annotations</li>
              <li><strong>Highlighting:</strong> Highlight important text with customizable colors</li>
              <li><strong>Multi-page Support:</strong> Navigate and edit multiple pages easily</li>
              <li><strong>Zoom Controls:</strong> Zoom in and out for precise editing</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
