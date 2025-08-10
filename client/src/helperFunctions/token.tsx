import { createMint } from "@solana/spl-token";
import { useState } from "react";
import * as token from "@solana/spl-token";
import * as web3 from "@solana/web3.js";

const [mintAuthority, setMintAuthority] = useState("")
const [freezeAuthority, setFreezeAuthority] = useState("")
const [decimals, setDecimals] = useState("")
const connection = "https://api.devnet.solana.com";
export async function token(){
    const tokenMint = await createMint(
        connection,
        payer,
        mintAuthority,
        freezeAuthority,
        decimals,
    );
};

export async function buildCreateMintTransaction(connection,payer,decimals) 
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
