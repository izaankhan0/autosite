
// src/app/studio/actions.ts
"use server";

import fs from 'fs/promises';
import path from 'path';
import type { FormSchemaType } from "@/schemas/websiteFormSchema";
import { getTemplate, type ThemeKey, getContrastColor, type TemplateOutput } from "@/templates"; 
import { hexToHsl } from "@/lib/colors";

async function updateGlobalsCss(colors: {
  background: string; 
  primary: string; 
  accent: string; 
}): Promise<void> {
  const globalsCssPath = path.join(process.cwd(), 'src', 'app', 'globals.css');
  try {
    let cssContent = await fs.readFile(globalsCssPath, 'utf-8');

    const bgHsl = hexToHsl(colors.background);
    const fgHex = getContrastColor(colors.background); 
    const fgHsl = hexToHsl(fgHex); 
    const primaryHsl = hexToHsl(colors.primary);
    const primaryFgHex = getContrastColor(colors.primary);
    const primaryFgHsl = hexToHsl(primaryFgHex);
    const accentHsl = hexToHsl(colors.accent);
    const accentFgHex = getContrastColor(colors.accent);
    const accentFgHsl = hexToHsl(accentFgHex);

    const replaceCssVar = (content: string, varName: string, hsl: {h: number, s: number, l: number} | null) => {
      if (!hsl) return content;
      const regex = new RegExp(`(${varName}:\\s*)[\\d.]+\\s*[\\d.]*%\\s*[\\d.]*%;`);
      return content.replace(regex, `$1${hsl.h} ${hsl.s}% ${hsl.l}%;`);
    };
    
    cssContent = replaceCssVar(cssContent, '--background', bgHsl);
    cssContent = replaceCssVar(cssContent, '--foreground', fgHsl);
    cssContent = replaceCssVar(cssContent, '--primary', primaryHsl);
    cssContent = replaceCssVar(cssContent, '--primary-foreground', primaryFgHsl);
    cssContent = replaceCssVar(cssContent, '--accent', accentHsl);
    cssContent = replaceCssVar(cssContent, '--accent-foreground', accentFgHsl);

    cssContent = replaceCssVar(cssContent, '--card', bgHsl);
    cssContent = replaceCssVar(cssContent, '--card-foreground', fgHsl);
    cssContent = replaceCssVar(cssContent, '--popover', bgHsl);
    cssContent = replaceCssVar(cssContent, '--popover-foreground', fgHsl);
    
    if (bgHsl) {
      const secondaryL = bgHsl.l + (bgHsl.l > 50 ? -5 : 5);
      const mutedL = bgHsl.l + (bgHsl.l > 50 ? -10 : 10);
      const secondaryHsl = { h: bgHsl.h, s: bgHsl.s, l: Math.min(100, Math.max(0, secondaryL)) };
      const mutedHsl = { h: bgHsl.h, s: bgHsl.s, l: Math.min(100, Math.max(0, mutedL)) };
      cssContent = replaceCssVar(cssContent, '--secondary', secondaryHsl);
      cssContent = replaceCssVar(cssContent, '--muted', mutedHsl);

      const ringHsl = {h: primaryHsl?.h ?? 0, s: primaryHsl?.s ?? 0, l: Math.max(0, (primaryHsl?.l ?? 0) - 8)};
      cssContent = replaceCssVar(cssContent, '--ring', ringHsl);

      const borderL = bgHsl.l + (bgHsl.l > 50 ? -12 : 12);
      const inputL = bgHsl.l + (bgHsl.l > 50 ? -6 : 6);
      const borderHsl = { h: bgHsl.h, s: Math.max(0, bgHsl.s - 10), l: Math.min(100, Math.max(0, borderL))};
      const inputHsl = { h: bgHsl.h, s: Math.max(0, bgHsl.s - 5), l: Math.min(100, Math.max(0, inputL))};
      cssContent = replaceCssVar(cssContent, '--border', borderHsl);
      cssContent = replaceCssVar(cssContent, '--input', inputHsl);
    }
    if (fgHsl) {
      const secondaryFgL = fgHsl.l + (fgHsl.l > 50 ? -10 : 10);
      const mutedFgL = fgHsl.l + (fgHsl.l > 50 ? -20 : 20);
      const secondaryFgHsl = { h: fgHsl.h, s: fgHsl.s, l: Math.min(100, Math.max(0, secondaryFgL)) };
      const mutedFgHsl = { h: fgHsl.h, s: Math.max(0, fgHsl.s - 10), l: Math.min(100, Math.max(0, mutedFgL)) };
      cssContent = replaceCssVar(cssContent, '--secondary-foreground', secondaryFgHsl);
      cssContent = replaceCssVar(cssContent, '--muted-foreground', mutedFgHsl);
    }

    await fs.writeFile(globalsCssPath, cssContent, 'utf-8');
  } catch (error) {
    console.error("Failed to update globals.css:", error);
    throw new Error("Failed to update theme styling.");
  }
}

interface GenerateWebsiteResult {
  success: boolean;
  code?: string; 
  previewHtml?: string;
  error?: string;
}

export const generateWebsiteFromTemplateAction = async (input: FormSchemaType): Promise<GenerateWebsiteResult> => {
  try {
    const templateKey = input.theme as ThemeKey; 
    const templateOutput: TemplateOutput = getTemplate(templateKey, input);
    
    await updateGlobalsCss({
        background: input.backgroundColor,
        primary: input.primaryColor,
        accent: input.accentColor,
    });

    return { 
      success: true, 
      code: templateOutput.fullTsx,
      previewHtml: templateOutput.previewHtml 
    };
  } catch (error) {
    console.error("Error in generateWebsiteFromTemplateAction:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred while generating from template." 
    };
  }
};
