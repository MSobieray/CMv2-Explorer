import { FC } from "react";
import { CandyMachineState } from "../hooks/useCandyMachine";
import Grid from "./Grid";

type Props = {
  candyMachine: CandyMachineState
}
const CandyMachineInfo: FC<Props> = ({candyMachine}) => (
  <Grid rows={3} className="mb-10">
    <div>
      <h4 className="font-mono mb-1">Mint Price</h4>
      <p className="text-sm text-slate-500">{candyMachine.price} SOL</p>
      <h4 className="font-mono mb-1 mt-2">Go Live Date</h4>
      <p className="text-sm text-slate-500">{candyMachine.goLiveDate.toDateString()}</p>
    </div>
    <div>
      <h4 className="font-mono mb-1">Mint Stats</h4>
      <div className="flex justify-between text-sm text-slate-500">
        <p>Items Available:</p>
        <p>{candyMachine.itemsAvailable}</p>
      </div>
      <div className="flex justify-between text-sm text-slate-500">
        <p>Items Redeemed:</p>
        <p>{candyMachine.itemsRedeemed}</p>
      </div>
      <div className="flex justify-between text-sm text-slate-500">
        <p>Items Remaining:</p>
        <p>{candyMachine.itemsRemaining}</p>
      </div>
    </div>
    <div>
      <h4 className="font-mono mb-1">Creators</h4>
      {candyMachine.creators.map((creator, i) => (
        <div className="flex justify-between text-sm text-slate-500" key={i}>
          <p>{creator.address.toBase58().slice(0,6)}...{creator.address.toBase58().slice(38)}</p>
          <p>{creator.share}%</p>
        </div>
      ))}
    </div>
  </Grid>
)

export default CandyMachineInfo