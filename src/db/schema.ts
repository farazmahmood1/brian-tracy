
import { pgTable, serial, text, timestamp, date } from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    department: text("department").notNull(),
    type: text("type").notNull(),
    location: text("location").notNull(),
    postedDate: date("posted_date").notNull(),
    description: text("description").notNull(),
    requirements: text("requirements").array().notNull(), // Storing as array of strings
    responsibilities: text("responsibilities").array().notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const blogs = pgTable("blogs", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(), // Markdown or HTML
    author: text("author").notNull(),
    imageUrl: text("image_url"),
    readTime: text("read_time"),
    postedDate: date("posted_date").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
