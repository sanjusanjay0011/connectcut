import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CreatorCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const creators = [
    {
      name: "Alex Gaming",
      image: "https://i.pravatar.cc/150?img=32",
      followers: "1.2M",
      description: "Found my gaming channel editor through ConnectCut. Views are up 40% since we started working together!"
    },
    {
      name: "Sarah Lifts",
      image: "https://i.pravatar.cc/150?img=26",
      followers: "845K",
      description: "As a fitness creator, I needed someone who understood my niche. ConnectCut helped me find the perfect match!"
    },
    {
      name: "TechWithMike",
      image: "https://i.pravatar.cc/150?img=53",
      followers: "3.5M",
      description: "The editor I found through ConnectCut takes my tech reviews to the next level. Couldn't be happier!"
    },
    {
      name: "Cooking with Maria",
      image: "https://i.pravatar.cc/150?img=9",
      followers: "925K",
      description: "Working with editors from ConnectCut has allowed me to focus on recipes while they make my videos shine."
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === creators.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? creators.length - 1 : prevIndex - 1));
  };

  // Auto advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Trusted by YouTube's Top Creators</h2>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {creators.map((creator, index) => (
                <div key={index} className="min-w-full px-4">
                  <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 p-6 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/40 to-black">
                          <img 
                            src={creator.image} 
                            alt={creator.name} 
                            className="w-24 h-24 rounded-full object-cover border-2 border-purple-500 mb-4"
                          />
                          <h3 className="text-xl font-bold text-center">{creator.name}</h3>
                          <p className="text-purple-400">{creator.followers} subscribers</p>
                        </div>
                        <div className="md:w-2/3 p-6 md:p-10 flex items-center">
                          <blockquote className="italic text-lg text-gray-300">
                            "{creator.description}"
                          </blockquote>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-black/50 hover:bg-black/80 p-3 rounded-full text-white z-10"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button 
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-black/50 hover:bg-black/80 p-3 rounded-full text-white z-10"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {creators.map((_, index) => (
              <button 
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  activeIndex === index ? 'bg-purple-500' : 'bg-gray-700'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
