import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TalentSection() {
  const topEditors = [
    {
      id: 1,
      name: "Alex Johnson",
      title: "Gaming & Action Editor",
      avatar: "https://i.pravatar.cc/150?img=65",
      rate: "$30",
      experience: 4,
      specialties: ["Premiere Pro", "After Effects", "Motion Graphics"],
      available: true
    },
    {
      id: 2,
      name: "Emma Chen",
      title: "Lifestyle & Travel Specialist",
      avatar: "https://i.pravatar.cc/150?img=47",
      rate: "$35",
      experience: 6,
      specialties: ["Final Cut Pro", "Color Grading", "Storytelling"],
      available: true
    },
    {
      id: 3,
      name: "Marcus Williams",
      title: "Tech Review Expert",
      avatar: "https://i.pravatar.cc/150?img=59",
      rate: "$45",
      experience: 8,
      specialties: ["DaVinci Resolve", "VFX", "Sound Design"],
      available: false
    }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-3">Top Video Editors</h2>
            <p className="text-gray-400 max-w-2xl">
              Connect with skilled professionals ready to elevate your YouTube content
            </p>
          </div>
          <Link href="/editors">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Editors
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topEditors.map((editor) => (
            <Card key={editor.id} className="bg-gray-800 border border-gray-700">
              <CardContent className="p-5">
                <div className="flex items-center mb-4">
                  <img 
                    src={editor.avatar} 
                    alt={editor.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4 border border-gray-700"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{editor.name}</h3>
                    <p className="text-gray-400 text-sm">{editor.title}</p>
                  </div>
                  {editor.available ? (
                    <span className="ml-auto px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
                      Available
                    </span>
                  ) : (
                    <span className="ml-auto px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-400">
                      Unavailable
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hourly Rate:</span>
                    <span className="font-medium text-purple-500">{editor.rate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Experience:</span>
                    <span>{editor.experience} years</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {editor.specialties.map((specialty, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Link href={`/editors/${editor.id}`}>
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-purple-900/50 to-gray-800 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Are You a Video Editor?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join ConnectCut to showcase your skills and find new clients for your editing business
          </p>
          <Link href="/join-as-editor">
            <Button size="lg">Join as an Editor</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
