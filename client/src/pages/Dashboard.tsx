import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { getQueryFn } from "@/lib/queryClient";

export default function Dashboard() {
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Get user from localStorage (in a real app, you'd use a proper auth system)
  const userString = typeof window !== 'undefined' ? localStorage.getItem("user") : null;
  const user = userString ? JSON.parse(userString) : null;
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "You need to be logged in to access the dashboard",
      });
      navigate("/login");
    }
  }, [user, navigate, toast]);

  const { data: jobs, isLoading: jobsLoading } = useQuery({
    queryKey: ['/api/jobs/creator', user?.id],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!user && user.role === "creator",
  });

  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ['/api/applications/editor', user?.id],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!user && user.role === "editor",
  });

  const { data: editorProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['/api/users', user?.id, 'editor-profile'],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!user && user.role === "editor",
  });

  if (!user) {
    return null; // Will redirect in useEffect
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

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" className="flex items-center" onClick={() => {
                localStorage.removeItem("user");
                navigate("/");
              }}>
                <span className="mr-2">Logout</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-400">Welcome back, {user?.fullName || "User"}</p>
            </div>
            <div className="mt-4 md:mt-0">
              {user.role === "creator" ? (
                <Link href="/post-job">
                  <Button>Post a New Job</Button>
                </Link>
              ) : (
                <Link href="/jobs">
                  <Button>Find Jobs</Button>
                </Link>
              )}
            </div>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-gray-800 border border-gray-700">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {user.role === "creator" ? (
                <TabsTrigger value="jobs">My Jobs</TabsTrigger>
              ) : (
                <TabsTrigger value="applications">My Applications</TabsTrigger>
              )}
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gray-900 border border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Account Status</CardTitle>
                    <CardDescription>Your current membership level</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center mr-3">
                        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Active</p>
                        <p className="text-sm text-gray-400">Free Plan</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900 border border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">User Role</CardTitle>
                    <CardDescription>Your current account role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">
                        <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium capitalize">{user.role}</p>
                        <p className="text-sm text-gray-400">
                          {user.role === "creator" ? "Posting Jobs" : "Finding Work"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900 border border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Activity</CardTitle>
                    <CardDescription>Your recent platform activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-3">
                        <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">
                          {user.role === "creator" 
                            ? `${jobs?.length || 0} Jobs Posted` 
                            : `${applications?.length || 0} Applications`}
                        </p>
                        <p className="text-sm text-gray-400">Last 30 days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-gray-900 border border-gray-800">
                <CardHeader>
                  <CardTitle>Welcome to ConnectCut</CardTitle>
                  <CardDescription>
                    Your hub for connecting YouTube creators with talented video editors
                  </CardDescription>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none">
                  <p>
                    {user.role === "creator" 
                      ? "As a content creator, you can post jobs to find the perfect video editor for your YouTube channel. Browse through our talented pool of editors, each with verified skills and experience."
                      : "As a video editor, you can apply to jobs posted by YouTube creators. Showcase your skills, build your portfolio, and connect with creators who need your expertise."}
                  </p>
                  <div className="bg-gray-800 p-4 rounded-lg mt-4">
                    <h3 className="mt-0 text-lg font-medium">Quick Tips</h3>
                    <ul className="mt-2">
                      {user.role === "creator" ? (
                        <>
                          <li>Post detailed job descriptions to attract the right editors</li>
                          <li>Include your budget range to get more relevant applications</li>
                          <li>Review editor profiles and ratings before making a decision</li>
                        </>
                      ) : (
                        <>
                          <li>Keep your profile up to date with your latest skills</li>
                          <li>Respond quickly to job applications for better chances</li>
                          <li>Ask for reviews from creators after completing projects</li>
                        </>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="jobs" className="space-y-6">
              {jobsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <Card key={index} className="bg-gray-900 border border-gray-800">
                      <CardContent className="p-6">
                        <div className="flex justify-between mb-4">
                          <Skeleton className="h-7 w-48 bg-gray-700" />
                          <Skeleton className="h-6 w-24 rounded-full bg-gray-700" />
                        </div>
                        <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                        <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                        <Skeleton className="h-4 w-3/4 bg-gray-700 mb-4" />
                        <div className="flex justify-between">
                          <Skeleton className="h-6 w-32 bg-gray-700" />
                          <Skeleton className="h-9 w-20 rounded bg-gray-700" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : jobs && jobs.length > 0 ? (
                <div className="space-y-4">
                  {jobs.map((job: any) => (
                    <Card key={job.id} className="bg-gray-900 border border-gray-800">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                          <h3 className="text-xl font-bold mb-2 sm:mb-0">{job.title}</h3>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            job.isActive 
                              ? "bg-green-900 text-green-300" 
                              : "bg-gray-800 text-gray-400"
                          }`}>
                            {job.isActive ? "Active" : "Closed"}
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4 line-clamp-2">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.slice(0, 3).map((skill: string, idx: number) => (
                            <span 
                              key={idx} 
                              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                              +{job.skills.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t border-gray-800">
                          <div className="flex items-center mb-3 sm:mb-0">
                            <svg className="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm text-gray-400">
                              Posted on {new Date(job.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <Link href={`/jobs/${job.id}`}>
                            <Button size="sm" variant="secondary">View Details</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-gray-900 border border-gray-800">
                  <CardContent className="p-6 text-center py-12">
                    <svg className="h-16 w-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-xl font-medium mb-2">No Jobs Posted Yet</h3>
                    <p className="text-gray-400 mb-6">
                      You haven't posted any jobs yet. Create your first job to find video editors.
                    </p>
                    <Link href="/post-job">
                      <Button>Post a Job</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="applications" className="space-y-6">
              {applicationsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <Card key={index} className="bg-gray-900 border border-gray-800">
                      <CardContent className="p-6">
                        <div className="flex justify-between mb-4">
                          <Skeleton className="h-7 w-48 bg-gray-700" />
                          <Skeleton className="h-6 w-24 rounded-full bg-gray-700" />
                        </div>
                        <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                        <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                        <Skeleton className="h-4 w-3/4 bg-gray-700 mb-4" />
                        <div className="flex justify-between">
                          <Skeleton className="h-6 w-32 bg-gray-700" />
                          <Skeleton className="h-9 w-20 rounded bg-gray-700" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : applications && applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.map((application: any) => (
                    <Card key={application.id} className="bg-gray-900 border border-gray-800">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                          <h3 className="text-xl font-bold mb-2 sm:mb-0">Application #{application.id}</h3>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            application.status === "accepted" 
                              ? "bg-green-900 text-green-300" 
                              : application.status === "rejected"
                              ? "bg-red-900/60 text-red-300"
                              : "bg-yellow-900/60 text-yellow-300"
                          }`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4 line-clamp-3">
                          {application.coverLetter}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t border-gray-800">
                          <div className="flex items-center mb-3 sm:mb-0">
                            <svg className="h-5 w-5 text-purple-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium text-purple-500">
                              ${application.price}
                            </span>
                          </div>
                          <Link href={`/jobs/${application.jobId}`}>
                            <Button size="sm" variant="secondary">View Job</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-gray-900 border border-gray-800">
                  <CardContent className="p-6 text-center py-12">
                    <svg className="h-16 w-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-xl font-medium mb-2">No Applications Yet</h3>
                    <p className="text-gray-400 mb-6">
                      You haven't applied to any jobs yet. Browse jobs and start applying.
                    </p>
                    <Link href="/jobs">
                      <Button>Find Jobs</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-gray-900 border border-gray-800">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Your personal account details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3 font-medium text-gray-400 mb-1 sm:mb-0">Name</div>
                      <div>{user.fullName}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3 font-medium text-gray-400 mb-1 sm:mb-0">Username</div>
                      <div>@{user.username}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3 font-medium text-gray-400 mb-1 sm:mb-0">Email</div>
                      <div>{user.email}</div>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3 font-medium text-gray-400 mb-1 sm:mb-0">Account Type</div>
                      <div className="capitalize">{user.role}</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        // In a real app, you'd navigate to an edit profile page
                        toast({
                          title: "Feature Coming Soon",
                          description: "Profile editing will be available in the next update.",
                        });
                      }}
                    >
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {user.role === "editor" && (
                <Card className="bg-gray-900 border border-gray-800">
                  <CardHeader>
                    <CardTitle>Editor Profile</CardTitle>
                    <CardDescription>
                      Your professional editor profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {profileLoading ? (
                      <div className="space-y-4">
                        <Skeleton className="h-7 w-48 bg-gray-700 mb-2" />
                        <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                        <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                        <Skeleton className="h-4 w-3/4 bg-gray-700 mb-4" />
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Skeleton className="h-6 w-20 bg-gray-700 rounded-full" />
                          <Skeleton className="h-6 w-24 bg-gray-700 rounded-full" />
                          <Skeleton className="h-6 w-16 bg-gray-700 rounded-full" />
                        </div>
                        <Skeleton className="h-9 w-36 rounded bg-gray-700" />
                      </div>
                    ) : editorProfile ? (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{editorProfile.title}</h3>
                          <p className="text-gray-300">{editorProfile.description}</p>
                        </div>
                        
                        <div className="pt-4">
                          <h4 className="font-medium text-gray-400 mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {editorProfile.skills.map((skill: string, idx: number) => (
                              <span 
                                key={idx} 
                                className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                          <div>
                            <h4 className="font-medium text-gray-400 mb-1">Hourly Rate</h4>
                            <p className="font-bold text-purple-500">${editorProfile.hourlyRate}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-400 mb-1">Experience</h4>
                            <p>{editorProfile.experience} years</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-400 mb-1">Availability</h4>
                            <p>{editorProfile.isAvailable ? "Available" : "Unavailable"}</p>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-gray-800">
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              // In a real app, you'd navigate to an edit profile page
                              toast({
                                title: "Feature Coming Soon",
                                description: "Profile editing will be available in the next update.",
                              });
                            }}
                          >
                            Edit Editor Profile
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <svg className="h-12 w-12 text-gray-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <h3 className="text-lg font-medium mb-2">No Editor Profile Yet</h3>
                        <p className="text-gray-400 mb-4">
                          Create your editor profile to start applying for jobs.
                        </p>
                        <Link href="/join-as-editor">
                          <Button>Create Editor Profile</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
