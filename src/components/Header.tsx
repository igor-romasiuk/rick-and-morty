"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleMenu, toggleModal } from "@/redux/slices/uiSlice";
import Navigation from "./Navigation";
import UserIcon from "./UserIcon";
import LoginModal from "./LoginModal";

export default function Header() {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state: RootState) => state.ui.isMenuOpen);
  const isModalOpen = useSelector((state: RootState) => state.ui.isModalOpen);

  const handleToggleMenu = () => dispatch(toggleMenu());
  const handleToggleModal = () => dispatch(toggleModal());

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container flex justify-between items-center py-4 px-6">
        <button
          onClick={handleToggleMenu}
          className="md:hidden text-3xl text-white focus:outline-none z-30"
        >
          {isMenuOpen ? "X" : "☰"}
        </button>

        <h1
          className={`text-3xl font-bold text-green-500 transition-all duration-300 ${
            isMenuOpen ? "text-center" : "md:flex-none"
          }`}
        >
          <Link href="/">Rick & Morty</Link>
        </h1>

        <Navigation isMenuOpen={isMenuOpen} />

        <UserIcon onClick={handleToggleModal} />
      </div>

      {isModalOpen && <LoginModal onClose={handleToggleModal} />}
    </header>
  );
}
