import { useState } from "react";
import { toast } from "react-toastify";
import * as anchor from '@project-serum/anchor';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Metaplex, Nft } from "@metaplex-foundation/js-next";

export type CandyMachineState = {
  itemsAvailable: number
  itemsRedeemed: number
  itemsRemaining: number
  goLiveDate: Date
  price: number
  creators: {
    address: anchor.web3.PublicKey
    share: number
    verified: boolean
  }[]
}

export type CandyMachineAccount = {
  id: anchor.web3.PublicKey;
  program: anchor.Program;
  state: CandyMachineState;
}

const CANDY_MACHINE_PROGRAM = new anchor.web3.PublicKey(
  'cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ',
);

const useCandyMachine = () => {
  const connection = new anchor.web3.Connection(anchor.web3.clusterApiUrl('devnet'));
  const provider = new anchor.AnchorProvider(connection, {} as anchor.Wallet, { preflightCommitment: 'processed' })
  const mx = Metaplex.make(connection)

  const [nfts, setNfts] = useState<Nft[] | null>(null);
  const [isloading, setLoading] = useState(false)
  const [candyMachine, setCandyMachine] = useState<CandyMachineState | null>(null)

  const fetchNft = async (candyMachineAddress: string) => {
    try {
      setNfts(null)
      setLoading(true)
      const candyMachineKey = new anchor.web3.PublicKey(candyMachineAddress)
      const candyMachine = await mx.nfts().findAllByCandyMachine(candyMachineKey)
      await Promise.all(candyMachine.map(nft => nft.metadataTask.run()))
      setNfts(candyMachine)
      setLoading(false)
    } catch(error) {
      console.log(error)
      toast(`unable to get fetch NFTs`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
        type: 'error'
      })
      setLoading(false)
    }
  }

  const fetchCandyMachine = async (candyMachineAddress: string) => {
    try {
      setCandyMachine(null)
      const candyMachineKey = new anchor.web3.PublicKey(candyMachineAddress)
      const idl = await anchor.Program.fetchIdl(CANDY_MACHINE_PROGRAM, provider)
      const program = new anchor.Program(idl!, CANDY_MACHINE_PROGRAM, provider)
      const candyMachine: any = await program.account.candyMachine.fetch(candyMachineKey)
      const candyMachineState: CandyMachineState = {
        itemsAvailable: candyMachine.data.itemsAvailable.toNumber(),
        itemsRedeemed: candyMachine.itemsRedeemed.toNumber(),
        itemsRemaining: candyMachine.data.itemsAvailable.toNumber() - candyMachine.itemsRedeemed.toNumber(),
        goLiveDate: new Date(candyMachine.data.goLiveDate.toNumber() * 1000),
        price: candyMachine.data.price.toNumber() / LAMPORTS_PER_SOL,
        creators: candyMachine.data.creators
      }
      setCandyMachine(candyMachineState)
    } catch(error) {
      console.log(error)
      toast('Unable to get CandyMachine Info', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
        type: 'error'
      })
    }
  }
  
  return [fetchNft, fetchCandyMachine, isloading, nfts, candyMachine] as const
}

export default useCandyMachine