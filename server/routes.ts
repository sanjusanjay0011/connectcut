import { Express, Request, Response, Server } from 'express';
import { createServer } from 'http';
import { log } from './vite';
import { storage } from './storage';
import { insertApplicationSchema, insertEditorProfileSchema, insertJobSchema, insertReviewSchema, insertUserSchema } from '../shared/schema';

// Helper for async route handlers
const asyncHandler = (fn: (req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error: any) {
      console.error('API error:', error);
      res.status(500).json({
        message: 'An error occurred',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  };
};

export async function registerRoutes(app: Express): Promise<Server> {
  const server = createServer(app);

  // ================== Authentication Routes ==================
  
  // Register new user
  app.post('/api/auth/register', asyncHandler(async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }));

  // Login
  app.post('/api/auth/login', asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    const user = await storage.getUserByUsername(username);
    
    if (!user || user.password !== password) { // In a real app, you'd use proper password hashing
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // In a real app, you would setup proper sessions and JWT
    req.session.userId = user.id;
    req.session.userRole = user.role;
    
    // Return user data (exclude password)
    const { password: _, ...userData } = user;
    res.json(userData);
  }));

  // Logout
  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: 'Failed to logout' });
      } else {
        res.json({ message: 'Logged out successfully' });
      }
    });
  });

  // ================== User Routes ==================
  
  // Get user by ID
  app.get('/api/users/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await storage.getUser(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Exclude password from response
    const { password, ...userData } = user;
    res.json(userData);
  }));

  // ================== Job Routes ==================
  
  // Get all jobs
  app.get('/api/jobs', asyncHandler(async (req, res) => {
    const jobs = await storage.getJobs();
    res.json(jobs);
  }));
  
  // Get job by ID
  app.get('/api/jobs/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const job = await storage.getJob(id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  }));
  
  // Get jobs by creator
  app.get('/api/jobs/creator/:creatorId', asyncHandler(async (req, res) => {
    const creatorId = parseInt(req.params.creatorId);
    const jobs = await storage.getJobsByCreator(creatorId);
    res.json(jobs);
  }));
  
  // Create job
  app.post('/api/jobs', asyncHandler(async (req, res) => {
    try {
      const jobData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(jobData);
      res.status(201).json(job);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }));
  
  // Update job
  app.patch('/api/jobs/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const job = await storage.getJob(id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // In a real app, check if user has permission to update this job
    const updatedJob = await storage.updateJob(id, req.body);
    res.json(updatedJob);
  }));
  
  // ================== Editor Profile Routes ==================

  // Get all editor profiles
  app.get('/api/editor-profiles', asyncHandler(async (req, res) => {
    const profiles = await storage.getEditorProfiles();
    res.json(profiles);
  }));
  
  // Get editor profile by ID
  app.get('/api/editor-profiles/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const profile = await storage.getEditorProfile(id);
    
    if (!profile) {
      return res.status(404).json({ message: 'Editor profile not found' });
    }
    
    res.json(profile);
  }));
  
  // Get editor profile by user ID
  app.get('/api/users/:userId/editor-profile', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId);
    const profile = await storage.getEditorProfileByUserId(userId);
    
    if (!profile) {
      return res.status(404).json({ message: 'Editor profile not found' });
    }
    
    res.json(profile);
  }));
  
  // Create editor profile
  app.post('/api/editor-profiles', asyncHandler(async (req, res) => {
    try {
      const profileData = insertEditorProfileSchema.parse(req.body);
      
      // Check if user exists
      const user = await storage.getUser(profileData.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Check if user already has a profile
      const existingProfile = await storage.getEditorProfileByUserId(profileData.userId);
      if (existingProfile) {
        return res.status(400).json({ message: 'User already has an editor profile' });
      }
      
      const profile = await storage.createEditorProfile(profileData);
      res.status(201).json(profile);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }));

  // ... Other routes for reviews and applications ...

  log('API routes registered');
  return server;
}
