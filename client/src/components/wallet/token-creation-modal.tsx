import { useState } from 'react';
import { Coins, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface TokenCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TokenFormData {
  payer: string;
  mintAuthority: string;
  freezeAuthority: string;
  decimals: string;
}

export default function TokenCreationModal({ open, onOpenChange }: TokenCreationModalProps) {
  const [formData, setFormData] = useState<TokenFormData>({
    payer: '',
    mintAuthority: '',
    freezeAuthority: '',
    decimals: '9'
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createTokenMutation = useMutation({
    mutationFn: async (data: TokenFormData) => {
      const response = await apiRequest('POST', '/api/tokens', {
        payer: data.payer,
        mintAuthority: data.mintAuthority,
        freezeAuthority: data.freezeAuthority || null,
        decimals: parseInt(data.decimals),
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Token Created",
        description: "Your custom token has been created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/tokens'] });
      onOpenChange(false);
      setFormData({
        payer: '',
        mintAuthority: '',
        freezeAuthority: '',
        decimals: '9'
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create token. Please check your inputs and try again.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: keyof TokenFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.payer || !formData.mintAuthority) {
      toast({
        title: "Validation Error",
        description: "Payer and Mint Authority addresses are required.",
        variant: "destructive",
      });
      return;
    }

    const decimals = parseInt(formData.decimals);
    if (isNaN(decimals) || decimals < 0 || decimals > 9) {
      toast({
        title: "Validation Error",
        description: "Decimals must be a number between 0 and 9.",
        variant: "destructive",
      });
      return;
    }

    createTokenMutation.mutate(formData);
  };

  const handleClose = () => {
    onOpenChange(false);
    setFormData({
      payer: '',
      mintAuthority: '',
      freezeAuthority: '',
      decimals: '9'
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="glass-card max-w-lg w-full animate-slide-up">
          <CardHeader className="text-center">
            <div className="inline-block p-3 rounded-full bg-cyan-electric/20 mb-4 mx-auto">
              <Coins className="text-cyan-electric text-xl" size={24} />
            </div>
            <CardTitle className="text-xl font-semibold text-white">Create Custom Token</CardTitle>
            <p className="text-slate-400 text-sm mt-2">Deploy your own SPL token on Solana</p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-slate-300 mb-2">
                  Payer Address *
                </Label>
                <Input 
                  type="text"
                  placeholder="Enter payer wallet address..."
                  value={formData.payer}
                  onChange={(e) => handleInputChange('payer', e.target.value)}
                  className="w-full bg-slate-dark/60 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-electric focus:ring-cyan-electric"
                  data-testid="input-payer-address"
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-slate-300 mb-2">
                  Mint Authority *
                </Label>
                <Input 
                  type="text"
                  placeholder="Enter mint authority address..."
                  value={formData.mintAuthority}
                  onChange={(e) => handleInputChange('mintAuthority', e.target.value)}
                  className="w-full bg-slate-dark/60 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-electric focus:ring-cyan-electric"
                  data-testid="input-mint-authority"
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-slate-300 mb-2">
                  Freeze Authority (Optional)
                </Label>
                <Input 
                  type="text"
                  placeholder="Enter freeze authority address..."
                  value={formData.freezeAuthority}
                  onChange={(e) => handleInputChange('freezeAuthority', e.target.value)}
                  className="w-full bg-slate-dark/60 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-electric focus:ring-cyan-electric"
                  data-testid="input-freeze-authority"
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium text-slate-300 mb-2">
                  Decimals *
                </Label>
                <Input 
                  type="number"
                  placeholder="Enter number of decimals (0-9)"
                  min="0" 
                  max="9"
                  value={formData.decimals}
                  onChange={(e) => handleInputChange('decimals', e.target.value)}
                  className="w-full bg-slate-dark/60 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-electric focus:ring-cyan-electric"
                  data-testid="input-decimals"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button"
                  onClick={handleClose}
                  variant="ghost"
                  className="flex-1 bg-slate-600 hover:bg-slate-600/80 text-white transition-all duration-300"
                  data-testid="button-cancel-token"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createTokenMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-cyan-electric to-blue-500 hover:from-cyan-electric/80 hover:to-blue-500/80 text-space font-medium transition-all duration-300 disabled:opacity-50"
                  data-testid="button-create-token"
                >
                  {createTokenMutation.isPending ? (
                    <>Creating...</>
                  ) : (
                    <>
                      <Plus className="mr-2" size={16} />
                      Create Token
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
