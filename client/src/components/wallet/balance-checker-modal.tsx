import { useState } from 'react';
import { TrendingUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface BalanceCheckerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface BalanceResult {
  address: string;
  balance: number;
  lamports: number;
}

export default function BalanceCheckerModal({ open, onOpenChange }: BalanceCheckerModalProps) {
  const [address, setAddress] = useState('');
  const [balanceResult, setBalanceResult] = useState<BalanceResult | null>(null);
  const { toast } = useToast();

  const checkBalanceMutation = useMutation({
    mutationFn: async (address: string) => {
      const response = await apiRequest('POST', '/api/balance', { address });
      return response.json();
    },
    onSuccess: (data: BalanceResult) => {
      setBalanceResult(data);
      toast({
        title: "Balance Retrieved",
        description: "Account balance has been fetched successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to fetch balance. Please check the address and try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid Solana address.",
        variant: "destructive",
      });
      return;
    }

    checkBalanceMutation.mutate(address.trim());
  };

  const handleClose = () => {
    onOpenChange(false);
    setAddress('');
    setBalanceResult(null);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="glass-card max-w-lg w-full animate-slide-up">
          <CardHeader className="text-center">
            <div className="inline-block p-3 rounded-full bg-purple-glow/20 mb-4 mx-auto">
              <TrendingUp className="text-purple-glow text-xl" size={24} />
            </div>
            <CardTitle className="text-xl font-semibold text-white">Check Account Balance</CardTitle>
            <p className="text-slate-400 text-sm mt-2">Enter a Solana address to view its balance</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="block text-sm font-medium text-slate-300 mb-2">
                  Wallet Address
                </Label>
                <Input 
                  type="text"
                  placeholder="Enter Solana wallet address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-dark/60 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-electric focus:ring-cyan-electric"
                  data-testid="input-balance-address"
                />
              </div>

              {/* Balance Result */}
              {balanceResult && (
                <div className="p-4 bg-green-neon/10 border border-green-neon/30 rounded-xl" data-testid="balance-result">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">Balance:</span>
                    <span className="text-green-neon font-mono text-lg" data-testid="text-balance">
                      {balanceResult.balance.toFixed(4)} SOL
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-slate-400 text-xs">Lamports:</span>
                    <span className="text-slate-300 font-mono text-sm">
                      {balanceResult.lamports.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button"
                  onClick={handleClose}
                  variant="ghost"
                  className="flex-1 bg-slate-600 hover:bg-slate-600/80 text-white transition-all duration-300"
                  data-testid="button-close-balance"
                >
                  Close
                </Button>
                <Button 
                  type="submit"
                  disabled={checkBalanceMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-purple-glow to-indigo-500 hover:from-purple-glow/80 hover:to-indigo-500/80 text-white font-medium transition-all duration-300 disabled:opacity-50"
                  data-testid="button-check-balance"
                >
                  {checkBalanceMutation.isPending ? (
                    <>Checking...</>
                  ) : (
                    <>
                      <Search className="mr-2" size={16} />
                      Check Balance
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
