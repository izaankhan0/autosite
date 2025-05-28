
// src/components/LivePreview.tsx
"use client";

import { useRef, useEffect } from 'react';

interface LivePreviewProps {
  htmlContent: string | null;
}

export function LivePreview({ htmlContent }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Stable placeholder content
  const placeholder = `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; font-family: sans-serif; color: #555; padding: 20px; text-align: center; background-color: #f0f0f0;">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 16px; color: #bbb;">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
      <h3 style="margin-bottom: 10px; font-size: 1.3em; color: #444; font-weight: 500;">Live Preview Area</h3>
      <p style="font-size: 0.9em; color: #666;">Your website preview will appear here once generated.</p>
    </div>
  `;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      try {
        if (iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.body) {
          const body = iframe.contentWindow.document.body;
          const html = iframe.contentWindow.document.documentElement;
          
          const newHeight = Math.max(
            body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight
          );

          iframe.style.height = `${newHeight + 50}px`; // Increased buffer
        } else {
          // Default height if body is not accessible (should ideally not happen with same-origin)
          iframe.style.height = '400px'; 
        }
      } catch (e) {
        console.error("Error adjusting iframe height (could be a security restriction if 'allow-same-origin' is missing or misconfigured):", e);
        // Fallback height in case of an error during height calculation
        iframe.style.height = htmlContent ? '2000px' : '400px'; // More generous fallback for content
      }
    };

    iframe.addEventListener('load', handleLoad);
    
    iframe.srcdoc = htmlContent || placeholder;
    
    if (!htmlContent) {
      iframe.style.height = '400px';
    }

    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, [htmlContent, placeholder]);

  return (
    <div className="w-full rounded-md border overflow-hidden bg-white shadow-inner">
      <iframe
        ref={iframeRef}
        title="Live Preview"
        className="w-full border-0"
        sandbox="allow-scripts allow-same-origin" // Added allow-same-origin
        scrolling="no" 
      />
    </div>
  );
}

