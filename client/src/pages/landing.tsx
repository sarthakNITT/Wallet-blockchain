import { useState } from 'react';
import { useLocation } from 'wouter';
import { Wallet, Key, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import CreateWalletModal from '@/components/wallet/create-wallet-modal';
import { useWallet } from '@/hooks/use-wallet';

export default function Landing() {
  const [, setLocation] = useLocation();
  const [seedPhrase, setSeedPhrase] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { loadWallet } = useWallet();

  const handleLoadWallet = () => {
    if (!seedPhrase.trim()) {
      return;
    }

    try {
      loadWallet(seedPhrase.trim());
      setLocation('/dashboard');
    } catch (error) {
      console.error('Failed to load wallet:', error);
    }
  };

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    setLocation('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-cyan-electric to-green-neon mb-4 animate-glow">
            <Wallet className="text-2xl text-space" size={32} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-electric to-green-neon bg-clip-text text-transparent">
            CryptoVault
          </h1>
          <p className="text-slate-400 text-sm mt-2">Your Solana Wallet Gateway</p>
        </div>

        {/* Wallet Options Card */}
        <Card className="glass-card shadow-2xl">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-center mb-8 text-white">Access Your Wallet</h2>
            
            {/* Load Wallet Section */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Load Existing Wallet
              </label>
              <div className="relative mb-4">
                <Input
                  type="password"
                  placeholder="Enter your seed phrase..."
                  value={seedPhrase}
                  onChange={(e) => setSeedPhrase(e.target.value)}
                  className="bg-slate-dark/60 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-electric focus:ring-cyan-electric pr-12"
                  data-testid="input-seed-phrase"
                />
                <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              </div>
              <Button 
                onClick={handleLoadWallet}
                className="w-full bg-gradient-to-r from-cyan-electric to-blue-500 hover:from-cyan-electric/80 hover:to-blue-500/80 text-space font-medium transition-all duration-300 transform hover:scale-105"
                data-testid="button-load-wallet"
              >
                <Key className="mr-2" size={16} />
                Load Wallet
              </Button>
            </div>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-slate-dark px-4 text-slate-400">or</span>
              </div>
            </div>

            {/* Create Wallet Section */}
            <div className="text-center">
              <p className="text-slate-300 text-sm mb-4">Don't have a wallet?</p>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="w-full bg-gradient-to-r from-green-neon to-emerald-500 hover:from-green-neon/80 hover:to-emerald-500/80 text-space font-medium transition-all duration-300 transform hover:scale-105 animate-glow"
                data-testid="button-create-wallet"
              >
                <Plus className="mr-2" size={16} />
                Create New Wallet
              </Button>
            </div>
          </CardContent>
        </Card>

        <CreateWalletModal 
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
          onSuccess={handleCreateSuccess}
        />
      </div>
    </div>
  );
}
