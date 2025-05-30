// src/templates/student.ts
import type { FormSchemaType, AcademicEntryType } from "@/schemas/websiteFormSchema";
import { getContrastColor } from ".";

// --- Escaping Helper Functions ---
const escJsStr = (str: string | undefined | null): string => {
  if (str === null || typeof str === 'undefined') return '';
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, "\\n");
};
const escHtml = (str: string | undefined | null): string => {
  if (str === null || typeof str === 'undefined') return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/`/g, "&#96;");
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

export function getStudentTemplate(data: FormSchemaType): TemplateOutput {
  const siteNameClean = (data.yourName?.trim().replace(/\W+/g, '') || "PortfolioSite");
  const primaryColor = data.primaryColor;
  const backgroundColor = data.backgroundColor;
  const accentColor = data.accentColor;

  const foregroundColor = getContrastColor(backgroundColor);
  const primaryContrast = getContrastColor(primaryColor);
  const accentContrast = getContrastColor(accentColor);

  const defaultErrorProps: FormSchemaType = {
    yourName: "Student Name (Error)",
    heroTitle: "Aspiring Individual (Error)",
    heroTagline: "Error loading tagline.",
    heroCtaText: "View Work",
    heroImagePlaceholder: "https://placehold.co/600x400.png?text=HeroErr",
    aboutBio: "Error loading biography.",
    aboutSkills: "Error loading skills/affiliations.",
    aboutFunFact: "",
    academic1: { qualification: "O' Levels (Error)", institution: "School Name (Error)", graduationYear: "Year", grades: "N/A", description: "Details missing.", imageUrl: "https://placehold.co/500x300.png?text=Edu1Err" },
    academic2: { qualification: "A' Levels (Error)", institution: "College Name (Error)", graduationYear: "Year", grades: "N/A", description: "Details missing.", imageUrl: "https://placehold.co/500x300.png?text=Edu2Err" },
    project1: { name: "Work Experience 1 (Error)", description: "Details missing.", technologies: "Role/Duration Missing", liveUrl: "", repoUrl: "", imageUrl: "https://placehold.co/400x300.png?text=Work1Err" },
    project2: { name: "Work Experience 2 (Error)", description: "Details missing.", technologies: "Role/Duration Missing", liveUrl: "", repoUrl: "", imageUrl: "https://placehold.co/400x300.png?text=Work2Err" },
    contactEmail: "error@example.com",
    contactLinkedin: "",
    contactGithub: "", // Not in reference, but good to have
    contactInstagram: "",
    resumeUrl: "",
    theme: "student",
    primaryColor: data.primaryColor || "#0ABDE3", // Default from reference if not overridden
    backgroundColor: data.backgroundColor || "#00092C", // Default from reference
    accentColor: data.accentColor || "#DE1D1D",   // Default from reference hero name
    showAboutSection: true,
    showFunFact: true, // Not directly used in this template, aboutBio is used for academic desc
    showAcademicSection: true,
    showAcademic1: true,
    showAcademic2: true,
    showProjectsSection: true, // For Work Experience
    showProject1: true,
    showProject2: true,
    showSkillsSection: true, // For Affiliations scroller
    showContactSection: true,
    showResumeLink: true,
  };

  const fullTsx = `
// Generated Page: ${escJsStr(data.yourName)}'s Student Portfolio (Reference Adapted)
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Linkedin, Instagram as InstagramIcon, Download, ArrowUpCircle, Menu, X as XIcon } from 'lucide-react'; // Using Lucide for consistency
import type { FormSchemaType } from "@/schemas/websiteFormSchema";

