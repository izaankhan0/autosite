
// src/templates/futuristic.ts
import type { FormSchemaType, AcademicEntryType } from "@/schemas/websiteFormSchema";
import { getContrastColor } from ".";

// Escaping helper for JavaScript string literals
const escJsStr = (str: string | undefined | null): string => {
  if (str === null || typeof str === 'undefined') return '';
  return str
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n");
};

// Escaping helpers for HTML content
const escHtml = (str: string | undefined | null): string => {
  if (str === null || typeof str === 'undefined') return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/`/g, "&#96;");
};

// Escaping helpers for HTML attributes
const escAttr = (str: string | undefined | null): string => {
  if (str === null || typeof str === 'undefined') return '';
  return str
    .replace(/"/g, "&quot;")
    .replace(/`/g, "&#96;");
};

// Escaping for CSS values
const escCssVal = (str: string | undefined | null): string => {
  if (str === null || typeof str === 'undefined') return '';
  return str.replace(/`/g, "'"); 
};


export function getFuturisticTemplate(data: FormSchemaType): TemplateOutput {
  const siteNameClean = (data.yourName?.trim().replace(/\W+/g, '') || "PortfolioSite");
  const primaryContrast = getContrastColor(data.primaryColor);
  const accentContrast = getContrastColor(data.accentColor);
  const foregroundColor = getContrastColor(data.backgroundColor);
  const isDarkBg = (parseInt(data.backgroundColor.substring(1, 3), 16) * 0.299 + parseInt(data.backgroundColor.substring(3, 5), 16) * 0.587 + parseInt(data.backgroundColor.substring(5, 7), 16) * 0.114) < 140;

  const projectCardTsx = (project: NonNullable<FormSchemaType['project1']>) => {
    let imagePart = '';
    if (project.imageUrl) {
      imagePart = `<Image src={"${escJsStr(project.imageUrl)}"} alt={"${escJsStr(project.name)}"} width={400} height={225} className="rounded-md mb-4 w-full h-auto object-cover border border-primary/30 opacity-90 group-hover:opacity-100 transition-opacity" data-ai-hint="website screenshot futuristic" />`;
    } else {
      imagePart = `<div className="w-full h-[225px] bg-primary/10 rounded-md mb-4 flex items-center justify-center border border-primary/30"><span className="text-primary/70 uppercase tracking-wider">Project ${escJsStr(project.name)} Matrix</span></div>`;
    }

    return `
    <div className="bg-background/70 backdrop-blur-sm border-2 border-accent/50 p-6 rounded-lg shadow-xl hover:shadow-accent/30 transition-all duration-300 group">
      ${imagePart}
      <h3 className="text-2xl font-['Orbitron',_sans-serif] font-bold text-primary mb-2 tracking-wide">${escJsStr(project.name)}</h3>
      <p className="text-foreground/80 text-sm mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: "${escJsStr((project.description || "")).replace(/\\n/g, '<br />')}" }} />
      <p className="text-xs text-accent/90 mb-4 uppercase tracking-wider">SYSTEMS: ${escJsStr(project.technologies)}</p>
      <div className="flex flex-wrap gap-3">
        ${project.liveUrl ? `<a href={"${escJsStr(project.liveUrl)}"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-accent text-accent-foreground hover:bg-accent/80 border border-transparent hover:border-accent-foreground/50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-accent/40">
          <Zap className="w-4 h-4 mr-2" /> Access Holo-Site
        </a>` : ''}
        ${project.repoUrl ? `<a href={"${escJsStr(project.repoUrl)}"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-primary/40">
          <DatabaseZap className="w-4 h-4 mr-2" /> View Datacore
        </a>` : ''}
      </div>
    </div>
  `;
  };
  
  const project1TsxString = (data.showProject1 && data.project1) ? projectCardTsx(data.project1) : '';
  const project2TsxString = (data.showProject2 && data.project2) ? projectCardTsx(data.project2) : '';

  const academicEntryTsx = (academic: AcademicEntryType, entryNumber: 1 | 2) => {
    if (!academic || !academic.qualification) return '';
    return `
      <div className="mb-6 pb-6 ${entryNumber === 1 && data.showAcademic2 && data.academic2?.qualification ? 'border-b-2 border-dashed border-primary/30' : ''}">
        ${academic.imageUrl ? `<Image src={"${escJsStr(academic.imageUrl)}"} alt={"${escJsStr(academic.qualification || 'Academic Hologram')}"} width={500} height={300} className="rounded-md mb-4 w-full h-auto object-cover border-2 border-accent/50 opacity-80 hover:opacity-100 transition-opacity" data-ai-hint="futuristic education data screen" />` : ''}
        <h3 className="text-xl font-['Orbitron',_sans-serif] font-semibold text-primary/90 mb-1 tracking-wider">${escJsStr(academic.qualification)}</h3>
        <p className="text-lg text-foreground/80 mb-1">${escJsStr(academic.institution)}</p>
        <p className="text-md text-accent/90 uppercase tracking-widest mb-2">COMPLETION DATE: ${escJsStr(academic.graduationYear)}</p>
        ${academic.grades ? `<p className="text-sm text-foreground/70 mb-3">Performance Index: ${escJsStr(academic.grades)}</p>` : ''}
        ${academic.description ? `<p className="text-md text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: "${escJsStr(academic.description).replace(/\\n/g, '<br />')}" }} />` : ''}
      </div>
    `;
  };
  const academic1TsxString = (data.showAcademic1 && data.academic1) ? academicEntryTsx(data.academic1, 1) : '';
  const academic2TsxString = (data.showAcademic2 && data.academic2) ? academicEntryTsx(data.academic2, 2) : '';


  const fullTsx = `
// Generated Page: ${escJsStr(data.yourName)}'s Portfolio - Futuristic Theme
import React from 'react';
import Image from 'next/image';
import { Mail, Linkedin, Github, Instagram, Download, Zap, DatabaseZap, BrainCircuit, SatelliteDish, UserRound, Rocket, BookOpen } from 'lucide-react';
import type { FormSchemaType, AcademicEntryType } from "@/schemas/websiteFormSchema"; 

const ${siteNameClean}PortfolioPage: React.FC<{ portfolioData: FormSchemaType }> = ({ portfolioData }) => {
   if (!portfolioData || typeof portfolioData.yourName === 'undefined') {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center', color: '#FF0000', backgroundColor: '#FFF0F0' }}>
        <h1>Error: Portfolio Data Not Loaded</h1>
        <p>The necessary data to display this portfolio is missing or malformed.</p>
      </div>
    );
  }
  const skillsArray = (portfolioData.aboutSkills || "").split(',').map(skill => skill.trim()).filter(skill => skill);

  const renderAcademicEntry = (academic: AcademicEntryType | undefined, entryNumber: 1 | 2) => {
    if (!academic || !academic.qualification) return null;
    const isLastVisibleAcademic = 
        (entryNumber === 1 && (!portfolioData.showAcademic2 || !portfolioData.academic2?.qualification)) || 
        (entryNumber === 2);
    return (
      <div className={"mb-6 pb-6 " + (!isLastVisibleAcademic ? "border-b-2 border-dashed border-primary/30" : "")}>
        {academic.imageUrl && (
          <Image 
            src={academic.imageUrl} 
            alt={academic.qualification || 'Academic Hologram'} 
            width={500} 
            height={300} 
            className="rounded-md mb-4 w-full h-auto object-cover border-2 border-accent/50 opacity-80 hover:opacity-100 transition-opacity"
            data-ai-hint="futuristic education data screen"
          />
        )}
        <h3 className="text-xl font-['Orbitron',_sans-serif] font-semibold text-primary/90 mb-1 tracking-wider">{academic.qualification}</h3>
        {academic.institution && <p className="text-lg text-foreground/80 mb-1">{academic.institution}</p>}
        {academic.graduationYear && <p className="text-md text-accent/90 uppercase tracking-widest mb-2">COMPLETION DATE: {academic.graduationYear}</p>}
        {academic.grades && <p className="text-sm text-foreground/70 mb-3">Performance Index: {academic.grades}</p>}
        {academic.description && <p className="text-md text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: (academic.description).replace(/\\n/g, '<br />') }} />}
      </div>
    );
  };

  return (
    <div className="font-['Rajdhani',_sans-serif] bg-background text-foreground min-h-screen selection:bg-accent selection:text-accent-foreground">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-primary/80 via-primary/50 to-background text-primary-foreground py-16 px-6 text-center relative overflow-hidden border-b-4 border-accent shadow-2xl">
        <div className="absolute inset-0 opacity-20 bg-grid-pattern"></div> {/* Grid pattern utility needed */}
        <Image 
          src={portfolioData.heroImagePlaceholder || "https://placehold.co/150x150.png"} 
          alt={portfolioData.yourName || 'Portfolio Owner'} 
          width={150} 
          height={150} 
          className="rounded-full mx-auto mb-6 border-4 border-accent object-cover shadow-lg animate-pulse-glow"
          data-ai-hint="avatar futuristic sci-fi"
          priority
        />
        <h1 className="text-5xl md:text-6xl font-['Orbitron',_sans-serif] font-black uppercase tracking-wider mb-2 text-shadow-glow">{portfolioData.yourName}</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 opacity-90 tracking-wide">{portfolioData.heroTitle}</h2>
        {portfolioData.heroTagline && <p className="text-lg max-w-2xl mx-auto mb-8 opacity-80" dangerouslySetInnerHTML={{ __html: (portfolioData.heroTagline).replace(/\\n/g, '<br />') }} />}
        {portfolioData.heroCtaText && (
          <a href="#contact" className="inline-flex items-center justify-center px-8 py-3 text-lg font-['Orbitron',_sans-serif] font-bold rounded-md bg-accent text-accent-foreground hover:bg-accent/80 border border-transparent hover:border-accent-foreground/50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-accent/50">
            <Zap className="w-5 h-5 mr-2" /> {portfolioData.heroCtaText}
          </a>
        )}
      </header>

      {/* Navigation */}
      <nav className="bg-background/80 backdrop-blur-md border-b border-primary/30 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3 flex justify-center items-center space-x-4 sm:space-x-6">
          {portfolioData.showAboutSection && <a href="#about" className="font-['Orbitron',_sans-serif] text-sm sm:text-base uppercase tracking-wider text-primary hover:text-accent hover:text-shadow-accent transition-all duration-300">Identity Matrix</a>}
          {portfolioData.showAcademicSection && <a href="#academic" className="font-['Orbitron',_sans-serif] text-sm sm:text-base uppercase tracking-wider text-primary hover:text-accent hover:text-shadow-accent transition-all duration-300">Training Archives</a>}
          {portfolioData.showProjectsSection && <a href="#projects" className="font-['Orbitron',_sans-serif] text-sm sm:text-base uppercase tracking-wider text-primary hover:text-accent hover:text-shadow-accent transition-all duration-300">Project Nexus</a>}
          {portfolioData.showSkillsSection && <a href="#skills" className="font-['Orbitron',_sans-serif] text-sm sm:text-base uppercase tracking-wider text-primary hover:text-accent hover:text-shadow-accent transition-all duration-300">Skill Core</a>}
          {portfolioData.showContactSection && <a href="#contact" className="font-['Orbitron',_sans-serif] text-sm sm:text-base uppercase tracking-wider text-primary hover:text-accent hover:text-shadow-accent transition-all duration-300">Comms Channel</a>}
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 py-12">
        {portfolioData.showAboutSection && (
          <section id="about" className="mb-16 p-6 md:p-8 rounded-lg bg-background/70 backdrop-blur-sm border-2 border-primary/40 shadow-xl scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-['Orbitron',_sans-serif] font-bold text-primary mb-6 tracking-wide flex items-center"><UserRound className="w-8 h-8 mr-3 text-accent" /> // Identity Matrix</h2>
            {portfolioData.aboutBio && <p className="text-lg text-foreground/90 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: (portfolioData.aboutBio).replace(/\\n/g, '<br />') }} />}
            {portfolioData.showFunFact && portfolioData.aboutFunFact && (
              <p className="text-md italic text-accent/90 border-l-4 border-accent pl-4 py-2 bg-accent/10 rounded-r-md">
                <BrainCircuit className="inline w-5 h-5 mr-2" /> Fun Algorithm: {portfolioData.aboutFunFact}
              </p>
            )}
          </section>
        )}

        {portfolioData.showAcademicSection && (
          <section id="academic" className="mb-16 p-6 md:p-8 rounded-lg bg-background/70 backdrop-blur-sm border-2 border-primary/40 shadow-xl scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-['Orbitron',_sans-serif] font-bold text-primary mb-6 tracking-wide flex items-center"><BookOpen className="w-8 h-8 mr-3 text-accent" /> // Training Archives</h2>
            {portfolioData.showAcademic1 && portfolioData.academic1 && renderAcademicEntry(portfolioData.academic1, 1)}
            {portfolioData.showAcademic2 && portfolioData.academic2 && renderAcademicEntry(portfolioData.academic2, 2)}
          </section>
        )}

        {portfolioData.showProjectsSection && (
          <section id="projects" className="mb-16 scroll-mt-24">
             <h2 className="text-3xl md:text-4xl font-['Orbitron',_sans-serif] font-bold text-primary mb-8 tracking-wide text-center flex items-center justify-center"><Rocket className="w-8 h-8 mr-3 text-accent" /> // Project Nexus</h2>
            <div className="grid md:grid-cols-2 gap-8">
              ${project1TsxString}
              ${project2TsxString}
            </div>
          </section>
        )}

        {portfolioData.showSkillsSection && (
          <section id="skills" className="mb-16 p-6 md:p-8 rounded-lg bg-background/70 backdrop-blur-sm border-2 border-primary/40 shadow-xl scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-['Orbitron',_sans-serif] font-bold text-primary mb-6 tracking-wide flex items-center"><BrainCircuit className="w-8 h-8 mr-3 text-accent" /> // Skill Core</h2>
            {portfolioData.aboutSkills && <p className="text-lg text-foreground/90 mb-6" dangerouslySetInnerHTML={{ __html: (portfolioData.aboutSkills).replace(/\\n/g, '<br />') }}/>}
            {skillsArray.length > 0 && (
              <ul className="flex flex-wrap justify-center gap-3">
                {skillsArray.map((skill, index) => (
                  <li key={index} className="bg-accent text-accent-foreground px-4 py-2 rounded-md text-sm font-semibold uppercase tracking-wider shadow-md hover:shadow-accent/50 transform hover:scale-105 transition-all">
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>

      {portfolioData.showContactSection && (
        <footer id="contact" className="bg-gradient-to-t from-primary/70 via-primary/40 to-background text-primary-foreground/80 py-10 text-center border-t-2 border-accent scroll-mt-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-['Orbitron',_sans-serif] font-bold text-primary-foreground mb-6 tracking-wide flex items-center justify-center text-shadow-glow"><SatelliteDish className="w-8 h-8 mr-3 text-accent" /> // Comms Channel</h2>
            <div className="bg-background/20 backdrop-blur-sm p-6 md:p-8 rounded-lg border-2 border-accent/50 shadow-xl max-w-2xl mx-auto mb-8">
              <p className="text-lg text-primary-foreground/90 mb-6">Initiate contact for collaborations or quantum discussions.</p>
              {portfolioData.contactEmail && (
                 <a href={'mailto:' + portfolioData.contactEmail} className="inline-block px-8 py-3 text-lg font-['Orbitron',_sans-serif] font-bold rounded-md bg-primary text-primary-foreground hover:bg-primary/80 border border-transparent hover:border-primary-foreground/50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-primary/50 mb-8">
                  Establish Link
                </a>
              )}
              <div className="flex justify-center space-x-6 text-accent">
                {portfolioData.contactLinkedin && <a href={portfolioData.contactLinkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary-foreground transition-colors transform hover:scale-110"><Linkedin size={30} /></a>}
                {portfolioData.contactGithub && <a href={portfolioData.contactGithub} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary-foreground transition-colors transform hover:scale-110"><Github size={30} /></a>}
                {portfolioData.contactInstagram && <a href={portfolioData.contactInstagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary-foreground transition-colors transform hover:scale-110"><Instagram size={30} /></a>}
              </div>
              {portfolioData.showResumeLink && portfolioData.resumeUrl && (
                <div className="mt-8">
                  <a href={portfolioData.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-2.5 text-sm font-['Orbitron',_sans-serif] font-medium rounded-md border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-accent/40">
                    <Download className="w-4 h-4 mr-2" /> Access Data Log (Resume)
                  </a>
                </div>
              )}
            </div>
            <p className="text-sm uppercase tracking-wider">&copy; {new Date().getFullYear()} {portfolioData.yourName} // END OF LINE.</p>
            <p className="text-xs mt-1 opacity-70">Futuristic Portfolio Matrix vOS 1.0</p>
          </div>
          <style jsx global>{\`
            .text-shadow-glow { text-shadow: 0 0 8px hsl(var(--primary-foreground) / 0.5), 0 0 12px hsl(var(--accent) / 0.7); }
            .text-shadow-accent { text-shadow: 0 0 5px hsl(var(--accent) / 0.7); }
            .animate-pulse-glow { animation: pulseGlowFuturistic 3s infinite ease-in-out; }
            @keyframes pulseGlowFuturistic {
              0%, 100% { box-shadow: 0 0 10px hsl(var(--accent)), 0 0 15px hsl(var(--accent)); }
              50% { box-shadow: 0 0 20px hsl(var(--accent)), 0 0 30px hsl(var(--accent)); }
            }
            .bg-grid-pattern { 
              background-image: linear-gradient(hsl(var(--primary-foreground)/0.05) 1px, transparent 1px), linear-gradient(to right, hsl(var(--primary-foreground)/0.05) 1px, transparent 1px); 
              background-size: 20px 20px; 
            }
          \`}</style>
        </footer>
      )}
    </div>
  );
};

export default function GeneratedPage() {
  const rawDataString = '${escJsStr(JSON.stringify(data))}';
  
  const defaultErrorProps: FormSchemaType = {
    yourName: "Operator (Error)",
    heroTitle: "System Error",
    heroTagline: "Data stream corrupted.",
    heroCtaText: "Initiate Comms",
    heroImagePlaceholder: "https://placehold.co/150x150.png?text=ERR",
    aboutBio: "Bio data unavailable.",
    aboutSkills: "Skill matrix offline.",
    aboutFunFact: "Error in fun algorithm.",
    academic1: { qualification: "Archive 1 Corrupted", institution: "Datastream Lost" },
    academic2: { qualification: "Archive 2 Corrupted", institution: "Signal Lost" },
    project1: undefined,
    project2: undefined,
    contactEmail: "null@node.error",
    contactLinkedin: "",
    contactGithub: "",
    contactInstagram: "",
    resumeUrl: "",
    theme: "futuristic",
    primaryColor: data.primaryColor || "#0D0D2B", 
    backgroundColor: data.backgroundColor || "#000000", 
    accentColor: data.accentColor || "#00FFFF",   
    showAboutSection: true,
    showFunFact: true,
    showAcademicSection: true,
    showAcademic1: true,
    showAcademic2: false,
    showProjectsSection: true,
    showProject1: false,
    showProject2: false,
    showSkillsSection: true,
    showContactSection: true,
    showResumeLink: true,
  };

  let propsToPass: FormSchemaType;
  try {
    const parsed = JSON.parse(rawDataString);
    if (typeof parsed === 'object' && parsed !== null && typeof parsed.yourName !== 'undefined') {
      propsToPass = parsed;
    } else {
      console.error("${siteNameClean} Template: Parsed data is not a valid object or missing key fields. Raw: ", rawDataString);
      propsToPass = defaultErrorProps;
    }
  } catch (e) {
    console.error("Error parsing props in ${siteNameClean}Template GeneratedPage:", e, "\\nRaw data string was:", rawDataString);
    propsToPass = defaultErrorProps;
  }
  return <${siteNameClean}PortfolioPage portfolioData={propsToPass} />;
}
`;

  const academicEntryHtml = (academic: AcademicEntryType | undefined, entryNumber: 1 | 2, isLastVisible: boolean) => {
    if (!academic || !academic.qualification) return '';
    let html = '<div class="template-futuristic-academic-entry" style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; ' + (!isLastVisible ? 'border-bottom: 2px dashed ' + escCssVal(data.primaryColor) + '55;' : '') + '">';
    if (academic.imageUrl) {
      html += `<img src="${escAttr(academic.imageUrl)}" alt="${escAttr(academic.qualification || 'Academic Hologram')}" data-ai-hint="futuristic education data screen" style="border-radius: 4px; margin-bottom: 1rem; width: 100%; max-width: 450px; height: auto; object-fit: cover; border: 2px solid ${escCssVal(data.accentColor)}77; opacity:0.85;" />`;
    }
    html += `<h3 style="font-family: 'Orbitron', sans-serif;font-size:1.4em;color:${escCssVal(data.primaryColor)};margin-bottom:0.1rem;letter-spacing:1px;">${escHtml(academic.qualification)}</h3>`;
    if (academic.institution) html += `<p style="font-size:1.1em;color:${escCssVal(foregroundColor)}CC;margin-bottom:0.1rem;">${escHtml(academic.institution)}</p>`;
    if (academic.graduationYear) html += `<p style="font-size:0.9em;color:${escCssVal(data.accentColor)}CC;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:0.2rem;">COMPLETION DATE: ${escHtml(academic.graduationYear)}</p>`;
    if (academic.grades) html += `<p style="font-size:0.9em;color:${escCssVal(foregroundColor)}AA;margin-bottom:0.4rem;">Performance Index: ${escHtml(academic.grades)}</p>`;
    if (academic.description) html += `<p style="font-size:1em;color:${escCssVal(foregroundColor)}CC;line-height:1.7;">${(escHtml(academic.description)).replace(/\n/g, '<br>')}</p>`;
    html += '</div>';
    return html;
  };

  const projectCardHtml = (project: NonNullable<FormSchemaType['project1']>) => {
    let imageHtml = '';
    if (project.imageUrl) {
      imageHtml = `<img src="${escAttr(project.imageUrl)}" alt="${escAttr(project.name)}" data-ai-hint="website screenshot futuristic" style="width:100%;border-radius:4px;margin-bottom:1rem;border:2px solid ${escCssVal(data.accentColor)}; opacity: 0.85;"/>`;
    } else {
      imageHtml = `<div style="width:100%;height:200px;background:${escCssVal(data.accentColor)}22;display:flex;align-items:center;justify-content:center;border-radius:4px;margin-bottom:1rem;border:2px solid ${escCssVal(data.accentColor)};"><span style="color:${escCssVal(data.accentColor)};text-transform:uppercase;">Project ${escHtml(project.name)} Matrix</span></div>`;
    }
    return `
    <div class="template-futuristic-project-card" style="background-color: ${escCssVal(data.backgroundColor)}DD; backdrop-filter: blur(2px); padding: 1.5rem; border-radius: 4px; border: 2px solid ${escCssVal(data.primaryColor)}77; box-shadow: 0 4px 10px ${isDarkBg ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'};">
      ${imageHtml}
      <h3 style="font-family: 'Orbitron', sans-serif;font-size:1.6em;color:${escCssVal(data.primaryColor)};margin-top:0;margin-bottom:0.5rem;letter-spacing:1px;">${escHtml(project.name)}</h3>
      <p style="font-size:0.95em;margin-bottom:0.5rem;line-height:1.5;color:${escCssVal(foregroundColor)}CC;">${(escHtml(project.description || "")).replace(/\n/g, '<br>')}</p>
      <p style="font-size:0.85em;margin-bottom:1rem;color:${escCssVal(data.accentColor)}CC;text-transform:uppercase;letter-spacing:0.5px;">SYSTEMS: ${escHtml(project.technologies)}</p>
      <div class="template-futuristic-project-links">
        ${project.liveUrl ? `<a href="${escAttr(project.liveUrl)}" target="_blank" class="template-futuristic-button-small" style="background-color:${escCssVal(data.accentColor)};color:${escCssVal(accentContrast)};margin-right:0.7rem; border:1px solid ${escCssVal(accentContrast)};">Access Holo-Site</a>` : ''}
        ${project.repoUrl ? `<a href="${escAttr(project.repoUrl)}" target="_blank" class="template-futuristic-button-small template-futuristic-button-outline" style="color:${escCssVal(data.accentColor)};border-color:${escCssVal(data.accentColor)};">View Datacore</a>` : ''}
      </div>
    </div>
  `;
  };
  
  let inlineStyles = '';
  inlineStyles += " @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600&display=swap');";
  inlineStyles += " @keyframes pulseGlow { 0%, 100% { box-shadow: 0 0 8px " + escCssVal(data.accentColor) + ", 0 0 12px " + escCssVal(data.accentColor) + "; } 50% { box-shadow: 0 0 15px " + escCssVal(data.accentColor) + ", 0 0 25px " + escCssVal(data.accentColor) + "; } }";
  inlineStyles += " @keyframes scanline { 0% { transform: translateY(-10%); } 50% { transform: translateY(10%); } 100% { transform: translateY(-10%); } }";
  inlineStyles += " .template-futuristic-body { font-family: 'Rajdhani', 'Orbitron', sans-serif; background-color: " + escCssVal(data.backgroundColor) + "; color: " + escCssVal(foregroundColor) + "; margin: 0; padding: 0; line-height: 1.7; min-height: 100vh; overflow-x: hidden; " + (isDarkBg ? "background-image: linear-gradient(" + escCssVal(foregroundColor) + "03 1px, transparent 1px), linear-gradient(to right, " + escCssVal(foregroundColor) + "03 1px, " + escCssVal(data.backgroundColor) + " 1px); background-size: 20px 20px;" : "") + "}";
  inlineStyles += " .template-futuristic-hero { background: linear-gradient(145deg, " + escCssVal(data.primaryColor) + "DD 0%, " + escCssVal(data.backgroundColor) + " 70%); color: " + escCssVal(primaryContrast) + "; padding: 4rem 2rem; text-align: center; position: relative; border-bottom: 4px solid " + escCssVal(data.accentColor) + "; box-shadow: 0 5px 25px " + escCssVal(data.primaryColor) + "55; }";
  inlineStyles += " .template-futuristic-hero::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: " + escCssVal(data.accentColor) + "; opacity: 0.7; animation: scanline 4s ease-in-out infinite; }";
  inlineStyles += " .template-futuristic-hero img { width: 150px; height: 150px; border-radius: 50%; margin-bottom: 1.5rem; border: 4px solid " + escCssVal(data.accentColor) + "; object-fit: cover; box-shadow: 0 0 20px " + escCssVal(data.accentColor) + "80; animation: pulseGlow 4s infinite ease-in-out; }";
  inlineStyles += " .template-futuristic-hero h1 { margin: 0.5rem 0; font-family: 'Orbitron', sans-serif; font-size: 3.2em; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; text-shadow: 0 0 10px " + (isDarkBg ? escCssVal(primaryContrast) : 'rgba(0,0,0,0.2)') + "; }";
  inlineStyles += " .template-futuristic-hero h2 { margin: 0 0 1rem; font-size: 1.6em; font-weight: 600; opacity: 0.9; letter-spacing: 1px; }";
  inlineStyles += " .template-futuristic-hero p { margin: 0 0 2rem; font-size: 1.1em; max-width: 650px; margin-left:auto; margin-right:auto; opacity: 0.85; }";
  inlineStyles += " .template-futuristic-nav { background-color: " + escCssVal(data.backgroundColor) + "CC; backdrop-filter: blur(5px); padding: 1rem 0; text-align: center; border-bottom: 1px solid " + escCssVal(data.accentColor) + "77; position: sticky; top: 0; z-index: 1000; }";
  inlineStyles += " .template-futuristic-nav a { font-family: 'Orbitron', sans-serif; color: " + escCssVal(data.primaryColor) + "; text-decoration: none; margin: 0 1rem; font-size: 1.1em; text-transform: uppercase; padding: 0.5rem 1rem; border: 1px solid transparent; border-radius: 3px; transition: all 0.3s ease; }";
  inlineStyles += " .template-futuristic-nav a:hover { color: " + escCssVal(data.accentColor) + "; border-color: " + escCssVal(data.accentColor) + "; text-shadow: 0 0 5px " + escCssVal(data.accentColor) + "; }";
  inlineStyles += " .template-futuristic-main { max-width: 1000px; width: 90%; margin: 2.5rem auto; padding: 0; }";
  inlineStyles += " .template-futuristic-section { background-color: " + (isDarkBg ? 'rgba(10,20,40,0.5)' : 'rgba(240,245,255,0.5)') + "; backdrop-filter: blur(3px); padding: 2rem 2.5rem; margin-bottom: 2.5rem; border: 1px solid " + escCssVal(data.primaryColor) + "55; border-left-width: 4px; border-radius: 5px; box-shadow: 0 0 15px " + escCssVal(data.primaryColor) + "1A; }";
  inlineStyles += " .template-futuristic-section h2.section-title { font-family: 'Orbitron', sans-serif; font-size: 2em; color: " + escCssVal(data.primaryColor) + "; margin-top: 0; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 1.5px; padding-bottom: 0.5rem; border-bottom: 2px solid " + escCssVal(data.accentColor) + "AA; display: inline-block; }";
  inlineStyles += " .template-futuristic-skills-list { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 0.8rem; justify-content: center; }";
  inlineStyles += " .template-futuristic-skills-list li { background-color: " + escCssVal(data.accentColor) + "; color: " + escCssVal(accentContrast) + "; padding: 0.6rem 1.2rem; border-radius: 20px; font-size: 0.95em; box-shadow: 0 2px 5px " + escCssVal(data.accentColor) + "55; text-transform: uppercase; letter-spacing: 0.5px; }";
  inlineStyles += " .template-futuristic-projects-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; } @media (min-width: 768px) { .template-futuristic-projects-grid { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); } }";
  inlineStyles += " .template-futuristic-footer { text-align: center; padding: 2.5rem 1rem; font-size: 0.9em; border-top: 2px solid " + escCssVal(data.primaryColor) + "88; color: " + escCssVal(foregroundColor) + "CC; background: linear-gradient(to top, " + escCssVal(data.primaryColor) + "33, " + escCssVal(data.backgroundColor) + "); }";
  inlineStyles += " .template-futuristic-footer .section-title { font-family: 'Orbitron', sans-serif; font-size: 2em; color: " + escCssVal(foregroundColor) + "; margin-top: 0; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 1.5px; text-shadow: 0 0 8px " + escCssVal(data.accentColor) + ";}";
  inlineStyles += " .template-futuristic-footer p { margin: 0.6rem 0; font-size: 1.05em; }";
  inlineStyles += " .template-futuristic-footer a { color: " + escCssVal(data.accentColor) + "; text-decoration: none; font-weight: 600; }";
  inlineStyles += " .template-futuristic-footer a:hover { text-decoration: underline; text-shadow: 0 0 5px " + escCssVal(data.accentColor) + "; }";
  inlineStyles += " .template-futuristic-footer .social-links {display: flex; justify-content: center; gap: 1rem; margin-top: 1rem; margin-bottom: 1.5rem;}";
  inlineStyles += " .template-futuristic-footer .social-links a { color: " + escCssVal(data.accentColor) + "; font-size: 1.5em; text-decoration:none; transition: all 0.2s; display: inline-block; }";
  inlineStyles += " .template-futuristic-footer .social-links a:hover { color: " + escCssVal(foregroundColor) + "; transform: scale(1.1); text-shadow: 0 0 8px " + escCssVal(foregroundColor) + "; }";
  inlineStyles += " .template-futuristic-footer .copyright { margin-top: 2rem; font-size: 0.9em; text-transform: uppercase; letter-spacing: 0.5px; }";
  inlineStyles += " .template-futuristic-footer .tagline { font-size: 0.8em; opacity: 0.7;}";
  inlineStyles += " .template-futuristic-button { display: inline-block; background-color: " + escCssVal(data.accentColor) + "; color: " + escCssVal(accentContrast) + "; padding: 0.9rem 2rem; border: 1px solid " + escCssVal(accentContrast) + "; border-radius: 3px; text-decoration: none; font-family: 'Orbitron', sans-serif; font-size: 1.1em; text-transform: uppercase; cursor: pointer; transition: all 0.3s ease; animation: pulseGlow 3s infinite ease-in-out; box-shadow: 0 0 10px " + escCssVal(data.accentColor) + "77; }";
  inlineStyles += " .template-futuristic-button:hover { background-color: " + escCssVal(primaryContrast) + "; color: " + escCssVal(data.primaryColor) + "; border-color: " + escCssVal(data.primaryColor) + "; box-shadow: 0 0 15px " + escCssVal(primaryContrast) + "; animation-play-state: paused; transform: translateY(-2px); }";
  inlineStyles += " .template-futuristic-button-small { font-size:0.9em; padding: 0.6rem 1.2rem; animation: none; }";
  inlineStyles += " .template-futuristic-button-outline { background-color:transparent; border-color:" + escCssVal(data.accentColor) + "; color:" + escCssVal(data.accentColor) + "; animation: none; }";
  inlineStyles += " .template-futuristic-button-outline:hover { background-color:" + escCssVal(data.accentColor) + "33; box-shadow: 0 0 10px " + escCssVal(data.accentColor) + "77; }";

  let previewHtml = '';
  previewHtml += '<html><head>';
  previewHtml += '<title>' + escHtml(data.yourName) + ' - Portfolio Transmission</title>';
  previewHtml += '<style>';
  previewHtml += escCssVal(inlineStyles);
  previewHtml += '</style></head>';
  previewHtml += '<body class="template-futuristic-body">';
  
  previewHtml += '<header class="template-futuristic-hero">';
  previewHtml += '<img src="' + escAttr(data.heroImagePlaceholder) + '" alt="' + escAttr(data.yourName) + '" data-ai-hint="avatar futuristic sci-fi" />';
  previewHtml += '<h1>' + escHtml(data.yourName) + '</h1>';
  previewHtml += '<h2>' + escHtml(data.heroTitle) + '</h2>';
  if (data.heroTagline) previewHtml += '<p>' + (escHtml(data.heroTagline)).replace(/\n/g, '<br>') + '</p>';
  if (data.heroCtaText) previewHtml += '<a href="#contact" class="template-futuristic-button">' + escHtml(data.heroCtaText) + '</a>';
  previewHtml += '</header>';

  previewHtml += '<nav class="template-futuristic-nav">';
  if (data.showAboutSection) previewHtml += '<a href="#about">Identity Matrix</a>';
  if (data.showAcademicSection) previewHtml += '<a href="#academic">Training Archives</a>';
  if (data.showProjectsSection) previewHtml += '<a href="#projects">Project Nexus</a>';
  if (data.showSkillsSection) previewHtml += '<a href="#skills">Skill Core</a>';
  if (data.showContactSection) previewHtml += '<a href="#contact">Comms Channel</a>';
  previewHtml += '</nav>';

  previewHtml += '<main class="template-futuristic-main">';
  if (data.showAboutSection) {
    previewHtml += '<section id="about" class="template-futuristic-section">';
    previewHtml += '<h2 class="section-title">// Identity Matrix</h2>';
    if (data.aboutBio) previewHtml += '<p style="font-size:1.1em;line-height:1.8;">' + (escHtml(data.aboutBio)).replace(/\n/g, '<br>') + '</p>';
    if (data.showFunFact && data.aboutFunFact) previewHtml += '<p style="margin-top:1rem;font-style:italic;color:' + escCssVal(data.accentColor) + ';border-left: 3px solid ' + escCssVal(data.accentColor) + '; padding-left:1rem;">Fun Algorithm: ' + (escHtml(data.aboutFunFact)).replace(/\n/g, '<br>') + '</p>';
    previewHtml += '</section>';
  }

  if (data.showAcademicSection) {
    previewHtml += '<section id="academic" class="template-futuristic-section">';
    previewHtml += '<h2 class="section-title">// Training Archives</h2>';
    const isAcademic2Visible = data.showAcademic2 && data.academic2 && data.academic2.qualification;
    if (data.showAcademic1 && data.academic1) previewHtml += academicEntryHtml(data.academic1, 1, !isAcademic2Visible);
    if (isAcademic2Visible && data.academic2) previewHtml += academicEntryHtml(data.academic2, 2, true);
    previewHtml += '</section>';
  }

  if (data.showProjectsSection) {
    previewHtml += '<section id="projects" class="template-futuristic-section">';
    previewHtml += '<h2 class="section-title" style="text-align:center;display:block;">// Project Nexus</h2>';
    previewHtml += '<div class="template-futuristic-projects-grid">';
    if (data.showProject1 && data.project1) previewHtml += projectCardHtml(data.project1);
    if (data.showProject2 && data.project2) previewHtml += projectCardHtml(data.project2);
    previewHtml += '</div></section>';
  }

  if (data.showSkillsSection) {
    previewHtml += '<section id="skills" class="template-futuristic-section">';
    previewHtml += '<h2 class="section-title">// Skill Core</h2>';
    if (data.aboutSkills) previewHtml += '<p style="margin-bottom:1.5rem;">' + (escHtml(data.aboutSkills)).replace(/\n/g, '<br>') + '</p>';
    const skillsArray = (data.aboutSkills || "").split(',').map(skill => skill.trim()).filter(skill => skill);
    if (skillsArray.length > 0) {
      previewHtml += '<ul class="template-futuristic-skills-list">';
      previewHtml += skillsArray.map(skill => '<li>' + escHtml(skill) + '</li>').join('');
      previewHtml += '</ul>';
    }
    previewHtml += '</section>';
  }
  previewHtml += '</main>';

  if (data.showContactSection) {
    previewHtml += '<footer id="contact" class="template-futuristic-footer">';
    previewHtml += '<h2 class="section-title" style="color:' + escCssVal(primaryContrast) + ';">// Comms Channel</h2>';
    previewHtml += '<div style="background-color: rgba(0,0,0,0.2); backdrop-filter: blur(3px); padding: 1.5rem; border-radius: 5px; border: 1px solid ' + escCssVal(data.accentColor) + '77; max-width: 600px; margin:0 auto 2rem auto;">';
    previewHtml += '<p>Initiate contact for collaborations or quantum discussions.</p>';
    if (data.contactEmail) previewHtml += '<p style="margin-top:1rem; margin-bottom:1rem;"><strong>Primary Uplink:</strong> <a href="mailto:' + escAttr(data.contactEmail) + '">' + escHtml(data.contactEmail) + '</a></p>';
    previewHtml += '<div class="template-futuristic-social-links">';
    if (data.contactLinkedin) previewHtml += '<a href="' + escAttr(data.contactLinkedin) + '" target="_blank" aria-label="LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>';
    if (data.contactGithub) previewHtml += '<a href="' + escAttr(data.contactGithub) + '" target="_blank" aria-label="GitHub" title="GitHub"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>';
    if (data.contactInstagram) previewHtml += '<a href="' + escAttr(data.contactInstagram) + '" target="_blank" aria-label="Instagram" title="Instagram"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>';
    previewHtml += '</div>';
    if (data.showResumeLink && data.resumeUrl) previewHtml += '<div style="margin-top:1.5rem;"><a href="' + escAttr(data.resumeUrl) + '" target="_blank" class="template-futuristic-button template-futuristic-button-outline">Access Data Log (Resume)</a></div>';
    previewHtml += '</div>';
    previewHtml += '<p class="copyright">&copy; ' + new Date().getFullYear() + ' ' + escHtml(data.yourName) + ' // END OF LINE.</p>';
    previewHtml += '<p class="tagline">Futuristic Portfolio Matrix vOS 1.0</p>';
    previewHtml += '</footer>';
  }
  previewHtml += '</body></html>';
  return { fullTsx, previewHtml };
}
