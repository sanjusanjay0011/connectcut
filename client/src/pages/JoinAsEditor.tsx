import Switch from '../components/ui/switch';
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const editorProfileSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  skills: z.string().min(1, { message: "Please enter at least one skill" }),
  hourlyRate: z.string().min(1, { message: "Please enter your hourly rate" }),
  portfolioUrl: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  experience: z.string().min(1, { message: "Please enter your years of experience" }),
  isAvailable: z.boolean().default(true),
});

type EditorProfileFormValues = z.infer<typeof editorProfileSchema>;

export default function JoinAsEditor() {
  const [isLoading, setIsLoading] = useState(false);
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  // Get user from localStorage (in a real app, you'd use a proper auth system)
  const userString = typeof window !== 'undefined' ? localStorage.getItem("user") : null;
  const user = userString ? JSON.parse(userString) : null;

  const form = useForm<EditorProfileFormValues>({
    resolver: zodResolver(editorProfileSchema),
    defaultValues: {
      title: "",
      description: "",
      skills: "",
      hourlyRate: "",
      portfolioUrl: "",
      experience: "",
      isAvailable: true,
    },
  });

  async function onSubmit(data: EditorProfileFormValues) {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "You need to be logged in to create an editor profile",
      });
      setLocation("/login");
      return;
    }

    setIsLoading(true);
    
    try {
      // Transform form data to match API expectations
      const profileData = {
        userId: user.id,
        title: data.title,
        description: data.description,
        skills: data.skills.split(',').map(skill => skill.trim()), // Convert comma-separated string to array
        hourlyRate: parseInt(data.hourlyRate),
        portfolioUrl: data.portfolioUrl || null,
        experience: parseInt(data.experience),
        isAvailable: data.isAvailable,
      };

      const response = await apiRequest("/api/editor-profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });
      
      toast({
        title: "Profile Created Successfully",
        description: "Your editor profile has been created. You can now be found by creators!",
      });
      
      setLocation("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error Creating Profile",
        description: error.message || "There was an error creating your profile.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // If user is not logged in or is not registered as an editor, show message
  if (user && user.role !== "editor") {
    return (
      <div className="bg-[#0f0f0f] min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-purple-500 hover:text-purple-400 flex items-center mb-6">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Home
          </Link>
          
          <Card className="bg-gray-900 border border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Join as an Editor</CardTitle>
              <CardDescription>
                You're currently registered as a creator. To offer your services as an editor, you need to create a new account with the "Video Editor" role.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex flex-col items-center pt-6 pb-8">
              <Link href="/signup">
                <Button>Create Editor Account</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-purple-500 hover:text-purple-400 flex items-center mb-6">
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Home
        </Link>
        
        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create Your Editor Profile</CardTitle>
            <CardDescription>
              Showcase your skills and experience to find work with YouTube creators
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Title</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-gray-800 border-gray-700"
                          placeholder="e.g., Gaming Video Editor, Tech Review Specialist" 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          className="bg-gray-800 border-gray-700 min-h-[150px]"
                          placeholder="Describe your experience, style, and the types of projects you excel at" 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="bg-gray-800 border-gray-700"
                            placeholder="e.g., Premiere Pro, After Effects, Color Grading" 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          Enter skills separated by commas
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="number"
                            className="bg-gray-800 border-gray-700"
                            placeholder="e.g., 3" 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="hourlyRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hourly Rate (USD)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="number"
                            className="bg-gray-800 border-gray-700"
                            placeholder="e.g., 30" 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="portfolioUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Portfolio URL</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="bg-gray-800 border-gray-700"
                            placeholder="e.g., https://yourportfolio.com" 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          Optional: Link to your portfolio website or YouTube channel
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="isAvailable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4 bg-gray-800/50">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Available for Work</FormLabel>
                        <FormDescription className="text-gray-400">
                          Turn this off if you're currently unavailable for new projects
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end pt-4">
                  <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? "Creating Profile..." : "Create Editor Profile"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
