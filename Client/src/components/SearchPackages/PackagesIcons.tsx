import React from "react";
import { BiSolidBed } from "react-icons/bi";
import { MdFlight } from "react-icons/md";
import { TbCarSuvFilled, TbPackages } from "react-icons/tb";
import { RiFunctionLine } from "react-icons/ri";

// icons component (yp)
type Icon = React.ComponentType<{ size?: number, className: string }>;
type Items = { label: string; icon: Icon };
const PackagesIcons: React.FC = () => {
  const icons: Items[] = [
    { label: "Stays", icon: BiSolidBed },
    { label: "Destinations", icon: MdFlight },
    { label: "Cars", icon: TbCarSuvFilled },
    { label: "Packages", icon: TbPackages },
    { label: "Things To Do", icon: RiFunctionLine },
  ];

  return (
    <div className="w-full ">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 w-full">
        {icons.map(({ label, icon: Icon }, i) => (
          <li key={i} className="flex justify-center">
            <button
              aria-label={label}
              className="flex flex-col items-center gap-3 p-3 rounded-4xl hover:  shadow-lg  hover:shadow-xl hover:scale-110 hover:bg-blue-50 transition-transform duration-300 ease-out cursor-pointer w-full"
            >
              <Icon size={42} className="text-[#7a8566]"/>
              <span className="text-gray-200 font-medium text-lg hover:text-black">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackagesIcons;
