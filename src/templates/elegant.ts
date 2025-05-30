
// src/templates/elegant.ts
import type { FormSchemaType, AcademicEntryType, ProjectType } from "@/schemas/websiteFormSchema";

// --- Escaping Helper Functions ---
const escJsStr = (str: string | undefined | null): string => {
  if (str === null || typeof str === 'undefined') return '';
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, "\\n");
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
  return str.replace(/`/g, "'").replace(/"/g, "'").replace(/\\/g, '\\\\').replace(/</g, '').replace(/>/g, '');
};
// --- End Escaping Helper Functions ---

// Helper function to get contrast color - MUST BE DEFINED AT THE TOP LEVEL OF THE MODULE
function getContrastColor(hexcolor: string | undefined): string {
  if (!hexcolor || !hexcolor.startsWith('#')) return '#000000'; // Default black for light backgrounds
  let processedHex = hexcolor.slice(1);
  if (processedHex.length === 3) {
    processedHex = processedHex.split("").map(char => char + char).join("");
  }
  if (processedHex.length !== 6) return '#000000';
  try {
    const r = parseInt(processedHex.substring(0, 2), 16);
    const g = parseInt(processedHex.substring(2, 4), 16);
    const b = parseInt(processedHex.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000000' : '#FFFFFF';
  } catch (e) {
    console.error("Error parsing hex for contrast in getContrastColor:", e);
    return '#000000';
  }
}

export function getElegantTemplate(data: FormSchemaType): { fullTsx: string; previewHtml: string } {
  const siteNameClean = (data.yourName?.trim().replace(/\W+/g, '') || "ElegantPortfolioSite");

  const defaultErrorProps: FormSchemaType = {
    yourName: "Name (Error)",
    heroTitle: "Elegant Title (Error)",
    heroTagline: "Error loading elegant tagline. This is a placeholder.",
    heroCtaText: "Explore Further",
    heroImagePlaceholder: "", // No hero image by default for this elegant theme
    aboutBio: "Error loading biography. This is placeholder text about professional experience and philosophy.",
    aboutSkills: "Skill A, Skill B, Skill C",
    aboutFunFact: "A placeholder fun fact or personal interest.",
    academicEntries: [{ qualification: "Degree (Error)", institution: "University (Error)", graduationYear: "Year", grades: "N/A", description: "Details missing for academic entry.", imageUrl: "https://placehold.co/500x300/e2e8f0/475569?text=Edu&font=playfairdisplay" }],
    projects: [{ name: "Project (Error)", description: "Project details missing.", technologies: "Tech Stack Error", liveUrl: "", repoUrl: "", imageUrl: "https://placehold.co/500x350/e2e8f0/475569?text=Project&font=playfairdisplay" }],
    contactEmail: "error@example.com",
    contactLinkedin: "#", contactGithub: "#", contactInstagram: "#",
    resumeUrl: "#error_link",
    theme: "elegant",
    primaryColor: "#111827",
    backgroundColor: "#F3F4F6",
    accentColor: "#6366F1",
    showAboutSection: true,
    showFunFact: true,
    showAcademicSection: true,
    showProjectsSection: true,
    showSkillsSection: true,
    showContactSection: true,
    showResumeLink: true,
  };
  
  let fullTsx = "";
  fullTsx += "// Generated Page: " + escJsStr(data.yourName) + "'s Minimalistic Elegance Portfolio" + "\\n";
  fullTsx += "\"use client\";" + "\\n";
  fullTsx += "import React, { useState, useEffect, useRef } from 'react';" + "\\n";
  fullTsx += "import Head from 'next/head';" + "\\n";
  fullTsx += "import Image from 'next/image';" + "\\n";
  fullTsx += "import { Mail, Linkedin, Github, Instagram, Download, ExternalLink, UserCircle, Briefcase, Award, Lightbulb as FunFactIcon, ChevronDown, ChevronUp, Code, BookOpen as GraduationCap } from 'lucide-react';" + "\\n";
  fullTsx += "import type { FormSchemaType, AcademicEntryType, ProjectType } from '@/schemas/websiteFormSchema';" + "\\n";
  fullTsx += "\n";

  // Define getContrastColorForTsx globally within the generated script for TSX
  fullTsx += "const getContrastColorForTsx = (hexcolor: string | undefined): string => {" + "\\n";
  fullTsx += "  if (!hexcolor || !hexcolor.startsWith('#')) return '#000000'; // Default black for light backgrounds" + "\\n";
  fullTsx += "  let processedHex = hexcolor.slice(1);" + "\\n";
  fullTsx += "  if (processedHex.length === 3) processedHex = processedHex.split('').map(char => char + char).join('');" + "\\n";
  fullTsx += "  if (processedHex.length !== 6) return '#000000';" + "\\n";
  fullTsx += "  try {" + "\\n";
  fullTsx += "    const r = parseInt(processedHex.substring(0, 2), 16);" + "\\n";
  fullTsx += "    const g = parseInt(processedHex.substring(2, 4), 16);" + "\\n";
  fullTsx += "    const b = parseInt(processedHex.substring(4, 6), 16);" + "\\n";
  fullTsx += "    const yiq = (r * 299 + g * 587 + b * 114) / 1000;" + "\\n";
  fullTsx += "    return yiq >= 128 ? '#000000' : '#FFFFFF';" + "\\n";
  fullTsx += "  } catch (e) { return '#000000'; }" + "\\n";
  fullTsx += "};" + "\\n\\n";

  fullTsx += "const " + siteNameClean + "PortfolioPage: React.FC<{ portfolioData: FormSchemaType }> = ({ portfolioData }) => {" + "\\n";
  fullTsx += "  if (!portfolioData || !portfolioData.yourName) {" + "\\n";
  fullTsx += "    const errorDataForComponent = " + JSON.stringify(defaultErrorProps) + ";\n";
  fullTsx += "    return (" + "\\n";
  fullTsx += "      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center', color: errorDataForComponent.primaryColor, backgroundColor: errorDataForComponent.backgroundColor }}>" + "\\n";
  fullTsx += "        <h1>Error: Portfolio Data Unavailable</h1>" + "\\n";
  fullTsx += "        <p>Critical data is missing.</p>" + "\\n";
  fullTsx += "      </div>" + "\\n";
  fullTsx += "    );\n";
  fullTsx += "  }" + "\\n";
  fullTsx += "\n";
  fullTsx += "  const {\n";
  fullTsx += "    yourName,\n";
  fullTsx += "    heroTitle,\n";
  fullTsx += "    heroTagline,\n";
  fullTsx += "    heroCtaText,\n";
  fullTsx += "    heroImagePlaceholder,\n";
  fullTsx += "    aboutBio,\n";
  fullTsx += "    aboutSkills,\n";
  fullTsx += "    aboutFunFact,\n";
  fullTsx += "    academicEntries = [],\n";
  fullTsx += "    projects = [],\n";
  fullTsx += "    contactEmail,\n";
  fullTsx += "    contactLinkedin,\n";
  fullTsx += "    contactGithub,\n";
  fullTsx += "    contactInstagram,\n";
  fullTsx += "    resumeUrl,\n";
  fullTsx += "    primaryColor: userPrimaryColor = '" + escJsStr(defaultErrorProps.primaryColor) + "',\n";
  fullTsx += "    backgroundColor: userBackgroundColor = '" + escJsStr(defaultErrorProps.backgroundColor) + "',\n";
  fullTsx += "    accentColor: userAccentColor = '" + escJsStr(defaultErrorProps.accentColor) + "',\n";
  fullTsx += "    showAboutSection,\n";
  fullTsx += "    showFunFact,\n";
  fullTsx += "    showAcademicSection,\n";
  fullTsx += "    showProjectsSection,\n";
  fullTsx += "    showSkillsSection,\n";
  fullTsx += "    showContactSection,\n";
  fullTsx += "    showResumeLink,\n";
  fullTsx += "  } = portfolioData;\n";
  fullTsx += "\n";

  fullTsx += "  const css_skin_color = userAccentColor;\n";
  fullTsx += "  const css_main_bg = userBackgroundColor;\n";
  fullTsx += "  const css_primary_color_val = userPrimaryColor;\n";
  fullTsx += "\n";
  fullTsx += "  const calculatedPrimaryContrast = getContrastColorForTsx(css_primary_color_val);\n";
  fullTsx += "  const calculatedBgContrast = getContrastColorForTsx(css_main_bg);\n";
  fullTsx += "  const calculatedAccentContrast = getContrastColorForTsx(css_skin_color);\n";
  fullTsx += "\n";
  fullTsx += "  const isBgLight = calculatedBgContrast === '#000000';\n";
  fullTsx += "\n";
  fullTsx += "  const css_muted_bg = isBgLight ? \"color-mix(in srgb, \" + css_main_bg + \" 95%, #000000 5%)\" : \"color-mix(in srgb, \" + css_main_bg + \" 85%, #ffffff 15%)\";\n";
  fullTsx += "  const css_card_bg = isBgLight ? \"color-mix(in srgb, \" + css_main_bg + \" 98%, #000000 2%)\" : \"color-mix(in srgb, \" + css_main_bg + \" 90%, #ffffff 10%)\";\n";
  fullTsx += "  const css_text_muted = isBgLight ? \"color-mix(in srgb, \" + calculatedBgContrast + \" 60%, \" + css_main_bg + \" 40%)\" : \"color-mix(in srgb, \" + calculatedBgContrast + \" 70%, \" + css_main_bg + \" 30%)\";\n";
  fullTsx += "  const css_border_subtle = isBgLight ? \"color-mix(in srgb, \" + calculatedBgContrast + \" 15%, transparent)\" : \"color-mix(in srgb, \" + calculatedBgContrast + \" 20%, transparent)\";\n";
  fullTsx += "\n";

  fullTsx += "  const globalStyleTag = (\n";
  fullTsx += "    <style jsx global>{`\n";
  fullTsx += "      :root {\n";
  fullTsx += "        --preview-primary-color: ${css_primary_color_val};\n";
  fullTsx += "        --preview-bg-color: ${css_main_bg};\n";
  fullTsx += "        --preview-accent-color: ${css_skin_color};\n";
  fullTsx += "        --preview-fg-color: ${calculatedBgContrast};\n";
  fullTsx += "        --preview-primary-contrast: ${calculatedPrimaryContrast};\n";
  fullTsx += "        --preview-accent-contrast: ${calculatedAccentContrast};\n";
  fullTsx += "        --preview-muted-bg: ${css_muted_bg};\n";
  fullTsx += "        --preview-card-bg: ${css_card_bg};\n";
  fullTsx += "        --preview-text-muted: ${css_text_muted};\n";
  fullTsx += "        --preview-border-subtle: ${css_border_subtle};\n";
  fullTsx += "      }\n";
  fullTsx += "      .aos-init { opacity: 0; transition-property: opacity, transform; }\n";
  fullTsx += "      .aos-animate { opacity: 1 !important; transform: none !important; }\n";
  fullTsx += "    `}</style>\n";
  fullTsx += "  );\n";
  fullTsx += "\n";

  fullTsx += "  const [activeSection, setActiveSection] = useState('home');\n";
  fullTsx += "  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});\n";
  fullTsx += "\n";
  fullTsx += "  const navLinks = [\n";
  fullTsx += "    { id: 'home', label: 'Home', condition: true },\n";
  fullTsx += "    { id: 'about', label: 'About', condition: showAboutSection },\n";
  fullTsx += "    { id: 'academic', label: 'Education', condition: showAcademicSection && academicEntries.filter(e => e && e.qualification).length > 0 },\n";
  fullTsx += "    { id: 'projects', label: 'Portfolio', condition: showProjectsSection && projects.filter(p => p && p.name).length > 0 },\n";
  fullTsx += "    { id: 'skills', label: 'Skills', condition: showSkillsSection && aboutSkills },\n";
  fullTsx += "    { id: 'contact', label: 'Contact', condition: showContactSection },\n";
  fullTsx += "  ].filter(link => link.condition);\n";
  fullTsx += "\n";
  fullTsx += "  useEffect(() => {\n";
  fullTsx += "    const observer = new IntersectionObserver(\n";
  fullTsx += "      (entries) => {\n";
  fullTsx += "        entries.forEach(entry => {\n";
  fullTsx += "          if (entry.isIntersecting) {\n";
  fullTsx += "            const sectionId = entry.target.id;\n";
  fullTsx += "            setActiveSection(sectionId);\n";
  fullTsx += "            entry.target.classList.add('aos-animate');\n";
  fullTsx += "            entry.target.classList.remove('opacity-0', 'translate-y-10');\n";
  fullTsx += "          }\n";
  fullTsx += "        });\n";
  fullTsx += "      },\n";
  fullTsx += "      { rootMargin: '-50% 0px -50% 0px', threshold: 0.01 }\n";
  fullTsx += "    );\n";
  fullTsx += "    const currentRefs = sectionRefs.current;\n";
  fullTsx += "    Object.values(currentRefs).forEach(ref => { if (ref) observer.observe(ref); });\n";
  fullTsx += "    return () => Object.values(currentRefs).forEach(ref => { if (ref) observer.unobserve(ref); });\n";
  fullTsx += "  }, [sectionRefs, navLinks]);\n";
  fullTsx += "\n";
  fullTsx += "  const scrollToSection = (sectionId: string) => {\n";
  fullTsx += "    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });\n";
  fullTsx += "  };\n";
  fullTsx += "\n";
  fullTsx += "  const skillsArray = showSkillsSection && aboutSkills ? aboutSkills.split(',').map(s => s.trim()).filter(s => s).sort() : [];\n";
  fullTsx += "\n";

  fullTsx += "  const renderAcademicEntryTsx = (academicItemData: AcademicEntryType | undefined, itemKey: string) => {" + "\\n";
  fullTsx += "    if (!academicItemData || !academicItemData.qualification) return null;" + "\\n";
  fullTsx += "    const gradesArray = academicItemData.grades ? academicItemData.grades.split(',').map(g => g.trim()).filter(g => g) : [];" + "\\n";
  fullTsx += "    return (" + "\\n";
  fullTsx += "      <div key={itemKey} className='academic-card-elegant opacity-0 translate-y-10 mb-8 p-6 rounded-2xl shadow-xl border transition-all duration-700 hover:shadow-2xl hover:-translate-y-1' data-aos='fade-up' data-aos-delay={(parseInt(itemKey.split('-')[1]) || 0) * 100} style={{backgroundColor: 'var(--preview-card-bg)', borderColor: 'var(--preview-border-subtle)'}}>" + "\\n";
  fullTsx += "        {academicItemData.imageUrl && (" + "\\n";
  fullTsx += "          <div className='w-full h-48 mb-4 rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-500'>" + "\\n";
  fullTsx += "            <Image src={academicItemData.imageUrl} alt={academicItemData.qualification || 'Academic Achievement'} width={500} height={300} className='w-full h-full object-cover' data-ai-hint='university campus books elegant theme'/>" + "\\n";
  fullTsx += "          </div>" + "\\n";
  fullTsx += "        )}" + "\\n";
  fullTsx += "        <h4 className=\"font-['Playfair_Display',_serif] text-xl font-bold mb-1\" style={{color: 'var(--preview-primary-color)'}}>{academicItemData.qualification}</h4>" + "\\n";
  fullTsx += "        {academicItemData.institution && <p className=\"text-md font-medium text-[color:var(--preview-fg-color)] opacity-80 mb-1\">{academicItemData.institution}</p>}" + "\\n";
  fullTsx += "        {academicItemData.graduationYear && <p className=\"text-sm text-[color:var(--preview-text-muted)] mb-2\"><em>{academicItemData.graduationYear}</em></p>}" + "\\n";
  fullTsx += "        {gradesArray.length > 0 && (<div className='flex flex-wrap gap-1.5 mb-3'>" + "\\n";
  fullTsx += "          {gradesArray.map((grade, i) => (<span key={i} className='px-2.5 py-0.5 text-xs font-medium rounded-full border' style={{backgroundColor: 'var(--preview-accent-color)', color: 'var(--preview-accent-contrast)', borderColor: 'var(--preview-accent-contrast)33'}}>{grade}</span>))}" + "\\n";
  fullTsx += "        </div>)}" + "\\n";
  fullTsx += "        {academicItemData.description && <p className=\"text-sm text-[color:var(--preview-fg-color)] opacity-70 leading-relaxed\" dangerouslySetInnerHTML={{ __html: (academicItemData.description || '').replace(/\\n/g, '<br />')}}/>}" + "\\n";
  fullTsx += "      </div>" + "\\n";
  fullTsx += "    );" + "\\n";
  fullTsx += "  };" + "\\n";
  fullTsx += "\n";

  fullTsx += "  const renderProjectCardTsx = (projectItemData: ProjectType | undefined, itemKey: string) => {" + "\\n";
  fullTsx += "    if (!projectItemData || !projectItemData.name) return null;" + "\\n";
  fullTsx += "    const technologiesArray = projectItemData.technologies ? projectItemData.technologies.split(',').map(t => t.trim()).filter(t => t) : [];" + "\\n";
  fullTsx += "    return (" + "\\n";
  fullTsx += "      <div key={itemKey} className='project-card-elegant opacity-0 translate-y-10 group rounded-2xl shadow-xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:border-[color:var(--preview-accent-color)] hover:-translate-y-1' data-aos='fade-up' data-aos-delay={(parseInt(itemKey.split('-')[1]) || 0) * 150} style={{backgroundColor: 'var(--preview-card-bg)', borderColor: 'var(--preview-border-subtle)'}}>" + "\\n";
  fullTsx += "        {projectItemData.imageUrl && (" + "\\n";
  fullTsx += "          <div className='w-full h-56 overflow-hidden'>" + "\\n";
  fullTsx += "            <Image src={projectItemData.imageUrl} alt={projectItemData.name || 'Project image'} width={500} height={350} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' data-ai-hint='website screenshot elegant theme'/>" + "\\n";
  fullTsx += "          </div>" + "\\n";
  fullTsx += "        )}" + "\\n";
  fullTsx += "        <div className='p-6 relative'>" + "\\n";
  fullTsx += "          <h4 className=\"font-['Playfair_Display',_serif] text-2xl font-bold mb-2\" style={{color: 'var(--preview-primary-color)'}}>{projectItemData.name}</h4>" + "\\n";
  fullTsx += "          <div className='flex flex-wrap gap-2 mb-3'>" + "\\n";
  fullTsx += "            {technologiesArray.map((tech, idx) => (" + "\\n";
  fullTsx += "              <span key={idx} className='text-xs px-3 py-1 rounded-full font-medium' style={{backgroundColor: 'var(--preview-accent-color)', color: 'var(--preview-accent-contrast)'}}>{tech}</span>" + "\\n";
  fullTsx += "            ))}" + "\\n";
  fullTsx += "          </div>" + "\\n";
  fullTsx += "          {projectItemData.description && <p className='text-sm text-[color:var(--preview-fg-color)] opacity-70 mb-4 leading-relaxed group-hover:opacity-0 transition-opacity duration-300' dangerouslySetInnerHTML={{ __html: (projectItemData.description || '').replace(/\\n/g, '<br />')}}/>}" + "\\n";
  fullTsx += "          {projectItemData.description && <div className='absolute bottom-6 left-6 right-6 p-4 bg-black/70 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' dangerouslySetInnerHTML={{ __html: (projectItemData.description || '').replace(/\\n/g, '<br />')}}/>}" + "\\n";
  fullTsx += "          <div className='flex gap-3 mt-4'>" + "\\n";
  fullTsx += "            {projectItemData.liveUrl && <a href={projectItemData.liveUrl} target='_blank' rel='noopener noreferrer' className='inline-flex items-center px-4 py-2 text-xs font-medium rounded-md transition-transform hover:scale-105' style={{backgroundColor: 'var(--preview-accent-color)', color: 'var(--preview-accent-contrast)'}}><ExternalLink size={14} className='mr-1.5'/>Live Demo</a>}" + "\\n";
  fullTsx += "            {projectItemData.repoUrl && <a href={projectItemData.repoUrl} target='_blank' rel='noopener noreferrer' className='inline-flex items-center px-4 py-2 text-xs font-medium rounded-md border transition-colors hover:bg-white/10' style={{borderColor: 'var(--preview-accent-color)', color: 'var(--preview-accent-color)'}}><Github size={14} className='mr-1.5'/>Source Code</a>}" + "\\n";
  fullTsx += "          </div>" + "\\n";
  fullTsx += "        </div>" + "\\n";
  fullTsx += "      </div>" + "\\n";
  fullTsx += "    );" + "\\n";
  fullTsx += "  };" + "\\n";
  fullTsx += "\n";
  
  fullTsx += "  return (" + "\\n";
  fullTsx += "    <>" + "\\n";
  fullTsx += "      <Head>" + "\\n";
  fullTsx += "        <title>{yourName} - Minimalistic Elegance Portfolio</title>" + "\\n";
  fullTsx += "        <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />" + "\\n";
  fullTsx += "        <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossOrigin=\"anonymous\" />" + "\\n";
  fullTsx += "        <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&display=swap\" rel=\"stylesheet\" />" + "\\n";
  fullTsx += "      </Head>" + "\\n";
  fullTsx += "      {globalStyleTag}" + "\\n";
  fullTsx += "      <div className=\"min-h-screen flex flex-col font-['Inter',_sans-serif]\" style={{backgroundColor: 'var(--preview-bg-color)', color: 'var(--preview-fg-color)'}}>" + "\\n";
  fullTsx += "        <nav className='sticky top-0 z-50 py-4 px-6 md:px-20 backdrop-blur-md shadow-sm border-b' style={{backgroundColor: `color-mix(in srgb, var(--preview-bg-color) 80%, transparent)`, borderColor: 'var(--preview-border-subtle)'}}>" + "\\n";
  fullTsx += "          <div className='container mx-auto flex justify-between items-center max-w-6xl'>" + "\\n";
  fullTsx += "            <a href='#home' onClick={() => scrollToSection('home')} className=\"font-['Playfair_Display',_serif] text-xl font-bold\" style={{color: 'var(--preview-primary-color)'}}>{yourName}</a>" + "\\n";
  fullTsx += "            <div className='hidden md:flex space-x-6 text-sm font-medium'>" + "\\n";
  fullTsx += "              {navLinks.map(link => <a key={link.id} href={`#${link.id}`} onClick={() => scrollToSection(link.id)} className={`transition-colors hover:text-[color:var(--preview-accent-color)] ${activeSection === link.id ? 'text-[color:var(--preview-accent-color)] border-b-2 border-[color:var(--preview-accent-color)] pb-1' : 'text-[color:var(--preview-fg-color)]'}`}>{link.label}</a>)}" + "\\n";
  fullTsx += "            </div>" + "\\n";
  fullTsx += "            <div className='md:hidden'><button aria-label='Open menu' className='p-2'><Menu size={24} style={{color: 'var(--preview-fg-color)'}}/></button></div>" + "\\n"; // Conceptual mobile menu
  fullTsx += "          </div>" + "\\n";
  fullTsx += "        </nav>" + "\\n";
  fullTsx += "\n";
  fullTsx += "        <main className='flex-grow'>" + "\\n";
  fullTsx += "          <section ref={el => sectionRefs.current['home'] = el} id='home' className='min-h-[90vh] md:min-h-screen flex items-center justify-center px-6 md:px-20 py-16 text-center aos-init opacity-0 translate-y-10' data-aos='fade-in' style={{background: `linear-gradient(135deg, var(--preview-bg-color) 0%, color-mix(in srgb, var(--preview-bg-color) 70%, var(--preview-primary-color)) 100%)`}}>" + "\\n";
  fullTsx += "            <div className='max-w-3xl'>" + "\\n";
  fullTsx += "              <h1 className=\"font-['Playfair_Display',_serif] text-4xl md:text-6xl font-bold mb-4\" style={{color: 'var(--preview-primary-color)'}}>{yourName}</h1>" + "\\n";
  fullTsx += "              <h2 className='text-xl md:text-3xl font-light text-[color:var(--preview-fg-color)] opacity-80 mb-6'>{heroTitle}</h2>" + "\\n";
  fullTsx += "              {heroTagline && <p className='text-md md:text-lg text-[color:var(--preview-fg-color)] opacity-70 mb-8 leading-relaxed' dangerouslySetInnerHTML={{ __html: (heroTagline || '').replace(/\\n/g, '<br />')}}/>}" + "\\n";
  fullTsx += "              {heroCtaText && " + "\\n";
  fullTsx += "                <a href='#projects' onClick={() => scrollToSection('projects')} className='inline-block px-8 py-3 text-md font-semibold rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 group' " + "\\n";
  fullTsx += "                  style={{backgroundImage: `linear-gradient(to right, var(--preview-accent-color), color-mix(in srgb, var(--preview-accent-color) 70%, var(--preview-primary-color)))`, color: 'var(--preview-accent-contrast)'}} >" + "\\n";
  fullTsx += "                  {heroCtaText} <ChevronDown size={18} className='inline ml-2 transition-transform group-hover:translate-y-1'/>" + "\\n";
  fullTsx += "                </a>" + "\\n";
  fullTsx += "              }" + "\\n";
  fullTsx += "            </div>" + "\\n";
  fullTsx += "          </section>" + "\\n";
  fullTsx += "\n";
  fullTsx += "          {showAboutSection && (" + "\\n";
  fullTsx += "            <section ref={el => sectionRefs.current['about'] = el} id='about' className='px-6 md:px-20 py-16 md:py-24 aos-init opacity-0' data-aos='fade-up' style={{background: `linear-gradient(135deg, color-mix(in srgb, var(--preview-bg-color) 95%, ${isBgLight ? 'black' : 'white'}) 0%, color-mix(in srgb, var(--preview-bg-color) 85%, ${isBgLight ? 'black' : 'white'}) 100%)`}}>" + "\\n";
  fullTsx += "              <div className='container mx-auto max-w-5xl'>" + "\\n";
  fullTsx += "                <h2 className=\"font-['Playfair_Display',_serif] text-3xl md:text-4xl font-bold text-center mb-12\" style={{color: 'var(--preview-primary-color)'}}>About Me</h2>" + "\\n";
  fullTsx += "                <div className='flex flex-col md:flex-row items-center gap-10 md:gap-16'>" + "\\n";
  fullTsx += "                  {heroImagePlaceholder && (" + "\\n";
  fullTsx += "                     <div className='md:w-2/5 aos-init opacity-0' data-aos='fade-right' data-aos-delay='100'>" + "\\n";
  fullTsx += "                       <Image src={heroImagePlaceholder} alt={yourName || 'Profile'} width={400} height={400} className='rounded-2xl shadow-xl object-cover mx-auto border-4' style={{borderColor: 'var(--preview-accent-color)'}} data-ai-hint='professional elegant portrait'/>" + "\\n";
  fullTsx += "                     </div>" + "\\n";
  fullTsx += "                  )}" + "\\n";
  fullTsx += "                  <div className={`md:w-${heroImagePlaceholder ? '3/5' : 'full'} aos-init opacity-0`} data-aos='fade-left' data-aos-delay='200'>" + "\\n";
  fullTsx += "                    {aboutBio && <p className='text-md md:text-lg text-[color:var(--preview-fg-color)] opacity-80 leading-relaxed mb-6' dangerouslySetInnerHTML={{ __html: (aboutBio || '').replace(/\\n/g, '<br />')}}/>}" + "\\n";
  fullTsx += "                    {showFunFact && aboutFunFact && (" + "\\n";
  fullTsx += "                      <div className='mt-4 p-4 rounded-lg border-l-4 italic' style={{backgroundColor: 'var(--preview-muted-bg)', borderColor: 'var(--preview-accent-color)'}}>" + "\\n";
  fullTsx += "                        <FunFactIcon size={20} className='inline mr-2 opacity-70' style={{color: 'var(--preview-accent-color)'}}/>" + "\\n";
  fullTsx += "                        <span className='text-sm text-[color:var(--preview-text-muted)]'>{aboutFunFact}</span>" + "\\n";
  fullTsx += "                      </div>" + "\\n";
  fullTsx += "                    )}" + "\\n";
  fullTsx += "                  </div>" + "\\n";
  fullTsx += "                </div>" + "\\n";
  fullTsx += "              </div>" + "\\n";
  fullTsx += "            </section>" + "\\n";
  fullTsx += "          )}" + "\\n";
  fullTsx += "\n";
  fullTsx += "          {showAcademicSection && academicEntries && academicEntries.filter(e => e && e.qualification).length > 0 && (" + "\\n";
  fullTsx += "            <section ref={el => sectionRefs.current['academic'] = el} id='academic' className='px-6 md:px-20 py-16 md:py-24 aos-init opacity-0' data-aos='fade-up' style={{backgroundColor: `color-mix(in srgb, var(--preview-bg-color) 98%, ${isBgLight ? 'black' : 'white'})`}}>" + "\\n";
  fullTsx += "              <div className='container mx-auto max-w-4xl'>" + "\\n";
  fullTsx += "                <h2 className=\"font-['Playfair_Display',_serif] text-3xl md:text-4xl font-bold text-center mb-12\" style={{color: 'var(--preview-primary-color)'}}>Education</h2>" + "\\n";
  fullTsx += "                <div className='space-y-10'>" + "\\n";
  fullTsx += "                  {academicEntries.filter(entry => entry && entry.qualification).map((entryData, index) => renderAcademicEntryTsx(entryData, `academic-${index}`))}" + "\\n";
  fullTsx += "                </div>" + "\\n";
  fullTsx += "              </div>" + "\\n";
  fullTsx += "            </section>" + "\\n";
  fullTsx += "          )}" + "\\n";
  fullTsx += "\n";
  fullTsx += "          {showProjectsSection && projects && projects.filter(p => p && p.name).length > 0 && (" + "\\n";
  fullTsx += "            <section ref={el => sectionRefs.current['projects'] = el} id='projects' className='px-6 md:px-20 py-16 md:py-24 aos-init opacity-0' data-aos='fade-up' style={{background: `linear-gradient(to bottom, color-mix(in srgb, var(--preview-bg-color) 95%, ${isBgLight ? 'black' : 'white'}) 0%, color-mix(in srgb, var(--preview-bg-color) 85%, ${isBgLight ? 'black' : 'white'}) 100%)`}}>" + "\\n";
  fullTsx += "              <div className='container mx-auto max-w-6xl'>" + "\\n";
  fullTsx += "                <h2 className=\"font-['Playfair_Display',_serif] text-3xl md:text-4xl font-bold text-center mb-12\" style={{color: 'var(--preview-primary-color)'}}>Selected Works</h2>" + "\\n";
  fullTsx += "                <div className='grid md:grid-cols-2 gap-8 md:gap-10'>" + "\\n";
  fullTsx += "                  {projects.filter(p => p && p.name).map((projectItemData, index) => renderProjectCardTsx(projectItemData, `project-${index}`))}" + "\\n";
  fullTsx += "                </div>" + "\\n";
  fullTsx += "              </div>" + "\\n";
  fullTsx += "            </section>" + "\\n";
  fullTsx += "          )}" + "\\n";
  fullTsx += "\n";
  fullTsx += "          {showSkillsSection && skillsArray.length > 0 && (" + "\\n";
  fullTsx += "            <section ref={el => sectionRefs.current['skills'] = el} id='skills' className='px-6 md:px-20 py-16 md:py-24 relative overflow-hidden aos-init opacity-0' data-aos='fade-up' style={{backgroundColor: `color-mix(in srgb, var(--preview-bg-color) 98%, ${isBgLight ? 'black' : 'white'})`}}>" + "\\n";
  fullTsx += "              <div className='absolute inset-0 opacity-20' style={{backgroundImage: `radial-gradient(circle at center, var(--preview-accent-color)33 0%, transparent 60%)`}}></div>" + "\\n";
  fullTsx += "              <div className='container mx-auto max-w-4xl relative z-10'>" + "\\n";
  fullTsx += "                <h2 className=\"font-['Playfair_Display',_serif] text-3xl md:text-4xl font-bold text-center mb-12\" style={{color: 'var(--preview-primary-color)'}}>Expertise</h2>" + "\\n";
  fullTsx += "                <div className='flex flex-wrap justify-center items-center gap-3 md:gap-4 aos-init opacity-0' data-aos='zoom-in-up' data-aos-delay='100'>" + "\\n";
  fullTsx += "                  {skillsArray.map((skill, index) => (" + "\\n";
  fullTsx += "                    <span key={`skill-${index}`} className='skill-badge-elegant px-5 py-2.5 text-sm font-medium rounded-lg shadow-md border transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5' style={{backgroundColor: 'var(--preview-card-bg)', borderColor: 'var(--preview-border-subtle)', color: 'var(--preview-fg-color)'}}>" + "\\n";
  fullTsx += "                      <Code size={16} className='inline mr-2 opacity-70' style={{color: 'var(--preview-accent-color)'}}/> {skill}" + "\\n";
  fullTsx += "                    </span>" + "\\n";
  fullTsx += "                  ))}" + "\\n";
  fullTsx += "                </div>" + "\\n";
  fullTsx += "              </div>" + "\\n";
  fullTsx += "            </section>" + "\\n";
  fullTsx += "          )}" + "\\n";
  fullTsx += "        </main>" + "\\n";
  fullTsx += "\n";
  fullTsx += "        {showContactSection && (" + "\\n";
  fullTsx += "          <footer ref={el => sectionRefs.current['contact'] = el} id='contact' className='px-6 md:px-20 py-16 md:py-20 border-t' style={{backgroundColor: `color-mix(in srgb, var(--preview-primary-color) 95%, black)`, borderColor: `color-mix(in srgb, var(--preview-primary-contrast) 20%, transparent)`, color: 'var(--preview-primary-contrast)'}}>" + "\\n";
  fullTsx += "            <div className='container mx-auto max-w-4xl text-center'>" + "\\n";
  fullTsx += "              <h2 className=\"font-['Playfair_Display',_serif] text-3xl md:text-4xl font-bold mb-8\">Get In Touch</h2>" + "\\n";
  fullTsx += "              {contactEmail && <p className='text-lg mb-6 opacity-90'>Feel free to reach out: <a href={`mailto:${contactEmail}`} className='hover:underline' style={{color: 'var(--preview-accent-color)'}}>{contactEmail}</a></p>}" + "\\n";
  fullTsx += "              <div className='flex justify-center space-x-6 mb-8'>" + "\\n";
  fullTsx += "                {contactLinkedin && <a href={contactLinkedin} target='_blank' rel='noopener noreferrer' aria-label='LinkedIn' className='p-2 rounded-full transition-all duration-300 hover:bg-[color:var(--preview-accent-color)] hover:text-[color:var(--preview-accent-contrast)]' style={{color: 'var(--preview-primary-contrast)'}}><Linkedin size={24} /></a>}" + "\\n";
  fullTsx += "                {contactGithub && <a href={contactGithub} target='_blank' rel='noopener noreferrer' aria-label='GitHub' className='p-2 rounded-full transition-all duration-300 hover:bg-[color:var(--preview-accent-color)] hover:text-[color:var(--preview-accent-contrast)]' style={{color: 'var(--preview-primary-contrast)'}}><Github size={24} /></a>}" + "\\n";
  fullTsx += "                {contactInstagram && <a href={contactInstagram} target='_blank' rel='noopener noreferrer' aria-label='Instagram' className='p-2 rounded-full transition-all duration-300 hover:bg-[color:var(--preview-accent-color)] hover:text-[color:var(--preview-accent-contrast)]' style={{color: 'var(--preview-primary-contrast)'}}><InstagramIcon size={24} /></a>}" + "\\n";
  fullTsx += "              </div>" + "\\n";
  fullTsx += "              {showResumeLink && resumeUrl && (" + "\\n";
  fullTsx += "                <a href={resumeUrl} target='_blank' rel='noopener noreferrer' className='group relative inline-flex items-center px-6 py-2.5 text-sm font-medium rounded-lg border-2 transition-all duration-300 hover:shadow-md' style={{borderColor: 'var(--preview-accent-color)', color: 'var(--preview-accent-color)'}}>" + "\\n";
  fullTsx += "                  <Download size={16} className='mr-2 transition-transform group-hover:translate-x-1'/> View My Resume" + "\\n";
  fullTsx += "                  <span className='absolute left-0 bottom-0 h-0.5 w-0 bg-[color:var(--preview-accent-color)] transition-all duration-300 group-hover:w-full'></span>" + "\\n";
  fullTsx += "                </a>" + "\\n";
  fullTsx += "              )}" + "\\n";
  fullTsx += "              <p className='text-xs mt-10 opacity-70'>&copy; {new Date().getFullYear()} {yourName}. All rights reserved.</p>" + "\\n";
  fullTsx += "            </div>" + "\\n";
  fullTsx += "            <button onClick={() => scrollToSection('home')} title='Scroll to top' className='fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-70 hover:opacity-100' style={{backgroundColor: 'var(--preview-accent-color)', color: 'var(--preview-accent-contrast)'}} aria-label='Scroll to top'><ChevronUp size={20}/></button>" + "\\n";
  fullTsx += "          </footer>" + "\\n";
  fullTsx += "        )}" + "\\n";
  fullTsx += "      </div>" + "\\n";
  fullTsx += "    </>" + "\\n";
  fullTsx += "  );" + "\\n";
  fullTsx += "};" + "\\n";
  fullTsx += "\n";
  fullTsx += "export default function GeneratedPage() {" + "\\n";
  fullTsx += "  const rawDataString = '" + escJsStr(JSON.stringify(data)) + "';" + "\\n";
  fullTsx += "  const defaultErrorPropsElegant: FormSchemaType = " + JSON.stringify(defaultErrorProps) + ";\n";
  fullTsx += "  let propsToPass: FormSchemaType;\n";
  fullTsx += "  try {\n";
  fullTsx += "    const parsed = JSON.parse(rawDataString);\n";
  fullTsx += "    if (typeof parsed === 'object' && parsed !== null) {\n";
  fullTsx += "      propsToPass = { ...defaultErrorPropsElegant, ...parsed };\n";
  fullTsx += "      propsToPass.academicEntries = Array.isArray(parsed.academicEntries) ? parsed.academicEntries.map((entry: any) => ({...(defaultErrorPropsElegant.academicEntries && defaultErrorPropsElegant.academicEntries.length > 0 ? defaultErrorPropsElegant.academicEntries[0] : {}), ...entry})) : defaultErrorPropsElegant.academicEntries;\n";
  fullTsx += "      propsToPass.projects = Array.isArray(parsed.projects) ? parsed.projects.map((project: any) => ({...(defaultErrorPropsElegant.projects && defaultErrorPropsElegant.projects.length > 0 ? defaultErrorPropsElegant.projects[0] : {}), ...project})) : defaultErrorPropsElegant.projects;\n";
  fullTsx += "    } else {\n";
  fullTsx += "      propsToPass = defaultErrorPropsElegant;\n";
  fullTsx += "    }\n";
  fullTsx += "  } catch (e) {\n";
  fullTsx += "    console.error(\"Error parsing props in Elegant Template GeneratedPage:\", e, \"\\\\nRaw data was:\", rawDataString);\n";
  fullTsx += "    propsToPass = defaultErrorPropsElegant;\n";
  fullTsx += "  }\n";
  fullTsx += "  return <" + siteNameClean + "PortfolioPage portfolioData={propsToPass} />;\n";
  fullTsx += "}\n";

  // --- PREVIEW HTML ---
  const preview_primary_color = escCssVal(data.primaryColor);
  const preview_bg_color = escCssVal(data.backgroundColor);
  const preview_accent_color = escCssVal(data.accentColor);

  const preview_fg_color = getContrastColor(data.backgroundColor);
  const preview_primary_contrast = getContrastColor(data.primaryColor);
  const preview_accent_contrast = getContrastColor(data.accentColor);
  const preview_is_bg_light = preview_fg_color === '#000000';

  const preview_muted_bg_val = preview_is_bg_light ? escCssVal(`color-mix(in srgb, ${data.backgroundColor} 95%, #000000 5%)`) : escCssVal(`color-mix(in srgb, ${data.backgroundColor} 85%, #ffffff 15%)`);
  const preview_card_bg_val = preview_is_bg_light ? escCssVal(`color-mix(in srgb, ${data.backgroundColor} 98%, #000000 2%)`) : escCssVal(`color-mix(in srgb, ${data.backgroundColor} 90%, #ffffff 10%)`);
  const preview_text_muted_val = preview_is_bg_light ? escCssVal(`color-mix(in srgb, ${preview_fg_color} 60%, ${data.backgroundColor} 40%)`) : escCssVal(`color-mix(in srgb, ${preview_fg_color} 70%, ${data.backgroundColor} 30%)`);
  const preview_border_subtle_val = preview_is_bg_light ? escCssVal(`color-mix(in srgb, ${preview_fg_color} 15%, transparent)`) : escCssVal(`color-mix(in srgb, ${preview_fg_color} 20%, transparent)`);
  
  let inlineStyles = "";
  inlineStyles += "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&display=swap');\n";
  inlineStyles += "body, html { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; font-family: 'Inter', sans-serif; }\n";
  inlineStyles += ".template-elegant-preview-body { background-color: " + preview_bg_color + "; color: " + preview_fg_color + "; line-height: 1.7; font-size: 16px; min-height: 100vh; overflow-x:hidden; }\n";
  inlineStyles += "img { max-width: 100%; height: auto; display: block; }\n";
  inlineStyles += ".template-elegant-preview-container { max-width: 1100px; margin: 0 auto; }\n";
  inlineStyles += ".template-elegant-preview-nav { position: sticky; top: 0; z-index: 50; padding: 1rem 1.5rem; background-color: " + escCssVal(`color-mix(in srgb, ${preview_bg_color} 80%, transparent)`) + "; backdrop-filter: blur(5px); box-shadow: 0 1px 3px rgba(0,0,0,0.05); border-bottom: 1px solid " + preview_border_subtle_val + "; }\n";
  inlineStyles += ".template-elegant-preview-nav-content { display:flex; justify-content:space-between; align-items:center; max-width:1000px; margin:0 auto;}\n";
  inlineStyles += ".template-elegant-preview-logo { font-family: 'Playfair Display', serif; font-size:1.25em; font-weight:700; color:" + preview_primary_color + "; text-decoration:none;}\n";
  inlineStyles += ".template-elegant-preview-nav-links { display:flex; gap:1.5rem;}\n";
  inlineStyles += ".template-elegant-preview-nav-links a { font-size:0.875em; font-weight:500; text-decoration:none; color:" + preview_fg_color + "; transition: color 0.2s ease;}\n";
  inlineStyles += ".template-elegant-preview-nav-links a:hover { color:" + preview_accent_color + ";}\n";
  inlineStyles += ".template-elegant-preview-nav-links a.active-link-preview { color:" + preview_accent_color + "; border-bottom: 2px solid " + preview_accent_color + "; padding-bottom: 0.25rem; }\n";
  inlineStyles += ".template-elegant-preview-hero { min-height: 90vh; display:flex; align-items:center; justify-content:center; padding:4rem 1.5rem; text-align:center; background: linear-gradient(135deg, " + preview_bg_color + " 0%, " + escCssVal(`color-mix(in srgb, ${preview_bg_color} 70%, ${preview_primary_color})`) + " 100%); scroll-margin-top:80px;}\n";
  inlineStyles += ".template-elegant-preview-hero-content { max-width:700px; }\n";
  inlineStyles += ".template-elegant-preview-hero h1 { font-family: 'Playfair Display', serif; font-size:2.5em; font-weight:700; margin-bottom:0.5rem; color:" + preview_primary_color + ";} @media (min-width:768px){.template-elegant-preview-hero h1{font-size:3.5em;}}\n";
  inlineStyles += ".template-elegant-preview-hero h2 { font-family: 'Inter', sans-serif; font-size:1.25em; font-weight:300; color:" + preview_fg_color + "CC; margin-bottom:1rem;} @media (min-width:768px){.template-elegant-preview-hero h2{font-size:1.75em;}}\n";
  inlineStyles += ".template-elegant-preview-hero p.hero-tagline {font-family: 'Inter', sans-serif; font-size:1em; color:" + preview_fg_color + "B3; margin-bottom:2rem; line-height:1.8;} @media (min-width:768px){.template-elegant-preview-hero p.hero-tagline{font-size:1.1em;}}\n";
  inlineStyles += ".template-elegant-preview-hero-cta { display:inline-flex; align-items:center; padding:0.75rem 2rem; font-size:1em; font-weight:600; border-radius:0.5rem; text-decoration:none; transition:all 0.3s ease; background-image:linear-gradient(to right, " + preview_accent_color + ", " + escCssVal(`color-mix(in srgb, ${preview_accent_color} 70%, ${preview_primary_color})`) + "); color:" + preview_accent_contrast + "; box-shadow: 0 4px 15px " + preview_accent_color + "55;}\n";
  inlineStyles += ".template-elegant-preview-hero-cta:hover { box-shadow: 0 6px 20px " + preview_accent_color + "77; transform: translateY(-2px); }\n";
  inlineStyles += ".template-elegant-preview-hero-cta svg { margin-left:0.5rem; width:18px; height:18px; transition: transform 0.2s;}\n";
  inlineStyles += ".template-elegant-preview-hero-cta:hover svg { transform: translateX(3px); }\n";
  inlineStyles += ".template-elegant-preview-section { padding: 4rem 1.5rem; scroll-margin-top:80px;} @media(min-width:768px){.template-elegant-preview-section{padding: 5rem 1.5rem;}}\n";
  inlineStyles += ".template-elegant-preview-section-title { font-family: 'Playfair Display', serif; font-size:2em; font-weight:700; text-align:center; margin-bottom:3rem; color:" + preview_primary_color + ";} @media(min-width:768px){.template-elegant-preview-section-title{font-size:2.5em;}}\n";
  inlineStyles += ".template-elegant-preview-about .about-content-wrapper { display:flex; flex-direction:column; align-items:center; gap:2.5rem;} @media(min-width:768px){.template-elegant-preview-about .about-content-wrapper{flex-direction:row;}}\n";
  inlineStyles += ".template-elegant-preview-about .about-image-container { width:100%; max-width:350px;} @media(min-width:768px){.template-elegant-preview-about .about-image-container{width:40%; flex-shrink:0;}}\n";
  inlineStyles += ".template-elegant-preview-about .about-image-container img { border-radius:1rem; box-shadow:0 8px 25px rgba(0,0,0,0.1); border:3px solid "+preview_accent_color+";}\n";
  inlineStyles += ".template-elegant-preview-about .about-text-container { flex-grow:1;}\n";
  inlineStyles += ".template-elegant-preview-about .about-bio {font-family: 'Inter', sans-serif; font-size:1em; color:" + preview_fg_color + "CC; line-height:1.8; margin-bottom:1.5rem;}\n";
  inlineStyles += ".template-elegant-preview-about .fun-fact { padding:1rem; border-radius:0.5rem; border-left:4px solid " + preview_accent_color + "; background-color:" + preview_muted_bg_val + "; font-style:italic; font-size:0.9em; color:" + preview_text_muted_val + ";}\n";
  inlineStyles += ".template-elegant-preview-about .fun-fact svg {display:inline-block; margin-right:0.5rem; vertical-align:middle; color:" + preview_accent_color + "; opacity:0.7; width:18px; height:18px;}\n";
  inlineStyles += ".academic-section-preview-html { background-color: " + escCssVal(`color-mix(in srgb, ${preview_bg_color} 98%, ${preview_is_bg_light ? 'black' : 'white'})`) + ";}\n";
  inlineStyles += ".projects-section-preview-html { background: linear-gradient(to bottom, " + escCssVal(`color-mix(in srgb, ${preview_bg_color} 95%, ${preview_is_bg_light ? 'black' : 'white'})`) + " 0%, " + escCssVal(`color-mix(in srgb, ${preview_bg_color} 85%, ${preview_is_bg_light ? 'black' : 'white'})`) + " 100%);}\n";
  inlineStyles += ".projects-grid-preview-html { display:grid; gap:2rem;} @media(min-width:768px){.projects-grid-preview-html{grid-template-columns:repeat(2,1fr);}}\n";
  inlineStyles += ".academic-card-elegant-preview { background-color:" + preview_card_bg_val + "; border:1px solid "+ preview_border_subtle_val +"; margin-bottom: 2rem; padding: 1.5rem; border-radius: 1rem; box-shadow: 0 8px 16px rgba(0,0,0,0.05); }\n";
  inlineStyles += ".academic-card-elegant-preview .academic-image-wrapper-preview { width: 100%; height: 12rem; margin-bottom: 1rem; border-radius: 0.5rem; overflow: hidden; filter: grayscale(100%); transition: filter 0.3s ease; }\n";
  inlineStyles += ".academic-card-elegant-preview:hover .academic-image-wrapper-preview { filter: grayscale(0%); }\n";
  inlineStyles += ".academic-card-elegant-preview img { width: 100%; height: 100%; object-fit: cover; }\n";
  inlineStyles += ".academic-card-elegant-preview h4 { font-family: 'Playfair Display', serif; font-size: 1.25em; font-weight: 700; margin-bottom: 0.25rem; color:" + preview_primary_color + "; }\n";
  inlineStyles += ".academic-card-elegant-preview p { font-size: 1em; color:" + preview_fg_color + "CC; margin-bottom: 0.25rem; }\n";
  inlineStyles += ".academic-card-elegant-preview .meta-text-preview { font-size: 0.875em; color:" + preview_text_muted_val + "; margin-bottom: 0.5rem; }\n";
  inlineStyles += ".project-card-elegant-preview { background-color:" + preview_card_bg_val + "; border:1px solid "+ preview_border_subtle_val +"; border-radius: 1rem; box-shadow: 0 10px 20px rgba(0,0,0,0.07); overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; }\n";
  inlineStyles += ".project-card-elegant-preview:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); border-color: " + preview_accent_color + "; }\n";
  inlineStyles += ".project-card-elegant-preview .project-image-wrapper-preview { width: 100%; height: 14rem; overflow: hidden; }\n";
  inlineStyles += ".project-card-elegant-preview .project-image-wrapper-preview img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }\n";
  inlineStyles += ".project-card-elegant-preview:hover .project-image-wrapper-preview img { transform: scale(1.05); }\n";
  inlineStyles += ".project-card-elegant-preview .project-content-preview { padding: 1.5rem; }\n";
  inlineStyles += ".project-card-elegant-preview h4 { font-family: 'Playfair Display', serif; font-size: 1.5em; font-weight: 700; margin-bottom: 0.5rem; color:" + preview_primary_color + "; }\n";
  inlineStyles += ".project-card-elegant-preview .project-tech-tags-preview { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem; }\n";
  inlineStyles += ".project-card-elegant-preview .project-tech-tags-preview span { font-size: 0.75em; padding: 0.25rem 0.75rem; border-radius: 9999px; font-weight: 500; background-color:" + preview_accent_color + "; color:" + preview_accent_contrast + "; }\n";
  inlineStyles += ".project-card-elegant-preview p { font-size: 0.875em; color:" + preview_fg_color + "B3; margin-bottom: 1rem; line-height: 1.6; }\n";
  inlineStyles += ".project-card-elegant-preview .project-links-preview { display: flex; gap: 0.75rem; }\n";
  inlineStyles += ".project-card-elegant-preview .project-links-preview a { display: inline-flex; align-items: center; padding: 0.5rem 1rem; font-size: 0.75em; font-weight: 500; border-radius: 0.375rem; text-decoration: none; transition: all 0.2s ease; }\n";
  inlineStyles += ".project-card-elegant-preview .project-links-preview a.live-demo-preview { background-color:" + preview_accent_color + "; color:" + preview_accent_contrast + "; }\n";
  inlineStyles += ".project-card-elegant-preview .project-links-preview a.source-code-preview { border: 1px solid " + preview_accent_color + "; color:" + preview_accent_color + "; }\n";
  inlineStyles += ".project-card-elegant-preview .project-links-preview a:hover { filter: brightness(1.1); transform: translateY(-1px); }\n";
  inlineStyles += ".project-card-elegant-preview .project-links-preview a svg { margin-right:0.375rem; width:14px; height:14px;}\n";
  inlineStyles += ".skills-section-preview-html { background-color: " + escCssVal(`color-mix(in srgb, ${preview_bg_color} 98%, ${preview_is_bg_light ? 'black' : 'white'})`) + "; position:relative; overflow:hidden;}\n";
  inlineStyles += ".skills-section-preview-html .skills-bg-glow-preview { position:absolute; inset:0; opacity:0.2; background-image:radial-gradient(circle at center, " + preview_accent_color + "33 0%, transparent 60%);}\n";
  inlineStyles += ".skills-section-preview-html .skills-content-container-preview { position:relative; z-index:1;}\n";
  inlineStyles += ".skills-list-preview-html { display:flex; flex-wrap:wrap; justify-content:center; align-items:center; gap:0.75rem; list-style:none; padding:0;}\n";
  inlineStyles += ".skill-badge-elegant-preview-html { font-size:0.875em; padding:0.625rem 1.25rem; border-radius:0.5rem; font-weight:500; box-shadow:0 2px 5px rgba(0,0,0,0.05); border:1px solid; transition:all 0.3s ease; background-color:" + preview_card_bg_val + "; border-color:" + preview_border_subtle_val + "; color:" + preview_fg_color + ";}\n";
  inlineStyles += ".skill-badge-elegant-preview-html:hover { transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,0.1); border-color:" + preview_accent_color + "; color:" + preview_accent_color + ";}\n";
  inlineStyles += ".skill-badge-elegant-preview-html svg {display:inline-block; margin-right:0.5rem; vertical-align:middle; color:" + preview_accent_color + "; opacity:0.7; width:16px; height:16px;}\n";
  inlineStyles += "footer.template-elegant-preview-footer { padding:4rem 1.5rem 3rem 1.5rem; border-top:1px solid " + escCssVal(`color-mix(in srgb, ${preview_primary_contrast} 20%, transparent)`) + "; background-color:" + escCssVal(`color-mix(in srgb, ${preview_primary_color} 95%, black)`) + "; color:" + preview_primary_contrast + "; text-align:center;}\n";
  inlineStyles += "footer.template-elegant-preview-footer .footer-content-inner-preview {max-width:700px; margin:0 auto;}\n";
  inlineStyles += "footer.template-elegant-preview-footer .contact-title-preview { font-family: 'Playfair Display', serif; font-size:2em; font-weight:700; margin-bottom:1.5rem; color:"+preview_primary_contrast+";}\n";
  inlineStyles += "footer.template-elegant-preview-footer .contact-email-preview {font-family: 'Inter', sans-serif; font-size:1.1em; margin-bottom:1.5rem; opacity:0.9;}\n";
  inlineStyles += "footer.template-elegant-preview-footer .contact-email-preview a {color:" + preview_accent_color + "; text-decoration:none; font-weight:500;}\n";
  inlineStyles += "footer.template-elegant-preview-footer .contact-email-preview a:hover {text-decoration:underline;}\n";
  inlineStyles += "footer.template-elegant-preview-footer .social-icons-footer-preview {display:flex; justify-content:center; gap:1.5rem; margin-bottom:2rem;}\n";
  inlineStyles += "footer.template-elegant-preview-footer .social-icon-elegant-preview {display:inline-block; padding:0.5rem; border-radius:50%; transition:all 0.3s ease; color:" + preview_primary_contrast + ";}\n";
  inlineStyles += "footer.template-elegant-preview-footer .social-icon-elegant-preview:hover {background-color:" + preview_accent_color + "; color:" + preview_accent_contrast + "; transform:scale(1.1);}\n";
  inlineStyles += "footer.template-elegant-preview-footer .social-icon-elegant-preview svg {width:24px; height:24px;}\n";
  inlineStyles += "footer.template-elegant-preview-footer .resume-btn-footer-preview { display:inline-flex; align-items:center; padding:0.6rem 1.25rem; font-size:0.875em; font-weight:500; border-radius:0.5rem; border:2px solid " + preview_accent_color + "; color:" + preview_accent_color + "; text-decoration:none; transition:all 0.3s ease; position:relative; overflow:hidden;}\n";
  inlineStyles += "footer.template-elegant-preview-footer .resume-btn-footer-preview .underline-grow {content:''; position:absolute; left:50%; bottom:0; width:0; height:2px; background-color:" + preview_accent_color + "; transition:all 0.3s ease;}\n";
  inlineStyles += "footer.template-elegant-preview-footer .resume-btn-footer-preview:hover .underline-grow {width:100%; left:0;}\n";
  inlineStyles += "footer.template-elegant-preview-footer .resume-btn-footer-preview svg {margin-right:0.5rem; width:16px; height:16px;}\n";
  inlineStyles += "footer.template-elegant-preview-footer .copyright-preview {font-family: 'Inter', sans-serif; font-size:0.75em; margin-top:2.5rem; opacity:0.7;}\n";
  inlineStyles += ".scroll-to-top-btn-preview {position:fixed; bottom:1.5rem; right:1.5rem; padding:0.75rem; border-radius:50%; box-shadow:0 4px 8px rgba(0,0,0,0.1); transition:all 0.3s ease; opacity:0.7; cursor:pointer; background-color:" + preview_accent_color + "; color:" + preview_accent_contrast + "; z-index:100; border:none;}\n";
  inlineStyles += ".scroll-to-top-btn-preview:hover {opacity:1; transform:scale(1.1);}\n";
  inlineStyles += ".scroll-to-top-btn-preview svg {width:20px; height:20px;}\n";
  inlineStyles += "@media (max-width: 767px) { .template-elegant-preview-nav-links { display: none; } }"; // Hide desktop nav on mobile

  let previewHtml = "";
  previewHtml += "<html><head>";
  previewHtml += "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
  previewHtml += "<title>" + escHtml(data.yourName) + " - Minimalistic Elegance Portfolio</title>";
  previewHtml += "<style>" + escCssVal(inlineStyles) + "</style>";
  previewHtml += "</head><body class='template-elegant-preview-body'>";
  previewHtml += "<div class='template-elegant-preview-container'>";
  
  previewHtml += "<nav class='template-elegant-preview-nav'>";
  previewHtml += "<div class='template-elegant-preview-nav-content'>";
  previewHtml += "<a href='#home_preview_elegant' class='template-elegant-preview-logo'>" + escHtml(data.yourName) + "</a>";
  previewHtml += "<div class='template-elegant-preview-nav-links'>";
  const navLinksPreview = [
      { id: "home_preview_elegant", label: "Home", condition: true },
      { id: "about_preview_elegant", label: "About", condition: data.showAboutSection },
      { id: "academic_preview_elegant", label: "Education", condition: data.showAcademicSection && data.academicEntries.filter(e=>e && e.qualification).length > 0 },
      { id: "projects_preview_elegant", label: "Portfolio", condition: data.showProjectsSection && data.projects.filter(p=>p && p.name).length > 0 },
      { id: "skills_preview_elegant", label: "Skills", condition: data.showSkillsSection && data.aboutSkills },
      { id: "contact_preview_elegant", label: "Contact", condition: data.showContactSection },
  ].filter(link => link.condition);
  navLinksPreview.forEach(link => {
    previewHtml += "<a href=\"#" + link.id + "\" onclick=\"document.getElementById('" + link.id + "').scrollIntoView({behavior:'smooth'}); return false;\">" + escHtml(link.label) + "</a>";
  });
  previewHtml += "</div>";
  previewHtml += "</div></nav>";

  previewHtml += "<main>";
  previewHtml += "<section id='home_preview_elegant' class='template-elegant-preview-hero'>";
  previewHtml += "<div class='template-elegant-preview-hero-content'>";
  previewHtml += "<h1>" + escHtml(data.yourName) + "</h1>";
  previewHtml += "<h2>" + escHtml(data.heroTitle) + "</h2>";
  if (data.heroTagline) previewHtml += "<p class='hero-tagline'>" + (escHtml(data.heroTagline)).replace(/\n/g, "<br/>") + "</p>";
  if (data.heroCtaText) previewHtml += "<a href='#projects_preview_elegant' onclick=\"document.getElementById('projects_preview_elegant').scrollIntoView({behavior:'smooth'}); return false;\" class='template-elegant-preview-hero-cta'>" + escHtml(data.heroCtaText) + "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='9 18 15 12 9 6'></polyline></svg></a>";
  previewHtml += "</div></section>";

  if (data.showAboutSection) {
    previewHtml += "<section id='about_preview_elegant' class='template-elegant-preview-section template-elegant-preview-about' style='background: linear-gradient(135deg, " + escCssVal(`color-mix(in srgb, ${preview_bg_color} 95%, ${preview_is_bg_light ? 'black' : 'white'})`) + " 0%, " + escCssVal(`color-mix(in srgb, ${preview_bg_color} 85%, ${preview_is_bg_light ? 'black' : 'white'})`) + " 100%);'>";
    previewHtml += "<div style='max-width:900px; margin:0 auto;'>";
    previewHtml += "<h2 class='template-elegant-preview-section-title'>About Me</h2>";
    previewHtml += "<div class='about-content-wrapper'>";
    if (data.heroImagePlaceholder) { // Using hero image for about section
      previewHtml += "<div class='about-image-container'><img src='" + escAttr(data.heroImagePlaceholder) + "' alt='" + escAttr(data.yourName) + "' data-ai-hint='professional elegant portrait'/></div>";
    }
    previewHtml += "<div class='about-text-container'>";
    if (data.aboutBio) previewHtml += "<p class='about-bio'>" + (escHtml(data.aboutBio)).replace(/\n/g, "<br/>") + "</p>";
    if (data.showFunFact && data.aboutFunFact) {
      previewHtml += "<div class='fun-fact'><svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z'/><line x1='16' y1='8' x2='2' y2='22'/><line x1='17.5' y1='15' x2='9' y2='15'/></svg>" + (escHtml(data.aboutFunFact)).replace(/\n/g, "<br/>") + "</div>";
    }
    previewHtml += "</div></div></div></section>";
  }

  if (data.showAcademicSection && data.academicEntries && data.academicEntries.filter(e => e && e.qualification).length > 0) {
    previewHtml += "<section id='academic_preview_elegant' class='template-elegant-preview-section academic-section-preview-html'>";
    previewHtml += "<div style='max-width:800px; margin:0 auto;'>";
    previewHtml += "<h2 class='template-elegant-preview-section-title'>Education</h2>";
    previewHtml += "<div style='space-y:2.5rem;'>";
    (data.academicEntries || []).filter(e => e && e.qualification).forEach((item, index) => {
        previewHtml += renderAcademicEntryHtml(item, `academic-preview-${index}`);
    });
    previewHtml += "</div></div></section>";
  }

  if (data.showProjectsSection && data.projects && data.projects.filter(p => p && p.name).length > 0) {
    previewHtml += "<section id='projects_preview_elegant' class='template-elegant-preview-section projects-section-preview-html'>";
    previewHtml += "<div style='max-width:1000px; margin:0 auto;'>";
    previewHtml += "<h2 class='template-elegant-preview-section-title'>Selected Works</h2>";
    previewHtml += "<div class='projects-grid-preview-html'>";
    (data.projects || []).filter(p => p && p.name).forEach((item, index) => {
        previewHtml += renderProjectCardHtml(item, `project-preview-${index}`);
    });
    previewHtml += "</div></div></section>";
  }
  
  const skillsArrayPreview = data.showSkillsSection && data.aboutSkills ? data.aboutSkills.split(',').map(s => s.trim()).filter(s => s).sort() : [];
  if (skillsArrayPreview.length > 0) {
    previewHtml += "<section id='skills_preview_elegant' class='template-elegant-preview-section skills-section-preview-html'>";
    previewHtml += "<div class='skills-bg-glow-preview'></div>";
    previewHtml += "<div class='skills-content-container-preview' style='max-width:800px; margin:0 auto;'>";
    previewHtml += "<h2 class='template-elegant-preview-section-title'>Expertise</h2>";
    previewHtml += "<div class='skills-list-preview-html'>";
    skillsArrayPreview.forEach(skill => {
        previewHtml += "<span class='skill-badge-elegant-preview-html'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'></polyline></svg>" + escHtml(skill) + "</span>";
    });
    previewHtml += "</div></div></section>";
  }
  previewHtml += "</main>";

  if (data.showContactSection) {
    previewHtml += "<footer id='contact_preview_elegant' class='template-elegant-preview-footer'>";
    previewHtml += "<div class='footer-content-inner-preview'>";
    previewHtml += "<h2 class='contact-title-preview'>Get In Touch</h2>";
    if (data.contactEmail) previewHtml += "<p class='contact-email-preview'>Feel free to reach out: <a href='mailto:" + escAttr(data.contactEmail) + "'>" + escHtml(data.contactEmail) + "</a></p>";
    previewHtml += "<div class='social-icons-footer-preview'>";
    if (data.contactLinkedin) previewHtml += "<a href='" + escAttr(data.contactLinkedin) + "' target='_blank' rel='noopener noreferrer' aria-label='LinkedIn' class='social-icon-elegant-preview' title='LinkedIn'><svg viewBox='0 0 24 24' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path><rect x='2' y='9' width='4' height='12'></rect><circle cx='4' cy='4' r='2'></circle></svg></a>";
    if (data.contactGithub) previewHtml += "<a href='" + escAttr(data.contactGithub) + "' target='_blank' rel='noopener noreferrer' aria-label='GitHub' class='social-icon-elegant-preview' title='GitHub'><svg viewBox='0 0 24 24' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path></svg></a>";
    if (data.contactInstagram) previewHtml += "<a href='" + escAttr(data.contactInstagram) + "' target='_blank' rel='noopener noreferrer' aria-label='Instagram' class='social-icon-elegant-preview' title='Instagram'><svg viewBox='0 0 24 24' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='2' width='20' height='20' rx='5' ry='5'></rect><path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path><line x1='17.5' y1='6.5' x2='17.51' y2='6.5'></line></svg></a>";
    previewHtml += "</div>";
    if (data.showResumeLink && data.resumeUrl) {
      previewHtml += "<a href='" + escAttr(data.resumeUrl) + "' target='_blank' rel='noopener noreferrer' class='resume-btn-footer-preview'>";
      previewHtml += "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path><polyline points='7 10 12 15 17 10'></polyline><line x1='12' y1='15' x2='12' y2='3'></line></svg>View My Resume";
      previewHtml += "<span class='underline-grow'></span>";
      previewHtml += "</a>";
    }
    previewHtml += "<p class='copyright-preview'>&copy; " + new Date().getFullYear() + " " + escHtml(data.yourName) + ". All rights reserved.</p>";
    previewHtml += "</div>";
    previewHtml += "<button onclick=\"document.getElementById('home_preview_elegant').scrollIntoView({behavior:'smooth'});\" title='Scroll to top' class='scroll-to-top-btn-preview' aria-label='Scroll to top'><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='18 15 12 9 6 15'/></svg></button>";
    previewHtml += "</footer>";
  }
  previewHtml += "</div></body></html>";

  return { fullTsx, previewHtml };
}

