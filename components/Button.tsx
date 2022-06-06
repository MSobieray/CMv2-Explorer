import {FC, ReactNode} from "react"

type Props = {
  children: ReactNode
  handleClick: () => void
  className?: string,
  isDisabled: boolean
}

const Button: FC<Props> = ({ children, handleClick, className, isDisabled}) => {
  return (
    <button 
      disabled={isDisabled} 
      className={`text-slate-50 bg-cyan-500 p-2 ${className} ${isDisabled && 'opacity-75'}`} 
      onClick={() => handleClick()}
    >
      {children}
    </button>
  )
}

export default Button