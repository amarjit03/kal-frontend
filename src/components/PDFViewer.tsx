import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PDFViewer = () => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState(1.0);
    const [loading, setLoading] = useState(true);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    const onResize = () => {
        setContainerWidth(Math.min(window.innerWidth * 0.9, 1000)); // Max width 1000px, 90% of screen width otherwise
    };

    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setLoading(false);
    }

    const changePage = (offset: number) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    };

    const previousPage = () => changePage(-1);
    const nextPage = () => changePage(1);

    // Zoom controls
    const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 2.0));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.6));

    const pdfPath = "/pdf/कालचक्र.pdf";

    return (
        <div className="min-h-screen bg-stone-950 flex flex-col relative">
          <div className="sticky top-0 z-50">
            <Navbar />
          </div>

          <div className="flex-grow flex flex-col items-center p-4 md:p-8 relative">
            
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px]"></div>
            </div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="w-full max-w-5xl z-10 flex flex-col gap-6"
            >
                {/* Header Section */}
                <div className="text-center mb-2">
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">
                        E-Newspaper <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Kalchakra</span>
                    </h1>
                    <p className="text-stone-400">Read the latest edition of our independent journalism.</p>
                </div>

                {/* Main PDF Container */}
                <div className="relative group perspective-1000">
                   <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                   
                   <div className="relative bg-stone-900 rounded-xl overflow-hidden shadow-2xl border border-white/5 min-h-[600px] flex justify-center">
                       
                       {loading && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-stone-900/80 backdrop-blur-sm">
                              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                              <span className="text-blue-400 animate-pulse">Loading Edition...</span>
                          </div>
                       )}
                       
                       <Document
                         file={pdfPath}
                         onLoadSuccess={onDocumentLoadSuccess}
                         loading={null}
                         className="max-w-full overflow-auto flex justify-center p-4"
                       >
                         <Page 
                           key={`page_${pageNumber}`}
                           pageNumber={pageNumber} 
                           scale={scale}
                           width={containerWidth}
                           renderTextLayer={false}
                           renderAnnotationLayer={false}
                           className="shadow-[0_0_30px_rgba(0,0,0,0.5)] !bg-white"
                         />
                       </Document>
                   </div>
                </div>

                {/* Floating Controls Bar */}
                <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl"
                >
                    <div className="bg-stone-900/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl shadow-2xl flex flex-wrap items-center justify-between gap-4 md:gap-6 px-4 md:px-6">
                        
                        {/* Page Navigation */}
                        <div className="flex items-center gap-2 md:gap-4 bg-black/20 rounded-xl p-1.5 border border-white/5 mx-auto md:mx-0 order-2 md:order-1">
                           <button
                             disabled={pageNumber <= 1}
                             onClick={previousPage}
                             className="p-2 hover:bg-white/10 disabled:opacity-30 rounded-lg text-white transition-all active:scale-95"
                             title="Previous Page"
                           >
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                           </button>
                           
                           <span className="text-sm font-mono text-stone-300 min-w-[5ch] text-center select-none">
                             {pageNumber} / {numPages || '--'}
                           </span>

                           <button
                             disabled={pageNumber >= (numPages || 1)}
                             onClick={nextPage}
                             className="p-2 hover:bg-white/10 disabled:opacity-30 rounded-lg text-white transition-all active:scale-95"
                             title="Next Page"
                           >
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                           </button>
                        </div>

                        {/* Zoom Controls */}
                        <div className="flex items-center gap-2 bg-black/20 rounded-xl p-1.5 border border-white/5 order-3 md:order-2">
                           <button 
                             onClick={zoomOut}
                             className="p-2 hover:bg-white/10 rounded-lg text-stone-300 transition-all active:scale-95"
                             title="Zoom Out"
                           >
                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
                           </button>
                           <span className="text-xs text-stone-400 w-10 text-center select-none">{Math.round(scale * 100)}%</span>
                           <button 
                             onClick={zoomIn}
                             className="p-2 hover:bg-white/10 rounded-lg text-stone-300 transition-all active:scale-95"
                             title="Zoom In"
                           >
                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
                           </button>
                        </div>

                        {/* Download Button */}
                        <a 
                            href={pdfPath} 
                            download="Kalchakra_E-Newspaper.pdf"
                            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-900/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 order-1 md:order-3 w-full md:w-auto justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                            Download PDF
                        </a>

                    </div>
                </motion.div>
            </motion.div>
          </div>
        </div>
    );
};

export default PDFViewer;
