
// src/schemas/websiteFormSchema.ts
import { z } from "zod";
import { availableThemes } from "@/templates";

const projectSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters.").max(50, "Project name too long."),
  description: z.string().min(10, "Project description too short.").max(300, "Project description too long."),
  technologies: z.string().min(3, "Technologies too short.").max(100, "Technologies too long."),
  liveUrl: z.string().url({ message: "Invalid URL for live site." }).optional().or(z.literal('')),
  repoUrl: z.string().url({ message: "Invalid URL for repository." }).optional().or(z.literal('')),
  imageUrl: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : val),
    z.string().url({message: "Invalid image URL"}).optional()
  ),
});

const academicEntrySchema = z.object({
  qualification: z.string().max(100, "Qualification too long.").optional(),
  institution: z.string().max(100, "Institution name too long.").optional(),
  graduationYear: z.string().max(30, "Graduation year/period too long.").optional(),
  grades: z.string().max(100, "Grades/GPA too long.").optional(),
  description: z.string().max(1000, "Academic description too long.").optional(),
  imageUrl: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : val),
    z.string().url({message: "Invalid academic image URL"}).optional()
  ),
});
export type AcademicEntryType = z.infer<typeof academicEntrySchema>;


export const formSchema = z.object({
  // Portfolio Content
  yourName: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be 50 characters or less."),
  heroTitle: z.string().min(5, "Title must be at least 5 characters.").max(100, "Title too long."),
  heroTagline: z.string().min(10, "Tagline must be at least 10 characters.").max(200, "Tagline too long."),
  heroCtaText: z.string().min(3, "CTA text too short.").max(30, "CTA text too long."),
  heroImagePlaceholder: z.preprocess(
    (val) => (val === "" || val === null || val === undefined ? undefined : val),
    z.string().url({ message: "Invalid hero image URL." })
      .optional()
      .default("https://placehold.co/600x400.png")
  ),

  aboutBio: z.string().min(20, "Bio must be at least 20 characters.").max(1000, "Bio too long."),
  aboutSkills: z.string().min(10, "Skills description too short.").max(500, "Skills description too long."), // Comma-separated or descriptive
  aboutFunFact: z.string().max(200, "Fun fact too long.").optional(),

  // Academic Section
  academic1: academicEntrySchema.optional(),
  academic2: academicEntrySchema.optional(),

  project1: projectSchema.optional(),
  project2: projectSchema.optional(),

  contactEmail: z.string().email({ message: "Invalid email address." }),
  contactLinkedin: z.string().url({ message: "Invalid LinkedIn URL." }).optional().or(z.literal('')),
  contactGithub: z.string().url({ message: "Invalid GitHub URL." }).optional().or(z.literal('')),
  contactInstagram: z.string().url({ message: "Invalid Instagram URL." }).optional().or(z.literal('')),

  resumeUrl: z.string().url({ message: "Invalid URL for resume." }).optional().or(z.literal('')),
  
  // Theming & Styling
  theme: z.enum(availableThemes, { errorMap: () => ({ message: "Please select a valid theme."}) }),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, { message: "Invalid primary color hex code. Use #RRGGBB format." }),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, { message: "Invalid background color hex code. Use #RRGGBB format." }),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, { message: "Invalid accent color hex code. Use #RRGGBB format." }),
  
  // Section Toggles
  showAboutSection: z.boolean().default(true),
  showFunFact: z.boolean().default(true),
  showAcademicSection: z.boolean().default(true),
  showAcademic1: z.boolean().default(true),
  showAcademic2: z.boolean().default(false),
  showProjectsSection: z.boolean().default(true),
  showProject1: z.boolean().default(true),
  showProject2: z.boolean().default(true),
  showSkillsSection: z.boolean().default(true),
  showContactSection: z.boolean().default(true), 
  showResumeLink: z.boolean().default(true),
});

export type FormSchemaType = z.infer<typeof formSchema>;

// Default values for project placeholders
export const defaultProjectValues = {
  name: "Sample Project",
  description: "A brief description of this amazing project, highlighting its key features and impact.",
  technologies: "React, Next.js, Tailwind CSS",
  liveUrl: "https://example.com",
  repoUrl: "https://github.com/example/sample-project",
  imageUrl: "https://placehold.co/400x300.png",
};

export const defaultAcademicEntryValues: AcademicEntryType = {
  qualification: "B.Sc. in Computer Science",
  institution: "University of Technology",
  graduationYear: "2023",
  grades: "GPA: 3.8/4.0",
  description: "Focused on web development and AI. Senior project involved creating a machine learning model for image recognition. Active member of the coding club.",
  imageUrl: "https://placehold.co/500x300.png",
};
