import { Nft } from "@metaplex-foundation/js-next"

const DisplayNft = (nft: Nft) => {
  const { metadata: data } = nft
  return (
    <div className="p-4 bg-slate-100 hover:bg-slate-200 border rounded-lg shadow-md" key={data.name}>
      <h5 className="font-mono text-slate-500 text-lg mb-1">{data.name}</h5>
      <img
        src={data.image}
        alt={data.description}
      />
      <div className="font-mono text-slate-500 text-sm divide-y divide-solid mt-2">
        <p>Attributes: {data.attributes?.length}</p>
        <p>Creators: {data.properties?.creators?.length}</p>
      </div>
    </div>
  )
}

export default DisplayNft