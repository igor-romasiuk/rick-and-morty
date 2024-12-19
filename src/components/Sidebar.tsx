'use client'

import Link from "next/link";
import { useState } from "react";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute w-max p-2 h-10 top-5 left-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          {isOpen ? "Close Filters" : "Open Filters"}
        </button>
      </div>

      <div
        className={`absolute top-0 left-0 h-full bg-gray-900 text-white p-2 z-40 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="pt-5 text-3xl font-bold text-green-500">
          <Link href="/">
            Rick & Morty
          </Link>
        </h2>
        <h2 className="text-2xl font-bold mb-4 mt-20 text-green-400">Filters</h2>
        <div className="flex flex-col gap-4">{children}</div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