const ${siteNameClean}PortfolioPage: React.FC<{ portfolioData: FormSchemaType }> = ({ portfolioData }) => {
  if (!portfolioData || typeof portfolioData.yourName === 'undefined') {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center', color: '#FF0000', backgroundColor: '#00041a' }}>
        <h1>Error: Portfolio Data Not Loaded</h1>
        <p>The necessary data to display this portfolio is missing or malformed.</p>
      </div>
    );
  }

  const {
    yourName,
    heroTitle,
    heroImagePlaceholder,
    aboutBio, // Used for O-Levels description if academic1.description is empty
    aboutSkills, // Used for affiliations, comma separated
    academic1,
    academic2,
    project1, // Mapped to Work Experience 1
    project2, // Mapped to Work Experience 2
    contactEmail,
    contactLinkedin,
    contactInstagram,
    resumeUrl,
    primaryColor, // User-configurable colors
    backgroundColor,
    accentColor,
    showAboutSection, // Controls academic section visibility overall
    showAcademic1,
    showAcademic2,
    showProjectsSection, // Controls Work Experience visibility
    showProject1,
    showProject2,
    showSkillsSection, // Controls Affiliations scroller visibility
    showContactSection,
    showResumeLink,
  } = portfolioData;

  const foregroundColor = getContrastColor(backgroundColor);
  const primaryContrast = getContrastColor(primaryColor);
  const accentContrast = getContrastColor(accentColor);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const affiliations = showSkillsSection && aboutSkills ? aboutSkills.split(',').map(s => s.trim()).filter(s => s) : [];

  // Helper for contrast color for dynamic inline styles
  function getContrastColor(hexcolor: string | undefined): string {
    if (!hexcolor || !hexcolor.startsWith('#')) return '#FFFFFF'; // Default to white for dark bg
    let processedHex = hexcolor.slice(1);
    if (processedHex.length === 3) {
      processedHex = processedHex.split('').map(char => char + char).join('');
    }
    if (processedHex.length !== 6) return '#FFFFFF';

    try {
      const r = parseInt(processedHex.substring(0, 2), 16);
      const g = parseInt(processedHex.substring(2, 4), 16);
      const b = parseInt(processedHex.substring(4, 6), 16);
      const yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? '#000000' : '#FFFFFF';
    } catch (e) {
      console.error("Error parsing hex for contrast in component:", e);
      return '#FFFFFF';
    }
  }
  
  // Inline styles that depend on theme colors
  const dynamicStyles = {
    body: { backgroundColor: backgroundColor, color: foregroundColor, fontFamily: "'Poppins', sans-serif" },
    heroName: { color: accentColor },
    navBtn: { color: accentColor, borderColor: accentColor },
    navBtnHover: { backgroundColor: accentColor, color: accentContrast },
    navLinkHover: { color: accentColor, textDecorationColor: accentColor },
    levelsSpan: { color: accentColor },
    affiliationSectionBg: { backgroundColor: primaryColor ? \`color-mix(in srgb, \${primaryColor} 70%, black)\` : '#300000' },
    workPlaceBg: { backgroundColor: primaryColor ? \`color-mix(in srgb, \${primaryColor} 90%, black)\` : 'rgb(31,3,3)'},
    footerBg: { backgroundColor: primaryColor ? \`color-mix(in srgb, \${primaryColor} 70%, black)\` : '#300000' },
    footerLinkHover: { color: accentColor },
    creditsLinkHover: { color: accentColor }
  };

  return (
    <>
      <Head>
        <title>{yourName} - Student Portfolio</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100..900;1,100..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </Head>

      <div style={dynamicStyles.body} className="min-h-screen">
        <div className="container mx-auto px-0 sm:px-[3%]"> {/* Reference has margin: 0 3% on container */}
          
          {/* Landing Page / Hero */}
          <section id="landing-page" className="relative min-h-screen flex flex-col">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex justify-between items-center h-[90px] fixed top-0 left-0 right-0 z-50 px-[3%] lg:px-[5%]" style={{backgroundColor: backgroundColor}}>
              <ul className="flex items-center space-x-3 lg:space-x-6">
                <li><a href="#landing-page" className="text-base lg:text-lg hover:underline hover:text-opacity-80" style={dynamicStyles.navLinkHover}>Home</a></li>
                {showAboutSection && <li><a href="#about" className="text-base lg:text-lg hover:underline hover:text-opacity-80" style={dynamicStyles.navLinkHover}>About</a></li>}
                {showProjectsSection && <li><a href="#work" className="text-base lg:text-lg hover:underline hover:text-opacity-80" style={dynamicStyles.navLinkHover}>Work</a></li>}
                {showContactSection && <li><a href="#footer" className="text-base lg:text-lg hover:underline hover:text-opacity-80" style={dynamicStyles.navLinkHover}>Contact</a></li>}
              </ul>
              <a href="#landing-page" className="text-xl lg:text-2xl font-semibold">{yourName}</a>
              <div className="flex items-center space-x-4 lg:space-x-6">
                {contactInstagram && <a href={contactInstagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-75"><InstagramIcon size={24} /></a>}
                {showResumeLink && resumeUrl && 
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                    <button 
                      className="h-[55px] w-[140px] text-sm font-medium border-2 rounded transition-colors duration-200 px-2" 
                      style={dynamicStyles.navBtn}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = dynamicStyles.navBtnHover.backgroundColor; e.currentTarget.style.color = dynamicStyles.navBtnHover.color; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = dynamicStyles.navBtn.color; }}
                    >
                      My Resume
                    </button>
                  </a>
                }
              </div>
            </nav>

            {/* Mobile Menu Icon */}
            <div onClick={toggleMenu} className="md:hidden fixed top-4 right-4 z-[1001] cursor-pointer p-2">
              <Menu size={32} />
            </div>

            {/* Mobile Hidden Menu */}
            <div className={\`fixed top-0 left-0 h-full w-[250px] md:w-[300px] z-[1000] transition-transform duration-300 ease-in-out \${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden\`} style={{backgroundColor: primaryColor ? \`color-mix(in srgb, \${primaryColor} 70%, black)\` : '#300000' }}>
              <ul className="flex flex-col items-center justify-center h-full space-y-6 relative p-5">
                <button onClick={toggleMenu} className="absolute top-5 right-5 text-2xl"><XIcon /></button>
                <li><a href="#landing-page" onClick={toggleMenu} className="text-xl">Home</a></li>
                {showAboutSection && <li><a href="#about" onClick={toggleMenu} className="text-xl">About</a></li>}
                {showProjectsSection && <li><a href="#work" onClick={toggleMenu} className="text-xl">Work</a></li>}
                {showContactSection && <li><a href="#footer" onClick={toggleMenu} className="text-xl">Contact</a></li>}
                {contactInstagram && <a href={contactInstagram} target="_blank" rel="noopener noreferrer" onClick={toggleMenu} className="mt-8"><InstagramIcon size={36} /></a>}
                {showResumeLink && resumeUrl && 
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>
                     <button 
                      className="mt-4 h-[55px] w-[160px] text-base font-medium border-2 rounded transition-colors duration-200" 
                      style={dynamicStyles.navBtn}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = dynamicStyles.navBtnHover.backgroundColor; e.currentTarget.style.color = dynamicStyles.navBtnHover.color; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = dynamicStyles.navBtn.color; }}
                    >My Resume</button>
                  </a>
                }
              </ul>
            </div>
            
            {/* Hero Content */}
            <div className="flex-grow flex flex-col md:flex-row items-center justify-center pt-[100px] md:pt-[120px] px-4 md:px-0">
              <div className="w-full md:w-1/2 flex justify-center md:justify-start md:pl-[5%] lg:pl-[10%] mb-8 md:mb-0">
                <Image 
                  src={heroImagePlaceholder || "https://placehold.co/600x750.png"} 
                  alt={yourName || "Portfolio Owner"} 
                  width={600} height={750} 
                  className="max-w-xs md:max-w-sm lg:max-w-md object-contain transition-transform duration-1500 ease-out hover:scale-105"
                  data-ai-hint="professional portrait student"
                  priority
                />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left md:pr-[5%] lg:pr-[10%]">
                <h1 className="font-['Work_Sans',_sans-serif] text-3xl sm:text-4xl lg:text-5xl font-normal mb-3 sm:mb-5">
                  Hello, my name is <br />
                  <span style={dynamicStyles.heroName} className="text-4xl sm:text-5xl lg:text-6xl font-bold">{yourName}</span>
                </h1>
                <h2 className="font-['Work_Sans',_sans-serif] text-2xl sm:text-3xl lg:text-4xl font-bold">
                  {heroTitle}
                </h2>
              </div>
            </div>
          </section>

          {/* Academic Ventures / About Section */}
          {showAboutSection && (
            <section id="about" className="py-16 md:py-24 scroll-mt-24">
              <h3 className="text-center text-4xl md:text-5xl font-semibold mb-12 md:mb-16" style={{color: primaryColor}}>Academic Ventures</h3>
              
              {/* O' Levels - academic1 */}
              {showAcademic1 && academic1 && academic1.qualification && (
                <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-8 md:gap-12 mb-12 md:mb-20 px-4 md:px-[5%]">
                  <div className="md:w-2/5 text-center md:text-left">
                    <h4 className="text-2xl md:text-3xl font-semibold mb-1" style={{color: primaryColor}}>{academic1.institution || "School Name"} 🎓</h4>
                    <span style={dynamicStyles.levelsSpan} className="block text-xl md:text-2xl font-medium mb-3">{academic1.qualification}</span>
                    <p className="text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: (academic1.description || aboutBio || "Academic achievements and details.").replace(/\\n/g, '<br />')}} />
                  </div>
                  <div className="md:w-3/5 flex flex-col items-center md:items-end">
                    <Image 
                      src={academic1.imageUrl || "https://placehold.co/600x400.png?text=School+Image"} 
                      alt={academic1.institution || "School"} 
                      width={600} height={400} 
                      className="rounded-lg shadow-xl border-2 object-cover mb-4" 
                      style={{borderColor: accentColor}}
                      data-ai-hint="school building education"
                    />
                    {academic1.grades && (
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                        {(academic1.grades || "A*,A*,A*").split(',').map((grade, i) => (
                          <p key={i} className="px-3 py-1 text-sm rounded-full" style={{backgroundColor: accentColor, color: accentContrast}}>{grade.trim()}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* A' Levels - academic2 */}
              {showAcademic2 && academic2 && academic2.qualification && (
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4 md:px-[5%]">
                  <div className="md:w-2/5 text-center md:text-left order-2 md:order-1">
                    <h4 className="text-2xl md:text-3xl font-semibold mb-1" style={{color: primaryColor}}>{academic2.institution || "College Name"} 🎓</h4>
                    <span style={dynamicStyles.levelsSpan} className="block text-xl md:text-2xl font-medium mb-3">{academic2.qualification}</span>
                    <p className="text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: (academic2.description || "Further academic pursuits and details.").replace(/\\n/g, '<br />')}} />
                  </div>
                  <div className="md:w-3/5 flex flex-col items-center md:items-start order-1 md:order-2">
                     <Image 
                      src={academic2.imageUrl || "https://placehold.co/600x400.png?text=College+Image"} 
                      alt={academic2.institution || "College"} 
                      width={600} height={400} 
                      className="rounded-lg shadow-xl border-2 object-cover mb-4" 
                      style={{borderColor: accentColor}}
                      data-ai-hint="college campus study"
                    />
                    {academic2.grades && (
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                        {(academic2.grades || "A,A,A").split(',').map((grade, i) => (
                          <p key={i} className="px-3 py-1 text-sm rounded-full" style={{backgroundColor: accentColor, color: accentContrast}}>{grade.trim()}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Affiliations Scroller */}
          {showSkillsSection && affiliations.length > 0 && (
            <section className="scroller py-12 md:py-16 my-10 md:my-16" style={dynamicStyles.affiliationSectionBg}>
              <h5 className="text-center text-3xl md:text-4xl font-semibold mb-8 md:mb-10" style={{color: primaryContrast}}>Worked in Affiliation With</h5>
              <div className="overflow-hidden whitespace-nowrap group">
                <div className="flex animate-slide group-hover:pause">
                  {affiliations.concat(affiliations).map((affiliation, index) => ( // Duplicate for continuous scroll
                     <div key={index} className="inline-block mx-8 my-2 h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 flex-shrink-0 bg-background/20 rounded-full p-2 flex items-center justify-center">
                        <Image 
                            src={\`https://placehold.co/150x150.png?text=\${encodeURIComponent(affiliation.substring(0,10))}\`} // Placeholder with affiliation name
                            alt={affiliation}
                            width={120} height={120}
                            className="object-contain rounded-full filter grayscale hover:grayscale-0 transition-all duration-300"
                            data-ai-hint="company logo"
                        />
                     </div>
                  ))}
                </div>
              </div>
              <style jsx>{\`
                @keyframes slide {
                  from { transform: translateX(0); }
                  to { transform: translateX(-50%); }
                }
                .animate-slide {
                  animation: slide 30s linear infinite; /* Adjust duration as needed */
                }
                .pause:hover {
                  animation-play-state: paused;
                }
              \`}</style>
            </section>
          )}
          
          {/* Work Experience */}
          {showProjectsSection && (
            <section id="work" className="py-16 md:py-24 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 px-4 md:px-[3%] scroll-mt-24">
              <div className="w-full md:w-1/3 text-center md:text-left mb-8 md:mb-0">
                <h6 className="text-4xl md:text-5xl font-semibold mb-6" style={{color: primaryColor}}>Work Experience</h6>
                <Image 
                  src={(project1 && project1.imageUrl) || heroImagePlaceholder || "https://placehold.co/400x500.png?text=Work+Image"} 
                  alt="Work Experience Visual" 
                  width={400} height={500} 
                  className="rounded-lg shadow-xl object-cover mx-auto md:mx-0"
                  data-ai-hint="office professional work"
                />
              </div>
              <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {showProject1 && project1 && project1.name && (
                  <div className="p-6 rounded-lg shadow-lg" style={dynamicStyles.workPlaceBg}>
                    <h3 className="text-xl md:text-2xl font-bold mb-1" style={{color: accentColor}}>{project1.name}</h3>
                    <p className="text-sm font-semibold mb-3 opacity-80">{project1.technologies}</p> {/* Role/Duration */}
                    <p className="text-sm leading-relaxed opacity-90" dangerouslySetInnerHTML={{ __html: (project1.description || "").replace(/\\n/g, '<br />')}} />
                  </div>
                )}
                {showProject2 && project2 && project2.name && (
                   <div className="p-6 rounded-lg shadow-lg" style={dynamicStyles.workPlaceBg}>
                    <h3 className="text-xl md:text-2xl font-bold mb-1" style={{color: accentColor}}>{project2.name}</h3>
                    <p className="text-sm font-semibold mb-3 opacity-80">{project2.technologies}</p> {/* Role/Duration */}
                    <p className="text-sm leading-relaxed opacity-90" dangerouslySetInnerHTML={{ __html: (project2.description || "").replace(/\\n/g, '<br />')}} />
                  </div>
                )}
                {/* Could add more project slots here if schema supported it */}
              </div>
            </section>
          )}

          {/* Footer / Contact */}
          {showContactSection && (
            <footer id="footer" className="py-12 md:py-20 px-4" style={dynamicStyles.footerBg}>
              <div onClick={scrollToTop} className="text-center mb-10 cursor-pointer group">
                <ArrowUpCircle size={40} className="mx-auto transition-transform group-hover:-translate-y-1" style={{color: accentContrast}}/>
              </div>
              <ol className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-x-8 gap-y-6 text-center mb-10">
                {contactEmail && <li><a href={'mailto:' + contactEmail} style={{color: accentContrast}} className="hover:underline">Gmail: <br /> {contactEmail}</a></li>}
                {/* Phone number not in schema, can add if needed */}
                {contactLinkedin && <li><a href={contactLinkedin} target="_blank" rel="noopener noreferrer" style={{color: accentContrast}} className="hover:underline">LinkedIn: <br /> Profile</a></li>}
                {contactInstagram && <li><a href={contactInstagram} target="_blank" rel="noopener noreferrer" style={{color: accentContrast}} className="hover:underline">Instagram: <br /> @{contactInstagram.split('/').pop()}</a></li>}
              </ol>
              <div className="text-center text-sm opacity-80" style={{color: primaryContrast}}>
                <p>Designed and Created By Izaan Khan</p> {/* This is hardcoded in reference */}
                 <p className="mt-2">&copy; {new Date().getFullYear()} {yourName}</p>
              </div>
            </footer>
          )}
        </div>
      </div>
    </>
  );
};

export default function GeneratedPage() {
  // Data parsing and default error props are essential
  const rawDataString = '${escJsStr(JSON.stringify(data))}';
  let parsedProps: FormSchemaType;
  try {
    parsedProps = JSON.parse(rawDataString);
  } catch (e) {
    console.error("Error parsing props in Student Template GeneratedPage:", e);
    parsedProps = ${JSON.stringify(defaultErrorProps)};
  }
  // Ensure propsToPass is always a valid object structure, even if parsing fails
  const propsToPass = { ...defaultErrorProps, ...parsedProps, academic1: {...defaultErrorProps.academic1, ...(parsedProps.academic1 || {})}, academic2: {...defaultErrorProps.academic2, ...(parsedProps.academic2 || {})}, project1: {...defaultErrorProps.project1, ...(parsedProps.project1 || {})}, project2: {...defaultErrorProps.project2, ...(parsedProps.project2 || {})} };
  
  return <${siteNameClean}PortfolioPage portfolioData={propsToPass} />;
}
`;

  // --- PREVIEW HTML ---
  const {
    yourName,
    heroTitle,
    heroImagePlaceholder,
    aboutBio,
    aboutSkills,
    academic1,
    academic2,
    project1,
    project2,
    contactEmail,
    contactLinkedin,
    contactInstagram,
    resumeUrl,
    showAboutSection,
    showAcademic1,
    showAcademic2,
    showProjectsSection,
    showProject1,
    showProject2,
    showSkillsSection,
    showContactSection,
    showResumeLink,
  } = { ...defaultErrorProps, ...data, academic1: {...defaultErrorProps.academic1, ...(data.academic1 || {})}, academic2: {...defaultErrorProps.academic2, ...(data.academic2 || {})}, project1: {...defaultErrorProps.project1, ...(data.project1 || {})}, project2: {...defaultErrorProps.project2, ...(data.project2 || {})} }; // Use data for preview, ensuring defaults

  const affiliationsPreview = showSkillsSection && aboutSkills ? aboutSkills.split(',').map(s => s.trim()).filter(s => s) : [];

  // Combine reference styles.css and resp.css for the preview
  // Base Styles (from styles.css)
  let inlineStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    * { padding: 0; margin: 0; font-family: 'Poppins', sans-serif; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { background-color: ${escCssVal(backgroundColor)}; color: ${escCssVal(foregroundColor)}; overflow-x:hidden; word-wrap: break-word; overflow-wrap: break-word;}
    img { max-width: 100%; height: auto; display: block; }
    .container-preview { width: 100%; /* margin: 0px 3%; from reference, now controlled by internal padding */ }
    .landing-page-preview { min-height: 100vh; display: flex; flex-direction: column; }
    nav.desktop-nav-preview { display: none; justify-content: space-between; align-items: center; height: 90px; background-color: ${escCssVal(backgroundColor)}; position: fixed; top: 0px; left:0; right:0; z-index: 50; padding: 0 3%; }
    @media (min-width: 768px) { nav.desktop-nav-preview { display: flex; } }
    nav.desktop-nav-preview ul { display: flex; list-style:none; align-items:center; }
    nav.desktop-nav-preview ul a li { color: ${escCssVal(foregroundColor)}; font-size: 17px; margin: 0px 12px; letter-spacing: 0.6px; transition:200ms ease; }
    nav.desktop-nav-preview ul a:hover li { color: ${escCssVal(accentColor)}; text-decoration: underline; text-underline-offset: 10px; }
    nav.desktop-nav-preview > a > p { font-size: 27px; font-weight: 600; color: ${escCssVal(foregroundColor)}; text-decoration:none; }
    nav.desktop-nav-preview .nav-right-preview img { width: 25px; margin-right: 20px; transition: 200ms ease; }
    nav.desktop-nav-preview .nav-right-preview img:hover { transform: scale(1.2); }
    .nav-btn-preview { height: 55px; width: 140px; font-size: 14px; border-radius: 1px; color: ${escCssVal(accentColor)}; background-color: transparent; border: solid 2px ${escCssVal(accentColor)}; font-weight: 500; padding-right: 7px; cursor: pointer; transition: 200ms ease; }
    .nav-btn-preview:hover { color: ${escCssVal(accentContrast)}; background-color: ${escCssVal(accentColor)}; }
    .main-preview { flex-grow:1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-top: 100px; } /* Adjusted padding-top */
    @media (min-width: 768px) { .main-preview { flex-direction: row; padding-top: 120px; } }
    .main-items-preview { width: 90%; margin: 2% auto; }
    @media (min-width: 768px) { .main-items-preview { width: 48%; margin: 4% 2% 0px 2%; } }
    .main-pic-preview img { width: 100%; max-width: 320px; margin:0 auto 1rem auto; transition: 1.5s ease; } /* Centered and responsive */
    @media (min-width: 768px) { .main-pic-preview img { max-width: 100%; } }
    .main-pic-preview img:hover { transform: scale(1.05); }
    .main-txt-preview { color: ${escCssVal(foregroundColor)}; text-align: center; }
    @media (min-width: 768px) { .main-txt-preview { text-align: left; } }
    .main-txt-preview h1 { font-weight: 400; font-size: clamp(1.8rem, 5vw, 2.8rem); padding: 0; margin-bottom: 1rem; font-family: 'Work Sans', sans-serif; }
    .main-txt-preview h2 { font-family: 'Work Sans', sans-serif; font-weight: 700; font-size: clamp(1.5rem, 4vw, 2.2rem); padding: 0; }
    .name-span-preview { font-size: clamp(2rem, 6vw, 3.1rem); color: ${escCssVal(accentColor)}; font-weight: 700; }
    .about-preview { padding: 4rem 2rem; margin-top: 0; } /* Removed fixed height */
    .about-preview h3.section-title { text-align: center; color: ${escCssVal(primaryColor)}; font-size: clamp(2.2rem, 5vw, 3.4rem); margin-bottom: 3rem; }
    .academic-entry-preview { display: flex; flex-direction: column; justify-content: center; align-items: center; margin-bottom: 3rem; gap:1.5rem; }
    @media (min-width: 768px) { .academic-entry-preview { flex-direction: row; gap:2.5rem; } .academic-entry-preview.reverse {flex-direction:row-reverse;} }
    .academic-entry-preview img { max-height: 350px; width:100%; max-width:500px; object-fit:cover; box-shadow: 0px 0px 5px 5px ${escCssVal(primaryColor)}33; margin-right: 0; transition: 300ms ease; border-radius: 8px; }
    .academic-entry-preview img:hover { transform: scale(1.05); }
    .academic-txt-preview { color: ${escCssVal(foregroundColor)}E6; width: 100%; text-align:center; }
    @media (min-width: 768px) { .academic-txt-preview { width: auto; text-align:left; } }
    .academic-txt-preview h4 { font-size: clamp(1.5rem, 4vw, 2.2rem); color: ${escCssVal(primaryColor)}; margin-bottom: 0.5rem; }
    .levels-span-preview { font-size: clamp(1.8rem, 5vw, 2.5rem); color: ${escCssVal(accentColor)}; }
    .grades-preview { color: ${escCssVal(foregroundColor)}E6; font-size: 1.2rem; display:flex; flex-wrap:wrap; gap:0.5rem; justify-content:center; margin-top:1rem;}
    @media (min-width: 768px) { .grades-preview {justify-content:flex-start;} }
    .grades-preview p { background-color:${escCssVal(accentColor)}; color:${escCssVal(accentContrast)}; padding: 0.25rem 0.75rem; border-radius:9999px; }
    .scroller-preview { padding: 3rem 0; margin: 2.5rem 0; background-color: ${escCssVal(primaryColor ? `color-mix(in srgb, ${primaryColor} 70%, black)` : '#300000')}; overflow:hidden; }
    .scroller-preview h5 { text-align: center; font-size: clamp(1.8rem, 5vw, 2.5rem); color: ${escCssVal(primaryContrast)}; padding-bottom: 2rem; }
    .intn_list-preview { white-space: nowrap; height: auto; display: flex; align-items: center; animation: slide-preview 30s linear infinite; }
    .intn_list-preview:hover { animation-play-state: paused; }
    @keyframes slide-preview { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .int_icons-preview img { height:100px; width:100px; border-radius: 50%; margin: 0px 2rem; object-fit:cover; transition: 200ms ease; filter: grayscale(0.5); }
    .int_icons-preview img:hover { transform: scale(1.1); filter: grayscale(0); }
    .work-preview { padding: 4rem 2rem; display: flex; flex-direction: column; justify-content: space-between; gap: 2rem; }
    @media (min-width: 768px) { .work-preview { flex-direction: row; gap: 3rem; } }
    .work_piece1-preview { width: 100%; text-align:center; }
    @media (min-width: 768px) { .work_piece1-preview { width: 33%; text-align:left; } }
    .work_piece1-preview h6 { font-size: clamp(2rem, 5vw, 3.1rem); color: ${escCssVal(primaryColor)}; margin-bottom:1.5rem; }
    .work_piece1-preview img { max-height: 400px; object-fit:cover; margin: 0 auto; border-radius:8px; }
    .work_examples-preview { width: 100%; display: grid; grid-template-columns:1fr; gap:1.5rem; }
    @media (min-width: 640px) { .work_examples-preview { grid-template-columns:repeat(2,1fr); } }
    .workPlaces-preview { background-color: ${escCssVal(primaryColor ? `color-mix(in srgb, ${primaryColor} 90%, black)` : 'rgb(31,3,3)')}; color: ${escCssVal(primaryContrast)}E6; padding: 1.5rem; border-radius:8px; transition: linear 100ms; }
    .workPlaces-preview:hover { transform: scale(1.03); }
    .workPlaces-preview h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; color: ${escCssVal(accentColor)}; }
    .workPlaces-preview .h_time-preview { font-size: 0.9rem; font-weight: 600; margin-bottom:0.75rem; opacity:0.8; }
    .workPlaces-preview .h_desc-preview { font-size:0.875rem; opacity:0.9; }
    footer.footer-preview { background-color: ${escCssVal(primaryColor ? `color-mix(in srgb, ${primaryColor} 70%, black)` : '#300000')}; padding: 3rem 1rem 2rem 1rem; display: flex; flex-direction: column; color: ${escCssVal(primaryContrast)}; }
    footer.footer-preview .scroll-top-btn-preview { text-align: center; margin-bottom: 2.5rem; cursor: pointer; }
    footer.footer-preview .scroll-top-btn-preview svg { width: 40px; height:40px; color: ${escCssVal(accentContrast)}; transition: transform 0.2s; }
    footer.footer-preview .scroll-top-btn-preview:hover svg { transform: translateY(-5px); }
    footer.footer-preview ol { display: flex; text-decoration: none; list-style: none; justify-content: center; margin: 2.5rem 0; flex-wrap: wrap; gap:1.5rem 2rem; }
    footer.footer-preview ol a li { font-weight: 700; color: ${escCssVal(primaryContrast)}B3; transition: 200ms; cursor: pointer; text-align:center; }
    footer.footer-preview ol a:hover li { color: ${escCssVal(accentColor)}; transform: scale(1.05); }
    .credits-preview { text-align:center; }
    .credits-preview p { font-weight: 500; font-size: 0.9rem; margin-bottom: 4px; color: ${escCssVal(primaryContrast)}B3; }
    .credits-preview p a span { color: ${escCssVal(accentContrast)}; font-size: 1.1rem; font-weight: 800; cursor: pointer; text-decoration: none; transition: 100ms ease-in-out; }
    .credits-preview p a:hover span { color: ${escCssVal(accentColor)}; }
    /* Mobile Menu Styles */
    .menu-icon-preview { display: block; position: fixed; top: 1rem; right: 1rem; z-index: 1001; cursor:pointer; padding:0.5rem; }
    @media (min-width: 768px) { .menu-icon-preview { display: none; } }
    .menu-line-preview { width:30px; height: 3px; background-color: ${escCssVal(foregroundColor)}; margin: 6px 0; border-radius: 10px; }
    .hidden-menu-preview { position: fixed; top: 0; left: -300px; width: 250px; height: 100vh; background-color: ${escCssVal(primaryColor ? `color-mix(in srgb, ${primaryColor} 70%, black)` : '#300000')}; z-index: 1000; transition: left 0.3s ease-in-out; padding:1.5rem; display:flex; flex-direction:column; align-items:center; justify-content:center; }
    .hidden-menu-preview.show-menu-preview { left: 0px; }
    .hidden-menu-preview ul { list-style:none; text-align:center; }
    .hidden-menu-preview ul li { margin: 1.5rem 0; }
    .hidden-menu-preview ul a { color: ${escCssVal(primaryContrast)}; text-decoration:none; font-size:1.25rem; }
    .hidden-menu-preview .close-btn-preview { color: ${escCssVal(primaryContrast)}; text-align: right; padding: 0; font-size: 1.5rem; position:absolute; top:1.5rem; right:1.5rem; cursor:pointer; }
    .hidden-menu-preview img { height: 30px; margin-top: 2rem; }
    .hidden-menu-preview .nav-btn-preview { margin: 0 auto; margin-top: 1.5rem; color:${escCssVal(accentColor)}; border-color:${escCssVal(accentColor)};}
    .hidden-menu-preview .nav-btn-preview:hover { background-color:${escCssVal(accentColor)}; color:${escCssVal(accentContrast)};}
  `;

  // Add responsive styles (from resp.css)
  // Note: Direct translation of all responsive CSS might be too verbose. Focusing on key structural changes.
  inlineStyles += `
    @media (max-width:1400px){
      nav.desktop-nav-preview .nav-right-preview { margin-right: 20px; }
      nav.desktop-nav-preview ul { margin-left: 10px !important; padding-left: 0px; }
      nav.desktop-nav-preview { padding-left: 0px; justify-content: space-between; }
    }
    /* Other responsive styles from resp.css would go here, adapted as needed */
  `;
  
  let previewHtml = '';
  previewHtml += '<html><head>';
  previewHtml += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
  previewHtml += '<title>' + escHtml(yourName) + ' - Student Portfolio</title>';
  previewHtml += '<link rel="preconnect" href="https://fonts.googleapis.com">';
  previewHtml += '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
  previewHtml += '<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">';
  previewHtml += '<style>' + escCssVal(inlineStyles) + '</style>';
  previewHtml += '</head><body>';
  
  previewHtml += '<div class="container-preview">';
  previewHtml += '  <section id="landing-page_preview_id" class="landing-page-preview">';
  
  // Desktop Nav Preview
  previewHtml += '    <nav class="desktop-nav-preview">';
  previewHtml += '      <ul>';
  previewHtml += '        <a href="#landing-page_preview_id"><li>Home</li></a>';
  if(showAboutSection) previewHtml += '        <a href="#about_preview_id"><li>About</li></a>';
  if(showProjectsSection) previewHtml += '        <a href="#work_preview_id"><li>Work</li></a>';
  if(showContactSection) previewHtml += '        <a href="#footer_preview_id"><li>Contact</li></a>';
  previewHtml += '      </ul>';
  previewHtml += '      <a href="#landing-page_preview_id"><p>' + escHtml(yourName) + '</p></a>';
  previewHtml += '      <div class="nav-right-preview" style="display:flex; align-items:center;">';
  if(contactInstagram) previewHtml += '        <a href="' + escAttr(contactInstagram) + '" target="_blank"><img src="https://www.svgrepo.com/show/303154/instagram-logo-color-logotype.svg" alt="Instagram" style="width:25px; height:25px; margin-right:1rem;"/></a>'; // Placeholder SVG
  if(showResumeLink && resumeUrl) previewHtml += '        <a href="' + escAttr(resumeUrl) + '" target="_blank"><button class="nav-btn-preview">My Resume</button></a>';
  previewHtml += '      </div>';
  previewHtml += '    </nav>';

  // Mobile Menu Icon Preview
  previewHtml += '    <div class="menu-icon-preview" onclick="toggleMenuPreview()">';
  previewHtml += '      <div class="menu-line-preview"></div><div class="menu-line-preview"></div><div class="menu-line-preview"></div>';
  previewHtml += '    </div>';
  
  // Mobile Hidden Menu Preview
  previewHtml += '    <div id="hidden_menu_preview_id" class="hidden-menu-preview">';
  previewHtml += '      <p class="close-btn-preview" onclick="closeBtnPreview()">x</p>';
  previewHtml += '      <ul>';
  previewHtml += '        <a href="#landing-page_preview_id" onclick="closeBtnPreview()"><li>Home</li></a>';
  if(showAboutSection) previewHtml += '        <a href="#about_preview_id" onclick="closeBtnPreview()"><li>About</li></a>';
  if(showProjectsSection) previewHtml += '        <a href="#work_preview_id" onclick="closeBtnPreview()"><li>Work</li></a>';
  if(showContactSection) previewHtml += '        <a href="#footer_preview_id" onclick="closeBtnPreview()"><li>Contact</li></a>';
  if(contactInstagram) previewHtml += '        <a href="' + escAttr(contactInstagram) + '" target="_blank" onclick="closeBtnPreview()"><img src="https://www.svgrepo.com/show/303154/instagram-logo-color-logotype.svg" alt="Instagram" /></a>';
  if(showResumeLink && resumeUrl) previewHtml += '        <a href="' + escAttr(resumeUrl) + '" target="_blank" onclick="closeBtnPreview()"><button class="nav-btn-preview">My Resume</button></a>';
  previewHtml += '      </ul>';
  previewHtml += '    </div>';

  // Hero Content Preview
  previewHtml += '    <div class="main-preview">';
  previewHtml += '      <div class="main-pic-preview main-items-preview"><img src="' + escAttr(heroImagePlaceholder || 'https://placehold.co/600x750.png?text=Your+Photo') + '" alt="' + escAttr(yourName) + '" data-ai-hint="professional portrait student"/></div>';
  previewHtml += '      <div class="main-txt-preview main-items-preview">';
  previewHtml += '        <h1>Hello, my name is <br/><span class="name-span-preview" style="color:'+escCssVal(accentColor)+';">' + escHtml(yourName) + '</span></h1>';
  previewHtml += '        <h2>' + escHtml(heroTitle) + '</h2>';
  previewHtml += '      </div>';
  previewHtml += '    </div>';
  previewHtml += '  </section>';

  // Academic / About Section Preview
  if(showAboutSection) {
    previewHtml += '  <section id="about_preview_id" class="about-preview">';
    previewHtml += '    <h3 class="section-title" style="color:'+escCssVal(primaryColor)+';">Academic Ventures</h3>';
    if(showAcademic1 && academic1 && academic1.qualification) {
        previewHtml += '<div class="academic-entry-preview reverse">';
        previewHtml += '  <div class="academic-txt-preview">';
        previewHtml += '    <h4>' + escHtml(academic1.institution || 'School Name') + ' 🎓<br/><span class="levels-span-preview" style="color:'+escCssVal(accentColor)+';">' + escHtml(academic1.qualification) + '</span></h4>';
        previewHtml += '    <p>' + (escHtml(academic1.description || aboutBio || 'Description for O Levels.')).replace(/\n/g, '<br>') + '</p>';
        previewHtml += '  </div>';
        previewHtml += '  <div style="md:w-3/5 flex flex-col items-center">'; // Wrapper for image and grades
        previewHtml += '    <img src="' + escAttr(academic1.imageUrl || 'https://placehold.co/600x400.png?text=School+Image') + '" alt="' + escAttr(academic1.institution || 'School') + '" data-ai-hint="school building education" style="border-color:'+escCssVal(accentColor)+';"/>';
        if (academic1.grades) {
            previewHtml += '<div class="grades-preview">';
            (academic1.grades.split(',')).forEach(grade => { previewHtml += '<p style="background-color:'+escCssVal(accentColor)+'; color:'+escCssVal(accentContrast)+';">' + escHtml(grade.trim()) + '</p>'; });
            previewHtml += '</div>';
        }
        previewHtml += '  </div>';
        previewHtml += '</div>';
    }
    if(showAcademic2 && academic2 && academic2.qualification) {
        previewHtml += '<div class="academic-entry-preview">';
        previewHtml += '  <div class="academic-txt-preview">';
        previewHtml += '    <h4>' + escHtml(academic2.institution || 'College Name') + ' 🎓<br/><span class="levels-span-preview" style="color:'+escCssVal(accentColor)+';">' + escHtml(academic2.qualification) + '</span></h4>';
        previewHtml += '    <p>' + (escHtml(academic2.description || 'Description for A Levels.')).replace(/\n/g, '<br>') + '</p>';
        previewHtml += '  </div>';
        previewHtml += '  <div style="md:w-3/5 flex flex-col items-center">'; // Wrapper for image and grades
        previewHtml += '    <img src="' + escAttr(academic2.imageUrl || 'https://placehold.co/600x400.png?text=College+Image') + '" alt="' + escAttr(academic2.institution || 'College') + '" data-ai-hint="college campus study" style="border-color:'+escCssVal(accentColor)+';"/>';
        if (academic2.grades) {
            previewHtml += '<div class="grades-preview">';
            (academic2.grades.split(',')).forEach(grade => { previewHtml += '<p style="background-color:'+escCssVal(accentColor)+'; color:'+escCssVal(accentContrast)+';">' + escHtml(grade.trim()) + '</p>'; });
            previewHtml += '</div>';
        }
        previewHtml += '  </div>';
        previewHtml += '</div>';
    }
    previewHtml += '  </section>';
  }
  
  // Affiliations Scroller Preview
  if(showSkillsSection && affiliationsPreview.length > 0) {
    previewHtml += '  <section class="scroller-preview" style="background-color: ' + escCssVal(primaryColor ? `color-mix(in srgb, ${primaryColor} 70%, black)` : '#300000') + ';">';
    previewHtml += '    <h5 style="color:'+escCssVal(primaryContrast)+';">Worked in Affiliation With</h5>';
    previewHtml += '    <div class="intn_list-preview">';
    const duplicatedAffiliations = affiliationsPreview.concat(affiliationsPreview); // For smooth scroll
    duplicatedAffiliations.forEach(affiliation => {
        previewHtml += '<div class="int_icons-preview"><img src="https://placehold.co/150x150.png?text=' + encodeURIComponent(affiliation.substring(0,10)) + '" alt="' + escAttr(affiliation) + '" data-ai-hint="company logo"/></div>';
    });
    previewHtml += '    </div>';
    previewHtml += '  </section>';
  }

  // Work Experience Preview
  if(showProjectsSection) {
    previewHtml += '  <section id="work_preview_id" class="work-preview">';
    previewHtml += '    <div class="work_piece1-preview">';
    previewHtml += '      <h6 style="color:'+escCssVal(primaryColor)+';">Work Experience</h6><br/>';
    previewHtml += '      <img src="' + escAttr((project1 && project1.imageUrl) || heroImagePlaceholder || 'https://placehold.co/400x500.png?text=Work+Image') + '" alt="Work Experience Visual" data-ai-hint="office professional work"/>';
    previewHtml += '    </div>';
    previewHtml += '    <div class="work_examples-preview">';
    if(showProject1 && project1 && project1.name) {
        previewHtml += '<div class="workPlaces-preview" style="background-color: ' + escCssVal(primaryColor ? `color-mix(in srgb, ${primaryColor} 90%, black)` : 'rgb(31,3,3)') + '; color: ' + escCssVal(primaryContrast) + 'E6;">';
        previewHtml += '  <h3 style="color:'+escCssVal(accentColor)+';">' + escHtml(project1.name) + '</h3>';
        previewHtml += '  <p class="h_time-preview">' + escHtml(project1.technologies) + '</p>'; // Repurposing technologies for Role/Duration
        previewHtml += '  <p class="h_desc-preview">' + (escHtml(project1.description)).replace(/\n/g, '<br>') + '</p>';
        previewHtml += '</div>';
    }
    if(showProject2 && project2 && project2.name) {
        previewHtml += '<div class="workPlaces-preview" style="background-color: ' + escCssVal(primaryColor ? `color-mix(in srgb, ${primaryColor} 90%, black)` : 'rgb(31,3,3)') + '; color: ' + escCssVal(primaryContrast) + 'E6;">';
        previewHtml += '  <h3 style="color:'+escCssVal(accentColor)+';">' + escHtml(project2.name) + '</h3>';
        previewHtml += '  <p class="h_time-preview">' + escHtml(project2.technologies) + '</p>'; // Repurposing technologies for Role/Duration
        previewHtml += '  <p class="h_desc-preview">' + (escHtml(project2.description)).replace(/\n/g, '<br>') + '</p>';
        previewHtml += '</div>';
    }
    previewHtml += '    </div>';
    previewHtml += '  </section>';
  }

  // Footer Preview
  if(showContactSection) {
    previewHtml += '  <footer id="footer_preview_id" class="footer-preview" style="background-color: ' + escCssVal(primaryColor ? `color-mix(in srgb, ${primaryColor} 70%, black)` : '#300000') + '; color: ' + escCssVal(primaryContrast) + ';">';
    previewHtml += '    <a class="scroll-top-btn-preview" onclick="scrollToTopPreview()">';
    previewHtml += '      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:'+escCssVal(accentContrast)+';"><circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line></svg>';
    previewHtml += '    </a>';
    previewHtml += '    <ol>';
    if(contactEmail) previewHtml += '      <a href="mailto:' + escAttr(contactEmail) + '"><li style="color:'+escCssVal(primaryContrast)+'B3;"> Gmail: <br/> ' + escHtml(contactEmail) + '</li></a>';
    if(contactLinkedin) previewHtml += '      <a href="' + escAttr(contactLinkedin) + '" target="_blank"><li style="color:'+escCssVal(primaryContrast)+'B3;">Linkedin: <br/> Profile</li></a>';
    if(contactInstagram) previewHtml += '      <a href="' + escAttr(contactInstagram) + '" target="_blank"><li style="color:'+escCssVal(primaryContrast)+'B3;">Instagram: <br/> @' + escHtml(contactInstagram.split('/').pop()) + '</li></a>';
    previewHtml += '    </ol>';
    previewHtml += '    <div class="credits-preview">';
    previewHtml += '      <p style="color:'+escCssVal(primaryContrast)+'B3;">Designed and Created By <a href="https://izaankhan0.github.io/portfolio/" target="_blank"><span style="color:'+escCssVal(accentContrast)+';">Izaan Khan</span></a></p>';
    previewHtml += '      <p style="color:'+escCssVal(primaryContrast)+'B3; margin-top:0.5rem;">&copy; ' + new Date().getFullYear() + ' ' + escHtml(yourName) + '</p>';
    previewHtml += '    </div>';
    previewHtml += '  </footer>';
  }

  previewHtml += '</div>'; // Closing container-preview
  
  // JavaScript for Preview
  previewHtml += '<script>';
  previewHtml += `
    function toggleMenuPreview() {
      const menu = document.getElementById('hidden_menu_preview_id');
      if (menu) menu.classList.toggle('show-menu-preview');
    }
    function closeBtnPreview() {
      const menu = document.getElementById('hidden_menu_preview_id');
      if (menu) menu.classList.remove('show-menu-preview');
    }
    function scrollToTopPreview() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Add hover effects for nav buttons in preview JS if needed, or rely on CSS :hover
    document.querySelectorAll('.nav-btn-preview').forEach(button => {
        button.onmouseenter = function() {
            this.style.backgroundColor = '${escCssVal(accentColor)}';
            this.style.color = '${escCssVal(accentContrast)}';
        };
        button.onmouseleave = function() {
            this.style.backgroundColor = 'transparent';
            this.style.color = '${escCssVal(accentColor)}';
        };
    });
    document.querySelectorAll('footer.footer-preview ol a').forEach(link => {
        const originalColor = link.querySelector('li').style.color;
        link.onmouseenter = function() { this.querySelector('li').style.color = '${escCssVal(accentColor)}'; };
        link.onmouseleave = function() { this.querySelector('li').style.color = originalColor; };
    });
  `;
  previewHtml += '</script>';
  previewHtml += '</body></html>';

  return { fullTsx, previewHtml };
}