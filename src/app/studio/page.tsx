// src/app/studio/page.tsx
"use client";

import { useState } from "react";
import Link from 'next/link';
import { RequirementForm } from "@/components/RequirementForm";
import { LivePreview } from "@/components/LivePreview";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateWebsiteFromTemplateAction } from "./actions";
import type { FormSchemaType } from "@/schemas/websiteFormSchema";
import { LogoIcon } from "@/components/icons/LogoIcon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export default function StudioPage() {
  const [previewSrcDoc, setPreviewSrcDoc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: FormSchemaType) => {
    setIsLoading(true);
    setPreviewSrcDoc(null);

    try {
      const result = await generateWebsiteFromTemplateAction(data);
      if (result.success && result.previewHtml) {
        setPreviewSrcDoc(result.previewHtml);
        toast({
          title: "Portfolio Preview Generated!",
          description: "A live preview of your themed website is now available below. The main Studio application theme remains static.",
        });
      } else {
        toast({
          title: "Generation Failed",
          description: result.error || "An unknown error occurred.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto flex items-center justify-between p-4 h-16">
          <Link href="/" className="flex items-center space-x-2">
            <LogoIcon className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">AutoSite <span className="text-destructive"> Studio</span></h1>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 flex items-center justify-center text-center">
            <Sparkles className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 mr-2 text-primary animate-pulse" />
            Welcome to AutoSite <span className="text-destructive">&nbsp;Studio</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Ready to craft your stunning portfolio? Fill out the form below – it only takes a few minutes to get started!
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:gap-8">
          <section id="form-section">
            <Card className="shadow-lg transition-all hover:shadow-xl hover:bg-gradient-to-br hover:from-card hover:via-primary/5 hover:to-accent/5">
              <CardHeader>
                <CardTitle className="text-xl">Describe Your Website</CardTitle>
                <CardDescription>Fill in the details below, and a themed portfolio will be generated for you.</CardDescription>
              </CardHeader>
              <CardContent>
                <RequirementForm
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          </section>

          <section id="output-section" className="space-y-6 lg:space-y-8">
            <Card className="shadow-lg transition-all hover:shadow-xl hover:bg-gradient-to-br hover:from-card hover:via-primary/5 hover:to-accent/5">
              <CardHeader>
                <CardTitle className="text-xl">Live Preview</CardTitle>
              </CardHeader>
              <CardContent className={cn(
                "pt-0",
                previewSrcDoc ? "p-0" : "p-6"
              )}>
                <LivePreview htmlContent={previewSrcDoc} />
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <footer className="border-t">
        <div className="container mx-auto p-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} AutoSite Studio. Powered by Websters.
        </div>
      </footer>
    </div>
  );
}
