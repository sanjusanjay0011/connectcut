import { 
  User, InsertUser, 
  Job, InsertJob, 
  EditorProfile, InsertEditorProfile, 
  Review, InsertReview,
  Application, InsertApplication
} from '../shared/schema';

export interface IStorage {
  // User Methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;
  
  // Job Methods
  getJob(id: number): Promise<Job | undefined>;
  getJobs(filter?: Partial<Job>): Promise<Job[]>;
  getJobsByCreator(creatorId: number): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: number, jobData: Partial<Job>): Promise<Job | undefined>;
  
  // Editor Profile Methods
  getEditorProfile(id: number): Promise<EditorProfile | undefined>;
  getEditorProfileByUserId(userId: number): Promise<EditorProfile | undefined>;
  getEditorProfiles(filter?: Partial<EditorProfile>): Promise<EditorProfile[]>;
  createEditorProfile(profile: InsertEditorProfile): Promise<EditorProfile>;
  updateEditorProfile(id: number, profileData: Partial<EditorProfile>): Promise<EditorProfile | undefined>;
  
  // Review Methods
  getReview(id: number): Promise<Review | undefined>;
  getReviewsByEditor(editorId: number): Promise<Review[]>;
  getReviewsByCreator(creatorId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Application Methods
  getApplication(id: number): Promise<Application | undefined>;
  getApplicationsByJob(jobId: number): Promise<Application[]>;
  getApplicationsByEditor(editorId: number): Promise<Application[]>;
  createApplication(application: InsertApplication): Promise<Application>;
  updateApplication(id: number, applicationData: Partial<Application>): Promise<Application | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private jobs: Map<number, Job>;
  private editorProfiles: Map<number, EditorProfile>;
  private reviews: Map<number, Review>;
  private applications: Map<number, Application>;

  private userIdCounter: number;
  private jobIdCounter: number;
  private profileIdCounter: number;
  private reviewIdCounter: number;
  private applicationIdCounter: number;

  constructor() {
    this.users = new Map();
    this.jobs = new Map();
    this.editorProfiles = new Map();
    this.reviews = new Map();
    this.applications = new Map();

    this.userIdCounter = 1;
    this.jobIdCounter = 1;
    this.profileIdCounter = 1;
    this.reviewIdCounter = 1;
    this.applicationIdCounter = 1;

    this.seedData();
  }

  // Seed initial data
  private seedData(): void {
    // Create users
    const user1 = this.createUser({
      username: "johndoe",
      email: "john@example.com",
      password: "password123",
      fullName: "John Doe",
      role: "creator",
      avatarUrl: null
    });
    
    const user2 = this.createUser({
      username: "janedoe",
      email: "jane@example.com",
      password: "password123",
      fullName: "Jane Doe",
      role: "editor",
      avatarUrl: null
    });
    
    // Create jobs
    this.createJob({
      title: "Gaming Video Editor Needed",
      description: "Looking for a skilled editor for my Minecraft YouTube channel. Need someone who can create engaging edits, add effects, and has experience with gaming content.",
      creatorId: user1.id,
      jobType: "Remote",
      employmentType: "Per Project",
      minPrice: 50,
      maxPrice: 200,
      priceType: "per video",
      skills: ["Premiere Pro", "After Effects", "Gaming", "YouTube"],
      isActive: true
    });
    
    this.createJob({
      title: "Weekly Vlog Editor",
      description: "Need an editor for my weekly vlogs. Should be able to turn around edits within 48 hours and have a good sense of pacing and storytelling.",
      creatorId: user1.id,
      jobType: "Remote",
      employmentType: "Ongoing",
      minPrice: 30,
      maxPrice: 100,
      priceType: "per video",
      skills: ["Final Cut Pro", "Color Grading", "Vlog Editing"],
      isActive: true
    });
    
    // Create editor profile
    this.createEditorProfile({
      userId: user2.id,
      title: "Professional Video Editor",
      description: "Experienced editor specializing in gaming and lifestyle content. 5+ years of experience working with YouTubers.",
      skills: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Motion Graphics"],
      hourlyRate: 25,
      experience: 5,
      portfolioUrl: "https://portfolio.example.com",
      isAvailable: true
    });
  }

  // Implementation of all the interface methods...

  // ... (methods implementation) ...
}

export const storage = new MemStorage();
