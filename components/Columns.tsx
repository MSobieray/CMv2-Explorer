import { FC, ReactNode } from "react"

type Props = {
  children: ReactNode[]
  columns: number
  className: string
}
const Columns: FC<Props> = ({ children, columns, className }) => (
  <div className={`columns-3 ${className}`}>
    {children}
  </div>
)

export default Columns