import { Buffer } from "buffer";
window.Buffer = Buffer;
import {generateMnemonic, mnemonicToSeed} from "bip39"
import {derivePath} from "ed25519-hd-key"
import nacl from "tweetnacl"
import {Keypair} from "@solana/web3.js"
import { WalletStore } from "@/store";

export async function createWallet () {
    const { setUserPublicKey, account, setAccount } = WalletStore.getState();

    const words = generateMnemonic()
    const seed = await mnemonicToSeed(words)
    const path = `m/44'/501'/0'/0'`
    const derive = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derive).secretKey
    const publicSave = Keypair.fromSecretKey(secret).publicKey.toBase58()
    setUserPublicKey(publicSave);
    console.log(words);
    console.log(publicSave);
    console.log(secret);
    setAccount(account+1);
    return {mnemonic: words, address: publicSave, secret: Buffer.from(secret).toString('hex')};
}