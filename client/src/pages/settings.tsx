import { useState } from 'react';
import { useLocation } from 'wouter';
import { X, Eye, EyeOff, Copy, AlertTriangle, Save, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useWallet } from '@/hooks/use-wallet';

export default function Settings() {
  const [, setLocation] = useLocation();
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [network, setNetwork] = useState('devnet');
  const [autoLock, setAutoLock] = useState(false);
  const [showConfirmations, setShowConfirmations] = useState(true);
  const { wallet, copyToClipboard } = useWallet();

  const handleClose = () => {
    setLocation('/dashboard');
  };

  const handleCopyAddress = () => {
    const currentAccount = wallet.accounts[wallet.currentAccountIndex];
    if (currentAccount) {
      copyToClipboard(currentAccount.publicKey, 'Address');
    }
  };

  const handleCopySeedPhrase = () => {
    if (wallet.mnemonic) {
      copyToClipboard(wallet.mnemonic, 'Seed phrase');
    }
  };

  const handleSaveSettings = () => {
    // Save settings logic would go here
    setLocation('/dashboard');
  };

  const handleResetWallet = () => {
    if (confirm('Are you sure you want to reset your wallet? This action cannot be undone.')) {
      // Reset wallet logic would go here
      setLocation('/');
    }
  };

  const currentAccount = wallet.accounts[wallet.currentAccountIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="glass-card max-w-2xl w-full animate-slide-up">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-semibold text-white">Wallet Settings</CardTitle>
                <p className="text-slate-400 text-sm mt-1">Manage your wallet configuration</p>
              </div>
              <Button 
                onClick={handleClose}
                variant="ghost"
                size="sm"
                className="p-2 rounded-lg bg-slate-600/50 hover:bg-slate-600/70 text-slate-300 hover:text-white transition-all duration-300"
                data-testid="button-close-settings"
              >
                <X size={16} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Wallet Information */}
            <Card className="bg-slate-dark/40 border-slate-600/30">
              <CardHeader>
                <CardTitle className="font-semibold text-white text-sm">Wallet Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-slate-300 mb-2">Current Address</Label>
                  <div className="flex items-center gap-3 mt-2">
                    <Input 
                      value={currentAccount?.publicKey || ''}
                      readOnly
                      className="flex-1 bg-slate-dark/60 border-slate-600 text-white font-mono text-sm"
                      data-testid="input-current-address"
                    />
                    <Button 
                      onClick={handleCopyAddress}
                      variant="ghost"
                      size="sm"
                      className="px-3 py-2 bg-cyan-electric/20 hover:bg-cyan-electric/30 text-cyan-electric transition-all duration-300"
                      data-testid="button-copy-address"
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm text-slate-300">Seed Phrase</Label>
                    <Button 
                      onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                      variant="ghost"
                      size="sm"
                      className="text-xs text-cyan-electric hover:text-cyan-electric/80 transition-colors"
                      data-testid="button-toggle-seed-phrase"
                    >
                      {showSeedPhrase ? <EyeOff size={12} /> : <Eye size={12} />}
                      <span className="ml-1">{showSeedPhrase ? 'Hide' : 'Show'}</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Textarea 
                      value={wallet.mnemonic || ''}
                      readOnly
                      rows={2}
                      className={`flex-1 bg-slate-dark/60 border-slate-600 text-white font-mono text-sm resize-none ${!showSeedPhrase ? 'blur-sm' : ''}`}
                      data-testid="textarea-seed-phrase"
                    />
                    <Button 
                      onClick={handleCopySeedPhrase}
                      variant="ghost"
                      size="sm"
                      className="px-3 py-2 bg-cyan-electric/20 hover:bg-cyan-electric/30 text-cyan-electric transition-all duration-300"
                      data-testid="button-copy-seed-phrase"
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                  <div className="flex items-center text-yellow-400 text-xs mt-2">
                    <AlertTriangle size={12} className="mr-1" />
                    Never share your seed phrase with anyone
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Network Settings */}
            <Card className="bg-slate-dark/40 border-slate-600/30">
              <CardHeader>
                <CardTitle className="font-semibold text-white text-sm">Network Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label className="text-sm text-slate-300 mb-2">Solana Network</Label>
                  <Select value={network} onValueChange={setNetwork}>
                    <SelectTrigger className="w-full bg-slate-dark/60 border-slate-600 text-white focus:border-cyan-electric focus:ring-cyan-electric mt-2" data-testid="select-network">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-dark border-slate-600">
                      <SelectItem value="mainnet">Mainnet Beta</SelectItem>
                      <SelectItem value="devnet">Devnet</SelectItem>
                      <SelectItem value="testnet">Testnet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-slate-dark/40 border-slate-600/30">
              <CardHeader>
                <CardTitle className="font-semibold text-white text-sm">Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-slate-300">Auto-lock wallet</Label>
                  <Switch 
                    checked={autoLock} 
                    onCheckedChange={setAutoLock}
                    data-testid="switch-auto-lock"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-slate-300">Transaction confirmations</Label>
                  <Switch 
                    checked={showConfirmations} 
                    onCheckedChange={setShowConfirmations}
                    data-testid="switch-confirmations"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleResetWallet}
                variant="destructive"
                className="flex-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30"
                data-testid="button-reset-wallet"
              >
                <Trash className="mr-2" size={16} />
                Reset Wallet
              </Button>
              <Button 
                onClick={handleSaveSettings}
                className="flex-1 bg-gradient-to-r from-cyan-electric to-blue-500 hover:from-cyan-electric/80 hover:to-blue-500/80 text-space font-medium transition-all duration-300"
                data-testid="button-save-settings"
              >
                <Save className="mr-2" size={16} />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
