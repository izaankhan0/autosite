
// src/templates/classic.ts
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


export function getClassicTemplate(data: FormSchemaType): TemplateOutput {
  const siteNameClean = (data.yourName?.trim().replace(/\W+/g, '') || "PortfolioSite");
  const primaryContrast = getContrastColor(data.primaryColor);
  const accentContrast = getContrastColor(data.accentColor);
  const foregroundColor = getContrastColor(data.backgroundColor);

  const projectCardTsx = (project: NonNullable<FormSchemaType['project1']>) => {
    let imagePart = '';
    if (project.imageUrl) {
      imagePart = `<Image src={"${escJsStr(project.imageUrl)}"} alt={"${escJsStr(project.name)}"} width={400} height={250} className="rounded mb-3 w-full h-auto object-cover border border-primary/20" data-ai-hint="website screenshot classic" />`;
    } else {
      imagePart = `<div className="w-full h-[200px] bg-muted rounded mb-3 flex items-center justify-center border border-primary/20"><span className="text-muted-foreground">${escJsStr(project.name)} Preview</span></div>`;
    }
    return `
    <div className="border border-primary/30 p-6 rounded shadow-sm bg-background">
      ${imagePart}
      <h3 className="text-2xl font-serif font-semibold text-primary mb-2">${escJsStr(project.name)}</h3>
      <p className="text-foreground/90 mb-2" dangerouslySetInnerHTML={{ __html: "${escJsStr((project.description || "")).replace(/\\n/g, '<br />')}" }} />
      <p className="text-sm text-muted-foreground italic mb-3">Technologies: ${escJsStr(project.technologies)}</p>
      <div className="flex gap-3">
        ${project.liveUrl ? `<a href={"${escJsStr(project.liveUrl)}"} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm rounded bg-accent text-accent-foreground hover:bg-accent/80 transition-colors">
          <ExternalLink className="inline w-4 h-4 mr-1" /> Live Site
        </a>` : ''}
        ${project.repoUrl ? `<a href={"${escJsStr(project.repoUrl)}"} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-sm rounded border border-accent text-accent hover:bg-accent/10 transition-colors">
          <Github className="inline w-4 h-4 mr-1" /> View Code
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
      <div className="mb-6 pb-6 ${entryNumber === 1 && data.showAcademic2 && data.academic2?.qualification ? 'border-b border-dashed border-primary/30' : ''}">
        ${academic.imageUrl ? `<Image src={"${escJsStr(academic.imageUrl)}"} alt={"${escJsStr(academic.qualification || 'Academic Achievement')}"} width={200} height={120} className="rounded-md mb-4 float-right ml-4 border border-primary/20 object-cover" data-ai-hint="education university campus" />` : ''}
        <h3 className="text-xl font-serif font-medium text-primary/90 mt-0 mb-1">${escJsStr(academic.qualification)}</h3>
        <p className="text-md font-semibold text-foreground/90 mb-1">${escJsStr(academic.institution)}</p>
        <p className="text-sm text-muted-foreground mb-1"><em>${escJsStr(academic.graduationYear)}</em></p>
        ${academic.grades ? `<p className="text-sm text-muted-foreground mb-3">Grades: ${escJsStr(academic.grades)}</p>` : ''}
        ${academic.description ? `<p className="text-foreground/90 leading-relaxed clear-both" dangerouslySetInnerHTML={{ __html: "${escJsStr(academic.description).replace(/\\n/g, '<br />')}" }} />` : ''}
      </div>
    `;
  };
  const academic1TsxString = (data.showAcademic1 && data.academic1) ? academicEntryTsx(data.academic1, 1) : '';
  const academic2TsxString = (data.showAcademic2 && data.academic2) ? academicEntryTsx(data.academic2, 2) : '';


  const fullTsx = `
// Generated Page: ${escJsStr(data.yourName)}'s Portfolio - Classic Theme
import React from 'react';
import Image from 'next/image';
import { Mail, Linkedin, Github, Instagram, Download, ExternalLink, User, Briefcase, Star, BookOpen } from 'lucide-react';
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

  const renderAcademicEntry = (academic: AcademicEntryType | undefined, entryNumber: 1 | 2) => {
    if (!academic || !academic.qualification) return null;
    const isLastVisibleAcademic = 
        (entryNumber === 1 && (!portfolioData.showAcademic2 || !portfolioData.academic2?.qualification)) || 
        (entryNumber === 2);

    return (
      <div className={"mb-6 pb-6 " + (!isLastVisibleAcademic ? "border-b border-dashed border-primary/30" : "")}>
        {academic.imageUrl && (
          <Image 
            src={academic.imageUrl} 
            alt={academic.qualification || 'Academic Achievement'} 
            width={200} 
            height={120} 
            className="rounded-md mb-4 float-right ml-4 border border-primary/20 object-cover"
            data-ai-hint="education university campus"
          />
        )}
        <h3 className="text-xl font-serif font-medium text-primary/90 mt-0 mb-1">{academic.qualification}</h3>
        {academic.institution && <p className="text-md font-semibold text-foreground/90 mb-1">{academic.institution}</p>}
        {academic.graduationYear && <p className="text-sm text-muted-foreground mb-1"><em>{academic.graduationYear}</em></p>}
        {academic.grades && <p className="text-sm text-muted-foreground mb-3">Grades: {academic.grades}</p>}
        {academic.description && <p className="text-foreground/90 leading-relaxed clear-both" dangerouslySetInnerHTML={{ __html: (academic.description).replace(/\\n/g, '<br />') }} />}
      </div>
    );
  };

  return (
    <div className="font-serif bg-background text-foreground">
      <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-background shadow-lg border-x border-primary/20">
        <header className="bg-primary text-primary-foreground text-center py-10 px-6 mb-8 border-b-4 border-accent">
          <Image 
            src={portfolioData.heroImagePlaceholder || "https://placehold.co/120x120.png"} 
            alt={portfolioData.yourName || 'Portfolio Owner'} 
            width={120} 
            height={120} 
            className="rounded-full mx-auto mb-4 border-2 border-accent object-cover"
            data-ai-hint="portrait professional classic" 
            priority
          />
          <h1 className="text-4xl font-bold font-serif tracking-wider uppercase mb-1">{portfolioData.yourName}</h1>
          <h2 className="text-xl font-light opacity-90 mb-2">{portfolioData.heroTitle}</h2>
          {portfolioData.heroTagline && <p className="text-base max-w-xl mx-auto mb-6 opacity-90" dangerouslySetInnerHTML={{ __html: (portfolioData.heroTagline).replace(/\\n/g, '<br />') }} />}
          {portfolioData.heroCtaText && (
            <a href="#contact" className="inline-block px-6 py-2 text-md rounded bg-accent text-accent-foreground hover:bg-accent/80 transition-colors">
              {portfolioData.heroCtaText}
            </a>
          )}
        </header>

        <nav className="bg-accent text-accent-foreground py-3 text-center mb-8">
          {portfolioData.showAboutSection && <a href="#about" className="mx-4 hover:text-primary transition-colors">About</a>}
          {portfolioData.showAcademicSection && <a href="#academic" className="mx-4 hover:text-primary transition-colors">Education</a>}
          {portfolioData.showProjectsSection && <a href="#projects" className="mx-4 hover:text-primary transition-colors">Projects</a>}
          {portfolioData.showSkillsSection && <a href="#skills" className="mx-4 hover:text-primary transition-colors">Skills</a>}
          {portfolioData.showContactSection && <a href="#contact" className="mx-4 hover:text-primary transition-colors">Contact</a>}
        </nav>

        <main className="px-2 sm:px-4">
          {portfolioData.showAboutSection && (
            <section id="about" className="mb-10 pb-6 border-b border-dashed border-primary/40 scroll-mt-24">
              <h2 className="text-3xl font-serif font-semibold text-primary mb-4 uppercase tracking-wide flex items-center"><User className="inline w-7 h-7 mr-2" />About Me</h2>
              {portfolioData.aboutBio && <p className="text-foreground/90 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: (portfolioData.aboutBio).replace(/\\n/g, '<br />') }} />}
              {portfolioData.showFunFact && portfolioData.aboutFunFact && (
                <p className="text-sm italic text-muted-foreground" dangerouslySetInnerHTML={{ __html: "A little something extra: " + (portfolioData.aboutFunFact).replace(/\\n/g, '<br />') }} />
              )}
            </section>
          )}

          {portfolioData.showAcademicSection && (
            <section id="academic" className="mb-10 pb-6 border-b border-dashed border-primary/40 scroll-mt-24">
              <h2 className="text-3xl font-serif font-semibold text-primary mb-4 uppercase tracking-wide flex items-center"><BookOpen className="inline w-7 h-7 mr-2" />Education</h2>
              {portfolioData.showAcademic1 && portfolioData.academic1 && renderAcademicEntry(portfolioData.academic1, 1)}
              {portfolioData.showAcademic2 && portfolioData.academic2 && renderAcademicEntry(portfolioData.academic2, 2)}
            </section>
          )}

          {portfolioData.showProjectsSection && (
            <section id="projects" className="mb-10 pb-6 border-b border-dashed border-primary/40 scroll-mt-24">
              <h2 className="text-3xl font-serif font-semibold text-primary mb-6 uppercase tracking-wide flex items-center"><Briefcase className="inline w-7 h-7 mr-2" />My Work</h2>
              <div className="grid md:grid-cols-2 gap-6">
                ${project1TsxString}
                ${project2TsxString}
              </div>
            </section>
          )}

          {portfolioData.showSkillsSection && (
            <section id="skills" className="mb-10 pb-6 border-b border-dashed border-primary/40 scroll-mt-24">
              <h2 className="text-3xl font-serif font-semibold text-primary mb-4 uppercase tracking-wide flex items-center"><Star className="inline w-7 h-7 mr-2" />Skills</h2>
              {portfolioData.aboutSkills && <p className="text-foreground/90 mb-3" dangerouslySetInnerHTML={{ __html: (portfolioData.aboutSkills).replace(/\\n/g, '<br />') }} />}
            </section>
          )}
        </main>

        {portfolioData.showContactSection && (
          <footer id="contact" className="text-center py-8 mt-8 border-t border-primary/40 scroll-mt-24">
            <h2 className="text-3xl font-serif font-semibold text-primary mb-4 uppercase tracking-wide flex items-center justify-center"><Mail className="inline w-7 h-7 mr-2" />Contact</h2>
            {portfolioData.contactEmail && (
              <p className="text-foreground/90 mb-2">
                Feel free to reach out: <a href={"mailto:" + portfolioData.contactEmail} className="text-accent hover:underline">{portfolioData.contactEmail}</a>
              </p>
            )}
            <div className="flex justify-center space-x-4 mt-3 mb-6">
              {portfolioData.contactLinkedin && <a href={portfolioData.contactLinkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-primary hover:text-accent transition-colors"><Linkedin size={24} /></a>}
              {portfolioData.contactGithub && <a href={portfolioData.contactGithub} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-primary hover:text-accent transition-colors"><Github size={24} /></a>}
              {portfolioData.contactInstagram && <a href={portfolioData.contactInstagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-primary hover:text-accent transition-colors"><Instagram size={24} /></a>}
            </div>
            {portfolioData.showResumeLink && portfolioData.resumeUrl && (
              <div className="mb-6">
                <a href={portfolioData.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-sm rounded border border-accent text-accent hover:bg-accent/10 transition-colors">
                  <Download className="w-4 h-4 mr-2" /> Download Resume
                </a>
              </div>
            )}
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {portfolioData.yourName}. Classic Portfolio Design.</p>
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
    heroImagePlaceholder: "https://placehold.co/120x120.png?text=Error",
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
    theme: "classic",
    primaryColor: data.primaryColor || "#D2B48C", 
    backgroundColor: data.backgroundColor || "#FAF0E6", 
    accentColor: data.accentColor || "#8B4513",   
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
    let html = '<div class="template-classic-academic-entry" style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; overflow:hidden; ' + (!isLastVisible ? 'border-bottom: 1px dashed ' + escCssVal(data.primaryColor) + '66;' : '') + '">';
    if (academic.imageUrl) {
      html += `<img src="${escAttr(academic.imageUrl)}" alt="${escAttr(academic.qualification || 'Academic Achievement')}" data-ai-hint="education university campus" style="float: right; margin-left: 1rem; margin-bottom: 0.5rem; max-width: 180px; height: auto; border-radius: 3px; border: 1px solid ${escCssVal(data.primaryColor)}33;" />`;
    }
    html += `<h3 style="font-size:1.3em;color:${escCssVal(data.primaryColor)};margin-top:0;margin-bottom:0.2rem; font-family: 'Georgia', serif;">${escHtml(academic.qualification)}</h3>`;
    if (academic.institution) html += `<p style="font-weight:bold;margin-bottom:0.1rem;color:${escCssVal(foregroundColor)}E6;">${escHtml(academic.institution)}</p>`;
    if (academic.graduationYear) html += `<p style="font-size:0.9em;margin-bottom:0.1rem;color:${escCssVal(foregroundColor)}B3;"><em>${escHtml(academic.graduationYear)}</em></p>`;
    if (academic.grades) html += `<p style="font-size:0.9em;margin-bottom:0.5rem;color:${escCssVal(foregroundColor)}B3;">Grades: ${escHtml(academic.grades)}</p>`;
    if (academic.description) html += `<p style="clear:both; color:${escCssVal(foregroundColor)}CC;">${(escHtml(academic.description)).replace(/\n/g, '<br>')}</p>`;
    html += '</div>';
    return html;
  };

  const projectCardHtml = (project: NonNullable<FormSchemaType['project1']>) => {
    const pNameHtml = escHtml(project.name);
    const pDescHtml = (escHtml(project.description || "")).replace(/\n/g, '<br>');
    const pTechHtml = escHtml(project.technologies);
    const pImgUrlAttr = escAttr(project.imageUrl || "https://placehold.co/400x250.png");
    const pLiveUrlAttr = escAttr(project.liveUrl);
    const pRepoUrlAttr = escAttr(project.repoUrl);

    return `
    <div class="template-classic-project-card">
      ${project.imageUrl ? `<img src="${pImgUrlAttr}" alt="${pNameHtml}" data-ai-hint="website screenshot classic" style="max-width:100%;height:auto;border:1px solid ${escCssVal(data.accentColor)};margin-bottom:0.5rem;border-radius:3px;"/>` : `<div style="width:100%;height:180px;background-color:${escCssVal(data.accentColor)}26;display:flex;align-items:center;justify-content:center;border:1px solid ${escCssVal(data.accentColor)};margin-bottom:0.5rem;border-radius:3px;"><span>${pNameHtml} Preview</span></div>`}
      <h3 style="font-size:1.5em;color:${escCssVal(data.primaryColor)};margin-top:0;margin-bottom:0.4rem;">${pNameHtml}</h3>
      <p style="font-size:1em;margin-bottom:0.4rem;">${pDescHtml}</p>
      <p style="font-size:0.9em;margin-bottom:0.8rem;"><em>Technologies: ${pTechHtml}</em></p>
      <div class="template-classic-project-links">
        ${project.liveUrl ? `<a href="${pLiveUrlAttr}" target="_blank" class="template-classic-button-small" style="background-color:${escCssVal(data.accentColor)};color:${escCssVal(accentContrast)};margin-right:0.5rem;">Live Site</a>` : ''}
        ${project.repoUrl ? `<a href="${pRepoUrlAttr}" target="_blank" class="template-classic-button-small" style="background-color:transparent;color:${escCssVal(data.accentColor)};border:1px solid ${escCssVal(data.accentColor)};">View Code</a>` : ''}
      </div>
    </div>
  `;
  };
  
  let inlineStyles = '';
  inlineStyles += ".template-classic-body { font-family: 'Georgia', 'Times New Roman', Times, serif; background-color: " + escCssVal(data.backgroundColor) + "; color: " + escCssVal(foregroundColor) + "; margin: 0; padding: 0; line-height: 1.75; min-height: 100vh; }";
  inlineStyles += ".template-classic-wrapper { max-width: 960px; margin: 0 auto; padding: 2rem; background-color: " + (data.backgroundColor === '#ffffff' || data.backgroundColor === '#FFFFFF' ? '#fdfdfd' : 'rgba(0,0,0,0.02)') + "; border-left: 1px solid " + (data.accentColor === data.backgroundColor ? escCssVal(foregroundColor) : escCssVal(data.accentColor)) + "; border-right: 1px solid " + (data.accentColor === data.backgroundColor ? escCssVal(foregroundColor) : escCssVal(data.accentColor)) + "; }";
  inlineStyles += ".template-classic-hero { background-color: " + escCssVal(data.primaryColor) + "; color: " + escCssVal(primaryContrast) + "; padding: 2.5rem 2rem; text-align: center; border-bottom: 3px solid " + escCssVal(data.accentColor) + "; margin-bottom: 2rem; }";
  inlineStyles += ".template-classic-hero img { width: 120px; height: 120px; border-radius: 50%; margin-bottom: 1rem; border: 3px solid " + escCssVal(data.accentColor) + "; object-fit: cover; }";
  inlineStyles += ".template-classic-hero h1 { margin: 0.5rem 0 0.2rem; font-size: 2.6em; font-variant: small-caps; letter-spacing: 1px; }";
  inlineStyles += ".template-classic-hero h2 { margin: 0 0 0.5rem; font-size: 1.4em; font-weight: normal; opacity: 0.9;}";
  inlineStyles += ".template-classic-hero p { margin: 0 0 1.2rem; font-size: 1.05em; max-width: 550px; margin-left:auto; margin-right:auto; opacity: 0.9;}";
  inlineStyles += ".template-classic-nav { background-color: " + escCssVal(data.accentColor) + "; padding: 0.75rem 0; text-align: center; margin-bottom: 2rem; }";
  inlineStyles += ".template-classic-nav a { color: " + escCssVal(accentContrast) + "; text-decoration: none; margin: 0 1.5rem; font-size: 1.1em; transition: color 0.3s ease; }";
  inlineStyles += ".template-classic-nav a:hover { color: " + escCssVal(data.primaryColor) + "; }";
  inlineStyles += ".template-classic-main { padding: 0 1rem; }";
  inlineStyles += ".template-classic-section { margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 1px dashed " + (data.accentColor === data.backgroundColor ? escCssVal(foregroundColor)+'66' : escCssVal(data.accentColor)) + "; overflow:hidden; /* For float */ }"; 
  inlineStyles += ".template-classic-section:last-of-type { border-bottom: none; }"; 
  inlineStyles += ".template-classic-section h2.section-title { font-size: 1.8em; margin-top: 0; margin-bottom: 1rem; color: " + escCssVal(data.primaryColor) + "; font-variant: small-caps; }";
  inlineStyles += ".template-classic-skills-list { list-style: circle; padding-left: 20px; margin-top:0.5rem; }";
  inlineStyles += ".template-classic-skills-list li { margin-bottom: 0.3rem; }";
  inlineStyles += ".template-classic-projects-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }";
  inlineStyles += "@media (min-width: 768px) { .template-classic-projects-grid { grid-template-columns: repeat(2, 1fr); } }";
  inlineStyles += ".template-classic-project-card { background-color: " + escCssVal(data.backgroundColor) + "; padding: 1.2rem; border: 1px solid " + escCssVal(data.primaryColor) + "4D; box-shadow: 2px 2px 5px " + escCssVal(data.primaryColor) + "26; border-radius:3px;}";
  inlineStyles += ".template-classic-footer { text-align: center; margin-top: 3rem; padding: 1.5rem; font-size: 0.9em; border-top: 1px solid " + (data.accentColor === data.backgroundColor ? escCssVal(foregroundColor) : escCssVal(data.accentColor)) + "; color: " + escCssVal(foregroundColor) + "; }";
  inlineStyles += ".template-classic-footer .section-title { font-size: 1.8em; margin-bottom: 1rem; color: " + escCssVal(data.primaryColor) + "; font-variant: small-caps; }";
  inlineStyles += ".template-classic-footer p { margin: 0.4rem 0; }";
  inlineStyles += ".template-classic-footer a { color: " + escCssVal(data.primaryColor) + "; text-decoration:none; }";
  inlineStyles += ".template-classic-footer a:hover { color: " + escCssVal(data.accentColor) + "; text-decoration:underline; }";
  inlineStyles += ".template-classic-footer .social-links { display: flex; justify-content: center; gap: 1rem; margin-top: 0.5rem; margin-bottom: 1rem; }";
  inlineStyles += ".template-classic-footer .social-links a { color: " + escCssVal(data.primaryColor) + "; text-decoration: none; font-size: 1.2em; }";
  inlineStyles += ".template-classic-footer .social-links a:hover { color: " + escCssVal(data.accentColor) + "; }";
  inlineStyles += ".template-classic-button { display: inline-block; background-color: " + escCssVal(data.accentColor) + "; color: " + escCssVal(accentContrast) + "; padding: 0.7rem 1.5rem; text-decoration: none; border:1px solid " + escCssVal(data.accentColor) + "; transition: background-color 0.3s, color 0.3s; border-radius:3px; }";
  inlineStyles += ".template-classic-button:hover { background-color: " + escCssVal(data.primaryColor) + "; color: " + escCssVal(primaryContrast) + "; border-color:" + escCssVal(data.primaryColor) + "; }";
  inlineStyles += ".template-classic-button-small { font-size:0.9em; padding: 0.5rem 1rem; border-radius:3px;}";

  let previewHtml = '';
  previewHtml += '<html><head>';
  previewHtml += '<title>' + escHtml(data.yourName) + ' - Portfolio (Classic)</title>';
  previewHtml += '<style>';
  previewHtml += "body, h1, h2, h3, p, ul, li, a, div, section, header, footer, nav, main, img { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }";
  previewHtml += escCssVal(inlineStyles);
  previewHtml += '</style></head>';
  previewHtml += '<body class="template-classic-body"><div class="template-classic-wrapper">';
  
  previewHtml += '<header class="template-classic-hero">';
  previewHtml += '<img src="' + escAttr(data.heroImagePlaceholder) + '" alt="' + escAttr(data.yourName) + '" data-ai-hint="portrait professional classic" />';
  previewHtml += '<h1>' + escHtml(data.yourName) + '</h1>';
  previewHtml += '<h2>' + escHtml(data.heroTitle) + '</h2>';
  if(data.heroTagline) previewHtml += '<p>' + (escHtml(data.heroTagline)).replace(/\n/g, '<br>') + '</p>';
  if(data.heroCtaText) previewHtml += '<a href="#contact" class="template-classic-button">' + escHtml(data.heroCtaText) + '</a>';
  previewHtml += '</header>';

  previewHtml += '<nav class="template-classic-nav">';
  if(data.showAboutSection) previewHtml += '<a href="#about">About</a>';
  if(data.showAcademicSection) previewHtml += '<a href="#academic">Education</a>';
  if(data.showProjectsSection) previewHtml += '<a href="#projects">Projects</a>';
  if(data.showSkillsSection) previewHtml += '<a href="#skills">Skills</a>';
  if(data.showContactSection) previewHtml += '<a href="#contact">Contact</a>';
  previewHtml += '</nav>';

  previewHtml += '<main class="template-classic-main">';
  if(data.showAboutSection) {
    previewHtml += '<section id="about" class="template-classic-section">';
    previewHtml += '<h2 class="section-title">About Me</h2>';
    if(data.aboutBio) previewHtml += '<p>' + (escHtml(data.aboutBio)).replace(/\n/g, '<br>') + '</p>';
    if(data.showFunFact && data.aboutFunFact) previewHtml += '<p style="margin-top:1rem;font-style:italic;">' + (escHtml(data.aboutFunFact)).replace(/\n/g, '<br>') + '</p>';
    previewHtml += '</section>';
  }

  if(data.showAcademicSection) {
    previewHtml += '<section id="academic" class="template-classic-section">';
    previewHtml += '<h2 class="section-title">Education</h2>';
    const isAcademic2Visible = data.showAcademic2 && data.academic2 && data.academic2.qualification;
    if (data.showAcademic1 && data.academic1) previewHtml += academicEntryHtml(data.academic1, 1, !isAcademic2Visible);
    if (isAcademic2Visible && data.academic2) previewHtml += academicEntryHtml(data.academic2, 2, true);
    previewHtml += '</section>';
  }

  if(data.showProjectsSection) {
    previewHtml += '<section id="projects" class="template-classic-section">';
    previewHtml += '<h2 class="section-title">My Work</h2>';
    previewHtml += '<div class="template-classic-projects-grid">';
    if (data.showProject1 && data.project1) previewHtml += projectCardHtml(data.project1);
    if (data.showProject2 && data.project2) previewHtml += projectCardHtml(data.project2);
    previewHtml += '</div></section>';
  }

  if(data.showSkillsSection) {
    previewHtml += '<section id="skills" class="template-classic-section">';
    previewHtml += '<h2 class="section-title">Skills</h2>';
    if(data.aboutSkills) {
       const skillsListHtml = (escHtml(data.aboutSkills) || "").split(',').map(skill => skill.trim()).filter(skill => skill).map(skill => '<li>' + skill + '</li>').join('');
       if (skillsListHtml) {
         previewHtml += '<p>' + (escHtml(data.aboutSkills)).replace(/\n/g, '<br>').split(',').join(', ') + '</p>'; // Display as paragraph too
       } else {
         previewHtml += '<p>' + (escHtml(data.aboutSkills)).replace(/\n/g, '<br>') + '</p>';
       }
    }
    previewHtml += '</section>';
  }
  previewHtml += '</main>';

  if(data.showContactSection) {
    previewHtml += '<footer id="contact" class="template-classic-footer">';
    previewHtml += '<h2 class="section-title">Contact</h2>';
    if(data.contactEmail) previewHtml += '<p>Email: <a href="mailto:' + escAttr(data.contactEmail) + '">' + escHtml(data.contactEmail) + '</a></p>';
    previewHtml += '<div class="social-links">';
    if(data.contactLinkedin) previewHtml += '<a href="' + escAttr(data.contactLinkedin) + '" target="_blank" aria-label="LinkedIn" title="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>';
    if(data.contactGithub) previewHtml += '<a href="' + escAttr(data.contactGithub) + '" target="_blank" aria-label="GitHub" title="GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>';
    if(data.contactInstagram) previewHtml += '<a href="' + escAttr(data.contactInstagram) + '" target="_blank" aria-label="Instagram" title="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>';
    previewHtml += '</div>';
    if(data.showResumeLink && data.resumeUrl) previewHtml += '<p style="margin-top:1rem;"><a href="' + escAttr(data.resumeUrl) + '" target="_blank" class="template-classic-button template-classic-button-small">Download Resume</a></p>';
    previewHtml += '<p style="margin-top: 2rem;">&copy; ' + new Date().getFullYear() + ' ' + escHtml(data.yourName) + '. Classic Portfolio Design.</p>';
    previewHtml += '</footer>';
  }
  previewHtml += '</div></body></html>';
  return { fullTsx, previewHtml };
}
