import { useState } from 'react';
import { Settings, PlusCircle, Coins, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AccountCard from '@/components/wallet/account-card';
import TokenCreationModal from '@/components/wallet/token-creation-modal';
import BalanceCheckerModal from '@/components/wallet/balance-checker-modal';
import { useWallet } from '@/hooks/use-wallet';
import { useLocation } from 'wouter';

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const { wallet, createAccount } = useWallet();

  const handleCreateAccount = () => {
    createAccount();
  };

  const handleSettings = () => {
    setLocation('/settings');
  };

  if (!wallet.isLoaded) {
    setLocation('/');
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-card sticky top-0 z-40 border-b border-slate-600/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-electric to-green-neon mr-3">
                <svg className="w-5 h-5 text-space" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v2.28c.55.35 1 .98 1 1.72 0 .74-.45 1.38-1 1.72V14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-3.28c-.55-.35-1-.98-1-1.72 0-.74.45-1.38 1-1.72zM20 9.72c-.55-.35-1-.98-1-1.72 0-.74.45-1.38 1-1.72V5H4v1.28c.55.35 1 .98 1 1.72 0 .74-.45 1.38-1 1.72V14h16V9.72z"/>
                </svg>
              </div>
              <h1 className="text-lg font-semibold text-white">CryptoVault</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={handleSettings}
                variant="ghost" 
                size="sm"
                className="p-2 rounded-lg bg-slate-600/50 hover:bg-slate-600/70 text-slate-300 hover:text-white transition-all duration-300"
                data-testid="button-settings"
              >
                <Settings size={16} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass-card sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handleCreateAccount}
                  variant="ghost"
                  className="w-full justify-start px-4 py-3 rounded-xl bg-slate-600/30 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-all duration-300"
                  data-testid="button-create-account"
                >
                  <PlusCircle className="mr-3 text-green-neon" size={16} />
                  Create Account
                </Button>
                <Button 
                  onClick={() => setShowTokenModal(true)}
                  variant="ghost"
                  className="w-full justify-start px-4 py-3 rounded-xl bg-slate-600/30 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-all duration-300"
                  data-testid="button-create-token"
                >
                  <Coins className="mr-3 text-cyan-electric" size={16} />
                  Create Token
                </Button>
                <Button 
                  onClick={() => setShowBalanceModal(true)}
                  variant="ghost"
                  className="w-full justify-start px-4 py-3 rounded-xl bg-slate-600/30 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-all duration-300"
                  data-testid="button-check-balance"
                >
                  <TrendingUp className="mr-3 text-purple-glow" size={16} />
                  Check Balance
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            {/* Accounts Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Your Accounts</h2>
                <span className="text-sm text-slate-400" data-testid="text-account-count">
                  {wallet.accounts.length} {wallet.accounts.length === 1 ? 'account' : 'accounts'}
                </span>
              </div>
              
              {/* Account Cards */}
              <div className="space-y-4">
                {wallet.accounts.map((account, index) => (
                  <AccountCard 
                    key={`${account.publicKey}-${index}`}
                    account={account} 
                    accountIndex={index}
                    isActive={index === wallet.currentAccountIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TokenCreationModal 
        open={showTokenModal}
        onOpenChange={setShowTokenModal}
      />

      <BalanceCheckerModal 
        open={showBalanceModal}
        onOpenChange={setShowBalanceModal}
      />
    </div>
  );
}
