
// src/templates/futuristic.ts
import type { FormSchemaType, AcademicEntryType, ProjectType } from "@/schemas/websiteFormSchema";

// --- Escaping Helper Functions ---
const escJsStr = (str: string | undefined | null): string => {
  if (str === null || typeof str === 'undefined') return '';
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, "\\n");
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
  // For CSS, we mainly need to ensure quotes don't break the string, and handle backslashes.
  // Backticks are not special in CSS values themselves unless the CSS is in a JS template literal.
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/'/g, "\\'");
};
// --- End Escaping Helper Functions ---

// Helper function to get contrast color - MUST BE DEFINED AT THE TOP LEVEL OF THE MODULE
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
    console.error("Error parsing hex for contrast in getContrastColor:", e);
    return '#FFFFFF';
  }
}

export function getFuturisticTemplate(data: FormSchemaType): { fullTsx: string; previewHtml: string } {
  const {
    yourName = "Operator Unit X",
    heroTitle = "Reality Modulator,System Architect",
    heroTagline = "Welcome to my operational matrix. Explore the parameters of my digital existence.",
    heroCtaText = "Download Datapack (CV)",
    heroImagePlaceholder = "https://placehold.co/1080x1440/0C0426/00F0FF?text=HERO&font=orbitron",
    aboutBio = "A processing unit dedicated to innovation and system architecture. My core directives involve problem-solving and future-tech integration.",
    aboutSkills = "Quantum Computing:90,Neural Networks:85,Cybernetics:75,Data Weaving:95",
    academicEntries = [],
    projects = [],
    contactEmail = "operator.unit.x@cyberspace.net",
    contactLinkedin = "https://linkedin.com/in/futuristic-profile",
    contactGithub = "https://github.com/futuristic-profile",
    contactInstagram = "https://instagram.com/futuristic.profile",
    resumeUrl = "#",
    theme = "futuristic", // Ensure theme is part of destructured props
    primaryColor = "#7D5AED", 
    backgroundColor = "#0C0426", 
    accentColor = "#00F0FF", 
    showAboutSection = true,
    showFunFact = false, 
    showAcademicSection = true,
    showProjectsSection = true,
    showSkillsSection = true,
    showContactSection = true,
    showResumeLink = true,
  } = data || {};

  const siteNameClean = (yourName?.trim().replace(/\W+/g, '') || "FuturisticPortfolioSite");

  // --- For fullTsx ---
  const defaultErrorProps: FormSchemaType = {
    yourName: "Futuristic User (Error)",
    heroTitle: "Error Loading Title",
    heroTagline: "Error loading tagline. System data integrity compromised.",
    heroCtaText: "Download CV",
    heroImagePlaceholder: "https://placehold.co/1080x1440/FF0000/FFFFFF?text=DATA_ERR&font=orbitron",
    aboutBio: "Biography data stream corrupted or unavailable.",
    aboutSkills: "Skill Matrix:Error,AI Core:Offline",
    academicEntries: [{ qualification: "Data Corruption", institution: "System Error", graduationYear: "Unknown", grades: "N/A", description: "Log not found.", imageUrl: "https://placehold.co/1080x1440/FF0000/FFFFFF?text=EDU_ERR&font=orbitron" }],
    projects: [{ name: "Project Corruption", description: "Project data streams offline.", technologies: "Error Stack", imageUrl: "https://placehold.co/600x400/FF0000/FFFFFF?text=PROJ_ERR&font=orbitron", liveUrl: "#", repoUrl: "#" }],
    contactEmail: "error@system.null",
    contactLinkedin: "", contactGithub: "", contactInstagram: "",
    resumeUrl: "",
    theme: "futuristic",
    primaryColor: "#7D5AED", backgroundColor: "#0C0426", accentColor: "#00F0FF",
    showAboutSection: true, showFunFact: false, showAcademicSection: true, 
    showProjectsSection: true, showSkillsSection: true, showContactSection: true, showResumeLink: true,
  };
  
  let fullTsx = "";
  fullTsx += "// Generated Page: " + escJsStr(yourName) + "'s Futuristic Portfolio (Reference Adapted)\\n";
  fullTsx += "\"use client\";\\n";
  fullTsx += "import React, { useState, useEffect, useRef } from 'react';\\n";
  fullTsx += "import Head from 'next/head';\\n";
  fullTsx += "import Image from 'next/image';\\n";
  fullTsx += "import { Linkedin, Github, Instagram as InstagramIcon, Mail, Download as DownloadIcon, ExternalLink, User as UserIcon, Briefcase as BriefcaseIcon, BookOpen as BookOpenIcon, Layers as LayersIcon, MessageSquare as MessageSquareIcon, Home as HomeIcon, Menu as MenuIcon, X as XIcon, CalendarDays, PhoneCall, Globe } from 'lucide-react';\\n";
  fullTsx += "import type { FormSchemaType, AcademicEntryType, ProjectType } from \"@/schemas/websiteFormSchema\";\\n"; // Assume this path is correct for your project
  fullTsx += "\\n";
  fullTsx += "declare var Typed: any; // For Typed.js\\n";
  fullTsx += "\\n";

  // getContrastColorForTsx is defined here
  fullTsx += "const getContrastColorForTsx = (hexcolor: string | undefined): string => {\\n";
  fullTsx += "  if (!hexcolor || !hexcolor.startsWith('#')) return '#FFFFFF';\\n";
  fullTsx += "  let processedHex = hexcolor.slice(1);\\n";
  fullTsx += "  if (processedHex.length === 3) processedHex = processedHex.split('').map(char => char + char).join('');\\n";
  fullTsx += "  if (processedHex.length !== 6) return '#FFFFFF';\\n";
  fullTsx += "  try {\\n";
  fullTsx += "    const r = parseInt(processedHex.substring(0, 2), 16);\\n";
  fullTsx += "    const g = parseInt(processedHex.substring(2, 4), 16);\\n";
  fullTsx += "    const b = parseInt(processedHex.substring(4, 6), 16);\\n";
  fullTsx += "    const yiq = (r * 299 + g * 587 + b * 114) / 1000;\\n";
  fullTsx += "    return yiq >= 128 ? '#000000' : '#FFFFFF';\\n";
  fullTsx += "  } catch (e) { return '#FFFFFF'; }\\n";
  fullTsx += "};\\n\\n";

  fullTsx += "const " + siteNameClean + "PortfolioPage: React.FC<{ portfolioData: FormSchemaType }> = ({ portfolioData }) => {\\n";

  // Guard clause for portfolioData
  fullTsx += "  if (!portfolioData || typeof portfolioData.yourName === 'undefined') {\\n";
  fullTsx += "    const errorDataForComponent: FormSchemaType = " + JSON.stringify(defaultErrorProps) + ";\\n";
  fullTsx += "    portfolioData = errorDataForComponent; // Use error data if primary fails\\n";
  fullTsx += "  }\\n";
  fullTsx += "\\n";
  
  // Destructure all props needed from portfolioData, providing fallbacks from defaultErrorProps
  fullTsx += "  const {\\n";
  fullTsx += "    yourName = '" + escJsStr(defaultErrorProps.yourName) + "',\\n";
  fullTsx += "    heroTitle = '" + escJsStr(defaultErrorProps.heroTitle) + "',\\n";
  fullTsx += "    heroTagline = '" + escJsStr(defaultErrorProps.heroTagline) + "',\\n";
  fullTsx += "    heroImagePlaceholder = '" + escJsStr(defaultErrorProps.heroImagePlaceholder) + "',\\n";
  fullTsx += "    resumeUrl = '" + escJsStr(defaultErrorProps.resumeUrl) + "',\\n";
  fullTsx += "    aboutBio = '" + escJsStr(defaultErrorProps.aboutBio) + "',\\n";
  fullTsx += "    aboutSkills = '" + escJsStr(defaultErrorProps.aboutSkills) + "',\\n";
  fullTsx += "    contactEmail = '" + escJsStr(defaultErrorProps.contactEmail) + "',\\n";
  fullTsx += "    contactLinkedin = '" + escJsStr(defaultErrorProps.contactLinkedin) + "',\\n";
  fullTsx += "    contactGithub = '" + escJsStr(defaultErrorProps.contactGithub) + "',\\n";
  fullTsx += "    contactInstagram = '" + escJsStr(defaultErrorProps.contactInstagram) + "',\\n";
  fullTsx += "    academicEntries = portfolioData.academicEntries || [],\\n"; // Ensure arrays are at least empty
  fullTsx += "    projects = portfolioData.projects || [],\\n";
  fullTsx += "    accentColor: userAccentColor = '" + escJsStr(defaultErrorProps.accentColor) + "',\\n";
  fullTsx += "    backgroundColor: userBackgroundColor = '" + escJsStr(defaultErrorProps.backgroundColor) + "',\\n";
  fullTsx += "    primaryColor: userPrimaryColor = '" + escJsStr(defaultErrorProps.primaryColor) + "',\\n"; // This is for lighter content sections
  fullTsx += "    showAboutSection = typeof portfolioData.showAboutSection === 'boolean' ? portfolioData.showAboutSection : true,\\n";
  fullTsx += "    showAcademicSection = typeof portfolioData.showAcademicSection === 'boolean' ? portfolioData.showAcademicSection : true,\\n";
  fullTsx += "    showProjectsSection = typeof portfolioData.showProjectsSection === 'boolean' ? portfolioData.showProjectsSection : true,\\n";
  fullTsx += "    showSkillsSection = typeof portfolioData.showSkillsSection === 'boolean' ? portfolioData.showSkillsSection : true,\\n";
  fullTsx += "    showContactSection = typeof portfolioData.showContactSection === 'boolean' ? portfolioData.showContactSection : true,\\n";
  fullTsx += "    showResumeLink = typeof portfolioData.showResumeLink === 'boolean' ? portfolioData.showResumeLink : true\\n";
  fullTsx += "  } = portfolioData;\\n";
  fullTsx += "\\n";

  // --- Start of Color Variable Definitions ---
  fullTsx += "  const css_skin_color = userAccentColor;\\n";
  fullTsx += "  const css_main_bg = userBackgroundColor;\\n";
  fullTsx += "  const css_content_bg = userPrimaryColor; // Reference uses primaryColor for lighter content sections\\n";
  fullTsx += "\\n";
  fullTsx += "  const calculatedMainTextColor = getContrastColorForTsx(css_main_bg);\\n";
  fullTsx += "  const calculatedContentTextColor = getContrastColorForTsx(css_content_bg);\\n";
  fullTsx += "  const calculatedAccentContrast = getContrastColorForTsx(css_skin_color);\\n";
  fullTsx += "\\n";
  fullTsx += "  const isMainBgDark = calculatedMainTextColor === \"#FFFFFF\";\\n";
  fullTsx += "\\n";
  fullTsx += "  const css_bg_black_100 = isMainBgDark ? \"color-mix(in srgb, \" + css_main_bg + \" 85%, #ffffff 15%)\" : \"color-mix(in srgb, \" + css_main_bg + \" 95%, #000000 5%)\";\\n";
  fullTsx += "  const css_bg_black_50 = isMainBgDark ? \"color-mix(in srgb, \" + css_main_bg + \" 70%, #ffffff 30%)\" : \"color-mix(in srgb, \" + css_main_bg + \" 90%, #000000 10%)\";\\n";
  fullTsx += "  const css_text_black_900 = calculatedMainTextColor;\\n";
  fullTsx += "  const css_text_black_700_on_main_bg = isMainBgDark ? \"color-mix(in srgb, \" + calculatedMainTextColor + \" 85%, \" + css_main_bg + \" 15%)\" : \"color-mix(in srgb, \" + calculatedMainTextColor + \" 70%, \" + css_main_bg + \" 30%)\";\\n";
  fullTsx += "  const css_text_black_900_on_content_bg = calculatedContentTextColor;\\n";
  fullTsx += "  const css_text_black_700_on_content_bg = getContrastColorForTsx(css_content_bg) === '#FFFFFF' ? \"color-mix(in srgb, #FFFFFF 85%, \" + css_content_bg + \" 15%)\" : \"color-mix(in srgb, #000000 70%, \" + css_content_bg + \" 30%)\";\\n";
  fullTsx += "  // --- End of Color Variable Definitions ---\\n";
  fullTsx += "\\n";
  
  fullTsx += "  const dynamicGlobalStyles = (\\n";
  fullTsx += "    <style jsx global>{`\\n";
  fullTsx += "      :root {\\n";
  fullTsx += "        --preview-skin-color: " + escJsStr(css_skin_color) + ";\\n";
  fullTsx += "        --preview-main-bg: " + escJsStr(css_main_bg) + ";\\n";
  fullTsx += "        --preview-content-bg-override: " + escJsStr(css_content_bg) + ";\\n";
  fullTsx += "        --preview-bg-black-100-override: " + escJsStr(css_bg_black_100) + ";\\n";
  fullTsx += "        --preview-bg-black-50-override: " + escJsStr(css_bg_black_50) + ";\\n";
  fullTsx += "        --preview-main-text: " + escJsStr(css_text_black_900) + ";\\n"; // Base text on main dark bg
  fullTsx += "        --preview-main-text-700: " + escJsStr(css_text_black_700_on_main_bg) + ";\\n"; // Muted text on main dark bg
  fullTsx += "        --preview-content-text-900-override: " + escJsStr(css_text_black_900_on_content_bg) + ";\\n"; // Base text on lighter content bg
  fullTsx += "        --preview-content-text-700-override: " + escJsStr(css_text_black_700_on_content_bg) + ";\\n"; // Muted text on lighter content bg
  fullTsx += "        --preview-accent-text-contrast: " + escJsStr(calculatedAccentContrast) + ";\\n";
  fullTsx += "      }\\n";
  fullTsx += "      body.futuristic-active-dark-mode-preview {\\n"; // This class will be added if main BG is dark
  fullTsx += "        --bg-black-100: " + escJsStr(css_bg_black_100) + ";\\n";
  fullTsx += "        --bg-black-50: " + escJsStr(css_bg_black_50) + ";\\n";
  fullTsx += "        --text-black-900: " + escJsStr(css_text_black_900) + ";\\n";
  fullTsx += "        --text-black-700: " + escJsStr(css_text_black_700_on_main_bg) + ";\\n";
  fullTsx += "      }\\n";
  fullTsx += "      /* Base styles adapted from reference's style.css */\\n";
  fullTsx += "      body { font-family: 'Poppins', sans-serif; background-color: var(--preview-main-bg); color: var(--preview-main-text); line-height: 1.6; overflow-x:hidden; }\\n";
  fullTsx += "      .font-poppins { font-family: 'Poppins', sans-serif; }\\n";
  fullTsx += "      .font-clicker { font-family: 'Clicker Script', cursive; }\\n";
  fullTsx += "      .section-futuristic-tsx { padding: 0 15px; opacity:0; position:absolute; left:0; top:0; right:0; bottom:0; z-index:1; overflow-y:auto; overflow-x:hidden; min-height:100vh; background: var(--preview-main-bg); transition: opacity 0.5s ease, transform 0.5s ease; transform: translateX(100%); }\\n";
  fullTsx += "      @media (min-width:768px) {.section-futuristic-tsx {padding:0 30px;}}\\n";
  fullTsx += "      .section-futuristic-tsx.active { opacity:1; transform: translateX(0%); z-index:2; }\\n";
  fullTsx += "      .padd-15-tsx {padding-left:15px; padding-right:15px;}\\n";
  fullTsx += "      .container-futuristic-tsx {max-width:1100px; width:100%; margin:auto;}\\n";
  fullTsx += "      .section-futuristic-tsx .container-futuristic-tsx {padding-top:60px; padding-bottom:70px;}\\n";
  fullTsx += "      .section-title-futuristic-tsx {flex-basis:100%; max-width:100%; margin-bottom:60px;}\\n";
  fullTsx += "      .section-title-futuristic-tsx h2 {font-size:40px; font-weight:700; color:var(--preview-main-text); position:relative; font-family: 'Poppins', sans-serif;}\\n";
  fullTsx += "      .section-title-futuristic-tsx.on-content-bg h2 { color: var(--preview-content-text-900-override) !important; }\\n"; // Override for light bg sections
  fullTsx += "      .section-title-futuristic-tsx h2::before {content:''; height:4px; width:50px; background-color:var(--preview-skin-color); position:absolute; left:0; top:100%;}\\n";
  fullTsx += "      .section-title-futuristic-tsx h2::after {content:''; height:4px; width:25px; background-color:var(--preview-skin-color); position:absolute; left:0; top:100%; margin-top:8px;}\\n";
  fullTsx += "      .row-futuristic-tsx {display:flex; flex-wrap:wrap; margin-left:-15px; margin-right:-15px; position:relative;}\\n";
  fullTsx += "      .btn-futuristic-tsx {font-size:16px; font-weight:500; padding:12px 35px; color:var(--preview-accent-text-contrast); border-radius:40px; display:inline-block; white-space:nowrap; border:none; background:var(--preview-skin-color); transition:all .3s ease; text-decoration:none; }\\n";
  fullTsx += "      .btn-futuristic-tsx:hover {transform:scale(1.05);}\\n";
  fullTsx += "      .shadow-dark-futuristic-tsx {box-shadow:0 0 20px rgba(48,46,77,.15);}\\n";
  fullTsx += "      .aside-futuristic-tsx {width:270px; background:var(--preview-bg-black-100-override); position:fixed; left:-270px; top:0; padding:30px; height:100%; border-right:1px solid var(--preview-bg-black-50-override); display:flex; justify-content:center; align-items:center; z-index:10; transition:all .3s ease; flex-direction:column;}\\n";
  fullTsx += "      .aside-futuristic-tsx.open {left:0;}\\n";
  fullTsx += "      .aside-futuristic-tsx .logo-futuristic-tsx a {font-size:30px; color:var(--preview-main-text); font-weight:700; padding:15px 20px; font-family:'Clicker Script',cursive; text-decoration:none;}\\n";
  fullTsx += "      .aside-futuristic-tsx .logo-futuristic-tsx a span {color:var(--preview-skin-color);}\\n";
  fullTsx += "      .aside-futuristic-tsx .nav-futuristic-tsx {margin-top:50px;}\\n";
  fullTsx += "      .aside-futuristic-tsx .nav-futuristic-tsx li {margin-bottom:20px; display:block;}\\n";
  fullTsx += "      .aside-futuristic-tsx .nav-futuristic-tsx li a {font-size:16px; font-weight:600; display:block; border-bottom:1px solid var(--preview-bg-black-50-override); color:var(--preview-main-text); padding:5px 15px; text-decoration:none; transition: all 0.3s ease;}\\n";
  fullTsx += "      .aside-futuristic-tsx .nav-futuristic-tsx li a.active {color:var(--preview-skin-color) !important;}\\n";
  fullTsx += "      .aside-futuristic-tsx .nav-futuristic-tsx li a:hover {color:var(--preview-skin-color) !important;}\\n"; // Added hover
  fullTsx += "      .aside-futuristic-tsx .nav-futuristic-tsx li a .lucide-icon {margin-right:15px; display:inline-block; vertical-align:middle;}\\n";
  fullTsx += "      .nav-toggler-futuristic-tsx {height:40px; width:45px; border:1px solid var(--preview-bg-black-50-override); cursor:pointer; position:fixed; left:30px; top:20px; border-radius:5px; background:var(--preview-bg-black-100-override); display:none; justify-content:center; align-items:center; transition:all .3s ease; z-index:1001;}\\n";
  fullTsx += "      .nav-toggler-futuristic-tsx.open {left:300px;}\\n";
  fullTsx += "      .nav-toggler-futuristic-tsx span {height:2px; width:18px; background:var(--preview-skin-color); display:inline-block; position:relative;}\\n";
  fullTsx += "      .nav-toggler-futuristic-tsx.open span {background-color:transparent;}\\n";
  fullTsx += "      .nav-toggler-futuristic-tsx span::before {content:''; height:2px; width:18px; background:var(--preview-skin-color); position:absolute; top:-6px; left:0;}\\n";
  fullTsx += "      .nav-toggler-futuristic-tsx.open span::before {transform:rotate(45deg); top:0;}\\n";
  fullTsx += "      .nav-toggler-futuristic-tsx span::after {content:''; height:2px; width:18px; background:var(--preview-skin-color); position:absolute; top:6px; left:0;}\\n";
  fullTsx += "      .nav-toggler-futuristic-tsx.open span::after {transform:rotate(-45deg); top:0;}\\n";
  fullTsx += "      .main-content-futuristic-tsx { min-height:100vh; display:block; padding: 0px; opacity:1; position:fixed; left:0; top: 0; right: 0; bottom: 0; overflow-y:auto; overflow-x:hidden; background:var(--preview-main-bg); z-index:0; transition:all .3s ease; width:100%;}\\n";
  fullTsx += "      @media (min-width:1200px){ .main-content-futuristic-tsx { left:270px; width:calc(100% - 270px);}}\\n";
  fullTsx += "      .main-content-futuristic-tsx.open {left: 270px; width: calc(100% - 270px);}\\n";
  fullTsx += "      .home-section-futuristic-tsx {min-height:100vh; display:flex; color:var(--preview-main-text); align-items:center;}\\n";
  fullTsx += "      .home-section-futuristic-tsx .home-info-futuristic-tsx {flex-basis:60%; max-width:60%;}\\n";
  fullTsx += "      .home-section-futuristic-tsx .home-info-futuristic-tsx .hello-futuristic-tsx {font-size:28px; margin:15px 0; color:var(--preview-main-text);}\\n";
  fullTsx += "      .home-section-futuristic-tsx .home-info-futuristic-tsx .hello-futuristic-tsx span.name-futuristic-tsx {font-family:'Clicker Script',cursive; font-size:30px; font-weight:700; color:var(--preview-skin-color);}\\n";
  fullTsx += "      .home-section-futuristic-tsx .home-info-futuristic-tsx .my-profession-futuristic-tsx {font-size:30px; margin:15px 0; color:var(--preview-main-text);}\\n";
  fullTsx += "      .home-section-futuristic-tsx .home-info-futuristic-tsx .typing-futuristic-tsx {color:var(--preview-skin-color);}\\n";
  fullTsx += "      .home-section-futuristic-tsx .home-info-futuristic-tsx p {margin-bottom:70px; font-size:20px; color:var(--preview-main-text-700); line-height:1.7;}\\n";
  fullTsx += "      .home-section-futuristic-tsx .home-img-futuristic-tsx {flex-basis:40%; max-width:40%; text-align:center; position:relative;}\\n";
  fullTsx += "      .home-section-futuristic-tsx .home-img-futuristic-tsx::before {content:''; position:absolute; height:80px; width:80px; border-left:10px solid var(--preview-skin-color); border-top:10px solid var(--preview-skin-color); left:20px; top:-40px;}\\n";
  fullTsx += "      .home-section-futuristic-tsx .home-img-futuristic-tsx::after {content:''; position:absolute; height:80px; width:80px; border-right:10px solid var(--preview-skin-color); border-bottom:10px solid var(--preview-skin-color); right:20px; bottom:-40px;}\\n";
  fullTsx += "      .home-section-futuristic-tsx .home-img-futuristic-tsx img {height:350px; width:auto; max-width:100%; margin:auto; border-radius:5px; object-fit:cover;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .about-content-futuristic-tsx {flex-basis:100%; max-width:100%;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .about-content-futuristic-tsx .about-text-futuristic-tsx {flex-basis:100%; max-width:100%;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .about-content-futuristic-tsx .about-text-futuristic-tsx h3 {font-size:24px; margin-bottom:15px; font-weight:700; color:var(--preview-content-text-900-override);}\\n";
  fullTsx += "      .about-section-futuristic-tsx .about-content-futuristic-tsx .about-text-futuristic-tsx h3 span {color:var(--preview-skin-color);}\\n";
  fullTsx += "      .about-section-futuristic-tsx .about-content-futuristic-tsx .about-text-futuristic-tsx p {font-size:16px; line-height:25px; color:var(--preview-content-text-700-override);}\\n";
  fullTsx += "      .about-section-futuristic-tsx .personal-info-futuristic-tsx {flex-basis:60%; max-width:60%; margin-top:40px;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .personal-info-futuristic-tsx .info-item-futuristic-tsx {flex-basis:50%; max-width:50%;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .personal-info-futuristic-tsx .info-item-futuristic-tsx p {font-weight:600; padding:10px 0; font-size:16px; color:var(--preview-content-text-900-override); border-bottom:1px solid var(--preview-bg-black-50-override);}\\n";
  fullTsx += "      .about-section-futuristic-tsx .personal-info-futuristic-tsx .info-item-futuristic-tsx p span {font-weight:400; color:var(--preview-content-text-700-override); margin-left:4px; display:inline-block;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .personal-info-futuristic-tsx .buttons-futuristic-tsx {margin-top:30px;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .personal-info-futuristic-tsx .buttons-futuristic-tsx .btn-futuristic-tsx {margin-right:15px; margin-top:10px;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .skills-futuristic-tsx {flex-basis:40%; max-width:40%; margin-top:40px;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .skills-futuristic-tsx .skill-item-futuristic-tsx {flex-basis:100%; max-width:100%; margin-bottom:25px;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .skills-futuristic-tsx .skill-item-futuristic-tsx h5 {line-height:40px; font-weight:600; font-size:16px; color:var(--preview-content-text-900-override); text-transform:capitalize;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .skills-futuristic-tsx .skill-item-futuristic-tsx .progress-futuristic-tsx {background-color:var(--preview-bg-black-50-override); height:7px; border-radius:4px; width:100%; position:relative;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .skills-futuristic-tsx .skill-item-futuristic-tsx .progress-in-futuristic-tsx {position:absolute; left:0; top:0; height:100%; border-radius:4px; background-color:var(--preview-skin-color);}\\n";
  fullTsx += "      .about-section-futuristic-tsx .skills-futuristic-tsx .skill-item-futuristic-tsx .skill-percent-futuristic-tsx {position:absolute; right:0; color:var(--preview-content-text-900-override); top:-40px; font-weight:400; line-height:40px;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .education-futuristic-tsx, .about-section-futuristic-tsx .experience-futuristic-tsx {flex-basis:50%; max-width:50%; margin-top:30px;}\\n";
  fullTsx += "      .about-section-futuristic-tsx h3.title-futuristic-tsx {font-size:24px; margin-bottom:30px; font-weight:700; color:var(--preview-content-text-900-override);}\\n";
  fullTsx += "      .about-section-futuristic-tsx .timeline-box-futuristic-tsx {flex-basis:100%; max-width:100%;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .timeline-futuristic-tsx {background:var(--preview-bg-black-100-override); padding:30px 15px; border:1px solid var(--preview-bg-black-50-override); border-radius:10px; width:100%; position:relative;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .timeline-futuristic-tsx .timeline-item-futuristic-tsx {position:relative; padding-left:37px; padding-bottom:50px;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .timeline-futuristic-tsx .timeline-item-futuristic-tsx:last-child {padding-bottom:0;}\\n";
  fullTsx += "      .about-section-futuristic-tsx .timeline-futuristic-tsx .timeline-item-futuristic-tsx::before {content:''; width:1px; position:absolute; height:100%; left:7px; top:0; background-color:var(--preview-skin-color);}\\n";
  fullTsx += "      .about-section-futuristic-tsx .timeline-futuristic-tsx .circle-dot-futuristic-tsx {position:absolute; left:0; top:0; height:15px; width:15px; border-radius:50%; background-color:var(--preview-skin-color);}\\n";
  fullTsx += "      .about-section-futuristic-tsx .timeline-futuristic-tsx .timeline-date-futuristic-tsx {font-size:14px; font-weight:400; margin-bottom:12px; color:var(--preview-content-text-700-override);}\\n";
  fullTsx += "      .about-section-futuristic-tsx .timeline-futuristic-tsx .timeline-date-futuristic-tsx .lucide-icon {margin-right:5px;}\\n"; // Changed for Lucide
  fullTsx += "      .about-section-futuristic-tsx .timeline-futuristic-tsx .timeline-title-futuristic-tsx {font-weight:700; font-size:18px; margin-bottom:15px; text-transform:capitalize; color:var(--preview-content-text-900-override);}\\n";
  fullTsx += "      .about-section-futuristic-tsx .timeline-futuristic-tsx .timeline-text-futuristic-tsx {line-height:25px; font-size:16px; text-align:justify; color:var(--preview-content-text-700-override);}\\n";
  fullTsx += "      .skills-section-futuristic-tsx .skill-item-container-futuristic-tsx { display: flex; flex-wrap: wrap; justify-content:center; gap:1rem;}\\n";
  fullTsx += "      .skills-section-futuristic-tsx .skill-item-futuristic-tsx {margin-bottom:30px; text-align:center;}\\n";
  fullTsx += "      .skills-section-futuristic-tsx .skill-item-inner-futuristic-tsx {background-color:var(--preview-bg-black-100-override); border:1px solid var(--preview-bg-black-50-override); border-radius:10px; padding:20px 15px; text-align:center; transition:all .3s ease; width:200px; height:180px; display:flex; flex-direction:column; justify-content:center; align-items:center;}\\n";
  fullTsx += "      .skills-section-futuristic-tsx .skill-item-inner-futuristic-tsx:hover {background-color:var(--preview-skin-color) !important;}\\n";
  fullTsx += "      .skills-section-futuristic-tsx .skill-item-inner-futuristic-tsx .icon-futuristic-tsx {height:50px; width:50px; border-radius:50%; display:flex; margin:0 auto 20px; align-items:center; justify-content:center; transition:all .3s ease;}\\n";
  fullTsx += "      .skills-section-futuristic-tsx .skill-item-inner-futuristic-tsx .icon-futuristic-tsx .lucide-icon {color:var(--preview-skin-color) !important; font-size:30px; transition:all .3s ease; width:30px; height:30px;}\\n"; // Lucide icon styling
  fullTsx += "      .skills-section-futuristic-tsx .skill-item-inner-futuristic-tsx:hover .icon-futuristic-tsx .lucide-icon {color: var(--preview-accent-text-contrast) !important; width:25px; height:25px;}\\n";
  fullTsx += "      .skills-section-futuristic-tsx .skill-item-inner-futuristic-tsx h4 {font-size:16px; margin-bottom:10px; color:var(--preview-content-text-900-override); font-weight:700; text-transform:capitalize;}\\n";
  fullTsx += "      .skills-section-futuristic-tsx .skill-item-inner-futuristic-tsx:hover h4 {color: var(--preview-accent-text-contrast) !important;}\\n";
  fullTsx += "      .projects-section-futuristic-tsx .projects-heading-futuristic-tsx {flex-basis:100%; max-width:100%; margin-bottom:40px;}\\n";
  fullTsx += "      .projects-section-futuristic-tsx .projects-heading-futuristic-tsx h2 {color:var(--preview-content-text-900-override); font-weight:500;}\\n";
  fullTsx += "      .projects-section-futuristic-tsx .project-item-futuristic-tsx {flex-basis:calc(33.33% - 30px); max-width:calc(33.33% - 30px); margin:0 15px 30px 15px; text-align:center;}\\n";
  fullTsx += "      .projects-section-futuristic-tsx .project-item-inner-futuristic-tsx {border:6px solid var(--preview-bg-black-100-override); border-radius:10px; overflow:hidden; cursor:pointer; display:inline-block;}\\n";
  fullTsx += "      .projects-section-futuristic-tsx .project-item-inner-futuristic-tsx .project-img-futuristic-tsx img {width:100%; display:block; max-height:200px; object-fit:cover; transition:all .3s ease;}\\n";
  fullTsx += "      .projects-section-futuristic-tsx .project-item-inner-futuristic-tsx:hover .project-img-futuristic-tsx img {transform:scale(1.1);}\\n";
  fullTsx += "      .projects-section-futuristic-tsx .project-item-futuristic-tsx .project-details-futuristic-tsx {padding:10px 0;}\\n";
  fullTsx += "      .projects-section-futuristic-tsx .project-item-futuristic-tsx .project-details-futuristic-tsx h4 {font-size:16px; color:var(--preview-content-text-900-override); font-weight:600; margin-bottom:5px;}\\n";
  fullTsx += "      .projects-section-futuristic-tsx .project-item-futuristic-tsx .project-details-futuristic-tsx p {font-size:13px; color:var(--preview-content-text-700-override); margin-bottom:8px;}\\n";
  fullTsx += "      .projects-section-futuristic-tsx .project-item-futuristic-tsx .project-links-futuristic-tsx a {font-size:12px; padding:3px 8px; margin:0 2px; border-radius:3px; text-decoration:none; display:inline-flex; align-items:center; gap:3px;}\\n";
  fullTsx += "      .projects-section-futuristic-tsx .project-links-futuristic-tsx a.live-link-futuristic-tsx {background:var(--preview-skin-color); color: var(--preview-accent-text-contrast);}\\n";
  fullTsx += "      .projects-section-futuristic-tsx .project-links-futuristic-tsx a.code-link-futuristic-tsx {border:1px solid var(--preview-skin-color); color:var(--preview-skin-color);}\\n";
  fullTsx += "      .contact-section-futuristic-tsx .contact-info-item-futuristic-tsx {flex-basis:25%; max-width:25%; text-align:center; margin-bottom:30px; padding:0 15px;}\\n";
  fullTsx += "      .contact-section-futuristic-tsx .contact-info-item-futuristic-tsx .icon-futuristic-tsx { display: flex; justify-content:center; align-items:center; line-height:normal;}\\n";
  fullTsx += "      .contact-section-futuristic-tsx .contact-info-item-futuristic-tsx .icon-futuristic-tsx .lucide-icon {font-size:25px; color:var(--preview-skin-color); width:25px; height:25px;}\\n"; // Lucide icon styling
  fullTsx += "      .contact-section-futuristic-tsx .contact-info-item-futuristic-tsx h4 {font-size:18px; font-weight:700; color:var(--preview-content-text-900-override); text-transform:capitalize; margin:15px 0 5px;}\\n";
  fullTsx += "      .contact-section-futuristic-tsx .contact-info-item-futuristic-tsx p, .contact-section-futuristic-tsx .contact-info-item-futuristic-tsx a {font-size:16px; line-height:25px; color:var(--preview-content-text-700-override); font-weight:400; word-break:break-all; text-decoration:none;}\\n";
  fullTsx += "      .contact-section-futuristic-tsx .contact-info-item-futuristic-tsx a:hover {color: var(--preview-skin-color);}\\n";
  fullTsx += "      @media (max-width:1199px){ .aside-futuristic-tsx {left:-270px !important;} .main-content-futuristic-tsx {left:0 !important; width:100% !important; padding-left:0 !important;} .nav-toggler-futuristic-tsx {display:flex !important; left:15px !important;} .aside-futuristic-tsx.open {left:0 !important;} .nav-toggler-futuristic-tsx.open {left:300px !important;} .main-content-futuristic-tsx.open {left:270px !important; width:calc(100% - 270px) !important;} }\\n";
  fullTsx += "      @media (max-width:991px){ .contact-section-futuristic-tsx .contact-info-item-futuristic-tsx, .projects-section-futuristic-tsx .project-item-futuristic-tsx, .skills-section-futuristic-tsx .skill-item-futuristic-tsx {flex-basis:50% !important;max-width:50% !important;} .home-section-futuristic-tsx .home-info-futuristic-tsx {flex-basis:100% !important; max-width:100% !important; text-align:center !important; order:2 !important;} .home-section-futuristic-tsx .home-img-futuristic-tsx {display:block !important; flex-basis:100% !important; max-width:100% !important; margin-bottom:20px !important; order:1 !important; padding-left:0 !important; justify-content:center;} .home-section-futuristic-tsx .home-img-futuristic-tsx img {margin:0 auto;} .home-section-futuristic-tsx .home-img-futuristic-tsx::before, .home-section-futuristic-tsx .home-img-futuristic-tsx::after {left:50%; transform:translateX(-50%);} }\\n";
  fullTsx += "      @media (max-width:767px){ .section-futuristic-tsx {padding:0 15px !important;} .contact-section-futuristic-tsx .contact-info-item-futuristic-tsx, .projects-section-futuristic-tsx .project-item-futuristic-tsx, .skills-section-futuristic-tsx .skill-item-futuristic-tsx, .about-section-futuristic-tsx .education-futuristic-tsx, .about-section-futuristic-tsx .experience-futuristic-tsx, .about-section-futuristic-tsx .personal-info-futuristic-tsx .info-item-futuristic-tsx {flex-basis:100% !important; max-width:100% !important;} .about-section-futuristic-tsx .skills-futuristic-tsx {flex-basis:100% !important; max-width:100% !important;} }\\n";
  fullTsx += "      .section-futuristic-tsx.section-on-content-bg { background-color: var(--preview-content-bg-override) !important; }\\n"; // For lighter bg sections
  fullTsx += "      .section-futuristic-tsx.section-on-main-bg { background-color: var(--preview-main-bg) !important; }\\n"; // For darker bg sections
  fullTsx += "      /* Loader specific styles */\\n";
  fullTsx += "      .loader-futuristic-tsx { display:flex; align-items:center; justify-content:center; position:fixed; left:0; top:0; height:100%; width:100%; background:var(--preview-main-bg); z-index:9999; transition: opacity 0.6s ease-in-out, visibility 0.6s ease-in-out; opacity: 1; visibility: visible; }\\n";
  fullTsx += "      .loader-futuristic-tsx.loaded { opacity: 0; visibility: hidden; display:none; }\\n";
  fullTsx += "      .loader-futuristic-tsx .logo-futuristic-tsx { font-size:50px; color: var(--preview-skin-color); font-family:'Clicker Script', cursive; animation: fadeInLoaderFuturistic 0.6s 1; animation-fill-mode: both; }\\n";
  fullTsx += "      @keyframes fadeInLoaderFuturistic { from { opacity:0; } to { opacity:1; } }\\n";
  fullTsx += "    `}</style>\\n";
  fullTsx += "  );\\n";
  fullTsx += "\\n";

  // Start of component return
  fullTsx += "  const [activeSection, setActiveSection] = useState(\"home\");\\n";
  fullTsx += "  const [isAsideOpen, setIsAsideOpen] = useState(false);\\n";
  fullTsx += "  const [isPageLoaded, setIsPageLoaded] = useState(false);\\n";
  fullTsx += "  const mainContentRef = useRef<HTMLDivElement>(null);\\n";
  fullTsx += "  const sectionRefs: Record<string, React.RefObject<HTMLElement>> = {\\n";
  fullTsx += "    home: useRef<HTMLElement>(null),\\n";
  fullTsx += "    about: useRef<HTMLElement>(null),\\n";
  fullTsx += "    skills: useRef<HTMLElement>(null),\\n";
  fullTsx += "    projects: useRef<HTMLElement>(null),\\n";
  fullTsx += "    contact: useRef<HTMLElement>(null),\\n";
  fullTsx += "  };\\n";
  fullTsx += "  const typedHeroRef = useRef(null);\\n";
  fullTsx += "\\n";
  fullTsx += "  const navLinks = [\\n";
  fullTsx += "    { id: 'home', label: 'Home', icon: HomeIcon, condition: true },\\n";
  fullTsx += "    { id: 'about', label: 'About', icon: UserIcon, condition: showAboutSection },\\n";
  fullTsx += "    { id: 'skills', label: 'Skills', icon: LayersIcon, condition: showSkillsSection },\\n"; 
  fullTsx += "    { id: 'projects', label: 'Projects', icon: BriefcaseIcon, condition: showProjectsSection },\\n"; 
  fullTsx += "    { id: 'contact', label: 'Contact', icon: MessageSquareIcon, condition: showContactSection },\\n";
  fullTsx += "  ];\\n";
  fullTsx += "\\n";
  fullTsx += "  useEffect(() => {\\n";
  fullTsx += "    const timer = setTimeout(() => setIsPageLoaded(true), 500);\\n";
  fullTsx += "    if (typeof Typed !== 'undefined' && typedHeroRef.current && heroTitle && typeof heroTitle === 'string') {\\n";
  fullTsx += "      const titles = heroTitle.split(',').map(s => s.trim()).filter(s => s);\\n";
  fullTsx += "      const typedInstance = new Typed(typedHeroRef.current, {\\n";
  fullTsx += "        strings: titles.length > 0 ? titles : ['Futuristic Professional'],\\n";
  fullTsx += "        typeSpeed: 70, backSpeed: 50, loop: true\\n";
  fullTsx += "      });\\n";
  fullTsx += "      return () => { clearTimeout(timer); typedInstance.destroy(); };\\n";
  fullTsx += "    } else if (typeof Typed !== 'undefined' && typedHeroRef.current) {\\n";
  fullTsx += "        const typedInstance = new Typed(typedHeroRef.current, { strings: ['Professional'], typeSpeed: 70, backSpeed: 50, loop: true });\\n";
  fullTsx += "        return () => { clearTimeout(timer); typedInstance.destroy(); };\\n";
  fullTsx += "    }\\n";
  fullTsx += "    return () => clearTimeout(timer);\\n";
  fullTsx += "  }, [heroTitle]);\\n";
  fullTsx += "\\n";
  fullTsx += "  const handleNavClick = (sectionId: string, e?: React.MouseEvent) => {\\n";
  fullTsx += "    e?.preventDefault();\\n";
  fullTsx += "    const targetSection = sectionRefs[sectionId as keyof typeof sectionRefs]?.current;\\n";
  fullTsx += "    if (targetSection && mainContentRef.current) {\\n";
  fullTsx += "      const navBarHeight = 0; \\n";
  fullTsx += "      mainContentRef.current.scrollTo({ top: targetSection.offsetTop - navBarHeight, behavior: 'smooth' });\\n";
  fullTsx += "      setActiveSection(sectionId);\\n";
  fullTsx += "    }\\n";
  fullTsx += "    if (isAsideOpen && typeof window !== 'undefined' && window.innerWidth < 1200) setIsAsideOpen(false);\\n";
  fullTsx += "  };\\n";
  fullTsx += "\\n";
  fullTsx += "  useEffect(() => {\\n";
  fullTsx += "    const currentMainContent = mainContentRef.current;\\n";
  fullTsx += "    const handleScroll = () => {\\n";
  fullTsx += "      if (!currentMainContent) return;\\n";
  fullTsx += "      let current = 'home';\\n";
  fullTsx += "      const scrollPosition = currentMainContent.scrollTop;\\n";
  fullTsx += "      const viewportHeight = currentMainContent.clientHeight;\\n";
  fullTsx += "      navLinks.filter(l => l.condition).forEach(link => {\\n";
  fullTsx += "        const section = sectionRefs[link.id]?.current;\\n";
  fullTsx += "        if (section && section.offsetTop <= scrollPosition + viewportHeight / 2.5 && section.offsetTop + section.offsetHeight > scrollPosition + viewportHeight / 3) {\\n";
  fullTsx += "          current = link.id;\\n";
  fullTsx += "        }\\n";
  fullTsx += "      });\\n";
  fullTsx += "      if (scrollPosition < 100) current = 'home';\\n";
  fullTsx += "      setActiveSection(current);\\n";
  fullTsx += "      // Toggle visibility of sections based on scroll (Conceptual AOS)\\n";
  fullTsx += "      Object.values(sectionRefs).forEach(ref => {\\n";
  fullTsx += "        const sectionEl = ref?.current;\\n";
  fullTsx += "        if (sectionEl) {\\n";
  fullTsx += "          const rect = sectionEl.getBoundingClientRect();\\n";
  fullTsx += "          const mainRect = currentMainContent.getBoundingClientRect();\\n";
  // Check if any part of the section is within the main content viewport
  fullTsx += "          if (rect.top < mainRect.bottom && rect.bottom > mainRect.top) {\\n";
  fullTsx += "            sectionEl.classList.add('active');\\n"; // Simulates AOS active
  fullTsx += "            sectionEl.style.opacity = '1';\\n";
  fullTsx += "            sectionEl.style.transform = 'translateX(0%)';\\n";
  fullTsx += "          } else { \\n";
  // Optional: re-hide if scrolled far away, but for this template's sequential reveal,
  // once active, it stays active to avoid content jumping during scroll.
  // If you want them to re-hide, you'd need more complex logic or a proper AOS lib.
  fullTsx += "          }\\n";
  fullTsx += "        }\\n";
  fullTsx += "      });\\n";
  fullTsx += "    };\\n";
  fullTsx += "    currentMainContent?.addEventListener('scroll', handleScroll, { passive: true });\\n";
  fullTsx += "    if (isPageLoaded && currentMainContent) { handleScroll(); currentMainContent.querySelector<HTMLElement>('#home')?.classList.add('active'); }\\n";
  fullTsx += "    return () => {\\n";
  fullTsx += "      if (currentMainContent) currentMainContent.removeEventListener('scroll', handleScroll);\\n";
  fullTsx += "    };\\n";
  fullTsx += "  }, [navLinks, sectionRefs, mainContentRef, isPageLoaded]);\\n";
  fullTsx += "\\n";
  fullTsx += "  useEffect(() => {\\n";
  fullTsx += "    const mainContentEl = mainContentRef.current;\\n";
  fullTsx += "    const asideEl = document.querySelector('.aside-futuristic-tsx') as HTMLElement | null;\\n";
  fullTsx += "    const navTogglerEl = document.querySelector('.nav-toggler-futuristic-tsx') as HTMLElement | null;\\n";
  fullTsx += "    const adjustLayout = () => {\\n";
  fullTsx += "      if (window.innerWidth < 1200) {\\n";
  fullTsx += "        if (navTogglerEl) navTogglerEl.style.display = 'flex';\\n";
  fullTsx += "        if (asideEl && !asideEl.classList.contains('open')) asideEl.style.left = '-270px';\\n";
  fullTsx += "        if (mainContentEl && !mainContentEl.classList.contains('open')) { mainContentEl.style.left = '0'; mainContentEl.style.width = '100%'; }\\n";
  fullTsx += "      } else {\\n";
  fullTsx += "        if (navTogglerEl) navTogglerEl.style.display = 'none';\\n";
  fullTsx += "        if (asideEl) { asideEl.style.left = '0'; asideEl.classList.remove('open'); }\\n"; // Keep aside visible on desktop
  fullTsx += "        if (mainContentEl) { mainContentEl.style.left = '270px'; mainContentEl.style.width = 'calc(100% - 270px)'; mainContentEl.classList.remove('open'); }\\n";
  fullTsx += "      }\\n";
  fullTsx += "    };\\n";
  fullTsx += "    window.addEventListener('resize', adjustLayout);\\n";
  fullTsx += "    adjustLayout(); // Initial call\\n";
  fullTsx += "    return () => window.removeEventListener('resize', adjustLayout);\\n";
  fullTsx += "  }, [isAsideOpen]);\\n";
  fullTsx += "\\n";

  // Helper for Skill Bars
  fullTsx += "  const renderSkillbar = (skillName: string, percentageStr: string | undefined, index: number) => {\\n";
  fullTsx += "    const percentage = parseInt(percentageStr || '75', 10);\\n";
  fullTsx += "    const [animatedWidth, setAnimatedWidth] = useState('0%');\\n";
  fullTsx += "    useEffect(() => { if (isPageLoaded) { const skillBarTimer = setTimeout(() => setAnimatedWidth(percentage + '%'), 100 * index + 500); return () => clearTimeout(skillBarTimer); } }, [isPageLoaded, percentage, index]);\\n";
  fullTsx += "    return (\\n";
  fullTsx += "      <div key={`skillbar-${index}`} className='skill-item-futuristic-tsx padd-15-tsx'>\\n";
  fullTsx += "        <h5 style={{color: 'var(--preview-content-text-900-override)'}}>{skillName}</h5>\\n";
  fullTsx += "        <div className='progress-futuristic-tsx' style={{backgroundColor: 'var(--preview-bg-black-50-override)'}}>\\n";
  fullTsx += "          <div className='progress-in-futuristic-tsx' style={{ width: animatedWidth, backgroundColor: 'var(--preview-skin-color)' }}></div>\\n";
  fullTsx += "          <div className='skill-percent-futuristic-tsx' style={{color: 'var(--preview-content-text-900-override)'}}>{percentage}%</div>\\n";
  fullTsx += "        </div>\\n";
  fullTsx += "      </div>\\n";
  fullTsx += "    );\\n";
  fullTsx += "  };\\n";
  fullTsx += "  const skillsListForBars = (showSkillsSection && aboutSkills) ? aboutSkills.split(',').map(s => { const p = s.split(':'); return { name: p[0]?.trim(), percentage: p[1]?.trim() }; }).filter(s => s.name) : [];\\n";
  fullTsx += "\\n";

  // Helper for Academic/Experience Timeline Items
  fullTsx += "  const renderTimelineItem = (item: AcademicEntryType | ProjectType, type: 'academic' | 'project', index: number) => {\\n";
  fullTsx += "    const isAcademic = type === 'academic';\\n";
  fullTsx += "    const dataItem = item as any; // To access common fields or type-specific ones\n";
  fullTsx += "    const title = isAcademic ? dataItem.qualification : dataItem.name;\n";
  fullTsx += "    const subtitle = isAcademic ? dataItem.institution : dataItem.technologies;\n";
  fullTsx += "    const dateOrDuration = isAcademic ? dataItem.graduationYear : (dataItem.technologies || 'N/A'); // Using technologies for project duration/role placeholder\n";
  fullTsx += "    const description = dataItem.description;\n";
  fullTsx += "    const grades = isAcademic ? dataItem.grades : null;\n";
  fullTsx += "    return (\n";
  fullTsx += "      <div key={`${type}-${index}`} className='timeline-item-futuristic-tsx'>\\n";
  fullTsx += "        <div className='circle-dot-futuristic-tsx'></div>\\n";
  fullTsx += "        <h3 className='timeline-date-futuristic-tsx'><CalendarDays className='lucide-icon' size={14}/> {dateOrDuration}</h3>\\n";
  fullTsx += "        <h4 className='timeline-title-futuristic-tsx'>{title} {subtitle && `- ${subtitle}`}</h4>\\n";
  fullTsx += "        {grades && <p className='timeline-text-futuristic-tsx text-xs italic mb-1'>Grades: {grades}</p>}\\n";
  fullTsx += "        {description && <p className='timeline-text-futuristic-tsx' dangerouslySetInnerHTML={{ __html: (description || '').replace(/\\n/g, \"<br/>\") }}/>}\\n";
  fullTsx += "      </div>\\n";
  fullTsx += "    );\n";
  fullTsx += "  };\n";
  fullTsx += "\\n";

  // Helper for Project Portfolio Items
  fullTsx += "  const renderProjectItem = (projectItem: ProjectType | undefined, index: number) => {\\n";
  fullTsx += "    if (!projectItem || !projectItem.name) return null;\\n";
  fullTsx += "    const itemClass = index % 3 === 0 ? 'col-span-12 lg:col-span-8' : (index % 3 === 1 ? 'col-span-12 sm:col-span-6 lg:col-span-4' : 'col-span-12 sm:col-span-6 lg:col-span-4');\\n";
  fullTsx += "    const imageHeight = index % 3 === 0 ? 'h-[350px] md:h-[400px]' : 'h-[280px] md:h-[320px]';\\n";
  fullTsx += "    return (\\n";
  fullTsx += "      <figure key={`project-${index}`} className={`group relative overflow-hidden rounded-xl shadow-2xl border-2 ${itemClass}`} style={{borderColor: css_skin_color + 'AA'}}>\n";
  fullTsx += "        <div className='relative w-full overflow-hidden'>\n";
  fullTsx += "            <Image src={projectItem.imageUrl || 'https://placehold.co/600x400.png?text=Project&font=orbitron'} alt={projectItem.name} width={600} height={400} className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageHeight}`} data-ai-hint=\"project app futuristic\"/>\n";
  fullTsx += "        </div>\n";
  fullTsx += "          <figcaption className='absolute inset-0 bg-black/70 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end'>\n";
  fullTsx += "            <h4 className='text-lg font-semibold mb-1 font-poppins'>{projectItem.name}</h4>\n";
  fullTsx += "            {projectItem.description && <p className='text-xs opacity-80 mb-2 leading-snug font-roboto' dangerouslySetInnerHTML={{ __html: (projectItem.description || '').replace(/\\n/g, '<br/>')}}/>}\n";
  fullTsx += "            {projectItem.technologies && <p className='text-[10px] opacity-70 mb-2 font-roboto'>Tech: {projectItem.technologies}</p>}\n";
  fullTsx += "            <div className='flex gap-2 mt-auto'>\n";
  fullTsx += "              {projectItem.liveUrl && <a href={projectItem.liveUrl} target='_blank' rel='noopener noreferrer' className='text-[10px] px-2 py-1 rounded-sm hover:opacity-80 transition-opacity flex items-center' style={{backgroundColor: css_skin_color, color: calculatedAccentContrast}}><ExternalLink size={10} className='lucide-icon mr-1'/>Live Site</a>}\n";
  fullTsx += "              {projectItem.repoUrl && <a href={projectItem.repoUrl} target='_blank' rel='noopener noreferrer' className='text-[10px] px-2 py-1 rounded-sm border hover:opacity-80 transition-opacity flex items-center' style={{borderColor: css_skin_color, color: css_skin_color}}><Github size={10} className='lucide-icon mr-1'/>View Code</a>}\n";
  fullTsx += "            </div>\n";
  fullTsx += "          </figcaption>\n";
  fullTsx += "      </figure>\n";
  fullTsx += "    );\n";
  fullTsx += "  };\n";
  fullTsx += "\\n";
  
  fullTsx += "  const logoFirstName = yourName ? yourName.charAt(0).toUpperCase() : 'P';\\n";
  fullTsx += "  const logoLastName = yourName ? yourName.substring(1).toLowerCase() : 'ortfolio';\\n";
  fullTsx += "\\n";

  fullTsx += "  return (\n";
  fullTsx += "    <>\n";
  fullTsx += "      <Head>\n";
  fullTsx += "        <title>{yourName} - Futuristic Portfolio</title>\n";
  fullTsx += "        <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n";
  fullTsx += "        <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossOrigin=\"anonymous\" />\n";
  fullTsx += "        <link href=\"https://fonts.googleapis.com/css2?family=Clicker+Script&family=Poppins:wght@200;300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=IBMPlexSans:wght@300;400;500;600;700&display=swap\" rel=\"stylesheet\" />\n";
  fullTsx += "        <script src=\"https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js\" referrerPolicy=\"no-referrer\" async></script>\n";
  fullTsx += "      </Head>\n";
  fullTsx += "      {dynamicGlobalStyles}\n"; // Render the global styles defined above
  fullTsx += "\n";
  fullTsx += "      {!isPageLoaded && (\n";
  fullTsx += "        <div className='loader-futuristic-tsx'>\n";
  fullTsx += "          <div className='logo-futuristic-tsx'>{logoFirstName}</div>\n";
  fullTsx += "        </div>\n";
  fullTsx += "      )}\n";
  fullTsx += "\n";
  fullTsx += "      <div className={`aside-futuristic-tsx ${isAsideOpen ? 'open' : ''} font-poppins`}>\n";
  fullTsx += "        <div className='logo-futuristic-tsx'>\n";
  fullTsx += "          <a href='#home' onClick={(e) => handleNavClick('home', e)} style={{color: 'var(--preview-main-text)'}}><span style={{color:'var(--preview-skin-color)'}}>{logoFirstName}</span>{logoLastName}</a>\n";
  fullTsx += "        </div>\n";
  fullTsx += "        <ul className='nav-futuristic-tsx'>\n";
  fullTsx += "          {navLinks.filter(link => link.condition).map(item => (\n";
  fullTsx += "            <li key={item.id}>\n";
  fullTsx += "              <a href={`#${item.id}`} onClick={(e) => handleNavClick(item.id, e)} className={`${activeSection === item.id ? 'active' : ''} text-[color:var(--preview-main-text)]`}>\n";
  fullTsx += "                <item.icon size={18} className='lucide-icon' /> {item.label}\n";
  fullTsx += "              </a>\n";
  fullTsx += "            </li>\n";
  fullTsx += "          ))}\n";
  fullTsx += "        </ul>\n";
  fullTsx += "      </div>\n";
  fullTsx += "\n";
  fullTsx += "      <button \n";
  fullTsx += "        className={`nav-toggler-futuristic-tsx ${isAsideOpen ? 'open' : ''}`}\n";
  fullTsx += "        onClick={() => setIsAsideOpen(!isAsideOpen)}\n";
  fullTsx += "        aria-label='Toggle navigation'\n";
  fullTsx += "      >\n";
  fullTsx += "        <span></span>\n";
  fullTsx += "      </button>\n";
  fullTsx += "\n";
  fullTsx += "      <div ref={mainContentRef} className={`main-content-futuristic-tsx ${isAsideOpen && typeof window !== 'undefined' && window.innerWidth < 1200 ? 'open' : ''} font-poppins`}>\n";
  
  // Home Section
  fullTsx += "        <section ref={el => {if(el) sectionRefs.current['home'] = el}} id='home' className='home-section-futuristic-tsx section-futuristic-tsx section-on-main-bg active'>\n";
  fullTsx += "          <div className='container-futuristic-tsx'>\n";
  fullTsx += "            <div className='row-futuristic-tsx'>\n";
  fullTsx += "              <div className='home-info-futuristic-tsx padd-15-tsx'>\n";
  fullTsx += "                <h3 className='hello-futuristic-tsx'>Hello, my name is <span className='name-futuristic-tsx'>{yourName}</span></h3>\n";
  fullTsx += "                <h3 className='my-profession-futuristic-tsx'>I&apos;m a <span ref={typedHeroRef} className='typing-futuristic-tsx'></span></h3>\n";
  fullTsx += "                {heroTagline && <p dangerouslySetInnerHTML={{ __html: (heroTagline || '').replace(/\\n/g, '<br/>')}}/>}\n";
  fullTsx += "                {showResumeLink && resumeUrl && (<a href={resumeUrl} target='_blank' rel='noopener noreferrer' className='btn-futuristic-tsx'><DownloadIcon size={16} className='lucide-icon inline mr-2'/>Download CV</a>)}\n";
  fullTsx += "              </div>\n";
  fullTsx += "              {heroImagePlaceholder && (\n";
  fullTsx += "                <div className='home-img-futuristic-tsx padd-15-tsx'>\n";
  fullTsx += "                  <Image src={heroImagePlaceholder} alt={yourName || 'Hero Image'} width={350} height={350} className='shadow-dark-futuristic-tsx' data-ai-hint='futuristic portrait tech person' priority/>\n";
  fullTsx += "                </div>\n";
  fullTsx += "              )}\n";
  fullTsx += "            </div>\n";
  fullTsx += "          </div>\n";
  fullTsx += "        </section>\n";
  fullTsx += "\n";

  // About Section
  fullTsx += "        {showAboutSection && (\n";
  fullTsx += "          <section ref={el => {if(el) sectionRefs.current['about'] = el}} id='about' className='about-section-futuristic-tsx section-futuristic-tsx section-on-content-bg'>\n";
  fullTsx += "            <div className='container-futuristic-tsx'>\n";
  fullTsx += "              <div className='row-futuristic-tsx'><div className='section-title-futuristic-tsx padd-15-tsx section-title-on-content-bg'><h2>About Me</h2></div></div>\n";
  fullTsx += "              <div className='row-futuristic-tsx'>\n";
  fullTsx += "                <div className='about-content-futuristic-tsx padd-15-tsx'>\n";
  fullTsx += "                  <div className='row-futuristic-tsx'>\n";
  fullTsx += "                    <div className='about-text-futuristic-tsx padd-15-tsx'>\n";
  fullTsx += "                      <h3>I&apos;m {yourName} and <span>{heroTitle ? heroTitle.split(',')[0].trim() : 'a Professional'}</span></h3>\n";
  fullTsx += "                      {aboutBio && <p dangerouslySetInnerHTML={{ __html: (aboutBio || '').replace(/\\n/g, \"<br/>\") }}/>}\n";
  fullTsx += "                    </div>\n";
  fullTsx += "                  </div>\n";
  fullTsx += "                  <div className='row-futuristic-tsx'>\n";
  fullTsx += "                    <div className='personal-info-futuristic-tsx padd-15-tsx'>\n";
  fullTsx += "                      <div className='row-futuristic-tsx'>\n";
  fullTsx += "                        {contactEmail && <div className='info-item-futuristic-tsx padd-15-tsx'><p>Email : <span>{contactEmail}</span></p></div>}\n";
  // Add other personal info if available from form
  fullTsx += "                      </div>\n";
  fullTsx += "                      <div className='row-futuristic-tsx'>\n";
  fullTsx += "                        <div className='buttons-futuristic-tsx padd-15-tsx'>\n";
  fullTsx += "                           {showContactSection && <a href='#contact' onClick={(e) => handleNavClick('contact', e)} className='btn-futuristic-tsx'>Hire Me</a>}\n";
  fullTsx += "                        </div>\n";
  fullTsx += "                      </div>\n";
  fullTsx += "                    </div>\n";
  fullTsx += "                    {showSkillsSection && skillsListForBars.length > 0 && (\n";
  fullTsx += "                       <div className='skills-futuristic-tsx padd-15-tsx'>\n";
  fullTsx += "                         <div className='row-futuristic-tsx'>\n";
  fullTsx += "                           {skillsListForBars.map((skill, idx) => renderSkillbar(skill.name, skill.percentage, idx))}\n";
  fullTsx += "                         </div>\n";
  fullTsx += "                       </div>\n";
  fullTsx += "                    )}\n";
  fullTsx += "                  </div>\n";
  fullTsx += "                  {showAcademicSection && academicEntries.filter(e => e && e.qualification).length > 0 && (\n";
  fullTsx += "                     <div className='row-futuristic-tsx'>\n";
  fullTsx += "                       <div className='education-futuristic-tsx padd-15-tsx'>\n";
  fullTsx += "                         <h3 className='title-futuristic-tsx'>Education</h3>\n";
  fullTsx += "                         <div className='row-futuristic-tsx'><div className='timeline-box-futuristic-tsx padd-15-tsx'><div className='timeline-futuristic-tsx shadow-dark-futuristic-tsx'>\n";
  fullTsx += "                           {academicEntries.filter(e => e && e.qualification).map((entry, idx) => renderTimelineItem(entry, 'academic', idx))}\n";
  fullTsx += "                         </div></div></div>\n";
  fullTsx += "                       </div>\n";
  // Experience from Projects (simplified)
  fullTsx += "                       {projects.filter(p => p && p.name).length > 0 && (\n";
  fullTsx += "                         <div className='experience-futuristic-tsx padd-15-tsx'>\n";
  fullTsx += "                           <h3 className='title-futuristic-tsx'>Experience / Projects</h3>\n";
  fullTsx += "                           <div className='row-futuristic-tsx'><div className='timeline-box-futuristic-tsx padd-15-tsx'><div className='timeline-futuristic-tsx shadow-dark-futuristic-tsx'>\n";
  fullTsx += "                             {projects.filter(p => p && p.name).map((project, idx) => renderTimelineItem(project, 'project', idx))}\n";
  fullTsx += "                           </div></div></div>\n";
  fullTsx += "                         </div>\n";
  fullTsx += "                       )}\n";
  fullTsx += "                     </div>\n";
  fullTsx += "                  )}\n";
  fullTsx += "                </div>\n";
  fullTsx += "              </div>\n";
  fullTsx += "            </div>\n";
  fullTsx += "          </section>\n";
  fullTsx += "        )}\n";
  fullTsx += "\n";

  // Skills Section (formerly Services)
  fullTsx += "        {showSkillsSection && skillsListForBars.length > 0 && (\n";
  fullTsx += "          <section ref={el => {if(el) sectionRefs.current['skills'] = el}} id='skills' className='skills-section-futuristic-tsx section-futuristic-tsx section-on-content-bg'>\n";
  fullTsx += "            <div className='container-futuristic-tsx'>\n";
  fullTsx += "              <div className='row-futuristic-tsx'><div className='section-title-futuristic-tsx padd-15-tsx section-title-on-content-bg'><h2>My Skills</h2></div></div>\n";
  fullTsx += "              <div className='row-futuristic-tsx skill-item-container-futuristic-tsx'>\n";
  fullTsx += "                {skillsListForBars.map((skill, index) => (\n";
  fullTsx += "                  <div key={`skill-${index}`} className='skill-item-futuristic-tsx'>\n";
  fullTsx += "                    <div className='skill-item-inner-futuristic-tsx shadow-dark-futuristic-tsx'>\n";
  fullTsx += "                      <div className='icon-futuristic-tsx'><LayersIcon className='lucide-icon'/></div>\n";
  fullTsx += "                      <h4>{skill.name}</h4>\n";
  // Optional: Can add a placeholder description if needed for consistency
  fullTsx += "                    </div>\n";
  fullTsx += "                  </div>\n";
  fullTsx += "                ))}\n";
  fullTsx += "              </div>\n";
  fullTsx += "            </div>\n";
  fullTsx += "          </section>\n";
  fullTsx += "        )}\n";
  fullTsx += "\n";
  
  // Projects Section (Portfolio)
  fullTsx += "        {showProjectsSection && projects.filter(p => p && p.name).length > 0 && (\n";
  fullTsx += "          <section ref={el => {if(el) sectionRefs.current['projects'] = el}} id='projects' className='projects-section-futuristic-tsx section-futuristic-tsx section-on-content-bg'>\n";
  fullTsx += "            <div className='container-futuristic-tsx'>\n";
  fullTsx += "              <div className='row-futuristic-tsx'><div className='section-title-futuristic-tsx padd-15-tsx section-title-on-content-bg'><h2>My Projects</h2></div></div>\n";
  fullTsx += "              <div className='row-futuristic-tsx'><div className='projects-heading-futuristic-tsx padd-15-tsx'><h2>Selected Projects :</h2></div></div>\n";
  fullTsx += "              <div className='row-futuristic-tsx justify-center'>\n"; // Added justify-center
  fullTsx += "                {projects.filter(p => p && p.name).map((project, index) => renderProjectItem(project, index))}\n";
  fullTsx += "              </div>\n";
  fullTsx += "            </div>\n";
  fullTsx += "          </section>\n";
  fullTsx += "        )}\n";
  fullTsx += "\n";

  // Contact Section
  fullTsx += "        {showContactSection && (\n";
  fullTsx += "          <section ref={el => {if(el) sectionRefs.current['contact'] = el}} id='contact' className='contact-section-futuristic-tsx section-futuristic-tsx section-on-content-bg'>\n";
  fullTsx += "            <div className='container-futuristic-tsx'>\n";
  fullTsx += "              <div className='row-futuristic-tsx'><div className='section-title-futuristic-tsx padd-15-tsx section-title-on-content-bg'><h2>Contact Me</h2></div></div>\n";
  fullTsx += "              <h3 className='contact-title-futuristic-tsx padd-15-tsx font-semibold text-xl text-center mb-4' style={{color:'var(--preview-skin-color)'}}>Have Any Questions ?</h3>\n";
  fullTsx += "              <h4 className='contact-sub-title-futuristic-tsx padd-15-tsx font-medium text-lg text-center mb-10' style={{color:'var(--preview-content-text-900-override)'}}>I&apos;M VERY RESPONSIVE TO MESSAGES</h4>\n";
  fullTsx += "              <div className='row-futuristic-tsx justify-center'>\n"; // Center contact items
  fullTsx += "                {contactEmail && (<div className='contact-info-item-futuristic-tsx'><div className='icon-futuristic-tsx'><MailIcon className='lucide-icon'/></div><h4>Email</h4><p><a href={`mailto:${contactEmail}`}>{contactEmail}</a></p></div>)}\n";
  fullTsx += "                {contactLinkedin && (<div className='contact-info-item-futuristic-tsx'><div className='icon-futuristic-tsx'><Linkedin className='lucide-icon'/></div><h4>LinkedIn</h4><p><a href={contactLinkedin} target='_blank' rel='noopener noreferrer'>Profile</a></p></div>)}\n";
  fullTsx += "                {contactGithub && (<div className='contact-info-item-futuristic-tsx'><div className='icon-futuristic-tsx'><Github className='lucide-icon'/></div><h4>GitHub</h4><p><a href={contactGithub} target='_blank' rel='noopener noreferrer'>Profile</a></p></div>)}\n";
  fullTsx += "                {contactInstagram && (<div className='contact-info-item-futuristic-tsx'><div className='icon-futuristic-tsx'><InstagramIcon className='lucide-icon'/></div><h4>Instagram</h4><p><a href={contactInstagram} target='_blank' rel='noopener noreferrer'>Profile</a></p></div>)}\n";
  fullTsx += "              </div>\n";
  fullTsx += "              <footer className='text-center mt-16 pt-8 border-t' style={{borderColor: 'var(--preview-content-text-700-override)' + '33'}}>\n";
  fullTsx += "                <p className='text-xs opacity-80' style={{color: 'var(--preview-content-text-700-override)'}}>&copy; {new Date().getFullYear()} {yourName}. All Rights Reserved.</p>\n";
  fullTsx += "              </footer>\n";
  fullTsx += "            </div>\n";
  fullTsx += "          </section>\n";
  fullTsx += "        )}\n";
  fullTsx += "      </div>\n"; // End main-content
  fullTsx += "    </>\n";
  fullTsx += "  );\n";
  fullTsx += "};\n";
  fullTsx += "\n";
  fullTsx += "export default function GeneratedPage() {\n";
  fullTsx += "  const rawDataString = '" + escJsStr(JSON.stringify(data)) + "';\n"; // 'data' is from the outer template function
  fullTsx += "  const defaultErrorPropsFuturistic: FormSchemaType = " + JSON.stringify(defaultErrorProps) + ";\n";
  fullTsx += "  let propsToPass: FormSchemaType;\n";
  fullTsx += "  try {\n";
  fullTsx += "    const parsed = JSON.parse(rawDataString);\n";
  fullTsx += "    if (typeof parsed === 'object' && parsed !== null) {\n";
  fullTsx += "      propsToPass = { ...defaultErrorPropsFuturistic, ...parsed };\n";
  fullTsx += "      propsToPass.academicEntries = Array.isArray(parsed.academicEntries) ? parsed.academicEntries.map((entry: any) => ({...(defaultErrorPropsFuturistic.academicEntries && defaultErrorPropsFuturistic.academicEntries.length > 0 ? defaultErrorPropsFuturistic.academicEntries[0] : {}), ...entry})) : defaultErrorPropsFuturistic.academicEntries;\n";
  fullTsx += "      propsToPass.projects = Array.isArray(parsed.projects) ? parsed.projects.map((project: any) => ({...(defaultErrorPropsFuturistic.projects && defaultErrorPropsFuturistic.projects.length > 0 ? defaultErrorPropsFuturistic.projects[0] : {}), ...project})) : defaultErrorPropsFuturistic.projects;\n";
  fullTsx += "    } else {\n";
  fullTsx += "      propsToPass = defaultErrorPropsFuturistic;\n";
  fullTsx += "    }\n";
  fullTsx += "  } catch (e) {\n";
  fullTsx += "    console.error(\"Error parsing props in Futuristic Template GeneratedPage:\", e, \"\\\\nRaw data was:\", rawDataString);\n";
  fullTsx += "    propsToPass = defaultErrorPropsFuturistic;\n";
  fullTsx += "  }\n";
  fullTsx += "  return <" + siteNameClean + "PortfolioPage portfolioData={propsToPass} />;\n";
  fullTsx += "}\n";

  // --- PREVIEW HTML ---
  // Base CSS from reference files (inline style for preview)
  // Note: A full copy of these CSS files is very long. I'll include key structural and theming parts.
  // Actual functionality will depend on the full CSS being linked if this HTML were standalone.
  const baseCssFromReferencePreview = `
    /* Selected styles from references/css/style.css & responsive.css & color-1.css & loader-color-1.css */
    @import url("https://fonts.googleapis.com/css2?family=Clicker+Script&family=Poppins:wght@200;300;400;500;600;700&family=Roboto:wght@300;400;500;700&family=IBMPlexSans:wght@300;400;500;600;700&display=swap");
    /* Define CSS variables based on form input */
    :root {
      --skin-color: ${escCssVal(data.accentColor)};
      --bg-black-900: ${escCssVal(data.backgroundColor)};
      --bg-black-100: ${escCssVal(data.backgroundColor === '#0C0426' ? '#1f1c33' : `color-mix(in srgb, ${data.backgroundColor} 90%, ${getContrastColor(data.backgroundColor) === '#FFFFFF' ? 'black' : 'white'} 10%)`)}; /* Adjusted for dynamic bg */
      --bg-black-50: ${escCssVal(data.backgroundColor === '#0C0426' ? '#332c49' : `color-mix(in srgb, ${data.backgroundColor} 80%, ${getContrastColor(data.backgroundColor) === '#FFFFFF' ? 'black' : 'white'} 20%)`)};
      --text-black-900: ${escCssVal(getContrastColor(data.backgroundColor))};
      --text-black-700: ${escCssVal(getContrastColor(data.backgroundColor) === '#FFFFFF' ? `color-mix(in srgb, white 85%, ${data.backgroundColor} 15%)` : `color-mix(in srgb, black 70%, ${data.backgroundColor} 30%)`)};
      --content-bg-override: ${escCssVal(data.primaryColor)}; /* This is for the lighter section backgrounds */
      --text-black-900-content-override: ${escCssVal(getContrastColor(data.primaryColor))};
      --text-black-700-content-override: ${escCssVal(getContrastColor(data.primaryColor) === '#FFFFFF' ? `color-mix(in srgb, white 85%, ${data.primaryColor} 15%)` : `color-mix(in srgb, black 70%, ${data.primaryColor} 30%)`)};
    }
    body { line-height:1.5; font-size:16px; font-family: 'Poppins', sans-serif; overflow-x:hidden; background:var(--bg-black-900); color:var(--text-black-900); }
    body.dark-preview-futuristic { --bg-black-100: #222222 !important; --bg-black-50: #393939 !important; --text-black-900: #ffffff !important; --text-black-700: #e9e9e9 !important; --text-black-900-content-override: #ffffff !important; --text-black-700-content-override: #e9e9e9 !important;}
    .section-preview-futuristic { display:none; padding:0 15px; opacity:1; position:absolute; left:0; top:0; right:0; bottom:0; z-index:1; overflow-y:auto; overflow-x:hidden; min-height:100vh;}
    @media (min-width:1200px) {.section-preview-futuristic {padding:0 30px;}}
    .section-preview-futuristic.active { z-index:2; opacity:1; display:block; animation:slideSectionPreviewFuturistic 1s ease; }
    @keyframes slideSectionPreviewFuturistic {0%{transform:translateX(100%);} 100%{transform:translateX(0%);}}
    .padd-15-preview {padding-left:15px; padding-right:15px;}
    .container-preview-futuristic {max-width:1100px; width:100%; margin:auto;}
    .section-preview-futuristic .container-preview-futuristic {padding-top:60px; padding-bottom:70px;}
    .section-title-preview {flex-basis:100%; max-width:100%; margin-bottom:60px;}
    .section-title-preview h2 {font-size:40px; color:var(--text-black-900); font-weight:700; position:relative; font-family: 'Poppins', sans-serif;}
    .section-title-preview.on-content-bg h2 {color:var(--text-black-900-content-override) !important;}
    .section-title-preview h2::before {content:''; height:4px; width:50px; background-color:var(--skin-color); position:absolute; left:0; top:100%;}
    .section-title-preview h2::after {content:''; height:4px; width:25px; background-color:var(--skin-color); position:absolute; left:0; top:100%; margin-top:8px;}
    .row-preview {display:flex; flex-wrap:wrap; margin-left:-15px; margin-right:-15px; position:relative;}
    .btn-preview {font-size:16px; font-weight:500; padding:12px 35px; color:${escCssVal(getContrastColor(data.accentColor))}; border-radius:40px; display:inline-block; white-space:nowrap; border:none; background:var(--skin-color); transition:all .3s ease; text-decoration:none; }
    .btn-preview:hover {transform:scale(1.05);}
    .shadow-dark-preview {box-shadow:0 0 20px rgba(48,46,77,.15);}
    .aside-preview-futuristic {width:270px; background:var(--bg-black-100); position:fixed; left:-270px; top:0; padding:30px; height:100%; border-right:1px solid var(--bg-black-50); display:flex; justify-content:center; align-items:center; z-index:10; transition:all .3s ease; flex-direction:column;}
    .aside-preview-futuristic.open {left:0;}
    .aside-preview-futuristic .logo-preview a {font-size:30px; color:var(--text-black-900); font-weight:700; padding:15px 20px; font-family:'Clicker Script',cursive; text-decoration:none;}
    .aside-preview-futuristic .logo-preview a span {color:var(--skin-color);}
    .aside-preview-futuristic .nav-preview {margin-top:50px; width:100%;}
    .aside-preview-futuristic .nav-preview li {margin-bottom:20px; display:block;}
    .aside-preview-futuristic .nav-preview li a {font-size:16px; font-weight:600; display:flex; align-items:center; gap:15px; border-bottom:1px solid var(--bg-black-50); color:var(--text-black-900); padding:5px 15px; text-decoration:none; transition: all 0.3s ease;}
    .aside-preview-futuristic .nav-preview li a.active {color:var(--skin-color) !important;}
    .aside-preview-futuristic .nav-preview li a:hover {color:var(--skin-color) !important;}
    .nav-toggler-preview-futuristic {height:40px; width:45px; border:1px solid var(--bg-black-50); cursor:pointer; position:fixed; left:30px; top:20px; border-radius:5px; background:var(--bg-black-100); display:none; justify-content:center; align-items:center; transition:all .3s ease; z-index:1001;}
    .nav-toggler-preview-futuristic.open {left:300px;}
    .nav-toggler-preview-futuristic span {height:2px; width:18px; background:var(--skin-color); display:inline-block; position:relative;}
    .nav-toggler-preview-futuristic.open span {background-color:transparent;}
    .nav-toggler-preview-futuristic span::before {content:''; height:2px; width:18px; background:var(--skin-color); position:absolute; top:-6px; left:0;}
    .nav-toggler-preview-futuristic.open span::before {transform:rotate(45deg); top:0;}
    .nav-toggler-preview-futuristic span::after {content:''; height:2px; width:18px; background:var(--skin-color); position:absolute; top:6px; left:0;}
    .nav-toggler-preview-futuristic.open span::after {transform:rotate(-45deg); top:0;}
    .main-content-preview-futuristic {min-height:100vh; display:block; padding: 0px; opacity:1; position:fixed; left:0; top: 0; right: 0; bottom: 0; overflow-y:auto; overflow-x:hidden; background:var(--bg-black-900); z-index:0; transition:all .3s ease; width:100%;}
    @media (min-width:1200px){ .main-content-preview-futuristic { left:270px; width:calc(100% - 270px);}}
    .main-content-preview-futuristic.open {left: 270px; width: calc(100% - 270px); }
    .home-preview-futuristic {min-height:100vh; display:flex; color:var(--text-black-900); align-items:center;}
    .home-preview-futuristic .home-info-preview {flex-basis:60%; max-width:60%;}
    .home-preview-futuristic .home-info-preview .hello-preview {font-size:28px; margin:15px 0;}
    .home-preview-futuristic .home-info-preview .hello-preview span.name-preview {font-family:'Clicker Script',cursive; font-size:30px; font-weight:700; color:var(--skin-color);}
    .home-preview-futuristic .home-info-preview .my-profession-preview {font-size:30px; margin:15px 0;}
    .home-preview-futuristic .home-info-preview .typing-preview {color:var(--skin-color);}
    .home-preview-futuristic .home-info-preview p {margin-bottom:70px; font-size:20px; color:var(--text-black-700); line-height:1.7;}
    .home-preview-futuristic .home-img-preview {flex-basis:40%; max-width:40%; text-align:center; position:relative;}
    .home-preview-futuristic .home-img-preview::before {content:''; position:absolute; height:80px; width:80px; border-left:10px solid var(--skin-color); border-top:10px solid var(--skin-color); left:20px; top:-40px;}
    .home-preview-futuristic .home-img-preview::after {content:''; position:absolute; height:80px; width:80px; border-right:10px solid var(--skin-color); border-bottom:10px solid var(--skin-color); right:20px; bottom:-40px;}
    .home-preview-futuristic .home-img-preview img {height:350px; width:auto; max-width:100%; margin:auto; border-radius:5px; object-fit:cover;}
    /* About Section */
    .about-preview-futuristic .about-content-preview {flex-basis:100%; max-width:100%;}
    .about-preview-futuristic .about-content-preview .about-text-preview {flex-basis:100%; max-width:100%;}
    .about-preview-futuristic .about-content-preview .about-text-preview h3 {font-size:24px; margin-bottom:15px; font-weight:700; color:var(--text-black-900-content-override); }
    .about-preview-futuristic .about-content-preview .about-text-preview h3 span {color:var(--skin-color);}
    .about-preview-futuristic .about-content-preview .about-text-preview p {font-size:16px; line-height:25px; color:var(--text-black-700-content-override); }
    .about-preview-futuristic .personal-info-preview {flex-basis:60%; max-width:60%; margin-top:40px;}
    .about-preview-futuristic .personal-info-preview .info-item-preview {flex-basis:50%; max-width:50%;}
    .about-preview-futuristic .personal-info-preview .info-item-preview p {font-weight:600; padding:10px 0; font-size:16px; color:var(--text-black-900-content-override); border-bottom:1px solid var(--bg-black-50);}
    .about-preview-futuristic .personal-info-preview .info-item-preview p span {font-weight:400; color:var(--text-black-700-content-override); margin-left:4px; display:inline-block;}
    .about-preview-futuristic .personal-info-preview .buttons-preview {margin-top:30px;}
    .about-preview-futuristic .personal-info-preview .buttons-preview .btn-preview {margin-right:15px; margin-top:10px;}
    .about-preview-futuristic .skills-preview-futuristic {flex-basis:40%; max-width:40%; margin-top:40px;}
    .about-preview-futuristic .skills-preview-futuristic .skill-item-preview {flex-basis:100%; max-width:100%; margin-bottom:25px;}
    .about-preview-futuristic .skills-preview-futuristic .skill-item-preview h5 {line-height:40px; font-weight:600; font-size:16px; color:var(--text-black-900-content-override); text-transform:capitalize;}
    .about-preview-futuristic .skills-preview-futuristic .skill-item-preview .progress-preview {background-color:var(--bg-black-50); height:7px; border-radius:4px; width:100%; position:relative;}
    .about-preview-futuristic .skills-preview-futuristic .skill-item-preview .progress-in-preview {position:absolute; left:0; top:0; height:100%; border-radius:4px; background-color:var(--skin-color);}
    .about-preview-futuristic .skills-preview-futuristic .skill-item-preview .skill-percent-preview {position:absolute; right:0; color:var(--text-black-900-content-override); top:-40px; font-weight:400; line-height:40px;}
    .about-preview-futuristic .education-preview, .about-preview-futuristic .experience-preview {flex-basis:50%; max-width:50%; margin-top:30px;}
    .about-preview-futuristic h3.title-preview {font-size:24px; margin-bottom:30px; font-weight:700; color:var(--text-black-900-content-override);}
    .about-preview-futuristic .timeline-box-preview {flex-basis:100%; max-width:100%;}
    .about-preview-futuristic .timeline-preview {background:var(--bg-black-100); padding:30px 15px; border:1px solid var(--bg-black-50); border-radius:10px; width:100%; position:relative;}
    .about-preview-futuristic .timeline-preview .timeline-item-preview {position:relative; padding-left:37px; padding-bottom:50px;}
    .about-preview-futuristic .timeline-preview .timeline-item-preview:last-child {padding-bottom:0;}
    .about-preview-futuristic .timeline-preview .timeline-item-preview::before {content:''; width:1px; position:absolute; height:100%; left:7px; top:0; background-color:var(--skin-color);}
    .about-preview-futuristic .timeline-preview .circle-dot-preview {position:absolute; left:0; top:0; height:15px; width:15px; border-radius:50%; background-color:var(--skin-color);}
    .about-preview-futuristic .timeline-preview .timeline-date-preview {font-size:14px; font-weight:400; margin-bottom:12px; color:var(--text-black-700-content-override);}
    .about-preview-futuristic .timeline-preview .timeline-date-preview .fa {margin-right:5px;} /* Font Awesome */
    .about-preview-futuristic .timeline-preview .timeline-title-preview {font-weight:700; font-size:18px; margin-bottom:15px; text-transform:capitalize; color:var(--text-black-900-content-override);}
    .about-preview-futuristic .timeline-preview .timeline-text-preview {line-height:25px; font-size:16px; text-align:justify; color:var(--text-black-700-content-override);}
    /* Skills (Services) Section */
    .skills-section-preview-futuristic .skill-item-container-preview { display: flex; flex-wrap: wrap; justify-content:center; gap:1rem;}
    .skills-section-preview-futuristic .skill-item-preview {margin-bottom:30px; text-align:center;}
    .skills-section-preview-futuristic .skill-item-inner-preview {background-color:var(--bg-black-100); border:1px solid var(--bg-black-50); border-radius:10px; padding:20px 15px; text-align:center; transition:all .3s ease; width:200px; height:180px; display:flex; flex-direction:column; justify-content:center; align-items:center;}
    .skills-section-preview-futuristic .skill-item-inner-preview:hover {background-color:var(--skin-color) !important;}
    .skills-section-preview-futuristic .skill-item-inner-preview .icon-preview {height:50px; width:50px; border-radius:50%; display:flex; margin:0 auto 20px; align-items:center; justify-content:center; transition:all .3s ease;}
    .skills-section-preview-futuristic .skill-item-inner-preview .icon-preview i.fa, .skills-section-preview-futuristic .skill-item-inner-preview .icon-preview svg {font-size:30px; color:var(--skin-color) !important; transition:all .3s ease; width:30px; height:30px;}
    .skills-section-preview-futuristic .skill-item-inner-preview:hover .icon-preview i.fa, .skills-section-preview-futuristic .skill-item-inner-preview:hover .icon-preview svg {color: ${escCssVal(getContrastColor(data.accentColor))} !important; width:25px; height:25px;}
    .skills-section-preview-futuristic .skill-item-inner-preview h4 {font-size:16px; margin-bottom:10px; color:var(--text-black-900-content-override); font-weight:700; text-transform:capitalize;}
    .skills-section-preview-futuristic .skill-item-inner-preview:hover h4 {color: ${escCssVal(getContrastColor(data.accentColor))} !important;}
    /* Portfolio Section */
    .projects-section-preview-futuristic .projects-heading-preview {flex-basis:100%; max-width:100%; margin-bottom:40px;}
    .projects-section-preview-futuristic .projects-heading-preview h2 {color:var(--text-black-900-content-override); font-weight:500;}
    .projects-section-preview-futuristic .project-item-preview {flex-basis:calc(33.33% - 30px); max-width:calc(33.33% - 30px); margin:0 15px 30px 15px; text-align:center;}
    .projects-section-preview-futuristic .project-item-inner-preview {border:6px solid var(--bg-black-100); border-radius:10px; overflow:hidden; cursor:pointer; display:inline-block;}
    .projects-section-preview-futuristic .project-item-inner-preview .project-img-preview img {width:100%; display:block; max-height:200px; object-fit:cover; transition:all .3s ease;}
    .projects-section-preview-futuristic .project-item-inner-preview:hover .project-img-preview img {transform:scale(1.1);}
    .projects-section-preview-futuristic .project-item-preview .project-details-preview {padding:10px 0;}
    .projects-section-preview-futuristic .project-item-preview .project-details-preview h4 {font-size:16px; color:var(--text-black-900-content-override); font-weight:600; margin-bottom:5px;}
    .projects-section-preview-futuristic .project-item-preview .project-details-preview p {font-size:13px; color:var(--text-black-700-content-override); margin-bottom:8px;}
    .projects-section-preview-futuristic .project-item-preview .project-links-preview a {font-size:12px; padding:3px 8px; margin:0 2px; border-radius:3px; text-decoration:none; display:inline-flex; align-items:center; gap:3px;}
    .projects-section-preview-futuristic .project-links-preview a.live-link-preview {background:var(--skin-color); color: ${escCssVal(getContrastColor(data.accentColor))};}
    .projects-section-preview-futuristic .project-links-preview a.code-link-preview {border:1px solid var(--skin-color); color:var(--skin-color);}
    /* Contact Section */
    .contact-section-preview-futuristic .contact-info-item-preview {flex-basis:25%; max-width:25%; text-align:center; margin-bottom:30px; padding:0 15px;}
    .contact-section-preview-futuristic .contact-info-item-preview .icon-preview { display: flex; justify-content:center; align-items:center; line-height:normal;}
    .contact-section-preview-futuristic .contact-info-item-preview .icon-preview i.fa, .contact-section-preview-futuristic .contact-info-item-preview .icon-preview svg {font-size:25px; color:var(--skin-color); width:25px; height:25px;}
    .contact-section-preview-futuristic .contact-info-item-preview h4 {font-size:18px; font-weight:700; color:var(--text-black-900-content-override); text-transform:capitalize; margin:15px 0 5px;}
    .contact-section-preview-futuristic .contact-info-item-preview p, .contact-section-preview-futuristic .contact-info-item-preview a {font-size:16px; line-height:25px; color:var(--text-black-700-content-override); font-weight:400; word-break:break-all; text-decoration:none;}
    .contact-section-preview-futuristic .contact-info-item-preview a:hover {color: var(--skin-color);}
    /* Responsive adjustments */
    @media (max-width:1199px){ .aside-preview-futuristic {left:-270px !important;} .main-content-preview-futuristic {left:0 !important; width:100% !important; padding-left:0 !important;} .nav-toggler-preview-futuristic {display:flex !important; left:15px !important;} .aside-preview-futuristic.open {left:0 !important;} .nav-toggler-preview-futuristic.open {left:300px !important;} .main-content-preview-futuristic.open {left:270px !important; width:calc(100% - 270px) !important;} }
    @media (max-width:991px){ .contact-section-preview-futuristic .contact-info-item-preview, .projects-section-preview-futuristic .project-item-preview, .skills-section-preview-futuristic .skill-item-preview {flex-basis:50% !important;max-width:50% !important;} .home-preview-futuristic .home-info-preview {flex-basis:100% !important; max-width:100% !important; text-align:center !important; order:2 !important;} .home-preview-futuristic .home-img-preview {display:block !important; flex-basis:100% !important; max-width:100% !important; margin-bottom:20px !important; order:1 !important; padding-left:0 !important; justify-content:center;} .home-preview-futuristic .home-img-preview img {margin:0 auto;} .home-preview-futuristic .home-img-preview::before, .home-preview-futuristic .home-img-preview::after {left:50%; transform:translateX(-50%);} }
    @media (max-width:767px){ .section-preview-futuristic {padding:0 15px !important;} .contact-section-preview-futuristic .contact-info-item-preview, .projects-section-preview-futuristic .project-item-preview, .skills-section-preview-futuristic .skill-item-preview, .about-preview-futuristic .education-preview, .about-preview-futuristic .experience-preview, .about-preview-futuristic .personal-info-preview .info-item-preview {flex-basis:100% !important; max-width:100% !important;} .about-preview-futuristic .skills-preview-futuristic {flex-basis:100% !important; max-width:100% !important;} }
    .section-preview-futuristic.section-on-content-bg { background: var(--content-bg-override) !important; }
    .section-preview-futuristic.section-on-main-bg { background: var(--preview-main-bg) !important; }
    .loader-preview-futuristic { display:flex; align-items:center; justify-content:center; position:fixed; left:0; top:0; height:100%; width:100%; background:var(--preview-main-bg); z-index:9999; transition: opacity 0.6s ease-in-out, visibility 0.6s ease-in-out; opacity: 1; visibility: visible; }
    .loader-preview-futuristic.loaded { opacity: 0; visibility: hidden; display:none;}
    .loader-preview-futuristic .logo-preview-futuristic { font-size:50px; color: var(--skin-color); font-family:'Clicker Script', cursive; animation: fadeInLoaderFuturisticPreview 0.6s 1; animation-fill-mode: both;}
    @keyframes fadeInLoaderFuturisticPreview { from { opacity:0; } to { opacity:1; } }
  `.replace(/`/g, '\\`').replace(/\$\{/g, '\\${}'); // Escape backticks for JS embedding

  let previewHtml = "";
  previewHtml += "<html><head>";
  previewHtml += "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">";
  previewHtml += "<title>" + escHtml(data.yourName) + " - Futuristic Portfolio</title>";
  previewHtml += "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css\"/>"; // Font Awesome for Preview
  previewHtml += "<style>" + inlineStyles + baseCssFromReferencePreview + "</style>";
  previewHtml += "</head><body class=\""+ (getContrastColor(data.backgroundColor) === '#FFFFFF' ? 'dark-preview-futuristic' : '') +"\">";

  // Loader Preview
  previewHtml += "<div class='loader-preview-futuristic' id='loader_preview_futuristic'>";
  previewHtml += "  <div class='logo-preview-futuristic'>" + escHtml(data.yourName ? data.yourName.charAt(0).toUpperCase() : 'L') + "</div>";
  previewHtml += "</div>";

  // Aside (Navigation) Preview
  previewHtml += "<div class='aside-preview-futuristic' id='aside_preview_futuristic'>";
  previewHtml += "  <div class='logo-preview'><a href='#home_preview_futuristic' style='color: var(--text-black-900);'><span style='color:var(--skin-color);'>" + escHtml(data.yourName ? data.yourName.charAt(0).toUpperCase() : "P") + "</span>" + escHtml(data.yourName ? data.yourName.substring(1).toLowerCase() : "ortfolio") + "</a></div>";
  previewHtml += "  <ul class='nav-preview'>";
  const navLinksPreviewFuturistic = [
      { id: "home_preview_futuristic", label: "Home", icon: "<i class='fa fa-home'></i>", condition: true },
      { id: "about_preview_futuristic", label: "About", icon: "<i class='fa fa-user'></i>", condition: data.showAboutSection },
      { id: "skills_preview_futuristic", label: "Skills", icon: "<i class='fa fa-list'></i>", condition: data.showSkillsSection },
      { id: "projects_preview_futuristic", label: "Projects", icon: "<i class='fa fa-briefcase'></i>", condition: data.showProjectsSection },
      { id: "contact_preview_futuristic", label: "Contact", icon: "<i class='fa fa-comments'></i>", condition: data.showContactSection },
  ];
  navLinksPreviewFuturistic.filter(link => link.condition).forEach((link, index) => {
    previewHtml += "<li><a href=\"#" + link.id + "\" class=\"" + (index === 0 ? "active-nav-link-preview" : "") + "\" style=\"color:var(--text-black-900);\">" + link.icon + " " + escHtml(link.label) + "</a></li>";
  });
  previewHtml += "  </ul>";
  previewHtml += "</div>";
  
  // Nav Toggler Preview
  previewHtml += "<div class='nav-toggler-preview-futuristic' id='nav_toggler_preview_futuristic'><span></span></div>";
  
  // Main Content Wrapper Preview
  previewHtml += "<div class='main-content-preview-futuristic' id='main_content_preview_futuristic'>";

  // Home Section Preview
  previewHtml += "<section class='home-preview-futuristic section-preview-futuristic active' id='home_preview_futuristic' style='background-color: var(--bg-black-900);'>";
  previewHtml += "  <div class='container-preview-futuristic'>";
  previewHtml += "    <div class='row-preview'>";
  previewHtml += "      <div class='home-info-preview padd-15-preview'>";
  
  let heroProfessionPreview = data.heroTitle ? data.heroTitle.split(",")[0].trim() : "Digital Architect";
  
  previewHtml += "        <h3 class=\"hello-preview\" style=\"color:var(--text-black-900);\">Hello, my name is <span class=\"name-preview\" style=\"font-family: 'Clicker Script', cursive; color:var(--skin-color);\">" + escHtml(data.yourName) + "</span></h3>";
  previewHtml += "        <h3 class=\"my-profession-preview\" style=\"color:var(--text-black-900);\">I'm a <span class=\"typing-preview\" style=\"color:var(--skin-color);\">" + escHtml(heroProfessionPreview) + "</span></h3>";
  
  previewHtml += "        <p style=\"color:var(--text-black-700);\">" + (escHtml(data.heroTagline || "")).replace(/\n/g, "<br/>") + "</p>";
  if(data.showResumeLink && data.resumeUrl) previewHtml += "        <a href=\"" + escAttr(data.resumeUrl) + "\" class=\"btn-preview\" target=\"_blank\" style=\"background:var(--skin-color); color:" + escCssVal(getContrastColor(data.accentColor)) + ";\"><i class=\"fa fa-download\" style=\"margin-right:5px;\"></i>" + escHtml(data.heroCtaText || 'Download CV') + "</a>";
  previewHtml += "      </div>";
  if(data.heroImagePlaceholder) {
    previewHtml += "      <div class=\"home-img-preview padd-15-preview\">";
    previewHtml += "        <img src=\"" + escAttr(data.heroImagePlaceholder) + "\" alt=\"hero\" data-ai-hint=\"futuristic portrait tech person\"/>";
    previewHtml += "      </div>";
  }
  previewHtml += "    </div>";
  previewHtml += "  </div>";
  previewHtml += "</section>";

  // About Section Preview
  if(data.showAboutSection) {
    previewHtml += "<section class='about-preview-futuristic section-preview-futuristic section-on-content-bg' id='about_preview_futuristic' style='display:none;'>"; 
    previewHtml += "  <div class='container-preview-futuristic'>";
    previewHtml += "    <div class='row-preview'><div class='section-title-preview padd-15-preview on-content-bg'><h2>About Me</h2></div></div>";
    previewHtml += "    <div class='row-preview'>";
    previewHtml += "      <div class='about-content-preview padd-15-preview'>";
    previewHtml += "        <div class='row-preview'>";
    previewHtml += "          <div class='about-text-preview padd-15-preview'>";

    let aboutNamePreview = escHtml(data.yourName);
    let aboutHeroTitlePreviewString = data.heroTitle ? data.heroTitle.split(",")[0].trim() : "a Professional";
    let aboutEscapedHeroTitlePreview = escHtml(aboutHeroTitlePreviewString);
    previewHtml += "            <h3>I'm " + aboutNamePreview + " and <span style=\"color:var(--skin-color);\">" + aboutEscapedHeroTitlePreview + "</span></h3>";
    
    previewHtml += "            <p>" + (escHtml(data.aboutBio || "")).replace(/\n/g, "<br/>") + "</p>";
    previewHtml += "          </div>";
    previewHtml += "        </div>";
    previewHtml += "        <div class='row-preview'>";
    previewHtml += "          <div class='personal-info-preview padd-15-preview'>";
    previewHtml += "            <div class='row-preview'>";
    if(data.contactEmail) previewHtml += "              <div class=\"info-item-preview padd-15-preview\"><p>Email : <span>" + escHtml(data.contactEmail) + "</span></p></div>";
    previewHtml += "            </div>";
    previewHtml += "            <div class=\"row-preview\"><div class=\"buttons-preview padd-15-preview\">";
    if(data.showContactSection) previewHtml += "<a href=\"#contact_preview_futuristic\" onclick=\"showSectionPreviewFuturistic('contact_preview_futuristic'); return false;\" class=\"btn-preview\" style=\"background:var(--skin-color); color:" + escCssVal(getContrastColor(data.accentColor)) + ";\">Hire Me</a>";
    previewHtml += "</div></div>";
    previewHtml += "          </div>";
    if(data.showSkillsSection && data.aboutSkills) {
      const skillsPreviewListForAbout = data.aboutSkills.split(',').map(s => { const p = s.split(':'); return { name: p[0]?.trim(), percentage: parseInt(p[1]?.trim() || '75', 10) }; }).filter(s => s.name);
      if(skillsPreviewListForAbout.length > 0) {
        previewHtml += "          <div class=\"skills-preview-futuristic padd-15-preview\">";
        previewHtml += "            <div class=\"row-preview\">";
        skillsPreviewListForAbout.forEach(skill => {
          previewHtml += "<div class=\"skill-item-preview padd-15-preview\">";
          previewHtml += "  <h5>" + escHtml(skill.name) + "</h5>";
          previewHtml += "  <div class=\"progress-preview\"><div class=\"progress-in-preview\" style=\"width:" + skill.percentage + "%;\"></div><div class=\"skill-percent-preview\">" + skill.percentage + "%</div></div>";
          previewHtml += "</div>";
        });
        previewHtml += "            </div>";
        previewHtml += "          </div>";
      }
    }
    previewHtml += "        </div>"; 
    if(data.showAcademicSection && data.academicEntries && data.academicEntries.filter(entry => entry && entry.qualification).length > 0) {
        const educationEntriesPreview = data.academicEntries.filter(entry => entry && entry.qualification);
        if (educationEntriesPreview.length > 0) {
          previewHtml += "          <div class='row-preview'>";
          previewHtml += "            <div class='education-preview padd-15-preview'>";
          previewHtml += "              <h3 class=\"title-preview\">Education</h3>";
          previewHtml += "              <div class=\"row-preview\"><div class=\"timeline-box-preview padd-15-preview\"><div class=\"timeline-preview shadow-dark-preview\">";
          educationEntriesPreview.forEach(entry => {
            if (!entry) return;
            previewHtml += "<div class=\"timeline-item-preview\">";
            previewHtml += "  <div class=\"circle-dot-preview\"></div>";
            previewHtml += "  <h3 class=\"timeline-date-preview\"><i class=\"fa fa-calendar\"></i> " + escHtml(entry.graduationYear) + "</h3>";
            previewHtml += "  <h4 class=\"timeline-title-preview\">" + escHtml(entry.qualification) + " - " + escHtml(entry.institution) +"</h4>";
            if(entry.grades) previewHtml += "  <p class=\"timeline-text-preview\" style=\"font-style:italic; font-size:0.9em; margin-bottom:5px;\">Grades: " + escHtml(entry.grades) + "</p>";
            previewHtml += "  <p class=\"timeline-text-preview\">" + (escHtml(entry.description || "")).replace(/\n/g, "<br/>") + "</p>";
            previewHtml += "</div>";
          });
          previewHtml += "            </div></div></div>";
          previewHtml += "            </div>";
          previewHtml += "          </div>";
        }
    }
    previewHtml += "      </div>"; 
    previewHtml += "    </div>"; 
    previewHtml += "  </div>"; 
    previewHtml += "</section>";
  }

  // Skills Section (Services) Preview
  if(data.showSkillsSection && data.aboutSkills) {
    const skillsServiceListPreview = data.aboutSkills.split(',').map(s => s.split(':')[0].trim()).filter(s => s); // Get only skill names for this section
    if (skillsServiceListPreview.length > 0) {
        previewHtml += "<section class='skills-section-preview-futuristic section-preview-futuristic section-on-content-bg' id='skills_preview_futuristic' style='display:none;'>";
        previewHtml += "  <div class='container-preview-futuristic'>";
        previewHtml += "    <div class='row-preview'><div class='section-title-preview padd-15-preview on-content-bg'><h2>My Skills</h2></div></div>";
        previewHtml += "    <div class='row-preview skills-item-container-preview'>"; 
        skillsServiceListPreview.forEach(skill => {
            previewHtml += "<div class='skill-item-preview padd-15-preview'>"; 
            previewHtml += "  <div class='skill-item-inner-preview shadow-dark-preview'>"; 
            previewHtml += "    <div class='icon-preview'><i class='fa fa-code'></i></div>"; // Generic icon
            previewHtml += "    <h4>" + escHtml(skill) + "</h4>";
            previewHtml += "  </div>";
            previewHtml += "</div>";
        });
        previewHtml += "    </div>";
        previewHtml += "  </div>";
        previewHtml += "</section>";
    }
  }

  // Projects Section (Portfolio) Preview
  if(data.showProjectsSection && data.projects && data.projects.filter(p=>p && p.name).length > 0) {
    previewHtml += "<section class='projects-section-preview-futuristic section-preview-futuristic section-on-content-bg' id='projects_preview_futuristic' style='display:none;'>";
    previewHtml += "  <div class='container-preview-futuristic'>";
    previewHtml += "    <div class='row-preview'><div class='section-title-preview padd-15-preview on-content-bg'><h2>My Projects</h2></div></div>";
    previewHtml += "    <div class='row-preview'><div class='projects-heading-preview padd-15-preview'><h2>Selected Projects :</h2></div></div>";
    previewHtml += "    <div class='row-preview' style='justify-content:center;'>"; // Centering items
    (data.projects || []).filter(p => p && p.name).forEach(project => { 
        if (!project) return;
        previewHtml += "<div class=\"project-item-preview\">";
        previewHtml += "  <div class=\"project-item-inner-preview shadow-dark-preview\">";
        previewHtml += "    <div class=\"project-img-preview\">";
        previewHtml += "      <img src=\"" + escAttr(project.imageUrl || 'https://placehold.co/600x400/1f1c33/00F0FF?text=Project&font=orbitron') + "\" alt=\"" + escAttr(project.name) + "\" data-ai-hint=\"project app futuristic\"/>";
        previewHtml += "    </div>";
        previewHtml += "  </div>";
        previewHtml += "  <div class=\"project-details-preview\">";
        previewHtml += "      <h4 style=\"color:var(--text-black-900-content-override);\">" + escHtml(project.name) + "</h4>";
        if(project.description) previewHtml += "<p style=\"color:var(--text-black-700-content-override);\">" + (escHtml(project.description)).replace(/\n/g, "<br/>") + "</p>";
        previewHtml += "      <div class=\"project-links-preview\">";
        if(project.liveUrl) previewHtml += "         <a href=\"" + escAttr(project.liveUrl) + "\" class=\"live-link-preview\" target=\"_blank\" style=\"background:var(--skin-color); color:" + escCssVal(getContrastColor(data.accentColor)) + ";\"><i class=\"fa fa-external-link-alt\" style=\"margin-right:3px;\"></i>Live</a>";
        if(project.repoUrl) previewHtml += "         <a href=\"" + escAttr(project.repoUrl) + "\" class=\"code-link-preview\" target=\"_blank\" style=\"border-color:var(--skin-color); color:var(--skin-color);\"><i class=\"fa fa-github\" style=\"margin-right:3px;\"></i>Code</a>";
        previewHtml += "      </div>";
        previewHtml += "  </div>";
        previewHtml += "</div>";
    });
    previewHtml += "    </div>";
    previewHtml += "  </div>";
    previewHtml += "</section>";
  }
  
  // Contact Section Preview
  if(data.showContactSection) {
    previewHtml += "<section class='contact-section-preview-futuristic section-preview-futuristic section-on-content-bg' id='contact_preview_futuristic' style='display:none;'>";
    previewHtml += "  <div class='container-preview-futuristic'>";
    previewHtml += "    <div class='row-preview'><div class='section-title-preview padd-15-preview on-content-bg'><h2>Contact Me</h2></div></div>";
    previewHtml += "    <h3 class='contact-title-preview padd-15-preview' style='color:var(--skin-color); font-size:20px; text-align:center; margin-bottom:15px;'>Have Any Questions ?</h3>";
    previewHtml += "    <h4 class='contact-sub-title-preview padd-15-preview' style='color:var(--text-black-900-content-override); font-size:16px; text-align:center; margin-bottom:40px;'>I'M VERY RESPONSIVE TO MESSAGES</h4>";
    previewHtml += "    <div class='row-preview' style='justify-content:center;'>"; // Centering contact items
    if (data.contactEmail) {
        previewHtml += "<div class=\"contact-info-item-preview\"><div class=\"icon-preview\"><i class=\"fa fa-envelope\"></i></div><h4>Email</h4><p>" + escHtml(data.contactEmail) + "</p></div>";
    }
    if (data.contactLinkedin) {
        previewHtml += "<div class=\"contact-info-item-preview\"><div class=\"icon-preview\"><i class=\"fab fa-linkedin-in\"></i></div><h4>LinkedIn</h4><p><a href=\""+escAttr(data.contactLinkedin)+"\" target=\"_blank\">Profile</a></p></div>";
    }
    if (data.contactGithub) {
        previewHtml += "<div class=\"contact-info-item-preview\"><div class=\"icon-preview\"><i class=\"fab fa-github\"></i></div><h4>GitHub</h4><p><a href=\""+escAttr(data.contactGithub)+"\" target=\"_blank\">Profile</a></p></div>";
    }
    if (data.contactInstagram) {
        previewHtml += "<div class=\"contact-info-item-preview\"><div class=\"icon-preview\"><i class=\"fab fa-instagram\"></i></div><h4>Instagram</h4><p><a href=\""+escAttr(data.contactInstagram)+"\" target=\"_blank\">Profile</a></p></div>";
    }
    previewHtml += "    </div>";
    previewHtml += "    <footer style=\"text-align:center; margin-top: 40px; padding-top:20px; border-top:1px solid var(--bg-black-50);\"><p style=\"font-size:0.9em; color:var(--text-black-700-content-override);\">&copy; " + new Date().getFullYear() + " " + escHtml(data.yourName) + ". All Systems Nominal.</p></footer>";
    previewHtml += "  </div>";
    previewHtml += "</section>";
  }

  previewHtml += "</div>"; // Closing main-content

  // JavaScript for Preview (adapted from references/assets/app.js)
  const referenceScriptJsPreview = `
    // Typed.js for Preview
    var typedPreviewInstance = null;
    try {
      if (typeof Typed !== 'undefined' && document.querySelector(".typing-preview")) {
        var heroTitlePreviewFuturistic = "${escJsStr(data.heroTitle || "Futuristic Professional")}";
        var titlesPreviewFuturistic = heroTitlePreviewFuturistic.split(",").map(s => s.trim()).filter(s => s);
        if(titlesPreviewFuturistic.length === 0) titlesPreviewFuturistic.push("Futuristic Professional");
        typedPreviewInstance = new Typed(".typing-preview", {
          strings: titlesPreviewFuturistic, typeSpeed: 70, backSpeed: 50, loop: true,
        });
      }
    } catch(e) { console.error("Typed.js init error in futuristic preview:", e); }

    // Navigation logic for Preview
    const navPreviewFuturistic = document.querySelector("#aside_preview_futuristic .nav-preview");
    const navListPreviewFuturistic = navPreviewFuturistic ? navPreviewFuturistic.querySelectorAll("li") : [];
    const allSectionPreviewFuturistic = document.querySelectorAll("#main_content_preview_futuristic .section-preview-futuristic");
    const mainContentElemPreviewFuturistic = document.getElementById("main_content_preview_futuristic");
    
    function showSectionPreviewFuturistic(targetId) {
      let foundTarget = false;
      allSectionPreviewFuturistic.forEach(section => {
        if (section.id === targetId) {
          section.style.display = "block";
          section.classList.add("active");
          foundTarget = true;
        } else {
          section.style.display = "none";
          section.classList.remove("active");
        }
      });
      if(foundTarget) updateNavPreviewFuturistic(targetId);
    }
    
    function updateNavPreviewFuturistic(currentSectionId) {
      navListPreviewFuturistic.forEach(li => {
        const link = li.querySelector("a");
        if (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") && link.getAttribute("href").substring(1) === currentSectionId) {
            link.classList.add("active");
          }
        }
      });
    }
    
    navListPreviewFuturistic.forEach(li => {
      const a = li.querySelector("a");
      if(a && a.getAttribute("href")) {
        a.addEventListener("click", function (event) {
          event.preventDefault();
          const targetId = this.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);
          showSectionPreviewFuturistic(targetId);
          const asideElem = document.getElementById("aside_preview_futuristic");
          const togglerElem = document.getElementById("nav_toggler_preview_futuristic");
          if (window.innerWidth < 1200 && asideElem && togglerElem && asideElem.classList.contains('open')) {
            asideElem.classList.remove("open");
            togglerElem.classList.remove("open");
            if (mainContentElemPreviewFuturistic) mainContentElemPreviewFuturistic.classList.remove("open");
          }
           if (targetElement && mainContentElemPreviewFuturistic) {
              mainContentElemPreviewFuturistic.scrollTo({ top: targetElement.offsetTop - 0, behavior: 'smooth' });
          }
        });
      }
    });

    const navTogglerBtnPreviewFuturistic = document.getElementById("nav_toggler_preview_futuristic");
    const asidePreviewFuturistic = document.getElementById("aside_preview_futuristic");

    function asideSectionTogglerBtnPreviewFuturistic() {
      if(asidePreviewFuturistic) asidePreviewFuturistic.classList.toggle("open");
      if(navTogglerBtnPreviewFuturistic) navTogglerBtnPreviewFuturistic.classList.toggle("open");
      if(mainContentElemPreviewFuturistic) mainContentElemPreviewFuturistic.classList.toggle("open");
    }
    if(navTogglerBtnPreviewFuturistic) {
        navTogglerBtnPreviewFuturistic.addEventListener("click", asideSectionTogglerBtnPreviewFuturistic);
    }
    
    // Preloader
    const loaderPreviewFuturistic = document.getElementById("loader_preview_futuristic");
    if(loaderPreviewFuturistic) {
      setTimeout(() => {
          loaderPreviewFuturistic.classList.add('loaded');
          if(mainContentElemPreviewFuturistic) mainContentElemPreviewFuturistic.style.visibility = 'visible'; 
          // Show the first section after loader
          if (allSectionPreviewFuturistic.length > 0 && navListPreviewFuturistic.length > 0) {
            showSectionPreviewFuturistic(allSectionPreviewFuturistic[0].id);
          }
      }, 500);
    } else {
      if(mainContentElemPreviewFuturistic) mainContentElemPreviewFuturistic.style.visibility = 'visible';
       if (allSectionPreviewFuturistic.length > 0 && navListPreviewFuturistic.length > 0) {
          showSectionPreviewFuturistic(allSectionPreviewFuturistic[0].id);
        }
    }

    // Adjust layout for desktop/mobile on load and resize
    function adjustLayoutPreviewFuturistic() {
      const mainContent = document.getElementById("main_content_preview_futuristic");
      const aside = document.getElementById("aside_preview_futuristic");
      const navToggler = document.getElementById("nav_toggler_preview_futuristic");

      if (window.innerWidth < 1200) { // Mobile view
        if(navToggler) navToggler.style.display = 'flex';
        if(aside && !aside.classList.contains('open')) aside.style.left = '-270px'; 
        if(mainContent && !mainContent.classList.contains('open')) {
            mainContent.style.left = '0';
            mainContent.style.width = '100%';
        }
      } else { // Desktop view
        if(navToggler) navToggler.style.display = 'none';
        if(aside) { aside.style.left = '0'; aside.classList.remove('open'); }
        if(mainContent) {
             mainContent.style.left = '270px';
             mainContent.style.width = 'calc(100% - 270px)';
             mainContent.classList.remove('open');
        }
      }
    }
    window.addEventListener('load', adjustLayoutPreviewFuturistic);
    window.addEventListener('resize', adjustLayoutPreviewFuturistic);
    document.addEventListener('DOMContentLoaded', adjustLayoutPreviewFuturistic);

    // Auto-activate first section for preview if visible
    if (allSectionPreviewFuturistic.length > 0) {
        const firstVisibleSection = Array.from(allSectionPreviewFuturistic).find(s => s.style.display !== 'none');
        if (firstVisibleSection) {
            updateNavPreviewFuturistic(firstVisibleSection.id);
        } else {
            showSectionPreviewFuturistic(allSectionPreviewFuturistic[0].id);
        }
    }
  `;
  previewHtml += "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js\" referrerpolicy=\"no-referrer\"></script>";
  previewHtml += "<script>" + referenceScriptJsPreview.replace(/`/g, '\\`').replace(/\$\{/g, '\\${}') + "</script>";
  previewHtml += "</body></html>";

  return { fullTsx, previewHtml };
}
