'use client';

import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument, rgb } from 'pdf-lib';

// Set worker path
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

type Tool = 'select' | 'text' | 'rectangle' | 'circle' | 'draw' | 'highlight';

interface Annotation {
  id: string;
  type: Tool;
  page: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  text?: string;
  fontSize?: number;
  color?: string;
  points?: { x: number; y: number }[];
}

interface PDFEditorProps {
  file: File;
  onClose: () => void;
}

export default function PDFEditor({ file, onClose }: PDFEditorProps) {
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTool, setSelectedTool] = useState<Tool>('select');
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [color, setColor] = useState('#000000');
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editingText, setEditingText] = useState<{ x: number; y: number } | null>(null);
  const [textInput, setTextInput] = useState('');
  const [draggingAnnotation, setDraggingAnnotation] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  // Load PDF
  useEffect(() => {
    const loadPDF = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setLoading(false);
      } catch (error) {
        console.error('Error loading PDF:', error);
        alert('Error loading PDF file');
      }
    };

    loadPDF();
  }, [file]);

  // Render PDF page
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    const renderPage = async () => {
      const page = await pdfDoc.getPage(currentPage);
      const viewport = page.getViewport({ scale: zoom * 1.5 });
      
      const canvas = canvasRef.current!;
      const context = canvas.getContext('2d')!;
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      // Set overlay canvas size
      if (overlayRef.current) {
        overlayRef.current.width = viewport.width;
        overlayRef.current.height = viewport.height;
      }

      renderAnnotations();
    };

    renderPage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfDoc, currentPage, zoom]);

  // Render annotations
  const renderAnnotations = () => {
    if (!overlayRef.current) return;

    const ctx = overlayRef.current.getContext('2d')!;
    ctx.clearRect(0, 0, overlayRef.current.width, overlayRef.current.height);

    annotations
      .filter(ann => ann.page === currentPage)
      .forEach(ann => {
        ctx.strokeStyle = ann.color || '#000000';
        ctx.fillStyle = ann.color || '#000000';
        ctx.lineWidth = 2;

        switch (ann.type) {
          case 'text':
            ctx.font = `${(ann.fontSize || 16) * zoom}px Arial`;
            ctx.fillText(ann.text || '', ann.x, ann.y);
            break;

          case 'rectangle':
            ctx.strokeRect(ann.x, ann.y, ann.width || 0, ann.height || 0);
            break;

          case 'circle':
            const radius = Math.sqrt(Math.pow(ann.width || 0, 2) + Math.pow(ann.height || 0, 2)) / 2;
            ctx.beginPath();
            ctx.arc(ann.x + (ann.width || 0) / 2, ann.y + (ann.height || 0) / 2, radius, 0, Math.PI * 2);
            ctx.stroke();
            break;

          case 'draw':
            if (ann.points && ann.points.length > 1) {
              ctx.beginPath();
              ctx.moveTo(ann.points[0].x, ann.points[0].y);
              ann.points.forEach(point => ctx.lineTo(point.x, point.y));
              ctx.stroke();
            }
            break;

          case 'highlight':
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = ann.color || '#FFFF00';
            ctx.fillRect(ann.x, ann.y, ann.width || 0, ann.height || 0);
            ctx.globalAlpha = 1;
            break;
        }
      });
  };

  useEffect(() => {
    renderAnnotations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [annotations, currentPage, zoom]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (editingText) return; // Don't allow other interactions while editing text

    const rect = overlayRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking on an existing text annotation
    if (selectedTool === 'select' || selectedTool === 'text') {
      const clickedAnnotation = annotations.find(ann => {
        if (ann.page !== currentPage || ann.type !== 'text') return false;
        // Check if click is within text bounds (rough estimate)
        const textWidth = (ann.text?.length || 0) * ((ann.fontSize || 16) * 0.6);
        return (
          x >= ann.x &&
          x <= ann.x + textWidth &&
          y >= ann.y - (ann.fontSize || 16) &&
          y <= ann.y + 5
        );
      });

      if (clickedAnnotation) {
        setDraggingAnnotation(clickedAnnotation.id);
        setDragOffset({
          x: x - clickedAnnotation.x,
          y: y - clickedAnnotation.y,
        });
        return;
      }
    }

    if (selectedTool === 'text') {
      setEditingText({ x, y });
      setTextInput('');
      setTimeout(() => textInputRef.current?.focus(), 0);
      return;
    }

    if (selectedTool === 'select') return;

    setIsDrawing(true);
    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      type: selectedTool,
      page: currentPage,
      x,
      y,
      width: 0,
      height: 0,
      color,
      points: selectedTool === 'draw' ? [{ x, y }] : undefined,
    };
    setCurrentAnnotation(newAnnotation);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (draggingAnnotation) {
      const rect = overlayRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setAnnotations(
        annotations.map(ann =>
          ann.id === draggingAnnotation
            ? {
                ...ann,
                x: x - dragOffset.x,
                y: y - dragOffset.y,
              }
            : ann
        )
      );
      return;
    }

    if (!isDrawing || !currentAnnotation) return;

    const rect = overlayRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentAnnotation.type === 'draw') {
      const updatedAnnotation = {
        ...currentAnnotation,
        points: [...(currentAnnotation.points || []), { x, y }],
      };
      setCurrentAnnotation(updatedAnnotation);
      
      // Draw in real-time
      const ctx = overlayRef.current!.getContext('2d')!;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      const points = updatedAnnotation.points!;
      if (points.length > 1) {
        const lastPoint = points[points.length - 2];
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    } else {
      const updatedAnnotation = {
        ...currentAnnotation,
        width: x - currentAnnotation.x,
        height: y - currentAnnotation.y,
      };
      setCurrentAnnotation(updatedAnnotation);
      
      // Render preview
      renderAnnotations();
      const ctx = overlayRef.current!.getContext('2d')!;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2;

      if (currentAnnotation.type === 'rectangle') {
        ctx.strokeRect(currentAnnotation.x, currentAnnotation.y, updatedAnnotation.width!, updatedAnnotation.height!);
      } else if (currentAnnotation.type === 'circle') {
        const radius = Math.sqrt(Math.pow(updatedAnnotation.width!, 2) + Math.pow(updatedAnnotation.height!, 2)) / 2;
        ctx.beginPath();
        ctx.arc(
          currentAnnotation.x + updatedAnnotation.width! / 2,
          currentAnnotation.y + updatedAnnotation.height! / 2,
          radius,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      } else if (currentAnnotation.type === 'highlight') {
        ctx.globalAlpha = 0.3;
        ctx.fillRect(currentAnnotation.x, currentAnnotation.y, updatedAnnotation.width!, updatedAnnotation.height!);
        ctx.globalAlpha = 1;
      }
    }
  };

  const handleMouseUp = () => {
    if (draggingAnnotation) {
      setDraggingAnnotation(null);
      return;
    }

    if (!isDrawing || !currentAnnotation) return;

    setAnnotations([...annotations, currentAnnotation]);
    setIsDrawing(false);
    setCurrentAnnotation(null);
  };

  const handleSaveText = () => {
    if (editingText && textInput.trim()) {
      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        type: 'text',
        page: currentPage,
        x: editingText.x,
        y: editingText.y,
        text: textInput,
        fontSize,
        color,
      };
      setAnnotations([...annotations, newAnnotation]);
    }
    setEditingText(null);
    setTextInput('');
  };

  const handleTextInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveText();
    } else if (e.key === 'Escape') {
      setEditingText(null);
      setTextInput('');
    }
  };

  // Download edited PDF
  const handleDownload = async () => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      // Group annotations by page
      const annotationsByPage: { [key: number]: Annotation[] } = {};
      annotations.forEach(ann => {
        if (!annotationsByPage[ann.page]) {
          annotationsByPage[ann.page] = [];
        }
        annotationsByPage[ann.page].push(ann);
      });

      // Add annotations to PDF
      for (const [pageNum, pageAnnotations] of Object.entries(annotationsByPage)) {
        const page = pages[parseInt(pageNum) - 1];
        const { width, height } = page.getSize();

        for (const ann of pageAnnotations) {
          const scale = width / (canvasRef.current?.width || width);
          const x = ann.x * scale;
          const y = height - (ann.y * scale);

          const hexColor = ann.color || '#000000';
          const r = parseInt(hexColor.slice(1, 3), 16) / 255;
          const g = parseInt(hexColor.slice(3, 5), 16) / 255;
          const b = parseInt(hexColor.slice(5, 7), 16) / 255;

          switch (ann.type) {
            case 'text':
              page.drawText(ann.text || '', {
                x,
                y: y - (ann.fontSize || 16) * scale,
                size: (ann.fontSize || 16) * scale,
                color: rgb(r, g, b),
              });
              break;

            case 'rectangle':
              page.drawRectangle({
                x,
                y: y - (ann.height || 0) * scale,
                width: (ann.width || 0) * scale,
                height: (ann.height || 0) * scale,
                borderColor: rgb(r, g, b),
                borderWidth: 2,
              });
              break;

            case 'circle':
              const radius = Math.sqrt(Math.pow((ann.width || 0) * scale, 2) + Math.pow((ann.height || 0) * scale, 2)) / 2;
              page.drawCircle({
                x: x + ((ann.width || 0) * scale) / 2,
                y: y - ((ann.height || 0) * scale) / 2,
                size: radius,
                borderColor: rgb(r, g, b),
                borderWidth: 2,
              });
              break;

            case 'highlight':
              page.drawRectangle({
                x,
                y: y - (ann.height || 0) * scale,
                width: (ann.width || 0) * scale,
                height: (ann.height || 0) * scale,
                color: rgb(r, g, b),
                opacity: 0.3,
              });
              break;
          }
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'edited-' + file.name;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error saving PDF:', error);
      alert('Error saving PDF');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-pulse text-6xl mb-4">📄</div>
          <p className="text-xl text-slate-600">Loading PDF...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Toolbar */}
      <div className="glass border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 md:gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onClose}
                className="btn-secondary px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm flex items-center gap-1"
                aria-label="Go back to home page"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden xs:inline">Back</span>
              </button>
              <h2 className="font-bold text-sm sm:text-lg md:text-xl text-slate-800 truncate">PDF Editor</h2>
            </div>

            {/* Tools */}
            <div className="flex items-center gap-1 flex-wrap justify-center w-full sm:w-auto">
              {[
                { tool: 'select' as Tool, icon: '👆', label: 'Select' },
                { tool: 'text' as Tool, icon: '📝', label: 'Text' },
                { tool: 'rectangle' as Tool, icon: '⬜', label: 'Rectangle' },
                { tool: 'circle' as Tool, icon: '⭕', label: 'Circle' },
                { tool: 'draw' as Tool, icon: '✏️', label: 'Draw' },
                { tool: 'highlight' as Tool, icon: '🖍️', label: 'Highlight' },
              ].map(({ tool, icon, label }) => (
                <button
                  key={tool}
                  onClick={() => setSelectedTool(tool)}
                  className={`px-1.5 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm font-semibold transition-all ${
                    selectedTool === tool
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                  title={label}
                  aria-label={`${label} tool`}
                  aria-pressed={selectedTool === tool}
                >
                  <span className="text-sm sm:text-lg" aria-hidden="true">{icon}</span>
                </button>
              ))}

              {/* Color Picker */}
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded cursor-pointer border-2 border-white shadow-lg"
                title="Color picker"
                aria-label="Select annotation color"
              />

              {/* Font Size */}
              {selectedTool === 'text' && (
                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  min="8"
                  max="72"
                  className="w-12 sm:w-20 px-1 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm border-2 border-slate-200"
                  placeholder="Size"
                  aria-label="Set font size for text annotations"
                />
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
              <button
                onClick={() => setAnnotations(annotations.slice(0, -1))}
                className="btn-secondary px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm"
                disabled={annotations.length === 0}
                aria-label="Undo last annotation"
              >
                ↶
              </button>
              <button
                onClick={handleDownload}
                className="btn-primary px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm flex items-center gap-1"
                aria-label="Download edited PDF file"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="hidden sm:inline text-xs md:text-sm">Download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="container mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6">
          {/* Main Canvas */}
          <div className="flex-1 min-w-0">
            <div 
              ref={containerRef}
              className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-xl md:shadow-2xl p-2 sm:p-4 md:p-8 overflow-auto"
              style={{ maxHeight: 'calc(100vh - 200px)' }}
            >
              <div className="relative inline-block w-full">
                <canvas ref={canvasRef} className="border border-slate-200 rounded w-full max-w-full" />
                <canvas
                  ref={overlayRef}
                  className={`absolute top-0 left-0 ${
                    selectedTool === 'text' ? 'cursor-text' :
                    selectedTool === 'draw' ? 'cursor-crosshair' :
                    selectedTool === 'select' ? 'cursor-default' :
                    'cursor-crosshair'
                  }`}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                />
                {editingText && (
                  <input
                    ref={textInputRef}
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onBlur={handleSaveText}
                    onKeyDown={handleTextInputKeyDown}
                    className="absolute px-2 py-1 border-2 border-indigo-500 rounded bg-white text-slate-800 font-sans z-10 text-sm sm:text-base"
                    style={{
                      left: `${editingText.x}px`,
                      top: `${editingText.y}px`,
                      fontSize: `${fontSize}px`,
                      color: color,
                      minWidth: '150px',
                    }}
                    placeholder="Type text..."
                    aria-label="Text input for annotation"
                  />
                )}
              </div>
            </div>

            {/* Page Controls */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-6 flex-wrap">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="btn-secondary px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm"
                aria-label="Go to previous page"
              >
                ← Prev
              </button>
              <span className="text-slate-700 font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap" aria-live="polite">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="btn-secondary px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-xs sm:text-sm"
                aria-label="Go to next page"
              >
                Next →
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4">
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                className="btn-secondary px-2 sm:px-3 py-1 text-xs sm:text-sm"
                aria-label="Zoom out"
              >
                −
              </button>
              <span className="text-slate-700 font-semibold min-w-[50px] sm:min-w-[70px] text-center text-xs sm:text-sm" aria-live="polite">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                className="btn-secondary px-2 sm:px-3 py-1 text-xs sm:text-sm"
                aria-label="Zoom in"
              >
                +
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-64 xl:w-80">
            <div className="glass rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 sticky top-20 max-h-96 sm:max-h-full">
              <h3 className="font-bold text-sm sm:text-base md:text-lg text-slate-800 mb-3 sm:mb-4">Annotations</h3>
              <div className="space-y-2 max-h-80 overflow-auto text-xs sm:text-sm" role="region" aria-label="List of annotations on current page">
                {annotations.filter(ann => ann.page === currentPage).map((ann) => (
                  <div key={ann.id} className="bg-white rounded-lg p-2 sm:p-3">
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-semibold text-slate-700 capitalize truncate">{ann.type}</span>
                      <button
                        onClick={() => setAnnotations(annotations.filter(a => a.id !== ann.id))}
                        className="text-red-500 hover:text-red-700 flex-shrink-0"
                        aria-label={`Delete ${ann.type} annotation`}
                      >
                        ✕
                      </button>
                    </div>
                    {ann.text && <p className="text-slate-600 mt-1 truncate text-xs">{ann.text}</p>}
                  </div>
                ))}
                {annotations.filter(ann => ann.page === currentPage).length === 0 && (
                  <p className="text-slate-500 text-center py-4 text-xs">No annotations</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
