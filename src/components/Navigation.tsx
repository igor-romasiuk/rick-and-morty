import Link from "next/link";

type NavigationProps = {
  isMenuOpen: boolean;
  onCloseMenu: () => void;
};

const Navigation: React.FC<NavigationProps> = ({ isMenuOpen, onCloseMenu }) => {
  return (
    <>
      <nav className="hidden md:flex flex-1 justify-center">
        <ul className="flex space-x-6 md:space-x-8">
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

      <div
        className={`md:hidden absolute top-0 left-0 w-full bg-gradient-to-b from-green-700 via-green-500 to-green-300 text-white transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ zIndex: 20 }}
      >
        <nav>
          <ul className="space-y-4 md:space-y-6 text-center py-4 md:py-6">
            <li>
              <Link href="/" className="block hover:text-yellow-400 transition duration-300 text-xl" onClick={onCloseMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/characters"
                className="block hover:text-yellow-400 transition duration-300 text-xl"
                onClick={onCloseMenu}
              >
                Characters
              </Link>
            </li>
            <li>
              <Link
                href="/episodes"
                className="block hover:text-yellow-400 transition duration-300 text-xl"
                onClick={onCloseMenu}
              >
                Episodes
              </Link>
            </li>
            <li>
              <Link
                href="/locations"
                className="block hover:text-yellow-400 transition duration-300 text-xl"
                onClick={onCloseMenu}
              >
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
