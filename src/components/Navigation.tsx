import Link from "next/link";

type NavigationProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

const Navigation: React.FC<NavigationProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <>
      <nav className="hidden md:flex">
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-yellow-400 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/characters" className="hover:text-yellow-400 transition duration-300">
              Characters
            </Link>
          </li>
          <li>
            <Link href="/episodes" className="hover:text-yellow-400 transition duration-300">
              Episodes
            </Link>
          </li>
          <li>
            <Link href="/locations" className="hover:text-yellow-400 transition duration-300">
              Locations
            </Link>
          </li>
        </ul>
      </nav>

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
          <ul className="space-y-4 text-center py-4">
            <li>
              <Link href="/" className="block hover:text-yellow-400 transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/characters" className="block hover:text-yellow-400 transition duration-300">
                Characters
              </Link>
            </li>
            <li>
              <Link href="/episodes" className="block hover:text-yellow-400 transition duration-300">
                Episodes
              </Link>
            </li>
            <li>
              <Link href="/locations" className="block hover:text-yellow-400 transition duration-300">
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
