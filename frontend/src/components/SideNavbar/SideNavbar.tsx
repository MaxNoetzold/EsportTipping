import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import HamburgerMenuIcon from "./HamburgerMenuIcon";
import useOnClickOutside from "../../utils/useOnClickOutside";
import TippingGroups from "./TippingGroups";

function SideNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  useOnClickOutside(sidebarRef, (event) => {
    const closeButton = document.getElementById("sidebar-toggle-button");
    if (closeButton && closeButton.contains(event.target as Node)) {
      // The click event is on the button, do nothing
      return;
    }
    event.stopPropagation();
    setIsOpen(false);
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex flex-col justify-center items-center mr-1"
        id="sidebar-toggle-button"
      >
        <HamburgerMenuIcon />
      </button>
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-20 h-full w-64 bg-gray-950 border-r border-gray-700 z-40 overflow-auto transition-transform duration-200 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col w-64 h-full bg-gray-800 text-white">
          <Link to="/" className="p-4 hover:bg-gray-700">
            Home
          </Link>
          <TippingGroups />
        </div>
      </div>
    </>
  );
}

export default SideNavbar;
