import { useState } from 'react';
import { Settings, Plus, Coins, BarChart3, Wallet, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BackgroundAnimation } from '@/components/ui/background-animation';
import { useLocation } from 'wouter';

export default function Dashboard() {
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [balanceAddress, setBalanceAddress] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState('9');
  const [, setLocation] = useLocation();

  const accounts = [
    { accountIndex: 0, publicKey: 'DummyPublicKey1', derivationPath: 'm/44/501/0' },
    { accountIndex: 1, publicKey: 'DummyPublicKey2', derivationPath: 'm/44/501/1' },
  ];

  const handleSettings = () => {
    setLocation('/settings');
  };

  const handleLogout = () => {
    setLocation('/');
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundAnimation />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-background/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-white/[0.05] flex items-center justify-center mr-3 border border-white/10">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-lg font-medium text-white">CryptoVault</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2" onClick={handleSettings}>
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-glass p-6 sticky top-24">
              <h2 className="text-base font-medium text-white mb-6">Actions</h2>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start p-3 text-white hover:bg-white/10 border border-white/10 hover:border-white/20">
                  <Plus className="mr-3 w-4 h-4" />
                  Create Account
                </Button>

                <Button onClick={() => setShowTokenModal(true)} variant="ghost" className="w-full justify-start p-3 text-white hover:bg-white/10 border border-white/10 hover:border-white/20">
                  <Coins className="mr-3 w-4 h-4" />
                  Create Token
                </Button>

                <Button onClick={() => setShowBalanceModal(true)} variant="ghost" className="w-full justify-start p-3 text-white hover:bg-white/10 border border-white/10 hover:border-white/20">
                  <BarChart3 className="mr-3 w-4 h-4" />
                  Check Balance
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-xl font-medium text-white mb-6">Accounts</h2>

              <div className="grid gap-4">
                {accounts.map((account, index) => (
                  <div key={index} className="card-glass p-6 hover-lift">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md bg-white/[0.05] flex items-center justify-center mr-4 border border-white/10">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-white">Account {index + 1}</h3>
                          <p className="text-sm text-muted-foreground">Index: {account.accountIndex}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-white">{(Math.random() * 10).toFixed(4)} SOL</p>
                        <p className="text-sm text-muted-foreground">${(Math.random() * 1000).toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-muted-foreground">Public Key</label>
                        <p className="text-sm font-mono text-white bg-white/[0.02] p-2 rounded border border-white/10 break-all">
                          {account.publicKey}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Derivation Path</label>
                        <p className="text-sm font-mono text-white">
                          {account.derivationPath}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Token Modal */}
      <Dialog open={showTokenModal} onOpenChange={setShowTokenModal}>
        <DialogContent className="sm:max-w-md bg-background border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Create SPL Token</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="token-name" className="text-sm font-medium text-white">Token Name</Label>
              <Input id="token-name" value={tokenName} onChange={(e) => setTokenName(e.target.value)} placeholder="My Token" className="mt-1 bg-white/5 border-white/10 text-white placeholder-white/50" />
            </div>
            <div>
              <Label htmlFor="token-symbol" className="text-sm font-medium text-white">Symbol</Label>
              <Input id="token-symbol" value={tokenSymbol} onChange={(e) => setTokenSymbol(e.target.value)} placeholder="MTK" className="mt-1 bg-white/5 border-white/10 text-white placeholder-white/50" />
            </div>
            <div>
              <Label htmlFor="token-decimals" className="text-sm font-medium text-white">Decimals</Label>
              <Input id="token-decimals" type="number" value={tokenDecimals} onChange={(e) => setTokenDecimals(e.target.value)} min="0" max="18" className="mt-1 bg-white/5 border-white/10 text-white placeholder-white/50" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowTokenModal(false)} className="border-white/20 text-white hover:bg-white/5">
                Cancel
              </Button>
              <Button className="bg-white text-black hover:bg-white/90">Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Check Balance Modal */}
      <Dialog open={showBalanceModal} onOpenChange={setShowBalanceModal}>
        <DialogContent className="sm:max-w-md bg-background border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Check Account Balance</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="balance-address" className="text-sm font-medium text-white">Solana Address</Label>
              <Input id="balance-address" value={balanceAddress} onChange={(e) => setBalanceAddress(e.target.value)} placeholder="Enter Solana address..." className="mt-1 bg-white/5 border-white/10 text-white placeholder-white/50" />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowBalanceModal(false)} className="border-white/20 text-white hover:bg-white/5">
                Close
              </Button>
              <Button className="bg-white text-black hover:bg-white/90">Check</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
