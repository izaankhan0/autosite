
// src/components/RequirementForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import type { FormSchemaType, AcademicEntryType} from "@/schemas/websiteFormSchema";
import { formSchema, defaultProjectValues, defaultAcademicEntryValues } from "@/schemas/websiteFormSchema";
import { availableThemes } from "@/templates";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


interface RequirementFormProps {
  onSubmit: (data: FormSchemaType) => Promise<void>;
  isLoading: boolean;
}

const displayThemes = availableThemes.map(theme => ({
  value: theme,
  label: theme.charAt(0).toUpperCase() + theme.slice(1)
}));


export function RequirementForm({ onSubmit, isLoading }: RequirementFormProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yourName: "Your Name",
      heroTitle: "Creative Developer & Designer",
      heroTagline: "Building beautiful and functional digital experiences.",
      heroCtaText: "View My Work",
      heroImagePlaceholder: "https://placehold.co/600x400.png",

      aboutBio: "A passionate individual with a knack for creating amazing things. I love to learn, explore new technologies, and contribute to impactful projects. My journey in this field has been driven by curiosity and a desire to solve real-world problems.",
      aboutSkills: "JavaScript, React, Next.js, Node.js, Python, Figma, UI/UX Design, Project Management",
      aboutFunFact: "I can solve a Rubik's cube in under a minute!",

      academic1: { ...defaultAcademicEntryValues },
      academic2: { 
        qualification: "M.Sc. in Data Science", 
        institution: "Institute of Advanced Studies", 
        graduationYear: "Expected 2025",
        grades: "N/A",
        description: "Currently pursuing Master's degree with a focus on machine learning applications and big data analytics.",
        imageUrl: "https://placehold.co/500x300.png?text=Achievement+2"
      },
      
      project1: { ...defaultProjectValues, name: "Portfolio Project One", imageUrl: "https://placehold.co/400x300.png" , description: defaultProjectValues.description, technologies: defaultProjectValues.technologies, liveUrl: defaultProjectValues.liveUrl, repoUrl: defaultProjectValues.repoUrl },
      project2: { ...defaultProjectValues, name: "Portfolio Project Two", imageUrl: "https://placehold.co/400x300.png", description: defaultProjectValues.description, technologies: defaultProjectValues.technologies, liveUrl: defaultProjectValues.liveUrl, repoUrl: defaultProjectValues.repoUrl },
      
      contactEmail: "your.email@example.com",
      contactLinkedin: "https://linkedin.com/in/yourprofile",
      contactGithub: "https://github.com/yourusername",
      contactInstagram: "https://instagram.com/yourusername",

      resumeUrl: "https://example.com/your-resume.pdf",
      
      theme: "student",
      primaryColor: "#3B82F6", 
      backgroundColor: "#F9FAFB", 
      accentColor: "#10B981", 

      // Section Toggles Default Values
      showAboutSection: true,
      showFunFact: true,
      showAcademicSection: true,
      showAcademic1: true,
      showAcademic2: false,
      showProjectsSection: true,
      showProject1: true,
      showProject2: true,
      showSkillsSection: true,
      showContactSection: true,
      showResumeLink: true,
    },
  });

  const watchShowProject1 = form.watch("showProject1");
  const watchShowProject2 = form.watch("showProject2");
  const watchShowAboutSection = form.watch("showAboutSection");
  const watchShowAcademicSection = form.watch("showAcademicSection");
  const watchShowAcademic1 = form.watch("showAcademic1");
  const watchShowAcademic2 = form.watch("showAcademic2");
  const watchShowProjectsSection = form.watch("showProjectsSection");
  const watchShowContactSection = form.watch("showContactSection");

  const renderAcademicFields = (academicEntryNumber: 1 | 2) => {
    const fieldNamePrefix = academicEntryNumber === 1 ? 'academic1' : 'academic2';
    const isVisible = academicEntryNumber === 1 ? watchShowAcademic1 : watchShowAcademic2;

    if (!isVisible) return null;

    return (
      <Card className="mb-6 shadow-sm border">
        <CardHeader>
          <CardTitle className="text-lg">Academic Achievement {academicEntryNumber}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name={`${fieldNamePrefix}.qualification`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualification</FormLabel>
                <FormControl><Input placeholder="e.g., B.Sc. Computer Science" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${fieldNamePrefix}.institution`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution</FormLabel>
                <FormControl><Input placeholder="e.g., University of Technology" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`${fieldNamePrefix}.graduationYear`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graduation Year/Period</FormLabel>
                  <FormControl><Input placeholder="e.g., 2023 or Expected May 2025" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`${fieldNamePrefix}.grades`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grades/GPA (Optional)</FormLabel>
                  <FormControl><Input placeholder="e.g., GPA: 3.8/4.0" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name={`${fieldNamePrefix}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl><Textarea placeholder="Notable achievements, thesis, relevant coursework, etc." {...field} className="min-h-[100px]" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${fieldNamePrefix}.imageUrl`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL (Optional)</FormLabel>
                <FormControl><Input placeholder="https://placehold.co/500x300.png" {...field} /></FormControl>
                <FormDescription>E.g., university logo, project poster. Use <a href="https://placehold.co" target="_blank" rel="noopener noreferrer" className="underline">placehold.co</a>.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    );
  };


  const renderProjectFields = (projectNumber: 1 | 2) => {
    const fieldName = projectNumber === 1 ? 'project1' : 'project2';
    const isVisible = projectNumber === 1 ? watchShowProject1 : watchShowProject2;

    if (!isVisible) return null;

    return (
      <Card className="mb-6 shadow-sm border">
        <CardHeader>
          <CardTitle className="text-lg">Project {projectNumber}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name={`${fieldName}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl><Input placeholder="Awesome App" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${fieldName}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea placeholder="A short summary of the project..." {...field} className="min-h-[80px]" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`${fieldName}.technologies`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies Used</FormLabel>
                <FormControl><Input placeholder="React, Node.js, Firebase" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name={`${fieldName}.imageUrl`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Image URL (Optional)</FormLabel>
                <FormControl><Input placeholder="https://example.com/image.png" {...field} /></FormControl>
                 <FormDescription>Recommended: 400x300. Use <a href="https://placehold.co" target="_blank" rel="noopener noreferrer" className="underline">placehold.co</a> for placeholders.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`${fieldName}.liveUrl`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Site URL (Optional)</FormLabel>
                  <FormControl><Input placeholder="https://example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`${fieldName}.repoUrl`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Repo URL (Optional)</FormLabel>
                  <FormControl><Input placeholder="https://github.com/user/repo" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  const defaultOpenAccordionItems = ["hero-section", "about-section", "academic-section", "projects-section", "skills-section", "contact-section"];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <Card>
          <CardHeader><CardTitle>🎨 Theme & Colors</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Theme</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a theme style" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {displayThemes.map((themeOpt) => (
                        <SelectItem key={themeOpt.value} value={themeOpt.value}>{themeOpt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <FormField control={form.control} name="primaryColor" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Color</FormLabel>
                    <FormControl><div className="flex items-center gap-2"><Input type="color" {...field} className="p-1 h-10 w-14 rounded-md border aspect-square cursor-pointer" /><Input type="text" {...field} placeholder="#RRGGBB" className="flex-1" /></div></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="backgroundColor" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Color</FormLabel>
                    <FormControl><div className="flex items-center gap-2"><Input type="color" {...field} className="p-1 h-10 w-14 rounded-md border aspect-square cursor-pointer" /><Input type="text" {...field} placeholder="#RRGGBB" className="flex-1" /></div></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="accentColor" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accent Color</FormLabel>
                    <FormControl><div className="flex items-center gap-2"><Input type="color" {...field} className="p-1 h-10 w-14 rounded-md border aspect-square cursor-pointer" /><Input type="text" {...field} placeholder="#RRGGBB" className="flex-1" /></div></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Separator />

        <Accordion type="multiple" defaultValue={defaultOpenAccordionItems} className="w-full space-y-6">
          
          <AccordionItem value="hero-section" className="border-none p-0">
            <Card>
              <CardHeader className="p-0">
                <AccordionTrigger className="flex w-full items-center justify-between rounded-t-lg p-6 text-left hover:bg-muted/50 data-[state=closed]:rounded-b-lg transition-colors hover:no-underline">
                  <CardTitle className="text-xl">👤 Hero Section</CardTitle>
                </AccordionTrigger>
              </CardHeader>
              <AccordionContent>
                <CardContent className="space-y-4 px-6 pb-6 pt-4">
                  <FormField control={form.control} name="yourName" render={({ field }) => (
                      <FormItem><FormLabel>Your Name</FormLabel><FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  <FormField control={form.control} name="heroTitle" render={({ field }) => (
                      <FormItem><FormLabel>Title / Role</FormLabel><FormControl><Input placeholder="e.g., Full-Stack Developer" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  <FormField control={form.control} name="heroTagline" render={({ field }) => (
                      <FormItem><FormLabel>Tagline</FormLabel><FormControl><Textarea placeholder="A catchy one-liner about what you do." {...field} className="min-h-[80px]" /></FormControl><FormMessage /></FormItem>
                    )} />
                  <FormField control={form.control} name="heroCtaText" render={({ field }) => (
                      <FormItem><FormLabel>Call to Action Button Text</FormLabel><FormControl><Input placeholder="e.g., View My Work" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  <FormField control={form.control} name="heroImagePlaceholder" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hero Image URL (Optional)</FormLabel>
                        <FormControl><Input placeholder="https://placehold.co/600x400.png" {...field} /></FormControl>
                        <FormDescription>Use <a href="https://placehold.co" target="_blank" rel="noopener noreferrer" className="underline">placehold.co</a> for placeholders (e.g., 600x400 for hero).</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )} />
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        
          <AccordionItem value="about-section" className="border-none p-0">
            <Card>
              <CardHeader className="p-0">
                <AccordionTrigger className="flex w-full items-center justify-between rounded-t-lg p-6 text-left hover:bg-muted/50 data-[state=closed]:rounded-b-lg transition-colors hover:no-underline">
                  <CardTitle className="text-xl">ℹ️ About Section</CardTitle>
                </AccordionTrigger>
              </CardHeader>
              <AccordionContent>
                <CardContent className="space-y-4 px-6 pb-6 pt-4">
                  <FormField
                    control={form.control} name="showAboutSection"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Show About Section</FormLabel>
                          <FormDescription>Include the "About Me" section in your portfolio.</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  {watchShowAboutSection && (
                    <>
                      <FormField control={form.control} name="aboutBio" render={({ field }) => (
                          <FormItem><FormLabel>Biography</FormLabel><FormControl><Textarea placeholder="Tell a bit about yourself, your journey, and passions." {...field} className="min-h-[120px]" /></FormControl><FormMessage /></FormItem>
                        )} />
                      <FormField
                        control={form.control} name="showFunFact"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Include Fun Fact</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      {form.watch("showFunFact") && (
                        <FormField control={form.control} name="aboutFunFact" render={({ field }) => (
                            <FormItem><FormLabel>Fun Fact / Short Story (Optional)</FormLabel><FormControl><Input placeholder="e.g., I once hiked the Appalachian Trail." {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                      )}
                    </>
                  )}
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="academic-section" className="border-none p-0">
            <Card>
              <CardHeader className="p-0">
                <AccordionTrigger className="flex w-full items-center justify-between rounded-t-lg p-6 text-left hover:bg-muted/50 data-[state=closed]:rounded-b-lg transition-colors hover:no-underline">
                   <div className="space-y-1 text-left">
                    <CardTitle className="text-xl">🎓 Academic Section</CardTitle>
                    <CardDescription>Detail up to two academic achievements.</CardDescription>
                  </div>
                </AccordionTrigger>
              </CardHeader>
              <AccordionContent>
                <CardContent className="space-y-4 px-6 pb-6 pt-4">
                  <FormField
                    control={form.control} name="showAcademicSection"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow mb-4">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Show Academic Section</FormLabel>
                          <FormDescription>Include your academic background in the portfolio.</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  {watchShowAcademicSection && (
                    <>
                      <FormField
                        control={form.control} name="showAcademic1"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                             <FormLabel>Show Academic Achievement 1</FormLabel>
                          </FormItem>
                        )}
                      />
                      {renderAcademicFields(1)}
                      <Separator className="my-6"/>
                      <FormField
                        control={form.control} name="showAcademic2"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            <FormLabel>Show Academic Achievement 2</FormLabel>
                          </FormItem>
                        )}
                      />
                      {renderAcademicFields(2)}
                    </>
                  )}
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
          
          <AccordionItem value="projects-section" className="border-none p-0">
            <Card>
              <CardHeader className="p-0">
                <AccordionTrigger className="flex w-full items-start justify-between rounded-t-lg p-6 text-left hover:bg-muted/50 data-[state=closed]:rounded-b-lg transition-colors hover:no-underline">
                  <div className="space-y-1 text-left">
                    <CardTitle className="text-xl">🚀 Projects Section</CardTitle>
                    <CardDescription>Showcase up to two of your best projects.</CardDescription>
                  </div>
                </AccordionTrigger>
              </CardHeader>
              <AccordionContent>
                <CardContent className="px-6 pb-6 pt-4 space-y-4">
                  <FormField
                    control={form.control} name="showProjectsSection"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow mb-4">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Show Projects Section</FormLabel>
                           <FormDescription>Include the "Projects" section in your portfolio.</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  {watchShowProjectsSection && (
                    <>
                      <FormField
                        control={form.control} name="showProject1"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                             <FormLabel>Show Project 1</FormLabel>
                          </FormItem>
                        )}
                      />
                      {renderProjectFields(1)}
                      <Separator className="my-6"/>
                      <FormField
                        control={form.control} name="showProject2"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            <FormLabel>Show Project 2</FormLabel>
                          </FormItem>
                        )}
                      />
                      {renderProjectFields(2)}
                    </>
                  )}
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="skills-section" className="border-none p-0">
            <Card>
              <CardHeader className="p-0">
                <AccordionTrigger className="flex w-full items-center justify-between rounded-t-lg p-6 text-left hover:bg-muted/50 data-[state=closed]:rounded-b-lg transition-colors hover:no-underline">
                  <CardTitle className="text-xl">🛠️ Skills Section</CardTitle>
                </AccordionTrigger>
              </CardHeader>
              <AccordionContent>
                <CardContent className="space-y-4 px-6 pb-6 pt-4">
                    <FormField
                        control={form.control} name="showSkillsSection"
                        render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow mb-4">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Show Skills Section</FormLabel>
                                <FormDescription>Include your skills in the portfolio.</FormDescription>
                            </div>
                        </FormItem>
                        )}
                    />
                    {form.watch("showSkillsSection") && (
                         <FormField control={form.control} name="aboutSkills" render={({ field }) => (
                            <FormItem><FormLabel>Key Skills</FormLabel><FormControl><Textarea placeholder="e.g., JavaScript, React, Python, Figma, UI/UX Design (can be comma-separated or a paragraph)" {...field} className="min-h-[100px]" /></FormControl><FormDescription>Comma-separated or a paragraph.</FormDescription><FormMessage /></FormItem>
                        )} />
                    )}
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          <AccordionItem value="contact-section" className="border-none p-0">
            <Card>
              <CardHeader className="p-0">
                <AccordionTrigger className="flex w-full items-center justify-between rounded-t-lg p-6 text-left hover:bg-muted/50 data-[state=closed]:rounded-b-lg transition-colors hover:no-underline">
                  <CardTitle className="text-xl">📞 Contact &amp; Links (Footer)</CardTitle>
                </AccordionTrigger>
              </CardHeader>
              <AccordionContent>
                <CardContent className="space-y-4 px-6 pb-6 pt-4">
                  <FormField
                    control={form.control} name="showContactSection"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow mb-4">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Show Footer (Contact Info &amp; Links)</FormLabel>
                          <FormDescription>Include footer with contact information and social links.</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  {watchShowContactSection && (
                    <>
                      <FormField control={form.control} name="contactEmail" render={({ field }) => (
                        <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="your.email@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField control={form.control} name="contactLinkedin" render={({ field }) => (
                          <FormItem><FormLabel>LinkedIn URL (Optional)</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/..." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="contactGithub" render={({ field }) => (
                          <FormItem><FormLabel>GitHub URL (Optional)</FormLabel><FormControl><Input placeholder="https://github.com/..." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="contactInstagram" render={({ field }) => (
                          <FormItem><FormLabel>Instagram URL (Optional)</FormLabel><FormControl><Input placeholder="https://instagram.com/..." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <FormField
                        control={form.control} name="showResumeLink"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            <FormLabel>Show Resume/CV Link in Footer</FormLabel>
                          </FormItem>
                        )}
                      />
                      {form.watch("showResumeLink") && (
                        <FormField control={form.control} name="resumeUrl" render={({ field }) => (
                          <FormItem><FormLabel>Resume/CV URL (Optional)</FormLabel><FormControl><Input placeholder="https://example.com/resume.pdf" {...field} /></FormControl><FormDescription>Link to your downloadable resume.</FormDescription><FormMessage /></FormItem>
                        )} />
                      )}
                    </>
                  )}
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
          
        </Accordion>

        <Separator />

        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Portfolio...
              </>
            ) : (
              "Generate Portfolio Preview"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