// Helper function to render a single academic entry for previewHtml
const renderAcademicEntryHtml = (item: AcademicEntryType | undefined, key: string, data: FormSchemaType): string => {
  if (!item || !item.qualification) return '';
  const preview_primary_color = escCssVal(data.primaryColor);
  const preview_fg_color = getContrastColor(data.backgroundColor);
  const preview_text_muted_val = getContrastColor(data.backgroundColor) === '#000000' ? escCssVal(`color-mix(in srgb, #000000 60%, ${data.backgroundColor} 40%)`) : escCssVal(`color-mix(in srgb, #FFFFFF 70%, ${data.backgroundColor} 30%)`);
  const preview_card_bg_val = getContrastColor(data.backgroundColor) === '#000000' ? escCssVal(`color-mix(in srgb, ${data.backgroundColor} 98%, #000000 2%)`) : escCssVal(`color-mix(in srgb, ${data.backgroundColor} 90%, #ffffff 10%)`);
  const preview_border_subtle_val = getContrastColor(data.backgroundColor) === '#000000' ? escCssVal(`color-mix(in srgb, #000000 15%, transparent)`) : escCssVal(`color-mix(in srgb, #FFFFFF 20%, transparent)`);
  const preview_accent_color = escCssVal(data.accentColor);
  const preview_accent_contrast = getContrastColor(data.accentColor);


  let html = "";
  html += "<div class='academic-card-elegant-preview' style='background-color:" + preview_card_bg_val + "; border:1px solid "+ preview_border_subtle_val +";'>";
  if (item.imageUrl) {
    html += "<div class='academic-image-wrapper-preview'><img src='" + escAttr(item.imageUrl) + "' alt='" + escAttr(item.qualification || 'Academic Achievement') + "' data-ai-hint='university campus books elegant theme'/></div>";
  }
  html += "<h4 style='color:" + preview_primary_color + ";'>" + escHtml(item.qualification) + "</h4>";
  if (item.institution) html += "<p style='color:" + preview_fg_color + "CC;'>" + escHtml(item.institution) + "</p>";
  if (item.graduationYear) html += "<p class='meta-text-preview' style='color:" + preview_text_muted_val + ";'><em>" + escHtml(item.graduationYear) + "</em></p>";
  const gradesArray = item.grades ? item.grades.split(',').map(g => g.trim()).filter(g => g) : [];
  if (gradesArray.length > 0) {
    html += "<div style='display:flex; flex-wrap:wrap; gap:0.375rem; margin-bottom:0.75rem;'>";
    gradesArray.forEach(grade => {
      html += "<span style='padding:0.25rem 0.625rem; font-size:0.75em; font-weight:500; border-radius:9999px; border:1px solid " + preview_accent_contrast + "33; background-color:" + preview_accent_color + "; color:" + preview_accent_contrast + ";'>" + escHtml(grade) + "</span>";
    });
    html += "</div>";
  }
  if (item.description) html += "<p style='color:" + preview_fg_color + "B3;'>" + (escHtml(item.description)).replace(/\n/g, "<br/>") + "</p>";
  html += "</div>";
  return html;
};

