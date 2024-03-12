function TopNavbar() {
  return (
    <div className="bg-gray-950 border-b border-gray-700 p-4 flex justify-between items-center sticky top-0 w-full z-50">
      <div className="text-white text-2xl">LEC Spring Split 2024</div>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Login
      </button>
    </div>
  );
}

export default TopNavbar;
