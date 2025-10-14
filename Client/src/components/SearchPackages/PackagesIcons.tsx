import React from "react";
import { BiSolidBed } from "react-icons/bi";
import { MdFlight } from "react-icons/md";
import { TbCarSuvFilled, TbPackages } from "react-icons/tb";
import { RiFunctionLine } from "react-icons/ri";
import {motion} from 'framer-motion'
// icons component (yp)
type Icon = React.ComponentType<{ size: number,  style: React.CSSProperties }>;
type Items = { label: string; size: number; icon: Icon };

interface PackagesProps {
  onSelect: (category: 'stays' | 'destinations' | 'cars' | 'packages' | 'thingsToDo') => void;
}
const PackagesIcons: React.FC<PackagesProps> = ({onSelect}) => {
  const icons: Items[] = [
    { label: "Stays", size: 42, icon: BiSolidBed },
    { label: "Destinations",  size: 42, icon: MdFlight },
    { label: "Cars",  size: 42, icon: TbCarSuvFilled },
    { label: "Packages",  size: 42, icon: TbPackages },
    { label: "Things To Do",  size: 42, icon: RiFunctionLine },
  ];

  const kenyaColors = ['#000000', '#BB0000', '#006600', '#c00000ff']; // kenyan flag color (yp)
  

  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 w-full">
        {icons.map(({ label, icon: Icon, size }, i) => {
          const color = kenyaColors[i % kenyaColors.length];
          // Map label to category key (yp)
          const labelToKey: { [key: string]: 'stays' | 'destinations' | 'cars' | 'packages' | 'thingsToDo' } = {
            "Stays": "stays",
            "Destinations": "destinations",
            "Cars": "cars",
            "Packages": "packages",
            "Things To Do": "thingsToDo",
          };
          const categoryKey = labelToKey[label];

          return (
            <li key={i} className="flex justify-center ">
              <button
                aria-label={label}
                onClick={() => onSelect(categoryKey)}
                
                className='flex flex-col items-center gap-3 p-3 bg-white/50 hover:bg-white rounded-4xl hover:shadow-lg  hover:shadow-xl hover:scale-110  transition-transform duration-300 ease-out cursor-pointer w-full'
              >
          <Icon size={size} style={{color}}/>
          <span className="text-gray-800 font-medium text-lg">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default PackagesIcons;
