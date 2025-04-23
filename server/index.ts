import express, { Express, Request, Response, NextFunction } from 'express';
import session from 'express-session';
import MemoryStore from 'memorystore';
import { log, setupVite, serveStatic } from './vite';
import { registerRoutes } from './routes';

async function createServer() {
  const app: Express = express();
  const port = process.env.PORT || 5000;
  const MemoryStoreSession = MemoryStore(session);

  app.use(express.json());
  
  // Session setup
  app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new MemoryStoreSession({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    cookie: { 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000 
    }
  }));

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unexpected error:', err);
    res.status(500).json({
      message: 'An unexpected error occurred',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });

  if (process.env.NODE_ENV === 'development') {
    // In development, setup Vite for the client
    const server = await registerRoutes(app);
    await setupVite(app, server);
    
    log(`serving on port ${port}`);
  } else {
    // In production, serve the static build
    serveStatic(app);
    const server = await registerRoutes(app);
    
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

createServer();
