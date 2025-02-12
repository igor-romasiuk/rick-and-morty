"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleMenu, toggleModal } from "@/redux/slices/uiSlice";
import { GiHamburgerMenu, GiCrossMark } from "react-icons/gi";
import Navigation from "./Navigation";
import UserIcon from "./UserIcon";
import LoginModal from "./LoginModal";

export default function Header() {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state: RootState) => state.ui.isMenuOpen);
  const isModalOpen = useSelector((state: RootState) => state.ui.isModalOpen);

  const handleToggleMenu = () => dispatch(toggleMenu());
  const handleToggleModal = () => dispatch(toggleModal());
  const handleCloseMenu = () => dispatch(toggleMenu());

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="flex justify-between items-center py-4 px-6 relative">
        <button
          onClick={handleToggleMenu}
          className="md:hidden text-4xl text-green-400 focus:outline-none z-30"
        >
          {isMenuOpen ? <GiCrossMark /> : <GiHamburgerMenu />}
        </button>

        <Link
          href="/"
          className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none"
        >
          <Image
            src="logo.svg"
            alt="Rick and Morty Logo"
            width={160}
            height={47}
            style={{
              width: '160px',
              height: 'auto',
            }}
            priority
          />
        </Link>

        <Navigation isMenuOpen={isMenuOpen} onCloseMenu={handleCloseMenu} />

        <div className="ml-auto">
          <UserIcon onClick={handleToggleModal} />
        </div>
      </div>

      {isModalOpen && <LoginModal onClose={handleToggleModal} />}
    </header>
  );
}
