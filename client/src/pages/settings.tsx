import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Copy, Shield, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BackgroundAnimation } from '@/components/ui/background-animation';
import { useLocation } from 'wouter';
import { WalletStore } from '@/store';

export default function SettingsMockup() {
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [, setLocation] = useLocation();
  const walletAccounts = WalletStore((state) => state.walletAccount);
  const seedPhrase = WalletStore((state) => state.seedPhrase);

const wallet = {
  accounts: walletAccounts,
  mnemonic: seedPhrase
};

  const handleBack = () => {
    setLocation('/dashboard');
  };

  const handleLogout = () => {
    setLocation('/');
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundAnimation />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-background/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="mr-4 text-white hover:bg-white/10 p-2"
              onClick={handleBack}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-medium text-white">Settings</h1>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          
          {/* Wallet Information */}
          <div className="card-glass p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-md bg-white/[0.05] flex items-center justify-center mr-4 border border-white/10">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-medium text-white">Wallet Information</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white mb-2 block">Accounts</label>
                <p className="text-sm text-muted-foreground mb-3">
                  {wallet.accounts.length} account{wallet.accounts.length !== 1 ? 's' : ''}
                </p>
                
                <div className="space-y-3">
                  {walletAccounts.map((account, index) => (
                    <div key={index} className="bg-white/[0.02] border border-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-white">Account {index + 1}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/10 p-1"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground break-all">
                        {account.publicKey}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {account.derivationPath}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="card-glass p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-md bg-white/[0.05] flex items-center justify-center mr-4 border border-white/10">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-medium text-white">Security</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-white">Seed Phrase</label>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/10 p-2"
                    >
                      {showSeedPhrase ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/10 p-2"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-white/[0.02] border border-white/10 rounded-lg p-4">
                  {showSeedPhrase ? (
                    <p className="text-sm font-mono text-white break-all">
                      {wallet.mnemonic}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• ••• •••
                    </p>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mt-2">
                  Never share your seed phrase. Anyone with access to it can control your wallet.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="card-glass p-6">
            <h2 className="text-lg font-medium text-white mb-6">Actions</h2>
            
            <div className="space-y-4">
              <Button 
                variant="outline"
                className="w-full justify-center p-3 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500"
                onClick={handleLogout}
              >
                Log Out
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Make sure you have saved your seed phrase before logging out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
