import Head from "next/head";
import { Nft } from "@metaplex-foundation/js-next";
import { useEffect, useState } from "react";

import Button from '../components/Button'
import Loader from "../components/Loader";
import useCandyMachine from "../hooks/useCandyMachine";
import CandyMachineInfo from "../components/CandyMachineInfo";
import NFTList from "../components/NFTList";

export default function Home() {
  const [candyMachineAddress, setCandyMachineAddress] = useState(
    "6SpvDrqEZekJ6HaMWbeqNixCyXUztu6q6fhMisGjucu4"
  );   
  const [displayedNFTs, setDisplayedNFTs] = useState<Nft[]>()
  const [startIndex, setStartIndex] = useState<number>(0)
  const lastDisplayIndex = startIndex + 6
  const [fetchNfts, fetchCandyMachine, isLoading, mintedNFTs, candyMachine] = useCandyMachine()
  const handleClick = async () => {
    fetchNfts(candyMachineAddress)
    fetchCandyMachine(candyMachineAddress)
  }
  useEffect(() => {
    if (mintedNFTs) {
      setDisplayedNFTs(mintedNFTs.slice(startIndex, lastDisplayIndex))
    }
  }, [mintedNFTs, startIndex])
  
  return (
    <div>
      <Head>
        <title>Candy Machine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`bg-gradient-to-r from-cyan-500 to-blue-500 h-48`}>
        <div className="container mx-auto min-h-full pt-10">
          <h1 className="text-xl text-left text-white">Candy Machine Address (devnet)</h1>
          <div className="flex items-center">
              <input disabled={ isLoading }
                className="block w-full p-2 bg-white border border-slate-300 text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-300 disabled:border-slate-200 disabled:shadow-none"
                type="text"
                value={ candyMachineAddress }
                onChange={(event) => setCandyMachineAddress(event.target.value)}
              />
              <Button className="text-sm border-t border-r border-b" handleClick={handleClick} isDisabled={ isLoading }>Fetch</Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        {candyMachine && <CandyMachineInfo candyMachine={candyMachine} />}
        <section>
          {mintedNFTs && displayedNFTs ?
              <>
                <div className={`flex ${startIndex ? 'justify-between' : 'justify-end' }`}>
                  {startIndex ? 
                    <p className="cursor-pointer font-mono" onClick={() => setStartIndex(startIndex - 6)}>&larr; previous</p> 
                    : null
                  }
                  {lastDisplayIndex < mintedNFTs.length && 
                    <p className="cursor-pointer font-mono" onClick={() => setStartIndex(startIndex + 6)}>next &rarr;</p>
                  }
                </div>
                <NFTList nfts={displayedNFTs} />
              </>
              : isLoading ? 
              <Loader className="flex justify-center mt-4">Loading...</Loader>  
              : <p className="container mx-auto mt-4 text-xl text-cyan-500">Enter An Address for a Candy Machine on Devnet</p>
          }
        </section>
      </div>
    </div>
  );
}