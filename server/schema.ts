import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { integer, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["creator", "editor", "admin"]);

export const users = pgTable("users", {
  id: integer("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: userRoleEnum("role").notNull(),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const jobs = pgTable("jobs", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  jobType: text("job_type").notNull(),
  employmentType: text("employment_type").notNull(),
  minPrice: integer("min_price").notNull(),
  maxPrice: integer("max_price").notNull(),
  priceType: text("price_type").notNull(),
  skills: text("skills").array().notNull(),
  creatorId: integer("creator_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const editorProfiles = pgTable("editor_profiles", {
  id: integer("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  skills: text("skills").array().notNull(),
  hourlyRate: integer("hourly_rate").notNull(),
  experience: integer("experience").notNull(),
  portfolioUrl: text("portfolio_url"),
  isAvailable: boolean("is_available").default(true).notNull(),
});

export const reviews = pgTable("reviews", {
  id: integer("id").primaryKey(),
  editorId: integer("editor_id").notNull(),
  creatorId: integer("creator_id").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const applications = pgTable("applications", {
  id: integer("id").primaryKey(),
  jobId: integer("job_id").notNull(),
  editorId: integer("editor_id").notNull(),
  coverLetter: text("cover_letter").notNull(),
  price: integer("price").notNull(),
  status: text("status").notNull(), // pending, accepted, rejected
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  fullName: true,
  role: true,
  avatarUrl: true,
});

export const insertJobSchema = createInsertSchema(jobs).pick({
  title: true,
  description: true,
  jobType: true,
  employmentType: true,
  minPrice: true,
  maxPrice: true,
  priceType: true,
  skills: true,
  creatorId: true,
  isActive: true,
});

export const insertEditorProfileSchema = createInsertSchema(editorProfiles).pick({
  userId: true,
  title: true,
  description: true,
  skills: true,
  hourlyRate: true,
  experience: true,
  portfolioUrl: true,
  isAvailable: true,
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  editorId: true,
  creatorId: true,
  rating: true,
  comment: true,
});

export const insertApplicationSchema = createInsertSchema(applications).pick({
  jobId: true,
  editorId: true,
  coverLetter: true,
  price: true,
  status: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;

export type InsertEditorProfile = z.infer<typeof insertEditorProfileSchema>;
export type EditorProfile = typeof editorProfiles.$inferSelect;

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;
