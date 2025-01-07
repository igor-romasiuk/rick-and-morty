import Link from "next/link";

type NavigationProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

const Navigation: React.FC<NavigationProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <>
      {/* Десктопна навігація */}
      <nav className="hidden md:flex">
        <ul className="flex space-x-6 md:space-x-8"> {/* Змінюється відстань на великих екранах */}
          <li>
            <Link href="/" className="hover:text-yellow-400 transition duration-300 text-lg md:text-xl">
              Home
            </Link>
          </li>
          <li>
            <Link href="/characters" className="hover:text-yellow-400 transition duration-300 text-lg md:text-xl">
              Characters
            </Link>
          </li>
          <li>
            <Link href="/episodes" className="hover:text-yellow-400 transition duration-300 text-lg md:text-xl">
              Episodes
            </Link>
          </li>
          <li>
            <Link href="/locations" className="hover:text-yellow-400 transition duration-300 text-lg md:text-xl">
              Locations
            </Link>
          </li>
        </ul>
      </nav>

      {/* Мобільне меню */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-2xl text-white focus:outline-none z-20"
      >
        {isMenuOpen ? "X" : "☰"}
      </button>

      <div
        className={`md:hidden fixed top-0 left-0 w-full bg-gray-800 text-white transition-all duration-300 ease-in-out transform ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
        style={{ zIndex: 10 }}
      >
        <nav>
          <ul className="space-y-4 md:space-y-6 text-center py-4 md:py-6"> {/* Відстань між пунктами змінюється на різних екранах */}
            <li>
              <Link href="/" className="block hover:text-yellow-400 transition duration-300 text-xl">
                Home
              </Link>
            </li>
            <li>
              <Link href="/characters" className="block hover:text-yellow-400 transition duration-300 text-xl">
                Characters
              </Link>
            </li>
            <li>
              <Link href="/episodes" className="block hover:text-yellow-400 transition duration-300 text-xl">
                Episodes
              </Link>
            </li>
            <li>
              <Link href="/locations" className="block hover:text-yellow-400 transition duration-300 text-xl">
                Locations
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
