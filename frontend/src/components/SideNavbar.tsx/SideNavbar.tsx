import { useState, useRef } from "react";
import HamburgerMenuIcon from "./HamburgerMenuIcon";
import useOnClickOutside from "../../utils/useOnClickOutside";

function SideNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, (event) => {
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
        ref={ref}
        className={`fixed left-0 top-20 h-full w-64 bg-gray-950 border-r border-gray-700 p-4 z-40 overflow-auto transition-transform duration-200 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Your sidebar content goes here */}
      </div>
    </>
  );
}

export default SideNavbar;
