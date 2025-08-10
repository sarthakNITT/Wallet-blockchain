import { mnemonicToSeedSync } from "bip39"
import { derivePath } from "ed25519-hd-key"
import nacl from "tweetnacl"
import { Keypair } from "@solana/web3.js"
import { WalletStore } from "@/store";

export const loadWallet = (mnemonics: any) => {
  const account = WalletStore((state) => state.account);
  const seed = mnemonicToSeedSync(mnemonics)
  let i = 0;
  while(i<account){
    const path = `m/44'/501'/${i}'/0'`
    const derive = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derive).secretKey
    const publicSave = Keypair.fromSecretKey(secret).publicKey.toBase58()
    console.log(mnemonics);
    console.log(publicSave);
    i = i+1;
    return publicSave;
  }
}