
// src/templates/modern.ts
import type { FormSchemaType, AcademicEntryType, ProjectType } from "@/schemas/websiteFormSchema";

// --- Escaping Helper Functions ---
const escJsStr = (str: string | undefined | null): string => {
  if (str === null || typeof str === 'undefined') return '';
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/"/g, '\\"').replace(/\n/g, "\\n");
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

function getContrastColor(hexcolor: string | undefined): string {
  if (!hexcolor || !hexcolor.startsWith("#")) return "#FFFFFF"; // Default for dark backgrounds
  let processedHex = hexcolor.slice(1);
  if (processedHex.length === 3) {
    processedHex = processedHex.split("").map(char => char + char).join("");
  }
  if (processedHex.length !== 6) return "#FFFFFF";
  try {
    const r = parseInt(processedHex.substring(0, 2), 16);
    const g = parseInt(processedHex.substring(2, 4), 16);
    const b = parseInt(processedHex.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "#000000" : "#FFFFFF"; // Return black for light backgrounds, white for dark
  } catch (e) {
    console.error("Error parsing hex for contrast:", e);
    return "#FFFFFF";
  }
}

export function getModernTemplate(data: FormSchemaType): { fullTsx: string; previewHtml: string } {
  const siteNameClean = (data.yourName?.trim().replace(/\W+/g, '') || "PortfolioSite");

  const defaultErrorProps: FormSchemaType = {
    yourName: "Your Name",
    heroTitle: "Creative Professional,Web Developer",
    heroTagline: "Welcome to my portfolio. Explore my work and skills.",
    heroCtaText: "Download CV",
    heroImagePlaceholder: "https://placehold.co/350x350.png?text=Hero",
    aboutBio: "A passionate individual dedicated to creating amazing digital experiences.",
    aboutSkills: "JavaScript,React,Next.js,Node.js,HTML,CSS,Tailwind CSS",
    aboutFunFact: "I can solve a Rubik's cube in under a minute!",
    academicEntries: [{ qualification: "Degree in Computer Science", institution: "University of Tech", graduationYear: "202X", grades: "GPA: 3.8", description: "Focused on web development and AI.", imageUrl: "https://placehold.co/600x400.png?text=Education1" }],
    projects: [{ name: "Project Alpha", description: "A cool project I built.", technologies: "React, Node.js", liveUrl: "#", repoUrl: "#", imageUrl: "https://placehold.co/400x250.png?text=Project1" }],
    contactEmail: "your.email@example.com",
    contactLinkedin: "https://linkedin.com/in/yourprofile",
    contactGithub: "https://github.com/yourusername",
    contactInstagram: "https://instagram.com/yourusername",
    resumeUrl: "#",
    theme: "modern",
    primaryColor: "#6366F1",
    backgroundColor: "#111827",
    accentColor: "#10B981",
    showAboutSection: true,
    showFunFact: true,
    showAcademicSection: true,
    showProjectsSection: true,
    showSkillsSection: true,
    showContactSection: true,
    showResumeLink: true,
  };
  
  let fullTsx = "";
  fullTsx += "// Generated Page: " + escJsStr(data.yourName) + "'s Modern Portfolio (Reference Adapted)\n";
  fullTsx += "\"use client\";\n";
  fullTsx += "import React, { useState, useEffect, useRef } from 'react';\n";
  fullTsx += "import Head from 'next/head';\n";
  fullTsx += "import Image from 'next/image';\n";
  fullTsx += "import { HomeIcon, UserIcon, BriefcaseIcon, LayersIcon, MessageSquareIcon, DownloadIcon, CalendarIcon, LinkedinIcon, GithubIcon, InstagramIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';\n"; // Added PhoneIcon, MapPinIcon
  fullTsx += "import type { FormSchemaType, AcademicEntryType, ProjectType } from '@/schemas/websiteFormSchema';\n";
  fullTsx += "\n";
  fullTsx += "declare var Typed: any; // For Typed.js\n";
  fullTsx += "\n";
  fullTsx += "const ModernPortfolioPage: React.FC<{ portfolioData: FormSchemaType }> = ({ portfolioData }) => {\n";
  fullTsx += "  if (!portfolioData || typeof portfolioData.yourName === 'undefined') {\n";
  fullTsx += "    return (\n";
  fullTsx += "      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center', color: 'red', backgroundColor: '#ffeeee' }}>\n";
  fullTsx += "        <h1>Error: Portfolio Data Not Loaded</h1>\n";
  fullTsx += "        <p>Essential data (like your name) is missing or malformed. Please check the form submission.</p>\n";
  fullTsx += "      </div>\n";
  fullTsx += "    );\n";
  fullTsx += "  }\n";
  fullTsx += "\n";
  fullTsx += "  const {\n";
  fullTsx += "    yourName,\n";
  fullTsx += "    heroTitle,\n";
  fullTsx += "    heroTagline,\n";
  fullTsx += "    heroImagePlaceholder,\n";
  fullTsx += "    resumeUrl,\n";
  fullTsx += "    aboutBio,\n";
  fullTsx += "    aboutSkills,\n";
  fullTsx += "    contactEmail,\n";
  fullTsx += "    contactLinkedin,\n";
  fullTsx += "    contactGithub,\n";
  fullTsx += "    contactInstagram,\n";
  fullTsx += "    academicEntries = [],\n";
  fullTsx += "    projects = [],\n";
  fullTsx += "    primaryColor, // Not directly used for major theme colors here, accent & background are key\n";
  fullTsx += "    backgroundColor,\n";
  fullTsx += "    accentColor,\n";
  fullTsx += "    showAboutSection,\n";
  fullTsx += "    showAcademicSection,\n";
  fullTsx += "    showProjectsSection,\n";
  fullTsx += "    showSkillsSection,\n";
  fullTsx += "    showContactSection,\n";
  fullTsx += "    showResumeLink,\n";
  fullTsx += "  } = portfolioData;\n";
  fullTsx += "\n";
  fullTsx += "  const [activeSection, setActiveSection] = useState(\"home\");\n";
  fullTsx += "  const [isAsideOpen, setIsAsideOpen] = useState(false);\n";
  fullTsx += "  const mainContentRef = useRef<HTMLDivElement>(null);\n";
  fullTsx += "  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});\n";
  fullTsx += "  const typedHeroRef = useRef(null);\n";
  fullTsx += "\n";
  fullTsx += "  function getContrastColorForTsx(hexcolor: string | undefined): string {\n"; // Renamed for clarity within TSX
  fullTsx += "    if (!hexcolor || !hexcolor.startsWith(\"#\")) return \"#FFFFFF\";\n";
  fullTsx += "    let processedHex = hexcolor.slice(1);\n";
  fullTsx += "    if (processedHex.length === 3) processedHex = processedHex.split(\"\").map(char => char + char).join(\"\");\n";
  fullTsx += "    if (processedHex.length !== 6) return \"#FFFFFF\";\n";
  fullTsx += "    try {\n";
  fullTsx += "      const r = parseInt(processedHex.substring(0, 2), 16);\n";
  fullTsx += "      const g = parseInt(processedHex.substring(2, 4), 16);\n";
  fullTsx += "      const b = parseInt(processedHex.substring(4, 6), 16);\n";
  fullTsx += "      const yiq = (r * 299 + g * 587 + b * 114) / 1000;\n";
  fullTsx += "      return yiq >= 128 ? \"#000000\" : \"#FFFFFF\";\n";
  fullTsx += "    } catch (e) { return \"#FFFFFF\"; }\n";
  fullTsx += "  }\n";
  fullTsx += "\n";
  fullTsx += "  const calculatedForegroundColor = getContrastColorForTsx(backgroundColor);\n";
  fullTsx += "  const isBgDark = calculatedForegroundColor === \"#FFFFFF\";\n";
  fullTsx += "\n";
  fullTsx += "  const css_skin_color = accentColor;\n";
  fullTsx += "  const css_bg_black_900 = backgroundColor;\n"; // Main background
  fullTsx += "  const css_text_black_900 = calculatedForegroundColor; // Main text color\n";
  fullTsx += "\n";
  // Derived shades based on the main background and text colors
  fullTsx += "  const css_bg_black_100 = isBgDark ? 'color-mix(in srgb, ' + backgroundColor + ' 85%, #ffffff 15%)' : 'color-mix(in srgb, ' + backgroundColor + ' 95%, #000000 5%)';\n";
  fullTsx += "  const css_bg_black_50 = isBgDark ? 'color-mix(in srgb, ' + backgroundColor + ' 70%, #ffffff 30%)' : 'color-mix(in srgb, ' + backgroundColor + ' 90%, #000000 10%)';\n";
  fullTsx += "  const css_text_black_700 = isBgDark ? 'color-mix(in srgb, ' + calculatedForegroundColor + ' 85%, ' + backgroundColor + ' 15%)' : 'color-mix(in srgb, ' + calculatedForegroundColor + ' 70%, ' + backgroundColor + ' 30%)';\n";
  fullTsx += "\n";
  fullTsx += "  useEffect(() => {\n";
  fullTsx += "    if (typeof Typed !== \"undefined\" && typedHeroRef.current && heroTitle && typeof heroTitle === 'string') {\n";
  fullTsx += "      const titles = heroTitle.split(\",\").map(s => s.trim()).filter(s => s);\n";
  fullTsx += "      const typedInstance = new Typed(typedHeroRef.current, {\n";
  fullTsx += "        strings: titles.length > 0 ? titles : [\"Creative Professional\"],\n";
  fullTsx += "        typeSpeed: 100,\n";
  fullTsx += "        backSpeed: 60,\n";
  fullTsx += "        loop: true,\n";
  fullTsx += "      });\n";
  fullTsx += "      return () => typedInstance.destroy();\n";
  fullTsx += "    } else if (typeof Typed !== 'undefined' && typedHeroRef.current) {\n";
  fullTsx += "        const typedInstance = new Typed(typedHeroRef.current, {\n";
  fullTsx += "            strings: [\"Professional\"],\n";
  fullTsx += "            typeSpeed: 100,\n";
  fullTsx += "            backSpeed: 60,\n";
  fullTsx += "            loop: true,\n";
  fullTsx += "        });\n";
  fullTsx += "        return () => typedInstance.destroy();\n";
  fullTsx += "    }\n";
  fullTsx += "  }, [heroTitle]);\n";
  fullTsx += "\n";
  fullTsx += "  const navLinks = [\n";
  fullTsx += "    { id: \"home\", label: \"Home\", icon: HomeIcon, condition: true },\n";
  fullTsx += "    { id: \"about\", label: \"About\", icon: UserIcon, condition: showAboutSection },\n";
  fullTsx += "    { id: \"skills\", label: \"Skills\", icon: LayersIcon, condition: showSkillsSection },\n"; // Changed from Services
  fullTsx += "    { id: \"projects\", label: \"Projects\", icon: BriefcaseIcon, condition: showProjectsSection },\n";
  fullTsx += "    { id: \"contact\", label: \"Contact\", icon: MessageSquareIcon, condition: showContactSection },\n";
  fullTsx += "  ];\n";
  fullTsx += "\n";
  fullTsx += "  const handleNavClick = (sectionId: string, e?: React.MouseEvent) => {\n";
  fullTsx += "    e?.preventDefault();\n";
  fullTsx += "    const sectionElement = sectionRefs.current[sectionId];\n";
  fullTsx += "    if (sectionElement && mainContentRef.current) {\n";
  fullTsx += "      mainContentRef.current.scrollTo({\n";
  fullTsx += "        top: sectionElement.offsetTop - 0, // Adjust if fixed header\n";
  fullTsx += "        behavior: \"smooth\",\n";
  fullTsx += "      });\n";
  fullTsx += "      setActiveSection(sectionId);\n";
  fullTsx += "    }\n";
  fullTsx += "    if (isAsideOpen && typeof window !== \"undefined\" && window.innerWidth < 1200) setIsAsideOpen(false);\n";
  fullTsx += "  };\n";
  fullTsx += "\n";
  fullTsx += "  useEffect(() => {\n";
  fullTsx += "    const currentMainContent = mainContentRef.current;\n";
  fullTsx += "    const handleScroll = () => {\n";
  fullTsx += "      if (!currentMainContent) return;\n";
  fullTsx += "      let current = \"home\";\n"; // Default to home
  fullTsx += "      const scrollPosition = currentMainContent.scrollTop;\n";
  fullTsx += "      const viewportHeight = currentMainContent.clientHeight;\n";
  fullTsx += "\n";
  fullTsx += "      for (const link of navLinks.filter(l => l.condition)) {\n";
  fullTsx += "        const section = sectionRefs.current[link.id];\n";
  fullTsx += "        if (section) {\n";
  // Section is considered active if its top is near the top of the scrollable area,
  // or if a good portion of it is visible.
  fullTsx += "          if (section.offsetTop <= scrollPosition + viewportHeight / 2 && section.offsetTop + section.offsetHeight > scrollPosition + viewportHeight / 3) {\n";
  fullTsx += "            current = link.id;\n";
  // No break, find the "lowest" active section for better accuracy when scrolling up
  fullTsx += "          }\n";
  fullTsx += "        }\n";
  fullTsx += "      }\n";
  fullTsx += "      if (currentMainContent.scrollTop < 100) current = \"home\"; // Prioritize home if at top\n";
  fullTsx += "      setActiveSection(current);\n";
  fullTsx += "    };\n";
  fullTsx += "    currentMainContent?.addEventListener(\"scroll\", handleScroll, { passive: true });\n";
  fullTsx += "    if (currentMainContent?.scrollTop === 0) setActiveSection(\"home\"); // Initial active section\n";
  fullTsx += "    return () => currentMainContent?.removeEventListener(\"scroll\", handleScroll);\n";
  fullTsx += "  }, [navLinks, sectionRefs, mainContentRef]); // Added dependencies\n";
  fullTsx += "\n";
  fullTsx += "  const skillsList = aboutSkills ? aboutSkills.split(\",\").map(s => s.trim()).filter(s => s) : [];\n";
  fullTsx += "\n";
  fullTsx += "  const renderAcademicEntry = (entry: AcademicEntryType | undefined, index: number) => {\n";
  fullTsx += "    if (!entry || !entry.qualification) return null;\n";
  fullTsx += "    return (\n";
  fullTsx += "      <div key={`academic-${index}`} className=\"timeline-item relative pb-[50px] pl-[37px] last:pb-0 before:absolute before:left-[7px] before:top-0 before:h-full before:w-[1px] before:bg-[var(--preview-skin-color)]\">\\n";
  fullTsx += "        <div className=\"circle-dot absolute left-0 top-0 h-[15px] w-[15px] rounded-full bg-[var(--preview-skin-color)]\"></div>\\n";
  fullTsx += "        <h3 className=\"timeline-date mb-3 text-sm font-normal text-[color:var(--preview-text-black-700)]\"><CalendarIcon className=\"mr-1.5 inline-block h-4 w-4\" />{entry.graduationYear}</h3>\\n";
  fullTsx += "        <h4 className=\"timeline-title mb-[15px] text-lg font-bold capitalize text-[color:var(--preview-text-black-900)]\">{entry.qualification} - {entry.institution}</h4>\\n";
  fullTsx += "        {entry.grades && <p className=\"text-xs italic mb-2 text-[color:var(--preview-text-black-700)]\">Grades: {entry.grades}</p>}\\n";
  fullTsx += "        {entry.description && <p className=\"timeline-text text-justify text-base leading-relaxed text-[color:var(--preview-text-black-700)]\" dangerouslySetInnerHTML={{ __html: (entry.description || '').replace(/\\n/g, \"<br/>\") }}/>}\\n";
  fullTsx += "      </div>\\n";
  fullTsx += "    );\n";
  fullTsx += "  };\n";
  fullTsx += "\n";
  fullTsx += "  const renderProjectCard = (project: ProjectType | undefined, index: number) => {\n";
  fullTsx += "    if (!project || !project.name) return null;\n";
  fullTsx += "    return (\n";
  fullTsx += "      <div key={`project-${index}`} className=\"portfolio-item basis-full px-[15px] pb-[30px] sm:basis-1/2 md:basis-1/3\">\\n";
  fullTsx += "        <div className=\"portfolio-item-inner cursor-pointer overflow-hidden rounded-xl border-[6px]\" style={{borderColor: \"var(--preview-bg-black-100)\"}}>\\n";
  fullTsx += "          <div className=\"portfolio-img\">\\n";
  fullTsx += "            <Image src={project.imageUrl || \"https://placehold.co/400x250.png?text=Project\"} alt={project.name} width={400} height={250} className=\"block w-full h-[200px] object-cover\" data-ai-hint=\"project app modern theme\"/>\\n";
  fullTsx += "          </div>\\n";
  fullTsx += "        </div>\\n";
  fullTsx += "        <h4 className=\"mt-2 text-center text-lg font-semibold capitalize text-[color:var(--preview-text-black-900)]\">{project.name}</h4>\\n";
  fullTsx += "        {project.description && <p className=\"text-center text-sm text-[color:var(--preview-text-black-700)]\" dangerouslySetInnerHTML={{ __html: (project.description || '').replace(/\\n/g, \"<br/>\") }}/>}\\n";
  fullTsx += "         {(project.liveUrl || project.repoUrl) && (\\n";
  fullTsx += "          <div className=\"mt-2 flex justify-center gap-2\">\\n";
  fullTsx += "            {project.liveUrl && <a href={project.liveUrl} target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-xs px-3 py-1 rounded\" style={{backgroundColor: \"var(--preview-skin-color)\", color: getContrastColorForTsx(accentColor)}}>Live</a>}\\n";
  fullTsx += "            {project.repoUrl && <a href={project.repoUrl} target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-xs px-3 py-1 rounded border\" style={{borderColor: \"var(--preview-skin-color)\", color: \"var(--preview-skin-color)\"}}>Code</a>}\\n";
  fullTsx += "          </div>\\n";
  fullTsx += "        )}\\n";
  fullTsx += "      </div>\\n";
  fullTsx += "    );\n";
  fullTsx += "  };\n";
  fullTsx += "\n";
  fullTsx += "  const skillItemHoverContrastColor = getContrastColorForTsx(accentColor);\n";
  fullTsx += "\n";
  fullTsx += "  return (\n";
  fullTsx += "    <>\n";
  fullTsx += "      <Head>\n";
  fullTsx += "        <title>{yourName} - Modern Portfolio</title>\n";
  fullTsx += "        <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n";
  fullTsx += "        <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossOrigin=\"anonymous\" />\n";
  fullTsx += "        <link href=\"https://fonts.googleapis.com/css2?family=Clicker+Script&family=Poppins:wght@200;300;400;500;600;700&display=swap\" rel=\"stylesheet\" />\n";
  fullTsx += "        <script src=\"https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js\" referrerPolicy=\"no-referrer\" async></script>\n";
  fullTsx += "      </Head>\n";
  fullTsx += "\n";
  fullTsx += "      {/* This style block defines the CSS variables based on dynamic data */}\n";
  fullTsx += "      <style jsx global>{`\n";
  fullTsx += "        :root {\n"; // Use :root or a specific wrapper class if this page is part of a larger app
  fullTsx += "          --preview-skin-color: ${css_skin_color};\n";
  fullTsx += "          --preview-bg-black-900: ${css_bg_black_900};\n";
  fullTsx += "          --preview-bg-black-100: ${css_bg_black_100};\n";
  fullTsx += "          --preview-bg-black-50: ${css_bg_black_50};\n";
  fullTsx += "          --preview-text-black-900: ${css_text_black_900};\n";
  fullTsx += "          --preview-text-black-700: ${css_text_black_700};\n";
  fullTsx += "        }\n";
  fullTsx += "        .font-poppins { font-family: 'Poppins', sans-serif; }\n";
  fullTsx += "        .font-clicker { font-family: 'Clicker Script', cursive; }\n";
  // Basic CSS reset and utility classes based on reference will be applied via Tailwind or global styles
  fullTsx += "      `}</style>\n";
  fullTsx += "\n";
  fullTsx += "      <div className={`min-h-screen font-poppins text-base ${isBgDark ? \"dark-mode-vars-applied\" : \"light-mode-vars-applied\"}`} style={{backgroundColor: 'var(--preview-bg-black-900)', color: 'var(--preview-text-black-900)'}}>\\n";
  fullTsx += "        <div className={`aside fixed left-0 top-0 z-20 h-full w-[270px] border-r p-[30px] transition-transform duration-300 ease-in-out md:flex md:flex-col md:items-center md:justify-center ${isAsideOpen ? \"translate-x-0\" : \"-translate-x-full\"} md:translate-x-0`} style={{ background: \"var(--preview-bg-black-100)\", borderColor: \"var(--preview-bg-black-50)\" }}>\\n";
  // Aside content (Nav)
  fullTsx += "          <ul className=\"nav mt-[50px] list-none md:mt-0\">\\n";
  fullTsx += "            {navLinks.filter(link => link.condition).map(link => (\\n";
  fullTsx += "              <li key={link.id} className=\"mb-5 block\">\\n";
  fullTsx += "                <a \\n";
  fullTsx += "                  href={`#${link.id}`}\\n";
  fullTsx += "                  onClick={(e) => handleNavClick(link.id, e)} \\n";
  fullTsx += "                  className={`block border-b py-[5px] px-[15px] text-base font-semibold transition-colors duration-300 ${activeSection === link.id ? \"text-[color:var(--preview-skin-color)]\" : \"text-[color:var(--preview-text-black-900)] hover:text-[color:var(--preview-skin-color)]\"}`}\\n";
  fullTsx += "                  style={{ borderColor: \"var(--preview-bg-black-50)\" }}\\n";
  fullTsx += "                >\\n";
  fullTsx += "                  <link.icon className=\"mr-[15px] inline-block h-5 w-5\" /> {link.label}\\n";
  fullTsx += "                </a>\\n";
  fullTsx += "              </li>\\n";
  fullTsx += "            ))}\\n";
  fullTsx += "          </ul>\\n";
  fullTsx += "        </div>\\n";
  fullTsx += "\n";
  fullTsx += "        <button \\n";
  fullTsx += "          className={`nav-toggler fixed top-5 z-30 h-10 w-[45px] cursor-pointer rounded border bg-transparent p-0 text-center md:hidden transition-all duration-300 ease-in-out ${isAsideOpen ? \"left-[285px]\" : \"left-[15px]\"}`}\\n";
  fullTsx += "          style={{ background: \"var(--preview-bg-black-100)\", borderColor: \"var(--preview-bg-black-50)\" }}\\n";
  fullTsx += "          onClick={() => setIsAsideOpen(!isAsideOpen)}\\n";
  fullTsx += "          aria-label=\"Toggle navigation\"\\n";
  fullTsx += "        >\\n";
  fullTsx += "          <span className={`relative inline-block h-0.5 w-[18px] bg-[var(--preview-skin-color)] transition-all duration-300 before:absolute before:left-0 before:top-[-6px] before:h-0.5 before:w-full before:bg-[var(--preview-skin-color)] before:transition-all before:duration-300 after:absolute after:left-0 after:top-[6px] after:h-0.5 after:w-full after:bg-[var(--preview-skin-color)] after:transition-all after:duration-300 ${isAsideOpen ? \"bg-transparent before:top-0 before:rotate-45 after:top-0 after:-rotate-45\" : \"\"}`}></span>\\n";
  fullTsx += "        </button>\\n";
  fullTsx += "\n";
  fullTsx += "        <div ref={mainContentRef} className=\"main-content min-h-screen bg-transparent md:pl-[270px] fixed top-0 right-0 bottom-0 left-0 md:left-auto overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out scroll-smooth\" style={{ background: \"var(--preview-bg-black-900)\"}}>\\n";
  // Home Section
  fullTsx += "          <section ref={el => sectionRefs.current[\"home\"] = el} id=\"home\" className=\"section flex min-h-screen items-center px-[15px] py-[60px] md:px-[30px] text-[color:var(--preview-text-black-900)]\">\\n";
  fullTsx += "            <div className=\"container mx-auto w-full max-w-[1100px]\">\\n";
  fullTsx += "              <div className=\"row -mx-[15px] flex flex-wrap items-center\">\\n";
  fullTsx += "                <div className=\"home-info basis-full px-[15px] md:basis-3/5 md:max-w-[60%]\">\\n";
  fullTsx += "                  <h3 className=\"hello my-[15px] text-[28px]\">Hello, my name is <span className=\"name font-clicker text-3xl font-bold text-[color:var(--preview-skin-color)]\">{yourName}</span></h3>\\n";
  fullTsx += "                  <h3 className=\"my-profession my-[15px] text-3xl\">I&apos;m a <span ref={typedHeroRef} className=\"typing text-[color:var(--preview-skin-color)]\"></span></h3>\\n";
  fullTsx += "                  {heroTagline && <p className=\"mb-[40px] text-xl leading-relaxed text-[color:var(--preview-text-black-700)]\" dangerouslySetInnerHTML={{ __html: (heroTagline || '').replace(/\\n/g, \"<br/>\") }} />}\\n";
  fullTsx += "                  {showResumeLink && resumeUrl && (\\n";
  fullTsx += "                    <a href={resumeUrl} target=\"_blank\" rel=\"noopener noreferrer\" className=\"btn inline-block whitespace-nowrap rounded-[40px] border-none bg-[var(--preview-skin-color)] py-3 px-9 text-base font-medium text-white transition-all duration-300 hover:scale-105\">\\n";
  fullTsx += "                      Download CV\\n";
  fullTsx += "                    </a>\\n";
  fullTsx += "                  )}\\n";
  fullTsx += "                </div>\\n";
  fullTsx += "                {heroImagePlaceholder && (\\n";
  fullTsx += "                  <div className=\"home-img relative basis-full px-[15px] text-center md:basis-2/5 md:max-w-[40%] mt-10 md:mt-0 \\n";
  fullTsx += "                    before:absolute before:left-5 before:top-[-40px] before:h-20 before:w-20 before:border-l-[10px] before:border-t-[10px] before:border-[var(--preview-skin-color)]\\n";
  fullTsx += "                    after:absolute after:right-5 after:bottom-[-40px] after:h-20 after:w-20 after:border-r-[10px] after:border-b-[10px] after:border-[var(--preview-skin-color)]\">\\n";
  fullTsx += "                    <Image src={heroImagePlaceholder} alt={yourName || \"Hero Image\"} width={350} height={350} className=\"mx-auto h-[350px] w-auto rounded-md object-cover\" data-ai-hint=\"professional portrait modern theme\" priority/>\\n";
  fullTsx += "                  </div>\\n";
  fullTsx += "                )}\\n";
  fullTsx += "              </div>\\n";
  fullTsx += "            </div>\\n";
  fullTsx += "          </section>\\n";
  fullTsx += "\n";
  // About Section
  fullTsx += "          {showAboutSection && (\\n";
  fullTsx += "            <section ref={el => sectionRefs.current[\"about\"] = el} id=\"about\" className=\"section py-[60px] px-[15px] md:px-[30px]\" style={{background: \"var(--preview-bg-black-900)\"}}>\\n";
  fullTsx += "              <div className=\"container mx-auto w-full max-w-[1100px]\">\\n";
  fullTsx += "                <div className=\"row -mx-[15px] flex flex-wrap\">\\n";
  fullTsx += "                  <div className=\"section-title basis-full max-w-full px-[15px] mb-[60px]\">\\n";
  fullTsx += "                    <h2 className=\"relative text-4xl font-bold text-[color:var(--preview-text-black-900)]\">\\n";
  fullTsx += "                      About Me\\n";
  fullTsx += "                      <span className=\"before:absolute before:left-0 before:top-full before:h-1 before:w-[50px] before:bg-[var(--preview-skin-color)]\"></span>\\n";
  fullTsx += "                      <span className=\"after:absolute after:left-0 after:top-full after:mt-2 after:h-1 after:w-[25px] after:bg-[var(--preview-skin-color)]\"></span>\\n";
  fullTsx += "                    </h2>\\n";
  fullTsx += "                  </div>\\n";
  fullTsx += "                </div>\\n";
  fullTsx += "                <div className=\"row -mx-[15px] flex flex-wrap\">\\n";
  fullTsx += "                  <div className=\"about-content basis-full max-w-full px-[15px]\">\\n";
  fullTsx += "                    <div className=\"row -mx-[15px] flex flex-wrap\">\\n";
  fullTsx += "                      <div className=\"about-text basis-full max-w-full px-[15px]\">\\n";
  fullTsx += "                        <h3 className=\"mb-[15px] text-2xl font-semibold text-[color:var(--preview-text-black-900)]\">I&apos;m {yourName} and <span className=\"text-[color:var(--preview-skin-color)]\">{heroTitle ? heroTitle.split(\",\")[0].trim() : \"a Professional\"}</span></h3>\\n";
  fullTsx += "                        {aboutBio && <p className=\"text-base leading-relaxed text-[color:var(--preview-text-black-700)]\" dangerouslySetInnerHTML={{ __html: (aboutBio || '').replace(/\\n/g, \"<br/>\") }}/>}\\n";
  fullTsx += "                      </div>\\n";
  fullTsx += "                    </div>\\n";
  fullTsx += "                    {showAcademicSection && academicEntries && academicEntries.filter(entry => entry && entry.qualification).length > 0 && (\\n";
  fullTsx += "                      <div className=\"row -mx-[15px] flex flex-wrap\">\\n";
  fullTsx += "                        <div className=\"education basis-full px-[15px] pt-[30px] md:basis-1/2 md:max-w-[50%]\">\\n";
  fullTsx += "                          <h3 className=\"title mb-[30px] text-2xl font-semibold text-[color:var(--preview-text-black-900)]\">Education</h3>\\n";
  fullTsx += "                          <div className=\"timeline-box basis-full max-w-full\">\\n";
  fullTsx += "                            <div className=\"timeline relative w-full rounded-xl border p-[30px_15px]\" style={{background: \"var(--preview-bg-black-100)\", borderColor: \"var(--preview-bg-black-50)\"}}>\\n";
  fullTsx += "                              {academicEntries.filter(entry => entry && entry.qualification).map((entry, index) => renderAcademicEntry(entry, index))}\\n";
  fullTsx += "                            </div>\\n";
  fullTsx += "                          </div>\\n";
  fullTsx += "                        </div>\\n";
  // Experience Column (Conceptual - could map projects here if desired)
  // For now, keeping Education and Experience separate as in the original reference's structure.
  // If projects are to be experience, this would be:
  // <div className="experience basis-full px-[15px] pt-[30px] md:basis-1/2 md:max-w-[50%]"> ... map projects ... </div>
  fullTsx += "                      </div>\\n";
  fullTsx += "                    )}\\n";
  fullTsx += "                  </div>\\n";
  fullTsx += "                </div>\\n";
  fullTsx += "              </div>\\n";
  fullTsx += "            </section>\\n";
  fullTsx += "          )}\\n";
  fullTsx += "\n";
  // Skills Section (replaces Services)
  fullTsx += "          {showSkillsSection && skillsList.length > 0 && (\\n";
  fullTsx += "             <section ref={el => sectionRefs.current[\"skills\"] = el} id=\"skills\" className=\"section skills py-[60px] px-[15px] md:px-[30px]\" style={{background: \"var(--preview-bg-black-900)\"}}>\\n";
  fullTsx += "              <div className=\"container mx-auto w-full max-w-[1100px]\">\\n";
  fullTsx += "                <div className=\"row -mx-[15px] flex flex-wrap\">\\n";
  fullTsx += "                   <div className=\"section-title basis-full max-w-full px-[15px] mb-[60px]\">\\n";
  fullTsx += "                    <h2 className=\"relative text-4xl font-bold text-[color:var(--preview-text-black-900)]\">\\n";
  fullTsx += "                      My Skills\\n";
  fullTsx += "                      <span className=\"before:absolute before:left-0 before:top-full before:h-1 before:w-[50px] before:bg-[var(--preview-skin-color)]\"></span>\\n";
  fullTsx += "                      <span className=\"after:absolute after:left-0 after:top-full after:mt-2 after:h-1 after:w-[25px] after:bg-[var(--preview-skin-color)]\"></span>\\n";
  fullTsx += "                    </h2>\\n";
  fullTsx += "                  </div>\\n";
  fullTsx += "                </div>\\n";
  fullTsx += "                <div className=\"row -mx-[15px] flex flex-wrap justify-center items-center gap-4 md:gap-6\">\\n"; // Flexbox layout for skills
  fullTsx += "                  {skillsList.map((skill, index) => (\\n";
  fullTsx += "                    <div key={`skill-${index}`} className=\"service-item group px-[15px] pb-[30px]\">\\n"; // Each skill item
  fullTsx += "                      <div className=\"service-item-inner w-[200px] h-[180px] flex flex-col justify-center items-center rounded-xl border p-[20px_15px] text-center transition-all duration-300 group-hover:bg-[var(--preview-skin-color)]\" style={{background: \"var(--preview-bg-black-100)\", borderColor: \"var(--preview-bg-black-50)\"}}>\\n";
  fullTsx += "                        <div className=\"icon mx-auto mb-[20px] block h-[50px] w-[50px] rounded-full text-center transition-all duration-300 flex items-center justify-center\">\\n";
  fullTsx += "                          <LayersIcon className=\"text-3xl text-[var(--preview-skin-color)] transition-all duration-300 group-hover:text-2xl group-hover:text-[color:${skillItemHoverContrastColor}]\"/>\\n";
  fullTsx += "                        </div>\\n";
  fullTsx += "                        <h4 className=\"mb-[10px] text-md font-semibold capitalize text-[color:var(--preview-text-black-900)] group-hover:text-[color:${skillItemHoverContrastColor}]\">{skill}</h4>\\n";
  fullTsx += "                      </div>\\n";
  fullTsx += "                    </div>\\n";
  fullTsx += "                  ))}\\n";
  fullTsx += "                </div>\\n";
  fullTsx += "              </div>\\n";
  fullTsx += "            </section>\\n";
  fullTsx += "          )}\\n";
  fullTsx += "          \\n";
  // Projects Section (replaces Portfolio)
  fullTsx += "          {showProjectsSection && projects && projects.filter(p => p && p.name).length > 0 && (\\n";
  fullTsx += "            <section ref={el => sectionRefs.current[\"projects\"] = el} id=\"projects\" className=\"section portfolio py-[60px] px-[15px] md:px-[30px]\" style={{background: \"var(--preview-bg-black-900)\"}}>\\n";
  fullTsx += "              <div className=\"container mx-auto w-full max-w-[1100px]\">\\n";
  fullTsx += "                <div className=\"row -mx-[15px] flex flex-wrap\">\\n";
  fullTsx += "                  <div className=\"section-title basis-full max-w-full px-[15px] mb-[60px]\">\\n";
  fullTsx += "                    <h2 className=\"relative text-4xl font-bold text-[color:var(--preview-text-black-900)]\">\\n";
  fullTsx += "                      My Projects\\n";
  fullTsx += "                       <span className=\"before:absolute before:left-0 before:top-full before:h-1 before:w-[50px] before:bg-[var(--preview-skin-color)]\"></span>\\n";
  fullTsx += "                       <span className=\"after:absolute after:left-0 after:top-full after:mt-2 after:h-1 after:w-[25px] after:bg-[var(--preview-skin-color)]\"></span>\\n";
  fullTsx += "                    </h2>\\n";
  fullTsx += "                  </div>\\n";
  fullTsx += "                </div>\\n";
  fullTsx += "                <div className=\"row -mx-[15px] flex flex-wrap\">\\n";
  fullTsx += "                  <div className=\"portfolio-heading basis-full max-w-full px-[15px] mb-10\">\\n";
  fullTsx += "                    <h2 className=\"font-medium text-[color:var(--preview-text-black-900)]\">Selected Projects:</h2>\\n";
  fullTsx += "                  </div>\\n";
  fullTsx += "                </div>\\n";
  fullTsx += "                <div className=\"row -mx-[15px] flex flex-wrap justify-center\">\\n"; // Changed to justify-center
  fullTsx += "                  {projects.filter(p => p && p.name).map((project, index) => renderProjectCard(project, index))}\\n";
  fullTsx += "                </div>\\n";
  fullTsx += "              </div>\\n";
  fullTsx += "            </section>\\n";
  fullTsx += "          )}\\n";
  fullTsx += "\\n";
  // Contact Section (Footer)
  fullTsx += "          {showContactSection && (\\n";
  fullTsx += "            <footer ref={el => sectionRefs.current[\"contact\"] = el} id=\"contact\" className=\"section contact py-[60px] px-[15px] md:px-[30px]\" style={{background: \"var(--preview-bg-black-900)\"}}>\\n";
  fullTsx += "              <div className=\"container mx-auto w-full max-w-[1100px]\">\\n";
  fullTsx += "                <div className=\"row -mx-[15px] flex flex-wrap\">\\n";
  fullTsx += "                  <div className=\"section-title basis-full max-w-full px-[15px] mb-[60px]\">\\n";
  fullTsx += "                    <h2 className=\"relative text-4xl font-bold text-[color:var(--preview-text-black-900)]\">\\n";
  fullTsx += "                      Contact Me\\n";
  fullTsx += "                      <span className=\"before:absolute before:left-0 before:top-full before:h-1 before:w-[50px] before:bg-[var(--preview-skin-color)]\"></span>\\n";
  fullTsx += "                      <span className=\"after:absolute after:left-0 after:top-full after:mt-2 after:h-1 after:w-[25px] after:bg-[var(--preview-skin-color)]\"></span>\\n";
  fullTsx += "                    </h2>\\n";
  fullTsx += "                  </div>\\n";
  fullTsx += "                </div>\\n";
  fullTsx += "                <div className=\"row -mx-[15px] flex flex-wrap justify-center\">\\n"; // Centering contact items
  fullTsx += "                  {contactEmail && (\\n";
  fullTsx += "                    <div className=\"contact-info-item basis-full px-[15px] pb-[30px] text-center sm:basis-1/2 md:basis-1/4\">\\n";
  fullTsx += "                      <div className=\"icon inline-block\"><MailIcon className=\"text-2xl text-[var(--preview-skin-color)]\"/></div>\\n";
  fullTsx += "                      <h4 className=\"my-[15px] text-lg font-semibold capitalize text-[color:var(--preview-text-black-900)]\">Email</h4>\\n";
  fullTsx += "                      <p className=\"break-all text-base font-normal leading-relaxed text-[color:var(--preview-text-black-700)]\">{contactEmail}</p>\\n";
  fullTsx += "                    </div>\\n";
  fullTsx += "                  )}\\n";
  fullTsx += "                  {contactLinkedin && (\\n";
  fullTsx += "                    <div className=\"contact-info-item basis-full px-[15px] pb-[30px] text-center sm:basis-1/2 md:basis-1/4\">\\n";
  fullTsx += "                      <div className=\"icon inline-block\"><LinkedinIcon className=\"text-2xl text-[var(--preview-skin-color)]\"/></div>\\n";
  fullTsx += "                      <h4 className=\"my-[15px] text-lg font-semibold capitalize text-[color:var(--preview-text-black-900)]\">LinkedIn</h4>\\n";
  fullTsx += "                      <a href={contactLinkedin} target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-base font-normal leading-relaxed hover:text-[var(--preview-skin-color)] text-[color:var(--preview-text-black-700)]\">Profile</a>\\n";
  fullTsx += "                    </div>\\n";
  fullTsx += "                  )}\\n";
  fullTsx += "                   {contactGithub && (\\n";
  fullTsx += "                    <div className=\"contact-info-item basis-full px-[15px] pb-[30px] text-center sm:basis-1/2 md:basis-1/4\">\\n";
  fullTsx += "                      <div className=\"icon inline-block\"><GithubIcon className=\"text-2xl text-[var(--preview-skin-color)]\"/></div>\\n";
  fullTsx += "                      <h4 className=\"my-[15px] text-lg font-semibold capitalize text-[color:var(--preview-text-black-900)]\">GitHub</h4>\\n";
  fullTsx += "                      <a href={contactGithub} target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-base font-normal leading-relaxed hover:text-[var(--preview-skin-color)] text-[color:var(--preview-text-black-700)]\">Profile</a>\\n";
  fullTsx += "                    </div>\\n";
  fullTsx += "                  )}\\n";
  fullTsx += "                  {contactInstagram && (\\n";
  fullTsx += "                    <div className=\"contact-info-item basis-full px-[15px] pb-[30px] text-center sm:basis-1/2 md:basis-1/4\">\\n";
  fullTsx += "                      <div className=\"icon inline-block\"><InstagramIcon className=\"text-2xl text-[var(--preview-skin-color)]\"/></div>\\n";
  fullTsx += "                      <h4 className=\"my-[15px] text-lg font-semibold capitalize text-[color:var(--preview-text-black-900)]\">Instagram</h4>\\n";
  fullTsx += "                      <a href={contactInstagram} target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-base font-normal leading-relaxed hover:text-[var(--preview-skin-color)] text-[color:var(--preview-text-black-700)]\">Profile</a>\\n";
  fullTsx += "                    </div>\\n";
  fullTsx += "                  )}\\n";
  fullTsx += "                </div>\\n";
  fullTsx += "                <p className=\"text-center text-sm text-[color:var(--preview-text-black-700)]\">&copy; {new Date().getFullYear()} {yourName}. All Rights Reserved.</p>\\n";
  fullTsx += "              </div>\\n";
  fullTsx += "            </footer>\\n";
  fullTsx += "          )}\\n";
  fullTsx += "        </div>\\n"; // End main-content
  fullTsx += "      </div>\\n"; // End main div wrapper
  fullTsx += "    </>\n";
  fullTsx += "  );\n";
  fullTsx += "};\n";
  fullTsx += "\n";
  fullTsx += "export default function GeneratedPage() {\n";
  fullTsx += "  const rawDataString = '" + escJsStr(JSON.stringify(data)) + "';\n";
  fullTsx += "  const defaultErrorPropsModern: FormSchemaType = " + JSON.stringify(defaultErrorProps) + ";\n";
  fullTsx += "  let propsToPass: FormSchemaType;\n";
  fullTsx += "  try {\n";
  fullTsx += "    const parsed = JSON.parse(rawDataString);\n";
  fullTsx += "    if (typeof parsed === 'object' && parsed !== null) {\n";
  fullTsx += "      propsToPass = { ...defaultErrorPropsModern, ...parsed };\n";
  fullTsx += "      propsToPass.academicEntries = Array.isArray(parsed.academicEntries) ? parsed.academicEntries.map((entry: any) => ({...(defaultErrorPropsModern.academicEntries.length > 0 ? defaultErrorPropsModern.academicEntries[0] : {}), ...entry})) : defaultErrorPropsModern.academicEntries;\n";
  fullTsx += "      propsToPass.projects = Array.isArray(parsed.projects) ? parsed.projects.map((project: any) => ({...(defaultErrorPropsModern.projects.length > 0 ? defaultErrorPropsModern.projects[0] : {}), ...project})) : defaultErrorPropsModern.projects;\n";
  fullTsx += "    } else {\n";
  fullTsx += "      propsToPass = defaultErrorPropsModern;\n";
  fullTsx += "    }\n";
  fullTsx += "  } catch (e) {\n";
  fullTsx += "    console.error(\"Error parsing props in Modern Template GeneratedPage:\", e, \"\\\\nRaw data was:\", rawDataString);\n";
  fullTsx += "    propsToPass = defaultErrorPropsModern;\n";
  fullTsx += "  }\n";
  fullTsx += "  return <ModernPortfolioPage portfolioData={propsToPass} />;\n";
  fullTsx += "}\n";

  // --- PREVIEW HTML ---
  const previewForegroundColor = getContrastColor(data.backgroundColor);
  const isPreviewBgDark = previewForegroundColor === '#FFFFFF';

  const var_skin_color_preview = escCssVal(data.accentColor);
  const var_bg_black_900_preview = escCssVal(data.backgroundColor);
  const var_text_black_900_preview = escCssVal(previewForegroundColor);

  let var_bg_black_100_preview: string;
  let var_bg_black_50_preview: string;
  let var_text_black_700_preview: string;

  if (isPreviewBgDark) {
    var_bg_black_100_preview = escCssVal(`color-mix(in srgb, ${data.backgroundColor} 85%, #ffffff 15%)`);
    var_bg_black_50_preview = escCssVal(`color-mix(in srgb, ${data.backgroundColor} 70%, #ffffff 30%)`);
    var_text_black_700_preview = escCssVal(`color-mix(in srgb, ${previewForegroundColor} 85%, ${data.backgroundColor} 15%)`);
  } else {
    var_bg_black_100_preview = escCssVal(`color-mix(in srgb, ${data.backgroundColor} 95%, #000000 5%)`);
    var_bg_black_50_preview = escCssVal(`color-mix(in srgb, ${data.backgroundColor} 90%, #000000 10%)`);
    var_text_black_700_preview = escCssVal(`color-mix(in srgb, ${previewForegroundColor} 70%, ${data.backgroundColor} 30%)`);
  }

  let inlineStyles = "";
  inlineStyles += ":root {\n";
  inlineStyles += "  --skin-color: " + var_skin_color_preview + " !important;\n";
  inlineStyles += "  --bg-black-900: " + var_bg_black_900_preview + " !important;\n";
  inlineStyles += "  --bg-black-100: " + var_bg_black_100_preview + " !important;\n";
  inlineStyles += "  --bg-black-50: " + var_bg_black_50_preview + " !important;\n";
  inlineStyles += "  --text-black-900: " + var_text_black_900_preview + " !important;\n";
  inlineStyles += "  --text-black-700: " + var_text_black_700_preview + " !important;\n";
  inlineStyles += "}\n";
  
  // CSS content from references/css/style.css
  const baseCssFromReference = `
/* Copied from references/css/style.css - adapted for preview */
@import url("https://fonts.googleapis.com/css2?family=Clicker+Script&family=Poppins:wght@200;300;400;500;600;700&display=swap");
/* :root variables will be overridden by the injected ones above */
:root { --skin-color: #ec1839; --bg-black-900: #f2f2fc; --bg-black-100: #fdf9ff; --bg-black-50: #e8dfec; --text-black-900: #302e4d; --text-black-700: #504e70;}
body.dark-preview-mode { --skin-color: ${var_skin_color_preview} !important; --bg-black-900: ${var_bg_black_900_preview} !important; --bg-black-100: #222222 !important; --bg-black-50: #393939 !important; --text-black-900: #ffffff !important; --text-black-700: #e9e9e9 !important; }
* { margin: 0; padding: 0; outline: none; text-decoration: none; box-sizing: border-box; }
body { line-height: 1.5; font-size: 16px; font-family: "Poppins", sans-serif; background: var(--bg-black-900); color: var(--text-black-900); overflow-x:hidden;}
::before, ::after { box-sizing: border-box; }
ul { list-style: none; }
.section-preview-modern { padding: 0 15px; opacity: 1; position:absolute; left:0; top:0; right:0; bottom:0; overflow-y:auto; overflow-x:hidden; background: var(--bg-black-900); z-index:1;}
@media (min-width:768px) {.section-preview-modern {padding:0 30px;}}
.section-preview-modern.active { z-index: 2; opacity: 1; animation: slideSectionPreviewModern 1s ease; }
@keyframes slideSectionPreviewModern { 0% { transform: translateX(100%); } 100% { transform: translateX(0%); } }
.padd-15-preview { padding-left: 15px; padding-right: 15px; }
.container-preview-modern { max-width: 1100px; width: 100%; margin: auto; }
.section-preview-modern .container-preview-modern { padding-top: 60px; padding-bottom: 70px; }
.section-title-preview { flex-basis: 100%; max-width: 100%; margin-bottom: 60px; } /* Changed flex to flex-basis */
.section-title-preview h2 { font-size: 40px; color: var(--text-black-900); font-weight: 700; position: relative; }
.section-title-preview h2::before { content: ""; height: 4px; width: 50px; background: var(--skin-color); position: absolute; left: 0; top: 100%; }
.section-title-preview h2::after { content: ""; height: 4px; width: 25px; background: var(--skin-color); position: absolute; left: 0; top: 100%; margin-top: 8px; }
.row-preview { display: flex; flex-wrap: wrap; margin-left: -15px; margin-right: -15px; position: relative; }
.btn-preview { font-size: 16px; font-weight: 500; padding: 12px 35px; color: white; border-radius: 40px; display: inline-block; white-space: nowrap; border: none; background: var(--skin-color); transition: all 0.3s ease; text-decoration:none; }
.btn-preview:hover { transform: scale(1.05); }
.shadow-dark-preview { box-shadow: 0 0 20px rgba(48, 46, 77, 0.15); }
.aside-preview-modern { width: 270px; height: 100%; background: var(--bg-black-100); position: fixed; left: -270px; top: 0; padding: 30px; z-index: 1000; display: flex; justify-content: center; align-items: center; border-right: 1px solid var(--bg-black-50); transition: all 0.3s ease; flex-direction:column;}
.aside-preview-modern.open { left: 0; }
.aside-preview-modern .nav-preview { margin-top: 50px; }
.aside-preview-modern .nav-preview li { margin-bottom: 20px; display: block; }
.aside-preview-modern .nav-preview li a { font-size: 16px; font-weight: 600; display: block; border-bottom: 1px solid var(--bg-black-50); color: var(--text-black-900); padding: 5px 15px; text-decoration:none; }
.aside-preview-modern .nav-preview li a.active-nav-link-preview { color: var(--skin-color) !important; }
.aside-preview-modern .nav-preview li a i.fa { margin-right: 15px; } /* Font Awesome icon */
.nav-toggler-preview { height: 40px; width: 45px; border: 1px solid var(--bg-black-50); cursor: pointer; position: fixed; left: 30px; top: 20px; border-radius: 5px; background: var(--bg-black-100); display: none; justify-content: center; align-items: center; transition: all 0.3s ease; z-index:1001;}
.nav-toggler-preview.open { left: 300px; }
.nav-toggler-preview span { height: 2px; width: 18px; background: var(--skin-color); display: inline-block; position: relative; }
.nav-toggler-preview.open span { background-color: transparent; }
.nav-toggler-preview span::before { content: ""; height: 2px; width: 18px; background: var(--skin-color); position: absolute; top: -6px; left: 0; }
.nav-toggler-preview.open span::before { transform: rotate(45deg); top: 0; }
.nav-toggler-preview span::after { content: ""; height: 2px; width: 18px; background: var(--skin-color); position: absolute; top: 6px; left: 0; }
.nav-toggler-preview.open span::after { transform: rotate(-45deg); top: 0; }
.main-content-preview-modern { min-height: 100vh; display: block; padding: 0px; opacity: 1; position: fixed; left:0; top: 0; right: 0; bottom: 0; overflow-y: auto; overflow-x:hidden; background: var(--bg-black-900); z-index:0; transition: all 0.3s ease; width:100%;}
/* @media (min-width:1200px) { .main-content-preview-modern { left:270px; width:calc(100% - 270px);}} */ /* Adjusted by JS */
.main-content-preview-modern.open-main { left: 270px; width: calc(100% - 270px); }
.home-preview-modern { min-height: 100vh; display: flex; color: var(--text-black-900); align-items:center; }
.home-preview-modern .home-info-preview { flex-basis: 60%; max-width: 60%; } /* Changed flex to flex-basis */
.home-preview-modern .home-info-preview .hello-preview { font-size: 28px; margin: 15px 0; }
.home-preview-modern .home-info-preview .hello-preview span.name-preview { font-family: 'Clicker Script', cursive; font-size: 30px; font-weight: 700; color: var(--skin-color); }
.home-preview-modern .home-info-preview .my-profession-preview { font-size: 30px; margin: 15px 0; }
.home-preview-modern .home-info-preview .typing-preview { color: var(--skin-color); }
.home-preview-modern .home-info-preview p { font-size: 20px; margin-bottom: 70px; color: var(--text-black-700); line-height:1.7; }
.home-preview-modern .home-img-preview { flex-basis: 40%; max-width: 40%; text-align: center; position: relative; } /* Changed flex to flex-basis */
.home-preview-modern .home-img-preview::before { content: ""; position: absolute; height: 80px; width: 80px; border-left: 10px solid var(--skin-color); border-top: 10px solid var(--skin-color); left: 20px; top: -40px; }
.home-preview-modern .home-img-preview::after { content: ""; position: absolute; height: 80px; width: 80px; border-right: 10px solid var(--skin-color); border-bottom: 10px solid var(--skin-color); right: 20px; bottom: -40px; }
.home-preview-modern .home-img-preview img { height: 350px; width:auto; max-width:100%; margin: auto; border-radius: 5px; object-fit:cover; }
.about-preview-modern .about-content-preview { flex-basis: 100%; max-width: 100%; } /* Changed flex to flex-basis */
.about-preview-modern .about-content-preview .about-text-preview { flex-basis: 100%; max-width: 100%; } /* Changed flex to flex-basis */
.about-preview-modern .about-content-preview .about-text-preview h3 { font-size: 24px; margin-bottom: 15px; font-weight: 700; color: var(--text-black-900); }
.about-preview-modern .about-content-preview .about-text-preview h3 span { color: var(--skin-color); }
.about-preview-modern .about-content-preview .about-text-preview p { font-size: 16px; line-height: 25px; color: var(--text-black-700); }
.about-preview-modern .personal-info-preview { flex-basis: 60%; max-width: 60%; margin-top: 40px; } /* Changed flex to flex-basis */
.about-preview-modern .personal-info-preview .info-item-preview { flex-basis: 50%; max-width: 50%; } /* Changed flex to flex-basis */
.about-preview-modern .personal-info-preview .info-item-preview p { font-weight: 600; padding: 10px 0; font-size: 16px; color: var(--text-black-900); border-bottom: 1px solid var(--bg-black-50); }
.about-preview-modern .personal-info-preview .info-item-preview p span { font-weight: 400; color: var(--text-black-700); margin-left: 4px; display: inline-block; }
.about-preview-modern .personal-info-preview .buttons-preview { margin-top: 30px; }
.about-preview-modern .personal-info-preview .buttons-preview .btn-preview { margin-right: 15px; margin-top: 10px; }
.about-preview-modern .education-preview, .about-preview .experience-preview { flex-basis: 50%; max-width: 50%; margin-top: 30px; } /* Changed flex to flex-basis */
.about-preview-modern h3.title-preview { font-size: 24px; margin-bottom: 30px; font-weight: 700; color: var(--text-black-900); }
.about-preview-modern .timeline-box-preview { flex-basis: 100%; max-width: 100%; } /* Changed flex to flex-basis */
.about-preview-modern .timeline-preview { background: var(--bg-black-100); padding: 30px 15px; border: 1px solid var(--bg-black-50); border-radius: 10px; width: 100%; position: relative; }
.about-preview-modern .timeline-preview .timeline-item-preview { position: relative; padding-left: 37px; padding-bottom: 50px; }
.about-preview-modern .timeline-preview .timeline-item-preview:last-child { padding-bottom: 0; }
.about-preview-modern .timeline-preview .timeline-item-preview::before { content: ""; width: 1px; position: absolute; height: 100%; left: 7px; top: 0; background-color: var(--skin-color); }
.about-preview-modern .timeline-preview .circle-dot-preview { position: absolute; left: 0; top: 0; height: 15px; width: 15px; border-radius: 50%; background-color: var(--skin-color); }
.about-preview-modern .timeline-preview .timeline-date-preview { font-size: 14px; font-weight: 400; margin-bottom: 12px; color: var(--text-black-700); }
.about-preview-modern .timeline-preview .timeline-date-preview i.fa { margin-right: 5px; }
.about-preview-modern .timeline-preview .timeline-title-preview { font-weight: 700; font-size: 18px; margin-bottom: 15px; text-transform: capitalize; color: var(--text-black-900); }
.about-preview-modern .timeline-preview .timeline-text-preview { line-height: 25px; font-size: 16px; text-align: justify; color: var(--text-black-700); }
.skills-section-preview-modern .skills-item-container-preview { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem;} /* Changed from service to skills */
.skills-section-preview-modern .skills-item-preview { margin-bottom: 30px; text-align:center;}
.skills-section-preview-modern .skills-item-inner-preview { background-color: var(--bg-black-100); border: 1px solid var(--bg-black-50); border-radius: 10px; padding: 0px 15px; text-align: center; transition: all 0.3s ease; width:200px; height:120px; display:flex; flex-direction:column; justify-content:center; align-items:center;}
.skills-section-preview-modern .skills-item-inner-preview:hover { background-color: var(--skin-color) !important; }
.skills-section-preview-modern .skills-item-inner-preview .icon-preview { height: 50px; width: 50px; border-radius: 50%; display: flex; margin: 0 auto 20px; align-items:center; justify-content:center; transition: all 0.3s ease;}
.skills-section-preview-modern .skills-item-inner-preview .icon-preview svg { color: var(--skin-color) !important; transition: all 0.3s ease; width:30px; height:30px;} /* For Lucide icons */
.skills-section-preview-modern .skills-item-inner-preview:hover .icon-preview svg { color: ${escCssVal(getContrastColor(data.accentColor))} !important; width:25px; height:25px;}
.skills-section-preview-modern .skills-item-inner-preview h4 { font-size: 16px; margin-bottom: 10px; color: var(--text-black-900); font-weight: 700; text-transform: capitalize; }
.skills-section-preview-modern .skills-item-inner-preview:hover h4 { color: ${escCssVal(getContrastColor(data.accentColor))} !important;}
.portfolio-section-preview-modern .portfolio-heading-preview { flex-basis: 100%; max-width: 100%; margin-bottom: 40px; } /* Changed flex to flex-basis */
.portfolio-section-preview-modern .portfolio-heading-preview h2 { color: var(--text-black-900); font-weight: 500; }
.portfolio-section-preview-modern .portfolio-item-preview { flex-basis: 33.33%; max-width: 33.33%; margin-bottom: 30px; padding:0 15px; text-align:center;} /* Changed flex to flex-basis */
.portfolio-section-preview-modern .portfolio-item-inner-preview { border: 6px solid var(--bg-black-100); border-radius: 10px; overflow: hidden; cursor: pointer; display:inline-block;}
.portfolio-section-preview-modern .portfolio-item-inner-preview .portfolio-img-preview img { width: 100%; display: block; max-height:200px; object-fit:cover; }
.portfolio-section-preview-modern .portfolio-item-preview h4.project-name-preview {margin-top:10px; color: var(--text-black-900); font-weight:600;}
.portfolio-section-preview-modern .portfolio-item-preview p.project-desc-preview {font-size:0.9em; color: var(--text-black-700);}
.portfolio-section-preview-modern .project-links-preview a { font-size:0.8em; padding: 0.2rem 0.5rem; margin: 0.3rem; border-radius:4px; text-decoration:none; display:inline-block; }
.portfolio-section-preview-modern .project-links-preview a.live-link-preview { background: var(--skin-color); color: ${escCssVal(getContrastColor(data.accentColor))}; }
.portfolio-section-preview-modern .project-links-preview a.code-link-preview { border: 1px solid var(--skin-color); color: var(--skin-color); }
.contact-section-preview-modern .contact-info-item-preview { flex-basis: 25%; max-width: 25%; text-align: center; margin-bottom: 30px; padding:0 15px; } /* flex-basis */
.contact-section-preview-modern .contact-info-item-preview .icon-preview { display: flex; justify-content:center; align-items:center; line-height:normal; } /* Changed inline-block to flex */
.contact-section-preview-modern .contact-info-item-preview .icon-preview i.fa, .contact-section-preview-modern .contact-info-item-preview .icon-preview svg { font-size: 25px; color: var(--skin-color); } /* Font Awesome & SVG */
.contact-section-preview-modern .contact-info-item-preview h4 { font-size: 18px; font-weight: 700; color: var(--text-black-900); text-transform: capitalize; margin: 15px 0 5px; }
.contact-section-preview-modern .contact-info-item-preview p, .contact-section-preview-modern .contact-info-item-preview a { font-size: 16px; line-height: 25px; color: var(--text-black-700); font-weight: 400; word-break:break-all; text-decoration:none;}
.contact-section-preview-modern .contact-info-item-preview a:hover {color: var(--skin-color);}
/* Responsive from style.css */
@media (max-width: 1199px) {
  .aside-preview-modern { left: -270px !important; } /* Ensure it's hidden */
  .main-content-preview-modern { left: 0 !important; width:100% !important; padding-left:0 !important;}
  .nav-toggler-preview { display: flex !important; left: 15px !important; } /* Adjusted initial position */
  .aside-preview-modern.open { left: 0 !important; }
  .nav-toggler-preview.open { left: 285px !important; } /* Adjusted open position */
  .main-content-preview-modern.open-main { left: 270px !important; width: calc(100% - 270px) !important; }
}
@media (max-width: 991px) {
  .contact-section-preview-modern .contact-info-item-preview, .portfolio-section-preview-modern .portfolio-item-preview, .skills-section-preview-modern .skills-item-preview { flex-basis: 20% !important; max-width: 50% !important; }
  .home-preview-modern .home-info-preview { flex-basis: 100% !important; max-width: 100% !important; text-align:center !important; order:2 !important;}
  .home-preview-modern .home-img-preview { display: block !important; flex-basis: 100% !important; max-width:100% !important; margin-bottom:20px !important; order:1 !important; padding-left:0 !important; }
}
@media (max-width: 767px) {
  .section-preview-modern {padding:0 15px !important;}
  .contact-section-preview-modern .contact-info-item-preview, .portfolio-section-preview-modern .portfolio-item-preview, .skills-section-preview-modern .skills-item-preview,
  .about-preview-modern .education-preview, .about-preview-modern .experience-preview { flex-basis: 100% !important; max-width: 100% !important; }
  .about-preview-modern .personal-info-preview { flex-basis:100% !important; max-width:60% !important; }
  .about-preview-modern .personal-info-preview .info-item-preview {flex-basis:100% !important; max-width:100% !important;}
}
/* Ensure no fixed width on main content for mobile when menu is closed */
@media (max-width: 1199px) {
  .main-content-preview-modern:not(.open-main) { width: 100% !important; left: 0 !important; }
}
  `.replace(/`/g, '\\`').replace(/\$\{/g, '\\${}'); // Escape backticks and ${ for JS embedding

  inlineStyles += baseCssFromReference;

  let previewHtml = "";
  previewHtml += "<html><head>";
  previewHtml += "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
  previewHtml += "<title>" + escHtml(data.yourName) + " - Modern Portfolio</title>";
  previewHtml += "<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">";
  previewHtml += "<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>"; // Removed anonymous
  previewHtml += "<link href=\"https://fonts.googleapis.com/css2?family=Clicker+Script&family=Poppins:wght@200;300;400;500;600;700&display=swap\" rel=\"stylesheet\">";
  previewHtml += "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css\">"; // Font Awesome for preview icons
  previewHtml += "<style>" + inlineStyles + "</style>";
  previewHtml += "</head><body class=\"" + (isPreviewBgDark ? "dark-preview-mode" : "") + "\">";

  previewHtml += "<div class=\"aside-preview-modern\" id=\"aside_preview_modern\">";
  previewHtml += "  <ul class=\"nav-preview\">";
  const previewNavLinks = [
      { id: "home_preview_modern", label: "Home", icon: "fa fa-home", condition: true },
      { id: "about_preview_modern", label: "About", icon: "fa fa-user", condition: data.showAboutSection },
      { id: "skills_preview_modern", label: "Skills", icon: "fa fa-list", condition: data.showSkillsSection }, // Changed from Services
      { id: "projects_preview_modern", label: "Projects", icon: "fa fa-briefcase", condition: data.showProjectsSection },
      { id: "contact_preview_modern", label: "Contact", icon: "fa fa-comments", condition: data.showContactSection },
  ];
  previewNavLinks.filter(link => link.condition).forEach((link, index) => {
    previewHtml += "<li><a href=\"#" + link.id + "\" class=\"" + (index === 0 ? "active-nav-link-preview" : "") + "\"><i class=\"" + link.icon + "\"></i> " + escHtml(link.label) + "</a></li>";
  });
  previewHtml += "  </ul>";
  previewHtml += "</div>";
  
  previewHtml += "<div class=\"nav-toggler-preview\" id=\"nav_toggler_preview_modern\"><span></span></div>";
  
  previewHtml += "<div class=\"main-content-preview-modern\" id=\"main_content_preview_modern\">";

  // HOME SECTION PREVIEW
  previewHtml += "<section class=\"home-preview-modern section-preview-modern active\" id=\"home_preview_modern\">";
  previewHtml += "  <div class=\"container-preview-modern\">";
  previewHtml += "    <div class=\"row-preview\">";
  previewHtml += "      <div class=\"home-info-preview padd-15-preview\">";
  
  let heroNamePreview = escHtml(data.yourName);
  let heroTitlePreviewString = data.heroTitle ? data.heroTitle.split(",")[0].trim() : "Professional";
  let escapedHeroTitlePreview = escHtml(heroTitlePreviewString);
  
  previewHtml += "        <h3 class=\"hello-preview\">Hello, my name is <span class=\"name-preview\" style=\"font-family: 'Clicker Script', cursive; color: var(--skin-color);\">" + heroNamePreview + "</span></h3>";
  previewHtml += "        <h3 class=\"my-profession-preview\">I'm a <span class=\"typing-preview\" style=\"color: var(--skin-color);\">" + escapedHeroTitlePreview + "</span></h3>";
  
  previewHtml += "        <p>" + (escHtml(data.heroTagline || "")).replace(/\n/g, "<br/>") + "</p>";
  if(data.showResumeLink && data.resumeUrl) previewHtml += "        <a href=\"" + escAttr(data.resumeUrl) + "\" class=\"btn-preview\" target=\"_blank\">Download CV</a>";
  previewHtml += "      </div>";
  if(data.heroImagePlaceholder) {
    previewHtml += "      <div class=\"home-img-preview padd-15-preview\">";
    previewHtml += "        <img src=\"" + escAttr(data.heroImagePlaceholder) + "\" alt=\"hero\" data-ai-hint=\"professional portrait modern theme\"/>";
    previewHtml += "      </div>";
  }
  previewHtml += "    </div>";
  previewHtml += "  </div>";
  previewHtml += "</section>";

  // ABOUT SECTION PREVIEW
  if(data.showAboutSection) {
    previewHtml += "<section class=\"about-preview-modern section-preview-modern\" id=\"about_preview_modern\" style=\"display:none;\">"; 
    previewHtml += "  <div class=\"container-preview-modern\">";
    previewHtml += "    <div class=\"row-preview\"><div class=\"section-title-preview padd-15-preview\"><h2>About Me</h2></div></div>";
    previewHtml += "    <div class=\"row-preview\">";
    previewHtml += "      <div class=\"about-content-preview padd-15-preview\">";
    previewHtml += "        <div class=\"row-preview\">";
    previewHtml += "          <div class=\"about-text-preview padd-15-preview\">";

    let aboutNamePreview = escHtml(data.yourName);
    let aboutHeroTitlePreviewString = data.heroTitle ? data.heroTitle.split(",")[0].trim() : "a Professional";
    let aboutEscapedHeroTitlePreview = escHtml(aboutHeroTitlePreviewString);
    previewHtml += "            <h3>I'm " + aboutNamePreview + " and <span style=\"color:var(--skin-color);\">" + aboutEscapedHeroTitlePreview + "</span></h3>";
    
    previewHtml += "            <p>" + (escHtml(data.aboutBio || "")).replace(/\n/g, "<br/>") + "</p>";
    previewHtml += "          </div>";
    previewHtml += "        </div>";
    if(data.showAcademicSection && data.academicEntries && data.academicEntries.filter(entry => entry && entry.qualification).length > 0) {
        previewHtml += "    <div class=\"row-preview\">";
        previewHtml += "      <div class=\"education-preview padd-15-preview\">"; 
        previewHtml += "        <h3 class=\"title-preview\">Education</h3>";
        previewHtml += "        <div class=\"row-preview\"><div class=\"timeline-box-preview padd-15-preview\"><div class=\"timeline-preview shadow-dark-preview\">";
        (data.academicEntries || []).filter(entry => entry && entry.qualification).forEach(entry => {
            if (!entry) return;
            previewHtml += "<div class=\"timeline-item-preview\">";
            previewHtml += "  <div class=\"circle-dot-preview\"></div>";
            previewHtml += "  <h3 class=\"timeline-date-preview\"><i class=\"fa fa-calendar\"></i> " + escHtml(entry.graduationYear) + "</h3>";
            previewHtml += "  <h4 class=\"timeline-title-preview\">" + escHtml(entry.qualification) + " - " + escHtml(entry.institution) +"</h4>";
            if(entry.grades) previewHtml += "  <p class=\"timeline-text-preview\" style=\"font-style:italic; font-size:0.9em; margin-bottom:5px;\">Grades: " + escHtml(entry.grades) + "</p>";
            previewHtml += "  <p class=\"timeline-text-preview\">" + (escHtml(entry.description || "")).replace(/\n/g, "<br/>") + "</p>";
            previewHtml += "</div>";
        });
        previewHtml += "        </div></div></div>";
        previewHtml += "      </div>";
        previewHtml += "    </div>";
    }
    previewHtml += "      </div>";
    previewHtml += "    </div>";
    previewHtml += "  </div>";
    previewHtml += "</section>";
  }

  // SKILLS SECTION PREVIEW (Replaces Services)
  if(data.showSkillsSection && data.aboutSkills) {
    const skillsPreviewList = data.aboutSkills.split(',').map(s => s.trim()).filter(s => s);
    if (skillsPreviewList.length > 0) {
        previewHtml += "<section class=\"skills-section-preview-modern section-preview-modern\" id=\"skills_preview_modern\" style=\"display:none;\">";
        previewHtml += "  <div class=\"container-preview-modern\">";
        previewHtml += "    <div class=\"row-preview\"><div class=\"section-title-preview padd-15-preview\"><h2>My Skills</h2></div></div>";
        previewHtml += "    <div class=\"row-preview skills-item-container-preview\">"; 
        skillsPreviewList.forEach(skill => {
            previewHtml += "<div class=\"skills-item-preview\">";
            previewHtml += "  <div class=\"skills-item-inner-preview\">";
            previewHtml += "    <h4>" + escHtml(skill) + "</h4>";
            previewHtml += "  </div>";
            previewHtml += "</div>";
        });
        previewHtml += "    </div>";
        previewHtml += "  </div>";
        previewHtml += "</section>";
    }
  }

  // PROJECTS SECTION PREVIEW (Mapped from Portfolio)
  if(data.showProjectsSection && data.projects && data.projects.filter(p => p && p.name).length > 0) {
    previewHtml += "<section class=\"portfolio-section-preview-modern section-preview-modern\" id=\"projects_preview_modern\" style=\"display:none;\">";
    previewHtml += "  <div class=\"container-preview-modern\">";
    previewHtml += "    <div class=\"row-preview\"><div class=\"section-title-preview padd-15-preview\"><h2>My Projects</h2></div></div>";
    previewHtml += "    <div class=\"row-preview\"><div class=\"portfolio-heading-preview padd-15-preview\"><h2>Selected Projects :</h2></div></div>";
    previewHtml += "    <div class=\"row-preview\">";
    (data.projects || []).filter(p => p && p.name).forEach(project => {
        if (!project) return;
        previewHtml += "<div class=\"portfolio-item-preview\">";
        previewHtml += "  <div class=\"portfolio-item-inner-preview shadow-dark-preview\">";
        previewHtml += "    <div class=\"portfolio-img-preview\">";
        previewHtml += "      <img src=\"" + escAttr(project.imageUrl || 'https://placehold.co/400x250.png') + "\" alt=\"" + escAttr(project.name) + "\" data-ai-hint=\"project app modern theme\"/>";
        previewHtml += "    </div>";
        previewHtml += "  </div>";
        previewHtml += "  <h4 class=\"project-name-preview\">" + escHtml(project.name) + "</h4>";
        if(project.description) previewHtml += "  <p class=\"project-desc-preview\">" + (escHtml(project.description)).replace(/\n/g, "<br/>") + "</p>";
        previewHtml += "  <div class=\"project-links-preview\">";
        if(project.liveUrl) previewHtml += "    <a href=\"" + escAttr(project.liveUrl) + "\" class=\"live-link-preview\" target=\"_blank\">Live</a>";
        if(project.repoUrl) previewHtml += "    <a href=\"" + escAttr(project.repoUrl) + "\" class=\"code-link-preview\" target=\"_blank\">Code</a>";
        previewHtml += "  </div>";
        previewHtml += "</div>";
    });
    previewHtml += "    </div>";
    previewHtml += "  </div>";
    previewHtml += "</section>";
  }
  
  // CONTACT SECTION PREVIEW
  if(data.showContactSection) {
    previewHtml += "<footer class=\"contact-section-preview-modern section-preview-modern\" id=\"contact_preview_modern\" style=\"display:none;\">";
    previewHtml += "  <div class=\"container-preview-modern\">";
    previewHtml += "    <div class=\"row-preview\"><div class=\"section-title-preview padd-15-preview\"><h2>Contact Me</h2></div></div>";
    previewHtml += "    <div class=\"row-preview\">";
    if(data.contactEmail) {
        previewHtml += "<div class=\"contact-info-item-preview\">";
        previewHtml += "  <div class=\"icon-preview\"><i class=\"fa fa-envelope\"></i></div>";
        previewHtml += "  <h4>Email</h4><p>" + escHtml(data.contactEmail) + "</p>";
        previewHtml += "</div>";
    }
    if(data.contactLinkedin) {
        previewHtml += "<div class=\"contact-info-item-preview\">";
        previewHtml += "  <div class=\"icon-preview\"><i class=\"fab fa-linkedin-in\"></i></div>";
        previewHtml += "  <h4>LinkedIn</h4><p><a href=\""+escAttr(data.contactLinkedin)+"\" target=\"_blank\">Profile</a></p>";
        previewHtml += "</div>";
    }
    if(data.contactGithub) {
        previewHtml += "<div class=\"contact-info-item-preview\">";
        previewHtml += "  <div class=\"icon-preview\"><i class=\"fab fa-github\"></i></div>";
        previewHtml += "  <h4>GitHub</h4><p><a href=\""+escAttr(data.contactGithub)+"\" target=\"_blank\">Profile</a></p>";
        previewHtml += "</div>";
    }
    if(data.contactInstagram) {
        previewHtml += "<div class=\"contact-info-item-preview\">";
        previewHtml += "  <div class=\"icon-preview\"><i class=\"fab fa-instagram\"></i></div>";
        previewHtml += "  <h4>Instagram</h4><p><a href=\""+escAttr(data.contactInstagram)+"\" target=\"_blank\">Profile</a></p>";
        previewHtml += "</div>";
    }
    previewHtml += "    </div>";
    previewHtml += "    <p style=\"text-align:center; font-size:0.9em; color:var(--text-black-700); padding-top:20px;\">&copy; " + new Date().getFullYear() + " " + escHtml(data.yourName) + ". All Rights Reserved.</p>";
    previewHtml += "  </div>";
    previewHtml += "</footer>";
  }

  previewHtml += "</div>"; // Closing main-content

  const referenceScriptJsPreview = `
    // Typed.js for Preview
    var typedPreviewInstance = null;
    try {
      if (typeof Typed !== 'undefined' && document.querySelector(".typing-preview")) {
        var heroTitlePreviewModern = "${escJsStr(data.heroTitle || "Professional")}";
        var titlesPreviewModern = heroTitlePreviewModern.split(",").map(s => s.trim()).filter(s => s);
        if(titlesPreviewModern.length === 0) titlesPreviewModern.push("Professional");
        typedPreviewInstance = new Typed(".typing-preview", {
          strings: titlesPreviewModern,
          typeSpeed: 100,
          backSpeed: 60,
          loop: true,
        });
      }
    } catch(e) { console.error("Typed.js init error in modern preview:", e); }

    // Navigation logic for Preview
    const navPreviewModern = document.querySelector("#aside_preview_modern .nav-preview");
    const navListPreviewModern = navPreviewModern ? navPreviewModern.querySelectorAll("li") : [];
    const allSectionPreviewModern = document.querySelectorAll("#main_content_preview_modern .section-preview-modern");
    const mainContentPreviewModern = document.getElementById("main_content_preview_modern");
    
    function showSectionPreviewModern(targetId) {
      let foundTarget = false;
      allSectionPreviewModern.forEach(section => {
        if (section.id === targetId) {
          section.classList.add("active");
          section.style.display = "block"; 
          foundTarget = true;
        } else {
          section.classList.remove("active");
          section.style.display = "none"; 
        }
      });
      if(foundTarget) updateNavPreviewModern(targetId);
    }
    
    function updateNavPreviewModern(currentSectionId) {
      navListPreviewModern.forEach(li => {
        const link = li.querySelector("a");
        if(link) {
            link.classList.remove("active-nav-link-preview");
            if (link.getAttribute("href") && link.getAttribute("href").substring(1) === currentSectionId) {
              link.classList.add("active-nav-link-preview");
            }
        }
      });
    }
    
    navListPreviewModern.forEach(li => {
      const a = li.querySelector("a");
      if(a && a.getAttribute("href")) {
        a.addEventListener("click", function (event) {
          event.preventDefault();
          const targetId = this.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement && mainContentPreviewModern) {
            mainContentPreviewModern.scrollTo({
                top: targetElement.offsetTop - 0,
                behavior: 'smooth'
            });
             // Wait for scroll to finish by using a timeout, then show section.
            // This is a simplified way to handle it.
            setTimeout(() => {
              showSectionPreviewModern(targetId);
            }, 50); // Adjust timeout if needed
          }
          const asideElem = document.getElementById("aside_preview_modern");
          const togglerElem = document.getElementById("nav_toggler_preview_modern");
          // const mainContentElem = document.getElementById("main_content_preview_modern"); // Already have mainContentPreviewModern
          if (window.innerWidth < 1200) { 
            if(asideElem) asideElem.classList.remove("open");
            if(togglerElem) togglerElem.classList.remove("open");
            if(mainContentPreviewModern) mainContentPreviewModern.classList.remove("open-main");
            // Explicitly set styles for mobile menu closing
            if(asideElem) asideElem.style.left = '-270px'; 
            if(mainContentPreviewModern) mainContentPreviewModern.style.left = '0px'; 
            if(mainContentPreviewModern) mainContentPreviewModern.style.width = '100%'; 
            if(togglerElem) togglerElem.style.left = '15px'; // Reset toggler position
          }
        });
      }
    });

    const navTogglerBtnPreviewModern = document.getElementById("nav_toggler_preview_modern");
    const asidePreviewModern = document.getElementById("aside_preview_modern");
    // const mainContentPreviewModern = document.getElementById("main_content_preview_modern"); // Already defined

    function asideSectionTogglerBtnPreviewModern() {
      if(asidePreviewModern) asidePreviewModern.classList.toggle("open");
      if(navTogglerBtnPreviewModern) navTogglerBtnPreviewModern.classList.toggle("open");
      if(mainContentPreviewModern) mainContentPreviewModern.classList.toggle("open-main");
    }
    if(navTogglerBtnPreviewModern) {
        navTogglerBtnPreviewModern.addEventListener("click", asideSectionTogglerBtnPreviewModern);
    }
    
    // Initial setup for sections based on scroll (simplified for preview)
    if (allSectionPreviewModern.length > 0 && navListPreviewModern.length > 0 && mainContentPreviewModern) {
        if (mainContentPreviewModern.scrollTop === 0 && document.getElementById('home_preview_modern')) {
             showSectionPreviewModern('home_preview_modern');
        } else {
            // Attempt to find the currently visible section on load
            let initialActiveId = 'home_preview_modern';
            for (let section of allSectionPreviewModern) {
                if (section.style.display !== 'none') {
                    const rect = section.getBoundingClientRect();
                    const mainRect = mainContentPreviewModern.getBoundingClientRect();
                    if (rect.top <= mainRect.top + 50) { 
                        initialActiveId = section.id;
                    } else {
                        break; 
                    }
                }
            }
            showSectionPreviewModern(initialActiveId);
        }
    }
     
    if (mainContentPreviewModern) {
        mainContentPreviewModern.addEventListener('scroll', function() {
            let currentSectionId = 'home_preview_modern'; // Default
            let minDistance = Infinity;
            const viewportCenter = mainContentPreviewModern.scrollTop + mainContentPreviewModern.clientHeight / 2;

            for (let section of allSectionPreviewModern) {
                if (section.style.display !== 'none') { // Consider only currently "shown" sections by JS
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    const sectionCenter = sectionTop + section.offsetHeight / 2;
                    
                    // Check if section is dominant in viewport
                    if (sectionTop < viewportCenter && sectionBottom > viewportCenter) {
                         currentSectionId = section.id;
                         break; // Found the most dominant section
                    }
                    // Fallback: if no section is dominant, pick the one closest to the center
                    const distance = Math.abs(sectionCenter - viewportCenter);
                    if (distance < minDistance) {
                        minDistance = distance;
                        currentSectionId = section.id;
                    }
                }
            }
             // Only update nav, don't call showSectionPreviewModern here to avoid scroll jumps
             updateNavPreviewModern(currentSectionId); 
        }, { passive: true });
    }

    // Adjust layout for desktop/mobile on load and resize
    function adjustLayoutPreviewModern() {
      if (window.innerWidth < 1200) {
        if(navTogglerBtnPreviewModern) navTogglerBtnPreviewModern.style.display = 'flex';
        if(asidePreviewModern && !asidePreviewModern.classList.contains('open')) asidePreviewModern.style.left = '-270px';
        if(mainContentPreviewModern && !mainContentPreviewModern.classList.contains('open-main')) {
            mainContentPreviewModern.style.left = '0';
            mainContentPreviewModern.style.width = '100%';
            // mainContentPreviewModern.style.paddingLeft = '0'; // Removed this, padding is on sections
        }
      } else { // Desktop
        if(navTogglerBtnPreviewModern) navTogglerBtnPreviewModern.style.display = 'none';
        if(asidePreviewModern) asidePreviewModern.style.left = '0'; 
        // if(asidePreviewModern) asidePreviewModern.classList.add('open'); // Don't add open, just set left
        if(mainContentPreviewModern) {
             mainContentPreviewModern.style.left = '270px';
             mainContentPreviewModern.style.width = 'calc(100% - 270px)';
            // mainContentPreviewModern.style.paddingLeft = '0';
        }
        // if(mainContentPreviewModern) mainContentPreviewModern.classList.add('open-main'); // Don't add open-main, just set left
      }
    }
    window.addEventListener('load', adjustLayoutPreviewModern);
    window.addEventListener('resize', adjustLayoutPreviewModern);
    // Initial call on load
    document.addEventListener('DOMContentLoaded', adjustLayoutPreviewModern);
  `;
  previewHtml += "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js\" referrerpolicy=\"no-referrer\"></script>";
  previewHtml += "<script>" + referenceScriptJsPreview.replace(/`/g, '\\`').replace(/\$\{/g, '\\${}') + "</script>";
  previewHtml += "</body></html>";

  return { fullTsx, previewHtml };
}
