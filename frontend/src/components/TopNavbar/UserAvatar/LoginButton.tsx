function LoginButton() {
  const handleLoginClick = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;
  };

  return (
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
  );
}

export default LoginButton;
