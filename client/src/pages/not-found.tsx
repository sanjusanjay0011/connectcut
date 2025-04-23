import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f0f0f] text-white">
      <Card className="w-full max-w-md mx-4 bg-gray-900 border border-gray-800">
        <CardContent className="pt-6 pb-8 flex flex-col items-center text-center">
          <div className="mb-6">
            <svg className="h-24 w-24 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
          
          <p className="text-gray-400 mb-8 max-w-xs mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-x-4">
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
            <Link href="/jobs">
              <Button variant="outline">Browse Jobs</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
