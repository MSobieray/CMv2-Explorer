import { Children, FC, ReactNode } from "react"

type Props = {
  className: string
  children: ReactNode
}

const Loader: FC<Props> = ({className, children}) => (
  <div className={className}>
    <div className="animate-pulse flex flex-col items-center">
        <div className="h-4 w-4 bg-slate-200 rounded-full bg-slate-500 p-4 mb-2"></div>
        {children}
    </div>
  </div>
)

export default Loader