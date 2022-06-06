import { FC, ReactNode } from "react"

type Props = {
  children: ReactNode[]
  rows: number
  className?: string
}
const Grid: FC<Props> = ({ children, rows, className }) => (
  <div className={`grid gap-4 grid-cols-3 grid-rows-${rows} mt-4 ${className}`}>
    {children}
  </div>
)

export default Grid