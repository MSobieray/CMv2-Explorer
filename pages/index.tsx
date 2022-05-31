import Head from "next/head";
import { useState } from "react";

import DisplayNft from "../components/DisplayNft";
import useMetaPlex from "../hooks/useMetaplex";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [publicKey, setPublicKey] = useState(
    "6SpvDrqEZekJ6HaMWbeqNixCyXUztu6q6fhMisGjucu4"
  );   
  const [fetchNfts, loading, mintedNFTs] = useMetaPlex()

  return (
    <div>
      <Head>
        <title>Candy Machine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.App}>
        <div className={styles.container}>
          <h1 className="text-xl text-left">Candy Machine Public Key</h1>
          {loading ? <p>loading</p> : <div className={styles.nftForm}>
              <input
                type="text"
                value={publicKey}
                onChange={(event) => setPublicKey(event.target.value)}
              />
              <button onClick={() => fetchNfts(publicKey)}>Fetch</button>  
          </div>
          }
          {mintedNFTs && mintedNFTs.map(nft => DisplayNft(nft))}
        </div>
      </div>
    </div>
  );
}