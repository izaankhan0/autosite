// src/templates/student.ts
import type { FormSchemaType, AcademicEntryType, ProjectType } from "@/schemas/websiteFormSchema";

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

export function getStudentTemplate(data: FormSchemaType): { fullTsx: string; previewHtml: string } {
  const siteNameClean = (data.yourName?.trim().replace(/\W+/g, '') || "StudentPortfolioSite");

  const defaultErrorProps: FormSchemaType = {
    yourName: "Student Name (Error)",
    heroTitle: "Aspiring Individual (Error)",
    heroTagline: "Error loading tagline.",
    heroCtaText: "View Work",
    heroImagePlaceholder: "https://placehold.co/600x750.png?text=HeroErr",
    aboutBio: "Error loading biography.", // For Student theme, this might map to an academic description.
    aboutSkills: "Skill 1, Skill 2, Affiliation A",
    aboutFunFact: "", // Not directly used in this Student theme reference.
    academicEntries: [{ qualification: "Academic Entry (Error)", institution: "Institution Name (Error)", graduationYear: "Year", grades: "N/A", description: "Details missing.", imageUrl: "https://placehold.co/600x400.png?text=EduErr" }],
    projects: [{ name: "Project/Experience (Error)", description: "Details missing.", technologies: "Role/Duration Missing", liveUrl: "", repoUrl: "", imageUrl: "https://placehold.co/400x500.png?text=WorkErr" }],
    contactEmail: "error@example.com",
    contactLinkedin: "",
    contactGithub: "",
    contactInstagram: "",
    resumeUrl: "",
    theme: "student",
    primaryColor: "#3B82F6", 
    backgroundColor: "#F9FAFB",
    accentColor: "#10B981",
    showAboutSection: true,
    showFunFact: false, 
    showAcademicSection: true,
    showProjectsSection: true,
    showSkillsSection: true,
    showContactSection: true,
    showResumeLink: true,
  };
  
  // Ensure data object has defaults for colors if not provided by the form
  data.primaryColor = data.primaryColor || defaultErrorProps.primaryColor;
  data.backgroundColor = data.backgroundColor || defaultErrorProps.backgroundColor;
  data.accentColor = data.accentColor || defaultErrorProps.accentColor;

  const foregroundColor = getContrastColor(data.backgroundColor);
  const primaryContrast = getContrastColor(data.primaryColor);
  const accentContrast = getContrastColor(data.accentColor);

  const fullTsx = `
// Generated Page: ${escJsStr(data.yourName)}'s Student Portfolio
"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Linkedin, Instagram as InstagramIcon, Download, ArrowUpCircle, Menu, X as XIcon, Mail, Github, Briefcase, GraduationCap, Award, Lightbulb } from 'lucide-react';
import type { FormSchemaType, AcademicEntryType, ProjectType } from "@/schemas/websiteFormSchema";

const ${siteNameClean}PortfolioPage: React.FC<{ portfolioData: FormSchemaType }> = ({ portfolioData }) => {
  if (!portfolioData || !portfolioData.yourName) {
    const errorData = ${JSON.stringify(defaultErrorProps)};
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center', color: '#FF0000', backgroundColor: '#FFF0F0' }}>
        <h1>Error: Core Portfolio Data Missing</h1>
        <p>The portfolio cannot be displayed. Using fallback data:</p>
        <pre style={{textAlign:'left', fontSize:'0.7rem', whiteSpace:'pre-wrap', wordBreak:'break-all'}}>{JSON.stringify(errorData, null, 2)}</pre>
      </div>
    );
  }

  const {
    yourName,
    heroTitle,
    heroTagline,
    heroCtaText,
    heroImagePlaceholder,
    aboutBio, // Not directly used in this template for a separate about section
    aboutSkills,
    academicEntries = [],
    projects = [],
    contactEmail,
    contactLinkedin,
    contactGithub,
    contactInstagram,
    resumeUrl,
    primaryColor = "${escJsStr(defaultErrorProps.primaryColor)}",
    backgroundColor = "${escJsStr(defaultErrorProps.backgroundColor)}",
    accentColor = "${escJsStr(defaultErrorProps.accentColor)}",
    showAcademicSection,
    showProjectsSection,
    showSkillsSection,
    showContactSection,
    showResumeLink,
  } = portfolioData;

  const currentForegroundColor = getContrastColor(backgroundColor);
  const currentPrimaryContrast = getContrastColor(primaryColor);
  const currentAccentContrast = getContrastColor(accentColor);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const skillsArray = showSkillsSection && aboutSkills ? aboutSkills.split(',').map(s => s.trim()).filter(s => s) : [];
  
  const navBtnStyle: React.CSSProperties = { color: accentColor, borderColor: accentColor, backgroundColor: 'transparent' };
  const navBtnHoverStyle: React.CSSProperties = { backgroundColor: accentColor, color: currentAccentContrast, borderColor: accentColor };

  const renderAcademicEntry = (academicItem: AcademicEntryType | undefined, reactListKey: string) => {
    if (!academicItem || !academicItem.qualification) return null;
    const gradesArray = academicItem.grades ? academicItem.grades.split(',').map(g => g.trim()).filter(g => g) : [];
    return (
      <div key={reactListKey} className={\`academic-card-student bg-background/10 dark:bg-white/5 backdrop-blur-sm border border-primary/20 dark:border-white/10 rounded-xl shadow-lg p-4 sm:p-6 transition-all duration-300 hover:shadow-primary/30 hover:-translate-y-1 flex flex-col md:flex-row items-center \${reactListKey.endsWith('-0') || reactListKey.endsWith('-2') || reactListKey.endsWith('-4') ? 'md:flex-row-reverse' : ''} gap-4 sm:gap-6 mb-8 md:mb-10\`}>
        {academicItem.imageUrl && (
          <div className="w-full md:w-2/5 flex-shrink-0">
            <Image 
              src={academicItem.imageUrl} 
              alt={academicItem.institution || "Academic Achievement"} 
              width={600} height={400} 
              className="rounded-lg shadow-md object-cover w-full h-auto border-2" 
              style={{borderColor: accentColor + '88'}}
              data-ai-hint="education university building"
            />
          </div>
        )}
        <div className={\`w-full \${academicItem.imageUrl ? 'md:w-3/5' : 'md:w-full'} text-center md:text-left\`}>
          <h4 className="text-lg sm:text-xl font-semibold mb-1 flex items-center justify-center md:justify-start" style={{color: primaryColor}}>
            <GraduationCap className="inline-block mr-2 h-5 w-5 opacity-80" />{academicItem.institution || "Institution"}
          </h4>
          <span style={{ color: accentColor }} className="block text-md sm:text-lg font-medium mb-2">{academicItem.qualification}</span>
          {academicItem.graduationYear && <p className="text-xs sm:text-sm text-foreground/70 dark:text-white/70 mb-1"><em>{academicItem.graduationYear}</em></p>}
          {gradesArray.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-start gap-1.5 my-2">
              {gradesArray.map((grade, i) => (
                <span key={i} className="px-2 py-0.5 text-xs font-medium shadow-sm border" style={{backgroundColor: \`color-mix(in srgb, \${accentColor} 70%, black 20%)\`, color: currentAccentContrast, borderRadius: '4px', borderColor: \`color-mix(in srgb, \${currentAccentContrast} 30%, transparent)\`}}>{grade}</span>
              ))}
            </div>
          )}
          {academicItem.description && <p className="text-sm leading-relaxed opacity-90 dark:opacity-80 mt-2" dangerouslySetInnerHTML={{ __html: (academicItem.description).replace(/\\n/g, '<br />')}} />}
        </div>
      </div>
    );
  };
  
  const renderWorkExperience = (projectItem: ProjectType | undefined, reactListKey: string) => {
      if (!projectItem || !projectItem.name) return null;
      return (
        <div key={reactListKey} className="work-card-student p-5 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] hover:-translate-y-px border" style={{backgroundColor: \`color-mix(in srgb, \${primaryColor} 85%, \${backgroundColor} 70%)\`, color: currentPrimaryContrast + 'E6', borderColor: primaryColor+'55'}}>
          <h3 className="text-lg md:text-xl font-bold mb-1 flex items-center" style={{color: accentColor}}><Briefcase className="inline-block mr-2 h-5 w-5"/>{projectItem.name}</h3>
          <p className="text-xs sm:text-sm font-semibold mb-2 opacity-80">{projectItem.technologies}</p>
          <p className="text-sm leading-relaxed opacity-90" dangerouslySetInnerHTML={{ __html: (projectItem.description || "").replace(/\\n/g, '<br />')}} />
           {(projectItem.liveUrl || projectItem.repoUrl) && (
            <div className="mt-3 flex space-x-2.5">
              {projectItem.liveUrl && <a href={projectItem.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-md border transition-colors duration-200 shadow-sm hover:shadow-md" style={{borderColor: accentColor, color: accentColor, backgroundColor: 'transparent'}} onMouseEnter={e => e.currentTarget.style.backgroundColor = \`color-mix(in srgb, \${accentColor} 20%, transparent)\`} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>Live Site</a>}
              {projectItem.repoUrl && <a href={projectItem.repoUrl} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-md border transition-colors duration-200 shadow-sm hover:shadow-md" style={{borderColor: accentColor, color: accentColor, backgroundColor: 'transparent'}} onMouseEnter={e => e.currentTarget.style.backgroundColor = \`color-mix(in srgb, \${accentColor} 20%, transparent)\`} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>View Code</a>}
            </div>
          )}
        </div>
      );
  };

  function getContrastColor(hexcolor: string | undefined): string {
    if (!hexcolor || !hexcolor.startsWith('#')) return '#FFFFFF'; 
    let processedHex = hexcolor.slice(1);
    if (processedHex.length === 3) processedHex = processedHex.split('').map(char => char + char).join('');
    if (processedHex.length !== 6) return '#FFFFFF';
    try {
      const r = parseInt(processedHex.substring(0, 2), 16);
      const g = parseInt(processedHex.substring(2, 4), 16);
      const b = parseInt(processedHex.substring(4, 6), 16);
      const yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? '#000000' : '#FFFFFF';
    } catch (e) { return '#FFFFFF'; }
  }

  return (
    <>
      <Head>
        <title>{yourName} - Student Portfolio</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </Head>

      <div style={{ backgroundColor: backgroundColor, color: currentForegroundColor, fontFamily: "'Poppins', sans-serif" }} className="min-h-screen selection:bg-accent selection:text-accent-foreground">
        <div className="student-container mx-auto px-0 sm:px-[2%] md:px-[3%]">
          
          <section id="home" className="student-hero-section relative min-h-screen flex flex-col scroll-mt-20">
            <nav className="student-desktop-nav hidden md:flex justify-between items-center h-[80px] fixed top-0 left-0 right-0 z-50 px-[3%] lg:px-[5%] backdrop-blur-sm" style={{backgroundColor: \`color-mix(in srgb, \${backgroundColor} 80%, transparent)\`, color: currentForegroundColor, borderBottom: \`1px solid \${primaryColor}22\`}}>
              <a href="#home" className="text-xl lg:text-2xl font-['Work_Sans',_sans-serif] font-bold" style={{color: primaryColor}}>{yourName}</a>
              <ul className="flex items-center space-x-3 lg:space-x-5">
                <li><a href="#home" className="text-sm lg:text-base transition-colors duration-200" style={{color: currentForegroundColor }} onMouseEnter={e => e.currentTarget.style.color = accentColor} onMouseLeave={e => e.currentTarget.style.color = currentForegroundColor}>Home</a></li>
                {showAcademicSection && <li><a href="#academic" className="text-sm lg:text-base transition-colors duration-200" style={{color: currentForegroundColor}} onMouseEnter={e => e.currentTarget.style.color = accentColor} onMouseLeave={e => e.currentTarget.style.color = currentForegroundColor}>Academics</a></li>}
                {showProjectsSection && <li><a href="#work" className="text-sm lg:text-base transition-colors duration-200" style={{color: currentForegroundColor }} onMouseEnter={e => e.currentTarget.style.color = accentColor} onMouseLeave={e => e.currentTarget.style.color = currentForegroundColor}>Experience</a></li>}
                {showSkillsSection && <li><a href="#skills" className="text-sm lg:text-base transition-colors duration-200" style={{color: currentForegroundColor }} onMouseEnter={e => e.currentTarget.style.color = accentColor} onMouseLeave={e => e.currentTarget.style.color = currentForegroundColor}>Skills</a></li>}
                {showContactSection && <li><a href="#contact" className="text-sm lg:text-base transition-colors duration-200" style={{color: currentForegroundColor }} onMouseEnter={e => e.currentTarget.style.color = accentColor} onMouseLeave={e => e.currentTarget.style.color = currentForegroundColor}>Contact</a></li>}
              </ul>
              <div className="flex items-center space-x-3 lg:space-x-4">
                {contactLinkedin && <a href={contactLinkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity" title="LinkedIn"><Linkedin size={22} style={{color: currentForegroundColor}} /></a>}
                {contactInstagram && <a href={contactInstagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity" title="Instagram"><InstagramIcon size={22} style={{ color: currentForegroundColor }}/></a>}
                {showResumeLink && resumeUrl && 
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                    <button 
                      className="student-nav-btn h-[42px] w-auto min-w-[110px] text-xs lg:text-sm font-medium border-2 rounded-md transition-colors duration-200 px-3 shadow-sm hover:shadow-md flex items-center justify-center gap-1.5" 
                      style={navBtnStyle}
                      onMouseEnter={e => Object.assign(e.currentTarget.style, navBtnHoverStyle)}
                      onMouseLeave={e => Object.assign(e.currentTarget.style, navBtnStyle)}
                    >
                      <Download size={14}/> My Resume
                    </button>
                  </a>
                }
              </div>
            </nav>

            <button onClick={toggleMenu} className="student-mobile-menu-btn md:hidden fixed top-5 right-5 z-[1001] p-2 rounded-md bg-black/20 backdrop-blur-sm shadow-md">
              <Menu className="h-6 w-6" style={{ color: currentForegroundColor }} />
            </button>

            <div className={\`student-hidden-menu fixed top-0 left-0 h-full w-[250px] z-[1000] transition-transform duration-300 ease-in-out \${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden\`} style={{backgroundColor: \`color-mix(in srgb, \${primaryColor} 85%, \${backgroundColor} 30%)\`, color: currentPrimaryContrast, boxShadow: '3px 0px 10px rgba(0,0,0,0.2)' }}>
              <ul className="flex flex-col items-center justify-center h-full space-y-5 relative p-4">
                <button onClick={toggleMenu} className="absolute top-4 right-4 p-1"><XIcon size={28} style={{color: currentPrimaryContrast}} /></button>
                <li><a href="#home" onClick={toggleMenu} className="text-lg hover:opacity-80">Home</a></li>
                {showAcademicSection && <li><a href="#academic" onClick={toggleMenu} className="text-lg hover:opacity-80">Academics</a></li>}
                {showProjectsSection && <li><a href="#work" onClick={toggleMenu} className="text-lg hover:opacity-80">Experience</a></li>}
                {showSkillsSection && <li><a href="#skills" onClick={toggleMenu} className="text-lg hover:opacity-80">Skills</a></li>}
                {showContactSection && <li><a href="#contact" onClick={toggleMenu} className="text-lg hover:opacity-80">Contact</a></li>}
                <div className="flex items-center space-x-5 mt-6">
                    {contactInstagram && <a href={contactInstagram} target="_blank" rel="noopener noreferrer" onClick={toggleMenu}><InstagramIcon size={30} style={{ color: currentPrimaryContrast }}/></a>}
                    {contactLinkedin && <a href={contactLinkedin} target="_blank" rel="noopener noreferrer" onClick={toggleMenu}><Linkedin size={30} style={{color: currentPrimaryContrast}} /></a>}
                </div>
                {showResumeLink && resumeUrl && 
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>
                     <button 
                      className="student-nav-btn mt-4 h-[50px] w-[150px] text-sm font-medium border-2 rounded-md transition-colors duration-200 shadow hover:shadow-md flex items-center justify-center gap-1.5" 
                      style={{color: currentAccentColor, borderColor: currentAccentColor, backgroundColor: 'transparent' }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = currentAccentColor; e.currentTarget.style.color = currentAccentContrast; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = currentAccentColor; }}
                    ><Download size={16}/> My Resume</button>
                  </a>
                }
              </ul>
            </div>
            
            <div className="student-hero-content-wrapper flex-grow flex flex-col md:flex-row items-center justify-center pt-[90px] md:pt-[100px] px-4">
              <div className="student-hero-image-container w-full md:w-1/2 flex justify-center md:justify-start md:pl-[5%] lg:pl-[8%] order-2 md:order-1">
                {heroImagePlaceholder && <Image 
                  src={heroImagePlaceholder} 
                  alt={yourName || "Portfolio Owner"} 
                  width={600} height={750} 
                  className="max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-[400px] object-contain transition-transform duration-1000 ease-out hover:scale-105 shadow-xl rounded-lg border-2"
                  style={{borderColor: accentColor + '55'}}
                  data-ai-hint="professional portrait student"
                  priority
                />}
              </div>
              <div className="student-hero-text-container w-full md:w-1/2 text-center md:text-left md:pr-[5%] lg:pr-[8%] order-1 md:order-2 mt-8 md:mt-0">
                <div>
                  <h1 className="font-['Work_Sans',_sans-serif] text-3xl sm:text-4xl lg:text-5xl font-normal mb-2 sm:mb-3 leading-tight">
                    Hello, my name is <br />
                    <span style={{ color: accentColor }} className="text-4xl sm:text-5xl lg:text-6xl font-bold">{yourName}</span>
                  </h1>
                  <h2 className="font-['Work_Sans',_sans-serif] text-xl sm:text-2xl lg:text-3xl font-semibold opacity-90 mb-4">
                    {heroTitle}
                  </h2>
                  {heroTagline && <p className="text-sm sm:text-base opacity-80 max-w-md mx-auto md:mx-0 mb-6" dangerouslySetInnerHTML={{ __html: (heroTagline).replace(/\\n/g, '<br />')}}/>}
                  {heroCtaText && 
                    <a href="#work" 
                      className="student-cta-btn inline-block px-6 py-2.5 text-sm sm:text-base font-medium rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      style={{backgroundColor: accentColor, color: currentAccentContrast, border: \`1px solid \${currentAccentContrast}44\`}}
                    >
                      {heroCtaText}
                    </a>
                  }
                </div>
              </div>
            </div>
          </section>

          {showAcademicSection && academicEntries.filter(e => e && e.qualification).length > 0 && (
            <section id="academic" className="student-section py-12 md:py-20 scroll-mt-20 px-4">
              <h3 className="text-center text-3xl md:text-4xl font-['Work_Sans',_sans-serif] font-semibold mb-10 md:mb-16 flex items-center justify-center" style={{color: primaryColor}}>
                <GraduationCap className="inline-block mr-3 h-8 w-8 sm:h-9 sm:w-9" style={{ color: accentColor }}/>Academic Ventures
              </h3>
              <div className="academic-entries-container max-w-4xl mx-auto space-y-10 md:space-y-12">
                {academicEntries
                  .filter(entry => entry && entry.qualification)
                  .map((entryData, index) => renderAcademicEntry(entryData, \`academicEntry-\${index}\`))}
              </div>
            </section>
          )}

          {showSkillsSection && skillsArray.length > 0 && (
             <section id="skills" className="student-skills-section py-12 md:py-16 my-8 md:my-12 scroll-mt-20" style={{backgroundColor: \`color-mix(in srgb, \${primaryColor} 80%, \${backgroundColor} 30%)\` }}>
              <h5 className="text-center text-2xl md:text-3xl font-['Work_Sans',_sans-serif] font-semibold mb-8 md:mb-10 flex items-center justify-center" style={{color: currentPrimaryContrast}}>
                <Award className="inline-block mr-2.5 h-7 w-7 sm:h-8 sm:w-8" /> Skills &amp; Affiliations
              </h5>
              <div className="student-skills-list-container flex flex-wrap justify-center gap-x-3 gap-y-3 px-4 max-w-3xl mx-auto">
                  {skillsArray.map((item, index) => (
                     <span key={index} className="student-skill-tag px-3.5 py-1.5 text-xs sm:text-sm font-medium shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5" style={{backgroundColor: \`color-mix(in srgb, \${accentColor} 80%, black 15%)\`, color: currentAccentContrast, borderRadius: '6px', border: \`1px solid \${currentAccentContrast}33\`}}>
                        {item}
                     </span>
                  ))}
                </div>
            </section>
          )}
          
          {showProjectsSection && projects.filter(p => p && p.name).length > 0 && (
            <section id="work" className="student-work-section py-12 md:py-20 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 px-4 scroll-mt-20">
              <div className="student-work-intro w-full md:w-1/3 text-center md:text-left mb-8 md:mb-0">
                <h6 className="text-3xl md:text-4xl font-['Work_Sans',_sans-serif] font-semibold mb-6 flex items-center justify-center md:justify-start" style={{color: primaryColor}}>
                  <Briefcase className="inline-block mr-2.5 h-8 w-8 sm:h-9 sm:w-9"/>Experience
                </h6>
                {(projects.length > 0 && projects[0] && projects[0].imageUrl) ? (
                  <Image 
                    src={projects[0].imageUrl} 
                    alt="Work Experience Visual" 
                    width={400} height={500} 
                    className="student-work-main-image rounded-lg shadow-xl object-cover mx-auto md:mx-0 border-2"
                    style={{borderColor: accentColor + '55'}}
                    data-ai-hint="office professional work"
                  />
                ) : heroImagePlaceholder && (
                  <Image 
                    src={heroImagePlaceholder} 
                    alt="Work Experience Visual Placeholder" 
                    width={400} height={500} 
                    className="student-work-main-image rounded-lg shadow-xl object-cover mx-auto md:mx-0 border-2"
                    style={{borderColor: accentColor + '55'}}
                    data-ai-hint="office professional work placeholder"
                  />
                )}
              </div>
              <div className="student-work-cards-container w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                {projects
                  .filter(projectItem => projectItem && projectItem.name)
                  .map((projectItem, index) => renderWorkExperience(projectItem, \`project-\${index}\`))}
              </div>
            </section>
          )}

          {showContactSection && (
            <footer id="contact" className="student-footer py-10 md:py-16 px-4 scroll-mt-20" style={{background: \`radial-gradient(circle at top, \${primaryColor}88 0%, \${backgroundColor} 70%)\`, color: currentPrimaryContrast, borderTop: \`2px solid \${primaryColor}\` }}>
              <div onClick={scrollToTop} className="text-center mb-8 cursor-pointer group">
                <ArrowUpCircle size={36} className="mx-auto transition-transform group-hover:-translate-y-1 hover:opacity-80" style={{color: currentAccentColor}}/>
              </div>
              <h2 className="text-center text-2xl sm:text-3xl font-['Work_Sans',_sans-serif] font-semibold mb-8 flex items-center justify-center" style={{color: currentPrimaryContrast}}>
                <Mail className="inline-block mr-2.5 h-7 w-7 sm:h-8 sm:w-8 opacity-90"/>Get In Touch!
              </h2>
              <div className="student-contact-card max-w-2xl mx-auto bg-black/30 dark:bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl border border-white/10">
                <p className="text-center text-base sm:text-lg mb-6 opacity-90">
                  I'm always open to new opportunities and collaborations. Feel free to reach out!
                </p>
                <ol className="student-contact-list flex flex-col sm:flex-row flex-wrap justify-center items-center gap-x-6 gap-y-4 text-center mb-6">
                  {contactEmail && <li><a href={'mailto:' + contactEmail} style={{color: currentPrimaryContrast, textDecoration:'none'}} className="hover:text-opacity-80 hover:underline flex items-center gap-1.5 text-sm sm:text-base"><Mail size={18}/> {contactEmail}</a></li>}
                  {contactLinkedin && <li><a href={contactLinkedin} target="_blank" rel="noopener noreferrer" style={{color: currentPrimaryContrast, textDecoration:'none'}} className="hover:text-opacity-80 hover:underline flex items-center gap-1.5 text-sm sm:text-base"><Linkedin size={18}/> LinkedIn</a></li>}
                  {contactGithub && <li><a href={contactGithub} target="_blank" rel="noopener noreferrer" style={{color: currentPrimaryContrast, textDecoration:'none'}} className="hover:text-opacity-80 hover:underline flex items-center gap-1.5 text-sm sm:text-base"><Github size={18}/> GitHub</a></li>}
                  {contactInstagram && <li><a href={contactInstagram} target="_blank" rel="noopener noreferrer" style={{color: currentPrimaryContrast, textDecoration:'none'}} className="hover:text-opacity-80 hover:underline flex items-center gap-1.5 text-sm sm:text-base"><InstagramIcon size={18}/> Instagram</a></li>}
                </ol>
                {showResumeLink && resumeUrl && (
                  <div className="text-center mt-5">
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" 
                      className="student-resume-btn inline-flex items-center px-5 py-2 text-xs sm:text-sm font-medium border-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                      style={{borderColor: currentAccentColor, color: currentAccentColor, backgroundColor: 'transparent'}}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = currentAccentColor; e.currentTarget.style.color = currentAccentContrast;}}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = currentAccentColor;}}
                    >
                      <Download className="mr-1.5 h-4 w-4"/> Download Resume
                    </a>
                  </div>
                )}
              </div>
              <div className="student-copyright-footer text-center text-xs sm:text-sm opacity-80 mt-10">
                 <p>&copy; {new Date().getFullYear()} {yourName}. Student Portfolio.</p>
              </div>
            </footer>
          )}
        </div>
      </div>
    </>
  );
};

export default function GeneratedPage() {
  const rawDataString = '${escJsStr(JSON.stringify(data))}';
  const baseDefaultProps: FormSchemaType = ${JSON.stringify(defaultErrorProps)};
  let finalProps: FormSchemaType;

  try {
    const parsed = JSON.parse(rawDataString);
    if (typeof parsed === 'object' && parsed !== null) {
      finalProps = {
        ...baseDefaultProps,
        ...parsed,
        academicEntries: Array.isArray(parsed.academicEntries) ? parsed.academicEntries.map((entry: any) => ({...baseDefaultProps.academicEntries[0], ...entry})) : baseDefaultProps.academicEntries,
        projects: Array.isArray(parsed.projects) ? parsed.projects.map((project: any) => ({...baseDefaultProps.projects[0], ...project})) : baseDefaultProps.projects,
      };
    } else {
      finalProps = baseDefaultProps;
    }
  } catch (e) {
    finalProps = baseDefaultProps;
  }
  
  return <${siteNameClean}PortfolioPage portfolioData={finalProps} />;
}
`;

  // --- PREVIEW HTML ---
  const {
    yourName,
    heroTitle,
    heroTagline,
    heroCtaText,
    heroImagePlaceholder,
    // aboutBio, // Not directly used for a separate about section
    aboutSkills,
    academicEntries = [],
    projects = [],
    contactEmail,
    contactLinkedin,
    contactGithub,
    contactInstagram,
    resumeUrl,
    // Colors are taken from data object directly for preview for simplicity
    showAcademicSection,
    showProjectsSection,
    showSkillsSection,
    showContactSection,
    showResumeLink,
  } = { ...defaultErrorProps, ...data, academicEntries: data.academicEntries || [], projects: data.projects || [] };

  const previewSkillsArray = showSkillsSection && aboutSkills ? aboutSkills.split(',').map(s => s.trim()).filter(s => s) : [];

  const previewAcademicEntryHtml = (item: AcademicEntryType | undefined, reactListKey: string): string => {
    if (!item || !item.qualification) return '';
    let html = "";
    const gradesArray = item.grades ? item.grades.split(',').map(g => g.trim()).filter(g => g) : [];
    const reverseClass = reactListKey.endsWith('-0') || reactListKey.endsWith('-2') || reactListKey.endsWith('-4') ? ' reverse-preview' : '';
    
    html += "<div class='academic-card-preview" + reverseClass + "'>";
    if (item.imageUrl) {
      html += "<div class='academic-image-container-preview'><img src='" + escAttr(item.imageUrl) + "' alt='" + escAttr(item.institution || 'Institution visual') + "' data-ai-hint='education " + (reactListKey.includes('academicEntries.0') ? 'school building' : 'college campus') + "' /></div>";
    }
    html += "<div class='academic-text-content-preview" + (!item.imageUrl ? " no-image" : "") + "'>";
    html += "<h4><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='" + escCssVal(data.primaryColor) + "' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.838l8.57 3.908a2 2 0 0 0 1.66 0z'/><path d='M22 10v6'/><path d='M6 12v5c0 1.66 4 3 6 3s6-1.34 6-3v-5'/></svg>" + escHtml(item.institution || "Educational Institution") + "</h4>";
    html += "<span class='qualification-span-preview' style='color:" + escCssVal(data.accentColor) + ";'>" + escHtml(item.qualification) + "</span>";
    if (item.graduationYear) html += "<p class='meta-info-preview'><em>" + escHtml(item.graduationYear) + "</em></p>";
    if (gradesArray.length > 0) {
      html += "<div class='grades-list-preview'>";
      gradesArray.forEach(grade => {
        html += "<span class='grade-tag-preview' style='background-color: " + escCssVal(data.accentColor ? `color-mix(in srgb, ${data.accentColor} 70%, black 20%)` : '#0891B2') + "; color:" + escCssVal(accentContrast) + "; border-color:" + escCssVal(accentContrast ? `color-mix(in srgb, ${accentContrast} 30%, transparent)` : '#FFFFFF4D') + ";'>" + escHtml(grade) + "</span>";
      });
      html += "</div>";
    }
    html += "<p class='description-preview'>" + (escHtml(item.description || "")).replace(/\n/g, '<br>') + "</p>";
    html += "</div></div>";
    return html;
  };

  const previewProjectCardHtml = (projectItem: ProjectType | undefined): string => {
    if (!projectItem || !projectItem.name) return '';
    let cardHtml = '';
    cardHtml += "<div class='workPlaces-preview' style='background-color: " + escCssVal(data.primaryColor ? `color-mix(in srgb, ${data.primaryColor} 85%, ${data.backgroundColor} 70%)` : 'rgb(25,45,70)') + "; color: " + escCssVal(primaryContrast) + "E6; border-color: " + escCssVal(data.primaryColor) + "55;'>";
    cardHtml += "<h3><svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='" + escCssVal(data.accentColor) + "' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='7' width='20' height='14' rx='2' ry='2'></rect><path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'></path></svg>" + escHtml(projectItem.name) + "</h3>";
    cardHtml += "<p class='h_time-preview'>" + escHtml(projectItem.technologies) + "</p>";
    cardHtml += "<p class='h_desc-preview'>" + (escHtml(projectItem.description || "")).replace(/\n/g, '<br>') + "</p>";
    if (projectItem.liveUrl || projectItem.repoUrl) {
      cardHtml += "<div class='work-links-preview'>";
      if (projectItem.liveUrl) cardHtml += "<a href='" + escAttr(projectItem.liveUrl) + "' target='_blank' style='border-color:" + escCssVal(data.accentColor) + "; color:" + escCssVal(data.accentColor) + ";'>Live Site</a>";
      if (projectItem.repoUrl) cardHtml += "<a href='" + escAttr(projectItem.repoUrl) + "' target='_blank' style='border-color:" + escCssVal(data.accentColor) + "; color:" + escCssVal(data.accentColor) + ";'>View Code</a>";
      cardHtml += "</div>";
    }
    cardHtml += "</div>";
    return cardHtml;
  };

  let inlineStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
    body, html { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; font-family: 'Poppins', sans-serif; }
    body { background-color: ${escCssVal(data.backgroundColor)}; color: ${escCssVal(foregroundColor)}; line-height: 1.65; font-size: 16px; overflow-x:hidden; }
    img { max-width: 100%; height: auto; display: block; }
    .student-container-preview { width: 100%; } 
    .student-hero-section-preview { min-height: 100vh; display: flex; flex-direction: column; scroll-margin-top: 80px; }
    
    nav.student-desktop-nav-preview { display: none; justify-content: space-between; align-items: center; height: 80px; background-color: ${escCssVal(data.backgroundColor)}CC; backdrop-filter:blur(5px); position: fixed; top: 0px; left:0; right:0; z-index: 50; padding: 0 3%; border-bottom: 1px solid ${escCssVal(data.primaryColor)}22; }
    @media (min-width: 768px) { nav.student-desktop-nav-preview { display: flex !important; } }
    nav.student-desktop-nav-preview ul { display: flex; list-style:none; align-items:center; padding-left:0; gap: 0.75rem;} @media (min-width:1024px){nav.student-desktop-nav-preview ul{gap:1.25rem;}}
    nav.student-desktop-nav-preview ul a { text-decoration: none !important; } 
    nav.student-desktop-nav-preview ul a li { color: ${escCssVal(foregroundColor)}; font-size: 14px; letter-spacing: 0.5px; transition:color 200ms ease; text-decoration: none !important; list-style:none;} @media (min-width:1024px){nav.student-desktop-nav-preview ul a li{font-size:15px;}}
    nav.student-desktop-nav-preview ul a:hover li { color: ${escCssVal(data.accentColor)}; text-decoration:none !important; }
    nav.student-desktop-nav-preview > a {text-decoration:none;} nav.student-desktop-nav-preview > a > p { font-family:'Work Sans', sans-serif; font-size: 20px; font-weight: 700; color: ${escCssVal(data.primaryColor)}; text-decoration:none; } @media (min-width:1024px){nav.student-desktop-nav-preview > a > p {font-size:22px;}}
    nav.student-desktop-nav-preview .nav-right-preview { display:flex; align-items:center; gap: 0.75rem; } @media (min-width:1024px){nav.student-desktop-nav-preview .nav-right-preview{gap:1rem;}}
    nav.student-desktop-nav-preview .nav-right-preview .social-icon-preview { color: ${escCssVal(foregroundColor)}; width: 20px; height:20px; transition: color 200ms ease, transform 200ms ease; text-decoration: none !important; } @media (min-width:1024px){nav.student-desktop-nav-preview .nav-right-preview .social-icon-preview{width:22px; height:22px;}}
    nav.student-desktop-nav-preview .nav-right-preview .social-icon-preview:hover { color: ${escCssVal(data.accentColor)}; transform: scale(1.1); }
    .student-nav-btn-preview { height: 40px; width: auto; min-width:110px; padding: 0 10px; font-size: 13px; border-radius: 6px; color: ${escCssVal(data.accentColor)}; background-color: transparent; border: solid 2px ${escCssVal(data.accentColor)}; font-weight: 500; cursor: pointer; transition: all 200ms ease; box-shadow: 0 1px 2px rgba(0,0,0,0.05); display:inline-flex; align-items:center; justify-content:center; gap:0.3rem; text-decoration:none;} @media (min-width:1024px){.student-nav-btn-preview{height:42px; width:auto; min-width:120px; font-size:13px;}}
    .student-nav-btn-preview:hover { color: ${escCssVal(accentContrast)}; background-color: ${escCssVal(data.accentColor)}; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transform: translateY(-1px); }
    .student-nav-btn-preview svg {width:16px; height:16px;}
    
    .student-hero-content-wrapper-preview { flex-grow:1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-top: 80px; }
    @media (min-width: 768px) { .student-hero-content-wrapper-preview { flex-direction: row; padding-top: 90px; } } 
    .student-hero-image-container-preview { width: 90%; margin: 1.5rem auto; padding: 0 1rem; order: 2;} @media (min-width: 768px) { .student-hero-image-container-preview { width: 50%; margin: 2rem 0; padding: 0 2%; order: 1;} } 
    .student-hero-image-container-preview img { width: 100%; max-width: 280px; margin:0 auto 1rem auto; transition: transform 1.0s ease-out, box-shadow 0.3s ease; object-fit:contain; border-radius:12px; box-shadow: 0 8px 20px ${escCssVal(data.accentColor)}22; border: 2px solid ${escCssVal(data.accentColor)}55; }
    @media (min-width: 640px) { .student-hero-image-container-preview img { max-width: 320px; } } @media (min-width: 1024px) { .student-hero-image-container-preview img { max-width: 400px; } } 
    .student-hero-image-container-preview img:hover { transform: scale(1.03); box-shadow: 0 12px 30px ${escCssVal(data.accentColor)}33; }
    
    .student-hero-text-container-preview { width: 90%; margin: 1.5rem auto; padding: 0 1rem; order: 1; color: ${escCssVal(foregroundColor)}; text-align: center; } @media (min-width: 768px) { .student-hero-text-container-preview { width: 50%; margin: 2rem 0; padding: 0 2%; order: 2; text-align: left; } } 
    .student-hero-text-container-preview h1 { font-weight: 300; font-size: clamp(1.8rem, 4vw, 2.5rem); padding: 0; margin-bottom: 0.25rem; font-family: 'Work Sans', sans-serif; }
    .student-hero-text-container-preview .name-span-preview { display:block; font-size: clamp(2.2rem, 5.5vw, 3.2rem); color: ${escCssVal(data.accentColor)}; font-weight: 700; margin-bottom:0.25rem; }
    .student-hero-text-container-preview h2 { font-family: 'Work Sans', sans-serif; font-weight: 600; font-size: clamp(1.2rem, 3vw, 1.8rem); padding: 0; opacity:0.9; margin-bottom:1rem;}
    .student-hero-text-container-preview .tagline-preview {font-size: clamp(0.9rem, 2vw, 1rem); opacity:0.8; max-width:450px; margin:0 auto 1.25rem auto;} @media (min-width:768px){.student-hero-text-container-preview .tagline-preview{margin-left:0;}}
    .student-hero-text-container-preview .cta-btn-preview { display:inline-block; padding:0.6rem 1.25rem; font-size:0.9rem; font-weight:500; border-radius:6px; transition:all 0.2s ease; text-decoration:none; background-color:${escCssVal(data.accentColor)}; color:${escCssVal(accentContrast)}; border:1px solid ${escCssVal(accentContrast)}33; box-shadow: 0 2px 5px rgba(0,0,0,0.1);} @media (min-width:768px){.student-hero-text-container-preview .cta-btn-preview{padding:0.7rem 1.5rem; font-size:1rem;}}
    .student-hero-text-container-preview .cta-btn-preview:hover { transform:scale(1.05) translateY(-1px); box-shadow: 0 4px 8px rgba(0,0,0,0.15); filter:brightness(1.1);}

    .student-academic-section-preview { padding: 3rem 1rem; scroll-margin-top: 80px; } @media (min-width: 768px) { .student-academic-section-preview { padding: 4rem 2rem; } }
    .student-academic-section-preview .section-title-preview { text-align: center; color: ${escCssVal(data.primaryColor)}; font-size: clamp(1.8rem, 4vw, 2.5rem); margin-bottom: 2.5rem; font-family:'Work Sans', sans-serif; font-weight:600; display:flex; align-items:center; justify-content:center; gap:0.6rem;} @media (min-width:768px){.student-academic-section-preview .section-title-preview{font-size:clamp(2rem, 4.5vw, 2.75rem);}}
    .student-academic-section-preview .section-title-preview svg { width:1em; height:1em; color:${escCssVal(data.accentColor)}; }
    .academic-entries-container-preview { max-width:900px; margin:0 auto; display:flex; flex-direction:column; gap:2rem; } 
    .academic-card-preview { background-color:${escCssVal(data.backgroundColor)}E6; backdrop-filter:blur(3px); border:1px solid ${escCssVal(data.primaryColor)}33; border-radius:10px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); padding:1.25rem; display:flex; flex-direction:column; gap:1rem; transition:all 0.3s ease;}
    .academic-card-preview.reverse-preview { flex-direction: column; } /* Default to column for all on mobile */
    @media (min-width:768px) { .academic-card-preview { flex-direction:row; gap:1.5rem; align-items:center;} .academic-card-preview.reverse-preview {flex-direction:row-reverse;} }
    .academic-card-preview:hover { transform: translateY(-3px); box-shadow: 0 7px 20px rgba(0,0,0,0.12); }
    .academic-image-container-preview { width:100%; flex-shrink:0; } @media (min-width:768px) { .academic-image-container-preview {width:40%;} }
    .academic-card-preview img { border-radius: 8px; width: 100%; height: auto; max-height:280px; object-fit: cover; border: 1.5px solid ${escCssVal(data.accentColor)}66; }
    .academic-text-content-preview { width:100%; text-align:center;} @media (min-width:768px) { .academic-text-content-preview {text-align:left; width:auto; flex-grow:1;} .academic-text-content-preview.no-image {width:100%;} }
    .academic-card-preview h4 { font-size: 1.2rem; font-weight:600; color: ${escCssVal(data.primaryColor)}; margin-bottom: 0.2rem; display:flex; align-items:center; justify-content:center; gap:0.4rem;} @media (min-width:768px) {.academic-card-preview h4 {font-size:1.3rem; justify-content:flex-start;} }
    .academic-card-preview h4 svg { width:0.9em; height:0.9em; opacity:0.8; }
    .academic-card-preview .qualification-span-preview { display:block; font-size: 1.05rem; font-weight:500; color: ${escCssVal(data.accentColor)}; margin-bottom: 0.4rem; } @media (min-width:768px) {.academic-card-preview .qualification-span-preview {font-size:1.15rem;}}
    .academic-card-preview .meta-info-preview { font-size: 0.75rem; color: ${escCssVal(foregroundColor)}B3; margin-bottom: 0.6rem; }
    .grades-list-preview { display:flex; flex-wrap:wrap; gap:0.4rem; margin-top:0.5rem; margin-bottom:0.6rem; justify-content:center;} @media (min-width:768px) {.grades-list-preview {justify-content:flex-start;}}
    .grade-tag-preview { background-color:transparent; border:1px solid ${escCssVal(data.accentColor ? `color-mix(in srgb, ${data.accentColor} 70%, black 20%)` : '#0891B2')}; color:${escCssVal(data.accentColor ? `color-mix(in srgb, ${data.accentColor} 90%, white 10%)` : '#0E7490')}; padding: 0.2rem 0.5rem; border-radius:4px; font-size:0.65rem; font-weight:500; }
    .academic-card-preview .description-preview { font-size: 0.85rem; line-height: 1.6; color: ${escCssVal(foregroundColor)}D9; }

    .student-skills-section-preview { padding: 3rem 1rem; margin: 2rem 0; background-color: ${escCssVal(data.primaryColor ? `color-mix(in srgb, ${data.primaryColor} 80%, ${data.backgroundColor} 40%)` : '#1A2E40')}; scroll-margin-top: 80px; }
    .student-skills-section-preview h5 { text-align: center; font-size: clamp(1.6rem, 4vw, 2.2rem); color: ${escCssVal(primaryContrast)}; padding-bottom: 2rem; font-family:'Work Sans', sans-serif; font-weight:600; display:flex; align-items:center; justify-content:center; gap:0.5rem;} 
    .student-skills-section-preview h5 svg { width:1em; height:1em; }
    .student-skills-list-container-preview { display:flex; flex-wrap:wrap; justify-content:center; gap:0.6rem; max-width:800px; margin:0 auto;}
    .student-skill-tag-preview { background-color: ${escCssVal(data.accentColor)}BF; color: ${escCssVal(accentContrast)}; padding: 0.4rem 0.8rem; border-radius:6px; font-size:0.8rem; font-weight:500; box-shadow: 0 1px 3px rgba(0,0,0,0.15); transition: all 0.2s ease; border: 1px solid ${escCssVal(accentContrast ? `color-mix(in srgb, ${accentContrast} 30%, transparent)`: '#FFFFFF33')}; }
    .student-skill-tag-preview:hover { transform: translateY(-2px); box-shadow: 0 2px 5px rgba(0,0,0,0.2); filter:brightness(1.1);}

    .student-work-experience-section-preview { padding: 3rem 1rem; display: flex; flex-direction: column; justify-content: space-between; gap: 2rem; scroll-margin-top: 80px; } @media (min-width: 768px) { .student-work-experience-section-preview { flex-direction: row; gap: 2.5rem; padding: 4rem 2rem; } }
    .student-work-experience-intro-preview { width: 100%; text-align:center; } @media (min-width: 768px) { .student-work-experience-intro-preview { width: 35%; text-align:left; } }
    .student-work-experience-intro-preview h6 { font-size: clamp(1.8rem, 4.5vw, 2.5rem); color: ${escCssVal(data.primaryColor)}; margin-bottom:1.25rem; font-family:'Work Sans', sans-serif; font-weight:600; display:flex; align-items:center; justify-content:center; gap:0.5rem;} @media (min-width:768px) {.student-work-experience-intro-preview h6 {justify-content:flex-start;}}
    .student-work-experience-intro-preview h6 svg { width:0.9em; height:0.9em; }
    .student-work-experience-intro-preview img { max-height: 320px; object-fit:cover; margin: 0 auto 1rem auto; border-radius:10px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); border: 1.5px solid ${escCssVal(data.primaryColor)}44; } @media (min-width:768px){.student-work-experience-intro-preview img{margin-left:0; max-height:380px;}}
    .student-work-cards-container-preview { width: 100%; display: grid; grid-template-columns:1fr; gap:1.25rem; } @media (min-width: 600px) { .student-work-cards-container-preview { grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); } } @media (min-width:768px){.student-work-cards-container-preview{width:65%;}}
    .workPlaces-preview { background-color: ${escCssVal(data.primaryColor ? `color-mix(in srgb, ${data.primaryColor} 85%, ${data.backgroundColor} 50%)` : 'rgb(25,45,70)')}; color: ${escCssVal(primaryContrast)}E6; padding: 1.25rem; border-radius:10px; transition: transform 0.2s ease, box-shadow 0.2s ease; box-shadow: 0 3px 10px rgba(0,0,0,0.2); border: 1px solid ${escCssVal(data.primaryColor)}66;}
    .workPlaces-preview:hover { transform: scale(1.015) translateY(-3px); box-shadow: 0 5px 15px rgba(0,0,0,0.25); }
    .workPlaces-preview h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.2rem; color: ${escCssVal(data.accentColor)}; display:flex; align-items:center; gap:0.4rem;} @media (min-width:768px){.workPlaces-preview h3{font-size:1.3rem;}}
    .workPlaces-preview h3 svg { width:0.9em; height:0.9em; }
    .workPlaces-preview .h_time-preview { font-size: 0.8rem; font-weight: 500; margin-bottom:0.6rem; opacity:0.85; }
    .workPlaces-preview .h_desc-preview { font-size:0.85rem; opacity:0.95; line-height:1.6; }
    .work-links-preview { margin-top:1rem; display:flex; gap:0.6rem;}
    .work-links-preview a { font-size:0.75rem; padding:0.3rem 0.6rem; border-radius:5px; border:1.5px solid ${escCssVal(data.accentColor)}; color:${escCssVal(data.accentColor)}; text-decoration:none; transition: all 0.2s ease; font-weight:500;}
    .work-links-preview a:hover { background-color: ${escCssVal(data.accentColor)}; color: ${escCssVal(accentContrast)};}
    
    footer.student-footer-preview { padding: 2.5rem 1rem 1.5rem 1rem; display: flex; flex-direction: column; background: ${escCssVal(data.primaryColor ? `color-mix(in srgb, ${data.primaryColor} 90%, black)` : '#0A192F')}; color: ${escCssVal(primaryContrast)}; scroll-margin-top: 80px; border-top: 1.5px solid ${escCssVal(data.primaryColor)}; }
    footer.student-footer-preview .scroll-top-btn-preview { text-align: center; margin-bottom: 1.5rem; cursor: pointer; }
    footer.student-footer-preview .scroll-top-btn-preview svg { width: 32px; height:32px; color: ${escCssVal(data.accentColor)}; transition: transform 0.2s, filter 0.2s; }
    footer.student-footer-preview .scroll-top-btn-preview:hover svg { transform: translateY(-3px); filter: drop-shadow(0 0 5px ${escCssVal(data.accentColor)}); }
    footer.student-footer-preview .footer-title-preview { text-align:center; font-size: clamp(1.5rem, 3.5vw, 1.8rem); font-weight:600; margin-bottom:1.25rem; color:${escCssVal(primaryContrast)}; display:flex; align-items:center; justify-content:center; gap:0.4rem; font-family:'Work Sans', sans-serif;} 
    footer.student-footer-preview .footer-title-preview svg { width:0.9em; height:0.9em; }
    footer.student-footer-preview .contact-card-preview { max-width: 40rem; margin: 0 auto 1.5rem auto; background-color: rgba(0,0,0,0.25); backdrop-filter: blur(4px); padding: 1.25rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.25); border: 1px solid ${escCssVal(primaryContrast)}22; }
    footer.student-footer-preview .contact-card-preview p { text-align:center; font-size:0.95rem; margin-bottom:1rem; opacity:0.9; }
    footer.student-footer-preview ol { display: flex; text-decoration: none !important; list-style: none !important; justify-content: center; flex-wrap: wrap; gap:1rem 1.5rem; margin-bottom:1.25rem; padding-left:0;}
    footer.student-footer-preview ol a {text-decoration: none !important; color: inherit;}
    footer.student-footer-preview ol a li { font-weight: 500; color: ${escCssVal(primaryContrast)}BF; transition: color 200ms, transform 200ms; cursor: pointer; text-align:center; display:flex; align-items:center; gap:0.3rem; font-size:0.8rem; text-decoration: none !important; list-style:none;}
    footer.student-footer-preview ol a:hover li { color: ${escCssVal(data.accentColor)}; transform: scale(1.03); text-decoration: none !important;}
    footer.student-footer-preview ol svg { width:16px; height:16px;}
    footer.student-footer-preview .resume-btn-container-preview { text-align:center; margin-top:1rem;}
    footer.student-footer-preview .resume-btn-preview { display:inline-flex; align-items:center; padding:0.4rem 0.9rem; font-size:0.8rem; font-weight:500; border-radius:6px; border:1.5px solid ${escCssVal(data.accentColor)}; color:${escCssVal(data.accentColor)}; background-color:transparent; text-decoration:none; transition: all 0.2s ease;}
    footer.student-footer-preview .resume-btn-preview:hover { background-color:${escCssVal(data.accentColor)}; color:${escCssVal(accentContrast)};}
    footer.student-footer-preview .resume-btn-preview svg { margin-right:0.3rem; width:14px; height:14px;}
    .credits-preview-footer { text-align:center; margin-top:2rem; font-size:0.75rem; color:${escCssVal(primaryContrast)}A6; }
    
    .menu-icon-preview { display: none; position: fixed; top: 1rem; right: 1rem; z-index: 1001; cursor:pointer; padding:0.5rem; background-color: rgba(0,0,0,0.15); backdrop-filter: blur(3px); border-radius: 6px; box-shadow: 0 1px 4px rgba(0,0,0,0.15);}
    @media (max-width: 767px) { .menu-icon-preview { display: block !important; } nav.student-desktop-nav-preview { display: none !important; } }
    .menu-line-preview { width:22px; height: 2.5px; background-color: ${escCssVal(foregroundColor)}; margin: 4.5px 0; border-radius: 10px; }
    .student-hidden-menu-preview { position: fixed; top: 0; left: -100%; width: 250px; height: 100vh; background-color: ${escCssVal(data.primaryColor ? `color-mix(in srgb, ${data.primaryColor} 85%, ${data.backgroundColor} 30%)` : '#102A43')}; z-index: 1000; transition: left 0.3s ease-in-out; padding:1.5rem; display:flex; flex-direction:column; align-items:center; justify-content:center; color: ${escCssVal(primaryContrast)}; box-shadow: 2px 0px 8px rgba(0,0,0,0.15);}
    /* Make sure mobile menu is not shown on desktop */
    @media (min-width: 768px) { .student-hidden-menu-preview { display: none !important; } } 
    .student-hidden-menu-preview.show-menu-preview { left: 0px; }
    .student-hidden-menu-preview ul { list-style:none !important; text-align:center; padding-left:0 !important; }
    .student-hidden-menu-preview ul li { margin: 1rem 0; }
    .student-hidden-menu-preview ul a { color: ${escCssVal(primaryContrast)}; text-decoration:none !important; font-size:1.1rem; transition: opacity 0.2s;}
    .student-hidden-menu-preview ul a:hover { opacity:0.8; text-decoration:none !important; }
    .student-hidden-menu-preview .close-btn-preview { color: ${escCssVal(primaryContrast)}; text-align: right; padding: 0.2rem; font-size: 1.4rem; position:absolute; top:1rem; right:1rem; cursor:pointer; }
    .student-hidden-menu-preview .social-icons-mobile { display:flex; gap:1rem; margin-top:1.25rem;}
    .student-hidden-menu-preview .social-icons-mobile svg { height: 28px; width:28px; color: ${escCssVal(primaryContrast)}; transition: opacity 0.2s, transform 0.2s;}
    .student-hidden-menu-preview .social-icons-mobile svg:hover { opacity:0.8; transform:scale(1.05); }
    .student-hidden-menu-preview .nav-btn-preview { margin: 0 auto; margin-top: 1rem; color:${escCssVal(data.accentColor)}; border-color:${escCssVal(data.accentColor)}; background-color: transparent; height:45px; width:140px; font-size:13px; }
    .student-hidden-menu-preview .nav-btn-preview:hover { background-color:${escCssVal(data.accentColor)}; color:${escCssVal(accentContrast)};}
  `;

  let previewHtml = "";
  previewHtml += "<html><head>";
  previewHtml += "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
  previewHtml += "<title>" + escHtml(yourName) + " - Student Portfolio</title>";
  previewHtml += "<style>" + escCssVal(inlineStyles) + "</style>";
  previewHtml += "</head><body>";
  
  previewHtml += "<div class='student-container-preview'>";
  previewHtml += "  <section id='home_preview_id' class='student-hero-section-preview'>";
  
  previewHtml += "    <nav class='student-desktop-nav-preview' style='background-color:" + escCssVal(data.backgroundColor) + "CC;'>";
  previewHtml += "      <a href='#home_preview_id'><p style='color:" + escCssVal(data.primaryColor) + ";'>" + escHtml(yourName) + "</p></a>";
  previewHtml += "      <ul>";
  previewHtml += "        <a href='#home_preview_id'><li style='color:" + escCssVal(foregroundColor) + ";'>Home</li></a>";
  if (showAcademicSection) previewHtml += "        <a href='#academic_preview_id'><li style='color:" + escCssVal(foregroundColor) + ";'>Academics</li></a>";
  if (showProjectsSection) previewHtml += "        <a href='#work_preview_id'><li style='color:" + escCssVal(foregroundColor) + ";'>Experience</li></a>";
  if (showSkillsSection) previewHtml += "        <a href='#skills_preview_id'><li style='color:" + escCssVal(foregroundColor) + ";'>Skills</li></a>";
  if (showContactSection) previewHtml += "        <a href='#contact_preview_id'><li style='color:" + escCssVal(foregroundColor) + ";'>Contact</li></a>";
  previewHtml += "      </ul>";
  previewHtml += "      <div class='nav-right-preview'>";
  if (contactLinkedin) previewHtml += "        <a href='" + escAttr(contactLinkedin) + "' target='_blank' class='social-icon-preview' title='LinkedIn'><svg viewBox='0 0 24 24' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path><rect x='2' y='9' width='4' height='12'></rect><circle cx='4' cy='4' r='2'></circle></svg></a>";
  if (contactInstagram) previewHtml += "        <a href='" + escAttr(contactInstagram) + "' target='_blank' class='social-icon-preview' title='Instagram'><svg viewBox='0 0 24 24' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='2' width='20' height='20' rx='5' ry='5'></rect><path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path><line x1='17.5' y1='6.5' x2='17.51' y2='6.5'></line></svg></a>";
  if (showResumeLink && resumeUrl) previewHtml += "        <a href='" + escAttr(resumeUrl) + "' target='_blank' class='student-nav-btn-preview' style='color:" + escCssVal(data.accentColor) + "; border-color:" + escCssVal(data.accentColor) + ";'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path><polyline points='7 10 12 15 17 10'></polyline><line x1='12' y1='15' x2='12' y2='3'></line></svg>My Resume</a>";
  previewHtml += "      </div>";
  previewHtml += "    </nav>";

  previewHtml += "    <div class='menu-icon-preview' onclick='toggleMenuPreviewStudent()'>";
  previewHtml += "      <div class='menu-line-preview' style='background-color:" + escCssVal(foregroundColor) + ";'></div><div class='menu-line-preview' style='background-color:" + escCssVal(foregroundColor) + ";'></div><div class='menu-line-preview' style='background-color:" + escCssVal(foregroundColor) + ";'></div>";
  previewHtml += "    </div>";
  
  previewHtml += "    <div id='hidden_menu_preview_id_student' class='student-hidden-menu-preview' style='background-color:" + escCssVal(data.primaryColor ? `color-mix(in srgb, ${data.primaryColor} 85%, ${data.backgroundColor} 30%)` : '#102A43') + "; color:" + escCssVal(primaryContrast) + ";'>";
  previewHtml += "      <p class='close-btn-preview' onclick='closeBtnPreviewStudent()' style='color:" + escCssVal(primaryContrast) + ";'>&times;</p>";
  previewHtml += "      <ul>";
  previewHtml += "        <a href='#home_preview_id' onclick='closeBtnPreviewStudent()'><li style='color:" + escCssVal(primaryContrast) + ";'>Home</li></a>";
  if (showAcademicSection) previewHtml += "        <a href='#academic_preview_id' onclick='closeBtnPreviewStudent()'><li style='color:" + escCssVal(primaryContrast) + ";'>Academics</li></a>";
  if (showProjectsSection) previewHtml += "        <a href='#work_preview_id' onclick='closeBtnPreviewStudent()'><li style='color:" + escCssVal(primaryContrast) + ";'>Experience</li></a>";
  if (showSkillsSection) previewHtml += "        <a href='#skills_preview_id' onclick='closeBtnPreviewStudent()'><li style='color:" + escCssVal(primaryContrast) + ";'>Skills</li></a>";
  if (showContactSection) previewHtml += "        <a href='#contact_preview_id' onclick='closeBtnPreviewStudent()'><li style='color:" + escCssVal(primaryContrast) + ";'>Contact</li></a>";
  previewHtml += "      </ul>";
  previewHtml += "      <div class='social-icons-mobile'>";
  if (contactLinkedin) previewHtml += "        <a href='" + escAttr(contactLinkedin) + "' target='_blank' onclick='closeBtnPreviewStudent()' title='LinkedIn'><svg viewBox='0 0 24 24' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path><rect x='2' y='9' width='4' height='12'></rect><circle cx='4' cy='4' r='2'></circle></svg></a>";
  if (contactInstagram) previewHtml += "        <a href='" + escAttr(contactInstagram) + "' target='_blank' onclick='closeBtnPreviewStudent()' title='Instagram'><svg viewBox='0 0 24 24' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='2' width='20' height='20' rx='5' ry='5'></rect><path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path><line x1='17.5' y1='6.5' x2='17.51' y2='6.5'></line></svg></a>";
  previewHtml += "      </div>";
  if (showResumeLink && resumeUrl) previewHtml += "        <a href='" + escAttr(resumeUrl) + "' target='_blank' onclick='closeBtnPreviewStudent()'><button class='student-nav-btn-preview' style='color:" + escCssVal(data.accentColor) + "; border-color:" + escCssVal(data.accentColor) + ";'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path><polyline points='7 10 12 15 17 10'></polyline><line x1='12' y1='15' x2='12' y2='3'></line></svg>My Resume</button></a>";
  previewHtml += "    </div>";

  previewHtml += "    <div class='student-hero-content-wrapper-preview'>";
  previewHtml += "      <div class='student-hero-image-container-preview'>"; 
  previewHtml += "        <img src='" + escAttr(heroImagePlaceholder || 'https://placehold.co/600x750.png?text=Your+Photo') + "' alt='" + escAttr(yourName) + "' data-ai-hint='professional portrait student' style='border-color:" + escCssVal(data.accentColor) + "55;'/>";
  previewHtml += "      </div>";
  previewHtml += "      <div class='student-hero-text-container-preview'>"; 
  previewHtml += "        <h1>Hello, my name is <br/><span class='name-span-preview' style='color:"+escCssVal(data.accentColor)+";'>" + escHtml(yourName) + "</span></h1>";
  previewHtml += "        <h2>" + escHtml(heroTitle) + "</h2>";
  if (heroTagline) previewHtml += "<p class='tagline-preview'>" + (escHtml(heroTagline)).replace(/\n/g, '<br>') + "</p>";
  if (heroCtaText) previewHtml += "<a href='#work_preview_id' class='cta-btn-preview' style='background-color:"+escCssVal(data.accentColor)+"; color:"+escCssVal(accentContrast)+"; border-color:"+escCssVal(accentContrast)+"33;'>"+escHtml(heroCtaText)+"</a>";
  previewHtml += "      </div>";
  previewHtml += "    </div>";
  previewHtml += "  </section>";

  if (showAcademicSection && academicEntries && academicEntries.filter(e => e && e.qualification).length > 0) {
    previewHtml += "  <section id='academic_preview_id' class='student-academic-section-preview'>";
    previewHtml += "    <h3 class='section-title-preview' style='color:" + escCssVal(data.primaryColor) + ";'><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='" + escCssVal(data.accentColor) + "' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.838l8.57 3.908a2 2 0 0 0 1.66 0z'/><path d='M22 10v6'/><path d='M6 12v5c0 1.66 4 3 6 3s6-1.34 6-3v-5'/></svg>Academic Ventures</h3>";
    previewHtml += "    <div class='academic-entries-container-preview'>";
    (academicEntries || []).filter(e => e && e.qualification).forEach((entry, index) => {
      previewHtml += previewAcademicEntryHtml(entry, "academicEntry-" + index);
    });
    previewHtml += "    </div>";
    previewHtml += "  </section>";
  }
  
  if (previewSkillsArray.length > 0) {
    previewHtml += "  <section id='skills_preview_id' class='student-skills-section-preview' style='background-color: " + escCssVal(data.primaryColor ? `color-mix(in srgb, ${data.primaryColor} 80%, ${data.backgroundColor} 40%)` : '#1A2E40') + ";'>";
    previewHtml += "    <h5 style='color:" + escCssVal(primaryContrast) + ";'><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='8' r='6'/><path d='M15.477 12.89 17 22l-5-3-5 3 1.523-9.11'/></svg>Skills & Affiliations</h5>";
    previewHtml += "    <div class='student-skills-list-container-preview'>";
    previewSkillsArray.forEach(item => {
      previewHtml += "<span class='student-skill-tag-preview' style='background-color:" + escCssVal(data.accentColor) + "BF; color:" + escCssVal(accentContrast) + "; border: 1px solid " + escCssVal(accentContrast ? `color-mix(in srgb, ${accentContrast} 30%, transparent)`: '#FFFFFF33') + ";'>" +
                     escHtml(item) + "</span>";
    });
    previewHtml += "    </div>";
    previewHtml += "  </section>";
  }

  if (showProjectsSection && projects && projects.filter(p => p && p.name).length > 0) {
    previewHtml += "  <section id='work_preview_id' class='student-work-experience-section-preview'>";
    previewHtml += "    <div class='student-work-experience-intro-preview'>";
    previewHtml += "      <h6 style='color:" + escCssVal(data.primaryColor) + ";'><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='7' width='20' height='14' rx='2' ry='2'></rect><path d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'></path></svg>Experience</h6>";
    const workSectionImage = (projects && projects.length > 0 && projects[0] && projects[0].imageUrl) ? projects[0].imageUrl : heroImagePlaceholder;
    previewHtml += "      <img src='" + escAttr(workSectionImage || 'https://placehold.co/400x500.png?text=Work+Image') + "' alt='Work Experience Visual' data-ai-hint='office professional work' style='border-color:" + escCssVal(data.primaryColor) + "55;'/>";
    previewHtml += "    </div>";
    previewHtml += "    <div class='student-work-cards-container-preview'>";
    (projects || []).filter(p => p && p.name).forEach((projectItem) => {
      previewHtml += previewProjectCardHtml(projectItem);
    });
    previewHtml += "    </div>";
    previewHtml += "  </section>";
  }

  if (showContactSection) {
    previewHtml += "  <footer id='contact_preview_id' class='student-footer-preview' style='background: " + escCssVal(data.primaryColor ? `color-mix(in srgb, ${data.primaryColor} 90%, black)` : '#0A192F') + "; color: " + escCssVal(primaryContrast) + "; border-top: 1.5px solid " + escCssVal(data.primaryColor) + ";'>";
    previewHtml += "    <a class='scroll-top-btn-preview' onclick='scrollToTopPreviewStudent()'>";
    previewHtml += "      <svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' style='color:" + escCssVal(data.accentColor) + ";'><circle cx='12' cy='12' r='10'></circle><polyline points='16 12 12 8 8 12'></polyline><line x1='12' y1='16' x2='12' y2='8'></line></svg>";
    previewHtml += "    </a>";
    previewHtml += "    <h2 class='footer-title-preview' style='color:" + escCssVal(primaryContrast) + ";'><svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path><polyline points='22,6 12,13 2,6'></polyline></svg>Get In Touch!</h2>";
    previewHtml += "    <div class='contact-card-preview' style='background-color: rgba(0,0,0,0.25); border-color:"+escCssVal(primaryContrast)+"22;'>";
    previewHtml += "      <p style='text-align:center; font-size:0.95rem; margin-bottom:1rem; opacity:0.9;'>I'm always open to new opportunities and collaborations. Feel free to reach out!</p>";
    previewHtml += "      <ol>";
    if (contactEmail) previewHtml += "      <a href='mailto:" + escAttr(contactEmail) + "'><li style='color:" + escCssVal(primaryContrast) + "BF;'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path><polyline points='22,6 12,13 2,6'></polyline></svg> " + escHtml(contactEmail) + "</li></a>";
    if (contactLinkedin) previewHtml += "      <a href='" + escAttr(contactLinkedin) + "' target='_blank'><li style='color:" + escCssVal(primaryContrast) + "BF;'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path><rect x='2' y='9' width='4' height='12'></rect><circle cx='4' cy='4' r='2'></circle></svg>LinkedIn</li></a>";
    if (contactGithub) previewHtml += "      <a href='" + escAttr(contactGithub) + "' target='_blank'><li style='color:" + escCssVal(primaryContrast) + "BF;'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path></svg>GitHub</li></a>";
    if (contactInstagram) previewHtml += "      <a href='" + escAttr(contactInstagram) + "' target='_blank'><li style='color:" + escCssVal(primaryContrast) + "BF;'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='2' y='2' width='20' height='20' rx='5' ry='5'></rect><path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z'></path><line x1='17.5' y1='6.5' x2='17.51' y2='6.5'></line></svg>Instagram</li></a>";
    previewHtml += "      </ol>";
    if (showResumeLink && resumeUrl) {
      previewHtml += "      <div class='resume-btn-container-preview'>";
      previewHtml += "        <a href='" + escAttr(resumeUrl) + "' target='_blank' rel='noopener noreferrer' class='resume-btn-preview' style='border-color:" + escCssVal(data.accentColor) + "; color:" + escCssVal(data.accentColor) + ";'>";
      previewHtml += "          <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path><polyline points='7 10 12 15 17 10'></polyline><line x1='12' y1='15' x2='12' y2='3'></line></svg>Download Resume";
      previewHtml += "        </a>";
      previewHtml += "      </div>";
    }
    previewHtml += "    </div>"; 
    previewHtml += "    <div class='credits-preview-footer'>";
    previewHtml += "      <p>&copy; " + new Date().getFullYear() + " " + escHtml(yourName) + ". Student Portfolio.</p>";
    previewHtml += "    </div>";
    previewHtml += "  </footer>";
  }

  previewHtml += "</div>"; 
  
  previewHtml += "<script>";
  previewHtml += " " +
    "function toggleMenuPreviewStudent() { " +
    "  const menu = document.getElementById('hidden_menu_preview_id_student'); " +
    "  if (menu) menu.classList.toggle('show-menu-preview'); " +
    "} " +
    "function closeBtnPreviewStudent() { " +
    "  const menu = document.getElementById('hidden_menu_preview_id_student'); " +
    "  if (menu) menu.classList.remove('show-menu-preview'); " +
    "} " +
    "function scrollToTopPreviewStudent() { " +
    "  window.scrollTo({ top: 0, behavior: 'smooth' }); " +
    "} " +
    "document.querySelectorAll('.student-nav-btn-preview').forEach(button => { " +
    "    const originalColor = '" + escCssVal(data.accentColor) + "'; " +
    "    const originalBg = 'transparent'; " +
    "    const hoverColor = '" + escCssVal(accentContrast) + "'; " +
    "    const hoverBg = '" + escCssVal(data.accentColor) + "'; " +
    "    button.onmouseenter = function() { " +
    "        this.style.backgroundColor = hoverBg; " +
    "        this.style.color = hoverColor; " +
    "    }; " +
    "    button.onmouseleave = function() { " +
    "        this.style.backgroundColor = originalBg; " +
    "        this.style.color = originalColor; " +
    "    }; " +
    "}); " +
    "document.querySelectorAll('nav.student-desktop-nav-preview ul a').forEach(link => { " +
    "    const listItem = link.querySelector('li'); if (!listItem) return;" +
    "    const originalColor = '" + escCssVal(foregroundColor) + "';" +
    "    const hoverColor = '" + escCssVal(data.accentColor) + "';" +
    "    link.onmouseenter = function() { listItem.style.color = hoverColor; };" +
    "    link.onmouseleave = function() { listItem.style.color = originalColor; };" +
    "});" +
    "document.querySelectorAll('footer.student-footer-preview ol a').forEach(link => { " +
    "    const listItem = link.querySelector('li'); if (!listItem) return; " +
    "    const originalColor = listItem.style.color || '" + escCssVal(primaryContrast) + "CC'; " +
    "    const hoverColor = '" + escCssVal(data.accentColor) + "'; " +
    "    link.onmouseenter = function() { listItem.style.color = hoverColor; }; " +
    "    link.onmouseleave = function() { listItem.style.color = originalColor; }; " +
    "}); ";
  previewHtml += "</script>";
  previewHtml += "</body></html>";

  return { fullTsx, previewHtml };
}

function getContrastColor(hexcolor: string | undefined): string {
  if (!hexcolor || !hexcolor.startsWith('#')) return '#FFFFFF'; 
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
    return '#FFFFFF'; 
  }
}
