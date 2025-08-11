import { WalletAccount } from "@/lib/solana-utils"
import {create} from "zustand"

type Acc = {
    publicKey: string,
    derivationPath: string
}

type State = {
    userPublicKey: string | null,
    account: number,
    count: number,
    walletAccount: Acc[],
    createdWallet: { mnemonic: string; address: string; secret: string } | null,
    seedPhrase: string
}
type Action = {
    setUserPublicKey: (key: string) => void;
    setAccount: (account: number) => void;
    setCount: (count: number) => void;
    setWalletAccount: (WalletAccount: Acc[]) => void;
    setCreatedWallet: (createdWallet: { mnemonic: string; address: string; secret: string } | null) => void;
    setSeedPhrase: (seedPhrase: string) => void;
}

export const WalletStore = create<State & Action>((set)=>({
    userPublicKey: "",
    account: 0,
    count: 1,
    walletAccount: [],
    createdWallet: null,
    seedPhrase: "",
    setUserPublicKey: (userPublicKey)=>set(()=>({userPublicKey: userPublicKey})),
    setAccount: (account) => set(() => ({ account: account })),
    setCount: (count) => set(() => ({ count: count })),
    setWalletAccount: (walletAccount) => set(() => ({ walletAccount: walletAccount})),
    setCreatedWallet: (createdWallet) => set(() => ({ createdWallet: createdWallet })),
    setSeedPhrase: (seedPhrase) => set(() => ({ seedPhrase: seedPhrase })),
}))