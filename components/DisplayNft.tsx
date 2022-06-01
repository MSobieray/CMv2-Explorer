import { JsonMetadata } from "@metaplex-foundation/js-next"
import NftLoader from "./NftLoader"
const DisplayNft = (nft: JsonMetadata, loading: boolean) => {
  return loading ? (<NftLoader />) :
    <div className="p-4 bg-slate-100 hover:bg-slate-200 border rounded-lg shadow-md" key={nft.name}>
      <h5 className="font-mono text-slate-500 text-lg mb-1">{nft.name}</h5>
      <img
        src={nft.image}
        alt={nft.description}
      />
      <div className="font-mono text-slate-500 text-sm divide-y divide-solid mt-2">
        <p>Attributes: {nft.attributes?.length}</p>
        <p>Creators: {nft.properties?.creators?.length}</p>
      </div>
    </div>
}

export default DisplayNft