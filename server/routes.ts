import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWalletSchema, insertAccountSchema, insertTokenSchema } from "@shared/schema";
import { z } from "zod";

const balanceCheckSchema = z.object({
  address: z.string().min(1),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Wallet routes
  app.post("/api/wallets", async (req, res) => {
    try {
      const data = insertWalletSchema.parse(req.body);
      const wallet = await storage.createWallet(data);
      res.json(wallet);
    } catch (error) {
      res.status(400).json({ error: "Invalid wallet data" });
    }
  });

  app.get("/api/wallets/:mnemonic", async (req, res) => {
    try {
      const { mnemonic } = req.params;
      const wallet = await storage.getWalletByMnemonic(decodeURIComponent(mnemonic));
      if (!wallet) {
        return res.status(404).json({ error: "Wallet not found" });
      }
      res.json(wallet);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch wallet" });
    }
  });

  // Account routes
  app.post("/api/accounts", async (req, res) => {
    try {
      const data = insertAccountSchema.parse(req.body);
      const account = await storage.createAccount(data);
      res.json(account);
    } catch (error) {
      res.status(400).json({ error: "Invalid account data" });
    }
  });

  app.get("/api/wallets/:walletId/accounts", async (req, res) => {
    try {
      const { walletId } = req.params;
      const accounts = await storage.getAccountsByWalletId(walletId);
      res.json(accounts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch accounts" });
    }
  });

  // Token routes
  app.post("/api/tokens", async (req, res) => {
    try {
      const data = insertTokenSchema.parse(req.body);
      // In a real implementation, this would create the token on Solana
      // For now, we'll generate a mock mint address
      const mockMintAddress = "TokenMint" + Math.random().toString(36).substring(7);
      const token = await storage.createToken({ ...data, mintAddress: mockMintAddress });
      res.json(token);
    } catch (error) {
      res.status(400).json({ error: "Invalid token data" });
    }
  });

  app.get("/api/tokens", async (req, res) => {
    try {
      const tokens = await storage.getTokens();
      res.json(tokens);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tokens" });
    }
  });

  // Balance check route
  app.post("/api/balance", async (req, res) => {
    try {
      const { address } = balanceCheckSchema.parse(req.body);
      // In a real implementation, this would query Solana network
      // For now, return mock balance data
      const mockBalance = Math.random() * 100;
      res.json({ 
        address, 
        balance: mockBalance,
        lamports: Math.floor(mockBalance * 1000000000)
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid address" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
