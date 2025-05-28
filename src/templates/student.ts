
// src/templates/student.ts
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

export function getStudentTemplate(data: FormSchemaType): TemplateOutput {
  const siteNameClean = (data.yourName?.trim().replace(/\W+/g, '') || "PortfolioSite");
  const primaryContrast = getContrastColor(data.primaryColor);
  const accentContrast = getContrastColor(data.accentColor);
  const foregroundColor = getContrastColor(data.backgroundColor);

  const projectCardTsx = (project: NonNullable<FormSchemaType['project1']>) => {
    let imagePart = '';
    if (project.imageUrl) {
      imagePart = `<Image src={"${escJsStr(project.imageUrl)}"} alt={"${escJsStr(project.name)}"} width={400} height={225} className="rounded-md mb-4 w-full h-auto object-cover border border-border" data-ai-hint="project screenshot student" />`;
    } else {
      imagePart = `<div className="w-full h-[200px] bg-muted rounded-md mb-4 flex items-center justify-center border border-border"><span className="text-muted-foreground text-sm">Project Visual: ${escJsStr(project.name)}</span></div>`;
    }
    return `
    <div className="bg-card p-5 rounded-lg shadow-md border border-border transition-all hover:shadow-lg">
      ${imagePart}
      <h3 className="text-xl font-semibold text-primary mb-2">${escJsStr(project.name)}</h3>
      <p className="text-card-foreground text-sm mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: "${escJsStr((project.description || "")).replace(/\\n/g, '<br />')}" }} />
      <p className="text-xs text-muted-foreground mb-4"><strong>Key Technologies:</strong> ${escJsStr(project.technologies)}</p>
      <div className="flex flex-wrap gap-3 text-sm">
        ${project.liveUrl ? `<a href={"${escJsStr(project.liveUrl)}"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors font-medium">
          <ExternalLink className="w-4 h-4 mr-1.5" /> Live Demo
        </a>` : ''}
        ${project.repoUrl ? `<a href={"${escJsStr(project.repoUrl)}"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1.5 rounded-md border border-input bg-background hover:bg-secondary transition-colors font-medium">
          <Github className="w-4 h-4 mr-1.5" /> View Repository
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
        ${academic.imageUrl ? `<Image src={"${escJsStr(academic.imageUrl)}"} alt={"${escJsStr(academic.qualification || 'Academic Achievement')}"} width={500} height={300} className="rounded-md mb-4 w-full max-w-md mx-auto h-auto object-cover border" data-ai-hint="university campus books" />` : ''}
        <h3 className="text-lg font-semibold text-primary/90 mb-1">${escJsStr(academic.qualification)}</h3>
        <p className="text-md text-muted-foreground mb-1">${escJsStr(academic.institution)}</p>
        <p className="text-sm text-muted-foreground mb-2"><em>${escJsStr(academic.graduationYear)}</em></p>
        ${academic.grades ? `<p className="text-sm text-muted-foreground mb-3">Grades/GPA: ${escJsStr(academic.grades)}</p>` : ''}
        ${academic.description ? `<p className="text-sm leading-relaxed text-card-foreground/90" dangerouslySetInnerHTML={{ __html: "${escJsStr(academic.description).replace(/\\n/g, '<br />')}" }} />` : ''}
      </div>
    `;
  };
  const academic1TsxString = (data.showAcademic1 && data.academic1) ? academicEntryTsx(data.academic1, 1) : '';
  const academic2TsxString = (data.showAcademic2 && data.academic2) ? academicEntryTsx(data.academic2, 2) : '';


  const fullTsx = `
// Generated Page: ${escJsStr(data.yourName)}'s Student Portfolio
import React from 'react';
import Image from 'next/image';
import { Mail, Linkedin, Github, Download, ExternalLink, User, BookOpen, Code2, Briefcase, GraduationCap, Instagram } from 'lucide-react';
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
              className="rounded-md mb-4 w-full max-w-md mx-auto h-auto object-cover border"
              data-ai-hint="university campus books" 
            />
        )}
        <h3 className="text-lg font-semibold text-primary/90 mb-1">{academic.qualification}</h3>
        {academic.institution && <p className="text-md text-muted-foreground mb-1">{academic.institution}</p>}
        {academic.graduationYear && <p className="text-sm text-muted-foreground mb-2"><em>{academic.graduationYear}</em></p>}
        {academic.grades && <p className="text-sm text-muted-foreground mb-3">Grades/GPA: {academic.grades}</p>}
        {academic.description && <p className="text-sm leading-relaxed text-card-foreground/90" dangerouslySetInnerHTML={{ __html: (academic.description).replace(/\\n/g, '<br />') }} />}
      </div>
    );
  };


  return (
    <div className="font-sans bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <header className="bg-primary text-primary-foreground py-12 px-6 md:py-16 text-center">
        <Image 
          src={portfolioData.heroImagePlaceholder || "https://placehold.co/150x150.png"} 
          alt={portfolioData.yourName || 'Student'} 
          width={150} 
          height={150} 
          className="rounded-full mx-auto mb-5 border-4 border-accent object-cover shadow-lg"
          data-ai-hint="student portrait professional" 
          priority
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-2">{portfolioData.yourName}</h1>
        <h2 className="text-xl md:text-2xl font-light mb-3 opacity-90">{portfolioData.heroTitle}</h2>
        {portfolioData.heroTagline && <p className="text-md md:text-lg max-w-xl mx-auto mb-6 opacity-80" dangerouslySetInnerHTML={{ __html: (portfolioData.heroTagline).replace(/\\n/g, '<br />') }} />}
        {portfolioData.heroCtaText && (
          <a href="#projects" className="inline-flex items-center justify-center px-6 py-2.5 text-md font-medium rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors shadow-md">
            {portfolioData.heroCtaText}
          </a>
        )}
      </header>

      {/* Navigation */}
      <nav className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-center items-center space-x-4 sm:space-x-6 text-sm sm:text-base">
          {portfolioData.showAboutSection && <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">About Me</a>}
          {portfolioData.showAcademicSection && <a href="#academic" className="text-foreground hover:text-primary transition-colors font-medium">Academics</a>}
          {portfolioData.showProjectsSection && <a href="#projects" className="text-foreground hover:text-primary transition-colors font-medium">Projects</a>}
          {portfolioData.showSkillsSection && <a href="#skills" className="text-foreground hover:text-primary transition-colors font-medium">Skills</a>}
          {portfolioData.showContactSection && <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">Contact</a>}
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 py-10 md:py-12">
        {portfolioData.showAboutSection && (
          <section id="about" className="mb-12 md:mb-16 scroll-mt-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6 pb-2 border-b-2 border-accent inline-flex items-center"><User className="w-7 h-7 mr-2.5" /> About Me</h2>
            <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md border border-border">
              {portfolioData.aboutBio && <p className="text-md leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: (portfolioData.aboutBio).replace(/\\n/g, '<br />') }} />}
              {portfolioData.showFunFact && portfolioData.aboutFunFact && (
                <p className="text-sm italic text-muted-foreground bg-muted/50 p-3 rounded-md">
                  <GraduationCap className="inline w-4 h-4 mr-1.5 text-accent" /> Fun Fact/Interest: {portfolioData.aboutFunFact}
                </p>
              )}
            </div>
          </section>
        )}

        {portfolioData.showAcademicSection && (
          <section id="academic" className="mb-12 md:mb-16 scroll-mt-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6 pb-2 border-b-2 border-accent inline-flex items-center"><BookOpen className="w-7 h-7 mr-2.5" /> Academic Profile</h2>
            <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md border border-border">
              {portfolioData.showAcademic1 && portfolioData.academic1 && renderAcademicEntry(portfolioData.academic1, 1)}
              {portfolioData.showAcademic2 && portfolioData.academic2 && renderAcademicEntry(portfolioData.academic2, 2)}
            </div>
          </section>
        )}

        {portfolioData.showProjectsSection && (
          <section id="projects" className="mb-12 md:mb-16 scroll-mt-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8 pb-2 border-b-2 border-accent inline-flex items-center"><Briefcase className="w-7 h-7 mr-2.5" /> Academic & Personal Projects</h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              ${project1TsxString}
              ${project2TsxString}
            </div>
          </section>
        )}

        {portfolioData.showSkillsSection && (
          <section id="skills" className="mb-12 md:mb-16 scroll-mt-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6 pb-2 border-b-2 border-accent inline-flex items-center"><Code2 className="w-7 h-7 mr-2.5" /> Skills & Proficiencies</h2>
            <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md border border-border">
              {portfolioData.aboutSkills && <p className="text-md leading-relaxed mb-5" dangerouslySetInnerHTML={{ __html: (portfolioData.aboutSkills).replace(/\\n/g, '<br />') }} />}
              {skillsArray.length > 0 && (
                <ul className="flex flex-wrap gap-2.5">
                  {skillsArray.map((skill, index) => (
                    <li key={index} className="bg-accent/10 text-accent-foreground border border-accent/30 px-3 py-1.5 rounded-md text-sm font-medium">
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
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-6 pb-2 inline-block"><Mail className="inline w-7 h-7 mr-2" /> Contact Me</h2>
            <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg border border-border max-w-xl mx-auto mb-8">
              {portfolioData.contactEmail && (
                <p className="text-md mb-4">
                  Interested in collaborating or have a question? Reach out: 
                  <a href={'mailto:' + portfolioData.contactEmail} className="text-accent hover:underline font-semibold ml-1">{portfolioData.contactEmail}</a>
                </p>
              )}
              <div className="flex justify-center space-x-5 my-5">
                {portfolioData.contactLinkedin && <a href={portfolioData.contactLinkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={26} /></a>}
                {portfolioData.contactGithub && <a href={portfolioData.contactGithub} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors"><Github size={26} /></a>}
                {portfolioData.contactInstagram && <a href={portfolioData.contactInstagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={26} /></a>}
              </div>
              {portfolioData.showResumeLink && portfolioData.resumeUrl && (
                <a href={portfolioData.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-secondary shadow-sm">
                  <Download className="w-4 h-4 mr-2" /> View My Resume
                </a>
              )}
            </div>
            <p className="text-sm">&copy; {new Date().getFullYear()} {portfolioData.yourName}. All Rights Reserved.</p>
            <p className="text-xs mt-1">Student Portfolio Theme</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default function GeneratedPage() {
  const rawDataString = '${escJsStr(JSON.stringify(data))}';
  
  const defaultErrorProps: FormSchemaType = {
    yourName: "Student Name (Error)",
    heroTitle: "Aspiring Individual (Error)",
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
    theme: "student",
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
    let html = '<div class="template-student-academic-entry" style="margin-bottom: 1.5rem; padding-bottom: 1.5rem; ' + (!isLastVisible ? 'border-bottom: 1px dashed ' + escCssVal(foregroundColor) + '33;' : '') + '">';
    if (academic.imageUrl) {
      html += `<img src="${escAttr(academic.imageUrl)}" alt="${escAttr(academic.qualification || 'Academic Achievement')}" data-ai-hint="university campus books" style="border-radius: 6px; margin-bottom: 1rem; width: 100%; max-width: 400px; height: auto; object-fit: cover; border: 1px solid ${escCssVal(data.primaryColor)}33; display:block; margin-left:auto; margin-right:auto;" />`;
    }
    html += `<h3 style="font-size:1.2em;font-weight:600;color:${escCssVal(data.primaryColor)};margin-bottom:0.1rem;">${escHtml(academic.qualification)}</h3>`;
    if (academic.institution) html += `<p style="font-size:1.05em;color:${escCssVal(foregroundColor)}BB;margin-bottom:0.1rem;">${escHtml(academic.institution)}</p>`;
    if (academic.graduationYear) html += `<p style="font-size:0.9em;color:${escCssVal(foregroundColor)}AA;margin-bottom:0.2rem;"><em>${escHtml(academic.graduationYear)}</em></p>`;
    if (academic.grades) html += `<p style="font-size:0.9em;color:${escCssVal(foregroundColor)}AA;margin-bottom:0.4rem;">Grades/GPA: ${escHtml(academic.grades)}</p>`;
    if (academic.description) html += `<p style="font-size:0.95em;color:${escCssVal(foregroundColor)}CC;line-height:1.7;">${(escHtml(academic.description)).replace(/\n/g, '<br>')}</p>`;
    html += '</div>';
    return html;
  };

  const projectCardHtml = (project: NonNullable<FormSchemaType['project1']>) => {
    let imageHtml = '';
    if (project.imageUrl) {
      imageHtml = `<img src="${escAttr(project.imageUrl)}" alt="${escAttr(project.name)}" data-ai-hint="project screenshot student" style="border-radius: 6px; margin-bottom: 1rem; width: 100%; height: auto; object-fit: cover; border: 1px solid ${escCssVal(data.primaryColor)}33;" />`;
    } else {
      imageHtml = `<div style="width: 100%; height: 200px; background-color: ${escCssVal(data.accentColor)}1A; border-radius: 6px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; border: 1px solid ${escCssVal(data.primaryColor)}33;"><span style="color: ${escCssVal(foregroundColor)}AA; font-size: 0.9em;">Project Visual: ${escHtml(project.name)}</span></div>`;
    }

    let cardString = '';
    cardString += `<div style="background-color: ${escCssVal(data.backgroundColor)}; padding: 1.25rem; border-radius: 8px; box-shadow: 0 2px 4px ${escCssVal(foregroundColor)}1A; border: 1px solid ${escCssVal(foregroundColor)}22;">`;
    cardString += imageHtml;
    cardString += `<h3 style="font-size: 1.25em; font-weight: 600; color: ${escCssVal(data.primaryColor)}; margin-bottom: 0.5rem;">${escHtml(project.name)}</h3>`;
    cardString += `<p style="color: ${escCssVal(foregroundColor)}CC; margin-bottom: 0.75rem; font-size: 0.875em; line-height: 1.6;">${(escHtml(project.description || "")).replace(/\n/g, '<br>')}</p>`;
    cardString += `<p style="color: ${escCssVal(foregroundColor)}AA; font-size: 0.75em; margin-bottom: 1rem;"><strong>Key Technologies:</strong> ${escHtml(project.technologies)}</p>`;
    cardString += '<div style="display: flex; flex-wrap: wrap; gap: 0.75rem; font-size: 0.875rem;">';
    if (project.liveUrl) {
      cardString += `<a href="${escAttr(project.liveUrl)}" target="_blank" style="padding: 0.375rem 0.75rem; border-radius: 6px; background-color: ${escCssVal(data.accentColor)}; color: ${escCssVal(accentContrast)}; text-decoration: none; font-weight: 500;">Live Demo</a>`;
    }
    if (project.repoUrl) {
      cardString += `<a href="${escAttr(project.repoUrl)}" target="_blank" style="padding: 0.375rem 0.75rem; border-radius: 6px; border: 1px solid ${escCssVal(data.primaryColor)}77; color: ${escCssVal(data.primaryColor)}; background-color: ${escCssVal(data.backgroundColor)}; text-decoration: none; font-weight: 500;">View Repository</a>`;
    }
    cardString += '</div></div>';
    return cardString;
  };

  let inlineStyles = '';
  inlineStyles += " body, h1, h2, h3, p, ul, li, a, div, section, header, footer, nav, main, img { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }";
  inlineStyles += " .template-student-body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; background-color: " + escCssVal(data.backgroundColor) + "; color: " + escCssVal(foregroundColor) + "; line-height: 1.65; font-size: 16px; min-height: 100vh; }";
  inlineStyles += " .template-student-container { max-width: 1000px; margin: 0 auto; padding: 0 1rem; }";
  inlineStyles += " .template-student-hero { background-color: " + escCssVal(data.primaryColor) + "; color: " + escCssVal(primaryContrast) + "; padding: 3rem 1.5rem; text-align: center; }";
  inlineStyles += " .template-student-hero img { width: 140px; height: 140px; border-radius: 50%; margin: 0 auto 1.25rem auto; border: 4px solid " + escCssVal(data.accentColor) + "; object-fit: cover; box-shadow: 0 2px 10px " + escCssVal(data.accentColor) + "44; }";
  inlineStyles += " .template-student-hero h1 { font-size: 2.5em; font-weight: 700; margin-bottom: 0.25rem; }";
  inlineStyles += " .template-student-hero h2 { font-size: 1.3em; font-weight: 400; margin-bottom: 0.75rem; opacity: 0.9; }";
  inlineStyles += " .template-student-hero p { font-size: 1em; max-width: 550px; margin: 0 auto 1.5rem auto; opacity: 0.85; }";
  inlineStyles += " .template-student-hero-cta { display: inline-flex; align-items: center; justify-content: center; padding: 0.6rem 1.5rem; font-size: 1em; font-weight: 500; border-radius: 6px; background-color: " + escCssVal(data.accentColor) + "; color: " + escCssVal(accentContrast) + "; text-decoration: none; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }";
  inlineStyles += " .template-student-nav { background-color: " + escCssVal(data.backgroundColor) + "; border-bottom: 1px solid " + escCssVal(foregroundColor) + "22; box-shadow: 0 1px 2px rgba(0,0,0,0.04); position: sticky; top: 0; z-index: 50; }";
  inlineStyles += " .template-student-nav-container { display: flex; justify-content: center; align-items: center; gap: 1rem; padding: 0.7rem 1rem; font-size: 0.9rem;} @media (min-width: 640px) { .template-student-nav-container { gap: 1.5rem; font-size: 1rem;} }";
  inlineStyles += " .template-student-nav a { color: " + escCssVal(foregroundColor) + "DD; text-decoration: none; font-weight: 500; }";
  inlineStyles += " .template-student-nav a:hover { color: " + escCssVal(data.primaryColor) + "; }";
  inlineStyles += " .template-student-main { padding: 2.5rem 0; }";
  inlineStyles += " .template-student-section { margin-bottom: 3rem; }";
  inlineStyles += " .template-student-section-title { font-size: 1.75em; font-weight: 600; color: " + escCssVal(data.primaryColor) + "; margin-bottom: 1.5rem; padding-bottom: 0.4rem; border-bottom: 2px solid " + escCssVal(data.accentColor) + "; display: inline-block; } @media (min-width: 768px) { .template-student-section-title { font-size: 2em; } }";
  inlineStyles += " .template-student-section-content-card { background-color: " + escCssVal(data.backgroundColor) + "; padding: 1.5rem; border-radius: 8px; box-shadow: 0 3px 6px " + escCssVal(foregroundColor) + "11; border: 1px solid " + escCssVal(foregroundColor) + "1A; }";
  inlineStyles += " .template-student-skills-list { display: flex; flex-wrap: wrap; gap: 0.6rem; list-style: none; padding: 0; }";
  inlineStyles += " .template-student-skills-list li { background-color: " + escCssVal(data.accentColor) + "1A; color: " + escCssVal(data.accentColor) + "; border: 1px solid " + escCssVal(data.accentColor) + "44; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.875em; font-weight: 500; }";
  inlineStyles += " .template-student-projects-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; } @media (min-width: 768px) { .template-student-projects-grid { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; } }";
  inlineStyles += " .template-student-footer { background-color: " + escCssVal(foregroundColor) + "0F; color: " + escCssVal(foregroundColor) + "BB; padding: 2.5rem 1.5rem; text-align: center; border-top: 1px solid " + escCssVal(foregroundColor) + "1A; }";
  inlineStyles += " .template-student-footer-contact-card { background-color: " + escCssVal(data.backgroundColor) + "; color: " + escCssVal(foregroundColor) + "; padding: 1.5rem; border-radius: 8px; border: 1px solid " + escCssVal(foregroundColor) + "1A; box-shadow: 0 3px 6px " + escCssVal(foregroundColor) + "0A; max-width: 550px; margin: 0 auto 2rem auto; }";
  inlineStyles += " .template-student-footer .section-title { font-size: 1.75em; color: " + escCssVal(data.primaryColor) + "; margin-bottom: 1.5rem;}";
  inlineStyles += " .template-student-footer p { font-size: 0.95em; margin-bottom: 1rem; }";
  inlineStyles += " .template-student-footer-email-link { color: " + escCssVal(data.accentColor) + "; font-weight: 600; text-decoration:none; } .template-student-footer-email-link:hover { text-decoration:underline; }";
  inlineStyles += " .template-student-social-links { display: flex; justify-content: center; gap: 1.25rem; margin-bottom: 1.25rem; }";
  inlineStyles += " .template-student-social-links a { color: " + escCssVal(foregroundColor) + "99; text-decoration: none; font-size: 1.1em; display: inline-block; } .template-student-social-links a:hover { color: " + escCssVal(data.primaryColor) + "; }";
  inlineStyles += " .template-student-resume-link { display: inline-flex; align-items: center; justify-content: center; padding: 0.5rem 1.25rem; font-size: 0.875em; font-weight: 500; border-radius: 6px; border: 1px solid " + escCssVal(data.primaryColor) + "66; color: " + escCssVal(data.primaryColor) + "; background-color: " + escCssVal(data.backgroundColor) + "; text-decoration: none; } .template-student-resume-link svg { margin-right: 0.4rem; }";
  inlineStyles += " .template-student-copyright { font-size: 0.85em; margin-top: 2rem; }";
  inlineStyles += " .template-student-footer-tagline { font-size: 0.75em; opacity: 0.7; margin-top: 0.25rem; }";

  let previewHtml = '';
  previewHtml += '<html><head>';
  previewHtml += '<title>' + escHtml(data.yourName) + ' - Student Portfolio</title>';
  previewHtml += '<style>';
  previewHtml += " body, h1, h2, h3, p, ul, li, a, div, section, header, footer, nav, main, img { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }";
  previewHtml += escCssVal(inlineStyles);
  previewHtml += '</style></head>';
  previewHtml += '<body class="template-student-body"><div class="template-student-container">'; 

  previewHtml += '<header class="template-student-hero">';
  previewHtml += '<img src="' + escAttr(data.heroImagePlaceholder) + '" alt="' + escAttr(data.yourName) + '" data-ai-hint="student portrait professional" />';
  previewHtml += '<h1>' + escHtml(data.yourName) + '</h1>';
  previewHtml += '<h2>' + escHtml(data.heroTitle) + '</h2>';
  if(data.heroTagline) previewHtml += '<p>' + (escHtml(data.heroTagline)).replace(/\n/g, '<br>') + '</p>';
  if(data.heroCtaText) previewHtml += '<a href="#projects" class="template-student-hero-cta">' + escHtml(data.heroCtaText) + '</a>';
  previewHtml += '</header>';

  previewHtml += '<nav class="template-student-nav"><div class="template-student-nav-container">';
  if(data.showAboutSection) previewHtml += '<a href="#about">About Me</a>';
  if(data.showAcademicSection) previewHtml += '<a href="#academic">Academics</a>';
  if(data.showProjectsSection) previewHtml += '<a href="#projects">Projects</a>';
  if(data.showSkillsSection) previewHtml += '<a href="#skills">Skills</a>';
  if(data.showContactSection) previewHtml += '<a href="#contact">Contact</a>';
  previewHtml += '</div></nav>';

  previewHtml += '<main class="template-student-main">';
  if(data.showAboutSection) {
    previewHtml += '<section id="about" class="template-student-section">';
    previewHtml += '<h2 class="template-student-section-title">About Me</h2>';
    previewHtml += '<div class="template-student-section-content-card">';
    if(data.aboutBio) previewHtml += '<p style="font-size: 1em; line-height: 1.7;">' + (escHtml(data.aboutBio)).replace(/\n/g, '<br>') + '</p>';
    if(data.showFunFact && data.aboutFunFact) previewHtml += '<p style="font-size: 0.9em; font-style: italic; color: '+escCssVal(foregroundColor)+'AA; margin-top: 1rem; background-color:'+escCssVal(data.accentColor)+'1A; padding: 0.5rem 0.75rem; border-left: 3px solid '+escCssVal(data.accentColor)+'; border-radius: 0 4px 4px 0;">Fun Fact/Interest: ' + (escHtml(data.aboutFunFact)).replace(/\n/g, '<br>') + '</p>';
    previewHtml += '</div></section>';
  }

  if(data.showAcademicSection) {
    previewHtml += '<section id="academic" class="template-student-section">';
    previewHtml += '<h2 class="template-student-section-title">Academic Profile</h2>';
    previewHtml += '<div class="template-student-section-content-card">';
    const isAcademic2Visible = data.showAcademic2 && data.academic2 && data.academic2.qualification;
    if (data.showAcademic1 && data.academic1) previewHtml += academicEntryHtml(data.academic1, 1, !isAcademic2Visible);
    if (isAcademic2Visible && data.academic2) previewHtml += academicEntryHtml(data.academic2, 2, true);
    previewHtml += '</div></section>';
  }

  if(data.showProjectsSection) {
    previewHtml += '<section id="projects" class="template-student-section">';
    previewHtml += '<h2 class="template-student-section-title">Academic & Personal Projects</h2>';
    previewHtml += '<div class="template-student-projects-grid">';
    if (data.showProject1 && data.project1) previewHtml += projectCardHtml(data.project1);
    if (data.showProject2 && data.project2) previewHtml += projectCardHtml(data.project2);
    previewHtml += '</div></section>';
  }

  if(data.showSkillsSection) {
    previewHtml += '<section id="skills" class="template-student-section">';
    previewHtml += '<h2 class="template-student-section-title">Skills & Proficiencies</h2>';
    previewHtml += '<div class="template-student-section-content-card">';
    if(data.aboutSkills) previewHtml += '<p style="font-size: 1em; margin-bottom: 1.25rem;">' + (escHtml(data.aboutSkills)).replace(/\n/g, '<br>') + '</p>';
    const skillsArray = (data.aboutSkills || "").split(',').map(skill => skill.trim()).filter(skill => skill);
    if(skillsArray.length > 0) {
      previewHtml += '<ul class="template-student-skills-list">';
      previewHtml += skillsArray.map(skill => '<li>' + escHtml(skill) + '</li>').join('');
      previewHtml += '</ul>';
    }
    previewHtml += '</div></section>';
  }
  previewHtml += '</main>';

  if(data.showContactSection) {
    previewHtml += '<footer id="contact" class="template-student-footer">';
    previewHtml += '<h2 class="template-student-footer section-title">Contact Me</h2>';
    previewHtml += '<div class="template-student-footer-contact-card">';
    if(data.contactEmail) previewHtml += '<p>Interested in collaborating or have a question? Reach out: <a href="mailto:' + escAttr(data.contactEmail) + '" class="template-student-footer-email-link">' + escHtml(data.contactEmail) + '</a></p>';
    previewHtml += '<div class="template-student-social-links">';
    if(data.contactLinkedin) previewHtml += '<a href="' + escAttr(data.contactLinkedin) + '" target="_blank" aria-label="LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>';
    if(data.contactGithub) previewHtml += '<a href="' + escAttr(data.contactGithub) + '" target="_blank" aria-label="GitHub" title="GitHub"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>';
    if(data.contactInstagram) previewHtml += '<a href="' + escAttr(data.contactInstagram) + '" target="_blank" aria-label="Instagram" title="Instagram"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>';
    previewHtml += '</div>';
    if(data.showResumeLink && data.resumeUrl) previewHtml += '<div><a href="' + escAttr(data.resumeUrl) + '" target="_blank" rel="noopener noreferrer" class="template-student-resume-link"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> View My Resume</a></div>';
    previewHtml += '</div>'; 
    previewHtml += '<p class="template-student-copyright">&copy; ' + new Date().getFullYear() + ' ' + escHtml(data.yourName) + '. All Rights Reserved.</p>';
    previewHtml += '<p class="template-student-footer-tagline">Student Portfolio Theme</p>';
    previewHtml += '</footer>';
  }
  previewHtml += '</div></body></html>';

  return { fullTsx, previewHtml };
}
