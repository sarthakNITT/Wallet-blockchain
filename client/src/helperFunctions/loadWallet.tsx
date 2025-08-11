import { mnemonicToSeedSync } from "bip39"
import { derivePath } from "ed25519-hd-key"
import nacl from "tweetnacl"
import { Keypair } from "@solana/web3.js"

type Acc = {
  publicKey: string;
  derivationPath: string;
};

export const loadWallet = (mnemonics: any, account: number, setWalletAccount: (walletAccount: Acc[]) => void) => {
  const seed = mnemonicToSeedSync(mnemonics)
  const accounts: Acc[] = [];
  let i = 0;
  while(i<account){
    const path = `m/44'/501'/${i}'/0'`
    const derive = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derive).secretKey
    const publicSave = Keypair.fromSecretKey(secret).publicKey.toBase58()
    console.log(mnemonics);
    console.log(publicSave);
    i = i+1;
    accounts.push({ publicKey: publicSave, derivationPath: path });
  }
  setWalletAccount(accounts);
}