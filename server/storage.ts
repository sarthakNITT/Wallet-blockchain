import { type Wallet, type InsertWallet, type Account, type InsertAccount, type Token, type InsertToken } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Wallet operations
  createWallet(wallet: InsertWallet): Promise<Wallet>;
  getWallet(id: string): Promise<Wallet | undefined>;
  getWalletByMnemonic(mnemonic: string): Promise<Wallet | undefined>;
  
  // Account operations
  createAccount(account: InsertAccount): Promise<Account>;
  getAccountsByWalletId(walletId: string): Promise<Account[]>;
  getAccount(id: string): Promise<Account | undefined>;
  
  // Token operations
  createToken(token: InsertToken & { mintAddress: string }): Promise<Token>;
  getTokens(): Promise<Token[]>;
}

export class MemStorage implements IStorage {
  private wallets: Map<string, Wallet>;
  private accounts: Map<string, Account>;
  private tokens: Map<string, Token>;

  constructor() {
    this.wallets = new Map();
    this.accounts = new Map();
    this.tokens = new Map();
  }

  async createWallet(insertWallet: InsertWallet): Promise<Wallet> {
    const id = randomUUID();
    const wallet: Wallet = { 
      ...insertWallet, 
      id, 
      createdAt: new Date() 
    };
    this.wallets.set(id, wallet);
    return wallet;
  }

  async getWallet(id: string): Promise<Wallet | undefined> {
    return this.wallets.get(id);
  }

  async getWalletByMnemonic(mnemonic: string): Promise<Wallet | undefined> {
    return Array.from(this.wallets.values()).find(
      (wallet) => wallet.mnemonic === mnemonic,
    );
  }

  async createAccount(insertAccount: InsertAccount): Promise<Account> {
    const id = randomUUID();
    const account: Account = { 
      ...insertAccount,
      id, 
      createdAt: new Date(),
      name: insertAccount.name || null,
      walletId: insertAccount.walletId || null,
      accountIndex: insertAccount.accountIndex || 0
    };
    this.accounts.set(id, account);
    return account;
  }

  async getAccountsByWalletId(walletId: string): Promise<Account[]> {
    return Array.from(this.accounts.values()).filter(
      (account) => account.walletId === walletId,
    );
  }

  async getAccount(id: string): Promise<Account | undefined> {
    return this.accounts.get(id);
  }

  async createToken(tokenData: InsertToken & { mintAddress: string }): Promise<Token> {
    const id = randomUUID();
    const token: Token = { 
      ...tokenData, 
      id, 
      createdAt: new Date(),
      freezeAuthority: tokenData.freezeAuthority || null
    };
    this.tokens.set(id, token);
    return token;
  }

  async getTokens(): Promise<Token[]> {
    return Array.from(this.tokens.values());
  }
}

export const storage = new MemStorage();
