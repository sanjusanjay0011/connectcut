import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function JobSection() {
  const featuredJobs = [
    {
      id: 1,
      title: "Lifestyle Vlog Editor",
      type: "Remote",
      budget: "$50-100",
      per: "per video",
      description: "Looking for a skilled editor for weekly lifestyle vlogs. Must have experience with color grading and creating engaging transitions.",
      skills: ["Premiere Pro", "DaVinci Resolve", "Vlog Editing"],
      postedBy: "TravelWithTina",
      postedDate: "2 days ago"
    },
    {
      id: 2,
      title: "Gaming Montage Editor",
      type: "Remote",
      budget: "$200-350",
      per: "per video",
      description: "Need an experienced editor for creating high-energy gaming montages with effects, synced to music. Fortnite and Valorant content.",
      skills: ["After Effects", "Sound Design", "Gaming"],
      postedBy: "ProGamerJosh",
      postedDate: "1 day ago"
    },
    {
      id: 3,
      title: "Tech Review Editor",
      type: "Remote",
      budget: "$30-40",
      per: "per hour",
      description: "Seeking a detail-oriented editor for tech review videos. Should be familiar with b-roll, product closeups, and comparison sequences.",
      skills: ["Final Cut Pro", "Motion Graphics", "Tech"],
      postedBy: "TechReviewsDaily",
      postedDate: "3 days ago"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-3">Featured Jobs</h2>
            <p className="text-gray-400 max-w-2xl">
              Browse the latest opportunities for video editors across various YouTube niches
            </p>
          </div>
          <Link href="/jobs">
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Jobs
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`}>
              <Card className="bg-gray-800 hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] border border-gray-700 hover:border-purple-500/30 h-full">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl">{job.title}</h3>
                    <span className="px-2.5 py-0.5 bg-gray-700 rounded-full text-xs font-medium text-gray-300">
                      {job.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {job.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div className="font-medium text-purple-500">
                      {job.budget} <span className="text-gray-400 text-xs">{job.per}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {job.postedDate}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/post-job">
            <Button size="lg">
              Post a Job
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
