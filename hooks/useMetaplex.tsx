import { JsonMetadata, Metaplex } from "@metaplex-foundation/js-next";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { toast } from "react-toastify";

const useMetaPlex = () => {
  const connection = new Connection(clusterApiUrl("devnet"));
  const mx = Metaplex.make(connection);

  const [nfts, setNfts] = useState<JsonMetadata[] | null>(null);
  const [loading, setLoading] = useState(false)

  const fetchNft = async (publicKey: string) => {
    try {
      setLoading(true)
      const nfts = await mx.nfts().findAllByCandyMachine(new PublicKey(publicKey))
      const nftsMetaData = await Promise.all(nfts.map(nft => nft.metadataTask.run()))
      setNfts(nftsMetaData)
      setLoading(false)
    } catch(error) {
      toast('Please Use a Valid Candy Machine Public Key', {
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
  return [fetchNft, loading, nfts] as const
}

export default useMetaPlex