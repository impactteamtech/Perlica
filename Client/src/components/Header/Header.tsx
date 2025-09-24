
import { BiSolidHome } from 'react-icons/bi';
import logo from '/Perlica_logo.png'
import { FaInfoCircle, FaTools, FaPhoneAlt } from "react-icons/fa";
import { useState } from 'react';


type IconType = React.ComponentType<{ size?: number; className?: string }>;
type Item = { label: string; icon: IconType };

const Header: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  const items: Item[] = [
    { label: "Home", icon: BiSolidHome },
    { label: "About Us", icon: FaInfoCircle },
    { label: "Services", icon: FaTools },
    { label: "Contact Us", icon: FaPhoneAlt },
  ];

  return (
    <nav
      aria-label="Quick nav"
      className="
        fixed top-1/2 right-4 -translate-y-1/2 z-50
        rounded-2xl
        bg-white border border-gray-200 shadow-xl
      "
    >
      {/* Logo */}
      <div className="flex justify-center">
        <img src={logo} alt="Perlica" className="h-15 w-auto" />
      </div>

      <ul className="flex flex-col items-center p-3 gap-3">
        {items.map(({ label, icon: Icon }) => {
          const expanded = hovered === label;
          return (
            <li key={label}>
              <button
                type="button"
                aria-label={label}
                title={label}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}
                className={`
                  group flex items-center overflow-hidden rounded-xl
                  transition-all duration-300 ease-out cursor-pointer
                  bg-white border border-gray-200 
                  hover:shadow-md 
                  ${expanded ? "justify-center w-[220px]" : "justify-center w-[60px] p-3"}
                `}
              >
                <Icon
                  size={32}
                  className=" mr-5 mx-5 shrink-0 text-gray-800  group-hover:text-gray-900 transition-colors"
                />
                <span
                  className={`
                    text-sm font-medium  text-gray-900 whitespace-nowrap
                    transition-[max-width,opacity,margin] duration-300 ease-out
                    ${expanded ? "max-w-[140px] opacity-100" : "max-w-0 opacity-0 ml-0"}
                  `}
                  style={{ willChange: "max-width, opacity"}}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Header;