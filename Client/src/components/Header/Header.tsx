
import { BiSolidHome } from 'react-icons/bi';
import logo from '/Perlica_logo.png'
import { FaInfoCircle, FaTools, FaPhoneAlt, } from "react-icons/fa";
import { GiPlanetConquest } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6"
import { useState, type CSSProperties } from 'react';


type IconType = React.ComponentType<{ size?: number; className?: string, style: CSSProperties; }>;
type Item = { label: string; icon: IconType };

const Header: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  //Kenyan flag colors for icon (yp)
  const kenyaColors = ['#000000', '#BB0000', '#006600',  '#c00000ff', '#006600',];

  const items: Item[] = [
    { label: "Home", icon: BiSolidHome },
    { label: "Destination", icon: GiPlanetConquest },
    { label: "Services", icon: FaTools },
    { label: "About Us", icon: FaInfoCircle },
    { label: "Partner With Us", icon: FaPeopleGroup },
    { label: "Contact", icon: FaPhoneAlt },

  ];

  return (
    <nav
      aria-label="Quick nav"
      className="
        fixed top-1/2 right-4 -translate-y-1/2 z-50
        rounded-2xl p-1
        background-color border border-gray-200 shadow-xl
      "
    >
      {/* Logo (yp) */}
      <div className="p-1 flex justify-center">
        <img src={logo} alt="Perlica" className="h-15 w-auto" />
      </div>

      <ul className="flex flex-col items-center p-3 gap-3">
        {items.map(({ label, icon: Icon }, i) => {
          const color = kenyaColors[i % kenyaColors.length]
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
                  group flex items-center justify-center overflow-hidden 
                  transition-all duration-300 ease-out cursor-pointer
                  hover:shadow-md
                  ${expanded ? "justify-center w-[220px] " : "justify-center w-[56px] p-2"}
                `}
              >
                <Icon
                  size={32}
                  className="shrink-0 text-white text-gray-800  transition-colors"
                  style={{color}}
                />
                <span
                  className={`
                    text-md font-large ml-1  text-black whitespace-nowrap
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