
// src/templates/elegant.ts
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


export function getElegantTemplate(data: FormSchemaType): TemplateOutput {
  const siteNameClean = (data.yourName?.trim().replace(/\W+/g, '') || "PortfolioSite");
  const primaryContrast = getContrastColor(data.primaryColor);
  const accentContrast = getContrastColor(data.accentColor);
  const foregroundColor = getContrastColor(data.backgroundColor);

  const projectCardTsx = (project: NonNullable<FormSchemaType['project1']>) => {
    let imagePart = '';
    if (project.imageUrl) {
      imagePart = `<Image src={"${escJsStr(project.imageUrl)}"} alt={"${escJsStr(project.name)}"} width={500} height={300} className="w-full h-56 object-cover group-hover:opacity-90 transition-opacity" data-ai-hint="website screenshot elegant" />`;
    } else {
      imagePart = `<div className="w-full h-56 bg-muted flex items-center justify-center"><span className="text-muted-foreground">${escJsStr(project.name)} Showcase</span></div>`;
    }

    return `
    <div className="bg-card/50 border border-border rounded-lg shadow-sm overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      ${imagePart}
      <div className="p-6">
        <h3 className="text-2xl font-serif font-medium text-primary mb-2">${escJsStr(project.name)}</h3>
        <p className="text-sm text-card-foreground/80 mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: "${escJsStr((project.description || "")).replace(/\\n/g, '<br />')}" }} />
        <p className="text-xs italic text-muted-foreground mb-4">Crafted with: ${escJsStr(project.technologies)}</p>
        <div className="flex gap-3">
          ${project.liveUrl ? `<a href={"${escJsStr(project.liveUrl)}"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-xs font-medium rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> View Live
          </a>` : ''}
          ${project.repoUrl ? `<a href={"${escJsStr(project.repoUrl)}"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-xs font-medium rounded-md border border-input bg-background hover:bg-secondary transition-colors">
            <Github className="w-3.5 h-3.5 mr-1.5" /> Examine Code
          </a>` : ''}
        </div>
      </div>
    </div>
  `;
  };
  
  const project1TsxString = (data.showProject1 && data.project1) ? projectCardTsx(data.project1) : '';
  const project2TsxString = (data.showProject2 && data.project2) ? projectCardTsx(data.project2) : '';

  const academicEntryTsx = (academic: AcademicEntryType, entryNumber: 1 | 2) => {
    if (!academic || !academic.qualification) return '';
     return `
      <div className="mb-6 pb-6 text-center ${entryNumber === 1 && data.showAcademic2 && data.academic2?.qualification ? 'border-b border-dotted border-border/70' : ''}">
        ${academic.imageUrl ? `<Image src={"${escJsStr(academic.imageUrl)}"} alt={"${escJsStr(academic.qualification || 'Academic Achievement')}"} width={400} height={240} className="rounded-md mb-4 mx-auto border border-border/50 object-cover" data-ai-hint="education university setting" />` : ''}
        <h3 className="text-xl font-['Lora',_serif] text-primary/90 mb-1">${escJsStr(academic.qualification)}</h3>
        <p className="text-lg text-foreground/80 mb-1">${escJsStr(academic.institution)}</p>
        <p className="text-md text-muted-foreground mb-2"><em>${escJsStr(academic.graduationYear)}</em></p>
        ${academic.grades ? `<p className="text-md text-muted-foreground mb-3">Grades: ${escJsStr(academic.grades)}</p>` : ''}
        ${academic.description ? `<p className="text-foreground/90 leading-relaxed text-sm text-justify" dangerouslySetInnerHTML={{ __html: "${escJsStr(academic.description).replace(/\\n/g, '<br />')}" }} />` : ''}
      </div>
    `;
  };
  const academic1TsxString = (data.showAcademic1 && data.academic1) ? academicEntryTsx(data.academic1, 1) : '';
  const academic2TsxString = (data.showAcademic2 && data.academic2) ? academicEntryTsx(data.academic2, 2) : '';


  const fullTsx = `
// Generated Page: ${escJsStr(data.yourName)}'s Portfolio - Elegant Theme
import React from 'react';
import Image from 'next/image';
import { Mail, Linkedin, Github, Instagram, Download, ExternalLink, Feather, Palette, Edit3, BookOpen } from 'lucide-react';
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
      <div className={"mb-6 pb-6 text-center " + (!isLastVisibleAcademic ? "border-b border-dotted border-border/70" : "")}>
        {academic.imageUrl && (
          <Image 
            src={academic.imageUrl} 
            alt={academic.qualification || 'Academic Achievement'} 
            width={400} 
            height={240} 
            className="rounded-md mb-4 mx-auto border border-border/50 object-cover"
            data-ai-hint="education university setting"
          />
        )}
        <h3 className="text-xl font-['Lora',_serif] text-primary/90 mb-1">{academic.qualification}</h3>
        {academic.institution && <p className="text-lg text-foreground/80 mb-1">{academic.institution}</p>}
        {academic.graduationYear && <p className="text-md text-muted-foreground mb-2"><em>{academic.graduationYear}</em></p>}
        {academic.grades && <p className="text-md text-muted-foreground mb-3">Grades: {academic.grades}</p>}
        {academic.description && <p className="text-foreground/90 leading-relaxed text-sm text-justify" dangerouslySetInnerHTML={{ __html: (academic.description).replace(/\\n/g, '<br />') }} />}
      </div>
    );
  };

  return (
    <div className="font-['Montserrat',_sans-serif] bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Hero Section */}
        <header className="text-center mb-16 pb-8 border-b border-border">
          <Image 
            src={portfolioData.heroImagePlaceholder || "https://placehold.co/140x140.png"} 
            alt={portfolioData.yourName || 'Portfolio Owner'} 
            width={140} 
            height={140} 
            className="rounded-full mx-auto mb-6 border-2 border-accent object-cover shadow-lg"
            data-ai-hint="portrait elegant professional"
            priority
          />
          <h1 className="text-5xl font-['Lora',_serif] font-medium text-primary mb-2">{portfolioData.yourName}</h1>
          <h2 className="text-2xl font-light text-foreground/80 mb-4">{portfolioData.heroTitle}</h2>
          {portfolioData.heroTagline && <p className="text-lg text-foreground/70 max-w-xl mx-auto mb-8" dangerouslySetInnerHTML={{ __html: (portfolioData.heroTagline).replace(/\\n/g, '<br />') }} />}
          {portfolioData.heroCtaText && (
            <a href="#contact" className="inline-block px-8 py-3 text-md font-medium rounded-md border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              {portfolioData.heroCtaText}
            </a>
          )}
        </header>

        {/* Navigation */}
        <nav className="text-center mb-16">
          {portfolioData.showAboutSection && <a href="#about" className="font-['Lora',_serif] text-lg text-foreground/80 hover:text-primary mx-5 pb-1 border-b-2 border-transparent hover:border-primary transition-all">About</a>}
          {portfolioData.showAcademicSection && <a href="#academic" className="font-['Lora',_serif] text-lg text-foreground/80 hover:text-primary mx-5 pb-1 border-b-2 border-transparent hover:border-primary transition-all">Education</a>}
          {portfolioData.showProjectsSection && <a href="#projects" className="font-['Lora',_serif] text-lg text-foreground/80 hover:text-primary mx-5 pb-1 border-b-2 border-transparent hover:border-primary transition-all">Creations</a>}
          {portfolioData.showSkillsSection && <a href="#skills" className="font-['Lora',_serif] text-lg text-foreground/80 hover:text-primary mx-5 pb-1 border-b-2 border-transparent hover:border-primary transition-all">Expertise</a>}
          {portfolioData.showContactSection && <a href="#contact" className="font-['Lora',_serif] text-lg text-foreground/80 hover:text-primary mx-5 pb-1 border-b-2 border-transparent hover:border-primary transition-all">Connect</a>}
        </nav>

        <main>
          {portfolioData.showAboutSection && (
            <section id="about" className="mb-20 scroll-mt-28">
              <h2 className="text-3xl font-['Lora',_serif] font-medium text-primary text-center mb-8 pb-3 border-b border-dotted border-border flex items-center justify-center"><Feather className="w-7 h-7 mr-3 text-accent" /> My Story</h2>
              <div className="bg-card/30 p-8 rounded-lg border border-border/50 shadow-sm">
                {portfolioData.aboutBio && <p className="text-foreground/90 leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: (portfolioData.aboutBio).replace(/\\n/g, '<br />') }}/>}
                {portfolioData.showFunFact && portfolioData.aboutFunFact && (
                  <p className="mt-6 text-sm italic text-muted-foreground text-center" dangerouslySetInnerHTML={{ __html: "A little insight: " + (portfolioData.aboutFunFact).replace(/\\n/g, '<br />') }} />
                )}
              </div>
            </section>
          )}

          {portfolioData.showAcademicSection && (
            <section id="academic" className="mb-20 scroll-mt-28">
              <h2 className="text-3xl font-['Lora',_serif] font-medium text-primary text-center mb-8 pb-3 border-b border-dotted border-border flex items-center justify-center"><BookOpen className="w-7 h-7 mr-3 text-accent" /> Education</h2>
               <div className="bg-card/30 p-8 rounded-lg border border-border/50 shadow-sm">
                {portfolioData.showAcademic1 && portfolioData.academic1 && renderAcademicEntry(portfolioData.academic1, 1)}
                {portfolioData.showAcademic2 && portfolioData.academic2 && renderAcademicEntry(portfolioData.academic2, 2)}
              </div>
            </section>
          )}

          {portfolioData.showProjectsSection && (
            <section id="projects" className="mb-20 scroll-mt-28">
              <h2 className="text-3xl font-['Lora',_serif] font-medium text-primary text-center mb-10 pb-3 border-b border-dotted border-border flex items-center justify-center"><Palette className="w-7 h-7 mr-3 text-accent" /> Selected Creations</h2>
              <div className="grid md:grid-cols-2 gap-8">
                ${project1TsxString}
                ${project2TsxString}
              </div>
            </section>
          )}

          {portfolioData.showSkillsSection && (
            <section id="skills" className="mb-20 scroll-mt-28">
              <h2 className="text-3xl font-['Lora',_serif] font-medium text-primary text-center mb-8 pb-3 border-b border-dotted border-border flex items-center justify-center"><Edit3 className="w-7 h-7 mr-3 text-accent" /> Areas of Expertise</h2>
              <div className="bg-card/30 p-8 rounded-lg border border-border/50 shadow-sm">
                {portfolioData.aboutSkills && <p className="text-foreground/90 leading-relaxed mb-6 text-center" dangerouslySetInnerHTML={{ __html: (portfolioData.aboutSkills).replace(/\\n/g, '<br />') }} />}
                {skillsArray.length > 0 && (
                  <ul className="flex flex-wrap justify-center gap-x-4 gap-y-3">
                    {skillsArray.map((skill, index) => (
                      <li key={index} className="text-sm bg-muted text-muted-foreground px-4 py-2 rounded border border-input">
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          )}
        </main>

        {portfolioData.showContactSection && (
          <footer id="contact" className="text-center py-10 mt-12 border-t border-border scroll-mt-28">
            <h2 className="text-3xl font-['Lora',_serif] font-medium text-primary text-center mb-8 pb-3 border-b border-dotted border-border flex items-center justify-center"><Mail className="w-7 h-7 mr-3 text-accent" /> Let's Connect</h2>
            <div className="bg-card/30 p-8 rounded-lg border border-border/50 shadow-sm text-center max-w-xl mx-auto">
              {portfolioData.contactEmail && (
                <p className="text-lg text-card-foreground mb-6">
                  I welcome collaborations and conversations. Reach out via email: <a href={'mailto:' + portfolioData.contactEmail} className="text-accent hover:underline font-medium">{portfolioData.contactEmail}</a>.
                </p>
              )}
              <div className="flex justify-center space-x-5 text-muted-foreground mb-6">
                {portfolioData.contactLinkedin && <a href={portfolioData.contactLinkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors"><Linkedin size={24} /></a>}
                {portfolioData.contactGithub && <a href={portfolioData.contactGithub} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary transition-colors"><Github size={24} /></a>}
                {portfolioData.contactInstagram && <a href={portfolioData.contactInstagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram size={24} /></a>}
              </div>
              {portfolioData.showResumeLink && portfolioData.resumeUrl && (
                <a href={portfolioData.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-2.5 text-sm font-medium rounded-md border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Download className="w-4 h-4 mr-2" /> View My Resume
                </a>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-10">&copy; {new Date().getFullYear()} {portfolioData.yourName}. Crafted with elegance.</p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default function GeneratedPage() {
  const rawDataString = '${escJsStr(JSON.stringify(data))}';
  
  const defaultErrorProps: FormSchemaType = {
    yourName: "Name (Error)",
    heroTitle: "Title (Error)",
    heroTagline: "Error loading tagline.",
    heroCtaText: "View Work",
    heroImagePlaceholder: "https://placehold.co/140x140.png?text=Error",
    aboutBio: "Error loading biography.",
    aboutSkills: "Error loading skills.",
    aboutFunFact: "",
    academic1: { qualification: "Degree 1 (Error)", institution: "University 1 (Error)" },
    academic2: { qualification: "Degree 2 (Error)", institution: "University 2 (Error)" },
    project1: undefined,
    project2: undefined,
    contactEmail: "error@example.com",
    contactLinkedin: "",
    contactGithub: "",
    contactInstagram: "",
    resumeUrl: "",
    theme: "elegant",
    primaryColor: data.primaryColor || "#6A0DAD", 
    backgroundColor: data.backgroundColor || "#FDF5E6", 
    accentColor: data.accentColor || "#FFD700",   
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
    let html = '<div class="template-elegant-academic-entry" style="text-align:center; margin-bottom: 1.5rem; padding-bottom: 1.5rem; ' + (!isLastVisible ? 'border-bottom: 1px dotted ' + escCssVal(foregroundColor) + '44;' : '') + '">';
    if (academic.imageUrl) {
      html += `<img src="${escAttr(academic.imageUrl)}" alt="${escAttr(academic.qualification || 'Academic Achievement')}" data-ai-hint="education university setting" style="border-radius: 4px; margin-bottom: 1rem; max-width:350px; width:100%; height: auto; object-fit: cover; border: 1px solid ${escCssVal(data.accentColor)}44; display:block; margin-left:auto; margin-right:auto;" />`;
    }
    html += `<h3 style="font-size:1.4em;font-family: 'Lora', serif;color:${escCssVal(data.primaryColor)};margin-top:0;margin-bottom:0.2rem;">${escHtml(academic.qualification)}</h3>`;
    if (academic.institution) html += `<p style="font-size:1.1em;color:${escCssVal(foregroundColor)}CC;margin-bottom:0.2rem;">${escHtml(academic.institution)}</p>`;
    if (academic.graduationYear) html += `<p style="font-size:0.95em;color:${escCssVal(foregroundColor)}AA;margin-bottom:0.3rem;"><em>${escHtml(academic.graduationYear)}</em></p>`;
    if (academic.grades) html += `<p style="font-size:0.95em;color:${escCssVal(foregroundColor)}AA;margin-bottom:0.5rem;">Grades: ${escHtml(academic.grades)}</p>`;
    if (academic.description) html += `<p style="font-size:1em;color:${escCssVal(foregroundColor)}D9;text-align:justify;line-height:1.7;">${(escHtml(academic.description)).replace(/\n/g, '<br>')}</p>`;
    html += '</div>';
    return html;
  };

  const projectCardHtml = (project: NonNullable<FormSchemaType['project1']>) => {
    let imageHtml = '';
    if (project.imageUrl) {
      imageHtml = `<img src="${escAttr(project.imageUrl)}" alt="${escAttr(project.name)}" data-ai-hint="website screenshot elegant" style="width:100%;height:auto;border-radius:4px;margin-bottom:1rem;border:1px solid ${escCssVal(data.accentColor)}44;"/>`;
    } else {
      imageHtml = `<div style="width:100%;height:220px;background-color:${escCssVal(data.accentColor)}1A;display:flex;align-items:center;justify-content:center;border-radius:4px;margin-bottom:1rem;border:1px solid ${escCssVal(data.accentColor)}44;"><span>${escHtml(project.name)} Showcase</span></div>`;
    }
    return `
    <div class="template-elegant-project-card">
      ${imageHtml}
      <h3 style="font-size:1.5em;color:${escCssVal(data.primaryColor)};margin-top:0;margin-bottom:0.5rem;font-family: 'Lora', serif;font-weight:normal;">${escHtml(project.name)}</h3>
      <p style="font-size:1em;margin-bottom:0.5rem;line-height:1.7;color:${escCssVal(foregroundColor)}D9;">${(escHtml(project.description || "")).replace(/\n/g, '<br>')}</p>
      <p style="font-size:0.9em;margin-bottom:1rem;color:${escCssVal(foregroundColor)}AA;"><em>Crafted with: ${escHtml(project.technologies)}</em></p>
      <div class="template-elegant-project-links">
        ${project.liveUrl ? `<a href="${escAttr(project.liveUrl)}" target="_blank" class="template-elegant-button-small" style="background-color:${escCssVal(data.accentColor)};color:${escCssVal(accentContrast)};margin-right:0.7rem;">View Live</a>` : ''}
        ${project.repoUrl ? `<a href="${escAttr(project.repoUrl)}" target="_blank" class="template-elegant-button-small template-elegant-button-outline" style="color:${escCssVal(data.accentColor)};border-color:${escCssVal(data.accentColor)};">Examine Code</a>` : ''}
      </div>
    </div>
  `;
  };
  
  let inlineStyles = '';
  inlineStyles += " @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,700;1,400&family=Montserrat:wght@300;400&display=swap');";
  inlineStyles += " .template-elegant-body { font-family: 'Montserrat', 'Georgia', serif; background-color: " + escCssVal(data.backgroundColor) + "; color: " + escCssVal(foregroundColor) + "; margin: 0; padding: 0; line-height: 1.8; min-height: 100vh; }";
  inlineStyles += " .template-elegant-container { max-width: 950px; margin: 0 auto; padding: 3rem 2rem; }";
  inlineStyles += " .template-elegant-hero { text-align: center; margin-bottom: 3.5rem; padding-bottom: 2rem; border-bottom: 1px solid " + escCssVal(data.accentColor === data.backgroundColor ? foregroundColor+'44' : data.accentColor) + "; }";
  inlineStyles += " .template-elegant-hero img { width: 140px; height: 140px; border-radius: 50%; margin-bottom: 1.2rem; border: 3px solid " + escCssVal(data.accentColor) + "; object-fit: cover; box-shadow: 0 0 15px " + escCssVal(data.accentColor) + "33; }";
  inlineStyles += " .template-elegant-hero h1 { margin: 0.5rem 0 0.3rem; font-family: 'Lora', serif; font-size: 3em; font-weight: 500; color: " + escCssVal(data.primaryColor) + "; letter-spacing: 0.5px; }";
  inlineStyles += " .template-elegant-hero h2 { margin: 0 0 0.8rem; font-size: 1.5em; font-weight: 300; color: " + escCssVal(foregroundColor) + "CC; }";
  inlineStyles += " .template-elegant-hero p { margin: 0 0 1.5rem; font-size: 1.1em; max-width: 600px; margin-left:auto; margin-right:auto; color: " + escCssVal(foregroundColor) + "B3; }";
  inlineStyles += " .template-elegant-nav { text-align: center; margin-bottom: 3.5rem; }";
  inlineStyles += " .template-elegant-nav a { font-family: 'Lora', serif; color: " + escCssVal(data.primaryColor) + "; text-decoration: none; margin: 0 1.8rem; font-size: 1.15em; letter-spacing: 0.3px; transition: color 0.3s ease; padding-bottom: 0.2rem; border-bottom: 1px solid transparent; }";
  inlineStyles += " .template-elegant-nav a:hover { color: " + escCssVal(data.accentColor) + "; border-bottom-color: " + escCssVal(data.accentColor) + "; }";
  inlineStyles += " .template-elegant-section { margin-bottom: 3rem; }";
  inlineStyles += " .template-elegant-section h2.section-title { font-family: 'Lora', serif; font-size: 2.1em; font-weight: 500; color: " + escCssVal(data.primaryColor) + "; margin-top: 0; margin-bottom: 1.5rem; padding-bottom: 0.6rem; border-bottom: 1px dotted " + escCssVal(data.accentColor) + "; text-align:center; }";
  inlineStyles += " .template-elegant-section p, .template-elegant-section ul { font-size: 1.05em; color: " + escCssVal(foregroundColor) + "E6; }";
  inlineStyles += " .template-elegant-skills-list { list-style: none; padding:0; display: flex; flex-wrap:wrap; gap:0.8rem; justify-content:center; }";
  inlineStyles += " .template-elegant-skills-list li { background-color: " + escCssVal(data.accentColor) + "1A; color: " + escCssVal(data.accentColor) + "; padding: 0.5rem 1.2rem; border-radius: 4px; border: 1px solid " + escCssVal(data.accentColor) + "88; font-size: 0.95em; }";
  inlineStyles += " .template-elegant-projects-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }";
  inlineStyles += " @media (min-width: 768px) { .template-elegant-projects-grid { grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); } }";
  inlineStyles += " .template-elegant-project-card { background-color: " + escCssVal(data.backgroundColor) + "; padding: 1.5rem; border-radius: 5px; border: 1px solid " + escCssVal(foregroundColor) + "26; box-shadow: 0 3px 10px " + escCssVal(foregroundColor) + "1A; }";
  inlineStyles += " .template-elegant-footer { text-align: center; margin-top: 4rem; padding-top: 2.5rem; font-size: 0.9em; color: " + escCssVal(foregroundColor) + "B3; border-top: 1px solid " + escCssVal(data.accentColor === data.backgroundColor ? foregroundColor+'44' : data.accentColor) + "; }";
  inlineStyles += " .template-elegant-footer .section-title { font-family: 'Lora', serif; font-size: 2.1em; font-weight: 500; color: " + escCssVal(data.primaryColor) + "; margin-bottom: 1.5rem; padding-bottom: 0.6rem; border-bottom: 1px dotted " + escCssVal(data.accentColor) + "; text-align:center; }";
  inlineStyles += " .template-elegant-footer p { margin: 0.5rem 0; font-size: 1.05em; text-align:center; }";
  inlineStyles += " .template-elegant-footer a { color: " + escCssVal(data.primaryColor) + "; text-decoration: none; }";
  inlineStyles += " .template-elegant-footer a:hover { color: " + escCssVal(data.accentColor) + "; text-decoration: underline; }";
  inlineStyles += " .template-elegant-footer .social-links { display: flex; justify-content: center; gap: 1rem; text-align: center; margin-bottom: 1rem; }";
  inlineStyles += " .template-elegant-footer .social-links a { color: " + escCssVal(data.primaryColor) + "; font-size: 1.2em; text-decoration:none; }";
  inlineStyles += " .template-elegant-footer .social-links a:hover { color: " + escCssVal(data.accentColor) + "; }";
  inlineStyles += " .template-elegant-button { display: inline-block; background-color: transparent; color: " + escCssVal(data.primaryColor) + "; padding: 0.8rem 2rem; border: 1px solid " + escCssVal(data.primaryColor) + "; border-radius: 3px; text-decoration: none; font-size: 1em; cursor: pointer; font-family: 'Montserrat', sans-serif; transition: background-color 0.3s ease, color 0.3s ease; }";
  inlineStyles += " .template-elegant-button:hover { background-color: " + escCssVal(data.primaryColor) + "; color: " + escCssVal(primaryContrast) + "; }";
  inlineStyles += " .template-elegant-button-small { font-size:0.9em; padding: 0.6rem 1.2rem; }";
  inlineStyles += " .template-elegant-button-outline { background-color:transparent; border-color:" + escCssVal(data.accentColor) + "; color:" + escCssVal(data.accentColor) + ";}";
  inlineStyles += " .template-elegant-button-outline:hover { background-color:" + escCssVal(data.accentColor) + "; color:" + escCssVal(accentContrast) + "; }";
  
  let previewHtml = '';
  previewHtml += '<html><head>';
  previewHtml += '<title>' + escHtml(data.yourName) + ' - Portfolio (Elegant)</title>';
  previewHtml += '<style>';
  previewHtml += " body, h1, h2, h3, p, ul, li, a, div, section, header, footer, nav, main, img { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }";
  previewHtml += escCssVal(inlineStyles);
  previewHtml += '</style></head>';
  previewHtml += '<body class="template-elegant-body"><div class="template-elegant-container">';
  
  previewHtml += '<header class="template-elegant-hero">';
  previewHtml += '<img src="' + escAttr(data.heroImagePlaceholder) + '" alt="' + escAttr(data.yourName) + '" data-ai-hint="portrait elegant professional" />';
  previewHtml += '<h1>' + escHtml(data.yourName) + '</h1>';
  previewHtml += '<h2>' + escHtml(data.heroTitle) + '</h2>';
  if(data.heroTagline) previewHtml += '<p>' + (escHtml(data.heroTagline)).replace(/\n/g, '<br>') + '</p>';
  if(data.heroCtaText) previewHtml += '<a href="#contact" class="template-elegant-button">' + escHtml(data.heroCtaText) + '</a>';
  previewHtml += '</header>';

  previewHtml += '<nav class="template-elegant-nav">';
  if(data.showAboutSection) previewHtml += '<a href="#about">About</a>';
  if(data.showAcademicSection) previewHtml += '<a href="#academic">Education</a>';
  if(data.showProjectsSection) previewHtml += '<a href="#projects">Creations</a>';
  if(data.showSkillsSection) previewHtml += '<a href="#skills">Expertise</a>';
  if(data.showContactSection) previewHtml += '<a href="#contact">Connect</a>';
  previewHtml += '</nav>';

  previewHtml += '<main class="template-elegant-main">';
  if(data.showAboutSection) {
    previewHtml += '<section id="about" class="template-elegant-section">';
    previewHtml += '<h2 class="section-title">My Story</h2>';
    previewHtml += '<div style="background-color:'+escCssVal(data.backgroundColor)+'4D; padding: 1.5rem; border-radius: 5px; border: 1px solid '+escCssVal(foregroundColor)+'26;">';
    if(data.aboutBio) previewHtml += '<p>' + (escHtml(data.aboutBio)).replace(/\n/g, '<br>') + '</p>';
    if(data.showFunFact && data.aboutFunFact) previewHtml += '<p style="margin-top:1rem;font-style:italic;text-align:center;color:'+escCssVal(foregroundColor)+'AA;">A little insight: ' + (escHtml(data.aboutFunFact)).replace(/\n/g, '<br>') + '</p>';
    previewHtml += '</div></section>';
  }

  if(data.showAcademicSection) {
    previewHtml += '<section id="academic" class="template-elegant-section">';
    previewHtml += '<h2 class="section-title">Education</h2>';
    previewHtml += '<div style="background-color:'+escCssVal(data.backgroundColor)+'4D; padding: 1.5rem; border-radius: 5px; border: 1px solid '+escCssVal(foregroundColor)+'26;">';
    const isAcademic2Visible = data.showAcademic2 && data.academic2 && data.academic2.qualification;
    if (data.showAcademic1 && data.academic1) previewHtml += academicEntryHtml(data.academic1, 1, !isAcademic2Visible);
    if (isAcademic2Visible && data.academic2) previewHtml += academicEntryHtml(data.academic2, 2, true);
    previewHtml += '</div></section>';
  }

  if(data.showProjectsSection) {
    previewHtml += '<section id="projects" class="template-elegant-section">';
    previewHtml += '<h2 class="section-title">Selected Creations</h2>';
    previewHtml += '<div class="template-elegant-projects-grid">';
    if (data.showProject1 && data.project1) previewHtml += projectCardHtml(data.project1);
    if (data.showProject2 && data.project2) previewHtml += projectCardHtml(data.project2);
    previewHtml += '</div></section>';
  }

  if(data.showSkillsSection) {
    previewHtml += '<section id="skills" class="template-elegant-section">';
    previewHtml += '<h2 class="section-title">Areas of Expertise</h2>';
    previewHtml += '<div style="background-color:'+escCssVal(data.backgroundColor)+'4D; padding: 1.5rem; border-radius: 5px; border: 1px solid '+escCssVal(foregroundColor)+'26;">';
    if(data.aboutSkills) previewHtml += '<p style="text-align:center;margin-bottom:1.5rem;">' + (escHtml(data.aboutSkills)).replace(/\n/g, '<br>') + '</p>';
    const skillsArray = (data.aboutSkills || "").split(',').map(skill => skill.trim()).filter(skill => skill);
    if (skillsArray.length > 0) {
      previewHtml += '<ul class="template-elegant-skills-list">';
      previewHtml += skillsArray.map(skill => '<li>' + escHtml(skill) + '</li>').join('');
      previewHtml += '</ul>';
    }
    previewHtml += '</div></section>';
  }
  previewHtml += '</main>';

  if(data.showContactSection) {
    previewHtml += '<footer id="contact" class="template-elegant-footer">';
    previewHtml += '<h2 class="section-title">Let\'s Connect</h2>';
    previewHtml += '<div style="background-color:'+escCssVal(data.backgroundColor)+'4D; padding: 1.5rem; border-radius: 5px; border: 1px solid '+escCssVal(foregroundColor)+'26; max-width: 600px; margin:0 auto 2rem auto;">';
    if(data.contactEmail) previewHtml += '<p>I welcome collaborations and conversations. Reach out via email: <a href="mailto:' + escAttr(data.contactEmail) + '">' + escHtml(data.contactEmail) + '</a>.</p>';
    previewHtml += '<div class="social-links">';
    if(data.contactLinkedin) previewHtml += '<a href="' + escAttr(data.contactLinkedin) + '" target="_blank" aria-label="LinkedIn" title="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>';
    if(data.contactGithub) previewHtml += '<a href="' + escAttr(data.contactGithub) + '" target="_blank" aria-label="GitHub" title="GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>';
    if(data.contactInstagram) previewHtml += '<a href="' + escAttr(data.contactInstagram) + '" target="_blank" aria-label="Instagram" title="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>';
    previewHtml += '</div>';
    if(data.showResumeLink && data.resumeUrl) previewHtml += '<p style="text-align:center; margin-top:1.5rem;"><a href="' + escAttr(data.resumeUrl) + '" target="_blank" class="template-elegant-button template-elegant-button-small">View My Resume</a></p>';
    previewHtml += '</div>';
    previewHtml += '<p style="margin-top: 2rem;">&copy; ' + new Date().getFullYear() + ' ' + escHtml(data.yourName) + '. Crafted with elegance.</p>';
    previewHtml += '</footer>';
  }
  previewHtml += '</div></body></html>';
  return { fullTsx, previewHtml };
}
