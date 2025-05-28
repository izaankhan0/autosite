
// src/templates/corporate.ts
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

export function getCorporateTemplate(data: FormSchemaType): TemplateOutput {
  const siteNameClean = (data.yourName?.trim().replace(/\W+/g, '') || "PortfolioSite");
  const primaryContrast = getContrastColor(data.primaryColor);
  const accentContrast = getContrastColor(data.accentColor);
  const foregroundColor = getContrastColor(data.backgroundColor);

  const projectCardTsx = (project: NonNullable<FormSchemaType['project1']>) => {
    let imagePart = '';
    if (project.imageUrl) {
      imagePart = `<Image src={"${escJsStr(project.imageUrl)}"} alt={"${escJsStr(project.name)}"} width={400} height={225} className="w-full h-48 object-cover" data-ai-hint="website screenshot corporate" />`;
    } else {
      imagePart = `<div className="w-full h-48 bg-muted flex items-center justify-center"><span className="text-muted-foreground">${escJsStr(project.name)} Visual</span></div>`;
    }
    return `
    <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
      ${imagePart}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-primary mb-2">${escJsStr(project.name)}</h3>
        <p className="text-sm text-card-foreground mb-2" dangerouslySetInnerHTML={{ __html: "${escJsStr((project.description || "")).replace(/\\n/g, '<br />')}" }} />
        <p className="text-xs text-muted-foreground mb-3">Key Technologies: ${escJsStr(project.technologies)}</p>
        <div className="flex gap-3">
          ${project.liveUrl ? `<a href={"${escJsStr(project.liveUrl)}"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-accent text-accent-foreground hover:bg-accent/90">
            <ExternalLink className="w-3 h-3 mr-1.5" /> View Project
          </a>` : ''}
          ${project.repoUrl ? `<a href={"${escJsStr(project.repoUrl)}"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md border border-input bg-background hover:bg-secondary">
            <Github className="w-3 h-3 mr-1.5" /> Source Code
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
      <div className="mb-6 pb-6 ${entryNumber === 1 && data.showAcademic2 && data.academic2?.qualification ? 'border-b border-dashed border-border' : ''}">
        ${academic.imageUrl ? `<Image src={"${escJsStr(academic.imageUrl)}"} alt={"${escJsStr(academic.qualification || 'Academic Achievement')}"} width={600} height={300} className="rounded-md mb-4 w-full h-auto object-cover border" data-ai-hint="education university building" />` : ''}
        <h3 className="text-xl font-medium text-primary/90 mb-1">${escJsStr(academic.qualification)}</h3>
        <p className="text-lg text-muted-foreground mb-1">${escJsStr(academic.institution)}</p>
        <p className="text-md text-muted-foreground mb-2"><em>${escJsStr(academic.graduationYear)}</em></p>
        ${academic.grades ? `<p className="text-md text-muted-foreground mb-3">Grades: ${escJsStr(academic.grades)}</p>` : ''}
        ${academic.description ? `<p className="text-card-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: "${escJsStr(academic.description).replace(/\\n/g, '<br />')}" }} />` : ''}
      </div>
    `;
  };
  const academic1TsxString = (data.showAcademic1 && data.academic1) ? academicEntryTsx(data.academic1, 1) : '';
  const academic2TsxString = (data.showAcademic2 && data.academic2) ? academicEntryTsx(data.academic2, 2) : '';
  
  const fullTsx = `
// Generated Page: ${escJsStr(data.yourName)}'s Portfolio - Corporate Theme
import React from 'react';
import Image from 'next/image';
import { Mail, Linkedin, Github, Instagram, Download, ExternalLink, UserCircle, Briefcase, Award, Building, BookOpen } from 'lucide-react';
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
            width={600} 
            height={300} 
            className="rounded-md mb-4 w-full h-auto object-cover border"
            data-ai-hint="education university building"
          />
        )}
        <h3 className="text-xl font-medium text-primary/90 mb-1">{academic.qualification}</h3>
        {academic.institution && <p className="text-lg text-muted-foreground mb-1">{academic.institution}</p>}
        {academic.graduationYear && <p className="text-md text-muted-foreground mb-2"><em>{academic.graduationYear}</em></p>}
        {academic.grades && <p className="text-md text-muted-foreground mb-3">Grades: {academic.grades}</p>}
        {academic.description && <p className="text-card-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: (academic.description).replace(/\\n/g, '<br />') }} />}
      </div>
    );
  };

  return (
    <div className="bg-background text-foreground font-sans">
      <div className="container mx-auto">
        {/* Hero Section */}
        <header className="bg-primary text-primary-foreground py-12 px-6 md:px-10 flex flex-col md:flex-row items-center gap-8 border-b-4 border-accent">
          <Image 
            src={portfolioData.heroImagePlaceholder || "https://placehold.co/160x160.png"} 
            alt={portfolioData.yourName || 'Portfolio Owner'} 
            width={160} 
            height={160} 
            className="rounded-md shadow-lg border-2 border-accent object-cover"
            data-ai-hint="professional headshot corporate"
            priority
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{portfolioData.yourName}</h1>
            <h2 className="text-xl md:text-2xl font-light opacity-90 mb-3">{portfolioData.heroTitle}</h2>
            {portfolioData.heroTagline && <p className="text-base md:text-lg max-w-xl mb-6 opacity-90" dangerouslySetInnerHTML={{ __html: (portfolioData.heroTagline).replace(/\\n/g, '<br />') }} />}
            {portfolioData.heroCtaText && (
              <a href="#contact" className="inline-block px-6 py-2.5 text-md font-medium rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors shadow-md">
                {portfolioData.heroCtaText}
              </a>
            )}
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
          <ul className="flex justify-center items-center gap-6 md:gap-8 py-4 px-6">
            {portfolioData.showAboutSection && <li><a href="#about" className="text-foreground hover:text-primary font-medium transition-colors">About</a></li>}
            {portfolioData.showAcademicSection && <li><a href="#academic" className="text-foreground hover:text-primary font-medium transition-colors">Education</a></li>}
            {portfolioData.showProjectsSection && <li><a href="#projects" className="text-foreground hover:text-primary font-medium transition-colors">Portfolio</a></li>}
            {portfolioData.showSkillsSection && <li><a href="#skills" className="text-foreground hover:text-primary font-medium transition-colors">Expertise</a></li>}
            {portfolioData.showContactSection && <li><a href="#contact" className="text-foreground hover:text-primary font-medium transition-colors">Contact</a></li>}
          </ul>
        </nav>

        <main className="px-6 md:px-10 py-12">
          {portfolioData.showAboutSection && (
            <section id="about" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-primary mb-6 pb-2 border-b-2 border-accent inline-flex items-center"><UserCircle className="w-8 h-8 mr-3" />Professional Profile</h2>
              <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                {portfolioData.aboutBio && <p className="text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: (portfolioData.aboutBio).replace(/\\n/g, '<br />') }} />}
                {portfolioData.showFunFact && portfolioData.aboutFunFact && (
                  <p className="mt-4 text-sm italic text-muted-foreground">Note: {portfolioData.aboutFunFact}</p>
                )}
              </div>
            </section>
          )}

          {portfolioData.showAcademicSection && (
            <section id="academic" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-primary mb-6 pb-2 border-b-2 border-accent inline-flex items-center"><BookOpen className="w-8 h-8 mr-3" />Educational Background</h2>
              <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                {portfolioData.showAcademic1 && portfolioData.academic1 && renderAcademicEntry(portfolioData.academic1, 1)}
                {portfolioData.showAcademic2 && portfolioData.academic2 && renderAcademicEntry(portfolioData.academic2, 2)}
              </div>
            </section>
          )}

          {portfolioData.showProjectsSection && (
            <section id="projects" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-primary mb-8 pb-2 border-b-2 border-accent inline-flex items-center"><Briefcase className="w-8 h-8 mr-3" />Key Projects</h2>
              <div className="grid md:grid-cols-2 gap-8">
                ${project1TsxString}
                ${project2TsxString}
              </div>
            </section>
          )}

          {portfolioData.showSkillsSection && (
            <section id="skills" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-semibold text-primary mb-6 pb-2 border-b-2 border-accent inline-flex items-center"><Award className="w-8 h-8 mr-3" />Areas of Expertise</h2>
              <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                {portfolioData.aboutSkills && <p className="text-foreground/90 mb-4" dangerouslySetInnerHTML={{ __html: (portfolioData.aboutSkills).replace(/\\n/g, '<br />') }} />}
                {skillsArray.length > 0 && (
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
                    {skillsArray.map((skill, index) => (
                      <li key={index} className="bg-muted text-muted-foreground p-2.5 rounded border border-input">
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
          <footer id="contact" className="bg-muted text-muted-foreground py-10 text-center scroll-mt-24 border-t border-border">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-semibold text-primary mb-6 pb-2 border-b-2 border-accent inline-flex items-center"><Building className="w-8 h-8 mr-3" />Contact Information</h2>
              <div className="bg-card p-6 rounded-lg border border-border shadow-sm text-center max-w-2xl mx-auto mb-8">
                {portfolioData.contactEmail && (
                  <p className="text-lg text-card-foreground mb-4">
                    For inquiries or collaborations, please contact me via email: <a href={'mailto:' + portfolioData.contactEmail} className="text-accent hover:underline font-medium">{portfolioData.contactEmail}</a>.
                  </p>
                )}
                <div className="flex justify-center space-x-5 my-5">
                  {portfolioData.contactLinkedin && <a href={portfolioData.contactLinkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><Linkedin size={26} /></a>}
                  {portfolioData.contactGithub && <a href={portfolioData.contactGithub} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary"><Github size={26} /></a>}
                  {portfolioData.contactInstagram && <a href={portfolioData.contactInstagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram size={26} /></a>}
                </div>
                {portfolioData.showResumeLink && portfolioData.resumeUrl && (
                  <a href={portfolioData.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-secondary shadow-sm">
                    <Download className="w-4 h-4 mr-2" /> Download Full Resume
                  </a>
                )}
              </div>
              <p className="text-sm">&copy; {new Date().getFullYear()} {portfolioData.yourName}. All Rights Reserved.</p>
              <p className="text-xs mt-1">Corporate Portfolio Solution</p>
            </div>
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
    heroImagePlaceholder: "https://placehold.co/160x160.png?text=Error",
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
    theme: "corporate",
    primaryColor: data.primaryColor || "#0D47A1", 
    backgroundColor: data.backgroundColor || "#F5F5F5", 
    accentColor: data.accentColor || "#FFC107",   
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
    let html = '<div class="template-corporate-academic-entry" style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; ' + (!isLastVisible ? 'border-bottom: 1px dashed ' + escCssVal(foregroundColor) + '33;' : '') + '">';
    if (academic.imageUrl) {
      html += `<img src="${escAttr(academic.imageUrl)}" alt="${escAttr(academic.qualification || 'Academic Achievement')}" data-ai-hint="education university building" style="border-radius: 6px; margin-bottom: 1rem; width: 100%; max-width: 500px; height: auto; object-fit: cover; border: 1px solid ${escCssVal(data.primaryColor)}33; display:block; margin-left:auto; margin-right:auto;" />`;
    }
    html += `<h3 style="font-size:1.4em;font-weight:500;color:${escCssVal(data.primaryColor)};margin-bottom:0.2rem;">${escHtml(academic.qualification)}</h3>`;
    if (academic.institution) html += `<p style="font-size:1.1em;color:${escCssVal(foregroundColor)}BB;margin-bottom:0.2rem;">${escHtml(academic.institution)}</p>`;
    if (academic.graduationYear) html += `<p style="font-size:1em;color:${escCssVal(foregroundColor)}AA;margin-bottom:0.3rem;"><em>${escHtml(academic.graduationYear)}</em></p>`;
    if (academic.grades) html += `<p style="font-size:1em;color:${escCssVal(foregroundColor)}AA;margin-bottom:0.5rem;">Grades: ${escHtml(academic.grades)}</p>`;
    if (academic.description) html += `<p style="font-size:1em;color:${escCssVal(foregroundColor)}CC;line-height:1.7;">${(escHtml(academic.description)).replace(/\n/g, '<br>')}</p>`;
    html += '</div>';
    return html;
  };

  const projectCardHtml = (project: NonNullable<FormSchemaType['project1']>) => {
    let imageHtml = '';
    if (project.imageUrl) {
      imageHtml = `<img src="${escAttr(project.imageUrl)}" alt="${escAttr(project.name)}" data-ai-hint="website screenshot corporate" style="width:100%;height:192px;object-fit:cover;border-bottom:1px solid ${escCssVal(data.primaryColor)}33;"/>`;
    } else {
      imageHtml = `<div style="width:100%;height:192px;background-color:${escCssVal(data.accentColor)}1A;display:flex;align-items:center;justify-content:center;border-bottom:1px solid ${escCssVal(data.primaryColor)}33;"><span style="color:${escCssVal(foregroundColor)}AA;">${escHtml(project.name)} Visual</span></div>`;
    }
    return `
    <div style="background-color:${escCssVal(data.backgroundColor)};border:1px solid ${escCssVal(data.primaryColor)}33;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.05);overflow:hidden;">
      ${imageHtml}
      <div style="padding:1.25rem;">
        <h3 style="font-size:1.25em;font-weight:600;color:${escCssVal(data.primaryColor)};margin-top:0;margin-bottom:0.5rem;">${escHtml(project.name)}</h3>
        <p style="font-size:0.875em;color:${escCssVal(foregroundColor)}CC;margin-bottom:0.5rem;line-height:1.6;">${(escHtml(project.description || "")).replace(/\n/g, '<br>')}</p>
        <p style="font-size:0.75em;color:${escCssVal(foregroundColor)}AA;margin-bottom:0.75rem;">Key Technologies: ${escHtml(project.technologies)}</p>
        <div style="display:flex;gap:0.75rem;">
          ${project.liveUrl ? `<a href="${escAttr(project.liveUrl)}" target="_blank" style="display:inline-block;padding:0.375rem 0.75rem;font-size:0.75em;font-weight:500;border-radius:6px;background-color:${escCssVal(data.accentColor)};color:${escCssVal(accentContrast)};text-decoration:none;">View Project</a>` : ''}
          ${project.repoUrl ? `<a href="${escAttr(project.repoUrl)}" target="_blank" style="display:inline-block;padding:0.375rem 0.75rem;font-size:0.75em;font-weight:500;border-radius:6px;border:1px solid ${escCssVal(data.primaryColor)}77;color:${escCssVal(data.primaryColor)};background-color:${escCssVal(data.backgroundColor)};text-decoration:none;">Source Code</a>` : ''}
        </div>
      </div>
    </div>
  `;
  };
  
  let inlineStyles = '';
  inlineStyles += " body, h1, h2, h3, p, ul, li, a, div, section, header, footer, nav, main, img { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }";
  inlineStyles += " .template-corporate-body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; background-color: " + escCssVal(data.backgroundColor) + "; color: " + escCssVal(foregroundColor) + "; line-height: 1.6; font-size: 16px; }";
  inlineStyles += " .template-corporate-container { max-width: 1100px; margin: 0 auto; }";
  inlineStyles += " .template-corporate-hero { background-color: " + escCssVal(data.primaryColor) + "; color: " + escCssVal(primaryContrast) + "; padding: 3rem 1.5rem; border-bottom: 4px solid " + escCssVal(data.accentColor) + "; display: flex; align-items: center; gap: 2rem; }";
  inlineStyles += " @media (max-width: 768px) { .template-corporate-hero { flex-direction: column; text-align: center; } }";
  inlineStyles += " .template-corporate-hero img { width: 160px; height: 160px; border-radius: 8px; border: 2px solid " + escCssVal(data.accentColor) + "; object-fit: cover; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }";
  inlineStyles += " .template-corporate-hero h1 { font-size: 2.5em; font-weight: 700; margin-bottom: 0.5rem; }";
  inlineStyles += " .template-corporate-hero h2 { font-size: 1.5em; font-weight: 300; opacity: 0.9; margin-bottom: 0.75rem; }";
  inlineStyles += " .template-corporate-hero p { font-size: 1em; max-width: 600px; opacity: 0.9; margin-bottom: 1.5rem; }";
  inlineStyles += " .template-corporate-hero-cta { display: inline-block; padding: 0.625rem 1.25rem; font-size: 1em; font-weight: 500; border-radius: 6px; background-color: " + escCssVal(data.accentColor) + "; color: " + escCssVal(accentContrast) + "; text-decoration: none; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }";
  inlineStyles += " .template-corporate-nav { background-color: " + escCssVal(data.backgroundColor) + "EE; border-bottom: 1px solid " + escCssVal(foregroundColor) + "22; box-shadow: 0 1px 3px rgba(0,0,0,0.05); position: sticky; top: 0; z-index: 50; }";
  inlineStyles += " .template-corporate-nav ul { list-style: none; display: flex; justify-content: center; align-items: center; gap: 2rem; padding: 1rem 1.5rem; }";
  inlineStyles += " .template-corporate-nav a { color: " + escCssVal(foregroundColor) + "; text-decoration: none; font-weight: 500; font-size: 0.95em; }";
  inlineStyles += " .template-corporate-nav a:hover { color: " + escCssVal(data.primaryColor) + "; }";
  inlineStyles += " .template-corporate-main { padding: 3rem 1.5rem; }";
  inlineStyles += " .template-corporate-section { margin-bottom: 4rem; }";
  inlineStyles += " .template-corporate-section-title { font-size: 2em; font-weight: 600; color: " + escCssVal(data.primaryColor) + "; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 2px solid " + escCssVal(data.accentColor) + "; display: inline-block; }";
  inlineStyles += " .template-corporate-section-content-card { background-color: " + escCssVal(data.backgroundColor) + "; padding: 1.5rem; border-radius: 8px; border: 1px solid " + escCssVal(foregroundColor) + "22; box-shadow: 0 2px 5px rgba(0,0,0,0.03); }";
  inlineStyles += " .template-corporate-skills-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.75rem; list-style: none; padding: 0; }";
  inlineStyles += " .template-corporate-skills-list li { background-color: " + escCssVal(data.accentColor) + "1A; color: " + escCssVal(foregroundColor) + "; padding: 0.625rem; border-radius: 6px; border: 1px solid " + escCssVal(data.accentColor) + "55; font-size: 0.875em; }";
  inlineStyles += " .template-corporate-projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; }";
  inlineStyles += " .template-corporate-footer { background-color: " + escCssVal(foregroundColor) + "11; color: " + escCssVal(foregroundColor) + "AA; padding: 2.5rem 1.5rem; text-align: center; border-top: 1px solid " + escCssVal(foregroundColor) + "22; }";
  inlineStyles += " .template-corporate-footer-contact-card { background-color: " + escCssVal(data.backgroundColor) + "; color: " + escCssVal(foregroundColor) + "; padding: 1.5rem; border-radius: 8px; border: 1px solid " + escCssVal(foregroundColor) + "22; box-shadow: 0 2px 5px rgba(0,0,0,0.03); max-width: 650px; margin: 0 auto 2rem auto; }";
  inlineStyles += " .template-corporate-footer .section-title { color: " + escCssVal(data.primaryColor) + "; }";
  inlineStyles += " .template-corporate-footer p { font-size: 1em; margin-bottom: 1rem; }";
  inlineStyles += " .template-corporate-footer-email-link { color: " + escCssVal(data.accentColor) + "; font-weight: 500; text-decoration: none; }";
  inlineStyles += " .template-corporate-footer-email-link:hover { text-decoration: underline; }";
  inlineStyles += " .template-corporate-social-links { display: flex; justify-content: center; gap: 1.25rem; margin: 1.25rem 0; }";
  inlineStyles += " .template-corporate-social-links a { color: " + escCssVal(foregroundColor) + "AA; text-decoration:none; font-size:1.2em; display:inline-block; }";
  inlineStyles += " .template-corporate-social-links a:hover { color: " + escCssVal(data.primaryColor) + "; }";
  inlineStyles += " .template-corporate-resume-link { display: inline-flex; align-items: center; padding: 0.5rem 1rem; font-size: 0.875em; font-weight: 500; border-radius: 6px; border: 1px solid " + escCssVal(data.primaryColor) + "99; color: " + escCssVal(data.primaryColor) + "; background-color: " + escCssVal(data.backgroundColor) + "; text-decoration: none; }";
  inlineStyles += " .template-corporate-footer-copyright { font-size: 0.875em; }";
  inlineStyles += " .template-corporate-footer-tagline { font-size: 0.75em; opacity: 0.8; margin-top: 0.25rem; }";

  let previewHtml = '';
  previewHtml += '<html><head>';
  previewHtml += '<title>' + escHtml(data.yourName) + ' - Portfolio (Corporate)</title>';
  previewHtml += '<style>';
  previewHtml += escCssVal(inlineStyles);
  previewHtml += '</style></head>';
  previewHtml += '<body class="template-corporate-body"><div class="template-corporate-container">';
  
  previewHtml += '<header class="template-corporate-hero">';
  previewHtml += '<img src="' + escAttr(data.heroImagePlaceholder) + '" alt="' + escAttr(data.yourName) + '" data-ai-hint="professional headshot corporate" />';
  previewHtml += '<div><h1>' + escHtml(data.yourName) + '</h1>';
  previewHtml += '<h2>' + escHtml(data.heroTitle) + '</h2>';
  if (data.heroTagline) previewHtml += '<p>' + (escHtml(data.heroTagline)).replace(/\n/g, '<br>') + '</p>';
  if (data.heroCtaText) previewHtml += '<a href="#contact" class="template-corporate-hero-cta">' + escHtml(data.heroCtaText) + '</a>';
  previewHtml += '</div></header>';

  previewHtml += '<nav class="template-corporate-nav"><ul>';
  if (data.showAboutSection) previewHtml += '<li><a href="#about">About</a></li>';
  if (data.showAcademicSection) previewHtml += '<li><a href="#academic">Education</a></li>';
  if (data.showProjectsSection) previewHtml += '<li><a href="#projects">Portfolio</a></li>';
  if (data.showSkillsSection) previewHtml += '<li><a href="#skills">Expertise</a></li>';
  if (data.showContactSection) previewHtml += '<li><a href="#contact">Contact</a></li>';
  previewHtml += '</ul></nav>';

  previewHtml += '<main class="template-corporate-main">';
  if (data.showAboutSection) {
    previewHtml += '<section id="about" class="template-corporate-section">';
    previewHtml += '<h2 class="template-corporate-section-title">Professional Profile</h2>';
    previewHtml += '<div class="template-corporate-section-content-card">';
    if (data.aboutBio) previewHtml += '<p>' + (escHtml(data.aboutBio)).replace(/\n/g, '<br>') + '</p>';
    if (data.showFunFact && data.aboutFunFact) previewHtml += '<p style="margin-top:1rem;font-size:0.9em;font-style:italic;color:' + escCssVal(foregroundColor) + 'AA;">Note: ' + (escHtml(data.aboutFunFact)).replace(/\n/g, '<br>') + '</p>';
    previewHtml += '</div></section>';
  }

  if (data.showAcademicSection) {
    previewHtml += '<section id="academic" class="template-corporate-section">';
    previewHtml += '<h2 class="template-corporate-section-title">Educational Background</h2>';
    previewHtml += '<div class="template-corporate-section-content-card">';
    const isAcademic2Visible = data.showAcademic2 && data.academic2 && data.academic2.qualification;
    if (data.showAcademic1 && data.academic1) previewHtml += academicEntryHtml(data.academic1, 1, !isAcademic2Visible);
    if (isAcademic2Visible && data.academic2) previewHtml += academicEntryHtml(data.academic2, 2, true);
    previewHtml += '</div></section>';
  }

  if (data.showProjectsSection) {
    previewHtml += '<section id="projects" class="template-corporate-section">';
    previewHtml += '<h2 class="template-corporate-section-title">Key Projects</h2>';
    previewHtml += '<div class="template-corporate-projects-grid">';
    if (data.showProject1 && data.project1) previewHtml += projectCardHtml(data.project1);
    if (data.showProject2 && data.project2) previewHtml += projectCardHtml(data.project2);
    previewHtml += '</div></section>';
  }

  if (data.showSkillsSection) {
    previewHtml += '<section id="skills" class="template-corporate-section">';
    previewHtml += '<h2 class="template-corporate-section-title">Areas of Expertise</h2>';
    previewHtml += '<div class="template-corporate-section-content-card">';
    if (data.aboutSkills) previewHtml += '<p style="margin-bottom:1rem;">' + (escHtml(data.aboutSkills)).replace(/\n/g, '<br>') + '</p>';
    const skillsArray = (data.aboutSkills || "").split(',').map(skill => skill.trim()).filter(skill => skill);
    if (skillsArray.length > 0) {
      previewHtml += '<ul class="template-corporate-skills-list">';
      previewHtml += skillsArray.map(skill => '<li>' + escHtml(skill) + '</li>').join('');
      previewHtml += '</ul>';
    }
    previewHtml += '</div></section>';
  }
  previewHtml += '</main>';

  if (data.showContactSection) {
    previewHtml += '<footer id="contact" class="template-corporate-footer">';
    previewHtml += '<h2 class="template-corporate-section-title section-title">Contact Information</h2>';
    previewHtml += '<div class="template-corporate-footer-contact-card">';
    if (data.contactEmail) previewHtml += '<p>For inquiries or collaborations, please contact me via email: <a href="mailto:' + escAttr(data.contactEmail) + '" class="template-corporate-footer-email-link">' + escHtml(data.contactEmail) + '</a>.</p>';
    previewHtml += '<div class="template-corporate-social-links">';
    if (data.contactLinkedin) previewHtml += '<a href="' + escAttr(data.contactLinkedin) + '" target="_blank" aria-label="LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>';
    if (data.contactGithub) previewHtml += '<a href="' + escAttr(data.contactGithub) + '" target="_blank" aria-label="GitHub" title="GitHub"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>';
    if (data.contactInstagram) previewHtml += '<a href="' + escAttr(data.contactInstagram) + '" target="_blank" aria-label="Instagram" title="Instagram"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>';
    previewHtml += '</div>';
    if (data.showResumeLink && data.resumeUrl) previewHtml += '<a href="' + escAttr(data.resumeUrl) + '" target="_blank" class="template-corporate-resume-link"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem; vertical-align: middle;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Download Full Resume</a>';
    previewHtml += '</div>';
    previewHtml += '<p class="template-corporate-footer-copyright">&copy; ' + new Date().getFullYear() + ' ' + escHtml(data.yourName) + '. All Rights Reserved.</p>';
    previewHtml += '<p class="template-corporate-footer-tagline">Corporate Portfolio Solution</p>';
    previewHtml += '</footer>';
  }
  previewHtml += '</div></body></html>';
  return { fullTsx, previewHtml };
}
