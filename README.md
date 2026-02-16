# Professional PDF Editor

A modern, feature-rich PDF editor built with Next.js, React, and pdf-lib. Edit, annotate, and customize your PDF documents with powerful tools.

## Features

- 📄 **Upload PDF** - Load any PDF document to start editing
- ✏️ **Text Tool** - Add custom text with adjustable font size and color
- ⬜ **Shape Tools** - Draw rectangles and circles for emphasis
- ✍️ **Freehand Drawing** - Sketch and annotate freely
- 🖍️ **Highlight Tool** - Mark important sections
- 📑 **Multi-page Support** - Edit PDFs with multiple pages
- 🔍 **Zoom Controls** - Adjust view for precise editing
- 💾 **Download** - Save your edited PDF with all annotations

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **pdf-lib** - PDF generation and modification
- **pdfjs-dist** - PDF rendering
- **Google Fonts** - Beautiful typography (Playfair Display + Inter)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Extract the zip file:
```bash
unzip pdf-editor.zip
cd pdf-editor
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. **Upload a PDF**: Click "Open PDF Editor" and select a PDF file
2. **Choose a Tool**: Select from text, shapes, drawing, or highlighting tools
3. **Annotate**: Click or drag on the canvas to add annotations
4. **Customize**: Change colors and font sizes as needed
5. **Navigate**: Use page controls to edit different pages
6. **Download**: Click "Download PDF" to save your edited document

## Available Tools

### Select Tool 👆
- Default cursor mode
- Navigate without editing

### Text Tool 📝
- Click anywhere to add text
- Adjust font size (8-72px)
- Choose custom colors

### Rectangle Tool ⬜
- Click and drag to draw rectangles
- Perfect for highlighting sections or creating borders

### Circle Tool ⭕
- Click and drag to draw circles
- Great for marking specific areas

### Draw Tool ✏️
- Freehand drawing
- Sketch annotations directly on the PDF

### Highlight Tool 🖍️
- Semi-transparent rectangles
- Mark important text and sections

## Project Structure

```
pdf-editor/
├── app/
│   ├── components/
│   │   └── PDFEditor.tsx    # Main PDF editor component
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with fonts
│   └── page.tsx              # Landing page
├── public/                   # Static assets
├── package.json              # Dependencies
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── next.config.js           # Next.js configuration
```

## Building for Production

```bash
npm run build
npm start
```

The application will be optimized and ready for deployment.

## Deployment

This Next.js app can be deployed to:

- **Vercel** (recommended): `vercel deploy`
- **Netlify**: Connect your git repository
- **Docker**: Build and run in a container
- **Traditional hosting**: Use `npm run build` and serve the `.next` folder

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Limitations

- Client-side processing only (files are not uploaded to any server)
- Large PDFs (>50MB) may experience performance issues
- Drawing annotations are rendered as vector paths in the final PDF

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue in the repository.

---

Built with ❤️ using Next.js and React
