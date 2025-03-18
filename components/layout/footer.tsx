import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-200 dark:border-green-500/20 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <Image src="/brand/logo.svg" alt="Rick and Morty" width={0} height={0} sizes="100vw" className="h-10 w-auto" />
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Explore the infinite dimensions of the Rick and Morty multiverse
            </p>
          </div>

          <div>
            <h3 className="text-green-600 dark:text-green-400 font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {["Home", "Characters", "Episodes", "Locations"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-green-600 dark:text-green-400 font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              {["About", "Privacy Policy", "Licensing", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-green-600 dark:text-green-400 font-bold mb-4">API</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://rickandmortyapi.com/documentation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://rickandmortyapi.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                >
                  Rick and Morty API
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-green-500/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © 2024 Rick and Morty Explorer. All Rights Reserved.
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4 md:mt-0">
            Powered by{" "}
            <a
              href="https://rickandmortyapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
            >
              The Rick and Morty API
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

