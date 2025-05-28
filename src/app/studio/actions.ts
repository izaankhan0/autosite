
// src/app/studio/actions.ts
"use server";

import type { FormSchemaType } from "@/schemas/websiteFormSchema";
import { getTemplate, type ThemeKey, type TemplateOutput } from "@/templates"; 

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
    
    // Removed call to updateGlobalsCss as it's not suitable for serverless environments like Vercel.
    // The live preview HTML (templateOutput.previewHtml) already includes inline styles
    // based on user's color choices, so it will be themed correctly.
    // The main Studio application's theme will remain static as defined in globals.css.

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
