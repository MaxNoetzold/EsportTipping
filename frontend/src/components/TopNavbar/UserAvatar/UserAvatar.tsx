import { useQuery, useQueryClient } from "@tanstack/react-query";
import getMeApi from "../../../api/getMeApi";
import LoginButton from "./LoginButton";
import { useState } from "react";
import logoutApi from "../../../api/logoutApi";

function UserAvatar() {
  const [showPopdown, setShowPopdown] = useState(false);
  const [logoutState, setLogoutState] = useState("idle");
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["user", "me"],
    queryFn: getMeApi,
  });

  const handleLogout = async () => {
    if (logoutState !== "loading") {
      setLogoutState("loading");
      await logoutApi();
      setLogoutState("idle");
      queryClient.resetQueries({ queryKey: ["user"] });
    }
  };

  const togglePopdown = () => {
    setShowPopdown(!showPopdown);
  };

  if (!data) {
    return <LoginButton />;
  }

  return (
    <div className="relative">
      <img
        src={`https://cdn.discordapp.com/avatars/${data.discordUserId}/${data.avatar}.png`}
        alt="User Avatar"
        className="w-12 h-12 rounded-full cursor-pointer"
        onClick={togglePopdown}
      />
      {showPopdown && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 bg-gray-900 text-white border border-gray-700 px-3 pb-2">
          <a onClick={handleLogout} className="cursor-pointer">
            Logout
          </a>
        </div>
      )}
    </div>
  );
}

export default UserAvatar;
