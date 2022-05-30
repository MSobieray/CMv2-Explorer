import Head from "next/head";
import styles from "../styles/Home.module.css";
import { JsonMetadata, Metaplex, Nft } from "@metaplex-foundation/js-next";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { FC, useState } from "react";

const connection = new Connection(clusterApiUrl("devnet"));
const mx = Metaplex.make(connection);

export default function Home() {
  const [publicKey, setPublicKey] = useState(
    "6SpvDrqEZekJ6HaMWbeqNixCyXUztu6q6fhMisGjucu4"
  );
  const [nfts, setNfts] = useState<JsonMetadata[] | null>(null);

  const fetchNft = async () => {
    const nfts = await mx.nfts().findAllByCandyMachine(new PublicKey(publicKey))
    const nftsMetaData = await Promise.all(nfts.map(nft => nft.metadataTask.run()))
    setNfts(nftsMetaData)
    
  };

  const renderNft: FC = (nft: JsonMetadata) => {
    return (
      <div className={styles.nftPreview} key={nft.name}>
        <h1>{nft.name}</h1>
        <img
          src={nft.image}
          alt={nft.description}
        />
      </div>
    )
  } 

  return (
    <div>
      <Head>
        <title>Metaplex and Next.js example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.App}>
        <div className={styles.container}>
          <h1 className={styles.title}>NFT Mint Address</h1>
          <div className={styles.nftForm}>
            <input
              type="text"
              value={publicKey}
              onChange={(event) => setPublicKey(event.target.value)}
            />
            <button onClick={fetchNft}>Fetch</button>
          </div>
          {nfts && nfts.map(nft => renderNft(nft))}
        </div>
      </div>
    </div>
  );
}