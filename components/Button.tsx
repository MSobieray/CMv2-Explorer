import { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
  handleClick: () => void
  className?: string
}

const Button: FC<Props> = ({ children, handleClick, className }) => {
  return (
    <button className={`text-slate-50 bg-cyan-500 p-2 ${className}`} onClick={() => handleClick()}>{children}</button>
  )
}

export default Button