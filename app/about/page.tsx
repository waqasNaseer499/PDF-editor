import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About PDF Editor - Free Online PDF Annotation Tool',
  description: 'Learn about our Professional PDF Editor. Discover how to edit, annotate, and customize PDF documents online for free. No installation required.',
  alternates: {
    canonical: 'https://pdf-editor.vercel.app/about',
  },
}

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <Link href="/" className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 sm:gap-2 mb-4 sm:mb-6 text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-slate-800 mb-2 sm:mb-4">About Professional PDF Editor</h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600">Your free, online solution for PDF editing and annotation</p>
          </div>

          {/* Main Content */}
          <article className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 space-y-4 sm:space-y-6">
            <section>
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-slate-800 mb-2 sm:mb-4">What is PDF Editor?</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Professional PDF Editor is a free, web-based application that allows you to edit and annotate PDF documents directly in your browser. Whether you&apos;re a student, professional, or casual user, our tool provides a simple yet powerful way to mark up, annotate, and customize your PDF files without requiring any software installation.
              </p>
            </section>

            <section>
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-slate-800 mb-3 sm:mb-4">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="border-l-4 border-indigo-600 pl-3 sm:pl-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 mb-1 sm:mb-2">Text Annotation</h3>
                  <p className="text-slate-600 text-xs sm:text-sm">Add custom text to your PDFs with adjustable font sizes and colors for clear, professional annotations.</p>
                </div>
                <div className="border-l-4 border-purple-600 pl-3 sm:pl-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 mb-1 sm:mb-2">Shape Tools</h3>
                  <p className="text-slate-600 text-xs sm:text-sm">Draw rectangles and circles to highlight and emphasize specific areas of your documents.</p>
                </div>
                <div className="border-l-4 border-pink-600 pl-3 sm:pl-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 mb-1 sm:mb-2">Freehand Drawing</h3>
                  <p className="text-slate-600 text-xs sm:text-sm">Use our pencil tool to sketch, draw, and make freehand annotations on any part of your PDF.</p>
                </div>
                <div className="border-l-4 border-rose-600 pl-3 sm:pl-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 mb-1 sm:mb-2">Highlighting</h3>
                  <p className="text-slate-600 text-xs sm:text-sm">Highlight important text and sections with customizable colors and opacity levels.</p>
                </div>
                <div className="border-l-4 border-blue-600 pl-3 sm:pl-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 mb-1 sm:mb-2">Multi-page Support</h3>
                  <p className="text-slate-600 text-xs sm:text-sm">Navigate and edit multiple pages in a single PDF document with ease.</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-3 sm:pl-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 mb-1 sm:mb-2">Zoom Controls</h3>
                  <p className="text-slate-600 text-xs sm:text-sm">Zoom in and out to work with precise details or see the whole page at once.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-slate-800 mb-3 sm:mb-4">Why Choose PDF Editor?</h2>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-indigo-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-slate-800 text-sm sm:text-base">Completely Free:</strong> <span className="text-slate-600 text-xs sm:text-sm">No hidden fees, subscriptions, or premium features. Use all tools without payment.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-indigo-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-slate-800 text-sm sm:text-base">No Installation Required:</strong> <span className="text-slate-600 text-xs sm:text-sm">Works directly in your web browser on any device - Windows, Mac, or Linux.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-indigo-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-slate-800 text-sm sm:text-base">Privacy Focused:</strong> <span className="text-slate-600 text-xs sm:text-sm">Your documents are processed locally and are never stored on our servers.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-indigo-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-slate-800 text-sm sm:text-base">User Friendly:</strong> <span className="text-slate-600 text-xs sm:text-sm">Intuitive interface designed for users of all technical levels.</span>
                  </div>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <span className="text-indigo-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                  <div>
                    <strong className="text-slate-800 text-sm sm:text-base">Fast and Reliable:</strong> <span className="text-slate-600 text-xs sm:text-sm">Quick PDF processing with stable performance and minimal downtime.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 font-bold mt-1">✓</span>
                  <div>
                    <strong className="text-slate-800">Comprehensive Tools:</strong> All essential annotation features in one place - no need for multiple tools.
                  </div>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">How to Use PDF Editor</h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">1</span>
                  <div>
                    <strong className="text-slate-800">Upload Your PDF:</strong> Click &ldquo;Open PDF Editor&rdquo; and select a PDF file from your computer.
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">2</span>
                  <div>
                    <strong className="text-slate-800">Select a Tool:</strong> Choose from text, shapes, drawing, or highlight tools from the toolbar.
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">3</span>
                  <div>
                    <strong className="text-slate-800">Customize:</strong> Adjust colors, font sizes, and other settings as needed.
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">4</span>
                  <div>
                    <strong className="text-slate-800">Annotate Your PDF:</strong> Click, drag, and create your annotations on the document.
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">5</span>
                  <div>
                    <strong className="text-slate-800">Download:</strong> Click &ldquo;Download PDF&rdquo; to save your edited document with all annotations.
                  </div>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Use Cases</h2>
              <p className="text-slate-600 mb-4">Our PDF Editor is perfect for:</p>
              <ul className="space-y-2 text-slate-600">
                <li>📚 <strong>Students:</strong> Annotate lecture notes, textbooks, and research papers</li>
                <li>💼 <strong>Professionals:</strong> Mark up contracts, proposals, and business documents</li>
                <li>✍️ <strong>Teachers:</strong> Grade student assignments and provide feedback on documents</li>
                <li>📋 <strong>Reviewers:</strong> Add comments and markup to drafts and proposals</li>
                <li>🏢 <strong>Business Users:</strong> Annotate forms, applications, and official documents</li>
              </ul>
            </section>

            <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">Ready to Get Started?</h2>
              <p className="text-slate-600 mb-4">Start editing and annotating your PDFs for free today. No registration required.</p>
              <Link href="/" className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
                Open PDF Editor
              </Link>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}
