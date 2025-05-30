
// src/components/LivePreview.tsx
"use client";

interface LivePreviewProps {
  htmlContent: string | null;
}

export function LivePreview({ htmlContent }: LivePreviewProps) {
  // Stable placeholder content
  const placeholder = `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; font-family: sans-serif; color: #555; padding: 20px; text-align: center; background-color: #ffffff;">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px; color: #bbb;">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
      <h3 style="margin-bottom: 10px; font-size: 1.3em; color: #444; font-weight: 500;">Live Preview Area</h3>
      <p style="font-size: 0.9em; color: #666;">Your website preview will appear here once generated.</p>
    </div>
  `;

  const headerHeight = "h-8"; // Approx 32px
  const iframeHeight = "calc(700px - 2rem)"; // 700px total - header height

  return (
    <div className="w-full rounded-t-md border border-b-0 border-border overflow-hidden bg-muted/40 shadow-inner h-[700px] flex flex-col">
      {/* Window Header */}
      <div className={`flex items-center px-3 ${headerHeight} bg-slate-200 dark:bg-slate-700 border-b border-border`}>
        <div className="flex space-x-2">
          <span className="h-3 w-3 bg-red-500 rounded-full"></span>
          <span className="h-3 w-3 bg-yellow-400 rounded-full"></span>
          <span className="h-3 w-3 bg-green-500 rounded-full"></span>
        </div>
        {/* Optional: Add a title or URL bar element here if desired */}
        {/* <div className="ml-3 text-xs text-slate-600 dark:text-slate-400 truncate">Preview</div> */}
      </div>

      {/* Iframe Content */}
      <div className="flex-grow w-full bg-white">
        <iframe
          title="Live Preview"
          srcDoc={htmlContent || placeholder}
          className="w-full border-0"
          style={{ height: iframeHeight }} 
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}
