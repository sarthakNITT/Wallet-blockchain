import { mnemonicToSeedSync } from "bip39"
import { derivePath } from "ed25519-hd-key"
import nacl from "tweetnacl"
import { Keypair } from "@solana/web3.js"
import { WalletStore } from "@/store";

const count = WalletStore((state) => state.count);
const setCount = WalletStore((state) => state.setCount);
const account = WalletStore((state) => state.account);
const setAccount = WalletStore((state) => state.setAccount);
export const createAccount = (mnemonics: any) => {
    setCount(count+1);
    setAccount(account+1);
    const seed = mnemonicToSeedSync(mnemonics) 
    const path = `m/44'/501'/${count}'/0'`
    const derive = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derive).secretKey
    const publicSave = Keypair.fromSecretKey(secret).publicKey.toBase58()
    console.log(mnemonics);
    console.log(publicSave);
}