import { useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, getQueryFn } from "@/lib/queryClient";

type Job = {
  id: number;
  title: string;
  description: string;
  jobType: string;
  employmentType: string;
  minPrice: number;
  maxPrice: number;
  priceType: string;
  skills: string[];
  creatorId: number;
  createdAt: string;
  isActive: boolean;
};

type Creator = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  avatarUrl: string | null;
};

const applicationSchema = z.object({
  coverLetter: z.string().min(20, { message: "Cover letter must be at least 20 characters" }),
  price: z.string().min(1, { message: "Please enter your price" }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

export default function JobDetails() {
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  
  // Get user from localStorage (in a real app, you'd use a proper auth system)
  const userString = typeof window !== 'undefined' ? localStorage.getItem("user") : null;
  const user = userString ? JSON.parse(userString) : null;

  const { data: job, isLoading: jobLoading, error: jobError } = useQuery({
    queryKey: ['/api/jobs', id],
    queryFn: getQueryFn<Job>({ on401: "throw" }),
    enabled: !!id,
  });

  const { data: creator, isLoading: creatorLoading } = useQuery({
    queryKey: ['/api/users', job?.creatorId],
    queryFn: getQueryFn<Creator>({ on401: "throw" }),
    enabled: !!job?.creatorId,
  });

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      coverLetter: "",
      price: "",
    },
  });

  const isLoading = jobLoading || creatorLoading;

  async function onSubmit(data: ApplicationFormValues) {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "You need to be logged in to apply for jobs",
      });
      navigate("/login");
      return;
    }

    if (user.role !== "editor") {
      toast({
        variant: "destructive",
        title: "Editor Account Required",
        description: "You need an editor account to apply for jobs",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Transform form data to match API expectations
      const applicationData = {
        jobId: parseInt(id),
        editorId: user.id,
        coverLetter: data.coverLetter,
        price: parseInt(data.price),
        status: "pending",
      };

      const response = await apiRequest("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });
      
      toast({
        title: "Application Submitted",
        description: "Your application has been sent to the creator.",
      });
      
      setIsApplying(false);
      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error Submitting Application",
        description: error.message || "There was an error submitting your application.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur-sm border-b border-gray-800 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <svg className="h-8 w-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-11h2v6h-2zm0-4h2v2h-2z"></path>
                </svg>
                <span className="ml-2 text-xl font-bold">ConnectCut</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/post-job" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Post Job</Link>
              <Link href="/join-as-editor" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">Join as Editor</Link>
              <Link href="/about" className="text-gray-300 hover:text-purple-400 transition-colors duration-200">About</Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="secondary" className="hidden sm:block">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Signup</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/jobs" className="text-purple-500 hover:text-purple-400 flex items-center mb-6">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Jobs
          </Link>

          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="bg-gray-900 border border-gray-800">
                  <CardContent className="p-6">
                    <Skeleton className="h-8 w-3/4 bg-gray-700 mb-3" />
                    <Skeleton className="h-5 w-1/3 bg-gray-700 mb-6" />
                    <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                    <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                    <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                    <Skeleton className="h-4 w-3/4 bg-gray-700 mb-6" />
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Skeleton className="h-6 w-20 bg-gray-700 rounded-full" />
                      <Skeleton className="h-6 w-24 bg-gray-700 rounded-full" />
                      <Skeleton className="h-6 w-16 bg-gray-700 rounded-full" />
                    </div>
                    <Skeleton className="h-10 w-32 bg-gray-700 rounded" />
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="bg-gray-900 border border-gray-800 mb-6">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-32 bg-gray-700 mb-4" />
                    <div className="flex items-center mb-4">
                      <Skeleton className="h-12 w-12 rounded-full bg-gray-700 mr-3" />
                      <div>
                        <Skeleton className="h-5 w-24 bg-gray-700 mb-1" />
                        <Skeleton className="h-4 w-16 bg-gray-700" />
                      </div>
                    </div>
                    <Skeleton className="h-10 w-full bg-gray-700 rounded" />
                  </CardContent>
                </Card>
                <Card className="bg-gray-900 border border-gray-800">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-40 bg-gray-700 mb-4" />
                    <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                    <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                    <Skeleton className="h-4 w-3/4 bg-gray-700" />
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : jobError ? (
            <div className="text-center py-16">
              <svg className="h-16 w-16 text-red-500/40 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-medium mb-2">Error Loading Job</h3>
              <p className="text-gray-400 mb-6">
                There was an error loading this job posting.
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  variant="secondary"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
                <Link href="/jobs">
                  <Button variant="outline">View All Jobs</Button>
                </Link>
              </div>
            </div>
          ) : job ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="bg-gray-900 border border-gray-800">
                  <CardContent className="p-6">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{job.title}</h1>
                    <p className="text-gray-400 mb-6">Posted {new Date(job.createdAt).toLocaleDateString()}</p>
                    
                    <div className="bg-gray-800/50 rounded-lg p-4 flex flex-wrap md:flex-nowrap gap-4 mb-6">
                      <div className="w-full md:w-1/3">
                        <h3 className="text-sm text-gray-400 mb-1">Job Type</h3>
                        <p className="font-medium">{job.jobType}</p>
                      </div>
                      <div className="w-full md:w-1/3">
                        <h3 className="text-sm text-gray-400 mb-1">Employment</h3>
                        <p className="font-medium">{job.employmentType}</p>
                      </div>
                      <div className="w-full md:w-1/3">
                        <h3 className="text-sm text-gray-400 mb-1">Budget</h3>
                        <p className="font-medium text-purple-500">
                          ${job.minPrice} - ${job.maxPrice} <span className="text-gray-400 text-xs">/{job.priceType}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="text-xl font-bold mb-3">Description</h2>
                      <div className="text-gray-300 whitespace-pre-line">
                        {job.description}
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h2 className="text-xl font-bold mb-3">Required Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Dialog open={isApplying} onOpenChange={setIsApplying}>
                      <DialogTrigger asChild>
                        <Button size="lg">Apply for this Job</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800">
                        <DialogHeader>
                          <DialogTitle>Apply to: {job.title}</DialogTitle>
                          <DialogDescription>
                            Tell the creator why you're the perfect editor for this job
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                            <FormField
                              control={form.control}
                              name="coverLetter"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Cover Letter</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      {...field} 
                                      className="bg-gray-800 border-gray-700 min-h-[150px]"
                                      placeholder="Introduce yourself and explain why you're a good fit for this project..." 
                                      disabled={isSubmitting}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="price"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Your Price (USD)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      {...field} 
                                      type="number"
                                      className="bg-gray-800 border-gray-700"
                                      placeholder={`e.g., ${job.minPrice}`}
                                      disabled={isSubmitting}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <DialogFooter className="pt-4">
                              <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit Application"}
                              </Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                {creator ? (
                  <Card className="bg-gray-900 border border-gray-800 mb-6">
                    <CardContent className="p-6">
                      <h2 className="text-lg font-bold mb-4">About the Creator</h2>
                      <div className="flex items-center mb-4">
                        {creator.avatarUrl ? (
                          <img 
                            src={creator.avatarUrl}
                            alt={creator.fullName}
                            className="w-12 h-12 rounded-full object-cover mr-3 border border-gray-700"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 text-purple-500 font-bold">
                            {creator.fullName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium">{creator.fullName}</h3>
                          <p className="text-sm text-gray-400">@{creator.username}</p>
                        </div>
                      </div>
                      <Button 
                        variant="secondary" 
                        className="w-full"
                        onClick={() => {
                          // In a real app, you'd navigate to the creator's profile
                          toast({
                            title: "Feature Coming Soon",
                            description: "Creator profiles will be available in the next update.",
                          });
                        }}
                      >
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                ) : null}
                
                <Card className="bg-gray-900 border border-gray-800">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold mb-4">How to Apply</h2>
                    <div className="text-gray-300 space-y-3">
                      <p>
                        Click the "Apply for this Job" button and include:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>A brief introduction about yourself</li>
                        <li>Your relevant experience and skills</li>
                        <li>Why you're interested in this particular project</li>
                        <li>Your proposed price for this job</li>
                      </ul>
                      <p className="text-sm text-gray-400 mt-4">
                        Note: You need to be registered as an editor to apply for jobs.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
