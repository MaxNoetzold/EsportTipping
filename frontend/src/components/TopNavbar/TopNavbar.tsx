import SideNavbar from "../SideNavbar.tsx/SideNavbar";
import UserAvatar from "./UserAvatar";

function TopNavbar() {
  return (
    <div className="bg-gray-950 border-b border-gray-700 p-4 flex justify-between items-center sticky top-0 w-full z-50">
      <div className="flex flex-row">
        <SideNavbar />
        <div className="text-white text-2xl">LEC Spring Split 2024</div>
      </div>
      <UserAvatar />
    </div>
  );
}

export default TopNavbar;
