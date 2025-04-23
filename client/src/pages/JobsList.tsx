import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { getQueryFn } from "@/lib/queryClient";

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

export default function JobsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['/api/jobs'],
    queryFn: getQueryFn<Job[]>({ on401: "throw" }),
  });

  const filteredJobs = jobs?.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Available Jobs</h1>
              <p className="text-gray-400">Find the perfect editing project for your skills</p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
              <Input
                className="bg-gray-800 border-gray-700"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Link href="/post-job">
                <Button>Post a Job</Button>
              </Link>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="bg-gray-800 border border-gray-700">
                  <CardContent className="p-5">
                    <Skeleton className="h-6 w-3/4 bg-gray-700 mb-3" />
                    <Skeleton className="h-4 w-1/2 bg-gray-700 mb-6" />
                    <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                    <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                    <Skeleton className="h-4 w-3/4 bg-gray-700 mb-4" />
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Skeleton className="h-5 w-16 bg-gray-700 rounded-full" />
                      <Skeleton className="h-5 w-20 bg-gray-700 rounded-full" />
                      <Skeleton className="h-5 w-14 bg-gray-700 rounded-full" />
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                      <Skeleton className="h-6 w-24 bg-gray-700 rounded-full" />
                      <Skeleton className="h-4 w-20 bg-gray-700" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <div className="text-red-400 mb-4">Error loading jobs</div>
              <Button 
                variant="secondary"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : filteredJobs && filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`}>
                  <Card className="bg-gray-800 hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] border border-gray-700 hover:border-purple-500/30 h-full">
                    <CardContent className="p-5">
                      <h2 className="font-bold text-xl mb-1 truncate">{job.title}</h2>
                      <p className="text-sm text-gray-400 mb-4">{job.jobType} | {job.employmentType}</p>
                      <p className="text-gray-300 mb-3 line-clamp-3">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.slice(0, 3).map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                            +{job.skills.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                        <div className="font-medium text-purple-500">
                          ${job.minPrice} - ${job.maxPrice} <span className="text-gray-400 text-xs">/{job.priceType}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="h-16 w-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-medium mb-1">No jobs found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm ? "Try a different search term or" : "Be the first to"} post a job on ConnectCut
              </p>
              <Link href="/post-job">
                <Button>Post a Job</Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
