import { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWallet } from '@/hooks/use-wallet';
import { SolanaWalletUtils, type WalletAccount } from '@/lib/solana-utils';

interface AccountCardProps {
  account: WalletAccount;
  accountIndex: number;
  isActive: boolean;
}

export default function AccountCard({ account, accountIndex, isActive }: AccountCardProps) {
  const [balance, setBalance] = useState<{ balance: number; lamports: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { copyToClipboard } = useWallet();

  useEffect(() => {
    const fetchBalance = async () => {
      setIsLoading(true);
      try {
        const balanceData = await SolanaWalletUtils.checkBalance(account.publicKey);
        setBalance(balanceData);
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [account.publicKey]);

  const handleCopyAddress = () => {
    copyToClipboard(account.publicKey, 'Address');
  };

  const accountName = `Account ${accountIndex + 1}`;
  const accountType = accountIndex === 0 ? 'Main Account' : 
                     accountIndex === 1 ? 'Trading Account' : 
                     'Savings Account';

  return (
    <Card className={`glass-card hover:border-cyan-electric/50 transition-all duration-300 ${isActive ? 'glow-border' : ''}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-medium text-white text-sm" data-testid={`text-account-name-${accountIndex}`}>
              {accountName}
            </h3>
            <p className="text-slate-400 text-xs mt-1">{accountType}</p>
          </div>
          <div className="text-right">
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-slate-600 rounded w-16 mb-1"></div>
                <div className="h-3 bg-slate-700 rounded w-20"></div>
              </div>
            ) : balance ? (
              <>
                <p className="text-white font-medium text-sm" data-testid={`text-balance-${accountIndex}`}>
                  {balance.balance.toFixed(4)} SOL
                </p>
                <p className="text-slate-400 text-xs">
                  ${(balance.balance * 100).toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-slate-500 text-sm">--</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <p className="text-slate-300 text-xs font-mono truncate" data-testid={`text-address-${accountIndex}`}>
              {account.publicKey}
            </p>
          </div>
          <Button 
            onClick={handleCopyAddress}
            variant="ghost"
            size="sm"
            className="px-3 py-1.5 bg-cyan-electric/20 hover:bg-cyan-electric/30 text-cyan-electric rounded-lg text-xs transition-all duration-300"
            data-testid={`button-copy-address-${accountIndex}`}
          >
            <Copy className="mr-1" size={12} />
            Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
