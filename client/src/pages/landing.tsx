import { useState } from 'react';
import { Wallet, Plus, FileText, BarChart3, Shield, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BackgroundAnimation } from '@/components/ui/background-animation';
import { createWallet } from '@/helperFunctions/createWallet';
import { loadWallet } from '@/helperFunctions/loadWallet';
import { useLocation } from 'wouter';
import { WalletStore } from '@/store';

export default function Landing() {
  const [, setLocation] = useLocation();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const seedPhrase = WalletStore(state => state.seedPhrase);
  const createdWallet = WalletStore(state => state.createdWallet);
  const account = WalletStore(state => state.account);
  const setSeedPhrase = WalletStore(state => state.setSeedPhrase);
  const setCreatedWallet = WalletStore(state => state.setCreatedWallet);
  const setWalletAccount = WalletStore(state => state.setWalletAccount);

    
  async function handleCreateWallet () {
    try {
      const result = await createWallet();
      setCreatedWallet({
        mnemonic: result.mnemonic,
        address: result.address,
        secret: result.secret
      });
      setSeedPhrase(result.mnemonic);
      setShowKeyModal(true)
    } catch (error) {
      console.error('Failed to create wallet:', error);
    }
  }

  function handleLoadWallet () {
    try {
      const accounts = loadWallet(seedPhrase, account);
      if (accounts.length === 0) {
        alert("No wallet found with these seed words.");
        return;
      }
      setWalletAccount(accounts);
      setLocation('/dashboard');
    } catch (error) {
      alert("Invalid seed phrase or unable to derive wallet.");
      console.error(error);
    }
  }

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleContinueToDashboard = (mnemonic: string) => {
    setShowCreateModal(false);
    setCreatedWallet(null);
    setWalletAccount(loadWallet(mnemonic, account));
    setLocation('/dashboard');
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundAnimation />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02]">
              <Wallet className="w-7 h-7 text-white" />
            </div>
          </div>

          <h1 className="text-5xl font-light mb-6 tracking-tight text-white">
            CryptoVault
          </h1>

          <p className="text-lg text-muted-foreground mb-12 leading-relaxed font-light">
            A minimal Solana wallet for creating accounts, managing tokens, and monitoring balances with enterprise-grade security.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-white text-black hover:bg-white/90 font-medium px-6 py-2.5 rounded-md transition-all duration-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Wallet
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowLoadModal(true)}
              className="border-white/20 text-white hover:bg-white/5 hover:border-white/30 px-6 py-2.5 rounded-md transition-all duration-200"
            >
              <FileText className="mr-2 h-4 w-4" />
              Import Wallet
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="card-glass p-6 hover-lift">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-md bg-white/[0.05] flex items-center justify-center mr-4 border border-white/10">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-medium text-white">Multi-Account</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Generate multiple Solana accounts from a single seed phrase with hierarchical deterministic derivation.
            </p>
          </div>

          <div className="card-glass p-6 hover-lift">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-md bg-white/[0.05] flex items-center justify-center mr-4 border border-white/10">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-medium text-white">Token Creation</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Create custom SPL tokens with configurable decimals and supply directly from your wallet.
            </p>
          </div>

          <div className="card-glass p-6 hover-lift">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-md bg-white/[0.05] flex items-center justify-center mr-4 border border-white/10">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-medium text-white">Balance Tracking</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Monitor account balances and transaction history with real-time updates from the network.
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="card-glass p-4 rounded-lg border-white/10">
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-white mr-3 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                <span className="text-white font-medium">Secure by design:</span> Private keys never leave your device. All operations performed locally.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Wallet Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="sm:max-w-lg bg-background border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">
              {createdWallet ? 'Wallet Created Successfully!' : 'Create New Wallet'}
            </DialogTitle>
          </DialogHeader>
          {!showKeyModal ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              A new wallet will be created with a unique seed phrase. Make sure to save it securely.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
                className="border-white/20 text-white hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button 
                className="bg-white text-black hover:bg-white/90"
                onClick={handleCreateWallet}
              >
                Create
              </Button>
            </div>
          </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-green-400 font-medium mb-2">⚠️ Save this information securely!</p>
                  <p className="text-xs text-muted-foreground">
                    You'll need the seed phrase to import your wallet later. Store it safely and never share it.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-white">Wallet Address</label>
                      <Button
                        onClick={() => handleCopyText(createdWallet!.address)}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/10 p-1"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="bg-white/[0.02] border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-mono text-white break-all">
                        {createdWallet!.address}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-white">Secret <span className='text-red-500'> (do not share it with anyone)</span></label>
                      <Button
                        onClick={() => handleCopyText(createdWallet!.secret)}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/10 p-1"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="bg-white/[0.02] border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-mono text-white break-all">
                        {createdWallet!.secret}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-white">Seed Phrase (12 words)</label>
                      <Button
                        onClick={() => handleCopyText(createdWallet!.mnemonic)}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/10 p-1"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="bg-white/[0.02] border border-white/10 rounded-lg p-3">
                      <p className="text-sm font-mono text-white break-all">
                        {createdWallet!.mnemonic}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={()=>handleContinueToDashboard(createdWallet!.mnemonic)}
                    className="bg-white text-black hover:bg-white/90"
                    data-testid="button-continue-dashboard"
                  >
                    Continue to Dashboard
                  </Button>
                </div>
              </div>
            )}
        </DialogContent>
      </Dialog>

      {/* Load Wallet Modal */}
      <Dialog open={showLoadModal} onOpenChange={setShowLoadModal}>
        <DialogContent className="sm:max-w-md bg-background border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Import Wallet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white">Seed Phrase</label>
              <Input
                type="password"
                placeholder="Enter your 12-word seed phrase..."
                value={seedPhrase}
                onChange={(e) => setSeedPhrase(e.target.value)}
                className="mt-2 bg-white/5 border-white/10 text-white placeholder-white/50"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowLoadModal(false)}
                className="border-white/20 text-white hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                disabled={!seedPhrase.trim()}
                className="bg-white text-black hover:bg-white/90 disabled:opacity-50"
                onClick={handleLoadWallet}
              >
                Import
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
