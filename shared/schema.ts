import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const wallets = pgTable("wallets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  mnemonic: text("mnemonic").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const accounts = pgTable("accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletId: varchar("wallet_id").references(() => wallets.id),
  publicKey: text("public_key").notNull(),
  derivationPath: text("derivation_path").notNull(),
  accountIndex: integer("account_index").notNull().default(0),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tokens = pgTable("tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  mintAddress: text("mint_address").notNull(),
  payer: text("payer").notNull(),
  mintAuthority: text("mint_authority").notNull(),
  freezeAuthority: text("freeze_authority"),
  decimals: integer("decimals").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWalletSchema = createInsertSchema(wallets).pick({
  mnemonic: true,
});

export const insertAccountSchema = createInsertSchema(accounts).pick({
  walletId: true,
  publicKey: true,
  derivationPath: true,
  accountIndex: true,
  name: true,
});

export const insertTokenSchema = createInsertSchema(tokens).pick({
  payer: true,
  mintAuthority: true,
  freezeAuthority: true,
  decimals: true,
});

export type InsertWallet = z.infer<typeof insertWalletSchema>;
export type Wallet = typeof wallets.$inferSelect;

export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type Account = typeof accounts.$inferSelect;

export type InsertToken = z.infer<typeof insertTokenSchema>;
export type Token = typeof tokens.$inferSelect;
