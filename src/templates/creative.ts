
// src/templates/creative.ts
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

// Helper function to get contrast color
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
    console.error("Error parsing hex for contrast:", e);
    return '#FFFFFF';
  }
}

export function getCreativeTemplate(data: FormSchemaType): { fullTsx: string; previewHtml: string } {
  const {
    yourName = "User Name",
    heroTitle = "Creative Developer & Designer",
    heroTagline = "Building beautiful and functional digital experiences.",
    heroCtaText = "View My Work",
    heroImagePlaceholder = "https://placehold.co/400x450/DAEFB3/4B0000?text=Hero&font=ubuntu",
    aboutBio = "A passionate individual with a knack for creating amazing things. I love to learn, explore new technologies, and contribute to impactful projects.",
    aboutSkills = "JavaScript, React, Next.js, Node.js, Python, Figma, UI/UX Design, Project Management",
    aboutFunFact = "I can solve a Rubik's cube in under a minute!",
    academicEntries = [{ qualification: "B.Sc. in Computer Science", institution: "University of Technology", graduationYear: "2023", grades: "GPA: 3.8/4.0", description: "Focused on web development and AI. Senior project involved creating a machine learning model for image recognition. Active member of the coding club.", imageUrl: "https://placehold.co/500x300/4B0000/DAEFB3?text=Education&font=ubuntu" }],
    projects = [{ name: "Sample Project Alpha", description: "A brief description of this amazing project, highlighting its key features and impact.", technologies: "React, Next.js, Tailwind CSS", liveUrl: "#", repoUrl: "#", imageUrl: "https://placehold.co/400x250/4B0000/DAEFB3?text=ProjectAlpha&font=ubuntu" }],
    contactEmail = "your.email@example.com",
    contactLinkedin = "https://linkedin.com/in/yourprofile",
    contactGithub = "https://github.com/yourusername",
    contactInstagram = "https://instagram.com/yourusername",
    resumeUrl = "#",
    theme = "creative",
    primaryColor = "#4b0000",
    backgroundColor = "#DAEFB3",
    accentColor = "#ff4500",
    showAboutSection = true,
    showFunFact = true,
    showAcademicSection = true,
    showProjectsSection = true,
    showSkillsSection = true,
    showContactSection = true,
    showResumeLink = true,
  } = data || {};

  const siteNameClean = (yourName?.trim().replace(/\W+/g, '') || "CreativePortfolioSite");

  const defaultErrorProps: FormSchemaType = {
    yourName: "Your Name (Error)",
    heroTitle: "Title (Error)",
    heroTagline: "Error loading tagline.",
    heroCtaText: "View Work",
    heroImagePlaceholder: "https://placehold.co/400x450/DAEFB3/4B0000?text=HeroErr&font=ubuntu",
    aboutBio: "Error loading biography.",
    aboutSkills: "Skill 1, Skill 2",
    aboutFunFact: "",
    academicEntries: [{ qualification: "Degree (Error)", institution: "University (Error)", graduationYear: "Year", grades: "N/A", description: "Details missing.", imageUrl: "https://placehold.co/500x300/4B0000/DAEFB3?text=EduErr&font=ubuntu" }],
    projects: [{ name: "Project (Error)", description: "Details missing.", technologies: "Tech unavailable", liveUrl: "#", repoUrl: "#", imageUrl: "https://placehold.co/400x250/4B0000/DAEFB3?text=ProjErr&font=ubuntu" }],
    contactEmail: "error@example.com",
    contactLinkedin: "#", contactGithub: "#", contactInstagram: "#",
    resumeUrl: "#error_link",
    theme: "creative", // Consistent with the theme name
    primaryColor: "#4b0000", 
    backgroundColor: "#DAEFB3", 
    accentColor: "#ff4500",
    showAboutSection: true,
    showFunFact: true,
    showAcademicSection: true,
    showProjectsSection: true,
    showSkillsSection: true,
    showContactSection: true,
    showResumeLink: true,
  };
  
  let fullTsx = "";
  fullTsx += "// Generated Page: " + escJsStr(yourName) + "'s Creative Portfolio" + "\n";
  fullTsx += "\"use client\";" + "\n";
  fullTsx += "import React, { useState, useEffect, useRef } from 'react';" + "\n";
  fullTsx += "import Head from 'next/head';" + "\n";
  fullTsx += "import Image from 'next/image';" + "\n";
  fullTsx += "import { Mail, Linkedin, Github, Instagram as InstagramIcon, Download, CalendarDays } from 'lucide-react';" + "\n";
  fullTsx += "import type { FormSchemaType, AcademicEntryType, ProjectType } from '@/schemas/websiteFormSchema';" + "\n";
  fullTsx += "\n";

  fullTsx += "const getContrastColorForTsx = (hexcolor: string | undefined): string => {" + "\n";
  fullTsx += "  if (!hexcolor || !hexcolor.startsWith('#')) return '#FFFFFF';" + "\n";
  fullTsx += "  let processedHex = hexcolor.slice(1);" + "\n";
  fullTsx += "  if (processedHex.length === 3) processedHex = processedHex.split('').map(char => char + char).join('');" + "\n";
  fullTsx += "  if (processedHex.length !== 6) return '#FFFFFF';" + "\n";
  fullTsx += "  try {" + "\n";
  fullTsx += "    const r = parseInt(processedHex.substring(0, 2), 16);" + "\n";
  fullTsx += "    const g = parseInt(processedHex.substring(2, 4), 16);" + "\n";
  fullTsx += "    const b = parseInt(processedHex.substring(4, 6), 16);" + "\n";
  fullTsx += "    const yiq = (r * 299 + g * 587 + b * 114) / 1000;" + "\n";
  fullTsx += "    return yiq >= 128 ? '#000000' : '#FFFFFF';" + "\n";
  fullTsx += "  } catch (e) { return '#FFFFFF'; }" + "\n";
  fullTsx += "};" + "\n\n";

  fullTsx += "const " + siteNameClean + "PortfolioPage: React.FC<{ portfolioData: FormSchemaType }> = ({ portfolioData }) => {" + "\n";
  fullTsx += "  if (!portfolioData || !portfolioData.yourName) {" + "\n";
  fullTsx += "    const errorDataForComponent = " + JSON.stringify(defaultErrorProps) + ";\n";
  fullTsx += "    return (" + "\n";
  fullTsx += "      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center', color: errorDataForComponent.primaryColor || '#FF0000', backgroundColor: errorDataForComponent.backgroundColor || '#FFF0F0' }}>" + "\n";
  fullTsx += "        <h1>Error: Portfolio Data Unavailable in Component</h1>" + "\n";
  fullTsx += "        <p>Essential data is missing for this portfolio.</p>" + "\n";
  fullTsx += "      </div>" + "\n";
  fullTsx += "    );\n";
  fullTsx += "  }\n";
  fullTsx += "\n";
  
  fullTsx += "  const [navBg, setNavBg] = useState(false);\n";
  fullTsx += "\n";
  fullTsx += "  const changeNavBg = () => {\n";
  fullTsx += "    if (typeof window !== 'undefined' && window.scrollY >= 100) {\n";
  fullTsx += "      setNavBg(true);\n";
  fullTsx += "    } else {\n";
  fullTsx += "      setNavBg(false);\n";
  fullTsx += "    }\n";
  fullTsx += "  };\n";
  fullTsx += "\n";
  fullTsx += "  useEffect(() => {\n";
  fullTsx += "    if (typeof window !== 'undefined') {\n";
  fullTsx += "      window.addEventListener('scroll', changeNavBg);\n";
  fullTsx += "      return () => {\n";
  fullTsx += "        window.removeEventListener('scroll', changeNavBg);\n";
  fullTsx += "      };\n";
  fullTsx += "    }\n";
  fullTsx += "  }, []);\n";
  fullTsx += "  \n";

  fullTsx += "  const dynamicStyles = {\n";
  fullTsx += "    body: {\n";
  fullTsx += "      backgroundColor: portfolioData.backgroundColor,\n";
  fullTsx += "      color: getContrastColorForTsx(portfolioData.backgroundColor),\n";
  fullTsx += "      fontFamily: \"'Ubuntu', sans-serif\",\n";
  fullTsx += "    },\n";
  fullTsx += "    nav: {\n";
  fullTsx += "      backgroundColor: navBg ? portfolioData.backgroundColor : 'transparent',\n";
  fullTsx += "      position: 'sticky' as 'sticky',\n";
  fullTsx += "      top: '0',\n";
  fullTsx += "      zIndex: 100,\n";
  fullTsx += "      transition: 'background-color 0.2s linear',\n";
  fullTsx += "    },\n";
  fullTsx += "    navLinks: { color: '#ffffff' },\n";
  fullTsx += "    navLinksHover: { color: portfolioData.accentColor },\n";
  fullTsx += "    navButton: {\n";
  fullTsx += "      color: '#f4fbe6',\n";
  fullTsx += "      borderColor: portfolioData.accentColor,\n";
  fullTsx += "      backgroundColor: 'transparent',\n";
  fullTsx += "    },\n";
  fullTsx += "    navButtonHover: {\n";
  fullTsx += "      backgroundColor: portfolioData.accentColor,\n";
  fullTsx += "      color: getContrastColorForTsx(portfolioData.accentColor),\n";
  fullTsx += "    },\n";
  fullTsx += "    heroH1Span1: { color: portfolioData.accentColor },\n";
  fullTsx += "    heroH1Span2: { color: portfolioData.primaryColor },\n";
  fullTsx += "    heroH2: { color: getContrastColorForTsx(portfolioData.backgroundColor) },\n";
  fullTsx += "    heroCtaButton: {\n";
  fullTsx += "      backgroundColor: portfolioData.accentColor,\n";
  fullTsx += "      color: getContrastColorForTsx(portfolioData.accentColor),\n";
  fullTsx += "      borderColor: portfolioData.accentColor,\n";
  fullTsx += "    },\n";
  fullTsx += "    heroCtaButtonHover: {\n";
  fullTsx += "      backgroundColor: 'transparent',\n";
  fullTsx += "      color: portfolioData.accentColor,\n";
  fullTsx += "    },\n";
  fullTsx += "    sectionTitle: { color: portfolioData.primaryColor },\n";
  fullTsx += "    footer: {\n";
  fullTsx += "      borderTop: `1px solid \${portfolioData.primaryColor}66`,\n";
  fullTsx += "      color: getContrastColorForTsx(portfolioData.backgroundColor),\n";
  fullTsx += "      padding: '2rem 1rem',\n";
  fullTsx += "      textAlign: 'center' as 'center',\n";
  fullTsx += "      marginTop: '3rem',\n";
  fullTsx += "    },\n";
  fullTsx += "    contactLinks: { color: portfolioData.accentColor },\n";
  fullTsx += "    contactLinksHover: { color: portfolioData.primaryColor },\n";
  fullTsx += "  };\n";
  fullTsx += "\n";

  fullTsx += "  const renderAcademicEntryTsx = (academicItemData: AcademicEntryType | undefined, reactListKey: string) => {\n";
  fullTsx += "    if (!academicItemData || !academicItemData.qualification) return null;\n";
  fullTsx += "    return (\n";
  fullTsx += "      <div key={reactListKey} className='mb-6 pb-6 border-b border-dashed' style={{borderColor: `${portfolioData.primaryColor}33`}}>\n";
  fullTsx += "        {academicItemData.imageUrl && <Image src={academicItemData.imageUrl} alt={academicItemData.qualification || 'Academic Achievement'} width={500} height={300} className='w-full h-auto object-cover rounded-md mb-3 shadow-md' data-ai-hint='education university building' />}\n";
  fullTsx += "        <h4 className='text-lg font-semibold mb-1' style={{color: portfolioData.primaryColor}}>{academicItemData.qualification} - {academicItemData.institution}</h4>\n";
  fullTsx += "        <p className='text-sm opacity-80 mb-1'><em>{academicItemData.graduationYear} {academicItemData.grades && `| Grades: ${academicItemData.grades}`}</em></p>\n";
  fullTsx += "        {academicItemData.description && <p className='text-xs opacity-90 leading-relaxed' dangerouslySetInnerHTML={{ __html: (academicItemData.description || '').replace(/\\n/g, '<br />')}} />}\n";
  fullTsx += "      </div>\n";
  fullTsx += "    );\n";
  fullTsx += "  };\n";
  fullTsx += "\n";
  fullTsx += "  const renderProjectCardTsx = (projectItemData: ProjectType | undefined, reactListKey: string) => {\n";
  fullTsx += "    if (!projectItemData || !projectItemData.name) return null;\n";
  fullTsx += "    return (\n";
  fullTsx += "      <div key={reactListKey} className='p-6 rounded-lg border' style={{borderColor: `${portfolioData.primaryColor}44`, backgroundColor: portfolioData.backgroundColor, boxShadow: `0 4px 15px ${portfolioData.primaryColor}1A`}}>\n";
  fullTsx += "        {projectItemData.imageUrl && <Image src={projectItemData.imageUrl} alt={projectItemData.name || 'Project Image'} width={400} height={250} className='w-full h-auto object-cover rounded-md mb-4 shadow' data-ai-hint='project image classic' />}\n";
  fullTsx += "        <h4 className='text-xl font-semibold mb-2' style={{color: portfolioData.primaryColor}}>{projectItemData.name}</h4>\n";
  fullTsx += "        <p className='text-sm opacity-90 mb-3' dangerouslySetInnerHTML={{ __html: (projectItemData.description || '').replace(/\\n/g, '<br />') }} />\n";
  fullTsx += "        <p className='text-xs opacity-70 mb-4'><em>Technologies: {projectItemData.technologies}</em></p>\n";
  fullTsx += "        <div className='flex gap-3'>\n";
  fullTsx += "          {projectItemData.liveUrl && <a href={projectItemData.liveUrl} target='_blank' rel='noopener noreferrer' className='px-4 py-2 text-sm rounded-md border transition-colors' style={{borderColor: portfolioData.accentColor, color: portfolioData.accentColor, backgroundColor: 'transparent'}} onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.backgroundColor = portfolioData.accentColor + '22'} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.backgroundColor = 'transparent'}>Live Site</a>}\n";
  fullTsx += "          {projectItemData.repoUrl && <a href={projectItemData.repoUrl} target='_blank' rel='noopener noreferrer' className='px-4 py-2 text-sm rounded-md border transition-colors' style={{borderColor: portfolioData.accentColor, color: portfolioData.accentColor, backgroundColor: 'transparent'}} onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.backgroundColor = portfolioData.accentColor + '22'} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => e.currentTarget.style.backgroundColor = 'transparent'}>View Code</a>}\n";
  fullTsx += "        </div>\n";
  fullTsx += "      </div>\n";
  fullTsx += "    );\n";
  fullTsx += "  };\n";
  fullTsx += "\n";
  fullTsx += "  return (\n";
  fullTsx += "    <>\n";
  fullTsx += "      <Head>\n";
  fullTsx += "        <title>{portfolioData.yourName} - Creative Portfolio</title>\n";
  fullTsx += "        <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n";
  fullTsx += "        <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossOrigin=\"anonymous\" />\n";
  fullTsx += "        <link href=\"https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap\" rel=\"stylesheet\" />\n";
  fullTsx += "      </Head>\n";
  fullTsx += "      <style jsx global>{`\n";
  fullTsx += "        body {\n";
  fullTsx += "          background-color: ${dynamicStyles.body.backgroundColor};\n";
  fullTsx += "          color: ${dynamicStyles.body.color};\n";
  fullTsx += "          font-family: ${dynamicStyles.body.fontFamily};\n";
  fullTsx += "        }\n";
  fullTsx += "        .selection\\:\\:bg-accent::selection { background-color: ${dynamicStyles.heroCtaButton.backgroundColor}; }\n";
  fullTsx += "        .selection\\:\\:text-accent-foreground::selection { color: ${dynamicStyles.heroCtaButton.color}; }\n";
  fullTsx += "      `}</style>\n";
  fullTsx += "      <div className=\"min-h-screen\">\n";
  fullTsx += "        <div className=\"container mx-auto px-4\">\n";
  fullTsx += "          <nav style={dynamicStyles.nav} className=\"py-5\">\n";
  fullTsx += "            <ul className=\"flex justify-center items-center space-x-4 md:space-x-8\">\n";
  fullTsx += "              <li><a href=\"#home\" style={dynamicStyles.navLinks} className=\"hover:text-[var(--hover-color)] text-sm md:text-lg transition-colors\" onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.setProperty('--hover-color', dynamicStyles.navLinksHover.color || \"orangered\")} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.removeProperty('--hover-color')}>Home</a></li>\n";
  fullTsx += "              {portfolioData.showAboutSection && <li><a href=\"#about\" style={dynamicStyles.navLinks} className=\"hover:text-[var(--hover-color)] text-sm md:text-lg transition-colors\" onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.setProperty('--hover-color', dynamicStyles.navLinksHover.color || \"orangered\")} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.removeProperty('--hover-color')}>About</a></li>}\n";
  fullTsx += "              {portfolioData.showAcademicSection && portfolioData.academicEntries && portfolioData.academicEntries.filter(e => e && e.qualification).length > 0 && <li><a href=\"#academic\" style={dynamicStyles.navLinks} className=\"hover:text-[var(--hover-color)] text-sm md:text-lg transition-colors\" onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.setProperty('--hover-color', dynamicStyles.navLinksHover.color || \"orangered\")} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.removeProperty('--hover-color')}>Education</a></li>}\n";
  fullTsx += "              {portfolioData.showProjectsSection && portfolioData.projects && portfolioData.projects.filter(p => p && p.name).length > 0 && <li><a href=\"#work\" style={dynamicStyles.navLinks} className=\"hover:text-[var(--hover-color)] text-sm md:text-lg transition-colors\" onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.setProperty('--hover-color', dynamicStyles.navLinksHover.color || \"orangered\")} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.removeProperty('--hover-color')}>Work</a></li>}\n";
  fullTsx += "              {portfolioData.showSkillsSection && portfolioData.aboutSkills && <li><a href=\"#skills\" style={dynamicStyles.navLinks} className=\"hover:text-[var(--hover-color)] text-sm md:text-lg transition-colors\" onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.setProperty('--hover-color', dynamicStyles.navLinksHover.color || \"orangered\")} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.removeProperty('--hover-color')}>Skills</a></li>}\n";
  fullTsx += "              {portfolioData.showContactSection && <li><a href=\"#contact\" style={dynamicStyles.navLinks} className=\"hover:text-[var(--hover-color)] text-sm md:text-lg transition-colors\" onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.setProperty('--hover-color', dynamicStyles.navLinksHover.color || \"orangered\")} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.removeProperty('--hover-color')}>Contact</a></li>}\n";
  fullTsx += "              {portfolioData.showResumeLink && portfolioData.resumeUrl && (\n";
  fullTsx += "                <li>\n";
  fullTsx += "                  <a href={portfolioData.resumeUrl} target='_blank' rel='noopener noreferrer'>\n";
  fullTsx += "                    <button \n";
  fullTsx += "                      style={dynamicStyles.navButton} \n";
  fullTsx += "                      className='text-sm md:text-lg font-medium py-2 px-4 md:py-2.5 md:px-6 border-2 rounded-2xl transition-colors duration-200'\n";
  fullTsx += "                      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.backgroundColor = dynamicStyles.navButtonHover.backgroundColor || \"orangered\"; e.currentTarget.style.color = dynamicStyles.navButtonHover.color || \"white\"; }}\n";
  fullTsx += "                      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.backgroundColor = dynamicStyles.navButton.backgroundColor || \"transparent\"; e.currentTarget.style.color = dynamicStyles.navButton.color || \"#f4fbe6\"; }}\n";
  fullTsx += "                    >\n";
  fullTsx += "                      Download CV\n";
  fullTsx += "                    </button>\n";
  fullTsx += "                  </a>\n";
  fullTsx += "                </li>\n";
  fullTsx += "              )}\n";
  fullTsx += "            </ul>\n";
  fullTsx += "          </nav>\n";
  fullTsx += "          <section id=\"home\" className=\"pt-10 pb-10 md:pt-16 md:pb-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 min-h-[calc(100vh-130px)] scroll-mt-20\">\n";
  fullTsx += "            <div className=\"md:w-1/2 text-center md:text-left order-2 md:order-1\">\n";
  fullTsx += "              <h1 className=\"text-4xl sm:text-5xl lg:text-6xl font-normal mb-3\">\n";
  fullTsx += "                <span style={dynamicStyles.heroH1Span1} className=\"block text-2xl sm:text-3xl lg:text-4xl font-medium\">Hello! I'm</span>\n";
  fullTsx += "                <span style={dynamicStyles.heroH1Span2} className=\"font-medium\">{portfolioData.yourName}</span>\n";
  fullTsx += "              </h1>\n";
  fullTsx += "              <h2 style={dynamicStyles.heroH2} className=\"text-xl sm:text-2xl lg:text-3xl font-light mb-4\">\n";
  fullTsx += "                {portfolioData.heroTitle}\n";
  fullTsx += "              </h2>\n";
  fullTsx += "              {portfolioData.heroTagline && <p className=\"text-base lg:text-lg mb-6 opacity-90 leading-relaxed\" dangerouslySetInnerHTML={{ __html: (portfolioData.heroTagline || \"\").replace(/\\n/g, '<br />') }} />}\n";
  fullTsx += "              <a href=\"#about\">\n";
  fullTsx += "                <button \n";
  fullTsx += "                  style={dynamicStyles.heroCtaButton}\n";
  fullTsx += "                  className=\"py-3 px-8 text-base lg:text-lg rounded-full font-medium border-2 transition-colors duration-200\"\n";
  fullTsx += "                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.backgroundColor = dynamicStyles.heroCtaButtonHover.backgroundColor || \"transparent\"; e.currentTarget.style.color = dynamicStyles.heroCtaButtonHover.color || \"orangered\"; }}\n";
  fullTsx += "                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.backgroundColor = dynamicStyles.heroCtaButton.backgroundColor || \"orangered\"; e.currentTarget.style.color = dynamicStyles.heroCtaButton.color || \"white\"; }}\n";
  fullTsx += "                >\n";
  fullTsx += "                  {portfolioData.heroCtaText || \"About Me\"}\n";
  fullTsx += "                </button>\n";
  fullTsx += "              </a>\n";
  fullTsx += "            </div>\n";
  fullTsx += "            {portfolioData.heroImagePlaceholder && (\n";
  fullTsx += "              <div className=\"md:w-1/2 flex justify-center md:justify-end order-1 md:order-2\">\n";
  fullTsx += "                <Image \n";
  fullTsx += "                  src={portfolioData.heroImagePlaceholder} \n";
  fullTsx += "                  alt={portfolioData.yourName || \"Portfolio Owner\"} \n";
  fullTsx += "                  width={400} height={450} \n";
  fullTsx += "                  className=\"object-contain filter brightness-90 max-w-xs md:max-w-sm lg:max-w-md rounded-lg shadow-lg\"\n";
  fullTsx += "                  data-ai-hint='professional portrait creative theme'\n";
  fullTsx += "                  priority \n";
  fullTsx += "                />\n";
  fullTsx += "              </div>\n";
  fullTsx += "            )}\n";
  fullTsx += "          </section>\n";
  fullTsx += "          {portfolioData.showAboutSection && (\n";
  fullTsx += "            <section id=\"about\" className=\"py-16 md:py-24 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 scroll-mt-20\">\n";
  fullTsx += "              {(portfolioData.academicEntries && portfolioData.academicEntries.length > 0 && portfolioData.academicEntries[0]?.imageUrl) && (\n";
  fullTsx += "                <div className='md:w-2/5 flex justify-center'>\n";
  fullTsx += "                   <Image\n";
  fullTsx += "                    src={(portfolioData.academicEntries && portfolioData.academicEntries.length > 0 && portfolioData.academicEntries[0]?.imageUrl) || portfolioData.heroImagePlaceholder || 'https://placehold.co/350x400/DAEFB3/4B0000?text=About&font=ubuntu'}\n";
  fullTsx += "                    alt={'About me image'}\n";
  fullTsx += "                    width={350}\n";
  fullTsx += "                    height={400}\n";
  fullTsx += "                    className=\"object-contain max-w-xs md:max-w-sm rounded-lg shadow-lg\"\n";
  fullTsx += "                    data-ai-hint='hobby leisure creative'\n";
  fullTsx += "                  />\n";
  fullTsx += "                </div>\n";
  fullTsx += "              )}\n";
  fullTsx += "              <div className={`md:w-${(portfolioData.academicEntries && portfolioData.academicEntries.length > 0 && portfolioData.academicEntries[0]?.imageUrl) ? '3/5' : 'full'} text-center md:text-left`}>\n";
  fullTsx += "                <h3 style={dynamicStyles.sectionTitle} className=\"text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6\">About Me</h3>\n";
  fullTsx += "                {portfolioData.aboutBio && <p className=\"text-base lg:text-lg leading-relaxed opacity-95\" dangerouslySetInnerHTML={{ __html: (portfolioData.aboutBio || \"\").replace(/\\n/g, '<br />') }} />}\n";
  fullTsx += "                {portfolioData.showFunFact && portfolioData.aboutFunFact && <p className=\"mt-4 text-sm italic text-foreground/70\">Fun Fact: {portfolioData.aboutFunFact}</p>}\n";
  fullTsx += "              </div>\n";
  fullTsx += "            </section>\n";
  fullTsx += "          )}\n";
  fullTsx += "          {portfolioData.showAcademicSection && portfolioData.academicEntries && portfolioData.academicEntries.filter(entry => entry && entry.qualification).length > 0 && (\n";
  fullTsx += "            <section id=\"academic\" className=\"py-16 md:py-24 scroll-mt-20\">\n";
  fullTsx += "              <h3 style={dynamicStyles.sectionTitle} className=\"text-3xl sm:text-4xl lg:text-5xl font-semibold mb-10 text-center\">Academic Journey</h3>\n";
  fullTsx += "              <div className=\"max-w-3xl mx-auto\">\n";
  fullTsx += "                 <div className='space-y-8 bg-background/5 border border-primary/20 p-6 rounded-lg shadow-lg'>\n";
  fullTsx += "                    {portfolioData.academicEntries.filter(entry => entry && entry.qualification).map((entryData, index) => renderAcademicEntryTsx(entryData, `academic-${index}`))}\n";
  fullTsx += "                 </div>\n";
  fullTsx += "              </div>\n";
  fullTsx += "            </section>\n";
  fullTsx += "          )}\n";
  fullTsx += "          {portfolioData.showProjectsSection && portfolioData.projects && portfolioData.projects.filter(p => p && p.name).length > 0 && (\n";
  fullTsx += "            <section id=\"work\" className=\"py-16 md:py-24 scroll-mt-20\">\n";
  fullTsx += "              <h3 style={dynamicStyles.sectionTitle} className=\"text-3xl sm:text-4xl lg:text-5xl font-semibold mb-10 text-center\">My Work</h3>\n";
  fullTsx += "              <div className=\"grid md:grid-cols-2 gap-8 md:gap-12\">\n";
  fullTsx += "                {portfolioData.projects.filter(p => p && p.name).map((projectItemData, index) => renderProjectCardTsx(projectItemData, `project-${index}`))}\n";
  fullTsx += "              </div>\n";
  fullTsx += "            </section>\n";
  fullTsx += "          )}\n";
  fullTsx += "          {portfolioData.showSkillsSection && portfolioData.aboutSkills && (\n";
  fullTsx += "            <section id=\"skills\" className=\"py-16 md:py-24 scroll-mt-20\">\n";
  fullTsx += "              <h3 style={dynamicStyles.sectionTitle} className=\"text-3xl sm:text-4xl lg:text-5xl font-semibold mb-10 text-center\">My Skills</h3>\n";
  fullTsx += "              <div className=\"flex flex-wrap justify-center gap-3\">\n";
  fullTsx += "                {(portfolioData.aboutSkills || '').split(',').map((skill, index) => skill.trim() && (\n";
  fullTsx += "                  <span key={index} className=\"bg-accent/80 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium shadow-md hover:bg-accent transition-colors cursor-default\" style={{backgroundColor: portfolioData.accentColor, color: getContrastColorForTsx(portfolioData.accentColor)}}>{skill.trim()}</span>\n";
  fullTsx += "                ))}\n";
  fullTsx += "              </div>\n";
  fullTsx += "            </section>\n";
  fullTsx += "          )}\n";
  fullTsx += "          {portfolioData.showContactSection && (\n";
  fullTsx += "            <footer id=\"contact\" style={dynamicStyles.footer} className=\"scroll-mt-20\">\n";
  fullTsx += "               <h3 style={dynamicStyles.sectionTitle} className=\"text-3xl sm:text-4xl font-semibold mb-8 text-center\">Contact Me</h3>\n";
  fullTsx += "              {portfolioData.contactEmail && (\n";
  fullTsx += "                <p className=\"mb-4 text-lg\">\n";
  fullTsx += "                  Feel free to reach out: <a href={'mailto:' + portfolioData.contactEmail} style={dynamicStyles.contactLinks} className=\"hover:underline\">{portfolioData.contactEmail}</a>\n";
  fullTsx += "                </p>\n";
  fullTsx += "              )}\n";
  fullTsx += "              <div className=\"flex justify-center space-x-6 mb-6\">\n";
  fullTsx += "                {portfolioData.contactLinkedin && <a href={portfolioData.contactLinkedin} target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"LinkedIn\" style={dynamicStyles.contactLinks} className=\"hover:text-[var(--hover-color)] transition-colors\" onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.setProperty('--hover-color', dynamicStyles.contactLinksHover.color || \"white\")} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.removeProperty('--hover-color')}><Linkedin size={28} /></a>}\n";
  fullTsx += "                {portfolioData.contactGithub && <a href={portfolioData.contactGithub} target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"GitHub\" style={dynamicStyles.contactLinks} className=\"hover:text-[var(--hover-color)] transition-colors\" onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.setProperty('--hover-color', dynamicStyles.contactLinksHover.color || \"white\")} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.removeProperty('--hover-color')}><Github size={28} /></a>}\n";
  fullTsx += "                {portfolioData.contactInstagram && <a href={portfolioData.contactInstagram} target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Instagram\" style={dynamicStyles.contactLinks} className=\"hover:text-[var(--hover-color)] transition-colors\" onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.setProperty('--hover-color', dynamicStyles.contactLinksHover.color || \"white\")} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.target as HTMLElement).style.removeProperty('--hover-color')}><InstagramIcon size={28} /></a>}\n";
  fullTsx += "              </div>\n";
  fullTsx += "              <p className=\"text-sm opacity-80\">&copy; {new Date().getFullYear()} {portfolioData.yourName}. All Rights Reserved.</p>\n";
  fullTsx += "            </footer>\n";
  fullTsx += "          )}\n";
  fullTsx += "        </div>\n";
  fullTsx += "      </div>\n";
  fullTsx += "    </>\n";
  fullTsx += "  );\n";
  fullTsx += "};\n";
  fullTsx += "\n";
  fullTsx += "export default function GeneratedPage() {\n";
  fullTsx += "  const rawDataString = '" + escJsStr(JSON.stringify(data)) + "';\n";
  fullTsx += "  let propsToPass: FormSchemaType;\n";
  fullTsx += "  try {\n";
  fullTsx += "    const parsed = JSON.parse(rawDataString);\n";
  fullTsx += "    if (typeof parsed === 'object' && parsed !== null) {\n";
  fullTsx += "      propsToPass = { ...defaultErrorProps, ...parsed };\n";
  fullTsx += "      propsToPass.academicEntries = Array.isArray(parsed.academicEntries) ? parsed.academicEntries.map((entry: any) => ({...(defaultErrorProps.academicEntries?.[0] || {}), ...entry})) : defaultErrorProps.academicEntries;\n";
  fullTsx += "      propsToPass.projects = Array.isArray(parsed.projects) ? parsed.projects.map((project: any) => ({...(defaultErrorProps.projects?.[0] || {}), ...project})) : defaultErrorProps.projects;\n";
  fullTsx += "    } else {\n";
  fullTsx += "      propsToPass = defaultErrorProps;\n";
  fullTsx += "    }\n";
  fullTsx += "  } catch (e) {\n";
  fullTsx += "    console.error(\"Error parsing props in Creative Template GeneratedPage:\", e, \"\\\\nRaw data was:\", rawDataString);\n";
  fullTsx += "    propsToPass = defaultErrorProps;\n";
  fullTsx += "  }\n";
  fullTsx += "  return <" + siteNameClean + "PortfolioPage portfolioData={propsToPass} />;\n";
  fullTsx += "}\n";

  // --- PREVIEW HTML ---
  const previewForegroundColor = getContrastColor(data.backgroundColor);
  const previewPrimaryColor = data.primaryColor;
  const previewAccentColor = data.accentColor;
  const previewBackgroundColor = data.backgroundColor;
  const previewPrimaryContrast = getContrastColor(data.primaryColor);
  const previewAccentContrast = getContrastColor(data.accentColor);

  const renderAcademicEntryHtml = (academicItemData: AcademicEntryType | undefined, reactListKey: string): string => {
    if (!academicItemData || !academicItemData.qualification) return '';
    let html = '';
    html += "<div class='template-creative-academic-entry' style='margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px dashed " + escCssVal(previewPrimaryColor) + "33;'>";
    if (academicItemData.imageUrl) {
      html += "<img src='" + escAttr(academicItemData.imageUrl) + "' alt='" + escAttr(academicItemData.qualification || 'Academic Achievement') + "' data-ai-hint='education university building' style='border-radius: 6px; margin-bottom: 0.75rem; width: 100%; max-width:450px; height: auto; object-fit: cover; border: 1px solid " + escCssVal(previewPrimaryColor) + "33; display:block; margin-left:auto; margin-right:auto;' />";
    }
    html += "<h4 style='font-size:1.1em;font-weight:600;color:" + escCssVal(previewPrimaryColor) + ";margin-bottom:0.1rem;text-align:center;'>" + escHtml(academicItemData.qualification) + " - " + escHtml(academicItemData.institution) + "</h4>";
    html += "<p style='font-size:0.9em;color:" + escCssVal(previewForegroundColor) + "AA;margin-bottom:0.1rem;text-align:center;'><em>" + escHtml(academicItemData.graduationYear) + (academicItemData.grades ? " | Grades: " + escHtml(academicItemData.grades) : "") + "</em></p>";
    if (academicItemData.description) html += "<p style='font-size:0.85em;color:" + escCssVal(previewForegroundColor) + "CC;line-height:1.6;text-align:justify;'>" + (escHtml(academicItemData.description || "")).replace(/\n/g, "<br/>") + "</p>";
    html += "</div>";
    return html;
  };

  const renderProjectCardHtml = (projectItemData: ProjectType | undefined, reactListKey: string): string => {
    if (!projectItemData || !projectItemData.name) return '';
    let cardHtml = '';
    cardHtml += "<div class='template-creative-project-card' style='background-color: " + escCssVal(previewBackgroundColor) + "; border: 1px solid " + escCssVal(previewPrimaryColor) + "4D; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 15px " + escCssVal(previewPrimaryColor) + "1A;'>";
    if (projectItemData.imageUrl) {
      cardHtml += "<img src='" + escAttr(projectItemData.imageUrl) + "' alt='" + escAttr(projectItemData.name) + "' data-ai-hint='project image classic' style='width: 100%; height: auto; max-height:200px; object-fit: cover; border-radius: 4px; margin-bottom: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1);' />";
    }
    cardHtml += "<h4 style='font-size: 1.25rem; font-weight: 600; color: " + escCssVal(previewPrimaryColor) + "; margin-bottom: 0.5rem;'>" + escHtml(projectItemData.name) + "</h4>";
    cardHtml += "<p class='desc' style='font-size: 0.9rem; color: " + escCssVal(previewForegroundColor) + "D9; opacity: 0.9; margin-bottom: 0.75rem; line-height:1.6;'>" + (escHtml(projectItemData.description || "")).replace(/\n/g, "<br/>") + "</p>";
    cardHtml += "<p class='tech' style='font-size: 0.75rem; color: " + escCssVal(previewForegroundColor) + "B3; opacity: 0.7; font-style: italic; margin-bottom: 1rem;'>Technologies: " + escHtml(projectItemData.technologies) + "</p>";
    cardHtml += "<div class='links' style='display:flex; gap:0.75rem;'>";
    if (projectItemData.liveUrl) {
      cardHtml += "<a href='" + escAttr(projectItemData.liveUrl) + "' target='_blank' style='padding: 0.5rem 1rem; font-size:0.9rem; border-radius: 4px; border: 1px solid " + escCssVal(previewAccentColor) + "; color: " + escCssVal(previewAccentColor) + "; background-color: transparent; text-decoration: none;'>Live Site</a>";
    }
    if (projectItemData.repoUrl) {
      cardHtml += "<a href='" + escAttr(projectItemData.repoUrl) + "' target='_blank' style='padding: 0.5rem 1rem; font-size:0.9rem; border-radius: 4px; border: 1px solid " + escCssVal(previewAccentColor) + "; color: " + escCssVal(previewAccentColor) + "; background-color: transparent; text-decoration: none;'>View Code</a>";
    }
    cardHtml += "</div></div>";
    return cardHtml;
  };
  
  let inlineStyles = "";
  inlineStyles += "body, html { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; font-family: 'Ubuntu', sans-serif; }\n";
  inlineStyles += ".template-creative-preview-body { background-color: " + escCssVal(data.backgroundColor) + "; color: " + escCssVal(previewForegroundColor) + "; cursor: default; }\n";
  inlineStyles += ".container-preview { max-width: 1100px; margin: 0 auto; padding: 0 1rem; }\n";
  
  inlineStyles += "nav.creative-nav-preview { display: flex; justify-content: center; position: sticky; top: 0; background-color: transparent; z-index: 100; transition: background-color 0.2s linear; padding: 1.25rem 0;}\n";
  inlineStyles += "nav.creative-nav-preview.scrolled { background-color: " + escCssVal(data.backgroundColor) + " !important; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }\n";
  inlineStyles += "nav.creative-nav-preview ul { display: flex; padding: 0; align-items: center; list-style:none; flex-wrap:wrap; justify-content:center;}\n";
  inlineStyles += "nav.creative-nav-preview ul a { text-decoration:none; }\n";
  inlineStyles += "nav.creative-nav-preview ul a li { font-size: 16px; font-weight: 500; color: #ffffff; transition: color 100ms linear; margin: 5px 10px; } @media (min-width:768px){nav.creative-nav-preview ul a li{font-size:18px; margin:0px 20px;}}\n";
  inlineStyles += "nav.creative-nav-preview ul a:hover li { color: " + escCssVal(data.accentColor) + "; }\n";
  inlineStyles += "nav.creative-nav-preview button.btn-1-preview { font-size: 16px; font-weight: 500; padding: 10px 20px; border: solid 2px " + escCssVal(data.accentColor) + "; border-radius: 20px; background-color: transparent; color: #f4fbe6; cursor: pointer; transition: background-color 100ms linear, color 100ms linear; margin-left: 10px; } @media (min-width:768px){nav.creative-nav-preview button.btn-1-preview{font-size:18px; padding:13px 29px; margin-left:26px;}}\n";
  inlineStyles += "nav.creative-nav-preview button.btn-1-preview:hover { background-color: " + escCssVal(data.accentColor) + "; color: " + escCssVal(previewAccentContrast) + "; }\n";
  
  inlineStyles += ".land-preview { display: flex; flex-direction:column; justify-content: center; align-items:center; margin-top: 2.5rem; padding-bottom:2rem; min-height: calc(100vh - 90px - 50px); scroll-margin-top:90px;} \n"; 
  inlineStyles += "@media (min-width: 768px) { .land-preview { flex-direction:row; } }\n";
  inlineStyles += ".items-land-preview { width: 100%; margin: 0.5rem 0; }\n";
  inlineStyles += "@media (min-width: 768px) { .items-land-preview { width: 45%; margin: 0 1rem; } }\n";
  inlineStyles += ".image-land-preview { order:1; display:flex; justify-content:center;} @media (min-width:768px){.image-land-preview{order:2; justify-content:flex-end;}}\n";
  inlineStyles += ".image-land-preview img { width: 100%; max-width:320px; filter: brightness(0.9); margin:0 auto; border-radius:8px; box-shadow: 0 5px 15px rgba(0,0,0,0.3);} @media (min-width:768px){.image-land-preview img {max-width:380px;}} \n";
  
  inlineStyles += ".txt-land-preview { order:2; display: flex; flex-direction: column; align-items: center; text-align:center; margin-top: 2rem; } \n";
  inlineStyles += "@media (min-width: 768px) { .txt-land-preview {order:1; align-items: flex-start; text-align:left; margin-top: 0; } }\n";
  inlineStyles += ".txt-land-preview h1 { font-size: 2.5rem; font-weight: 400; line-height:1.2; } \n";
  inlineStyles += "@media (min-width: 640px) { .txt-land-preview h1 {font-size: 3.2rem;} } \n";
  inlineStyles += "@media (min-width: 1024px) { .txt-land-preview h1 {font-size: 3.8rem;} } \n";
  inlineStyles += ".h1-1-preview { font-size: 1.8rem; font-weight: 500; color: " + escCssVal(data.accentColor) + "; display:block; } \n";
  inlineStyles += "@media (min-width: 640px) { .h1-1-preview {font-size: 2.1rem;} } \n";
  inlineStyles += "@media (min-width: 1024px) { .h1-1-preview {font-size: 2.4rem;} } \n";
  inlineStyles += ".h1-2-preview { font-weight: 500; color: " + escCssVal(data.primaryColor) + "; } \n";
  inlineStyles += ".txt-land-preview h2 { padding: 0.8rem 0 1.3rem 0; font-weight: 300; font-size: 1.5rem; color: " + escCssVal(previewForegroundColor) + "; } \n";
  inlineStyles += "@media (min-width: 640px) { .txt-land-preview h2 {font-size: 1.7rem;} } \n";
  inlineStyles += "@media (min-width: 1024px) { .txt-land-preview h2 {font-size: 1.9rem;} } \n";
  inlineStyles += ".txt-land-preview p { font-weight: 400; margin-bottom: 2.3rem; text-align: center; margin-top: 0.6rem; opacity:0.9; line-height:1.7;} \n";
  inlineStyles += "@media (min-width: 768px) { .txt-land-preview p { text-align: left; max-width:85%;} } \n";
  inlineStyles += ".txt-land-preview button.hero-cta-btn-preview { padding: 0.8rem 2rem; border-radius: 50px; font-size: 1rem; font-weight: 500; color: " + escCssVal(previewAccentContrast) + "; border: solid 2px " + escCssVal(data.accentColor) + "; background-color: " + escCssVal(data.accentColor) + "; transition: background-color 200ms, color 200ms; cursor: pointer; } \n";
  inlineStyles += ".txt-land-preview button.hero-cta-btn-preview:hover { background-color: transparent; color: " + escCssVal(data.accentColor) + ";} \n";
  
  inlineStyles += ".about-preview { display: flex; flex-direction:column; margin: 10vh auto; justify-content: center; align-items:center; gap:2rem; padding: 2rem 0; width:90%; scroll-margin-top:90px;} \n"; 
  inlineStyles += "@media (min-width: 768px) { .about-preview { flex-direction:row; margin: 15vh auto; gap:3rem; width:85%;} } \n";
  inlineStyles += ".about-txt-preview { width: 100%; text-align:center; } \n";
  inlineStyles += "@media (min-width: 768px) { .about-txt-preview { width: 60%; text-align:left; } } \n";
  inlineStyles += ".about-pic-preview { width: 100%; max-width:300px; display: flex; justify-content: center; } \n";
  inlineStyles += "@media (min-width: 768px) { .about-pic-preview { width: 40%; max-width:350px; } } \n";
  inlineStyles += ".about-pic-preview img { width: 100%; object-fit:contain; border-radius:8px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }\n";
  inlineStyles += ".about-preview h3.section-title { font-size: 2.8rem; margin-bottom: 2rem; color: " + escCssVal(data.primaryColor) + "; text-align:center; } \n";
  inlineStyles += "@media (min-width: 768px) { .about-preview h3.section-title { text-align: left; } } \n";
  inlineStyles += ".about-txt-preview p { text-align: center; font-size: 1.1rem; line-height:1.8; opacity:0.95;} \n";
  inlineStyles += "@media (min-width: 768px) { .about-txt-preview p { text-align: left; width: 90%; } } \n";

  inlineStyles += ".academic-section-preview { padding: 4rem 1rem; scroll-margin-top:90px;} \n";
  inlineStyles += ".academic-section-preview h3.section-title { font-size: 2.8rem; margin-bottom: 3rem; text-align:center; color: " + escCssVal(data.primaryColor) + ";} \n";
  inlineStyles += ".timeline-box-preview { background-color: " + escCssVal(previewBackgroundColor) + "EE; border: 1px solid " + escCssVal(previewPrimaryColor) + "33; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px " + escCssVal(previewPrimaryColor) + "1A; max-width: 700px; margin:0 auto;}\n";

  inlineStyles += ".work-section-preview { padding: 4rem 1rem; scroll-margin-top:90px;} \n"; 
  inlineStyles += ".work-section-preview h3.section-title { font-size: 2.8rem; margin-bottom: 3rem; text-align:center; color: " + escCssVal(data.primaryColor) + ";} \n";
  inlineStyles += ".projects-grid-preview { display: grid; grid-template-columns: 1fr; gap: 2rem; max-width: 900px; margin: 0 auto;} \n";
  inlineStyles += "@media (min-width: 768px) { .projects-grid-preview { grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); } } \n";
  
  inlineStyles += ".skills-section-preview { padding: 4rem 1rem; scroll-margin-top:90px;}\n";
  inlineStyles += ".skills-section-preview h3.section-title { font-size: 2.8rem; margin-bottom: 2rem; text-align:center; color: " + escCssVal(data.primaryColor) + ";}\n";
  inlineStyles += ".skills-list-preview { display:flex; flex-wrap:wrap; justify-content:center; gap:0.75rem; padding:0; list-style:none;}\n";
  inlineStyles += ".skills-list-preview li { background-color: " + escCssVal(data.accentColor) + "CC; color: " + escCssVal(previewAccentContrast) + "; padding: 0.5rem 1rem; border-radius: 20px; font-size:0.9rem; font-weight:500; box-shadow: 0 1px 3px rgba(0,0,0,0.1);}\n";
  
  inlineStyles += "footer.creative-footer-preview { border-top: 1px solid " + escCssVal(data.primaryColor) + "66; color: " + escCssVal(previewForegroundColor) + "; padding: 3rem 1rem 2rem 1rem; text-align: center; margin-top: 3rem; scroll-margin-top:90px;} \n"; 
  inlineStyles += "footer.creative-footer-preview h3.section-title { font-size: 2.5rem; font-weight: 600; color: " + escCssVal(data.primaryColor) + "; margin-bottom: 2rem; } \n";
  inlineStyles += "footer.creative-footer-preview p { margin-bottom: 1rem; font-size: 1.1rem; opacity:0.9; } \n";
  inlineStyles += "footer.creative-footer-preview .social-links-preview { display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 1rem; } \n";
  inlineStyles += "footer.creative-footer-preview .social-links-preview a { color: " + escCssVal(data.accentColor) + "; text-decoration: none; transition: color 0.2s; display: inline-block; } \n";
  inlineStyles += "footer.creative-footer-preview .social-links-preview a:hover { color: " + escCssVal(data.primaryColor) + "; transform:scale(1.1); } \n";
  inlineStyles += "footer.creative-footer-preview .social-links-preview svg { width: 28px; height: 28px; } \n";
  inlineStyles += "footer.creative-footer-preview .copyright { font-size: 0.9rem; opacity: 0.8; margin-top: 2rem; } \n";
  
  inlineStyles += "@media (max-width:700px){ nav.creative-nav-preview { padding-left: 1rem; padding-right:1rem;} nav.creative-nav-preview ul a li {font-size:14px; margin:5px 8px;} nav.creative-nav-preview button.btn-1-preview {font-size:14px; padding:8px 16px;} }\n";

  let previewHtml = "";
  previewHtml += "<html><head>";
  previewHtml += "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
  previewHtml += "<title>" + escHtml(data.yourName) + " - Creative Portfolio</title>";
  previewHtml += "<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />";
  previewHtml += "<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />";
  previewHtml += "<link href=\"https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap\" rel=\"stylesheet\" />";
  previewHtml += "<style>" + escCssVal(inlineStyles) + "</style>";
  previewHtml += "</head><body class='template-creative-preview-body'>";
  previewHtml += "<div class='container-preview'>";

  previewHtml += "<nav id='navbar_preview_creative' class='creative-nav-preview'><ul>";
  previewHtml += "  <a href='#home_preview_creative'><li>Home</li></a>";
  if (data.showAboutSection) previewHtml += "  <a href='#about_preview_creative'><li>About</li></a>";
  if (data.showAcademicSection && data.academicEntries && data.academicEntries.filter(e => e && e.qualification).length > 0) previewHtml += "  <a href='#academic_preview_creative'><li>Education</li></a>";
  if (data.showProjectsSection && data.projects && data.projects.filter(p => p && p.name).length > 0) previewHtml += "  <a href='#work_preview_creative'><li>Work</li></a>";
  if (data.showSkillsSection && data.aboutSkills) previewHtml += "  <a href='#skills_preview_creative'><li>Skills</li></a>";
  if (data.showContactSection) previewHtml += "  <a href='#contact_preview_creative'><li>Contact</li></a>";
  if (data.showResumeLink && data.resumeUrl) {
    previewHtml += "  <a href='" + escAttr(data.resumeUrl) + "' target='_blank' rel='noopener noreferrer'><button class='btn-1-preview'>Download CV</button></a>";
  }
  previewHtml += "</ul></nav>";

  previewHtml += "<section id='home_preview_creative' class='land-preview'>";
  previewHtml += "  <div class='txt-land-preview items-land-preview'>";
  previewHtml += "    <h1><span class='h1-1-preview'>" + escHtml("Hello! I'm") + "</span><br/><span class='h1-2-preview'>" + escHtml(data.yourName) + "</span></h1>";
  previewHtml += "    <h2>" + escHtml(data.heroTitle) + "</h2>";
  if(data.heroTagline) previewHtml += "    <p>" + (escHtml(data.heroTagline)).replace(/\n/g, '<br>') + "</p>";
  previewHtml += "    <a href='#about_preview_creative'><button class='hero-cta-btn-preview'>" + escHtml(data.heroCtaText || "About Me") + "</button></a>";
  previewHtml += "  </div>";
  if (data.heroImagePlaceholder) {
    previewHtml += "  <div class='image-land-preview items-land-preview'>";
    previewHtml += "    <img src='" + escAttr(data.heroImagePlaceholder) + "' alt='" + escAttr(data.yourName) + "' data-ai-hint='professional portrait creative theme'/>";
    previewHtml += "  </div>";
  }
  previewHtml += "</section>";
  
  if (data.showAboutSection) {
    previewHtml += "<section id='about_preview_creative' class='about-preview'>";
    const aboutImage = (data.academicEntries && data.academicEntries.length > 0 && data.academicEntries[0]?.imageUrl) ? data.academicEntries[0].imageUrl : data.heroImagePlaceholder;
    const aboutImageAlt = (data.academicEntries && data.academicEntries.length > 0 && data.academicEntries[0]?.institution) ? data.academicEntries[0].institution : "About me image";
    if (aboutImage) { 
      previewHtml += "  <div class='about-pic-preview items-land-preview'>";
      previewHtml += "    <img src='" + escAttr(aboutImage) + "' alt='" + escAttr(aboutImageAlt) + "' data-ai-hint='hobby leisure creative'/>";
      previewHtml += "  </div>";
    }
    previewHtml += "  <div class='about-txt-preview items-land-preview" + (!aboutImage ? " full-width" : "") + "'>";
    previewHtml += "    <h3 class='section-title'>About Me</h3>";
    if(data.aboutBio) previewHtml += "    <p>" + (escHtml(data.aboutBio)).replace(/\n/g, '<br>') + "</p>";
    if(data.showFunFact && data.aboutFunFact) previewHtml += "    <p style='margin-top:1rem; font-style:italic; font-size:0.9em; color:" + escCssVal(previewForegroundColor)+"AA;'>Fun Fact: " + escHtml(data.aboutFunFact) + "</p>";
    previewHtml += "  </div>";
    previewHtml += "</section>";
  }

  if (data.showAcademicSection && data.academicEntries && data.academicEntries.filter(entry => entry && entry.qualification).length > 0) {
    previewHtml += "<section id='academic_preview_creative' class='academic-section-preview'>";
    previewHtml += "  <h3 class='section-title'>Academic Journey</h3>";
    previewHtml += "  <div class='timeline-box-preview'>";
    (data.academicEntries || []).filter(entry => entry && entry.qualification).forEach((entryData, index) => {
      previewHtml += renderAcademicEntryHtml(entryData, `academic-preview-${index}`);
    });
    previewHtml += "  </div></section>";
  }

  if (data.showProjectsSection && data.projects && data.projects.filter(p => p && p.name).length > 0) {
    previewHtml += "<section id='work_preview_creative' class='work-section-preview'>";
    previewHtml += "  <h3 class='section-title'>My Work</h3>";
    previewHtml += "  <div class='projects-grid-preview'>";
    (data.projects || []).filter(p => p && p.name).forEach((projectItemData, index) => {
       previewHtml += renderProjectCardHtml(projectItemData, `project-preview-${index}`);
    });
    previewHtml += "  </div></section>";
  }

  if (data.showSkillsSection && data.aboutSkills) {
    const skillsListPreview = data.aboutSkills.split(',').map(s => s.trim()).filter(s => s);
    if (skillsListPreview.length > 0) {
        previewHtml += "<section id='skills_preview_creative' class='skills-section-preview'>";
        previewHtml += "  <h3 class='section-title'>My Skills</h3>";
        previewHtml += "  <ul class='skills-list-preview'>";
        skillsListPreview.forEach(skill => {
          previewHtml += "<li>" + escHtml(skill) + "</li>";
        });
        previewHtml += "  </ul></section>";
    }
  }

  if (data.showContactSection) {
    previewHtml += "<footer id='contact_preview_creative' class='creative-footer-preview'>";
    previewHtml += "  <h3 class='section-title'>Contact Me</h3>";
    if (data.contactEmail) {
      previewHtml += "  <p>Feel free to reach out: <a href='mailto:" + escAttr(data.contactEmail) + "' style='color:" + escCssVal(previewAccentColor) + "; text-decoration:underline;'>" + escHtml(data.contactEmail) + "</a></p>";
    }
    previewHtml += "  <div class='social-links-preview'>";
    if (data.contactLinkedin) previewHtml += "    <a href='" + escAttr(data.contactLinkedin) + "' target='_blank' rel='noopener noreferrer' aria-label='LinkedIn'><svg viewBox='0 0 24 24' stroke='currentColor' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path><rect x='2' y='9' width='4' height='12'></rect><circle cx='4' cy='4' r='2'></circle></svg></a>";
    if (data.contactGithub) previewHtml += "    <a href='" + escAttr(data.contactGithub) + "' target='_blank' rel='noopener noreferrer' aria-label='GitHub'><svg viewBox='0 0 24 24' stroke='currentColor' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path></svg></a>";
    if (data.contactInstagram) previewHtml += "    <a href='" + escAttr(data.contactInstagram) + "' target='_blank' rel='noopener noreferrer' aria-label='Instagram'><svg viewBox='0 0 24 24' stroke='currentColor' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='2' width='20' height='20' rx='5' ry='5'></rect><path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path><line x1='17.5' y1='6.5' x2='17.51' y2='6.5'></line></svg></a>";
    previewHtml += "  </div>";
    previewHtml += "  <p class='copyright'>&copy; " + new Date().getFullYear() + " " + escHtml(data.yourName) + ". All Rights Reserved.</p>";
    previewHtml += "</footer>";
  }
  
  previewHtml += "</div>"; 
  
  previewHtml += "<script>";
  previewHtml += " " +
    "  const nav_preview_creative = document.getElementById('navbar_preview_creative');" +
    "  if(nav_preview_creative){" +
    "    window.addEventListener('scroll', () => {" +
    "      if (window.scrollY >= 100) {" +
    "        nav_preview_creative.classList.add('scrolled');" +
    "      } else {" +
    "        nav_preview_creative.classList.remove('scrolled');" +
    "      }" +
    "    });" +
    "  }" +
    " ";
  previewHtml += "</script>";
  previewHtml += "</body></html>";

  return { fullTsx, previewHtml };
}


    