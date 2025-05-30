
// src/templates/corporate.ts
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
  return str.replace(/`/g, "'").replace(/"/g, "'").replace(/\\/g, '\\\\').replace(/</g, '').replace(/>/g, '');
};
// --- End Escaping Helper Functions ---

// Helper function to get contrast color - MUST BE DEFINED AT THE TOP LEVEL OF THE MODULE
function getContrastColor(hexcolor: string | undefined): string {
  if (!hexcolor || !hexcolor.startsWith('#')) return '#FFFFFF'; // Default for dark backgrounds
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

export function getCorporateTemplate(data: FormSchemaType): { fullTsx: string; previewHtml: string } {
  const siteNameClean = (data.yourName?.trim().replace(/\W+/g, '') || "CorporatePortfolioSite");

  const defaultErrorProps: FormSchemaType = {
    yourName: "Your Name (Error)",
    heroTitle: "Professional Title (Error)",
    heroTagline: "Error loading tagline. This is a placeholder description of your professional summary.",
    heroCtaText: "View My Work",
    heroImagePlaceholder: "https://placehold.co/600x400/777/FFF?text=Profile&font=inter",
    aboutBio: "Error loading biography. An experienced professional dedicated to creating impactful solutions and driving innovation.",
    aboutSkills: "Strategic Planning, Leadership, Data Analysis, Project Management, Software Development",
    aboutFunFact: "I've climbed three of the world's seven summits.",
    academicEntries: [
      { qualification: "MBA, Business Administration", institution: "Harvard Business School", graduationYear: "2015", grades: "Dean's List", description: "Specialized in corporate strategy and finance.", imageUrl: "https://placehold.co/500x300/e2e8f0/475569?text=MBA&font=inter" },
      { qualification: "B.Sc. Computer Science", institution: "Stanford University", graduationYear: "2012", grades: "Summa Cum Laude", description: "Focused on software engineering and AI.", imageUrl: "https://placehold.co/500x300/e2e8f0/475569?text=BSc&font=inter" }
    ],
    projects: [
      { name: "Project Phoenix", description: "Led a cross-functional team to redevelop a legacy enterprise system, improving performance by 40%.", technologies: "Java, Spring Boot, Microservices, AWS", liveUrl: "#", repoUrl: "#", imageUrl: "https://placehold.co/500x350/374151/F3F4F6?text=Phoenix&font=inter" },
      { name: "Market Analyzer AI", description: "Developed an AI tool for market trend prediction, increasing forecast accuracy by 25%.", technologies: "Python, TensorFlow, Scikit-learn", liveUrl: "#", repoUrl: "#", imageUrl: "https://placehold.co/500x350/374151/F3F4F6?text=AI+Analyzer&font=inter" }
    ],
    contactEmail: "contact@corporatefolio.com",
    contactLinkedin: "https://linkedin.com/in/corporateprofile",
    contactGithub: "https://github.com/corporateprofile",
    contactInstagram: "https://instagram.com/corporateprofile",
    resumeUrl: "#",
    theme: "corporate",
    primaryColor: "#1D4ED8", // Corporate Blue
    backgroundColor: "#F9FAFB", // Light Gray
    accentColor: "#10B981", // Professional Green
    showAboutSection: true,
    showFunFact: true,
    showAcademicSection: true,
    showProjectsSection: true,
    showSkillsSection: true,
    showContactSection: true,
    showResumeLink: true,
  };
  
  let fullTsx = "";
  fullTsx += "// Generated Page: " + escJsStr(data.yourName) + "'s Modern Corporate Portfolio\\n";
  fullTsx += "\"use client\";\\n";
  fullTsx += "import React, { useState, useEffect, useRef } from 'react';\\n";
  fullTsx += "import Head from 'next/head';\\n";
  fullTsx += "import Image from 'next/image';\\n";
  fullTsx += "import { Linkedin, Github, Instagram, Mail, Download, ExternalLink, Briefcase, GraduationCap, Lightbulb, ChevronUp, User, Code, Building, Award, CalendarDays } from 'lucide-react';\\n";
  fullTsx += "import type { FormSchemaType, AcademicEntryType, ProjectType } from '@/schemas/websiteFormSchema';\\n";
  fullTsx += "\\n";
  fullTsx += "const getContrastColorForTsx = (hexcolor: string | undefined): string => {" + "\\n";
  fullTsx += "  if (!hexcolor || !hexcolor.startsWith('#')) return '#FFFFFF';" + "\\n";
  fullTsx += "  let processedHex = hexcolor.slice(1);" + "\\n";
  fullTsx += "  if (processedHex.length === 3) processedHex = processedHex.split('').map(char => char + char).join('');" + "\\n";
  fullTsx += "  if (processedHex.length !== 6) return '#FFFFFF';" + "\\n";
  fullTsx += "  try {" + "\\n";
  fullTsx += "    const r = parseInt(processedHex.substring(0, 2), 16);" + "\\n";
  fullTsx += "    const g = parseInt(processedHex.substring(2, 4), 16);" + "\\n";
  fullTsx += "    const b = parseInt(processedHex.substring(4, 6), 16);" + "\\n";
  fullTsx += "    const yiq = (r * 299 + g * 587 + b * 114) / 1000;" + "\\n";
  fullTsx += "    return yiq >= 128 ? '#000000' : '#FFFFFF';" + "\\n";
  fullTsx += "  } catch (e) { return '#FFFFFF'; }" + "\\n";
  fullTsx += "};" + "\\n\\n";

  fullTsx += "const " + siteNameClean + "CorporatePortfolioPage: React.FC<{ portfolioData: FormSchemaType }> = ({ portfolioData }) => {" + "\\n";
  fullTsx += "  if (!portfolioData || typeof portfolioData.yourName === 'undefined') {" + "\\n";
  fullTsx += "    const errorDataForComponent: FormSchemaType = " + JSON.stringify(defaultErrorProps) + ";\\n";
  fullTsx += "    portfolioData = errorDataForComponent; \\n";
  fullTsx += "  }\\n";
  fullTsx += "\\n";
  fullTsx += "  const {" + "\\n";
  fullTsx += "    yourName," + "\\n";
  fullTsx += "    heroTitle," + "\\n";
  fullTsx += "    heroTagline," + "\\n";
  fullTsx += "    heroCtaText," + "\\n";
  fullTsx += "    heroImagePlaceholder," + "\\n";
  fullTsx += "    aboutBio," + "\\n";
  fullTsx += "    aboutSkills," + "\\n";
  fullTsx += "    aboutFunFact," + "\\n";
  fullTsx += "    academicEntries = []," + "\\n";
  fullTsx += "    projects = []," + "\\n";
  fullTsx += "    contactEmail," + "\\n";
  fullTsx += "    contactLinkedin," + "\\n";
  fullTsx += "    contactGithub," + "\\n";
  fullTsx += "    contactInstagram," + "\\n";
  fullTsx += "    resumeUrl," + "\\n";
  fullTsx += "    primaryColor: userPrimaryColor = '" + escJsStr(defaultErrorProps.primaryColor) + "'," + "\\n";
  fullTsx += "    backgroundColor: userBackgroundColor = '" + escJsStr(defaultErrorProps.backgroundColor) + "'," + "\\n";
  fullTsx += "    accentColor: userAccentColor = '" + escJsStr(defaultErrorProps.accentColor) + "'," + "\\n";
  fullTsx += "    showAboutSection = typeof portfolioData.showAboutSection === 'boolean' ? portfolioData.showAboutSection : true," + "\\n";
  fullTsx += "    showFunFact = typeof portfolioData.showFunFact === 'boolean' ? portfolioData.showFunFact : " + defaultErrorProps.showFunFact + "," + "\\n";
  fullTsx += "    showAcademicSection = typeof portfolioData.showAcademicSection === 'boolean' ? portfolioData.showAcademicSection : true," + "\\n";
  fullTsx += "    showProjectsSection = typeof portfolioData.showProjectsSection === 'boolean' ? portfolioData.showProjectsSection : true," + "\\n";
  fullTsx += "    showSkillsSection = typeof portfolioData.showSkillsSection === 'boolean' ? portfolioData.showSkillsSection : true," + "\\n";
  fullTsx += "    showContactSection = typeof portfolioData.showContactSection === 'boolean' ? portfolioData.showContactSection : true," + "\\n";
  fullTsx += "    showResumeLink = typeof portfolioData.showResumeLink === 'boolean' ? portfolioData.showResumeLink : true" + "\\n";
  fullTsx += "  } = portfolioData; " + "\\n";
  fullTsx += "\\n";
  fullTsx += "  const css_skin_color = userAccentColor;" + "\\n";
  fullTsx += "  const css_main_bg = userBackgroundColor;" + "\\n";
  fullTsx += "  const css_primary_color_val = userPrimaryColor;" + "\\n";
  fullTsx += "  const calculatedFgColor = getContrastColorForTsx(css_main_bg);" + "\\n";
  fullTsx += "  const calculatedPrimaryContrast = getContrastColorForTsx(css_primary_color_val);" + "\\n";
  fullTsx += "  const calculatedAccentContrast = getContrastColorForTsx(css_skin_color);" + "\\n";
  fullTsx += "  const isBgLight = calculatedFgColor === '#000000';" + "\\n";
  fullTsx += "  const css_muted_bg = isBgLight ? `color-mix(in srgb, ${css_main_bg} 95%, #000000 5%)` : `color-mix(in srgb, ${css_main_bg} 85%, #ffffff 15%)`;" + "\\n";
  fullTsx += "  const css_card_bg = isBgLight ? `color-mix(in srgb, ${css_main_bg} 98%, #000000 2%)` : `color-mix(in srgb, ${css_main_bg} 92%, #ffffff 8%)`;" + "\\n";
  fullTsx += "  const css_text_muted = isBgLight ? `color-mix(in srgb, ${calculatedFgColor} 60%, ${css_main_bg} 40%)` : `color-mix(in srgb, ${calculatedFgColor} 70%, ${css_main_bg} 30%)`;" + "\\n";
  fullTsx += "  const css_border_subtle = isBgLight ? `color-mix(in srgb, ${calculatedFgColor} 15%, transparent)` : `color-mix(in srgb, ${calculatedFgColor} 20%, transparent)`;" + "\\n";
  fullTsx += "  const leadOverlayRgb = (hex: string): string => { const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16); return `${r}, ${g}, ${b}`; };\n";
  fullTsx += "\\n";
  fullTsx += "  const dynamicGlobalStyles = (\n";
  fullTsx += "    <style jsx global>{`\n";
  fullTsx += "      body { font-family: 'Inter', sans-serif; background-color: ${css_main_bg}; color: ${calculatedFgColor}; line-height: 1.6; }\n";
  fullTsx += "      .section-padding { padding: 4rem 1.5rem; } \n";
  fullTsx += "      @media (min-width: 768px) { .section-padding { padding: 5rem 1.5rem; } }\n";
  fullTsx += "      .container-corporate { max-width: 1200px; margin-left: auto; margin-right: auto; }\n";
  fullTsx += "      .glassmorphic-card { background-color: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 1rem; box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); }\n";
  fullTsx += "      .dark .glassmorphic-card { background-color: rgba(20, 20, 30, 0.2); border-color: rgba(255, 255, 255, 0.1); }\n";
  fullTsx += "      .text-gradient { background: linear-gradient(to right, ${css_primary_color_val}, ${css_skin_color}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }\n";
  fullTsx += "      .btn-gradient { background-image: linear-gradient(to right, ${css_primary_color_val} 0%, ${css_skin_color} 50%, ${css_primary_color_val} 100%); background-size: 200% auto; color: ${calculatedPrimaryContrast}; transition: background-position 0.5s; }\n";
  fullTsx += "      .btn-gradient:hover { background-position: right center; }\n";
  fullTsx += "      .skill-chip { background-color: ${css_skin_color}; color: ${calculatedAccentContrast}; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 500; transition: transform 0.2s; }\n";
  fullTsx += "      .skill-chip:hover { transform: scale(1.1); }\n";
  fullTsx += "      .project-card-corporate:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }\n";
  fullTsx += "      .timeline-item-corporate::before { background-color: ${css_skin_color}; }\n";
  fullTsx += "      .timeline-dot-corporate { background-color: ${css_skin_color}; border-color: ${css_main_bg}; }\n";
  fullTsx += "      .footer-corporate { background-color: ${`color-mix(in srgb, ${css_main_bg} 80%, black)`}; border-top: 1px solid ${css_border_subtle}; }\n";
  fullTsx += "    `}</style>\n";
  fullTsx += "  );\n";
  fullTsx += "\n";
  fullTsx += "  const [isNavOpen, setIsNavOpen] = useState(false);\n";
  fullTsx += "  const [activeSection, setActiveSection] = useState('home');\n";
  fullTsx += "  const sectionRefs = {\n";
  fullTsx += "    home: useRef<HTMLElement>(null),\n";
  fullTsx += "    about: useRef<HTMLElement>(null),\n";
  fullTsx += "    academic: useRef<HTMLElement>(null),\n";
  fullTsx += "    projects: useRef<HTMLElement>(null),\n";
  fullTsx += "    skills: useRef<HTMLElement>(null),\n";
  fullTsx += "    contact: useRef<HTMLElement>(null),\n";
  fullTsx += "  };\n";
  fullTsx += "\n";
  fullTsx += "  const navItems = [\n";
  fullTsx += "    { id: 'home', label: 'Home', icon: <Home size={18}/>, condition: true },\n";
  fullTsx += "    { id: 'about', label: 'About', icon: <UserIcon size={18}/>, condition: showAboutSection },\n";
  fullTsx += "    { id: 'academic', label: 'Education', icon: <GraduationCap size={18}/>, condition: showAcademicSection && academicEntries && academicEntries.filter(e => e && e.qualification).length > 0 },\n";
  fullTsx += "    { id: 'projects', label: 'Work', icon: <BriefcaseIcon size={18}/>, condition: showProjectsSection && projects && projects.filter(p => p && p.name).length > 0 },\n";
  fullTsx += "    { id: 'skills', label: 'Skills', icon: <LayersIcon size={18}/>, condition: showSkillsSection && aboutSkills },\n";
  fullTsx += "    { id: 'contact', label: 'Contact', icon: <MessageSquareIcon size={18}/>, condition: showContactSection },\n";
  fullTsx += "  ].filter(link => link.condition);\n";
  fullTsx += "\n";
  fullTsx += "  const scrollToSection = (sectionId: string) => {\n";
  fullTsx += "    const section = sectionRefs[sectionId as keyof typeof sectionRefs]?.current;\n";
  fullTsx += "    if (section) {\n";
  fullTsx += "      const headerOffset = 80; // Approximate height of sticky header\n";
  fullTsx += "      const elementPosition = section.getBoundingClientRect().top + window.scrollY;\n";
  fullTsx += "      const offsetPosition = elementPosition - headerOffset;\n";
  fullTsx += "      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });\n";
  fullTsx += "    }\n";
  fullTsx += "    setIsNavOpen(false);\n";
  fullTsx += "  };\n";
  fullTsx += "\n";
  fullTsx += "  useEffect(() => {\n";
  fullTsx += "    const observerOptions = {\n";
  fullTsx += "      root: null,\n";
  fullTsx += "      rootMargin: '-50% 0px -50% 0px',\n";
  fullTsx += "      threshold: 0.01,\n";
  fullTsx += "    };\n";
  fullTsx += "\n";
  fullTsx += "    const observerCallback = (entries: IntersectionObserverEntry[]) => {\n";
  fullTsx += "      entries.forEach(entry => {\n";
  fullTsx += "        if (entry.isIntersecting) {\n";
  fullTsx += "          setActiveSection(entry.target.id);\n";
  fullTsx += "          entry.target.classList.add('aos-animate');\n";
  fullTsx += "          entry.target.classList.remove('opacity-0', 'translate-y-10');\n";
  fullTsx += "        }\n";
  fullTsx += "      });\n";
  fullTsx += "    };\n";
  fullTsx += "\n";
  fullTsx += "    const observer = new IntersectionObserver(observerCallback, observerOptions);\n";
  fullTsx += "    const sections = Object.values(sectionRefs).map(ref => ref.current).filter(el => el);\n";
  fullTsx += "    sections.forEach(section => observer.observe(section!));\n";
  fullTsx += "    return () => sections.forEach(section => observer.unobserve(section!));\n";
  fullTsx += "  }, [sectionRefs]);\n";
  fullTsx += "\n";
  fullTsx += "  const skillsArray = (showSkillsSection && aboutSkills) ? aboutSkills.split(',').map(s => s.trim()).filter(s => s) : [];\n";
  fullTsx += "\n";
  fullTsx += "  const renderAcademicEntry = (item: AcademicEntryType | undefined, index: number) => {\n";
  fullTsx += "    if (!item || !item.qualification) return null;\n";
  fullTsx += "    return (\n";
  fullTsx += "      <div key={`academic-${index}`} className='timeline-item-corporate relative pl-12 pb-8 before:absolute before:left-5 before:top-1 before:bottom-0 before:w-0.5 aos-init opacity-0 translate-y-10' data-aos='fade-up' data-aos-delay={index * 100}>\n";
  fullTsx += "        <div className='timeline-dot-corporate absolute left-[11.5px] top-1 h-5 w-5 rounded-full border-4 shadow-md' style={{borderColor: css_main_bg}}></div>\n";
  fullTsx += "        {item.graduationYear && <p className='text-sm mb-1' style={{color: css_text_muted}}><CalendarDays size={14} className='inline mr-1.5' />{item.graduationYear}</p>}\n";
  fullTsx += "        <h4 className='text-lg font-semibold mb-1' style={{color: css_primary_color_val}}>{item.qualification}</h4>\n";
  fullTsx += "        <h5 className='text-md font-medium mb-2' style={{color: calculatedFgColor}}>{item.institution}</h5>\n";
  fullTsx += "        {item.grades && <p className='text-xs italic mb-2' style={{color: css_text_muted}}>Grades: {item.grades}</p>}\n";
  fullTsx += "        {item.description && <p className='text-sm leading-relaxed' style={{color: css_text_muted}} dangerouslySetInnerHTML={{ __html: (item.description || '').replace(/\\n/g, '<br />') }} />}\n";
  fullTsx += "        {item.imageUrl && <div className='mt-3 rounded-lg overflow-hidden shadow-md'><Image src={item.imageUrl} alt={item.qualification || 'Academic image'} width={300} height={180} className='w-full h-auto object-cover' data-ai-hint='education university campus' /></div>}\n";
  fullTsx += "      </div>\n";
  fullTsx += "    );\n";
  fullTsx += "  };\n";
  fullTsx += "\n";
  fullTsx += "  const renderProjectCard = (project: ProjectType | undefined, index: number) => {\n";
  fullTsx += "    if (!project || !project.name) return null;\n";
  fullTsx += "    const projectTech = project.technologies ? project.technologies.split(',').map(t => t.trim()).filter(t => t) : [];\n";
  fullTsx += "    return (\n";
  fullTsx += "      <div key={`project-${index}`} className='project-card-corporate glassmorphic-card p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 aos-init opacity-0' data-aos='fade-up' data-aos-delay={index * 150}>\n";
  fullTsx += "        {project.imageUrl && <div className='mb-4 overflow-hidden rounded-lg shadow-md'><Image src={project.imageUrl} alt={project.name} width={500} height={350} className='w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105' data-ai-hint='website project screenshot' /></div>}\n";
  fullTsx += "        <h4 className='text-2xl font-semibold mb-2' style={{color: css_primary_color_val}}>{project.name}</h4>\n";
  fullTsx += "        {project.description && <p className='text-sm mb-4 min-h-[4.5rem]' style={{color: css_text_muted}} dangerouslySetInnerHTML={{ __html: (project.description || '').replace(/\\n/g, '<br />') }} />}\n";
  fullTsx += "        {projectTech.length > 0 && (\n";
  fullTsx += "          <div className='mb-4 flex flex-wrap gap-2'>\n";
  fullTsx += "            {projectTech.map((tech, i) => <span key={i} className='skill-chip'>{tech}</span>)}\n";
  fullTsx += "          </div>\n";
  fullTsx += "        )}\n";
  fullTsx += "        <div className='flex gap-3 mt-auto'>\n";
  fullTsx += "          {project.liveUrl && <a href={project.liveUrl} target='_blank' rel='noopener noreferrer' className='btn-gradient inline-flex items-center text-sm font-medium px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300'><ExternalLink size={16} className='mr-2'/>Live Site</a>}\n";
  fullTsx += "          {project.repoUrl && <a href={project.repoUrl} target='_blank' rel='noopener noreferrer' className='inline-flex items-center text-sm font-medium px-4 py-2 rounded-md border-2 shadow-md hover:shadow-lg transition-all duration-300' style={{borderColor: css_skin_color, color: css_skin_color}}><Github size={16} className='mr-2'/>Source Code</a>}\n";
  fullTsx += "        </div>\n";
  fullTsx += "      </div>\n";
  fullTsx += "    );\n";
  fullTsx += "  };\n";
  fullTsx += "\n";

  fullTsx += "  return (\n";
  fullTsx += "    <>\n";
  fullTsx += "      <Head>\n";
  fullTsx += "        <title>{yourName} - Corporate Portfolio</title>\n";
  fullTsx += "        <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Sora:wght@300;400;600;700;800&display=swap\" rel=\"stylesheet\" />\n";
  fullTsx += "        {/* Conceptual: If using AOS, include its CSS here */}\n";
  fullTsx += "      </Head>\n";
  fullTsx += "      {dynamicGlobalStyles}\n";
  fullTsx += "      <div className='min-h-screen flex flex-col font-[\"Inter\",_sans-serif] text-base' style={{backgroundColor: css_main_bg, color: calculatedFgColor}}>\n";
  fullTsx += "        {/* Header */}\n";
  fullTsx += "        <header className='fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent group-data-[state=scrolled]:bg-background/80 group-data-[state=scrolled]:backdrop-blur-md group-data-[state=scrolled]:shadow-lg'>\n";
  fullTsx += "          <div className='container-corporate mx-auto px-6 flex items-center justify-between h-20'>\n";
  fullTsx += "            <a href='#home' onClick={(e) => {e.preventDefault(); scrollToSection('home');}} className='text-2xl font-bold tracking-tight' style={{color: css_primary_color_val}}>\n";
  fullTsx += "              {yourName}\n";
  fullTsx += "            </a>\n";
  fullTsx += "            <nav className='hidden md:flex space-x-6'>\n";
  fullTsx += "              {navItems.map(item => (\n";
  fullTsx += "                <a key={item.id} href={`#${item.id}`} onClick={(e) => {e.preventDefault(); scrollToSection(item.id);}} \n";
  fullTsx += "                   className={`text-sm font-medium transition-colors hover:text-[${css_skin_color}] ${activeSection === item.id ? 'text-[color:var(--preview-skin-color)] border-b-2 border-[color:var(--preview-skin-color)]' : ''}\"\n";
  fullTsx += "                   style={activeSection === item.id ? {color: css_skin_color, borderColor: css_skin_color} : {color: calculatedFgColor}}>\n";
  fullTsx += "                  {item.label}\n";
  fullTsx += "                </a>\n";
  fullTsx += "              ))}\n";
  fullTsx += "            </nav>\n";
  fullTsx += "            <div className='md:hidden'>\n";
  fullTsx += "              <button onClick={() => setIsNavOpen(!isNavOpen)} className='p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[color:var(--preview-skin-color)]' style={{color: calculatedFgColor}}>\n";
  fullTsx += "                {isNavOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}\n";
  fullTsx += "              </button>\n";
  fullTsx += "            </div>\n";
  fullTsx += "          </div>\n";
  fullTsx += "          {/* Mobile Menu */}\n";
  fullTsx += "          {isNavOpen && (\n";
  fullTsx += "            <div className='md:hidden absolute top-20 left-0 right-0 shadow-lg pb-4 glassmorphic-card rounded-b-lg mx-2'>\n";
  fullTsx += "              <nav className='flex flex-col space-y-3 px-4 py-3'>\n";
  fullTsx += "                {navItems.map(item => (\n";
  fullTsx += "                  <a key={item.id} href={`#${item.id}`} onClick={(e) => {e.preventDefault(); scrollToSection(item.id);}} className='block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-[color:var(--preview-skin-color)] hover:text-[color:var(--preview-accent-contrast)]' style={activeSection === item.id ? {backgroundColor: css_skin_color, color: calculatedAccentContrast} : {color: calculatedFgColor}}>\n";
  fullTsx += "                    {item.label}\n";
  fullTsx += "                  </a>\n";
  fullTsx += "                ))}\n";
  fullTsx += "              </nav>\n";
  fullTsx += "            </div>\n";
  fullTsx += "          )}\n";
  fullTsx += "        </header>\n";
  fullTsx += "\n";
  fullTsx += "        <main className='flex-grow'>\n";
  fullTsx += "          {/* Hero Section */}\n";
  fullTsx += "          <section ref={sectionRefs.home} id='home' className='section-padding min-h-screen flex items-center relative overflow-hidden aos-init opacity-0' data-aos='fade-in' style={{background: `linear-gradient(135deg, ${css_primary_color_val}22, ${css_skin_color}22)`}}>\n";
  fullTsx += "             {/* Conceptual Particle Background - Use CSS for simplicity */}\n";
  fullTsx += "            <div className='absolute inset-0 opacity-20' style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>\n";
  fullTsx += "            <div className='container-corporate mx-auto px-6 grid md:grid-cols-2 items-center gap-12 relative z-10'>\n";
  fullTsx += "              <div className='text-center md:text-left aos-init opacity-0' data-aos='fade-right' data-aos-delay='200'>\n";
  fullTsx += "                <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 font-[\"Sora\",_sans-serif]' style={{color: css_primary_color_val}}>{yourName}</h1>\n";
  fullTsx += "                <h2 className='text-2xl sm:text-3xl md:text-4xl font-medium mb-6 text-gradient'>{heroTitle}</h2>\n";
  fullTsx += "                {heroTagline && <p className='text-lg md:text-xl mb-10 max-w-xl mx-auto md:mx-0' style={{color: css_text_muted}}>{heroTagline}</p>}\n";
  fullTsx += "                {heroCtaText && resumeUrl && showResumeLink && \n";
  fullTsx += "                  <a href={resumeUrl} target='_blank' rel='noopener noreferrer' className='btn-gradient inline-flex items-center text-lg font-semibold px-8 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'>\n";
  fullTsx += "                    {heroCtaText} <Download size={20} className='ml-2.5'/>\n";
  fullTsx += "                  </a>}\n";
  fullTsx += "              </div>\n";
  fullTsx += "              {heroImagePlaceholder && (\n";
  fullTsx += "                <div className='flex justify-center md:justify-end aos-init opacity-0' data-aos='fade-left' data-aos-delay='400'>\n";
  fullTsx += "                  <div className='relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden shadow-2xl border-4 hero-image-glow-corporate' style={{borderColor: css_skin_color}}>\n";
  fullTsx += "                     <Image src={heroImagePlaceholder} alt={yourName || 'Profile'} layout='fill' objectFit='cover' className='transition-transform duration-500 hover:scale-105' data-ai-hint='professional corporate portrait' priority />\n";
  fullTsx += "                  </div>\n";
  fullTsx += "                </div>\n";
  fullTsx += "              )}\n";
  fullTsx += "            </div>\n";
  fullTsx += "          </section>\n";
  fullTsx += "\n";
  fullTsx += "          {showAboutSection && (\n";
  fullTsx += "            <section ref={sectionRefs.about} id='about' className='section-padding aos-init opacity-0' data-aos='fade-up' style={{backgroundColor: css_muted_bg}}>\n";
  fullTsx += "              <div className='container-corporate mx-auto px-6'>\n";
  fullTsx += "                <h2 className='text-3xl md:text-4xl font-bold text-center mb-12 font-[\"Sora\",_sans-serif]' style={{color: css_primary_color_val}}>About Me</h2>\n";
  fullTsx += "                <div className='grid md:grid-cols-5 gap-12 items-center'>\n";
  fullTsx += "                  <div className='md:col-span-2 flex justify-center aos-init opacity-0' data-aos='fade-right' data-aos-delay='100'>\n";
  fullTsx += "                     <div className='relative w-64 h-64 md:w-80 md:h-80'>\n";
  fullTsx += "                       <div className='absolute inset-0 rounded-full bg-gradient-to-br from-[color:var(--preview-primary-color)] to-[color:var(--preview-skin-color)] opacity-30 animate-pulse-slow'></div>\n";
  fullTsx += "                       <UserIcon className='w-full h-full p-8 text-[color:var(--preview-primary-color)] opacity-70' />\n";
  fullTsx += "                     </div>\n";
  fullTsx += "                  </div>\n";
  fullTsx += "                  <div className='md:col-span-3 aos-init opacity-0' data-aos='fade-left' data-aos-delay='200'>\n";
  fullTsx += "                    {aboutBio && <p className='text-lg mb-6 leading-relaxed' style={{color: css_text_muted}} dangerouslySetInnerHTML={{ __html: (aboutBio || '').replace(/\\n/g, '<br />') }} />}\n";
  fullTsx += "                    {showFunFact && aboutFunFact && (\n";
  fullTsx += "                      <div className='glassmorphic-card p-4 mt-6'>\n";
  fullTsx += "                        <p className='text-sm italic flex items-center' style={{color: calculatedFgColor}}><Lightbulb size={18} className='mr-2' style={{color: css_skin_color}}/> {aboutFunFact}</p>\n";
  fullTsx += "                      </div>\n";
  fullTsx += "                    )}\n";
  fullTsx += "                  </div>\n";
  fullTsx += "                </div>\n";
  fullTsx += "              </div>\n";
  fullTsx += "            </section>\n";
  fullTsx += "          )}\n";
  fullTsx += "\n";
  fullTsx += "          {showAcademicSection && academicEntries && academicEntries.filter(e => e && e.qualification).length > 0 && (\n";
  fullTsx += "            <section ref={sectionRefs.academic} id='academic' className='section-padding aos-init opacity-0' data-aos='fade-up' style={{backgroundColor: css_main_bg}}>\n";
  fullTsx += "              <div className='container-corporate mx-auto px-6'>\n";
  fullTsx += "                <h2 className='text-3xl md:text-4xl font-bold text-center mb-16 font-[\"Sora\",_sans-serif]' style={{color: css_primary_color_val}}>Education & Credentials</h2>\n";
  fullTsx += "                <div className='relative before:absolute before:top-0 before:left-4 md:before:left-1/2 before:-ml-px before:h-full before:w-0.5 before:bg-[color:var(--preview-border-subtle)]'>\n";
  fullTsx += "                  {(academicEntries.filter(e => e && e.qualification)).map((item, index) => (\n";
  fullTsx += "                    <div key={`academic-${index}`} className={`relative pl-12 md:pl-0 mb-12 aos-init opacity-0 ${index % 2 === 0 ? 'md:text-left md:mr-[52%]' : 'md:text-right md:ml-[52%]'}`} data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'} data-aos-delay={index * 100}>\n";
  fullTsx += "                      <div className={`timeline-dot-corporate absolute top-1 h-6 w-6 rounded-full border-4 shadow-md ${index % 2 === 0 ? 'md:left-1/2 md:-ml-3' : 'md:left-1/2 md:-ml-3'}`} style={{backgroundColor: css_skin_color, borderColor: css_main_bg}}></div>\n";
  fullTsx += "                      <div className='glassmorphic-card p-6 rounded-xl shadow-lg'>\n";
  fullTsx += "                        {item.imageUrl && <div className='mb-3 rounded-md overflow-hidden'><Image src={item.imageUrl} alt={item.qualification || 'Education Image'} width={400} height={200} className='w-full h-auto object-cover' data-ai-hint='university building education' /></div>}\n";
  fullTsx += "                        <h4 className='text-xl font-semibold mb-1' style={{color: css_primary_color_val}}>{item.qualification}</h4>\n";
  fullTsx += "                        <h5 className='text-md font-medium mb-1' style={{color: calculatedFgColor}}>{item.institution}</h5>\n";
  fullTsx += "                        {item.graduationYear && <p className='text-sm mb-2' style={{color: css_text_muted}}><CalendarDays size={14} className='inline mr-1.5 opacity-80'/>{item.graduationYear}</p>}\n";
  fullTsx += "                        {item.grades && <p className='text-xs italic mb-2' style={{color: css_text_muted}}>Grades: {item.grades}</p>}\n";
  fullTsx += "                        {item.description && <p className='text-sm leading-relaxed' style={{color: css_text_muted}} dangerouslySetInnerHTML={{ __html: (item.description || '').replace(/\\n/g, '<br />') }} />}\n";
  fullTsx += "                      </div>\n";
  fullTsx += "                    </div>\n";
  fullTsx += "                  ))}\n";
  fullTsx += "                </div>\n";
  fullTsx += "              </div>\n";
  fullTsx += "            </section>\n";
  fullTsx += "          )}\n";
  fullTsx += "\n";
  fullTsx += "          {showProjectsSection && projects && projects.filter(p => p && p.name).length > 0 && (\n";
  fullTsx += "            <section ref={sectionRefs.projects} id='projects' className='section-padding aos-init opacity-0' data-aos='fade-up' style={{backgroundColor: css_muted_bg}}>\n";
  fullTsx += "              <div className='container-corporate mx-auto px-6'>\n";
  fullTsx += "                <h2 className='text-3xl md:text-4xl font-bold text-center mb-16 font-[\"Sora\",_sans-serif]' style={{color: css_primary_color_val}}>Featured Work</h2>\n";
  fullTsx += "                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10'>\n";
  fullTsx += "                  {(projects.filter(p => p && p.name)).map((project, index) => renderProjectCard(project, index))}\n";
  fullTsx += "                </div>\n";
  fullTsx += "              </div>\n";
  fullTsx += "            </section>\n";
  fullTsx += "          )}\n";
  fullTsx += "\n";
  fullTsx += "          {showSkillsSection && skillsArray.length > 0 && (\n";
  fullTsx += "            <section ref={sectionRefs.skills} id='skills' className='section-padding relative overflow-hidden aos-init opacity-0' data-aos='fade-up' style={{backgroundColor: css_main_bg}}>\n";
  fullTsx += "              <div className='absolute inset-0 opacity-10' style={{backgroundImage: 'radial-gradient(circle, var(--preview-skin-color) 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>\n";
  fullTsx += "              <div className='container-corporate mx-auto px-6 relative z-10'>\n";
  fullTsx += "                <h2 className='text-3xl md:text-4xl font-bold text-center mb-12 font-[\"Sora\",_sans-serif]' style={{color: css_primary_color_val}}>Core Competencies</h2>\n";
  fullTsx += "                <div className='flex flex-wrap justify-center items-center gap-3 md:gap-4'>\n";
  fullTsx += "                  {skillsArray.map((skill, index) => (\n";
  fullTsx += "                    <span key={`skill-${index}`} className='skill-chip px-5 py-2.5 rounded-lg shadow-md text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 aos-init opacity-0' data-aos='zoom-in' data-aos-delay={index * 50} style={{backgroundColor: css_skin_color, color: calculatedAccentContrast}}>\n";
  fullTsx += "                      {skill}\n";
  fullTsx += "                    </span>\n";
  fullTsx += "                  ))}\n";
  fullTsx += "                </div>\n";
  fullTsx += "              </div>\n";
  fullTsx += "            </section>\n";
  fullTsx += "          )}\n";
  fullTsx += "\n";
  fullTsx += "          {showContactSection && (\n";
  fullTsx += "            <footer ref={sectionRefs.contact} id='contact' className='footer-corporate section-padding aos-init opacity-0' data-aos='fade-up' style={{color: calculatedFgColor, backgroundColor: `color-mix(in srgb, ${css_main_bg} 90%, black)`}}>\n";
  fullTsx += "              <div className='container-corporate mx-auto px-6 text-center'>\n";
  fullTsx += "                <h2 className='text-3xl md:text-4xl font-bold mb-8 font-[\"Sora\",_sans-serif]' style={{color: css_primary_color_val}}>Let's Connect</h2>\n";
  fullTsx += "                {contactEmail && <p className='text-lg mb-6' style={{color: css_text_muted}}>Feel free to reach out: <a href={`mailto:${contactEmail}`} className='hover:underline' style={{color: css_skin_color}}>{contactEmail}</a></p>}\n";
  fullTsx += "                <div className='flex justify-center space-x-6 mb-8'>\n";
  fullTsx += "                  {contactLinkedin && <a href={contactLinkedin} target='_blank' rel='noopener noreferrer' aria-label='LinkedIn' className='p-3 rounded-full transition-all duration-300 hover:bg-[color:var(--preview-skin-color)] hover:text-[color:var(--preview-accent-contrast)]' style={{color: css_text_muted}}><Linkedin size={28} /></a>}\n";
  fullTsx += "                  {contactGithub && <a href={contactGithub} target='_blank' rel='noopener noreferrer' aria-label='GitHub' className='p-3 rounded-full transition-all duration-300 hover:bg-[color:var(--preview-skin-color)] hover:text-[color:var(--preview-accent-contrast)]' style={{color: css_text_muted}}><Github size={28} /></a>}\n";
  fullTsx += "                  {contactInstagram && <a href={contactInstagram} target='_blank' rel='noopener noreferrer' aria-label='Instagram' className='p-3 rounded-full transition-all duration-300 hover:bg-[color:var(--preview-skin-color)] hover:text-[color:var(--preview-accent-contrast)]' style={{color: css_text_muted}}><Instagram size={28} /></a>}\n";
  fullTsx += "                </div>\n";
  fullTsx += "                {showResumeLink && resumeUrl && (\n";
  fullTsx += "                  <a href={resumeUrl} target='_blank' rel='noopener noreferrer' className='btn-gradient inline-flex items-center text-md font-semibold px-7 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'>\n";
  fullTsx += "                    <Download size={18} className='mr-2.5'/> View Resume\n";
  fullTsx += "                  </a>\n";
  fullTsx += "                )}\n";
  fullTsx += "                <p className='text-sm mt-12' style={{color: css_text_muted}}>&copy; {new Date().getFullYear()} {yourName}. All Rights Reserved.</p>\n";
  fullTsx += "                <button onClick={() => scrollToSection('home')} title='Scroll to top' className='fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-70 hover:opacity-100 z-50' style={{backgroundColor: css_skin_color, color: calculatedAccentContrast}} aria-label='Scroll to top'><ChevronUp size={24}/></button>\n";
  fullTsx += "              </div>\n";
  fullTsx += "            </footer>\n";
  fullTsx += "          )}\n";
  fullTsx += "        </main>\n";
  fullTsx += "      </div>\n";
  fullTsx += "    </>\n";
  fullTsx += "  );\n";
  fullTsx += "};\n";
  fullTsx += "\n";
  fullTsx += "export default function GeneratedPage() {\n";
  fullTsx += "  const rawDataString = '" + escJsStr(JSON.stringify(data)) + "';\n";
  fullTsx += "  const defaultErrorPropsCorporatePage: FormSchemaType = " + JSON.stringify(defaultErrorProps) + ";\n";
  fullTsx += "  let propsToPass: FormSchemaType;\n";
  fullTsx += "  try {\n";
  fullTsx += "    const parsed = JSON.parse(rawDataString);\n";
  fullTsx += "    if (typeof parsed === 'object' && parsed !== null && typeof parsed.yourName !== 'undefined') {\n";
  fullTsx += "      propsToPass = { ...defaultErrorPropsCorporatePage, ...parsed };\n";
  fullTsx += "      propsToPass.academicEntries = Array.isArray(parsed.academicEntries) ? parsed.academicEntries.map((entry: any) => ({...(defaultErrorPropsCorporatePage.academicEntries && defaultErrorPropsCorporatePage.academicEntries.length > 0 ? defaultErrorPropsCorporatePage.academicEntries[0] : {}), ...entry})) : defaultErrorPropsCorporatePage.academicEntries;\n";
  fullTsx += "      propsToPass.projects = Array.isArray(parsed.projects) ? parsed.projects.map((project: any) => ({...(defaultErrorPropsCorporatePage.projects && defaultErrorPropsCorporatePage.projects.length > 0 ? defaultErrorPropsCorporatePage.projects[0] : {}), ...project})) : defaultErrorPropsCorporatePage.projects;\n";
  fullTsx += "    } else {\n";
  fullTsx += "      propsToPass = defaultErrorPropsCorporatePage;\n";
  fullTsx += "    }\n";
  fullTsx += "  } catch (e) {\n";
  fullTsx += "    console.error(\"Error parsing props in Corporate Template GeneratedPage:\", e, \"\\\\nRaw data was:\", rawDataString);\n";
  fullTsx += "    propsToPass = defaultErrorPropsCorporatePage;\n";
  fullTsx += "  }\n";
  fullTsx += "  return <" + siteNameClean + "CorporatePortfolioPage portfolioData={propsToPass} />;\n";
  fullTsx += "}\n";

  // --- PREVIEW HTML ---
  const {
    primaryColor: userPrimaryColorP,
    backgroundColor: userBackgroundColorP,
    accentColor: userAccentColorP,
  } = data;

  const previewAccentColor = userAccentColorP || defaultErrorProps.accentColor;
  const previewMainBg = userBackgroundColorP || defaultErrorProps.backgroundColor;
  const previewContentBg = userPrimaryColorP || defaultErrorProps.primaryColor; // For lighter content sections

  const previewFgColor = getContrastColor(previewMainBg);
  const previewContentFgColor = getContrastColor(previewContentBg);
  const previewAccentContrastColor = getContrastColor(previewAccentColor);
  const isPreviewMainBgDark = previewFgColor === '#FFFFFF';

  const previewMutedBg = isPreviewMainBgDark ? `color-mix(in srgb, ${previewMainBg} 95%, #ffffff 5%)` : `color-mix(in srgb, ${previewMainBg} 95%, #000000 5%)`;
  const previewCardBg = isPreviewMainBgDark ? `rgba(20, 20, 30, 0.5)` : `rgba(255, 255, 255, 0.7)`; // Glassmorphic card bg
  const previewBorderSubtle = isPreviewMainBgDark ? `rgba(255, 255, 255, 0.1)` : `rgba(0, 0, 0, 0.1)`;
  const previewTextMuted = isPreviewMainBgDark ? `rgba(255, 255, 255, 0.7)` : `rgba(0, 0, 0, 0.6)`;

  const renderAcademicEntryHtml = (item: AcademicEntryType | undefined, index: number): string => {
    if (!item || !item.qualification) return '';
    const isEven = index % 2 === 0;
    let html = "<div class='timeline-item-corporate-preview" + (isEven ? " md-text-left-preview" : " md-text-right-preview") + "' style='position:relative; padding-left:3rem; margin-bottom:3rem;'>";
    html += "<div class='timeline-dot-corporate-preview' style='position:absolute; top:0.25rem; left:" + (isEven ? "-0.75rem;" : "calc(100% - 0.75rem);") + " width:1.5rem; height:1.5rem; border-radius:50%; background-color:" + escCssVal(previewAccentColor) + "; border:4px solid " + escCssVal(previewMainBg) + "; box-shadow:0 0 0 3px " + escCssVal(previewAccentColor) + ";'></div>";
    html += "<div class='glassmorphic-card-preview' style='padding:1.5rem; border-radius:1rem; background-color: " + previewCardBg +"; border:1px solid " + previewBorderSubtle + "; backdrop-filter:blur(5px);'>";
    if (item.imageUrl) {
      html += "<div style='margin-bottom:0.75rem; border-radius:0.5rem; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.1);'><img src='" + escAttr(item.imageUrl) + "' alt='" + escAttr(item.qualification) + "' style='width:100%; height:auto; object-fit:cover;' data-ai-hint='education university campus'/></div>";
    }
    html += "<h4 style='font-size:1.25rem; font-weight:600; margin-bottom:0.25rem; color:" + escCssVal(previewContentBg) + ";'>" + escHtml(item.qualification) + "</h4>";
    html += "<h5 style='font-size:1rem; font-weight:500; margin-bottom:0.25rem; color:" + escCssVal(previewContentFgColor) + ";'>" + escHtml(item.institution) + "</h5>";
    if (item.graduationYear) {
      html += "<p style='font-size:0.875rem; margin-bottom:0.5rem; color:" + escCssVal(previewTextMuted) + ";'><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block; margin-right:0.375rem; opacity:0.8;\"><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" ry=\"2\"></rect><line x1=\"16\" x2=\"16\" y1=\"2\" y2=\"6\"></line><line x1=\"8\" x2=\"8\" y1=\"2\" y2=\"6\"></line><line x1=\"3\" x2=\"21\" y1=\"10\" y2=\"10\"></line></svg>" + escHtml(item.graduationYear) + "</p>";
    }
    if (item.grades) html += "<p style='font-size:0.75rem; font-style:italic; margin-bottom:0.5rem; color:" + escCssVal(previewTextMuted) + ";'>Grades: " + escHtml(item.grades) + "</p>";
    if (item.description) html += "<p style='font-size:0.875rem; line-height:1.6; color:" + escCssVal(previewTextMuted) + ";'>" + (escHtml(item.description)).replace(/\n/g, "<br/>") + "</p>";
    html += "</div></div>";
    return html;
  };

  const renderProjectCardHtml = (project: ProjectType | undefined, index: number): string => {
    if (!project || !project.name) return '';
    const projectTech = project.technologies ? project.technologies.split(',').map(t => t.trim()).filter(t => t) : [];
    let cardHtml = "<div class='project-card-corporate-preview glassmorphic-card-preview' style='padding:1.5rem; border-radius:1rem; background-color: " + previewCardBg +"; border:1px solid " + previewBorderSubtle + "; backdrop-filter:blur(5px); transition: transform 0.3s, box-shadow 0.3s;'>";
    if (project.imageUrl) {
      cardHtml += "<div style='margin-bottom:1rem; border-radius:0.5rem; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.1);'><img src='" + escAttr(project.imageUrl) + "' alt='" + escAttr(project.name) + "' style='width:100%; height:auto; object-fit:cover; transition: transform 0.3s;' data-ai-hint='website project screenshot'/></div>";
    }
    cardHtml += "<h4 style='font-size:1.5rem; font-weight:600; margin-bottom:0.5rem; color:" + escCssVal(previewContentBg) + ";'>" + escHtml(project.name) + "</h4>";
    if (project.description) cardHtml += "<p style='font-size:0.875rem; margin-bottom:1rem; min-height:3em; color:" + escCssVal(previewTextMuted) + ";'>" + (escHtml(project.description)).replace(/\n/g, "<br/>") + "</p>";
    if (projectTech.length > 0) {
      cardHtml += "<div style='margin-bottom:1rem; display:flex; flex-wrap:wrap; gap:0.5rem;'>";
      projectTech.forEach(tech => {
        cardHtml += "<span class='skill-chip-preview' style='background-color:" + escCssVal(previewAccentColor) + "; color:" + escCssVal(previewAccentContrastColor) + "; padding:0.25rem 0.75rem; border-radius:9999px; font-size:0.75rem; font-weight:500;'>"+ escHtml(tech) +"</span>";
      });
      cardHtml += "</div>";
    }
    cardHtml += "<div style='display:flex; gap:0.75rem; margin-top:auto;'>";
    if (project.liveUrl) cardHtml += "<a href='" + escAttr(project.liveUrl) + "' target='_blank' rel='noopener noreferrer' class='btn-gradient-preview' style='display:inline-flex; align-items:center; font-size:0.875rem; font-weight:500; padding:0.5rem 1rem; border-radius:0.375rem; text-decoration:none; box-shadow:0 2px 4px rgba(0,0,0,0.1);'>Live Site</a>";
    if (project.repoUrl) cardHtml += "<a href='" + escAttr(project.repoUrl) + "' target='_blank' rel='noopener noreferrer' style='display:inline-flex; align-items:center; font-size:0.875rem; font-weight:500; padding:0.5rem 1rem; border-radius:0.375rem; border:2px solid " + escCssVal(previewAccentColor) +"; color:" + escCssVal(previewAccentColor) + "; text-decoration:none; box-shadow:0 2px 4px rgba(0,0,0,0.1);'>Source Code</a>";
    cardHtml += "</div></div>";
    return cardHtml;
  };

  let inlineStyles = "";
  inlineStyles += "body, html { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; font-family: 'Inter', sans-serif; }\n";
  inlineStyles += ".template-modern-preview-body { background-color: " + escCssVal(data.backgroundColor) + "; color: " + escCssVal(calculatedFgColor) + "; line-height: 1.7; font-size: 16px; min-height: 100vh; overflow-x:hidden; }\n";
  inlineStyles += ".section-padding-preview { padding: 4rem 1.5rem; } @media (min-width: 768px) { .section-padding-preview { padding: 5rem 1.5rem; } }\n";
  inlineStyles += ".container-corporate-preview { max-width: 1200px; margin-left: auto; margin-right: auto; padding-left:1rem; padding-right:1rem; }\n";
  inlineStyles += ".glassmorphic-card-preview { background-color: " + (isPreviewMainBgDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)') +"; backdrop-filter: blur(8px); border: 1px solid " + (isPreviewMainBgDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)') + "; border-radius: 1rem; box-shadow: 0 6px 20px rgba(0,0,0,0.1); }\n";
  inlineStyles += ".text-gradient-preview { background: linear-gradient(to right, " + escCssVal(data.primaryColor) + ", " + escCssVal(data.accentColor) + "); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }\n";
  inlineStyles += ".btn-gradient-preview { background-image: linear-gradient(to right, " + escCssVal(data.primaryColor) + " 0%, " + escCssVal(data.accentColor) + " 50%, " + escCssVal(data.primaryColor) + " 100%); background-size: 200% auto; color: " + escCssVal(calculatedPrimaryContrast) + "; transition: background-position 0.5s; padding: 0.6rem 1.2rem; border-radius:0.5rem; text-decoration:none; display:inline-flex; align-items:center; font-weight:500; box-shadow:0 2px 4px rgba(0,0,0,0.1); }\n";
  inlineStyles += ".btn-gradient-preview:hover { background-position: right center; }\n";
  inlineStyles += ".btn-gradient-preview svg { margin-right: 0.5rem; width:16px; height:16px; }\n";
  inlineStyles += ".skill-chip-preview { background-color:" + escCssVal(data.accentColor) + "; color:" + escCssVal(calculatedAccentContrast) + "; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 500; transition: transform 0.2s; display:inline-block; }\n";
  inlineStyles += ".skill-chip-preview:hover { transform: scale(1.1); }\n";
  inlineStyles += ".timeline-item-corporate-preview { position:relative; padding-left:3rem; margin-bottom:3rem; } \n";
  inlineStyles += "@media (min-width:768px) { .timeline-item-corporate-preview.md-text-left-preview { margin-right:52%; text-align:left;} .timeline-item-corporate-preview.md-text-right-preview { margin-left:52%; text-align:right;} .timeline-item-corporate-preview.md-text-right-preview .timeline-dot-corporate-preview { left:auto; right:calc(100% - 0.75rem); } } \n";
  inlineStyles += ".timeline-dot-corporate-preview { position:absolute; top:0.25rem; left:-0.75rem; width:1.5rem; height:1.5rem; border-radius:50%; background-color:" + escCssVal(data.accentColor) + "; border:4px solid " + escCssVal(data.backgroundColor) + "; box-shadow:0 0 0 3px " + escCssVal(data.accentColor) + ";} \n";
  inlineStyles += "header.header-corporate-preview { position:fixed; top:0; left:0; right:0; z-index:50; transition: all 0.3s ease; background-color: transparent; } \n";
  inlineStyles += "header.header-corporate-preview.scrolled { background-color: " + escCssVal(data.backgroundColor) + "EE; backdrop-filter: blur(5px); box-shadow: 0 2px 10px rgba(0,0,0,0.1); } \n";
  inlineStyles += "nav.nav-corporate-preview { display:flex; align-items:center; justify-content:space-between; height:5rem; padding: 0 1.5rem;} @media (min-width:1024px) { nav.nav-corporate-preview {padding: 0 2.5rem;}} \n";
  inlineStyles += ".nav-logo-corporate-preview { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.025em; color: " + escCssVal(data.primaryColor) + "; text-decoration:none;} \n";
  inlineStyles += ".nav-links-desktop-corporate-preview { display:none; } @media (min-width:768px) { .nav-links-desktop-corporate-preview {display:flex; gap:1.5rem;} } \n";
  inlineStyles += ".nav-links-desktop-corporate-preview a {font-size:0.875rem; font-weight:500; color: " + escCssVal(foregroundColor) + "; text-decoration:none; transition:color 0.2s; padding-bottom:0.25rem;} \n";
  inlineStyles += ".nav-links-desktop-corporate-preview a:hover, .nav-links-desktop-corporate-preview a.active-link-preview { color: " + escCssVal(data.accentColor) + "; border-bottom: 2px solid " + escCssVal(data.accentColor) + ";} \n";
  inlineStyles += ".mobile-menu-button-corporate-preview { display:block; background:transparent; border:none; padding:0.5rem; cursor:pointer; color: " + escCssVal(foregroundColor) + "; } @media (min-width:768px) { .mobile-menu-button-corporate-preview {display:none;} } \n";
  inlineStyles += ".mobile-nav-corporate-preview { position:fixed; top:5rem; left:0; right:0; background-color:" + escCssVal(data.backgroundColor) + "F8; backdrop-filter:blur(8px); box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding:1rem; border-bottom-left-radius:0.5rem; border-bottom-right-radius:0.5rem; transition: transform 0.3s ease-out, opacity 0.3s ease-out; transform: translateY(-100%); opacity:0; visibility:hidden; } \n";
  inlineStyles += ".mobile-nav-corporate-preview.open { transform: translateY(0); opacity:1; visibility:visible; } \n";
  inlineStyles += ".mobile-nav-corporate-preview a { display:block; padding:0.75rem 1rem; text-align:center; font-size:1rem; font-weight:500; color: " + escCssVal(foregroundColor) + "; text-decoration:none; border-radius:0.375rem; transition:background-color 0.2s, color 0.2s; } \n";
  inlineStyles += ".mobile-nav-corporate-preview a:hover { background-color:" + escCssVal(data.accentColor) +"; color:"+escCssVal(accentContrast)+"; } \n";
  inlineStyles += ".hero-section-corporate-preview { display:flex; align-items:center; min-height:100vh; position:relative; overflow:hidden; background: linear-gradient(135deg, " + escCssVal(`color-mix(in srgb, ${data.primaryColor} 20%, ${data.backgroundColor})`) + " 0%, " + escCssVal(`color-mix(in srgb, ${data.accentColor} 20%, ${data.backgroundColor})`) + " 100%); scroll-margin-top:0px; } \n";
  inlineStyles += ".particle-background-preview { position: absolute; inset: 0; opacity: 0.2; overflow:hidden; } \n";
  inlineStyles += ".particle-preview { position: absolute; border-radius: 50%; background-color: " + escCssVal(foregroundColor) + "66; animation: floatParticlePreview 20s infinite linear; } \n";
  inlineStyles += "@keyframes floatParticlePreview { 0% { transform: translateY(0) translateX(0); } 25% { transform: translateY(-20px) translateX(10px); } 50% { transform: translateY(0) translateX(-10px); } 75% { transform: translateY(20px) translateX(10px); } 100% { transform: translateY(0) translateX(0); } } \n";
  inlineStyles += ".hero-content-corporate-preview { position:relative; z-index:1; display:grid; grid-template-columns:1fr; gap:3rem; align-items:center; } @media (min-width:768px){ .hero-content-corporate-preview {grid-template-columns: 3fr 2fr;} } \n";
  inlineStyles += ".hero-text-corporate-preview { text-align:center;} @media (min-width:768px){ .hero-text-corporate-preview {text-align:left;} } \n";
  inlineStyles += ".hero-text-corporate-preview h1 { font-family:'Sora', sans-serif; font-size: clamp(2.5rem, 6vw, 4rem); font-weight:800; letter-spacing:-0.025em; margin-bottom:0.5rem; color:" + escCssVal(data.primaryColor) + ";} \n";
  inlineStyles += ".hero-text-corporate-preview .text-gradient-preview { background: linear-gradient(to right, " + escCssVal(data.primaryColor) + ", " + escCssVal(data.accentColor) + "); -webkit-background-clip: text; -webkit-text-fill-color: transparent;} \n";
  inlineStyles += ".hero-text-corporate-preview h2 { font-size: clamp(1.5rem, 4vw, 2.5rem); font-weight:600; margin-bottom:1rem; color: var(--preview-text-black-900); } \n";
  inlineStyles += ".hero-text-corporate-preview p { font-size: 1rem; margin-bottom: 2rem; max-width:500px; margin-left:auto; margin-right:auto; color: var(--preview-text-black-700);} @media (min-width:768px){ .hero-text-corporate-preview p {margin-left:0; margin-right:0;} } \n";
  inlineStyles += ".hero-image-container-corporate-preview { display:flex; justify-content:center; align-items:center; } @media (min-width:768px){.hero-image-container-corporate-preview{justify-content:flex-end;}} \n";
  inlineStyles += ".hero-image-wrapper-corporate-preview { position:relative; width:280px; height:280px; border-radius:50%; overflow:hidden; box-shadow:0 0 0 10px " + escCssVal(data.backgroundColor) + ", 0 0 0 12px " + escCssVal(data.accentColor) + "; animation: heroImageGlowCorporatePreview 3s infinite alternate; } @media (min-width:768px){ .hero-image-wrapper-corporate-preview{width:350px; height:350px;} } @media (min-width:1024px){ .hero-image-wrapper-corporate-preview{width:400px; height:400px;} } \n";
  inlineStyles += "@keyframes heroImageGlowCorporatePreview { from { box-shadow: 0 0 0 10px " + escCssVal(data.backgroundColor) + ", 0 0 0 12px " + escCssVal(data.accentColor) + ", 0 0 20px 15px " + escCssVal(data.accentColor) + "55; } to { box-shadow: 0 0 0 10px " + escCssVal(data.backgroundColor) + ", 0 0 0 12px " + escCssVal(data.accentColor) + ", 0 0 35px 25px " + escCssVal(data.accentColor) + "22; } }\n";
  inlineStyles += ".hero-image-wrapper-corporate-preview img { width:100%; height:100%; object-fit:cover; transition: transform 0.5s ease-in-out; } \n";
  inlineStyles += ".hero-image-wrapper-corporate-preview:hover img { transform:scale(1.05); } \n";
  inlineStyles += ".section-title-corporate-preview { font-family:'Sora', sans-serif; font-size: clamp(2rem, 5vw, 3rem); font-weight:700; text-align:center; margin-bottom:3rem; color: " + escCssVal(data.primaryColor) + ";} \n";
  inlineStyles += ".about-section-corporate-preview { background-color: " + escCssVal(previewMutedBg) + ";} \n";
  inlineStyles += ".about-content-corporate-preview { display:grid; grid-template-columns:1fr; gap:3rem; align-items:center;} @media (min-width:768px){.about-content-corporate-preview{grid-template-columns:2fr 3fr;}} \n";
  inlineStyles += ".about-image-placeholder-corporate-preview { width: 100%; max-width:300px; height:300px; margin:0 auto; background-color: " + escCssVal(data.accentColor) + "22; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 30px "+escCssVal(data.accentColor)+"33;}\n";
  inlineStyles += ".about-image-placeholder-corporate-preview svg { width:50%; height:50%; color: " + escCssVal(data.accentColor) + "; opacity:0.7; }\n";
  inlineStyles += ".about-text-corporate-preview p { font-size:1rem; margin-bottom:1rem; line-height:1.8; color: " + escCssVal(previewTextMuted) + ";} @media (min-width:768px){.about-text-corporate-preview p{font-size:1.1rem;}}\n";
  inlineStyles += ".fun-fact-card-corporate-preview { background-color: " + previewCardBg + "; padding:1rem; border-radius:0.75rem; box-shadow:0 4px 15px rgba(0,0,0,0.05); border:1px solid " + previewBorderSubtle + "; backdrop-filter:blur(5px); margin-top:1.5rem; font-style:italic; font-size:0.9rem; display:flex; align-items:center; gap:0.5rem; color:" + escCssVal(previewContentFgColor) + ";} \n";
  inlineStyles += ".fun-fact-card-corporate-preview svg { color:" + escCssVal(data.accentColor) + "; flex-shrink:0; width:18px; height:18px;}\n";
  inlineStyles += ".academic-section-corporate-preview { background-color: " + escCssVal(data.backgroundColor) + ";} \n";
  inlineStyles += ".academic-timeline-corporate-preview { position:relative; margin-top:1rem; } \n";
  inlineStyles += ".academic-timeline-corporate-preview::before { content:''; position:absolute; top:0; left:1.125rem; bottom:0; width:2px; background-color:" + previewBorderSubtle + "; } @media (min-width:768px) { .academic-timeline-corporate-preview::before {left:50%; margin-left:-1px;} } \n";
  inlineStyles += ".skills-section-corporate-preview { background-color: " + escCssVal(previewMutedBg) + "; position:relative; overflow:hidden;} \n";
  inlineStyles += ".skills-glow-bg-preview { position:absolute; inset:0; opacity:0.1; background-image:radial-gradient(circle, " + escCssVal(data.accentColor) + " 1px, transparent 1px); background-size: 20px 20px; animation: skillsGlowPreview 20s linear infinite; } \n";
  inlineStyles += "@keyframes skillsGlowPreview { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }\n";
  inlineStyles += ".skills-grid-corporate-preview { display:flex; flex-wrap:wrap; justify-content:center; gap:0.75rem; position:relative; z-index:1;} \n";
  inlineStyles += ".contact-footer-corporate-preview { background-color: " + escCssVal(`color-mix(in srgb, ${data.backgroundColor} 90%, black)`) + "; border-top: 1px solid " + previewBorderSubtle + "; color:" + escCssVal(previewFgColor) + ";} \n";
  inlineStyles += ".contact-social-link-corporate-preview { color:" + escCssVal(previewTextMuted) + "; transition:color 0.2s; padding:0.5rem;} \n";
  inlineStyles += ".contact-social-link-corporate-preview:hover { color:" + escCssVal(data.accentColor) + "; } \n";
  inlineStyles += ".scroll-to-top-corporate-preview { position:fixed; bottom:1.5rem; right:1.5rem; padding:0.75rem; border-radius:50%; box-shadow:0 4px 8px rgba(0,0,0,0.1); transition:all 0.3s ease; opacity:0.7; cursor:pointer; z-index:50; background-color:" + escCssVal(data.accentColor) + "; color:" + escCssVal(calculatedAccentContrast) + ";} \n";
  inlineStyles += ".scroll-to-top-corporate-preview:hover { opacity:1; transform:scale(1.1);} \n";
  inlineStyles += ".aos-init { opacity:0; transform: translateY(20px); transition-property: opacity, transform; transition-duration: 0.5s; transition-timing-function: ease-out; } \n";
  inlineStyles += ".aos-animate { opacity:1 !important; transform: translateY(0) !important; } \n";

let previewHtml = "";
previewHtml += "<html><head>";
previewHtml += "<meta charset=\"UTF-8\">";
previewHtml += "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
previewHtml += "<title>" + escHtml(data.yourName) + " - Corporate Portfolio</title>";
previewHtml += "<style>" + escCssVal(inlineStyles) + "</style>";
previewHtml += "</head><body class='template-modern-preview-body'>";
previewHtml += "  <header class='header-corporate-preview' id='header_preview_corporate'>";
previewHtml += "    <nav class='container-corporate-preview nav-corporate-preview'>";
previewHtml += "      <a href='#home_preview_corporate' class='nav-logo-corporate-preview'>" + escHtml(data.yourName) + "</a>";
previewHtml += "      <div class='nav-links-desktop-corporate-preview'>";

if (data.showAboutSection) {
  previewHtml += "      <a href='#about_preview_corporate'>About</a>";
}
if (data.showAcademicSection && data.academicEntries && data.academicEntries.filter(e => e && e.qualification).length > 0) {
  previewHtml += "      <a href='#academic_preview_corporate'>Education</a>";
}
if (data.showProjectsSection && data.projects && data.projects.filter(p => p && p.name).length > 0) {
  previewHtml += "      <a href='#projects_preview_corporate'>Work</a>";
}
if (data.showSkillsSection && data.aboutSkills) {
  previewHtml += "      <a href='#skills_preview_corporate'>Skills</a>";
}
if (data.showContactSection) {
  previewHtml += "      <a href='#contact_preview_corporate'>Contact</a>";
}

previewHtml += "      </div>";
previewHtml += "      <button class='mobile-menu-button-corporate-preview' onclick='document.getElementById(\"mobile_nav_corporate_preview\").classList.toggle(\"open\")'>☰</button>";
previewHtml += "    </nav>";
previewHtml += "    <div id='mobile_nav_corporate_preview' class='mobile-nav-corporate-preview'>";

if (data.showAboutSection) {
  previewHtml += "      <a href='#about_preview_corporate' onclick='document.getElementById(\"mobile_nav_corporate_preview\").classList.remove(\"open\")'>About</a>";
}
if (data.showAcademicSection && data.academicEntries && data.academicEntries.filter(e => e && e.qualification).length > 0) {
  previewHtml += "      <a href='#academic_preview_corporate' onclick='document.getElementById(\"mobile_nav_corporate_preview\").classList.remove(\"open\")'>Education</a>";
}
if (data.showProjectsSection && data.projects && data.projects.filter(p => p && p.name).length > 0) {
  previewHtml += "      <a href='#projects_preview_corporate' onclick='document.getElementById(\"mobile_nav_corporate_preview\").classList.remove(\"open\")'>Work</a>";
}
if (data.showSkillsSection && data.aboutSkills) {
  previewHtml += "      <a href='#skills_preview_corporate' onclick='document.getElementById(\"mobile_nav_corporate_preview\").classList.remove(\"open\")'>Skills</a>";
}
if (data.showContactSection) {
  previewHtml += "      <a href='#contact_preview_corporate' onclick='document.getElementById(\"mobile_nav_corporate_preview\").classList.remove(\"open\")'>Contact</a>";
}

previewHtml += "    </div>";
previewHtml += "  </header>";


  previewHtml += "<main>";
  previewHtml += "<section id='home_preview_corporate' class='hero-section-corporate-preview section-padding-preview aos-init'>";
  previewHtml += "<div class='particle-background-preview'>";
  for(let i=0; i<20; i++) { previewHtml += "<div class='particle-preview' style='width:"+(Math.random()*3+1)+"px; height:"+(Math.random()*3+1)+"px; left:"+(Math.random()*100)+"%; top:"+(Math.random()*100)+"%; animation-delay:"+(Math.random()*-20)+"s;'></div>"; }
  previewHtml += "</div>";
  previewHtml += "<div class='container-corporate-preview hero-content-corporate-preview'>";
  previewHtml += "<div class='hero-text-corporate-preview' data-aos='fade-right' data-aos-delay='200'>";
  previewHtml += "<h1>" + escHtml(data.yourName) + "</h1>";
  previewHtml += "<h2 class='text-gradient-preview'>" + escHtml(data.heroTitle) + "</h2>";
  if(data.heroTagline) previewHtml += "<p>" + (escHtml(data.heroTagline)).replace(/\n/g, "<br/>") + "</p>";
  if(data.heroCtaText && data.resumeUrl && data.showResumeLink) previewHtml += "<a href='" + escAttr(data.resumeUrl) + "' target='_blank' rel='noopener noreferrer' class='btn-gradient-preview'><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"/></svg>" + escHtml(data.heroCtaText) + "</a>";
  previewHtml += "</div>";
  if (data.heroImagePlaceholder) {
    previewHtml += "<div class='hero-image-container-corporate-preview' data-aos='fade-left' data-aos-delay='400'>";
    previewHtml += "<div class='hero-image-wrapper-corporate-preview'><img src='" + escAttr(data.heroImagePlaceholder) + "' alt='" + escAttr(data.yourName) + "' data-ai-hint='professional corporate portrait'/></div>";
    previewHtml += "</div>";
  }
  previewHtml += "</div></section>";

  if(data.showAboutSection){
    previewHtml += "<section id='about_preview_corporate' class='about-section-corporate-preview section-padding-preview aos-init' data-aos='fade-up' style='background-color:"+ escCssVal(previewMutedBg) +"; scroll-margin-top: 80px;'>";
    previewHtml += "<div class='container-corporate-preview'>";
    previewHtml += "<h2 class='section-title-corporate-preview' style='color:"+escCssVal(data.primaryColor)+"'>About Me</h2>";
    previewHtml += "<div class='about-content-corporate-preview'>";
    previewHtml += "<div class='md:col-span-2 flex justify-center' data-aos='fade-right' data-aos-delay='100'>";
    previewHtml += "  <div class='relative w-64 h-64 md:w-80 md:h-80'>";
    previewHtml += "    <div class='absolute inset-0 rounded-full opacity-30 animate-pulse-slow' style='background:linear-gradient(to right, "+escCssVal(data.primaryColor)+", "+escCssVal(data.accentColor)+");'></div>";
    previewHtml += "    <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke='" + escCssVal(data.primaryColor) + "' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' class='opacity-70 p-8'><path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/><circle cx='12' cy='7' r='4'/></svg>";
    previewHtml += "  </div>";
    previewHtml += "</div>";
    previewHtml += "<div class='md:col-span-3' data-aos='fade-left' data-aos-delay='200'>";
    if(data.aboutBio) previewHtml += "<p style='color:"+escCssVal(previewTextMuted)+";'>" + (escHtml(data.aboutBio)).replace(/\n/g, "<br/>") + "</p>";
    if(data.showFunFact && data.aboutFunFact) {
        previewHtml += "<div class='glassmorphic-card-preview' style='margin-top:1.5rem; padding:1rem; background-color: "+ (isPreviewMainBgDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)') +"; border-color:"+previewBorderSubtle+";'>";
        previewHtml += "<p style='font-size:0.9rem; font-style:italic; display:flex; align-items:center; color:"+escCssVal(previewContentFgColor)+";'><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\""+escCssVal(data.accentColor)+"\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"margin-right:0.5rem; flex-shrink:0;\"><path d=\"M12 17.25a5.25 5.25 0 0 0 0-10.5 5.25 5.25 0 0 0 0 10.5Zm0-2.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z\"/><path d=\"M12 1a9 9 0 0 0-9 9c0 4.292 2.961 7.91 7.004 8.804a.75.75 0 0 0 .992-.717V18a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v.087A8.962 8.962 0 0 0 21 10a9 9 0 0 0-9-9Z\"/></svg>"+ escHtml(data.aboutFunFact) + "</p>";
        previewHtml += "</div>";
    }
    previewHtml += "</div></div></div></section>";
  }

  if(data.showAcademicSection && data.academicEntries && data.academicEntries.filter(e => e && e.qualification).length > 0){
    previewHtml += "<section id='academic_preview_corporate' class='section-padding-preview aos-init' data-aos='fade-up' style='background-color:" + escCssVal(data.backgroundColor) + "; scroll-margin-top: 80px;'>";
    previewHtml += "<div class='container-corporate-preview'>";
    previewHtml += "<h2 class='section-title-corporate-preview' style='color:"+escCssVal(data.primaryColor)+"'>Education & Credentials</h2>";
    previewHtml += "<div class='relative academic-timeline-corporate-preview before:absolute before:top-0 md:before:left-1/2 before:-ml-px before:h-full before:w-0.5' style='before:background-color:"+previewBorderSubtle+";'>";
    (data.academicEntries.filter(e => e && e.qualification)).forEach((item, index) => {
        if(!item) return;
        const isEven = index % 2 === 0;
        previewHtml += "<div class='timeline-item-corporate-preview" + (isEven ? " md-text-left-preview" : " md-text-right-preview") + "' style='position:relative; padding-left:3rem; margin-bottom:3rem; " + (isEven ? "margin-right:0; text-align:left;" : "margin-left:0; text-align:left;") + " @media(min-width:768px){" + (isEven ? "margin-right:52%; text-align:left;" : "margin-left:52%; text-align:right;") + "}'>";
        previewHtml += "<div class='timeline-dot-corporate-preview' style='position:absolute; top:0.25rem; width:1.5rem; height:1.5rem; border-radius:50%; box-shadow:0 0 0 3px " + escCssVal(data.accentColor) + "; background-color:" + escCssVal(data.accentColor) + "; border:4px solid " + escCssVal(data.backgroundColor) + "; " + (isEven ? "left:-0.75rem;" : "left:auto; right:calc(100% - 0.75rem);") + " @media(min-width:768px){left:50%; margin-left:-0.75rem; right:auto;}'></div>";
        previewHtml += "<div class='glassmorphic-card-preview' style='padding:1.5rem; border-radius:1rem; background-color: " + (isPreviewMainBgDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)') +"; border:1px solid " + previewBorderSubtle + "; backdrop-filter:blur(5px);'>";
        if (item.imageUrl) {
          previewHtml += "<div style='margin-bottom:0.75rem; border-radius:0.5rem; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.1);'><img src='" + escAttr(item.imageUrl) + "' alt='" + escAttr(item.qualification) + "' style='width:100%; height:auto; object-fit:cover;' data-ai-hint='education university campus'/></div>";
        }
        previewHtml += "<h4 style='font-size:1.25rem; font-weight:600; margin-bottom:0.25rem; color:" + escCssVal(data.primaryColor) + ";'>" + escHtml(item.qualification) + "</h4>";
        previewHtml += "<h5 style='font-size:1rem; font-weight:500; margin-bottom:0.25rem; color:" + escCssVal(previewFgColor) + ";'>" + escHtml(item.institution) + "</h5>";
        if (item.graduationYear) {
          previewHtml += "<p style='font-size:0.875rem; margin-bottom:0.5rem; color:" + escCssVal(previewTextMuted) + ";'><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block; margin-right:0.375rem; opacity:0.8;\"><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\" ry=\"2\"></rect><line x1=\"16\" x2=\"16\" y1=\"2\" y2=\"6\"></line><line x1=\"8\" x2=\"8\" y1=\"2\" y2=\"6\"></line><line x1=\"3\" x2=\"21\" y1=\"10\" y2=\"10\"></line></svg>" + escHtml(item.graduationYear) + "</p>";
        }
        if (item.grades) previewHtml += "<p style='font-size:0.75rem; font-style:italic; margin-bottom:0.5rem; color:" + escCssVal(previewTextMuted) + ";'>Grades: " + escHtml(item.grades) + "</p>";
        if (item.description) previewHtml += "<p style='font-size:0.875rem; line-height:1.6; color:" + escCssVal(previewTextMuted) + ";'>" + (escHtml(item.description)).replace(/\n/g, "<br/>") + "</p>";
        previewHtml += "</div></div>";
    });
    previewHtml += "</div></div></section>";
  }

  if(data.showProjectsSection && data.projects && data.projects.filter(p => p && p.name).length > 0){
    previewHtml += "<section id='projects_preview_corporate' class='section-padding-preview aos-init' data-aos='fade-up' style='background-color:" + escCssVal(previewMutedBg) + "; scroll-margin-top: 80px;'>";
    previewHtml += "<div class='container-corporate-preview'>";
    previewHtml += "<h2 class='section-title-corporate-preview' style='color:"+escCssVal(data.primaryColor)+"'>Featured Work</h2>";
    previewHtml += "<div style='display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:2rem;'>";
    (data.projects.filter(p => p && p.name)).forEach((project, index) => {
        if(!project) return;
        const projectTech = project.technologies ? project.technologies.split(',').map(t => t.trim()).filter(t => t) : [];
        previewHtml += "<div class='project-card-corporate-preview glassmorphic-card-preview' style='padding:1.5rem; border-radius:1rem; background-color: " + (isPreviewMainBgDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)') +"; border:1px solid " + previewBorderSubtle + "; backdrop-filter:blur(5px); transition: transform 0.3s, box-shadow 0.3s;'>";
        if (project.imageUrl) {
          previewHtml += "<div style='margin-bottom:1rem; border-radius:0.5rem; overflow:hidden; box-shadow:0 2px 4px rgba(0,0,0,0.1);'><img src='" + escAttr(project.imageUrl) + "' alt='" + escAttr(project.name) + "' style='width:100%; height:auto; object-fit:cover; transition: transform 0.3s;' data-ai-hint='website project screenshot'/></div>";
        }
        previewHtml += "<h4 style='font-size:1.5rem; font-weight:600; margin-bottom:0.5rem; color:" + escCssVal(previewContentBg) + ";'>" + escHtml(project.name) + "</h4>";
        if (project.description) previewHtml += "<p style='font-size:0.875rem; margin-bottom:1rem; min-height:3em; color:" + escCssVal(previewTextMuted) + ";'>" + (escHtml(project.description)).replace(/\n/g, "<br/>") + "</p>";
        if (projectTech.length > 0) {
          previewHtml += "<div style='margin-bottom:1rem; display:flex; flex-wrap:wrap; gap:0.5rem;'>";
          projectTech.forEach(tech => {
            previewHtml += "<span class='skill-chip-preview' style='background-color:" + escCssVal(previewAccentColor) + "; color:" + escCssVal(previewAccentContrastColor) + "; padding:0.25rem 0.75rem; border-radius:9999px; font-size:0.75rem; font-weight:500;'>"+ escHtml(tech) +"</span>";
          });
          previewHtml += "</div>";
        }
        previewHtml += "<div style='display:flex; gap:0.75rem; margin-top:auto;'>";
        if (project.liveUrl) previewHtml += "<a href='" + escAttr(project.liveUrl) + "' target='_blank' rel='noopener noreferrer' class='btn-gradient-preview'>Live Site</a>";
        if (project.repoUrl) previewHtml += "<a href='" + escAttr(project.repoUrl) + "' target='_blank' rel='noopener noreferrer' style='display:inline-flex; align-items:center; font-size:0.875rem; font-weight:500; padding:0.5rem 1rem; border-radius:0.375rem; border:2px solid " + escCssVal(previewAccentColor) +"; color:" + escCssVal(previewAccentColor) + "; text-decoration:none;'>Source Code</a>";
        previewHtml += "</div></div>";
    });
    previewHtml += "</div></div></section>";
  }

  if(data.showSkillsSection && data.aboutSkills){
    const skillsArrayPreview = data.aboutSkills.split(',').map(s => s.trim()).filter(s => s);
    if(skillsArrayPreview.length > 0){
      previewHtml += "<section id='skills_preview_corporate' class='skills-section-corporate-preview section-padding-preview aos-init' data-aos='fade-up' style='background-color:" + escCssVal(previewMutedBg) + "; scroll-margin-top: 80px;'>";
      previewHtml += "<div class='skills-glow-bg-preview'></div>";
      previewHtml += "<div class='container-corporate-preview relative z-10'>";
      previewHtml += "<h2 class='section-title-corporate-preview' style='color:"+escCssVal(data.primaryColor)+"'>Core Competencies</h2>";
      previewHtml += "<div class='skills-grid-corporate-preview'>";
      skillsArrayPreview.forEach(skill => {
          previewHtml += "<span class='skill-chip-preview' style='background-color:" + escCssVal(previewAccentColor) + "; color:" + escCssVal(previewAccentContrastColor) + "; padding: 0.5rem 1rem; border-radius:0.5rem;'>"+ escHtml(skill) +"</span>";
      });
      previewHtml += "</div></div></section>";
    }
  }
  
  if(data.showContactSection){
    previewHtml += "<footer id='contact_preview_corporate' class='contact-footer-corporate-preview section-padding-preview aos-init' data-aos='fade-up' style='color:" + escCssVal(previewFgColor) + "; background-color: " + escCssVal(`color-mix(in srgb, ${data.backgroundColor} 90%, black)`) + "; scroll-margin-top: 80px;'>";
    previewHtml += "<div class='container-corporate-preview text-center'>";
    previewHtml += "<h2 class='section-title-corporate-preview' style='color:"+escCssVal(data.primaryColor)+"'>Let's Connect</h2>";
    if(data.contactEmail) previewHtml += "<p style='font-size:1.25rem; margin-bottom:1.5rem; color:" + escCssVal(previewTextMuted) + "'>Feel free to reach out: <a href='mailto:" + escAttr(data.contactEmail) + "' style='color:" + escCssVal(previewAccentColor) + "; text-decoration:none; hover:text-decoration:underline;'>" + escHtml(data.contactEmail) + "</a></p>";
    previewHtml += "<div style='display:flex; justify-content:center; gap:1.5rem; margin-bottom:2rem;'>";
    if(data.contactLinkedin) previewHtml += "<a href='" + escAttr(data.contactLinkedin) + "' target='_blank' rel='noopener noreferrer' class='contact-social-link-corporate-preview' aria-label='LinkedIn'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'/><rect width='4' height='12' x='2' y='9'/><circle cx='4' cy='4' r='2'/></svg></a>";
    if(data.contactGithub) previewHtml += "<a href='" + escAttr(data.contactGithub) + "' target='_blank' rel='noopener noreferrer' class='contact-social-link-corporate-preview' aria-label='GitHub'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'/><path d='M9 18c-4.51 2-5-2-7-2'/></svg></a>";
    if(data.contactInstagram) previewHtml += "<a href='" + escAttr(data.contactInstagram) + "' target='_blank' rel='noopener noreferrer' class='contact-social-link-corporate-preview' aria-label='Instagram'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect width='20' height='20' x='2' y='2' rx='5' ry='5'/><path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'/><line x1='17.5' x2='17.51' y1='6.5' y2='6.5'/></svg></a>";
    previewHtml += "</div>";
    if(data.showResumeLink && data.resumeUrl) {
        previewHtml += "<a href='" + escAttr(data.resumeUrl) + "' target='_blank' rel='noopener noreferrer' class='btn-gradient-preview' style='padding:0.8rem 1.8rem;'><svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='margin-right:0.625rem;'><path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"/></svg> View Resume</a>";
    }
    previewHtml += "<p style='font-size:0.875rem; margin-top:3rem; color:" + escCssVal(previewTextMuted) + ";'>&copy; " + new Date().getFullYear() + " " + escHtml(data.yourName) + ". All Rights Reserved.</p>";
    previewHtml += "<button onclick='window.scrollTo({top:0, behavior: \\'smooth\\'})' title='Scroll to top' class='scroll-to-top-corporate-preview' aria-label='Scroll to top'><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m18 15-6-6-6 6'/></svg></button>";
    previewHtml += "</div></footer>";
  }
  previewHtml += "</main></div>";
  
  previewHtml += "<script>\n";
  previewHtml += "  document.addEventListener('DOMContentLoaded', function() {\n";
  previewHtml += "    const header = document.getElementById('header_preview_corporate');\n";
  previewHtml += "    const handleScroll = () => { if (window.scrollY > 50) { header.classList.add('scrolled'); } else { header.classList.remove('scrolled'); } };\n";
  previewHtml += "    window.addEventListener('scroll', handleScroll, { passive: true });\n";
  previewHtml += "    const mobileMenuButton = document.querySelector('.mobile-menu-button-corporate-preview');\n";
  previewHtml += "    const mobileNav = document.getElementById('mobile_nav_corporate_preview');\n";
  previewHtml += "    if (mobileMenuButton && mobileNav) {\n";
  previewHtml += "      mobileMenuButton.addEventListener('click', () => mobileNav.classList.toggle('open'));\n";
  previewHtml += "      document.querySelectorAll('#mobile_nav_corporate_preview a').forEach(link => link.addEventListener('click', () => mobileNav.classList.remove('open')));\n";
  previewHtml += "    }\n";
  previewHtml += "    const sectionLinks = document.querySelectorAll('header a[href^=\"#\"], .mobile-nav-corporate-preview a[href^=\"#\"]');\n";
  previewHtml += "    let activeSectionId = 'home_preview_corporate';\n";
  previewHtml += "    const updateActiveLink = () => {\n";
  previewHtml += "      let current = 'home_preview_corporate';\n";
  previewHtml += "      const headerOffset = 80;\n";
  previewHtml += "      document.querySelectorAll('section[id^=\"preview_corporate\"]').forEach(section => {\n";
  previewHtml += "        const sectionTop = section.offsetTop;\n";
  previewHtml += "        if (window.scrollY >= sectionTop - headerOffset) {\n";
  previewHtml += "          current = section.id;\n";
  previewHtml += "        }\n";
  previewHtml += "      });\n";
  previewHtml += "      activeSectionId = current;\n";
  previewHtml += "      sectionLinks.forEach(link => {\n";
  previewHtml += "        link.classList.remove('active-link-preview');\n";
  previewHtml += "        if (link.getAttribute('href') === '#' + activeSectionId) {\n";
  previewHtml += "          link.classList.add('active-link-preview');\n";
  previewHtml += "        }\n";
  previewHtml += "      });\n";
  previewHtml += "    };\n";
  previewHtml += "    window.addEventListener('scroll', updateActiveLink);\n";
  previewHtml += "    updateActiveLink();\n";
  
  previewHtml += "    const aosElements = document.querySelectorAll('.aos-init');\n";
  previewHtml += "    const observer = new IntersectionObserver((entries) => {\n";
  previewHtml += "      entries.forEach(entry => {\n";
  previewHtml += "        if (entry.isIntersecting) {\n";
  previewHtml += "          entry.target.classList.add('aos-animate');\n";
  previewHtml += "          entry.target.style.opacity = '1';\n";
  previewHtml += "          entry.target.style.transform = 'translateY(0)';\n";
  previewHtml += "          observer.unobserve(entry.target);\n";
  fullTsx += "        }\n";
  fullTsx += "      });\n";
  fullTsx += "    }, { threshold: 0.1 });\n";
  fullTsx += "    aosElements.forEach(el => { el.style.opacity = '0'; el.style.transform='translateY(20px)'; el.style.transitionProperty='opacity, transform'; el.style.transitionDuration='0.5s'; el.style.transitionTimingFunction='ease-out'; observer.observe(el); });\n";
  previewHtml += "  });\n";
  previewHtml += "</script>\n";
  previewHtml += "</body></html>";

  return { fullTsx, previewHtml };
}
