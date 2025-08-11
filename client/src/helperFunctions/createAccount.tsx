import { mnemonicToSeedSync } from "bip39"
import { derivePath } from "ed25519-hd-key"
import nacl from "tweetnacl"
import { Keypair } from "@solana/web3.js"
import { WalletStore } from "@/store";

export const createAccount = (mnemonics: any) => {
    const {count, setCount, account, setAccount} = WalletStore.getState();
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