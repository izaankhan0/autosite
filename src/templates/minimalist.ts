
// src/templates/minimalist.ts
import type { FormSchemaType, AcademicEntryType, ProjectType } from "@/schemas/websiteFormSchema";

// --- Escaping Helper Functions ---
const escJsStr = (str: string | undefined | null): string => {
  if (str === null || typeof str === 'undefined') return '';
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\\`").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, "\\n");
};
const escHtml = (str: string | undefined | null): string => {
  if (str === null || typeof str === 'undefined') return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/`/g, "&#96;");
};
const escAttr = (str: string | undefined | null): string => {
  if (str === null || typeof str === 'undefined') return '';
  return str.replace(/"/g, "&quot;").replace(/`/g, "&#96;");
};
const escCssVal = (str: string | undefined | null): string => {
  if (str === null || typeof str === 'undefined') return '';
  return str.replace(/`/g, "'").replace(/"/g, "'").replace(/\\/g, '\\\\');
};
// --- End Escaping Helper Functions ---

// Helper function to get contrast color
function getContrastColor(hexcolor: string | undefined): string {
  if (!hexcolor || !hexcolor.startsWith('#')) return '#FFFFFF';
  let processedHex = hexcolor.slice(1);
  if (processedHex.length === 3) {
    processedHex = processedHex.split("").map(char => char + char).join("");
  }
  if (processedHex.length !== 6) return '#FFFFFF';
  try {
    const r = parseInt(processedHex.substring(0, 2), 16);
    const g = parseInt(processedHex.substring(2, 4), 16);
    const b = parseInt(processedHex.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000000' : '#FFFFFF';
  } catch (e) {
    console.error("Error parsing hex for contrast in getContrastColor:", e);
    return '#FFFFFF';
  }
}

export function getMinimalistTemplate(data: FormSchemaType): { fullTsx: string; previewHtml: string } {
  const siteNameClean = (data.yourName?.trim().replace(/\W+/g, '') || "PortfolioSite");

  const {
    // Destructure all props from data, providing defaults for colors if needed
    primaryColor = "#111827", // Default for Minimalistic Elegance
    backgroundColor = "#F3F4F6", // Default for Minimalistic Elegance
    accentColor = "#6366F1", // Default for Minimalistic Elegance
    // ... other props from FormSchemaType
  } = data;

  const foregroundColor = getContrastColor(backgroundColor);
  const primaryContrast = getContrastColor(primaryColor);
  const accentContrast = getContrastColor(accentColor);

  // Base CSS styles from the reference files, adapted for preview
  // Note: Colors here will be overridden by dynamic styles later for user preferences
  const baseCssFromReference = `
    /* Adapted from references/css/styles.css and footer.css */
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }
    body { font-family: 'Montserrat', sans-serif; font-optical-sizing: auto; font-style: normal; background-color: #0d000e; color: white; height: auto; overflow-x: hidden; }
    img { max-width: 100%; height: auto; }
    .container-minimalist-preview { max-width: 1200px; margin: 0 auto; }
    .home-preview { display: flex; align-items: center; justify-content: flex-start; height: 100vh; padding-left: 10%; }
    .home-preview h1 { font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: bold; background: linear-gradient(90deg, #9d4edd, #3a0ca3); -webkit-background-clip: text; background-clip: text; color: transparent; transition: opacity 500ms ease-out; position: fixed; }
    .about-preview { display: flex; align-items: flex-start; justify-content: center; padding: 4rem 10%; background-color: #ffffff; color: #0d000e; min-height: 100vh; flex-direction: column; }
    .about-preview h2, .academic-section-preview h2, .projects-section-preview h2, .certs-preview h2, .portfolio-preview h2, .learning-preview h2, .contact-preview h2 { font-size: clamp(2rem, 4vw, 2.8rem); font-weight: bold; margin-bottom: 1.5rem; color: #0d000e; }
    .about-preview p { font-size: 1.1rem; max-width: 700px; line-height: 1.7; }
    .about-preview a, .certs-preview .cert-text-preview a, .contact-preview a { color: #0abde3 !important; text-decoration-line: underline; text-decoration-style: dotted; }
    .certs-preview { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 10%; min-height: 100vh; text-align: center; }
    .certs-preview .cert-text-preview p { padding-top: 1rem; font-size: 1rem; margin-bottom: 1.5rem; }
    .cert-box-preview { width: 100%; max-width: 600px; height: 400px; position: relative; overflow: hidden; border-radius: 15px; border: 2px solid #2b2d42; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
    .cert-images-preview { display: flex; justify-content: center; transition: transform 0.5s ease-in-out; height: 100%; }
    .cert-image-preview { width: 100%; height: 100%; object-fit: contain; display: none; position: absolute; top:0; left:0; transition: opacity 0.7s ease-in-out; }
    .cert-image-preview.active { display: block; opacity: 1; }
    .cert-box-preview .prev-preview, .cert-box-preview .next-preview { position: absolute; top: 50%; transform: translateY(-50%); padding: 0.5rem; background-color: rgba(226, 146, 255, 0.7); color: #0d000e; border: none; cursor: pointer; border-radius: 50%; user-select: none; font-size: 1.5rem; line-height:1; z-index:10; transition: background-color 0.2s; }
    .cert-box-preview .prev-preview:hover, .cert-box-preview .next-preview:hover { background-color: rgb(226, 146, 255); }
    .cert-box-preview .prev-preview { left: 0.5rem; } .cert-box-preview .next-preview { right: 0.5rem; }
    .academic-section-preview, .projects-section-preview { padding: 4rem 10%; background-color: #f8f9fa; color: #0d000e; min-height: 100vh; }
    .academic-card-preview, .project-card-preview { background-color: #ffffff; border: 1px solid #dee2e6; border-radius: 0.5rem; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075); }
    .academic-card-preview h3, .project-card-preview h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    .academic-card-preview img, .project-card-preview img { border-radius: 0.25rem; margin-bottom: 1rem; }
    .project-card-preview .tech-tags-preview span { background-color: #e9ecef; color: #495057; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.8rem; margin-right: 0.5rem; display: inline-block; margin-bottom: 0.5rem;}
    .project-card-preview .project-links-preview a { margin-right: 1rem; font-size: 0.9rem; }
    .learning-preview { display: flex; align-items: center; justify-content: center; padding: 4rem 10%; min-height: 100vh; flex-direction: column; text-align: center; }
    .learning-preview p { font-size: 1.1rem; max-width: 600px; color: white; margin-bottom: 2rem; }
    .learning-images-preview { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
    .learning-images-preview img { width: 100px; height: 100px; object-fit: contain; }
    .contact-preview { display: flex; align-items: flex-start; justify-content: center; padding: 4rem 10%; background-color: white; color: #0d000e; min-height: 100vh; flex-direction: column; }
    .contact-preview p { font-size: 1.1rem; max-width: 700px; margin-bottom: 0.75rem; }
    .contact-preview .socials-preview { font-size: 1rem; }
    .resume-btn-preview { display:inline-block; margin-top: 1rem; padding: 0.75rem 1.5rem; border-radius: 6px; font-size: 1rem; font-weight:500; text-decoration: none; background-color: #e292ff; color: #0d000e; border: 1px solid #e292ff; }
    .scroll-dots-preview { position: fixed; top: 50%; right: 20px; transform: translateY(-50%); display: flex; flex-direction: column; gap: 10px; z-index: 100; }
    .dot-preview { width: 10px; height: 10px; background-color: #8d99ae; opacity: 0.3; border-radius: 50%; cursor:pointer; transition: all 0.3s ease; border: 2px solid transparent; }
    .dot-preview:hover { opacity: 0.7; }
    .dot-preview.active { opacity: 1; background-color: #e292ff; transform: scale(1.3); }
    footer.footer-preview { background: #0d000e; color: white; text-align: center; padding: 15px 0; font-size: 14px; }
    .footer-container-preview { max-width: 1200px; margin: 0 auto; }
    .footer-container-preview p { margin-bottom: 8px; }
    .footer-container-preview .social-links-preview a { color: white; text-decoration: none; margin: 0 10px; }
    .footer-container-preview .social-links-preview a:hover { opacity: 0.8; }
    @media (max-width: 768px) { .home-preview h1 {font-size: 2rem;} .about-preview h2, .certs-preview h2, .portfolio-preview h2, .learning-preview h2, .contact-preview h2 {font-size: 1.8rem;} .about-preview p, .portfolio-preview .portfolio-text-preview p, .learning-preview p, .contact-preview p {font-size:1rem;} .certs-preview .cert-box-preview {height:300px;} }
    @media (max-width: 480px) { .footer-container-preview p { font-size: 3vw; } .footer-container-preview .social-links-preview a { font-size: 3vw; } }
  `;

  // Helper function to render a single academic entry for fullTsx
  const renderAcademicEntryTsx = (item: AcademicEntryType | undefined, key: string) => {
    if (!item || !item.qualification) return null;
    return `
      <div key={"${key}"} className="bg-background/80 dark:bg-background/50 backdrop-blur-sm border border-primary/20 dark:border-primary/10 rounded-lg shadow-lg p-6 mb-6 transition-shadow hover:shadow-primary/20">
        {item.imageUrl && (
          <Image src={"${escJsStr(item.imageUrl)}"} alt={"${escJsStr(item.qualification)}"} width={600} height={300} className="rounded-md mb-4 w-full h-auto object-cover border border-primary/10 dark:border-primary/5" data-ai-hint="education university building"/>
        )}
        <h3 className="text-xl font-semibold mb-1" style={{ color: primaryColor }}>${escJsStr(item.qualification)}</h3>
        {item.institution && <p className="text-lg text-foreground/90 dark:text-foreground/80 mb-1">${escJsStr(item.institution)}</p>}
        {item.graduationYear && <p className="text-sm text-muted-foreground dark:text-muted-foreground/70 mb-1"><em>${escJsStr(item.graduationYear)}</em></p>}
        {item.grades && <p className="text-sm text-muted-foreground dark:text-muted-foreground/70 mb-2">Grades: ${escJsStr(item.grades)}</p>}
        {item.description && <p className="text-foreground/80 dark:text-foreground/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: \`\${"${escJsStr(item.description)}".replace(/\\n/g, '<br />')}\` }} />}
      </div>
    `;
  };

  // Helper function to render a single project card for fullTsx
  const renderProjectCardTsx = (item: ProjectType | undefined, key: string) => {
    if (!item || !item.name) return null;
    const technologiesArray = item.technologies ? item.technologies.split(',').map(t => t.trim()).filter(t => t) : [];
    return `
      <div key={"${key}"} className="bg-background/80 dark:bg-background/50 backdrop-blur-sm border border-primary/20 dark:border-primary/10 rounded-lg shadow-lg p-6 transition-shadow hover:shadow-primary/20">
        {item.imageUrl && (
          <Image src={"${escJsStr(item.imageUrl)}"} alt={"${escJsStr(item.name)}"} width={500} height={280} className="rounded-md mb-4 w-full h-auto object-cover border border-primary/10 dark:border-primary/5" data-ai-hint="project screenshot professional"/>
        )}
        <h3 className="text-xl font-semibold mb-2" style={{ color: primaryColor }}>${escJsStr(item.name)}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          ${technologiesArray.map(tech => `
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: accentColor, color: accentContrast, border: \`1px solid \${accentContrast}33\` }}>${escJsStr(tech)}</span>
          `).join('')}
        </div>
        {item.description && <p className="text-sm text-foreground/80 dark:text-foreground/70 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: \`\${"${escJsStr(item.description)}".replace(/\\n/g, '<br />')}\` }} />}
        <div className="flex gap-3">
          {item.liveUrl && <a href={"${escJsStr(item.liveUrl)}"} target="_blank" rel="noopener noreferrer" className="text-sm px-4 py-1.5 rounded font-medium border-2 hover:opacity-80 transition-opacity" style={{ borderColor: accentColor, color: accentColor }}>Live Site</a>}
          {item.repoUrl && <a href={"${escJsStr(item.repoUrl)}"} target="_blank" rel="noopener noreferrer" className="text-sm px-4 py-1.5 rounded font-medium border-2 hover:opacity-80 transition-opacity" style={{ borderColor: accentColor, color: accentColor }}>View Code</a>}
        </div>
      </div>
    `;
  };

  // Full TSX for the component
  const fullTsx = `
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
// Assuming Lucide icons are available, or you'd import them
// For simplicity, using string icons in JSX for now or omitting some
import type { FormSchemaType, AcademicEntryType, ProjectType } from "@/schemas/websiteFormSchema";

const MinimalisticElegancePortfolioPage: React.FC<{ portfolioData: FormSchemaType }> = ({ portfolioData }) => {
  if (!portfolioData || !portfolioData.yourName) {
    return <div>Error: Portfolio data is not loaded.</div>;
  }

  const {
    yourName,
    heroTitle,
    heroTagline,
    heroCtaText,
    heroImagePlaceholder,
    aboutBio,
    aboutSkills,
    academicEntries = [],
    projects = [],
    contactEmail,
    contactLinkedin,
    contactGithub,
    contactInstagram,
    resumeUrl,
    primaryColor = "${escJsStr(primaryColor)}",
    backgroundColor = "${escJsStr(backgroundColor)}",
    accentColor = "${escJsStr(accentColor)}",
    showAboutSection,
    showAcademicSection,
    showProjectsSection,
    showSkillsSection, // Corresponds to "What am I learning?"
    showContactSection,
    showResumeLink,
  } = portfolioData;

  const [heroOpacity, setHeroOpacity] = useState(1);
  const [activeSection, setActiveSection] = useState('home');
  const [currentCert, setCurrentCert] = useState(0);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  const navLinksTsx = [
    { id: "home", label: "Home", condition: true },
    { id: "about", label: "About Me", condition: showAboutSection },
    { id: "academic", label: "Academics", condition: showAcademicSection && academicEntries.filter(Boolean).length > 0 },
    { id: "projects", label: "Projects", condition: showProjectsSection && projects.filter(Boolean).length > 0 },
    { id: "certs", label: "Certificates", condition: (academicEntries[0]?.imageUrl || academicEntries[1]?.imageUrl) }, // Original certs carousel
    { id: "learning", label: "Skills", condition: showSkillsSection && aboutSkills },
    { id: "contact", label: "Contact", condition: showContactSection },
  ].filter(link => link.condition);
  
  const sectionIdsTsx = navLinksTsx.map(link => link.id);

  const certImagesData = [portfolioData.academicEntries?.[0]?.imageUrl, portfolioData.academicEntries?.[1]?.imageUrl].filter(Boolean) as string[];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHeroOpacity(Math.max(0, 1 - scrollY / 250));

      let currentActive = sectionIdsTsx[0] || 'home';
      for (const id of sectionIdsTsx) {
        const sectionEl = sectionsRef.current[id];
        if (sectionEl) {
          const rect = sectionEl.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentActive = id;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIdsTsx]);

  const scrollToSection = (sectionId: string) => {
    sectionsRef.current[sectionId]?.scrollIntoView({ behavior: 'smooth' });
  };

  const moveCertSlide = (direction: number) => {
    if (certImagesData.length === 0) return;
    setCurrentCert(prev => {
      const newIndex = prev + direction;
      if (newIndex >= certImagesData.length) return 0;
      if (newIndex < 0) return certImagesData.length - 1;
      return newIndex;
    });
  };

  const fgColor = getContrastColor(backgroundColor);
  const primaryCont = getContrastColor(primaryColor);
  const accentCont = getContrastColor(accentColor);

  const aboutBgColor = fgColor === '#000000' || fgColor === '#111827' ? '#FFFFFF' : '#0A0A0A';
  const aboutTextColor = getContrastColor(aboutBgColor);
  
  const renderAcademicEntryComponent = (item: AcademicEntryType | undefined, key: string) => {
    if (!item || !item.qualification) return null;
    return (
      <div key={key} className="bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/50 rounded-lg shadow-md p-6 mb-6 transition-shadow hover:shadow-lg">
        {item.imageUrl && (
          <Image src={item.imageUrl} alt={item.qualification} width={600} height={300} className="rounded-md mb-4 w-full h-auto object-cover border border-gray-200 dark:border-gray-700" data-ai-hint="education university building"/>
        )}
        <h3 className="text-xl font-semibold mb-1" style={{ color: primaryColor }}>{item.qualification}</h3>
        {item.institution && <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">{item.institution}</p>}
        {item.graduationYear && <p className="text-sm text-gray-500 dark:text-gray-400 mb-1"><em>{item.graduationYear}</em></p>}
        {item.grades && <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Grades: {item.grades}</p>}
        {item.description && <p className="text-gray-600 dark:text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description.replace(/\\n/g, '<br />') }} />}
      </div>
    );
  };

  const renderProjectCardComponent = (item: ProjectType | undefined, key: string) => {
    if (!item || !item.name) return null;
    const technologiesArray = item.technologies ? item.technologies.split(',').map(t => t.trim()).filter(t => t) : [];
    return (
      <div key={key} className="bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/50 rounded-lg shadow-md p-6 transition-shadow hover:shadow-lg">
        {item.imageUrl && (
          <Image src={item.imageUrl} alt={item.name} width={500} height={280} className="rounded-md mb-4 w-full h-auto object-cover border border-gray-200 dark:border-gray-700" data-ai-hint="project screenshot professional"/>
        )}
        <h3 className="text-xl font-semibold mb-2" style={{ color: primaryColor }}>{item.name}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {technologiesArray.map((tech, idx) => (
            <span key={idx} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: accentColor, color: accentCont, border: \`1px solid \${accentCont}33\` }}>{tech}</span>
          ))}
        </div>
        {item.description && <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description.replace(/\\n/g, '<br />') }} />}
        <div className="flex gap-3">
          {item.liveUrl && <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm px-4 py-1.5 rounded font-medium border-2 hover:opacity-80 transition-opacity" style={{ borderColor: accentColor, color: accentColor }}>Live Site</a>}
          {item.repoUrl && <a href={item.repoUrl} target="_blank" rel="noopener noreferrer" className="text-sm px-4 py-1.5 rounded font-medium border-2 hover:opacity-80 transition-opacity" style={{ borderColor: accentColor, color: accentColor }}>View Code</a>}
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>{yourName} - Minimalist Portfolio</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </Head>
      <div style={{ backgroundColor, color: fgColor, fontFamily: "'Montserrat', sans-serif", minHeight: '100vh' }}>
        <div className="container-minimalist-preview mx-auto">
          <section ref={el => sectionsRef.current['home'] = el} id="home" className="home-preview flex items-center justify-start h-screen pl-[10%]">
            <h1 style={{ opacity: heroOpacity, transition: 'opacity 500ms ease-out', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', background: \`linear-gradient(90deg, \${primaryColor}, \${accentColor})\`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', fontWeight: 'bold', position: 'fixed' }}>
              Hi, this is {yourName}.
            </h1>
          </section>

          {showAboutSection && (
            <section ref={el => sectionsRef.current['about'] = el} id="about" className="about-preview flex flex-col items-start justify-center py-16 px-[10%] min-h-screen" style={{ backgroundColor: aboutBgColor, color: aboutTextColor }}>
              <h2 style={{ color: primaryColor }}>About Me</h2>
              {aboutBio && <p className="text-lg max-w-3xl leading-relaxed" dangerouslySetInnerHTML={{ __html: aboutBio.replace(/\\n/g, '<br />') }} />}
            </section>
          )}
          
          {showAcademicSection && academicEntries.filter(Boolean).length > 0 && (
            <section ref={el => sectionsRef.current['academic'] = el} id="academic" className="academic-section-preview py-16 px-[10%] min-h-screen" style={{ backgroundColor: backgroundColor === aboutBgColor ? \`color-mix(in srgb, \${backgroundColor} 95%, black 5%)\` : backgroundColor , color: fgColor }}>
              <h2 className="text-center mb-12" style={{ color: primaryColor }}>Academic Achievements</h2>
              <div className="max-w-3xl mx-auto">
                {academicEntries.filter(Boolean).map((entry, index) => renderAcademicEntryComponent(entry, \`academic-\${index}\`))}
              </div>
            </section>
          )}

          {showProjectsSection && projects.filter(Boolean).length > 0 && (
            <section ref={el => sectionsRef.current['projects'] = el} id="projects" className="projects-section-preview py-16 px-[10%] min-h-screen" style={{ backgroundColor: aboutBgColor, color: aboutTextColor }}>
              <h2 className="mb-12" style={{ color: primaryColor }}>My Projects</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {projects.filter(Boolean).map((project, index) => renderProjectCardComponent(project, \`project-\${index}\`))}
              </div>
            </section>
          )}

          {certImagesData.length > 0 && (
            <section ref={el => sectionsRef.current['certs'] = el} id="certs" className="certs-preview flex flex-col items-center justify-center py-16 px-[10%] min-h-screen text-center">
              <div className="cert-text-preview">
                <h2 style={{ color: primaryColor }}>Certifications</h2>
                {contactLinkedin && <p>More on my <a href={contactLinkedin} target="_blank" rel="noopener noreferrer" style={{color: accentColor}}>LinkedIn</a></p>}
              </div>
              <div className="cert-box-preview relative w-full max-w-2xl h-[400px] overflow-hidden rounded-2xl border-2 shadow-lg" style={{ borderColor: primaryColor }}>
                <div className="cert-images-preview flex h-full transition-transform duration-500 ease-in-out" style={{ transform: \`translateX(-\${currentCert * 100}%)\` }}>
                  {certImagesData.map((src, index) => (
                    <div key={index} className="cert-image-slide-preview w-full h-full flex-shrink-0 p-2">
                      <Image src={src} alt={\`Certificate \${index + 1}\`} layout="fill" objectFit="contain" className="rounded-lg" data-ai-hint="certificate document professional"/>
                    </div>
                  ))}
                </div>
                {certImagesData.length > 1 && (
                  <>
                    <button onClick={() => moveCertSlide(-1)} className="prev-preview absolute top-1/2 left-2 -translate-y-1/2 p-2 rounded-full text-2xl z-10" style={{ backgroundColor: \`\${accentColor}B3\`, color: accentCont }} aria-label="Previous certificate">&#10094;</button>
                    <button onClick={() => moveCertSlide(1)} className="next-preview absolute top-1/2 right-2 -translate-y-1/2 p-2 rounded-full text-2xl z-10" style={{ backgroundColor: \`\${accentColor}B3\`, color: accentCont }} aria-label="Next certificate">&#10095;</button>
                  </>
                )}
              </div>
            </section>
          )}
          
          {showSkillsSection && aboutSkills && (
             <section ref={el => sectionsRef.current['learning'] = el} id="learning" className="learning-preview flex flex-col items-center justify-center py-16 px-[10%] min-h-screen text-center">
              <h2 style={{ color: primaryColor }}>What am I learning?</h2>
              <p className="max-w-2xl mb-8" style={{color: fgColor}}>{aboutSkills}</p>
              {/* Placeholder for skill images from reference, as they are not in form */}
              <div className="learning-images-preview flex flex-wrap justify-center gap-4">
                <img src="https://placehold.co/100x100/E9ECEF/495057?text=Skill1" alt="Skill 1" data-ai-hint="technology logo" />
                <img src="https://placehold.co/100x100/E9ECEF/495057?text=Skill2" alt="Skill 2" data-ai-hint="technology logo" />
                <img src="https://placehold.co/100x100/E9ECEF/495057?text=Skill3" alt="Skill 3" data-ai-hint="technology logo" />
              </div>
            </section>
          )}

          {showContactSection && (
            <section ref={el => sectionsRef.current['contact'] = el} id="contact" className="contact-preview flex flex-col items-start justify-center py-16 px-[10%] min-h-screen" style={{ backgroundColor: aboutBgColor, color: aboutTextColor }}>
              <h2 style={{ color: primaryColor }}>Get in touch</h2>
              <p className="max-w-3xl mb-2">I'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.</p>
              {contactEmail && <p className="socials-preview">Email: <a href={\`mailto:\${contactEmail}\`} style={{color: accentColor}}>{contactEmail}</a></p>}
              {contactLinkedin && <p className="socials-preview">LinkedIn: <a href={contactLinkedin} target="_blank" rel="noopener noreferrer" style={{color: accentColor}}>Profile</a></p>}
              {contactGithub && <p className="socials-preview">GitHub: <a href={contactGithub} target="_blank" rel="noopener noreferrer" style={{color: accentColor}}>Profile</a></p>}
              {contactInstagram && <p className="socials-preview">Instagram: <a href={contactInstagram} target="_blank" rel="noopener noreferrer" style={{color: accentColor}}>Profile</a></p>}
              {showResumeLink && resumeUrl && (
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="resume-btn-preview mt-4 inline-block px-6 py-3 rounded-md text-base font-medium" style={{ backgroundColor: accentColor, color: accentCont, border: \`1px solid \${accentColor}\`}}>
                  Download Resume
                </a>
              )}
            </section>
          )}
        </div>

        <div className="scroll-dots-preview fixed top-1/2 right-5 transform -translate-y-1/2 flex flex-col gap-2.5 z-50">
          {navLinksTsx.map(link => (
            <button
              key={link.id}
              title={\`Scroll to \${link.label}\`}
              onClick={() => scrollToSection(link.id)}
              className={\`dot-preview w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 border-2 border-transparent \${activeSection === link.id ? 'active opacity-100 scale-125' : 'opacity-30 hover:opacity-70'}\`}
              style={{ backgroundColor: activeSection === link.id ? accentColor : primaryColor }}
              aria-label={\`Scroll to \${link.label}\`}
            />
          ))}
        </div>

        {showContactSection && (
          <footer className="footer-preview py-4 text-sm" style={{ background: primaryColor, color: primaryCont }}>
            <div className="footer-container-preview mx-auto max-w-5xl text-center">
              <p>&copy; {new Date().getFullYear()} {yourName} | All Rights Reserved</p>
              <div className="social-links-preview mt-2">
                {contactGithub && <a href={contactGithub} target="_blank" rel="noopener noreferrer" style={{color: accentColor}} className="mx-2 hover:opacity-80">GitHub</a>}
                {contactLinkedin && <a href={contactLinkedin} target="_blank" rel="noopener noreferrer" style={{color: accentColor}} className="mx-2 hover:opacity-80">LinkedIn</a>}
                {contactEmail && <a href={\`mailto:\${contactEmail}\`} style={{color: accentColor}} className="mx-2 hover:opacity-80">Email</a>}
              </div>
            </div>
          </footer>
        )}
      </div>
    </>
  );
};

export default function GeneratedPage() {
  const rawDataString = '${escJsStr(JSON.stringify(data))}';
  const defaultErrorPropsMinimalist: FormSchemaType = ${JSON.stringify(
    // Using data for defaults if available, otherwise hardcoded
    {
      yourName: data.yourName || "Name (Error)",
      heroTitle: data.heroTitle || "Title (Error)",
      heroTagline: data.heroTagline || "Tagline error.",
      heroCtaText: data.heroCtaText || "View Work",
      heroImagePlaceholder: data.heroImagePlaceholder || "https://placehold.co/120x120.png?text=Error",
      aboutBio: data.aboutBio || "Bio error.",
      aboutSkills: data.aboutSkills || "Skills error.",
      academicEntries: data.academicEntries && data.academicEntries.length > 0 ? data.academicEntries : [{ qualification: "Degree (Error)", institution: "University (Error)", graduationYear: "Year", grades: "N/A", description: "Details missing.", imageUrl: "https://placehold.co/300x200.png?text=EduErr" }],
      projects: data.projects && data.projects.length > 0 ? data.projects : [{ name: "Project (Error)", description: "Details missing.", technologies: "Tech unavailable", liveUrl: "", repoUrl: "", imageUrl: "https://placehold.co/400x300.png?text=ProjErr" }],
      contactEmail: data.contactEmail || "error@example.com",
      contactLinkedin: data.contactLinkedin || "",
      contactGithub: data.contactGithub || "",
      contactInstagram: data.contactInstagram || "",
      resumeUrl: data.resumeUrl || "",
      theme: data.theme || "minimalist",
      primaryColor: data.primaryColor || "#111827",
      backgroundColor: data.backgroundColor || "#F3F4F6",
      accentColor: data.accentColor || "#6366F1",
      showAboutSection: typeof data.showAboutSection === 'boolean' ? data.showAboutSection : true,
      showAcademicSection: typeof data.showAcademicSection === 'boolean' ? data.showAcademicSection : true,
      showProjectsSection: typeof data.showProjectsSection === 'boolean' ? data.showProjectsSection : true,
      showSkillsSection: typeof data.showSkillsSection === 'boolean' ? data.showSkillsSection : true,
      showContactSection: typeof data.showContactSection === 'boolean' ? data.showContactSection : true,
      showResumeLink: typeof data.showResumeLink === 'boolean' ? data.showResumeLink : true,
    }
  )};
  let parsedProps: FormSchemaType;
  try {
    parsedProps = JSON.parse(rawDataString);
  } catch (e) {
    parsedProps = defaultErrorPropsMinimalist;
  }
  const propsToPass = parsedProps || defaultErrorPropsMinimalist;
  return <MinimalisticElegancePortfolioPage portfolioData={propsToPass} />;
}
`;

  // Helper function to render a single academic entry for previewHtml
  const renderAcademicEntryHtml = (item: AcademicEntryType | undefined, key: string): string => {
    if (!item || !item.qualification) return '';
    let html = '';
    html += '<div class="academic-card-preview" style="background-color:' + escCssVal(backgroundColor === (foregroundColor === '#000000' || foregroundColor === '#111827' ? '#FFFFFF' : '#0A0A0A') ? `color-mix(in srgb, ${backgroundColor} 95%, white 5%)` : backgroundColor) + '; border: 1px solid ' + escCssVal(primaryColor) + '44; color: ' + escCssVal(foregroundColor === (foregroundColor === '#000000' || foregroundColor === '#111827' ? '#FFFFFF' : '#0A0A0A') ? `color-mix(in srgb, ${foregroundColor} 95%, black 5%)` : foregroundColor) + ';">';
    if (item.imageUrl) {
      html += '<img src="' + escAttr(item.imageUrl) + '" alt="' + escAttr(item.qualification) + '" data-ai-hint="education university building" style="border-radius: 0.25rem; margin-bottom: 1rem; width:100%; max-width:400px; height:auto; object-fit:cover; margin-left:auto; margin-right:auto; display:block;"/>';
    }
    html += '<h3 style="font-size:1.4em; color:' + escCssVal(primaryColor) + '; margin-bottom:0.3rem; text-align:center;">' + escHtml(item.qualification) + '</h3>';
    if (item.institution) html += '<p style="font-size:1.1em; color:' + escCssVal(foregroundColor) + 'CC; margin-bottom:0.2rem; text-align:center;">' + escHtml(item.institution) + '</p>';
    if (item.graduationYear) html += '<p style="font-size:0.9em; color:' + escCssVal(foregroundColor) + 'AA; margin-bottom:0.2rem; text-align:center;"><em>' + escHtml(item.graduationYear) + '</em></p>';
    if (item.grades) html += '<p style="font-size:0.9em; color:' + escCssVal(foregroundColor) + 'AA; margin-bottom:0.4rem; text-align:center;">Grades: ' + escHtml(item.grades) + '</p>';
    if (item.description) html += '<p style="font-size:0.95em; color:' + escCssVal(foregroundColor) + 'D9; line-height:1.6; text-align:justify;">' + (escHtml(item.description)).replace(/\n/g, "<br/>") + '</p>';
    html += '</div>';
    return html;
  };

  // Helper function to render a single project card for previewHtml
  const renderProjectCardHtml = (item: ProjectType | undefined, key: string): string => {
    if (!item || !item.name) return '';
    let html = '';
    const technologiesArray = item.technologies ? item.technologies.split(',').map(t => t.trim()).filter(t => t) : [];
    html += '<div class="project-card-preview" style="background-color:' + escCssVal(backgroundColor === (foregroundColor === '#000000' || foregroundColor === '#111827' ? '#FFFFFF' : '#0A0A0A') ? `color-mix(in srgb, ${backgroundColor} 95%, white 5%)` : backgroundColor) + '; border: 1px solid ' + escCssVal(primaryColor) + '44; color: ' + escCssVal(foregroundColor === (foregroundColor === '#000000' || foregroundColor === '#111827' ? '#FFFFFF' : '#0A0A0A') ? `color-mix(in srgb, ${foregroundColor} 95%, black 5%)` : foregroundColor) + ';">';
    if (item.imageUrl) {
      html += '<img src="' + escAttr(item.imageUrl) + '" alt="' + escAttr(item.name) + '" data-ai-hint="project screenshot professional" style="border-radius: 0.25rem; margin-bottom: 1rem; width:100%; height:200px; object-fit:cover;"/>';
    }
    html += '<h3 style="font-size:1.4em; color:' + escCssVal(primaryColor) + '; margin-bottom:0.5rem;">' + escHtml(item.name) + '</h3>';
    if (technologiesArray.length > 0) {
        html += '<div class="tech-tags-preview" style="margin-bottom: 0.75rem;">';
        technologiesArray.forEach(tech => {
            html += '<span style="background-color:' + escCssVal(accentColor) + '; color:' + escCssVal(accentContrast) + '; padding:0.25rem 0.5rem; border-radius:0.25rem; font-size:0.8rem; margin-right:0.5rem; display:inline-block; margin-bottom:0.5rem;">' + escHtml(tech) + '</span>';
        });
        html += '</div>';
    }
    if (item.description) html += '<p style="font-size:0.95em; color:' + escCssVal(foregroundColor) + 'D9; margin-bottom:1rem; line-height:1.6;">' + (escHtml(item.description)).replace(/\n/g, "<br/>") + '</p>';
    html += '<div class="project-links-preview">';
    if (item.liveUrl) html += '<a href="' + escAttr(item.liveUrl) + '" target="_blank" style="color:' + escCssVal(accentColor) + '; border:1px solid ' + escCssVal(accentColor) + '; padding:0.3rem 0.6rem; border-radius:4px; text-decoration:none; margin-right:0.5rem;">Live Site</a>';
    if (item.repoUrl) html += '<a href="' + escAttr(item.repoUrl) + '" target="_blank" style="color:' + escCssVal(accentColor) + '; border:1px solid ' + escCssVal(accentColor) + '; padding:0.3rem 0.6rem; border-radius:4px; text-decoration:none;">View Code</a>';
    html += '</div></div>';
    return html;
  };

  // Construct inline styles for previewHtml, applying user colors
  let inlineStyles = '';
  inlineStyles += baseCssFromReference; // Base styles from reference
  // Dynamic overrides based on user colors
  inlineStyles += 'body { background-color: ' + escCssVal(data.backgroundColor) + ' !important; color: ' + escCssVal(foregroundColor) + ' !important; } ';
  inlineStyles += '.home-preview h1 { background: linear-gradient(90deg, ' + escCssVal(data.primaryColor) + ', ' + escCssVal(data.accentColor) + ') !important; -webkit-background-clip: text !important; background-clip: text !important; color: transparent !important; } ';
  const previewAboutBg = foregroundColor === '#000000' || foregroundColor === '#111827' ? '#FFFFFF' : '#0A0A0A';
  const previewAboutText = getContrastColor(previewAboutBg);
  inlineStyles += '.about-preview, .projects-section-preview, .contact-preview { background-color: ' + escCssVal(previewAboutBg) + ' !important; color: ' + escCssVal(previewAboutText) + ' !important; } ';
  inlineStyles += '.about-preview h2, .academic-section-preview h2, .projects-section-preview h2, .certs-preview h2, .learning-preview h2, .contact-preview h2 { color: ' + escCssVal(data.primaryColor) + ' !important; } ';
  inlineStyles += '.about-preview a, .certs-preview .cert-text-preview a, .contact-preview a, .project-card-preview .project-links-preview a { color: ' + escCssVal(data.accentColor) + ' !important; } ';
  inlineStyles += '.certs-preview .cert-box-preview { border-color: ' + escCssVal(data.primaryColor) + ' !important; } ';
  inlineStyles += '.certs-preview .prev-preview, .certs-preview .next-preview { background-color: ' + escCssVal(data.accentColor) + 'B3 !important; color: ' + escCssVal(accentContrast) + ' !important; } ';
  inlineStyles += '.certs-preview .prev-preview:hover, .certs-preview .next-preview:hover { background-color: ' + escCssVal(data.accentColor) + ' !important; } ';
  inlineStyles += '.academic-section-preview { background-color: ' + escCssVal(data.backgroundColor === previewAboutBg ? `color-mix(in srgb, ${data.backgroundColor} 95%, black 5%)` : data.backgroundColor) + ' !important; color: ' + escCssVal(foregroundColor) + ' !important; } ';
  inlineStyles += '.academic-card-preview { background-color:' + escCssVal(data.backgroundColor === previewAboutBg ? `color-mix(in srgb, ${data.backgroundColor} 95%, white 5%)` : data.backgroundColor) + ' !important; border-color: ' + escCssVal(data.primaryColor) + '44 !important; color: ' + escCssVal(foregroundColor === previewAboutBg ? `color-mix(in srgb, ${foregroundColor} 95%, black 5%)` : foregroundColor) + ' !important;}';
  inlineStyles += '.academic-card-preview h3 { color:' + escCssVal(data.primaryColor) + ' !important; }';
  inlineStyles += '.project-card-preview { background-color:' + escCssVal(data.backgroundColor === previewAboutBg ? `color-mix(in srgb, ${data.backgroundColor} 95%, white 5%)` : data.backgroundColor) + ' !important; border-color: ' + escCssVal(data.primaryColor) + '44 !important; color: ' + escCssVal(foregroundColor === previewAboutBg ? `color-mix(in srgb, ${foregroundColor} 95%, black 5%)` : foregroundColor) + ' !important;}';
  inlineStyles += '.project-card-preview h3 { color:' + escCssVal(data.primaryColor) + ' !important; }';
  inlineStyles += '.project-card-preview .tech-tags-preview span { background-color:' + escCssVal(data.accentColor) + ' !important; color:' + escCssVal(accentContrast) + ' !important; }';
  inlineStyles += '.resume-btn-preview { background-color: ' + escCssVal(data.accentColor) + ' !important; color: ' + escCssVal(accentContrast) + ' !important; border-color: ' + escCssVal(data.accentColor) + ' !important; }';
  inlineStyles += '.scroll-dots-preview .dot-preview { background-color: ' + escCssVal(data.primaryColor) + ' !important; } ';
  inlineStyles += '.scroll-dots-preview .dot-preview.active { background-color: ' + escCssVal(data.accentColor) + ' !important; } ';
  inlineStyles += 'footer.footer-preview { background: ' + escCssVal(data.primaryColor) + ' !important; color: ' + escCssVal(primaryContrast) + ' !important; } ';
  inlineStyles += '.footer-container-preview .social-links-preview a { color: ' + escCssVal(data.accentColor) + ' !important; } ';
  inlineStyles += '.footer-container-preview .social-links-preview a:hover { color: ' + escCssVal(primaryContrast) + ' !important; opacity: 0.8; } ';

  // Construct previewHtml
  let previewHtmlString = '';
  previewHtmlString += '<html><head>';
  previewHtmlString += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
  previewHtmlString += '<title>' + escHtml(data.yourName) + ' - Minimalist Portfolio (Preview)</title>';
  previewHtmlString += '<style>' + escCssVal(inlineStyles) + '</style>';
  previewHtmlString += '</head><body class="template-minimalist-body">';
  previewHtmlString += '<div class="container-minimalist-preview">';

  previewHtmlString += '<section id="home_preview_id" class="home-preview">';
  previewHtmlString += '<h1 id="hero_text_preview_id">Hi, this is ' + escHtml(data.yourName) + '.</h1>';
  previewHtmlString += '</section>';

  if (data.showAboutSection) {
    previewHtmlString += '<section id="about_preview_id" class="about-preview">';
    previewHtmlString += '<h2>About Me</h2>';
    if (data.aboutBio) previewHtmlString += '<p>' + (escHtml(data.aboutBio)).replace(/\n/g, "<br/>") + '</p>';
    previewHtmlString += '</section>';
  }
  
  if (data.showAcademicSection && data.academicEntries && data.academicEntries.filter(Boolean).length > 0) {
    previewHtmlString += '<section id="academic_preview_id" class="academic-section-preview">';
    previewHtmlString += '<h2 class="text-center">Academic Achievements</h2>';
    previewHtmlString += '<div class="max-w-3xl mx-auto">';
    (data.academicEntries || []).filter(Boolean).forEach((entry, index) => {
      previewHtmlString += renderAcademicEntryHtml(entry, 'academic-preview-' + index);
    });
    previewHtmlString += '</div></section>';
  }

  if (data.showProjectsSection && data.projects && data.projects.filter(Boolean).length > 0) {
    previewHtmlString += '<section id="projects_preview_id" class="projects-section-preview">';
    previewHtmlString += '<h2>My Projects</h2>';
    previewHtmlString += '<div class="grid md:grid-cols-2 gap-8">'; // Simplified grid for preview
    (data.projects || []).filter(Boolean).forEach((project, index) => {
      previewHtmlString += renderProjectCardHtml(project, 'project-preview-' + index);
    });
    previewHtmlString += '</div></section>';
  }

  const certImagesPreview = [data.academicEntries?.[0]?.imageUrl, data.academicEntries?.[1]?.imageUrl].filter(Boolean) as string[];
  if (certImagesPreview.length > 0) {
    previewHtmlString += '<section id="certs_preview_id" class="certs-preview">';
    previewHtmlString += '<div class="cert-text-preview"><h2>Certifications</h2>';
    if (data.contactLinkedin) previewHtmlString += '<p>More on my <a href="' + escAttr(data.contactLinkedin) + '" target="_blank">LinkedIn</a></p>';
    previewHtmlString += '</div>';
    previewHtmlString += '<div class="cert-box-preview" id="cert_box_preview_minimalist">';
    previewHtmlString += '<div class="cert-images-preview">';
    certImagesPreview.forEach((src, index) => {
        previewHtmlString += '<img src="' + escAttr(src) + '" alt="Certificate ' + (index + 1) + '" class="cert-image-preview' + (index === 0 ? ' active' : '') + '" data-ai-hint="certificate document professional"/>';
    });
    previewHtmlString += '</div>';
    if (certImagesPreview.length > 1) {
        previewHtmlString += '<button class="prev-preview" onclick="moveCertSlidePreviewMinimalist(-1)">&#10094;</button>';
        previewHtmlString += '<button class="next-preview" onclick="moveCertSlidePreviewMinimalist(1)">&#10095;</button>';
    }
    previewHtmlString += '</div></section>';
  }
  
  if (data.showSkillsSection && data.aboutSkills) {
    previewHtmlString += '<section id="learning_preview_id" class="learning-preview">';
    previewHtmlString += '<h2>What am I learning?</h2>';
    previewHtmlString += '<p>' + escHtml(data.aboutSkills) + '</p>';
    previewHtmlString += '<div class="learning-images-preview">';
    previewHtmlString += '<img src="https://placehold.co/100x100/E9ECEF/495057?text=Skill1" alt="Skill 1" data-ai-hint="technology logo" />';
    previewHtmlString += '<img src="https://placehold.co/100x100/E9ECEF/495057?text=Skill2" alt="Skill 2" data-ai-hint="technology logo" />';
    previewHtmlString += '<img src="https://placehold.co/100x100/E9ECEF/495057?text=Skill3" alt="Skill 3" data-ai-hint="technology logo" />';
    previewHtmlString += '</div></section>';
  }

  if (data.showContactSection) {
    previewHtmlString += '<section id="contact_preview_id" class="contact-preview">';
    previewHtmlString += '<h2>Get in touch</h2>';
    previewHtmlString += '<p>I\'d love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.</p>';
    if (data.contactEmail) previewHtmlString += '<p class="socials-preview">Email: <a href="mailto:' + escAttr(data.contactEmail) + '">' + escHtml(data.contactEmail) + '</a></p>';
    if (data.contactLinkedin) previewHtmlString += '<p class="socials-preview">LinkedIn: <a href="' + escAttr(data.contactLinkedin) + '" target="_blank">Profile</a></p>';
    if (data.contactGithub) previewHtmlString += '<p class="socials-preview">GitHub: <a href="' + escAttr(data.contactGithub) + '" target="_blank">Profile</a></p>';
    if (data.contactInstagram) previewHtmlString += '<p class="socials-preview">Instagram: <a href="' + escAttr(data.contactInstagram) + '" target="_blank">Profile</a></p>';
    if (data.showResumeLink && data.resumeUrl) {
      previewHtmlString += '<a href="' + escAttr(data.resumeUrl) + '" target="_blank" class="resume-btn-preview">Download Resume</a>';
    }
    previewHtmlString += '</section>';
  }

  previewHtmlString += '</div>'; // Closing container-minimalist-preview

  const navLinksPreviewHtml = [
    { id: "home_preview_id", label: "Home", condition: true },
    { id: "about_preview_id", label: "About Me", condition: data.showAboutSection },
    { id: "academic_preview_id", label: "Academics", condition: data.showAcademicSection && data.academicEntries && data.academicEntries.filter(Boolean).length > 0 },
    { id: "projects_preview_id", label: "Projects", condition: data.showProjectsSection && data.projects && data.projects.filter(Boolean).length > 0 },
    { id: "certs_preview_id", label: "Certificates", condition: certImagesPreview.length > 0 },
    { id: "learning_preview_id", label: "Skills", condition: data.showSkillsSection && data.aboutSkills },
    { id: "contact_preview_id", label: "Contact", condition: data.showContactSection },
  ].filter(link => link.condition);

  previewHtmlString += '<div class="scroll-dots-preview" id="scroll_dots_preview_container_minimalist">';
  navLinksPreviewHtml.forEach(link => {
    previewHtmlString += '<div class="dot-preview" data-section="' + link.id + '" title="Scroll to ' + escAttr(link.label) + '"></div>';
  });
  previewHtmlString += '</div>';

  if (data.showContactSection) {
    previewHtmlString += '<footer class="footer-preview"><div class="footer-container-preview">';
    previewHtmlString += '<p>&copy; ' + new Date().getFullYear() + ' ' + escHtml(data.yourName) + ' | All Rights Reserved</p>';
    previewHtmlString += '<div class="social-links-preview">';
    if (data.contactGithub) previewHtmlString += '<a href="' + escAttr(data.contactGithub) + '" target="_blank">GitHub</a>';
    if (data.contactLinkedin) previewHtmlString += '<a href="' + escAttr(data.contactLinkedin) + '" target="_blank">LinkedIn</a>';
    if (data.contactEmail) previewHtmlString += '<a href="mailto:' + escAttr(data.contactEmail) + '">Email</a>';
    previewHtmlString += '</div></div></footer>';
  }
  
  let scriptContent = '';
  scriptContent += '// Preview specific script for Minimalist Template\n';
  scriptContent += '(function() {\n';
  scriptContent += "  const portfolioDataPreview = JSON.parse('" + escJsStr(JSON.stringify(data)) + "');\n";
  scriptContent += '  const heroText = document.getElementById("hero_text_preview_id");\n';
  scriptContent += '  window.addEventListener("scroll", () => {\n';
  scriptContent += '    if (heroText) heroText.style.opacity = String(Math.max(0, 1 - window.scrollY / 250));\n';
  scriptContent += '    updateActiveDotPreviewMinimalist();\n';
  scriptContent += '  }, { passive: true });\n';
  scriptContent += '\n';
  scriptContent += '  const sectionIdsForPreview = ' + JSON.stringify(navLinksPreviewHtml.map(link => link.id)) + ';\n';
  scriptContent += '  const dotsPreview = Array.from(document.querySelectorAll("#scroll_dots_preview_container_minimalist .dot-preview"));\n';
  scriptContent += '\n';
  scriptContent += '  function updateActiveDotPreviewMinimalist() {\n';
  scriptContent += '    let currentActiveId = sectionIdsForPreview.length > 0 ? sectionIdsForPreview[0] : "home_preview_id";\n';
  scriptContent += '    for (const id of sectionIdsForPreview) {\n';
  scriptContent += '      const sectionEl = document.getElementById(id);\n';
  scriptContent += '      if (sectionEl) {\n';
  scriptContent += '        const rect = sectionEl.getBoundingClientRect();\n';
  scriptContent += '        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) { currentActiveId = id; break; }\n';
  scriptContent += '      }\n';
  scriptContent += '    }\n';
  scriptContent += '    if(window.scrollY === 0 && sectionIdsForPreview.includes("home_preview_id")) currentActiveId = "home_preview_id";\n';
  scriptContent += '    dotsPreview.forEach(dot => {\n';
  scriptContent += '      dot.classList.remove("active");\n';
  scriptContent += '      if (dot.getAttribute("data-section") === currentActiveId) dot.classList.add("active");\n';
  scriptContent += '    });\n';
  scriptContent += '  }\n';
  scriptContent += '\n';
  scriptContent += '  dotsPreview.forEach(dot => {\n';
  scriptContent += '    dot.addEventListener("click", () => {\n';
  scriptContent += '      const sectionId = dot.getAttribute("data-section");\n';
  scriptContent += '      const targetSection = document.getElementById(sectionId);\n';
  scriptContent += '      if (targetSection) targetSection.scrollIntoView({ behavior: "smooth" });\n';
  scriptContent += '    });\n';
  scriptContent += '  });\n';
  scriptContent += '\n';
  scriptContent += '  let currentCertPreviewMinimalist = 0;\n';
  scriptContent += '  const certImagesPreviewMinimalist = document.querySelectorAll("#cert_box_preview_minimalist .cert-image-preview");\n';
  scriptContent += '  function showCertPreviewMinimalist(index) {\n';
  scriptContent += '    if(certImagesPreviewMinimalist.length === 0) return;\n';
  scriptContent += '    certImagesPreviewMinimalist.forEach((img, i) => { img.classList.remove("active"); if (i === index) img.classList.add("active"); });\n';
  scriptContent += '  }\n';
  scriptContent += '  window.moveCertSlidePreviewMinimalist = function(direction) {\n';
  scriptContent += '    if(certImagesPreviewMinimalist.length === 0) return;\n';
  scriptContent += '    currentCertPreviewMinimalist = (currentCertPreviewMinimalist + direction + certImagesPreviewMinimalist.length) % certImagesPreviewMinimalist.length;\n';
  scriptContent += '    showCertPreviewMinimalist(currentCertPreviewMinimalist);\n';
  scriptContent += '  };\n';
  scriptContent += '  if (certImagesPreviewMinimalist.length > 0) showCertPreviewMinimalist(currentCertPreviewMinimalist);\n';
  scriptContent += '\n';
  scriptContent += '  updateActiveDotPreviewMinimalist(); // Initial call\n';
  scriptContent += '})();\n';

  previewHtmlString += "<script>" + scriptContent + "</script>";
  previewHtmlString += "</body></html>";

  return { fullTsx, previewHtml: previewHtmlString };
}

