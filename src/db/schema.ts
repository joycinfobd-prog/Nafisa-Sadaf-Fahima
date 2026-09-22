import { pgTable, serial, text, timestamp, varchar, integer, boolean } from "drizzle-orm/pg-core";

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),
  emailSent: boolean("email_sent").default(false).notNull(),
  emailProvider: varchar("email_provider", { length: 20 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const siteStats = pgTable("site_stats", {
  key: varchar("key", { length: 64 }).primaryKey(),
  count: integer("count").default(0).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type NewContactMessage = typeof contactMessages.$inferInsert;
