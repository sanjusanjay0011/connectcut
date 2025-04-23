import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/Footer";
import { getQueryFn } from "@/lib/queryClient";

type EditorProfile = {
  id: number;
  userId: number;
  title: string;
  description: string;
  skills: string[];
  hourlyRate: number;
  experience: number;
  portfolioUrl: string | null;
  isAvailable: boolean;
};

type User = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  avatarUrl: string | null;
};

type Review = {
  id: number;
  editorId: number;
  creatorId: number;
  rating: number;
  comment: string | null;
  createdAt: string;
};

export default function EditorProfile() {
  const { id } = useParams<{ id: string }>();
  
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['/api/users', id],
    queryFn: getQueryFn<User>({ on401: "throw" }),
    enabled: !!id,
  });

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['/api/users', id, 'editor-profile'],
    queryFn: getQueryFn<EditorProfile>({ on401: "throw" }),
    enabled: !!id,
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ['/api/reviews/editor', id],
    queryFn: getQueryFn<Review[]>({ on401: "throw" }),
    enabled: !!id,
  });

  const isLoading = userLoading || profileLoading || reviewsLoading;
  const averageRating = reviews?.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;

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
          <Link href="/editors" className="text-purple-500 hover:text-purple-400 flex items-center mb-6">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Editors
          </Link>

          {isLoading ? (
            <div>
              <div className="flex flex-col lg:flex-row gap-8 mb-12">
                <div className="w-full lg:w-1/3">
                  <Card className="bg-gray-900 border border-gray-800">
                    <CardContent className="p-6 flex flex-col items-center">
                      <Skeleton className="h-24 w-24 rounded-full bg-gray-700 mb-4" />
                      <Skeleton className="h-7 w-48 bg-gray-700 mb-2" />
                      <Skeleton className="h-5 w-32 bg-gray-700 mb-4" />
                      <Skeleton className="h-6 w-20 rounded-full bg-gray-700 mb-6" />
                      <Skeleton className="h-10 w-full bg-gray-700 rounded mb-3" />
                      <Skeleton className="h-10 w-full bg-gray-700 rounded" />
                    </CardContent>
                  </Card>
                </div>
                <div className="w-full lg:w-2/3">
                  <Card className="bg-gray-900 border border-gray-800 mb-6">
                    <CardContent className="p-6">
                      <Skeleton className="h-7 w-48 bg-gray-700 mb-4" />
                      <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                      <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                      <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                      <Skeleton className="h-4 w-3/4 bg-gray-700 mb-6" />
                      <Skeleton className="h-7 w-48 bg-gray-700 mb-4" />
                      <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-20 bg-gray-700 rounded-full" />
                        <Skeleton className="h-6 w-24 bg-gray-700 rounded-full" />
                        <Skeleton className="h-6 w-16 bg-gray-700 rounded-full" />
                        <Skeleton className="h-6 w-20 bg-gray-700 rounded-full" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-900 border border-gray-800">
                    <CardContent className="p-6">
                      <Skeleton className="h-7 w-48 bg-gray-700 mb-4" />
                      <div className="space-y-6">
                        {[...Array(3)].map((_, index) => (
                          <div key={index} className="border-b border-gray-800 pb-4 last:border-b-0 last:pb-0">
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center">
                                <Skeleton className="h-10 w-10 rounded-full bg-gray-700 mr-3" />
                                <div>
                                  <Skeleton className="h-5 w-32 bg-gray-700 mb-1" />
                                  <Skeleton className="h-4 w-24 bg-gray-700" />
                                </div>
                              </div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, starIndex) => (
                                  <Skeleton key={starIndex} className="h-4 w-4 bg-gray-700 mr-1" />
                                ))}
                              </div>
                            </div>
                            <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
                            <Skeleton className="h-4 w-3/4 bg-gray-700" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : user && profile ? (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/3">
                <Card className="bg-gray-900 border border-gray-800 sticky top-28">
                  <CardContent className="p-6 flex flex-col items-center">
                    {user.avatarUrl ? (
                      <img 
                        src={user.avatarUrl}
                        alt={user.fullName}
                        className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-purple-500"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 text-purple-500 font-bold text-4xl">
                        {user.fullName.charAt(0)}
                      </div>
                    )}
                    <h1 className="text-2xl font-bold text-center mb-1">{user.fullName}</h1>
                    <p className="text-gray-400 mb-2">@{user.username}</p>
                    
                    {profile.isAvailable ? (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-green-300 mb-6">
                        Available for Work
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-400 mb-6">
                        Unavailable
                      </span>
                    )}
                    
                    <div className="w-full space-y-3">
                      <Button className="w-full">Contact Editor</Button>
                      <Link href="/post-job">
                        <Button variant="outline" className="w-full">Post a Job</Button>
                      </Link>
                    </div>
                    
                    <div className="w-full mt-6 pt-6 border-t border-gray-800">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-400">Hourly Rate</span>
                        <span className="font-bold text-xl text-purple-500">${profile.hourlyRate}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-400">Experience</span>
                        <span className="font-medium">{profile.experience} years</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Rating</span>
                        <div className="flex items-center">
                          <span className="font-medium mr-1">{averageRating.toFixed(1)}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, index) => (
                              <svg 
                                key={index}
                                className={`w-4 h-4 ${index < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-600'}`}
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1 text-gray-400 text-sm">({reviews?.length || 0})</span>
                        </div>
                      </div>
                      
                      {profile.portfolioUrl && (
                        <div className="mt-4 pt-4 border-t border-gray-800">
                          <a 
                            href={profile.portfolioUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-purple-500 hover:text-purple-400 text-sm flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                            View Portfolio
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="w-full lg:w-2/3">
                <Card className="bg-gray-900 border border-gray-800 mb-8">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">{profile.title}</h2>
                    <div className="text-gray-300 whitespace-pre-line">
                      {profile.description}
                    </div>
                    
                    <h3 className="text-xl font-bold mt-8 mb-4">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900 border border-gray-800">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Reviews</h2>
                    
                    {reviews?.length ? (
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-800 pb-6 last:border-b-0 last:pb-0">
                            <div className="flex justify-between mb-3">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-3 text-gray-400 font-bold">
                                  C
                                </div>
                                <div>
                                  <h4 className="font-medium">Creator</h4>
                                  <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, index) => (
                                  <svg 
                                    key={index}
                                    className={`w-5 h-5 ${index < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                ))}
                              </div>
                            </div>
                            {review.comment && (
                              <p className="text-gray-300">{review.comment}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <svg className="h-12 w-12 text-gray-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <h3 className="text-lg font-medium mb-1">No Reviews Yet</h3>
                        <p className="text-gray-400">
                          This editor hasn't received any reviews yet.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="h-16 w-16 text-red-500/40 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-medium mb-2">Editor Not Found</h3>
              <p className="text-gray-400 mb-6">
                The editor profile you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/editors">
                <Button>Browse Editors</Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
