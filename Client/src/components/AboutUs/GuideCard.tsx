import type {JSX} from "react"
import type {Guide} from '../../lib/types'
const GuideCard = ({guide}: {guide: Guide}):JSX.Element => {
  return (
    <div className="relative w-150 h-80 flex items-center justify-center">
        <div className="p-1 z-10 relative border-1 w-[90%] h-[100%] border-green-800 ">
            <img 
            className="w-full h-full relative"
            src={guide.image} 
            alt={guide.name} />
            <div className="absolute -bottom-5 w-full flex items-center justify-center  text-white">
                <div className="bg-[#007f39] border-3 rounded-sm border-orange-50/90  px-4 py-2">
                    <h1 className="text-center w-full font-baskerville text-md font-semibold">{guide.name}</h1>
                </div>
            </div>
        </div>
        <div className="absolute w-full rounded-lg bg-secondary/10 border border-secondary/20 ring-1 ring-secondary/10 p-2 h-20 -bottom-15 flex items-center justify-center ">
           <p className="mt-9 font-baskerville text-black/80 font-light text-lg">
                {guide.role}
            </p>
        </div>
    </div>
    
  )
}

export default GuideCard