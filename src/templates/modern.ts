
// src/templates/modern.ts
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


export function getModernTemplate(data: FormSchemaType): TemplateOutput {
  const siteNameClean = (data.yourName?.trim().replace(/\W+/g, '') || "PortfolioSite");
  const primaryContrast = getContrastColor(data.primaryColor);
  const accentContrast = getContrastColor(data.accentColor);
  const foregroundColor = getContrastColor(data.backgroundColor);

  const projectCardTsx = (project: NonNullable<FormSchemaType['project1']>) => {
    let imagePart = '';
    if (project.imageUrl) {
        imagePart = `<Image src={"${escJsStr(project.imageUrl)}"} alt={"${escJsStr(project.name)}"} width={400} height={300} className="rounded-md mb-4 w-full h-auto object-cover" data-ai-hint="website screenshot" />`;
    } else {
        imagePart = `<div className="w-full h-[225px] bg-muted rounded-md mb-4 flex items-center justify-center border border-border"><span className="text-muted-foreground text-sm">Preview for ${escJsStr(project.name)}</span></div>`;
    }
    
    return `
    <div className="bg-card p-6 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow duration-300">
      ${imagePart}
      <h3 className="text-2xl font-semibold text-primary mb-2">${escJsStr(project.name)}</h3>
      <p className="text-card-foreground mb-3 text-sm" dangerouslySetInnerHTML={{ __html: "${escJsStr((project.description || "")).replace(/\\n/g, '<br />')}" }} />
      <p className="text-muted-foreground text-xs mb-4"><strong>Technologies:</strong> ${escJsStr(project.technologies)}</p>
      <div className="flex gap-3">
        ${project.liveUrl ? `<a href={"${escJsStr(project.liveUrl)}"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
          <ExternalLink className="w-4 h-4 mr-2" /> Live Site
        </a>` : ''}
        ${project.repoUrl ? `<a href={"${escJsStr(project.repoUrl)}"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
          <Github className="w-4 h-4 mr-2" /> View Code
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
      <div className="mb-6 pb-6 ${entryNumber === 1 && data.showAcademic2 && data.academic2?.qualification ? 'border-b border-dashed border-border' : ''}">
        ${academic.imageUrl ? `<Image src={"${escJsStr(academic.imageUrl)}"} alt={"${escJsStr(academic.qualification || 'Academic Achievement')}"} width={500} height={300} className="rounded-md mb-4 w-full h-auto object-cover mx-auto max-w-md border" data-ai-hint="education university campus" />` : ''}
        <h3 className="text-xl font-semibold text-primary/90 mb-1">${escJsStr(academic.qualification)}</h3>
        <p className="text-lg text-muted-foreground mb-1">${escJsStr(academic.institution)}</p>
        <p className="text-md text-muted-foreground mb-2"><em>${escJsStr(academic.graduationYear)}</em></p>
        ${academic.grades ? `<p className="text-md text-muted-foreground mb-3">Grades: ${escJsStr(academic.grades)}</p>` : ''}
        ${academic.description ? `<p className="text-md leading-relaxed text-card-foreground/90" dangerouslySetInnerHTML={{ __html: "${escJsStr(academic.description).replace(/\\n/g, '<br />')}" }} />` : ''}
      </div>
    `;
  };
  const academic1TsxString = (data.showAcademic1 && data.academic1) ? academicEntryTsx(data.academic1, 1) : '';
  const academic2TsxString = (data.showAcademic2 && data.academic2) ? academicEntryTsx(data.academic2, 2) : '';


  const fullTsx = `
// Generated Page: ${escJsStr(data.yourName)}'s Portfolio - Modern Theme
import React from 'react';
import Image from 'next/image';
import { Mail, Linkedin, Github, Instagram, Download, ExternalLink, UserCircle, Sparkles, LayoutGrid, BookOpen } from 'lucide-react';
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
      <div className={"mb-6 pb-6 " + (!isLastVisibleAcademic ? "border-b border-dashed border-border" : "")}>
        {academic.imageUrl && (
          <Image 
            src={academic.imageUrl} 
            alt={academic.qualification || 'Academic Achievement'} 
            width={500} 
            height={300} 
            className="rounded-md mb-4 w-full h-auto object-cover mx-auto max-w-md border"
            data-ai-hint="education university campus"
          />
        )}
        <h3 className="text-xl font-semibold text-primary/90 mb-1">{academic.qualification}</h3>
        {academic.institution && <p className="text-lg text-muted-foreground mb-1">{academic.institution}</p>}
        {academic.graduationYear && <p className="text-md text-muted-foreground mb-2"><em>{academic.graduationYear}</em></p>}
        {academic.grades && <p className="text-md text-muted-foreground mb-3">Grades: {academic.grades}</p>}
        {academic.description && <p className="text-md leading-relaxed text-card-foreground/90" dangerouslySetInnerHTML={{ __html: (academic.description).replace(/\\n/g, '<br />') }} />}
      </div>
    );
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <header className="bg-primary text-primary-foreground py-16 px-6 text-center">
        <Image 
          src={portfolioData.heroImagePlaceholder || "https://placehold.co/150x150.png"} 
          alt={portfolioData.yourName || 'Portfolio Owner'} 
          width={150} 
          height={150} 
          className="rounded-full mx-auto mb-6 border-4 border-accent object-cover"
          data-ai-hint="portrait professional" 
          priority
        />
        <h1 className="text-5xl font-bold mb-2">{portfolioData.yourName}</h1>
        <h2 className="text-2xl font-light mb-4 opacity-90">{portfolioData.heroTitle}</h2>
        {portfolioData.heroTagline && <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90" dangerouslySetInnerHTML={{ __html: (portfolioData.heroTagline).replace(/\\n/g, '<br />') }} />}
        {portfolioData.heroCtaText && (
          <a href="#contact" className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
            {portfolioData.heroCtaText}
          </a>
        )}
      </header>

      {/* Navigation (Optional sticky) */}
      <nav className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3 flex justify-center space-x-6">
          {portfolioData.showAboutSection && <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>}
          {portfolioData.showAcademicSection && <a href="#academic" className="text-foreground hover:text-primary transition-colors">Education</a>}
          {portfolioData.showProjectsSection && <a href="#projects" className="text-foreground hover:text-primary transition-colors">Projects</a>}
          {portfolioData.showSkillsSection && <a href="#skills" className="text-foreground hover:text-primary transition-colors">Skills</a>}
          {portfolioData.showContactSection && <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>}
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        {portfolioData.showAboutSection && (
          <section id="about" className="mb-16 scroll-mt-20">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-semibold text-primary inline-flex items-center">
                <UserCircle className="w-10 h-10 mr-3" /> About Me
              </h2>
            </div>
            <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border">
              {portfolioData.aboutBio && <p className="text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: (portfolioData.aboutBio).replace(/\\n/g, '<br />') }} />}
              {portfolioData.showFunFact && portfolioData.aboutFunFact && (
                <p className="text-md italic text-muted-foreground border-l-4 border-accent pl-4 py-2 bg-accent/10 rounded-r-md">
                  <Sparkles className="inline w-5 h-5 mr-2 text-accent" /> Fun Fact: {portfolioData.aboutFunFact}
                </p>
              )}
            </div>
          </section>
        )}

        {portfolioData.showAcademicSection && (
          <section id="academic" className="mb-16 scroll-mt-20">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-semibold text-primary inline-flex items-center">
                <BookOpen className="w-10 h-10 mr-3" /> Academic Background
              </h2>
            </div>
            <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border">
              {portfolioData.showAcademic1 && portfolioData.academic1 && renderAcademicEntry(portfolioData.academic1, 1)}
              {portfolioData.showAcademic2 && portfolioData.academic2 && renderAcademicEntry(portfolioData.academic2, 2)}
            </div>
          </section>
        )}

        {portfolioData.showProjectsSection && (
          <section id="projects" className="mb-16 scroll-mt-20">
            <div className="text-center mb-10">
               <h2 className="text-4xl font-semibold text-primary inline-flex items-center">
                <LayoutGrid className="w-10 h-10 mr-3" /> My Work
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              ${project1TsxString}
              ${project2TsxString}
            </div>
          </section>
        )}

        {portfolioData.showSkillsSection && (
          <section id="skills" className="mb-16 scroll-mt-20">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-semibold text-primary inline-flex items-center">
                <Sparkles className="w-10 h-10 mr-3" /> Skills &amp; Technologies
              </h2>
            </div>
            <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border">
              {portfolioData.aboutSkills && <p className="text-lg mb-6 text-center" dangerouslySetInnerHTML={{ __html: (portfolioData.aboutSkills).replace(/\\n/g, '<br />') }} />}
              {skillsArray.length > 0 && (
                <ul className="flex flex-wrap justify-center gap-3">
                  {skillsArray.map((skill, index) => (
                    <li key={index} className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
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
        <footer id="contact" className="bg-muted text-muted-foreground py-10 text-center scroll-mt-20 border-t border-border">
          <div className="container mx-auto px-6">
             <div className="text-center mb-10">
              <h2 className="text-4xl font-semibold text-primary inline-flex items-center">
                <Mail className="w-10 h-10 mr-3" /> Get In Touch
              </h2>
            </div>
            <div className="bg-card text-card-foreground p-8 rounded-xl shadow-lg border border-border text-center max-w-2xl mx-auto">
              <p className="text-lg mb-6">I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>
              {portfolioData.contactEmail && (
                <a href={'mailto:' + portfolioData.contactEmail} className="inline-block px-8 py-3 text-lg font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors mb-8">
                  Say Hello
                </a>
              )}
              <div className="flex justify-center space-x-6">
                {portfolioData.contactLinkedin && (
                  <a href={portfolioData.contactLinkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin size={28} />
                  </a>
                )}
                {portfolioData.contactGithub && (
                  <a href={portfolioData.contactGithub} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github size={28} />
                  </a>
                )}
                {portfolioData.contactInstagram && (
                  <a href={portfolioData.contactInstagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                    <Instagram size={28} />
                  </a>
                )}
              </div>
               {portfolioData.showResumeLink && portfolioData.resumeUrl && (
                <div className="mt-8">
                  <a href={portfolioData.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 text-md font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
                    <Download className="w-5 h-5 mr-2" /> Download Resume
                  </a>
                </div>
              )}
            </div>
            <p className="text-sm mt-10">&copy; {new Date().getFullYear()} {portfolioData.yourName}. All rights reserved.</p>
            <p className="text-xs mt-1">Modern Portfolio Template</p>
          </div>
        </footer>
      )}
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
    theme: "modern",
    primaryColor: data.primaryColor || "#3B82F6",
    backgroundColor: data.backgroundColor || "#F9FAFB",
    accentColor: data.accentColor || "#10B981",
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
    let html = '<div class="template-modern-academic-entry" style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; ' + (!isLastVisible ? 'border-bottom: 1px dashed ' + escCssVal(foregroundColor) + '33;' : '') + '">';
    if (academic.imageUrl) {
      html += `<img src="${escAttr(academic.imageUrl)}" alt="${escAttr(academic.qualification || 'Academic Achievement')}" data-ai-hint="education university campus" style="border-radius: 6px; margin-bottom: 1rem; width: 100%; max-width: 400px; height: auto; object-fit: cover; border: 1px solid ${escCssVal(data.primaryColor)}33; display:block; margin-left:auto; margin-right:auto;" />`;
    }
    html += `<h3 style="font-size: 1.25em; font-weight:600; color:${escCssVal(data.primaryColor)}; margin-bottom:0.1rem;">${escHtml(academic.qualification)}</h3>`;
    if (academic.institution) html += `<p style="font-size: 1.05em; color:${escCssVal(foregroundColor)}BB; margin-bottom:0.1rem;">${escHtml(academic.institution)}</p>`;
    if (academic.graduationYear) html += `<p style="font-size: 0.95em; color:${escCssVal(foregroundColor)}AA; margin-bottom:0.3rem;"><em>${escHtml(academic.graduationYear)}</em></p>`;
    if (academic.grades) html += `<p style="font-size: 0.95em; color:${escCssVal(foregroundColor)}AA; margin-bottom:0.5rem;">Grades: ${escHtml(academic.grades)}</p>`;
    if (academic.description) html += `<p style="font-size: 1em; color:${escCssVal(foregroundColor)}CC; line-height: 1.6;">${(escHtml(academic.description)).replace(/\n/g, '<br>')}</p>`;
    html += '</div>';
    return html;
  };

  const projectCardHtml = (project: NonNullable<FormSchemaType['project1']>) => {
    let imageHtml = '';
    if (project.imageUrl) {
      imageHtml = `<img src="${escAttr(project.imageUrl)}" alt="${escAttr(project.name)}" data-ai-hint="website screenshot" style="border-radius: 6px; margin-bottom: 1rem; width: 100%; height: auto; object-fit: cover; border: 1px solid ${escCssVal(data.primaryColor)}33;" />`;
    } else {
      imageHtml = `<div style="width: 100%; height: 225px; background-color: ${escCssVal(data.accentColor)}1A; border-radius: 6px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; border: 1px solid ${escCssVal(data.primaryColor)}33;"><span style="color: ${escCssVal(foregroundColor)}AA; font-size: 0.9em;">Preview for ${escHtml(project.name)}</span></div>`;
    }
  
    let cardString = '';
    cardString += `<div style="background-color: ${escCssVal(data.backgroundColor)}; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px ${escCssVal(foregroundColor)}1A; border: 1px solid ${escCssVal(foregroundColor)}22;">`;
    cardString += imageHtml;
    cardString += `<h3 style="font-size: 1.5em; font-weight: 600; color: ${escCssVal(data.primaryColor)}; margin-bottom: 0.5rem;">${escHtml(project.name)}</h3>`;
    cardString += `<p style="color: ${escCssVal(foregroundColor)}CC; margin-bottom: 0.75rem; font-size: 0.9em; line-height: 1.6;">${(escHtml(project.description || "")).replace(/\n/g, '<br>')}</p>`;
    cardString += `<p style="color: ${escCssVal(foregroundColor)}AA; font-size: 0.8em; margin-bottom: 1rem;"><strong>Technologies:</strong> ${escHtml(project.technologies)}</p>`;
    cardString += '<div style="display: flex; gap: 0.75rem;">';
    if (project.liveUrl) {
      cardString += `<a href="${escAttr(project.liveUrl)}" target="_blank" style="display: inline-flex; align-items: center; justify-content: center; padding: 0.5rem 1rem; font-size: 0.875em; font-weight: 500; border-radius: 6px; background-color: ${escCssVal(data.primaryColor)}; color: ${escCssVal(primaryContrast)}; text-decoration: none;">Live Site</a>`;
    }
    if (project.repoUrl) {
      cardString += `<a href="${escAttr(project.repoUrl)}" target="_blank" style="display: inline-flex; align-items: center; justify-content: center; padding: 0.5rem 1rem; font-size: 0.875em; font-weight: 500; border-radius: 6px; border: 1px solid ${escCssVal(data.primaryColor)}77; color: ${escCssVal(data.primaryColor)}; background-color: ${escCssVal(data.backgroundColor)}; text-decoration: none;">View Code</a>`;
    }
    cardString += '</div>'; // Close links div
    cardString += '</div>'; // Close card div
    return cardString;
  };
  
  let inlineStyles = '';
  inlineStyles += " body, h1, h2, h3, p, ul, li, a, div, section, header, footer, nav, main, img { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }";
  inlineStyles += " .template-modern-body {";
  inlineStyles += `   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;`;
  inlineStyles += `   background-color: ${escCssVal(data.backgroundColor)};`;
  inlineStyles += `   color: ${escCssVal(foregroundColor)};`;
  inlineStyles += "   line-height: 1.6;";
  inlineStyles += "   min-height: 100vh;";
  inlineStyles += " }";
  inlineStyles += " .template-modern-container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }";
  inlineStyles += " .template-modern-hero {";
  inlineStyles += `   background-color: ${escCssVal(data.primaryColor)};`;
  inlineStyles += `   color: ${escCssVal(primaryContrast)};`;
  inlineStyles += "   padding: 4rem 1.5rem; text-align: center;";
  inlineStyles += " }";
  inlineStyles += " .template-modern-hero img {";
  inlineStyles += "   width: 150px; height: 150px; border-radius: 50%; margin: 0 auto 1.5rem auto;";
  inlineStyles += `   border: 4px solid ${escCssVal(data.accentColor)}; object-fit: cover; box-shadow: 0 0 15px ${escCssVal(data.accentColor)}55;`;
  inlineStyles += " }";
  inlineStyles += " .template-modern-hero h1 { font-size: 3em; font-weight: 700; margin-bottom: 0.5rem; }";
  inlineStyles += " .template-modern-hero h2 { font-size: 1.5em; font-weight: 300; margin-bottom: 1rem; opacity: 0.9; }";
  inlineStyles += " .template-modern-hero p { font-size: 1.1em; max-width: 650px; margin: 0 auto 2rem auto; opacity: 0.9; }";
  inlineStyles += " .template-modern-hero-cta {";
  inlineStyles += "   display: inline-flex; align-items: center; justify-content: center; padding: 0.75rem 2rem;";
  inlineStyles += "   font-size: 1.1em; font-weight: 500; border-radius: 6px;";
  inlineStyles += `   background-color: ${escCssVal(data.accentColor)}; color: ${escCssVal(accentContrast)}; text-decoration: none;`;
  inlineStyles += " }";
  
  inlineStyles += " .template-modern-nav {";
  inlineStyles += `   background-color: ${escCssVal(data.backgroundColor)}; border-bottom: 1px solid ${escCssVal(foregroundColor)}22;`;
  inlineStyles += "   box-shadow: 0 1px 3px rgba(0,0,0,0.05); position: sticky; top: 0; z-index: 50;";
  inlineStyles += " }";
  inlineStyles += " .template-modern-nav-container { display: flex; justify-content: center; align-items: center; gap: 1.5rem; padding: 0.75rem 1.5rem; }";
  inlineStyles += " .template-modern-nav a {";
  inlineStyles += `   color: ${escCssVal(foregroundColor)}; text-decoration: none; font-weight: 500; font-size: 0.95em;`;
  inlineStyles += " }";
  inlineStyles += " .template-modern-nav a:hover { color: " + escCssVal(data.primaryColor) + "; }";
  
  inlineStyles += " .template-modern-main { padding: 3rem 0; }"; 
  inlineStyles += " .template-modern-section { margin-bottom: 4rem; }";
  inlineStyles += " .template-modern-section-title-container { text-align: center; margin-bottom: 2.5rem; }";
  inlineStyles += " .template-modern-section-title {";
  inlineStyles += "   font-size: 2.5em; font-weight: 600;";
  inlineStyles += `   color: ${escCssVal(data.primaryColor)}; display: inline-flex; align-items: center;`; 
  inlineStyles += " }";
  inlineStyles += " .template-modern-section-title svg { width: 2.5rem; height: 2.5rem; margin-right: 0.75rem;}";
  inlineStyles += " .template-modern-section-content-card {";
  inlineStyles += `   background-color: ${escCssVal(data.backgroundColor)}; padding: 2rem; border-radius: 12px;`;
  inlineStyles += `   box-shadow: 0 5px 15px ${escCssVal(foregroundColor)}1A; border: 1px solid ${escCssVal(foregroundColor)}22;`;
  inlineStyles += " }";
  inlineStyles += " .template-modern-skills-list { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; list-style: none; padding: 0; }";
  inlineStyles += " .template-modern-skills-list li {";
  inlineStyles += `   background-color: ${escCssVal(data.accentColor)}; color: ${escCssVal(accentContrast)};`;
  inlineStyles += "   padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9em; font-weight: 500;";
  inlineStyles += " }";
  inlineStyles += " .template-modern-projects-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }";
  inlineStyles += " @media (min-width: 768px) { .template-modern-projects-grid { grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); } }";
  
  inlineStyles += " .template-modern-footer {";
  inlineStyles += `   background-color: ${escCssVal(foregroundColor)}11; color: ${escCssVal(foregroundColor)}AA;`;
  inlineStyles += "   padding: 2.5rem 1.5rem; text-align: center;";
  inlineStyles += " }";
  inlineStyles += " .template-modern-footer-contact-card {";
  inlineStyles += `   background-color: ${escCssVal(data.backgroundColor)}; color: ${escCssVal(foregroundColor)};`;
  inlineStyles += `   padding: 2rem; border-radius: 12px; border: 1px solid ${escCssVal(foregroundColor)}22;`;
  inlineStyles += `   box-shadow: 0 5px 15px ${escCssVal(foregroundColor)}0D; max-width: 650px; margin: 0 auto 2rem auto;`;
  inlineStyles += " }";
  inlineStyles += " .template-modern-footer p { font-size: 1em; margin-bottom: 1rem; }";
  inlineStyles += " .template-modern-footer-email-button {";
  inlineStyles += "   display: inline-block; padding: 0.75rem 2rem; font-size: 1.1em; font-weight: 500; border-radius: 6px;";
  inlineStyles += `   background-color: ${escCssVal(data.primaryColor)}; color: ${escCssVal(primaryContrast)}; text-decoration: none; margin-bottom: 2rem;`;
  inlineStyles += " }";
  inlineStyles += " .template-modern-social-links { display: flex; justify-content: center; gap: 1.5rem; margin-bottom: 1.5rem; }";
  inlineStyles += " .template-modern-social-links a {";
  inlineStyles += `   color: ${escCssVal(foregroundColor)}AA; text-decoration: none; font-size: 1.2em; display: inline-block;`;
  inlineStyles += " }";
  inlineStyles += " .template-modern-social-links a:hover { color: " + escCssVal(data.primaryColor) + "; }";
  inlineStyles += " .template-modern-resume-link {";
  inlineStyles += "   display: inline-flex; align-items: center; justify-content: center; padding: 0.6rem 1.5rem;";
  inlineStyles += "   font-size: 1em; font-weight: 500; border-radius: 6px;";
  inlineStyles += `   border: 1px solid ${escCssVal(data.primaryColor)}77; color: ${escCssVal(data.primaryColor)};`;
  inlineStyles += `   background-color: ${escCssVal(data.backgroundColor)}; text-decoration: none;`;
  inlineStyles += " }";
  inlineStyles += " .template-modern-resume-link svg { margin-right: 0.5rem; }";
  inlineStyles += " .template-modern-copyright { font-size: 0.9em; margin-top: 2.5rem; }";
  inlineStyles += " .template-modern-footer-tagline { font-size: 0.8em; opacity: 0.8; margin-top: 0.25rem; }";
  
  let previewHtml = '';
  previewHtml += '<html>';
  previewHtml += '<head>';
  previewHtml += `<title>${escHtml(data.yourName)} - Portfolio (Modern)</title>`;
  previewHtml += '<style>';
  previewHtml += " body, h1, h2, h3, p, ul, li, a, div, section, header, footer, nav, main, img { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }";
  previewHtml += escCssVal(inlineStyles);
  previewHtml += '</style>';
  previewHtml += '</head>';
  previewHtml += '<body class="template-modern-body">';
  
  previewHtml += '<header class="template-modern-hero">';
  previewHtml += `<img src="${escAttr(data.heroImagePlaceholder)}" alt="${escAttr(data.yourName)}" data-ai-hint="portrait professional" />`;
  previewHtml += `<h1>${escHtml(data.yourName)}</h1>`;
  previewHtml += `<h2>${escHtml(data.heroTitle)}</h2>`;
  if (data.heroTagline) previewHtml += `<p>${(escHtml(data.heroTagline)).replace(/\n/g, '<br>')}</p>`;
  if (data.heroCtaText) {
    previewHtml += `<a href="#contact" class="template-modern-hero-cta">${escHtml(data.heroCtaText)}</a>`;
  }
  previewHtml += '</header>';
  
  previewHtml += '<nav class="template-modern-nav">';
  previewHtml += '<div class="template-modern-container template-modern-nav-container">';
  if (data.showAboutSection) previewHtml += '<a href="#about">About</a>';
  if (data.showAcademicSection) previewHtml += '<a href="#academic">Education</a>';
  if (data.showProjectsSection) previewHtml += '<a href="#projects">Projects</a>';
  if (data.showSkillsSection) previewHtml += '<a href="#skills">Skills</a>';
  if (data.showContactSection) previewHtml += '<a href="#contact">Contact</a>';
  previewHtml += '</div></nav>';
  
  previewHtml += '<main class="template-modern-main template-modern-container">';
  if (data.showAboutSection) {
    previewHtml += '<section id="about" class="template-modern-section">';
    previewHtml += '<div class="template-modern-section-title-container"><h2 class="template-modern-section-title"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>About Me</h2></div>';
    previewHtml += '<div class="template-modern-section-content-card">';
    if (data.aboutBio) previewHtml += `<p style="font-size: 1.1em; line-height: 1.7; margin-bottom: 1.5rem;">${(escHtml(data.aboutBio)).replace(/\n/g, '<br>')}</p>`;
    if (data.showFunFact && data.aboutFunFact) {
      previewHtml += `<p style="font-size: 1em; font-style: italic; color: ${escCssVal(foregroundColor)}AA; border-left: 4px solid ${escCssVal(data.accentColor)}; padding-left: 1rem; background-color: ${escCssVal(data.accentColor)}1A; padding: 0.5rem 1rem; border-radius: 0 4px 4px 0;">Fun Fact: ${(escHtml(data.aboutFunFact)).replace(/\n/g, '<br>')}</p>`;
    }
    previewHtml += '</div></section>';
  }

  if (data.showAcademicSection) {
    previewHtml += '<section id="academic" class="template-modern-section">';
    previewHtml += '<div class="template-modern-section-title-container"><h2 class="template-modern-section-title"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 22v-4a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4"/><path d="M18 18.5c0-2.21-1.79-4-4-4H7c-2.21 0-4 1.79-4 4V22h15v-3.5Z"/><path d="M2 10h20"/><path d="M2 14h20"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M5 2v4a2 2 0 0 0 2 2h3M19 10V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4"/></svg>Academic Background</h2></div>';
    previewHtml += '<div class="template-modern-section-content-card">';
    const isAcademic2Visible = data.showAcademic2 && data.academic2 && data.academic2.qualification;
    if (data.showAcademic1 && data.academic1) previewHtml += academicEntryHtml(data.academic1, 1, !isAcademic2Visible);
    if (isAcademic2Visible && data.academic2) previewHtml += academicEntryHtml(data.academic2, 2, true);
    previewHtml += '</div></section>';
  }
  
  if (data.showProjectsSection) {
    previewHtml += '<section id="projects" class="template-modern-section">';
    previewHtml += '<div class="template-modern-section-title-container"><h2 class="template-modern-section-title"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>My Work</h2></div>';
    previewHtml += '<div class="template-modern-projects-grid">';
    if (data.showProject1 && data.project1) previewHtml += projectCardHtml(data.project1);
    if (data.showProject2 && data.project2) previewHtml += projectCardHtml(data.project2);
    previewHtml += '</div></section>';
  }
  
  if (data.showSkillsSection) {
    previewHtml += '<section id="skills" class="template-modern-section">';
    previewHtml += '<div class="template-modern-section-title-container"><h2 class="template-modern-section-title"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>Skills & Technologies</h2></div>';
    previewHtml += '<div class="template-modern-section-content-card">';
    if (data.aboutSkills) previewHtml += `<p style="font-size: 1.1em; text-align: center; margin-bottom: 1.5rem;">${(escHtml(data.aboutSkills)).replace(/\n/g, '<br>')}</p>`;
    const skillsArray = (data.aboutSkills || "").split(',').map(skill => skill.trim()).filter(skill => skill);
    if (skillsArray.length > 0) {
      previewHtml += '<ul class="template-modern-skills-list">';
      previewHtml += skillsArray.map(skill => `<li>${escHtml(skill)}</li>`).join('');
      previewHtml += '</ul>';
    }
    previewHtml += '</div></section>';
  }
  previewHtml += '</main>';
  
  if (data.showContactSection) {
    previewHtml += '<footer id="contact" class="template-modern-footer">';
    previewHtml += '<div class="template-modern-section-title-container"><h2 class="template-modern-section-title" style="color: ' + escCssVal(data.primaryColor) + ';"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>Get In Touch</h2></div>';
    previewHtml += '<div class="template-modern-footer-contact-card">';
    previewHtml += "<p>I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.</p>";
    if (data.contactEmail) {
        previewHtml += `<a href="mailto:${escAttr(data.contactEmail)}" class="template-modern-footer-email-button">Say Hello</a>`;
    }
    previewHtml += '<div class="template-modern-social-links">';
    if (data.contactLinkedin) previewHtml += `<a href="${escAttr(data.contactLinkedin)}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>`;
    if (data.contactGithub) previewHtml += `<a href="${escAttr(data.contactGithub)}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>`;
    if (data.contactInstagram) previewHtml += `<a href="${escAttr(data.contactInstagram)}" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram"><svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>`;
    previewHtml += '</div>';
    if (data.showResumeLink && data.resumeUrl) {
      previewHtml += `<div><a href="${escAttr(data.resumeUrl)}" target="_blank" rel="noopener noreferrer" class="template-modern-resume-link"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>Download Resume</a></div>`;
    }
    previewHtml += '</div>';
    previewHtml += `<p class="template-modern-copyright">&copy; ${new Date().getFullYear()} ${escHtml(data.yourName)}. All rights reserved.</p>`;
    previewHtml += '<p class="template-modern-footer-tagline">Modern Portfolio Template</p>';
    previewHtml += '</footer>';
  }
  
  previewHtml += '</body></html>';

  return { fullTsx, previewHtml };
}
