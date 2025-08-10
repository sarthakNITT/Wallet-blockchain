import { useState, useEffect } from 'react';
import { Check, Copy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useWallet } from '@/hooks/use-wallet';

interface CreateWalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function CreateWalletModal({ open, onOpenChange, onSuccess }: CreateWalletModalProps) {
  const [walletData, setWalletData] = useState<{ mnemonic: string; address: string } | null>(null);
  const { createWallet, copyToClipboard } = useWallet();

  useEffect(() => {
    if (open && !walletData) {
      try {
        const { mnemonic, account } = createWallet();
        setWalletData({
          mnemonic,
          address: account.publicKey
        });
      } catch (error) {
        console.error('Failed to create wallet:', error);
      }
    }
  }, [open, walletData, createWallet]);

  const handleClose = () => {
    onOpenChange(false);
    setWalletData(null);
  };

  const handleContinue = () => {
    onSuccess();
    setWalletData(null);
  };

  const handleCopyAddress = () => {
    if (walletData) {
      copyToClipboard(walletData.address, 'Address');
    }
  };

  const handleCopyMnemonic = () => {
    if (walletData) {
      copyToClipboard(walletData.mnemonic, 'Seed phrase');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="glass-card max-w-lg w-full animate-slide-up">
          <CardHeader className="text-center">
            <div className="inline-block p-3 rounded-full bg-green-neon/20 mb-4 mx-auto">
              <Check className="text-green-neon text-xl" size={24} />
            </div>
            <CardTitle className="text-xl font-semibold text-white">Wallet Created Successfully!</CardTitle>
            <p className="text-slate-400 text-sm mt-2">Save these details securely</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Wallet Address */}
            <div>
              <Label className="block text-sm font-medium text-slate-300 mb-2">Wallet Address</Label>
              <div className="relative">
                <Input 
                  type="text"
                  value={walletData?.address || ''}
                  readOnly
                  className="w-full bg-slate-dark/60 border-slate-600 pr-12 text-sm text-white font-mono"
                  data-testid="input-generated-address"
                />
                <Button 
                  onClick={handleCopyAddress}
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-electric hover:text-cyan-electric/80 transition-colors"
                  data-testid="button-copy-address"
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>

            {/* Seed Phrase */}
            <div>
              <Label className="block text-sm font-medium text-slate-300 mb-2">Seed Phrase</Label>
              <div className="relative">
                <Textarea 
                  value={walletData?.mnemonic || ''}
                  readOnly
                  rows={3}
                  className="w-full bg-slate-dark/60 border-slate-600 pr-12 text-sm text-white font-mono resize-none"
                  data-testid="textarea-generated-mnemonic"
                />
                <Button 
                  onClick={handleCopyMnemonic}
                  variant="ghost"
                  size="sm"
                  className="absolute right-3 top-3 text-cyan-electric hover:text-cyan-electric/80 transition-colors"
                  data-testid="button-copy-mnemonic"
                >
                  <Copy size={16} />
                </Button>
              </div>
              <p className="text-yellow-400 text-xs mt-2 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
                Store this seed phrase safely. It's the only way to recover your wallet.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleClose}
                variant="ghost"
                className="flex-1 bg-slate-600 hover:bg-slate-600/80 text-white transition-all duration-300"
                data-testid="button-close-modal"
              >
                Close
              </Button>
              <Button 
                onClick={handleContinue}
                className="flex-1 bg-gradient-to-r from-cyan-electric to-blue-500 hover:from-cyan-electric/80 hover:to-blue-500/80 text-space font-medium transition-all duration-300"
                data-testid="button-continue"
              >
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
