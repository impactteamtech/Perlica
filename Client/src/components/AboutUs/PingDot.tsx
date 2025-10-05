import type {JSX} from "react"
const PingDot = ():JSX.Element => {
  return (
    <div className="relative flex items-center justify-center">
        <div className="w-4 h-4 bg-black rounded-full animate-ping absolute"></div>
        <div className="w-4 h-4 bg-black rounded-full"></div>
    </div>
  )
}

export default PingDot