// Helper function to render a single project card for previewHtml
const renderProjectCardHtml = (item: ProjectType | undefined, key: string, data: FormSchemaType): string => {
  if (!item || !item.name) return '';
  const preview_primary_color = escCssVal(data.primaryColor);
  const preview_fg_color = getContrastColor(data.backgroundColor);
  const preview_card_bg_val = getContrastColor(data.backgroundColor) === '#000000' ? escCssVal(`color-mix(in srgb, ${data.backgroundColor} 98%, #000000 2%)`) : escCssVal(`color-mix(in srgb, ${data.backgroundColor} 90%, #ffffff 10%)`);
  const preview_border_subtle_val = getContrastColor(data.backgroundColor) === '#000000' ? escCssVal(`color-mix(in srgb, #000000 15%, transparent)`) : escCssVal(`color-mix(in srgb, #FFFFFF 20%, transparent)`);
  const preview_accent_color = escCssVal(data.accentColor);
  const preview_accent_contrast = getContrastColor(data.accentColor);

  let html = "";
  html += "<div class='project-card-elegant-preview' style='background-color:" + preview_card_bg_val + "; border:1px solid "+ preview_border_subtle_val +";'>";
  if (item.imageUrl) {
    html += "<div class='project-image-wrapper-preview'><img src='" + escAttr(item.imageUrl) + "' alt='" + escAttr(item.name) + "' data-ai-hint='website screenshot elegant theme'/></div>";
  }
  html += "<div class='project-content-preview'>";
  html += "<h4 style='color:" + preview_primary_color + ";'>" + escHtml(item.name) + "</h4>";
  const technologiesArray = item.technologies ? item.technologies.split(',').map(t => t.trim()).filter(t => t) : [];
  if (technologiesArray.length > 0) {
    html += "<div class='project-tech-tags-preview'>";
    technologiesArray.forEach(tech => {
      html += "<span style='background-color:" + preview_accent_color + "; color:" + preview_accent_contrast + ";'>" + escHtml(tech) + "</span>";
    });
    html += "</div>";
  }
  if (item.description) html += "<p style='color:" + preview_fg_color + "B3;'>" + (escHtml(item.description)).replace(/\n/g, "<br/>") + "</p>";
  html += "<div class='project-links-preview'>";
  if (item.liveUrl) html += "<a href='" + escAttr(item.liveUrl) + "' target='_blank' class='live-demo-preview' style='background-color:" + preview_accent_color + "; color:" + preview_accent_contrast + ";'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'/><polyline points='15 3 21 3 21 9'/><line x1='10' y1='14' x2='21' y2='3'/></svg>Live Demo</a>";
  if (item.repoUrl) html += "<a href='" + escAttr(item.repoUrl) + "' target='_blank' class='source-code-preview' style='border-color:" + preview_accent_color + "; color:" + preview_accent_color + ";'><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'/></svg>Source Code</a>";
  html += "</div>";
  html += "</div></div>";
  return html;
};
