import { Nft } from "@metaplex-foundation/js-next";
import { FC } from "react";
import DisplayNft from "./DisplayNft";
import Grid from "./Grid";

type Props = {
  nfts: Nft[]
}

const NFTList: FC<Props> = ({nfts}) => (
  <Grid rows={Math.ceil(nfts.length / 3)}>
    {nfts.map(nft => DisplayNft(nft))}
  </Grid>
)

export default NFTList