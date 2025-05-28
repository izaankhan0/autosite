
// src/templates/minimalist.ts
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

export function getMinimalistTemplate(data: FormSchemaType): TemplateOutput {
  const siteNameClean = (data.yourName?.trim().replace(/\W+/g, '') || "PortfolioSite");
  const foregroundColor = getContrastColor(data.backgroundColor);
  const primaryColor = data.primaryColor; 
  const accentColor = data.accentColor;   

  const projectCardTsx = (project: NonNullable<FormSchemaType['project1']>) => {
    let imagePart = '';
    if (project.imageUrl) {
      imagePart = `<Image src={"${escJsStr(project.imageUrl)}"} alt={"${escJsStr(project.name)}"} width={400} height={225} className="rounded mb-4 w-full h-auto object-cover border border-border" data-ai-hint="website screenshot" />`;
    } else {
      imagePart = `<div className="w-full h-[225px] bg-muted rounded mb-4 flex items-center justify-center border border-border"><span className="text-muted-foreground text-sm">Preview for ${escJsStr(project.name)}</span></div>`;
    }
    
    return `
    <div className="border border-border p-6 rounded-lg group hover:shadow-md transition-shadow duration-300">
      ${imagePart}
      <h3 className="text-xl font-medium text-primary mb-1">${escJsStr(project.name)}</h3>
      <p className="text-foreground/80 text-sm mb-2" dangerouslySetInnerHTML={{ __html: "${escJsStr((project.description || "")).replace(/\\n/g, '<br />')}" }} />
      <p className="text-xs text-muted-foreground mb-3">Tech: ${escJsStr(project.technologies)}</p>
      <div className="flex gap-3 text-sm">
        ${project.liveUrl ? `<a href={"${escJsStr(project.liveUrl)}"} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline hover:text-accent transition-colors">
          Live Site <ExternalLink className="inline w-3 h-3 ml-1" />
        </a>` : ''}
        ${project.repoUrl ? `<a href={"${escJsStr(project.repoUrl)}"} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline hover:text-accent transition-colors">
          View Code <Github className="inline w-3 h-3 ml-1" />
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
      <div className="mb-4 pb-4 ${entryNumber === 1 && data.showAcademic2 && data.academic2?.qualification ? 'border-b border-dashed border-border/70' : ''}">
        ${academic.imageUrl ? `<Image src={"${escJsStr(academic.imageUrl)}"} alt={"${escJsStr(academic.qualification || 'Academic Achievement')}"} width={300} height={180} className="rounded-md mb-3 w-full max-w-xs h-auto object-cover border border-border" data-ai-hint="education document certificate" />` : ''}
        <h3 className="text-lg font-normal text-primary/90 mb-0.5">${escJsStr(academic.qualification)}</h3>
        <p className="text-md text-foreground/80 mb-0.5">${escJsStr(academic.institution)}</p>
        <p className="text-sm text-foreground/70 mb-1"><em>${escJsStr(academic.graduationYear)}</em></p>
        ${academic.grades ? `<p className="text-sm text-foreground/70 mb-2">Grades: ${escJsStr(academic.grades)}</p>` : ''}
        ${academic.description ? `<p className="text-foreground/80 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: "${escJsStr(academic.description).replace(/\\n/g, '<br />')}" }} />` : ''}
      </div>
    `;
  };
  const academic1TsxString = (data.showAcademic1 && data.academic1) ? academicEntryTsx(data.academic1, 1) : '';
  const academic2TsxString = (data.showAcademic2 && data.academic2) ? academicEntryTsx(data.academic2, 2) : '';


  const fullTsx = `
// Generated Page: ${escJsStr(data.yourName)}'s Portfolio - Minimalist Theme
import React from 'react';
import Image from 'next/image';
import { Mail, Linkedin, Github, Instagram, Download, ExternalLink, ArrowRight, User, BookOpen, Code } from 'lucide-react';
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
      <div className={"mb-4 pb-4 " + (!isLastVisibleAcademic ? "border-b border-dashed border-border/70" : "")}>
        {academic.imageUrl && (
          <Image 
            src={academic.imageUrl} 
            alt={academic.qualification || 'Academic Achievement'} 
            width={300} 
            height={180} 
            className="rounded-md mb-3 w-full max-w-xs h-auto object-cover border border-border"
            data-ai-hint="education document certificate"
          />
        )}
        <h3 className="text-lg font-normal text-primary/90 mb-0.5">{academic.qualification}</h3>
        {academic.institution && <p className="text-md text-foreground/80 mb-0.5">{academic.institution}</p>}
        {academic.graduationYear && <p className="text-sm text-foreground/70 mb-1"><em>{academic.graduationYear}</em></p>}
        {academic.grades && <p className="text-sm text-foreground/70 mb-2">Grades: {academic.grades}</p>}
        {academic.description && <p className="text-foreground/80 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: (academic.description).replace(/\\n/g, '<br />') }} />}
      </div>
    );
  };

  return (
    <div className="bg-background text-foreground font-sans min-h-screen flex flex-col items-center py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full">
        <header className="mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl font-semibold text-primary mb-1">{portfolioData.yourName}</h1>
          <h2 className="text-xl sm:text-2xl text-foreground/80 mb-3">{portfolioData.heroTitle}</h2>
          {portfolioData.heroTagline && <p className="text-base sm:text-lg text-foreground/70 mb-6" dangerouslySetInnerHTML={{ __html: (portfolioData.heroTagline).replace(/\\n/g, '<br />') }} />}
          {portfolioData.heroCtaText && (
            <a href="#projects" className="text-primary font-medium hover:text-accent transition-colors group inline-flex items-center">
              {portfolioData.heroCtaText} <ArrowRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </header>

        <nav className="mb-12 md:mb-16 pb-3 border-b border-border/50">
          {portfolioData.showAboutSection && <a href="#about" className="text-foreground/70 hover:text-primary transition-colors mr-6 text-sm font-medium">About</a>}
          {portfolioData.showAcademicSection && <a href="#academic" className="text-foreground/70 hover:text-primary transition-colors mr-6 text-sm font-medium">Education</a>}
          {portfolioData.showProjectsSection && <a href="#projects" className="text-foreground/70 hover:text-primary transition-colors mr-6 text-sm font-medium">Projects</a>}
          {portfolioData.showSkillsSection && <a href="#skills" className="text-foreground/70 hover:text-primary transition-colors mr-6 text-sm font-medium">Skills</a>}
          {portfolioData.showContactSection && <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors text-sm font-medium">Contact</a>}
        </nav>

        <main>
          {portfolioData.showAboutSection && (
            <section id="about" className="mb-12 md:mb-16 scroll-mt-24">
              <h2 className="text-2xl font-medium text-primary mb-4 pb-2 border-b border-border/50 flex items-center"><User className="w-5 h-5 mr-2" />About Me</h2>
              {portfolioData.aboutBio && <p className="text-foreground/80 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: (portfolioData.aboutBio).replace(/\\n/g, '<br />') }} />}
              {portfolioData.showFunFact && portfolioData.aboutFunFact && (
                <p className="text-sm text-foreground/60 italic">Fun fact: {portfolioData.aboutFunFact}</p>
              )}
            </section>
          )}

          {portfolioData.showAcademicSection && (
            <section id="academic" className="mb-12 md:mb-16 scroll-mt-24">
              <h2 className="text-2xl font-medium text-primary mb-4 pb-2 border-b border-border/50 flex items-center"><BookOpen className="w-5 h-5 mr-2" />Education</h2>
              {portfolioData.showAcademic1 && portfolioData.academic1 && renderAcademicEntry(portfolioData.academic1, 1)}
              {portfolioData.showAcademic2 && portfolioData.academic2 && renderAcademicEntry(portfolioData.academic2, 2)}
            </section>
          )}

          {portfolioData.showProjectsSection && (
            <section id="projects" className="mb-12 md:mb-16 scroll-mt-24">
              <h2 className="text-2xl font-medium text-primary mb-6 pb-2 border-b border-border/50">Selected Work</h2>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
                ${project1TsxString}
                ${project2TsxString}
              </div>
            </section>
          )}

          {portfolioData.showSkillsSection && (
            <section id="skills" className="mb-12 md:mb-16 scroll-mt-24">
              <h2 className="text-2xl font-medium text-primary mb-4 pb-2 border-b border-border/50 flex items-center"><Code className="w-5 h-5 mr-2" />Skills</h2>
              {portfolioData.aboutSkills && <p className="text-foreground/80 mb-4" dangerouslySetInnerHTML={{ __html: (portfolioData.aboutSkills).replace(/\\n/g, '<br />') }} />}
              {skillsArray.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {skillsArray.map((skill, index) => (
                    <li key={index} className="text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full border border-border">
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </main>

        {portfolioData.showContactSection && (
          <footer id="contact" className="mt-auto pt-8 border-t border-border/50 text-sm text-foreground/60 scroll-mt-24">
            <h2 className="text-2xl font-medium text-primary mb-4 pb-2 border-b border-border/50">Get in Touch</h2>
            {portfolioData.contactEmail && (
              <p className="text-foreground/80 mb-4">
                You can reach me via email at <a href={"mailto:" + portfolioData.contactEmail} className="text-primary hover:underline hover:text-accent">{portfolioData.contactEmail}</a>.
              </p>
            )}
            <div className="flex space-x-4 text-foreground/70 mb-4">
              {portfolioData.contactLinkedin && <a href={portfolioData.contactLinkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors"><Linkedin size={20} /></a>}
              {portfolioData.contactGithub && <a href={portfolioData.contactGithub} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary transition-colors"><Github size={20} /></a>}
              {portfolioData.contactInstagram && <a href={portfolioData.contactInstagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram size={20} /></a>}
            </div>
            {portfolioData.showResumeLink && portfolioData.resumeUrl && (
              <div className="mb-6">
                <a href={portfolioData.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-primary hover:underline hover:text-accent">
                  <Download className="w-4 h-4 mr-2" /> Download My Resume
                </a>
              </div>
            )}
            <p>&copy; {new Date().getFullYear()} {portfolioData.yourName}. Minimalist Portfolio Theme.</p>
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
    heroImagePlaceholder: "https://placehold.co/150x150.png?text=Error",
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
    theme: "minimalist",
    primaryColor: data.primaryColor || "#333333",
    backgroundColor: data.backgroundColor || "#FFFFFF",
    accentColor: data.accentColor || "#5A5A5A",
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
    let html = '<div class="template-minimalist-academic-entry" style="margin-bottom: 1rem; padding-bottom: 1rem; ' + (!isLastVisible ? 'border-bottom: 1px dashed ' + escCssVal(foregroundColor) + '55;' : '') + '">';
    if (academic.imageUrl) {
      html += `<img src="${escAttr(academic.imageUrl)}" alt="${escAttr(academic.qualification || 'Academic Achievement')}" data-ai-hint="education document certificate" style="border-radius: 4px; margin-bottom: 0.5rem; width: 100%; max-width: 200px; height: auto; object-fit: cover; border: 1px solid ${escCssVal(foregroundColor)}33;" />`;
    }
    html += `<h3 style="font-size:1.1em;color:${escCssVal(primaryColor)};margin-top:0;margin-bottom:0.1rem;">${escHtml(academic.qualification)}</h3>`;
    if (academic.institution) html += `<p style="font-size:1em;color:${escCssVal(foregroundColor)}CC;margin-bottom:0.1rem;">${escHtml(academic.institution)}</p>`;
    if (academic.graduationYear) html += `<p style="font-size:0.85em;color:${escCssVal(foregroundColor)}AA;margin-bottom:0.2rem;"><em>${escHtml(academic.graduationYear)}</em></p>`;
    if (academic.grades) html += `<p style="font-size:0.85em;color:${escCssVal(foregroundColor)}AA;margin-bottom:0.3rem;">Grades: ${escHtml(academic.grades)}</p>`;
    if (academic.description) html += `<p style="font-size:0.9em;color:${escCssVal(foregroundColor)}CC;line-height:1.6;">${(escHtml(academic.description)).replace(/\n/g, '<br>')}</p>`;
    html += '</div>';
    return html;
  };

  const projectCardHtml = (project: NonNullable<FormSchemaType['project1']>) => {
    let imageHtml = '';
    if (project.imageUrl) {
      imageHtml = '<img src="' + escAttr(project.imageUrl) + '" alt="' + escAttr(project.name) + '" data-ai-hint="website screenshot" style="width:100%;max-width:300px;height:auto;margin-bottom:0.5rem; border: 1px solid ' + escCssVal(foregroundColor) + '33; border-radius: 4px;"/>';
    } else {
      imageHtml = '<div style="width:100%;max-width:300px;height:200px;background-color:' + escCssVal(foregroundColor) + '1A;display:flex;align-items:center;justify-content:center;margin-bottom:0.5rem;border: 1px solid ' + escCssVal(foregroundColor) + '33; border-radius: 4px;">' +
                    '<span style="font-size:0.9em; color:' + escCssVal(foregroundColor) + 'AA;">Preview for ' + escHtml(project.name) + '</span>' +
                    '</div>';
    }
    
    let cardString = '';
    cardString += '<div class="template-minimalist-project-item" style="border: 1px solid ' + escCssVal(foregroundColor) + '33; padding: 1rem; border-radius: 6px;">';
    cardString += imageHtml;
    cardString += '<h3 style="font-size:1.3em;color:' + escCssVal(primaryColor) + ';margin-top:0;margin-bottom:0.3rem;">' + escHtml(project.name) + '</h3>';
    cardString += '<p style="font-size:0.9em;margin-bottom:0.3rem; color: ' + escCssVal(foregroundColor) + 'CC;">' + (escHtml(project.description || "")).replace(/\n/g, '<br>') + '</p>';
    cardString += '<p style="font-size:0.8em;margin-bottom:0.7rem;color:' + escCssVal(foregroundColor) + 'AA;">Tech: ' + escHtml(project.technologies) + '</p>';
    cardString += '<div class="template-minimalist-project-links" style="font-size:0.9em;">';
    if (project.liveUrl) {
      cardString += '<a href="' + escAttr(project.liveUrl) + '" target="_blank" style="color:' + escCssVal(primaryColor) + ';margin-right:0.75rem;text-decoration:none;border-bottom: 1px solid transparent;">Live Site <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-left: 2px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>';
    }
    if (project.repoUrl) {
      cardString += (project.liveUrl ? ' &bull; ' : '') + '<a href="' + escAttr(project.repoUrl) + '" target="_blank" style="color:' + escCssVal(primaryColor) + ';text-decoration:none;border-bottom: 1px solid transparent;">View Code <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-left: 2px;"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>';
    }
    cardString += '</div>'; 
    cardString += '</div>'; 
    return cardString;
  };

  let inlineStyles = '';
  inlineStyles += ".template-minimalist-body {" +
  "  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\";" +
  "  background-color: " + escCssVal(data.backgroundColor) + ";" +
  "  color: " + escCssVal(foregroundColor) + ";" +
  "  margin: 0;" +
  "  padding: clamp(2rem, 8vw, 4rem);" +
  "  line-height: 1.65;" +
  "  min-height: 100vh;" +
  "  display: flex;" +
  "  flex-direction: column;" +
  "  align-items: center;" +
  "}" +
  ".template-minimalist-container {" +
  "  max-width: 700px;" +
  "  width: 100%;" +
  "}" +
  ".template-minimalist-header {" +
  "  text-align: left;" +
  "  margin-bottom: 3rem;" +
  "}" +
  ".template-minimalist-header h1 { margin: 0 0 0.25rem; font-size: clamp(2em, 5vw, 2.8em); font-weight: 600; color: " + escCssVal(primaryColor) + ";}" +
  ".template-minimalist-header h2 { margin: 0 0 0.5rem; font-size: clamp(1.2em, 3vw, 1.5em); font-weight: 400; color: " + escCssVal(foregroundColor) + "CC;}" +
  ".template-minimalist-header p { margin: 0 0 1rem; font-size: clamp(1em, 2.5vw, 1.1em); color: " + escCssVal(foregroundColor) + "B3;}" +
  ".template-minimalist-cta {" +
  "  display: inline-block;" +
  "  color: " + escCssVal(primaryColor) + ";" +
  "  padding: 0.5rem 0;" +
  "  text-decoration: none;" +
  "  font-weight: 500;" +
  "}" +
  ".template-minimalist-cta:hover { color: " + escCssVal(accentColor) + "; }" +
  ".template-minimalist-nav {" +
  "  margin-bottom: 3rem;" +
  "  padding-bottom: 0.75rem;" +
  "  border-bottom: 1px solid " + escCssVal(foregroundColor) + "33;" +
  "}" +
  ".template-minimalist-nav a {" +
  "  color: " + escCssVal(foregroundColor) + "B3;" +
  "  text-decoration: none;" +
  "  margin-right: 1.5rem;" +
  "  font-size: 0.95em;" +
  "  font-weight:500;" +
  "}" +
  ".template-minimalist-nav a:hover { color: " + escCssVal(primaryColor) + "; }" +
  ".template-minimalist-section { margin-bottom: 2.5rem; }" +
  ".template-minimalist-section h2.section-title {" +
  "  font-size: clamp(1.4em, 4vw, 1.8em);" +
  "  font-weight: 500;" +
  "  color: " + escCssVal(primaryColor) + ";" +
  "  margin-top: 0;" +
  "  margin-bottom: 1rem;" +
  "  padding-bottom: 0.3rem;" +
  "  border-bottom: 1px solid " + escCssVal(foregroundColor) + "33;" +
  "}" +
  ".template-minimalist-section p, .template-minimalist-section ul { font-size: clamp(0.9em, 2.2vw, 1em); color: " + escCssVal(foregroundColor) + "CC; }" +
  ".template-minimalist-skills-list {" +
  "  list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 0.5rem 1rem;" +
  "}" +
  ".template-minimalist-skills-list li {" +
  "  font-size: 0.9em;" +
  "  padding: 0.2rem 0.5rem;" +
  "  border: 1px solid " + escCssVal(foregroundColor) + "4D;" +
  "  border-radius: 3px;" +
  "  background-color: " + escCssVal(foregroundColor) + "0D;" +
  "}" +
  ".template-minimalist-projects-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }" +
  "@media (min-width: 600px) { .template-minimalist-projects-grid { grid-template-columns: repeat(2, 1fr); } }" +
  ".template-minimalist-project-links a:hover { color:" + escCssVal(accentColor) + "; border-bottom-color: " + escCssVal(accentColor) + ";}" +
  ".template-minimalist-footer {" +
  "  text-align: left;" +
  "  margin-top: auto;" + 
  "  padding-top: 1.5rem;" +
  "  font-size: 0.85em;" +
  "  width: 100%;" +
  "  color: " + escCssVal(foregroundColor) + "99;" +
  "}" +
  ".template-minimalist-footer p { margin: 0.2rem 0; }" +
  ".template-minimalist-footer a { color: " + escCssVal(foregroundColor) + "B3; text-decoration: none; margin-right: 0.5rem;}" +
  ".template-minimalist-footer a:hover { color: " + escCssVal(primaryColor) + "; }" +
  ".template-minimalist-footer .social-links { display: flex; gap: 0.75rem; margin-top: 0.5rem; margin-bottom: 0.5rem; align-items: center; }" +
  ".template-minimalist-footer .social-links a { color: " + escCssVal(foregroundColor) + "B3; text-decoration:none; display:inline-block; }" + 
  ".template-minimalist-footer .social-links a:hover { color: " + escCssVal(primaryColor) + "; }" +
  ".template-minimalist-resume-link { display: inline-flex; align-items: center; color: " + escCssVal(primaryColor) + "; text-decoration: none; font-size: 0.95em;}" +
  ".template-minimalist-resume-link:hover { color: " + escCssVal(accentColor) + "; }" +
  ".template-minimalist-resume-link svg { margin-right: 0.3rem; }";

  let previewHtmlString = '';
  previewHtmlString += '<html>';
  previewHtmlString += '<head>';
  previewHtmlString += '<title>' + escHtml(data.yourName) + ' - Portfolio (Minimalist)</title>';
  previewHtmlString += '<style>';
  previewHtmlString += "body, h1, h2, h3, p, ul, li, a, div, section, header, footer, nav, main, img { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth;}";
  previewHtmlString += inlineStyles;
  previewHtmlString += '</style>';
  previewHtmlString += '</head>';
  previewHtmlString += '<body class="template-minimalist-body">';
  previewHtmlString += '<div class="template-minimalist-container">';
  previewHtmlString += '<header class="template-minimalist-header">';
  previewHtmlString += '<h1>' + escHtml(data.yourName) + '</h1>';
  previewHtmlString += '<h2>' + escHtml(data.heroTitle) + '</h2>';
  if (data.heroTagline) previewHtmlString += '<p>' + (escHtml(data.heroTagline)).replace(/\n/g, '<br>') + '</p>';
  if (data.heroCtaText) {
    previewHtmlString += '<a href="#projects" class="template-minimalist-cta">' + escHtml(data.heroCtaText) + ' &rarr;</a>';
  }
  previewHtmlString += '</header>';

  previewHtmlString += '<nav class="template-minimalist-nav">';
  if (data.showAboutSection) previewHtmlString += '<a href="#about">About</a>';
  if (data.showAcademicSection) previewHtmlString += '<a href="#academic">Education</a>';
  if (data.showProjectsSection) previewHtmlString += '<a href="#projects">Projects</a>';
  if (data.showSkillsSection) previewHtmlString += '<a href="#skills">Skills</a>';
  if (data.showContactSection) previewHtmlString += '<a href="#contact">Contact</a>';
  previewHtmlString += '</nav>';

  previewHtmlString += '<main>';
  if (data.showAboutSection) {
    previewHtmlString += '<section id="about" class="template-minimalist-section">';
    previewHtmlString += '<h2 class="section-title">About Me</h2>';
    if (data.aboutBio) previewHtmlString += '<p>' + (escHtml(data.aboutBio)).replace(/\n/g, '<br>') + '</p>';
    if (data.showFunFact && data.aboutFunFact) {
      previewHtmlString += '<p style="margin-top:0.8rem;font-size:0.9em;color:' + escCssVal(foregroundColor) + '99;"><em>' + (escHtml(data.aboutFunFact)).replace(/\n/g, '<br>') + '</em></p>';
    }
    previewHtmlString += '</section>';
  }

  if (data.showAcademicSection) {
    previewHtmlString += '<section id="academic" class="template-minimalist-section">';
    previewHtmlString += '<h2 class="section-title">Education</h2>';
    const isAcademic2Visible = data.showAcademic2 && data.academic2 && data.academic2.qualification;
    if (data.showAcademic1 && data.academic1) previewHtmlString += academicEntryHtml(data.academic1, 1, !isAcademic2Visible);
    if (isAcademic2Visible && data.academic2) previewHtmlString += academicEntryHtml(data.academic2, 2, true);
    previewHtmlString += '</section>';
  }

  if (data.showProjectsSection) {
    previewHtmlString += '<section id="projects" class="template-minimalist-section">';
    previewHtmlString += '<h2 class="section-title">Selected Work</h2>';
    previewHtmlString += '<div class="template-minimalist-projects-grid">';
    if (data.showProject1 && data.project1) previewHtmlString += projectCardHtml(data.project1);
    if (data.showProject2 && data.project2) previewHtmlString += projectCardHtml(data.project2);
    previewHtmlString += '</div>';
    previewHtmlString += '</section>';
  }

  if (data.showSkillsSection) {
    previewHtmlString += '<section id="skills" class="template-minimalist-section">';
    previewHtmlString += '<h2 class="section-title">Skills</h2>';
    if (data.aboutSkills) previewHtmlString += '<p>' + (escHtml(data.aboutSkills)).replace(/\n/g, '<br>') + '</p>';
    const skillsArray = (data.aboutSkills || "").split(',').map(skill => skill.trim()).filter(skill => skill);
    if(skillsArray.length > 0) {
      previewHtmlString += '<ul class="template-minimalist-skills-list" style="margin-top:0.75rem;">';
      previewHtmlString += skillsArray.map(skill => '<li>' + escHtml(skill) + '</li>').join('');
      previewHtmlString += '</ul>';
    }
    previewHtmlString += '</section>';
  }
  previewHtmlString += '</main>';

  if (data.showContactSection) {
    previewHtmlString += '<footer id="contact" class="template-minimalist-footer">';
    previewHtmlString += '<h2 class="section-title" style="font-size:clamp(1.2em, 3.5vw, 1.6em); margin-bottom:0.8rem;">Get in Touch</h2>';
    if (data.contactEmail) {
      previewHtmlString += '<p style="color: ' + escCssVal(foregroundColor) + 'CC;">Email: <a href="mailto:' + escAttr(data.contactEmail) + '" style="color:' + escCssVal(primaryColor) + ';text-decoration:none;">' + escHtml(data.contactEmail) + '</a></p>';
    }
    previewHtmlString += '<div class="template-minimalist-social-links">';
    if (data.contactLinkedin) previewHtmlString += '<a href="' + escAttr(data.contactLinkedin) + '" target="_blank" aria-label="LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>';
    if (data.contactGithub) previewHtmlString += '<a href="' + escAttr(data.contactGithub) + '" target="_blank" aria-label="GitHub" title="GitHub"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>';
    if (data.contactInstagram) previewHtmlString += '<a href="' + escAttr(data.contactInstagram) + '" target="_blank" aria-label="Instagram" title="Instagram"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>';
    previewHtmlString += '</div>';
    if (data.showResumeLink && data.resumeUrl) {
      previewHtmlString += '<p><a href="' + escAttr(data.resumeUrl) + '" target="_blank" class="template-minimalist-resume-link"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Download Resume</a></p>';
    }
    previewHtmlString += '<p style="margin-top:1.5rem;">&copy; ' + new Date().getFullYear() + ' ' + escHtml(data.yourName) + '. Minimalist Portfolio Theme.</p>';
    previewHtmlString += '</footer>';
  }
  previewHtmlString += '</div>'; 
  previewHtmlString += '</body>';
  previewHtmlString += '</html>';

  return { fullTsx, previewHtml: previewHtmlString };
}
