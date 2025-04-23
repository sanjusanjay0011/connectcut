import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

export default function About() {
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
              <Link href="/about" className="text-purple-400 transition-colors duration-200">About</Link>
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

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                About <span className="text-purple-500">ConnectCut</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
                Bridging the gap between talented video editors and YouTube creators
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12 md:py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-300 mb-4">
                  ConnectCut was founded in 2023 with a simple but powerful mission: to create a platform where YouTube creators can find the perfect editors for their content, and where talented video editors can showcase their skills and find meaningful work.
                </p>
                <p className="text-gray-300">
                  We believe that the right collaboration between creators and editors leads to amazing content that captivates audiences and builds channels. Our goal is to make those perfect matches happen easily and reliably.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Video editing workspace" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-gray-300">
                  We foster a supportive ecosystem where creators and editors can grow together, learn from each other, and build lasting professional relationships.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Quality</h3>
                <p className="text-gray-300">
                  We're committed to maintaining high standards. Our verification process and review system help ensure that every match results in professional, high-quality content.
                </p>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-gray-300">
                  We continuously develop new tools and features to make collaboration easier and more effective, staying ahead of industry trends and creator needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 md:py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                {
                  name: "Alex Rivera",
                  title: "Founder & CEO",
                  bio: "Former YouTube creator who saw the need for a better way to connect creators with editors.",
                  img: 26
                },
                {
                  name: "Sarah Chen",
                  title: "Head of Creator Relations",
                  bio: "Passionate about helping creators find their perfect creative partners.",
                  img: 31
                },
                {
                  name: "Michael Johnson",
                  title: "Lead Developer",
                  bio: "Building the technology that powers seamless collaborations.",
                  img: 25
                },
                {
                  name: "Emma Yang",
                  title: "Community Manager",
                  bio: "Fostering a supportive environment for all members of the ConnectCut community.",
                  img: 37
                }
              ].map((member, index) => (
                <div key={index} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                  <img 
                    src={`https://i.pravatar.cc/300?img=${member.img}`}
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-purple-400 text-sm mb-2">{member.title}</p>
                    <p className="text-gray-300 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "How does ConnectCut work?",
                  answer: "ConnectCut is a marketplace that connects YouTube creators with video editors. Creators can post jobs with their requirements, while editors can create profiles showcasing their skills. Both parties can browse, connect, and collaborate through our platform."
                },
                {
                  question: "Is ConnectCut free to use?",
                  answer: "Basic accounts are free for both creators and editors. We offer premium subscription options with additional features such as featured listings, advanced search filters, and priority support."
                },
                {
                  question: "How do payments work?",
                  answer: "ConnectCut offers a secure payment system. Creators can pay editors directly through our platform, which protects both parties and ensures fair transactions. We handle payment processing and release funds upon project completion."
                },
                {
                  question: "Can I use ConnectCut if I'm not on YouTube?",
                  answer: "While ConnectCut is primarily designed for YouTube creators, we welcome content creators from all platforms including TikTok, Instagram, Twitch, and others."
                },
                {
                  question: "How do you verify editors' skills?",
                  answer: "We have a verification process for editors that includes portfolio reviews and skill assessments. Additionally, our review system allows creators to rate and comment on their experiences working with editors."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#2d1842] to-[#1f1f1f]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to join the ConnectCut community?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              Whether you're looking to find the perfect editor for your channel or showcase your editing skills to creators, ConnectCut is the platform for you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="transform hover:scale-105">
                  Get Started
                </Button>
              </Link>
              <Link href="/post-job">
                <Button size="lg" variant="outline" className="transform hover:scale-105">
                  Post a Job
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
