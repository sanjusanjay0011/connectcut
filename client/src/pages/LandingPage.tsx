import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreatorCarousel from "@/components/CreatorCarousel";
import JobSection from "@/components/JobSection";
import TalentSection from "@/components/TalentSection";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

            {/* Desktop Navigation */}
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
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden border-t border-gray-800 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/post-job" className="block px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white">Post Job</Link>
            <Link href="/join-as-editor" className="block px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white">Join as Editor</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white">About</Link>
            <Link href="/login" className="block px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white">Login</Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 pt-12 pb-16 sm:pb-24 sm:pt-20 lg:pt-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                Connect with top <span className="text-purple-500">YouTube editors</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
                The marketplace where content creators find professional video editors to elevate their YouTube content.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Link href="/editors">
                  <Button size="lg" className="transform hover:scale-105">
                    Find an Editor
                  </Button>
                </Link>
                <Link href="/join-as-editor">
                  <Button size="lg" variant="outline" className="transform hover:scale-105">
                    Offer Your Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Carousel */}
        <CreatorCarousel />

        {/* Job Section */}
        <JobSection />

        {/* Talent Section */}
        <TalentSection />

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#2d1842] to-[#1f1f1f]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to transform your YouTube channel?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              Whether you're looking for talent or offering your editing skills, ConnectCut is the platform that brings YouTube creators and editors together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/editors">
                <Button size="lg" className="transform hover:scale-105">
                  Find an Editor
                </Button>
              </Link>
              <Link href="/join-as-editor">
                <Button size="lg" variant="outline" className="transform hover:scale-105">
                  Join as an Editor
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
