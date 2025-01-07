"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "./Navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container flex justify-between items-center py-4 px-6">
        <h1 className="text-3xl font-bold text-green-500 ml-3"> {/* Зменшили лівий відступ */}
          <Link href="/">
            Rick & Morty
          </Link>
        </h1>

        <Navigation isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
    </header>
  );
}
