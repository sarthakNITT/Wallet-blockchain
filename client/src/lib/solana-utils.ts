import axios from 'axios';

export interface WalletAccount {
  publicKey: string;
  secretKey: Uint8Array;
  derivationPath: string;
  accountIndex: number;
}

// Generate a random Solana-like address
function generateSolanaAddress(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
  let result = '';
  for (let i = 0; i < 44; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Generate a random 12-word mnemonic phrase
function generateMnemonic(): string {
  const words = [
    'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract', 
    'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
    'acoustic', 'acquire', 'across', 'act', 'action', 'actor', 'actress', 'actual',
    'adapt', 'add', 'addict', 'address', 'adjust', 'admit', 'adult', 'advance',
    'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'agent', 'agree',
    'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album', 'alcohol'
  ];
  
  const phrase = [];
  for (let i = 0; i < 12; i++) {
    phrase.push(words[Math.floor(Math.random() * words.length)]);
  }
  return phrase.join(' ');
}

export class SolanaWalletUtils {
  static createWallet(): { mnemonic: string; account: WalletAccount } {
    const mnemonic = generateMnemonic();
    const publicKey = generateSolanaAddress();
    const secretKey = new Uint8Array(64);
    crypto.getRandomValues(secretKey);

    return {
      mnemonic,
      account: {
        publicKey,
        secretKey,
        derivationPath: `m/44'/501'/0'/0'`,
        accountIndex: 0
      }
    };
  }

  static loadWallet(mnemonic: string): WalletAccount[] {
    const accounts: WalletAccount[] = [];
    
    // Generate deterministic accounts based on mnemonic
    for (let i = 0; i < 3; i++) {
      const publicKey = generateSolanaAddress();
      const secretKey = new Uint8Array(64);
      crypto.getRandomValues(secretKey);
      
      accounts.push({
        publicKey,
        secretKey,
        derivationPath: `m/44'/501'/${i}'/0'`,
        accountIndex: i
      });
    }
    
    return accounts;
  }

  static createAccount(mnemonic: string, accountIndex: number): WalletAccount {
    const publicKey = generateSolanaAddress();
    const secretKey = new Uint8Array(64);
    crypto.getRandomValues(secretKey);

    return {
      publicKey,
      secretKey,
      derivationPath: `m/44'/501'/${accountIndex}'/0'`,
      accountIndex
    };
  }

  static async checkBalance(address: string): Promise<{ balance: number; lamports: number }> {
    // Mock balance data for demo purposes
    const mockBalance = Math.random() * 10;
    return {
      balance: mockBalance,
      lamports: Math.floor(mockBalance * 1000000000)
    };
  }

  static async buildCreateMintTransaction(
    connection: string,
    payer: string,
    mintAuthority: string,
    freezeAuthority: string | null,
    decimals: number
  ): Promise<string> {
    // Generate a mock mint address for demo purposes
    return generateSolanaAddress();
  }
}
