import { useState, useCallback, useEffect } from 'react';
import { SolanaWalletUtils, type WalletAccount } from '@/lib/solana-utils';
import { useToast } from '@/hooks/use-toast';

interface WalletState {
  mnemonic: string | null;
  accounts: WalletAccount[];
  currentAccountIndex: number;
  isLoaded: boolean;
}

const WALLET_STORAGE_KEY = 'cryptovault_wallet';

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>(() => {
    // Load wallet from localStorage on initialization
    try {
      const stored = localStorage.getItem(WALLET_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load wallet from storage:', error);
    }
    return {
      mnemonic: null,
      accounts: [],
      currentAccountIndex: 0,
      isLoaded: false,
    };
  });
  const { toast } = useToast();

  // Save wallet to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(wallet));
    } catch (error) {
      console.error('Failed to save wallet to storage:', error);
    }
  }, [wallet]);

  const createWallet = useCallback(() => {
    try {
      const { mnemonic, account } = SolanaWalletUtils.createWallet();
      setWallet({
        mnemonic,
        accounts: [account],
        currentAccountIndex: 0,
        isLoaded: true,
      });
      
      toast({
        title: "Wallet Created",
        description: "Your new wallet has been generated successfully.",
      });

      return { mnemonic, account };
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create wallet. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const loadWallet = useCallback((mnemonic: string) => {
    try {
      const accounts = SolanaWalletUtils.loadWallet(mnemonic);
      setWallet({
        mnemonic,
        accounts,
        currentAccountIndex: 0,
        isLoaded: true,
      });

      toast({
        title: "Wallet Loaded",
        description: `Successfully loaded ${accounts.length} accounts.`,
      });

      return accounts;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load wallet. Please check your seed phrase.",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const createAccount = useCallback(() => {
    if (!wallet.mnemonic) {
      toast({
        title: "Error",
        description: "No wallet loaded.",
        variant: "destructive",
      });
      return null;
    }

    try {
      const newAccountIndex = wallet.accounts.length;
      const newAccount = SolanaWalletUtils.createAccount(wallet.mnemonic, newAccountIndex);
      
      setWallet(prev => ({
        ...prev,
        accounts: [...prev.accounts, newAccount],
      }));

      toast({
        title: "Account Created",
        description: "New account has been added to your wallet.",
      });

      return newAccount;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create new account.",
        variant: "destructive",
      });
      throw error;
    }
  }, [wallet.mnemonic, wallet.accounts.length, toast]);

  const getCurrentAccount = useCallback(() => {
    return wallet.accounts[wallet.currentAccountIndex] || null;
  }, [wallet.accounts, wallet.currentAccountIndex]);

  const setCurrentAccount = useCallback((index: number) => {
    if (index >= 0 && index < wallet.accounts.length) {
      setWallet(prev => ({
        ...prev,
        currentAccountIndex: index,
      }));
    }
  }, [wallet.accounts.length]);

  const copyToClipboard = useCallback(async (text: string, label: string = "Text") => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} has been copied to clipboard.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const clearWallet = useCallback(() => {
    const clearedState = {
      isLoaded: false,
      mnemonic: null,
      accounts: [],
      currentAccountIndex: 0,
    };
    
    setWallet(clearedState);
    
    // Clear from localStorage
    try {
      localStorage.removeItem(WALLET_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear wallet from storage:', error);
    }
    
    toast({
      title: "Wallet Cleared",
      description: "Successfully logged out of wallet.",
    });
  }, [toast]);

  return {
    wallet,
    createWallet,
    loadWallet,
    createAccount,
    getCurrentAccount,
    setCurrentAccount,
    copyToClipboard,
    clearWallet,
  };
}
