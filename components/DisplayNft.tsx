import { JsonMetadata } from "@metaplex-foundation/js-next"
import styles from "../styles/Home.module.css";
const DisplayNft = (nft: JsonMetadata) => {
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

export default DisplayNft