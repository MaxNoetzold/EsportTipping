function TopNavbar() {
  const handleLoginClick = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;
  };

  return (
    <div className="bg-gray-950 border-b border-gray-700 p-4 flex justify-between items-center sticky top-0 w-full z-50">
      <div className="text-white text-2xl">LEC Spring Split 2024</div>
      <button
        onClick={handleLoginClick}
        className="discordButton text-white font-bold py-2 px-4 rounded"
      >
        <img
          src="/discord-mark-white.png"
          alt="Discord logo"
          className="inline-block mr-2 h-5"
        />
        Login
      </button>
    </div>
  );
}

export default TopNavbar;
