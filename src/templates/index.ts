// src/templates/index.ts
import type { FormSchemaType } from "@/schemas/websiteFormSchema";
import { getModernTemplate } from "./modern";
import { getMinimalistTemplate } from "./minimalist";
import { getStudentTemplate } from "./student";
import { getCorporateTemplate } from "./corporate";
import { getFuturisticTemplate } from "./futuristic";
import { getElegantTemplate } from "./elegant";
// Removed import for getCreativeTemplate as classic.ts is being deleted

export const availableThemes = ["modern", "minimalist", "student", "corporate", "futuristic", "elegant"] as const;
export type ThemeKey = typeof availableThemes[number];

export interface TemplateOutput {
  fullTsx: string;
  previewHtml: string;
}

// This function remains crucial for determining text color against a given background.
export function getContrastColor(hexcolor: string | undefined): string {
  if (!hexcolor || !hexcolor.startsWith('#')) {
    console.warn('Invalid hex color for contrast calculation:', hexcolor, 'Defaulting to black.');
    return '#000000'; 
  }
  let processedHex = hexcolor.slice(1);
  if (processedHex.length === 3) {
    processedHex = processedHex.split('').map(char => char + char).join('');
  }
  if (processedHex.length !== 6) {
    console.warn('Invalid hex color length for contrast calculation:', hexcolor, 'Defaulting to black.');
    return '#000000';
  }

  try {
    const r = parseInt(processedHex.substring(0, 2), 16);
    const g = parseInt(processedHex.substring(2, 4), 16);
    const b = parseInt(processedHex.substring(4, 6), 16);
    // http://www.w3.org/TR/AERT#color-contrast
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#000000' : '#FFFFFF';
  } catch (e) {
    console.error('Error parsing hex for contrast:', e);
    return '#000000';
  }
}


export function getTemplate(theme: ThemeKey, data: FormSchemaType): TemplateOutput {
  switch (theme) {
    case "modern":
      return getModernTemplate(data);
    case "minimalist":
      return getMinimalistTemplate(data);
    case "student":
      return getStudentTemplate(data);
    case "corporate":
      return getCorporateTemplate(data);
    case "futuristic":
      return getFuturisticTemplate(data);
    case "elegant":
      return getElegantTemplate(data);
    default:
      // This case should ideally not be reached if types are correct
      // and all availableThemes have a corresponding case.
      // Fallback to modern template as a safe default.
      console.warn("Unknown theme: \"" + theme + "\", defaulting to modern theme.");
      return getModernTemplate(data);
  }
}
