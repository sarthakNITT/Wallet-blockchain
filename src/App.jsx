import { useState } from 'react'
import {derivePath} from "ed25519-hd-key"
import nacl from "tweetnacl"
import {Keypair} from "@solana/web3.js"
import {generateMnemonic, mnemonicToSeedSync} from "bip39"
import axios from 'axios'
import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";
import { createMint } from "@solana/spl-token";
import './App.css'

function App() {
  let userPublicKey;
  const [mnemonics, setMnemonics] = useState("")
  const [count , setCount] = useState(1);
  const [address, setAddress] = useState("")
  const [account, setAccount] = useState(0)
  const [payer, setpayer] = useState("")
  const [mintAuthority, setMintAuthority] = useState("")
  const [freezeAuthority, setFreezeAuthority] = useState("")
  const [decimals, setDecimals] = useState("")

  const createWallet = () => {
    const words = generateMnemonic()
    const seed = mnemonicToSeedSync(words)
    const path = `m/44'/501'/0'/0'`
    const derive = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derive).secretKey
    const publicSave = Keypair.fromSecretKey(secret).publicKey.toBase58()
    userPublicKey = publicSave;
    console.log(words);
    console.log(publicSave);
    setAccount(account+1);
  }

  const loadWallet = (mnemonics) => {
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
    }
  }

  const createAccount = (mnemonics) => {
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

  const showBalance = async (address) => {
    const alchemyUrl = "https://solana-mainnet.g.alchemy.com/v2/T0CLMnl7EO65B9mGepnkXrj8I-uhKFdy";
    try {
      const response = await axios.post(
        alchemyUrl,
        {
          id: 1,
          jsonrpc: "2.0",
          method: "getBalance",
          params: [address]
        },
        {
            headers: { "Content-type": "application/json" }
        }
      )
      const balance = response.data?.result?.value;
      console.log(`Balance of ${address}:`, balance);
    } catch (error) {
      console.error(error);
    }
  }
  const connection = "https://api.devnet.solana.com";
  async function token(){
    const tokenMint = await createMint(
      connection,
      payer,
      mintAuthority,
      freezeAuthority,
      decimals,
    );
  };

async function buildCreateMintTransaction(connection,payer,decimals) 
{
  const lamports = await token.getMinimumBalanceForRentExemptMint(connection);
  const accountKeypair = web3.Keypair.generate();
  const programId = token.TOKEN_PROGRAM_ID;

  const transaction = new web3.Transaction().add(
    web3.SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: accountKeypair.publicKey,
      space: token.MINT_SIZE,
      lamports,
      programId,
    }),
    token.createInitializeMintInstruction(
      accountKeypair.publicKey,
      decimals,
      payer,
      payer,
      programId,
    ),
  );
console.log("hello");
  return transaction;
}

  return (
    <>
    <input placeholder='Enter your seed phrase here' type='text' value={mnemonics} onChange={(e)=>setMnemonics(e.target.value)} />
    <br></br>
    <button onClick={()=>loadWallet(mnemonics)}>Load Wallet</button>
    <br></br>
    <br></br>
    don't have a wallet?
    <br></br>
    <button onClick={createWallet}>Create Wallet</button>
    <br></br>
    <br></br>
    Want to create another account?
    <br></br>
    <button onClick={()=>createAccount(mnemonics)}>Create Account</button>
    <br></br>
    <br></br>
    Show balance of account
    <br></br>
    <input placeholder='Enter your account address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
    <br></br>
    <button onClick={()=>showBalance(address)}>Show balance</button>
    <br></br>
    <br></br>
    Want to create a token?
    <br></br>
    <input placeholder='Payer Address' value={payer} onChange={(e)=>setpayer(e.target.value)}/>
    <input placeholder='MintAuthority Address' value={mintAuthority} onChange={(e)=>setMintAuthority(e.target.value)}/>
    <input placeholder='FreezeAuthority Address' value={freezeAuthority} onChange={(e)=>setFreezeAuthority(e.target.value)}/>
    <input placeholder='decimals' value={decimals} onChange={(e)=>setDecimals(e.target.value)}/>
    <br></br>
    <button onClick={()=>buildCreateMintTransaction(connection,payer,decimals)}>Create Token</button>
    </>
  )
}

export default App
