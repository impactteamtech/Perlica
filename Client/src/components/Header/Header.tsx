import { BiSolidHome } from "react-icons/bi";
import logo from "/Perlica_logo.png";
import { FaInfoCircle, FaTools, FaPhoneAlt } from "react-icons/fa";
import { GiPlanetConquest } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import { useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

type IconType = React.ComponentType<{ size?: number; className?: string; style?: CSSProperties }>;
type Item = { label: string; icon: IconType; link: string };

const Header: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();

  const kenyaColors = ["#000000", "#BB0000", "#006600", "#c00000ff", "#006600"];

  const items: Item[] = [
    { label: "Home", icon: BiSolidHome, link: "/home" },
    { label: "Destination", icon: GiPlanetConquest, link: "/destination" },
    { label: "Services", icon: FaTools, link: "/services" },
    { label: "About Us", icon: FaInfoCircle, link: "#about-us" },
    { label: "Partner With Us", icon: FaPeopleGroup, link: "#partner-with-us" },
    { label: "Contact", icon: FaPhoneAlt, link: "/contact" },
  ];

  const handleClick = (link: string) => {
    if (link.startsWith("#")) {
      const target = document.querySelector(link);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(link);
    }
  };

  return (
    <nav
      aria-label="Quick nav"
      className="
        fixed right-6 top-1/2 -translate-y-1/2 z-50
        rounded-2xl p-2
        bg-white/80 backdrop-blur-md
        shadow-lg
        border border-gray-100
        w-16
      "
      style={{ pointerEvents: "auto" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-center py-2">
        <img src={logo} alt="Perlica" className="h-12 w-auto" />
      </div>

      {/* Items */}
      <ul className="flex flex-col items-center gap-2 mt-3">
        {items.map(({ label, icon: Icon }, i) => {
          const color = kenyaColors[i % kenyaColors.length];

          return (
            <li key={label} className="w-full">
              <button
                type="button"
                aria-label={label}
                title={label}
                onClick={() => handleClick((items as Item[]).find(it => it.label === label)!.link)}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(label)}
                onBlur={() => setHovered(null)}
                className="group relative w-full flex items-center justify-center p-2 rounded-xl
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500
                           transition-colors duration-200"
              >
                {/* Icon (always visible) */}
                <Icon
                  size={26}
                  className="z-10"
                  style={{ color }}
                />

                {/* Label (absolute, does NOT affect layout) */}
                <span
                  className={`
                    pointer-events-none select-none absolute right-full mr-3 top-1/2 -translate-y-1/2
                    rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap
                    bg-white/95 border border-gray-200 shadow-sm
                    transform opacity-0 translate-x-2 scale-95
                    transition-all duration-200 ease-out
                    group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100
                    ${hovered === label ? "opacity-100 translate-x-0 scale-100" : ""}
                  `}
                  aria-hidden={! (hovered === label)}
                >
                  {label}
                </span>

                {/* Focus ring visual (keeps nav size stable) */}
                <span className="absolute inset-0 rounded-xl ring-0 group-focus-visible:ring-2 group-focus-visible:ring-green-400/60" />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Header;
